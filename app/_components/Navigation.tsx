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
    <nav className="fixed bottom-0 left-0 right-0 z-50 header-luxury safe-pb">
      {/* Gold top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <ul className="flex">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const active = pathname.startsWith(href)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`relative flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-all duration-200 ${
                  active ? 'text-gold-300' : 'text-crimson-400 hover:text-gold-200'
                }`}
              >
                {/* Active indicator bar */}
                {active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gold-400 rounded-b-full" />
                )}
                <span className="text-xl leading-none">{icon}</span>
                <span className="tracking-wide">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
