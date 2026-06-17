import type { GalleryItem } from "@/lib/data/gallery";

/* eslint-disable @next/next/no-img-element */
// Plain <img> on purpose: gallery URLs come from Supabase Storage at runtime and
// don't need the next/image loader config. /design-sync can upgrade this later.

export function Gallery({ photos }: { photos: GalleryItem[] }) {
  if (photos.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-lg bg-paper-soft text-xs uppercase tracking-wide text-mute"
          >
            Photo
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {photos.map((photo) => (
        <figure key={photo.id} className="group relative overflow-hidden rounded-lg">
          <img
            src={photo.url}
            alt={photo.caption ?? "Howick 2026 photo"}
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {photo.caption && (
            <figcaption className="absolute inset-x-0 bottom-0 bg-ink/70 p-2 text-xs text-paper opacity-0 transition-opacity group-hover:opacity-100">
              {photo.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
