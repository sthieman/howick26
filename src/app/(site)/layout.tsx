import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollProgress } from "@/components/ScrollProgress";
import { PageTransition } from "@/components/PageTransition";

/**
 * Marketing chrome for the public site: scroll-progress bar, sticky header,
 * cross-wipe page transitions, and the ink footer. /admin and /login live
 * outside this group and supply their own layouts.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <ScrollProgress />
      <PageTransition />
      <SiteHeader />
      <main style={{ flex: 1 }}>{children}</main>
      <SiteFooter />
    </div>
  );
}
