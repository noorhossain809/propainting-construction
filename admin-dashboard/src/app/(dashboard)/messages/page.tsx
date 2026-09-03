"use client"

import * as React from "react"
import {
  Mail,
  Phone,
  Trash2,
  X,
  Inbox,
  Check,
  Archive,
  RefreshCw,
} from "lucide-react"

import {
  useGetAllContactMessagesQuery,
  useUpdateContactMessageStatusMutation,
  useDeleteContactMessageMutation,
  IContactMessage,
} from "@/redux/api/contactMessageApi"

const PROJECT_TYPE_LABELS: Record<string, string> = {
  "interior-painting": "Interior Painting",
  "exterior-painting": "Exterior Painting",
  renovation: "Renovation & Remodeling",
  drywall: "Drywall & Plastering",
  flooring: "Flooring & Tiling",
  custom: "Custom Project",
}

const STATUS_STYLES: Record<IContactMessage["status"], string> = {
  new: "bg-red-100 text-red-700",
  read: "bg-emerald-100 text-emerald-700",
  archived: "bg-slate-100 text-slate-500",
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })

type Filter = "all" | IContactMessage["status"]

export default function MessagesPage() {
  const { data: messages, isLoading, isError, refetch, isFetching } =
    useGetAllContactMessagesQuery(undefined, {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    })
  const [updateStatus] = useUpdateContactMessageStatusMutation()
  const [deleteMessage, { isLoading: isDeleting }] =
    useDeleteContactMessageMutation()

  const [filter, setFilter] = React.useState<Filter>("all")
  const [deleteTarget, setDeleteTarget] = React.useState<IContactMessage | null>(
    null
  )

  const counts = React.useMemo(() => {
    const list = messages ?? []
    return {
      all: list.length,
      new: list.filter((m) => m.status === "new").length,
      read: list.filter((m) => m.status === "read").length,
      archived: list.filter((m) => m.status === "archived").length,
    }
  }, [messages])

  const visible = React.useMemo(() => {
    const list = messages ?? []
    return filter === "all" ? list : list.filter((m) => m.status === filter)
  }, [messages, filter])

  const setStatus = (id: string, status: IContactMessage["status"]) =>
    updateStatus({ id, status })

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteMessage(deleteTarget._id).unwrap()
      setDeleteTarget(null)
    } catch (err) {
      console.error(err)
    }
  }

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: counts.all },
    { key: "new", label: "New", count: counts.new },
    { key: "read", label: "Read", count: counts.read },
    { key: "archived", label: "Archived", count: counts.archived },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
            Inbox
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Messages</h1>
          <p className="mt-1 text-sm text-slate-500">
            {isLoading
              ? "Loading..."
              : `${counts.all} message${counts.all === 1 ? "" : "s"} · ${counts.new} new`}
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition ${
              filter === f.key
                ? "bg-amber-500 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {f.label}
            <span
              className={`rounded-full px-1.5 text-xs ${
                filter === f.key ? "bg-white/25" : "bg-slate-100"
              }`}
            >
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="h-4 w-1/3 rounded bg-slate-100" />
              <div className="mt-3 h-3 w-2/3 rounded bg-slate-100" />
              <div className="mt-2 h-3 w-1/2 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
          <p className="font-medium text-red-700">Failed to load messages</p>
        </div>
      )}

      {!isLoading && !isError && visible.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <Inbox className="h-10 w-10 text-slate-300" />
          <p className="mt-4 font-medium text-slate-700">
            No {filter === "all" ? "" : filter} messages
          </p>
        </div>
      )}

      {!isLoading && !isError && visible.length > 0 && (
        <div className="space-y-4">
          {visible.map((msg) => (
            <div
              key={msg._id}
              className={`rounded-xl border bg-white p-5 shadow-sm transition ${
                msg.status === "new"
                  ? "border-amber-300"
                  : "border-slate-200"
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-semibold text-slate-900">
                      {msg.name}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase ${STATUS_STYLES[msg.status]}`}
                    >
                      {msg.status}
                    </span>
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                      {PROJECT_TYPE_LABELS[msg.projectType] ?? msg.projectType}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600">
                    <a
                      href={`mailto:${msg.email}`}
                      className="flex items-center gap-1.5 hover:text-amber-600"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {msg.email}
                    </a>
                    <a
                      href={`tel:${msg.phone.replace(/[^+\d]/g, "")}`}
                      className="flex items-center gap-1.5 hover:text-amber-600"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {msg.phone}
                    </a>
                  </div>

                  {msg.projectDetails && (
                    <p className="mt-3 whitespace-pre-line rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                      {msg.projectDetails}
                    </p>
                  )}

                  <p className="mt-3 text-xs text-slate-400">
                    {formatDate(msg.createdAt)}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  {msg.status !== "read" && (
                    <button
                      onClick={() => setStatus(msg._id, "read")}
                      className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Mark read
                    </button>
                  )}
                  {msg.status !== "archived" && (
                    <button
                      onClick={() => setStatus(msg._id, "archived")}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                    >
                      <Archive className="h-3.5 w-3.5" />
                      Archive
                    </button>
                  )}
                  <button
                    onClick={() => setDeleteTarget(msg)}
                    className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                Delete this message?
              </h3>
              <button
                onClick={() => setDeleteTarget(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              The message from &quot;{deleteTarget.name}&quot; will be
              permanently removed.
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
