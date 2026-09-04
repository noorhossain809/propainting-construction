// app/(dashboard)/our-project/edit-project/[id]/page.tsx
"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2, } from "lucide-react"
import Image from "next/image"

import {
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
} from "@/redux/api/constructionProjectApi"
import DashboardLayout from "@/app/dashboard/layout"

type FormState = {
  title: string
  slug: string
  projectType: string
  category: string
  description: string
  location: string
  duration: string
  completedDate: string // yyyy-mm-dd, for the native date input
  challenge: string
  solution: string
  results: string
  testimonialText: string
  testimonialAuthor: string
  testimonialRating: string
  metaTitle: string
  metaDescription: string
  keywords: string
  altText: string
}

const emptyForm: FormState = {
  title: "",
  slug: "",
  projectType: "",
  category: "",
  description: "",
  location: "",
  duration: "",
  completedDate: "",
  challenge: "",
  solution: "",
  results: "",
  testimonialText: "",
  testimonialAuthor: "",
  testimonialRating: "5",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  altText: "",
}

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const { data: project, isLoading: isFetching, isError } = useGetSingleProjectQuery(id)
  const [updateProject, { isLoading: isSaving }] = useUpdateProjectMutation()

  const [form, setForm] = React.useState<FormState>(emptyForm)
  const [mainImage, setMainImage] = React.useState<File | null>(null)
  const [gallery, setGallery] = React.useState<File[]>([])
  const [error, setError] = React.useState<string | null>(null)
  const [hydrated, setHydrated] = React.useState(false)

  // pre-fill the form with fetched data — only once
  React.useEffect(() => {
    if (project && !hydrated) {
      setForm({
        title: project.title ?? "",
        slug: project.slug ?? "",
        projectType: project.projectType ?? "",
        category: project.category ?? "",
        description: project.description ?? "",
        location: project.location ?? "",
        duration: project.duration ?? "",
        completedDate: project.completedDate
          ? new Date(project.completedDate).toISOString().slice(0, 10)
          : "",
        challenge: project.challenge ?? "",
        solution: project.solution ?? "",
        results: (project.results ?? []).join("\n"),
        testimonialText: project.testimonial?.text ?? "",
        testimonialAuthor: project.testimonial?.author ?? "",
        testimonialRating: String(project.testimonial?.rating ?? 5),
        metaTitle: project.seo?.metaTitle ?? "",
        metaDescription: project.seo?.metaDescription ?? "",
        keywords: (project.seo?.keywords ?? []).join(", "),
        altText: project.mainImage?.alt ?? "",
      })
      setHydrated(true)
    }
  }, [project, hydrated])

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.title || !form.slug || !form.projectType || !form.category || !form.description) {
      setError("Title, Slug, Project Type, Category and Description are required.")
      return
    }

    const formData = new FormData()
    formData.append("title", form.title)
    formData.append("slug", form.slug)
    formData.append("projectType", form.projectType)
    formData.append("category", form.category)
    formData.append("description", form.description)
    if (form.location) formData.append("location", form.location)
    if (form.duration) formData.append("duration", form.duration)
    if (form.completedDate) formData.append("completedDate", new Date(form.completedDate).toISOString())
    if (form.challenge) formData.append("challenge", form.challenge)
    if (form.solution) formData.append("solution", form.solution)
    formData.append("results", form.results)

    if (form.testimonialText) {
      formData.append(
        "testimonial",
        JSON.stringify({
          text: form.testimonialText,
          author: form.testimonialAuthor,
          rating: Number(form.testimonialRating),
        })
      )
    }

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

    // Only send a new main image if provided; otherwise keep the old one (backend else-branch handles it)
    if (mainImage) {
      formData.append("mainImage", mainImage)
    }
    if (form.altText) formData.append("mainImageAlt", form.altText)

    // Providing new gallery files fully replaces the old gallery
    gallery.forEach((file) => formData.append("gallery", file))

    try {
      await updateProject({ id, formData }).unwrap()
      router.push(`/our-projects/${id}`)
    } catch (err) {
      console.error(err)
      setError("Something went wrong updating the project. Please try again.")
    }
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
      </div>
    )
  }

  if (isError || !project) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
        <p className="font-medium text-red-700">Project not found</p>
      </div>
    )
  }

  return (
    <DashboardLayout>
        <form onSubmit={handleSubmit} className="container mx-auto space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">Edit</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Edit Project</h1>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <Section title="Basic Project Information" desc="Enter the main details of the project.">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Project Title">
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g., Luxury Interior Painting"
            />
          </Field>
          <Field label="Slug (URL)">
            <input
              className={inputClass}
              value={form.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              placeholder="e.g., luxury-interior-painting-nyc"
            />
          </Field>
          <Field label="Project Type">
            <select
              className={inputClass}
              value={form.projectType}
              onChange={(e) => handleChange("projectType", e.target.value)}
            >
              <option value="">Select a type</option>
              <option value="Interior Painting">Interior Painting</option>
              <option value="Exterior Painting">Exterior Painting</option>
              <option value="Commercial Painting">Commercial Painting</option>
              <option value="Renovation">Renovation</option>
            </select>
          </Field>
          <Field label="Category">
            <select
              className={inputClass}
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="interior">Interior</option>
              <option value="exterior">Exterior</option>
              <option value="commercial">Commercial</option>
            </select>
          </Field>
          <Field label="Description" full>
            <textarea
              className={inputClass}
              rows={4}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="A brief description of the project..."
            />
          </Field>
          <Field label="Location">
            <input
              className={inputClass}
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="e.g., Manhattan, New York, USA"
            />
          </Field>
          <Field label="Duration">
            <input
              className={inputClass}
              value={form.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
              placeholder="e.g., 2 Weeks"
            />
          </Field>
          <Field label="Completion Date">
            <input
              type="date"
              className={inputClass}
              value={form.completedDate}
              onChange={(e) => handleChange("completedDate", e.target.value)}
            />
          </Field>
        </div>
      </Section>

      {/* Images */}
      <Section title="Project Images" desc="Replace the main image or gallery photos (optional).">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Current Main Image">
            {project.mainImage?.url ? (
              <div className="relative h-40 w-full overflow-hidden rounded-lg border border-slate-200">
                <Image src={project.mainImage.url} alt={project.mainImage.alt || project.title} fill className="object-cover" />
              </div>
            ) : (
              <p className="text-sm text-slate-400">No main image set</p>
            )}
          </Field>
          <Field label="Replace Main Image (optional)">
            <input
              type="file"
              accept="image/*"
              className={inputClass}
              onChange={(e) => setMainImage(e.target.files?.[0] ?? null)}
            />
          </Field>
          <Field label="Alt Text for Main Image">
            <input
              className={inputClass}
              value={form.altText}
              onChange={(e) => handleChange("altText", e.target.value)}
              placeholder="A descriptive alt text..."
            />
          </Field>
          <Field label="Current Gallery" full>
            {project.gallery?.length ? (
              <div className="flex flex-wrap gap-3">
                {project.gallery.map((url, i) => (
                  <div key={i} className="relative h-20 w-28 overflow-hidden rounded-lg border border-slate-200">
                    <Image src={url} alt={`Gallery ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No gallery images</p>
            )}
          </Field>
          <Field label="Replace Gallery (optional, uploading new files removes old ones)" full>
            <input
              type="file"
              accept="image/*"
              multiple
              className={inputClass}
              onChange={(e) => setGallery(e.target.files ? Array.from(e.target.files) : [])}
            />
            {gallery.length > 0 && (
              <p className="mt-1 text-xs text-amber-600">
                {gallery.length} new image(s) selected — saving replaces the old gallery.
              </p>
            )}
          </Field>
        </div>
      </Section>

      {/* Details */}
      <Section title="In-Depth Project Details" desc="Describe the challenges, solutions, and results.">
        <div className="space-y-5">
          <Field label="Challenge">
            <textarea
              className={inputClass}
              rows={3}
              value={form.challenge}
              onChange={(e) => handleChange("challenge", e.target.value)}
            />
          </Field>
          <Field label="Solution">
            <textarea
              className={inputClass}
              rows={3}
              value={form.solution}
              onChange={(e) => handleChange("solution", e.target.value)}
            />
          </Field>
          <Field label="Results">
            <textarea
              className={inputClass}
              rows={3}
              value={form.results}
              onChange={(e) => handleChange("results", e.target.value)}
              placeholder="List the key results, one per line."
            />
            <p className="mt-1 text-xs text-slate-400">Enter each result on a new line.</p>
          </Field>
        </div>
      </Section>

      {/* Testimonial */}
      <Section title="Client Testimonial" desc="Add or update the client's feedback.">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Testimonial Text" full>
            <textarea
              className={inputClass}
              rows={3}
              value={form.testimonialText}
              onChange={(e) => handleChange("testimonialText", e.target.value)}
            />
          </Field>
          <Field label="Author">
            <input
              className={inputClass}
              value={form.testimonialAuthor}
              onChange={(e) => handleChange("testimonialAuthor", e.target.value)}
              placeholder="e.g., Jonathan Reeves, Manhattan Resident"
            />
          </Field>
          <Field label="Rating (1-5)">
            <div className="flex gap-4 pt-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <label key={v} className="flex items-center gap-1.5 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="rating"
                    value={v}
                    checked={form.testimonialRating === String(v)}
                    onChange={(e) => handleChange("testimonialRating", e.target.value)}
                  />
                  {v}
                </label>
              ))}
            </div>
          </Field>
        </div>
      </Section>

      {/* SEO */}
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
              placeholder="Enter keywords separated by commas or on new lines..."
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
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
        >
          {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
    </DashboardLayout>
  )
}

// ---- Reusable pieces ----
const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"

function Section({
  title,
  desc,
  children,
}: {
  title: string
  desc: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{desc}</p>
      <div className="mt-5">{children}</div>
    </div>
  )
}

function Field({
  label,
  children,
  full,
}: {
  label: string
  children: React.ReactNode
  full?: boolean
}) {
  return (
    <div className={`space-y-2 ${full ? "md:col-span-2" : ""}`}>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  )
}