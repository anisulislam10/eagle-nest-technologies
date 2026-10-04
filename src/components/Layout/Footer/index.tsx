import Link from 'next/link'
import Logo from '../Header/Logo'

export default function Footer() {
  return (
    <footer className="bg-darkmode border-t border-dark_border text-white">
      <div className="container mx-auto max-w-6xl px-4 py-14 grid md:grid-cols-3 gap-10">
        <div><Logo inverse /><p className="text-white/60 mt-6 leading-relaxed">A software development startup building mobile apps, web applications, backend systems, and AI integrations.</p></div>
        <div><h2 className="font-bold text-xl mb-5">Explore</h2><nav className="flex flex-col gap-3 text-white/70"><Link href="/about">About us</Link><Link href="/services">Our services</Link><Link href="/#technologies">Our technologies</Link><Link href="/contact">Contact</Link></nav></div>
        <div><h2 className="font-bold text-2xl mb-5">Let’s build your next product.</h2><p className="text-white/60 mb-6">Mobile. Web. Backend. AI.</p><Link href="/contact" className="inline-block rounded-lg bg-primary px-6 py-3 hover:bg-blue-700">Discuss Your Project</Link></div>
      </div>
      <div className="border-t border-dark_border px-4 py-6 text-center text-sm text-white/50">
        <p>© {new Date().getFullYear()} Eagle Nest Technologies. All rights reserved.</p>
      </div>
    </footer>
  )
}
