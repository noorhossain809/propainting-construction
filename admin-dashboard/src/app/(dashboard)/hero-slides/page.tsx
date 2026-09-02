"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  MoreVertical,
  Pencil,
  Trash2,
  Plus,
  ImageOff,
  X,
  Eye,
  EyeOff,
  GripVertical,
} from "lucide-react"

import {
  useGetAllHeroSlidesQuery,
  useDeleteHeroSlideMutation,
  IHeroSlide,
} from "@/redux/api/heroSlideApi"
import { getVideoType, getVimeoEmbedUrl, getYoutubeEmbedUrl } from "@/lib/types"


export default function HeroSlidePage() {
  const { data: slides, isLoading, isError } = useGetAllHeroSlidesQuery()
  console.log(slides)
  const [deleteHeroSlide, { isLoading: isDeleting }] = useDeleteHeroSlideMutation()
  const router = useRouter()

  const [deleteTarget, setDeleteTarget] = React.useState<IHeroSlide | null>(null)
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const closeMenu = () => setOpenMenuId(null)
    if (openMenuId) {
      document.addEventListener("click", closeMenu)
      return () => document.removeEventListener("click", closeMenu)
    }
  }, [openMenuId])

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteHeroSlide(deleteTarget._id).unwrap()
      setDeleteTarget(null)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
            Homepage
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Hero Banner Slides</h1>
          <p className="mt-1 text-sm text-slate-500">
            {isLoading
              ? "Loading..."
              : `${slides?.length ?? 0} slide${slides?.length === 1 ? "" : "s"} total`}
          </p>
        </div>
        <Link href="/hero-slides/add-slide">
          <button className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600">
            <Plus className="h-4 w-4" />
            Add Slide
          </button>
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl border border-slate-200 bg-white" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
          <p className="font-medium text-red-700">Failed to load hero slides</p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && slides && slides.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <ImageOff className="h-10 w-10 text-slate-300" />
          <p className="mt-4 font-medium text-slate-700">No hero slides added yet</p>
          <Link href="/hero-slides/add-slide" className="mt-4">
            <button className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600">
              <Plus className="h-4 w-4" />
              Add Slide
            </button>
          </Link>
        </div>
      )}

      {/* Slide list — ordered rows since sequence matters here */}
      {!isLoading && !isError && slides && slides.length > 0 && (
        <div className="space-y-3">
          {slides.map((slide) => (
            <div
              key={slide._id}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md"
            >
              <GripVertical className="h-4 w-4 flex-shrink-0 text-slate-300" />

              {/* <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                {slide.backgroundImage?.url ? (
                  <Image
                    src={slide.backgroundImage.url}
                    alt={slide.backgroundImage.alt || slide.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageOff className="h-5 w-5 text-slate-300" />
                  </div>
                )}
              </div> */}

              <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
  {slide.mediaType === "image" && slide.backgroundImage?.url ? (
    <Image
      src={slide.backgroundImage.url}
      alt={slide.backgroundImage.alt || slide.title}
      fill
      className="object-cover"
    />
  ) : slide.mediaType === "video" && slide.videoUrl ? (
  (() => {
    const videoType = getVideoType(slide.videoUrl);

    if (videoType === "youtube") {
      const embedUrl = getYoutubeEmbedUrl(slide.videoUrl);

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
      const embedUrl = getVimeoEmbedUrl(slide.videoUrl);

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
          src={slide.videoUrl}
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
) : (
    <div className="flex h-full items-center justify-center">
      <ImageOff className="h-5 w-5 text-slate-300" />
    </div>
  )}
</div>

              <div className="min-w-0 flex-1">
                {slide.badgeText && (
                  <p className="text-xs font-medium uppercase tracking-wide text-amber-600">
                    {slide.badgeText}
                  </p>
                )}
                <p className="line-clamp-1 font-semibold text-slate-900">{slide.title}</p>
                {slide.subtitle && (
                  <p className="line-clamp-1 text-xs text-slate-500">{slide.subtitle}</p>
                )}
              </div>

              <span className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                Order: {slide.order}
              </span>

              <span
                className={`flex flex-shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                  slide.isActive
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                {slide.isActive ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                {slide.isActive ? "Active" : "Hidden"}
              </span>

              {/* Action menu */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setOpenMenuId(openMenuId === slide._id ? null : slide._id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-slate-100"
                >
                  <MoreVertical className="h-4 w-4 text-slate-700" />
                </button>

                {openMenuId === slide._id && (
                  <div className="absolute right-0 top-9 z-20 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                    <button
                      onClick={() => {
                        setOpenMenuId(null)
                        router.push(`/hero-slides/edit-slide/${slide._id}`)
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteTarget(slide)
                        setOpenMenuId(null)
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Delete this slide?</h3>
              <button onClick={() => setDeleteTarget(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              &quot;{deleteTarget.title}&quot; will be permanently deleted.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}