import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCourseBySlug } from '@/lib/data/courses'
import { getAllMenuItems } from '@/lib/data/menu-items'
import { MOCK_COURSES } from '@/lib/data/mock'
import CourseAssignEditor from './_components/CourseAssignEditor'

export default async function CourseAdminPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Find course slug by id
  const courseMeta = MOCK_COURSES.find((c) => c.id === id)
  if (!courseMeta) notFound()

  const [course, allMenuItems] = await Promise.all([
    getCourseBySlug(courseMeta.slug),
    getAllMenuItems(),
  ])

  if (!course) notFound()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 bg-white border-b border-stone-100 shadow-sm">
        <div className="px-4 py-4 flex items-center gap-2">
          <Link href="/admin/courses" className="text-stone-400 hover:text-stone-600 text-lg">‹</Link>
          <div>
            <h1 className="text-lg font-bold text-stone-800">{course.name}</h1>
            <p className="text-xs text-stone-400">カードのアサインと順序</p>
          </div>
        </div>
      </header>

      <CourseAssignEditor course={course} allMenuItems={allMenuItems} />
    </div>
  )
}
