"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDate, readingMinutes, excerptOf, cardBackground } from "@/lib/format";

function chipStyle(active: boolean) {
  return {
    fontFamily: "var(--font-heading)",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: ".05em",
    textTransform: "uppercase" as const,
    padding: "9px 18px",
    cursor: "pointer",
    border: `1.5px solid ${active ? "var(--brand)" : "var(--line-strong)"}`,
    background: active ? "var(--brand)" : "transparent",
    color: active ? "#fff" : "var(--gray-700)",
    transition: "all .15s",
  };
}

export function BlogList({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.category && set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filtered = filter === "All" ? posts : posts.filter((p) => p.category === filter);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 40 }}>
        {categories.map((c) => (
          <button key={c} type="button" onClick={() => setFilter(c)} style={chipStyle(filter === c)}>
            {c}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 28 }}>
        {filtered.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            data-reveal
            className="lift"
            style={{ background: "var(--paper)", border: "1px solid var(--line)", display: "flex", flexDirection: "column", textDecoration: "none" }}
          >
            <div style={{ aspectRatio: "16/10", background: cardBackground(post), position: "relative" }}>
              <span style={{ position: "absolute", top: 14, left: 14, fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#fff", background: "rgba(25,24,23,.4)", padding: "5px 10px", backdropFilter: "blur(4px)" }}>{post.category}</span>
            </div>
            <div style={{ padding: 26, display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--mute)" }}>{formatDate(post.published_at)} · {readingMinutes(post.body)} min</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, color: "var(--ink)", margin: "12px 0 10px", lineHeight: 1.25 }}>{post.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--gray-600)", margin: "0 0 20px" }}>{excerptOf(post)}</p>
              <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--gray-700)" }}>By {post.author_name}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--brand)" }}>Read →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
