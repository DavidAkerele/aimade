"use client";

import React from "react";
import { usePipeline } from "@/context/PipelineContext";
import { ShoppingBag, Tent, Utensils, Send } from "lucide-react";

export const OrderSummaryDrawer: React.FC = () => {
  const {
    activeVertical,
    equipmentItems,
    eventsInventory,
    menuItems,
    flavorsSelections,
    rentalDaysCount,
    equipmentSubtotal,
    cateringSubtotal,
    logisticsFee,
    grandTotal,
    setCurrentStep,
  } = usePipeline();

  const selectedEquipmentList = equipmentItems
    .map((item) => ({ ...item, qty: eventsInventory[item.id] || 0 }))
    .filter((i) => i.qty > 0);

  const selectedMenuList = menuItems
    .map((dish) => ({ ...dish, selection: flavorsSelections[dish.id] }))
    .filter((d) => d.selection && d.selection.quantity > 0);

  const totalCount =
    selectedEquipmentList.reduce((sum, i) => sum + i.qty, 0) +
    selectedMenuList.reduce((sum, d) => sum + d.selection.quantity, 0);

  const accentColor = activeVertical === "FLAVORS" ? "text-[#1E5631]" : "text-[#0A2540]";

  return (
    <div className="w-full bg-white rounded-lg border border-neutral-200/80 p-4 shadow-sm flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <ShoppingBag className={`w-4 h-4 ${accentColor}`} />
          <h3 className="font-heading font-extrabold text-sm text-neutral-900">Live Quote Calculator</h3>
        </div>
        <span className="text-[10px] font-bold bg-neutral-100 px-2 py-0.5 rounded-md text-neutral-600">
          {totalCount} Item(s)
        </span>
      </div>

      {/* Item List Summary */}
      <div className="space-y-3 max-h-56 overflow-y-auto text-xs pr-1">
        {selectedEquipmentList.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0A2540]">
              <Tent className="w-3 h-3 text-[#E63946]" /> Equipment ({rentalDaysCount} Days)
            </div>
            {selectedEquipmentList.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-neutral-700 text-[11px]">
                <span className="truncate max-w-[170px]">{item.name}</span>
                <span className="font-bold">
                  {item.qty} {item.unitType === "dozen" ? "Doz" : "Qty"}
                </span>
              </div>
            ))}
          </div>
        )}

        {selectedMenuList.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#1E5631]">
              <Utensils className="w-3 h-3 text-[#D62828]" /> Catering Dishes
            </div>
            {selectedMenuList.map((dish) => (
              <div key={dish.id} className="flex items-center justify-between text-neutral-700 text-[11px]">
                <span className="truncate max-w-[170px]">
                  {dish.name} ({dish.selection.portion})
                </span>
                <span className="font-bold">{dish.selection.quantity} Order</span>
              </div>
            ))}
          </div>
        )}

        {totalCount === 0 && (
          <div className="text-center py-6 text-neutral-400 text-xs italic">
            No items selected yet. Use steppers to add equipment or catering orders.
          </div>
        )}
      </div>

      {/* Cost Calculations */}
      <div className="pt-3 border-t border-neutral-100 space-y-1.5 text-xs">
        {equipmentSubtotal > 0 && (
          <div className="flex justify-between text-neutral-500">
            <span>Equipment Rentals:</span>
            <span className="font-semibold text-neutral-900">₦{equipmentSubtotal.toLocaleString()}</span>
          </div>
        )}

        {cateringSubtotal > 0 && (
          <div className="flex justify-between text-neutral-500">
            <span>Catering Food Orders:</span>
            <span className="font-semibold text-neutral-900">₦{cateringSubtotal.toLocaleString()}</span>
          </div>
        )}

        {logisticsFee > 0 && (
          <div className="flex justify-between text-neutral-500">
            <span>Delivery & Setup Fee:</span>
            <span className="font-semibold text-neutral-900">₦{logisticsFee.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between text-sm font-extrabold text-neutral-900 pt-2 border-t border-neutral-200/80">
          <span>Estimated Total:</span>
          <span className={accentColor}>₦{grandTotal.toLocaleString()}</span>
        </div>

        <button
          onClick={() => setCurrentStep(3)}
          className={`w-full py-2.5 rounded-md text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs mt-2 ${
            activeVertical === "FLAVORS"
              ? "bg-[#1E5631] hover:bg-[#143B21]"
              : "bg-[#0A2540] hover:bg-[#06182B]"
          }`}
        >
          <span>Checkout & Reserve</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
