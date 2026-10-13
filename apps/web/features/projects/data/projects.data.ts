import type { Project } from '@dar-elmashrq/types'

/**
 * Static project data — Phase 01/02 placeholder.
 *
 * Source: Dar ElMashrq corporate PDF (68 pages).
 * All project names, locations, and details are PDF-verified.
 *
 * ═══════════════════════════════════════════════════════════════
 * ARCHITECTURE CONTRACT — READ BEFORE MODIFYING
 * ═══════════════════════════════════════════════════════════════
 *
 * This file is the ONLY place that knows about the static data source.
 *
 * NEVER import this file from UI components.
 * ALWAYS use project.service.ts as the entry point.
 *
 * When the backend API is ready (Phase 03):
 *   1. Update project.service.ts to call the API instead
 *   2. Archive or delete this file
 *   3. Zero UI changes required — the service interface stays the same
 *
 * ═══════════════════════════════════════════════════════════════
 *
 * CONTENT GAPS (confirmed missing from PDF, needed before launch):
 * - Project images (high-resolution photos)
 * - English descriptions for all projects
 * - Specific years for Saudi Arabia and Qatar projects
 * - Contract values for Saudi Arabia and Qatar projects
 * - Client names for most Saudi Arabia projects
 * ═══════════════════════════════════════════════════════════════
 */

const PROJECTS: Project[] = [
  // ──────────────────────────────────────────────
  // SAUDI ARABIA PROJECTS (PDF pages 10–44)
  // ──────────────────────────────────────────────
  {
    id: 'sa-001',
    slug: 'beverly-al-azeeza-new-facade',
    name: 'Beverly Al-Azeeza New Facade',
    nameAr: 'بيفرلي الواجهة الجديدة للعزيزة',
    country: 'saudi-arabia',
    location: 'Al-Azeeza',
    category: 'commercial',
    services: ['Civil Works', 'Finishing'],
    images: [
      {
            "id": "beverly-al-azeeza-new-facade-01",
            "url": "/images/projects/beverly-al-azeeza-new-facade/cover.jpg",
            "alt": "Project beverly-al-azeeza-new-facade Image 1",
            "altAr": "صورة مشروع beverly-al-azeeza-new-facade رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "beverly-al-azeeza-new-facade-02",
            "url": "/images/projects/beverly-al-azeeza-new-facade/photo-02.jpg",
            "alt": "Project beverly-al-azeeza-new-facade Image 2",
            "altAr": "صورة مشروع beverly-al-azeeza-new-facade رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "beverly-al-azeeza-new-facade-03",
            "url": "/images/projects/beverly-al-azeeza-new-facade/photo-03.jpg",
            "alt": "Project beverly-al-azeeza-new-facade Image 3",
            "altAr": "صورة مشروع beverly-al-azeeza-new-facade رقم 3",
            "isCover": false,
            "order": 3
      },
      {
            "id": "beverly-al-azeeza-new-facade-04",
            "url": "/images/projects/beverly-al-azeeza-new-facade/photo-04.jpg",
            "alt": "Project beverly-al-azeeza-new-facade Image 4",
            "altAr": "صورة مشروع beverly-al-azeeza-new-facade رقم 4",
            "isCover": false,
            "order": 4
      },
      {
            "id": "beverly-al-azeeza-new-facade-05",
            "url": "/images/projects/beverly-al-azeeza-new-facade/photo-05.jpg",
            "alt": "Project beverly-al-azeeza-new-facade Image 5",
            "altAr": "صورة مشروع beverly-al-azeeza-new-facade رقم 5",
            "isCover": false,
            "order": 5
      },
      {
            "id": "beverly-al-azeeza-new-facade-06",
            "url": "/images/projects/beverly-al-azeeza-new-facade/photo-06.jpg",
            "alt": "Project beverly-al-azeeza-new-facade Image 6",
            "altAr": "صورة مشروع beverly-al-azeeza-new-facade رقم 6",
            "isCover": false,
            "order": 6
      },
      {
            "id": "beverly-al-azeeza-new-facade-07",
            "url": "/images/projects/beverly-al-azeeza-new-facade/photo-07.jpg",
            "alt": "Project beverly-al-azeeza-new-facade Image 7",
            "altAr": "صورة مشروع beverly-al-azeeza-new-facade رقم 7",
            "isCover": false,
            "order": 7
      }
],
    isFeatured: true,
    order: 1,
  },
  {
    id: 'sa-002',
    slug: 'grc-factory',
    name: 'GRC Factory',
    nameAr: 'مصنع GRC',
    country: 'saudi-arabia',
    location: 'Saudi Arabia',
    category: 'infrastructure',
    services: ['Civil Works', 'Construction'],
    images: [
      {
            "id": "grc-factory-01",
            "url": "/images/projects/grc-factory/cover.jpg",
            "alt": "Project grc-factory Image 1",
            "altAr": "صورة مشروع grc-factory رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "grc-factory-02",
            "url": "/images/projects/grc-factory/photo-02.jpg",
            "alt": "Project grc-factory Image 2",
            "altAr": "صورة مشروع grc-factory رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "grc-factory-03",
            "url": "/images/projects/grc-factory/photo-03.jpg",
            "alt": "Project grc-factory Image 3",
            "altAr": "صورة مشروع grc-factory رقم 3",
            "isCover": false,
            "order": 3
      },
      {
            "id": "grc-factory-04",
            "url": "/images/projects/grc-factory/photo-04.jpg",
            "alt": "Project grc-factory Image 4",
            "altAr": "صورة مشروع grc-factory رقم 4",
            "isCover": false,
            "order": 4
      },
      {
            "id": "grc-factory-05",
            "url": "/images/projects/grc-factory/photo-05.jpg",
            "alt": "Project grc-factory Image 5",
            "altAr": "صورة مشروع grc-factory رقم 5",
            "isCover": false,
            "order": 5
      },
      {
            "id": "grc-factory-06",
            "url": "/images/projects/grc-factory/photo-06.jpg",
            "alt": "Project grc-factory Image 6",
            "altAr": "صورة مشروع grc-factory رقم 6",
            "isCover": false,
            "order": 6
      }
],
    isFeatured: false,
    order: 2,
  },
  {
    id: 'sa-003',
    slug: 'way-care-medical-hospital',
    name: 'Way Care Medical Hospital',
    nameAr: 'مستشفى وي كير الطبي',
    country: 'saudi-arabia',
    location: 'Saudi Arabia',
    category: 'healthcare',
    services: ['Civil Works', 'Electrical Works', 'Air Conditioning', 'Finishing'],
    images: [
      {
            "id": "way-care-medical-hospital-01",
            "url": "/images/projects/way-care-medical-hospital/cover.jpg",
            "alt": "Project way-care-medical-hospital Image 1",
            "altAr": "صورة مشروع way-care-medical-hospital رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "way-care-medical-hospital-02",
            "url": "/images/projects/way-care-medical-hospital/photo-02.jpg",
            "alt": "Project way-care-medical-hospital Image 2",
            "altAr": "صورة مشروع way-care-medical-hospital رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "way-care-medical-hospital-03",
            "url": "/images/projects/way-care-medical-hospital/photo-03.jpg",
            "alt": "Project way-care-medical-hospital Image 3",
            "altAr": "صورة مشروع way-care-medical-hospital رقم 3",
            "isCover": false,
            "order": 3
      },
      {
            "id": "way-care-medical-hospital-04",
            "url": "/images/projects/way-care-medical-hospital/photo-04.jpg",
            "alt": "Project way-care-medical-hospital Image 4",
            "altAr": "صورة مشروع way-care-medical-hospital رقم 4",
            "isCover": false,
            "order": 4
      },
      {
            "id": "way-care-medical-hospital-05",
            "url": "/images/projects/way-care-medical-hospital/photo-05.jpg",
            "alt": "Project way-care-medical-hospital Image 5",
            "altAr": "صورة مشروع way-care-medical-hospital رقم 5",
            "isCover": false,
            "order": 5
      },
      {
            "id": "way-care-medical-hospital-06",
            "url": "/images/projects/way-care-medical-hospital/photo-06.jpg",
            "alt": "Project way-care-medical-hospital Image 6",
            "altAr": "صورة مشروع way-care-medical-hospital رقم 6",
            "isCover": false,
            "order": 6
      },
      {
            "id": "way-care-medical-hospital-07",
            "url": "/images/projects/way-care-medical-hospital/photo-07.jpg",
            "alt": "Project way-care-medical-hospital Image 7",
            "altAr": "صورة مشروع way-care-medical-hospital رقم 7",
            "isCover": false,
            "order": 7
      }
],
    isFeatured: true,
    order: 3,
  },
  {
    id: 'sa-004',
    slug: 'residential-villas-al-qatif',
    name: 'Residential Villas — Al-Qatif',
    nameAr: 'فيلات سكنية بالقطيف',
    country: 'saudi-arabia',
    location: 'Al-Qatif',
    category: 'residential',
    services: ['Civil Works', 'Finishing', 'Electrical Works', 'Sanitary Works'],
    images: [
      {
            "id": "residential-villas-al-qatif-01",
            "url": "/images/projects/residential-villas-al-qatif/cover.jpg",
            "alt": "Project residential-villas-al-qatif Image 1",
            "altAr": "صورة مشروع residential-villas-al-qatif رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "residential-villas-al-qatif-02",
            "url": "/images/projects/residential-villas-al-qatif/photo-02.jpg",
            "alt": "Project residential-villas-al-qatif Image 2",
            "altAr": "صورة مشروع residential-villas-al-qatif رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "residential-villas-al-qatif-03",
            "url": "/images/projects/residential-villas-al-qatif/photo-03.jpg",
            "alt": "Project residential-villas-al-qatif Image 3",
            "altAr": "صورة مشروع residential-villas-al-qatif رقم 3",
            "isCover": false,
            "order": 3
      },
      {
            "id": "residential-villas-al-qatif-04",
            "url": "/images/projects/residential-villas-al-qatif/photo-04.jpg",
            "alt": "Project residential-villas-al-qatif Image 4",
            "altAr": "صورة مشروع residential-villas-al-qatif رقم 4",
            "isCover": false,
            "order": 4
      },
      {
            "id": "residential-villas-al-qatif-05",
            "url": "/images/projects/residential-villas-al-qatif/photo-05.jpg",
            "alt": "Project residential-villas-al-qatif Image 5",
            "altAr": "صورة مشروع residential-villas-al-qatif رقم 5",
            "isCover": false,
            "order": 5
      },
      {
            "id": "residential-villas-al-qatif-06",
            "url": "/images/projects/residential-villas-al-qatif/photo-06.jpg",
            "alt": "Project residential-villas-al-qatif Image 6",
            "altAr": "صورة مشروع residential-villas-al-qatif رقم 6",
            "isCover": false,
            "order": 6
      }
],
    isFeatured: false,
    order: 4,
  },
  {
    id: 'sa-005',
    slug: 'asbestos-pipe-replacement-al-naeriyah',
    name: 'Asbestos Pipe Replacement — Al-Naeriyah',
    nameAr: 'تغيير مواسير الأسبستوس منطقة النعيرية',
    country: 'saudi-arabia',
    location: 'Al-Naeriyah',
    category: 'infrastructure',
    services: ['Civil Works', 'Infrastructure'],
    images: [
      {
            "id": "asbestos-pipe-replacement-al-naeriyah-01",
            "url": "/images/projects/asbestos-pipe-replacement-al-naeriyah/cover.jpg",
            "alt": "Project asbestos-pipe-replacement-al-naeriyah Image 1",
            "altAr": "صورة مشروع asbestos-pipe-replacement-al-naeriyah رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "asbestos-pipe-replacement-al-naeriyah-02",
            "url": "/images/projects/asbestos-pipe-replacement-al-naeriyah/photo-02.jpg",
            "alt": "Project asbestos-pipe-replacement-al-naeriyah Image 2",
            "altAr": "صورة مشروع asbestos-pipe-replacement-al-naeriyah رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "asbestos-pipe-replacement-al-naeriyah-03",
            "url": "/images/projects/asbestos-pipe-replacement-al-naeriyah/photo-03.jpg",
            "alt": "Project asbestos-pipe-replacement-al-naeriyah Image 3",
            "altAr": "صورة مشروع asbestos-pipe-replacement-al-naeriyah رقم 3",
            "isCover": false,
            "order": 3
      },
      {
            "id": "asbestos-pipe-replacement-al-naeriyah-04",
            "url": "/images/projects/asbestos-pipe-replacement-al-naeriyah/photo-04.jpg",
            "alt": "Project asbestos-pipe-replacement-al-naeriyah Image 4",
            "altAr": "صورة مشروع asbestos-pipe-replacement-al-naeriyah رقم 4",
            "isCover": false,
            "order": 4
      },
      {
            "id": "asbestos-pipe-replacement-al-naeriyah-05",
            "url": "/images/projects/asbestos-pipe-replacement-al-naeriyah/photo-05.jpg",
            "alt": "Project asbestos-pipe-replacement-al-naeriyah Image 5",
            "altAr": "صورة مشروع asbestos-pipe-replacement-al-naeriyah رقم 5",
            "isCover": false,
            "order": 5
      },
      {
            "id": "asbestos-pipe-replacement-al-naeriyah-06",
            "url": "/images/projects/asbestos-pipe-replacement-al-naeriyah/photo-06.jpg",
            "alt": "Project asbestos-pipe-replacement-al-naeriyah Image 6",
            "altAr": "صورة مشروع asbestos-pipe-replacement-al-naeriyah رقم 6",
            "isCover": false,
            "order": 6
      },
      {
            "id": "asbestos-pipe-replacement-al-naeriyah-07",
            "url": "/images/projects/asbestos-pipe-replacement-al-naeriyah/photo-07.jpg",
            "alt": "Project asbestos-pipe-replacement-al-naeriyah Image 7",
            "altAr": "صورة مشروع asbestos-pipe-replacement-al-naeriyah رقم 7",
            "isCover": false,
            "order": 7
      },
      {
            "id": "asbestos-pipe-replacement-al-naeriyah-08",
            "url": "/images/projects/asbestos-pipe-replacement-al-naeriyah/photo-08.jpg",
            "alt": "Project asbestos-pipe-replacement-al-naeriyah Image 8",
            "altAr": "صورة مشروع asbestos-pipe-replacement-al-naeriyah رقم 8",
            "isCover": false,
            "order": 8
      },
      {
            "id": "asbestos-pipe-replacement-al-naeriyah-09",
            "url": "/images/projects/asbestos-pipe-replacement-al-naeriyah/photo-09.jpg",
            "alt": "Project asbestos-pipe-replacement-al-naeriyah Image 9",
            "altAr": "صورة مشروع asbestos-pipe-replacement-al-naeriyah رقم 9",
            "isCover": false,
            "order": 9
      }
],
    isFeatured: false,
    order: 5,
  },
  {
    id: 'sa-006',
    slug: 'western-water-pump-station-ras-tanura',
    name: 'Western Water Pump Station — Ras Tanura',
    nameAr: 'محطة ضخ المياه الغربية، رأس تنورة',
    country: 'saudi-arabia',
    location: 'Ras Tanura',
    description:
      'Water pump station for the General Administration of Water Services in the Eastern Region.',
    descriptionAr:
      'محطة ضخ المياه الغربية — رأس تنورة — الإدارة العامة لخدمات المياه بالمنطقة الشرقية.',
    category: 'infrastructure',
    services: ['Civil Works', 'Infrastructure', 'Electrical Works'],
    images: [
      {
            "id": "western-water-pump-station-ras-tanura-01",
            "url": "/images/projects/western-water-pump-station-ras-tanura/cover.png",
            "alt": "Project western-water-pump-station-ras-tanura Image 1",
            "altAr": "صورة مشروع western-water-pump-station-ras-tanura رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "western-water-pump-station-ras-tanura-02",
            "url": "/images/projects/western-water-pump-station-ras-tanura/photo-02.jpg",
            "alt": "Project western-water-pump-station-ras-tanura Image 2",
            "altAr": "صورة مشروع western-water-pump-station-ras-tanura رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "western-water-pump-station-ras-tanura-03",
            "url": "/images/projects/western-water-pump-station-ras-tanura/photo-03.jpg",
            "alt": "Project western-water-pump-station-ras-tanura Image 3",
            "altAr": "صورة مشروع western-water-pump-station-ras-tanura رقم 3",
            "isCover": false,
            "order": 3
      },
      {
            "id": "western-water-pump-station-ras-tanura-04",
            "url": "/images/projects/western-water-pump-station-ras-tanura/photo-04.jpg",
            "alt": "Project western-water-pump-station-ras-tanura Image 4",
            "altAr": "صورة مشروع western-water-pump-station-ras-tanura رقم 4",
            "isCover": false,
            "order": 4
      },
      {
            "id": "western-water-pump-station-ras-tanura-05",
            "url": "/images/projects/western-water-pump-station-ras-tanura/photo-05.jpg",
            "alt": "Project western-water-pump-station-ras-tanura Image 5",
            "altAr": "صورة مشروع western-water-pump-station-ras-tanura رقم 5",
            "isCover": false,
            "order": 5
      },
      {
            "id": "western-water-pump-station-ras-tanura-06",
            "url": "/images/projects/western-water-pump-station-ras-tanura/photo-06.jpg",
            "alt": "Project western-water-pump-station-ras-tanura Image 6",
            "altAr": "صورة مشروع western-water-pump-station-ras-tanura رقم 6",
            "isCover": false,
            "order": 6
      },
      {
            "id": "western-water-pump-station-ras-tanura-07",
            "url": "/images/projects/western-water-pump-station-ras-tanura/photo-07.jpg",
            "alt": "Project western-water-pump-station-ras-tanura Image 7",
            "altAr": "صورة مشروع western-water-pump-station-ras-tanura رقم 7",
            "isCover": false,
            "order": 7
      },
      {
            "id": "western-water-pump-station-ras-tanura-08",
            "url": "/images/projects/western-water-pump-station-ras-tanura/photo-08.jpg",
            "alt": "Project western-water-pump-station-ras-tanura Image 8",
            "altAr": "صورة مشروع western-water-pump-station-ras-tanura رقم 8",
            "isCover": false,
            "order": 8
      },
      {
            "id": "western-water-pump-station-ras-tanura-09",
            "url": "/images/projects/western-water-pump-station-ras-tanura/photo-09.jpg",
            "alt": "Project western-water-pump-station-ras-tanura Image 9",
            "altAr": "صورة مشروع western-water-pump-station-ras-tanura رقم 9",
            "isCover": false,
            "order": 9
      },
      {
            "id": "western-water-pump-station-ras-tanura-10",
            "url": "/images/projects/western-water-pump-station-ras-tanura/photo-10.jpg",
            "alt": "Project western-water-pump-station-ras-tanura Image 10",
            "altAr": "صورة مشروع western-water-pump-station-ras-tanura رقم 10",
            "isCover": false,
            "order": 10
      }
],
    isFeatured: false,
    order: 6,
  },
  {
    id: 'sa-007',
    slug: 'residential-tower',
    name: 'Residential Tower',
    nameAr: 'برج سكني',
    country: 'saudi-arabia',
    location: 'Saudi Arabia',
    category: 'residential',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [
      {
            "id": "residential-tower-01",
            "url": "/images/projects/residential-tower/cover.jpg",
            "alt": "Project residential-tower Image 1",
            "altAr": "صورة مشروع residential-tower رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "residential-tower-02",
            "url": "/images/projects/residential-tower/photo-02.jpg",
            "alt": "Project residential-tower Image 2",
            "altAr": "صورة مشروع residential-tower رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "residential-tower-03",
            "url": "/images/projects/residential-tower/photo-03.jpg",
            "alt": "Project residential-tower Image 3",
            "altAr": "صورة مشروع residential-tower رقم 3",
            "isCover": false,
            "order": 3
      },
      {
            "id": "residential-tower-04",
            "url": "/images/projects/residential-tower/photo-04.jpg",
            "alt": "Project residential-tower Image 4",
            "altAr": "صورة مشروع residential-tower رقم 4",
            "isCover": false,
            "order": 4
      },
      {
            "id": "residential-tower-05",
            "url": "/images/projects/residential-tower/photo-05.jpg",
            "alt": "Project residential-tower Image 5",
            "altAr": "صورة مشروع residential-tower رقم 5",
            "isCover": false,
            "order": 5
      }
],
    isFeatured: true,
    order: 7,
  },
  {
    id: 'sa-008',
    slug: 'al-smaeel-tower',
    name: 'Al-Smaeel Tower',
    nameAr: 'برج السماعيل',
    country: 'saudi-arabia',
    location: 'Saudi Arabia',
    category: 'residential',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [
      {
            "id": "al-smaeel-tower-01",
            "url": "/images/projects/al-smaeel-tower/cover.jpg",
            "alt": "Project al-smaeel-tower Image 1",
            "altAr": "صورة مشروع al-smaeel-tower رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "al-smaeel-tower-02",
            "url": "/images/projects/al-smaeel-tower/photo-02.jpg",
            "alt": "Project al-smaeel-tower Image 2",
            "altAr": "صورة مشروع al-smaeel-tower رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "al-smaeel-tower-03",
            "url": "/images/projects/al-smaeel-tower/photo-03.jpg",
            "alt": "Project al-smaeel-tower Image 3",
            "altAr": "صورة مشروع al-smaeel-tower رقم 3",
            "isCover": false,
            "order": 3
      },
      {
            "id": "al-smaeel-tower-04",
            "url": "/images/projects/al-smaeel-tower/photo-04.jpg",
            "alt": "Project al-smaeel-tower Image 4",
            "altAr": "صورة مشروع al-smaeel-tower رقم 4",
            "isCover": false,
            "order": 4
      },
      {
            "id": "al-smaeel-tower-05",
            "url": "/images/projects/al-smaeel-tower/photo-05.jpg",
            "alt": "Project al-smaeel-tower Image 5",
            "altAr": "صورة مشروع al-smaeel-tower رقم 5",
            "isCover": false,
            "order": 5
      },
      {
            "id": "al-smaeel-tower-06",
            "url": "/images/projects/al-smaeel-tower/photo-06.jpg",
            "alt": "Project al-smaeel-tower Image 6",
            "altAr": "صورة مشروع al-smaeel-tower رقم 6",
            "isCover": false,
            "order": 6
      }
],
    isFeatured: false,
    order: 8,
  },
  {
    id: 'sa-009',
    slug: 'crispy-restaurant-al-sharea-al-awal',
    name: 'Crispy Restaurant — Al-Sharea Al-Awal',
    nameAr: 'مطاعم كرسبي الشارع الأول',
    country: 'saudi-arabia',
    location: 'Saudi Arabia',
    category: 'hospitality',
    services: ['Civil Works', 'Finishing', 'Electrical Works', 'MEP'],
    images: [
      {
            "id": "crispy-restaurant-al-sharea-al-awal-01",
            "url": "/images/projects/crispy-restaurant-al-sharea-al-awal/cover.jpg",
            "alt": "Project crispy-restaurant-al-sharea-al-awal Image 1",
            "altAr": "صورة مشروع crispy-restaurant-al-sharea-al-awal رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "crispy-restaurant-al-sharea-al-awal-02",
            "url": "/images/projects/crispy-restaurant-al-sharea-al-awal/photo-02.jpg",
            "alt": "Project crispy-restaurant-al-sharea-al-awal Image 2",
            "altAr": "صورة مشروع crispy-restaurant-al-sharea-al-awal رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "crispy-restaurant-al-sharea-al-awal-03",
            "url": "/images/projects/crispy-restaurant-al-sharea-al-awal/photo-03.jpg",
            "alt": "Project crispy-restaurant-al-sharea-al-awal Image 3",
            "altAr": "صورة مشروع crispy-restaurant-al-sharea-al-awal رقم 3",
            "isCover": false,
            "order": 3
      },
      {
            "id": "crispy-restaurant-al-sharea-al-awal-04",
            "url": "/images/projects/crispy-restaurant-al-sharea-al-awal/photo-04.jpg",
            "alt": "Project crispy-restaurant-al-sharea-al-awal Image 4",
            "altAr": "صورة مشروع crispy-restaurant-al-sharea-al-awal رقم 4",
            "isCover": false,
            "order": 4
      },
      {
            "id": "crispy-restaurant-al-sharea-al-awal-05",
            "url": "/images/projects/crispy-restaurant-al-sharea-al-awal/photo-05.jpg",
            "alt": "Project crispy-restaurant-al-sharea-al-awal Image 5",
            "altAr": "صورة مشروع crispy-restaurant-al-sharea-al-awal رقم 5",
            "isCover": false,
            "order": 5
      },
      {
            "id": "crispy-restaurant-al-sharea-al-awal-06",
            "url": "/images/projects/crispy-restaurant-al-sharea-al-awal/photo-06.jpg",
            "alt": "Project crispy-restaurant-al-sharea-al-awal Image 6",
            "altAr": "صورة مشروع crispy-restaurant-al-sharea-al-awal رقم 6",
            "isCover": false,
            "order": 6
      }
],
    isFeatured: false,
    order: 9,
  },
  {
    id: 'sa-010',
    slug: 'crispy-cream-dhahran',
    name: 'Crispy Cream — Dhahran',
    nameAr: 'كرسبي كريم الظهران',
    country: 'saudi-arabia',
    location: 'Dhahran',
    category: 'hospitality',
    services: ['Civil Works', 'Finishing', 'Electrical Works'],
    images: [
      {
            "id": "crispy-cream-dhahran-01",
            "url": "/images/projects/crispy-cream-dhahran/cover.jpg",
            "alt": "Project crispy-cream-dhahran Image 1",
            "altAr": "صورة مشروع crispy-cream-dhahran رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "crispy-cream-dhahran-02",
            "url": "/images/projects/crispy-cream-dhahran/photo-02.jpg",
            "alt": "Project crispy-cream-dhahran Image 2",
            "altAr": "صورة مشروع crispy-cream-dhahran رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "crispy-cream-dhahran-03",
            "url": "/images/projects/crispy-cream-dhahran/photo-03.jpg",
            "alt": "Project crispy-cream-dhahran Image 3",
            "altAr": "صورة مشروع crispy-cream-dhahran رقم 3",
            "isCover": false,
            "order": 3
      },
      {
            "id": "crispy-cream-dhahran-04",
            "url": "/images/projects/crispy-cream-dhahran/photo-04.jpg",
            "alt": "Project crispy-cream-dhahran Image 4",
            "altAr": "صورة مشروع crispy-cream-dhahran رقم 4",
            "isCover": false,
            "order": 4
      },
      {
            "id": "crispy-cream-dhahran-05",
            "url": "/images/projects/crispy-cream-dhahran/photo-05.jpg",
            "alt": "Project crispy-cream-dhahran Image 5",
            "altAr": "صورة مشروع crispy-cream-dhahran رقم 5",
            "isCover": false,
            "order": 5
      },
      {
            "id": "crispy-cream-dhahran-06",
            "url": "/images/projects/crispy-cream-dhahran/photo-06.jpg",
            "alt": "Project crispy-cream-dhahran Image 6",
            "altAr": "صورة مشروع crispy-cream-dhahran رقم 6",
            "isCover": false,
            "order": 6
      }
],
    isFeatured: false,
    order: 10,
  },
  {
    id: 'sa-011',
    slug: 'kfc-hardees-prince-turki-khobar',
    name: 'KFC & Hardees — Prince Turki, Al-Khobar',
    nameAr: 'كنتاكي وهارديز البرنس ترك الخبر',
    country: 'saudi-arabia',
    location: 'Al-Khobar',
    category: 'hospitality',
    services: ['Civil Works', 'Finishing', 'Electrical Works'],
    images: [
      {
            "id": "kfc-hardees-prince-turki-khobar-01",
            "url": "/images/projects/kfc-hardees-prince-turki-khobar/cover.jpg",
            "alt": "Project kfc-hardees-prince-turki-khobar Image 1",
            "altAr": "صورة مشروع kfc-hardees-prince-turki-khobar رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "kfc-hardees-prince-turki-khobar-02",
            "url": "/images/projects/kfc-hardees-prince-turki-khobar/photo-02.jpg",
            "alt": "Project kfc-hardees-prince-turki-khobar Image 2",
            "altAr": "صورة مشروع kfc-hardees-prince-turki-khobar رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "kfc-hardees-prince-turki-khobar-03",
            "url": "/images/projects/kfc-hardees-prince-turki-khobar/photo-03.jpg",
            "alt": "Project kfc-hardees-prince-turki-khobar Image 3",
            "altAr": "صورة مشروع kfc-hardees-prince-turki-khobar رقم 3",
            "isCover": false,
            "order": 3
      },
      {
            "id": "kfc-hardees-prince-turki-khobar-04",
            "url": "/images/projects/kfc-hardees-prince-turki-khobar/photo-04.jpg",
            "alt": "Project kfc-hardees-prince-turki-khobar Image 4",
            "altAr": "صورة مشروع kfc-hardees-prince-turki-khobar رقم 4",
            "isCover": false,
            "order": 4
      },
      {
            "id": "kfc-hardees-prince-turki-khobar-05",
            "url": "/images/projects/kfc-hardees-prince-turki-khobar/photo-05.jpg",
            "alt": "Project kfc-hardees-prince-turki-khobar Image 5",
            "altAr": "صورة مشروع kfc-hardees-prince-turki-khobar رقم 5",
            "isCover": false,
            "order": 5
      },
      {
            "id": "kfc-hardees-prince-turki-khobar-06",
            "url": "/images/projects/kfc-hardees-prince-turki-khobar/photo-06.jpg",
            "alt": "Project kfc-hardees-prince-turki-khobar Image 6",
            "altAr": "صورة مشروع kfc-hardees-prince-turki-khobar رقم 6",
            "isCover": false,
            "order": 6
      }
],
    isFeatured: false,
    order: 11,
  },
  {
    id: 'sa-012',
    slug: 'kfc-al-safa-al-rakha',
    name: 'KFC — Al-Safa Al-Rakha',
    nameAr: 'كنتاكي الصفا الراكة',
    country: 'saudi-arabia',
    location: 'Saudi Arabia',
    category: 'hospitality',
    services: ['Civil Works', 'Finishing', 'Electrical Works'],
    images: [
      {
            "id": "kfc-al-safa-al-rakha-01",
            "url": "/images/projects/kfc-al-safa-al-rakha/cover.jpg",
            "alt": "Project kfc-al-safa-al-rakha Image 1",
            "altAr": "صورة مشروع kfc-al-safa-al-rakha رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "kfc-al-safa-al-rakha-02",
            "url": "/images/projects/kfc-al-safa-al-rakha/photo-02.jpg",
            "alt": "Project kfc-al-safa-al-rakha Image 2",
            "altAr": "صورة مشروع kfc-al-safa-al-rakha رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "kfc-al-safa-al-rakha-03",
            "url": "/images/projects/kfc-al-safa-al-rakha/photo-03.jpg",
            "alt": "Project kfc-al-safa-al-rakha Image 3",
            "altAr": "صورة مشروع kfc-al-safa-al-rakha رقم 3",
            "isCover": false,
            "order": 3
      },
      {
            "id": "kfc-al-safa-al-rakha-04",
            "url": "/images/projects/kfc-al-safa-al-rakha/photo-04.jpg",
            "alt": "Project kfc-al-safa-al-rakha Image 4",
            "altAr": "صورة مشروع kfc-al-safa-al-rakha رقم 4",
            "isCover": false,
            "order": 4
      },
      {
            "id": "kfc-al-safa-al-rakha-05",
            "url": "/images/projects/kfc-al-safa-al-rakha/photo-05.jpg",
            "alt": "Project kfc-al-safa-al-rakha Image 5",
            "altAr": "صورة مشروع kfc-al-safa-al-rakha رقم 5",
            "isCover": false,
            "order": 5
      },
      {
            "id": "kfc-al-safa-al-rakha-06",
            "url": "/images/projects/kfc-al-safa-al-rakha/photo-06.jpg",
            "alt": "Project kfc-al-safa-al-rakha Image 6",
            "altAr": "صورة مشروع kfc-al-safa-al-rakha رقم 6",
            "isCover": false,
            "order": 6
      }
],
    isFeatured: false,
    order: 12,
  },
  {
    id: 'sa-013',
    slug: 'educational-buildings-public-security-madinah',
    name: '2 Educational Buildings — Public Security Training City, Madinah',
    nameAr: 'مبنيان تعليميان بمدينة تدريب الأمن العام بالمدينة المنورة',
    country: 'saudi-arabia',
    location: 'Madinah',
    category: 'government-institutional',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [
      {
            "id": "educational-buildings-public-security-madinah-01",
            "url": "/images/projects/educational-buildings-public-security-madinah/cover.jpg",
            "alt": "Project educational-buildings-public-security-madinah Image 1",
            "altAr": "صورة مشروع educational-buildings-public-security-madinah رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "educational-buildings-public-security-madinah-02",
            "url": "/images/projects/educational-buildings-public-security-madinah/photo-02.jpg",
            "alt": "Project educational-buildings-public-security-madinah Image 2",
            "altAr": "صورة مشروع educational-buildings-public-security-madinah رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "educational-buildings-public-security-madinah-03",
            "url": "/images/projects/educational-buildings-public-security-madinah/photo-03.jpg",
            "alt": "Project educational-buildings-public-security-madinah Image 3",
            "altAr": "صورة مشروع educational-buildings-public-security-madinah رقم 3",
            "isCover": false,
            "order": 3
      },
      {
            "id": "educational-buildings-public-security-madinah-04",
            "url": "/images/projects/educational-buildings-public-security-madinah/photo-04.jpg",
            "alt": "Project educational-buildings-public-security-madinah Image 4",
            "altAr": "صورة مشروع educational-buildings-public-security-madinah رقم 4",
            "isCover": false,
            "order": 4
      },
      {
            "id": "educational-buildings-public-security-madinah-05",
            "url": "/images/projects/educational-buildings-public-security-madinah/photo-05.jpg",
            "alt": "Project educational-buildings-public-security-madinah Image 5",
            "altAr": "صورة مشروع educational-buildings-public-security-madinah رقم 5",
            "isCover": false,
            "order": 5
      },
      {
            "id": "educational-buildings-public-security-madinah-06",
            "url": "/images/projects/educational-buildings-public-security-madinah/photo-06.jpg",
            "alt": "Project educational-buildings-public-security-madinah Image 6",
            "altAr": "صورة مشروع educational-buildings-public-security-madinah رقم 6",
            "isCover": false,
            "order": 6
      }
],
    isFeatured: true,
    order: 13,
  },
  {
    id: 'sa-014',
    slug: 'forensic-evidence-building-development-riyadh',
    name: 'Forensic Evidence Building Development & Rehabilitation — Riyadh',
    nameAr: 'تطوير وتأهيل مبنى الأدلة الجنائية بالرياض',
    country: 'saudi-arabia',
    location: 'Riyadh',
    category: 'government-institutional',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [
      {
            "id": "forensic-evidence-building-development-riyadh-01",
            "url": "/images/projects/forensic-evidence-building-development-riyadh/cover.jpg",
            "alt": "Project forensic-evidence-building-development-riyadh Image 1",
            "altAr": "صورة مشروع forensic-evidence-building-development-riyadh رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "forensic-evidence-building-development-riyadh-02",
            "url": "/images/projects/forensic-evidence-building-development-riyadh/photo-02.jpg",
            "alt": "Project forensic-evidence-building-development-riyadh Image 2",
            "altAr": "صورة مشروع forensic-evidence-building-development-riyadh رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "forensic-evidence-building-development-riyadh-03",
            "url": "/images/projects/forensic-evidence-building-development-riyadh/photo-03.jpg",
            "alt": "Project forensic-evidence-building-development-riyadh Image 3",
            "altAr": "صورة مشروع forensic-evidence-building-development-riyadh رقم 3",
            "isCover": false,
            "order": 3
      }
],
    isFeatured: false,
    order: 14,
  },
  {
    id: 'sa-015',
    slug: 'disciplinary-councils-renovation-riyadh',
    name: 'General Administration for Disciplinary Councils Renovation — Riyadh',
    nameAr: 'تطوير وترميم مبنى الإدارة العامة للمجالس التأديبية بالرياض',
    country: 'saudi-arabia',
    location: 'Riyadh',
    category: 'government-institutional',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [
      {
            "id": "disciplinary-councils-renovation-riyadh-01",
            "url": "/images/projects/disciplinary-councils-renovation-riyadh/cover.jpg",
            "alt": "Project disciplinary-councils-renovation-riyadh Image 1",
            "altAr": "صورة مشروع disciplinary-councils-renovation-riyadh رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "disciplinary-councils-renovation-riyadh-02",
            "url": "/images/projects/disciplinary-councils-renovation-riyadh/photo-02.png",
            "alt": "Project disciplinary-councils-renovation-riyadh Image 2",
            "altAr": "صورة مشروع disciplinary-councils-renovation-riyadh رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "disciplinary-councils-renovation-riyadh-03",
            "url": "/images/projects/disciplinary-councils-renovation-riyadh/photo-03.png",
            "alt": "Project disciplinary-councils-renovation-riyadh Image 3",
            "altAr": "صورة مشروع disciplinary-councils-renovation-riyadh رقم 3",
            "isCover": false,
            "order": 3
      }
],
    isFeatured: false,
    order: 15,
  },
  {
    id: 'sa-016',
    slug: 'forensic-evidence-site-preparation-riyadh',
    name: 'General Administration of Forensic Evidence — Site Preparation, Riyadh',
    nameAr: 'تجهيز الموقع العام لمبنى الإدارة العامة للأدلة الجنائية في الرياض',
    country: 'saudi-arabia',
    location: 'Riyadh',
    category: 'government-institutional',
    services: ['Civil Works', 'Construction'],
    images: [],
    isFeatured: false,
    order: 16,
  },

  // ──────────────────────────────────────────────
  // EGYPT PROJECTS (PDF pages 46–54)
  // ──────────────────────────────────────────────
  {
    id: 'eg-001',
    slug: 'awlad-ragab-supermarket-chain-21-branches',
    name: 'Awlad Ragab Supermarket Chain — 21+ Branches',
    nameAr: 'سلسلة سوبر ماركت أولاد رجب — أكثر من 21 فرع',
    country: 'egypt',
    location: 'Multiple Cities — Egypt',
    locationAr: 'مدن متعددة في مصر',
    year: 2021,
    description:
      'Construction and fit-out of 21+ supermarket branches across Egypt from 2010 to 2021, including branches in Madinaty, Hurghada, Mansoura, Al-Qanater, Port Said, and more.',
    descriptionAr:
      'إنشاء وتجهيز أكثر من 21 فرعاً لسلسلة سوبر ماركت أولاد رجب في الفترة من 2010 إلى 2021.',
    category: 'commercial',
    services: ['Civil Works', 'Finishing', 'Electrical Works', 'MEP'],
    images: [
      {
            "id": "awlad-ragab-supermarket-chain-21-branches-01",
            "url": "/images/projects/awlad-ragab-supermarket-chain-21-branches/cover.jpg",
            "alt": "Project awlad-ragab-supermarket-chain-21-branches Image 1",
            "altAr": "صورة مشروع awlad-ragab-supermarket-chain-21-branches رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "awlad-ragab-supermarket-chain-21-branches-02",
            "url": "/images/projects/awlad-ragab-supermarket-chain-21-branches/photo-02.jpg",
            "alt": "Project awlad-ragab-supermarket-chain-21-branches Image 2",
            "altAr": "صورة مشروع awlad-ragab-supermarket-chain-21-branches رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "awlad-ragab-supermarket-chain-21-branches-03",
            "url": "/images/projects/awlad-ragab-supermarket-chain-21-branches/photo-03.jpg",
            "alt": "Project awlad-ragab-supermarket-chain-21-branches Image 3",
            "altAr": "صورة مشروع awlad-ragab-supermarket-chain-21-branches رقم 3",
            "isCover": false,
            "order": 3
      },
      {
            "id": "awlad-ragab-supermarket-chain-21-branches-04",
            "url": "/images/projects/awlad-ragab-supermarket-chain-21-branches/photo-04.jpg",
            "alt": "Project awlad-ragab-supermarket-chain-21-branches Image 4",
            "altAr": "صورة مشروع awlad-ragab-supermarket-chain-21-branches رقم 4",
            "isCover": false,
            "order": 4
      },
      {
            "id": "awlad-ragab-supermarket-chain-21-branches-05",
            "url": "/images/projects/awlad-ragab-supermarket-chain-21-branches/photo-05.jpg",
            "alt": "Project awlad-ragab-supermarket-chain-21-branches Image 5",
            "altAr": "صورة مشروع awlad-ragab-supermarket-chain-21-branches رقم 5",
            "isCover": false,
            "order": 5
      },
      {
            "id": "awlad-ragab-supermarket-chain-21-branches-06",
            "url": "/images/projects/awlad-ragab-supermarket-chain-21-branches/photo-06.jpg",
            "alt": "Project awlad-ragab-supermarket-chain-21-branches Image 6",
            "altAr": "صورة مشروع awlad-ragab-supermarket-chain-21-branches رقم 6",
            "isCover": false,
            "order": 6
      },
      {
            "id": "awlad-ragab-supermarket-chain-21-branches-07",
            "url": "/images/projects/awlad-ragab-supermarket-chain-21-branches/photo-07.jpg",
            "alt": "Project awlad-ragab-supermarket-chain-21-branches Image 7",
            "altAr": "صورة مشروع awlad-ragab-supermarket-chain-21-branches رقم 7",
            "isCover": false,
            "order": 7
      },
      {
            "id": "awlad-ragab-supermarket-chain-21-branches-08",
            "url": "/images/projects/awlad-ragab-supermarket-chain-21-branches/photo-08.jpg",
            "alt": "Project awlad-ragab-supermarket-chain-21-branches Image 8",
            "altAr": "صورة مشروع awlad-ragab-supermarket-chain-21-branches رقم 8",
            "isCover": false,
            "order": 8
      },
      {
            "id": "awlad-ragab-supermarket-chain-21-branches-09",
            "url": "/images/projects/awlad-ragab-supermarket-chain-21-branches/photo-09.jpg",
            "alt": "Project awlad-ragab-supermarket-chain-21-branches Image 9",
            "altAr": "صورة مشروع awlad-ragab-supermarket-chain-21-branches رقم 9",
            "isCover": false,
            "order": 9
      },
      {
            "id": "awlad-ragab-supermarket-chain-21-branches-10",
            "url": "/images/projects/awlad-ragab-supermarket-chain-21-branches/photo-10.jpg",
            "alt": "Project awlad-ragab-supermarket-chain-21-branches Image 10",
            "altAr": "صورة مشروع awlad-ragab-supermarket-chain-21-branches رقم 10",
            "isCover": false,
            "order": 10
      },
      {
            "id": "awlad-ragab-supermarket-chain-21-branches-11",
            "url": "/images/projects/awlad-ragab-supermarket-chain-21-branches/photo-11.jpg",
            "alt": "Project awlad-ragab-supermarket-chain-21-branches Image 11",
            "altAr": "صورة مشروع awlad-ragab-supermarket-chain-21-branches رقم 11",
            "isCover": false,
            "order": 11
      },
      {
            "id": "awlad-ragab-supermarket-chain-21-branches-12",
            "url": "/images/projects/awlad-ragab-supermarket-chain-21-branches/photo-12.jpg",
            "alt": "Project awlad-ragab-supermarket-chain-21-branches Image 12",
            "altAr": "صورة مشروع awlad-ragab-supermarket-chain-21-branches رقم 12",
            "isCover": false,
            "order": 12
      },
      {
            "id": "awlad-ragab-supermarket-chain-21-branches-13",
            "url": "/images/projects/awlad-ragab-supermarket-chain-21-branches/photo-13.jpg",
            "alt": "Project awlad-ragab-supermarket-chain-21-branches Image 13",
            "altAr": "صورة مشروع awlad-ragab-supermarket-chain-21-branches رقم 13",
            "isCover": false,
            "order": 13
      }
],
    isFeatured: true,
    order: 1,
  },
  {
    id: 'eg-002',
    slug: 'qasr-al-husseini-residential-towers',
    name: 'Qasr Al-Husseini Residential Towers — 12 Towers',
    nameAr: 'عمارات قصر الحسيني (12 عمارة)',
    country: 'egypt',
    location: 'Egypt',
    year: 2016,
    description: '12 residential buildings for Al-Hussein Real Estate Development Company.',
    descriptionAr:
      'إنشاء 12 عمارة سكنية لصالح شركة الحسين للتنمية العقارية بإجمالي 20 مليون جنيه.',
    category: 'residential',
    contractValue: { amount: 20000000, currency: 'EGP' },
    clientName: 'Al-Hussein Real Estate Development Company',
    services: ['Civil Works', 'Construction'],
    images: [
      {
            "id": "qasr-al-husseini-residential-towers-01",
            "url": "/images/projects/qasr-al-husseini-residential-towers/cover.jpg",
            "alt": "Project qasr-al-husseini-residential-towers Image 1",
            "altAr": "صورة مشروع qasr-al-husseini-residential-towers رقم 1",
            "isCover": true,
            "order": 1
      }
],
    isFeatured: true,
    order: 2,
  },
  {
    id: 'eg-003',
    slug: 'al-shorouk-housing-complex-30-towers',
    name: 'Al-Shorouk Housing Complex — 30 Towers',
    nameAr: 'مجموعة عمارات إسكان بمدينة الشروق (30 عمارة)',
    country: 'egypt',
    location: 'Al-Shorouk City',
    year: 2015,
    description: '30 residential buildings in Al-Shorouk City for Eskan Investment Company.',
    descriptionAr:
      'مجموعة عمارات إسكان (30 عمارة) بمدينة الشروق لصالح شركة إسكان للاستثمار بإجمالي 60 مليون جنيه.',
    category: 'residential',
    contractValue: { amount: 60000000, currency: 'EGP' },
    clientName: 'Eskan Investment Company',
    services: ['Civil Works', 'Construction'],
    images: [
      {
            "id": "al-shorouk-housing-complex-30-towers-01",
            "url": "/images/projects/al-shorouk-housing-complex-30-towers/cover.jpg",
            "alt": "Project al-shorouk-housing-complex-30-towers Image 1",
            "altAr": "صورة مشروع al-shorouk-housing-complex-30-towers رقم 1",
            "isCover": true,
            "order": 1
      }
],
    isFeatured: true,
    order: 3,
  },
  {
    id: 'eg-004',
    slug: 'al-hassan-towers-8-towers',
    name: 'Al-Hassan Towers — 8 Towers',
    nameAr: 'مجموعة أبراج الحسن (8 أبراج)',
    country: 'egypt',
    location: 'Egypt',
    year: 2008,
    description: '8 residential towers for Al-Hassan Real Estate Development Company.',
    descriptionAr: 'مجموعة أبراج الحسن (8 أبراج) لصالح شركة الحسن للتنمة العقارية.',
    category: 'residential',
    contractValue: { amount: 21000000, currency: 'EGP' },
    clientName: 'Al-Hassan Real Estate Development Company',
    services: ['Civil Works', 'Construction'],
    images: [
      {
            "id": "al-hassan-towers-8-towers-01",
            "url": "/images/projects/al-hassan-towers-8-towers/cover.jpg",
            "alt": "Project al-hassan-towers-8-towers Image 1",
            "altAr": "صورة مشروع al-hassan-towers-8-towers رقم 1",
            "isCover": true,
            "order": 1
      }
],
    isFeatured: false,
    order: 4,
  },
  {
    id: 'eg-005',
    slug: 'al-maraga-central-hospital-reconstruction',
    name: 'Al-Maraga Central Hospital — Reconstruction & Expansion',
    nameAr: 'إعادة بناء وتوسعة قسم الاستقبال والعيادات الخارجية — مستشفى المراغة المركزي',
    country: 'egypt',
    location: 'Al-Maraga, Sohag',
    category: 'healthcare',
    description:
      'Demolition and reconstruction of the reception and outpatient clinic sections of Al-Maraga Central Hospital, Sohag Governorate.',
    services: ['Civil Works', 'Construction', 'Finishing', 'MEP'],
    images: [
      {
            "id": "al-maraga-central-hospital-reconstruction-01",
            "url": "/images/projects/al-maraga-central-hospital-reconstruction/cover.png",
            "alt": "Project al-maraga-central-hospital-reconstruction Image 1",
            "altAr": "صورة مشروع al-maraga-central-hospital-reconstruction رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "al-maraga-central-hospital-reconstruction-02",
            "url": "/images/projects/al-maraga-central-hospital-reconstruction/photo-02.jpg",
            "alt": "Project al-maraga-central-hospital-reconstruction Image 2",
            "altAr": "صورة مشروع al-maraga-central-hospital-reconstruction رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "al-maraga-central-hospital-reconstruction-03",
            "url": "/images/projects/al-maraga-central-hospital-reconstruction/photo-03.jpg",
            "alt": "Project al-maraga-central-hospital-reconstruction Image 3",
            "altAr": "صورة مشروع al-maraga-central-hospital-reconstruction رقم 3",
            "isCover": false,
            "order": 3
      }
],
    isFeatured: false,
    order: 5,
  },
  {
    id: 'eg-006',
    slug: 'al-balina-hospital-medical-equipment',
    name: 'Al-Balina Central Hospital — Medical Equipment Supply & Installation',
    nameAr: 'أعمال توريد وتركيب وصيانة أجهزة طبية — مستشفى البلينا المركزي',
    country: 'egypt',
    location: 'Al-Balina, Sohag',
    category: 'healthcare',
    services: ['Electrical Works', 'Technical Installation'],
    images: [],
    isFeatured: false,
    order: 6,
  },
  {
    id: 'eg-007',
    slug: 'taha-general-hospital-renovation',
    name: 'Taha General Hospital — Renovation',
    nameAr: 'أعمال ترميم وتجديد مستشفى طهطا العام',
    country: 'egypt',
    location: 'Taha, Sohag',
    category: 'healthcare',
    services: ['Civil Works', 'Finishing'],
    images: [],
    isFeatured: false,
    order: 7,
  },

  // ──────────────────────────────────────────────
  // QATAR PROJECTS (PDF pages 56–59)
  // ──────────────────────────────────────────────
  {
    id: 'qa-001',
    slug: 'villa-al-mishaf-qatar',
    name: 'Private Villa — Al-Mishaf',
    nameAr: 'مشروع فيلا بمنطقة المشاف',
    country: 'qatar',
    location: 'Al-Mishaf, Qatar',
    category: 'residential',
    clientName: 'Qasim Al-Obeidan',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [
      {
            "id": "villa-al-mishaf-qatar-01",
            "url": "/images/projects/villa-al-mishaf-qatar/cover.jpg",
            "alt": "Project villa-al-mishaf-qatar Image 1",
            "altAr": "صورة مشروع villa-al-mishaf-qatar رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "villa-al-mishaf-qatar-02",
            "url": "/images/projects/villa-al-mishaf-qatar/photo-02.jpg",
            "alt": "Project villa-al-mishaf-qatar Image 2",
            "altAr": "صورة مشروع villa-al-mishaf-qatar رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "villa-al-mishaf-qatar-03",
            "url": "/images/projects/villa-al-mishaf-qatar/photo-03.jpg",
            "alt": "Project villa-al-mishaf-qatar Image 3",
            "altAr": "صورة مشروع villa-al-mishaf-qatar رقم 3",
            "isCover": false,
            "order": 3
      }
],
    isFeatured: false,
    order: 1,
  },
  {
    id: 'qa-002',
    slug: 'villa-muraikh-qatar',
    name: 'Private Villa — Muraikh',
    nameAr: 'مشروع فيلا بمنطقة موراكة',
    country: 'qatar',
    location: 'Muraikh, Qatar',
    category: 'residential',
    clientName: 'Khaled Al-Ali',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [
      {
            "id": "villa-muraikh-qatar-01",
            "url": "/images/projects/villa-muraikh-qatar/cover.jpg",
            "alt": "Project villa-muraikh-qatar Image 1",
            "altAr": "صورة مشروع villa-muraikh-qatar رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "villa-muraikh-qatar-02",
            "url": "/images/projects/villa-muraikh-qatar/photo-02.jpg",
            "alt": "Project villa-muraikh-qatar Image 2",
            "altAr": "صورة مشروع villa-muraikh-qatar رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "villa-muraikh-qatar-03",
            "url": "/images/projects/villa-muraikh-qatar/photo-03.jpg",
            "alt": "Project villa-muraikh-qatar Image 3",
            "altAr": "صورة مشروع villa-muraikh-qatar رقم 3",
            "isCover": false,
            "order": 3
      },
      {
            "id": "villa-muraikh-qatar-04",
            "url": "/images/projects/villa-muraikh-qatar/photo-04.jpg",
            "alt": "Project villa-muraikh-qatar Image 4",
            "altAr": "صورة مشروع villa-muraikh-qatar رقم 4",
            "isCover": false,
            "order": 4
      },
      {
            "id": "villa-muraikh-qatar-05",
            "url": "/images/projects/villa-muraikh-qatar/photo-05.jpg",
            "alt": "Project villa-muraikh-qatar Image 5",
            "altAr": "صورة مشروع villa-muraikh-qatar رقم 5",
            "isCover": false,
            "order": 5
      },
      {
            "id": "villa-muraikh-qatar-06",
            "url": "/images/projects/villa-muraikh-qatar/photo-06.jpg",
            "alt": "Project villa-muraikh-qatar Image 6",
            "altAr": "صورة مشروع villa-muraikh-qatar رقم 6",
            "isCover": false,
            "order": 6
      }
],
    isFeatured: false,
    order: 2,
  },
  {
    id: 'qa-003',
    slug: 'residential-commercial-building-muwazzar',
    name: 'Residential & Commercial Building — Muwazzar',
    nameAr: 'مشروع مبنى سكني تجاري بمنطقة موازار',
    country: 'qatar',
    location: 'Muwazzar, Qatar',
    category: 'residential',
    clientName: 'Muhammad Al-Dosari',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [
      {
            "id": "residential-commercial-building-muwazzar-01",
            "url": "/images/projects/residential-commercial-building-muwazzar/cover.jpg",
            "alt": "Project residential-commercial-building-muwazzar Image 1",
            "altAr": "صورة مشروع residential-commercial-building-muwazzar رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "residential-commercial-building-muwazzar-02",
            "url": "/images/projects/residential-commercial-building-muwazzar/photo-02.jpg",
            "alt": "Project residential-commercial-building-muwazzar Image 2",
            "altAr": "صورة مشروع residential-commercial-building-muwazzar رقم 2",
            "isCover": false,
            "order": 2
      },
      {
            "id": "residential-commercial-building-muwazzar-03",
            "url": "/images/projects/residential-commercial-building-muwazzar/photo-03.jpg",
            "alt": "Project residential-commercial-building-muwazzar Image 3",
            "altAr": "صورة مشروع residential-commercial-building-muwazzar رقم 3",
            "isCover": false,
            "order": 3
      },
      {
            "id": "residential-commercial-building-muwazzar-04",
            "url": "/images/projects/residential-commercial-building-muwazzar/photo-04.jpg",
            "alt": "Project residential-commercial-building-muwazzar Image 4",
            "altAr": "صورة مشروع residential-commercial-building-muwazzar رقم 4",
            "isCover": false,
            "order": 4
      },
      {
            "id": "residential-commercial-building-muwazzar-05",
            "url": "/images/projects/residential-commercial-building-muwazzar/photo-05.jpg",
            "alt": "Project residential-commercial-building-muwazzar Image 5",
            "altAr": "صورة مشروع residential-commercial-building-muwazzar رقم 5",
            "isCover": false,
            "order": 5
      }
],
    isFeatured: false,
    order: 3,
  },
  {
    id: 'qa-004',
    slug: 'three-villas-al-dakheel',
    name: '3 Private Villas — Al-Dakheel',
    nameAr: 'مشروع عدد 3 فيلا بمنطقة الدخيل',
    country: 'qatar',
    location: 'Al-Dakheel, Qatar',
    category: 'residential',
    clientName: 'Nasser & Hammad Al-Noaimi',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [
      {
            "id": "three-villas-al-dakheel-01",
            "url": "/images/projects/three-villas-al-dakheel/cover.jpg",
            "alt": "Project three-villas-al-dakheel Image 1",
            "altAr": "صورة مشروع three-villas-al-dakheel رقم 1",
            "isCover": true,
            "order": 1
      },
      {
            "id": "three-villas-al-dakheel-02",
            "url": "/images/projects/three-villas-al-dakheel/photo-02.jpg",
            "alt": "Project three-villas-al-dakheel Image 2",
            "altAr": "صورة مشروع three-villas-al-dakheel رقم 2",
            "isCover": false,
            "order": 2
      }
],
    isFeatured: false,
    order: 4,
  },
  {
    id: 'qa-005',
    slug: 'two-villas-al-sali',
    name: '2 Private Villas — Al-Sali',
    nameAr: 'مشروع عدد 2 فيلا بمنطقة السلي',
    country: 'qatar',
    location: 'Al-Sali, Qatar',
    category: 'residential',
    clientName: 'Fahad Al-Maadeed',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [],
    isFeatured: false,
    order: 5,
  },
  {
    id: 'qa-006',
    slug: 'villa-ain-khaled',
    name: 'Private Villa — Ain Khaled',
    nameAr: 'مشروع فيلا بمنطقة عين خالد',
    country: 'qatar',
    location: 'Ain Khaled, Qatar',
    category: 'residential',
    clientName: 'Ahmed Al-Hamr',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [],
    isFeatured: false,
    order: 6,
  },
]

/**
 * Returns all projects.
 * Async signature — designed for drop-in replacement with API call.
 */
export async function getAllProjects(): Promise<Project[]> {
  return PROJECTS
}

/**
 * Returns only featured projects (for the homepage).
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  return PROJECTS.filter((p) => p.isFeatured)
}
