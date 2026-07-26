"use client";

import React from "react";
import { usePipeline } from "@/context/PipelineContext";
import { motion } from "framer-motion";
import { Calendar, MapPin, Plus, Minus, ChevronRight, ChevronLeft, Clock } from "lucide-react";

export const EventsCatalogStep: React.FC = () => {
  const {
    equipmentItems,
    eventsInventory,
    setEventsInventoryQty,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    location,
    setLocation,
    rentalDaysCount,
    setCurrentStep,
  } = usePipeline();

  const categories = [
    "Canopies & Tents",
    "Chairs & Seating",
    "Tables & Dining",
    "Cookware & Utensils",
    "Stoves & Ovens",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="w-full flex-1 flex flex-col justify-between space-y-4 overflow-hidden py-1"
    >
      {/* SLEEK iOS/AIRBNB-STYLE FLOATING CAPSULE BAR */}
      <div className="p-3 bg-white rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 w-full sm:w-auto text-xs">
          <div className="flex flex-col">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#0A2540]" /> Start Date
            </span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-0.5 px-2.5 py-1 text-xs rounded-xl border border-neutral-200 bg-neutral-50 font-bold text-neutral-900 focus:outline-hidden focus:ring-1 focus:ring-[#0A2540]"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#0A2540]" /> End Date
            </span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-0.5 px-2.5 py-1 text-xs rounded-xl border border-neutral-200 bg-neutral-50 font-bold text-neutral-900 focus:outline-hidden focus:ring-1 focus:ring-[#0A2540]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex-1 sm:w-44 flex flex-col">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#0A2540]" /> Location
            </span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Lekki Phase 1, Lagos"
              className="mt-0.5 px-2.5 py-1 text-xs rounded-xl border border-neutral-200 bg-neutral-50 font-bold text-neutral-900 focus:outline-hidden focus:ring-1 focus:ring-[#0A2540]"
            />
          </div>

          <div className="px-3 py-2 bg-[#0A2540] text-white rounded-xl text-center flex-shrink-0">
            <span className="text-[9px] uppercase tracking-wider block opacity-70">Duration</span>
            <span className="font-extrabold text-xs flex items-center gap-1">
              <Clock className="w-3 h-3 text-blue-300" /> {rentalDaysCount} Days
            </span>
          </div>
        </div>
      </div>

      {/* PRODUCT CATALOG SECTION */}
      <div className="w-full flex-1 max-h-[calc(100vh-230px)] overflow-y-auto space-y-4 pr-1">
        {categories.map((cat) => {
          const catItems = equipmentItems.filter((i) => i.category === cat);
          if (catItems.length === 0) return null;

          return (
            <div key={cat} className="space-y-2">
              <h3 className="font-heading font-bold text-[10px] uppercase tracking-wider text-neutral-500 bg-white px-3 py-1 rounded-full w-max border border-neutral-200/80 shadow-2xs">
                {cat}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {catItems.map((item) => {
                  const qty = eventsInventory[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl p-3 bg-white border flex items-center gap-3 transition-all ${
                        qty > 0
                          ? "border-[#0A2540] ring-1 ring-[#0A2540]/20 shadow-xs"
                          : "border-neutral-200/80 hover:border-neutral-300"
                      }`}
                    >
                      {/* Rounded Thumbnail */}
                      <div className="w-18 h-18 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-heading font-bold text-xs text-[#0A2540] truncate">{item.name}</h4>
                        <p className="text-[10px] text-neutral-400 font-medium truncate">{item.specs}</p>

                        <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
                          <span className="font-heading font-extrabold text-xs text-[#0A2540]">
                            ₦{item.unitPrice.toLocaleString()}{" "}
                            <span className="text-[9px] font-normal text-neutral-400">
                              {item.unitType === "dozen" ? "/ dozen" : "/ unit"}
                            </span>
                          </span>

                          <div className="flex items-center gap-1 bg-neutral-100 rounded-xl p-0.5 border border-neutral-200">
                            <button
                              type="button"
                              onClick={() => setEventsInventoryQty(item.id, qty - 1)}
                              className="p-1 rounded-lg text-neutral-600 hover:bg-white cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-extrabold text-neutral-900 px-1.5">
                              {qty} {item.unitType === "dozen" ? "Doz" : "Qty"}
                            </span>
                            <button
                              type="button"
                              onClick={() => setEventsInventoryQty(item.id, qty + 1)}
                              className="p-1 rounded-lg text-neutral-600 hover:bg-white cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="pt-2 border-t border-neutral-200/80 flex items-center justify-between flex-shrink-0">
        <button
          onClick={() => setCurrentStep(1)}
          className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600 hover:bg-white flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Back
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          className="px-6 py-2 rounded-xl bg-[#0A2540] hover:bg-[#06182B] text-white text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <span>Proceed to Checkout</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
