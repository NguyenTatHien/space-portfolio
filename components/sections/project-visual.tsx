import type { ProjectVisual as Kind } from "@/constants/profile";

/** Stylised HUD "screen" for a project, used until a real screenshot is added to /public/projects. */
export function ProjectVisual({ kind }: { kind: Kind }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(120%_90%_at_80%_0%,#1d4ed855,transparent_60%),linear-gradient(180deg,#0f172a,#0b0b10)]" aria-hidden>
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div className="absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-accent-2/10 to-transparent" />
      <div className="absolute left-4 top-3 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
      </div>
      <div className="absolute inset-x-4 bottom-4 top-9">{VISUALS[kind]}</div>
    </div>
  );
}

const bar = "rounded-full bg-white/10";

const VISUALS: Record<Kind, React.ReactNode> = {
  face: (
    <div className="relative h-full w-full">
      <div className="absolute left-[12%] top-1 h-5 w-5 border-l-2 border-t-2 border-accent-2" />
      <div className="absolute right-[12%] top-1 h-5 w-5 border-r-2 border-t-2 border-accent-2" />
      <div className="absolute bottom-1 left-[12%] h-5 w-5 border-b-2 border-l-2 border-accent-2" />
      <div className="absolute bottom-1 right-[12%] h-5 w-5 border-b-2 border-r-2 border-accent-2" />
      <div className="absolute left-1/2 top-1/2 h-[68%] w-[34%] min-w-24 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-accent-2/60 bg-accent-2/5">
        <span className="absolute left-[28%] top-[36%] h-1.5 w-1.5 rounded-full bg-accent-2" />
        <span className="absolute right-[28%] top-[36%] h-1.5 w-1.5 rounded-full bg-accent-2" />
        <span className="absolute left-1/2 top-[54%] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-beacon" />
        <span className="absolute left-[34%] top-[72%] h-1.5 w-1.5 rounded-full bg-accent-2" />
        <span className="absolute right-[34%] top-[72%] h-1.5 w-1.5 rounded-full bg-accent-2" />
        <span className="absolute inset-x-0 top-[45%] h-px bg-accent-2 shadow-[0_0_8px_#22d3ee]" />
      </div>
      <span className="absolute left-[12%] top-8 rounded-md border border-accent-2/30 bg-black/50 px-1.5 py-0.5 font-mono text-[9px] text-accent-2">LIVE · 0.98</span>
      <span className="absolute bottom-8 right-[12%] rounded-md border border-ok/40 bg-ok/10 px-1.5 py-0.5 font-mono text-[9px] text-ok">MATCH ✓</span>
    </div>
  ),
  ai: (
    <div className="flex h-full flex-col justify-end gap-2.5">
      <div className="max-w-[70%] self-end rounded-2xl rounded-br-sm bg-accent/80 px-3 py-2">
        <div className="h-1.5 w-28 rounded-full bg-black/30" />
      </div>
      <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-accent-2/30 bg-white/5 px-3 py-2.5">
        <div className={`h-1.5 w-40 ${bar}`} />
        <div className={`mt-1.5 h-1.5 w-32 ${bar}`} />
        <div className="mt-2.5 inline-flex items-center gap-1 rounded-md bg-accent-2/15 px-1.5 py-0.5 font-mono text-[9px] text-accent-2">
          ↳ policy.pdf · p.4
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
        <span className="h-1.5 flex-1 rounded-full bg-white/10" />
        <span className="h-4 w-4 rounded-full bg-accent-2" />
      </div>
    </div>
  ),
  ops: (
    <div className="grid h-full grid-cols-4 gap-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col justify-between rounded-lg border border-white/10 bg-white/[0.04] p-2">
          <span className="font-mono text-[9px] text-dim">BAY {i + 1}</span>
          <span
            className="h-1.5 rounded-full"
            style={{ width: `${30 + ((i * 37) % 70)}%`, background: i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#22d3ee" : "#3b82f6" }}
          />
        </div>
      ))}
    </div>
  ),
  compliance: (
    <div className="grid h-full grid-cols-6 grid-rows-3 gap-1.5">
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-center rounded-md border font-mono text-[9px]"
          style={{
            borderColor: i % 5 === 0 ? "#fbbf2466" : "#22d3ee33",
            background: i % 5 === 0 ? "#fbbf2414" : "#22d3ee0d",
            color: i % 5 === 0 ? "#fbbf24" : "#94a3b8",
          }}
        >
          {String(i + 1).padStart(2, "0")}
        </div>
      ))}
    </div>
  ),
  learning: (
    <div className="grid h-full grid-cols-[1.6fr_1fr] gap-2">
      <div className="relative flex items-center justify-center rounded-lg border border-white/10 bg-black/40">
        <span className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-accent-2" />
        <span className="absolute inset-x-3 bottom-2.5 h-1 rounded-full bg-white/10">
          <span className="block h-full w-2/5 rounded-full bg-accent" />
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-1 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2">
            <span className={`h-2 w-2 rounded-sm ${i < 2 ? "bg-ok" : "bg-white/15"}`} />
            <span className={`h-1.5 flex-1 ${bar}`} />
          </div>
        ))}
      </div>
    </div>
  ),
};
