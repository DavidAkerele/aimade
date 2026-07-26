"use client";

import React, { useState } from "react";
import { useApp, PipelineRentalItem, PipelineCateringItem } from "@/context/AppContext";
import { X, Printer, CreditCard, ShieldCheck, CheckCircle2, Calendar, MapPin, Layers } from "lucide-react";
import confetti from "canvas-confetti";

interface PrintableQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRentals: PipelineRentalItem[];
  selectedCatering: PipelineCateringItem[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    venue: string;
  };
}

export const PrintableQuoteModal: React.FC<PrintableQuoteModalProps> = ({
  isOpen,
  onClose,
  selectedRentals,
  selectedCatering,
  customerInfo,
}) => {
  const { startDate, endDate, rentalDaysCount, addInquiry, clearAllPipelineSelections } = useApp();
  const [paystackStep, setPaystackStep] = useState<"summary" | "paystack" | "success">("summary");
  const [paymentRef, setPaymentRef] = useState("");

  if (!isOpen) return null;

  // Calculate rental costs
  const rentalSubtotal = selectedRentals.reduce(
    (sum, item) => sum + item.unitPrice * item.selectedQty * rentalDaysCount,
    0
  );

  // Calculate catering costs
  const cateringSubtotal = selectedCatering.reduce((sum, item) => {
    let litres = 4;
    if (item.selectedPortion === "2L Tub") litres = 2;
    if (item.selectedPortion === "4L Tub") litres = 4;
    if (item.selectedPortion === "8L Tub") litres = 8;
    if (item.selectedPortion === "10L Tub") litres = 10;
    if (item.selectedPortion === "Custom Amount" && item.customLitres) litres = item.customLitres;

    return sum + item.unitPricePerLitre * litres * (item.selectedQty || 1);
  }, 0);

  const logisticsFee = selectedRentals.length > 0 ? 15000 : 0;
  const grandTotal = rentalSubtotal + cateringSubtotal + logisticsFee;

  const handlePrintQuote = () => {
    window.print();
  };

  const handleSimulatedPaystack = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `PSK-${Math.floor(100000000 + Math.random() * 900000000)}`;
    setPaymentRef(ref);

    const rentalDetails = selectedRentals
      .map(
        (r) =>
          `${r.name} (${r.unitType === "dozen" ? `${r.selectedQty} Dozen` : `${r.selectedQty} Units`})`
      )
      .join(", ");

    const cateringDetails = selectedCatering
      .map(
        (c) =>
          `${c.name} [${c.selectedPortion === "Custom Amount" ? `${c.customLitres}L Custom` : c.selectedPortion}]`
      )
      .join(", ");

    const combinedDetails = [
      rentalDetails ? `RENTALS (${rentalDaysCount} Days): ${rentalDetails}` : "",
      cateringDetails ? `CATERING: ${cateringDetails}` : "",
      customerInfo.venue ? `VENUE: ${customerInfo.venue}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    addInquiry({
      vertical: selectedRentals.length > 0 ? "Events" : "Flavors",
      name: customerInfo.name || "Valued Client",
      email: customerInfo.email || "client@example.com",
      phone: customerInfo.phone || "+234 800 000 0000",
      startDate,
      endDate,
      rentalDaysCount,
      details: combinedDetails,
      paymentReference: ref,
      totalEstimatedAmount: grandTotal,
    });

    setPaystackStep("success");
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 print:shadow-none print:border-none">
        {/* Printable Invoice Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 flex items-center justify-between print:bg-white print:text-slate-900 print:border-b print:pb-4">
          <div>
            <span className="font-heading font-extrabold text-2xl tracking-tight block">Aimade</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Official Quotation & Proforma Receipt
            </span>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrintQuote}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-emerald-400" /> Print Quote
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Meta Grid */}
        <div className="p-6 sm:p-8 space-y-6 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Client Name</span>
              <span className="font-bold text-slate-900">{customerInfo.name || "Valued Client"}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Phone / Contact</span>
              <span className="font-bold text-slate-900">{customerInfo.phone || "Not Specified"}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Date Range
              </span>
              <span className="font-bold text-slate-900">
                {startDate} to {endDate} ({rentalDaysCount} Days)
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Venue
              </span>
              <span className="font-bold text-slate-900">{customerInfo.venue || "Lagos, Nigeria"}</span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-slate-900 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-700" /> Itemized Quote Breakdown
            </h4>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Item Description</th>
                    <th className="py-2.5 px-3">Unit / Pricing Rule</th>
                    <th className="py-2.5 px-3">Quantity</th>
                    <th className="py-2.5 px-3">Duration</th>
                    <th className="py-2.5 px-3 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  {selectedRentals.map((r) => (
                    <tr key={r.id}>
                      <td className="py-2.5 px-3 font-semibold">{r.name}</td>
                      <td className="py-2.5 px-3 text-slate-500">
                        ₦{r.unitPrice.toLocaleString()}{" "}
                        {r.unitType === "dozen" ? "/ dozen" : "/ unit per day"}
                      </td>
                      <td className="py-2.5 px-3 font-bold">
                        {r.selectedQty} {r.unitType === "dozen" ? "Dozen" : "Units"}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">{rentalDaysCount} Days</td>
                      <td className="py-2.5 px-3 text-right font-extrabold text-slate-900">
                        ₦{(r.unitPrice * r.selectedQty * rentalDaysCount).toLocaleString()}
                      </td>
                    </tr>
                  ))}

                  {selectedCatering.map((c) => {
                    let litres = 4;
                    if (c.selectedPortion === "2L Tub") litres = 2;
                    if (c.selectedPortion === "4L Tub") litres = 4;
                    if (c.selectedPortion === "8L Tub") litres = 8;
                    if (c.selectedPortion === "10L Tub") litres = 10;
                    if (c.selectedPortion === "Custom Amount" && c.customLitres) litres = c.customLitres;

                    const itemCost = c.unitPricePerLitre * litres * (c.selectedQty || 1);

                    return (
                      <tr key={c.id}>
                        <td className="py-2.5 px-3 font-semibold">{c.name}</td>
                        <td className="py-2.5 px-3 text-emerald-800 font-medium">
                          {c.selectedPortion === "Custom Amount"
                            ? `${c.customLitres} Litres (Custom)`
                            : c.selectedPortion}
                        </td>
                        <td className="py-2.5 px-3 font-bold">{c.selectedQty || 1} Order(s)</td>
                        <td className="py-2.5 px-3 text-slate-500">Fresh Catering</td>
                        <td className="py-2.5 px-3 text-right font-extrabold text-slate-900">
                          ₦{itemCost.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}

                  {selectedRentals.length > 0 && (
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-slate-600">On-site Delivery & Logistics Setup Fee</td>
                      <td className="py-2.5 px-3 text-slate-400">Fixed Rate</td>
                      <td className="py-2.5 px-3">1</td>
                      <td className="py-2.5 px-3 text-slate-400">-</td>
                      <td className="py-2.5 px-3 text-right font-extrabold text-slate-900">₦15,000</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Grand Total Bar */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between print:bg-slate-100 print:text-slate-900 print:border">
            <span className="font-heading font-extrabold text-base">Grand Total Amount Due:</span>
            <span className="font-heading font-extrabold text-2xl text-emerald-400 print:text-slate-900">
              ₦{grandTotal.toLocaleString()}
            </span>
          </div>

          {/* Paystack Simulation / Confirmation Action */}
          {paystackStep === "summary" && (
            <div className="pt-2 flex flex-col sm:flex-row gap-3 print:hidden">
              <button
                type="button"
                onClick={handlePrintQuote}
                className="w-full sm:w-1/2 py-3 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print / Save PDF Invoice
              </button>
              <button
                type="button"
                onClick={() => setPaystackStep("paystack")}
                className="w-full sm:w-1/2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <CreditCard className="w-4 h-4" /> Pay ₦{grandTotal.toLocaleString()} via Paystack
              </button>
            </div>
          )}

          {paystackStep === "paystack" && (
            <form onSubmit={handleSimulatedPaystack} className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4 print:hidden">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" /> Paystack Secured Gateway Simulation
                </div>
                <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                  Test Gateway
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-emerald-900 mb-1">Simulated Card Number</label>
                  <input
                    type="text"
                    readOnly
                    value="4084 0000 0000 1234"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-300 bg-white font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-emerald-900 mb-1">Expiry</label>
                    <input
                      type="text"
                      readOnly
                      value="12/28"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-300 bg-white font-mono text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-emerald-900 mb-1">CVV</label>
                    <input
                      type="text"
                      readOnly
                      value="419"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-300 bg-white font-mono text-center"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs transition-colors cursor-pointer"
              >
                Authorize ₦{grandTotal.toLocaleString()} Paystack Payment
              </button>
            </form>
          )}

          {paystackStep === "success" && (
            <div className="p-6 bg-emerald-100 border border-emerald-300 text-emerald-950 rounded-2xl text-center space-y-3 print:hidden">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="font-heading font-extrabold text-xl">Payment Successful!</h4>
              <p className="text-xs">
                Paystack Payment Reference: <strong className="font-mono">{paymentRef}</strong>
              </p>
              <p className="text-xs text-emerald-800">
                Your order has been logged into the Aimade backoffice. Our logistics team will contact you shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  clearAllPipelineSelections();
                  onClose();
                  setPaystackStep("summary");
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
              >
                Close & Return to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
