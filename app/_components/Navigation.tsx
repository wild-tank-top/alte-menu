'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/menu',    label: 'メニュー',   icon: '🍽' },
  { href: '/library', label: 'ライブラリ', icon: '📚' },
  { href: '/admin',   label: '管理',       icon: '⚙️' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-crimson-700 border-t border-gold-700 safe-pb">
      <ul className="flex">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const active = pathname.startsWith(href)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex flex-col items-center gap-0.5 py-2 text-xs font-medium transition-colors ${
                  active
                    ? 'text-gold-300'
                    : 'text-crimson-300 hover:text-gold-200'
                }`}
              >
                <span className="text-xl leading-none">{icon}</span>
                <span>{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
