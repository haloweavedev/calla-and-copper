'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <>
      <div className="w-full text-center flex flex-col items-center justify-between py-16">
        <motion.div 
          className="w-full flex flex-col md:flex-row items-start justify-between px-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-800 mb-4 hidden md:block">See your space <br /> transformed <br /> instantly</h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-800 mb-4 block md:hidden">See your space <br /> transformed instantly</h1>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-end justify-between gap-6 md:gap-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-normal text-gray-800 text-center md:text-right">Interior design shopping made simple. Upload your room, discover products that belong.</h2>
            <Link
                href="/login"
                className="px-6 py-3 text-lg md:text-xl font-normal text-white bg-[#1a1a1a] rounded-full hover:bg-[#1a1a1a]/80 transition-colors duration-200"
              >
                Design my space now →
              </Link>
          </div>
        </motion.div>
        
        {/* Showcase Feature Video */}
        <motion.div 
          className="w-full py-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <video
            className="w-full h-auto"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          >
            <source src="/landing/showcase-feature.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
        
      </div>
    </>
  )
}
