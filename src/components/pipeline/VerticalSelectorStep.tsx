"use client";

import React from "react";
import { usePipeline, VerticalType } from "@/context/PipelineContext";
import { motion } from "framer-motion";
import { Tent, Utensils, ArrowRight, Sparkles } from "lucide-react";

export const VerticalSelectorStep: React.FC = () => {
  const { setActiveVertical, setCurrentStep } = usePipeline();

  const handleSelect = (vertical: VerticalType) => {
    setActiveVertical(vertical);
    setCurrentStep(2);
  };

  return (
    <div className="w-full h-screen max-h-screen flex flex-col justify-between p-3 sm:p-4 overflow-hidden bg-[#F8F9FA]">
      {/* TOP CARD: AIMADE EVENTS (50vh with margin & rounded-2xl) */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.985 }}
        onClick={() => handleSelect("EVENTS")}
        className="w-full h-[calc(50vh-20px)] relative overflow-hidden cursor-pointer group rounded-2xl shadow-sm border border-neutral-200/80 mb-3"
      >
        {/* Background Image with Dark Gradient Overlay */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=80"
          alt="Aimade Events"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/95 via-[#0A2540]/60 to-black/30 flex flex-col justify-end p-6 sm:p-8 text-white">
          <div className="space-y-3 max-w-md">
            {/* Modern Frosted Glass Pill Badge (No red accent) */}
            <span className="bg-[#0A2540]/80 backdrop-blur-md border border-blue-400/30 text-blue-100 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 shadow-sm">
              <Tent className="w-3.5 h-3.5 text-blue-300" /> Aimade Events
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Equipment & Event Rentals
            </h2>
            <p className="text-xs text-neutral-200 leading-relaxed font-medium">
              20x20ft canopies, Chiavari chairs (sold in dozens), banquet tables, 100L/200L drums & stoves.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 transition-all group-hover:translate-x-1">
                <span>Explore Equipment Rentals</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* BOTTOM CARD: AIMADE FLAVORS (50vh with margin & rounded-2xl) */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.985 }}
        onClick={() => handleSelect("FLAVORS")}
        className="w-full h-[calc(50vh-20px)] relative overflow-hidden cursor-pointer group rounded-2xl shadow-sm border border-neutral-200/80"
      >
        {/* Background Image with Dark Gradient Overlay */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=1400&q=80"
          alt="Aimade Flavors"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E5631]/95 via-[#1E5631]/60 to-black/30 flex flex-col justify-end p-6 sm:p-8 text-white">
          <div className="space-y-3 max-w-md">
            {/* Modern Frosted Glass Pill Badge (No red accent) */}
            <span className="bg-[#1E5631]/80 backdrop-blur-md border border-emerald-400/30 text-emerald-100 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 shadow-sm">
              <Utensils className="w-3.5 h-3.5 text-emerald-300" /> Aimade Flavors
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Culinary Food Catering
            </h2>
            <p className="text-xs text-neutral-200 leading-relaxed font-medium">
              Firewood Jollof rice, authentic Afang soup, Ayamasi stew & Ewa Aganyin by 2L, 4L, 8L, 10L or custom litres.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 transition-all group-hover:translate-x-1">
                <span>Explore Food Catering</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
