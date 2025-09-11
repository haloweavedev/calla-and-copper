import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Hero from '@/app/components/landing/Hero'
import HowItWorks from './components/landing/HowItWorks'
import FAQs from './components/landing/FAQs'
import Footer from './components/Footer'
import LandingCTA from './components/landing/LandingCTA'
import { Header } from './components/Header'

export default async function HomePage() {
  await auth.api.getSession({
    headers: await headers(),
  })


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
