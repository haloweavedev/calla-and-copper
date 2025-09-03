import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Hero from '@/app/components/landing/Hero'
import HowItWorks from './components/landing/HowItWorks'
import FAQs from './components/landing/FAQs'
import Footer from './components/Footer'
import LandingCTA from './components/landing/LandingCTA'
import { Header } from './components/Header'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <>
      <Header />
      <Hero />
      <HowItWorks />
      <FAQs />
      <LandingCTA />
      <Footer />
    </>   
  )
}
