"use client";

import { hasModule } from "./module-registry";
import { useModules } from "./use-modules";

export function ModuleGate({
  moduleKey,
  children,
  fallback = null,
}: {
  moduleKey: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const modules = useModules();
  return hasModule(modules, moduleKey) ? <>{children}</> : <>{fallback}</>;
}
