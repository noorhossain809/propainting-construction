// app/(dashboard)/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FolderKanban,
  Wrench,
  Images,
  Users,
  Phone,
  ArrowUpRight,
  CheckCircle2,
  ImagePlus,
  ImageOff,
  AlertCircle,
} from "lucide-react";

import { useGetAllProjectsQuery } from "@/redux/api/constructionProjectApi";
import { useGetAllServicesQuery } from "@/redux/api/constructionServiceApi";
import { useGetAllHeroSlidesQuery } from "@/redux/api/heroSlideApi";
import { useGetAllTeamMembersQuery } from "@/redux/api/teamApi";
import { useGetContactInfoQuery } from "@/redux/api/contactInfoApi";

export default function DashboardHome() {
  const { data: projects, isLoading: projectsLoading, isError: projectsError } = useGetAllProjectsQuery();
  const { data: services, isLoading: servicesLoading } = useGetAllServicesQuery();
  const { data: heroSlides, isLoading: slidesLoading } = useGetAllHeroSlidesQuery();
  const { data: teamMembers, isLoading: teamLoading } = useGetAllTeamMembersQuery();
  const { data: contactInfo, isLoading: contactLoading } = useGetContactInfoQuery();

  const isContactComplete =
    !!contactInfo?.phoneOne &&
    !!contactInfo?.workingHours &&
    !!contactInfo?.email &&
    !!contactInfo?.location &&
    !!contactInfo?.licenseNumber;

  const stats = [
    {
      label: "Total Projects",
      value: projects?.length ?? 0,
      loading: projectsLoading,
      icon: FolderKanban,
      href: "/our-projects",
    },
    {
      label: "Active Services",
      value: services?.length ?? 0,
      loading: servicesLoading,
      icon: Wrench,
      href: "/our-services",
    },
    {
      label: "Hero Slides",
      value: heroSlides?.length ?? 0,
      loading: slidesLoading,
      icon: Images,
      href: "/hero-slides",
    },
    {
      label: "Team Members",
      value: teamMembers?.length ?? 0,
      loading: teamLoading,
      icon: Users,
      href: "/our-team",
    },
  ];

  const quickModules = [
    {
      label: "Projects",
      desc: "Manage portfolio items",
      icon: FolderKanban,
      count: projectsLoading ? "…" : `${projects?.length ?? 0} items`,
      href: "/our-projects",
    },
    {
      label: "Services",
      desc: "Manage service list",
      icon: Wrench,
      count: servicesLoading ? "…" : `${services?.length ?? 0} items`,
      href: "/our-services",
    },
    {
      label: "Hero Banner",
      desc: "Homepage slider slides",
      icon: Images,
      count: slidesLoading ? "…" : `${heroSlides?.length ?? 0} slides`,
      href: "/hero-slides",
    },
    {
      label: "Our Team",
      desc: "Team member profiles",
      icon: Users,
      count: teamLoading ? "…" : `${teamMembers?.length ?? 0} members`,
      href: "/our-team",
    },
    {
      label: "Contact Info",
      desc: "Phone, email, address, license",
      icon: Phone,
      count: contactLoading ? "…" : isContactComplete ? "Complete" : "Incomplete",
      href: "/contact-info",
      warn: !contactLoading && !isContactComplete,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
            Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Welcome back, Admin
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s what&apos;s happening with Pro Painting Construction today.
          </p>
        </div>
        <Link href="/our-projects/add-project">
          <button className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600">
            <ImagePlus className="h-4 w-4" />
            Add New Project
          </button>
        </Link>
      </div>

      {/* Contact info incomplete warning */}
      {!contactLoading && !isContactComplete && (
        <Link
          href="/contact-info"
          className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 transition hover:bg-amber-100"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-800">
              Contact information is incomplete
            </p>
            <p className="text-xs text-amber-700">
              Complete phone, email, address and license details so they show correctly on the website.
            </p>
          </div>
          <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-amber-600" />
        </Link>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <span className="absolute inset-y-0 left-0 w-1 bg-amber-500" />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold text-slate-900">
                    {stat.loading ? "…" : stat.value}
                  </p>
                </div>
                <div className="rounded-lg bg-amber-50 p-2.5">
                  <Icon className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <p className="mt-3 flex items-center gap-1 text-xs font-medium text-slate-400 transition group-hover:text-amber-600">
                Manage
                <ArrowUpRight className="h-3 w-3" />
              </p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent projects */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Recent Projects</h2>
            <Link
              href="/our-projects"
              className="flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700"
            >
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="p-5">
            {projectsLoading && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/3] rounded-lg bg-slate-100" />
                    <div className="mt-2 h-3 w-3/4 rounded bg-slate-100" />
                    <div className="mt-1.5 h-3 w-1/2 rounded bg-slate-100" />
                  </div>
                ))}
              </div>
            )}

            {projectsError && (
              <p className="py-6 text-center text-sm text-slate-500">
                Failed to load projects. Please try again.
              </p>
            )}

            {!projectsLoading && !projectsError && (!projects || projects.length === 0) && (
              <div className="flex flex-col items-center py-10 text-center">
                <ImageOff className="h-8 w-8 text-slate-300" />
                <p className="mt-3 text-sm text-slate-500">No projects added yet.</p>
                <Link
                  href="/our-projects/add-project"
                  className="mt-3 text-sm font-medium text-amber-600 hover:text-amber-700"
                >
                  Add your first project
                </Link>
              </div>
            )}

            {!projectsLoading && !projectsError && projects && projects.length > 0 && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {projects.slice(0, 4).map((p) => (
                  <Link href={`/our-projects/${p._id}`} key={p._id} className="group cursor-pointer">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
                      {p.mainImage?.url ? (
                        <Image
                          src={p.mainImage.url}
                          alt={p.mainImage.alt || p.title}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ImageOff className="h-6 w-6 text-slate-300" />
                        </div>
                      )}
                    </div>
                    <p className="mt-2 line-clamp-1 text-sm font-medium text-slate-900">
                      {p.title}
                    </p>
                    <p className="flex items-center gap-1 text-xs capitalize text-slate-500">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      {p.category}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick modules */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Manage Content</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {quickModules.map((m) => {
              const Icon = m.icon;
              return (
                <Link
                  key={m.label}
                  href={m.href}
                  className="flex w-full items-center justify-between px-5 py-3.5 text-left transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-slate-100 p-2">
                      <Icon className="h-4 w-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {m.label}
                      </p>
                      <p className="text-xs text-slate-500">{m.desc}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      m.warn ? "text-amber-600" : "text-slate-400"
                    }`}
                  >
                    {m.count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent team members */}
      {!teamLoading && teamMembers && teamMembers.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Team</h2>
            <Link
              href="/our-team"
              className="flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700"
            >
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {teamMembers.slice(0, 6).map((member) => (
              <Link
                key={member._id}
                href={`/our-team/edit-member/${member._id}`}
                className="flex w-24 flex-col items-center text-center"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-full bg-slate-100">
                  {member.image?.url ? (
                    <Image
                      src={member.image.url}
                      alt={member.image.alt || member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Users className="h-5 w-5 text-slate-300" />
                    </div>
                  )}
                </div>
                <p className="mt-1.5 line-clamp-1 text-xs font-medium text-slate-900">
                  {member.name}
                </p>
                <p className="line-clamp-1 text-[11px] text-slate-500">
                  {member.designation}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}