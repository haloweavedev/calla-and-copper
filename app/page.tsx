import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Hero from '@/app/components/Hero'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <>
      <Hero />
    </>
  )
}
