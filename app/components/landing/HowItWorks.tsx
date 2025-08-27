'use client'

import Image from "next/image"
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { containerVariants, itemVariants, cardVariants } from '@/lib/animations/variants'
import { StyleCard } from '@/components/cards'

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div 
      ref={ref}
      className="w-full flex flex-col items-center justify-center py-4"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h1 
        className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-800 mb-4 text-center sm:text-left px-8"
        variants={itemVariants}
      >
        Transform any room in 3 simple steps
      </motion.h1>
      
      <motion.div 
        className="w-full flex flex-col md:flex-row items-start justify-between px-8 py-16"
        variants={itemVariants}
      >
        <div className="flex flex-col justify-between pr-0 md:pr-24">
            <p className="uppercase font-medium text-2xl mb-16">1. Pick the style that makes you feel at home</p>
            <p className="text-base font-normal text-black/80">Browse visual style inspiration and choose what speaks to you. No design experience needed - just pick what feels right.</p>
        </div>
        <div className="flex items-center justify-end gap-8">
            <StyleCard 
              imageSrc="/style-quiz/style-scandinavian.png"
              imageAlt="scandinavian-style"
              tags={['Clean', 'Warm', 'Minimal']}
              title="scandinavian"
            />
            <StyleCard 
              imageSrc="/style-quiz/style-industrial.png"
              imageAlt="industrial-style"
              tags={['Raw', 'Urban']}
              title="industrial"
            />
            <StyleCard 
              imageSrc="/style-quiz/style-modern.png"
              imageAlt="modern-style"
              tags={['Sleek', 'Contemporary']}
              title="modern"
            />
        </div>
      </motion.div>
      
      <motion.div 
        className="w-full flex items-start justify-between px-8 py-16"
        variants={itemVariants}
      >
        <motion.div 
          className="relative bg-[#F4F1E8] border border-[#F4F1E8] border-8"
          variants={cardVariants}
        >
            <div className="relative">
                <Image src="/landing/space-studio.png" alt="studio-space" width={700} height={320} />
                <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <div className="p-2 absolute bottom-0 left-0 text-[#F4F1E8] z-10">
                <div className="flex items-center justify-start">
                    <span className="text-2xl font-medium uppercase">studio</span>
                </div>
                <p>Multi-functional space combining living, dining, and kitchen</p>
            </div>
        </motion.div>
        <motion.div 
          className="flex flex-col justify-between pl-24 text-right"
          variants={itemVariants}
        >
            <motion.p 
              className="uppercase font-medium text-2xl mb-16"
              variants={itemVariants}
            >
              2. tell us about your space
            </motion.p>
            <motion.p 
              className="text-base font-normal text-black/80"
              variants={itemVariants}
            >
              Share the basics: <br /> What room you&apos;re designing, your comfort budget, and how you live. <br /> We&apos;ll match products that fit your lifestyle.
            </motion.p>
        </motion.div>
      </motion.div>
      <motion.div 
        className="w-full flex flex-col md:flex-row items-start justify-between px-8 py-16"
        variants={itemVariants}
      >
        <div className="flex flex-col justify-between pr-0 md:pr-24">
            <p className="uppercase font-medium text-2xl mb-16">3. Get smart product recommendations</p>
            <p className="text-base font-normal text-black/80">Our AI analyzes your style preferences and space details to suggest furniture and decor that perfectly match your vision and budget.</p>
        </div>
        <div className="flex items-center justify-end gap-8">
            <motion.div 
              className="relative bg-[#F4F1E8] border border-[#F4F1E8] border-8"
              variants={cardVariants}
            >
                <Image src="/landing/console.png" alt="oak-console" width={300} height={300} />
                <div className="pt-2">
                    <span className="text-xl font-medium uppercase">Nordic Console</span>
                </div>
            </motion.div>
            <motion.div 
              className="relative bg-[#F4F1E8] border border-[#F4F1E8] border-8"
              variants={cardVariants}
            >
                <Image src="/landing/lamp.png" alt="loveseat" width={300} height={300} />
                <div className="pt-2">
                    <span className="text-xl font-medium uppercase">Skyline Lamp</span>
                </div>
            </motion.div>
            <motion.div 
              className="relative bg-[#F4F1E8] border border-[#F4F1E8] border-8"
              variants={cardVariants}
            >
                <Image src="/landing/loveseat.png" alt="floor-lamp" width={300} height={300} />
                <div className="pt-2">
                    <span className="text-xl font-medium uppercase">Grove Loveseat</span>
                </div>
            </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}