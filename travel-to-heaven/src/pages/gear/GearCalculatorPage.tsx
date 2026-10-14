import React, { useState } from 'react';
import {
  Tent, Backpack, Utensils, Plus, Trash2, ExternalLink,
  DollarSign, Check, ShoppingBag, Search
} from 'lucide-react';
import { useTravel } from '@/context/TravelContext';
import { setPageTitle, cn } from '@/lib/utils';
import type { Currency } from '@/types/budget.types';

let gearItemSequence = 100;
const generateGearItemId = () => `gear-${++gearItemSequence}`;

export type GearCategory = 'CAMPING' | 'TRAVEL_PRODUCTS' | 'FOOD_SUPPLIES';

export interface GearItem {
  id: string;
  name: string;
  category: GearCategory;
  quantity: number;
  unitPrice: number;
  currency: string;
  isPacked?: boolean;
}

const PRESET_GEAR_CATALOG: Omit<GearItem, 'id' | 'isPacked'>[] = [
  // A. Camping Equipment
  { name: 'Waterproof Camping Tent (4-Person Dome)', category: 'CAMPING', quantity: 1, unitPrice: 15000, currency: 'LKR' },
  { name: 'Thermal Mummy Sleeping Bag (-5°C Rated)', category: 'CAMPING', quantity: 2, unitPrice: 8500, currency: 'LKR' },
  { name: 'Heavy-Duty Expedition Backpack (65L)', category: 'CAMPING', quantity: 1, unitPrice: 12000, currency: 'LKR' },
  { name: 'Rechargeable LED Camping Lantern & Headlamp', category: 'CAMPING', quantity: 2, unitPrice: 2500, currency: 'LKR' },
  { name: 'Insulated Stainless Steel Water Bottle', category: 'CAMPING', quantity: 2, unitPrice: 1000, currency: 'LKR' },
  { name: 'Portable Camping Cookware & Mini Stove Set', category: 'CAMPING', quantity: 1, unitPrice: 7500, currency: 'LKR' },
  { name: 'Inflatable Compact Sleeping Air Mat', category: 'CAMPING', quantity: 2, unitPrice: 4500, currency: 'LKR' },

  // B. Travel Products
  { name: 'Waterproof Windbreaker Raincoat Jacket', category: 'TRAVEL_PRODUCTS', quantity: 2, unitPrice: 5500, currency: 'LKR' },
  { name: 'All-Terrain Hiking & Walking Shoes', category: 'TRAVEL_PRODUCTS', quantity: 1, unitPrice: 14000, currency: 'LKR' },
  { name: 'Universal International Travel Power Adapter', category: 'TRAVEL_PRODUCTS', quantity: 1, unitPrice: 2200, currency: 'LKR' },
  { name: 'High-Capacity Portable Power Bank (20,000mAh)', category: 'TRAVEL_PRODUCTS', quantity: 1, unitPrice: 6500, currency: 'LKR' },
  { name: 'Quick-Dry Microfiber Travel Towel', category: 'TRAVEL_PRODUCTS', quantity: 2, unitPrice: 1200, currency: 'LKR' },

  // C. Food & Supplies
  { name: 'Bottled Purified Drinking Water (6-Pack)', category: 'FOOD_SUPPLIES', quantity: 3, unitPrice: 450, currency: 'LKR' },
  { name: 'High-Energy Trail Mix & Energy Snack Bars', category: 'FOOD_SUPPLIES', quantity: 5, unitPrice: 300, currency: 'LKR' },
  { name: 'Dehydrated Freeze-Dried Camping Meals', category: 'FOOD_SUPPLIES', quantity: 6, unitPrice: 1200, currency: 'LKR' },
  { name: 'Instant Camp Noodles & Hot Broth Packs', category: 'FOOD_SUPPLIES', quantity: 8, unitPrice: 200, currency: 'LKR' },
];

export const GearCalculatorPage: React.FC = () => {
  const { trips, addBudgetItem } = useTravel();

  const [selectedTripId, setSelectedTripId] = useState<string>(trips[1]?.id || trips[0]?.id || 'trip-1');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active items in calculator state
  const [items, setItems] = useState<GearItem[]>(() => [
    { id: 'g-1', name: 'Waterproof Camping Tent (4-Person)', category: 'CAMPING', quantity: 1, unitPrice: 15000, currency: 'LKR' },
    { id: 'g-2', name: 'Insulated Water Bottle', category: 'CAMPING', quantity: 2, unitPrice: 1000, currency: 'LKR' },
    { id: 'g-3', name: 'Portable Camping Light & Headlamp', category: 'CAMPING', quantity: 1, unitPrice: 2500, currency: 'LKR' },
    { id: 'g-4', name: 'High-Energy Snacks & Trail Mix', category: 'FOOD_SUPPLIES', quantity: 5, unitPrice: 300, currency: 'LKR' },
  ]);

  // Custom Item Form State
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<GearCategory>('CAMPING');
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemPrice, setNewItemPrice] = useState(2500);

  React.useEffect(() => {
    setPageTitle('Camping Equipment & Travel Gear Cost Calculator — Travel to Heaven');
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const activeTrip = trips.find((t) => t.id === selectedTripId) || trips[0];
  const tripCurrency = activeTrip?.currency || 'LKR';

  // Calculator totals
  const totalGearCost = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  const campingCost = items
    .filter((i) => i.category === 'CAMPING')
    .reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  const travelProductsCost = items
    .filter((i) => i.category === 'TRAVEL_PRODUCTS')
    .reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  const foodCost = items
    .filter((i) => i.category === 'FOOD_SUPPLIES')
    .reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  // Handlers
  const handleQuantityChange = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: nextQty };
        }
        return item;
      })
    );
  };

  const handlePriceChange = (id: string, newPrice: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unitPrice: Math.max(0, newPrice) } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddPreset = (preset: typeof PRESET_GEAR_CATALOG[0]) => {
    const existing = items.find((i) => i.name.toLowerCase() === preset.name.toLowerCase());
    if (existing) {
      handleQuantityChange(existing.id, 1);
      showToast(`Increased quantity for "${preset.name}"!`);
      return;
    }

    const newItem: GearItem = {
      id: generateGearItemId(),
      name: preset.name,
      category: preset.category,
      quantity: preset.quantity,
      unitPrice: preset.unitPrice,
      currency: tripCurrency,
    };
    setItems((prev) => [newItem, ...prev]);
    showToast(`Added "${preset.name}" to calculator!`);
  };

  const handleCreateCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: GearItem = {
      id: generateGearItemId(),
      name: newItemName.trim(),
      category: newItemCategory,
      quantity: newItemQty,
      unitPrice: newItemPrice,
      currency: tripCurrency,
    };
    setItems((prev) => [newItem, ...prev]);
    setNewItemName('');
    showToast(`Added custom product "${newItem.name}"!`);
  };

  // Push calculated items to active trip's budget!
  const handleSyncToTripBudget = () => {
    if (items.length === 0) return;

    items.forEach((item) => {
      const budgetCategory =
        item.category === 'CAMPING'
          ? 'CAMPING'
          : item.category === 'FOOD_SUPPLIES'
          ? 'FOOD'
          : 'OTHER';

      addBudgetItem({
        tripId: selectedTripId,
        name: `${item.name} (Qty ${item.quantity})`,
        category: budgetCategory,
        estimatedAmount: item.quantity * item.unitPrice,
        actualAmount: item.quantity * item.unitPrice,
        currency: (tripCurrency as Currency) || 'LKR',
        date: new Date().toISOString().split('T')[0],
      });
    });

    showToast(`Synced ${items.length} gear & supplies items to "${activeTrip.title}" budget! 🎉`);
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-slide-up text-sm font-semibold">
          <Check className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-8 sm:p-10 shadow-2xl border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-widest border border-emerald-400/30">
              <Tent className="w-3.5 h-3.5" />
              <span>Section Six • Travel Products & Cost Estimator</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Camping Equipment & Gear Calculator
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Calculate the complete gear, clothing, and food expenses for your adventure. Add items, adjust quantities, look up prices on Google, and sync with your trip budget.
            </p>
          </div>

          {/* Trip Connection Box */}
          <div className="bg-slate-900/80 backdrop-blur-md border border-white/20 p-4 rounded-3xl space-y-2 shrink-0">
            <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">
              Connected Trip Route
            </label>
            <select
              value={selectedTripId}
              onChange={(e) => setSelectedTripId(e.target.value)}
              className="bg-black/50 border border-white/20 text-white font-bold text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer w-full"
            >
              {trips.map((t) => (
                <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                  {t.title} ({t.currency || 'USD'})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Equipment Cost */}
        <div className="bg-white dark:bg-[#0c1e28] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-lg space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Total Equipment & Food Cost
          </span>
          <div className="flex items-baseline gap-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            <span className="text-sm font-semibold text-slate-500">{tripCurrency}</span>
            <span>{totalGearCost.toLocaleString()}</span>
          </div>
          <p className="text-xs text-slate-500">{items.length} items in calculator</p>
        </div>

        {/* Camping Gear Cost */}
        <div className="bg-white dark:bg-[#0c1e28] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-lg space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Tent className="w-3.5 h-3.5 text-emerald-500" /> Camping Equipment
          </span>
          <div className="flex items-baseline gap-1 text-2xl font-bold text-emerald-600">
            <span className="text-xs font-semibold">{tripCurrency}</span>
            <span>{campingCost.toLocaleString()}</span>
          </div>
          <p className="text-xs text-slate-500">Tents, sleeping bags, lanterns & stoves</p>
        </div>

        {/* Travel Products Cost */}
        <div className="bg-white dark:bg-[#0c1e28] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-lg space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Backpack className="w-3.5 h-3.5 text-blue-500" /> Travel Gear & Clothing
          </span>
          <div className="flex items-baseline gap-1 text-2xl font-bold text-blue-600">
            <span className="text-xs font-semibold">{tripCurrency}</span>
            <span>{travelProductsCost.toLocaleString()}</span>
          </div>
          <p className="text-xs text-slate-500">Backpacks, boots, raincoats & power banks</p>
        </div>

        {/* Food & Supplies Cost */}
        <div className="bg-white dark:bg-[#0c1e28] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-lg space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-amber-500" /> Food & Supplies
          </span>
          <div className="flex items-baseline gap-1 text-2xl font-bold text-amber-600">
            <span className="text-xs font-semibold">{tripCurrency}</span>
            <span>{foodCost.toLocaleString()}</span>
          </div>
          <p className="text-xs text-slate-500">Water, snacks, trail rations & camping meals</p>
        </div>
      </div>

      {/* Main Calculator Table + Quick Preset Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Calculator Table */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0c1e28] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                Equipment & Supplies Calculator
              </h3>
              <p className="text-xs text-slate-500">
                Adjust quantity and prices. Use Google search buttons to look up current market rates.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSyncToTripBudget}
                className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>Send to Trip Budget</span>
              </button>
            </div>
          </div>

          {/* Filter Pills & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'ALL', label: 'All Items' },
                { id: 'CAMPING', label: '⛺ Camping Equipment' },
                { id: 'TRAVEL_PRODUCTS', label: '🎒 Travel Products' },
                { id: 'FOOD_SUPPLIES', label: '🍎 Food & Supplies' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border',
                    activeCategory === cat.id
                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-400'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-45">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Filter items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Calculator Table */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Tent className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No equipment items found</p>
              <p className="text-xs text-slate-500">Pick from the catalog on the right or add your custom gear!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="pb-3 font-bold">Product Description</th>
                    <th className="pb-3 font-bold text-center">Quantity</th>
                    <th className="pb-3 font-bold text-right">Unit Price</th>
                    <th className="pb-3 font-bold text-right">Total Cost</th>
                    <th className="pb-3 font-bold text-center">Google Research</th>
                    <th className="pb-3 font-bold text-center">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {filteredItems.map((item) => {
                    const lineTotal = item.quantity * item.unitPrice;
                    return (
                      <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                        <td className="py-3.5 font-medium text-slate-900 dark:text-white">
                          <div>{item.name}</div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                            {item.category === 'CAMPING'
                              ? 'Camping Equipment'
                              : item.category === 'TRAVEL_PRODUCTS'
                              ? 'Travel Product'
                              : 'Food & Supplies'}
                          </span>
                        </td>

                        {/* Quantity Stepper */}
                        <td className="py-3.5 text-center">
                          <div className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs hover:bg-slate-200 cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-6 text-center font-extrabold text-xs">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs hover:bg-slate-200 cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Unit Price Input */}
                        <td className="py-3.5 text-right font-semibold text-slate-700 dark:text-slate-300">
                          <div className="flex items-center justify-end gap-1">
                            <span className="text-xs text-slate-400">{tripCurrency}</span>
                            <input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => handlePriceChange(item.id, Number(e.target.value))}
                              className="w-20 text-right bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                            />
                          </div>
                        </td>

                        {/* Line Total */}
                        <td className="py-3.5 text-right font-extrabold text-emerald-600 dark:text-emerald-400">
                          {tripCurrency} {lineTotal.toLocaleString()}
                        </td>

                        {/* Google Search Redirect Button (Section Six Requirement) */}
                        <td className="py-3.5 text-center">
                          <a
                            href={`https://www.google.com/search?q=${encodeURIComponent(
                              `${item.name} current price ${activeTrip?.destination?.country || ''} online`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-semibold transition-colors"
                            title="Check price on Google"
                          >
                            <span>Price</span>
                            <ExternalLink className="w-3 h-3 text-emerald-500" />
                          </a>
                        </td>

                        {/* Remove Button */}
                        <td className="py-3.5 text-center">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                            title="Remove product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Add Custom Product Form */}
          <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-3">
            <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white">
              + Add Custom Product to Calculator
            </h4>
            <form onSubmit={handleCreateCustomItem} className="grid grid-cols-1 sm:grid-cols-6 gap-2">
              <input
                type="text"
                placeholder="Product name (e.g. Camping multi-tool)..."
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="sm:col-span-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
              <select
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value as GearCategory)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
              >
                <option value="CAMPING">Camping Equipment</option>
                <option value="TRAVEL_PRODUCTS">Travel Product</option>
                <option value="FOOD_SUPPLIES">Food & Supplies</option>
              </select>
              <input
                type="number"
                min="1"
                placeholder="Qty"
                value={newItemQty}
                onChange={(e) => setNewItemQty(Math.max(1, Number(e.target.value)))}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                type="number"
                placeholder="Unit Price"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(Number(e.target.value))}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                className="py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 shadow-sm cursor-pointer transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Catalog of Camping, Travel & Food Presets */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#0c1e28] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-lg space-y-4">
            <div className="flex items-center gap-2 text-emerald-600">
              <ShoppingBag className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                Recommended Gear Catalog
              </h4>
            </div>
            <p className="text-xs text-slate-500">
              Click any recommended travel product or ration pack to add it directly into your trip calculator:
            </p>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {PRESET_GEAR_CATALOG.map((preset, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">{preset.name}</p>
                    <p className="text-[10px] text-emerald-600 font-semibold">
                      {tripCurrency} {preset.unitPrice.toLocaleString()} each
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddPreset(preset)}
                    className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-500 hover:text-slate-950 transition-colors cursor-pointer shrink-0"
                    title="Add to calculator"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Trip Sync Info Card */}
          <div className="bg-linear-to-br from-emerald-950 to-slate-950 text-white rounded-3xl p-6 border border-emerald-500/20 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <DollarSign className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base">Sync with Trip Budget</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Transfer your calculated equipment and food supplies expenses straight into <strong>{activeTrip?.title}</strong>'s budget tracker with a single click.
            </p>
            <button
              onClick={handleSyncToTripBudget}
              className="w-full py-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Send All {items.length} Items to Trip Budget</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GearCalculatorPage;
