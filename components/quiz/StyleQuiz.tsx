'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StyleCard } from '@/components/cards'
import { useStyleProfile } from './hooks/useStyleProfile'
import { StyleProfile } from './types'

interface StyleQuizProps {
  onComplete?: (styleProfile: StyleProfile) => void
}

export function StyleQuiz({ onComplete }: StyleQuizProps) {
  const {
    currentRound,
    availableOptions,
    isComplete,
    finalStyleProfile,
    selectOption
  } = useStyleProfile()

  // Handle option selection
  const handleOptionSelect = (optionId: string) => {
    selectOption(optionId)
  }

  // Call onComplete callback when quiz completes
  useEffect(() => {
    if (isComplete && finalStyleProfile && onComplete) {
      onComplete(finalStyleProfile)
    }
  }, [isComplete, finalStyleProfile, onComplete])

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
            {currentRound === 1 && "What's your style foundation?"}
            {currentRound === 2 && "How would you refine that style?"}
            </motion.h1>
            
            <motion.p 
            className="text-lg uppercase font-light"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            >
            {currentRound === 1 && "Choose the base style that speaks to you most"}
            {currentRound === 2 && "Select how you'd like to refine your chosen foundation"}
            </motion.p>
        </div>
        <div className='flex flex-col items-end justify-end'>
            <motion.h1 
            className="text-2xl mb-2 uppercase font-medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            >
                style selection
            </motion.h1>
            <div className='bg-brand-forest text-white text-xs px-6 py-0 flex flex-row items-center justify-center gap-2'>
                <span>1</span>
                <span>of</span>
                <span>4</span>
            </div>
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
                selected={false}
                onClick={() => handleOptionSelect(option.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </motion.div>
  )
}