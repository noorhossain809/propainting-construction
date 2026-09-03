"use client";

import { useEffect } from "react";

// Segment-level error boundary (renders inside the root layout). Handles the
// same stale-chunk case as global-error for errors thrown below the layout.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const message = `${error?.name ?? ""} ${error?.message ?? ""}`;
    const isChunkError =
      /ChunkLoadError|Loading chunk|Loading CSS chunk|dynamically imported module|import\(\) failed/i.test(
        message
      );
    if (isChunkError && typeof window !== "undefined") {
      const KEY = "__chunk_reload_once__";
      if (!sessionStorage.getItem(KEY)) {
        sessionStorage.setItem(KEY, "1");
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-lg font-bold text-slate-900">Something went wrong</h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        This page failed to load. A reload usually fixes it (common right after
        a new deploy).
      </p>
      <div className="mt-5 flex gap-3">
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
        >
          Reload
        </button>
        <button
          onClick={() => reset()}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
