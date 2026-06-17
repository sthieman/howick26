/**
 * Decorative cross divider with a draw-on stroke (scroll-timeline) — used
 * between sections on the home page, exactly as in the prototype.
 */
export function CrossDivider() {
  return (
    <div
      style={{
        maxWidth: 1152,
        margin: "0 auto",
        padding: "6px 24px",
        display: "flex",
        alignItems: "center",
        gap: 22,
      }}
    >
      <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
      <svg viewBox="0 0 40 56" width="24" height="34" style={{ overflow: "visible", flex: "none" }}>
        <line
          x1="20" y1="3" x2="20" y2="53"
          className="xcross-line"
          style={{ ["--len" as string]: "50", stroke: "var(--brand)", strokeWidth: 3, strokeLinecap: "round", strokeDasharray: 50 }}
        />
        <line
          x1="7" y1="20" x2="33" y2="20"
          className="xcross-line-h"
          style={{ ["--len" as string]: "26", stroke: "var(--brand)", strokeWidth: 3, strokeLinecap: "round", strokeDasharray: 26 }}
        />
      </svg>
      <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
    </div>
  );
}
