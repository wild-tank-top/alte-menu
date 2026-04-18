import Link from 'next/link'

const ADMIN_SECTIONS = [
  {
    href: '/admin/menu-items',
    icon: '🃏',
    title: 'メニューカード管理',
    description: '料理カードの作成・編集・削除',
  },
  {
    href: '/admin/courses',
    icon: '📋',
    title: 'コース管理',
    description: 'コースへのカードのアサインと並び替え',
  },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <header className="relative sticky top-0 z-20 header-luxury shadow-xl gold-rule-bottom">
        <div className="px-4 py-4">
          <h1 className="font-display text-[26px] font-semibold gold-shimmer tracking-wider leading-none">
            Administration
          </h1>
          <p className="text-[11px] text-crimson-400 mt-1 tracking-widest font-caps uppercase">
            コンテンツ管理
          </p>
        </div>
      </header>

      <main className="px-4 py-6 space-y-3">
        {ADMIN_SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white transition-all active:opacity-70 card-enter"
            style={{ border: '1px solid rgba(212,160,48,0.22)' }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: 'rgba(253,242,242,0.8)', border: '1px solid rgba(154,32,32,0.15)' }}
            >
              {section.icon}
            </div>
            <div>
              <p className="font-medium text-crimson-800">{section.title}</p>
              <p className="text-sm text-crimson-400 mt-0.5">{section.description}</p>
            </div>
            <span className="ml-auto text-gold-400 text-xl">›</span>
          </Link>
        ))}

        <div
          className="mt-4 p-4 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(212,160,48,0.15)' }}
        >
          <p className="text-xs text-crimson-400 leading-relaxed">
            本番環境では Supabase の認証と Row Level Security により、管理機能へのアクセスは
            admin ロールを持つユーザーのみに制限されます。
          </p>
        </div>
      </main>
    </div>
  )
}
