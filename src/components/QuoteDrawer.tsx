"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { X, ShoppingBag, Tent, Utensils, Send, CheckCircle2, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PrintableQuoteModal } from "@/components/PrintableQuoteModal";

export const QuoteDrawer: React.FC = () => {
  const {
    isQuoteDrawerOpen,
    setIsQuoteDrawerOpen,
    pipelineRentals,
    setPipelineRentals,
    pipelineFood,
    setPipelineFood,
    startDate,
    endDate,
    rentalDaysCount,
    clearAllPipelineSelections,
  } = useApp();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const selectedRentals = pipelineRentals.filter((i) => i.selectedQty > 0);
  const selectedFood = pipelineFood.filter((i) => i.selectedQty > 0);

  const totalCount =
    selectedRentals.reduce((sum, i) => sum + i.selectedQty, 0) +
    selectedFood.reduce((sum, i) => sum + i.selectedQty, 0);

  const rentalSubtotal = selectedRentals.reduce(
    (sum, item) => sum + item.unitPrice * item.selectedQty * rentalDaysCount,
    0
  );

  const cateringSubtotal = selectedFood.reduce((sum, item) => {
    let litres = 4;
    if (item.selectedPortion === "2L Tub") litres = 2;
    if (item.selectedPortion === "4L Tub") litres = 4;
    if (item.selectedPortion === "8L Tub") litres = 8;
    if (item.selectedPortion === "10L Tub") litres = 10;
    if (item.selectedPortion === "Custom Amount" && item.customLitres) litres = item.customLitres;

    return sum + item.unitPricePerLitre * litres * (item.selectedQty || 1);
  }, 0);

  const grandTotal = rentalSubtotal + cateringSubtotal + (selectedRentals.length > 0 ? 15000 : 0);

  const handleRentalQtyChange = (id: string, delta: number) => {
    setPipelineRentals((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.selectedQty + delta);
          return { ...item, selectedQty: newQty };
        }
        return item;
      })
    );
  };

  const handleFoodQtyChange = (id: string, delta: number) => {
    setPipelineFood((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.selectedQty + delta);
          return { ...item, selectedQty: newQty };
        }
        return item;
      })
    );
  };

  return (
    <AnimatePresence>
      {isQuoteDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsQuoteDrawerOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 text-base">Inquiry & Quote Basket</h3>
                    <p className="text-xs text-slate-500">{totalCount} items selected</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsQuoteDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {totalCount === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-slate-800 text-lg">Your inquiry cart is empty</h4>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                        Use the interactive pipeline wizard to select rental items or food orders.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {selectedRentals.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100">
                          <Tent className="w-4 h-4 text-blue-700" />
                          <span>Equipment Rentals ({selectedRentals.length})</span>
                        </div>

                        <div className="space-y-2.5">
                          {selectedRentals.map((item) => (
                            <div
                              key={item.id}
                              className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3"
                            >
                              <div className="flex-1 min-w-0">
                                <h5 className="font-heading font-semibold text-xs text-slate-900 truncate">
                                  {item.name}
                                </h5>
                                <p className="text-[11px] text-slate-500">
                                  ₦{item.unitPrice.toLocaleString()}{" "}
                                  {item.unitType === "dozen" ? "/ dozen" : "/ unit per day"}
                                </p>
                              </div>

                              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1">
                                <button
                                  onClick={() => handleRentalQtyChange(item.id, -1)}
                                  className="p-1 rounded text-slate-500 hover:bg-slate-100"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-xs font-bold text-slate-800 px-1.5">
                                  {item.selectedQty} {item.unitType === "dozen" ? "Doz" : "Qty"}
                                </span>
                                <button
                                  onClick={() => handleRentalQtyChange(item.id, 1)}
                                  className="p-1 rounded text-slate-500 hover:bg-slate-100"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedFood.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-100">
                          <Utensils className="w-4 h-4 text-emerald-700" />
                          <span>Catering Orders ({selectedFood.length})</span>
                        </div>

                        <div className="space-y-2.5">
                          {selectedFood.map((food) => (
                            <div
                              key={food.id}
                              className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3"
                            >
                              <div className="flex-1 min-w-0">
                                <h5 className="font-heading font-semibold text-xs text-slate-900 truncate">
                                  {food.name}
                                </h5>
                                <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded">
                                  {food.selectedPortion === "Custom Amount"
                                    ? `${food.customLitres}L Custom`
                                    : food.selectedPortion}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1">
                                <button
                                  onClick={() => handleFoodQtyChange(food.id, -1)}
                                  className="p-1 rounded text-slate-500 hover:bg-slate-100"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-xs font-bold text-slate-800 px-1.5">{food.selectedQty}</span>
                                <button
                                  onClick={() => handleFoodQtyChange(food.id, 1)}
                                  className="p-1 rounded text-slate-500 hover:bg-slate-100"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              {totalCount > 0 && (
                <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-500">Estimated Total Cost ({rentalDaysCount} Days):</span>
                    <span className="font-extrabold text-slate-900 text-lg">₦{grandTotal.toLocaleString()}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={clearAllPipelineSelections}
                      className="py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-200"
                    >
                      Clear Basket
                    </button>
                    <button
                      onClick={() => {
                        setIsQuoteDrawerOpen(false);
                        setQuoteModalOpen(true);
                      }}
                      className="py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 flex items-center justify-center gap-1.5"
                    >
                      Generate Quote <Send className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <PrintableQuoteModal
            isOpen={quoteModalOpen}
            onClose={() => setQuoteModalOpen(false)}
            selectedRentals={selectedRentals}
            selectedCatering={selectedFood}
            customerInfo={{
              name: customerName,
              email: customerEmail,
              phone: customerPhone,
              venue: eventVenue,
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
};
