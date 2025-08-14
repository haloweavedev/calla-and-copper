import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { logout } from './actions'
import Image from 'next/image'

export async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="px-8 py-3 flex justify-between items-center w-full">
      <Link href="/" className="text-xl font-bold text-gray-800">
        <Image src="/cnc-logomark.png" alt="Calla & Copper" width={50} height={50} />
      </Link> 
      <div className="flex items-center gap-4">
        <span className="text-md text-gray-600 px-4">How it works</span>
        <span className="text-md text-gray-600 px-4">FAQ</span>
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
          <div className="flex items-center">
            <Link
              href="/login"
              className="px-4 py-2 text-md font-medium text-black"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-md font-medium text-white bg-[#2D5016] rounded-full hover:bg-[#2D5016]/80"
            >
              Register
            </Link>
          </div>

        )}
      </div>
    </nav>
  )
} 