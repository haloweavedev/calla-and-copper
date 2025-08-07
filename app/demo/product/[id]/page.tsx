'use client'
import { useParams, notFound } from 'next/navigation'
import { productCatalog } from '@/lib/mock-data/products'
import Image from 'next/image'
import { GeistMono } from 'geist/font/mono'
import Link from 'next/link'

export default function DemoProductPage() {
  const params = useParams()
  const productId = Number(params.id)

  const product = productCatalog.find((p) => p.id === productId)

  if (!product) {
    notFound()
  }

  return (
    <div className={`${GeistMono.className} w-full min-h-screen bg-white text-black flex flex-col items-center p-4 sm:p-8`}>
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <Link href="/welcome" className="font-bold border-2 border-black px-4 py-2 bg-white hover:bg-gray-100 shadow-[4px_4px_0px_#000]">
            &larr; Back to Demo
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-2 border-black p-2 bg-white">
            <div className="relative w-full h-96 border-2 border-black">
              <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-lg text-gray-600 mt-1">{product.category}</p>
            <p className="text-3xl font-bold my-4">${product.price.toFixed(2)}</p>
            <div className="border-y-2 border-black py-4">
              <p className="text-md leading-relaxed">{product.description}</p>
            </div>
            <div className="mt-6">
              <h3 className="font-bold">Style & Tags:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 border-2 border-black bg-black text-white font-bold text-sm">{product.style}</span>
                {product.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 border-2 border-black bg-gray-100 font-bold text-sm">{tag}</span>
                ))}
              </div>
            </div>
            <div className="mt-auto pt-8">
              <button className="w-full px-6 py-4 border-2 border-black bg-black text-white font-bold text-lg hover:bg-gray-800 shadow-[4px_4px_0px_#000]">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

