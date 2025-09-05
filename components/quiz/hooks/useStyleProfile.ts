import { useState, useCallback } from 'react'
import { QuizState, StyleOption } from '../types'
import { styleDecisionTree, getAllStyleOptions, generateStyleProfile } from '../styleDecisionTree'

export function useStyleProfile() {
  const [quizState, setQuizState] = useState<QuizState>({
    selectedPath: [],
    selectedStyle: null,
    availableOptions: getInitialOptions(),
    isComplete: false,
    finalStyleProfile: undefined
  })

  // Get initial options (all available styles)
  function getInitialOptions(): StyleOption[] {
    return getAllStyleOptions(styleDecisionTree)
  }

  // Select an option and auto-proceed to next step
  const selectOption = useCallback((optionId: string) => {
    setQuizState(prevState => {
      const newPath = [optionId]
      
      try {
        const finalProfile = generateStyleProfile(newPath, styleDecisionTree)
        return {
          ...prevState,
          selectedPath: newPath,
          selectedStyle: optionId,
          isComplete: true,
          finalStyleProfile: finalProfile
        }
      } catch (error) {
        console.error('Error generating style profile:', error)
        return prevState
      }
    })
  }, [])


  // Skip quiz (complete without selection)
  const skipQuiz = useCallback(() => {
    setQuizState(prevState => ({
      ...prevState,
      isComplete: true,
      finalStyleProfile: undefined // No style profile for skipped quiz
    }))
  }, [])

  // Reset quiz state (go back to home)
  const goBack = useCallback(() => {
    setQuizState({
      selectedPath: [],
      selectedStyle: null,
      availableOptions: getInitialOptions(),
      isComplete: false,
      finalStyleProfile: undefined
    })
  }, [])

  return {
    // State
    selectedPath: quizState.selectedPath,
    selectedStyle: quizState.selectedStyle,
    availableOptions: quizState.availableOptions,
    isComplete: quizState.isComplete,
    finalStyleProfile: quizState.finalStyleProfile,
    
    // Actions
    selectOption,
    skipQuiz,
    goBack,
  }
}
