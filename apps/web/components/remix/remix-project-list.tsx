"use client";

import Link from "next/link";
import type { RemixProject } from "@/lib/api";

export function RemixProjectList({ projects }: { projects: RemixProject[] }) {
  return (
    <div className="grid gap-3">
      {projects.map((project) => (
        <Link key={project.id} href={`/remix-studio/${project.id}`} className="rounded-2xl border border-borderSoft bg-[var(--card-bg)] p-4 hover:border-violet-200">
          <div className="font-bold text-[var(--foreground)]">{project.title}</div>
          <div className="text-xs font-semibold text-[var(--muted)]">{project.status}</div>
        </Link>
      ))}
    </div>
  );
}
