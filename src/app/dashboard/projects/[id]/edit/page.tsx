import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EditProjectForm from "@/components/dashboard/EditProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) notFound();

  const { data: images } = await supabase
    .from("project_images")
    .select("*")
    .eq("project_id", id)
    .order("sort_order", { ascending: true });

  return (
    <div className="px-10 py-10 max-w-2xl">
      <EditProjectForm project={project} initialImages={images ?? []} />
    </div>
  );
}
