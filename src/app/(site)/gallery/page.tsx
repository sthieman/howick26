import type { Metadata } from "next";
import { getGalleryPhotos } from "@/lib/data/gallery";
import { GalleryView } from "@/components/GalleryView";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Moments from Howick: the playground, the mural, the sports camp, and the people we meet.",
};

export default async function GalleryPage() {
  const photos = await getGalleryPhotos();

  return (
    <div className="how-fade">
      <section style={{ background: "var(--paper-soft)", borderBottom: "1px solid var(--line)", padding: "clamp(48px,7vw,88px) 0" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--brand)", marginBottom: 14 }}>In pictures</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-.01em", fontSize: "clamp(44px,7vw,92px)", margin: 0, color: "var(--ink)" }}>Photo gallery</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.6, color: "var(--gray-600)", maxWidth: "52ch", margin: "20px 0 0" }}>Moments from Howick: the playground, the mural, the sports camp, and the people we meet. Tap any photo to view it larger.</p>
        </div>
      </section>

      <section style={{ maxWidth: 1152, margin: "0 auto", padding: "clamp(40px,5vw,64px) 24px" }}>
        {photos.length === 0 ? (
          <div style={{ border: "1px dashed var(--line-strong)", padding: "clamp(56px,9vw,110px) 24px", textAlign: "center", background: "var(--paper)", maxWidth: 640, margin: "0 auto" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,4vw,44px)", fontWeight: 700, textTransform: "uppercase", color: "var(--ink)", lineHeight: 1 }}>Photos coming soon</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.6, color: "var(--gray-600)", margin: "16px auto 0", maxWidth: "46ch" }}>The team will fill this gallery from Howick: the playground, the mural, the sports camp, and the faces of the people we meet.</p>
          </div>
        ) : (
          <GalleryView photos={photos} />
        )}
      </section>
    </div>
  );
}
