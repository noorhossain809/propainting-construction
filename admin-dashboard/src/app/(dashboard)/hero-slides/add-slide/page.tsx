"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useCreateHeroSlideMutation } from "@/redux/api/heroSlideApi";
import Image from "next/image";
import { getVideoType, getVimeoEmbedUrl, getYoutubeEmbedUrl } from "@/lib/types";

type FormState = {
  badgeText: string;
  title: string;
  subtitle: string;
  mediaType: "image" | "video";
  videoUrl: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  order: string;
  isActive: boolean;
  backgroundImageAlt: string;
};

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
};




export default function AddHeroSlidePage() {
  const router = useRouter();
  const [createHeroSlide, { isLoading }] = useCreateHeroSlideMutation();

  const [form, setForm] = React.useState<FormState>(emptyForm);
  const [backgroundImage, setBackgroundImage] = React.useState<File | null>(
    null,
  );
  const [preview, setPreview] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setBackgroundImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.title) {
      setError("Title is required.");
      return;
    }
    if (form.mediaType === "image" && !backgroundImage) {
      setError("Background image is required.");
      return;
    }
    if (form.mediaType === "video" && !form.videoUrl) {
      setError("Video URL is required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("mediaType", form.mediaType);
    if (form.badgeText) formData.append("badgeText", form.badgeText);
    if (form.subtitle) formData.append("subtitle", form.subtitle);
    if (form.primaryButtonText)
      formData.append("primaryButtonText", form.primaryButtonText);
    if (form.primaryButtonLink)
      formData.append("primaryButtonLink", form.primaryButtonLink);
    if (form.secondaryButtonText)
      formData.append("secondaryButtonText", form.secondaryButtonText);
    if (form.secondaryButtonLink)
      formData.append("secondaryButtonLink", form.secondaryButtonLink);
    formData.append("order", form.order || "0");
    formData.append("isActive", String(form.isActive));

    if (form.mediaType === "image" && backgroundImage) {
      formData.append("backgroundImage", backgroundImage);
      if (form.backgroundImageAlt)
        formData.append("backgroundImageAlt", form.backgroundImageAlt);
    } else if (form.mediaType === "video") {
      formData.append("videoUrl", form.videoUrl);
    }

    try {
      await createHeroSlide(formData).unwrap();
      router.push("/hero-slides");
    } catch (err) {
      console.error(err);
      setError("Failed to save slide. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
          Homepage
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Add Hero Slide
        </h1>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Form fields */}
        <div className="space-y-6">
          <Section title="Content" desc="Text shown on the hero slide.">
            <div className="space-y-5">
              <Field label="Badge Text (small label above title)">
                <input
                  className={inputClass}
                  value={form.badgeText}
                  onChange={(e) => handleChange("badgeText", e.target.value)}
                  placeholder="e.g., PRO PAINTING CONSTRUCTION"
                />
              </Field>
              <Field label="Title">
                <input
                  className={inputClass}
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g., Professional Steam Cleaning Services"
                />
              </Field>
              <Field label="Subtitle">
                <textarea
                  className={inputClass}
                  rows={2}
                  value={form.subtitle}
                  onChange={(e) => handleChange("subtitle", e.target.value)}
                  placeholder="e.g., Deep-cleaning carpets, upholstery, and tiles with eco-friendly steam technology."
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
                  onChange={(e) =>
                    handleChange("primaryButtonText", e.target.value)
                  }
                  placeholder="Get Started"
                />
              </Field>
              <Field label="Primary Button Link">
                <input
                  className={inputClass}
                  value={form.primaryButtonLink}
                  onChange={(e) =>
                    handleChange("primaryButtonLink", e.target.value)
                  }
                  placeholder="/contact"
                />
              </Field>
              <Field label="Secondary Button Text">
                <input
                  className={inputClass}
                  value={form.secondaryButtonText}
                  onChange={(e) =>
                    handleChange("secondaryButtonText", e.target.value)
                  }
                  placeholder="View Projects"
                />
              </Field>
              <Field label="Secondary Button Link">
                <input
                  className={inputClass}
                  value={form.secondaryButtonLink}
                  onChange={(e) =>
                    handleChange("secondaryButtonLink", e.target.value)
                  }
                  placeholder="/our-works"
                />
              </Field>
            </div>
          </Section>

          <Section
            title="Background Media"
            desc="Choose an image or a video URL for this slide."
          >
            <div className="space-y-5">
              {/* Media type toggle */}
              <Field label="Media Type">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, mediaType: "image" }))
                    }
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
                    onClick={() =>
                      setForm((prev) => ({ ...prev, mediaType: "video" }))
                    }
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
                  <Field label="Upload Image">
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
                      onChange={(e) =>
                        handleChange("backgroundImageAlt", e.target.value)
                      }
                      placeholder="Descriptive alt text for the image"
                    />
                  </Field>
                </>
              ) : (
                <Field label="Video URL">
                  <input
                    className={inputClass}
                    value={form.videoUrl}
                    onChange={(e) => handleChange("videoUrl", e.target.value)}
                    placeholder="e.g., https://www.youtube.com/watch?v=... or a direct .mp4 link"
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    YouTube, Vimeo embed link, বা direct .mp4 file URL দিতে
                    পারেন।
                  </p>
                </Field>
              )}
            </div>
          </Section>

          <Section
            title="Display Settings"
            desc="Order and visibility on the homepage."
          >
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
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        isActive: e.target.checked,
                      }))
                    }
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
            {/* {preview ? (
              <Image src={preview} alt="Preview" fill className="object-cover opacity-60" unoptimized />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
            )} */}

            {/* {form.mediaType === "image" && preview ? (
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover opacity-60"
                unoptimized
              />
            ) : form.mediaType === "video" && form.videoUrl ? (
              <video
                src={form.videoUrl}
                className="absolute inset-0 h-full w-full object-cover opacity-60"
                muted
                autoPlay
                loop
              />

            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
            )} */}

            {form.mediaType === "image" && preview ? (
  <Image
    src={preview}
    alt="Preview"
    fill
    className="object-cover opacity-60"
    unoptimized
  />
) : form.mediaType === "video" && form.videoUrl ? (
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
) : (
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
              {form.subtitle && (
                <p className="mt-2 text-sm text-white/80">{form.subtitle}</p>
              )}
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
          disabled={isLoading}
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? "Saving..." : "Save Slide"}
        </button>
      </div>
    </form>
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
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}
