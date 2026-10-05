'use client'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import ScrollToTop from '@/components/ScrollToTop'
export default function SiteChrome({ children }: { children: ReactNode }) {
  const path = usePathname()
  if (path === '/admin' || path.startsWith('/admin/')) return <>{children}</>
  return <><Header />{children}<Footer /><ScrollToTop /></>
}
