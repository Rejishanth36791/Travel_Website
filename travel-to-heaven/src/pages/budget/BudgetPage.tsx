import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign, Plus, Trash2, Edit3, ArrowRight, PieChart, Coins
} from 'lucide-react';
import { useTravel } from '@/context/TravelContext';
import { setPageTitle, cn } from '@/lib/utils';
import type { BudgetCategory, Currency } from '@/types/budget.types';

const CATEGORY_LABELS: Record<BudgetCategory, { label: string; icon: string; color: string }> = {
  TRANSPORTATION: { label: 'Local Transportation', icon: '🚆', color: 'bg-blue-500' },
  FOOD: { label: 'Food & Dining', icon: '🍜', color: 'bg-amber-500' },
  ENTRANCE_FEES: { label: 'Entrance Fees & Tickets', icon: '🎟️', color: 'bg-purple-500' },
  CAMPING: { label: 'Camping Equipment & Gear', icon: '⛺', color: 'bg-emerald-500' },
  ACCOMMODATION: { label: 'Hotels & Lodging', icon: '🏨', color: 'bg-indigo-500' },
  ACTIVITIES: { label: 'Tours & Experiences', icon: '🏄', color: 'bg-teal-500' },
  SHOPPING: { label: 'Shopping & Souvenirs', icon: '🛍️', color: 'bg-pink-500' },
  FLIGHTS: { label: 'International Flights', icon: '✈️', color: 'bg-sky-500' },
  OTHER: { label: 'Other Travel Expenses', icon: '📦', color: 'bg-slate-500' },
};

const EXCHANGE_RATES_FROM_USD: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  JPY: 154.5,
  LKR: 305.0,
  GBP: 0.78,
  CAD: 1.36,
  AUD: 1.52,
};

export const BudgetPage: React.FC = () => {
  const { trips, budgetItems, addBudgetItem, deleteBudgetItem, updateBudgetItem } = useTravel();

  const [selectedTripId, setSelectedTripId] = useState<string>(trips[0]?.id || 'trip-1');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Form State
  const [expenseName, setExpenseName] = useState('');
  const [category, setCategory] = useState<BudgetCategory>('TRANSPORTATION');
  const [estimatedAmount, setEstimatedAmount] = useState<number>(0);
  const [actualAmount, setActualAmount] = useState<number>(0);
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);

  // Currency Converter State
  const [convertFrom, setConvertFrom] = useState<string>('USD');
  const [convertTo, setConvertTo] = useState<string>('JPY');
  const [convertAmount, setConvertAmount] = useState<number>(100);

  React.useEffect(() => {
    setPageTitle('Trip Cost & Budget Planning — Travel to Heaven');
  }, []);

  const activeTrip = trips.find((t) => t.id === selectedTripId) || trips[0];
  const tripCurrency = (activeTrip?.currency as Currency) || 'USD';

  // Filter items for selected trip
  const activeItems = budgetItems.filter((b) => b.tripId === selectedTripId);

  // Calculations (Section Five: Planned, Actual, Remaining)
  const totalPlanned = activeItems.reduce((sum, item) => sum + (item.estimatedAmount || 0), 0);
  const totalActual = activeItems.reduce((sum, item) => sum + (item.actualAmount || 0), 0);
  const tripTotalBudget = activeTrip?.totalBudget || (totalPlanned > 0 ? totalPlanned : 28000);
  const remainingBudget = tripTotalBudget - totalActual;
  const percentageSpent = tripTotalBudget > 0 ? Math.min(100, Math.round((totalActual / tripTotalBudget) * 100)) : 0;

  // Group by category
  const categoryTotals: Record<string, { estimated: number; actual: number }> = {};
  activeItems.forEach((item) => {
    if (!categoryTotals[item.category]) {
      categoryTotals[item.category] = { estimated: 0, actual: 0 };
    }
    categoryTotals[item.category].estimated += item.estimatedAmount || 0;
    categoryTotals[item.category].actual += item.actualAmount || 0;
  });

  const handleCreateOrUpdateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseName.trim()) return;

    if (editingItemId) {
      updateBudgetItem(editingItemId, {
        name: expenseName.trim(),
        category,
        estimatedAmount,
        actualAmount,
        date: expenseDate,
      });
      setEditingItemId(null);
    } else {
      addBudgetItem({
        tripId: selectedTripId,
        name: expenseName.trim(),
        category,
        estimatedAmount,
        actualAmount,
        currency: tripCurrency,
        date: expenseDate,
      });
    }

    setExpenseName('');
    setEstimatedAmount(0);
    setActualAmount(0);
    setShowAddModal(false);
  };

  const handleOpenEdit = (item: typeof budgetItems[0]) => {
    setEditingItemId(item.id);
    setExpenseName(item.name);
    setCategory(item.category);
    setEstimatedAmount(item.estimatedAmount);
    setActualAmount(item.actualAmount);
    setExpenseDate(item.date || new Date().toISOString().split('T')[0]);
    setShowAddModal(true);
  };

  // Convert Calculation
  const convertedResult = () => {
    const fromRate = EXCHANGE_RATES_FROM_USD[convertFrom] || 1;
    const toRate = EXCHANGE_RATES_FROM_USD[convertTo] || 1;
    const inUsd = convertAmount / fromRate;
    return (inUsd * toRate).toFixed(2);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-8 sm:p-10 shadow-2xl border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-bold uppercase tracking-widest border border-teal-400/30">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Section Five • Trip Cost Planning</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Trip Budget Management
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Estimate and record transportation, food, entrance fees, camping equipment, and other expenses. Compare planned costs against actual spending in real time.
            </p>
          </div>

          {/* Trip Selector Dropdown */}
          <div className="bg-slate-900/80 backdrop-blur-md border border-white/20 p-4 rounded-3xl space-y-2 shrink-0">
            <label className="text-[10px] font-bold uppercase tracking-wider text-teal-300 block">
              Active Trip Budget
            </label>
            <select
              value={selectedTripId}
              onChange={(e) => setSelectedTripId(e.target.value)}
              className="bg-black/50 border border-white/20 text-white font-bold text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer w-full"
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

      {/* Summary KPI Cards Grid (Planned vs Actual vs Remaining) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Planned Budget */}
        <div className="bg-white dark:bg-[#0c1e28] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-lg space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Total Planned Budget
          </span>
          <div className="flex items-baseline gap-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            <span className="text-sm font-semibold text-slate-500">{tripCurrency}</span>
            <span>{tripTotalBudget.toLocaleString()}</span>
          </div>
          <p className="text-xs text-slate-500">Planned expenditure estimate</p>
        </div>

        {/* Card 2: Actual Spending */}
        <div className="bg-white dark:bg-[#0c1e28] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-lg space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Actual Spending
          </span>
          <div className="flex items-baseline gap-1 text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400">
            <span className="text-sm font-semibold text-teal-500">{tripCurrency}</span>
            <span>{totalActual.toLocaleString()}</span>
          </div>
          <p className="text-xs text-slate-500">{percentageSpent}% of planned budget used</p>
        </div>

        {/* Card 3: Remaining Budget */}
        <div className="bg-white dark:bg-[#0c1e28] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-lg space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Remaining Budget
          </span>
          <div className={cn(
            'flex items-baseline gap-1 text-2xl sm:text-3xl font-extrabold',
            remainingBudget >= 0 ? 'text-emerald-600' : 'text-rose-500'
          )}>
            <span className="text-sm font-semibold">{tripCurrency}</span>
            <span>{remainingBudget.toLocaleString()}</span>
          </div>
          <p className="text-xs text-slate-500">
            {remainingBudget >= 0 ? 'Comfortably within budget' : 'Over planned budget'}
          </p>
        </div>

        {/* Card 4: Action Button */}
        <div className="bg-linear-to-br from-teal-500 to-emerald-600 rounded-3xl p-6 shadow-xl text-slate-950 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest block text-teal-950/80">
              Quick Expense Action
            </span>
            <h4 className="font-serif text-lg font-bold leading-tight mt-1">Record Trip Expense</h4>
          </div>
          <button
            onClick={() => {
              setEditingItemId(null);
              setExpenseName('');
              setEstimatedAmount(0);
              setActualAmount(0);
              setShowAddModal(true);
            }}
            className="w-full py-2.5 rounded-2xl bg-slate-950 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-slate-900 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Main Budget Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Expenses Table */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0c1e28] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                Expense Items for {activeTrip?.title}
              </h3>
              <p className="text-xs text-slate-500">
                Transportation, Food, Entrance fees, Camping equipment & Gear
              </p>
            </div>

            <button
              onClick={() => {
                setEditingItemId(null);
                setExpenseName('');
                setEstimatedAmount(0);
                setActualAmount(0);
                setShowAddModal(true);
              }}
              className="px-4 py-2 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Expense</span>
            </button>
          </div>

          {activeItems.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <DollarSign className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No expenses recorded for this trip</p>
              <p className="text-xs text-slate-500">Add local transportation, food, entrance fees, or equipment.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="pb-3 font-bold">Category</th>
                    <th className="pb-3 font-bold">Expense Description</th>
                    <th className="pb-3 font-bold text-right">Estimated</th>
                    <th className="pb-3 font-bold text-right">Actual Spent</th>
                    <th className="pb-3 font-bold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {activeItems.map((item) => {
                    const catInfo = CATEGORY_LABELS[item.category] || CATEGORY_LABELS.OTHER;
                    return (
                      <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                        <td className="py-3.5 pr-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            <span>{catInfo.icon}</span>
                            <span className="hidden sm:inline">{catInfo.label}</span>
                          </span>
                        </td>
                        <td className="py-3.5 font-medium text-slate-900 dark:text-white">
                          <div>{item.name}</div>
                          {item.date && <div className="text-[10px] text-slate-400">{item.date}</div>}
                        </td>
                        <td className="py-3.5 text-right font-semibold text-slate-600 dark:text-slate-300">
                          {tripCurrency} {item.estimatedAmount.toLocaleString()}
                        </td>
                        <td className="py-3.5 text-right font-bold text-teal-600 dark:text-teal-400">
                          {tripCurrency} {item.actualAmount.toLocaleString()}
                        </td>
                        <td className="py-3.5 text-center">
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEdit(item)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                              title="Edit item"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteBudgetItem(item.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                              title="Delete item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column: Spending by Category & Currency Converter */}
        <div className="lg:col-span-4 space-y-6">
          {/* Category Breakdown Card */}
          <div className="bg-white dark:bg-[#0c1e28] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-lg space-y-4">
            <div className="flex items-center gap-2 text-teal-600">
              <PieChart className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">Category Breakdown</h4>
            </div>

            <div className="space-y-3">
              {Object.entries(categoryTotals).map(([catKey, val]) => {
                const info = CATEGORY_LABELS[catKey as BudgetCategory] || CATEGORY_LABELS.OTHER;
                const catPercentage = totalActual > 0 ? Math.round((val.actual / totalActual) * 100) : 0;

                return (
                  <div key={catKey} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <span>{info.icon}</span> {info.label}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {tripCurrency} {val.actual.toLocaleString()} ({catPercentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all duration-500', info.color)}
                        style={{ width: `${catPercentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Gear Calculator Link */}
            <div className="pt-3 border-t border-slate-100 dark:border-white/10">
              <Link
                to="/gear-calculator"
                className="w-full py-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-teal-100 transition-colors"
              >
                <span>Open Camping & Gear Cost Estimator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Currency Exchange Rate Converter */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-teal-400">
              <Coins className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base">Currency Exchange Calculator</h4>
            </div>
            <p className="text-xs text-slate-400">
              Instant conversion estimate based on current international reference exchange rates.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={convertAmount}
                  onChange={(e) => setConvertAmount(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    From
                  </label>
                  <select
                    value={convertFrom}
                    onChange={(e) => setConvertFrom(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                  >
                    {Object.keys(EXCHANGE_RATES_FROM_USD).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    To
                  </label>
                  <select
                    value={convertTo}
                    onChange={(e) => setConvertTo(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                  >
                    {Object.keys(EXCHANGE_RATES_FROM_USD).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-center">
                <span className="text-xs text-teal-300 font-semibold block">Converted Equivalent</span>
                <span className="text-xl font-extrabold text-white">
                  {convertTo} {convertedResult()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#0c1e28] rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200 dark:border-white/10 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                {editingItemId ? 'Edit Expense Item' : 'Add Trip Expense'}
              </h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOrUpdateExpense} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Expense Name</label>
                <input
                  type="text"
                  placeholder="e.g. Shinkansen Bullet Train pass, Camping tent, Ramen dinner..."
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as BudgetCategory)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                >
                  <option value="TRANSPORTATION">🚆 Local Transportation</option>
                  <option value="FOOD">🍜 Food & Dining</option>
                  <option value="ENTRANCE_FEES">🎟️ Entrance Fees & Tickets</option>
                  <option value="CAMPING">⛺ Camping Equipment & Gear</option>
                  <option value="ACCOMMODATION">🏨 Hotels & Lodging</option>
                  <option value="ACTIVITIES">🏄 Tours & Activities</option>
                  <option value="SHOPPING">🛍️ Shopping & Souvenirs</option>
                  <option value="OTHER">📦 Other Expenses</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Estimated ({tripCurrency})
                  </label>
                  <input
                    type="number"
                    value={estimatedAmount}
                    onChange={(e) => setEstimatedAmount(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Actual Spent ({tripCurrency})
                  </label>
                  <input
                    type="number"
                    value={actualAmount}
                    onChange={(e) => setActualAmount(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Date</label>
                <input
                  type="date"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 text-xs font-semibold text-slate-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
                >
                  {editingItemId ? 'Save Changes' : 'Record Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
