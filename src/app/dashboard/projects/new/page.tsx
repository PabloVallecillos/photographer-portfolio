"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Architecture", "Abstract", "Portraiture", "Landscape", "Still Life", "Street"];
const ASPECT_RATIOS = ["landscape", "portrait", "square"] as const;

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Architecture",
    year: new Date().getFullYear().toString(),
    description: "",
    aspect_ratio: "landscape" as typeof ASPECT_RATIOS[number],
    sort_order: 0,
  });

  function slugify(str: string) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    setForm((f) => ({ ...f, title, slug: slugify(title) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Something went wrong");
      setLoading(false);
      return;
    }

    router.push(`/dashboard/projects/${data.id}/edit`);
  }

  return (
    <div className="px-10 py-10 max-w-xl">
      <h1 className="text-xl font-light tracking-[0.2em] text-white uppercase mb-8">
        New Project
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Title">
          <input
            type="text"
            value={form.title}
            onChange={handleTitleChange}
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

        <Field label="Sort Order">
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
            className={inputCls}
          />
        </Field>

        {error && (
          <p className="text-red-400 text-xs tracking-wide">{error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-white text-black text-xs tracking-[0.2em] uppercase
                       hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating…" : "Create Project"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 border border-white/20 text-white/50 text-xs tracking-[0.2em]
                       uppercase hover:text-white hover:border-white/40 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
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
