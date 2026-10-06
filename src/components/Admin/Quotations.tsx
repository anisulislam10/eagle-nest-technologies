'use client'
import { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, orderBy, query, updateDoc, type Timestamp } from 'firebase/firestore'
import { getDb } from '@/lib/firebase/client'
import type { QuotationForm } from '@/lib/content/quotations'
import styles from './admin.module.css'
interface Quotation extends QuotationForm { id: string; status: 'new' | 'reviewed' | 'closed'; createdAt: Timestamp | null }
export default function Quotations() {
  const [items, setItems] = useState<Quotation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [busy, setBusy] = useState(false)
  useEffect(() => onSnapshot(query(collection(getDb(), 'quotations'), orderBy('createdAt', 'desc')), snapshot => {
    setItems(snapshot.docs.map(item => ({ ...item.data(), id: item.id }) as Quotation)); setLoading(false); setError('')
  }, () => { setLoading(false); setError('Unable to load quotations. Confirm the latest firestore.rules are published and your account has admin access.') }), [])
  const selected = items.find(item => item.id === selectedId)
  const visible = items.filter(item => (filter === 'all' || item.status === filter) && `${item.firstName} ${item.lastName} ${item.email} ${item.service} ${item.message}`.toLowerCase().includes(search.toLowerCase()))
  async function status(value: Quotation['status']) {
    if (!selected || busy) return
    setBusy(true); setError('')
    try { await updateDoc(doc(getDb(), 'quotations', selected.id), { status: value }) }
    catch { setError('The status could not be saved. Please try again.') }
    finally { setBusy(false) }
  }
  const date = (value: Timestamp | null) => value?.toDate().toLocaleString() || 'Pending'
  return <>
    {error && <p role="alert" className={styles.error}>{error}</p>}
    <div className={styles.stats}>{[{ label: 'Total requests', value: items.length }, { label: 'New requests', value: items.filter(item => item.status === 'new').length }, { label: 'Closed', value: items.filter(item => item.status === 'closed').length }].map(stat => <div className={styles.stat} key={stat.label}><div><p>{stat.label}</p><strong>{loading ? '—' : stat.value}</strong></div></div>)}</div>
    {selected ? <div className={styles.panel}>
      <div className={styles.pageHeading}><div><p className={styles.eyebrow}>QUOTATION REQUEST</p><h2>{selected.firstName} {selected.lastName}</h2><p className={styles.muted}>Received {date(selected.createdAt)}</p></div><button disabled={busy} className={styles.secondary} onClick={() => setSelectedId(null)}>← Back to inbox</button></div>
      <dl className={styles.quotationDetails}>
        <div><dt>Email</dt><dd>{selected.email}</dd></div><div><dt>Service</dt><dd>{selected.service}</dd></div>
        <div><dt>Preferred date</dt><dd>{selected.date || 'Not specified'}</dd></div><div><dt>Preferred time</dt><dd>{selected.time ? `${selected.time} (${selected.timeZone})` : 'Not specified'}</dd></div>
        <div className={styles.quotationMessage}><dt>Project requirements</dt><dd>{selected.message}</dd></div>
      </dl>
      <label className={styles.quotationStatus}>Request status<select disabled={busy} className={styles.input} value={selected.status} onChange={event => void status(event.target.value as Quotation['status'])}><option value="new">New</option><option value="reviewed">Reviewed</option><option value="closed">Closed</option></select></label>
      {busy && <p role="status" className={styles.muted}>Saving status…</p>}
    </div> : <div className={styles.listPanel}>
      <div className={styles.listToolbar}><h2>Quotation inbox</h2><div><input aria-label="Search quotations" className={styles.input} value={search} onChange={event => setSearch(event.target.value)} placeholder="Search requests…" /><select aria-label="Filter quotation status" className={styles.input} value={filter} onChange={event => setFilter(event.target.value)}><option value="all">All statuses</option><option value="new">New</option><option value="reviewed">Reviewed</option><option value="closed">Closed</option></select></div></div>
      {loading ? <p role="status" className={styles.empty}>Loading quotations…</p> : !visible.length ? <div className={styles.empty}><h3>{items.length ? 'No matching requests' : 'No quotations yet'}</h3><p>Contact form submissions will appear here automatically.</p></div> : <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Contact</th><th>Service</th><th>Received</th><th>Status</th><th>Action</th></tr></thead><tbody>{visible.map(item => <tr key={item.id}><td><div className={styles.entry}><div><strong>{item.firstName} {item.lastName}</strong><small>{item.email}</small></div></div></td><td>{item.service}</td><td>{date(item.createdAt)}</td><td><span className={item.status === 'new' ? styles.draft : styles.published}>{item.status}</span></td><td><button className={styles.textButton} onClick={() => setSelectedId(item.id)}>View request<span className="sr-only"> from {item.firstName} {item.lastName}</span></button></td></tr>)}</tbody></table></div>}
      <div className={styles.listFooter}>{visible.length} of {items.length} requests</div>
    </div>}
  </>
}
