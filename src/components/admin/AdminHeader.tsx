import type { ReactNode } from "react";

/** Sticky page header inside the admin shell: title on the left, actions right. */
export function AdminHeader({ title, actions }: { title: string; actions?: ReactNode }) {
  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid var(--line)",
        padding: "18px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, textTransform: "uppercase", letterSpacing: "-.01em", color: "var(--ink)" }}>{title}</div>
      <div style={{ display: "flex", gap: 10 }}>{actions}</div>
    </header>
  );
}
