'use client'

import Image from "next/image"
import { motion } from 'framer-motion'
import { cardVariants } from '@/lib/animations/variants'
import { cn } from '@/lib/utils'

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
}

export function StyleCard({ 
  imageSrc, 
  imageAlt, 
  tags, 
  title, 
  width = 300, 
  height = 450,
  variant = 'default',
  selected = false,
  onClick,
  className
}: StyleCardProps) {
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
        variants={cardVariants}
      >
        <span
          className="absolute -top-0.5 left-4 text-base font-medium uppercase text-left text-brand-cream"
          style={{ transform: 'rotate(90deg)', transformOrigin: 'left top' }}
        >
          {title}
        </span>
        <Image 
          src={imageSrc} 
          alt={imageAlt} 
          width={width} 
          height={height} 
        />
        <div className="py-1 flex flex-col">
          <p className="font-light text-sm mb-8 text-left">{renderTags()}</p>
          <span className="text-xl font-medium uppercase text-left">{title}</span>
        </div>
      </motion.div>
    )
  }

  // Selectable style (same styling, but clickable)
  return (
    <motion.div 
      className={`${baseClasses} relative`}
      onClick={onClick}
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span
        className="absolute -top-0.5 left-4 text-base font-medium uppercase text-left text-brand-cream"
        style={{ transform: 'rotate(90deg)', transformOrigin: 'left top' }}
      >
        {title}
      </span>
      <Image 
        src={imageSrc} 
        alt={imageAlt} 
        width={width} 
        height={height} 
      />
      <div className="py-1 flex flex-col">
        <p className="font-light text-sm mb-8 text-left capitalize">{renderTags()}</p>
        <span className="text-xl font-medium uppercase text-left">{title}</span>
      </div>
    </motion.div>
  )
}
