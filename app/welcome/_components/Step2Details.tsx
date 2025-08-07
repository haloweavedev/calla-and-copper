'use client'
import { useDemoStore, RoomType, Budget } from '@/lib/store/demo-store'

const roomTypes: RoomType[] = ['Living Room', 'Bedroom', 'Studio/Open Plan', 'Kitchen', 'Home Office']
const budgets: Budget[] = ['$500', '$1500', '$3500+']
const lifestyleOptions = ['Pet-friendly', 'Lots of natural light', 'Need storage solutions', 'Frequently entertain']

export function Step2Details() {
  const { setStep, setData, roomType, budget, lifestyleTags } = useDemoStore()

  const handleTagToggle = (tag: string) => {
    const newTags = lifestyleTags.includes(tag)
      ? lifestyleTags.filter((t) => t !== tag)
      : [...lifestyleTags, tag]
    setData({ lifestyleTags: newTags })
  }

  const canProceed = roomType && budget

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-2">Tell us about your space.</h1>
      <p className="text-md mb-8">Help us create designs that fit your life.</p>
      <div className="space-y-6 text-left p-6 border-2 border-black bg-white shadow-[8px_8px_0px_#000]">
        <div>
          <label className="block font-bold mb-2">Room Type Selection:</label>
          <div className="flex flex-wrap gap-2">
            {roomTypes.map((type) => (
              <button key={type} onClick={() => setData({ roomType: type })} className={`px-4 py-2 border-2 border-black font-bold transition-all ${roomType === type ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}>
                {type}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="budget" className="block font-bold mb-2">Budget range:</label>
          <select id="budget" value={budget ?? ''} onChange={(e) => setData({ budget: e.target.value as Budget })} className="w-full p-2 border-2 border-black bg-white font-bold">
            <option value="" disabled>Select a budget</option>
            {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-bold mb-2">Optional lifestyle tags:</label>
          <div className="flex flex-wrap gap-2">
            {lifestyleOptions.map((tag) => (
              <button key={tag} onClick={() => handleTagToggle(tag)} className={`px-4 py-2 border-2 border-black font-bold transition-all ${lifestyleTags.includes(tag) ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex gap-4 justify-center">
        <button onClick={() => setStep(1)} className="px-8 py-3 border-2 border-black bg-white font-bold hover:bg-gray-100 shadow-[4px_4px_0px_#000]">Back</button>
        <button onClick={() => setStep(3)} disabled={!canProceed} className="px-8 py-3 border-2 border-black bg-black text-white font-bold disabled:bg-gray-400 disabled:text-gray-600 disabled:shadow-none hover:bg-gray-800 shadow-[4px_4px_0px_#000]">Next</button>
      </div>
    </div>
  )
}