"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CATEGORIES = ["Architecture", "Abstract", "Portraiture", "Landscape", "Still Life", "Street"];
const ASPECT_RATIOS = ["landscape", "portrait", "square"] as const;

interface ProjectImage {
  id: string;
  url: string;
  storage_path: string;
  sort_order: number;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  cover_image: string | null;
  aspect_ratio: string;
  published: boolean;
  sort_order: number;
}

export default function EditProjectForm({
  project,
  initialImages,
}: {
  project: Project;
  initialImages: ProjectImage[];
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: project.title,
    slug: project.slug,
    category: project.category,
    year: project.year,
    description: project.description,
    aspect_ratio: project.aspect_ratio as typeof ASPECT_RATIOS[number],
    sort_order: project.sort_order,
    published: project.published,
  });

  const [images, setImages] = useState<ProjectImage[]>(initialImages);
  const [coverImage, setCoverImage] = useState<string | null>(project.cover_image);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    const res = await fetch(`/api/projects/${project.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, cover_image: coverImage }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Save failed");
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }
    setSaving(false);
  }

  async function handleUploadImages(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    setUploading(true);

    const formData = new FormData();
    Array.from(e.target.files).forEach((f) => formData.append("files", f));

    const res = await fetch(`/api/projects/${project.id}/images`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setImages((prev) => [...prev, ...data.images]);
    } else {
      setError(data.error ?? "Upload failed");
    }
    setUploading(false);
    e.target.value = "";
  }

  async function handleUploadCover(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    formData.append("cover", "true");

    const res = await fetch(`/api/projects/${project.id}/images`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok && data.images?.[0]) {
      setCoverImage(data.images[0].url);
    } else {
      setError(data.error ?? "Upload failed");
    }
    setUploading(false);
    e.target.value = "";
  }

  async function handleDeleteImage(img: ProjectImage) {
    const res = await fetch(
      `/api/projects/${project.id}/images?imageId=${img.id}&storagePath=${encodeURIComponent(img.storage_path)}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      setImages((prev) => prev.filter((i) => i.id !== img.id));
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
    router.push("/dashboard/projects");
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-light tracking-[0.2em] text-white uppercase">
          Edit Project
        </h1>
        <button
          onClick={handleDelete}
          className="text-xs tracking-widest text-red-400/60 uppercase hover:text-red-400 transition-colors"
        >
          Delete
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-5 mb-10">
        <Field label="Title">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            required
            className={inputCls}
          />
        </Field>

        <Field label="Slug">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            required
            className={inputCls + " font-mono text-white/70"}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Category">
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className={inputCls}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Year">
            <input
              type="text"
              value={form.year}
              onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
              required
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Aspect Ratio">
          <div className="flex gap-3">
            {ASPECT_RATIOS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setForm((f) => ({ ...f, aspect_ratio: r }))}
                className={`px-4 py-2 text-xs tracking-widest uppercase border transition-colors ${
                  form.aspect_ratio === r
                    ? "border-white text-white"
                    : "border-white/20 text-white/40 hover:border-white/40"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Description">
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={4}
            className={inputCls + " resize-none"}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Sort Order">
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) =>
                setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))
              }
              className={inputCls}
            />
          </Field>

          <Field label="Status">
            <div className="flex gap-3 mt-1">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, published: val }))}
                  className={`px-4 py-2 text-xs tracking-widest uppercase border transition-colors ${
                    form.published === val
                      ? val
                        ? "border-emerald-400 text-emerald-400"
                        : "border-white text-white"
                      : "border-white/20 text-white/40 hover:border-white/40"
                  }`}
                >
                  {val ? "Published" : "Draft"}
                </button>
              ))}
            </div>
          </Field>
        </div>

        {error && <p className="text-red-400 text-xs tracking-wide">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-white text-black text-xs tracking-[0.2em] uppercase
                       hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : success ? "Saved ✓" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard/projects")}
            className="px-6 py-2.5 border border-white/20 text-white/50 text-xs tracking-[0.2em]
                       uppercase hover:text-white hover:border-white/40 transition-colors"
          >
            Back
          </button>
        </div>
      </form>

      {/* Cover Image */}
      <section className="mb-10">
        <h2 className="text-xs tracking-[0.2em] text-white/40 uppercase mb-4">Cover Image</h2>
        <div className="flex items-start gap-4">
          {coverImage && (
            <div className="relative w-32 h-20 border border-white/10 overflow-hidden">
              <Image
                src={coverImage}
                alt="cover"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            onChange={handleUploadCover}
            className="hidden"
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => coverInputRef.current?.click()}
            className="px-4 py-2 border border-white/20 text-white/50 text-xs tracking-widest
                       uppercase hover:text-white hover:border-white/40 transition-colors
                       disabled:opacity-50"
          >
            {uploading ? "Uploading…" : coverImage ? "Replace" : "Upload Cover"}
          </button>
        </div>
      </section>

      {/* Gallery Images */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs tracking-[0.2em] text-white/40 uppercase">
            Gallery ({images.length})
          </h2>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUploadImages}
            className="hidden"
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 border border-white/20 text-white/50 text-xs tracking-widest
                       uppercase hover:text-white hover:border-white/40 transition-colors
                       disabled:opacity-50"
          >
            {uploading ? "Uploading…" : "+ Add Images"}
          </button>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {images.map((img) => (
              <div key={img.id} className="relative group aspect-square border border-white/10 overflow-hidden">
                <Image
                  src={img.url}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  onClick={() => handleDeleteImage(img)}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100
                             transition-opacity flex items-center justify-center
                             text-xs tracking-widest text-red-400 uppercase"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-3 py-2.5 text-sm " +
  "tracking-wide focus:outline-none focus:border-white/40 transition-colors";
