'use client'
import { useEffect, useRef, useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable, type UploadTask } from 'firebase/storage'
import { getFirebaseStorage } from '@/lib/firebase/client'
import styles from './admin.module.css'
import { validateImageFile, imageExtensions } from '@/lib/content/image-upload'

export default function ImageUpload({ value, onChange, onBusyChange, disabled, folder }: {
  value: string; onChange: (url: string) => void; onBusyChange: (busy: boolean) => void; disabled: boolean; folder: 'projects' | 'team' | 'clients'
}) {
  const [progress, setProgress] = useState<number | null>(null)
  const [error, setError] = useState('')
  const task = useRef<UploadTask | null>(null)
  const mounted = useRef(true)
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; task.current?.cancel() } }, [])
  async function upload(file?: File) {
    if (!file) return
    setError('')
    const validation = validateImageFile(file)
    if (validation) { setError(validation); return }
    setProgress(0); onBusyChange(true)
    try {
      const extension = imageExtensions[file.type]
      const path = `content/${folder}/${crypto.randomUUID()}.${extension}`
      const transfer = uploadBytesResumable(ref(getFirebaseStorage(), path), file, { contentType: file.type })
      task.current = transfer
      await new Promise<void>((resolve, reject) => transfer.on('state_changed', snapshot => {
        if (mounted.current) setProgress(Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100))
      }, reject, resolve))
      const url = await getDownloadURL(transfer.snapshot.ref)
      if (mounted.current) onChange(url)
    } catch (cause) {
      const code = (cause as { code?: string }).code
      if (mounted.current) setError(code === 'storage/canceled' ? 'Upload canceled.' : code === 'storage/unauthorized'
        ? 'Upload denied. Publish storage.rules in Firebase Storage and confirm your admin access.'
        : 'Upload failed. Check your connection and Firebase Storage setup, bucket name, and billing. A failed preflight can mean the bucket is unavailable. You can also paste an HTTPS image URL below.')
    } finally {
      task.current = null
      if (mounted.current) { setProgress(null); onBusyChange(false) }
    }
  }
  return <div className={styles.upload}>
    {value && <img src={value} alt="Selected image preview" className={styles.preview} />}
    <label className={styles.uploadLabel}>
      <span className={styles.uploadSymbol} aria-hidden="true">↑</span>
      <strong>{value ? 'Replace image' : 'Upload an image'}</strong>
      <span>Choose from your computer</span>
      <small>JPG, PNG or WebP · Up to 5 MB</small>
      <input aria-label="Choose image from computer" type="file" accept="image/jpeg,image/png,image/webp" disabled={disabled || progress !== null} onChange={e => { void upload(e.target.files?.[0]); e.target.value = '' }} />
    </label>
    {progress !== null && <div className={styles.uploadProgress}><progress value={progress} max={100} aria-label="Image upload progress" /><p role="status">Uploading {progress}%</p><button type="button" onClick={() => task.current?.cancel()}>Cancel upload</button></div>}
    {error && <p role="alert" className={styles.uploadError}>{error}</p>}
    {value && progress === null && <button disabled={disabled} type="button" className={styles.textButton} onClick={() => onChange('')}>Remove image from entry</button>}
  </div>
}
