import { PrismaClient } from '@prisma/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ProductVisualization } from './_components/ProductVisualization'

const prisma = new PrismaClient()

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-96 rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mt-2">{product.category}</p>
          <p className="text-3xl font-bold my-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          <div className="mt-6">
            <h3 className="font-semibold">Style Tags:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.styleTags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button className="w-full mt-8 px-6 py-3 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
            Add to Cart (Coming Soon)
          </button>
        </div>
      </div>
      <ProductVisualization product={{ imageUrl: product.imageUrl, category: product.category, name: product.name }} />
    </div>
  )
} 