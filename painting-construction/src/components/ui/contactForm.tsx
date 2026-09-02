"use client";

import React, { useState } from "react";
import { Card, CardContent } from "./card";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { useCreateContactMessageMutation } from "@/redux/api/contactMessageApi";

type FormState = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  projectDetails: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  email: "",
  projectType: "",
  projectDetails: "",
};

const ContactForm = () => {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [createContactMessage, { isLoading }] =
    useCreateContactMessageMutation();

  const update =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccess(false);

    if (!form.name || !form.phone || !form.email || !form.projectType) {
      setErrorMsg("Please fill in your name, phone, email and project type.");
      return;
    }

    try {
      await createContactMessage({
        name: form.name,
        phone: form.phone,
        email: form.email,
        projectType: form.projectType,
        projectDetails: form.projectDetails || undefined,
      }).unwrap();
      setSuccess(true);
      setForm(EMPTY_FORM);
    } catch {
      setErrorMsg("Something went wrong. Please try again or call us directly.");
    }
  };

  return (
    <div className="">
      <Card className="border-0 shadow-construction">
        <CardContent className="px-8 py-2">
          <form className="space-y-2" onSubmit={handleSubmit}>
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <Input
                  placeholder="John Smith"
                  className="border-input"
                  value={form.name}
                  onChange={update("name")}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number *
                </label>
                <Input
                  placeholder="(123) 456-7890"
                  className="border-input"
                  value={form.phone}
                  onChange={update("phone")}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                placeholder="john@example.com"
                className="border-input"
                value={form.email}
                onChange={update("email")}
                required
              />
            </div>

            {/* Project Details */}
            <div className="w-full">
              <label className="block text-sm font-medium text-foreground mb-2">
                Project Type *
              </label>
              <Select
                value={form.projectType}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, projectType: value }))
                }
              >
                <SelectTrigger className="w-full border-input">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interior-painting">
                    Interior Painting
                  </SelectItem>
                  <SelectItem value="exterior-painting">
                    Exterior Painting
                  </SelectItem>
                  <SelectItem value="renovation">
                    Renovation & Remodeling
                  </SelectItem>
                  <SelectItem value="drywall">Drywall & Plastering</SelectItem>
                  <SelectItem value="flooring">Flooring & Tiling</SelectItem>
                  <SelectItem value="custom">Custom Project</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Project Details
              </label>
              <Textarea
                placeholder="Tell us about your project - size, timeline, specific requirements, etc."
                className="min-h-32 border-input"
                value={form.projectDetails}
                onChange={update("projectDetails")}
              />
            </div>

            {/* Status messages */}
            {success && (
              <p className="rounded-md bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                Thanks! Your request has been sent — we&apos;ll get back to you
                shortly.
              </p>
            )}
            {errorMsg && (
              <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {errorMsg}
              </p>
            )}

            {/* Submit */}
            <div className="flex justify-end sm:flex-row gap-4">
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="group relative overflow-hidden rounded-md bg-amber-500 px-6 py-6 text-white text-base hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 disabled:opacity-70"
              >
                {/* the black wipe */}
                <span
                  className="pointer-events-none absolute inset-0 left-0 w-0 bg-[#0a2850] transition-[width] duration-400 ease-out group-hover:w-full"
                  aria-hidden="true"
                />
                {/* label stays above the wipe */}
                <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-300 group-hover:text-white">
                  {isLoading ? "Sending..." : "Get Free Quote"}
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
