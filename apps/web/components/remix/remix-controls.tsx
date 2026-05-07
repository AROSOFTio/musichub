"use client";

import type { RemixProject } from "@/lib/api";

const controls = [
  ["tempo", "Tempo", 0.5, 2, 0.01],
  ["pitchShift", "Pitch", -12, 12, 1],
  ["volume", "Volume", 0, 2, 0.01],
  ["bassBoost", "Bass", 0, 12, 0.5],
  ["trebleBoost", "Treble", 0, 12, 0.5],
  ["echo", "Echo", 0, 1, 0.01],
  ["reverb", "Reverb", 0, 1, 0.01],
] as const;

export function RemixControls({ project, onChange }: { project: RemixProject; onChange: (key: string, value: number) => void }) {
  return (
    <div className="grid gap-4">
      {controls.map(([key, label, min, max, step]) => (
        <label key={key} className="grid gap-2 rounded-2xl border border-borderSoft bg-[var(--card-bg)] p-4">
          <span className="flex items-center justify-between text-sm font-bold">
            {label}
            <span className="text-xs text-[var(--muted)]">{String(project[key])}</span>
          </span>
          <input type="range" min={min} max={max} step={step} value={Number(project[key])} onChange={(event) => onChange(key, Number(event.target.value))} />
        </label>
      ))}
    </div>
  );
}
