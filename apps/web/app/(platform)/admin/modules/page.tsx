"use client";

import { useEffect, useState } from "react";

import { listAdminModules, updateAdminModule, type FeatureModule } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

function Toggle({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`h-6 w-11 rounded-full p-1 transition ${checked ? "bg-violet-600" : "bg-slate-300"} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <span className={`block h-4 w-4 rounded-full bg-white transition ${checked ? "translate-x-5" : ""}`} />
    </button>
  );
}

export default function AdminModulesPage() {
  const { accessToken } = useAuth();
  const [groups, setGroups] = useState<Record<string, FeatureModule[]>>({});
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    listAdminModules(accessToken ?? undefined).then((payload) => setGroups(payload.grouped)).catch((error) => setStatus(error.message));
  }, [accessToken]);

  async function update(module: FeatureModule, key: "enabledPublic" | "enabledAdmin" | "enabledApi", value: boolean) {
    setGroups((current) => {
      const next = { ...current };
      next[module.category] = next[module.category].map((item) => item.key === module.key ? { ...item, [key]: value } : item);
      return next;
    });
    try {
      await updateAdminModule(accessToken ?? undefined, module.key, { [key]: value });
      setStatus("Saved");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Save failed");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-950 dark:text-white">Feature Modules</h1>
        {status ? <p className="mt-1 text-sm text-slate-500">{status}</p> : null}
      </div>
      {Object.entries(groups).map(([category, modules]) => (
        <section key={category} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">{category}</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400 dark:border-slate-800">
                <tr>
                  <th className="py-3">Module</th>
                  <th className="py-3">Public</th>
                  <th className="py-3">Admin</th>
                  <th className="py-3">API</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {modules.map((module) => (
                  <tr key={module.key}>
                    <td className="py-4">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {module.name} {module.isCore ? <span className="ml-2 rounded-full bg-violet-50 px-2 py-1 text-[10px] text-violet-700">Core</span> : null}
                      </div>
                      <div className="text-xs text-slate-500">{module.description}</div>
                    </td>
                    <td><Toggle checked={module.enabledPublic} disabled={module.isCore} onChange={(checked) => update(module, "enabledPublic", checked)} /></td>
                    <td><Toggle checked={module.enabledAdmin} disabled={module.isCore} onChange={(checked) => update(module, "enabledAdmin", checked)} /></td>
                    <td><Toggle checked={module.enabledApi} disabled={module.isCore} onChange={(checked) => update(module, "enabledApi", checked)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
