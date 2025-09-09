'use client'
import { useDemoStore } from '@/lib/store/demo-store'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/app/components/Header'
import { CompleteRoomVisualization } from './_components/CompleteRoomVisualization'

interface PageProps {
  params: { id: string }
}

export default function DashboardGenerationPage({ params }: PageProps) {
  const { analysisResult, recommendations, reset, uploadedFileUrl } = useDemoStore()

  if (!analysisResult || !recommendations) {
    return (
      <>
        <Header />
        <div className="w-full min-h-screen bg-white text-black flex flex-col p-4 sm:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold animate-pulse">Analyzing your space...</h1>
            <p>Our AI is curating your personalized matches.</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-white text-black flex flex-col p-4 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2">Here are your personalized matches</h1>
          <p className="text-lg uppercase font-light">Each recommendation is scored based on your style, space, and budget</p>
        </div>

        {/* Complete Room Visualization */}
        {uploadedFileUrl && recommendations.length > 0 && (
          <CompleteRoomVisualization products={recommendations} />
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((product) => (
            <div key={product.id} className="bg-brand-cream border border-8 border-brand-cream flex flex-col transition-all duration-200">
              <Link href={`/demo/product/${product.id}`}>
                <div className="w-full h-64 relative bg-white cursor-pointer hover:opacity-90 transition-opacity">
                  <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'contain' }} />
                </div>
              </Link>
              <div className="text-left mt-2 flex-grow flex flex-col justify-between p-2">
                <div className='mb-4'>
                  <Link href={`/demo/product/${product.id}`}>
                    <h3 className="text-xl font-medium uppercase text-left mb-2 cursor-pointer hover:text-purple-600 transition-colors">{product.name}</h3>
                  </Link>
                  {product.category ? (
                    <p className="font-light text-sm text-left uppercase text-black/60">{product.category}</p>
                  ) : null}
                </div>
                <div>
                  <p className="font-medium text-2xl mb-2">${product.price} <span className="text-sm font-light uppercase">USD</span></p>
                  <Link href={`/demo/product/${product.id}`}>
                    <button className="w-full mt-2 bg-black text-white font-medium py-2 px-4 hover:bg-gray-800 transition-colors">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button onClick={reset} className="px-6 py-2 font-medium transition-all duration-200 bg-white text-black/80 border-2 border-black/80 hover:bg-black/80 hover:text-white cursor-pointer">Start Over</button>
        </div>
      </div>
    </>
  )
}