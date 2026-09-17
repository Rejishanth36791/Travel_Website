import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { setPageTitle, formatCurrency, cn } from '@/lib/utils';
import {
  ArrowLeft, Wallet, PlusCircle, TrendingUp, TrendingDown,
  Plane, Hotel, UtensilsCrossed, ShoppingBag, Ticket, Car, MoreHorizontal,
  Trash2, Edit3, X, Check,
} from 'lucide-react';
import type { BudgetItem, BudgetCategory, BudgetCategorySummary } from '@/types/budget.types';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useTravel } from '@/context/TravelContext';

const CATEGORY_META: Record<BudgetCategory, { icon: React.ElementType; color: string; bg: string }> = {
  FLIGHTS: { icon: Plane, color: 'text-sky-600', bg: 'bg-sky-50' },
  ACCOMMODATION: { icon: Hotel, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  FOOD: { icon: UtensilsCrossed, color: 'text-amber-600', bg: 'bg-amber-50' },
  TRANSPORTATION: { icon: Car, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ACTIVITIES: { icon: Ticket, color: 'text-violet-600', bg: 'bg-violet-50' },
  SHOPPING: { icon: ShoppingBag, color: 'text-rose-600', bg: 'bg-rose-50' },
  OTHER: { icon: MoreHorizontal, color: 'text-slate-600', bg: 'bg-slate-50' },
};

export const BudgetPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const currentTripId = id || 'trip-1';
  const { budgetItems, addBudgetItem, updateBudgetItem, deleteBudgetItem } = useTravel();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // New item form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<BudgetCategory>('FLIGHTS');
  const [estimated, setEstimated] = useState('');
  const [actual, setActual] = useState('');

  // Edit item form state
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState<BudgetCategory>('FLIGHTS');
  const [editEstimated, setEditEstimated] = useState('');
  const [editActual, setEditActual] = useState('');

  useEffect(() => {
    setPageTitle('Travel Budget Tracker — Travel to Heaven');
  }, []);

  // Filter items for this trip
  const tripItems = budgetItems.filter((i) => i.tripId === currentTripId);
  const displayItems = tripItems.length > 0 ? tripItems : budgetItems;

  const totalEstimated = displayItems.reduce((sum, i) => sum + i.estimatedAmount, 0);
  const totalActual = displayItems.reduce((sum, i) => sum + i.actualAmount, 0);
  const remaining = totalEstimated - totalActual;
  const spentPct = totalEstimated > 0 ? (totalActual / totalEstimated) * 100 : 0;

  // Category summaries
  const categorySummaries: BudgetCategorySummary[] = (Object.keys(CATEGORY_META) as BudgetCategory[])
    .map((cat) => {
      const catItems = displayItems.filter((i) => i.category === cat);
      return {
        category: cat,
        estimated: catItems.reduce((s, i) => s + i.estimatedAmount, 0),
        actual: catItems.reduce((s, i) => s + i.actualAmount, 0),
      };
    })
    .filter((s) => s.estimated > 0 || s.actual > 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addBudgetItem({
      tripId: currentTripId,
      name: name.trim(),
      category,
      estimatedAmount: parseFloat(estimated) || 0,
      actualAmount: parseFloat(actual) || 0,
      currency: 'USD',
      date: new Date().toISOString().split('T')[0],
    });

    setName('');
    setCategory('FLIGHTS');
    setEstimated('');
    setActual('');
    setShowAddForm(false);
  };

  const startEdit = (item: BudgetItem) => {
    setEditingItemId(item.id);
    setEditName(item.name);
    setEditCategory(item.category);
    setEditEstimated(item.estimatedAmount.toString());
    setEditActual(item.actualAmount.toString());
  };

  const handleUpdate = (idToUpdate: string) => {
    if (!editName.trim()) return;
    updateBudgetItem(idToUpdate, {
      name: editName.trim(),
      category: editCategory,
      estimatedAmount: parseFloat(editEstimated) || 0,
      actualAmount: parseFloat(editActual) || 0,
    });
    setEditingItemId(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <header className="space-y-2">
        <Link to={`/trips/${currentTripId}`} className="text-sm text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-1 w-fit">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Trip
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">Budget Tracker</h1>
            <p className="text-slate-500 text-xs">Trip ID: {currentTripId}</p>
          </div>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Total Planned Budget</p>
          <p className="text-2xl font-extrabold text-slate-900">{formatCurrency(totalEstimated)}</p>
          <p className="text-xs text-slate-400">{displayItems.length} tracked items</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
            <TrendingDown className="w-3 h-3 text-rose-500" /> Total Spent
          </p>
          <p className="text-2xl font-extrabold text-rose-600">{formatCurrency(totalActual)}</p>
          <p className="text-xs text-slate-400">{spentPct.toFixed(0)}% of budget utilized</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-500" /> Remaining Balance
          </p>
          <p className={cn('text-2xl font-extrabold', remaining >= 0 ? 'text-emerald-600' : 'text-rose-600')}>
            {formatCurrency(Math.abs(remaining))}
            {remaining < 0 && <span className="text-sm ml-1 font-semibold text-rose-500">(Over Budget)</span>}
          </p>
          <p className="text-xs text-slate-400">
            {remaining >= 0 ? 'Within budget allocation' : 'Adjust planned expenses'}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex justify-between text-xs text-slate-600 font-medium">
          <span>Budget Utilization Progress</span>
          <span>{spentPct.toFixed(1)}%</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              spentPct > 90 ? 'bg-rose-500' : spentPct > 60 ? 'bg-amber-500' : 'bg-emerald-500'
            )}
            style={{ width: `${Math.min(spentPct, 100)}%` }}
          />
        </div>
      </div>

      {/* Category Breakdown */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-slate-900">Expenses by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categorySummaries.map((cs) => {
            const meta = CATEGORY_META[cs.category];
            const Icon = meta.icon;
            const pct = cs.estimated > 0 ? (cs.actual / cs.estimated) * 100 : 0;
            return (
              <div key={cs.category} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-4 shadow-sm">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', meta.bg, meta.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-800 capitalize">{cs.category.toLowerCase().replace('_', ' ')}</span>
                    <span className="text-xs font-semibold text-slate-600">{formatCurrency(cs.actual)} / {formatCurrency(cs.estimated)}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={cn('h-full rounded-full', pct > 90 ? 'bg-rose-500' : pct > 60 ? 'bg-amber-500' : 'bg-emerald-500')}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Expense Items */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-slate-900">Detailed Expense Items</h2>
          <Button variant="outline" size="sm" leftIcon={<PlusCircle className="w-4 h-4" />} onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Close Form' : 'Add Expense'}
          </Button>
        </div>

        {showAddForm && (
          <form onSubmit={handleCreate} className="bg-sky-50/70 rounded-2xl border border-sky-200 p-5 space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-900">Record New Expense</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Expense Name"
                placeholder="E.g., High-speed train to Florence"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as BudgetCategory)}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                >
                  {Object.keys(CATEGORY_META).map((c) => (
                    <option key={c} value={c}>{c.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Estimated Amount ($)"
                type="number"
                placeholder="0.00"
                value={estimated}
                onChange={(e) => setEstimated(e.target.value)}
                required
              />
              <Input
                label="Actual Spent ($)"
                type="number"
                placeholder="0.00"
                value={actual}
                onChange={(e) => setActual(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="primary" size="sm" type="submit">Save Expense</Button>
              <Button variant="ghost" size="sm" type="button" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </form>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {displayItems.map((item) => {
            const meta = CATEGORY_META[item.category];
            const Icon = meta.icon;
            const isEditing = editingItemId === item.id;

            if (isEditing) {
              return (
                <div key={item.id} className="p-4 bg-amber-50/50 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <input
                      className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-sm"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Name"
                    />
                    <select
                      className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-sm"
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value as BudgetCategory)}
                    >
                      {Object.keys(CATEGORY_META).map((c) => (
                        <option key={c} value={c}>{c.replace('_', ' ')}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-sm"
                      value={editEstimated}
                      onChange={(e) => setEditEstimated(e.target.value)}
                      placeholder="Estimated"
                    />
                    <input
                      type="number"
                      className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-sm"
                      value={editActual}
                      onChange={(e) => setEditActual(e.target.value)}
                      placeholder="Actual"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="primary" size="sm" onClick={() => handleUpdate(item.id)} leftIcon={<Check className="w-3.5 h-3.5" />}>
                      Save
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setEditingItemId(null)} leftIcon={<X className="w-3.5 h-3.5" />}>
                      Cancel
                    </Button>
                  </div>
                </div>
              );
            }

            return (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', meta.bg, meta.color)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-400 capitalize">{item.category.toLowerCase().replace('_', ' ')}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/80 pt-2 sm:pt-0">
                  <div className="text-left sm:text-right shrink-0">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{formatCurrency(item.actualAmount || 0)}</p>
                    <p className="text-[10px] text-slate-400">planned {formatCurrency(item.estimatedAmount)}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => startEdit(item)}
                      className="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Edit expense"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteBudgetItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Delete expense"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </section>
    </div>
  );
};
