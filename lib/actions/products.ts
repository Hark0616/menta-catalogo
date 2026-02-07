import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logAudit } from '@/lib/logger'
import { ProductInsert } from '@/lib/types/database'

// Define Zod schema for Product creation
const ProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido.'),
  description: z.string().nullable(),
  price: z.preprocess(
    (a) => parseFloat(a as string),
    z.number().positive('El precio debe ser un número positivo.')
  ),
  image_url: z.string().url('La URL de la imagen no es válida.').nullable(),
  affiliate_link: z.string().url('La URL de afiliado no es válida.'),
  brand: z.enum(['Natura', 'NovaVenta'], {
    message: 'Marca no válida.',
  }),
  category_id: z.string().nullable(),
  is_active: z.preprocess(
    (a) => a === 'true',
    z.boolean()
  ),
});

export async function getProducts() {
  const supabase = await createClient()
  if (!supabase) return []

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
  if (!supabase) return null

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
  if (!supabase) return { error: 'Supabase no configurado' }

  // Extract data from FormData
  const productData = {
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    image_url: formData.get('image_url'),
    affiliate_link: formData.get('affiliate_link'),
    brand: formData.get('brand'),
    category_id: formData.get('category_id'),
    is_active: formData.get('is_active'),
  };

  // Validate data using Zod schema
  const parsed = ProductSchema.safeParse(productData);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    // You can customize how to return errors. Here, we join them for simplicity.
    const errorMessage = Object.values(fieldErrors).flat().join('; ');
    console.error('Validation Error:', fieldErrors);
    return { error: errorMessage || 'Error de validación desconocido.' };
  }

  const productToInsert: ProductInsert = {
    name: parsed.data.name,
    description: parsed.data.description,
    price: parsed.data.price,
    image_url: parsed.data.image_url,
    affiliate_link: parsed.data.affiliate_link,
    brand: parsed.data.brand,
    category_id: parsed.data.category_id,
    is_active: parsed.data.is_active,
  };

  const { error } = await supabase.from('products').insert(productToInsert)

  if (error) {
    console.error('Error creating product:', error)
    return { error: error.message }
  }

  await logAudit('CREATE_PRODUCT', 'products', { name: productToInsert.name })

  revalidatePath('/admin/productos')
  revalidatePath('/')
  redirect('/admin/productos')
}


export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient()
  if (!supabase) return { error: 'Supabase no configurado' }

  // Define a partial Zod schema for updating products (all fields are optional)
  const UpdateProductSchema = ProductSchema.partial();

  // Extract data from FormData
  const productData = {
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    image_url: formData.get('image_url'),
    affiliate_link: formData.get('affiliate_link'),
    brand: formData.get('brand'),
    category_id: formData.get('category_id'),
    is_active: formData.get('is_active'),
  };

  // Validate data using Zod schema
  const parsed = UpdateProductSchema.safeParse(productData);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const errorMessage = Object.values(fieldErrors).flat().join('; ');
    console.error('Validation Error:', fieldErrors);
    return { error: errorMessage || 'Error de validación desconocido.' };
  }

  const productToUpdate = parsed.data;

  const { error } = await supabase
    .from('products')
    .update(productToUpdate)
    .eq('id', id)

  if (error) {
    console.error('Error updating product:', error)
    return { error: error.message }
  }

  await logAudit('UPDATE_PRODUCT', `products/${id}`, { name: productToUpdate.name })

  revalidatePath('/admin/productos')
  revalidatePath('/')
  redirect('/admin/productos')
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  if (!supabase) return { error: 'Supabase no configurado' }

  // Define Zod schema for id validation
  const IdSchema = z.string().uuid('El ID del producto no es válido.');

  const parsedId = IdSchema.safeParse(id);

  if (!parsedId.success) {
    const errorMessage = parsedId.error.flatten().formErrors.join('; ');
    console.error('Validation Error:', errorMessage);
    return { error: errorMessage || 'ID de producto no válido.' };
  }

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', parsedId.data)

  if (error) {
    console.error('Error deleting product:', error)
    return { error: error.message }
  }

  await logAudit('DELETE_PRODUCT', `products/${id}`)

  revalidatePath('/admin/productos')
  revalidatePath('/')
  return { success: true }
}

export async function toggleProductActive(id: string, isActive: boolean) {
  const supabase = await createClient()
  if (!supabase) return { error: 'Supabase no configurado' }

  const { error } = await supabase
    .from('products')
    .update({ is_active: isActive })
    .eq('id', id)

  if (error) {
    console.error('Error toggling product:', error)
    return { error: error.message }
  }

  await logAudit('TOGGLE_PRODUCT', `products/${id}`, { is_active: isActive })

  revalidatePath('/admin/productos')
  revalidatePath('/')
  return { success: true }
}

