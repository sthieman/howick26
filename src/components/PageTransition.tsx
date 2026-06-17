"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * The brand cross-wipe between pages — ported from the prototype's page
 * transition. Plays a one-shot clip-path wipe with a drawing-on cross each time
 * the route changes. Honors prefers-reduced-motion via the .page-wipe rule.
 */
export function PageTransition() {
  const pathname = usePathname();
  const [playing, setPlaying] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    // Skip the wipe on initial load — only animate real navigations.
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    setPlaying(true);
    const t = setTimeout(() => setPlaying(false), 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!playing) return null;

  return (
    <div
      aria-hidden
      className="page-wipe"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "var(--ink-deep)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <svg viewBox="0 0 200 200" width="160" height="160" style={{ overflow: "visible" }}>
        <circle
          cx="100"
          cy="100"
          r="76"
          style={{
            ["--len" as string]: "478",
            fill: "none",
            stroke: "rgba(255,255,255,.28)",
            strokeWidth: 1.5,
            strokeDasharray: 478,
            animation: "toRing .58s ease both",
          }}
        />
        <g style={{ animation: "toGlow .58s ease both" }}>
          <line x1="100" y1="38" x2="100" y2="168" style={{ stroke: "var(--brand)", strokeWidth: 15, filter: "blur(8px)" }} />
          <line x1="66" y1="84" x2="134" y2="84" style={{ stroke: "var(--brand)", strokeWidth: 15, filter: "blur(8px)" }} />
        </g>
        <line
          x1="100" y1="38" x2="100" y2="168"
          style={{ ["--len" as string]: "130", stroke: "#fff", strokeWidth: 7, strokeLinecap: "round", strokeDasharray: 130, animation: "toDraw .58s ease both" }}
        />
        <line
          x1="66" y1="84" x2="134" y2="84"
          style={{ ["--len" as string]: "68", stroke: "#fff", strokeWidth: 7, strokeLinecap: "round", strokeDasharray: 68, animation: "toDraw .58s ease both" }}
        />
      </svg>
    </div>
  );
}
