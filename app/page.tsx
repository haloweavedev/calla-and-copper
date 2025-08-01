import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="w-full text-center flex flex-col items-center bg-gray-50 py-20">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Design Your Perfect Space, Intelligently.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Stop guessing. Start designing. Calla & Copper uses AI to find furniture that
          perfectly fits your style, room, and budget.
        </p>
        <Link
          href="/login"
          className="px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Find Your Style
        </Link>
      </div>
    </div>
  )
}
