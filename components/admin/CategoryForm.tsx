'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { createCategory, updateCategory, deleteCategory, type MenuType } from '@/lib/actions/categories'
import type { Category } from '@/lib/types/database'

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

  // Separar categorías principales y subcategorías
  const parentCategories = categories.filter(c => !c.parent_id)
  const getSubcategories = (parentId: string) => 
    categories.filter(c => c.parent_id === parentId)

  async function handleCreate(formData: FormData) {
    setError(null)
    const result = await createCategory(formData)
    if (result.error) {
      setError(result.error)
    }
  }

  async function handleUpdate(id: string, formData: FormData) {
    setError(null)
    const result = await updateCategory(id, formData)
    if (result.error) {
      setError(result.error)
    } else {
      setEditing(null)
    }
  }

  function onDeleteClick(id: string, name: string) {
    if (!confirm(`¿Estás segura de eliminar "${name}"? Las subcategorías también se eliminarán.`)) return
    setDeleting(id)
    setError(null)
    requestAnimationFrame(() => {
      performDelete(id)
    })
  }

  async function performDelete(id: string) {
    const result = await deleteCategory(id)
    if (result?.error) setError(result.error)
    setDeleting(null)
  }

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
              <li key={category.id}>
                {/* Categoría principal */}
                <div className="px-4 py-3 flex items-center justify-between hover:bg-mint/20">
                  {editing === category.id ? (
                    <form 
                      action={(formData) => handleUpdate(category.id, formData)}
                      className="flex-1 flex gap-3 items-center"
                    >
                      <input
                        name="name"
                        type="text"
                        defaultValue={category.name}
                        className="flex-1 px-3 py-1 bg-white border border-mint-border rounded-sm text-sm"
                        autoFocus
                      />
                      <input type="hidden" name="parent_id" value="" />
                      <input
                        name="order_index"
                        type="number"
                        defaultValue={category.order_index}
                        className="w-16 px-2 py-1 bg-white border border-mint-border rounded-sm text-sm"
                      />
                      <button type="submit" className="text-green-600 hover:text-green-700 text-sm">
                        Guardar
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setEditing(null)}
                        className="text-jungle-muted hover:text-jungle-deep text-sm"
                      >
                        Cancelar
                      </button>
                    </form>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-jungle-deep">{category.name}</span>
                        <span className="text-xs text-jungle-muted bg-mint px-2 py-0.5 rounded">
                          {category.slug}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditing(category.id)}
                          className="p-1 text-jungle-muted hover:text-jungle-deep"
                          title="Editar"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDeleteClick(category.id, category.name)}
                          disabled={deleting === category.id}
                          className="p-1 text-jungle-muted hover:text-red-600 disabled:opacity-50"
                          title="Eliminar"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                            />
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Subcategorías */}
                {getSubcategories(category.id).map((sub) => (
                  <div 
                    key={sub.id} 
                    className="px-4 py-2 pl-10 flex items-center justify-between hover:bg-mint/20 bg-mint/10"
                  >
                    {editing === sub.id ? (
                      <form 
                        action={(formData) => handleUpdate(sub.id, formData)}
                        className="flex-1 flex gap-3 items-center"
                      >
                        <input
                          name="name"
                          type="text"
                          defaultValue={sub.name}
                          className="flex-1 px-3 py-1 bg-white border border-mint-border rounded-sm text-sm"
                          autoFocus
                        />
                        <input type="hidden" name="parent_id" value={category.id} />
                        <input
                          name="order_index"
                          type="number"
                          defaultValue={sub.order_index}
                          className="w-16 px-2 py-1 bg-white border border-mint-border rounded-sm text-sm"
                        />
                        <button type="submit" className="text-green-600 hover:text-green-700 text-sm">
                          Guardar
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setEditing(null)}
                          className="text-jungle-muted hover:text-jungle-deep text-sm"
                        >
                          Cancelar
                        </button>
                      </form>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <span className="text-jungle-muted">↳</span>
                          <span className="text-jungle-deep text-sm">{sub.name}</span>
                          <span className="text-[10px] text-jungle-muted bg-white px-1.5 py-0.5 rounded">
                            {sub.slug}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditing(sub.id)}
                            className="p-1 text-jungle-muted hover:text-jungle-deep"
                            title="Editar"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => onDeleteClick(sub.id, sub.name)}
                            disabled={deleting === sub.id}
                            className="p-1 text-jungle-muted hover:text-red-600 disabled:opacity-50"
                            title="Eliminar"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                              />
                            </svg>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

