import { createClient } from "@/lib/supabase/server";
import ProjectClient from "@/components/ProjectClient";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!project) notFound();

  const { data: images } = await supabase
    .from("project_images")
    .select("url")
    .eq("project_id", project.id)
    .order("sort_order", { ascending: true });

  // Prev / next
  const { data: allProjects } = await supabase
    .from("projects")
    .select("slug, title, sort_order")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  const idx = allProjects?.findIndex((p) => p.slug === slug) ?? -1;
  const prev = idx > 0 ? allProjects![idx - 1] : null;
  const next = allProjects && idx < allProjects.length - 1 ? allProjects[idx + 1] : null;

  return (
    <ProjectClient
      project={project}
      images={(images ?? []).map((i) => i.url)}
      prev={prev}
      next={next}
    />
  );
}
