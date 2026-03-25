import { createClient } from "@/lib/supabase/server";
import WorkClient from "@/components/WorkClient";

export default async function WorkPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("id, slug, title, category, year, cover_image, aspect_ratio")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return <WorkClient projects={projects ?? []} />;
}
