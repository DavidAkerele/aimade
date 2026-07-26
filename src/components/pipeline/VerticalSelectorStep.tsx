"use client";

import React from "react";
import { usePipeline, VerticalType } from "@/context/PipelineContext";
import { motion } from "framer-motion";
import { Tent, Utensils, ArrowRight } from "lucide-react";

export const VerticalSelectorStep: React.FC = () => {
  const { setActiveVertical, setCurrentStep, landingSettings } = usePipeline();

  const handleSelect = (vertical: VerticalType) => {
    setActiveVertical(vertical);
    setCurrentStep(2);
  };

  const defaultEventsImg = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=80";
  const defaultFlavorsImg = "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=1400&q=80";

  return (
    <div className="w-full h-screen max-h-screen flex flex-col justify-between p-3 sm:p-4 overflow-hidden bg-[#F8F9FA]">
      {/* TOP CARD: AIMADE EVENTS */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.985 }}
        onClick={() => handleSelect("EVENTS")}
        className="w-full h-[calc(50vh-20px)] relative overflow-hidden cursor-pointer group rounded-2xl shadow-sm border border-neutral-200/80 mb-3"
      >
        {/* Background Image with Fallback */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={landingSettings.eventsImage || defaultEventsImg}
          onError={(e) => {
            e.currentTarget.src = defaultEventsImg;
          }}
          alt="Aimade Events"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/95 via-[#0A2540]/60 to-black/30 flex flex-col justify-end p-6 sm:p-8 text-white">
          <div className="space-y-3 max-w-md">
            <span className="bg-[#0A2540]/80 backdrop-blur-md border border-blue-400/30 text-blue-100 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 shadow-sm">
              <Tent className="w-3.5 h-3.5 text-blue-300" /> Aimade Events
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              {landingSettings.eventsTitle}
            </h2>
            <p className="text-xs text-neutral-200 leading-relaxed font-medium">
              {landingSettings.eventsSubtitle}
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

      {/* BOTTOM CARD: AIMADE FLAVORS */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.985 }}
        onClick={() => handleSelect("FLAVORS")}
        className="w-full h-[calc(50vh-20px)] relative overflow-hidden cursor-pointer group rounded-2xl shadow-sm border border-neutral-200/80"
      >
        {/* Background Image with Fallback */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={landingSettings.flavorsImage || defaultFlavorsImg}
          onError={(e) => {
            e.currentTarget.src = defaultFlavorsImg;
          }}
          alt="Aimade Flavors"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E5631]/95 via-[#1E5631]/60 to-black/30 flex flex-col justify-end p-6 sm:p-8 text-white">
          <div className="space-y-3 max-w-md">
            <span className="bg-[#1E5631]/80 backdrop-blur-md border border-emerald-400/30 text-emerald-100 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 shadow-sm">
              <Utensils className="w-3.5 h-3.5 text-emerald-300" /> Aimade Flavors
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              {landingSettings.flavorsTitle}
            </h2>
            <p className="text-xs text-neutral-200 leading-relaxed font-medium">
              {landingSettings.flavorsSubtitle}
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
