import { useState, useCallback } from 'react'
import { QuizState, StyleOption } from '../types'
import { styleDecisionTree, getNextOptions, generateStyleProfile } from '../styleDecisionTree'

export function useStyleProfile() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentRound: 1,
    selectedPath: [],
    availableOptions: getInitialOptions(),
    isComplete: false,
    finalStyleProfile: undefined
  })

  // Get initial options for Round 1
  function getInitialOptions(): StyleOption[] {
    return Object.entries(styleDecisionTree).map(([key, value]) => ({
      id: key,
      title: key,
      description: value.description,
      keywords: value.keywords || [],
      imageSrc: value.imageSrc
    }))
  }

  // Select an option and progress to next round
  const selectOption = useCallback((optionId: string) => {
    setQuizState(prevState => {
      const newPath = [...prevState.selectedPath, optionId]
      const nextRound = prevState.currentRound + 1
      
      // Get options for next round
      const nextOptions = getNextOptions(styleDecisionTree, newPath)
      
      // Check if quiz is complete
      if (nextRound > 2 || !nextOptions) {
        // Generate final style profile
        try {
          const finalProfile = generateStyleProfile(newPath, styleDecisionTree)
          return {
            ...prevState,
            selectedPath: newPath,
            currentRound: 2,
            isComplete: true,
            finalStyleProfile: finalProfile
          }
        } catch (error) {
          console.error('Error generating style profile:', error)
          return prevState
        }
      }
      
      // Progress to next round
      return {
        ...prevState,
        selectedPath: newPath,
        currentRound: nextRound as 1 | 2,
        availableOptions: nextOptions
      }
    })
  }, [])

  // Go back to previous round
  const goBack = useCallback(() => {
    setQuizState(prevState => {
      if (prevState.currentRound <= 1) return prevState

      const newRound = (prevState.currentRound - 1) as 1 | 2
      const newPath = prevState.selectedPath.slice(0, Math.max(0, prevState.selectedPath.length - 1))

      // Determine options for the round we're returning to
      const options = newRound === 1
        ? getInitialOptions()
        : (getNextOptions(styleDecisionTree, newPath) || [])

      return {
        ...prevState,
        currentRound: newRound,
        selectedPath: newPath,
        availableOptions: options,
        isComplete: false,
        finalStyleProfile: undefined,
      }
    })
  }, [])

  return {
    // State
    currentRound: quizState.currentRound,
    selectedPath: quizState.selectedPath,
    availableOptions: quizState.availableOptions,
    isComplete: quizState.isComplete,
    finalStyleProfile: quizState.finalStyleProfile,
    
    // Actions
    selectOption,
    goBack,

    // Computed
    canGoBack: quizState.currentRound > 1,
  }
}
