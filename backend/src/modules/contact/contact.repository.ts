import type { Db } from '../../infrastructure/database/db'
import { mapDbError } from '../../infrastructure/database/mapDbError'
import { NotFoundError } from '../../shared/errors/AppError'
import {
  contactInquiryInputSchema,
  type ContactInquiryInput,
} from './contact.schemas'

export interface InquiryRecord {
  id: number
  name: string
  email: string
  phone: string | null
  company: string | null
  service_of_interest: string | null
  country: string | null
  message: string
  status: 'unread' | 'read' | 'archived' | 'replied'
  ip_address: string | null
  user_agent: string | null
  created_at: Date | string
  updated_at: Date | string
}

export interface ListInquiriesOptions {
  status?: 'unread' | 'read' | 'archived' | 'replied'
  search?: string
  page?: number
  pageSize?: number
}

export function createContactRepository(db: Db) {
  return {
    async createInquiry(
      raw: ContactInquiryInput,
      meta?: { ip?: string; userAgent?: string }
    ): Promise<InquiryRecord> {
      const i = contactInquiryInputSchema.parse(raw)
      try {
        const { rows } = await db.query<InquiryRecord>(
          `insert into contact_inquiries
             (name, email, phone, company, service_of_interest, country, message, ip_address, user_agent)
           values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           returning *`,
          [
            i.name,
            i.email,
            i.phone ?? null,
            i.company ?? null,
            i.serviceOfInterest ?? null,
            i.country ?? null,
            i.message,
            meta?.ip ?? null,
            meta?.userAgent ?? null,
          ]
        )
        return rows[0]!
      } catch (e) {
        return mapDbError(e, 'Contact Inquiry')
      }
    },

    async getInquiryById(id: number): Promise<InquiryRecord> {
      const { rows } = await db.query<InquiryRecord>(
        'select * from contact_inquiries where id = $1',
        [id]
      )
      if (!rows[0]) throw new NotFoundError(`Inquiry with ID ${id} not found`)
      return rows[0]
    },

    async listInquiries(
      opts: ListInquiriesOptions
    ): Promise<{ items: InquiryRecord[]; total: number }> {
      const pageSize = Math.min(Math.max(opts.pageSize ?? 20, 1), 100)
      const offset = (Math.max(opts.page ?? 1, 1) - 1) * pageSize
      const where: string[] = []
      const params: unknown[] = []

      if (opts.status) {
        params.push(opts.status)
        where.push(`status = $${params.length}`)
      }

      if (opts.search) {
        params.push(`%${opts.search}%`)
        where.push(
          `(name ilike $${params.length} or email ilike $${params.length} or coalesce(company, '') ilike $${params.length} or message ilike $${params.length})`
        )
      }

      const clause = where.length ? `where ${where.join(' and ')}` : ''
      const countRes = await db.query<{ n: string }>(
        `select count(*) as n from contact_inquiries ${clause}`,
        params
      )
      const total = Number(countRes.rows[0]?.n ?? 0)

      const { rows } = await db.query<InquiryRecord>(
        `select * from contact_inquiries ${clause} order by created_at desc, id desc limit ${pageSize} offset ${offset}`,
        params
      )

      return { items: rows, total }
    },

    async setInquiryStatus(
      id: number,
      status: 'unread' | 'read' | 'archived' | 'replied'
    ): Promise<InquiryRecord> {
      const { rows } = await db.query<InquiryRecord>(
        'update contact_inquiries set status = $2 where id = $1 returning *',
        [id, status]
      )
      if (!rows[0]) throw new NotFoundError(`Inquiry with ID ${id} not found`)
      return rows[0]
    },

    async removeInquiry(id: number): Promise<void> {
      const res = await db.query('delete from contact_inquiries where id = $1 returning id', [id])
      if (res.rows.length === 0) throw new NotFoundError(`Inquiry with ID ${id} not found`)
    },
  }
}
