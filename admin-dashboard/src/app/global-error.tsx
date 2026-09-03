"use client";

import { useEffect } from "react";

/**
 * Root error boundary. Its main job: after a redeploy, a browser holding a
 * stale HTML page requests old JS chunks that no longer exist, throwing a
 * ChunkLoadError ("Application error: a client-side exception"). We detect
 * that and reload once to pull the fresh build, so deploys are self-healing.
 */
export default function GlobalError({
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
      // Guard against a reload loop if the error isn't actually stale-cache.
      if (!sessionStorage.getItem(KEY)) {
        sessionStorage.setItem(KEY, "1");
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#f8fafc",
          color: "#0f172a",
        }}
      >
        <div style={{ maxWidth: 420, padding: 24, textAlign: "center" }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 20 }}>
            The page failed to load. This usually clears up with a reload
            (common right after a new deploy).
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: "#f59e0b",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 18px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Reload
            </button>
            <button
              onClick={() => reset()}
              style={{
                background: "#fff",
                color: "#334155",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                padding: "10px 18px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
