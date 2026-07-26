"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type BrandTheme = "home" | "events" | "flavors" | "foundation" | "admin";

export type PricingUnit = "dozen" | "singular" | "day" | "tub" | "custom";

export interface PipelineRentalItem {
  id: string;
  name: string;
  category: "Canopies & Tents" | "Chairs & Seating" | "Tables & Dining" | "Pots, Pans & Cookware" | "Stoves & Ovens";
  unitType: PricingUnit; // dozen for chairs, singular for tables/pots
  unitPrice: number;
  specs: string;
  selectedQty: number; // For chairs: number of dozens. For tables/pots: number of units.
  image: string;
}

export interface PipelineCateringItem {
  id: string;
  name: string;
  category: "Rice Specialties" | "Signature Soups & Stews" | "Proteins & Sides";
  description: string;
  selectedPortion: "2L Tub" | "4L Tub" | "8L Tub" | "10L Tub" | "Custom Amount";
  customLitres?: number;
  unitPricePerLitre: number;
  selectedQty: number;
  image: string;
}

export interface InquiryLead {
  id: string;
  vertical: "Events" | "Flavors" | "Foundation";
  name: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  rentalDaysCount: number;
  details: string;
  status: "Pending" | "Confirmed" | "Paid via Paystack";
  paymentReference?: string;
  totalEstimatedAmount: number;
  createdAt: string;
}

// Realistic Unsplash Images & Equipment Items
const INITIAL_PIPELINE_RENTALS: PipelineRentalItem[] = [
  {
    id: "p-canopy-20x20",
    name: "Standard Heavy-Duty Event Canopy (20ft x 20ft)",
    category: "Canopies & Tents",
    unitType: "singular",
    unitPrice: 35000,
    specs: "20ft x 20ft frame, seats 50 guests",
    selectedQty: 0,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p-canopy-20x40",
    name: "High-Peak Marquee Pavilion Tent (20ft x 40ft)",
    category: "Canopies & Tents",
    unitType: "singular",
    unitPrice: 75000,
    specs: "20ft x 40ft frame, seats 100-120 guests",
    selectedQty: 0,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p-chair-chiavari",
    name: "Executive Gold Chiavari Banquet Chairs",
    category: "Chairs & Seating",
    unitType: "dozen",
    unitPrice: 18000, // ₦18,000 per dozen (12 chairs)
    specs: "Priced per dozen (12 chairs) with velvet cushion",
    selectedQty: 0,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p-chair-plastic",
    name: "Heavy-Duty Plastic Armless Party Chairs",
    category: "Chairs & Seating",
    unitType: "dozen",
    unitPrice: 6000, // ₦6,000 per dozen
    specs: "Priced per dozen (12 chairs)",
    selectedQty: 0,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p-table-round",
    name: "Banquet Round Tables (10-Seater)",
    category: "Tables & Dining",
    unitType: "singular",
    unitPrice: 5000,
    specs: "6ft diameter heavy wooden top",
    selectedQty: 0,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p-table-rect",
    name: "6ft Rectangular Buffet & Catering Tables",
    category: "Tables & Dining",
    unitType: "singular",
    unitPrice: 4000,
    specs: "6ft x 2.5ft collapsible catering table",
    selectedQty: 0,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p-pot-100l",
    name: "Industrial Stainless Steel Cooking Pot (100L)",
    category: "Pots, Pans & Cookware",
    unitType: "singular",
    unitPrice: 12000,
    specs: "100L heavy steel party cooking pot",
    selectedQty: 0,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p-pot-200l",
    name: "Commercial Heavy Party Cooking Drum (200L)",
    category: "Pots, Pans & Cookware",
    unitType: "singular",
    unitPrice: 20000,
    specs: "200L heavy steel drum for event catering",
    selectedQty: 0,
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p-pans-spoons",
    name: "Catering Heavy Pans, Large Serving Spoons & Turning Sticks (Omorogun)",
    category: "Pots, Pans & Cookware",
    unitType: "singular",
    unitPrice: 4500,
    specs: "Set of 2 stainless pans, 2 large ladles & wooden turning stick",
    selectedQty: 0,
    image: "https://images.unsplash.com/photo-1590794056226-77ef3a8147e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p-stove-gas",
    name: "Double-Burner Commercial Gas Stove",
    category: "Stoves & Ovens",
    unitType: "singular",
    unitPrice: 15000,
    specs: "Heavy industrial cast iron double burner gas stove",
    selectedQty: 0,
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p-oven-gas",
    name: "Portable Commercial Roasting & Baking Gas Oven",
    category: "Stoves & Ovens",
    unitType: "singular",
    unitPrice: 25000,
    specs: "2-tray gas roasting oven for event catering",
    selectedQty: 0,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p-water-drum",
    name: "Insulated Drink Cooler & Water Dispenser Tub (200L)",
    category: "Pots, Pans & Cookware",
    unitType: "singular",
    unitPrice: 8000,
    specs: "Insulated 200L tub with tap for ice and beverages",
    selectedQty: 0,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
  },
];

const INITIAL_PIPELINE_FOOD: PipelineCateringItem[] = [
  {
    id: "f-jollof",
    name: "Smoky Firewood Party Jollof Rice & Fried Plantain",
    category: "Rice Specialties",
    description: "Traditional firewood Jollof rice served with sweet fried plantains & peppered chicken.",
    selectedPortion: "4L Tub",
    unitPricePerLitre: 5500, // ₦5,500 per Litre
    selectedQty: 0,
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "f-afang",
    name: "Authentic Nigerian Afang Soup with Assorted Meats",
    category: "Signature Soups & Stews",
    description: "Wild okazi leaves, waterleaf, stockfish, dried catfish, cow tripe & goat meat.",
    selectedPortion: "4L Tub",
    unitPricePerLitre: 7000,
    selectedQty: 0,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "f-ayamasi",
    name: "Special Ayamasi (Green Pepper Ofada Stew)",
    category: "Signature Soups & Stews",
    description: "Bleached palm oil green pepper stew with boiled eggs, diced ponmo & fried beef.",
    selectedPortion: "4L Tub",
    unitPricePerLitre: 7500,
    selectedQty: 0,
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "f-ewa",
    name: "Ewa Aganyin with Dark Onion Palm Oil Sauce",
    category: "Proteins & Sides",
    description: "Soft mashed beans topped with signature dark caramelized onion sauce.",
    selectedPortion: "4L Tub",
    unitPricePerLitre: 4500,
    selectedQty: 0,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
  },
];

interface AppContextType {
  activeBrand: BrandTheme;
  setActiveBrand: (brand: BrandTheme) => void;

  pipelineRentals: PipelineRentalItem[];
  setPipelineRentals: React.Dispatch<React.SetStateAction<PipelineRentalItem[]>>;
  pipelineFood: PipelineCateringItem[];
  setPipelineFood: React.Dispatch<React.SetStateAction<PipelineCateringItem[]>>;

  startDate: string;
  setStartDate: (d: string) => void;
  endDate: string;
  setEndDate: (d: string) => void;
  rentalDaysCount: number;

  inquiries: InquiryLead[];
  addInquiry: (lead: Omit<InquiryLead, "id" | "createdAt" | "status">) => string;
  updateInquiryStatus: (id: string, status: InquiryLead["status"]) => void;

  isQuoteDrawerOpen: boolean;
  setIsQuoteDrawerOpen: (open: boolean) => void;
  clearAllPipelineSelections: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeBrand, setActiveBrandState] = useState<BrandTheme>("home");
  const [pipelineRentals, setPipelineRentals] = useState<PipelineRentalItem[]>(INITIAL_PIPELINE_RENTALS);
  const [pipelineFood, setPipelineFood] = useState<PipelineCateringItem[]>(INITIAL_PIPELINE_FOOD);

  const [startDate, setStartDate] = useState("2026-07-27");
  const [endDate, setEndDate] = useState("2026-07-31");

  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);
  const [inquiries, setInquiries] = useState<InquiryLead[]>(INITIAL_INQUIRIES_LOG);

  const getDaysDiff = (start: string, end: string) => {
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 3600 * 24));
    return diff > 0 ? diff : 1;
  };

  const rentalDaysCount = getDaysDiff(startDate, endDate);

  const setActiveBrand = (brand: BrandTheme) => {
    setActiveBrandState(brand);
    document.documentElement.setAttribute("data-brand", brand);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-brand", activeBrand);
  }, [activeBrand]);

  const clearAllPipelineSelections = () => {
    setPipelineRentals((prev) => prev.map((item) => ({ ...item, selectedQty: 0 })));
    setPipelineFood((prev) => prev.map((item) => ({ ...item, selectedQty: 0 })));
  };

  const addInquiry = (lead: Omit<InquiryLead, "id" | "createdAt" | "status">) => {
    const id = `inq-${Date.now().toString().slice(-5)}`;
    const newInquiry: InquiryLead = {
      ...lead,
      id,
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      status: "Paid via Paystack",
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    return id;
  };

  const updateInquiryStatus = (id: string, status: InquiryLead["status"]) => {
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  return (
    <AppContext.Provider
      value={{
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
        inquiries,
        addInquiry,
        updateInquiryStatus,
        isQuoteDrawerOpen,
        setIsQuoteDrawerOpen,
        clearAllPipelineSelections,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const INITIAL_INQUIRIES_LOG: InquiryLead[] = [
  {
    id: "inq-9901",
    vertical: "Events",
    name: "Chief Tunde Lawson",
    email: "tunde.l@example.com",
    phone: "+234 803 123 4567",
    startDate: "2026-07-27",
    endDate: "2026-07-31",
    rentalDaysCount: 4,
    details: "2 Dozen Chiavari Chairs, 2 Round Tables, 1 Canopy + 4L Jollof Rice",
    status: "Paid via Paystack",
    paymentReference: "PSK-987654321",
    totalEstimatedAmount: 215000,
    createdAt: "2026-07-26 14:30",
  },
];

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppContextProvider");
  }
  return context;
};
