"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Button } from "@/components/Button";

export default function LoginPage() {
  const router = useRouter();
  const configured = isSupabaseConfigured();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) return;
    setPending(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Sign in failed. Check the shared team credentials.");
      setPending(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-20 sm:px-6">
      <h1 className="font-heading text-3xl font-bold text-ink">Team Login</h1>
      <p className="mt-2 text-gray-600">
        Sign in with the shared team account to post updates and manage the gallery.
      </p>

      {!configured && (
        <p className="mt-6 rounded-md bg-paper-soft p-4 text-sm text-mute">
          Supabase isn&rsquo;t connected yet. Add your keys to{" "}
          <code className="text-ink">.env.local</code> to enable login.
        </p>
      )}

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <input
          type="email"
          placeholder="Team email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          disabled={!configured}
          className="w-full rounded-md border border-line-strong px-4 py-3 outline-none focus:border-brand"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          disabled={!configured}
          className="w-full rounded-md border border-line-strong px-4 py-3 outline-none focus:border-brand"
        />
        {error && <p className="text-sm text-brand">{error}</p>}
        <Button type="submit" disabled={!configured || pending} className="w-full">
          {pending ? "Signing in…" : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
