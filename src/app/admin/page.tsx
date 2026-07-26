"use client";

import React, { useState } from "react";
import { useApp, PipelineRentalItem, PipelineCateringItem } from "@/context/AppContext";
import { ShieldCheck, Tent, Utensils, Inbox, Plus, Trash2, CheckCircle2, Clock, Search, Lock, KeyRound, AlertTriangle } from "lucide-react";

export default function CentralAdminPage() {
  const {
    pipelineRentals,
    setPipelineRentals,
    pipelineFood,
    setPipelineFood,
    inquiries,
    updateInquiryStatus,
  } = useApp();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"inquiries" | "rentals" | "menu">("inquiries");
  const [searchQuery, setSearchQuery] = useState("");

  // Form states
  const [newRentalName, setNewRentalName] = useState("");
  const [newRentalCategory, setNewRentalCategory] = useState<PipelineRentalItem["category"]>("Canopies & Tents");
  const [newRentalSpecs, setNewRentalSpecs] = useState("");
  const [newRentalPrice, setNewRentalPrice] = useState(10000);

  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodCategory, setNewFoodCategory] = useState<PipelineCateringItem["category"]>("Signature Soups & Stews");
  const [newFoodDesc, setNewFoodDesc] = useState("");
  const [newFoodPrice, setNewFoodPrice] = useState(5500);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "1234" || passcode === "aimade2026" || passcode === "admin") {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid Manager Passcode. Please check authorization credentials.");
    }
  };

  const handleAddRental = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRentalName) return;
    const newItem: PipelineRentalItem = {
      id: `rent-${Date.now()}`,
      name: newRentalName,
      category: newRentalCategory,
      unitType: "singular",
      specs: newRentalSpecs || "Standard heavy event specification",
      unitPrice: Number(newRentalPrice),
      selectedQty: 0,
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    };
    setPipelineRentals((prev) => [newItem, ...prev]);
    setNewRentalName("");
    setNewRentalSpecs("");
  };

  const handleDeleteRental = (id: string) => {
    setPipelineRentals((prev) => prev.filter((i) => i.id !== id));
  };

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFoodName) return;
    const newItem: PipelineCateringItem = {
      id: `food-${Date.now()}`,
      name: newFoodName,
      category: newFoodCategory,
      description: newFoodDesc || "Fresh authentic recipe prepared on pre-order.",
      selectedPortion: "4L Tub",
      unitPricePerLitre: Number(newFoodPrice),
      selectedQty: 0,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    };
    setPipelineFood((prev) => [newItem, ...prev]);
    setNewFoodName("");
    setNewFoodDesc("");
  };

  const handleDeleteFood = (id: string) => {
    setPipelineFood((prev) => prev.filter((f) => f.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-950">
        <div className="max-w-md w-full p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl space-y-6 text-center text-white">
          <div className="w-16 h-16 bg-slate-800 border border-slate-700 text-emerald-400 rounded-2xl mx-auto flex items-center justify-center shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400">Restricted Access</span>
            <h2 className="font-heading font-extrabold text-2xl text-white mt-1">Manager Passcode Required</h2>
            <p className="text-xs text-slate-400 mt-1">This area is reserved strictly for designated Aimade operational leads.</p>
          </div>

          {errorMsg && (
            <div className="bg-rose-950/80 border border-rose-800 text-rose-300 p-3 rounded-xl text-xs flex items-center gap-2 text-left">
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-emerald-400" /> Enter Passcode (Default: 1234)
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white font-bold text-center text-lg tracking-widest focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-xs transition-all shadow-lg cursor-pointer"
            >
              Authenticate & Access Backoffice
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24" data-brand="admin">
      <section className="bg-slate-900 text-white py-10 px-6 sm:px-12 lg:px-16 border-b border-slate-800">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center font-bold shadow-inner">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400">Aimade Backoffice</span>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">Secured Admin Panel (CMS)</h1>
            </div>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-rose-400" /> Lock Backoffice
          </button>
        </div>
      </section>

      <section className="w-full px-6 sm:px-12 lg:px-16 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === "inquiries"
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Inbox className="w-4 h-4 text-emerald-400" />
              <span>Inquiries & Paystack Orders ({inquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("rentals")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === "rentals"
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Tent className="w-4 h-4 text-blue-400" />
              <span>Rental Inventory ({pipelineRentals.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("menu")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === "menu"
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Utensils className="w-4 h-4 text-amber-400" />
              <span>Menu Items ({pipelineFood.length})</span>
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        {/* Tab 1: Global Inquiries */}
        {activeTab === "inquiries" && (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-900 text-white font-heading text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Lead ID & Date</th>
                  <th className="py-3.5 px-4">Client Contact</th>
                  <th className="py-3.5 px-4">Dates</th>
                  <th className="py-3.5 px-4">Order Details</th>
                  <th className="py-3.5 px-4">Amount Paid</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {inquiries
                  .filter(
                    (i) =>
                      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      i.details.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {inq.id}
                        <span className="block text-[10px] font-mono text-emerald-700">{inq.paymentReference}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">{inq.name}</span>
                        <span className="text-[10px] text-slate-500 block">{inq.phone}</span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {inq.startDate} ({inq.rentalDaysCount} Days)
                      </td>
                      <td className="py-3.5 px-4 max-w-xs text-[11px] leading-tight text-slate-600">
                        {inq.details}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-slate-900">
                        ₦{inq.totalEstimatedAmount.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 w-max ${
                            inq.status === "Paid via Paystack" || inq.status === "Confirmed"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {inq.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                          className="text-[11px] font-bold border border-slate-300 rounded-lg p-1 bg-white"
                        >
                          <option value="Paid via Paystack">Paid via Paystack</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Review">In Review</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Rentals CRUD */}
        {activeTab === "rentals" && (
          <div className="space-y-6">
            <form onSubmit={handleAddRental} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="font-heading font-bold text-slate-900 text-sm flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" /> Add New Rental Item
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  type="text"
                  required
                  value={newRentalName}
                  onChange={(e) => setNewRentalName(e.target.value)}
                  placeholder="Item Name"
                  className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                />
                <select
                  value={newRentalCategory}
                  onChange={(e) => setNewRentalCategory(e.target.value as any)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  <option>Canopies & Tents</option>
                  <option>Chairs & Seating</option>
                  <option>Tables & Dining</option>
                  <option>Pots, Pans & Cookware</option>
                  <option>Stoves & Ovens</option>
                </select>
                <input
                  type="text"
                  value={newRentalSpecs}
                  onChange={(e) => setNewRentalSpecs(e.target.value)}
                  placeholder="Specs"
                  className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                />
                <input
                  type="number"
                  required
                  value={newRentalPrice}
                  onChange={(e) => setNewRentalPrice(Number(e.target.value))}
                  placeholder="Price (₦)"
                  className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold hover:bg-blue-950 cursor-pointer"
              >
                Save Rental Item
              </button>
            </form>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-900 text-white font-heading text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Item Name</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Unit Pricing Rule</th>
                    <th className="py-3.5 px-4">Rate</th>
                    <th className="py-3.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {pipelineRentals.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{item.name}</td>
                      <td className="py-3.5 px-4 text-slate-600">{item.category}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800">
                          {item.unitType === "dozen" ? "Sold in Dozens (12 chairs)" : "Singular Unit"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-slate-900">₦{item.unitPrice.toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleDeleteRental(item.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Menu CRUD */}
        {activeTab === "menu" && (
          <div className="space-y-6">
            <form onSubmit={handleAddFood} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="font-heading font-bold text-slate-900 text-sm flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" /> Add New Catering Dish
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  type="text"
                  required
                  value={newFoodName}
                  onChange={(e) => setNewFoodName(e.target.value)}
                  placeholder="Dish Name"
                  className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                />
                <select
                  value={newFoodCategory}
                  onChange={(e) => setNewFoodCategory(e.target.value as any)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  <option>Rice Specialties</option>
                  <option>Signature Soups & Stews</option>
                  <option>Proteins & Sides</option>
                </select>
                <input
                  type="text"
                  value={newFoodDesc}
                  onChange={(e) => setNewFoodDesc(e.target.value)}
                  placeholder="Description"
                  className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                />
                <input
                  type="number"
                  required
                  value={newFoodPrice}
                  onChange={(e) => setNewFoodPrice(Number(e.target.value))}
                  placeholder="Price Per Litre (₦)"
                  className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-950 cursor-pointer"
              >
                Save Catering Dish
              </button>
            </form>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-900 text-white font-heading text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Dish Name</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Rate Per Litre</th>
                    <th className="py-3.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {pipelineFood.map((dish) => (
                    <tr key={dish.id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{dish.name}</td>
                      <td className="py-3.5 px-4 text-emerald-800 font-semibold">{dish.category}</td>
                      <td className="py-3.5 px-4 font-extrabold text-slate-900">
                        ₦{dish.unitPricePerLitre.toLocaleString()} / Litre
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleDeleteFood(dish.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
