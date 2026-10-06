'use client'
import Link from 'next/link'
import ImageUpload from './ImageUpload'
import Quotations from './Quotations'
import styles from './admin.module.css'
import { useEffect, useState, type FormEvent } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth'
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { getDb, getFirebaseAuth, isFirebaseConfigured } from '@/lib/firebase/client'
import { blankItem, validateItem, type ManagedCollection, type ManagedItem } from '@/lib/content/managed'

const inputClass = styles.input
const buttonClass = styles.primary
function DashboardIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    projects: 'M3 7h7l2-3h9v16H3V7Z',
    team: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.87M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
    check: 'm5 12 4 4L19 6',
    draft: 'M8 3H4v18h16V9M14 3l7 7M8 15l2-5 7-7 4 4-7 7-6 1Z',
    external: 'M14 3h7v7M21 3l-9 9M10 3H3v18h18v-7',
  }
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.projects} /></svg>
}

export default function Admin() {
  const [showQuotations, setShowQuotations] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [checking, setChecking] = useState(isFirebaseConfigured)
  const [allowed, setAllowed] = useState(false)
  const [accessFailed, setAccessFailed] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  const [tab, setTab] = useState<Exclude<ManagedCollection, 'clients'>>('projects')
  const [items, setItems] = useState<ManagedItem[]>([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState<ManagedItem | null>(null)
  const [technologies, setTechnologies] = useState('')
  const [pendingDelete, setPendingDelete] = useState<ManagedItem | null>(null)

  useEffect(() => {
    if (!isFirebaseConfigured) return
    let generation = 0
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), async current => {
      const request = ++generation
      setUser(current); setAllowed(false); setChecking(true); setAccessFailed(false); setError(''); setEditing(null); setItems([])
      try {
        if (current) {
          const membership = await getDoc(doc(getDb(), 'admins', current.uid))
          if (request === generation) setAllowed(membership.exists() && membership.data().active === true)
        }
      } catch (cause) {
        if (request === generation) {
          setAccessFailed(true)
          const code = (cause as { code?: string }).code
          setError(code === 'permission-denied'
            ? 'Firestore denied access to your administrator record. Publish the project’s firestore.rules in Firebase Console → Firestore Database → Rules, then reload this page.'
            : code === 'unavailable'
              ? 'Firestore is unavailable. Check your connection and confirm that the default Firestore database has been created, then reload this page.'
              : `Administrator verification failed (${code || 'unknown error'}). Check the Firebase project configuration and Firestore database, then reload this page.`)
        }
      }
      finally { if (request === generation) setChecking(false) }
    })
    return () => { generation++; unsubscribe() }
  }, [])

  useEffect(() => {
    if (!allowed) return
    setLoading(true); setItems([])
    return onSnapshot(collection(getDb(), tab), snapshot => {
      setItems(snapshot.docs.map(item => ({ ...blankItem, ...item.data(), id: item.id }) as ManagedItem).sort((a, b) => a.order - b.order || a.title.localeCompare(b.title)))
      setLoading(false)
    }, cause => {
      const code = (cause as { code?: string })?.code
      setError(code === 'permission-denied'
        ? `Firestore denied access to the "${tab}" collection. Please publish the project's updated firestore.rules in Firebase Console → Firestore Database → Rules, then reload.`
        : `Unable to load content (${code || 'unknown error'}). Check your connection and administrator access.`)
      setLoading(false)
    })
  }, [allowed, tab])

  async function login(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('')
    try { await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password); setPassword('') }
    catch { setError('Sign-in failed. Check your email and password, then try again.') }
    finally { setBusy(false) }
  }
  async function logout() {
    setBusy(true); setError('')
    try { await signOut(getFirebaseAuth()); setPendingDelete(null); setNotice('') }
    catch { setError('Unable to sign out. Please try again.') }
    finally { setBusy(false) }
  }
  function edit(item: ManagedItem) { setEditing({ ...item }); setTechnologies(item.technologies.join(', ')); setNotice(''); setError(''); setPendingDelete(null) }
  async function save(event: FormEvent) {
    event.preventDefault()
    if (!editing || !allowed || uploading) return
    const value = { ...editing, title: editing.title.trim(), category: editing.category.trim(), description: editing.description.trim(), image: editing.image.trim(), link: editing.link.trim(), technologies: tab === 'projects' ? Array.from(new Set(technologies.split(',').map(v => v.trim()).filter(Boolean))) : [] }
    const validation = validateItem(value, tab)
    if (validation) { setError(validation); return }
    setBusy(true); setError(''); setNotice('')
    const { id, ...fields } = value
    try {
      const payload = { ...fields, updatedAt: serverTimestamp() }
      if (id) await setDoc(doc(getDb(), tab, id), payload)
      else await addDoc(collection(getDb(), tab), payload)
      setEditing(null); setNotice(value.published ? 'Saved and published to the website.' : 'Draft saved. It is hidden from the website.')
    } catch { setError('Save failed. Your changes are still in the form. Check your connection and administrator access.') }
    finally { setBusy(false) }
  }
  async function remove() {
    if (!pendingDelete || !allowed) return
    setBusy(true); setError('')
    try { await deleteDoc(doc(getDb(), tab, pendingDelete.id)); setPendingDelete(null); setNotice('Deleted successfully.') }
    catch { setError('Delete failed. Please try again.') }
    finally { setBusy(false) }
  }
  const update = (key: keyof ManagedItem, value: string | number | boolean) => setEditing(current => current ? { ...current, [key]: value } : current)

  const locked = busy || uploading
  const published = items.filter(item => item.published).length
  const visible = items.filter(item => (filter === 'all' || (filter === 'published' ? item.published : !item.published)) && `${item.title} ${item.category}`.toLowerCase().includes(search.toLowerCase()))
  const title = showQuotations ? 'Quotations' : tab === 'projects' ? 'Projects' : 'Team members'
  const singular = tab === 'projects' ? 'project' : 'team member'
  function changeTab(name: Exclude<ManagedCollection, 'clients'>) {
    if (locked || (editing && !window.confirm('Discard unsaved changes?'))) return
    setShowQuotations(false); setTab(name); setEditing(null); setPendingDelete(null); setError(''); setNotice(''); setSearch(''); setFilter('all'); setMenuOpen(false)
  }
  const messages = <>{error && <div role="alert" className={styles.error}>{error}</div>}{notice && <div role="status" className={styles.success}>{notice}</div>}</>

  if (!isFirebaseConfigured || checking || !user || !allowed) return <main className={styles.loginPage}>
    <div className={styles.loginBrand}><span className={styles.brandMark}>EN</span><div><strong>Eagle Nest</strong><span>TECHNOLOGIES</span></div></div>
    <div className={styles.loginCard}>
      <p className={styles.eyebrow}>ADMIN WORKSPACE</p><h1>Welcome back</h1><p className={styles.muted}>Your projects, your people, one place to manage it all.</p>
      {messages}
      {!isFirebaseConfigured ? <p role="status">Connect Firebase using ADMIN_SETUP.md to get started.</p> : checking ? <p role="status">Checking access…</p> : !user ? <form onSubmit={login} className={styles.fields}>
        <label>Email address<input className={inputClass} type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@eaglenesttechnologies.com" /></label>
        <label>Password<input className={inputClass} type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" /></label>
        <button disabled={busy} className={buttonClass}>{busy ? 'Signing in…' : 'Sign in to dashboard →'}</button>
      </form> : <div className={styles.fields}><p>{accessFailed ? 'Administrator access could not be verified.' : 'No active administrator membership was found.'}</p><p>Check <code className={styles.uid}>admins/{user.uid}</code> in Firestore and set <code>active</code> to boolean <code>true</code>.</p><button className={buttonClass} onClick={() => window.location.reload()}>Recheck access</button><button disabled={busy} className={styles.secondary} onClick={logout}>Sign out</button></div>}
      <Link href="/" className={styles.backLink}>← Back to website</Link>
    </div><p className={styles.loginFooter}>Eagle Nest Technologies · Content administration</p>
  </main>

  return <div className={styles.dashboard}>
    {menuOpen && <button className={styles.backdrop} aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
    <aside className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ''}`}>
      <Link href="/" className={styles.brand}><span className={styles.brandMark}>EN</span><span><strong>Eagle Nest</strong><small>TECHNOLOGIES</small></span></Link>
      <div className={styles.workspace}>Content workspace<span>ADMIN PANEL</span></div>
      <p className={styles.navLabel}>MANAGE CONTENT</p>
      <nav aria-label="Admin navigation" className={styles.navigation}>
        <button disabled={locked} aria-current={!showQuotations && tab === 'projects' ? 'page' : undefined} onClick={() => changeTab('projects')}><DashboardIcon name="projects" />Projects<span>→</span></button>
        <button disabled={locked} aria-current={!showQuotations && tab === 'team' ? 'page' : undefined} onClick={() => changeTab('team')}><DashboardIcon name="team" />Team members<span>→</span></button>
        <button disabled={locked} aria-current={showQuotations ? 'page' : undefined} onClick={() => { if (editing && !window.confirm('Discard unsaved changes?')) return; setEditing(null); setPendingDelete(null); setError(''); setNotice(''); setShowQuotations(true); setMenuOpen(false) }}><DashboardIcon name="draft" />Quotations<span>→</span></button>
      </nav>
      <div className={styles.sidebarBottom}><Link href="/" target="_blank" rel="noopener noreferrer"><DashboardIcon name="external" />View website ↗</Link><div className={styles.account}><span className={styles.avatar}>{user.email?.slice(0, 1).toUpperCase() || 'A'}</span><div><strong>Administrator</strong><small>{user.email}</small></div></div><button disabled={locked} onClick={logout}>Sign out</button></div>
    </aside>
    <div className={styles.mainArea}>
      <header className={styles.topbar}><div className={styles.breadcrumb}><button className={styles.menuButton} onClick={() => setMenuOpen(true)} aria-label="Open navigation" aria-expanded={menuOpen}>☰</button><span>Workspace</span><span>/</span><strong>{title}</strong></div><span className={styles.topBadge}>Administrator</span></header>
      <main className={styles.content}>
        <div className={styles.pageHeading}><div><p className={styles.eyebrow}>CONTENT MANAGEMENT</p><h1>{editing ? `${editing.id ? 'Edit' : 'New'} ${singular}` : title}</h1><p className={styles.muted}>{showQuotations ? 'Read and manage requests sent through your contact form.' : tab === 'projects' ? 'Showcase the work you are proud of.' : 'Introduce the people behind Eagle Nest.'}</p></div>{!showQuotations && !editing && <button disabled={locked} className={buttonClass} onClick={() => edit({ ...blankItem, order: items.length ? Math.min(10000, Math.max(...items.map(item => item.order)) + 1) : 0 })}>+ Add {singular}</button>}</div>
        {messages}
        {showQuotations ? <Quotations /> : <>
        {!editing && <div className={styles.stats}>{[{label: `Total ${tab === 'projects' ? 'projects' : 'members'}`, value: items.length, icon: tab}, {label: 'Published', value: published, icon: 'check'}, {label: 'Drafts', value: items.length - published, icon: 'draft'}].map(stat => <div key={stat.label} className={styles.stat}><div><p>{stat.label}</p><strong>{loading ? '—' : stat.value}</strong></div><span className={styles.statIcon}><DashboardIcon name={stat.icon} /></span></div>)}</div>}
        {editing ? <form onSubmit={save}>
          <div className={styles.editorGrid}>
            <div className={styles.panel}><div className={styles.panelHeading}><h2>{tab === 'projects' ? 'Project details' : 'Personal details'}</h2><p>Give visitors a clear picture of {tab === 'projects' ? 'your work' : 'this team member'}.</p></div>
              <fieldset disabled={locked} className={styles.fields}>
                <label>{tab === 'projects' ? 'Project title' : 'Full name'}<input required maxLength={120} className={inputClass} value={editing.title} onChange={e => update('title', e.target.value)} /></label>
                <label>{tab === 'projects' ? 'Category' : 'Role / job title'}<input required maxLength={120} className={inputClass} value={editing.category} onChange={e => update('category', e.target.value)} placeholder={tab === 'projects' ? 'e.g. Mobile application' : 'e.g. Flutter Developer'} /></label>
                <label>{tab === 'projects' ? 'Description' : 'Biography'}<textarea required maxLength={2000} rows={7} className={inputClass} value={editing.description} onChange={e => update('description', e.target.value)} /><small>{editing.description.length}/2,000 characters</small></label>
                {tab === 'projects' && <label>Technologies<input className={inputClass} value={technologies} onChange={e => setTechnologies(e.target.value)} placeholder="React, Next.js, Firebase" /><small>Separate each technology with a comma.</small></label>}
                <label>{tab === 'projects' ? 'Project website' : 'Profile / LinkedIn URL'}<input type="url" placeholder="https://…" maxLength={2000} className={inputClass} value={editing.link} onChange={e => update('link', e.target.value)} /><small>Optional</small></label>
              </fieldset>
            </div>
            <div className={styles.editorSide}>
              <div className={styles.panel}><div className={styles.panelHeading}><h2>{tab === 'projects' ? 'Cover image' : 'Profile photo'}</h2><p>Upload from your computer or use an image URL.</p></div>
                <ImageUpload value={editing.image} onChange={value => update('image', value)} onBusyChange={setUploading} disabled={busy} folder={tab} />
                <fieldset disabled={locked} className={styles.fields}><label>Image URL<input type="url" placeholder="https://…" maxLength={2000} className={inputClass} value={editing.image} onChange={e => update('image', e.target.value)} /></label><label>Image description<input maxLength={200} className={inputClass} value={editing.alt} onChange={e => update('alt', e.target.value)} placeholder="Describe the image for accessibility" /></label></fieldset>
              </div>
              <div className={styles.panel}><div className={styles.panelHeading}><h2>Publishing</h2><p>Control when and where this entry appears.</p></div><fieldset disabled={locked} className={styles.fields}><label className={styles.publishToggle}><input type="checkbox" checked={editing.published} onChange={e => update('published', e.target.checked)} /><span>Publish on website<small>{editing.published ? 'Visible to all visitors after saving.' : 'Only administrators can see this draft.'}</small></span></label><label>Display order<input type="number" required min={0} max={10000} step={1} className={inputClass} value={editing.order} onChange={e => update('order', Number(e.target.value))} /><small>Lower numbers appear first.</small></label></fieldset></div>
            </div>
          </div>
          <div className={styles.saveBar}><span>{uploading ? 'Uploading image — please wait…' : 'Changes go live when you save.'}</span><div><button type="button" disabled={locked} className={styles.secondary} onClick={() => { if (window.confirm('Discard unsaved changes?')) setEditing(null) }}>Cancel</button><button disabled={locked} className={buttonClass} type="submit">{busy ? 'Saving…' : editing.published ? 'Save & publish' : 'Save draft'}</button></div></div>
        </form> : <div className={styles.listPanel}>
          <div className={styles.listToolbar}><h2>All {title.toLowerCase()}</h2><div><input aria-label="Search content" className={inputClass} placeholder="Search by name or category…" value={search} onChange={e => setSearch(e.target.value)} /><select aria-label="Filter by status" className={inputClass} value={filter} onChange={e => setFilter(e.target.value)}><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Drafts</option></select></div></div>
          {loading ? <p role="status" className={styles.empty}>Loading content…</p> : !visible.length ? <div className={styles.empty}><DashboardIcon name={tab} /><h3>{items.length ? 'No matching entries' : `Your ${title.toLowerCase()} belong here`}</h3><p>{items.length ? 'Try a different search or status filter.' : `Add your first ${singular} to get started.`}</p></div> : <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>{tab === 'projects' ? 'Project' : 'Team member'}</th><th>Status</th><th>Order</th><th>Actions</th></tr></thead><tbody>{visible.map(item => <tr key={item.id}><td><div className={styles.entry}>{item.image ? <img src={item.image} alt="" /> : <span className={styles.entryPlaceholder}><DashboardIcon name={tab} /></span>}<div><strong>{item.title}</strong><small>{item.category}</small></div></div></td><td><span className={item.published ? styles.published : styles.draft}>{item.published ? 'Published' : 'Draft'}</span></td><td>{item.order}</td><td><div className={styles.rowActions}><button disabled={locked} onClick={() => edit(item)}>Edit<span className="sr-only"> {item.title}</span></button><button disabled={locked} onClick={() => setPendingDelete(item)}>Delete<span className="sr-only"> {item.title}</span></button></div></td></tr>)}</tbody></table></div>}
          <div className={styles.listFooter}>{visible.length} of {items.length} entries</div>
        </div>}
        {pendingDelete && <div role="alert" className={styles.deleteConfirm}><h2>Delete {singular}?</h2><p>“{pendingDelete.title}” will be removed from the website. This cannot be undone.</p><div><button disabled={locked} onClick={remove} className={styles.danger}>{busy ? 'Deleting…' : 'Delete entry'}</button><button disabled={locked} onClick={() => setPendingDelete(null)} className={styles.secondary}>Keep entry</button></div></div>}
        </>}
      </main>
    </div>
  </div>
}
