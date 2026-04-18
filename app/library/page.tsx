import { getCookingTerms, getWineVarieties } from '@/lib/data/library'
import LibraryTabs from './_components/LibraryTabs'

export default async function LibraryPage() {
  const [terms, varieties] = await Promise.all([getCookingTerms(), getWineVarieties()])

  return (
    <div className="min-h-screen">
      <header className="relative sticky top-0 z-20 header-luxury shadow-xl gold-rule-bottom">
        <div className="px-4 py-4">
          <h1 className="font-display text-[26px] font-semibold gold-shimmer tracking-wider leading-none">
            Knowledge Library
          </h1>
          <p className="text-[11px] text-crimson-400 mt-1 tracking-widest font-caps uppercase">
            調理用語 &amp; ワインガイド
          </p>
        </div>
      </header>

      <LibraryTabs terms={terms} varieties={varieties} />
    </div>
  )
}
