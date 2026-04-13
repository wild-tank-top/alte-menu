import Link from 'next/link'

const ADMIN_SECTIONS = [
  {
    href: '/admin/menu-items',
    icon: '🃏',
    title: 'メニューカード管理',
    description: '料理カードの作成・編集・削除',
    color: 'bg-amber-50 border-amber-100',
    iconBg: 'bg-amber-100',
  },
  {
    href: '/admin/courses',
    icon: '📋',
    title: 'コース管理',
    description: 'コースへのカードのアサインと並び替え',
    color: 'bg-sky-50 border-sky-100',
    iconBg: 'bg-sky-100',
  },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 bg-white border-b border-stone-100 shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-stone-800">管理メニュー</h1>
          <p className="text-xs text-stone-400 mt-0.5">コンテンツの管理・更新</p>
        </div>
      </header>

      <main className="px-4 py-6 space-y-3">
        {ADMIN_SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className={`flex items-center gap-4 p-4 rounded-2xl border ${section.color} transition-opacity active:opacity-70`}
          >
            <div className={`w-12 h-12 rounded-xl ${section.iconBg} flex items-center justify-center text-2xl flex-shrink-0`}>
              {section.icon}
            </div>
            <div>
              <p className="font-semibold text-stone-800">{section.title}</p>
              <p className="text-sm text-stone-500 mt-0.5">{section.description}</p>
            </div>
            <span className="ml-auto text-stone-300 text-lg">›</span>
          </Link>
        ))}

        <div className="mt-8 p-4 bg-stone-50 rounded-2xl border border-stone-100">
          <p className="text-xs text-stone-400 leading-relaxed">
            本番環境では Supabase の認証と Row Level Security により、管理機能へのアクセスは
            admin ロールを持つユーザーのみに制限されます。
          </p>
        </div>
      </main>
    </div>
  )
}
