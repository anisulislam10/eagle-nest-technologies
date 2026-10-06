'use client'
import { useRef, useState, type FormEvent } from 'react'
import Image from 'next/image'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDb, isFirebaseConfigured } from '@/lib/firebase/client'
import { quotationServices, validateQuotation, type QuotationForm } from '@/lib/content/quotations'
import { getImgPath } from '@/utils/image'

const field = 'mt-2 w-full rounded-lg border border-border dark:border-dark_border bg-white dark:bg-darkmode px-4 py-3 text-midnight_text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary'
export default function ContactForm() {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const submitting = useRef(false)
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    const form = event.currentTarget
    const data = new FormData(form)
    const text = (name: string) => String(data.get(name) || '').trim()
    const value: QuotationForm = { firstName: text('firstName'), lastName: text('lastName'), email: text('email'), service: text('service'), date: text('date'), time: text('time'), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC', message: text('message') }
    setError(''); setSuccess(false)
    const validation = validateQuotation(value)
    if (validation) { setError(validation); return }
    if (!isFirebaseConfigured) { setError('We cannot accept inquiries right now. Please try again later.'); return }
    submitting.current = true; setBusy(true)
    try {
      await addDoc(collection(getDb(), 'quotations'), { ...value, status: 'new', createdAt: serverTimestamp() })
      form.reset(); setSuccess(true)
    } catch { setError('Your request could not be submitted. Your details are still here; please try again.') }
    finally { submitting.current = false; setBusy(false) }
  }
  return <section className="dark:bg-darkmode md:pb-24 pb-16"><div className="container mx-auto max-w-6xl px-4"><div className="grid md:grid-cols-2 gap-10 items-start">
    <div><h2 className="text-3xl sm:text-4xl font-bold text-midnight_text dark:text-white mb-4">Plan Your Software Project</h2><p className="text-grey dark:text-white/60 mb-8">Tell us what you want to build. Your request goes directly to our team for review.</p>
      {error && <p role="alert" className="mb-5 rounded-lg bg-red-50 p-4 text-red-800">{error}</p>}
      {success && <p role="status" className="mb-5 rounded-lg bg-green-50 p-4 text-green-800">Thank you! Your quotation request has been submitted to our team.</p>}
      <form onSubmit={submit}><fieldset disabled={busy} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4"><label>First name *<input className={field} name="firstName" autoComplete="given-name" required maxLength={80} /></label><label>Last name *<input className={field} name="lastName" autoComplete="family-name" required maxLength={80} /></label></div>
        <label className="block">Email address *<input className={field} name="email" type="email" autoComplete="email" required maxLength={254} /></label>
        <label className="block">Service *<select className={field} name="service" required defaultValue=""><option value="" disabled>Choose a service</option>{quotationServices.map(service => <option key={service}>{service}</option>)}</select></label>
        <label className="block">Tell us about your project *<textarea className={field} name="message" required maxLength={5000} rows={5} placeholder="Your idea, features, timeline, and budget if you have one…" /></label>
        <div className="grid sm:grid-cols-2 gap-4"><label>Preferred date (optional)<input className={field} name="date" type="date" /></label><label>Preferred time (optional)<input className={field} name="time" type="time" /></label></div>
        <p className="text-sm text-grey dark:text-white/60">Preferred times are saved with your local time zone.</p>
        <button type="submit" className="rounded-lg bg-primary px-8 py-3 text-white hover:bg-blue-700 disabled:opacity-50">{busy ? 'Submitting…' : 'Request a quotation'}</button>
      </fieldset></form>
    </div><Image src={getImgPath('/images/contact-page/contact.jpg')} alt="Discuss your software project with our team" width={650} height={600} className="w-full h-auto rounded-lg hidden md:block" />
  </div></div></section>
}
