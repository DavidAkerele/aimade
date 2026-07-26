"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Tent, Utensils, Heart, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

export const Footer: React.FC = () => {
  const { setActiveBrand } = useApp();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="w-full px-6 sm:px-12 lg:px-16 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Intro Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="font-heading font-extrabold text-2xl tracking-tight text-white block">
              Aimade
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Aimade is an unconstrained multi-brand ecosystem bringing world-class event rentals, authentic Nigerian culinary experiences, and female empowerment initiatives under one digital roof.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+234 800 AIMADE</span>
              </div>
            </div>
          </div>

          {/* Quick Vertical Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider text-amber-400">
              Brand Verticals
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link
                  href="/events"
                  onClick={() => setActiveBrand("events")}
                  className="hover:text-white flex items-center gap-2 transition-colors"
                >
                  <Tent className="w-3.5 h-3.5 text-blue-400" /> Aimade Events & Rentals
                </Link>
              </li>
              <li>
                <Link
                  href="/flavors"
                  onClick={() => setActiveBrand("flavors")}
                  className="hover:text-white flex items-center gap-2 transition-colors"
                >
                  <Utensils className="w-3.5 h-3.5 text-emerald-400" /> Aimade Flavors Catering
                </Link>
              </li>
              <li>
                <Link
                  href="/foundation"
                  onClick={() => setActiveBrand("foundation")}
                  className="hover:text-white flex items-center gap-2 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 text-purple-400" /> Aimade Care Foundation
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Support */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider text-blue-400">
              Services & Inquiries
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Equipment Rental Catalog</li>
              <li>Bulk Event Catering</li>
              <li>Custom Meal Prep Tubs</li>
              <li>Vocational Bootcamps</li>
              <li>Volunteer & Sponsorship</li>
              <li>Live Quote Calculator</li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider text-purple-400">
              Stay Informed
            </h4>
            <p className="text-xs text-slate-400">
              Subscribe for new menu drop alerts, rental availability, and foundation impact reports.
            </p>

            {subscribed ? (
              <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 p-3 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-1 focus:ring-slate-700"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" /> Join Newsletter
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Aimade. All rights reserved.</p>
          <div className="flex gap-6 text-slate-400">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Security & Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
