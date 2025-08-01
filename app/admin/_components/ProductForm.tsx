'use client'

// Import the Style enum from our store temporarily until Prisma client is generated
import { Style } from '@/lib/store/onboarding-store'

export function ProductForm({ action }: { action: (formData: FormData) => void }) {
  return (
    <form action={action} className="space-y-6 bg-white p-8 rounded-lg shadow">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
        <input type="text" name="name" id="name" required className="w-full mt-1 input-style" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" id="description" required rows={4} className="w-full mt-1 input-style" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" name="price" id="price" required step="0.01" className="w-full mt-1 input-style" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input type="text" name="category" id="category" required placeholder="e.g., Sofa, Lamp" className="w-full mt-1 input-style" />
        </div>
      </div>
      <div>
        <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">Dimensions</label>
        <input type="text" name="dimensions" id="dimensions" required placeholder="e.g., 120x80x90cm" className="w-full mt-1 input-style" />
      </div>
      <div>
        <label htmlFor="styleTags" className="block text-sm font-medium text-gray-700">Style Tags (Hold Ctrl/Cmd to select multiple)</label>
        <select name="styleTags" id="styleTags" multiple required className="w-full mt-1 input-style h-32">
          {Object.values(Style).map((style) => (
            <option key={style} value={style}>{style.replace('_', ' ')}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
        <input type="file" name="image" id="image" required accept="image/*" className="w-full mt-1" />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-6 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          Save Product
        </button>
      </div>
    </form>
  )
} 