import type { Metadata } from 'next'
import Admin from '@/components/Admin'
export const metadata: Metadata = { title: 'Admin | Eagle Nest Technologies', robots: { index: false, follow: false } }
export default function AdminPage() { return <Admin /> }
