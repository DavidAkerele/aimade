"use client";

import React, { useState } from "react";
import { useApp, PipelineRentalItem, PipelineCateringItem } from "@/context/AppContext";
import { Tent, Utensils, Heart, ChevronRight, ChevronLeft, Plus, Minus, Calendar, MapPin, Printer, CreditCard, ShieldCheck, AlertCircle } from "lucide-react";
import { PrintableQuoteModal } from "@/components/PrintableQuoteModal";
import Link from "next/link";

export const PipelineWizard: React.FC = () => {
  const {
    activeBrand,
    setActiveBrand,
    pipelineRentals,
    setPipelineRentals,
    pipelineFood,
    setPipelineFood,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    rentalDaysCount,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedService, setSelectedService] = useState<"events" | "flavors" | "foundation">("events");

  // Customer contact info
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [formValidationError, setFormValidationError] = useState("");

  // Modal toggle
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const categories = [
    "Canopies & Tents",
    "Chairs & Seating",
    "Tables & Dining",
    "Pots, Pans & Cookware",
    "Stoves & Ovens",
  ];

  const handleQtyChange = (id: string, delta: number) => {
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

  const handleFoodPortionChange = (id: string, portion: PipelineCateringItem["selectedPortion"]) => {
    setPipelineFood((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selectedPortion: portion } : item))
    );
  };

  const handleCustomLitresChange = (id: string, litres: number) => {
    setPipelineFood((prev) =>
      prev.map((item) => (item.id === id ? { ...item, customLitres: Math.max(1, litres) } : item))
    );
  };

  const selectedRentalsList = pipelineRentals.filter((i) => i.selectedQty > 0);
  const selectedFoodList = pipelineFood.filter((i) => i.selectedQty > 0);

  // Calculate live estimate
  const rentalSubtotal = selectedRentalsList.reduce(
    (sum, item) => sum + item.unitPrice * item.selectedQty * rentalDaysCount,
    0
  );

  const cateringSubtotal = selectedFoodList.reduce((sum, item) => {
    let litres = 4;
    if (item.selectedPortion === "2L Tub") litres = 2;
    if (item.selectedPortion === "4L Tub") litres = 4;
    if (item.selectedPortion === "8L Tub") litres = 8;
    if (item.selectedPortion === "10L Tub") litres = 10;
    if (item.selectedPortion === "Custom Amount" && item.customLitres) litres = item.customLitres;

    return sum + item.unitPricePerLitre * litres * (item.selectedQty || 1);
  }, 0);

  const logisticsFee = selectedRentalsList.length > 0 ? 15000 : 0;
  const totalEstimate = rentalSubtotal + cateringSubtotal + logisticsFee;

  // Validate contact info before opening modal
  const handleProceedToCheckout = () => {
    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      setFormValidationError("Please enter your Full Name, Email, and Phone number before proceeding.");
      return;
    }
    setFormValidationError("");
    setQuoteModalOpen(true);
  };

  // Dynamic Theme Palette based on Active Branch
  const getThemeClasses = () => {
    if (activeBrand === "events" || selectedService === "events") {
      return {
        accentBg: "bg-blue-600 hover:bg-blue-700",
        accentText: "text-blue-700",
        accentLightBg: "bg-blue-50 text-blue-900 border-blue-200",
        activeStep: "bg-blue-600 text-white shadow-sm",
        badge: "bg-blue-100 text-blue-800",
        primaryButton: "bg-blue-700 hover:bg-blue-800 text-white",
      };
    }
    if (activeBrand === "flavors" || selectedService === "flavors") {
      return {
        accentBg: "bg-emerald-600 hover:bg-emerald-700",
        accentText: "text-emerald-700",
        accentLightBg: "bg-emerald-50 text-emerald-900 border-emerald-200",
        activeStep: "bg-emerald-600 text-white shadow-sm",
        badge: "bg-emerald-100 text-emerald-800",
        primaryButton: "bg-emerald-700 hover:bg-emerald-800 text-white",
      };
    }
    return {
      accentBg: "bg-purple-600 hover:bg-purple-700",
      accentText: "text-purple-700",
      accentLightBg: "bg-purple-50 text-purple-900 border-purple-200",
      activeStep: "bg-purple-600 text-white shadow-sm",
      badge: "bg-purple-100 text-purple-800",
      primaryButton: "bg-purple-700 hover:bg-purple-800 text-white",
    };
  };

  const theme = getThemeClasses();

  return (
    <div className="w-full h-screen max-h-screen overflow-hidden px-6 sm:px-12 lg:px-16 py-4 flex flex-col justify-between bg-[#F8F9FA] text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Top Header Row - Fixed Height */}
      <div className="w-full flex items-center justify-between py-2 border-b border-slate-200 flex-shrink-0">
        <Link href="/" className="font-heading font-extrabold text-2xl tracking-tight text-slate-900">
          Aimade
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors font-medium"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Manager Portal
          </Link>
          <div className="text-xs font-bold text-slate-900 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            Estimate: <span className={`font-extrabold ${theme.accentText}`}>₦{totalEstimate.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Stepper Navigation Bar - Fixed Height */}
      <div className="w-full py-2 border-b border-slate-200/80 flex items-center justify-between overflow-x-auto gap-2 flex-shrink-0">
        {[
          { number: 1, label: "1. Service Track" },
          { number: 2, label: "2. Equipment Items" },
          { number: 3, label: "3. Rental Dates" },
          { number: 4, label: "4. Catering Orders" },
          { number: 5, label: "5. Invoice & Paystack" },
        ].map((s) => (
          <button
            key={s.number}
            onClick={() => setStep(s.number as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              step === s.number
                ? `${theme.activeStep}`
                : step > s.number
                ? "text-slate-800 bg-white border border-slate-200"
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* STEP 1: OFF-WHITE FULL-PAGE SERVICE SELECTION */}
      {step === 1 && (
        <div className="w-full flex-1 flex flex-col justify-between py-4 overflow-hidden">
          <div className="space-y-1.5 flex-shrink-0">
            <span className={`text-[11px] font-bold uppercase tracking-widest ${theme.accentText}`}>Step 1 of 5</span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              What service do you need today?
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Aimade operates across three specialized branches. Select your primary service to apply its custom theme and questionnaire.
            </p>
          </div>

          {/* Full-Width Service Cards - Scaled to fit screen */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 py-2 flex-1 max-h-[calc(100vh-230px)] overflow-y-auto">
            {/* Events */}
            <div
              onClick={() => {
                setSelectedService("events");
                setActiveBrand("events");
              }}
              className={`w-full rounded-2xl bg-white border overflow-hidden transition-all cursor-pointer flex flex-col justify-between shadow-xs ${
                selectedService === "events"
                  ? "border-blue-600 ring-2 ring-blue-600/30"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="h-44 w-full bg-slate-100 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80"
                  alt="Aimade Events"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-blue-900 text-white text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1">
                  <Tent className="w-3.5 h-3.5" /> Aimade Events
                </div>
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-slate-900">Aimade Events & Rentals</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    Heavy-duty 20x20ft canopies, Chiavari chairs (by dozens), banquet tables, 100L/200L cooking pots, pans, big spoons, turning sticks & gas stoves.
                  </p>
                </div>
              </div>
            </div>

            {/* Flavors */}
            <div
              onClick={() => {
                setSelectedService("flavors");
                setActiveBrand("flavors");
              }}
              className={`w-full rounded-2xl bg-white border overflow-hidden transition-all cursor-pointer flex flex-col justify-between shadow-xs ${
                selectedService === "flavors"
                  ? "border-emerald-600 ring-2 ring-emerald-600/30"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="h-44 w-full bg-slate-100 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800&q=80"
                  alt="Aimade Flavors"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-emerald-900 text-white text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5" /> Aimade Flavors
                </div>
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-slate-900">Aimade Flavors Catering</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    Authentic Nigerian Jollof rice, Afang soup, green pepper Ayamasi & Ewa Aganyin by 2L, 4L, 8L, 10L or custom litres.
                  </p>
                </div>
              </div>
            </div>

            {/* Foundation */}
            <div
              onClick={() => {
                setSelectedService("foundation");
                setActiveBrand("foundation");
              }}
              className={`w-full rounded-2xl bg-white border overflow-hidden transition-all cursor-pointer flex flex-col justify-between shadow-xs ${
                selectedService === "foundation"
                  ? "border-purple-600 ring-2 ring-purple-600/30"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="h-44 w-full bg-slate-100 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
                  alt="Aimade Care Foundation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-purple-900 text-white text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" /> Care Foundation
                </div>
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-slate-900">Aimade Care Foundation</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    Empowering vulnerable young females, displaced girls & widows through practical vocational skill bootcamps.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end flex-shrink-0">
            <button
              onClick={() => setStep(2)}
              className={`px-8 py-3 rounded-xl ${theme.primaryButton} font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm`}
            >
              <span>Continue to Equipment Selections</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: OFF-WHITE EQUIPMENT SELECTION */}
      {step === 2 && (
        <div className="w-full flex-1 flex flex-col justify-between py-3 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 flex-shrink-0">
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${theme.accentText}`}>Step 2 of 5</span>
              <h2 className="font-heading font-extrabold text-2xl text-slate-900">Select Equipment to Rent</h2>
              <p className="text-xs text-slate-500">Chairs are priced per dozen (12 chairs). Tables, pots, pans, big spoons & stoves are singular.</p>
            </div>

            <div className="bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
              {selectedRentalsList.length} Items Selected
            </div>
          </div>

          {/* Internal Scroll Panel for Items */}
          <div className="w-full flex-1 max-h-[calc(100vh-210px)] overflow-y-auto space-y-6 py-3 pr-1">
            {categories.map((cat) => {
              const catItems = pipelineRentals.filter((i) => i.category === cat);
              if (catItems.length === 0) return null;

              return (
                <div key={cat} className="space-y-3">
                  <h3 className="font-heading font-bold text-[11px] uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded-md w-max border border-slate-200 shadow-xs">
                    {cat}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catItems.map((item) => (
                      <div
                        key={item.id}
                        className={`rounded-2xl bg-white border overflow-hidden transition-all flex items-center p-3 gap-3 shadow-xs ${
                          item.selectedQty > 0
                            ? "border-blue-600 ring-1 ring-blue-600/30"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {/* Compact 80px Thumbnail */}
                        <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="font-heading font-bold text-xs text-slate-900 truncate">{item.name}</h4>
                          <p className="text-[10px] text-slate-500 truncate">{item.specs}</p>

                          <div className="flex items-center justify-between pt-1">
                            <span className="font-heading font-extrabold text-xs text-slate-900">
                              ₦{item.unitPrice.toLocaleString()}{" "}
                              <span className="text-[9px] font-normal text-slate-400">
                                {item.unitType === "dozen" ? "/ dozen" : "/ unit"}
                              </span>
                            </span>

                            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                              <button
                                type="button"
                                onClick={() => handleQtyChange(item.id, -1)}
                                className="p-1 rounded text-slate-600 hover:bg-white cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-slate-900 px-1">
                                {item.selectedQty} {item.unitType === "dozen" ? "Doz" : "Qty"}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleQtyChange(item.id, 1)}
                                className="p-1 rounded text-slate-600 hover:bg-white cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              className={`px-7 py-3 rounded-xl ${theme.primaryButton} text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm`}
            >
              <span>Set Rental Duration Dates</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: OFF-WHITE RENTAL DATES */}
      {step === 3 && (
        <div className="w-full flex-1 flex flex-col justify-between py-4 max-w-2xl mx-auto overflow-hidden">
          <div className="text-center space-y-2 flex-shrink-0">
            <span className={`text-[11px] font-bold uppercase tracking-widest ${theme.accentText}`}>Step 3 of 5</span>
            <h2 className="font-heading font-extrabold text-3xl text-slate-900">Select Rental Date Duration</h2>
            <p className="text-xs text-slate-500">Pick start & end dates. Daily rental rates multiply automatically.</p>
          </div>

          <div className="w-full space-y-6 py-6">
            <div className="grid grid-cols-2 gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-600" /> Start Date *
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-600" /> End Date *
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-bold"
                />
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl text-center shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block">Total Duration Multiplier:</span>
              <span className="font-heading font-extrabold text-3xl text-slate-900 block mt-1">
                {rentalDaysCount} Day(s)
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(4)}
              className={`px-7 py-3 rounded-xl ${theme.primaryButton} text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm`}
            >
              <span>Continue to Catering Add-ons</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: OFF-WHITE CATERING ADD-ONS */}
      {step === 4 && (
        <div className="w-full flex-1 flex flex-col justify-between py-3 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 flex-shrink-0">
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${theme.accentText}`}>Step 4 of 5</span>
              <h2 className="font-heading font-extrabold text-2xl text-slate-900">Optional Catering Food Orders</h2>
              <p className="text-xs text-slate-500">Order 2L, 4L, 8L, 10L tubs or specify custom litres needed.</p>
            </div>
          </div>

          <div className="w-full flex-1 max-h-[calc(100vh-210px)] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 py-3 pr-1">
            {pipelineFood.map((food) => (
              <div
                key={food.id}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden flex items-center p-3 gap-4 shadow-xs"
              >
                {/* Dish Photo Thumbnail */}
                <div className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div>
                    <h4 className="font-heading font-bold text-xs text-slate-900 truncate">{food.name}</h4>
                    <p className="text-[10px] text-slate-500 truncate">{food.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={food.selectedPortion}
                      onChange={(e) => handleFoodPortionChange(food.id, e.target.value as any)}
                      className="px-2.5 py-1 text-xs rounded-lg border border-slate-300 bg-slate-50 font-medium text-slate-800"
                    >
                      <option value="2L Tub">2L Tub</option>
                      <option value="4L Tub">4L Tub</option>
                      <option value="8L Tub">8L Tub</option>
                      <option value="10L Tub">10L Tub</option>
                      <option value="Custom Amount">Custom Litres...</option>
                    </select>

                    {food.selectedPortion === "Custom Amount" && (
                      <input
                        type="number"
                        min={1}
                        value={food.customLitres || 12}
                        onChange={(e) => handleCustomLitresChange(food.id, Number(e.target.value))}
                        className="w-16 px-2 py-1 text-xs rounded-lg border border-slate-300 bg-white font-bold"
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <span className="font-heading font-extrabold text-xs text-slate-900">
                      ₦{food.unitPricePerLitre.toLocaleString()} / L
                    </span>

                    <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                      <button
                        type="button"
                        onClick={() => handleFoodQtyChange(food.id, -1)}
                        className="p-1 rounded text-slate-600 hover:bg-white cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-900 px-1">{food.selectedQty}</span>
                      <button
                        type="button"
                        onClick={() => handleFoodQtyChange(food.id, 1)}
                        className="p-1 rounded text-slate-600 hover:bg-white cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
            <button
              onClick={() => setStep(3)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(5)}
              className={`px-7 py-3 rounded-xl ${theme.primaryButton} text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm`}
            >
              <span>Review Invoice & Paystack</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: OFF-WHITE MANDATORY CONTACT VALIDATION & PAYSTACK */}
      {step === 5 && (
        <div className="w-full flex-1 flex flex-col justify-between py-3 overflow-hidden">
          <div className="text-center space-y-1.5 flex-shrink-0">
            <span className={`text-[11px] font-bold uppercase tracking-widest ${theme.accentText}`}>Step 5 of 5</span>
            <h2 className="font-heading font-extrabold text-3xl text-slate-900">
              Printable Invoice & Paystack Checkout
            </h2>
            <p className="text-xs text-slate-500">Please provide your contact details first so our team can reach you regarding delivery.</p>
          </div>

          {formValidationError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs flex items-center gap-2 font-medium my-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{formValidationError}</span>
            </div>
          )}

          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 py-2 flex-1 max-h-[calc(100vh-230px)] overflow-y-auto">
            {/* Contact Form */}
            <div className="md:col-span-7 p-6 bg-white rounded-2xl border border-slate-200 space-y-4 shadow-xs">
              <h3 className="font-heading font-bold text-sm text-slate-900">Required Contact Information</h3>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Chief Tunde Lawson"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="tunde@example.com"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+234 803 000 0000"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Event Venue Address</label>
                <input
                  type="text"
                  value={eventVenue}
                  onChange={(e) => setEventVenue(e.target.value)}
                  placeholder="Lekki Phase 1, Lagos"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium"
                />
              </div>
            </div>

            {/* Total Box */}
            <div className="md:col-span-5 p-6 bg-slate-900 text-white rounded-2xl flex flex-col justify-between space-y-6 shadow-md">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Calculated Grand Total</span>
                <h4 className="font-heading font-extrabold text-4xl text-emerald-400">
                  ₦{totalEstimate.toLocaleString()}
                </h4>
                <div className="space-y-1 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <p>• {selectedRentalsList.length} Equipment Rental Items ({rentalDaysCount} Days)</p>
                  <p>• {selectedFoodList.length} Catering Orders</p>
                  <p>• Logistics Setup Included</p>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" /> Generate Printable Quote / Paystack Checkout
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
            <button
              onClick={() => setStep(4)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          </div>
        </div>
      )}

      {/* Printable Quote & Paystack Modal */}
      <PrintableQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        selectedRentals={selectedRentalsList}
        selectedCatering={selectedFoodList}
        customerInfo={{
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          venue: eventVenue,
        }}
      />
    </div>
  );
};
