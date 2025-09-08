'use client'

import { useState, useEffect, useCallback } from 'react'
import ProductCard from './ProductCard'
import { productCatalog } from '@/lib/mock-data/products'

export default function RotatingProducts() {
  const [currentProducts, setCurrentProducts] = useState<typeof productCatalog>([])
  const [rotationKey, setRotationKey] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Generate a random set of 3 different products
  const generateRandomProductSet = () => {
    const shuffled = [...productCatalog].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 3)
  }

  // Update products with transition
  const updateProducts = useCallback(() => {
    const newProducts = generateRandomProductSet()
    setCurrentProducts(newProducts)
    setRotationKey(prev => prev + 1)
  }, [])

  // Initialize with first set of products
  useEffect(() => {
    const initialProducts = generateRandomProductSet()
    setCurrentProducts(initialProducts)
  }, [])

  // Set up interval for rotation
  useEffect(() => {
    const interval = setInterval(updateProducts, 5000) // Rotate every 5 seconds
    return () => clearInterval(interval)
  }, [updateProducts])

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
    <div className="flex items-center justify-end gap-8">
      <div key={`rotation-${rotationKey}`} className="flex items-center justify-end gap-8">
        {currentProducts.map((product, index) => (
          <div 
            key={`${rotationKey}-${product.id}-${index}`}
            className={`transition-all duration-800 ease-in-out ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transitionDelay: isVisible ? `${index * 300}ms` : '0ms'
            }}
          >
            <ProductCard 
              imageSrc={product.imageUrl}
              imageAlt={`${product.name}-product`}
              title={product.name}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
