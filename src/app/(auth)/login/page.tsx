"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm px-6">
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-light tracking-[0.2em] text-white uppercase">
          Admin
        </h1>
        <p className="mt-2 text-xs tracking-widest text-white/40 uppercase">
          Photographer Portfolio
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30
                       px-4 py-3 text-sm tracking-wide focus:outline-none focus:border-white/40
                       transition-colors"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30
                       px-4 py-3 text-sm tracking-wide focus:outline-none focus:border-white/40
                       transition-colors"
          />
        </div>

        {error && (
          <p className="text-red-400 text-xs tracking-wide">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-white text-black text-xs font-medium tracking-[0.2em]
                     uppercase hover:bg-white/90 transition-colors disabled:opacity-50
                     disabled:cursor-not-allowed"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
