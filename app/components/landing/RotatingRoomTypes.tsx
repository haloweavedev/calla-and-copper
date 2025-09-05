'use client'

import { useState, useEffect } from 'react'
import RoomTypeCard from './RoomTypeCard'

// Room types data array
const roomTypes = [
  {
    id: 'living-room',
    roomTitle: 'Living Room',
    imageSrc: '/landing/space-living-room.png',
    roomDetail: 'Your main gathering space for relaxation and entertainment'
  },
  {
    id: 'bedroom',
    roomTitle: 'Bedroom',
    imageSrc: '/landing/space-bedroom.png',
    roomDetail: 'Your personal sanctuary for rest and rejuvenation'
  },
  {
    id: 'home-office',
    roomTitle: 'Home Office',
    imageSrc: '/landing/space-home-office.png',
    roomDetail: 'A productive workspace that fits your lifestyle'
  },
  {
    id: 'kitchen',
    roomTitle: 'Kitchen',
    imageSrc: '/landing/space-kitchen.png',
    roomDetail: 'The heart of your home where meals and memories are made'
  },
  {
    id: 'dining-room',
    roomTitle: 'Dining Room',
    imageSrc: '/landing/space-dining-room.png',
    roomDetail: 'A welcoming space for shared meals and conversations'
  }
]

export default function RotatingRoomTypes() {
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Handle rotation every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false)
      
      // After fade out completes, update content and fade in
      const fadeOutTimer = setTimeout(() => {
        setCurrentRoomIndex(prev => (prev + 1) % roomTypes.length)
        setIsVisible(true)
      }, 800) // Match CSS transition duration
      
      return () => clearTimeout(fadeOutTimer)
    }, 4000) // Rotate every 4 seconds

    return () => clearInterval(interval)
  }, [])

  const currentRoom = roomTypes[currentRoomIndex]

  return (
    <div 
      key={`room-${currentRoomIndex}`}
      className={`transition-all duration-800 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <RoomTypeCard 
        roomTitle={currentRoom.roomTitle}
        imageSrc={currentRoom.imageSrc}
        roomDetail={currentRoom.roomDetail}
      />
    </div>
  )
}
