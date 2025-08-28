import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type StyleSelection = 'SCANDINAVIAN' | 'INDUSTRIAL' | 'BOHO' | 'MODERN' | 'VINTAGE'
export type RoomType = 'Living Room' | 'Bedroom' | 'Studio/Open Plan' | 'Kitchen' | 'Home Office'
export type Budget = '$500' | '$1500' | '$3500+'

type DemoState = {
  step: number
  style: StyleSelection | null
  roomType: RoomType | null
  budget: Budget | null
  lifestyleTags: string[]
  uploadedFile: File | null
  uploadedFileUrl: string | null
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
}

type DemoActions = {
  setStep: (step: number) => void
  setData: (data: Partial<Omit<DemoState, 'step'>>) => void
  setUploadedFileUrl: (url: string) => void
  reset: () => void
}

const initialState: DemoState = {
  step: 1,
  style: null,
  roomType: null,
  budget: null,
  lifestyleTags: [],
  uploadedFile: null,
  uploadedFileUrl: null,
  analysisResult: null,
  recommendations: null,
}

export const useDemoStore = create<DemoState & DemoActions>()(
  persist(
    (set) => ({
      ...initialState,
      setStep: (step) => set({ step }),
      setData: (data) => set((state) => ({ ...state, ...data })),
      setUploadedFileUrl: (url) => set({ uploadedFileUrl: url }),
      reset: () => set({ ...initialState }),
    }),
    { name: 'calla-copper-demo-storage' }
  )
)