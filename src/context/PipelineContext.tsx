"use client";

import React, { createContext, useContext, useState } from "react";

export type VerticalType = "EVENTS" | "FLAVORS" | null;

export interface EquipmentItem {
  id: string;
  name: string;
  category: "Canopies & Tents" | "Chairs & Seating" | "Tables & Dining" | "Cookware & Utensils" | "Stoves & Ovens";
  unitType: "dozen" | "singular";
  unitPrice: number;
  specs: string;
  image: string;
  active?: boolean;
}

export interface DishItem {
  id: string;
  name: string;
  category: "Rice Specialties" | "Signature Soups & Stews" | "Proteins & Sides";
  description: string;
  unitPricePerLitre: number;
  image: string;
  active?: boolean;
}

export interface FlavorSelection {
  portion: "2L" | "4L" | "8L" | "10L" | "CUSTOM";
  customLitres?: number;
  quantity: number;
}

export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export interface LandingSettings {
  eventsTitle: string;
  eventsSubtitle: string;
  eventsImage: string;
  flavorsTitle: string;
  flavorsSubtitle: string;
  flavorsImage: string;
}

interface PipelineContextType {
  activeVertical: VerticalType;
  setActiveVertical: (vertical: VerticalType) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;

  // Equipment CMS
  equipmentItems: EquipmentItem[];
  updateEquipmentItem: (id: string, updated: Partial<EquipmentItem>) => void;
  addEquipmentItem: (item: Omit<EquipmentItem, "id">) => void;
  deleteEquipmentItem: (id: string) => void;
  eventsInventory: Record<string, number>;
  setEventsInventoryQty: (id: string, qty: number) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  location: string;
  setLocation: (loc: string) => void;

  // Catering CMS
  menuItems: DishItem[];
  updateDishItem: (id: string, updated: Partial<DishItem>) => void;
  addDishItem: (dish: Omit<DishItem, "id">) => void;
  deleteDishItem: (id: string) => void;
  flavorsSelections: Record<string, FlavorSelection>;
  setFlavorSelection: (dishId: string, selection: Partial<FlavorSelection>) => void;
  fulfillmentDate: string;
  setFulfillmentDate: (date: string) => void;

  // Landing Content CMS
  landingSettings: LandingSettings;
  setLandingSettings: React.Dispatch<React.SetStateAction<LandingSettings>>;

  contactInfo: ContactInfo;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;

  rentalDaysCount: number;
  equipmentSubtotal: number;
  cateringSubtotal: number;
  logisticsFee: number;
  grandTotal: number;

  resetPipeline: () => void;
}

export const INITIAL_EQUIPMENT_CATALOG: EquipmentItem[] = [
  {
    id: "canopy-20x20",
    name: "20x20ft Event Canopy",
    category: "Canopies & Tents",
    unitType: "singular",
    unitPrice: 35000,
    specs: "20x20ft • Seats 50",
    image: "/images/canopy-20x20.png",
    active: true,
  },
  {
    id: "canopy-20x40",
    name: "20x40ft Marquee Pavilion",
    category: "Canopies & Tents",
    unitType: "singular",
    unitPrice: 75000,
    specs: "20x40ft • Seats 100",
    image: "/images/canopy-20x20.png",
    active: true,
  },
  {
    id: "chair-chiavari",
    name: "Gold Chiavari Chairs",
    category: "Chairs & Seating",
    unitType: "dozen",
    unitPrice: 18000,
    specs: "Per dozen (12 chairs)",
    image: "/images/chair-chiavari.png",
    active: true,
  },
  {
    id: "chair-plastic",
    name: "Armless Party Chairs",
    category: "Chairs & Seating",
    unitType: "dozen",
    unitPrice: 6000,
    specs: "Per dozen (12 chairs)",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    active: true,
  },
  {
    id: "table-round",
    name: "Round Banquet Table",
    category: "Tables & Dining",
    unitType: "singular",
    unitPrice: 5000,
    specs: "6ft Round • Seats 10",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    active: true,
  },
  {
    id: "table-rect",
    name: "Rectangular Catering Table",
    category: "Tables & Dining",
    unitType: "singular",
    unitPrice: 4000,
    specs: "6ft x 2.5ft Foldout",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    active: true,
  },
  {
    id: "pot-100l",
    name: "100L Cooking Drum",
    category: "Cookware & Utensils",
    unitType: "singular",
    unitPrice: 12000,
    specs: "100 Litres Capacity",
    image: "/images/pot-100l.png",
    active: true,
  },
  {
    id: "pot-200l",
    name: "200L Cooking Drum",
    category: "Cookware & Utensils",
    unitType: "singular",
    unitPrice: 20000,
    specs: "200 Litres Capacity",
    image: "/images/pot-100l.png",
    active: true,
  },
  {
    id: "pans-spoons",
    name: "Catering Pans & Omorogun",
    category: "Cookware & Utensils",
    unitType: "singular",
    unitPrice: 4500,
    specs: "2 Pans, Ladles & Stick",
    image: "https://images.unsplash.com/photo-1590794056226-77ef3a8147e1?auto=format&fit=crop&w=800&q=80",
    active: true,
  },
  {
    id: "stove-gas",
    name: "Commercial Gas Stove",
    category: "Stoves & Ovens",
    unitType: "singular",
    unitPrice: 15000,
    specs: "Double Burner",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
    active: true,
  },
  {
    id: "oven-gas",
    name: "Gas Roasting Oven",
    category: "Stoves & Ovens",
    unitType: "singular",
    unitPrice: 25000,
    specs: "2-Tray Oven",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80",
    active: true,
  },
  {
    id: "water-tub",
    name: "200L Drink Cooler Tub",
    category: "Cookware & Utensils",
    unitType: "singular",
    unitPrice: 8000,
    specs: "200L Insulated Tub",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    active: true,
  },
];

export const INITIAL_MENU_CATALOG: DishItem[] = [
  {
    id: "jollof-rice",
    name: "Firewood Party Jollof Rice",
    category: "Rice Specialties",
    description: "Smoky Jollof rice, plantain & chicken.",
    unitPricePerLitre: 5500,
    image: "/images/jollof-rice.png",
    active: true,
  },
  {
    id: "afang-soup",
    name: "Authentic Afang Soup",
    category: "Signature Soups & Stews",
    description: "Wild okazi, stockfish & assorted meat.",
    unitPricePerLitre: 7000,
    image: "/images/afang-soup.png",
    active: true,
  },
  {
    id: "ayamasi-stew",
    name: "Special Ayamasi (Ofada Stew)",
    category: "Signature Soups & Stews",
    description: "Green pepper stew, eggs & ponmo.",
    unitPricePerLitre: 7500,
    image: "/images/ayamasi-stew.png",
    active: true,
  },
  {
    id: "ewa-aganyin",
    name: "Ewa Aganyin & Dark Sauce",
    category: "Proteins & Sides",
    description: "Mashed beans & spicy onion sauce.",
    unitPricePerLitre: 4500,
    image: "/images/ewa-aganyin.png",
    active: true,
  },
];

const PipelineContext = createContext<PipelineContextType | undefined>(undefined);

export const PipelineContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeVertical, setActiveVertical] = useState<VerticalType>("EVENTS");
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [equipmentItems, setEquipmentItems] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT_CATALOG);
  const [menuItems, setMenuItems] = useState<DishItem[]>(INITIAL_MENU_CATALOG);

  const [landingSettings, setLandingSettings] = useState<LandingSettings>({
    eventsTitle: "Equipment & Event Rentals",
    eventsSubtitle: "20x20ft canopies, Chiavari chairs (sold in dozens), banquet tables, 100L/200L drums & stoves.",
    eventsImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=80",
    flavorsTitle: "Culinary Food Catering",
    flavorsSubtitle: "Firewood Jollof rice, authentic Afang soup, Ayamasi stew & Ewa Aganyin by 2L, 4L, 8L, 10L or custom litres.",
    flavorsImage: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=1400&q=80",
  });

  const [eventsInventory, setEventsInventory] = useState<Record<string, number>>({});
  const [startDate, setStartDate] = useState<string>("2026-07-27");
  const [endDate, setEndDate] = useState<string>("2026-07-31");
  const [location, setLocation] = useState<string>("Lagos, Nigeria");

  const [flavorsSelections, setFlavorsSelections] = useState<Record<string, FlavorSelection>>({});
  const [fulfillmentDate, setFulfillmentDate] = useState<string>("2026-07-28");

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  // Equipment CRUD
  const updateEquipmentItem = (id: string, updated: Partial<EquipmentItem>) => {
    setEquipmentItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const addEquipmentItem = (item: Omit<EquipmentItem, "id">) => {
    const newItem: EquipmentItem = {
      ...item,
      id: `custom-eq-${Date.now()}`,
      active: true,
    };
    setEquipmentItems((prev) => [...prev, newItem]);
  };

  const deleteEquipmentItem = (id: string) => {
    setEquipmentItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Catering CRUD
  const updateDishItem = (id: string, updated: Partial<DishItem>) => {
    setMenuItems((prev) =>
      prev.map((dish) => (dish.id === id ? { ...dish, ...updated } : dish))
    );
  };

  const addDishItem = (dish: Omit<DishItem, "id">) => {
    const newDish: DishItem = {
      ...dish,
      id: `custom-dish-${Date.now()}`,
      active: true,
    };
    setMenuItems((prev) => [...prev, newDish]);
  };

  const deleteDishItem = (id: string) => {
    setMenuItems((prev) => prev.filter((dish) => dish.id !== id));
  };

  const getDays = (start: string, end: string) => {
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 3600 * 24));
    return diff > 0 ? diff : 1;
  };

  const rentalDaysCount = getDays(startDate, endDate);

  const setEventsInventoryQty = (id: string, qty: number) => {
    setEventsInventory((prev) => ({
      ...prev,
      [id]: Math.max(0, qty),
    }));
  };

  const setFlavorSelection = (dishId: string, selection: Partial<FlavorSelection>) => {
    setFlavorsSelections((prev) => {
      const current = prev[dishId] || { portion: "4L", quantity: 0 };
      return {
        ...prev,
        [dishId]: {
          ...current,
          ...selection,
        },
      };
    });
  };

  const equipmentSubtotal = equipmentItems.reduce((sum, item) => {
    const qty = eventsInventory[item.id] || 0;
    return sum + item.unitPrice * qty * rentalDaysCount;
  }, 0);

  const cateringSubtotal = menuItems.reduce((sum, dish) => {
    const sel = flavorsSelections[dish.id];
    if (!sel || sel.quantity <= 0) return sum;
    let litres = 4;
    if (sel.portion === "2L") litres = 2;
    if (sel.portion === "4L") litres = 4;
    if (sel.portion === "8L") litres = 8;
    if (sel.portion === "10L") litres = 10;
    if (sel.portion === "CUSTOM" && sel.customLitres) litres = sel.customLitres;

    return sum + dish.unitPricePerLitre * litres * sel.quantity;
  }, 0);

  const hasEquipment = Object.values(eventsInventory).some((qty) => qty > 0);
  const logisticsFee = hasEquipment ? 15000 : 0;
  const grandTotal = equipmentSubtotal + cateringSubtotal + logisticsFee;

  const resetPipeline = () => {
    setActiveVertical(null);
    setCurrentStep(1);
    setEventsInventory({});
    setFlavorsSelections({});
    setContactInfo({ name: "", phone: "", email: "", address: "", notes: "" });
  };

  return (
    <PipelineContext.Provider
      value={{
        activeVertical,
        setActiveVertical,
        currentStep,
        setCurrentStep,
        equipmentItems,
        updateEquipmentItem,
        addEquipmentItem,
        deleteEquipmentItem,
        eventsInventory,
        setEventsInventoryQty,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        location,
        setLocation,
        menuItems,
        updateDishItem,
        addDishItem,
        deleteDishItem,
        flavorsSelections,
        setFlavorSelection,
        fulfillmentDate,
        setFulfillmentDate,
        landingSettings,
        setLandingSettings,
        contactInfo,
        setContactInfo,
        rentalDaysCount,
        equipmentSubtotal,
        cateringSubtotal,
        logisticsFee,
        grandTotal,
        resetPipeline,
      }}
    >
      {children}
    </PipelineContext.Provider>
  );
};

export const usePipeline = () => {
  const context = useContext(PipelineContext);
  if (!context) {
    throw new Error("usePipeline must be used within a PipelineContextProvider");
  }
  return context;
};
