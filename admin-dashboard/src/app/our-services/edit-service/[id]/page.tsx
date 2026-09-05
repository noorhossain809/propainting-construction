"use client";

import * as React from "react";
import BackButton from "@/components/ui/BackButton"
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";

import {
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/constructionServiceApi";
import DashboardLayout from "@/app/dashboard/layout";

type FormState = {
  title: string;
  slug: string;
  shortDescription: string;
  subtitle: string;
  contentTitle: string;
  contentDescription: string;
  order: string;
  isActive: boolean;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  heroImageAlt: string;
  contentImageAlt: string;
};

const emptyForm: FormState = {
  title: "",
  slug: "",
  shortDescription: "",
  subtitle: "",
  contentTitle: "",
  contentDescription: "",
  order: "0",
  isActive: true,
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  heroImageAlt: "",
  contentImageAlt: "",
};

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: service,
    isLoading: isFetching,
    isError,
  } = useGetSingleServiceQuery(id);
  const [updateService, { isLoading: isSaving }] = useUpdateServiceMutation();

  const [form, setForm] = React.useState<FormState>(emptyForm);
  const [heroImage, setHeroImage] = React.useState<File | null>(null);
  const [contentImage, setContentImage] = React.useState<File | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    if (service && !hydrated) {
      setForm({
        title: service.title ?? "",
        slug: service.slug ?? "",
        shortDescription: service.shortDescription ?? "",
        subtitle: service.subtitle ?? "",
        contentTitle: service.contentTitle ?? "",
        contentDescription: service.contentDescription ?? "",
        order: String(service.order ?? 0),
        isActive: service.isActive ?? true,
        metaTitle: service.seo?.metaTitle ?? "",
        metaDescription: service.seo?.metaDescription ?? "",
        keywords: (service.seo?.keywords ?? []).join(", "),
        heroImageAlt: service.heroImage?.alt ?? "",
        contentImageAlt: service.contentImage?.alt ?? "",
      });
      setHydrated(true);
    }
  }, [service, hydrated]);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !form.title ||
      !form.slug ||
      !form.shortDescription ||
      !form.subtitle ||
      !form.contentTitle ||
      !form.contentDescription
    ) {
      setError(
        "Title, Slug, Short Description, Subtitle, Content Title and Content Description are required.",
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("slug", form.slug);
    formData.append("shortDescription", form.shortDescription);
    formData.append("subtitle", form.subtitle);
    formData.append("contentTitle", form.contentTitle);
    formData.append("contentDescription", form.contentDescription);
    formData.append("order", form.order || "0");
    formData.append("isActive", String(form.isActive));
    if (form.heroImageAlt) formData.append("heroImageAlt", form.heroImageAlt);
    if (form.contentImageAlt)
      formData.append("contentImageAlt", form.contentImageAlt);

    formData.append(
      "seo",
      JSON.stringify({
        metaTitle: form.metaTitle || undefined,
        metaDescription: form.metaDescription || undefined,
        keywords: form.keywords
          .split(/[,\n]/)
          .map((k) => k.trim())
          .filter(Boolean),
      }),
    );

    if (heroImage) formData.append("heroImage", heroImage);
    if (contentImage) formData.append("contentImage", contentImage);

    try {
      await updateService({ id, formData }).unwrap();
      router.push(`/our-services/${id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to update service. Please try again.");
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
        <p className="font-medium text-red-700">Service not found</p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit} className="container mx-auto space-y-6">
        <BackButton href="/our-services" label="Back to Services" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
            Edit
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Edit Service
          </h1>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <Section
          title="Basic Information"
          desc="For the homepage card and hero section."
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Service Title">
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </Field>
            <Field label="Slug (URL)">
              <input
                className={inputClass}
                value={form.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
              />
            </Field>
            <Field label="Short Description (Homepage Card)" full>
              <textarea
                className={inputClass}
                rows={2}
                value={form.shortDescription}
                onChange={(e) =>
                  handleChange("shortDescription", e.target.value)
                }
              />
            </Field>
            <Field label="Subtitle (Under the hero section)" full>
              <textarea
                className={inputClass}
                rows={2}
                value={form.subtitle}
                onChange={(e) => handleChange("subtitle", e.target.value)}
              />
            </Field>
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
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, isActive: e.target.checked }))
                  }
                  className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                />
                Show on website (Active)
              </label>
            </Field>
          </div>
        </Section>

        <Section
          title="Images"
          desc="The existing image stays if you don't upload a new one."
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Current Hero Image">
              {service.heroImage?.url ? (
                <div className="relative h-40 w-full overflow-hidden rounded-lg border border-slate-200">
                  <Image
                    src={service.heroImage.url}
                    alt={service.heroImage.alt || service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <p className="text-sm text-slate-400">No hero image</p>
              )}
            </Field>
            <Field label="Replace Hero Image (optional)">
              <input
                type="file"
                accept="image/*"
                className={inputClass}
                onChange={(e) => setHeroImage(e.target.files?.[0] ?? null)}
              />
              <input
                className={`${inputClass} mt-2`}
                placeholder="Hero image alt text"
                value={form.heroImageAlt}
                onChange={(e) => handleChange("heroImageAlt", e.target.value)}
              />
            </Field>
            <Field label="Current Content Image">
              {service.contentImage?.url ? (
                <div className="relative h-40 w-full overflow-hidden rounded-lg border border-slate-200">
                  <Image
                    src={service.contentImage.url}
                    alt={service.contentImage.alt || service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <p className="text-sm text-slate-400">No content image</p>
              )}
            </Field>
            <Field label="Replace Content Image (optional)">
              <input
                type="file"
                accept="image/*"
                className={inputClass}
                onChange={(e) => setContentImage(e.target.files?.[0] ?? null)}
              />
              <input
                className={`${inputClass} mt-2`}
                placeholder="Content image alt text"
                value={form.contentImageAlt}
                onChange={(e) =>
                  handleChange("contentImageAlt", e.target.value)
                }
              />
            </Field>
          </div>
        </Section>

        <Section
          title="Approach Section Content"
          desc="e.g. 'Our Approach to Professional Painting in NYC'।"
        >
          <div className="space-y-5">
            <Field label="Content Title">
              <input
                className={inputClass}
                value={form.contentTitle}
                onChange={(e) => handleChange("contentTitle", e.target.value)}
              />
            </Field>
            <Field label="Content Description">
              <textarea
                className={inputClass}
                rows={6}
                value={form.contentDescription}
                onChange={(e) =>
                  handleChange("contentDescription", e.target.value)
                }
              />
              <p className="mt-1 text-xs text-slate-400">
                {" "}
                Write each paragraph on a new line.
              </p>
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
                onChange={(e) =>
                  handleChange("metaDescription", e.target.value)
                }
              />
            </Field>
            <Field label="Keywords">
              <textarea
                className={inputClass}
                rows={2}
                value={form.keywords}
                onChange={(e) => handleChange("keywords", e.target.value)}
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
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100";

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{desc}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={`space-y-2 ${full ? "md:col-span-2" : ""}`}>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}
