'use client'
import { useDemoStore } from '@/lib/store/demo-store'

// We will create these components in the following subphases
import { Step1Style } from './_components/Step1Style'
import { Step2Details } from './_components/Step2Details'
import { Step3Upload } from './_components/Step3Upload'
import { Step4Results } from './_components/Step4Results'

export default function WelcomePage() {
  const { step } = useDemoStore()

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Style />
      case 2:
        return <Step2Details />
      case 3:
        return <Step3Upload />
      case 4:
        return <Step4Results />
      default:
        return <Step1Style />
    }
  }

  return (
    <div className={`w-full min-h-screen bg-white text-black flex flex-col items-center justify-center p-4 sm:p-8`}>
      <div className="w-full max-w-5xl">
        {renderStep()}
      </div>
    </div>
  )
}