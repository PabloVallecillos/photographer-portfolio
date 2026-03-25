import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

// POST /api/projects/[id]/images — upload images
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServiceClient();

  const formData = await request.formData();
  const files = formData.getAll("files") as File[];
  const isCover = formData.get("cover") === "true";

  if (!files.length) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const uploaded: { id: string; url: string; storage_path: string; sort_order: number }[] = [];

  for (const file of files) {
    const ext = file.name.split(".").pop();
    const storagePath = `projects/${id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(storagePath, file, { contentType: file.type });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(storagePath);

    const publicUrl = urlData.publicUrl;

    // If it's a cover image, just update the project and return
    if (isCover) {
      await supabase
        .from("projects")
        .update({ cover_image: publicUrl })
        .eq("id", id);

      uploaded.push({ id: "", url: publicUrl, storage_path: storagePath, sort_order: 0 });
      continue;
    }

    // Get current max sort_order
    const { data: lastImg } = await supabase
      .from("project_images")
      .select("sort_order")
      .eq("project_id", id)
      .order("sort_order", { ascending: false })
      .limit(1)
      .single();

    const sortOrder = (lastImg?.sort_order ?? -1) + 1;

    const { data: imgRecord, error: insertError } = await supabase
      .from("project_images")
      .insert({
        project_id: id,
        url: publicUrl,
        storage_path: storagePath,
        sort_order: sortOrder,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    uploaded.push(imgRecord);
  }

  return NextResponse.json({ images: uploaded }, { status: 201 });
}

// DELETE /api/projects/[id]/images?imageId=...&storagePath=...
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await params;
  const supabase = await createServiceClient();

  const { searchParams } = new URL(request.url);
  const imageId = searchParams.get("imageId");
  const storagePath = searchParams.get("storagePath");

  if (!imageId || !storagePath) {
    return NextResponse.json({ error: "Missing imageId or storagePath" }, { status: 400 });
  }

  await supabase.storage.from("portfolio-images").remove([storagePath]);
  const { error } = await supabase.from("project_images").delete().eq("id", imageId);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
