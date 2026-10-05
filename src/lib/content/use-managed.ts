'use client'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { getDb, isFirebaseConfigured } from '@/lib/firebase/client'
import { blankItem, type ManagedCollection, type ManagedItem } from './managed'

export function useManagedContent(name: ManagedCollection) {
  const [items, setItems] = useState<ManagedItem[]>([])
  const [loading, setLoading] = useState(isFirebaseConfigured)
  const [error, setError] = useState('')
  useEffect(() => {
    if (!isFirebaseConfigured) return
    setLoading(true)
    return onSnapshot(query(collection(getDb(), name), where('published', '==', true)), snapshot => {
      setItems(snapshot.docs.map(doc => ({ ...blankItem, ...doc.data(), id: doc.id }) as ManagedItem).sort((a, b) => a.order - b.order || a.title.localeCompare(b.title)))
      setLoading(false)
      setError('')
    }, () => { setError('This content is temporarily unavailable. Please try again later.'); setLoading(false) })
  }, [name])
  return { items, loading, error }
}
