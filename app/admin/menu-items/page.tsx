import Link from 'next/link'
import { getAllMenuItems } from '@/lib/data/menu-items'

export default async function MenuItemsPage() {
  const items = await getAllMenuItems()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 bg-white border-b border-stone-100 shadow-sm">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/admin" className="text-stone-400 hover:text-stone-600 text-lg">‹</Link>
            <div>
              <h1 className="text-lg font-bold text-stone-800">メニューカード</h1>
              <p className="text-xs text-stone-400">{items.length} 件のカード</p>
            </div>
          </div>
          <Link
            href="/admin/menu-items/new"
            className="bg-amber-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg"
          >
            + 新規作成
          </Link>
        </div>
      </header>

      <main className="px-4 py-4 space-y-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/admin/menu-items/${item.id}`}
            className="flex items-start gap-3 bg-white rounded-xl border border-stone-100 p-4 active:bg-stone-50"
          >
            {/* Placeholder for photo */}
            <div className="w-16 h-16 bg-stone-100 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl">
              {item.photo_url ? (
                <img src={item.photo_url} alt={item.name} className="w-full h-full object-cover rounded-lg" />
              ) : (
                '🍽'
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-stone-800 truncate">{item.name}</p>
              {item.name_en && (
                <p className="text-xs text-stone-400 italic truncate">{item.name_en}</p>
              )}
              <p className="text-xs text-stone-500 mt-1 line-clamp-2">{item.required_explanation}</p>
            </div>
            <span className="text-stone-300 text-lg flex-shrink-0">›</span>
          </Link>
        ))}

        {items.length === 0 && (
          <div className="text-center py-16 text-stone-400">
            <p className="text-4xl mb-3">🃏</p>
            <p className="text-sm">メニューカードがありません</p>
            <Link href="/admin/menu-items/new" className="mt-4 inline-block text-amber-700 text-sm font-medium">
              最初のカードを作成する →
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
