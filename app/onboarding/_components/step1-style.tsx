'use client'

import { useOnboardingStore, Style } from '@/lib/store/onboarding-store'

const styles = [
  { name: Style.SCANDINAVIAN, image: '/images/scandinavian.jpg', label: 'Scandinavian' },
  { name: Style.INDUSTRIAL, image: '/images/industrial.jpg', label: 'Industrial' },
  { name: Style.BOHO, image: '/images/boho.jpg', label: 'Bohemian' },
  { name: Style.MODERN, image: '/images/modern.jpg', label: 'Modern' },
  { name: Style.JAPANDI, image: '/images/japandi.jpg', label: 'Japandi' },
]

interface Step1StyleProps {
  onNext: () => void
}

export function Step1Style({ onNext }: Step1StyleProps) {
  const { setStore, style: selectedStyle } = useOnboardingStore()

  const handleSelect = (style: Style) => {
    setStore({ style })
    setTimeout(() => onNext(), 300) // Go to next step after a brief delay
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">Let&apos;s get to know your style</h1>
      <p className="text-gray-600 mb-8">Choose a room you vibe with.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {styles.map((style) => (
          <div
            key={style.name}
            onClick={() => handleSelect(style.name)}
            className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedStyle === style.name ? 'ring-4 ring-indigo-500' : 'ring-1 ring-gray-200'
            }`}
          >
            {/* Placeholder for Image */}
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">{style.label}</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-white font-semibold text-lg">{style.label}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 