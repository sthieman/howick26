import Link from "next/link";
import { trip } from "@/content/trip";
import { Button } from "./Button";

const nav = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/donate", label: "Give" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold uppercase tracking-tight text-brand">
            {trip.title}
          </span>
          <span className="hidden text-xs font-semibold uppercase tracking-widest text-mute sm:inline">
            {trip.church}
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 sm:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-heading text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href="/donate" className="px-4 py-2">
            Support the Team
          </Button>
        </nav>
      </div>
    </header>
  );
}
