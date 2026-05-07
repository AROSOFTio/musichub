"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { getPublicModules } from "@/lib/api";
import type { ModuleFlags } from "./module-keys";

const ModuleContext = createContext<ModuleFlags | null>(null);

export function ModuleProvider({
  initialModules,
  children,
}: {
  initialModules?: ModuleFlags | null;
  children: React.ReactNode;
}) {
  const [modules, setModules] = useState<ModuleFlags | null>(initialModules ?? null);

  useEffect(() => {
    if (modules) return;
    getPublicModules().then((payload) => setModules(payload.flags)).catch(() => setModules({}));
  }, [modules]);

  const value = useMemo(() => modules ?? {}, [modules]);
  return <ModuleContext.Provider value={value}>{children}</ModuleContext.Provider>;
}

export function useModules() {
  return useContext(ModuleContext) ?? {};
}
