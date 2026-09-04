// app/(dashboard)/our-project/[id]/page.tsx
"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Pencil,
  Star,
  ImageOff,
} from "lucide-react"

import { useGetSingleProjectQuery } from "@/redux/api/constructionProjectApi"
import DashboardLayout from "@/app/dashboard/layout"

const categoryColors: Record<string, string> = {
  interior: "bg-amber-50 text-amber-700 border-amber-200",
  exterior: "bg-sky-50 text-sky-700 border-sky-200",
  commercial: "bg-violet-50 text-violet-700 border-violet-200",
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { data: project, isLoading, isError } = useGetSingleProjectQuery(id)

  const [activeImage, setActiveImage] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (project?.mainImage?.url) setActiveImage(project.mainImage.url)
  }, [project])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-40 animate-pulse rounded bg-slate-100" />
        <div className="aspect-[16/9] animate-pulse rounded-xl bg-slate-100" />
        <div className="space-y-3">
          <div className="h-6 w-2/3 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    )
  }

  if (isError || !project) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
        <p className="font-medium text-red-700">Project not found</p>
        <button
          onClick={() => router.push("/our-project")}
          className="mt-4 rounded-lg border border-red-300 px-4 py-2 text-sm text-red-700 hover:bg-red-100"
        >
          Back to all projects
        </button>
      </div>
    )
  }

  const allImages = [
    project.mainImage?.url,
    ...(project.gallery ?? []),
  ].filter(Boolean) as string[]

  return (
    <DashboardLayout>
        <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/our-projects"
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          All Projects
        </Link>
        <Link
          href={`/our-projects/edit-project/${project._id}`}
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
        >
          <Pencil className="h-4 w-4" />
          Edit Project
        </Link>
      </div>

      {/* Image gallery */}
      <div className="space-y-3">
        <div className="relative aspect-[12/5] overflow-hidden rounded-xl bg-slate-100">
          {activeImage ? (
            <Image
              src={activeImage}
              alt={project.mainImage?.alt || project.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ImageOff className="h-10 w-10 text-slate-300" />
            </div>
          )}
        </div>

        {allImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  activeImage === img ? "border-amber-500" : "border-transparent"
                }`}
              >
                <Image src={img} alt={`${project.title} ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Header info */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span
              className={`inline-block rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${
                categoryColors[project.category] ?? "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              {project.category}
            </span>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">{project.title}</h1>
            <p className="mt-1 text-sm text-slate-500">{project.projectType}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">
          {project.location && (
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400">Location</p>
                <p className="text-sm font-medium text-slate-700">{project.location}</p>
              </div>
            </div>
          )}
          {project.duration && (
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400">Duration</p>
                <p className="text-sm font-medium text-slate-700">{project.duration}</p>
              </div>
            </div>
          )}
          {project.completedDate && (
            <div className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400">Completed</p>
                <p className="text-sm font-medium text-slate-700">
                  {new Date(project.completedDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="font-semibold text-slate-900">Description</h2>
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
          {project.description}
        </p>
      </div>

      {/* Challenge / Solution */}
      {(project.challenge || project.solution) && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {project.challenge && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="font-semibold text-slate-900">Challenge</h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {project.challenge}
              </p>
            </div>
          )}
          {project.solution && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="font-semibold text-slate-900">Solution</h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {project.solution}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {project.results?.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">Results</h2>
          <ul className="mt-3 space-y-2">
            {project.results.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Testimonial */}
      {project.testimonial?.text && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < (project.testimonial?.rating ?? 0)
                    ? "fill-amber-400 text-amber-400"
                    : "text-amber-200"
                }`}
              />
            ))}
          </div>
          <p className="mt-3 text-sm italic leading-relaxed text-slate-700">
            &quot;{project.testimonial.text}&quot;
          </p>
          {project.testimonial.author && (
            <p className="mt-3 text-sm font-medium text-slate-900">
              — {project.testimonial.author}
            </p>
          )}
        </div>
      )}
    </div>
    </DashboardLayout>
  )
}