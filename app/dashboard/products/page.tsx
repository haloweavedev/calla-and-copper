'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { productCatalog, ProductStyle, ProductCategory } from '@/lib/inventory'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<ProductStyle | 'all'>('all')
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all')

  // Filter products based on search and filters
  const filteredProducts = productCatalog.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStyle = selectedStyle === 'all' || product.style === selectedStyle
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    
    return matchesSearch && matchesStyle && matchesCategory
  })

  const styles: (ProductStyle | 'all')[] = ['all', 'MODERN', 'MINIMALIST', 'INDUSTRIAL', 'BOHO', 'VINTAGE']
  const categories: (ProductCategory | 'all')[] = ['all', 'seating', 'tables', 'storage', 'lighting', 'textiles', 'decor', 'bed sets']

  const getStyleLabel = (style: ProductStyle | 'all') => {
    const labels = {
      'all': 'All Styles',
      'MODERN': 'Modern Clean',
      'MINIMALIST': 'Warm Minimalist', 
      'INDUSTRIAL': 'Industrial Loft',
      'BOHO': 'Boho Eclectic',
      'VINTAGE': 'Cozy Traditional',
      'CONTEMPORARY': 'Contemporary',
      'TRADITIONAL': 'Traditional'
    }
    return labels[style] || 'Unknown Style'
  }

  const getCategoryLabel = (category: ProductCategory | 'all') => {
    const labels = {
      'all': 'All Categories',
      'seating': 'Seating',
      'tables': 'Tables',
      'storage': 'Storage', 
      'lighting': 'Lighting',
      'textiles': 'Textiles',
      'decor': 'Decor',
      'bed sets': 'Bed Sets'
    }
    return labels[category] || 'Unknown Category'
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-lg md:text-3xl font-medium md:font-base mb-2">Product Catalog</h1>
          <p className="text-brand-warm-brown">Browse our complete collection of furniture and decor items</p>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProducts.length} of {productCatalog.length} products
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-brand-forest focus:ring-.5 focus:ring-brand-forest focus:ring-opacity-50 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Style Filter */}
            <div className="relative">
              <FunnelIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-.5 focus:ring-brand-forest focus:ring-opacity-50 focus:border-brand-forest focus:outline-none appearance-none bg-white"
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value as ProductStyle | 'all')}
              >
                {styles.map(style => (
                  <option key={style} value={style}>
                    {getStyleLabel(style)}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-.5 focus:ring-brand-forest focus:ring-opacity-50 focus:border-brand-forest focus:outline-none appearance-none bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'all')}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {getCategoryLabel(category)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No products found</div>
            <div className="text-gray-400">Try adjusting your search terms or filters</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-brand-cream border border-8 border-brand-cream flex flex-col transition-all duration-200 hover:scale-105">
                {/* Product Image */}
                <Link href={`/demo/product/${product.id}`}>
                  <div className="w-full h-64 relative bg-white cursor-pointer hover:opacity-90 transition-opacity">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      unoptimized
                      onError={(e) => {
                        console.error('Image load error for:', product.imageUrl, e)
                        // Try to show fallback
                        const img = e.target as HTMLImageElement
                        img.src = '/images/placeholder.png'
                      }}
                      onLoad={() => console.log('Image loaded successfully:', product.imageUrl)}
                    />
                    {!product.inStock && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1">
                        Out of Stock
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="text-left mt-2 flex-grow flex flex-col justify-between p-2">
                  <div className='mb-4'>
                    <Link href={`/demo/product/${product.id}`}>
                      <h3 className="text-xl font-medium uppercase text-left mb-2 cursor-pointer hover:text-brand-dark-brown transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="font-light text-sm text-left uppercase text-black/60">
                      {getCategoryLabel(product.category)}
                    </p>
                    
                    {/* Style and Materials Info */}
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 bg-white text-brand-dark-brown text-xs uppercase font-light mb-1 mr-1 rounded-sm">
                        {getStyleLabel(product.style)}
                      </span>
                      {product.materials.slice(0, 2).map((material) => (
                        <span key={material} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs uppercase font-light mb-1 mr-1 rounded-sm">
                          {material}
                        </span>
                      ))}
                    </div>

                    {/* Dimensions */}
                    {product.dimensions && (
                      <div className="mt-2 text-xs text-black/40 uppercase font-light">
                        {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                      </div>
                    )}
                  </div>
                  
                  <p className="font-medium text-2xl mb-2">
                    ${product.price} <span className="text-sm font-light uppercase">USD</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}