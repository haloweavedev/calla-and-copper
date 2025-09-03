'use client'

import { useState } from 'react'
import { Step1Style } from './_components/step1-style'
import { Step2Room } from './_components/step2-room'
import { saveOnboardingData } from './actions' // Import the action
import { useOnboardingStore } from '@/lib/store/onboarding-store'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const onboardingData = useOnboardingStore((state) => state)

  const nextStep = () => setStep((s) => s + 1)
  const prevStep = () => setStep((s) => s - 1)

  const handleFinish = async () => {
    if (onboardingData.style && onboardingData.roomType && onboardingData.budget) {
      await saveOnboardingData({
        style: onboardingData.style,
        roomType: onboardingData.roomType,
        budget: onboardingData.budget,
      })
    } else {
      console.error("Incomplete onboarding data")
      // You could show an error message to the user here
    }
  }

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl">
        {step === 1 && <Step1Style onNext={nextStep} />}
        {step === 2 && <Step2Room onBack={prevStep} onFinish={handleFinish} />}
      </div>
    </div>
    </>

  )
} 