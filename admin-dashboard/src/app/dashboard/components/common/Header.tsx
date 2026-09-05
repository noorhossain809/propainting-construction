// components/common/Header.tsx

"use client"

import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Menu, Bell, ExternalLink } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { useGetAllContactMessagesQuery } from '@/redux/api/contactMessageApi';

// Public site URL (override with NEXT_PUBLIC_SITE_URL if needed).
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://propaintconstruction.com';

export const Header = () => {
  const { toggleSidebar } = useSidebar();

  // Poll so the bell badge updates when new messages arrive from the site.
  const { data: messages } = useGetAllContactMessagesQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const unreadCount = messages?.filter((m) => m.status === 'new').length ?? 0;

  return (
    <header className="flex h-16 items-center border-b bg-white px-4 md:px-6 sticky top-0 z-10">
      {/* Desktop trigger */}
      <div className="hidden md:flex">
        <SidebarTrigger />
      </div>

      {/* Mobile drawer trigger (hamburger icon) */}
      <div className="md:hidden">
        <Button onClick={toggleSidebar} variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open Menu</span>
        </Button>
      </div>
      
      <div className="ml-4">
        {/* Other header content goes here */}
        <h4>Construction</h4>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Visit the live public website (opens in a new tab) */}
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-amber-300 hover:bg-slate-50 hover:text-amber-600"
        >
          <ExternalLink className="h-4 w-4" />
          <span className="hidden sm:inline">Visit Site</span>
        </a>

        {/* Notification bell → Messages inbox */}
        <Link
          href="/messages"
          aria-label={`Messages${unreadCount > 0 ? ` (${unreadCount} new)` : ''}`}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};