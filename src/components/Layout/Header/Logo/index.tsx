import Link from 'next/link'

export default function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" aria-label="Eagle Nest Technologies home" className={`inline-flex shrink-0 flex-col leading-tight ${inverse ? 'text-white' : 'text-midnight_text dark:text-white'}`}>
      <span className="text-2xl font-bold tracking-tight">Eagle Nest</span>
      <span className="text-xs font-semibold tracking-[0.2em] uppercase">Technologies</span>
    </Link>
  )
}
