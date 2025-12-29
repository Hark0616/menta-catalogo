'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function getProducts() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(id, name, slug)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data
}

export async function getProduct(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(id, name, slug)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  const product = {
    name: formData.get('name') as string,
    description: formData.get('description') as string || null,
    price: parseFloat(formData.get('price') as string),
    image_url: formData.get('image_url') as string || null,
    affiliate_link: formData.get('affiliate_link') as string,
    brand: formData.get('brand') as string,
    category_id: formData.get('category_id') as string || null,
    is_active: formData.get('is_active') === 'true',
  }

  const { error } = await supabase.from('products').insert(product as any)

  if (error) {
    console.error('Error creating product:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/productos')
  revalidatePath('/')
  redirect('/admin/productos')
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient()

  const product = {
    name: formData.get('name') as string,
    description: formData.get('description') as string || null,
    price: parseFloat(formData.get('price') as string),
    image_url: formData.get('image_url') as string || null,
    affiliate_link: formData.get('affiliate_link') as string,
    brand: formData.get('brand') as string,
    category_id: formData.get('category_id') as string || null,
    is_active: formData.get('is_active') === 'true',
  }

  const { error } = await supabase
    .from('products')
    .update(product as any)
    .eq('id', id)

  if (error) {
    console.error('Error updating product:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/productos')
  revalidatePath('/')
  redirect('/admin/productos')
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting product:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/productos')
  revalidatePath('/')
  return { success: true }
}

export async function toggleProductActive(id: string, isActive: boolean) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('products')
    .update({ is_active: isActive })
    .eq('id', id)

  if (error) {
    console.error('Error toggling product:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/productos')
  revalidatePath('/')
  return { success: true }
}

