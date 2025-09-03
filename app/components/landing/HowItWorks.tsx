'use client'

import RotatingStyleCards from './RotatingStyleCards'
import RotatingRoomTypes from './RotatingRoomTypes'
import RotatingProducts from './RotatingProducts'

export default function HowItWorks() {

  return (
    <div 
      className="w-full flex flex-col items-center justify-center py-4"
    >
      <h1 
        className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-800 mb-4 text-center sm:text-left px-8"
      >
        Transform any room in 3 simple steps
      </h1>
      
      <div 
        className="w-full flex flex-col md:flex-row items-start justify-between px-8 py-16"
      >
        <div className="flex flex-col justify-between pr-0 md:pr-24">
            <p className="uppercase font-medium text-2xl mb-16">1. Pick the style that makes you feel at home</p>
            <p className="text-base font-normal text-black/80">Browse visual style inspiration and choose what speaks to you. No design experience needed - just pick what feels right.</p>
        </div>
        <RotatingStyleCards />
      </div>
      
      <div 
        className="w-full flex items-start justify-between px-8 py-16"
      >
        <RotatingRoomTypes />
        <div 
          className="flex flex-col justify-between pl-24 text-right"
        >
            <p 
              className="uppercase font-medium text-2xl mb-16"
            >
              2. tell us about your space
            </p>
            <p 
              className="text-base font-normal text-black/80"
            >
              Share the basics: <br /> What room you&apos;re designing, your comfort budget, and how you live. <br /> We&apos;ll match products that fit your lifestyle.
            </p>
        </div>
      </div>
      <div 
        className="w-full flex flex-col md:flex-row items-start justify-between px-8 py-16"
      >
        <div className="flex flex-col justify-between pr-0 md:pr-24">
            <p className="uppercase font-medium text-2xl mb-16">3. Get smart product recommendations</p>
            <p className="text-base font-normal text-black/80">Our AI analyzes your style preferences and space details to suggest furniture and decor that perfectly match your vision and budget.</p>
        </div>
        <RotatingProducts />
      </div>
    </div>
  )
}