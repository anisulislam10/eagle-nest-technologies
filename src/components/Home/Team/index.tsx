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
        {items.map(item => <article key={item.id} className="rounded-md bg-section dark:bg-darklight p-7 text-center">
          {item.image && validUrl(item.image) ? <Image src={item.image} alt={item.alt || item.title} width={160} height={160} unoptimized className="rounded-md w-32 h-32 object-contain object-center p-3 mx-auto mb-5" /> : <div className="rounded-full w-32 h-32 mx-auto mb-5 bg-primary/10 flex items-center justify-center text-primary text-4xl font-bold" aria-hidden="true">{item.title.slice(0, 1)}</div>}
          <h3 className="font-bold text-xl">{item.title}</h3><p className="text-primary mt-2">{item.category}</p>
          <p className="text-grey dark:text-white/60 text-sm mt-4 whitespace-pre-line">{item.description}</p>
          {item.link && validUrl(item.link) && <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-5 font-semibold text-primary">View profile <span aria-hidden="true">↗</span></a>}
        </article>)}
      </div>
    </div>
  </section>
}
