import { AdminSidebar } from "@/components/admin/AdminSidebar";

/**
 * Admin shell — sidebar + main column. No marketing chrome (that lives in the
 * (site) route group). Access is gated by the proxy/middleware: only the shared
 * team session reaches /admin.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--paper-soft)" }}>
      <AdminSidebar />
      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>{children}</main>
    </div>
  );
}
