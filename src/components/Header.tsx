"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp, BrandTheme } from "@/context/AppContext";
import { ShoppingBag, Utensils, Tent, Heart, Menu, X, ArrowRight, Layers, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { activeBrand, setActiveBrand, pipelineRentals, pipelineFood, setIsQuoteDrawerOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount =
    pipelineRentals.reduce((sum, item) => sum + item.selectedQty, 0) +
    pipelineFood.reduce((sum, item) => sum + item.selectedQty, 0);

  const navBrands: { id: BrandTheme; name: string; href: string; icon: React.ComponentType<{ className?: string }>; activeColorClass: string }[] = [
    { id: "home", name: "Aimade Hub", href: "/", icon: Layers, activeColorClass: "text-slate-900" },
    { id: "events", name: "Aimade Events", href: "/events", icon: Tent, activeColorClass: "text-blue-700" },
    { id: "flavors", name: "Aimade Flavors", href: "/flavors", icon: Utensils, activeColorClass: "text-emerald-700" },
    { id: "foundation", name: "Care Foundation", href: "/foundation", icon: Heart, activeColorClass: "text-purple-700" },
  ];

  const handleBrandClick = (id: BrandTheme) => {
    setActiveBrand(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass-header border-b border-slate-200/80 w-full">
      <div className="w-full px-6 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Simplified Text Logo */}
          <Link
            href="/"
            onClick={() => handleBrandClick("home")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-heading font-extrabold text-2xl tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
              Aimade
            </span>
          </Link>

          {/* Desktop Brand Switcher Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80">
            {navBrands.map((b) => {
              const Icon = b.icon;
              const isActive = pathname === b.href || activeBrand === b.id;
              return (
                <Link
                  key={b.id}
                  href={b.href}
                  onClick={() => handleBrandClick(b.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 select-none ${
                    isActive
                      ? "text-slate-900 bg-white shadow-xs border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? b.activeColorClass : "text-slate-400"}`} />
                  <span>{b.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 rounded-xl ring-1 ring-slate-900/10 pointer-events-none"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-xs font-medium transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>Manager Portal</span>
            </Link>

            <button
              onClick={() => setIsQuoteDrawerOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-all shadow-xs active:scale-98 cursor-pointer"
              aria-label="View Quote Basket"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Inquiry Basket</span>
              {totalCartCount > 0 && (
                <span className="ml-1 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 px-6 pt-4 pb-6 space-y-3 shadow-lg"
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Navigation Modules</p>
            {navBrands.map((b) => {
              const Icon = b.icon;
              const isActive = pathname === b.href;
              return (
                <Link
                  key={b.id}
                  href={b.href}
                  onClick={() => handleBrandClick(b.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : b.activeColorClass}`} />
                    <span>{b.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
