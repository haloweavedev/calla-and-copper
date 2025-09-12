'use client'

import { useSession } from '@/lib/auth-client'

export function DebugAuth() {
  const { data: session, isPending, error } = useSession()
  
  return (
    <div className="fixed bottom-4 left-4 bg-black text-white p-4 rounded text-xs max-w-sm">
      <h3 className="font-bold mb-2">Auth Debug:</h3>
      <p>isPending: {isPending ? 'true' : 'false'}</p>
      <p>hasSession: {session ? 'true' : 'false'}</p>
      <p>userEmail: {session?.user?.email || 'none'}</p>
      <p>error: {error ? error.message : 'none'}</p>
    </div>
  )
}