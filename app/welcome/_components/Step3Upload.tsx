'use client'
import { useDemoStore } from '@/lib/store/demo-store'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { analyzeAndMatch } from '../actions'

export function Step3Upload() {
  const { setStep, setData, uploadedFile, style, roomType, budget, lifestyleTags } = useDemoStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null) // State for error message
  const [preview, setPreview] = useState<string | null>(null)

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

  const handleAnalyze = async () => {
    if (!uploadedFile || !style || !roomType || !budget) return
    
    setIsLoading(true)
    setError(null)
    console.log('[CLIENT] Starting analysis...')

    try {
      const result = await analyzeAndMatch({
        image: uploadedFile,
        style,
        roomType,
        budget,
        lifestyleTags,
      })

      if (result.error) {
        throw new Error(result.error)
      }

      console.log('[CLIENT] Analysis successful. Setting data and moving to step 4.')
      setData({ analysisResult: result.analysis, recommendations: result.recommendations })
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
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-2">Show us your space.</h1>
      <p className="text-md mb-8">We&apos;ll match recommendations to your existing style and lighting.</p>
      
      {error && (
        <div className="p-4 mb-4 border-2 border-black bg-red-500 text-white font-bold">
          <p>Error: {error}</p>
        </div>
      )}

      <div {...getRootProps()} className={`p-6 border-4 border-dashed border-black bg-white cursor-pointer transition-all ${isDragActive ? 'bg-gray-200' : ''}`}>
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative w-full h-80">
            <Image src={preview} alt="Room preview" fill style={{ objectFit: 'contain' }} />
          </div>
        ) : (
          <p className="h-80 flex items-center justify-center font-bold">Drag &apos;n&apos; drop a photo here, or click to select a file</p>
        )}
      </div>
      <div className="mt-8 flex gap-4 justify-center">
        <button onClick={() => setStep(2)} className="px-8 py-3 border-2 border-black bg-white font-bold hover:bg-gray-100 shadow-[4px_4px_0px_#000]">Back</button>
        <button onClick={handleAnalyze} disabled={!uploadedFile || isLoading} className="px-8 py-3 border-2 border-black bg-black text-white font-bold disabled:bg-gray-400 disabled:text-gray-600 disabled:shadow-none hover:bg-gray-800 shadow-[4px_4px_0px_#000]">
          {isLoading ? 'Analyzing...' : 'Analyze & Get Matches'}
        </button>
      </div>
    </div>
  )
}