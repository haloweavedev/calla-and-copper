import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Hero from '@/app/components/Hero'
import HowItWorks from './components/HowItWorks'
import FAQs from './components/FAQs'
import Footer from './components/Footer'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <>
      <Hero />
      <HowItWorks />
      <FAQs />
      <Footer />
    </>   
  )
}
