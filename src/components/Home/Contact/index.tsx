import Link from 'next/link'

export default function Contactform() {
  return (
    <section className="bg-darkmode dark:bg-darklight text-white">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <p className="text-white/70 mb-5">Build with Eagle Nest Technologies</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to turn your idea into software?</h2>
        <p className="text-white/70 max-w-2xl mx-auto mb-9">Tell us about your mobile app, web platform, backend, or AI integration. Let’s define what your product needs and how to build it.</p>
        <Link href="/contact" className="inline-block rounded-lg bg-primary px-8 py-3 text-white hover:bg-blue-700">Discuss Your Project</Link>
      </div>
    </section>
  )
}
