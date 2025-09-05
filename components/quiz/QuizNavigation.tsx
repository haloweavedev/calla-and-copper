import { motion } from 'framer-motion'

interface QuizNavigationProps {
  canGoBack: boolean
  canProceed: boolean
  onBack: () => void
  onNext?: () => void
  currentRound: 1 | 2
}

export function QuizNavigation({ 
  canGoBack, 
  canProceed, 
  onBack, 
  onNext,
  currentRound 
}: QuizNavigationProps) {
  return (
    <motion.div 
      className="flex justify-between items-center mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        disabled={!canGoBack}
        className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
          canGoBack
            ? 'bg-brand-cream text-brand-forest border-2 border-brand-forest hover:bg-brand-rich-cream'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        whileHover={canGoBack ? { scale: 1.05 } : {}}
        whileTap={canGoBack ? { scale: 0.95 } : {}}
      >
        ← Back
      </motion.button>

      {/* Round Indicator */}
      <div className="text-center">
        <div className="text-sm text-gray-600">Round {currentRound} of 2</div>
        <div className="text-xs text-gray-400">
          {currentRound === 1 && "Foundation"}
          {currentRound === 2 && "Refinement"}
        </div>
      </div>

      {/* Next Button */}
      <motion.button
        onClick={onNext}
        disabled={!canProceed}
        className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
          canProceed
            ? 'bg-brand-forest text-white hover:bg-brand-forest/90'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        whileHover={canProceed ? { scale: 1.05 } : {}}
        whileTap={canProceed ? { scale: 0.95 } : {}}
      >
        {currentRound === 2 ? 'Complete' : 'Next →'}
      </motion.button>
    </motion.div>
  )
}
