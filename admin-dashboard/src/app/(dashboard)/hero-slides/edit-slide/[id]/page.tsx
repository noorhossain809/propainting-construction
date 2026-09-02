// app/(dashboard)/hero-slides/edit-slide/[id]/page.tsx
"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Loader2 } from "lucide-react"

import {
  useGetSingleHeroSlideQuery,
  useUpdateHeroSlideMutation,
} from "@/redux/api/heroSlideApi"
import { getVideoType, getVimeoEmbedUrl, getYoutubeEmbedUrl } from "@/lib/types"

type FormState = {
  badgeText: string
  title: string
  subtitle: string
  mediaType: "image" | "video"
  videoUrl: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  order: string
  isActive: boolean
  backgroundImageAlt: string
}

const emptyForm: FormState = {
  badgeText: "",
  title: "",
  subtitle: "",
  mediaType: "image",
  videoUrl: "",
  primaryButtonText: "",
  primaryButtonLink: "",
  secondaryButtonText: "",
  secondaryButtonLink: "",
  order: "0",
  isActive: true,
  backgroundImageAlt: "",
}

export default function EditHeroSlidePage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const { data: slide, isLoading: isFetching, isError } = useGetSingleHeroSlideQuery(id)
  const [updateHeroSlide, { isLoading: isSaving }] = useUpdateHeroSlideMutation()

  const [form, setForm] = React.useState<FormState>(emptyForm)
  const [backgroundImage, setBackgroundImage] = React.useState<File | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    if (slide && !hydrated) {
      setForm({
        badgeText: slide.badgeText ?? "",
        title: slide.title ?? "",
        subtitle: slide.subtitle ?? "",
        mediaType: slide.mediaType ?? "image",
        videoUrl: slide.videoUrl ?? "",
        primaryButtonText: slide.primaryButtonText ?? "",
        primaryButtonLink: slide.primaryButtonLink ?? "",
        secondaryButtonText: slide.secondaryButtonText ?? "",
        secondaryButtonLink: slide.secondaryButtonLink ?? "",
        order: String(slide.order ?? 0),
        isActive: slide.isActive ?? true,
        backgroundImageAlt: slide.backgroundImage?.alt ?? "",
      })
      setHydrated(true)
    }
  }, [slide, hydrated])

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setBackgroundImage(file)
    setPreview(file ? URL.createObjectURL(file) : null)
  }

  const isDirectVideoFile = (url: string) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.title) {
      setError("Title is required.")
      return
    }
    if (form.mediaType === "video" && !form.videoUrl) {
      setError("Video URL is required.")
      return
    }

    const formData = new FormData()
    formData.append("title", form.title)
    formData.append("mediaType", form.mediaType)
    if (form.badgeText) formData.append("badgeText", form.badgeText)
    if (form.subtitle) formData.append("subtitle", form.subtitle)
    if (form.primaryButtonText) formData.append("primaryButtonText", form.primaryButtonText)
    if (form.primaryButtonLink) formData.append("primaryButtonLink", form.primaryButtonLink)
    if (form.secondaryButtonText) formData.append("secondaryButtonText", form.secondaryButtonText)
    if (form.secondaryButtonLink) formData.append("secondaryButtonLink", form.secondaryButtonLink)
    formData.append("order", form.order || "0")
    formData.append("isActive", String(form.isActive))

    if (form.mediaType === "image") {
      if (backgroundImage) {
        formData.append("backgroundImage", backgroundImage)
      }
      if (form.backgroundImageAlt) formData.append("backgroundImageAlt", form.backgroundImageAlt)
    } else if (form.mediaType === "video") {
      formData.append("videoUrl", form.videoUrl)
    }

    try {
      await updateHeroSlide({ id, formData }).unwrap()
      router.push("/hero-slides")
    } catch (err) {
      console.error(err)
      setError("Failed to update slide. Please try again.")
    }
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
      </div>
    )
  }

  if (isError || !slide) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
        <p className="font-medium text-red-700">Hero slide not found</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="container mx-auto space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">Edit</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Edit Hero Slide</h1>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <Section title="Content" desc="Text shown on the hero slide.">
            <div className="space-y-5">
              <Field label="Badge Text (small label above title)">
                <input
                  className={inputClass}
                  value={form.badgeText}
                  onChange={(e) => handleChange("badgeText", e.target.value)}
                />
              </Field>
              <Field label="Title">
                <input
                  className={inputClass}
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </Field>
              <Field label="Subtitle">
                <textarea
                  className={inputClass}
                  rows={2}
                  value={form.subtitle}
                  onChange={(e) => handleChange("subtitle", e.target.value)}
                />
              </Field>
            </div>
          </Section>

          <Section title="Buttons" desc="Two optional call-to-action buttons.">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Primary Button Text">
                <input
                  className={inputClass}
                  value={form.primaryButtonText}
                  onChange={(e) => handleChange("primaryButtonText", e.target.value)}
                />
              </Field>
              <Field label="Primary Button Link">
                <input
                  className={inputClass}
                  value={form.primaryButtonLink}
                  onChange={(e) => handleChange("primaryButtonLink", e.target.value)}
                />
              </Field>
              <Field label="Secondary Button Text">
                <input
                  className={inputClass}
                  value={form.secondaryButtonText}
                  onChange={(e) => handleChange("secondaryButtonText", e.target.value)}
                />
              </Field>
              <Field label="Secondary Button Link">
                <input
                  className={inputClass}
                  value={form.secondaryButtonLink}
                  onChange={(e) => handleChange("secondaryButtonLink", e.target.value)}
                />
              </Field>
            </div>
          </Section>

          <Section title="Background Media" desc="Switch between image or video URL. New upload replaces the existing image.">
            <div className="space-y-5">
              <Field label="Media Type">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, mediaType: "image" }))}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                      form.mediaType === "image"
                        ? "border-amber-400 bg-amber-50 text-amber-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, mediaType: "video" }))}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                      form.mediaType === "video"
                        ? "border-amber-400 bg-amber-50 text-amber-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Video URL
                  </button>
                </div>
              </Field>

              {form.mediaType === "image" ? (
                <>
                  <Field label="Current Image">
                    {slide.backgroundImage?.url ? (
                      <div className="relative h-40 w-full overflow-hidden rounded-lg border border-slate-200">
                        <Image
                          src={slide.backgroundImage.url}
                          alt={slide.backgroundImage.alt || slide.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400">No image set</p>
                    )}
                  </Field>
                  <Field label="Replace Image (optional)">
                    <input
                      type="file"
                      accept="image/*"
                      className={inputClass}
                      onChange={handleImageChange}
                    />
                  </Field>
                  <Field label="Alt Text">
                    <input
                      className={inputClass}
                      value={form.backgroundImageAlt}
                      onChange={(e) => handleChange("backgroundImageAlt", e.target.value)}
                    />
                  </Field>
                </>
              ) : (
                <Field label="Video URL">
                  <input
                    className={inputClass}
                    value={form.videoUrl}
                    onChange={(e) => handleChange("videoUrl", e.target.value)}
                    placeholder="e.g., https://example.com/video.mp4 or a YouTube/Vimeo link"
                  />
                </Field>
              )}
            </div>
          </Section>

          <Section title="Display Settings" desc="Order and visibility on the homepage.">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
          </Section>
        </div>

        {/* Live preview */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <p className="mb-2 text-sm font-medium text-slate-700">Preview</p>
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-800">
            {form.mediaType === "image" && (preview || slide.backgroundImage?.url) && (
              <Image
                src={preview || slide.backgroundImage!.url}
                alt="Preview"
                fill
                className="object-cover opacity-60"
                unoptimized={!!preview}
              />
            )}

            {form.mediaType === "video" && form.videoUrl  && (
              // <video
              //   key={form.videoUrl}
              //   src={form.videoUrl}
              //   className="absolute inset-0 h-full w-full object-cover opacity-60"
              //   muted
              //   autoPlay
              //   loop
              //   playsInline
              // />

              (() => {
                  const videoType = getVideoType(form.videoUrl);
              
                  if (videoType === "youtube") {
                    const embedUrl = getYoutubeEmbedUrl(form.videoUrl);
              
                    return embedUrl ? (
                      <iframe
                        src={embedUrl}
                        className="absolute inset-0 h-full w-full"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        Invalid YouTube URL
                      </div>
                    );
                  }
              
                  if (videoType === "vimeo") {
                    const embedUrl = getVimeoEmbedUrl(form.videoUrl);
              
                    return embedUrl ? (
                      <iframe
                        src={embedUrl}
                        className="absolute inset-0 h-full w-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        Invalid Vimeo URL
                      </div>
                    );
                  }
              
                  if (videoType === "direct") {
                    return (
                      <video
                        src={form.videoUrl}
                        className="absolute inset-0 h-full w-full object-cover opacity-60"
                        muted
                        autoPlay
                        loop
                        playsInline
                      />
                    );
                  }
              
                  return (
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      Unsupported video URL
                    </div>
                  );
                })()
            )}
{/* 
            {form.mediaType === "video" && form.videoUrl && !isDirectVideoFile(form.videoUrl) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-900/80">
                <svg
                  className="h-10 w-10 text-white/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <p className="max-w-[80%] truncate text-xs text-white/60">{form.videoUrl}</p>
                <p className="text-[11px] text-white/40">External video — plays on live site</p>
              </div>
            )} */}

            {!(form.mediaType === "image" && (preview || slide.backgroundImage?.url)) &&
              !(form.mediaType === "video" && form.videoUrl) && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
              )}

            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              {form.badgeText && (
                <span className="text-xs font-semibold uppercase tracking-wide text-amber-400">
                  {form.badgeText}
                </span>
              )}
              <h2 className="mt-2 text-xl font-bold text-white">
                {form.title || "Slide title preview"}
              </h2>
              {form.subtitle && <p className="mt-2 text-sm text-white/80">{form.subtitle}</p>}
              <div className="mt-4 flex gap-3">
                {form.primaryButtonText && (
                  <span className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white">
                    {form.primaryButtonText}
                  </span>
                )}
                {form.secondaryButtonText && (
                  <span className="rounded-lg border border-white/50 px-4 py-2 text-xs font-medium text-white">
                    {form.secondaryButtonText}
                  </span>
                )}
              </div>
            </div>
          </div>
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
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
        >
          {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  )
}

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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  )
}