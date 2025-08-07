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
        <h1 className="text-3xl font-bold mb-2">Here are your personalized matches.</h1>
        <p className="text-md">Each recommendation is scored based on your style, space, and budget.</p>
      </div>

      <div className="p-6 border-2 border-black bg-white shadow-[8px_8px_0px_#000] mb-12">
        <h2 className="font-bold text-xl mb-2">AI Room Analysis:</h2>
        <p className="mb-4">{analysisResult.description}</p>
        <div className="flex flex-wrap gap-2">
          {analysisResult.tags.map(tag => (
            <span key={tag} className="px-3 py-1 border-2 border-black bg-gray-100 font-bold text-sm">{tag}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendations.map((product) => (
          <Link href={`/demo/product/${product.id}`} key={product.id}>
            <div className="border-2 border-black p-2 bg-white h-full flex flex-col cursor-pointer transition-all duration-200 hover:shadow-[4px_4px_0px_#000]">
              <div className="w-full h-64 bg-gray-200 border-2 border-black relative">
                <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="text-left mt-2 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  {product.category ? (
                    <p className="text-sm text-gray-600">{product.category}</p>
                  ) : null}
                </div>
                <p className="font-bold text-xl mt-2">${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-12">
        <button onClick={reset} className="px-8 py-3 border-2 border-black bg-white font-bold hover:bg-gray-100 shadow-[4px_4px_0px_#000]">Start Over</button>
      </div>
    </div>
  )
}