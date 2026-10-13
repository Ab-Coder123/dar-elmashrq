import fs from 'fs'
import path from 'path'
import { createDefaultDb } from './scriptDb'

interface ImageItem {
  id: string
  url: string
  alt: string
  altAr?: string
  isCover: boolean
  order: number
}

interface ProjectData {
  id: string
  slug: string
  name: string
  nameAr?: string
  country: string
  location: string
  locationAr?: string
  category: string
  year?: number
  description?: string
  descriptionAr?: string
  services: string[]
  images: ImageItem[]
  isFeatured: boolean
  order: number
}

async function run() {
  console.log('--- Phase 02/03: Database Image Synchronization & Seeding ---')
  const db = createDefaultDb()

  try {
    // 1. Read verified projects data from web data layer
    const dataFilePath = path.resolve(__dirname, '../../apps/web/features/projects/data/projects.data.ts')
    if (!fs.existsSync(dataFilePath)) {
      throw new Error(`Data file not found at ${dataFilePath}`)
    }

    const fileContent = fs.readFileSync(dataFilePath, 'utf-8')
    const match = fileContent.match(/const PROJECTS: Project\[\] = (\[[\s\S]*?\])\s*export function/m)
    if (!match || !match[1]) {
      throw new Error('Failed to parse PROJECTS array from projects.data.ts')
    }

    // Evaluate cleanly in isolated sandbox
    const projects: ProjectData[] = eval(`(${match[1]})`)
    console.log(`✓ Loaded ${projects.length} verified projects from frontend data layer.`)

    let totalImagesSynced = 0
    let totalProjectsSynced = 0

    for (const project of projects) {
      if (!project.images || project.images.length === 0) {
        continue
      }

      // Check if project exists in database
      const projectRes = await db.query<{ id: number; slug: string }>(
        'select id, slug from projects where slug = $1 limit 1',
        [project.slug]
      )

      let projectId: number
      if (projectRes.rows.length === 0) {
        // Insert project if missing
        const insertRes = await db.query<{ id: number }>(
          `insert into projects 
            (slug, name, name_ar, country, location, location_ar, category, year, description, description_ar, is_featured, display_order, status)
           values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'published')
           returning id`,
          [
            project.slug,
            project.name,
            project.nameAr || null,
            project.country,
            project.location,
            project.locationAr || null,
            project.category,
            project.year || null,
            project.description || null,
            project.descriptionAr || null,
            project.isFeatured,
            project.order,
          ]
        )
        if (!insertRes.rows[0]) {
          throw new Error(`Failed to insert project ${project.slug}`)
        }
        projectId = Number(insertRes.rows[0].id)
        console.log(`+ Created project: ${project.slug} (ID: ${projectId})`)
      } else {
        projectId = Number(projectRes.rows[0].id)
      }

      let coverMediaId: number | null = null

      // Iterate through each image
      for (const img of project.images) {
        const storageKey = img.url
        const filename = path.basename(img.url)
        const mimeType = filename.endsWith('.png') ? 'image/png' : 'image/jpeg'

        // Check or insert into media_assets (Idempotent)
        const mediaRes = await db.query<{ id: number }>(
          'select id from media_assets where storage_key = $1 limit 1',
          [storageKey]
        )

        let mediaId: number
        if (mediaRes.rows.length === 0) {
          const newMedia = await db.query<{ id: number }>(
            `insert into media_assets 
              (storage_key, filename, mime_type, size_bytes, alt_text, alt_text_ar, category, is_public)
             values ($1, $2, $3, 102400, $4, $5, 'projects', true)
             returning id`,
            [storageKey, filename, mimeType, img.alt, img.altAr || null]
          )
          if (!newMedia.rows[0]) {
            throw new Error(`Failed to insert media_asset ${storageKey}`)
          }
          mediaId = Number(newMedia.rows[0].id)
        } else {
          mediaId = Number(mediaRes.rows[0].id)
          // Update alt texts if needed
          await db.query(
            'update media_assets set alt_text = $1, alt_text_ar = $2, is_public = true where id = $3',
            [img.alt, img.altAr || null, mediaId]
          )
        }

        if (img.isCover || img.order === 1) {
          coverMediaId = mediaId
        }

        // Link to project_images
        await db.query(
          `insert into project_images (project_id, media_id, sort_order)
           values ($1, $2, $3)
           on conflict (project_id, media_id) 
           do update set sort_order = excluded.sort_order`,
          [projectId, mediaId, img.order]
        )

        totalImagesSynced++
      }

      // Update project cover_image_id if found
      if (coverMediaId) {
        await db.query(
          'update projects set cover_image_id = $1 where id = $2',
          [coverMediaId, projectId]
        )
      }

      totalProjectsSynced++
      console.log(`✓ [${project.slug}] Synced ${project.images.length} photos.`)
    }

    console.log(`\n🎉 SUCCESS: Successfully synced ${totalImagesSynced} image links across ${totalProjectsSynced} projects!`)
  } catch (err) {
    console.error('❌ Error during synchronization:', err)
    process.exit(1)
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
