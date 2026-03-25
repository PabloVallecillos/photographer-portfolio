import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import PublishToggle from "@/components/dashboard/PublishToggle";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, slug, category, year, published, sort_order, created_at")
    .order("sort_order", { ascending: true });

  return (
    <div className="px-10 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-light tracking-[0.2em] text-white uppercase">
          Projects
        </h1>
        <Link
          href="/dashboard/projects/new"
          className="px-4 py-2 bg-white text-black text-xs tracking-[0.2em] uppercase
                     hover:bg-white/90 transition-colors"
        >
          + New
        </Link>
      </div>

      {!projects?.length ? (
        <div className="text-center py-20 border border-white/10">
          <p className="text-xs tracking-widest text-white/30 uppercase">No projects yet</p>
          <Link
            href="/dashboard/projects/new"
            className="mt-4 inline-block text-xs tracking-widest text-white/50 uppercase
                       hover:text-white underline transition-colors"
          >
            Create your first project
          </Link>
        </div>
      ) : (
        <div className="border border-white/10 divide-y divide-white/10">
          {/* Header */}
          <div className="grid grid-cols-[1fr_120px_80px_80px_80px] px-4 py-3">
            <p className="text-xs tracking-widest text-white/30 uppercase">Title</p>
            <p className="text-xs tracking-widest text-white/30 uppercase">Category</p>
            <p className="text-xs tracking-widest text-white/30 uppercase">Year</p>
            <p className="text-xs tracking-widest text-white/30 uppercase">Status</p>
            <p className="text-xs tracking-widest text-white/30 uppercase"></p>
          </div>

          {projects.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-[1fr_120px_80px_80px_80px] items-center px-4 py-3
                         hover:bg-white/5 transition-colors"
            >
              <div>
                <p className="text-sm text-white">{p.title}</p>
                <p className="text-xs text-white/30 font-mono mt-0.5">{p.slug}</p>
              </div>
              <p className="text-xs text-white/50 uppercase tracking-widest">{p.category}</p>
              <p className="text-xs text-white/50">{p.year}</p>
              <PublishToggle id={p.id} published={p.published} />
              <Link
                href={`/dashboard/projects/${p.id}/edit`}
                className="text-xs tracking-widest text-white/40 uppercase hover:text-white transition-colors"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
