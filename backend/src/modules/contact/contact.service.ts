import type { Db } from '../../infrastructure/database/db'
import { createContentRepository } from '../content/content.repository'
import { createContactRepository } from './contact.repository'
import {
  contactContentSchema,
  contactInquiryInputSchema,
  patchInquiryStatusSchema,
  type ContactContentInput,
  type ContactContentOutput,
  type ContactInquiryInput,
  type PatchInquiryStatusInput,
  type InquiryQueryInput,
} from './contact.schemas'
import { NotFoundError } from '../../shared/errors/AppError'

export function createContactService(db: Db) {
  const contentRepo = createContentRepository(db)
  const contactRepo = createContactRepository(db)

  return {
    async getPublicContactContent(): Promise<{
      content: ContactContentOutput
      publishedAt: Date | string | null
    }> {
      const doc = await contentRepo.getDocument('contact', true)
      if (!doc || doc.status !== 'published') {
        throw new NotFoundError('Contact page content has not been published yet.')
      }

      const parsedContent = contactContentSchema.parse(doc.data)
      return {
        content: parsedContent,
        publishedAt: doc.published_at,
      }
    },

    async getAdminContactContent() {
      try {
        const doc = await contentRepo.getDocument('contact', false)
        return {
          key: doc.key,
          content: contactContentSchema.parse(doc.data),
          status: doc.status,
          publishedAt: doc.published_at,
        }
      } catch (err) {
        if (err instanceof NotFoundError) {
          return null
        }
        throw err
      }
    },

    async updateAdminContactContent(rawInput: ContactContentInput, userId?: number) {
      const validated = contactContentSchema.parse(rawInput)
      const doc = await contentRepo.saveDocument(
        'contact',
        validated,
        validated.status,
        userId
      )
      return {
        key: doc.key,
        content: validated,
        status: doc.status,
        publishedAt: doc.published_at,
      }
    },

    async setContactStatus(status: 'draft' | 'published', userId?: number) {
      const existing = await contentRepo.getDocument('contact', false)
      const doc = await contentRepo.saveDocument(
        'contact',
        existing.data,
        status,
        userId
      )
      return {
        key: doc.key,
        content: contactContentSchema.parse(doc.data),
        status: doc.status,
        publishedAt: doc.published_at,
      }
    },

    // Inquiries logic
    async submitInquiry(
      rawInput: ContactInquiryInput,
      meta?: { ip?: string; userAgent?: string }
    ) {
      const validated = contactInquiryInputSchema.parse(rawInput)
      const created = await contactRepo.createInquiry(validated, meta)
      return {
        id: Number(created.id),
        name: created.name,
        email: created.email,
        status: created.status,
        createdAt: created.created_at,
      }
    },

    async listInquiries(query: InquiryQueryInput) {
      const result = await contactRepo.listInquiries({
        status: query.status,
        search: query.search,
        page: query.page,
        pageSize: query.pageSize,
      })

      return {
        items: result.items.map((item) => ({
          id: Number(item.id),
          name: item.name,
          email: item.email,
          phone: item.phone,
          company: item.company,
          serviceOfInterest: item.service_of_interest,
          country: item.country,
          message: item.message,
          status: item.status,
          ipAddress: item.ip_address,
          userAgent: item.user_agent,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        })),
        total: result.total,
        page: query.page,
        pageSize: query.pageSize,
        totalPages: Math.ceil(result.total / query.pageSize),
      }
    },

    async getInquiryById(id: number) {
      const item = await contactRepo.getInquiryById(id)
      return {
        id: Number(item.id),
        name: item.name,
        email: item.email,
        phone: item.phone,
        company: item.company,
        serviceOfInterest: item.service_of_interest,
        country: item.country,
        message: item.message,
        status: item.status,
        ipAddress: item.ip_address,
        userAgent: item.user_agent,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }
    },

    async patchInquiryStatus(id: number, rawInput: PatchInquiryStatusInput) {
      const { status } = patchInquiryStatusSchema.parse(rawInput)
      const updated = await contactRepo.setInquiryStatus(id, status)
      return {
        id: Number(updated.id),
        status: updated.status,
        updatedAt: updated.updated_at,
      }
    },

    async deleteInquiry(id: number) {
      await contactRepo.removeInquiry(id)
    },
  }
}
