'use client'

import { useState, useEffect } from 'react'
import { StyleCard } from '@/components/cards'
import { useRotatingStyles } from '@/components/quiz/hooks/useRotatingStyles'

export default function RotatingStyleCards() {
  const { currentStyles, rotationKey } = useRotatingStyles(5000) // Rotate every 3 seconds
  const [isVisible, setIsVisible] = useState(true)

  // Handle fade out/in cycle
  useEffect(() => {
    if (rotationKey > 0) { // Skip fade on initial load
      // Fade out
      setIsVisible(false)
      
      // After fade out completes, update content and fade in
      const fadeOutTimer = setTimeout(() => {
        setIsVisible(true)
      }, 800) // Match CSS transition duration
      
      return () => clearTimeout(fadeOutTimer)
    }
  }, [rotationKey])

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center justify-center lg:justify-end gap-8 overflow-x-auto scrollbar-hide">
        <div key={`rotation-${rotationKey}`} className="flex items-center justify-center lg:justify-end gap-8">
          {currentStyles.map((style, index) => (
            <div 
              key={`${rotationKey}-${style.id}-${index}`}
              className={`transition-all duration-800 ease-in-out flex-shrink-0 flex${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 300}ms` : '0ms'
              }}
            >
              <StyleCard 
                imageSrc={style.imageSrc}
                imageAlt={`${style.title}-style`}
                tags={style.keywords.slice(0, 3)} // Limit to 3 tags for display
                title={style.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
