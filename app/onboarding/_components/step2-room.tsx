'use client'

import { useOnboardingStore, RoomType, Budget } from '@/lib/store/onboarding-store'

interface Step2RoomProps {
  onBack: () => void
  onFinish: () => void
}

export function Step2Room({ onBack, onFinish }: Step2RoomProps) {
  const { setStore, roomType, budget } = useOnboardingStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFinish()
  }

  return (
    <div className="text-center max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-8">A few more details...</h1>
      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <div>
          <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">
            What room are you designing?
          </label>
          <select
            id="roomType"
            name="roomType"
            value={roomType ?? ''}
            onChange={(e) => setStore({ roomType: e.target.value as RoomType })}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="" disabled>Select a room</option>
            {Object.values(RoomType).map((type) => (
              <option key={type} value={type}>{type.replace('_', ' ')}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
            What&apos;s your budget?
          </label>
          <select
            id="budget"
            name="budget"
            value={budget ?? ''}
            onChange={(e) => setStore({ budget: e.target.value as Budget })}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="" disabled>Select a budget</option>
            {Object.values(Budget).map((b) => (
              <option key={b} value={b}>{b.charAt(0) + b.slice(1).toLowerCase()}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="w-full px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Finish & See Suggestions
          </button>
        </div>
      </form>
    </div>
  )
} 