'use client'
import { useDemoStore } from '@/lib/store/demo-store'
import { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { analyzeAndMatch } from '../actions'
import { motion, AnimatePresence } from 'framer-motion'

export function Step3Upload() {
  const photoGuidelines = {
    "whatToPhotograph": {
      title: "📸 What Should I Photograph?",
      guidelines: [
        "Include existing furniture or empty space",
        "Show the entire room from corner to corner", 
        "Capture natural lighting when possible",
        "Include windows, doors, and architectural features",
        "Show any built-ins or permanent fixtures"
      ]
    },
    "howToTakePhotos": {
      title: "💡 How Do I Take Good Photos?",
      guidelines: [
        "Take photos during daytime for best lighting",
        "Hold phone steady for clear, sharp images",
        "Stand in the doorway or corner for full room view",
        "Avoid using flash - natural light works best",
        "Multiple angles help us understand your space better"
      ]
    },
    "dontWorryAbout": {
      title: "🙅‍♀️ Don't Worry About This",
      guidelines: [
        "Don't worry about cleaning up first",
        "Clutter is fine - we focus on the space itself",
        "No need to stage or style before photos", 
        "Personal items can stay - we see past them"
      ]
    },
    "cameraTips": {
      title: "📱 Quick Camera Tip",
      guidelines: [
        "Take photos in landscape/horizontal orientation",
        "Step back to capture more of the room",
        "Shoot from about chest height",
        "Include the ceiling and floor in your shot",
        "2-3 different angles give us the full picture"
      ]
    },
    "encouragement": {
      title: "✨ You've Got This!",
      guidelines: [
        "Imperfect photos work perfectly fine",
        "We'll focus on your space, not your stuff",
        "Any room condition is okay to photograph",
        "Your 'before' helps us create your 'after'",
        "We see the potential in every space"
      ]
    }
  };

  const { setStep, setData, uploadedFile, style, roomType, budget, lifestyleTags } = useDemoStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null) // State for error message
  const [preview, setPreview] = useState<string | null>(null)
  
  // Auto-rotating guidelines state
  const [currentGuidelineIndex, setCurrentGuidelineIndex] = useState(0)
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  
  const guidelineKeys = Object.keys(photoGuidelines) as Array<keyof typeof photoGuidelines>

  // Auto-rotate guidelines every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGuidelineIndex((prev) => (prev + 1) % guidelineKeys.length)
      setCurrentTipIndex(0) // Reset tip index when changing categories
    }, 4000)

    return () => clearInterval(interval)
  }, [guidelineKeys.length])

  // Auto-rotate tips within each guideline every 2 seconds
  useEffect(() => {
    const currentGuideline = photoGuidelines[guidelineKeys[currentGuidelineIndex]]
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % currentGuideline.guidelines.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [currentGuidelineIndex, guidelineKeys])

  const currentGuideline = photoGuidelines[guidelineKeys[currentGuidelineIndex]]
  const currentTip = currentGuideline.guidelines[currentTipIndex]

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setData({ uploadedFile: file })
      setPreview(URL.createObjectURL(file))
      setError(null) // Clear previous errors on new upload
    }
  }, [setData])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.webp'] },
    maxFiles: 1,
  })

  const [currentProgress, setCurrentProgress] = useState(0)
  const [progressText, setProgressText] = useState("")

  const handleAnalyze = async () => {
    if (!uploadedFile || !style || !roomType || !budget) return
    
    setIsLoading(true)
    setError(null)
    setCurrentProgress(0)
    setProgressText("")
    console.log('[CLIENT] Starting analysis...')

    try {
      // Start with initial stage
      setCurrentProgress(5)
      setProgressText("Received request to analyze room")

      // Simulate realistic timing based on server actions
      const progressTimeline = [
        { delay: 1000, progress: 15, text: "Uploading Image to database..." },
        { delay: 3000, progress: 25, text: "Image upload successful!" },
        { delay: 5000, progress: 45, text: "Getting insights from our AI stylist..." },
        { delay: 8000, progress: 55, text: "AI analysis successful!" },
        { delay: 10000, progress: 75, text: "Matching products from our catalog..." },
        { delay: 12000, progress: 95, text: "Analysis and matching complete! Returning results." }
      ]

      // Set up progress timeline
      const progressTimeouts = progressTimeline.map(({ delay, progress, text }) => 
        setTimeout(() => {
          setCurrentProgress(progress)
          setProgressText(text)
        }, delay)
      )

      const result = await analyzeAndMatch({
        image: uploadedFile,
        style,
        roomType,
        budget,
        lifestyleTags,
      })

      // Clear all timeouts
      progressTimeouts.forEach(timeout => clearTimeout(timeout))
      
      // Set to completion
      setCurrentProgress(100)
      setProgressText("Complete!")

      if (result.error) {
        throw new Error(result.error)
      }

      console.log('[CLIENT] Analysis successful. Setting data and moving to step 4.')
      setData({ analysisResult: result.analysis, recommendations: result.recommendations })
      useDemoStore.getState().setUploadedFileUrl(result.publicUrl!)
      setStep(4)

    } catch (e: unknown) {
      console.error('[CLIENT] An error occurred during analysis:', e)
      setError(e instanceof Error ? e.message : 'An unknown error occurred. Please try again.')
      // We stay on step 3 to show the error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    isLoading ? (
      <Step3Loading currentProgress={currentProgress} progressText={progressText} />
    ) : (
      <div className="text-center">
      <div className="text-center mb-12 flex flex-row justify-between">
        <div className='flex flex-col items-start justify-start'>
            <motion.h1 
            className="text-3xl mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            >
            Show us your space
            </motion.h1>
            
            <motion.p 
            className="text-lg uppercase font-light"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            >
             We&apos;ll match recommendations to your existing style and lighting
            </motion.p>
        </div>
        <div className='flex flex-col items-end justify-end'>
            <motion.h1 
            className="text-2xl mb-2 uppercase font-medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            >
                room photo upload
            </motion.h1>
            <div className='bg-brand-forest text-white text-xs px-6 py-0 flex flex-row items-center justify-center gap-2'>
                <span>3</span>
                <span>of</span>
                <span>3</span>
            </div>
        </div>
      </div>  
      
      {error && (
        <div className="p-4 mb-4 border-2 border-black bg-red-500 text-white font-bold">
          <p>Error: {error}</p>
        </div>
      )}
      <div className='w-full flex items-center justify-center'>
        <div {...getRootProps()} 
          className={
          `flex items-center justify-center w-2/3 min-h-80 p-6 border-1 border-dashed border-black bg-white cursor-pointer transition-all
          ${isDragActive ? 'bg-gray-200' : ''}`
          }>
          <input {...getInputProps()} />
          {preview ? (
            <div className="relative w-full h-80">
              <Image src={preview} alt="Room preview" fill style={{ objectFit: 'contain' }} />
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center'>
              <Image src="/images/image-upload.png" alt="image-upload-placeholder" width={150} height={150} />
              <p className="flex items-center justify-center font-medium mt-4 text-black/60">Drag &apos;n&apos; drop a photo here, or click to select a file</p>
            </div>

          )}
        </div>
      </div>

      <div className='flex flex-col items-center justify-center py-6'>
        <span className='text-base font-light uppercase text-black/60 mb-2'>Photo Guidelines</span>
        <AnimatePresence mode="wait">
          <motion.span 
            key={`title-${currentGuidelineIndex}`}
            className='font-medium text-base text-black/80'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentGuideline.title}
          </motion.span>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.span 
            key={`tip-${currentGuidelineIndex}-${currentTipIndex}`}
            className='text-sm text-black/60 mt-1'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentTip}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex gap-4 justify-center">
        <button onClick={() => setStep(2)} className="px-6 py-2 font-medium transition-all duration-200 bg-white text-black/80 border-2 border-black/80 hover:bg-black/80 hover:text-white cursor-pointer">← Back</button>
        <button 
          onClick={handleAnalyze} 
          disabled={!uploadedFile || isLoading} 
          className={`px-6 py-2 font-medium transition-all duration-200 ${
            uploadedFile
              ? 'bg-brand-gold text-white border-2 border-brand-gold hover:bg-brand-gold/90 hover:text-white cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}>
          Analyze & Get Matches
        </button>
      </div>
    </div>
    )
  )
}

export function Step3Loading({ currentProgress, progressText }: { currentProgress: number; progressText: string }) {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-base uppercase">Finding your perfect matches</h2>
      <div className="flex justify-center mt-8">
        <video
          src="/seat-loading.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-46 h-46 object-contain opacity-90"
          aria-label="Loading animation"
        />
      </div>
      <div className="mt-8 px-8 max-w-md mx-auto">
        <div className="w-full bg-gray-200 rounded-full h-3 border border-gray-300">
          <div className="bg-brand-forest h-full rounded-full transition-all duration-300" style={{ width: `${currentProgress}%` }}></div>
        </div>
        <span className="block mt-4 text-sm text-black/60">{progressText}</span>
      </div>
    </div>
  )
}