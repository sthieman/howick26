import Link from "next/link";
import { Button } from "@/components/Button";
import { Gallery } from "@/components/Gallery";
import { getGalleryPhotos } from "@/lib/data/gallery";
import { getPublishedPosts } from "@/lib/data/posts";
import { trip, team, partners, about } from "@/content/trip";

export default async function Home() {
  const [photos, posts] = await Promise.all([
    getGalleryPhotos(),
    getPublishedPosts(),
  ]);
  const latest = posts.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <p className="font-display text-sm font-medium uppercase tracking-[0.3em] text-brand-tint">
            {trip.church} · Mission Trip
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-none tracking-tight sm:text-7xl">
            {trip.title}
          </h1>
          <p className="mt-3 font-heading text-xl text-line-strong">
            {trip.location} · {trip.dates}
          </p>
          <p className="mt-6 max-w-2xl text-lg text-line">{trip.tagline}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/blog">Read the Blog</Button>
            <Button href="/donate" variant="outline" className="border-paper text-paper hover:bg-paper hover:text-ink">
              Support the Team
            </Button>
          </div>
        </div>
      </section>

      {/* About */}
      <Section eyebrow="The Journey" title={about.heading}>
        <div className="max-w-3xl space-y-4 text-lg text-gray-700">
          {about.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section eyebrow="Who's Going" title="Meet the Team" muted>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {team.map((member, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto flex aspect-square w-full items-center justify-center overflow-hidden rounded-full bg-line text-3xl font-bold text-mute">
                {member.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
                ) : (
                  member.name.charAt(0)
                )}
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{member.name}</h3>
              {member.role && (
                <p className="text-sm uppercase tracking-wide text-brand">{member.role}</p>
              )}
              {member.bio && <p className="mt-2 text-sm text-gray-600">{member.bio}</p>}
            </div>
          ))}
        </div>
      </Section>

      {/* Partners */}
      <Section eyebrow="Who We Serve With" title="Brave Church & The Issachar Alliance">
        <div className="grid gap-6 md:grid-cols-2">
          {partners.map((partner, i) => (
            <div key={i} className="rounded-lg border border-line p-6">
              <h3 className="font-heading text-xl font-semibold text-ink">{partner.name}</h3>
              <p className="mt-2 text-gray-700">{partner.description}</p>
              {partner.url && (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block font-heading text-sm font-semibold uppercase tracking-wide text-brand hover:text-brand-shade"
                >
                  Learn more →
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Gallery */}
      <Section eyebrow="From the Field" title="Photo Gallery" muted>
        <Gallery photos={photos} />
      </Section>

      {/* Latest posts */}
      {latest.length > 0 && (
        <Section eyebrow="Latest" title="From the Blog">
          <div className="grid gap-6 md:grid-cols-3">
            {latest.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block rounded-lg border border-line p-6 transition-colors hover:border-brand"
              >
                <h3 className="font-heading text-lg font-semibold text-ink">{post.title}</h3>
                {post.excerpt && <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>}
                <span className="mt-3 inline-block text-sm font-semibold uppercase tracking-wide text-brand">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

/** Lightweight section wrapper — consistent rhythm for the landing page. */
function Section({
  eyebrow,
  title,
  muted,
  children,
}: {
  eyebrow: string;
  title: string;
  muted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={muted ? "bg-paper-soft" : "bg-paper"}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="font-display text-sm font-medium uppercase tracking-[0.25em] text-brand">
          {eyebrow}
        </p>
        <h2 className="mt-2 mb-10 font-heading text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}
