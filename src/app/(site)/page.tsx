import Link from "next/link";
import type { CSSProperties } from "react";
import { trip, focusAreas, teamFallback } from "@/content/trip";
import { getTeamMembers } from "@/lib/data/team";
import { getPublishedPosts } from "@/lib/data/posts";
import { getSiteSettings } from "@/lib/data/settings";
import { formatDate, readingMinutes, excerptOf, cardBackground } from "@/lib/format";
import { JourneyController } from "@/components/JourneyController";
import { CrossDivider } from "@/components/CrossDivider";

/* eslint-disable @next/next/no-img-element */

const BRAVE_LETTERS: { vb: string; d: string }[] = [
  { vb: "0 0 146 91", d: "M51.02 54.22H108.47V67.25H51.02V54.22ZM51.02 23.59H108.47V36.62H51.02V23.59ZM0 0L14.03 14.66V90.84H133.41L145.45 78.26V58.15L145.49 58.13L133.3 45.4L145.46 32.69V12.71L133.29 0.02L133.31 0H0Z" },
  { vb: "0 0 147 91", d: "M51.03 23.59H108.48V45.42H51.03V23.59ZM0 0L14.03 14.66V90.84H51.03V48.97L101.87 90.84H146.07L118.21 67.87L145.47 45.41V12.7L133.31 0.02L133.33 0H0Z" },
  { vb: "0 0 145 91", d: "M49.89 58.14L63.53 23.59H80.56L94.2 58.17L49.89 58.15V58.14ZM19.69 0L31.13 11.95L0 90.84H36.99L49.23 59.82L86.9 90.84H144.08L108.24 0H19.69Z" },
  { vb: "0 0 145 91", d: "M90.71 0L102.3 12.11L80.55 67.25H63.52L36.99 0H0L35.83 90.84H108.23L144.07 0H90.71Z" },
  { vb: "0 0 146 91", d: "M0 0L14.03 14.66V90.84H145.46V54.22H108.47V67.25H51.02V54.22H97.33V36.62H51.02V23.59H108.47V36.62H145.46V0H0Z" },
];
const BRAVE_PHRASES = ["Bold in faith", "Resolute in identity", "Authentic in relationships", "Virtuous in character", "Engaged in mission"];

const eyebrow: CSSProperties = { fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--brand)", marginBottom: 12 };
const h2Display: CSSProperties = { fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1, letterSpacing: "-.01em", fontSize: "clamp(34px,5vw,60px)", margin: 0, color: "var(--ink)" };
const btnSolid: CSSProperties = { display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 32px", fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", border: "2px solid var(--brand)", background: "var(--brand)", color: "#fff", cursor: "pointer", textDecoration: "none" };
const btnGhostWhite: CSSProperties = { display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 32px", fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", border: "2px solid #fff", background: "transparent", color: "#fff", textDecoration: "none" };

export default async function HomePage() {
  const [teamRows, posts, settings] = await Promise.all([
    getTeamMembers(),
    getPublishedPosts(),
    getSiteSettings(),
  ]);
  const teamPhoto = settings?.team_photo ?? null;
  const team = teamRows.length
    ? teamRows.map((m) => ({ name: m.name, photo: m.photo }))
    : teamFallback.map((name) => ({ name, photo: null as string | null }));
  const latest = posts.slice(0, 3);

  return (
    <div>
      <JourneyController />

      {/* ===== HERO: Editorial cinematic (title -> team photo reveal) ===== */}
      <section data-journey="intro" style={{ position: "relative", height: "340vh", background: "var(--ink-deep)" }}>
        <div data-stage style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "radial-gradient(circle at 50% 32%,#211e1d,#0c0b0a 72%)" }}>
          {/* Title scene */}
          <div data-scene="title" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24, opacity: 1, pointerEvents: "auto", willChange: "opacity,transform" }}>
            <div style={{ position: "absolute", left: "50%", bottom: "5%", transform: "translateX(-50%)", width: "160%", height: "64%", background: "radial-gradient(ellipse at 50% 100%,rgba(170,31,35,.30),transparent 62%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 2, maxWidth: 920 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--brand-tint)", marginBottom: 20 }}>Brave Church · {trip.dates}</div>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1, letterSpacing: "-.01em", fontSize: "clamp(48px,8.5vw,116px)", color: "#fff", margin: 0 }}>Howick 2026</h1>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(13px,1.7vw,17px)", fontWeight: 700, letterSpacing: ".32em", textTransform: "uppercase", color: "var(--brand-tint)", marginTop: 14 }}>Sent to Serve</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px,2vw,20px)", lineHeight: 1.6, color: "rgba(255,255,255,.78)", margin: "22px auto 0", maxWidth: "50ch" }}>A mission team from Brave Church, sent to {trip.location}. Follow the story, and walk with us.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginTop: 32 }}>
                <Link href="/blog" className="btn-solid" style={btnSolid}>Read the Blog</Link>
                <a href={trip.donateUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost-white" style={btnGhostWhite}>Support the team</a>
              </div>
              {/* Brave letters + cycling phrases */}
              <div style={{ marginTop: 38 }}>
                <div style={{ display: "flex", gap: "clamp(8px,1.8vw,18px)", justifyContent: "center", alignItems: "center" }}>
                  {BRAVE_LETTERS.map((l, i) => (
                    <span key={i} className="bl" style={{ animationDelay: `${i * 2}s` }}>
                      <svg viewBox={l.vb} style={{ height: "clamp(26px,5vw,50px)", width: "auto", display: "block" }}><path d={l.d} fill="currentColor" /></svg>
                    </span>
                  ))}
                </div>
                <div style={{ position: "relative", height: "1.7em", marginTop: 12 }}>
                  {BRAVE_PHRASES.map((phrase, i) => (
                    <div key={i} className="bp" style={{ animationDelay: `${i * 2}s` }}>{phrase}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Team photo reveal scene */}
          <div data-scene="teamphoto" style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0, pointerEvents: "none", willChange: "opacity,transform" }}>
            {teamPhoto ? (
              <img id="jTeamImg" src={teamPhoto} alt="The Howick 2026 team" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", willChange: "transform" }} />
            ) : (
              <div id="jTeamImg" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "radial-gradient(circle at 50% 40%,#2a2422,#0c0b0a 78%)" }} />
            )}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(15,14,13,.12) 0%,transparent 30%,transparent 50%,rgba(15,14,13,.85) 100%)", pointerEvents: "none" }} />
            <div id="jTeamCap" style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 24px 64px", opacity: 0, pointerEvents: "none" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--brand-tint)", marginBottom: 16 }}>The Ones Being Sent</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-.01em", fontSize: "clamp(44px,8vw,108px)", color: "#fff", margin: 0 }}>Meet the team</h2>
            </div>
          </div>

          <div data-scrollhint style={{ position: "absolute", left: 0, right: 0, bottom: 26, textAlign: "center", fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.7)", pointerEvents: "none" }}>Scroll ↓</div>
        </div>
      </section>

      <CrossDivider />

      {/* ===== Meet the team (circles) ===== */}
      <section style={{ maxWidth: 1152, margin: "0 auto", padding: "clamp(64px,8vw,112px) 24px", textAlign: "center" }}>
        <div style={{ ...eyebrow, marginBottom: 12 }}>The eight</div>
        <h2 style={{ ...h2Display, margin: "0 0 40px" }}>Meet the team</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "30px 20px", maxWidth: 740, margin: "0 auto" }}>
          {team.map((m, i) => (
            <div key={i}>
              <div style={{ width: "clamp(78px,13vw,116px)", aspectRatio: "1", margin: "0 auto", borderRadius: "50%", overflow: "hidden", background: "var(--paper-soft)", border: "1px solid var(--line)" }}>
                {m.photo ? (
                  <img src={m.photo} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--mute)" }}>Photo</div>
                )}
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 700, color: "var(--ink)", marginTop: 14, lineHeight: 1.2 }}>{m.name}</div>
            </div>
          ))}
        </div>
      </section>

      <CrossDivider />

      {/* ===== Isaiah 6 (pinned) ===== */}
      <section data-journey="isaiah" style={{ position: "relative", height: "320vh", background: "var(--ink-deep)" }}>
        <div data-stage style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "radial-gradient(circle at 50% 32%,#211e1d,#0c0b0a 72%)" }}>
          <div data-scene="isaiah" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24, opacity: 0, pointerEvents: "none", willChange: "opacity" }}>
            <div style={{ position: "relative", maxWidth: 920, width: "100%" }}>
              <div id="jIsa5" style={{ willChange: "opacity,transform" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--brand-tint)", marginBottom: 30 }}>Isaiah 6</div>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 500, textTransform: "uppercase", lineHeight: 1.1, letterSpacing: "-.005em", fontSize: "clamp(24px,3.8vw,50px)", color: "rgba(255,255,255,.92)", margin: 0 }}>&ldquo;Woe is me! For I am undone, for my eyes have seen the King, the Lord of hosts.&rdquo;</p>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--mute)", marginTop: 24 }}>Isaiah 6:5</div>
              </div>
              <div id="jIsa8" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 0, willChange: "opacity,transform" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px,1.9vw,21px)", color: "rgba(255,255,255,.7)", margin: "0 0 18px", maxWidth: "42ch" }}>And I heard the voice of the Lord saying, &ldquo;Whom shall I send, and who will go for us?&rdquo; Then I said,</p>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.92, letterSpacing: "-.01em", fontSize: "clamp(40px,7.5vw,104px)", color: "#fff", margin: 0 }}>Here am I.<br /><span style={{ color: "var(--brand)" }}>Send me!</span></p>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--mute)", marginTop: 24 }}>Isaiah 6:8</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CrossDivider />

      {/* ===== The work in Howick (focus areas) ===== */}
      <section style={{ maxWidth: 1152, margin: "0 auto", padding: "clamp(64px,8vw,112px) 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 48 }}>
          <div>
            <div style={{ ...eyebrow }}>What we&rsquo;re doing</div>
            <h2 style={h2Display}>The work in Howick</h2>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.6, color: "var(--gray-600)", maxWidth: "40ch", margin: 0 }}>Five ways we&rsquo;ll serve alongside the local church in Howick: building, creating, sharing the Gospel, and pouring into the next generation.</p>
        </div>
        <div className="focus-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: 16 }}>
          {focusAreas.map((area) => (
            <div key={area.num} data-reveal className="focus-card" style={{ border: "1px solid var(--line)", padding: "28px 20px", background: "var(--paper)", minHeight: 340, display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 38, fontWeight: 700, color: "var(--brand-tint)", lineHeight: 1 }}>{area.num}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, color: "var(--ink)", margin: "20px 0 12px", lineHeight: 1.2 }}>{area.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.6, color: "var(--gray-600)", margin: 0 }}>{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CrossDivider />

      {/* ===== Great Commission, Matthew 28 (pinned) ===== */}
      <section data-journey="commission" style={{ position: "relative", height: "300vh", background: "var(--ink-deep)" }}>
        <div data-stage style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "radial-gradient(circle at 50% 32%,#211e1d,#0c0b0a 72%)" }}>
          <div data-scene="matthew" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24, opacity: 0, pointerEvents: "none", willChange: "opacity" }}>
            <div style={{ position: "relative", maxWidth: 940, width: "100%" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--brand-tint)", marginBottom: 30 }}>The Great Commission</div>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 500, textTransform: "uppercase", lineHeight: 1.08, letterSpacing: "-.005em", fontSize: "clamp(22px,3.6vw,48px)", color: "rgba(255,255,255,.92)", margin: 0 }}>&ldquo;All authority in heaven and on earth has been given to me. Go therefore and make disciples of all nations.&rdquo;</p>
              <div id="jMattPromise" style={{ opacity: 0, willChange: "opacity,transform", marginTop: 26 }}>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.96, letterSpacing: "-.01em", fontSize: "clamp(30px,5.2vw,72px)", color: "#fff", margin: 0 }}>&ldquo;And behold, <span style={{ color: "var(--brand)" }}>I am with you always</span>, to the end of the age.&rdquo;</p>
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--mute)", marginTop: 26 }}>Matthew 28:18–20</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Luke 10, how we are sent ===== */}
      <section style={{ position: "relative", background: "var(--ink-deep)", color: "#fff", overflow: "hidden", padding: "clamp(64px,9vw,128px) 0" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 30%,rgba(170,31,35,.14),transparent 60%)" }} />
        <div style={{ position: "relative", maxWidth: 880, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div data-reveal style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--brand-tint)", marginBottom: 28 }}>Luke 10:1–9 · How we go</div>
          <p data-reveal style={{ fontFamily: "var(--font-display)", fontWeight: 500, textTransform: "uppercase", lineHeight: 1.1, letterSpacing: "-.005em", fontSize: "clamp(24px,4vw,52px)", color: "#fff", margin: 0 }}>&ldquo;He sent them two by two ahead of him, into every town where he himself was about to go.&rdquo;</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 32, marginTop: 48, textAlign: "left" }}>
            <div data-reveal style={{ borderTop: "2px solid var(--brand)", paddingTop: 20 }}>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(20px,2.6vw,30px)", lineHeight: 1.05, color: "#fff", margin: 0 }}>&ldquo;Carry no purse, no bag.&rdquo;</p>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--brand-tint)", marginTop: 12 }}>Sent in complete reliance on the Lord</div>
            </div>
            <div data-reveal style={{ borderTop: "2px solid var(--brand)", paddingTop: 20 }}>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(20px,2.6vw,30px)", lineHeight: 1.05, color: "#fff", margin: 0 }}>&ldquo;Peace to this house.&rdquo;</p>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--brand-tint)", marginTop: 12 }}>Sent to love everyone we meet</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Denver to Howick globe (pinned) ===== */}
      <section data-journey="globe" style={{ position: "relative", height: "280vh", background: "var(--ink-deep)" }}>
        <div data-stage style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "radial-gradient(circle at 50% 32%,#211e1d,#0c0b0a 72%)" }}>
          <div data-scene="globe" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24, opacity: 0, willChange: "opacity" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--brand-tint)", marginBottom: 6 }}>Denver to Howick</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, justifyContent: "center" }}>
              <span id="jMiles" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(54px,11vw,148px)", color: "#fff", lineHeight: 1 }}>0</span>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(14px,2vw,20px)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.6)" }}>Miles</span>
            </div>
            <svg viewBox="0 0 400 400" width="min(72vw,420px)" height="min(72vw,420px)" style={{ overflow: "visible", marginTop: 4 }}>
              <g id="jGlobeRot" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
                <circle cx="200" cy="200" r="150" style={{ fill: "none", stroke: "rgba(255,255,255,.22)", strokeWidth: 1.5 }} />
                <ellipse cx="200" cy="200" rx="60" ry="150" style={{ fill: "none", stroke: "rgba(255,255,255,.12)", strokeWidth: 1 }} />
                <ellipse cx="200" cy="200" rx="112" ry="150" style={{ fill: "none", stroke: "rgba(255,255,255,.1)", strokeWidth: 1 }} />
                <line x1="50" y1="200" x2="350" y2="200" style={{ stroke: "rgba(255,255,255,.14)", strokeWidth: 1 }} />
                <line x1="74" y1="135" x2="326" y2="135" style={{ stroke: "rgba(255,255,255,.1)", strokeWidth: 1 }} />
                <line x1="74" y1="265" x2="326" y2="265" style={{ stroke: "rgba(255,255,255,.1)", strokeWidth: 1 }} />
                <line x1="200" y1="50" x2="200" y2="350" style={{ stroke: "rgba(255,255,255,.14)", strokeWidth: 1 }} />
              </g>
              <path id="jArc" data-len="340" d="M118 150 Q210 50 290 250" style={{ fill: "none", stroke: "var(--brand-tint)", strokeWidth: 2.5, strokeDasharray: 340, strokeDashoffset: 340 }} />
              <circle cx="118" cy="150" r="5" style={{ fill: "#fff" }} />
              <circle cx="290" cy="250" r="6.5" style={{ fill: "var(--brand)", stroke: "#fff", strokeWidth: 1.5 }} />
              <circle id="jArcDot" cx="118" cy="150" r="4.5" style={{ fill: "#fff", offsetPath: "path('M118 150 Q210 50 290 250')", opacity: 0 }} />
            </svg>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px,1.8vw,19px)", color: "rgba(255,255,255,.7)", margin: "8px 0 0" }}>From the Rockies to the Midlands of KwaZulu-Natal.</p>
          </div>
        </div>
      </section>

      {/* ===== Mission has no borders (emblem) ===== */}
      <section style={{ position: "relative", background: "var(--ink-deep)", color: "#fff", overflow: "hidden", padding: "clamp(72px,10vw,140px) 0" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 42%,rgba(170,31,35,.18),transparent 62%)" }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(36px,6vw,72px)", alignItems: "center" }}>
          <div data-reveal>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--brand-tint)", marginBottom: 18 }}>Why we go</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.88, letterSpacing: "-.01em", fontSize: "clamp(40px,6vw,84px)", margin: 0 }}>The mission<br />has no<br />borders</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,.82)", maxWidth: "46ch", margin: "24px 0 0" }}>From Denver to a hillside in KwaZulu-Natal the distance is nine thousand miles. The Gospel crosses it without slowing down. Eight people, ten days, one church family stretched across an ocean, and one Cross at the center of it all.</p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: 30, fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(255,255,255,.6)" }}>
              <span>9,800 Miles</span><span style={{ color: "var(--brand)" }}>✦</span><span>One Mission</span>
            </div>
          </div>
          <div data-reveal style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 340 }}>
            <svg viewBox="0 0 400 400" width="100%" height="100%" className="emblem" style={{ maxWidth: 360, overflow: "visible" }}>
              <g style={{ animation: "emGeo 10s ease-in-out infinite" }}>
                <circle cx="200" cy="200" r="150" style={{ fill: "none", stroke: "rgba(255,255,255,.30)", strokeWidth: 1.5 }} />
                <ellipse cx="200" cy="200" rx="60" ry="150" style={{ fill: "none", stroke: "rgba(255,255,255,.16)", strokeWidth: 1 }} />
                <ellipse cx="200" cy="200" rx="112" ry="150" style={{ fill: "none", stroke: "rgba(255,255,255,.12)", strokeWidth: 1 }} />
                <line x1="50" y1="200" x2="350" y2="200" style={{ stroke: "rgba(255,255,255,.20)", strokeWidth: 1 }} />
                <line x1="74" y1="135" x2="326" y2="135" style={{ stroke: "rgba(255,255,255,.13)", strokeWidth: 1 }} />
                <line x1="74" y1="265" x2="326" y2="265" style={{ stroke: "rgba(255,255,255,.13)", strokeWidth: 1 }} />
                <line x1="200" y1="50" x2="200" y2="350" style={{ stroke: "rgba(255,255,255,.20)", strokeWidth: 1 }} />
                <path d="M120 150 Q200 60 286 246" style={{ fill: "none", stroke: "var(--brand-tint)", strokeWidth: 2.5, strokeDasharray: "6 7", animation: "emFlow 1.1s linear infinite" }} />
                <circle cx="120" cy="150" r="5" style={{ fill: "#fff" }} />
                <circle cx="286" cy="246" r="6.5" style={{ fill: "var(--brand)", stroke: "#fff", strokeWidth: 1.5 }} />
                <circle cx="120" cy="150" r="4.5" style={{ fill: "#fff", offsetPath: "path('M120 150 Q200 60 286 246')", animation: "emTravel 10s ease-in-out infinite" }} />
              </g>
              <g style={{ animation: "emCross 10s ease-in-out infinite" }}>
                <g style={{ animation: "emGlow 10s ease-in-out infinite" }}>
                  <line x1="200" y1="74" x2="200" y2="332" style={{ stroke: "var(--brand)", strokeWidth: 18, filter: "blur(13px)" }} />
                  <line x1="134" y1="152" x2="266" y2="152" style={{ stroke: "var(--brand)", strokeWidth: 18, filter: "blur(13px)" }} />
                </g>
                <line x1="200" y1="74" x2="200" y2="332" style={{ ["--len" as string]: "258", stroke: "#fff", strokeWidth: 9, strokeLinecap: "round", strokeDasharray: 258, animation: "emDraw 10s ease infinite" }} />
                <line x1="134" y1="152" x2="266" y2="152" style={{ ["--len" as string]: "132", stroke: "#fff", strokeWidth: 9, strokeLinecap: "round", strokeDasharray: 132, animation: "emDraw 10s ease infinite" }} />
              </g>
            </svg>
          </div>
        </div>
      </section>

      <CrossDivider />

      {/* ===== Latest updates ===== */}
      <section style={{ background: "var(--paper-soft)", padding: "clamp(64px,8vw,112px) 0" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 48 }}>
            <div>
              <div style={{ ...eyebrow }}>From the field</div>
              <h2 style={h2Display}>Latest updates</h2>
            </div>
            <Link href="/blog" style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--brand)", textDecoration: "none" }}>Visit the blog →</Link>
          </div>
          {latest.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
              {latest.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} data-reveal className="lift" style={{ background: "var(--paper)", border: "1px solid var(--line)", display: "flex", flexDirection: "column", textDecoration: "none" }}>
                  <div style={{ aspectRatio: "16/10", background: cardBackground(post), position: "relative" }}>
                    <span style={{ position: "absolute", top: 14, left: 14, fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#fff", background: "rgba(25,24,23,.4)", padding: "5px 10px", backdropFilter: "blur(4px)" }}>{post.category}</span>
                  </div>
                  <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--mute)" }}>{formatDate(post.published_at)} · {readingMinutes(post.body)} min read</div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 21, fontWeight: 700, color: "var(--ink)", margin: "12px 0 10px", lineHeight: 1.25 }}>{post.title}</h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--gray-600)", margin: "0 0 18px" }}>{excerptOf(post)}</p>
                    <div style={{ marginTop: "auto", fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--brand)" }}>Read more →</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ border: "1px dashed var(--line-strong)", padding: "clamp(40px,6vw,72px) 24px", textAlign: "center", background: "var(--paper)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,3vw,36px)", fontWeight: 700, textTransform: "uppercase", color: "var(--ink)", lineHeight: 1 }}>The journal opens in July</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.6, color: "var(--gray-600)", margin: "14px auto 0", maxWidth: "46ch" }}>Every update here will be written by the team from the ground in Howick. Pray with us until then.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== Give CTA band ===== */}
      <section style={{ position: "relative", background: "var(--ink-deep)", color: "#fff", padding: "clamp(64px,9vw,128px) 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -60, top: -60, width: 340, height: 340, border: "40px solid var(--brand)", opacity: 0.12, borderRadius: "50%" }} />
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1, letterSpacing: "-.01em", fontSize: "clamp(36px,5.5vw,68px)", margin: 0 }}>Send the team</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.65, color: "rgba(255,255,255,.82)", margin: "22px auto 0", maxWidth: "48ch" }}>Your giving covers travel, materials for the playground and mural, and everything the team carries into Howick.</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginTop: 34 }}>
            <a href={trip.donateUrl} target="_blank" rel="noopener noreferrer" className="btn-solid" style={{ ...btnSolid, padding: "16px 36px", fontSize: 15 }}>Give now</a>
            <Link href="/give" className="btn-ghost-white" style={{ ...btnGhostWhite, padding: "16px 36px", fontSize: 15 }}>Other ways to help</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
