import Link from "next/link";
import type { Metadata } from "next";
import { getTeamMembers } from "@/lib/data/team";
import { trip, teamFallback } from "@/content/trip";

/* eslint-disable @next/next/no-img-element */

export const metadata: Metadata = {
  title: "The Team",
  description: `Who's going to ${trip.location} and why — the Howick 2026 mission team from ${trip.church}.`,
};

export default async function AboutPage() {
  const rows = await getTeamMembers();
  const members = rows.length
    ? rows.map((m) => ({ name: m.name, bio: m.bio, photo: m.photo }))
    : teamFallback.map((name) => ({ name, bio: "", photo: null as string | null }));

  return (
    <div className="how-fade">
      {/* Intro split */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(48px,6vw,96px)", background: "var(--ink-deep)", color: "#fff" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--brand-tint)", marginBottom: 16 }}>About the trip</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-.01em", fontSize: "clamp(40px,5.5vw,76px)", margin: 0 }}>Who&rsquo;s going<br />&amp; why</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,.85)", margin: "24px 0 0", maxWidth: "46ch" }}>Eight people from {trip.church} are traveling to {trip.location} from {trip.dates}, partnering with the local church to build a playground, paint a mural, share the Gospel in Howick South and Shiyaz, host a retreat for young leaders, and run a sports camp for the kids. We&rsquo;re not going to fix anything. We&rsquo;re going to join in.</p>
        </div>
        <div style={{ position: "relative", minHeight: 340, background: "radial-gradient(circle at 50% 40%,#2a2422,#0c0b0a 80%)" }} />
      </section>

      {/* Team roster */}
      <section style={{ maxWidth: 1152, margin: "0 auto", padding: "clamp(56px,7vw,96px) 24px" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1, letterSpacing: "-.01em", fontSize: "clamp(30px,4.5vw,52px)", margin: "0 0 16px", color: "var(--ink)" }}>The team</h2>
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {members.map((m, i) => (
            <div key={i} data-reveal style={{ display: "flex", gap: "clamp(18px,3vw,32px)", alignItems: "center", padding: "24px 4px", borderBottom: "1px solid var(--line)" }}>
              <div style={{ width: "clamp(72px,10vw,96px)", aspectRatio: "1", flex: "none", borderRadius: "50%", overflow: "hidden", background: "var(--paper-soft)", border: "1px solid var(--line-strong)" }}>
                {m.photo ? (
                  <img src={m.photo} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--mute)" }}>Photo</div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(18px,2.4vw,22px)", fontWeight: 700, color: "var(--ink)", margin: 0, lineHeight: 1.2 }}>{m.name}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: m.bio ? "var(--gray-700)" : "var(--mute)", fontStyle: m.bio ? "normal" : "italic", margin: "8px 0 0", maxWidth: "62ch" }}>{m.bio || "Bio coming soon."}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sending church */}
      <section style={{ background: "var(--paper-soft)", padding: "clamp(56px,7vw,96px) 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--brand)", marginBottom: 14 }}>Our sending church</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.05, letterSpacing: "-.01em", fontSize: "clamp(28px,4vw,48px)", margin: 0, color: "var(--ink)" }}>Sent and supported by {trip.church}</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.7, color: "var(--gray-700)", margin: "22px auto 0", maxWidth: "54ch" }}>This team doesn&rsquo;t go alone. Behind the eight on the ground is a congregation praying, giving, and sending. If you&rsquo;d like to be part of that, the best place to start is here.</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginTop: 30 }}>
            <Link href="/give" className="btn-solid" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 30px", fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", border: "2px solid var(--brand)", background: "var(--brand)", color: "#fff", textDecoration: "none" }}>Support the team</Link>
            <Link href="/blog" className="btn-ghost-brand" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 30px", fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", border: "2px solid var(--brand)", background: "transparent", color: "var(--brand)", textDecoration: "none" }}>Read the blog</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
