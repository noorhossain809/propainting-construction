// app/(dashboard)/contact-info/page.tsx

// dashboard
"use client";


import * as React from "react";
import {
  Loader2,
  CheckCircle2,
  Phone,
  Clock,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import {
  useGetContactInfoQuery,
  useUpdateContactInfoMutation,
} from "@/redux/api/contactInfoApi";

type FormState = {
  phoneOne: string;
  phoneTwo: string;
  workingHours: string;
  email: string;
  location: string;
  licenseNumber: string;
  insuranceText: string;
};

const emptyForm: FormState = {
  phoneOne: "",
  phoneTwo: "",
  workingHours: "",
  email: "",
  location: "",
  licenseNumber: "",
  insuranceText: "",
};

export default function ContactInfoPage() {
  const { data: contactInfo, isLoading, isError } = useGetContactInfoQuery();
  const [updateContactInfo, { isLoading: isSaving }] =
    useUpdateContactInfoMutation();

  const [form, setForm] = React.useState<FormState>(emptyForm);
  const [hydrated, setHydrated] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    if (contactInfo && !hydrated) {
      setForm({
        phoneOne: contactInfo.phoneOne ?? "",
        phoneTwo: contactInfo.phoneTwo ?? "",
        workingHours: contactInfo.workingHours ?? "",
        email: contactInfo.email ?? "",
        location: contactInfo.location ?? "",
        licenseNumber: contactInfo.licenseNumber ?? "",
        insuranceText: contactInfo.insuranceText ?? "",
      });
      setHydrated(true);
    }
  }, [contactInfo, hydrated]);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (
      !form.phoneOne ||
      !form.workingHours ||
      !form.email ||
      !form.location ||
      !form.licenseNumber
    ) {
      setError(
        "Phone, Working Hours, Email, Location and License Number are required.",
      );
      return;
    }

    try {
      await updateContactInfo(form).unwrap();
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Failed to save contact info. Please try again.");
    }
  };

  React.useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(false), 3000);
    return () => clearTimeout(timer);
  }, [success]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
        <p className="font-medium text-red-700">Failed to load contact info</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
          Site Settings
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Contact Information
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          This info is shown in the website footer and Contact Us page.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr]">
        {/* Left — live preview card */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm">
            <div className="border-b border-white/10 px-6 py-4">
              <p className="text-xs font-medium uppercase tracking-wide text-amber-400">
                Live Preview
              </p>
              <p className="mt-0.5 text-sm text-white/60">
                How this appears on the site
              </p>
            </div>

            <div className="space-y-5 p-6">
              <PreviewItem icon={Phone} label="Call Support Center">
                <div className="space-y-0.5">
                  {form.phoneOne ? (
                    <p className="font-semibold text-white">{form.phoneOne}</p>
                  ) : (
                    <p className="text-white/30">Not set</p>
                  )}
                  {form.phoneTwo && (
                    <p className="font-semibold text-white">{form.phoneTwo}</p>
                  )}
                </div>
              </PreviewItem>

              <PreviewItem icon={Clock} label="Working Hours">
                <p
                  className={form.workingHours ? "text-white" : "text-white/30"}
                >
                  {form.workingHours || "Not set"}
                </p>
              </PreviewItem>

              <PreviewItem icon={Mail} label="Write To Us">
                <p className={form.email ? "text-white" : "text-white/30"}>
                  {form.email || "Not set"}
                </p>
              </PreviewItem>

              <PreviewItem icon={MapPin} label="Service Area">
                <p
                  className={
                    form.location
                      ? "whitespace-pre-line text-white"
                      : "text-white/30"
                  }
                >
                  {form.location || "Not set"}
                </p>
              </PreviewItem>

              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  <p className="text-xs font-semibold text-white">
                    Licensed &amp; Insured
                  </p>
                </div>
                <p className="mt-2 text-xs text-white/60">
                  {form.licenseNumber
                    ? `License #: ${form.licenseNumber}`
                    : "License number not set"}
                </p>
                <p className="mt-1 text-xs text-white/60">
                  {form.insuranceText || "Insurance text not set"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Contact info updated successfully.
            </div>
          )}

          <Section
            title="Phone Numbers"
            desc="Displayed as 'Call Support Center' in header/footer."
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Phone Number 1">
                <input
                  className={inputClass}
                  value={form.phoneOne}
                  onChange={(e) => handleChange("phoneOne", e.target.value)}
                  placeholder="+1 (917) 539-8168"
                />
              </Field>
              <Field label="Phone Number 2 (optional)">
                <input
                  className={inputClass}
                  value={form.phoneTwo}
                  onChange={(e) => handleChange("phoneTwo", e.target.value)}
                  placeholder="+1 (212) 380-3751"
                />
              </Field>
            </div>
          </Section>

          <Section
            title="Working Hours"
            desc="e.g., 'Mon-Fri 7AM-6PM' or 'Call Support Center 24/7'."
          >
            <Field label="Working Hours">
              <input
                className={inputClass}
                value={form.workingHours}
                onChange={(e) => handleChange("workingHours", e.target.value)}
                placeholder="Mon-Fri 7AM-6PM"
              />
            </Field>
          </Section>

          <Section title="Email" desc="">
            <Field label="Email Address">
              <input
                type="email"
                className={inputClass}
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="mrh_nyc@yahoo.com"
              />
            </Field>
          </Section>

          <Section title="Location" desc="Service area / office address.">
            <Field label="Address">
              <textarea
                className={inputClass}
                rows={2}
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="4017, ave D, Brooklyn New York, 11203"
              />
            </Field>
          </Section>

          <Section
            title="Licensed & Insured"
            desc="Shown in the footer trust badge."
          >
            <div className="space-y-5">
              <Field label="License Number">
                <input
                  className={inputClass}
                  value={form.licenseNumber}
                  onChange={(e) =>
                    handleChange("licenseNumber", e.target.value)
                  }
                  placeholder="2105436-DCA"
                />
              </Field>
              <Field label="Insurance Text">
                <input
                  className={inputClass}
                  value={form.insuranceText}
                  onChange={(e) =>
                    handleChange("insuranceText", e.target.value)
                  }
                  placeholder="Fully insured for your protection"
                />
              </Field>
            </div>
          </Section>

          <div className="flex justify-end">
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
      </div>
    </div>
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
      {desc && <p className="mt-1 text-sm text-slate-500">{desc}</p>}
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

function PreviewItem({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/10">
        <Icon className="h-4 w-4 text-amber-400" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-white/50">{label}</p>
        <div className="mt-0.5 text-sm">{children}</div>
      </div>
    </div>
  );
}
