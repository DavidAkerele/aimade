"use client";

import React, { useState } from "react";
import { usePipeline, EquipmentItem, DishItem } from "@/context/PipelineContext";
import {
  ShieldCheck,
  Lock,
  Search,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  Tent,
  Utensils,
  CheckCircle2,
  Package,
  Layout,
  ArrowLeft,
  ExternalLink,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";

interface MockLead {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  vertical: "EVENTS" | "FLAVORS" | "BOTH";
  subtotal: number;
  status: "PAID_PAYSTACK" | "CONFIRMED" | "PENDING" | "DELIVERED";
  timestamp: string;
  reference: string;
  details: string;
}

const INITIAL_MOCK_LEADS: MockLead[] = [
  {
    id: "lead-101",
    customerName: "Chief Adewale Adeleke",
    email: "adewale.a@gmail.com",
    phone: "+234 803 445 9912",
    vertical: "EVENTS",
    subtotal: 245000,
    status: "PAID_PAYSTACK",
    timestamp: "2026-07-26 14:32",
    reference: "PSK-991823-LKG",
    details: "2x 20x20ft Canopies, 10 Doz Gold Chiavari Chairs, 4 Round Banquet Tables",
  },
  {
    id: "lead-102",
    customerName: "Dr. Florence Nkem",
    email: "florence.nkem@health.ng",
    phone: "+234 809 112 3344",
    vertical: "FLAVORS",
    subtotal: 135000,
    status: "CONFIRMED",
    timestamp: "2026-07-26 11:15",
    reference: "PSK-441209-ABJ",
    details: "2x 4L Firewood Jollof Rice, 1x 8L Authentic Afang Soup",
  },
  {
    id: "lead-103",
    customerName: "Mrs. Funmi Oladipo",
    email: "funmi.oladipo@yahoo.com",
    phone: "+234 812 990 0011",
    vertical: "BOTH",
    subtotal: 310000,
    status: "PAID_PAYSTACK",
    timestamp: "2026-07-25 18:40",
    reference: "PSK-881200-LKS",
    details: "1x 20x40ft Marquee, 100L Cooking Drum + 4L Ayamasi Stew & 4L Jollof",
  },
];

export default function AdminCMSPage() {
  const {
    equipmentItems,
    updateEquipmentItem,
    addEquipmentItem,
    deleteEquipmentItem,
    menuItems,
    updateDishItem,
    addDishItem,
    deleteDishItem,
    landingSettings,
    setLandingSettings,
  } = usePipeline();

  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passError, setPassError] = useState("");

  const [activeTab, setActiveTab] = useState<"LEADS" | "EQUIPMENT" | "CATERING" | "LANDING">("LEADS");
  const [leads, setLeads] = useState<MockLead[]>(INITIAL_MOCK_LEADS);
  const [searchQuery, setSearchQuery] = useState("");

  // Edit Modals State
  const [editingEq, setEditingEq] = useState<EquipmentItem | null>(null);
  const [newEqModal, setNewEqModal] = useState(false);
  const [newEqForm, setNewEqForm] = useState<Omit<EquipmentItem, "id">>({
    name: "",
    category: "Canopies & Tents",
    unitType: "singular",
    unitPrice: 10000,
    specs: "",
    image: "",
    active: true,
  });

  const [editingDish, setEditingDish] = useState<DishItem | null>(null);
  const [newDishModal, setNewDishModal] = useState(false);
  const [newDishForm, setNewDishForm] = useState<Omit<DishItem, "id">>({
    name: "",
    category: "Rice Specialties",
    description: "",
    unitPricePerLitre: 5000,
    image: "",
    active: true,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "1234" || passcode === "aimade2026") {
      setAuthenticated(true);
      setPassError("");
    } else {
      setPassError("Invalid passcode. Try '1234'.");
    }
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.reference.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const defaultImg = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80";

  if (!authenticated) {
    return (
      <div className="w-full min-h-screen bg-[#0A2540] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-neutral-900 border border-neutral-200">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-50 text-[#0A2540] rounded-2xl flex items-center justify-center mx-auto border border-blue-100 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-[#0A2540]">
              Aimade Manager Portal
            </h1>
            <p className="text-xs text-neutral-500 font-medium">Administrative CMS Login</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 mb-1">
                Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (1234)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 font-bold text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#0A2540]"
                />
                <Lock className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3" />
              </div>
              {passError && <p className="text-[10px] font-bold text-red-500 mt-1">{passError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0A2540] hover:bg-[#06182B] text-white text-xs font-extrabold transition-colors cursor-pointer shadow-md"
            >
              Access Dashboard
            </button>
          </form>

          <div className="pt-4 border-t border-neutral-100 text-center">
            <Link href="/" className="text-xs text-neutral-500 font-bold hover:text-neutral-900 inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Customer App
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-neutral-900 font-sans flex flex-col">
      {/* Sticky Top Admin Header */}
      <div className="w-full bg-[#0A2540] text-white py-3 px-4 sm:px-6 border-b border-blue-900 flex items-center justify-between flex-shrink-0 shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Aimade CMS
          </Link>
          <span className="bg-blue-950/80 text-blue-200 text-[9px] font-bold px-2 py-0.5 rounded-full border border-blue-800 hidden sm:inline-block">
            Manager Mode
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white flex items-center gap-1 transition-colors"
          >
            <span className="hidden sm:inline">Live Site</span> <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setAuthenticated(false)}
            className="px-2.5 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-[11px] font-bold text-white transition-colors cursor-pointer"
          >
            Lock
          </button>
        </div>
      </div>

      {/* Sticky Admin Navigation Tabs Bar */}
      <div className="w-full bg-white border-b border-neutral-200/80 px-3 sm:px-6 py-2 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none flex-shrink-0 sticky top-[49px] z-20 shadow-2xs">
        <button
          onClick={() => setActiveTab("LEADS")}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "LEADS"
              ? "bg-[#0A2540] text-white shadow-xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Package className="w-3.5 h-3.5 text-emerald-400" /> Leads ({leads.length})
        </button>

        <button
          onClick={() => setActiveTab("EQUIPMENT")}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "EQUIPMENT"
              ? "bg-[#0A2540] text-white shadow-xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Tent className="w-3.5 h-3.5 text-blue-300" /> Rentals CMS ({equipmentItems.length})
        </button>

        <button
          onClick={() => setActiveTab("CATERING")}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "CATERING"
              ? "bg-[#1E5631] text-white shadow-xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Utensils className="w-3.5 h-3.5 text-emerald-300" /> Menu CMS ({menuItems.length})
        </button>

        <button
          onClick={() => setActiveTab("LANDING")}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "LANDING"
              ? "bg-purple-900 text-white shadow-xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Layout className="w-3.5 h-3.5 text-purple-300" /> Landing CMS
        </button>
      </div>

      {/* Main Content Area - Natural Document Vertical Flow */}
      <div className="w-full max-w-6xl mx-auto flex-1 p-3 sm:p-6 pb-24">
        {/* TAB 1: CUSTOMER ORDERS & PAYSTACK LEADS */}
        {activeTab === "LEADS" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
              <div>
                <h2 className="font-heading font-extrabold text-base sm:text-lg text-[#0A2540]">Customer Leads & Paystack Receipts</h2>
                <p className="text-[11px] text-neutral-500">Real-time incoming event inquiries & payments</p>
              </div>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search client, email..."
                  className="w-full px-3 py-2 pl-8 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 focus:outline-hidden"
                />
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Mobile Card Layout for Leads */}
            <div className="block sm:hidden space-y-3">
              {filteredLeads.map((lead) => (
                <div key={lead.id} className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-xs space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-extrabold text-neutral-900">{lead.customerName}</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 text-emerald-800 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {lead.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-neutral-500 text-[11px]">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-neutral-400" /> {lead.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-neutral-400" /> {lead.phone}
                    </div>
                  </div>

                  <div className="p-2.5 bg-neutral-50 rounded-xl text-[11px] text-neutral-700 font-medium">
                    {lead.details}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-neutral-100 font-extrabold text-neutral-900">
                    <span className="text-[10px] text-neutral-400 font-mono">{lead.reference}</span>
                    <span className="text-[#0A2540] text-sm">₦{lead.subtotal.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 border-b border-neutral-200 text-[10px] uppercase font-extrabold text-neutral-500 tracking-wider">
                    <tr>
                      <th className="p-3.5">Client</th>
                      <th className="p-3.5">Vertical</th>
                      <th className="p-3.5">Items</th>
                      <th className="p-3.5">Total</th>
                      <th className="p-3.5">Reference</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-neutral-50/80">
                        <td className="p-3.5">
                          <span className="font-heading font-bold text-neutral-900 block text-xs">{lead.customerName}</span>
                          <span className="text-[10px] text-neutral-400 block">{lead.email}</span>
                          <span className="text-[10px] text-neutral-500 font-mono">{lead.phone}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-[#0A2540]">
                            {lead.vertical}
                          </span>
                        </td>
                        <td className="p-3.5 max-w-xs text-neutral-700">{lead.details}</td>
                        <td className="p-3.5 font-bold text-neutral-900">₦{lead.subtotal.toLocaleString()}</td>
                        <td className="p-3.5 font-mono text-[10px] text-neutral-500">{lead.reference}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EQUIPMENT RENTALS INVENTORY CMS */}
        {activeTab === "EQUIPMENT" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-3.5 sm:p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
              <div>
                <h2 className="font-heading font-extrabold text-base sm:text-lg text-[#0A2540]">Equipment Rentals CMS</h2>
                <p className="text-[11px] text-neutral-500">Edit rates, specs, and image URLs live</p>
              </div>

              <button
                onClick={() => setNewEqModal(true)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#0A2540] hover:bg-[#06182B] text-white text-xs font-extrabold flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" /> <span className="hidden sm:inline">Add Equipment</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {equipmentItems.map((item) => (
                <div key={item.id} className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-xs flex gap-3">
                  <div className="w-18 h-18 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image || defaultImg}
                      onError={(e) => {
                        e.currentTarget.src = defaultImg;
                      }}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-bold text-xs sm:text-sm text-[#0A2540] truncate">{item.name}</h3>
                      <button
                        onClick={() => setEditingEq(item)}
                        className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 cursor-pointer flex-shrink-0"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>

                    <p className="text-[10px] text-neutral-400 font-medium truncate">{item.specs}</p>

                    <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
                      <span className="font-heading font-extrabold text-xs text-neutral-900">
                        ₦{item.unitPrice.toLocaleString()}{" "}
                        <span className="text-[9px] font-normal text-neutral-400">
                          {item.unitType === "dozen" ? "/ doz" : "/ unit"}
                        </span>
                      </span>

                      <button
                        onClick={() => deleteEquipmentItem(item.id)}
                        className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CULINARY MENU CMS */}
        {activeTab === "CATERING" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-3.5 sm:p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
              <div>
                <h2 className="font-heading font-extrabold text-base sm:text-lg text-[#1E5631]">Culinary Menu CMS</h2>
                <p className="text-[11px] text-neutral-500">Edit dishes, descriptions, rates, and image URLs</p>
              </div>

              <button
                onClick={() => setNewDishModal(true)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#1E5631] hover:bg-[#143B21] text-white text-xs font-extrabold flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-300" /> <span className="hidden sm:inline">Add Dish</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {menuItems.map((dish) => (
                <div key={dish.id} className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-xs flex gap-3">
                  <div className="w-18 h-18 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={dish.image || defaultImg}
                      onError={(e) => {
                        e.currentTarget.src = defaultImg;
                      }}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-bold text-xs sm:text-sm text-[#1E5631] truncate">{dish.name}</h3>
                      <button
                        onClick={() => setEditingDish(dish)}
                        className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 cursor-pointer flex-shrink-0"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>

                    <p className="text-[10px] text-neutral-400 font-medium truncate">{dish.description}</p>

                    <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
                      <span className="font-heading font-extrabold text-xs text-neutral-900">
                        ₦{dish.unitPricePerLitre.toLocaleString()} / L
                      </span>

                      <button
                        onClick={() => deleteDishItem(dish.id)}
                        className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LANDING SPLIT PAGE CONTENT CMS */}
        {activeTab === "LANDING" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
              <h2 className="font-heading font-extrabold text-base sm:text-lg text-purple-900">Landing Split Card CMS</h2>
              <p className="text-[11px] text-neutral-500">Edit titles, descriptions, and background image URLs live</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Aimade Events Landing Content */}
              <div className="bg-white p-4 sm:p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3 text-xs">
                <div className="flex items-center gap-2">
                  <Tent className="w-4 h-4 text-[#0A2540]" />
                  <h3 className="font-heading font-extrabold text-sm text-[#0A2540]">Aimade Events Split</h3>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-neutral-500 mb-1">Title</label>
                  <input
                    type="text"
                    value={landingSettings.eventsTitle}
                    onChange={(e) => setLandingSettings((prev) => ({ ...prev, eventsTitle: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-neutral-500 mb-1">Subtitle</label>
                  <textarea
                    rows={2}
                    value={landingSettings.eventsSubtitle}
                    onChange={(e) => setLandingSettings((prev) => ({ ...prev, eventsSubtitle: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-neutral-500 mb-1">Background Image URL</label>
                  <input
                    type="text"
                    value={landingSettings.eventsImage}
                    onChange={(e) => setLandingSettings((prev) => ({ ...prev, eventsImage: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 font-mono text-[10px]"
                  />
                </div>
              </div>

              {/* Aimade Flavors Landing Content */}
              <div className="bg-white p-4 sm:p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3 text-xs">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#1E5631]" />
                  <h3 className="font-heading font-extrabold text-sm text-[#1E5631]">Aimade Flavors Split</h3>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-neutral-500 mb-1">Title</label>
                  <input
                    type="text"
                    value={landingSettings.flavorsTitle}
                    onChange={(e) => setLandingSettings((prev) => ({ ...prev, flavorsTitle: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-neutral-500 mb-1">Subtitle</label>
                  <textarea
                    rows={2}
                    value={landingSettings.flavorsSubtitle}
                    onChange={(e) => setLandingSettings((prev) => ({ ...prev, flavorsSubtitle: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-neutral-500 mb-1">Background Image URL</label>
                  <input
                    type="text"
                    value={landingSettings.flavorsImage}
                    onChange={(e) => setLandingSettings((prev) => ({ ...prev, flavorsImage: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 font-mono text-[10px]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* EDIT EQUIPMENT INLINE MODAL */}
      {editingEq && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-heading font-extrabold text-base text-[#0A2540]">Edit Equipment Item</h3>
              <button onClick={() => setEditingEq(null)} className="p-1 text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">Name</label>
                <input
                  type="text"
                  value={editingEq.name}
                  onChange={(e) => setEditingEq({ ...editingEq, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 mb-1">Unit Rate (₦)</label>
                  <input
                    type="number"
                    value={editingEq.unitPrice}
                    onChange={(e) => setEditingEq({ ...editingEq, unitPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 mb-1">Pricing Unit</label>
                  <select
                    value={editingEq.unitType}
                    onChange={(e) => setEditingEq({ ...editingEq, unitType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 font-bold"
                  >
                    <option value="singular">Singular (unit)</option>
                    <option value="dozen">Dozen (12 pcs)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">Specifications</label>
                <input
                  type="text"
                  value={editingEq.specs}
                  onChange={(e) => setEditingEq({ ...editingEq, specs: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingEq.image}
                  onChange={(e) => setEditingEq({ ...editingEq, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 font-mono text-[10px]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
              <button
                onClick={() => setEditingEq(null)}
                className="px-4 py-2 rounded-xl border border-neutral-200 font-bold text-neutral-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateEquipmentItem(editingEq.id, editingEq);
                  setEditingEq(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#0A2540] text-white text-xs font-extrabold flex items-center gap-1"
              >
                <Save className="w-3.5 h-3.5 text-emerald-400" /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW EQUIPMENT MODAL */}
      {newEqModal && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-heading font-extrabold text-base text-[#0A2540]">Add New Equipment</h3>
              <button onClick={() => setNewEqModal(false)} className="p-1 text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">Equipment Name</label>
                <input
                  type="text"
                  value={newEqForm.name}
                  onChange={(e) => setNewEqForm({ ...newEqForm, name: e.target.value })}
                  placeholder="e.g. VIP Air Cooler Fan"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 mb-1">Category</label>
                  <select
                    value={newEqForm.category}
                    onChange={(e) => setNewEqForm({ ...newEqForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 font-bold"
                  >
                    <option value="Canopies & Tents">Canopies & Tents</option>
                    <option value="Chairs & Seating">Chairs & Seating</option>
                    <option value="Tables & Dining">Tables & Dining</option>
                    <option value="Cookware & Utensils">Cookware & Utensils</option>
                    <option value="Stoves & Ovens">Stoves & Ovens</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 mb-1">Unit Rate (₦)</label>
                  <input
                    type="number"
                    value={newEqForm.unitPrice}
                    onChange={(e) => setNewEqForm({ ...newEqForm, unitPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newEqForm.image}
                  onChange={(e) => setNewEqForm({ ...newEqForm, image: e.target.value })}
                  placeholder="/images/canopy-20x20.png or https://..."
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 font-mono text-[10px]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
              <button
                onClick={() => setNewEqModal(false)}
                className="px-4 py-2 rounded-xl border border-neutral-200 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newEqForm.name) {
                    addEquipmentItem(newEqForm);
                    setNewEqModal(false);
                  }
                }}
                className="px-5 py-2 rounded-xl bg-[#0A2540] text-white font-extrabold flex items-center gap-1"
              >
                <Plus className="w-4 h-4 text-emerald-400" /> Create Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT DISH INLINE MODAL */}
      {editingDish && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-heading font-extrabold text-base text-[#1E5631]">Edit Catering Dish</h3>
              <button onClick={() => setEditingDish(null)} className="p-1 text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">Dish Name</label>
                <input
                  type="text"
                  value={editingDish.name}
                  onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">Rate Per Litre (₦)</label>
                <input
                  type="number"
                  value={editingDish.unitPricePerLitre}
                  onChange={(e) => setEditingDish({ ...editingDish, unitPricePerLitre: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">Description</label>
                <input
                  type="text"
                  value={editingDish.description}
                  onChange={(e) => setEditingDish({ ...editingDish, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingDish.image}
                  onChange={(e) => setEditingDish({ ...editingDish, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 font-mono text-[10px]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
              <button
                onClick={() => setEditingDish(null)}
                className="px-4 py-2 rounded-xl border border-neutral-200 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateDishItem(editingDish.id, editingDish);
                  setEditingDish(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#1E5631] text-white font-extrabold flex items-center gap-1"
              >
                <Save className="w-3.5 h-3.5 text-emerald-300" /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW DISH MODAL */}
      {newDishModal && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-heading font-extrabold text-base text-[#1E5631]">Add New Catering Dish</h3>
              <button onClick={() => setNewDishModal(false)} className="p-1 text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">Dish Name</label>
                <input
                  type="text"
                  value={newDishForm.name}
                  onChange={(e) => setNewDishForm({ ...newDishForm, name: e.target.value })}
                  placeholder="e.g. Special Peppered Goat Meat"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 mb-1">Category</label>
                  <select
                    value={newDishForm.category}
                    onChange={(e) => setNewDishForm({ ...newDishForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 font-bold"
                  >
                    <option value="Rice Specialties">Rice Specialties</option>
                    <option value="Signature Soups & Stews">Signature Soups & Stews</option>
                    <option value="Proteins & Sides">Proteins & Sides</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 mb-1">Price Per Litre (₦)</label>
                  <input
                    type="number"
                    value={newDishForm.unitPricePerLitre}
                    onChange={(e) => setNewDishForm({ ...newDishForm, unitPricePerLitre: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newDishForm.image}
                  onChange={(e) => setNewDishForm({ ...newDishForm, image: e.target.value })}
                  placeholder="/images/jollof-rice.png or https://..."
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 font-mono text-[10px]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
              <button
                onClick={() => setNewDishModal(false)}
                className="px-4 py-2 rounded-xl border border-neutral-200 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newDishForm.name) {
                    addDishItem(newDishForm);
                    setNewDishModal(false);
                  }
                }}
                className="px-5 py-2 rounded-xl bg-[#1E5631] text-white font-extrabold flex items-center gap-1"
              >
                <Plus className="w-4 h-4 text-emerald-300" /> Create Dish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
