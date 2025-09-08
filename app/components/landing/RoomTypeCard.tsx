'use client'

import Image from "next/image"

interface RoomTypeCardProps {
  roomTitle: string
  imageSrc: string
  roomDetail: string
}

export default function RoomTypeCard({ roomTitle, imageSrc, roomDetail }: RoomTypeCardProps) {
  return (
    <div className="relative bg-brand-cream border border-brand-cream border-8">
      <div className="relative">
        <Image src={imageSrc} alt={`${roomTitle.toLowerCase()}-space`} width={700} height={320} />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      <div className="p-2 absolute bottom-0 left-0 text-[#F4F1E8] z-10">
        <div className="flex items-center justify-start">
          <span className="text-2xl font-medium uppercase">{roomTitle}</span>
        </div>
        <p>{roomDetail}</p>
      </div>
    </div>
  )
}
