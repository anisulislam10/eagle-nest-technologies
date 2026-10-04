import type { CSSProperties } from 'react'
import styles from './technologies.module.css'

const stacks = [
  { title: 'Mobile', icon: 'mobile', label: 'Built for every screen', description: 'Native-feeling experiences for iOS and Android.', tools: ['React Native', 'Flutter', 'Dart'], color: '#0284c7', tint: 'rgba(2,132,199,.10)' },
  { title: 'Web & Backend', icon: 'code', label: 'From interface to API', description: 'Fast interfaces backed by dependable business logic.', tools: ['React', 'Next.js', 'Node.js', 'Express', 'PHP'], color: '#7c3aed', tint: 'rgba(124,58,237,.10)' },
  { title: 'Full-Stack', icon: 'layers', label: 'Connected end to end', description: 'One connected stack for your complete product.', tools: ['MERN', 'PERN'], color: '#0d9488', tint: 'rgba(13,148,136,.10)' },
  { title: 'Databases & Services', icon: 'database', label: 'A foundation to grow on', description: 'Organized data and services that power your application.', tools: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase'], color: '#d97706', tint: 'rgba(217,119,6,.10)' },
]

function StackIcon({ name }: { name: string }) {
  return <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'mobile' && <><rect x="8" y="3" width="16" height="26" rx="4" /><path d="M13 7h6M14 25h4M12 15l3 3 6-7" /></>}
    {name === 'code' && <><rect x="3" y="5" width="26" height="22" rx="4" /><path d="M3 11h26M8 8h.01M12 8h.01M11 16l-3 3 3 3M21 16l3 3-3 3M18 15l-4 8" /></>}
    {name === 'layers' && <path d="M16 3 2 10l14 7 14-7L16 3ZM3 17l13 7 13-7M3 23l13 7 13-7" />}
    {name === 'database' && <><ellipse cx="16" cy="7" rx="11" ry="4" /><path d="M5 7v18c0 2.2 4.9 4 11 4s11-1.8 11-4V7M5 16c0 2.2 4.9 4 11 4s11-1.8 11-4" /></>}
  </svg>
}

export default function Technologies() {
  return (
    <section id="technologies" className="scroll-mt-24 bg-white dark:bg-darkmode">
      <div className="container mx-auto max-w-6xl px-4">
        <p className="text-primary font-semibold text-center mb-4">Our technologies</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-midnight_text dark:text-white mb-5">The right tools for your product</h2>
        <p className="text-grey dark:text-white/70 text-center max-w-2xl mx-auto mb-12">From your first mobile screen to the systems behind it, we choose the technology that fits your product and where you want to take it.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stacks.map((stack, index) => (
            <article key={stack.title} className={`${styles.card} bg-white dark:bg-darklight border-border dark:border-dark_border`} style={{ '--accent': stack.color, '--tint': stack.tint, '--delay': `${index * -1.1}s` } as CSSProperties}>
              <div className={styles.artwork} aria-hidden="true">
                <span className={styles.orbit} /><span className={styles.spark} /><span className={styles.smallSpark} />
                <span className={styles.icon}><StackIcon name={stack.icon} /></span>
                <span className={`${styles.codeMark} text-grey dark:text-white/50`}>{['</>', '{ }', '[ ]', '01'][index]}</span>
              </div>
              <p className={`${styles.eyebrow} text-grey dark:text-white/60`}>{stack.label}</p>
              <h3 className="text-xl font-bold text-midnight_text dark:text-white mt-2 mb-3">{stack.title}</h3>
              <p className="text-sm leading-relaxed text-grey dark:text-white/65 mb-6">{stack.description}</p>
              <ul className={styles.tools} aria-label={`${stack.title} technologies`}>
                {stack.tools.map(tool => <li key={tool} className={`${styles.tool} text-midnight_text dark:text-white/85 border-border dark:border-dark_border`}><span className={styles.dot} aria-hidden="true" />{tool}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <p className="text-sm text-grey dark:text-white/60 text-center max-w-2xl mx-auto mt-8">MERN pairs MongoDB with Express, React, and Node.js. PERN uses the same foundation with PostgreSQL.</p>
      </div>
    </section>
  )
}
