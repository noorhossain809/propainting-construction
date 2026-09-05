"use client"

import * as React from "react"
import BackButton from "@/components/ui/BackButton"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { useCreateTeamMemberMutation } from "@/redux/api/teamApi"

type FormState = {
  name: string
  designation: string
  bio: string
  order: string
  isActive: boolean
  imageAlt: string
}

const emptyForm: FormState = {
  name: "",
  designation: "",
  bio: "",
  order: "0",
  isActive: true,
  imageAlt: "",
}

export default function AddTeamMemberPage() {
  const router = useRouter()
  const [createTeamMember, { isLoading }] = useCreateTeamMemberMutation()

  const [form, setForm] = React.useState<FormState>(emptyForm)
  const [image, setImage] = React.useState<File | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setImage(file)
    setPreview(file ? URL.createObjectURL(file) : null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.name || !form.designation) {
      setError("Name and Designation are required.")
      return
    }
    if (!image) {
      setError("Photo is required.")
      return
    }

    const formData = new FormData()
    formData.append("name", form.name)
    formData.append("designation", form.designation)
    if (form.bio) formData.append("bio", form.bio)
    formData.append("order", form.order || "0")
    formData.append("isActive", String(form.isActive))
    formData.append("image", image)
    if (form.imageAlt) formData.append("imageAlt", form.imageAlt)

    try {
      await createTeamMember(formData).unwrap()
      router.push("/our-team")
    } catch (err) {
      console.error(err)
      setError("Failed to save team member. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="container mx-auto space-y-6">
      <BackButton href="/our-team" label="Back to Team" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">About</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Add Team Member</h1>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-start gap-6">
          <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-full bg-slate-100">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Preview" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-slate-400">
                No photo
              </div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-slate-700">Photo</label>
            <input
              type="file"
              accept="image/*"
              className={inputClass}
              onChange={handleImageChange}
            />
            <input
              className={inputClass}
              placeholder="Alt text (optional)"
              value={form.imageAlt}
              onChange={(e) => handleChange("imageAlt", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Full Name">
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g., Jonathan Reeves"
            />
          </Field>
          <Field label="Designation">
            <input
              className={inputClass}
              value={form.designation}
              onChange={(e) => handleChange("designation", e.target.value)}
              placeholder="e.g., CEO, Project Manager, Lead Painter"
            />
          </Field>
          <Field label="Short Bio (optional)" full>
            <textarea
              className={inputClass}
              rows={3}
              value={form.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="A brief bio about this team member..."
            />
          </Field>
          <Field label="Display Order">
            <input
              type="number"
              className={inputClass}
              value={form.order}
              onChange={(e) => handleChange("order", e.target.value)}
            />
          </Field>
          <Field label="Visibility">
            <label className="flex items-center gap-2 pt-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
                className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              Show on website (Active)
            </label>
          </Field>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? "Saving..." : "Save Team Member"}
        </button>
      </div>
    </form>
  )
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={`space-y-2 ${full ? "sm:col-span-2" : ""}`}>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  )
}