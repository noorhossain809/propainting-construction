"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MoreVertical, Pencil, Trash2, Plus, ImageOff, X } from "lucide-react"

import {
  useGetAllTeamMembersQuery,
  useDeleteTeamMemberMutation,
  ITeamMember,
} from "@/redux/api/teamApi"

export default function TeamPage() {
  const { data: members, isLoading, isError } = useGetAllTeamMembersQuery()
  const [deleteTeamMember, { isLoading: isDeleting }] = useDeleteTeamMemberMutation()
  const router = useRouter()

  const [deleteTarget, setDeleteTarget] = React.useState<ITeamMember | null>(null)
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
      await deleteTeamMember(deleteTarget._id).unwrap()
      setDeleteTarget(null)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">About</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Our Team</h1>
          <p className="mt-1 text-sm text-slate-500">
            {isLoading
              ? "Loading..."
              : `${members?.length ?? 0} member${members?.length === 1 ? "" : "s"} total`}
          </p>
        </div>
        <Link href="/our-team/add-member">
          <button className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600">
            <Plus className="h-4 w-4" />
            Add Team Member
          </button>
        </Link>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="aspect-square bg-slate-100" />
              <div className="space-y-2 p-3">
                <div className="h-3 w-3/4 rounded bg-slate-100" />
                <div className="h-3 w-1/2 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
          <p className="font-medium text-red-700">Failed to load team members</p>
        </div>
      )}

      {!isLoading && !isError && members && members.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <ImageOff className="h-10 w-10 text-slate-300" />
          <p className="mt-4 font-medium text-slate-700">No team members added yet</p>
          <Link href="/our-team/add-member" className="mt-4">
            <button className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600">
              <Plus className="h-4 w-4" />
              Add Team Member
            </button>
          </Link>
        </div>
      )}

      {!isLoading && !isError && members && members.length > 0 && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {members.map((member) => (
            <div
              key={member._id}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="absolute right-2 top-2 z-20">
                <button
                  onClick={() => setOpenMenuId(openMenuId === member._id ? null : member._id)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:bg-white"
                >
                  <MoreVertical className="h-3.5 w-3.5 text-slate-700" />
                </button>

                {openMenuId === member._id && (
                  <div className="absolute right-0 top-8 w-32 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                    <button
                      onClick={() => {
                        setOpenMenuId(null)
                        router.push(`/our-team/edit-member/${member._id}`)
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50"
                    >
                      <Pencil className="h-3 w-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteTarget(member)
                        setOpenMenuId(null)
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="relative aspect-square overflow-hidden bg-slate-100">
                {member.image?.url ? (
                  <Image
                    src={member.image.url}
                    alt={member.image.alt || member.name}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageOff className="h-8 w-8 text-slate-300" />
                  </div>
                )}
                {!member.isActive && (
                  <span className="absolute left-2 top-2 rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-white">
                    Hidden
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="line-clamp-1 text-sm font-semibold text-slate-900">{member.name}</p>
                <p className="line-clamp-1 text-xs text-slate-500">{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Delete this member?</h3>
              <button onClick={() => setDeleteTarget(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              &quot;{deleteTarget.name}&quot; will be permanently removed from the team.
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