import React, { useState, useEffect } from 'react';
import {
  CheckSquare, Square, Plus, Trash2, CheckCircle2, RotateCcw,
  Luggage
} from 'lucide-react';
import { setPageTitle, cn } from '@/lib/utils';

export type ChecklistCategory = 'DOCUMENTS' | 'CLOTHING' | 'CAMPING' | 'ELECTRONICS' | 'HEALTH' | 'TOILETRIES';

export interface ChecklistItem {
  id: string;
  title: string;
  category: ChecklistCategory;
  isCompleted: boolean;
  isEssential?: boolean;
}

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  // Documents
  { id: 'c-1', title: 'Passport & International Visas (valid 6+ months)', category: 'DOCUMENTS', isCompleted: true, isEssential: true },
  { id: 'c-2', title: 'Flight & Train Itinerary Confirmations', category: 'DOCUMENTS', isCompleted: true, isEssential: true },
  { id: 'c-3', title: 'Travel Insurance Policy & Emergency Contacts', category: 'DOCUMENTS', isCompleted: false, isEssential: true },
  { id: 'c-4', title: 'Photocopies of ID & Credit Cards', category: 'DOCUMENTS', isCompleted: false },
  
  // Clothing
  { id: 'c-5', title: 'Weather-appropriate Layers & Lightweight Windbreaker', category: 'CLOTHING', isCompleted: false, isEssential: true },
  { id: 'c-6', title: 'Sturdy Walking / Hiking Shoes & Extra Socks', category: 'CLOTHING', isCompleted: false, isEssential: true },
  { id: 'c-7', title: 'Sun Hat, Sunglasses & Quick-dry Towel', category: 'CLOTHING', isCompleted: false },

  // Camping & Outdoor
  { id: 'c-8', title: 'Waterproof Tent & Ground Tarp', category: 'CAMPING', isCompleted: false, isEssential: true },
  { id: 'c-9', title: 'Sleeping Bag & Insulated Mat', category: 'CAMPING', isCompleted: false },
  { id: 'c-10', title: 'Headlamp & Extra Batteries', category: 'CAMPING', isCompleted: false, isEssential: true },
  { id: 'c-11', title: 'Portable Cookware & Water Purifier', category: 'CAMPING', isCompleted: false },

  // Electronics
  { id: 'c-12', title: 'Universal Power Adapter & Cable Organizers', category: 'ELECTRONICS', isCompleted: false, isEssential: true },
  { id: 'c-13', title: 'High-Capacity Power Bank (10,000-20,000mAh)', category: 'ELECTRONICS', isCompleted: false, isEssential: true },
  { id: 'c-14', title: 'Camera, Memory Cards & Chargers', category: 'ELECTRONICS', isCompleted: false },

  // Health & Medicine
  { id: 'c-15', title: 'Personal Prescription Medications', category: 'HEALTH', isCompleted: false, isEssential: true },
  { id: 'c-16', title: 'First Aid Kit (bandages, antiseptic, pain relief)', category: 'HEALTH', isCompleted: false, isEssential: true },
  { id: 'c-17', title: 'Insect Repellent & Broad-Spectrum Sunscreen', category: 'HEALTH', isCompleted: false },

  // Toiletries
  { id: 'c-18', title: 'Travel-size Toothbrush, Paste & Biodegradable Soap', category: 'TOILETRIES', isCompleted: false },
  { id: 'c-19', title: 'Hand Sanitizer & Disinfectant Wet Wipes', category: 'TOILETRIES', isCompleted: false },
];

const CATEGORY_TABS: { id: string; label: string; icon: string }[] = [
  { id: 'ALL', label: 'All Items', icon: '📋' },
  { id: 'DOCUMENTS', label: 'Documents', icon: '🛂' },
  { id: 'CLOTHING', label: 'Clothing', icon: '👕' },
  { id: 'CAMPING', label: 'Camping', icon: '⛺' },
  { id: 'ELECTRONICS', label: 'Electronics', icon: '🔌' },
  { id: 'HEALTH', label: 'Health & Care', icon: '💊' },
  { id: 'TOILETRIES', label: 'Toiletries', icon: '🧼' },
];

let checklistCounter = 100;
const generateChecklistId = () => `cl-${++checklistCounter}`;

export const ChecklistPage: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('travel_to_heaven_checklist');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_CHECKLIST;
  });

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ChecklistCategory>('DOCUMENTS');
  const [isNewEssential, setIsNewEssential] = useState(false);

  useEffect(() => {
    setPageTitle('Trip Packing & Preparation Checklist — Travel to Heaven');
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('travel_to_heaven_checklist', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted } : item))
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefault = () => {
    if (window.confirm('Reset checklist back to standard travel essentials?')) {
      setItems(DEFAULT_CHECKLIST);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: ChecklistItem = {
      id: generateChecklistId(),
      title: newTitle.trim(),
      category: newCategory,
      isCompleted: false,
      isEssential: isNewEssential,
    };

    setItems((prev) => [newItem, ...prev]);
    setNewTitle('');
    setIsNewEssential(false);
  };

  const completedCount = items.filter((i) => i.isCompleted).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'ALL') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-slate-900 via-teal-950 to-slate-900 border border-teal-500/20 p-6 sm:p-10 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Luggage className="w-3.5 h-3.5" /> Packing & Trip Prep
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-black text-white">
              Travel Packing Checklist
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-light">
              Make sure you never forget passports, visas, weather gear, camping equipment, or chargers before departure.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 min-w-[200px] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">Ready to Travel</span>
              <span className="text-teal-400 font-extrabold">{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              {completedCount} of {totalCount} items packed
            </p>
          </div>
        </div>
      </div>

      {/* Add Item Card */}
      <div className="bg-white dark:bg-[#0c1e28] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-teal-500" />
            <span>Add Custom Checklist Item</span>
          </h3>
          <button
            onClick={resetToDefault}
            className="text-xs text-slate-500 hover:text-teal-600 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>

        <form onSubmit={handleAddItem} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <input
            type="text"
            placeholder="Item name (e.g. Extra camera battery, Rain cover)..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="sm:col-span-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as ChecklistCategory)}
            className="sm:col-span-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
          >
            <option value="DOCUMENTS">🛂 Documents</option>
            <option value="CLOTHING">👕 Clothing</option>
            <option value="CAMPING">⛺ Camping & Gear</option>
            <option value="ELECTRONICS">🔌 Electronics</option>
            <option value="HEALTH">💊 Health & Medicine</option>
            <option value="TOILETRIES">🧼 Toiletries</option>
          </select>
          <label className="sm:col-span-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isNewEssential}
              onChange={(e) => setIsNewEssential(e.target.checked)}
              className="rounded text-teal-500 focus:ring-teal-400"
            />
            <span>Essential item</span>
          </label>
          <button
            type="submit"
            className="sm:col-span-2 py-2.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-3" />
            <span>Add Item</span>
          </button>
        </form>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORY_TABS.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5',
              activeCategory === cat.id
                ? 'bg-teal-500 text-slate-950 border-teal-500 font-bold shadow-md shadow-teal-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-400'
            )}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Checklist Items List */}
      <div className="bg-white dark:bg-[#0c1e28] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-lg space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-teal-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">All caught up in this category!</p>
            <p className="text-xs text-slate-500">Add your custom items above or switch categories.</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={cn(
                'p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group select-none',
                item.isCompleted
                  ? 'bg-teal-50/50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-900/40 opacity-75'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-teal-400 shadow-xs'
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  className="text-teal-600 dark:text-teal-400 shrink-0"
                >
                  {item.isCompleted ? (
                    <CheckSquare className="w-5 h-5 fill-teal-500 text-white dark:text-slate-900" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400 group-hover:text-teal-500" />
                  )}
                </button>
                <div className="min-w-0">
                  <span
                    className={cn(
                      'text-xs sm:text-sm font-medium transition-all block truncate',
                      item.isCompleted
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-800 dark:text-slate-200'
                    )}
                  >
                    {item.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.isEssential && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 text-[10px] font-bold border border-amber-200 dark:border-amber-800">
                    Essential
                  </span>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(item.id);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChecklistPage;
