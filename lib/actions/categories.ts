'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { CategoryInsert, MenuType } from '@/lib/types/database'

// Define Zod schema for Category creation
const CategorySchema = z.object({
  name: z.string().min(1, 'El nombre de la categoría es requerido.'),
  menu: z.enum(['Natura', 'NovaVenta'], {
    message: 'El menú debe ser Natura o NovaVenta.',
  }),
  parent_id: z.string().nullable().optional(),
  order_index: z.preprocess(
    (a) => parseInt(a as string),
    z.number().int().min(0, 'El orden debe ser un número positivo.').optional().default(0)
  ),
});

/** Convierte errores de Supabase en mensajes amigables para el usuario */
function friendlyCategoryError(error: { message?: string; code?: string }): string {
  const msg = error?.message ?? ''
  const code = error?.code ?? ''
  if (code === '23505' || msg.includes('categories_menu_slug_key') || msg.includes('duplicate key')) {
    return 'Ya existe una categoría con ese nombre en este menú. Elige otro nombre.'
  }
  if (msg.includes('foreign key') || msg.includes('violates foreign key')) {
    return 'No se puede eliminar o modificar: hay datos que dependen de esta categoría.'
  }
  return msg || 'Ha ocurrido un error. Intenta de nuevo.'
}

export async function getCategories() {
  const supabase = await createClient()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('order_index', { ascending: true })
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  return data
}

export async function getCategoriesWithParent(menu?: MenuType) {
  const supabase = await createClient()
  if (!supabase) return []

  let query = supabase
    .from('categories')
    .select(`
      *,
      parent:categories!parent_id(id, name, slug)
    `)
    .order('order_index', { ascending: true })

  if (menu) {
    query = query.eq('menu', menu)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data
}

export async function createCategory(prevState: { error: string | null } | null, formData: FormData) {
  const supabase = await createClient()
  if (!supabase) return { error: 'Supabase no configurado' }

  // Extract data from FormData
  const categoryData = {
    name: formData.get('name'),
    menu: formData.get('menu'),
    parent_id: formData.get('parent_id'),
    order_index: formData.get('order_index'),
  };

  // Validate data using Zod schema
  const parsed = CategorySchema.safeParse(categoryData);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const errorMessage = Object.values(fieldErrors).flat().join('; ');
    console.error('Validation Error:', fieldErrors);
    return { error: errorMessage || 'Error de validación desconocido.' };
  }

  // Generate slug after successful validation of name
  const slug = parsed.data.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const categoryToInsert: CategoryInsert = {
    name: parsed.data.name,
    slug,
    menu: parsed.data.menu,
    parent_id: parsed.data.parent_id,
    order_index: parsed.data.order_index,
  };

  const { error } = await supabase.from('categories').insert(categoryToInsert)

  if (error) {
    console.error('Error creating category:', error)
    return { error: friendlyCategoryError(error) }
  }

  revalidatePath('/admin/categorias')
  revalidatePath('/')
  return { error: null }
}


export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient()
  if (!supabase) return { error: 'Supabase no configurado' }

  // Define a partial Zod schema for updating categories
  const UpdateCategorySchema = CategorySchema.partial();

  // Extract data from FormData
  const categoryData = {
    name: formData.get('name'),
    parent_id: formData.get('parent_id'),
    order_index: formData.get('order_index'),
    menu: formData.get('menu'), // menu can also be updated
  };

  // Validate data using Zod schema
  const parsed = UpdateCategorySchema.safeParse(categoryData);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const errorMessage = Object.values(fieldErrors).flat().join('; ');
    console.error('Validation Error:', fieldErrors);
    return { error: errorMessage || 'Error de validación desconocido.' };
  }

  const categoryToUpdate: Partial<CategoryInsert> = parsed.data;

  // Generate slug if name is provided and valid
  if (categoryToUpdate.name) {
    categoryToUpdate.slug = categoryToUpdate.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  const { error } = await supabase
    .from('categories')
    .update(categoryToUpdate)
    .eq('id', id)

  if (error) {
    console.error('Error updating category:', error)
    return { error: friendlyCategoryError(error) }
  }

  revalidatePath('/admin/categorias')
  revalidatePath('/')
  return { success: true }
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()
  if (!supabase) return { error: 'Supabase no configurado' }

  // Define Zod schema for id validation (reuse if already defined, or define locally)
  const IdSchema = z.string().uuid('El ID de la categoría no es válido.');

  const parsedId = IdSchema.safeParse(id);

  if (!parsedId.success) {
    const errorMessage = parsedId.error.flatten().formErrors.join('; ');
    console.error('Validation Error:', errorMessage);
    return { error: errorMessage || 'ID de categoría no válido.' };
  }

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', parsedId.data)

  if (error) {
    console.error('Error deleting category:', error)
    return { error: friendlyCategoryError(error) }
  }

  revalidatePath('/admin/categorias')
  revalidatePath('/')
  return { success: true }
}

