'use client'
import { useDemoStore, StyleSelection } from '@/lib/store/demo-store'
import { StyleQuiz, StyleProfile } from '@/components/quiz'


// We'll use the StyleQuiz component instead of hardcoded styles

export function Step1Style() {
  const { setStep, setData } = useDemoStore()

  // const handleSelect = (style: StyleSelection) => {
  //   setData({ style })
  //   setTimeout(() => setStep(2), 200)
  // }

  const handleStyleQuizComplete = (styleProfile: StyleProfile) => {
    // Store the style profile data
    console.log('Style Quiz Complete:', styleProfile)
    
    // Use the refinement as the selected style
    const selectedStyle = styleProfile.styleHierarchy.refinement as StyleSelection
    
    // Store the style and move to next step immediately
    setData({ style: selectedStyle })
    setStep(2)
  }

  return (
    <div className="text-center">
      <StyleQuiz onComplete={handleStyleQuizComplete} />
    </div>
  )
}