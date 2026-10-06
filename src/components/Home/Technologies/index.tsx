import Image from 'next/image'
import { getImgPath } from '@/utils/image'
import styles from './technologies.module.css'

const technologies = [
  { name: 'React.js', icon: 'react' },
  { name: 'Flutter', icon: 'flutter' },
  { name: 'Next.js', icon: 'nextjs-icon' },
  { name: 'Firebase', icon: 'firebase' },
  { name: 'Node.js', icon: 'nodejs-icon' },
  { name: 'Supabase', icon: 'supabase-icon' },
  { name: 'Dart', icon: 'dart' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'React Native', icon: 'react' },
  { name: 'MongoDB', icon: 'mongodb-icon' },
  { name: 'PHP', icon: 'php' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'Express.js', icon: 'express' },
]

function TechnologyItem({
  technology,
  ariaHidden,
}: {
  technology: (typeof technologies)[number]
  ariaHidden?: boolean
}) {
  return (
    <li
      aria-hidden={ariaHidden}
      className="mx-2 flex shrink-0 items-center gap-2 rounded-full border border-border dark:border-dark_border bg-section dark:bg-darklight px-3 py-1.5"
    >
      <Image
        src={getImgPath(`/images/technologies/${technology.icon}.svg`)}
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 object-contain"
      />
      <span className="text-xs font-medium whitespace-nowrap text-midnight_text dark:text-white/80">
        {technology.name}
      </span>
    </li>
  )
}

function MarqueeRow({
  items,
  direction,
}: {
  items: typeof technologies
  direction: 'forward' | 'reverse'
}) {
  // The track shifts by exactly one repetition. With 6 repetitions, 5 of them
  // stay on screen, which covers the viewport even on very wide displays.
  const repetitions = 6

  return (
    <div className={`${styles.marquee} ${direction === 'reverse' ? styles.reverse : ''}`}>
      <ul className={styles.track} style={{ '--reps': repetitions } as React.CSSProperties}>
        {Array.from({ length: repetitions }).map((_, repetition) =>
          items.map(technology => (
            <TechnologyItem
              key={`${technology.name}-${repetition}`}
              technology={technology}
              ariaHidden={repetition > 0}
            />
          )),
        )}
      </ul>
    </div>
  )
}

export default function Technologies() {
  return (
    <section id="technologies" className="scroll-mt-24 bg-white dark:bg-darkmode">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-3 h-3 rounded-full bg-success" aria-hidden="true" />
          <p className="font-medium text-midnight_text text-sm dark:text-white/50">Our technologies</p>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-midnight_text dark:text-white mb-12">
          The right tools for your product
        </h2>
        <div className="space-y-4">
          <MarqueeRow items={technologies.slice(0, 7)} direction="forward" />
          <MarqueeRow items={technologies.slice(7)} direction="reverse" />
        </div>
      </div>
    </section>
  )
}
