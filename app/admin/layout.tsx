import { createClient } from '@/lib/supabase/server'
import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const prisma = new PrismaClient()

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const userFromDb = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  })

  if (userFromDb?.role !== 'ADMIN') {
    return redirect('/dashboard')
  }

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <Link href="/admin" className="block py-2 px-4 rounded hover:bg-gray-700">
                Products
              </Link>
            </li>
             <li>
              <Link href="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
                Back to App
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  )
} 