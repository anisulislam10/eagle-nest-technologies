'use client'

import { useState } from 'react'
import { useManagedContent } from '@/lib/content/use-managed'
import { defaultClients } from '@/lib/content/defaults'
import type { ManagedItem } from '@/lib/content/managed'
import styles from './clients.module.css'

function ClientItem({
  client,
  ariaHidden,
}: {
  client: ManagedItem
  ariaHidden?: boolean
}) {
  const content = (
    <>
      <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-white dark:bg-darkmode border border-border/80 dark:border-dark_border p-1 overflow-hidden shadow-xs">
        {client.image ? (
          <img
            src={client.image}
            alt=""
            width={24}
            height={24}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        ) : (
          <span className="text-[11px] font-bold text-primary">
            {client.title.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-xs sm:text-sm font-semibold whitespace-nowrap text-midnight_text dark:text-white group-hover:text-primary transition-colors">
          {client.title}
        </span>
        {client.category && (
          <span className="text-[10px] sm:text-[11px] text-grey dark:text-white/50 whitespace-nowrap">
            {client.category}
          </span>
        )}
      </div>
    </>
  )

  const containerClasses =
    'group flex shrink-0 items-center gap-3 rounded-full border border-border dark:border-dark_border bg-section dark:bg-darklight px-4 py-2 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-white dark:hover:bg-darkmode transition-all duration-200 shadow-xs'

  return (
    <li aria-hidden={ariaHidden} className="mx-2 flex shrink-0 items-center">
      {client.link ? (
        <a
          href={client.link}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={ariaHidden ? -1 : 0}
          className={containerClasses}
        >
          {content}
        </a>
      ) : (
        <div className={containerClasses}>{content}</div>
      )}
    </li>
  )
}

function MarqueeRow({
  items,
  direction,
  paused,
}: {
  items: ManagedItem[]
  direction: 'forward' | 'reverse'
  paused?: boolean
}) {
  const repetitions = Math.max(6, Math.ceil(24 / Math.max(1, items.length)))

  return (
    <div
      className={`${styles.marquee} ${direction === 'reverse' ? styles.reverse : ''} ${paused ? styles.paused : ''}`}
    >
      <ul
        className={styles.track}
        style={{ '--reps': repetitions } as React.CSSProperties}
      >
        {Array.from({ length: repetitions }).map((_, repetition) =>
          items.map(client => (
            <ClientItem
              key={`${client.id || client.title}-${repetition}`}
              client={client}
              ariaHidden={repetition > 0}
            />
          )),
        )}
      </ul>
    </div>
  )
}

export default function Clients() {
  const { items } = useManagedContent('clients')
  const [paused, setPaused] = useState(false)

  // Dynamic content from Firestore when published, with bundled defaults as fallback
  const publishedLive = items.filter(item => item.published && (item.title || item.image))
  const clientList = publishedLive.length > 0 ? publishedLive : defaultClients

  // Split into two lines for upper and below marquee animation
  const top = clientList.filter((_, index) => index % 2 === 0)
  const bottom = clientList.filter((_, index) => index % 2 === 1)

  const upperItems = top.length > 0 ? top : clientList
  const lowerItems = bottom.length > 0 ? bottom : upperItems

  return (
    <section id="clients" className="scroll-mt-24 bg-white dark:bg-darkmode">
      <div className="container mx-auto max-w-6xl px-4">
        <div
          className="flex items-center justify-center gap-2 mb-4"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="800"
        >
          <span className="w-3 h-3 rounded-full bg-success" aria-hidden="true" />
          <p className="font-medium text-midnight_text text-sm dark:text-white/50">
            Our clients
          </p>
        </div>
        <h2
          className="text-3xl sm:text-4xl font-bold text-center text-midnight_text dark:text-white mb-12"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          The businesses we build with
        </h2>

        <div className="space-y-4">
          <MarqueeRow items={upperItems} direction="forward" paused={paused} />
          <MarqueeRow items={lowerItems} direction="reverse" paused={paused} />
        </div>

        <div className="text-center mt-6">
          <button
            type="button"
            aria-pressed={paused}
            className="text-xs text-grey dark:text-white/60 hover:text-primary dark:hover:text-white transition-colors underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            onClick={() => setPaused(value => !value)}
          >
            {paused ? 'Resume animation' : 'Pause animation'}
          </button>
        </div>
      </div>
    </section>
  )
}
