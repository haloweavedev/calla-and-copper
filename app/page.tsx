import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import Hero from '@/app/components/landing/Hero'
import HowItWorks from './components/landing/HowItWorks'
import FAQs from './components/landing/FAQs'
import Footer from './components/Footer'
import LandingCTA from './components/landing/LandingCTA'
import { Header } from './components/Header'

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
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
