import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { StyleProfile } from '@/components/quiz/types'

export type StyleSelection = 'SCANDINAVIAN' | 'INDUSTRIAL' | 'BOHO' | 'MODERN' | 'VINTAGE'
export type RoomType = 'Living Room' | 'Bedroom' | 'Home Office' | 'Kitchen' | 'Dining Room' | 'Dining Area' | 'Guest Room' | 'Bathroom' | 'Kid\'s Room' | 'Entryway/Foyer' | 'Patio/Deck' | 'Master/Primary Suite'
export type Budget = '$500-1,500' | '$1,500-4,000' | '$4,000-8,000' | '$8,000+'

type DemoState = {
  step: number
  style: StyleSelection | null
  styleProfile: StyleProfile | null
  roomType: RoomType | null
  budget: Budget | null
  lifestyleTags: string[]
  uploadedFile: File | null
  uploadedFileUrl: string | null
  uploadedFileMimeType: string | null
  analysisResult: { description: string; tags: string[]; colorPalette?: string[] } | null
  recommendations: Array<{
    id: string
    name: string
    style: string
    category?: string
    description?: string
    tags: string[]
    price: number
    imageUrl: string
  }> | null
  creationId: string | null
}

type DemoActions = {
  setStep: (step: number) => void
  setData: (data: Partial<Omit<DemoState, 'step'>>) => void
  setUploadedFileUrl: (url: string) => void
  setUploadedFileMimeType: (mimeType: string) => void
  convertUrlToBase64: (url: string) => Promise<string>
  reset: () => void
}

const initialState: DemoState = {
  step: 1,
  style: null,
  styleProfile: null,
  roomType: null,
  budget: null,
  lifestyleTags: [],
  uploadedFile: null,
  uploadedFileUrl: null,
  uploadedFileMimeType: null,
  analysisResult: null,
  recommendations: null,
  creationId: null,
}

export const useDemoStore = create<DemoState & DemoActions>()(
  persist(
    (set) => ({
      ...initialState,
      setStep: (step) => set({ step }),
      setData: (data) => set((state) => ({ ...state, ...data })),
      setUploadedFileUrl: (url) => set({ uploadedFileUrl: url }),
      setUploadedFileMimeType: (mimeType) => set({ uploadedFileMimeType: mimeType }),
      convertUrlToBase64: async (url: string) => {
        try {
          const response = await fetch(url)
          const blob = await response.blob()
          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
              const base64String = reader.result as string
              // Remove the data URL prefix to get just the base64 data
              const base64Data = base64String.split(',')[1]
              resolve(base64Data)
            }
            reader.onerror = reject
            reader.readAsDataURL(blob)
          })
        } catch (error) {
          console.error('Failed to convert URL to base64:', error)
          throw error
        }
      },
      reset: () => set(initialState),
    }),
    { name: 'calla-copper-demo-storage' }
  )
)