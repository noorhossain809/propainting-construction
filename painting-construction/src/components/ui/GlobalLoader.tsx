"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { Loader } from "@/components/ui/Loader";

/**
 * Full-page blank loading overlay. While ANY RTK Query request is in flight,
 * it covers the whole viewport with the branded spinner, so the page never
 * shows partial/static content mid-load. Once all queries settle it unmounts
 * and reveals the page. (RTK Query caches, so this only appears on the first
 * load of each dataset, not on every navigation.)
 */
export default function GlobalLoader() {
  const isFetching = useSelector((state: RootState) =>
    Object.values(state.api.queries).some((q) => q?.status === "pending")
  );

  if (!isFetching) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <Loader size="lg" label="Loading" />
    </div>
  );
}
