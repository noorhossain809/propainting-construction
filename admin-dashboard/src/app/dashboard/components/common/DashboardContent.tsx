// components/common/DashboardContent.tsx

"use client"

import React from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import { Header } from './Header';

export function DashboardContent({ children }: { children: React.ReactNode }) {
  const { open } = useSidebar();

  return (
    // এই main এলিমেন্টটি সাইডবারের অবস্থা অনুযায়ী margin পরিবর্তন করবে
    <main
      className={`flex flex-1 flex-col transition-[margin-left] duration-300 ease-in-out ${
        open ? "md:ml-64" : "md:ml-20"
      }`}
    >
      <Header />
      <div className="flex-1 p-6">{children}</div>
    </main>
  );
}