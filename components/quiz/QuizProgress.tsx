import { motion } from 'framer-motion'

interface QuizProgressProps {
  currentRound: 1 | 2
  progress: string
}

export function QuizProgress({ currentRound, progress }: QuizProgressProps) {
  return (
    <div className="flex flex-col items-center mb-8">
      <motion.div 
        className="text-2xl font-bold text-brand-forest mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Round {progress}
      </motion.div>
      
      <div className="flex items-center space-x-2">
        {[1, 2].map((round) => (
          <motion.div
            key={round}
            className={`w-3 h-3 rounded-full ${
              round <= currentRound ? 'bg-brand-gold' : 'bg-gray-300'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: round * 0.1,
              type: "spring",
              stiffness: 200
            }}
          />
        ))}
      </div>
      
              <motion.div 
          className="text-sm text-gray-600 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {currentRound === 1 && "Choose your style foundation"}
          {currentRound === 2 && "Refine your style direction"}
        </motion.div>
    </div>
  )
}
