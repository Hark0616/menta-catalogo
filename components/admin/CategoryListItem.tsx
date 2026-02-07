'use client'

import { memo } from 'react'
import type { Category } from '@/lib/types/database'

interface CategoryWithParent extends Category {
  parent?: { id: string; name: string; slug: string } | null
}

interface CategoryListItemProps {
  category: CategoryWithParent;
  subcategories: CategoryWithParent[];
  editing: string | null;
  deleting: string | null;
  handleUpdate: (id: string, formData: FormData) => void;
  setEditing: (id: string | null) => void;
  onDeleteClick: (id: string, name: string) => void;
}

const CategoryListItem = memo(function CategoryListItem({
  category,
  subcategories,
  editing,
  deleting,
  handleUpdate,
  setEditing,
  onDeleteClick,
}: CategoryListItemProps) {
  return (
    <li>
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
      {subcategories.map((sub) => (
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
  )
})

export default CategoryListItem