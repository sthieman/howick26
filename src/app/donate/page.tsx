import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { trip } from "@/content/trip";

export const metadata: Metadata = { title: "Give" };

export default function DonatePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="font-display text-sm font-medium uppercase tracking-[0.25em] text-brand">
        Partner With Us
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold text-ink sm:text-5xl">
        Support the Team
      </h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-gray-700">
        <p>
          Every member of the {trip.title} team is raising support to make this trip
          to {trip.location} possible. Your generosity covers travel, lodging, and the
          on-the-ground work alongside our ministry partners.
        </p>
        <p>
          Gifts are processed securely through {trip.church}&rsquo;s giving platform.
          Click below to give toward the team.
        </p>
      </div>

      <div className="mt-10">
        <Button href={trip.donateUrl} target="_blank" rel="noopener noreferrer">
          Give to the Team
        </Button>
        <p className="mt-4 text-sm text-mute">
          You&rsquo;ll be taken to {trip.church}&rsquo;s secure donation page in a new tab.
        </p>
      </div>

      <div className="mt-16 rounded-lg bg-paper-soft p-8">
        <h2 className="font-heading text-xl font-semibold text-ink">Other ways to help</h2>
        <ul className="mt-4 space-y-2 text-gray-700">
          <li>· Pray for the team and the people of {trip.location}.</li>
          <li>· Follow along on the <Link href="/blog" className="font-semibold text-brand hover:text-brand-shade">blog</Link> and leave an encouragement.</li>
          <li>· Share this page with others who might want to partner with us.</li>
        </ul>
      </div>
    </div>
  );
}
