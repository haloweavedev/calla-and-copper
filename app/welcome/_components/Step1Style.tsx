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

  const handleStyleQuizComplete = (styleProfile: StyleProfile | undefined) => {
    // Store the style profile data
    console.log('Style Quiz Complete:', styleProfile)
    
    if (styleProfile) {
      // Map foundation style names to StyleSelection values
      const styleMapping: Record<string, StyleSelection> = {
        'Modern Clean': 'MODERN',
        'Cozy Traditional': 'VINTAGE',
        'Boho Eclectic': 'BOHO',
        'Warm Minimalist': 'SCANDINAVIAN',
        'Industrial Chic': 'INDUSTRIAL'
      }
      
      const foundationStyle = styleProfile.styleHierarchy.foundation
      const selectedStyle = styleMapping[foundationStyle] || 'MODERN' // Default fallback
      
      // Store the style and move to next step immediately
      setData({ style: selectedStyle })
    } else {
      // User skipped, no style selected
      setData({ style: null })
    }
    
    // Move to next step regardless of whether style was selected or skipped
    setStep(2)
  }

  return (
    <div className="text-center">
      <StyleQuiz onComplete={handleStyleQuizComplete} />
    </div>
  )
}