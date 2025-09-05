'use client'

import Image from "next/image"
import { motion } from 'framer-motion'
import { cardVariants } from '@/lib/animations/variants'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface StyleCardProps {
  imageSrc: string
  imageAlt: string
  tags: string[]
  title: string
  width?: number
  height?: number
  variant?: 'default' | 'selectable'
  selected?: boolean
  onClick?: () => void
  className?: string
  showLabel?: boolean
  responsive?: boolean
}

export function StyleCard({ 
  imageSrc, 
  imageAlt, 
  tags, 
  title, 
  width = 240,
  height = 550,
  variant = 'default',
  selected = false,
  onClick,
  className,
  showLabel = true,
  responsive = true
}: StyleCardProps) {
  // Responsive sizing based on screen width
  const [dimensions, setDimensions] = useState({ width, height })
  
  useEffect(() => {
    if (!responsive) return
    
    const updateDimensions = () => {
      const screenWidth = window.innerWidth
      let newWidth: number
      let newHeight: number
      
      if (screenWidth < 375) {
        // Small mobile (320px screens)
        newWidth = 120
        newHeight = 275
      } else if (screenWidth < 414) {
        // Medium mobile (375px screens)
        newWidth = 140
        newHeight = 320
      } else if (screenWidth < 768) {
        // Large mobile (414px screens)
        newWidth = 155
        newHeight = 355
      } else if (screenWidth < 1024) {
        // Tablet (768px screens)
        newWidth = 180
        newHeight = 412
      } else {
        // Desktop (1024px+ screens)
        newWidth = 240
        newHeight = 550
      }
      
      setDimensions({ width: newWidth, height: newHeight })
    }
    
    // Set initial dimensions
    updateDimensions()
    
    // Add resize listener with debouncing for better performance
    let timeoutId: NodeJS.Timeout
    const debouncedUpdate = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateDimensions, 100)
    }
    
    window.addEventListener('resize', debouncedUpdate)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedUpdate)
      clearTimeout(timeoutId)
    }
  }, [responsive, width, height])
  
  // Use responsive dimensions if enabled, otherwise use props
  const cardWidth = responsive ? dimensions.width : width
  const cardHeight = responsive ? dimensions.height : height
  // Both variants use the same styling - warm cream background, brand colors
  const baseClasses = cn(
    "relative bg-brand-cream border border-brand-cream border-8",
    variant === 'selectable' && "cursor-pointer transition-all duration-200",
    variant === 'selectable' && selected && "bg-brand-rich-cream",
    className
  )

  // Render tags dynamically separated with '|'
  const renderTags = () => {
    return tags.join(' | ')
  }

  // Default landing page style (no click behavior)
  if (variant === 'default') {
    return (
      <motion.div 
        className={`${baseClasses} relative`}
        style={{ width: `${cardWidth + 16}px` }}
        variants={cardVariants}
      >
        {showLabel && (
          <span
            className="absolute -top-0.5 left-4 text-base font-medium uppercase text-left text-brand-cream whitespace-nowrap"
            style={{ transform: 'rotate(90deg)', transformOrigin: 'left top' }}
          >
            {title}
          </span>
        )}
        <Image 
          src={imageSrc} 
          alt={imageAlt} 
          width={cardWidth} 
          height={cardHeight} 
        />
        <div className="py-1 flex flex-col min-h-[140px] justify-between">
          <p className="font-light text-sm mb-8 text-left break-words capitalize">{renderTags()}</p>
          <span className="text-xl font-medium uppercase text-left">{title}</span>
        </div>
      </motion.div>
    )
  }

  // Selectable style (same styling, but clickable)
  return (
    <motion.div 
      className={`${baseClasses} relative`}
      style={{ width: `${cardWidth + 16}px` }} 
      onClick={onClick}
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {showLabel && (
        <span
          className="absolute -top-0.5 left-4 text-base font-medium uppercase text-left text-brand-cream whitespace-nowrap"
          style={{ transform: 'rotate(90deg)', transformOrigin: 'left top' }}
        >
          {title}
        </span>
      )}
      <Image 
        src={imageSrc} 
        alt={imageAlt} 
        width={cardWidth} 
        height={cardHeight} 
      />
      <div className="py-1 flex flex-col min-h-[140px] justify-between">
        <p className="text-xs font-light md:text-sm mb-8 text-left capitalize break-words">{renderTags()}</p>
        <span className="text-base md:text-xl font-medium uppercase text-left">{title}</span>
      </div>
    </motion.div>
  )
}
