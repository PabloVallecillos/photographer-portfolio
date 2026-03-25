"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const nav = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/projects", label: "Projects" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-white/10 flex flex-col">
        <div className="px-6 py-8 border-b border-white/10">
          <p className="text-xs tracking-[0.3em] text-white/40 uppercase">Portfolio</p>
          <p className="mt-1 text-sm tracking-widest text-white uppercase">Admin</p>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {nav.map(({ href, label }) => {
            const active =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`block px-3 py-2 text-xs tracking-[0.15em] uppercase transition-colors ${
                  active
                    ? "text-white bg-white/10"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-6 py-6 border-t border-white/10">
          <Link
            href="/"
            target="_blank"
            className="block text-xs tracking-widest text-white/30 uppercase hover:text-white/60 transition-colors mb-3"
          >
            View Site ↗
          </Link>
          <button
            onClick={handleSignOut}
            className="text-xs tracking-widest text-white/30 uppercase hover:text-white/60 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
