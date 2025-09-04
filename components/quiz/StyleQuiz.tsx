'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StyleCard } from '@/components/cards'
import { useStyleProfile } from './hooks/useStyleProfile'
import { StyleProfile } from './types'
import { useDemoStore } from '@/lib/store/demo-store'
import Link from 'next/link'

interface StyleQuizProps {
  onComplete?: (styleProfile: StyleProfile | undefined) => void
}

export function StyleQuiz({ onComplete }: StyleQuizProps) {
  const {
    availableOptions,
    selectedStyle,
    isComplete,
    finalStyleProfile,
    selectOption,
    skipQuiz,
  } = useStyleProfile()

  const { setData } = useDemoStore()

  // Handle option selection
  const handleOptionSelect = (optionId: string) => {
    selectOption(optionId)
  }

  // Call onComplete callback when quiz completes and save to global store
  useEffect(() => {
    if (isComplete) {
      // Save to global store (only if we have a style profile)
      if (finalStyleProfile) {
        setData({ styleProfile: finalStyleProfile })
      }
      
      // Call the original onComplete callback if provided
      if (onComplete) {
        onComplete(finalStyleProfile)
      }
    }
  }, [isComplete, finalStyleProfile, onComplete, setData])

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      {/* Quiz Content */}
      <div className="text-center mb-12 flex flex-row justify-between">
        <div className='flex flex-col items-start justify-start'>
            <motion.h1 
            className="text-3xl mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            >
            What&apos;s your style foundation?
            </motion.h1>
            
            <motion.p 
            className="text-lg uppercase font-light"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            >
            Choose the base style that speaks to you most
            </motion.p>
            
            <motion.p 
            className="text-md text-black/60 mt-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            >or press skip if uncertain
            </motion.p>
        </div>
        <div className='flex flex-col items-end justify-end gap-2'>
            <motion.h1 
            className="text-2xl uppercase font-medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            >
                style selection
            </motion.h1>
            <div className='bg-brand-forest text-white text-xs px-6 py-0 flex flex-row items-center justify-center gap-2'>
                <span>1</span>
                <span>of</span>
                <span>3</span>
            </div>
                  {/* Navigation */}      
              <button
                onClick={skipQuiz}
                className="cursor-pointer hover:bg-gray-200 px-4 py-1 rounded-md flex items-center justify-center"
              >
                Skip →
              </button>
        </div>
      </div>

      {/* Style Options Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {availableOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 200
              }}
            >
              <StyleCard
                imageSrc={option.imageSrc}
                imageAlt={option.title}
                tags={option.keywords}
                title={option.title}
                variant="selectable"
                selected={selectedStyle === option.id}
                onClick={() => handleOptionSelect(option.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <div className="flex items-center justify-start"> 
        <Link
          href="/"
          className="px-6 py-2 font-medium transition-all duration-200 bg-white text-black/80 border-2 border-black/80 hover:bg-black/80 hover:text-white cursor-pointer"
        >
          ← Back to Home
        </Link>
      </div>

    </motion.div>
  )
}