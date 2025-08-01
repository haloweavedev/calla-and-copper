import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          + Add New Product
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow">
        {products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No products found. Add your first product to get started!</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">${product.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        product.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
} 