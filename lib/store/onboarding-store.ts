import { create } from 'zustand'

// Define enum types manually until Prisma client is generated
enum Style {
  SCANDINAVIAN = 'SCANDINAVIAN',
  INDUSTRIAL = 'INDUSTRIAL',
  BOHO = 'BOHO',
  MODERN = 'MODERN',
  JAPANDI = 'JAPANDI',
  MINIMALIST = 'MINIMALIST',
  ECLECTIC = 'ECLECTIC'
}

enum RoomType {
  LIVING_ROOM = 'LIVING_ROOM',
  BEDROOM = 'BEDROOM',
  STUDIO = 'STUDIO',
  OFFICE = 'OFFICE',
  DINING_ROOM = 'DINING_ROOM',
  KITCHEN = 'KITCHEN'
}

enum Budget {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  FLEXIBLE = 'FLEXIBLE'
}

type OnboardingState = {
  style: Style | null
  roomType: RoomType | null
  budget: Budget | null
  tags: string[]
  layoutPreset: string | null
  dimensions: { length: number; width: number } | null
  photoUrl: string | null
}

type OnboardingActions = {
  setStore: (data: Partial<OnboardingState>) => void
  reset: () => void
}

const initialState: OnboardingState = {
  style: null,
  roomType: null,
  budget: null,
  tags: [],
  layoutPreset: null,
  dimensions: null,
  photoUrl: null,
}

export const useOnboardingStore = create<OnboardingState & OnboardingActions>()((set) => ({
  ...initialState,
  setStore: (data) => set((state) => ({ ...state, ...data })),
  reset: () => set(initialState),
}))

export { Style, RoomType, Budget } 