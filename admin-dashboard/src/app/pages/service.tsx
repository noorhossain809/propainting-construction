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
  Search,
  ImageOff,
  X,
} from "lucide-react"

import {
  useGetAllServicesQuery,
  useDeleteServiceMutation,
  IService,
} from "@/redux/api/constructionServiceApi"

export default function ServicePage() {
  const { data: services, isLoading, isError } = useGetAllServicesQuery()
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation()
  const router = useRouter()

  const [search, setSearch] = React.useState("")
  const [deleteTarget, setDeleteTarget] = React.useState<IService | null>(null)
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null)

  const filteredServices = React.useMemo(() => {
    if (!services) return []
    return services.filter((s) =>
      s.title.toLowerCase().includes(search.toLowerCase())
    )
  }, [services, search])

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
      await deleteService(deleteTarget._id).unwrap()
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
            Services
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">All Services</h1>
          <p className="mt-1 text-sm text-slate-500">
            {isLoading
              ? "Loading..."
              : `${services?.length ?? 0} service${services?.length === 1 ? "" : "s"} total`}
          </p>
        </div>
        <Link href="/our-services/add-service">
          <button className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600">
            <Plus className="h-4 w-4" />
            Add Service
          </button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
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

      {/* Error */}
      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
          <p className="font-medium text-red-700">Failed to load services</p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && services && services.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <ImageOff className="h-10 w-10 text-slate-300" />
          <p className="mt-4 font-medium text-slate-700">No services have been added yet.</p>
          <Link href="/our-services/add-service" className="mt-4">
            <button className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600">
              <Plus className="h-4 w-4" />
              Add Service
            </button>
          </Link>
        </div>
      )}

      {/* No results */}
      {!isLoading &&
        !isError &&
        services &&
        services.length > 0 &&
        filteredServices.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-14 text-center">
            <p className="font-medium text-slate-700">No services found</p>
          </div>
        )}

      {/* Grid */}
      {!isLoading && !isError && filteredServices.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredServices.map((service) => (
            <div
              key={service._id}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Action menu */}
              <div className="absolute right-2 top-2 z-20">
                <button
                  onClick={() =>
                    setOpenMenuId(openMenuId === service._id ? null : service._id)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:bg-white"
                >
                  <MoreVertical className="h-4 w-4 text-slate-700" />
                </button>

                {openMenuId === service._id && (
                  <div className="absolute right-0 top-9 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                    <button
                      onClick={() => {
                        setOpenMenuId(null)
                        router.push(`/our-services/edit-service/${service._id}`)
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteTarget(service)
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

              <Link href={`/our-services/${service._id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  {service.heroImage?.url ? (
                    <Image
                      src={service.heroImage.url}
                      alt={service.heroImage.alt || service.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ImageOff className="h-8 w-8 text-slate-300" />
                    </div>
                  )}
                  {!service.isActive && (
                    <span className="absolute left-3 top-3 rounded-full bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-white">
                      Hidden
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="line-clamp-1 font-semibold text-slate-900">
                    {service.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                    {service.shortDescription}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Delete this service?</h3>
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