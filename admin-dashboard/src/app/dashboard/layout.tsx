// app/(dashboard)/layout.tsx

import React from 'react';
import { AppSidebar } from './components/common/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardContent } from './components/common/DashboardContent';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="relative min-h-screen w-full bg-slate-50">
        <AppSidebar />
        <DashboardContent>
          {children}
        </DashboardContent>
      </div>
     
    </SidebarProvider>
  );
}