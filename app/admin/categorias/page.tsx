import Link from 'next/link'
import { getCategoriesWithParent, type MenuType } from '@/lib/actions/categories'
import CategoryForm from '@/components/admin/CategoryForm'

type SearchParams = { menu?: string }

export default async function CategoriasPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams> | SearchParams
}) {
  const params = typeof searchParams === 'object' && 'then' in searchParams
    ? await searchParams
    : searchParams
  const menu: MenuType = params.menu === 'NovaVenta' ? 'NovaVenta' : 'Natura'

  const categories = await getCategoriesWithParent(menu)

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-jungle-deep">Categorías</h1>
        <p className="text-jungle-muted text-sm mt-1">
          Organiza tus productos en categorías y subcategorías por menú
        </p>
      </div>

      {/* Pestañas Natura / NovaVenta */}
      <div className="flex gap-1 mb-6 border-b border-mint-border">
        <Link
          href="/admin/categorias?menu=Natura"
          className={`px-5 py-3 text-sm font-medium tracking-wide transition-colors
            ${menu === 'Natura'
              ? 'text-jungle-deep border-b-2 border-gold -mb-px'
              : 'text-jungle-muted hover:text-jungle-deep'}`}
        >
          Natura
        </Link>
        <Link
          href="/admin/categorias?menu=NovaVenta"
          className={`px-5 py-3 text-sm font-medium tracking-wide transition-colors
            ${menu === 'NovaVenta'
              ? 'text-jungle-deep border-b-2 border-gold -mb-px'
              : 'text-jungle-muted hover:text-jungle-deep'}`}
        >
          NovaVenta
        </Link>
      </div>

      <CategoryForm categories={categories} menu={menu} />
    </div>
  )
}
