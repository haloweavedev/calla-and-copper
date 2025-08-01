import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: Product & { reason?: string }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full h-64">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate">{product.name}</h3>
          <p className="text-gray-500 text-sm">{product.category}</p>
          <p className="font-bold text-xl mt-2">${product.price.toFixed(2)}</p>
          {product.reason && (
            <div className="mt-3 p-3 bg-indigo-50 rounded-md border border-indigo-200">
              <p className="text-sm text-indigo-800">
                <span className="font-semibold">Why it&apos;s a match:</span> {product.reason}
              </p>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
} 