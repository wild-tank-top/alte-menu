import Link from 'next/link'
import { MOCK_COURSES } from '@/lib/data/mock'

export default function CoursesAdminPage() {
  const courses = MOCK_COURSES

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 bg-white border-b border-stone-100 shadow-sm">
        <div className="px-4 py-4 flex items-center gap-2">
          <Link href="/admin" className="text-stone-400 hover:text-stone-600 text-lg">‹</Link>
          <div>
            <h1 className="text-lg font-bold text-stone-800">コース管理</h1>
            <p className="text-xs text-stone-400">カードのアサインと並び替え</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-3">
        {(['lunch', 'dinner'] as const).map((mealType) => (
          <div key={mealType} className="space-y-2">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider px-1">
              {mealType === 'lunch' ? 'ランチ' : 'ディナー'}
            </h2>
            {courses
              .filter((c) => c.meal_type === mealType)
              .map((course) => (
                <Link
                  key={course.id}
                  href={`/admin/courses/${course.id}`}
                  className="flex items-center gap-4 bg-white rounded-xl border border-stone-100 p-4 active:bg-stone-50"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-stone-800">{course.name}</p>
                    {course.description && (
                      <p className="text-xs text-stone-400 mt-0.5">{course.description}</p>
                    )}
                  </div>
                  <span className="text-stone-300 text-lg">›</span>
                </Link>
              ))}
          </div>
        ))}
      </main>
    </div>
  )
}
