import { createClient } from "@/lib/supabase/server";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("id, slug, title, category, year, cover_image, aspect_ratio")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return <HomeClient projects={projects ?? []} />;
}
