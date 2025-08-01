'use server'

import { createClient } from '@/lib/supabase/server'
import { PrismaClient, Style } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function createProduct(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return redirect('/login')

  const userFromDb = await prisma.user.findUnique({ where: { id: user.id } })
  if (userFromDb?.role !== 'ADMIN') return redirect('/dashboard')

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
    // 1. Upload image to Supabase Storage
    const filePath = `product-images/${Date.now()}-${imageFile.name}`
    const { error: uploadError } = await supabase.storage
      .from('product_assets') // Make sure this bucket exists and is public
      .upload(filePath, imageFile)

    if (uploadError) {
      console.error('Upload Error:', uploadError)
      throw new Error('Failed to upload product image.')
    }

    // 2. Get public URL of the uploaded image
    const { data: { publicUrl } } = supabase.storage
      .from('product_assets')
      .getPublicUrl(filePath)

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