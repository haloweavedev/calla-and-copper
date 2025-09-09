'use client'
import { useDemoStore } from '@/lib/store/demo-store'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { analyzeAndMatch, analyzeExistingImage, getUserUploadedImages, deleteUserUpload } from '../actions'
import { motion, AnimatePresence } from 'framer-motion'
import type { UserUpload } from '@prisma/client'
import Compressor from 'compressorjs'

export function Step3Upload() {
  const photoGuidelines = useMemo(() => ({
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
  }), []);

  const { setStep, setData, uploadedFile, style, roomType, budget, lifestyleTags } = useDemoStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null) // State for error message
  const [preview, setPreview] = useState<string | null>(null)
  const [previousImages, setPreviousImages] = useState<UserUpload[]>([])
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressionProgress, setCompressionProgress] = useState(0)
  
  // Auto-rotating guidelines state
  const [currentGuidelineIndex, setCurrentGuidelineIndex] = useState(0)
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  
  const guidelineKeys = Object.keys(photoGuidelines) as Array<keyof typeof photoGuidelines>

  // Fetch previous images on component mount
  useEffect(() => {
    const fetchPreviousImages = async () => {
      try {
        const result = await getUserUploadedImages()
        if (result.error) {
          console.error('Failed to fetch previous images:', result.error)
        } else {
          setPreviousImages(result.uploads)
        }
      } catch (error) {
        console.error('Error fetching previous images:', error)
      }
    }

    fetchPreviousImages()
  }, [])

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
  }, [currentGuidelineIndex, guidelineKeys, photoGuidelines])

  const currentGuideline = photoGuidelines[guidelineKeys[currentGuidelineIndex]]
  const currentTip = currentGuideline.guidelines[currentTipIndex]

  const compressImage = useCallback((file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.8, // 80% quality
        maxWidth: 1920, // Max width 1920px
        maxHeight: 1920, // Max height 1920px
        convertSize: 1000000, // Convert to JPEG if larger than 1MB
        success: (compressedFile) => {
          console.log('[COMPRESSION] Original size:', (file.size / 1024 / 1024).toFixed(2), 'MB')
          console.log('[COMPRESSION] Compressed size:', (compressedFile.size / 1024 / 1024).toFixed(2), 'MB')
          resolve(compressedFile as File)
        },
        error: (error) => {
          console.error('[COMPRESSION] Error:', error)
          reject(error)
        },
      })
    })
  }, [])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setIsCompressing(true)
      setError(null)
      setCompressionProgress(0)

      try {
        // Show compression progress
        const progressInterval = setInterval(() => {
          setCompressionProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + 10
          })
        }, 100)

        const compressedFile = await compressImage(file)
        
        clearInterval(progressInterval)
        setCompressionProgress(100)

        // Small delay to show 100% completion
        setTimeout(() => {
          setData({ uploadedFile: compressedFile })
          setPreview(URL.createObjectURL(compressedFile))
          setSelectedImageUrl(null) // Clear any previously selected image
          setIsCompressing(false)
          setCompressionProgress(0)
        }, 300)

      } catch (error) {
        console.error('Compression failed:', error)
        setError('Failed to compress image. Please try again.')
        setIsCompressing(false)
        setCompressionProgress(0)
      }
    }
  }, [setData, compressImage])

  const handleSelectPreviousImage = useCallback((upload: UserUpload) => {
    setSelectedImageUrl(upload.publicUrl)
    setPreview(upload.publicUrl)
    setData({ uploadedFile: null }) // Clear current file upload
    setError(null)
  }, [setData])

  const handleDeleteUpload = useCallback(async (uploadId: string) => {
    setIsDeletingId(uploadId)
    setDeleteConfirmId(null)
    setOpenMenuId(null)
    
    try {
      const result = await deleteUserUpload(uploadId)
      if (result.error) {
        setError(result.error)
      } else {
        // Remove from local state
        setPreviousImages(prev => prev.filter(img => img.id !== uploadId))
        
        // Clear selection if the deleted image was selected
        const deletedImage = previousImages.find(img => img.id === uploadId)
        if (deletedImage && selectedImageUrl === deletedImage.publicUrl) {
          setSelectedImageUrl(null)
          setPreview(null)
        }
      }
    } catch (error) {
      console.error('Error deleting upload:', error)
      setError('Failed to delete image. Please try again.')
    } finally {
      setIsDeletingId(null)
    }
  }, [selectedImageUrl, previousImages])

  const handleMenuToggle = useCallback((uploadId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setOpenMenuId(openMenuId === uploadId ? null : uploadId)
  }, [openMenuId])

  const handleDeleteConfirm = useCallback((uploadId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setDeleteConfirmId(uploadId)
    setOpenMenuId(null)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null)
    }
    
    if (openMenuId) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [openMenuId])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.webp'] },
    maxFiles: 1,
    maxSize: undefined, // Remove size limits
    disabled: isCompressing, // Disable during compression
  })

  const [currentProgress, setCurrentProgress] = useState(0)
  const [progressText, setProgressText] = useState("")

  const handleAnalyze = async () => {
    if (!uploadedFile && !selectedImageUrl) return
    
    setIsLoading(true)
    setError(null)
    setCurrentProgress(0)
    setProgressText("")
    console.log('[CLIENT] Starting analysis...')

    try {
      // Start with initial stage
      setCurrentProgress(5)
      setProgressText("Received request to analyze room")

      let result;

      if (selectedImageUrl) {
        // Analyze existing image
        const progressTimeline = [
          { delay: 1000, progress: 25, text: "Using previously uploaded image..." },
          { delay: 3000, progress: 45, text: "Getting insights from our AI stylist..." },
          { delay: 6000, progress: 75, text: "Matching products from our catalog..." },
          { delay: 8000, progress: 95, text: "Analysis and matching complete! Returning results." }
        ]

        // Set up progress timeline
        const progressTimeouts = progressTimeline.map(({ delay, progress, text }) => 
          setTimeout(() => {
            setCurrentProgress(progress)
            setProgressText(text)
          }, delay)
        )

        result = await analyzeExistingImage({
          imageUrl: selectedImageUrl,
          style,
          roomType: roomType || 'Living Room',
          budget: budget || '$1,500-4,000',
          lifestyleTags,
        })

        // Clear all timeouts
        progressTimeouts.forEach(timeout => clearTimeout(timeout))
      } else {
        // Upload and analyze new image
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

        result = await analyzeAndMatch({
          image: uploadedFile!,
          style,
          roomType: roomType || 'Living Room',
          budget: budget || '$1,500-4,000',
          lifestyleTags,
        })

        // Clear all timeouts
        progressTimeouts.forEach(timeout => clearTimeout(timeout))
      }
      
      // Set to completion
      setCurrentProgress(100)
      setProgressText("Complete!")

      if (result.error) {
        throw new Error(result.error)
      }

      console.log('[CLIENT] Analysis successful. Setting data and moving to step 4.')
      setData({ analysisResult: result.analysis, recommendations: result.recommendations })
      useDemoStore.getState().setUploadedFileUrl(result.publicUrl!)
      
      if (result.base64String && result.mimeType) {
        useDemoStore.getState().setUploadedFileData(result.base64String, result.mimeType)
      }
      
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
      <div className="text-center mb-12 flex flex-col lg:flex-row items-center lg:items-start justify-between">
        <div className='flex flex-col items-center lg:items-start justify-center lg:justify-start mb-4 lg:mb-0'>
            <motion.h1 
            className="text-3xl mb-2 text-center lg:text-left"
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
        <div className='flex flex-col items-center lg:items-end justify-center lg:justify-end'>
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
          ${isDragActive ? 'bg-gray-200' : ''}
          ${isCompressing ? 'opacity-75 cursor-not-allowed' : ''}`
          }>
          <input {...getInputProps()} />
          {isCompressing ? (
            <div className='flex flex-col items-center justify-center'>
              <div className="w-16 h-16 mb-4">
                <svg className="animate-spin w-16 h-16 text-brand-gold" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-lg font-medium text-black/80 mb-2">Compressing Image...</p>
              <div className="w-48 bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-brand-gold h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${compressionProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-black/60">{compressionProgress}% complete</p>
            </div>
          ) : preview ? (
            <div className="relative w-full h-80">
              <Image src={preview} alt="Room preview" fill style={{ objectFit: 'contain' }} />
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center'>
              <Image src="/images/image-upload.png" alt="image-upload-placeholder" width={150} height={150} />
              <p className="flex items-center justify-center font-medium mt-4 text-black/60">
                Drag &apos;n&apos; drop a photo here, or click to select a file
              </p>
              <p className="text-xs text-black/40 mt-2">
                Images will be automatically compressed for optimal upload
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Previously Uploaded Images Section */}
      {previousImages.length > 0 && (
        <div className="mt-8">
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium text-black/80">Or choose from your previously uploaded images:</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previousImages.map((upload) => (
              <div
                key={upload.id}
                onClick={() => handleSelectPreviousImage(upload)}
                className={`relative aspect-square cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                  selectedImageUrl === upload.publicUrl
                    ? 'border-brand-gold ring-2 ring-brand-gold/50'
                    : 'border-gray-200 hover:border-brand-gold/50'
                }`}
              >
                <Image
                  src={upload.publicUrl}
                  alt={`Uploaded ${upload.fileName}`}
                  fill
                  className="object-cover"
                />
                
                {/* Three-dot menu button */}
                <button
                  onClick={(e) => handleMenuToggle(upload.id, e)}
                  className="absolute top-2 right-2 w-6 h-6 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200"
                  aria-label="Menu"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {openMenuId === upload.id && (
                  <div className="absolute top-8 right-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-32">
                    <button
                      onClick={(e) => handleDeleteConfirm(upload.id, e)}
                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      disabled={isDeletingId === upload.id}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}

                {/* Selection indicator */}
                {selectedImageUrl === upload.publicUrl && (
                  <div className="absolute inset-0 bg-brand-gold/20 flex items-center justify-center">
                    <div className="bg-brand-gold text-white px-2 py-1 rounded text-xs font-medium">
                      Selected
                    </div>
                  </div>
                )}

                {/* Loading indicator for deletion */}
                {isDeletingId === upload.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Image?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this image? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteUpload(deleteConfirmId)}
                disabled={isDeletingId === deleteConfirmId}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors flex items-center gap-2"
              >
                {isDeletingId === deleteConfirmId && (
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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
      <div className="mt-8 flex gap-4 justify-between items-center">
        <button onClick={() => setStep(2)} className="px-6 py-2 font-medium transition-all duration-200 bg-white text-black/80 border-2 border-black/80 hover:bg-black/80 hover:text-white cursor-pointer">← Back</button>
        <button 
          onClick={handleAnalyze} 
          disabled={(!uploadedFile && !selectedImageUrl) || isLoading} 
          className={`px-6 py-2 font-medium transition-all duration-200 ${
            (uploadedFile || selectedImageUrl)
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
    <div className="text-center py-16 flex flex-col items-center justify-center px-12">
      <h2 className="text-2xl font-base uppercase">Finding your perfect matches</h2>
      <div className="flex justify-center mt-8">
        <video
          src="/logo-loading.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-46 h-46 object-contain opacity-90"
          aria-label="Loading animation"
        />
      </div>
      <div className="mt-8 px-8 max-w-md w-md">
        <div className="w-full bg-gray-200 rounded-full h-3 border border-gray-300">
          <div className="bg-brand-forest h-full rounded-full transition-all duration-300" style={{ width: `${currentProgress}%` }}></div>
        </div>
        <span className="block mt-4 text-sm text-black/60">{progressText}</span>
      </div>
    </div>
  )
}