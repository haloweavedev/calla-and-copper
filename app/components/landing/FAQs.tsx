'use client'

import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { staggerContainerVariants, itemVariants, fadeInVariants } from '@/lib/animations/variants'

export default function FAQs() {
    const [expandedItems, setExpandedItems] = useState<number[]>([])
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    const toggleFAQ = (index: number) => {
        setExpandedItems(prev => 
            prev.includes(index) 
                ? prev.filter(item => item !== index)
                : [...prev, index]
        )
    }

    const faqItems = [
        {
            question: "How does the AI product recommendation work?",
            answer: "Upload a photo of your room and our AI analyzes your space, style, and dimensions to suggest furniture and decor that actually fits. No more guessing if that couch will work in your living room."
        },
        {
            question: "What if I don't know my room dimensions?",
            answer: "No problem! You can estimate room size from photos, enter approximate measurements, or use our quick size comparison tool. Our AI works with rough measurements - you don't need architect-level precision."
        },
        {
            question: "Do I have to buy everything you suggest?",
            answer: "Absolutely not. We show you products that work well together, but you can pick and choose what you love. Save items for later, compare options, or buy one piece at a time."
        },
        {
            question: "What types of rooms can I design?",
            answer: "We support all major living spaces - living rooms, bedrooms, kitchens, home offices, dining rooms, and more. Each room type gets personalized product suggestions based on how you actually use the space."
        },
        {
            question: "How much does it cost to use Calla & Copper?",
            answer: "Getting AI recommendations is completely free. You only pay when you purchase products you love through our partner retailers. No subscription fees, no hidden costs - just smart shopping made simple."
        }
    ]

    return (
        <motion.div 
            id="faq"
            ref={ref}
            className="w-full flex flex-col items-center justify-center py-16"
            variants={fadeInVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <motion.h1 
                className="text-5xl font-medium text-gray-800 mb-4"
                variants={itemVariants}
            >
                FAQs
            </motion.h1>
            <motion.div 
                className="w-full md:w-3/5 px-4 flex flex-col items-center justify-center gap-8"
                variants={staggerContainerVariants}
            >
                {faqItems.map((item, index) => (
                    <motion.div 
                        key={index} 
                        className="w-full flex flex-col items-center justify-center py-4 border-b border-gray-200 last:border-b-0"
                        variants={itemVariants}
                    >
                        <div 
                            className="w-full flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
                            onClick={() => toggleFAQ(index)}
                        >
                            <p className="text-xl font-normal text-black pr-4">{item.question}</p>
                            <span className="text-3xl font-light text-black transition-transform duration-300 ease-in-out flex-shrink-0">
                                {expandedItems.includes(index) ? '−' : '+'}
                            </span>
                        </div>
                        <div 
                            className={`overflow-hidden transition-all duration-300 ease-in-out w-full ${
                                expandedItems.includes(index) ? 'max-h-32 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                            }`}
                        >
                            <p className="text-base font-normal text-black/80 px-4 pb-4">
                                {item.answer}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}