import type { Request, Response, NextFunction } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { getDb } from '../../infrastructure/database'
import { createContactService } from './contact.service'
import {
  patchContactStatusSchema,
  inquiryQuerySchema,
} from './contact.schemas'

export function createContactController(customDb?: Db) {
  const getDatabase = () => customDb ?? getDb()

  return {
    async getPublicContact(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createContactService(getDatabase())
        const data = await service.getPublicContactContent()

        res.setHeader(
          'Cache-Control',
          'public, max-age=60, s-maxage=300, stale-while-revalidate=600'
        )
        res.status(200).json({
          success: true,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async getAdminContact(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createContactService(getDatabase())
        const data = await service.getAdminContactContent()
        res.status(200).json({
          success: true,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async updateAdminContact(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createContactService(getDatabase())
        const data = await service.updateAdminContactContent(req.body)
        res.status(200).json({
          success: true,
          message: 'Contact page content updated successfully.',
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async patchContactStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const { status } = patchContactStatusSchema.parse(req.body)
        const service = createContactService(getDatabase())
        const data = await service.setContactStatus(status)
        res.status(200).json({
          success: true,
          message: `Contact page publication status set to ${status}.`,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    // Public Contact Form Submission
    async submitInquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createContactService(getDatabase())
        const data = await service.submitInquiry(req.body, {
          ip: req.ip || req.socket.remoteAddress,
          userAgent: req.headers['user-agent'],
        })

        res.status(201).json({
          success: true,
          message: 'Your inquiry has been submitted successfully. Our team will contact you soon.',
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    // Admin Inquiries Handlers
    async getAdminInquiries(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const query = inquiryQuerySchema.parse(req.query)
        const service = createContactService(getDatabase())
        const data = await service.listInquiries(query)

        res.status(200).json({
          success: true,
          ...data,
        })
      } catch (err) {
        next(err)
      }
    },

    async getAdminInquiryById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const id = Number(req.params.id)
        const service = createContactService(getDatabase())
        const data = await service.getInquiryById(id)

        res.status(200).json({
          success: true,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async patchAdminInquiryStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const id = Number(req.params.id)
        const service = createContactService(getDatabase())
        const data = await service.patchInquiryStatus(id, req.body)

        res.status(200).json({
          success: true,
          message: 'Inquiry status updated successfully.',
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async deleteAdminInquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const id = Number(req.params.id)
        const service = createContactService(getDatabase())
        await service.deleteInquiry(id)

        res.status(200).json({
          success: true,
          message: 'Inquiry deleted successfully.',
        })
      } catch (err) {
        next(err)
      }
    },
  }
}
