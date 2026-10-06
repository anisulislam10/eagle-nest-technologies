'use client'
import Image from 'next/image'
import { useManagedContent } from '@/lib/content/use-managed'
import { validUrl } from '@/lib/content/managed'

export default function Team() {
  const { items, loading, error } = useManagedContent('team')
  return <section id="team" className="scroll-mt-24 bg-white dark:bg-darkmode">
    <div className="container mx-auto max-w-6xl px-4">
      <p className="text-primary text-center font-semibold mb-4">Our team</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">The people behind your product</h2>
      {loading && <p role="status" className="text-center">Loading team…</p>}
      {error && <p role="status" className="text-center">{error}</p>}
      {!loading && !error && !items.length && <p className="text-center text-grey dark:text-white/60">Meet our team here soon.</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {items.map(item => <article key={item.id} className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-section text-center shadow-sm dark:border-dark_border dark:bg-darklight">
          <div className="relative h-72 w-full shrink-0 bg-primary/5 dark:bg-white/5">
            {item.image && validUrl(item.image) ? <Image src={item.image} alt={item.alt || item.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" unoptimized className="object-contain object-center p-4" /> : <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-primary" aria-hidden="true">{item.title.slice(0, 1)}</div>}
          </div>
          <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="font-bold text-xl">{item.title}</h3><p className="text-primary mt-2">{item.category}</p>
          <p className="text-grey dark:text-white/60 text-sm mt-4 whitespace-pre-line">{item.description}</p>
          {item.link && validUrl(item.link) && <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-auto inline-block pt-6 font-semibold text-primary">View profile <span aria-hidden="true">↗</span></a>}
          </div>
        </article>)}
      </div>
    </div>
  </section>
}
