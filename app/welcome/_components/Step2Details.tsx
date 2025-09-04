'use client'
import { useDemoStore, RoomType, Budget } from '@/lib/store/demo-store'
import { motion } from 'framer-motion'
import { StyleProfile, StyleOption } from '@/components/quiz'
import { StyleCard } from '@/components/cards'
import { styleDecisionTree } from '@/components/quiz/styleDecisionTree'

const primarySpaces: RoomType[] = ['Living Room', 'Bedroom', 'Home Office', 'Kitchen']
const secondarySpaces: RoomType[] = ['Dining Area', 'Bathroom', 'Kid\'s Room', 'Patio/Deck']
const budgetOptions = [
  {
    value: '$500-1,500' as Budget,
    label: 'Starter',
    price: '$500-1,500',
    description: 'A few key pieces to refresh the space'
  },
  {
    value: '$1,500-4,000' as Budget,
    label: 'Moderate',
    price: '$1,500-4,000',
    description: 'Several quality pieces to transform the room'
  },
  {
    value: '$4,000-8,000' as Budget,
    label: 'Generous',
    price: '$4,000-8,000',
    description: 'Complete room redesign with quality furniture'
  },
  {
    value: '$8,000+' as Budget,
    label: 'Investment',
    price: '$8,000+',
    description: 'Premium pieces and complete transformation'
  }
]
const lifestyleSections = [
  {
    title: 'Living Situation',
    tags: ['Pet-friendly', 'Kid-friendly', 'Work from home', 'Frequent entertainer']
  },
  {
    title: 'Space & Practical',
    tags: ['Small space living', 'Storage seeker', 'Natural light lover', 'Plant parent']
  },
  {
    title: 'Lifestyle Preferences',
    tags: ['Minimalist', 'Cozy homebody', 'Tech enthusiast', 'Book lover', 'Fitness focused']
  },
  {
    title: 'Values & Approach',
    tags: ['Budget-conscious', 'Eco-conscious', 'Quality investor']
  }
]

// Helper function to get StyleOption from stylePath (single level now)
function getSelectedStyleOption(styleProfile: StyleProfile | null): StyleOption | null {
  // If no style profile (user skipped), return AI-powered discovery option
  if (!styleProfile) {
    const aiNode = styleDecisionTree["AI-Powered Discovery"]
    return {
      id: "AI-Powered Discovery",
      title: "AI-Powered Discovery",
      description: aiNode.description,
      keywords: aiNode.keywords || [],
      imageSrc: aiNode.imageSrc
    }
  }
  
  const [foundation] = styleProfile.stylePath
  
  const foundationNode = styleDecisionTree[foundation]
  
  if (!foundationNode) return null
  
  return {
    id: foundation,
    title: foundation,
    description: foundationNode.description,
    keywords: foundationNode.keywords || [],
    imageSrc: foundationNode.imageSrc
  }
}

// Reusable component for lifestyle tag sections
interface LifestyleSectionProps {
  title: string
  tags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
}

function LifestyleSection({ title, tags, selectedTags, onTagToggle }: LifestyleSectionProps) {
  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium text-black/60 mb-3 text-left">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button 
            key={tag} 
            onClick={() => onTagToggle(tag)} 
            className={`px-3 py-1 font-medium text-sm transition-all rounded-sm ${
              selectedTags.includes(tag) 
                ? 'bg-brand-warm-brown text-white border-1 border-brand-warm-brown' 
                : 'bg-gray-100 text-black hover:bg-gray-200 border-1'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

export function Step2Details() {

  const { setStep, setData, roomType, budget, lifestyleTags, styleProfile } = useDemoStore()

  const handleTagToggle = (tag: string) => {
    const newTags = lifestyleTags.includes(tag)
      ? lifestyleTags.filter((t) => t !== tag)
      : [...lifestyleTags, tag]
    setData({ lifestyleTags: newTags })
  }

  const canProceed = roomType && budget

  // Skip handler - preserves existing selections but allows proceeding without them
  const handleSkip = () => {
    setStep(3)
  }

  // Proceed handler - only works when both roomType and budget are selected
  const handleProceed = () => {
    if (canProceed) {
      setStep(3)
    }
  }

  // Get the selected style option for display (handles both selected and skipped cases)
  const selectedStyleOption = getSelectedStyleOption(styleProfile)

  return (
    <div className="text-center">
      <div className="text-center mb-12 flex flex-row justify-between">
        <div className='flex flex-col items-start justify-start'>
            <motion.h1 
            className="text-3xl mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            >
            Tell us about your space
            </motion.h1>
            
            <motion.p 
            className="text-lg uppercase font-light"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            >
             Share the basics so we can personalize your recommendations
            </motion.p>
            <motion.p 
            className="text-md text-black/60 mt-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            >or press skip to move ahead
            </motion.p>
        </div>
        <div className='flex flex-col items-end justify-end gap-2'>
            <motion.h1 
            className="text-2xl uppercase font-medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            >
                room details
            </motion.h1>
            <div className='bg-brand-forest text-white text-xs px-6 py-0 flex flex-row items-center justify-center gap-2'>
                <span>2</span>
                <span>of</span>
                <span>3</span>
            </div>
              {/* skip button */}      
              <button
                onClick={handleSkip}
                className="cursor-pointer hover:bg-gray-200 px-4 py-1 rounded-md flex items-center justify-center"
              >
                Skip →
              </button>
        </div>
      </div>
      <div className='flex items-start justify-center'>
        {/* Display Selected Style Card */}
        {selectedStyleOption && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="block font-medium uppercase mb-6 text-black text-left">
              {styleProfile ? "Your Selected Style:" : "No Style Selected:"}
            </h3>
            <div className="flex justify-center">
              <StyleCard
                imageSrc={selectedStyleOption.imageSrc}
                imageAlt={selectedStyleOption.title}
                tags={selectedStyleOption.keywords}
                title={selectedStyleOption.title}
                variant="default"
                showLabel={false}
              />
            </div>
          </motion.div>
        )}
        <div className="space-y-6 text-left px-6 flex flex-col w-1/2">
          <div className=''>
            <label className="block font-medium uppercase mb-6 text-black">Room Type:</label>
            
            {/* Primary Spaces */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-black/60 mb-3 text-left">Primary Spaces</h4>
              <div className="flex flex-wrap gap-2">
                {primarySpaces.map((type) => (
                  <button key={type} onClick={() => setData({ roomType: type })} className={`px-4 py-2 border-2 border-brand-dark-brown font-bold transition-all ${roomType === type ? 'bg-brand-dark-brown text-white' : 'bg-white text-black hover:bg-gray-100'}`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Secondary Spaces */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-black/60 mb-3 text-left">Secondary Spaces</h4>
              <div className="flex flex-wrap gap-2">
                {secondarySpaces.map((type) => (
                  <button key={type} onClick={() => setData({ roomType: type })} className={`px-4 py-2 border-2 border-brand-dark-brown font-bold transition-all ${roomType === type ? 'bg-brand-dark-brown text-white' : 'bg-white text-black hover:bg-gray-100'}`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className=''>
            <label htmlFor="budget" className="block font-light uppercase mb-6 text-black/60">Budget range:</label>
            <select id="budget" value={budget ?? ''} onChange={(e) => setData({ budget: e.target.value as Budget })} className="w-full p-2 border-2 border-black bg-white font-bold">
              <option value="" disabled>Select a budget</option>
              {budgetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}: {option.price} - {option.description}
                </option>
              ))}
            </select>
          </div>
        </div>
          <div>
           <label className="block font-medium uppercase mb-6 text-black text-left">Optional Lifestyle Tags:</label>
           
           {lifestyleSections.map((section) => (
             <LifestyleSection
               key={section.title}
               title={section.title}
               tags={section.tags}
               selectedTags={lifestyleTags}
               onTagToggle={handleTagToggle}
             />
           ))}
         </div>
      </div>



      <div className="mt-8 flex gap-4 justify-between items-center">
        <button 
          onClick={() => setStep(1)} 
          className="px-6 py-2 font-medium transition-all duration-200 bg-white text-black/80 border-2 border-black/80 hover:bg-black/80 hover:text-white cursor-pointer"
        >
          ← Back
        </button>
        <button 
          onClick={handleProceed} 
          disabled={!canProceed} 
          className={`px-6 py-2 font-medium transition-all duration-200 ${
            canProceed
              ? 'bg-brand-gold text-white border-2 border-brand-gold hover:bg-brand-gold/90 hover:text-white cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Almost Done →
        </button>
      </div>
    </div>
  )
}