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
  uploadedFileBase64: string | null
  uploadedFileMimeType: string | null
  analysisResult: { description: string; tags: string[]; colorPalette?: string[] } | null
  recommendations: Array<{
    id: number
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
  setUploadedFileData: (base64: string, mimeType: string) => void
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
  uploadedFileBase64: null,
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
      setUploadedFileData: (base64: string, mimeType: string) => set({ uploadedFileBase64: base64, uploadedFileMimeType: mimeType }),
      reset: () => set(initialState),
    }),
    { name: 'calla-copper-demo-storage' }
  )
)