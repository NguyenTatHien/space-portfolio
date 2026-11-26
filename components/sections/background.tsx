"use client";

import dynamic from "next/dynamic";

const StarField = dynamic(() => import("@/components/three/star-field"), { ssr: false });

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0f1a3a_0%,#0b0b10_55%)]" />
      <div className="absolute inset-0">
        <StarField />
      </div>
    </div>
  );
}
