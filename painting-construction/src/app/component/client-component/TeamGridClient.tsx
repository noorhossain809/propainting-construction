"use client";

import Image from "next/image";
import { useGetAllTeamMembersQuery } from "@/redux/api/teamApi";

// Normalized card shape shared by live (API) and static (fallback) data.
export type TeamCard = {
  key: string;
  name: string;
  role: string;
  image: string;
  alt: string;
};

// `fallback` is the static team list, kept as a graceful fallback whenever the
// live backend has no members yet or the request fails.
export default function TeamGridClient({ fallback }: { fallback: TeamCard[] }) {
  const { data: liveTeam, isLoading } = useGetAllTeamMembersQuery();

  const members: TeamCard[] =
    liveTeam && liveTeam.length > 0
      ? liveTeam.map((m) => ({
          key: m._id,
          name: m.name,
          role: m.designation,
          image: m.image?.url ?? "",
          alt: m.image?.alt || m.name,
        }))
      : fallback;

  if (isLoading) {
    return (
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="group">
            <div className="h-[320px] w-full animate-pulse bg-muted" />
            <div className="h-16 animate-pulse bg-yellow-500/40" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {members.map((member) => (
        <div key={member.key} className="group">
          <div className="relative w-full h-[320px] overflow-hidden">
            <Image
              src={member.image}
              alt={member.alt}
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-yellow-500 py-4">
            <h3 className="text-[#0a2850] font-bold text-lg">{member.name}</h3>
            <p className="text-white text-sm uppercase tracking-wide">
              {member.role}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
