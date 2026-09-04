// app/(dashboard)/our-project/page.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  MoreVertical,
  Pencil,
  Trash2,
  MapPin,
  Plus,
  Search,
  ImageOff,
  X,
} from "lucide-react"

import {
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
  IProject,
} from "@/redux/api/constructionProjectApi"
import { useRouter } from "next/navigation"

const categoryColors: Record<string, string> = {
  interior: "bg-amber-50 text-amber-700 border-amber-200",
  exterior: "bg-sky-50 text-sky-700 border-sky-200",
  commercial: "bg-violet-50 text-violet-700 border-violet-200",
}

export default function ProjectPage() {
  const { data: projects, isLoading, isError } = useGetAllProjectsQuery()
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation()

  const [search, setSearch] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all")
  const [deleteTarget, setDeleteTarget] = React.useState<IProject | null>(null)
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null)

  const router = useRouter()

  const filteredProjects = React.useMemo(() => {
    if (!projects) return []
    return projects.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        categoryFilter === "all" || p.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [projects, search, categoryFilter])

  // close when clicking outside the menu
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
      await deleteProject(deleteTarget._id).unwrap()
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
            Portfolio
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            All Projects
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {isLoading
              ? "Loading..."
              : `${projects?.length ?? 0} project${projects?.length === 1 ? "" : "s"} total`}
          </p>
        </div>
        <Link href="/our-project/add-project">
          <button className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600">
            <Plus className="h-4 w-4" />
            Add Project
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100 sm:w-[180px]"
        >
          <option value="all">All Categories</option>
          <option value="interior">Interior</option>
          <option value="exterior">Exterior</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="aspect-[4/3] bg-slate-100" />
              <div className="space-y-2 p-4">
                <div className="h-4 w-3/4 rounded bg-slate-100" />
                <div className="h-3 w-1/2 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
          <p className="font-medium text-red-700">Failed to load projects</p>
          <p className="mt-1 text-sm text-red-600">Please try again.</p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && projects && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <ImageOff className="h-10 w-10 text-slate-300" />
          <p className="mt-4 font-medium text-slate-700">No projects added yet</p>
          <p className="mt-1 text-sm text-slate-500">Add your first project to start the portfolio.</p>
          <Link href="/our-project/add-project" className="mt-4">
            <button className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600">
              <Plus className="h-4 w-4" />
              Add Project
            </button>
          </Link>
        </div>
      )}

      {/* No search results */}
      {!isLoading &&
        !isError &&
        projects &&
        projects.length > 0 &&
        filteredProjects.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-14 text-center">
            <p className="font-medium text-slate-700">No projects found</p>
            <p className="mt-1 text-sm text-slate-500">Try changing your search or filter.</p>
          </div>
        )}

      {/* Project grid */}
     {/* Project grid */}
{!isLoading && !isError && filteredProjects.length > 0 && (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {filteredProjects.map((project) => (
      <div
        key={project._id}
        className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
      >
        {/* Action menu — outside the Link, so no nesting issues */}
        <div className="absolute right-2 top-2 z-20">
          <button
            onClick={() =>
              setOpenMenuId(openMenuId === project._id ? null : project._id)
            }
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:bg-white"
          >
            <MoreVertical className="h-4 w-4 text-slate-700" />
          </button>

          {openMenuId === project._id && (
            <div className="absolute right-0 top-9 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              <button
                onClick={() => {
                  setOpenMenuId(null)
                  router.push(`/our-projects/edit-project/${project._id}`)
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
              <button
                onClick={() => {
                  setDeleteTarget(project)
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

        {/* This Link goes to the details page — the dropdown is now outside it */}
        <Link href={`/our-projects/${project._id}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
            {project.mainImage?.url ? (
              <Image
                src={project.mainImage.url}
                alt={project.mainImage.alt || project.title}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <ImageOff className="h-8 w-8 text-slate-300" />
              </div>
            )}

            <span
              className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 text-xs font-medium capitalize backdrop-blur ${
                categoryColors[project.category] ??
                "border-slate-200 bg-white/90 text-slate-700"
              }`}
            >
              {project.category}
            </span>
          </div>

          <div className="p-4">
            <p className="line-clamp-1 font-semibold text-slate-900">
              {project.title}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              {project.projectType}
            </p>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              {project.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="line-clamp-1">{project.location}</span>
                </span>
              )}
              {project.completedDate && (
                <span>
                  {new Date(project.completedDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
)}

      {/* Delete confirmation — custom modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                Delete this project?
              </h3>
              <button
                onClick={() => setDeleteTarget(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              &quot;{deleteTarget.title}&quot; will be permanently deleted and cannot be recovered.
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