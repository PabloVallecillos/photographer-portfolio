import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

// GET /api/projects — list all projects (admin, all statuses)
export async function GET() {
  const supabase = await createServiceClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*, project_images(*)")
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST /api/projects — create project
export async function POST(request: NextRequest) {
  const supabase = await createServiceClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from("projects")
    .insert({
      title: body.title,
      slug: body.slug,
      category: body.category,
      year: body.year,
      description: body.description ?? "",
      aspect_ratio: body.aspect_ratio ?? "landscape",
      sort_order: body.sort_order ?? 0,
      published: false,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}
