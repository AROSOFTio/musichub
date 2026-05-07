"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { RemixEditor } from "@/components/remix/remix-editor";
import { getRemixProject, type RemixProject } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { MODULE_KEYS } from "@/lib/modules/module-keys";
import { hasModule } from "@/lib/modules/module-registry";
import { useModules } from "@/lib/modules/use-modules";

export default function RemixProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { accessToken, isAuthenticated } = useAuth();
  const modules = useModules();
  const [project, setProject] = useState<RemixProject | null>(null);

  useEffect(() => {
    if (!hasModule(modules, MODULE_KEYS.remix)) router.replace("/");
  }, [modules, router]);

  useEffect(() => {
    if (!isAuthenticated || !id) return;
    getRemixProject(accessToken ?? undefined, id).then(setProject).catch(() => router.replace("/remix-studio"));
  }, [accessToken, id, isAuthenticated, router]);

  if (!project) return null;
  return <RemixEditor initialProject={project} accessToken={accessToken ?? undefined} />;
}
