'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { MenuItem } from '@/lib/supabase/types'
import { saveMenuItem } from '../actions'

type FormData = Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>

const EMPTY_FORM: FormData = {
  name: '',
  name_en: '',
  photo_url: '',
  main_ingredients: '',
  sauce_description: '',
  concept: '',
  required_explanation: '',
  supplemental_explanation: '',
  english_phrase: '',
}

function Field({
  label,
  name,
  value,
  onChange,
  required,
  multiline,
  placeholder,
  hint,
}: {
  label: string
  name: keyof FormData
  value: string
  onChange: (name: keyof FormData, value: string) => void
  required?: boolean
  multiline?: boolean
  placeholder?: string
  hint?: string
}) {
  const base = 'w-full text-sm text-stone-800 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder:text-stone-300'

  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-stone-600">
        {label}
        {required && <span className="text-amber-600 ml-1">*</span>}
      </label>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required={required}
          placeholder={placeholder}
          rows={3}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required={required}
          placeholder={placeholder}
          className={base}
        />
      )}
      {hint && <p className="text-xs text-stone-400">{hint}</p>}
    </div>
  )
}

export default function MenuItemForm({ initialData }: { initialData?: MenuItem }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState<FormData>(
    initialData
      ? {
          name: initialData.name,
          name_en: initialData.name_en ?? '',
          photo_url: initialData.photo_url ?? '',
          main_ingredients: initialData.main_ingredients ?? '',
          sauce_description: initialData.sauce_description ?? '',
          concept: initialData.concept ?? '',
          required_explanation: initialData.required_explanation,
          supplemental_explanation: initialData.supplemental_explanation ?? '',
          english_phrase: initialData.english_phrase ?? '',
        }
      : EMPTY_FORM
  )
  const [error, setError] = useState<string | null>(null)

  function handleChange(name: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      const result = await saveMenuItem(initialData?.id ?? null, {
        name: form.name,
        name_en: form.name_en || null,
        photo_url: form.photo_url || null,
        main_ingredients: form.main_ingredients || null,
        sauce_description: form.sauce_description || null,
        concept: form.concept || null,
        required_explanation: form.required_explanation,
        supplemental_explanation: form.supplemental_explanation || null,
        english_phrase: form.english_phrase || null,
      })

      if (result?.error) {
        setError(result.error)
        return
      }

      router.push('/admin/menu-items')
      router.refresh()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 py-6 space-y-5">
      <Field label="料理名" name="name" value={form.name} onChange={handleChange} required placeholder="帆立貝のポッシェ" />
      <Field label="料理名（英語）" name="name_en" value={form.name_en ?? ''} onChange={handleChange} placeholder="Poached Scallop" />
      <Field label="メイン食材" name="main_ingredients" value={form.main_ingredients ?? ''} onChange={handleChange} placeholder="北海道産帆立貝" />
      <Field label="ソース" name="sauce_description" value={form.sauce_description ?? ''} onChange={handleChange} placeholder="ブールブランソース、キャビア" />
      <Field label="コンセプト" name="concept" value={form.concept ?? ''} onChange={handleChange} multiline placeholder="繊細な火入れで帆立の甘みを最大限に引き出す" />

      <div className="border-t border-stone-100 pt-5 space-y-5">
        <Field
          label="必ず伝えること"
          name="required_explanation"
          value={form.required_explanation}
          onChange={handleChange}
          required
          multiline
          hint="スタッフが必ず伝えるべき内容。簡潔に。"
          placeholder="北海道産の帆立貝をポッシェ（低温茹で）し..."
        />
        <Field
          label="アドリブ補足情報"
          name="supplemental_explanation"
          value={form.supplemental_explanation ?? ''}
          onChange={handleChange}
          multiline
          hint="追加説明したいときの補足情報。"
          placeholder="ポッシェとは70〜80度の湯で静かに茹でる調理法..."
        />
        <Field
          label="英語での案内フレーズ"
          name="english_phrase"
          value={form.english_phrase ?? ''}
          onChange={handleChange}
          multiline
          hint="インバウンドのお客様向け。"
          placeholder="Hokkaido scallop, gently poached..."
        />
      </div>

      {error && (
        <div className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl p-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-amber-700 text-white font-semibold py-3 rounded-xl disabled:opacity-50 transition-opacity"
      >
        {isPending ? '保存中...' : '保存する'}
      </button>
    </form>
  )
}
