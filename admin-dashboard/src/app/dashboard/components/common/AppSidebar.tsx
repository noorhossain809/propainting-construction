"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  GalleryHorizontal,
  Users,
  Phone,
  Mail,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Image from "next/image";
import { useGetAllContactMessagesQuery } from "@/redux/api/contactMessageApi";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Projects", url: "/our-projects", icon: FolderKanban },
  { title: "Services", url: "/our-services", icon: Wrench },
  { title: "Hero Banner", url: "/hero-slides", icon: GalleryHorizontal },
  { title: "Our Team", url: "/our-team", icon: Users },
  { title: "Messages", url: "/messages", icon: Mail },
  { title: "Contact Info", url: "/contact-info", icon: Phone },
];

const SidebarNavigation = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { open } = useSidebar();
  const pathname = usePathname();
  const shouldShowText = isMobile || open;

  // Unread ("new") message count for the Messages badge. Poll so new
  // submissions from the public site appear without a manual refresh.
  const { data: messages } = useGetAllContactMessagesQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const unreadCount = messages?.filter((m) => m.status === "new").length ?? 0;

  return (
    <div className="flex flex-col h-full bg-yellow-600">
      <div className="py-1 border-b flex items-center shrink-0">
        <div className={`flex items-center justify-center ${shouldShowText ? "mx-auto" : "mx-auto"}`}>
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image
              src="/assets/propainting_construction_web_logo.png"
              width={shouldShowText ? 80 : 40}
              height={60}
              alt="web-logo"
              className="transition-all duration-300"
            />
          </Link>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.url;
          return (
            <Link
              key={item.title}
              href={item.url}
              className={`flex items-center p-3 rounded-lg text-white hover:bg-yellow-500/60 transition-colors duration-200 ${
                isActive && "bg-yellow-500/60 text-blue-600 font-semibold"
              } ${!shouldShowText && "justify-center"}`}
            >
              <div className="relative flex-shrink-0">
                <item.icon className="h-5 w-5" />
                {item.url === "/messages" && unreadCount > 0 && !shouldShowText && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </div>
              {/* conditional unmount এর বদলে width+opacity animate করা হচ্ছে */}
              <span
                className={`ml-3 flex flex-1 items-center justify-between truncate overflow-hidden whitespace-nowrap transition-all duration-300 ${
                  shouldShowText ? "max-w-[160px] opacity-100" : "max-w-0 opacity-0 ml-0"
                }`}
              >
                {item.title}
                {item.url === "/messages" && unreadCount > 0 && (
                  <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[11px] font-bold text-white">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};


export function AppSidebar() {
  const { open, openMobile, setOpenMobile } = useSidebar();

  return (
    <>
      {/* ডেস্কটপের জন্য সাইডবার (md এবং বড় স্ক্রিনে দেখা যাবে) */}
      <aside
  className={`hidden md:flex flex-col flex-shrink-0 border-r fixed inset-y-0 left-0 z-20 transition-[width] duration-300 ease-in-out ${
    open ? "w-64" : "w-20"
  }`}
>
  <SidebarNavigation />
</aside>

      {/* মোবাইলের জন্য ড্রয়ার (md এর চেয়ে ছোট স্ক্রিনে কাজ করবে) */}
      <div className="md:hidden">
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent 
            side="left" 
            className="p-0 w-72 bg-white duration-300" // ✅ শুধু এই ক্লাসটি যোগ করা হয়েছে
          >
            <SidebarNavigation isMobile={true} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}