'use client'

import Image from "next/image"
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { containerVariants, itemVariants, cardVariants } from '@/lib/animations/variants'

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
        className="text-5xl font-medium text-gray-800 mb-4 text-left px-8"
        variants={itemVariants}
      >
        Transform any room in 3 simple steps
      </motion.h1>
      
      <motion.div 
        className="w-full flex items-start justify-between px-8 py-16"
        variants={itemVariants}
      >
        <div className="flex flex-col justify-between pr-24">
            <p className="uppercase font-medium text-2xl mb-16">1. Pick the style that makes you feel at home</p>
            <p className="text-base font-normal text-black/80">Browse visual style inspiration and choose what speaks to you. No design experience needed - just pick what feels right.</p>
        </div>
        <div className="flex items-center justify-end gap-8">
            <motion.div 
              className="relative bg-[#F4F1E8] border border-[#F4F1E8] border-8"
              variants={cardVariants}
            >
                <Image src="/landing/style-scandinavian.png" alt="scandinavian-style" width={300} height={450} />
                <div className="py-1">
                    <p className="font-light text-sm mb-8">Clean | Warm | Minimal</p>
                    <span className="text-xl font-medium uppercase">scandinavian</span>
                </div>
            </motion.div>
            <motion.div 
              className="relative bg-[#F4F1E8] border border-[#F4F1E8] border-8"
              variants={cardVariants}
            >
                <Image src="/landing/style-industrial.png" alt="industrial-style" width={300} height={450} />
                <div className="py-1">
                    <p className="font-light text-sm mb-8">Raw | Urban</p>
                    <span className="text-xl font-medium uppercase">industrial</span>
                </div>
            </motion.div>
            <motion.div 
              className="relative bg-[#F4F1E8] border border-[#F4F1E8] border-8"
              variants={cardVariants}
            >
                <Image src="/landing/style-modern.png" alt="modern-style" width={300} height={450} />
                <div className="py-1">
                    <p className="font-light text-sm mb-8">Sleek | Contemporary</p>
                    <span className="text-xl font-medium uppercase">modern</span>
                </div>
            </motion.div>
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
              Share the basics: <br /> What room you're designing, your comfort budget, and how you live. <br /> We'll match products that fit your lifestyle.
            </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}