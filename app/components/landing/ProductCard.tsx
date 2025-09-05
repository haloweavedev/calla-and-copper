import Image from "next/image"

interface ProductCardProps {
  imageSrc: string
  imageAlt: string
  title: string
}

export default function ProductCard({ imageSrc, imageAlt, title }: ProductCardProps) {
  return (
    <div className="relative bg-brand-cream border border-brand-cream border-8 ">
      <Image 
        src={imageSrc} 
        alt={imageAlt} 
        width={300} 
        height={300} 
        style={{ width: 'auto', height: 'auto' }}
      />
      <div className="pt-2 min-h-[65px] lg:min-h-[85px] flex flex-col justify-end">
        <span className="text-xs lg:text-lg font-medium uppercase">{title}</span>
      </div>
    </div>
  )
}
