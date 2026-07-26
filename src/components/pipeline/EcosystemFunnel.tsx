"use client";

import React, { useState } from "react";
import { usePipeline } from "@/context/PipelineContext";
import { AnimatePresence, motion } from "framer-motion";
import { VerticalSelectorStep } from "@/components/pipeline/VerticalSelectorStep";
import { EventsCatalogStep } from "@/components/pipeline/EventsCatalogStep";
import { FlavorsMenuStep } from "@/components/pipeline/FlavorsMenuStep";
import { CheckoutInquiryStep } from "@/components/pipeline/CheckoutInquiryStep";
import { ShoppingBag, X, Send, ChevronRight, Tent, Utensils, ArrowLeft } from "lucide-react";
import { PrintableQuoteModal } from "@/components/PrintableQuoteModal";

export const EcosystemFunnel: React.FC = () => {
  const {
    activeVertical,
    currentStep,
    setCurrentStep,
    equipmentItems,
    eventsInventory,
    menuItems,
    flavorsSelections,
    rentalDaysCount,
    equipmentSubtotal,
    cateringSubtotal,
    grandTotal,
    contactInfo,
    resetPipeline,
  } = usePipeline();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const selectedEquipmentList = equipmentItems
    .map((item) => ({ ...item, qty: eventsInventory[item.id] || 0 }))
    .filter((i) => i.qty > 0);

  const selectedMenuList = menuItems
    .map((dish) => ({ ...dish, selection: flavorsSelections[dish.id] }))
    .filter((d) => d.selection && d.selection.quantity > 0);

  const totalCount =
    selectedEquipmentList.reduce((sum, i) => sum + i.qty, 0) +
    selectedMenuList.reduce((sum, d) => sum + d.selection.quantity, 0);

  return (
    <div className="w-full h-screen max-h-screen overflow-hidden bg-[#FAFAFC] text-neutral-900 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto h-screen max-h-screen flex flex-col justify-between relative overflow-hidden">
        {/* Step Indicator Header (ONLY visible in Step 2 and Step 3) */}
        {currentStep > 1 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full py-2.5 px-4 bg-white border-b border-neutral-200/80 flex items-center justify-between gap-2 flex-shrink-0 z-10"
          >
            <button
              onClick={resetPipeline}
              className="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-600 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-700" /> Back to Main
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStep(2)}
                className={`px-3 py-1 rounded-md text-xs font-bold text-center transition-all cursor-pointer ${
                  currentStep === 2
                    ? activeVertical === "FLAVORS"
                      ? "bg-[#1E5631] text-white shadow-xs"
                      : "bg-[#0A2540] text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-700"
                }`}
              >
                {activeVertical === "FLAVORS" ? "1. Food Catalog" : "1. Equipment Catalog"}
              </button>

              <button
                onClick={() => setCurrentStep(3)}
                className={`px-3 py-1 rounded-md text-xs font-bold text-center transition-all cursor-pointer ${
                  currentStep === 3
                    ? activeVertical === "FLAVORS"
                      ? "bg-[#1E5631] text-white shadow-xs"
                      : "bg-[#0A2540] text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-700"
                }`}
              >
                2. Checkout
              </button>
            </div>
          </motion.div>
        )}

        {/* Main Funnel Content Area with Zoom Animation */}
        <div className="w-full flex-1 flex flex-col justify-between overflow-hidden">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <VerticalSelectorStep />
              </motion.div>
            )}

            {currentStep === 2 && activeVertical === "EVENTS" && (
              <motion.div
                key="step2-events"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex flex-col justify-between p-4"
              >
                <EventsCatalogStep />
              </motion.div>
            )}

            {currentStep === 2 && activeVertical === "FLAVORS" && (
              <motion.div
                key="step2-flavors"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex flex-col justify-between p-4"
              >
                <FlavorsMenuStep />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full flex flex-col justify-between p-4"
              >
                <CheckoutInquiryStep />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sticky Live Quote Bar (ONLY visible in Step 2 and Step 3 when items are selected) */}
        {totalCount > 0 && currentStep > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full py-2.5 px-4 bg-white border-t border-neutral-200/80 shadow-md flex items-center justify-between flex-shrink-0 z-10"
          >
            <div>
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Estimated Total</span>
              <span className="font-heading font-extrabold text-base text-neutral-900">
                ₦{grandTotal.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="px-3 py-1.5 rounded-md border border-neutral-200 text-neutral-700 text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-neutral-50"
              >
                <ShoppingBag className="w-3.5 h-3.5" /> Basket ({totalCount})
              </button>

              {currentStep !== 3 && (
                <button
                  onClick={() => setCurrentStep(3)}
                  className={`px-3.5 py-1.5 rounded-md text-white text-xs font-extrabold flex items-center gap-1 cursor-pointer shadow-xs ${
                    activeVertical === "FLAVORS" ? "bg-[#1E5631] hover:bg-[#143B21]" : "bg-[#0A2540] hover:bg-[#06182B]"
                  }`}
                >
                  Checkout <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* FULL-MOBILE QUOTE DRAWER MODAL */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-xs"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-screen max-w-xs bg-white shadow-2xl flex flex-col justify-between"
              >
                <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#0A2540]" />
                    <h3 className="font-heading font-bold text-sm text-neutral-900">Live Quote Summary</h3>
                  </div>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1 rounded text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                  {selectedEquipmentList.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#0A2540]">
                        <Tent className="w-3.5 h-3.5 text-[#E63946]" /> Equipment ({rentalDaysCount} Days)
                      </div>
                      {selectedEquipmentList.map((item) => (
                        <div key={item.id} className="flex justify-between text-neutral-700 text-xs">
                          <span className="truncate max-w-[140px]">{item.name}</span>
                          <span className="font-bold">
                            {item.qty} {item.unitType === "dozen" ? "Doz" : "Qty"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedMenuList.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#1E5631]">
                        <Utensils className="w-3.5 h-3.5 text-[#D62828]" /> Catering Dishes
                      </div>
                      {selectedMenuList.map((dish) => (
                        <div key={dish.id} className="flex justify-between text-neutral-700 text-xs">
                          <span className="truncate max-w-[140px]">{dish.name}</span>
                          <span className="font-bold">{dish.selection.quantity} Order</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {totalCount === 0 && (
                    <div className="text-center py-10 text-neutral-400 italic">
                      No items selected yet. Select products to build your quote.
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-neutral-200 bg-neutral-50 space-y-3 text-xs">
                  <div className="flex justify-between text-neutral-500">
                    <span>Rentals Subtotal:</span>
                    <span className="font-bold text-neutral-900">₦{equipmentSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>Catering Subtotal:</span>
                    <span className="font-bold text-neutral-900">₦{cateringSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-neutral-900 pt-2 border-t border-neutral-200">
                    <span>Total Amount:</span>
                    <span className="text-[#0A2540]">₦{grandTotal.toLocaleString()}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setQuoteModalOpen(true)}
                      className="py-2 rounded-md border border-neutral-200 text-neutral-700 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Print Receipt
                    </button>
                    <button
                      onClick={() => {
                        setMobileDrawerOpen(false);
                        setCurrentStep(3);
                      }}
                      className="py-2 rounded-md bg-[#0A2540] text-white font-extrabold text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Checkout <Send className="w-3 h-3 text-emerald-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <PrintableQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        selectedRentals={selectedEquipmentList.map((e) => ({
          id: e.id,
          name: e.name,
          category: e.category as any,
          unitType: e.unitType,
          unitPrice: e.unitPrice,
          specs: e.specs,
          selectedQty: e.qty,
          image: e.image,
        }))}
        selectedCatering={selectedMenuList.map((m) => ({
          id: m.id,
          name: m.name,
          category: m.category as any,
          description: m.description,
          selectedPortion: m.selection.portion === "2L" ? "2L Tub" : m.selection.portion === "4L" ? "4L Tub" : m.selection.portion === "8L" ? "8L Tub" : m.selection.portion === "10L" ? "10L Tub" : "Custom Amount",
          customLitres: m.selection.customLitres,
          unitPricePerLitre: m.unitPricePerLitre,
          selectedQty: m.selection.quantity,
          image: m.image,
        }))}
        customerInfo={{
          name: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone,
          venue: contactInfo.address,
        }}
      />
    </div>
  );
};
