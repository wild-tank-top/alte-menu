import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllMenuItems } from '@/lib/data/menu-items'
import MenuItemForm from '../_components/MenuItemForm'

export default async function EditMenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const items = await getAllMenuItems()
  const item = items.find((i) => i.id === id)

  if (!item) notFound()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 bg-white border-b border-stone-100 shadow-sm">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/admin/menu-items" className="text-stone-400 hover:text-stone-600 text-lg">‹</Link>
            <h1 className="text-lg font-bold text-stone-800 truncate max-w-[200px]">{item.name}</h1>
          </div>
        </div>
      </header>
      <MenuItemForm initialData={item} />
    </div>
  )
}
