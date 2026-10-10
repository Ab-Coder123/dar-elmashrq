import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Home,
  FileText,
  Briefcase,
  FolderGit2,
  PhoneCall,
  Image as ImageIcon,
  Settings,
} from 'lucide-react'

export interface AdminNavItem {
  title: string
  titleAr: string
  href: string
  icon: LucideIcon
  badge?: string
  description: string
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    title: 'Overview',
    titleAr: 'لوحة التحكم',
    href: '/',
    icon: LayoutDashboard,
    description: 'System overview, status indicators, and content summary.',
  },
  {
    title: 'Home Page',
    titleAr: 'الصفحة الرئيسية',
    href: '/home',
    icon: Home,
    description: 'Manage Hero section, featured projects, and services preview.',
  },
  {
    title: 'About Us',
    titleAr: 'من نحن',
    href: '/about',
    icon: FileText,
    description: 'Manage corporate vision, mission, milestones, and history.',
  },
  {
    title: 'Services',
    titleAr: 'الخدمات',
    href: '/services',
    icon: Briefcase,
    description: 'Manage 8 corporate services and engineering disciplines.',
  },
  {
    title: 'Projects',
    titleAr: 'المشاريع',
    href: '/projects',
    icon: FolderGit2,
    badge: '35+',
    description: 'Manage project portfolio across Saudi Arabia, Egypt & Qatar.',
  },
  {
    title: 'Contact & Offices',
    titleAr: 'التواصل والفروع',
    href: '/contact',
    icon: PhoneCall,
    description: 'Manage headquarters info and regional offices (Riyadh, Cairo, Doha).',
  },
  {
    title: 'Media Library',
    titleAr: 'مكتبة الوسائط',
    href: '/media',
    icon: ImageIcon,
    description: 'Browse, inspect metadata, and manage image assets.',
  },
  {
    title: 'Site Settings',
    titleAr: 'إعدادات الموقع',
    href: '/settings',
    icon: Settings,
    description: 'Configure corporate branding, SEO defaults, and site preferences.',
  },
]
