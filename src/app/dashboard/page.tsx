import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [{ count: totalProjects }, { count: publishedProjects }] =
    await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .eq("published", true),
    ]);

  const { data: recentProjects } = await supabase
    .from("projects")
    .select("id, title, slug, category, published, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="px-10 py-10">
      <h1 className="text-xl font-light tracking-[0.2em] text-white uppercase mb-8">
        Overview
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-10 max-w-sm">
        <div className="border border-white/10 p-5">
          <p className="text-xs tracking-widest text-white/40 uppercase mb-1">Total</p>
          <p className="text-3xl font-light text-white">{totalProjects ?? 0}</p>
        </div>
        <div className="border border-white/10 p-5">
          <p className="text-xs tracking-widest text-white/40 uppercase mb-1">Published</p>
          <p className="text-3xl font-light text-white">{publishedProjects ?? 0}</p>
        </div>
      </div>

      {/* Recent */}
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs tracking-[0.2em] text-white/40 uppercase">Recent Projects</h2>
          <Link
            href="/dashboard/projects"
            className="text-xs tracking-widest text-white/40 uppercase hover:text-white transition-colors"
          >
            All →
          </Link>
        </div>

        {!recentProjects?.length ? (
          <p className="text-xs text-white/30 tracking-wide py-8 text-center border border-white/10">
            No projects yet.{" "}
            <Link href="/dashboard/projects/new" className="underline hover:text-white/60">
              Create one
            </Link>
          </p>
        ) : (
          <div className="divide-y divide-white/10 border border-white/10">
            {recentProjects.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm text-white tracking-wide">{p.title}</p>
                  <p className="text-xs text-white/40 tracking-widest uppercase mt-0.5">
                    {p.category}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-xs tracking-widest uppercase ${
                      p.published ? "text-emerald-400" : "text-white/30"
                    }`}
                  >
                    {p.published ? "Live" : "Draft"}
                  </span>
                  <Link
                    href={`/dashboard/projects/${p.id}/edit`}
                    className="text-xs tracking-widest text-white/40 uppercase hover:text-white transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
