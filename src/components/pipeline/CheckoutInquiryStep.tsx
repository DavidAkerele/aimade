"use client";

import React, { useState } from "react";
import { usePipeline } from "@/context/PipelineContext";
import { motion } from "framer-motion";
import { ShieldCheck, MessageSquare, CreditCard, ChevronLeft, AlertCircle, CheckCircle2, Printer } from "lucide-react";
import { PrintableQuoteModal } from "@/components/PrintableQuoteModal";
import confetti from "canvas-confetti";

export const CheckoutInquiryStep: React.FC = () => {
  const {
    activeVertical,
    equipmentItems,
    eventsInventory,
    menuItems,
    flavorsSelections,
    startDate,
    endDate,
    rentalDaysCount,
    contactInfo,
    setContactInfo,
    grandTotal,
    setCurrentStep,
    resetPipeline,
  } = usePipeline();

  const [validationError, setValidationError] = useState("");
  const [paystackStep, setPaystackStep] = useState<"form" | "paystack" | "success">("form");
  const [paymentRef, setPaymentRef] = useState("");
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const selectedEquipmentList = equipmentItems
    .map((item) => ({ ...item, qty: eventsInventory[item.id] || 0 }))
    .filter((i) => i.qty > 0);

  const selectedMenuList = menuItems
    .map((dish) => ({ ...dish, selection: flavorsSelections[dish.id] }))
    .filter((d) => d.selection && d.selection.quantity > 0);

  // Validate contact info
  const validateForm = () => {
    if (!contactInfo.name.trim() || !contactInfo.email.trim() || !contactInfo.phone.trim()) {
      setValidationError("Full Name, Email, and Phone number are strictly required for inquiry routing.");
      return false;
    }
    setValidationError("");
    return true;
  };

  // WhatsApp Auto-Formatter Link Generator
  const generateWhatsAppLink = () => {
    if (!validateForm()) return;

    const equipmentText = selectedEquipmentList
      .map((e) => `• ${e.name} (${e.qty} ${e.unitType === "dozen" ? "Dozen" : "Units"})`)
      .join("\n");

    const cateringText = selectedMenuList
      .map((c) => `• ${c.name} [${c.selection.portion} x ${c.selection.quantity}]`)
      .join("\n");

    const message = `*NEW AIMADE ORDER INQUIRY*\n\n` +
      `*Client:* ${contactInfo.name}\n` +
      `*Phone:* ${contactInfo.phone}\n` +
      `*Email:* ${contactInfo.email}\n` +
      `*Address/Venue:* ${contactInfo.address || "Lagos"}\n` +
      `*Rental Dates:* ${startDate} to ${endDate} (${rentalDaysCount} Days)\n\n` +
      (equipmentText ? `*EQUIPMENT RENTALS:*\n${equipmentText}\n\n` : "") +
      (cateringText ? `*CATERING FOOD ORDERS:*\n${cateringText}\n\n` : "") +
      `*GRAND TOTAL:* ₦${grandTotal.toLocaleString()}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/234800246233?text=${encoded}`, "_blank");
  };

  const handlePaystackCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const ref = `PSK-${Math.floor(100000000 + Math.random() * 900000000)}`;
    setPaymentRef(ref);
    setPaystackStep("success");
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
  };

  const primaryColorClass = activeVertical === "FLAVORS" ? "bg-[#1E5631] text-white" : "bg-[#0A2540] text-white";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="w-full flex-1 flex flex-col justify-between space-y-4 overflow-hidden py-1"
    >
      <div className="space-y-1 flex-shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Step 3 of 3</span>
        <h2 className="font-heading font-extrabold text-2xl text-neutral-900">Confirm Order Details & Checkout</h2>
        <p className="text-xs text-neutral-500">Provide contact information to generate your invoice, send via WhatsApp, or pay online.</p>
      </div>

      {validationError && (
        <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-md text-xs flex items-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {paystackStep === "form" && (
        <div className="w-full flex-1 max-h-[calc(100vh-230px)] overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-4 py-1 pr-1">
          {/* Form Controls */}
          <div className="md:col-span-7 p-4 bg-white rounded-lg border border-neutral-200/80 space-y-3 shadow-xs">
            <h3 className="font-heading font-bold text-xs text-neutral-900">Client Contact Details</h3>
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={contactInfo.name}
                onChange={(e) => setContactInfo((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Chief Tunde Lawson"
                className="w-full px-3 py-1.5 text-xs rounded-md border border-neutral-200 bg-neutral-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="tunde@example.com"
                  className="w-full px-3 py-1.5 text-xs rounded-md border border-neutral-200 bg-neutral-50"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+234 803 000 0000"
                  className="w-full px-3 py-1.5 text-xs rounded-md border border-neutral-200 bg-neutral-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1">Venue Address</label>
              <input
                type="text"
                value={contactInfo.address}
                onChange={(e) => setContactInfo((prev) => ({ ...prev, address: e.target.value }))}
                placeholder="Lekki Phase 1, Lagos"
                className="w-full px-3 py-1.5 text-xs rounded-md border border-neutral-200 bg-neutral-50"
              />
            </div>
          </div>

          {/* Instant Action Panel */}
          <div className="md:col-span-5 p-4 bg-white rounded-lg border border-neutral-200/80 flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Total Amount Due</span>
              <h4 className="font-heading font-extrabold text-3xl text-neutral-900">
                ₦{grandTotal.toLocaleString()}
              </h4>
              <p className="text-[11px] text-neutral-500">Includes rental duration ({rentalDaysCount} days) & logistics.</p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={generateWhatsAppLink}
                className="w-full py-2.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Order via WhatsApp Instant
              </button>

              <button
                type="button"
                onClick={() => {
                  if (validateForm()) setPaystackStep("paystack");
                }}
                className={`w-full py-2.5 rounded-md ${primaryColorClass} font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs`}
              >
                <CreditCard className="w-3.5 h-3.5 text-emerald-400" /> Pay Online via Paystack
              </button>

              <button
                type="button"
                onClick={() => {
                  if (validateForm()) setQuoteModalOpen(true);
                }}
                className="w-full py-2 rounded-md border border-neutral-200 text-neutral-700 hover:bg-neutral-50 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" /> Printable Quote Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {paystackStep === "paystack" && (
        <form onSubmit={handlePaystackCheckout} className="p-5 bg-emerald-50 border border-emerald-200 rounded-lg space-y-4 max-w-lg mx-auto">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
            <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600" /> Paystack Secured Gateway Simulation
            </div>
            <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
              Test Mode
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-emerald-900 mb-1">Card Number</label>
              <input
                type="text"
                readOnly
                value="4084 0000 0000 1234"
                className="w-full px-3 py-2 text-xs rounded-md border border-emerald-300 bg-white font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-emerald-900 mb-1">Expiry</label>
                <input
                  type="text"
                  readOnly
                  value="12/28"
                  className="w-full px-3 py-2 text-xs rounded-md border border-emerald-300 bg-white font-mono text-center"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-emerald-900 mb-1">CVV</label>
                <input
                  type="text"
                  readOnly
                  value="419"
                  className="w-full px-3 py-2 text-xs rounded-md border border-emerald-300 bg-white font-mono text-center"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPaystackStep("form")}
              className="w-1/3 py-2.5 rounded-md border border-emerald-300 text-emerald-900 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 rounded-md bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs transition-colors cursor-pointer"
            >
              Authorize ₦{grandTotal.toLocaleString()}
            </button>
          </div>
        </form>
      )}

      {paystackStep === "success" && (
        <div className="p-6 bg-white border border-emerald-200 text-neutral-900 rounded-lg text-center space-y-3 max-w-lg mx-auto shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
          <h4 className="font-heading font-extrabold text-xl">Payment Authorized Successfully!</h4>
          <p className="text-xs text-neutral-600">
            Paystack Reference: <strong className="font-mono text-emerald-800">{paymentRef}</strong>
          </p>
          <p className="text-xs text-neutral-500">
            Thank you, {contactInfo.name}. Your order has been logged into the Aimade manager portal.
          </p>
          <button
            type="button"
            onClick={resetPipeline}
            className="px-6 py-2 rounded-md bg-neutral-900 text-white text-xs font-bold cursor-pointer"
          >
            Start New Order
          </button>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="pt-2 border-t border-neutral-200/80 flex items-center justify-between flex-shrink-0">
        <button
          onClick={() => setCurrentStep(2)}
          className="px-3.5 py-1.5 rounded-md border border-neutral-200 text-xs font-bold text-neutral-600 hover:bg-white flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Back to Catalog
        </button>
      </div>

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
    </motion.div>
  );
};
