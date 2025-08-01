import { getSmartSuggestions } from './actions'
import { ProductCard } from '@/app/components/ProductCard'
import { Product } from '@prisma/client'

export default async function DashboardPage() {
  const suggestions = await getSmartSuggestions() as (Product & { reason: string })[]

  return (
    <div className="w-full container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Curated Picks</h1>
      {suggestions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {suggestions.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            We&apos;re analyzing your style! Suggestions will appear here shortly.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            (Make sure you have added products in the admin panel.)
          </p>
        </div>
      )}
    </div>
  )
} 