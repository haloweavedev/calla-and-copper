import { ProductForm } from '@/app/admin/_components/ProductForm'
import { createProduct } from './actions'

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <ProductForm action={createProduct} />
    </div>
  )
} 