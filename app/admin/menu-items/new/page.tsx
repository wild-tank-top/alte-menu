import Link from 'next/link'
import MenuItemForm from '../_components/MenuItemForm'

export default function NewMenuItemPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 bg-white border-b border-stone-100 shadow-sm">
        <div className="px-4 py-4 flex items-center gap-2">
          <Link href="/admin/menu-items" className="text-stone-400 hover:text-stone-600 text-lg">‹</Link>
          <h1 className="text-lg font-bold text-stone-800">新規メニューカード</h1>
        </div>
      </header>
      <MenuItemForm />
    </div>
  )
}
