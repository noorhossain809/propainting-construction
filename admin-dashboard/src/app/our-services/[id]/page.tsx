"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Pencil, ImageOff, ListOrdered, Eye, EyeOff } from "lucide-react"

import { useGetSingleServiceQuery } from "@/redux/api/constructionServiceApi"
import DashboardLayout from "@/app/dashboard/layout"

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { data: service, isLoading, isError } = useGetSingleServiceQuery(id)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-40 animate-pulse rounded bg-slate-100" />
        <div className="aspect-[21/9] animate-pulse rounded-xl bg-slate-100" />
        <div className="space-y-3">
          <div className="h-6 w-2/3 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    )
  }

  if (isError || !service) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
        <p className="font-medium text-red-700">Service not found</p>
        <button
          onClick={() => router.push("/our-services")}
          className="mt-4 rounded-lg border border-red-300 px-4 py-2 text-sm text-red-700 hover:bg-red-100"
        >
          Back to all services
        </button>
      </div>
    )
  }

  return (
    <DashboardLayout>
        <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/our-services"
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          All Services
        </Link>
        <Link
          href={`/our-services/edit-service/${service._id}`}
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
        >
          <Pencil className="h-4 w-4" />
          Edit Service
        </Link>
      </div>

      {/* Hero image preview */}
      <div className="relative aspect-[21/9] overflow-hidden rounded-xl bg-slate-900">
        {service.heroImage?.url ? (
          <Image
            src={service.heroImage.url}
            alt={service.heroImage.alt || service.title}
            fill
            className="object-cover opacity-70"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ImageOff className="h-10 w-10 text-slate-500" />
          </div>
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">{service.title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base">{service.subtitle}</p>
        </div>
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
            service.isActive
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-slate-50 text-slate-600"
          }`}
        >
          {service.isActive ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
          {service.isActive ? "Visible on site" : "Hidden"}
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
          <ListOrdered className="h-3.5 w-3.5" />
          Order: {service.order}
        </span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
          /{service.slug}
        </span>
      </div>

      {/* Short description */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="font-semibold text-slate-900">Short Description</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.shortDescription}</p>
      </div>

      {/* Approach content section */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="font-semibold text-slate-900">Approach Section</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
            {service.contentImage?.url ? (
              <Image
                src={service.contentImage.url}
                alt={service.contentImage.alt || service.contentTitle}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <ImageOff className="h-8 w-8 text-slate-300" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{service.contentTitle}</h3>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
              {service.contentDescription}
            </p>
          </div>
        </div>
      </div>

      {/* SEO */}
      {(service.seo?.metaTitle || service.seo?.metaDescription || service.seo?.keywords?.length) && (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">SEO</h2>
          <div className="mt-3 space-y-3 text-sm">
            {service.seo?.metaTitle && (
              <div>
                <p className="text-xs text-slate-400">Meta Title</p>
                <p className="text-slate-700">{service.seo.metaTitle}</p>
              </div>
            )}
            {service.seo?.metaDescription && (
              <div>
                <p className="text-xs text-slate-400">Meta Description</p>
                <p className="text-slate-700">{service.seo.metaDescription}</p>
              </div>
            )}
            {!!service.seo?.keywords?.length && (
              <div>
                <p className="text-xs text-slate-400">Keywords</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {service.seo.keywords.map((k, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </DashboardLayout>
  )
}