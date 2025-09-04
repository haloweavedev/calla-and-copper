'use client'
import { useDemoStore } from '@/lib/store/demo-store'
import Image from 'next/image'
import Link from 'next/link'

export function Step4Results() {
  const { analysisResult, recommendations, reset } = useDemoStore()

  if (!analysisResult || !recommendations) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold animate-pulse">Analyzing your space...</h1>
        <p>Our AI is curating your personalized matches.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold mb-2">Here are your personalized matches</h1>
        <p className="text-lg uppercase font-light">Each recommendation is scored based on your style, space, and budget</p>
      </div>

      <div className="p-6 border-1 border-black bg-white mb-12">
        <h2 className="font-bold text-xl mb-2">AI Room Analysis:</h2>
        <p className="mb-4">{analysisResult.description}</p>
        <div className="flex flex-wrap gap-2">
          {analysisResult.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-brand-warm-brown font-medium text-sm rounded-sm text-white">{tag}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendations.map((product) => (
          <Link href={`/demo/product/${product.id}`} key={product.id}>
            <div className="bg-brand-cream border border-8 border-brand-cream flex flex-col cursor-pointer transition-all duration-200">
              <div className="w-full h-64 relative bg-white">
                <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'contain' }} />
              </div>
              <div className="text-left mt-2 flex-grow flex flex-col justify-between">
                <div className='mb-4'>
                  <h3 className="text-xl font-medium uppercase text-left mb-2">{product.name}</h3>
                  {product.category ? (
                    <p className="font-light text-smtext-left uppercase text-black/60">{product.category}</p>
                  ) : null}
                </div>
                <p className="font-medium text-2xl mt-2">${product.price} <span className="text-sm font-light uppercase">USD</span></p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-12">
        <button onClick={reset} className="px-6 py-2 font-medium transition-all duration-200 bg-white text-black/80 border-2 border-black/80 hover:bg-black/80 hover:text-white cursor-pointer">Start Over</button>
      </div>
    </div>
  )
}