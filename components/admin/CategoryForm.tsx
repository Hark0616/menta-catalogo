'use client'

import { useState, useCallback, useMemo } from 'react'
import { useFormStatus } from 'react-dom'
import { createCategory, updateCategory, deleteCategory, type MenuType } from '@/lib/actions/categories'
import type { Category } from '@/lib/types/database'
import CategoryListItem from './CategoryListItem'

interface CategoryWithParent extends Category {
  parent?: { id: string; name: string; slug: string } | null
}

interface CategoryFormProps {
  categories: CategoryWithParent[]
  menu: MenuType
}

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-jungle-deep text-mint text-xs tracking-wide uppercase
        hover:bg-jungle transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Guardando...' : 'Guardar'}
    </button>
  )
}

export default function CategoryForm({ categories, menu }: CategoryFormProps) {
  const [editing, setEditing] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  // Memoize category filtering to avoid re-calculation on every render
  const parentCategories = useMemo(() => categories.filter(c => !c.parent_id), [categories])
  const subcategoriesMap = useMemo(() => {
    const map = new Map<string, CategoryWithParent[]>()
    categories.forEach(c => {
      if (c.parent_id) {
        if (!map.has(c.parent_id)) {
          map.set(c.parent_id, [])
        }
        map.get(c.parent_id)!.push(c)
      }
    })
    return map
  }, [categories])

  const getSubcategories = useCallback(
    (parentId: string) => subcategoriesMap.get(parentId) || [],
    [subcategoriesMap]
  )

  async function handleCreate(formData: FormData) {
    setError(null)
    const result = await createCategory(formData)
    if (result.error) {
      setError(result.error)
    }
  }

  // Wrap handlers in useCallback
  const handleUpdate = useCallback(async (id: string, formData: FormData) => {
    setError(null)
    const result = await updateCategory(id, formData)
    if (result.error) {
      setError(result.error)
    } else {
      setEditing(null)
    }
  }, [])

  const performDelete = useCallback(async (id: string) => {
    const result = await deleteCategory(id)
    if (result?.error) setError(result.error)
    setDeleting(null)
  }, [])

  const onDeleteClick = useCallback((id: string, name: string) => {
    // if (!confirm(`¿Estás segura de eliminar "${name}"? Las subcategorías también se eliminarán.`)) return
    setDeleting(id)
    setError(null)
    // The expensive re-render is now fast, so we can call performDelete directly.
    // requestAnimationFrame is not strictly necessary but can be kept for safety.
    requestAnimationFrame(() => {
      performDelete(id)
    })
  }, [performDelete])
  
  const handleSetEditing = useCallback((id: string | null) => {
    setEditing(id);
  }, []);


  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-sm text-sm flex items-start gap-3">
          <span className="text-amber-500 shrink-0" aria-hidden="true">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </span>
          <p className="pt-0.5">{error}</p>
        </div>
      )}

      {/* Formulario para nueva categoría (menú ya filtrado por la página) */}
      <div className="bg-white border border-mint-border rounded-sm p-4">
        <h3 className="font-heading text-lg text-jungle-deep mb-4">
          Nueva Categoría — {menu}
        </h3>
        <form action={handleCreate} className="flex flex-wrap gap-4 items-end">
          <input type="hidden" name="menu" value={menu} />
          <div className="flex-1 min-w-[200px]">
            <label className="block text-jungle-muted text-xs tracking-wide uppercase mb-2">
              Nombre
            </label>
            <input
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 bg-white border border-mint-border rounded-sm
                text-jungle-deep text-sm
                focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              placeholder="Ej: Perfumes"
            />
          </div>
          <div className="w-48">
            <label className="block text-jungle-muted text-xs tracking-wide uppercase mb-2">
              Categoría padre
            </label>
            <select
              name="parent_id"
              className="w-full px-3 py-2 bg-white border border-mint-border rounded-sm
                text-jungle-deep text-sm
                focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
            >
              <option value="">Ninguna (principal)</option>
              {parentCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="w-24">
            <label className="block text-jungle-muted text-xs tracking-wide uppercase mb-2">
              Orden
            </label>
            <input
              name="order_index"
              type="number"
              defaultValue={0}
              className="w-full px-3 py-2 bg-white border border-mint-border rounded-sm
                text-jungle-deep text-sm
                focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
            />
          </div>
          <SubmitButton />
        </form>
      </div>

      {/* Lista de categorías */}
      <div className="bg-white border border-mint-border rounded-sm overflow-hidden">
        <div className="px-4 py-3 bg-mint/50 border-b border-mint-border">
          <h3 className="font-heading text-lg text-jungle-deep">Categorías existentes</h3>
        </div>
        
        {categories.length === 0 ? (
          <div className="p-8 text-center text-jungle-muted">
            No hay categorías aún. Crea la primera arriba.
          </div>
        ) : (
          <ul className="divide-y divide-mint-border">
            {parentCategories.map((category) => (
              <CategoryListItem
                key={category.id}
                category={category}
                subcategories={getSubcategories(category.id)}
                editing={editing}
                deleting={deleting}
                handleUpdate={handleUpdate}
                setEditing={handleSetEditing}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
