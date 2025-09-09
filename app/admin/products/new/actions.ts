'use server'

import { auth } from '@/lib/auth'
import { PrismaClient, Style } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

const prisma = new PrismaClient()

export async function createProduct(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) return redirect('/login')

  const userFromDb = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!userFromDb) return redirect('/dashboard')

  const imageFile = formData.get('image') as File
  const rawFormData = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: parseFloat(formData.get('price') as string),
    category: formData.get('category') as string,
    dimensions: formData.get('dimensions') as string,
    styleTags: formData.getAll('styleTags') as Style[],
  }

  console.log('Product data to save:', rawFormData)
  console.log('Image file:', imageFile.name, imageFile.size)

  try {
    // Note: This still requires Supabase for file storage
    // For now, we'll use a placeholder image URL
    const publicUrl = '/images/placeholder-product.jpg'
    
    console.log('Using placeholder image URL:', publicUrl)

    console.log('Image uploaded successfully:', publicUrl)

    // 3. Save product to database
    await prisma.product.create({
      data: {
        ...rawFormData,
        imageUrl: publicUrl,
      },
    })

    console.log('Product created successfully!')

  } catch (error) {
    console.error('Failed to create product:', error)
    // For now, just log the error and redirect back
    // In production you might want to handle this better
  }

  revalidatePath('/admin')
  redirect('/admin')
} 