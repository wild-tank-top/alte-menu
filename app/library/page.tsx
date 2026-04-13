import { getCookingTerms, getWineVarieties } from '@/lib/data/library'
import LibraryTabs from './_components/LibraryTabs'

export default async function LibraryPage() {
  const [terms, varieties] = await Promise.all([getCookingTerms(), getWineVarieties()])

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 bg-white border-b border-stone-100 shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-stone-800">ナレッジライブラリ</h1>
          <p className="text-xs text-stone-400 mt-0.5">調理用語・ワイン品種の早見帳</p>
        </div>
      </header>

      <LibraryTabs terms={terms} varieties={varieties} />
    </div>
  )
}
