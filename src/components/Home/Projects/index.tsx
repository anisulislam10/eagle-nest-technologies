'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useManagedContent } from '@/lib/content/use-managed'
import { validUrl } from '@/lib/content/managed'

export default function Projects({ showAll = false }: { showAll?: boolean }) {
  const { items, loading, error } = useManagedContent('projects')
  return <section id="projects" className="scroll-mt-24 bg-section dark:bg-darklight">
    <div className="container mx-auto max-w-6xl px-4">
      <p className="text-primary text-center font-semibold mb-4">Our projects</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-midnight_text dark:text-white mb-12">Projects we have designed, built, and shipped</h2>
      {loading && <p role="status" className="text-center">Loading projects…</p>}
      {error && <p role="status" className="text-center">{error}</p>}
      {!loading && !error && !items.length && <p className="text-center text-grey dark:text-white/60">New projects will be shared here soon.</p>}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-7">
        {(showAll ? items : items.slice(0, 6)).map(item => <article key={item.id} className="flex flex-col overflow-hidden rounded-md bg-white shadow-service dark:bg-darkmode">
          {item.image && validUrl(item.image) ? <Image src={item.image} alt={item.alt || item.title} width={600} height={450} unoptimized className="aspect-[4/3] w-full object-cover" /> : <div className="aspect-[4/3] bg-primary/10 flex items-center justify-center text-primary text-4xl font-bold" aria-hidden="true">{'</>'}</div>}
          <div className="flex flex-1 flex-col gap-3 p-6">
            <p className="text-primary text-sm">{item.category}</p><h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-sm text-grey dark:text-white/60 whitespace-pre-line">{item.description}</p>
            <ul className="flex flex-wrap gap-2 mt-auto pt-3">{item.technologies.map(technology => <li key={technology} className="rounded-full border border-border dark:border-dark_border px-3 py-1 text-xs">{technology}</li>)}</ul>
            {item.link && validUrl(item.link) && <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold mt-3">Visit project <span aria-hidden="true">↗</span></a>}
          </div>
        </article>)}
      </div>
      {!showAll && items.length > 6 && <div className="text-center mt-10"><Link href="/portfolio" className="inline-block bg-primary text-white rounded-md px-8 py-3">View all projects</Link></div>}
    </div>
  </section>
}
