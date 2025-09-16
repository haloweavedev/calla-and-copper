'use client'
import { useParams, notFound } from 'next/navigation'
import { productCatalog } from '@/lib/mock-data/products'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ARViewer } from '@/app/demo/_components/ARViewer'
import { ProductVisualization } from '@/app/product/[id]/_components/ProductVisualization'
import { Header } from '@/app/components/Header'

export default function DemoProductPage() {
  const params = useParams()
  const productId = Number(params.id)
  const [isARVisible, setIsARVisible] = useState(false)


  const product = productCatalog.find((p) => p.id === productId)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Header />
      <div className={`w-full min-h-screen bg-white text-black flex flex-col items-center py-4 sm:py-8 px-8`}>
        <div className="w-full max-w-4xl">
          <div className="mb-8">
            <Link href="/welcome" className="px-6 py-2 font-medium transition-all duration-200 bg-white text-black/80 border-2 border-black/80 hover:bg-black/80 hover:text-white cursor-pointer">
              &larr; Back to Demo
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="border-2 border-black p-2 bg-white flex items-center justify-center w-full">
              <div className="relative w-full h-96 ">
                <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
              <p className="text-lg text-gray-600 mt-1">{product.category}</p>
              <p className="text-2xl md:text-3xl font-bold my-4">${product.price.toFixed(2)}</p>
              <div className="border-y-2 border-black py-4">
                <p className="text-md leading-relaxed">{product.description}</p>
              </div>
              <div className="mt-6">
                <h3 className="font-bold">Style & Tags:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1 border-2 border-brand-warm-brown bg-brand-warm-brown text-white font-bold text-sm">{product.style}</span>
                  {product.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 border-2 border-gray-100 bg-gray-100 font-bold text-sm">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="mt-auto pt-8 space-y-4">
                {/* <button
                  onClick={() => setIsARVisible(true)}
                  className="w-full px-6 py-4 border-2 border-black bg-white text-black font-bold text-lg hover:bg-gray-100 flex items-center justify-center gap-2"
                >
                  <Image src="/images/vr-icon.png" alt="AR" width={30} height={30} />
                  <span>View in your Room</span>
                </button> */}
                <ProductVisualization product={{ imageUrl: product.imageUrl, category: product.category, name: product.name }} />

                <button className="w-full px-6 py-4 border-2 border-black/90 bg-black/90 text-white font-bold text-lg hover:bg-brand-gold hover:border-brand-gold cursor-pointer">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isARVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="w-full h-full max-w-3xl max-h-[80vh] bg-white border-4 border-black p-4 relative">
            <button
              onClick={() => setIsARVisible(false)}
              className="absolute -top-4 -right-4 z-10 w-10 h-10 border-2 border-black bg-white text-black font-bold text-2xl hover:bg-gray-200"
            >
              &times;
            </button>
            <ARViewer />
          </div>
        </div>
      )}
    </>
  )
}

