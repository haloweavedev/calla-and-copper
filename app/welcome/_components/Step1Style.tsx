'use client'
import { useDemoStore, StyleSelection } from '@/lib/store/demo-store'
import Image from 'next/image'

const styles: { name: StyleSelection; title: string; tags: string; image: string }[] = [
  { name: 'SCANDINAVIAN', title: 'SCANDINAVIAN', tags: 'Clean | Warm | Minimal', image: '/images/styles/scandinavian.jpg' },
  { name: 'INDUSTRIAL', title: 'INDUSTRIAL', tags: 'Raw | Urban', image: '/images/styles/industrial.jpg' },
  { name: 'BOHO', title: 'BOHO', tags: 'Textured | Eclectic', image: '/images/styles/boho.jpg' },
  { name: 'MODERN', title: 'MODERN', tags: 'Sleek | Contemporary', image: '/images/styles/modern.jpg' },
  { name: 'VINTAGE', title: 'VINTAGE', tags: 'Classic | Cozy', image: '/images/styles/vintage.jpg' },
]

export function Step1Style() {
  const { setStep, setData, style: selectedStyle } = useDemoStore()

  const handleSelect = (style: StyleSelection) => {
    setData({ style })
    setTimeout(() => setStep(2), 200)
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">Which room speaks to you?</h1>
      <p className="text-md mb-8">Pick the style that makes you feel at home.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {styles.map((style) => (
          <div
            key={style.name}
            onClick={() => handleSelect(style.name)}
            className={`border-2 border-black p-2 bg-white cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:shadow-[4px_4px_0px_#000] ${selectedStyle === style.name ? 'bg-gray-200 shadow-[4px_4px_0px_#000]' : ''}`}
          >
            <div className="w-full h-64 bg-gray-200 border-2 border-black relative">
               {/* You will add images to public/images/styles/ later */}
               <Image src={style.image} alt={style.title} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="text-left mt-2">
              <h3 className="font-bold text-lg">{style.title}</h3>
              <p className="text-sm">{style.tags}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}