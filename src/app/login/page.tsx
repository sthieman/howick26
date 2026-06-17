"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { BraveLogo } from "@/components/BraveLogo";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const configured = isSupabaseConfigured();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!configured || pending) return;
    setPending(true);
    setError(null);
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    if (error) {
      setError("Sign in failed. Check the shared team credentials.");
      setPending(false);
      return;
    }
    router.push(params.get("next") || "/admin");
    router.refresh();
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "radial-gradient(circle at 50% 30%,#211e1d,#0c0b0a 75%)" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", color: "var(--brand)", marginBottom: 8 }}>
          <BraveLogo height={30} />
        </div>
        <div style={{ textAlign: "center", fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 700, letterSpacing: ".28em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginBottom: 30 }}>Howick 2026 · Team Admin</div>
        <form onSubmit={onSubmit} style={{ background: "#fff", padding: "34px 30px", borderTop: "4px solid var(--brand)" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", fontSize: 30, letterSpacing: "-.01em", margin: "0 0 4px", color: "var(--ink)" }}>Sign in</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--gray-600)", margin: "0 0 24px" }}>Shared team login for the Howick 2026 blog.</p>

          {!configured && (
            <p style={{ background: "var(--paper-soft)", padding: 12, fontSize: 13, color: "var(--mute)", margin: "0 0 18px" }}>Supabase isn&rsquo;t connected yet. Add your keys to <code>.env.local</code> to enable login.</p>
          )}

          <label className="ad-lab">Email</label>
          <input className="ad-in" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="team@brave.org" disabled={!configured} style={{ marginBottom: 16 }} />
          <label className="ad-lab">Password</label>
          <input className="ad-in" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" disabled={!configured} style={{ marginBottom: 24 }} />
          {error && <p style={{ fontSize: 13, color: "var(--brand)", margin: "0 0 16px" }}>{error}</p>}
          <button type="submit" className="btn-solid" disabled={!configured || pending} style={{ width: "100%", padding: 14, fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", border: "2px solid var(--brand)", background: "var(--brand)", color: "#fff", cursor: configured ? "pointer" : "not-allowed", opacity: pending ? 0.8 : 1 }}>
            {pending ? "Signing in…" : "Sign in to the dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
