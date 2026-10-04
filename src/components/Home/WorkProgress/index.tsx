import Image from 'next/image'
import { getImgPath } from '@/utils/image'

export default function Progresswork({ isColorMode }: { isColorMode: Boolean }) {
  return (
    <section id="about" className={`scroll-mt-25 ${isColorMode ? 'bg-section dark:bg-darklight' : 'bg-white dark:bg-darkmode'}`}>
      <div className="container mx-auto max-w-6xl px-4 grid md:grid-cols-2 items-center gap-10">
        <Image src={getImgPath('/images/work-progress/progress-work.png')} alt="Planning and building digital products" width={550} height={450} className="hidden md:block w-full h-auto" />
        <div>
          <p className="text-primary font-semibold mb-5">About Eagle Nest Technologies</p>
          <h2 className="text-4xl font-bold text-midnight_text dark:text-white mb-6">A software startup built around your next big idea.</h2>
          <p className="text-grey dark:text-white/70 leading-relaxed mb-6">We help businesses turn ideas into useful software. From mobile and web apps to backend technologies and AI integration, we bring the pieces of your product together.</p>
          <ul className="space-y-4 text-midnight_text dark:text-white/80">
            <li><strong>Understand the problem.</strong> Define your users, priorities, and product scope.</li>
            <li><strong>Build the right solution.</strong> Choose a stack that fits your product and create it step by step.</li>
            <li><strong>Launch and improve.</strong> Test, deliver, and refine your software as your needs grow.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
