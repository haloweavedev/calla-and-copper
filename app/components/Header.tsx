import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { logout } from './actions'

export async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          Calla & Copper
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600">{user.email}</span>
              <form action={logout}>
                <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Get Started
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
} 