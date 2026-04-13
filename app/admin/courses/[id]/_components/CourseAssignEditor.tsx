'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { CourseWithItems, MenuItem, CourseSection } from '@/lib/supabase/types'
import { SECTION_LABELS } from '@/lib/utils'

const SECTIONS: CourseSection[] = [
  'amuse', 'entree_1', 'entree_2', 'entree_3',
  'fish', 'meat', 'pre_dessert', 'dessert', 'mignardise',
]

interface AssignedItem {
  id: string
  menu_item_id: string
  section: CourseSection
  sort_order: number
  name: string
}

export default function CourseAssignEditor({
  course,
  allMenuItems,
}: {
  course: CourseWithItems
  allMenuItems: MenuItem[]
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [assigned, setAssigned] = useState<AssignedItem[]>(
    course.course_menu_items
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((ci) => ({
        id: ci.id,
        menu_item_id: ci.menu_item_id,
        section: ci.section,
        sort_order: ci.sort_order,
        name: ci.menu_item.name,
      }))
  )

  const assignedIds = new Set(assigned.map((a) => a.menu_item_id))
  const unassigned = allMenuItems.filter((m) => !assignedIds.has(m.id))

  function addItem(item: MenuItem) {
    setAssigned((prev) => [
      ...prev,
      {
        id: `new_${item.id}`,
        menu_item_id: item.id,
        section: 'entree_1',
        sort_order: prev.length + 1,
        name: item.name,
      },
    ])
  }

  function removeItem(menuItemId: string) {
    setAssigned((prev) => prev.filter((a) => a.menu_item_id !== menuItemId))
  }

  function updateSection(menuItemId: string, section: CourseSection) {
    setAssigned((prev) =>
      prev.map((a) => (a.menu_item_id === menuItemId ? { ...a, section } : a))
    )
  }

  function moveUp(index: number) {
    if (index === 0) return
    setAssigned((prev) => {
      const next = [...prev]
      ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
      return next.map((a, i) => ({ ...a, sort_order: i + 1 }))
    })
  }

  function moveDown(index: number) {
    setAssigned((prev) => {
      if (index >= prev.length - 1) return prev
      const next = [...prev]
      ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
      return next.map((a, i) => ({ ...a, sort_order: i + 1 }))
    })
  }

  async function handleSave() {
    setError(null)
    startTransition(async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()

        // Delete all existing assignments
        await supabase.from('course_menu_items').delete().eq('course_id', course.id)

        // Re-insert
        const rows = assigned.map((a, i) => ({
          course_id: course.id,
          menu_item_id: a.menu_item_id,
          section: a.section,
          sort_order: i + 1,
        }))

        if (rows.length > 0) {
          const { error } = await supabase.from('course_menu_items').insert(rows)
          if (error) throw error
        }

        router.refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : '保存中にエラーが発生しました')
      }
    })
  }

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Assigned items */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-stone-700">アサイン済み ({assigned.length})</h3>

        {assigned.length === 0 && (
          <p className="text-sm text-stone-400 text-center py-8 bg-stone-50 rounded-xl border border-dashed border-stone-200">
            カードがアサインされていません
          </p>
        )}

        <ol className="space-y-2">
          {assigned.map((item, idx) => (
            <li
              key={item.menu_item_id}
              className="bg-white rounded-xl border border-stone-100 p-3 space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 tabular-nums w-4">{idx + 1}</span>
                <span className="flex-1 text-sm font-medium text-stone-800 truncate">{item.name}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    className="w-7 h-7 rounded-lg bg-stone-100 text-stone-600 text-xs disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveDown(idx)}
                    disabled={idx === assigned.length - 1}
                    className="w-7 h-7 rounded-lg bg-stone-100 text-stone-600 text-xs disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeItem(item.menu_item_id)}
                    className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 text-xs"
                  >
                    ×
                  </button>
                </div>
              </div>
              <select
                value={item.section}
                onChange={(e) => updateSection(item.menu_item_id, e.target.value as CourseSection)}
                className="w-full text-xs text-stone-700 bg-stone-50 border border-stone-200 rounded-lg px-2 py-1.5"
              >
                {SECTIONS.map((s) => (
                  <option key={s} value={s}>{SECTION_LABELS[s]}</option>
                ))}
              </select>
            </li>
          ))}
        </ol>
      </section>

      {/* Unassigned items */}
      {unassigned.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-stone-700">追加可能なカード</h3>
          <div className="space-y-2">
            {unassigned.map((item) => (
              <button
                key={item.id}
                onClick={() => addItem(item)}
                className="w-full flex items-center gap-3 bg-white rounded-xl border border-stone-100 p-3 active:bg-stone-50 text-left"
              >
                <span className="text-xl flex-shrink-0">🃏</span>
                <span className="flex-1 text-sm text-stone-700">{item.name}</span>
                <span className="text-amber-600 text-lg font-light">+</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {error && (
        <div className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl p-3">
          {error}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={isPending}
        className="w-full bg-amber-700 text-white font-semibold py-3 rounded-xl disabled:opacity-50"
      >
        {isPending ? '保存中...' : '変更を保存する'}
      </button>
    </div>
  )
}
