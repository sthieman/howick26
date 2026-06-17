"use client";

import { useMemo, useState } from "react";
import type { GalleryItem } from "@/lib/data/gallery";

/* eslint-disable @next/next/no-img-element */

function chipStyle(active: boolean) {
  return {
    fontFamily: "var(--font-heading)",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: ".05em",
    textTransform: "uppercase" as const,
    padding: "9px 18px",
    cursor: "pointer",
    border: `1.5px solid ${active ? "var(--brand)" : "var(--line-strong)"}`,
    background: active ? "var(--brand)" : "transparent",
    color: active ? "#fff" : "var(--gray-700)",
    transition: "all .15s",
  };
}

export function GalleryView({ photos }: { photos: GalleryItem[] }) {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    photos.forEach((p) => p.category && set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [photos]);

  const filtered = filter === "All" ? photos : photos.filter((p) => p.category === filter);
  const open = lightbox != null && lightbox >= 0 && lightbox < filtered.length;
  const current = open ? filtered[lightbox] : null;

  const close = () => setLightbox(null);
  const move = (d: number) => {
    if (lightbox == null || filtered.length === 0) return;
    setLightbox((lightbox + d + filtered.length) % filtered.length);
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
        {categories.map((c) => (
          <button key={c} type="button" onClick={() => { setFilter(c); setLightbox(null); }} style={chipStyle(filter === c)}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
        {filtered.map((photo, i) => (
          <figure
            key={photo.id}
            onClick={() => setLightbox(i)}
            data-reveal
            className="fig-bright"
            style={{ margin: 0, position: "relative", aspectRatio: "1", cursor: "pointer", overflow: "hidden", display: "flex", alignItems: "flex-end", background: `center/cover no-repeat url("${photo.url}")` }}
          >
            <figcaption style={{ position: "relative", width: "100%", padding: 14, background: "linear-gradient(0deg,rgba(25,24,23,.78),transparent)", color: "#fff" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--brand-tint)", marginBottom: 4 }}>{photo.category}</div>
              {photo.caption && <div style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.35 }}>{photo.caption}</div>}
            </figcaption>
          </figure>
        ))}
      </div>

      {open && current && (
        <div onClick={close} className="how-fade" style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(15,14,13,.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <button onClick={close} aria-label="Close" style={{ position: "absolute", top: 24, right: 28, background: "none", border: "none", color: "#fff", fontSize: 34, cursor: "pointer", lineHeight: 1, fontFamily: "var(--font-body)" }}>×</button>
          <button onClick={(e) => { e.stopPropagation(); move(-1); }} aria-label="Previous" className="lb-nav" style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,.1)", border: "none", color: "#fff", fontSize: 28, width: 52, height: 52, cursor: "pointer", borderRadius: "50%" }}>‹</button>
          <button onClick={(e) => { e.stopPropagation(); move(1); }} aria-label="Next" className="lb-nav" style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,.1)", border: "none", color: "#fff", fontSize: 28, width: 52, height: 52, cursor: "pointer", borderRadius: "50%" }}>›</button>
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 900, width: "100%" }}>
            <img src={current.url} alt={current.caption ?? "Howick 2026 photo"} style={{ width: "100%", maxHeight: "76vh", objectFit: "contain", background: "var(--ink)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginTop: 18, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--brand-tint)", marginBottom: 6 }}>{current.category}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "#fff" }}>{current.caption}</div>
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(255,255,255,.6)" }}>{lightbox! + 1} / {filtered.length}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
