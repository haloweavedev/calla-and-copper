'use client'
import { useDemoStore, StyleSelection } from '@/lib/store/demo-store'
import { StyleCard } from '@/components/cards'

const styles: { name: StyleSelection; title: string; tags: string[]; image: string }[] = [
  { name: 'SCANDINAVIAN', title: 'SCANDINAVIAN', tags: ['Clean', 'Warm', 'Minimal'], image: '/style-quiz/style-scandinavian.png' },
  { name: 'INDUSTRIAL', title: 'INDUSTRIAL', tags: ['Raw', 'Urban'], image: '/style-quiz/style-industrial.png' },
  { name: 'BOHO', title: 'BOHO', tags: ['Textured', 'Eclectic'], image: '/style-quiz/style-boho.png' },
  { name: 'MODERN', title: 'MODERN', tags: ['Sleek', 'Contemporary'], image: '/style-quiz/style-modern.png' },
  { name: 'VINTAGE', title: 'VINTAGE', tags: ['Classic', 'Cozy'], image: '/style-quiz/style-vintage.png' },
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
          <StyleCard
            key={style.name}
            imageSrc={style.image}
            imageAlt={style.title}
            tags={style.tags}
            title={style.title}
            variant="selectable"
            selected={selectedStyle === style.name}
            onClick={() => handleSelect(style.name)}
          />
        ))}
      </div>
    </div>
  )
}