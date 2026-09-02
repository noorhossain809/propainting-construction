"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { useCreateServiceMutation } from "@/redux/api/constructionServiceApi"

type FormState = {
  title: string
  slug: string
  shortDescription: string
  subtitle: string
  contentTitle: string
  contentDescription: string
  order: string
  metaTitle: string
  metaDescription: string
  keywords: string
  heroImageAlt: string
  contentImageAlt: string
}

const emptyForm: FormState = {
  title: "",
  slug: "",
  shortDescription: "",
  subtitle: "",
  contentTitle: "",
  contentDescription: "",
  order: "0",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  heroImageAlt: "",
  contentImageAlt: "",
}

export default function AddServicePage() {
  const router = useRouter()
  const [createService, { isLoading }] = useCreateServiceMutation()

  const [form, setForm] = React.useState<FormState>(emptyForm)
  const [heroImage, setHeroImage] = React.useState<File | null>(null)
  const [contentImage, setContentImage] = React.useState<File | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [slugTouched, setSlugTouched] = React.useState(false)

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  React.useEffect(() => {
    if (!slugTouched) {
      const autoSlug = form.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
      setForm((prev) => ({ ...prev, slug: autoSlug }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (
      !form.title ||
      !form.slug ||
      !form.shortDescription ||
      !form.subtitle ||
      !form.contentTitle ||
      !form.contentDescription
    ) {
      setError("Title, Slug, Short Description, Subtitle, Content Title and Content Description are required.")
      return
    }
    if (!heroImage || !contentImage) {
      setError("Both Hero Image and Content Image are required.")
      return
    }

    const formData = new FormData()
    formData.append("title", form.title)
    formData.append("slug", form.slug)
    formData.append("shortDescription", form.shortDescription)
    formData.append("subtitle", form.subtitle)
    formData.append("contentTitle", form.contentTitle)
    formData.append("contentDescription", form.contentDescription)
    formData.append("order", form.order || "0")
    formData.append("heroImage", heroImage)
    formData.append("contentImage", contentImage)
    if (form.heroImageAlt) formData.append("heroImageAlt", form.heroImageAlt)
    if (form.contentImageAlt) formData.append("contentImageAlt", form.contentImageAlt)

    formData.append(
      "seo",
      JSON.stringify({
        metaTitle: form.metaTitle || undefined,
        metaDescription: form.metaDescription || undefined,
        keywords: form.keywords
          .split(/[,\n]/)
          .map((k) => k.trim())
          .filter(Boolean),
      })
    )

    try {
      await createService(formData).unwrap()
      router.push("/our-services")
    } catch (err) {
      console.error(err)
      setError("Failed to save service. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="container mx-auto space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">Services</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Add New Service</h1>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Section title="Basic Information" desc="What will show on the homepage service card...">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Service Title">
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g., Residential & Commercial Painting"
            />
          </Field>
          <Field label="Slug (URL)">
            <input
              className={inputClass}
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true)
                handleChange("slug", e.target.value)
              }}
              placeholder="e.g., residential-commercial-painting"
            />
          </Field>
          <Field label="Short Description (Homepage Card)" full>
            <textarea
              className={inputClass}
              rows={2}
              value={form.shortDescription}
              onChange={(e) => handleChange("shortDescription", e.target.value)}
              placeholder="Homepage সার্ভিস কার্ডে যেটুকু দেখাবে..."
            />
          </Field>
          <Field label="Subtitle (Hero section এর নিচে)" full>
            <textarea
              className={inputClass}
              rows={2}
              value={form.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              placeholder="Professional interior and exterior painting for homes and businesses..."
            />
          </Field>
          <Field label="Display Order">
            <input
              type="number"
              className={inputClass}
              value={form.order}
              onChange={(e) => handleChange("order", e.target.value)}
              placeholder="0"
            />
          </Field>
        </div>
      </Section>

      <Section title="Images" desc="Hero background and Approach section images.">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Hero Background Image">
            <input
              type="file"
              accept="image/*"
              className={inputClass}
              onChange={(e) => setHeroImage(e.target.files?.[0] ?? null)}
            />
          </Field>
          <Field label="Hero Image Alt Text">
            <input
              className={inputClass}
              value={form.heroImageAlt}
              onChange={(e) => handleChange("heroImageAlt", e.target.value)}
            />
          </Field>
          <Field label="Content Image (Our Approach section)">
            <input
              type="file"
              accept="image/*"
              className={inputClass}
              onChange={(e) => setContentImage(e.target.files?.[0] ?? null)}
            />
          </Field>
          <Field label="Content Image Alt Text">
            <input
              className={inputClass}
              value={form.contentImageAlt}
              onChange={(e) => handleChange("contentImageAlt", e.target.value)}
            />
          </Field>
        </div>
      </Section>

      <Section title="Approach Section Content" desc="e.g. 'Our Approach to Professional Painting in NYC'.">
        <div className="space-y-5">
          <Field label="Content Title">
            <input
              className={inputClass}
              value={form.contentTitle}
              onChange={(e) => handleChange("contentTitle", e.target.value)}
              placeholder="e.g., Our Approach to Professional Painting in NYC"
            />
          </Field>
          <Field label="Content Description">
            <textarea
              className={inputClass}
              rows={6}
              value={form.contentDescription}
              onChange={(e) => handleChange("contentDescription", e.target.value)}
              placeholder="Write each paragraph on a new line..."
            />
            <p className="mt-1 text-xs text-slate-400">Write each paragraph on a new line.</p>
          </Field>
        </div>
      </Section>

      <Section title="SEO Information" desc="Optimize for search engines.">
        <div className="space-y-5">
          <Field label="Meta Title">
            <input
              className={inputClass}
              value={form.metaTitle}
              onChange={(e) => handleChange("metaTitle", e.target.value)}
            />
          </Field>
          <Field label="Meta Description">
            <textarea
              className={inputClass}
              rows={2}
              value={form.metaDescription}
              onChange={(e) => handleChange("metaDescription", e.target.value)}
            />
          </Field>
          <Field label="Keywords">
            <textarea
              className={inputClass}
              rows={2}
              value={form.keywords}
              onChange={(e) => handleChange("keywords", e.target.value)}
              placeholder="Separate with commas..."
            />
          </Field>
        </div>
      </Section>

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
          {isLoading ? "Saving..." : "Save Service"}
        </button>
      </div>
    </form>
  )
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{desc}</p>
      <div className="mt-5">{children}</div>
    </div>
  )
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={`space-y-2 ${full ? "md:col-span-2" : ""}`}>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  )
}