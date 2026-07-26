"use client";

import React from "react";
import { usePipeline } from "@/context/PipelineContext";
import { motion } from "framer-motion";
import { Calendar, Plus, Minus, ChevronRight, ChevronLeft, Clock } from "lucide-react";

export const FlavorsMenuStep: React.FC = () => {
  const {
    menuItems,
    flavorsSelections,
    setFlavorSelection,
    fulfillmentDate,
    setFulfillmentDate,
    setCurrentStep,
  } = usePipeline();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="w-full flex-1 flex flex-col justify-between space-y-4 overflow-hidden py-1"
    >
      {/* REDESIGNED CAPSULE BAR FOR CATERING */}
      <div className="p-3 bg-white rounded-2xl border border-neutral-200/80 shadow-xs flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-2 text-xs">
          <div className="flex flex-col">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#1E5631]" /> Delivery / Catering Date
            </span>
            <input
              type="date"
              value={fulfillmentDate}
              onChange={(e) => setFulfillmentDate(e.target.value)}
              className="mt-0.5 px-3 py-1 text-xs rounded-xl border border-neutral-200 bg-neutral-50 font-bold text-neutral-900"
            />
          </div>
        </div>

        <span className="text-[10px] font-extrabold bg-emerald-50 text-[#1E5631] px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#1E5631]" /> Fresh Cook-On-Order
        </span>
      </div>

      {/* REDESIGNED FOOD PRODUCT CARDS */}
      <div className="w-full flex-1 max-h-[calc(100vh-230px)] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3 pr-1">
        {menuItems.map((dish) => {
          const sel = flavorsSelections[dish.id] || { portion: "4L", quantity: 0 };

          return (
            <div
              key={dish.id}
              className={`rounded-2xl p-3 bg-white border flex items-center gap-3 transition-all ${
                sel.quantity > 0
                  ? "border-[#1E5631] ring-1 ring-[#1E5631]/20 shadow-xs"
                  : "border-neutral-200/80 hover:border-neutral-300"
              }`}
            >
              {/* Rounded Thumbnail */}
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1.5">
                <div>
                  <h4 className="font-heading font-bold text-xs text-[#1E5631] truncate">{dish.name}</h4>
                  <p className="text-[10px] text-neutral-400 font-medium truncate">{dish.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={sel.portion}
                    onChange={(e) => setFlavorSelection(dish.id, { portion: e.target.value as any })}
                    className="px-2.5 py-1 text-xs rounded-xl border border-neutral-200 bg-neutral-50 font-bold text-neutral-800"
                  >
                    <option value="2L">2L Tub</option>
                    <option value="4L">4L Tub</option>
                    <option value="8L">8L Tub</option>
                    <option value="10L">10L Tub</option>
                    <option value="CUSTOM">Custom Litres...</option>
                  </select>

                  {sel.portion === "CUSTOM" && (
                    <input
                      type="number"
                      min={1}
                      value={sel.customLitres || 12}
                      onChange={(e) => setFlavorSelection(dish.id, { customLitres: Number(e.target.value) })}
                      className="w-16 px-2 py-1 text-xs rounded-xl border border-neutral-200 bg-white font-bold"
                    />
                  )}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
                  <span className="font-heading font-extrabold text-xs text-[#1E5631]">
                    ₦{dish.unitPricePerLitre.toLocaleString()} / L
                  </span>

                  <div className="flex items-center gap-1 bg-neutral-100 rounded-xl p-0.5 border border-neutral-200">
                    <button
                      type="button"
                      onClick={() => setFlavorSelection(dish.id, { quantity: sel.quantity - 1 })}
                      className="p-1 rounded-lg text-neutral-600 hover:bg-white cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-extrabold text-neutral-900 px-1.5">{sel.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setFlavorSelection(dish.id, { quantity: sel.quantity + 1 })}
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
          className="px-6 py-2 rounded-xl bg-[#1E5631] hover:bg-[#143B21] text-white text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <span>Proceed to Checkout</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
