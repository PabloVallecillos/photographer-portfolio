"use client";

import { useState } from "react";

export default function PublishToggle({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const [value, setValue] = useState(published);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    const res = await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !value }),
    });
    if (res.ok) setValue((v) => !v);
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`text-xs tracking-widest uppercase transition-colors disabled:opacity-50 ${
        value ? "text-emerald-400 hover:text-emerald-300" : "text-white/30 hover:text-white/60"
      }`}
    >
      {value ? "Live" : "Draft"}
    </button>
  );
}
