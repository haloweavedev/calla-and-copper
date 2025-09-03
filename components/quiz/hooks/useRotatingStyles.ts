import { useState, useEffect, useCallback } from 'react'
import { styleDecisionTree } from '../styleDecisionTree'

interface RotatingStyleSet {
  id: string
  title: string
  description: string
  keywords: string[]
  imageSrc: string
}

export function useRotatingStyles(intervalMs: number = 3000) {
  const [currentStyles, setCurrentStyles] = useState<RotatingStyleSet[]>([])
  const [rotationKey, setRotationKey] = useState(0)

  // Generate a random set of 3 different style combinations from anywhere in the tree
  const generateRandomStyleSet = useCallback((): RotatingStyleSet[] => {
    const allOptions: RotatingStyleSet[] = []
    
    // Collect all foundations
    Object.entries(styleDecisionTree).forEach(([foundationKey, foundationNode]) => {
      allOptions.push({
        id: foundationKey,
        title: foundationKey.toLowerCase(),
        description: foundationNode.description,
        keywords: foundationNode.keywords || [],
        imageSrc: foundationNode.imageSrc
      })
      
      // Collect all refinements
      if (foundationNode.children) {
        Object.entries(foundationNode.children).forEach(([refinementKey, refinementNode]) => {
          allOptions.push({
            id: `${foundationKey}-${refinementKey}`,
            title: refinementKey.toLowerCase(),
            description: refinementNode.description,
            keywords: refinementNode.keywords || [],
            imageSrc: refinementNode.imageSrc
          })
        })
      }
    })
    
    // Shuffle and pick 3 random options
    const shuffled = [...allOptions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 3)
  }, [])

  // Update styles with transition
  const updateStyles = useCallback(() => {
    const newStyles = generateRandomStyleSet()
    setCurrentStyles(newStyles)
    setRotationKey(prev => prev + 1)
  }, [generateRandomStyleSet])

  // Initialize with first set of styles
  useEffect(() => {
    const initialStyles = generateRandomStyleSet()
    setCurrentStyles(initialStyles)
  }, [generateRandomStyleSet])

  // Set up interval for rotation
  useEffect(() => {
    const interval = setInterval(updateStyles, intervalMs)
    return () => clearInterval(interval)
  }, [updateStyles, intervalMs])

  return {
    currentStyles,
    rotationKey,
    updateStyles
  }
}
