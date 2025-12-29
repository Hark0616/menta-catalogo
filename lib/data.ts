import { createClient } from '@/lib/supabase/server'
import type { Product, Category } from '@/lib/types/database'

// ID de afiliado - puede configurarse desde variables de entorno
const AFFILIATE_ID = process.env.NEXT_PUBLIC_AFFILIATE_ID || 'AFILIADO123'

// Helper para construir enlaces de afiliado
function buildAffiliateLink(baseUrl: string): string {
  const separator = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${separator}ref=${AFFILIATE_ID}`
}

export interface ProductWithCategory extends Product {
  category?: Category | null
}

export async function getActiveProducts(): Promise<ProductWithCategory[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    // Fallback a datos de placeholder si hay error
    return getFallbackProducts()
  }

  // Si no hay productos en la DB, usar fallback
  if (!data || data.length === 0) {
    return getFallbackProducts()
  }

  return data as ProductWithCategory[]
}

export async function getPublicCategories(): Promise<Category[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return getFallbackCategories()
  }

  if (!data || data.length === 0) {
    return getFallbackCategories()
  }

  return data
}

// Datos de fallback mientras no haya productos en la DB
function getFallbackProducts(): ProductWithCategory[] {
  return [
    {
      id: '1',
      name: 'Chronos Desodorante Colonia',
      description: null,
      price: 89.90,
      image_url: 'https://picsum.photos/400/400?random=1',
      affiliate_link: buildAffiliateLink('https://natura.com.br/produto/chronos'),
      brand: 'Natura',
      category_id: null,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Ekos Castanha Hidratante Corporal',
      description: null,
      price: 45.90,
      image_url: 'https://picsum.photos/400/400?random=2',
      affiliate_link: buildAffiliateLink('https://natura.com.br/produto/ekos-castanha'),
      brand: 'Natura',
      category_id: null,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Luna Perfume Feminino',
      description: null,
      price: 129.90,
      image_url: 'https://picsum.photos/400/400?random=3',
      affiliate_link: buildAffiliateLink('https://natura.com.br/produto/luna'),
      brand: 'Natura',
      category_id: null,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Kit Cuidado Facial Tododia',
      description: null,
      price: 99.90,
      image_url: 'https://picsum.photos/400/400?random=4',
      affiliate_link: buildAffiliateLink('https://natura.com.br/produto/tododia'),
      brand: 'Natura',
      category_id: null,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'Perfume Masculino Essencial',
      description: null,
      price: 79.90,
      image_url: 'https://picsum.photos/400/400?random=5',
      affiliate_link: buildAffiliateLink('https://novaventa.com/producto/perfume-essencial'),
      brand: 'NovaVenta',
      category_id: null,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '6',
      name: 'Crema Hidratante Natural',
      description: null,
      price: 55.90,
      image_url: 'https://picsum.photos/400/400?random=6',
      affiliate_link: buildAffiliateLink('https://novaventa.com/producto/crema-hidratante'),
      brand: 'NovaVenta',
      category_id: null,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]
}

function getFallbackCategories(): Category[] {
  return [
    { id: '1', name: 'Perfumes', slug: 'perfumes', parent_id: null, order_index: 1, created_at: new Date().toISOString() },
    { id: '2', name: 'Cuidados diarios', slug: 'cuidados-diarios', parent_id: null, order_index: 2, created_at: new Date().toISOString() },
    { id: '3', name: 'Cabello', slug: 'cabello', parent_id: null, order_index: 3, created_at: new Date().toISOString() },
    { id: '4', name: 'Rostro', slug: 'rostro', parent_id: null, order_index: 4, created_at: new Date().toISOString() },
    { id: '5', name: 'Maquillaje', slug: 'maquillaje', parent_id: null, order_index: 5, created_at: new Date().toISOString() },
    { id: '6', name: 'Hogar', slug: 'hogar', parent_id: null, order_index: 6, created_at: new Date().toISOString() },
    { id: '7', name: 'Cocina', slug: 'cocina', parent_id: null, order_index: 7, created_at: new Date().toISOString() },
  ]
}

