import type { Metadata } from "next";
import { trip, tiers, helpWays, prayerPoints } from "@/content/trip";

export const metadata: Metadata = {
  title: "Give",
  description: "Send the team and fund the work — your gift covers travel, the playground and mural, and the sports camp.",
};

export default function GivePage() {
  return (
    <div className="how-fade">
      {/* Hero */}
      <section style={{ background: "var(--brand)", color: "#fff", padding: "clamp(56px,8vw,104px) 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--brand-tint)", marginBottom: 16 }}>Partner with us</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-.01em", fontSize: "clamp(44px,7vw,92px)", margin: 0 }}>Send the team.<br />Fund the work.</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.65, color: "rgba(255,255,255,.9)", margin: "24px auto 0", maxWidth: "50ch" }}>Your gift covers travel, the playground and mural materials, and the sports camp. 100% goes to the trip.</p>
          <a href={trip.donateUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost-white" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 32, padding: "17px 42px", fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", border: "2px solid #fff", background: "#fff", color: "var(--brand)", textDecoration: "none" }}>Give online →</a>
        </div>
      </section>

      {/* Tiers */}
      <section style={{ maxWidth: 1152, margin: "0 auto", padding: "clamp(56px,7vw,96px) 24px" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1, letterSpacing: "-.01em", fontSize: "clamp(30px,4.5vw,52px)", margin: "0 0 12px", color: "var(--ink)", textAlign: "center" }}>What your gift does</h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "var(--gray-600)", textAlign: "center", margin: "0 auto 48px", maxWidth: "46ch" }}>Give any amount. Here&rsquo;s what a few levels make possible.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
          {tiers.map((tier) => (
            <div key={tier.amount} data-reveal className="focus-card" style={{ border: "1px solid var(--line)", padding: "36px 30px", textAlign: "center", background: "var(--paper)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 52, fontWeight: 700, color: "var(--brand)", lineHeight: 1 }}>{tier.amount}</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.6, color: "var(--gray-700)", margin: "18px 0 0" }}>{tier.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Other ways + prayer */}
      <section style={{ background: "var(--paper-soft)", padding: "clamp(56px,7vw,96px) 0" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 48 }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1, letterSpacing: "-.01em", fontSize: "clamp(28px,4vw,46px)", margin: "0 0 24px", color: "var(--ink)" }}>Other ways to help</h2>
            {helpWays.map((way) => (
              <div key={way.num} style={{ display: "flex", gap: 16, padding: "18px 0", borderBottom: "1px solid var(--line)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--brand-tint)", lineHeight: 1.1, minWidth: 36 }}>{way.num}</div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, color: "var(--ink)", margin: "0 0 6px" }}>{way.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--gray-600)", margin: 0 }}>{way.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "var(--ink-deep)", color: "#fff", padding: 40 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--brand-tint)", marginBottom: 18 }}>Pray with us</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, textTransform: "uppercase", lineHeight: 1.05, margin: "0 0 22px" }}>Six things to pray for</h3>
            {prayerPoints.map((point, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderTop: "1px solid rgba(255,255,255,.12)" }}>
                <span style={{ color: "var(--brand-tint)", fontSize: 18, lineHeight: 1.4 }}>✦</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.55, color: "rgba(255,255,255,.9)" }}>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
