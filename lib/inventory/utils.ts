import { Product, ProductFilter, ProductStyle, ProductCategory, RoomType } from './types'
import { productCatalog } from './catalog'

/**
 * Enhanced product matching algorithm for better recommendations
 */
export function calculateProductScore(
  product: Product, 
  userStyle: ProductStyle | null,
  roomType: RoomType,
  aiTags: string[],
  lifestyleTags: string[] = []
): number {
  let score = 0

  // 1. Style matching (highest weight)
  if (userStyle && product.style === userStyle) {
    score += 15
  }

  // 2. Room compatibility
  const roomKey = roomType.toLowerCase().replace(' ', '-')
  if (product.roomCompatibility.includes(roomKey as never)) {
    score += 10
  }

  // 3. AI tag matching (materials, colors, style attributes)
  const productTags = [
    ...product.materials,
    ...product.colors,
    ...product.styleAttributes,
    ...product.functionality,
    ...product.environmentTags
  ]
  
  const matchingTags = aiTags.filter(tag => 
    productTags.some(pTag => pTag.includes(tag) || tag.includes(pTag))
  )
  score += matchingTags.length * 3

  // 4. Lifestyle compatibility
  const lifestyleScore = lifestyleTags.reduce((acc, tag) => {
    if (tag === 'small-space' && product.environmentTags.includes('small-space')) return acc + 2
    if (tag === 'natural-light' && product.environmentTags.includes('natural-light')) return acc + 2
    if (tag === 'minimal' && product.styleAttributes.includes('minimal')) return acc + 2
    if (tag === 'cozy' && product.styleAttributes.includes('cozy')) return acc + 2
    return acc
  }, 0)
  score += lifestyleScore

  // 5. Stock availability
  if (!product.inStock) {
    score -= 5
  }

  return score
}

/**
 * Get personalized product recommendations
 */
export function getRecommendations(
  userStyle: ProductStyle | null,
  roomType: RoomType,
  aiTags: string[],
  lifestyleTags: string[] = [],
  limit: number = 3
): Product[] {
  const scoredProducts = productCatalog.map(product => ({
    ...product,
    score: calculateProductScore(product, userStyle, roomType, aiTags, lifestyleTags)
  }))

  const recommendedProducts = scoredProducts
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)

  if (recommendedProducts.length >= limit) {
    return recommendedProducts.slice(0, limit)
  }

  // Fallback: style-matched products
  if (userStyle) {
    const styleMatched = productCatalog
      .filter(p => p.style === userStyle && p.inStock)
      .slice(0, limit)
    
    if (styleMatched.length > 0) return styleMatched
  }

  // Final fallback: top products
  return productCatalog.filter(p => p.inStock).slice(0, limit)
}

/**
 * Filter products based on criteria
 */
export function filterProducts(products: Product[], filter: ProductFilter): Product[] {
  return products.filter(product => {
    if (filter.style && !filter.style.includes(product.style)) return false
    if (filter.category && !filter.category.includes(product.category)) return false
    if (filter.priceRange) {
      const [min, max] = filter.priceRange
      if (product.price < min || product.price > max) return false
    }
    if (filter.materials && !filter.materials.some(m => product.materials.includes(m))) return false
    if (filter.colors && !filter.colors.some(c => product.colors.includes(c))) return false
    if (filter.inStock !== undefined && product.inStock !== filter.inStock) return false
    
    return true
  })
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return productCatalog.filter(p => p.category === category && p.inStock)
}

/**
 * Get products by style
 */
export function getProductsByStyle(style: ProductStyle): Product[] {
  return productCatalog.filter(p => p.style === style && p.inStock)
}

/**
 * Search products by name or description
 */
export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return productCatalog.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.materials.some(m => m.includes(lowercaseQuery)) ||
    product.styleAttributes.some(s => s.includes(lowercaseQuery))
  )
}