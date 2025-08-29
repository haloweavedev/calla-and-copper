'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { containerVariants, itemVariants } from '@/lib/animations/variants'

export default function LandingCTA() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })

    return (
        <motion.div 
        ref={ref}
        className="w-full flex flex-col items-center justify-center py-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-800 mb-4 text-center sm:text-left px-8"
            variants={itemVariants}
        >
            Ready to transform your space?
        </motion.h1>
        <motion.p 
            className="text-base font-normal text-black/80 text-center sm:text-left px-8 mb-8"
            variants={itemVariants}
        >
            Create your dream home now
        </motion.p>
        {/* Infinite Carousel */}
        <motion.div 
            className="w-full overflow-hidden py-8 bg-white relative"
            variants={itemVariants}
        >
            {/* Left gradient overlay */}
            <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
            
            {/* Right gradient overlay */}
            <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
            
            {/* Single container with all images for seamless loop */}
            <div className="flex animate-scroll whitespace-nowrap">
                <Image src="/landing/cta/0_1.png" alt="Style 1" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
                <Image src="/landing/cta/0_2.png" alt="Style 2" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
                <Image src="/landing/cta/0_3.png" alt="Style 3" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
                <Image src="/landing/cta/0_4.png" alt="Style 4" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
                <Image src="/landing/cta/0_5.png" alt="Style 5" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
                <Image src="/landing/cta/0_6.png" alt="Style 6" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
                <Image src="/landing/cta/0_7.png" alt="Style 7" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
                <Image src="/landing/cta/0_8.png" alt="Style 8" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
                <Image src="/landing/cta/0_9.png" alt="Style 9" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
                {/* Duplicate images for seamless loop */}
                <Image src="/landing/cta/0_1.png" alt="Style 1" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
                <Image src="/landing/cta/0_2.png" alt="Style 2" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
                <Image src="/landing/cta/0_3.png" alt="Style 3" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
                <Image src="/landing/cta/0_4.png" alt="Style 4" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
                <Image src="/landing/cta/0_5.png" alt="Style 5" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
                <Image src="/landing/cta/0_6.png" alt="Style 6" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
                <Image src="/landing/cta/0_7.png" alt="Style 7" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
                <Image src="/landing/cta/0_8.png" alt="Style 8" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
                <Image src="/landing/cta/0_9.png" alt="Style 9" width={250} height={250} className="h-[250px] w-[250px] flex-shrink-0" />
            </div>
        </motion.div>
        
        {/* CTA Button */}
        <motion.div 
            className="w-full flex justify-center mt-8"
            variants={itemVariants}
        >
            <button className="bg-[#2D5016] hover:bg-[#2D5016]/80 text-white font-medium py-4 px-8 text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Design My Room Now
            </button>
        </motion.div>
        
      </motion.div>
    )
}