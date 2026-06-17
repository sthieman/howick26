import Link from "next/link";
import { trip } from "@/content/trip";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl font-bold uppercase tracking-tight">
            {trip.title}
          </p>
          <p className="mt-1 text-sm text-line-strong">
            {trip.church} · {trip.location} · {trip.dates}
          </p>
        </div>
        <nav className="flex gap-6 text-sm font-semibold uppercase tracking-wide">
          <Link href="/" className="hover:text-brand-tint">
            Home
          </Link>
          <Link href="/blog" className="hover:text-brand-tint">
            Blog
          </Link>
          <Link href="/donate" className="hover:text-brand-tint">
            Give
          </Link>
        </nav>
      </div>
    </footer>
  );
}
