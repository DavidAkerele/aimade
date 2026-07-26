"use client";

import { EcosystemFunnel } from "@/components/pipeline/EcosystemFunnel";
import { Smartphone } from "lucide-react";

export default function Home() {
  return (
    <main className="w-full h-screen max-h-screen overflow-hidden bg-[#FAFAFC]">
      {/* DESKTOP NOTICE: Prompts user to view on mobile viewport */}
      <div className="hidden md:flex flex-col items-center justify-center min-h-screen p-8 text-center bg-[#0A2540] text-white">
        <div className="max-w-md space-y-4 bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl">
          <div className="w-16 h-16 bg-[#E63946] text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Smartphone className="w-8 h-8" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl tracking-tight">
            Designed Exclusively for Mobile
          </h1>
          <p className="text-sm text-neutral-200 leading-relaxed font-medium">
            Please resize your browser window to a mobile viewport (<span className="font-bold text-white">&lt; 480px</span>) or scan/open this page on your smartphone for the full interactive pipeline experience.
          </p>
          <div className="pt-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Aimade Ecosystem
          </div>
        </div>
      </div>

      {/* MOBILE PIPELINE FUNNEL (Visible on screens < 768px) */}
      <div className="md:hidden w-full h-full">
        <EcosystemFunnel />
      </div>
    </main>
  );
}
