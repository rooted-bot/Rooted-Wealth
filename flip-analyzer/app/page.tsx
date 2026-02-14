'use client';

import { useState } from 'react';
import Logo from './components/Logo';
import { BuyBox, Deal, DealAnalysis, PropertyType, DealGrade } from '@/types';
import { analyzeDeal, formatCurrency, formatPercent } from '@/lib/analysis';

const defaultBuyBox: BuyBox = {
  name: '85254 Luxury Flips',
  zipCodes: ['85254'],
  minLotSize: 0.5,
  propertyTypes: ['single-family'],
  maxPurchasePrice: 1000000,
  minCashOnCash: 15,
  maxRehabBudget: 200000,
  holdingPeriodMonths: 4,
  targetProfitMin: 50000,
  hardMoneyRate: 12,
  hardMoneyPoints: 2,
  sellingCostsPercent: 7,
};

const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: 'single-family', label: 'Single Family' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'condo', label: 'Condo' },
  { value: 'multi-family', label: 'Multi-Family' },
];

export default function Home() {
  const [buyBox, setBuyBox] = useState<BuyBox>(defaultBuyBox);
  const [showBuyBoxForm, setShowBuyBoxForm] = useState(false);
  const [deal, setDeal] = useState<Partial<Deal>>({
    propertyType: 'single-family',
  });
  const [analysis, setAnalysis] = useState<DealAnalysis | null>(null);

  const handleAnalyze = () => {
    if (!deal.listPrice || !deal.estimatedArv || !deal.rehabEstimate) return;
    
    const fullDeal: Deal = {
      ...deal,
      id: Date.now().toString(),
      status: 'analyzed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Deal;
    
    const result = analyzeDeal(fullDeal, buyBox);
    setAnalysis(result);
  };

  const getGradeColor = (grade: DealGrade) => {
    switch (grade) {
      case 'A': return 'bg-green-500 text-white';
      case 'B': return 'bg-blue-500 text-white';
      case 'C': return 'bg-amber-500 text-white';
      case 'D': return 'bg-red-500 text-white';
    }
  };

  const getGradeBg = (grade: DealGrade) => {
    switch (grade) {
      case 'A': return 'bg-green-50 border-green-200';
      case 'B': return 'bg-blue-50 border-blue-200';
      case 'C': return 'bg-amber-50 border-amber-200';
      case 'D': return 'bg-red-50 border-red-200';
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <header className="brand-gradient text-white sticky top-0 z-50 shadow-xl">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <button
              onClick={() => setShowBuyBoxForm(!showBuyBoxForm)}
              className="btn-secondary text-sm"
            >
              {showBuyBoxForm ? 'Hide' : 'Edit'} Buy Box
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Analyze. <span className="text-amber-400">Profit.</span> Repeat.
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Professional real estate deal analysis for investors who want to make data-driven decisions.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Buy Box Form */}
        {showBuyBoxForm && (
          <section className="card">
            <div className="card-header">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h2 className="text-xl font-bold">Buy Box Criteria</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Buy Box Name
                  </label>
                  <input
                    type="text"
                    value={buyBox.name}
                    onChange={(e) => setBuyBox({ ...buyBox, name: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Zip Codes
                  </label>
                  <input
                    type="text"
                    value={buyBox.zipCodes.join(', ')}
                    onChange={(e) => setBuyBox({ ...buyBox, zipCodes: e.target.value.split(',').map(z => z.trim()) })}
                    className="input-field"
                    placeholder="85254, 85255, 85258"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Max Purchase Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-500">$</span>
                    <input
                      type="number"
                      value={buyBox.maxPurchasePrice}
                      onChange={(e) => setBuyBox({ ...buyBox, maxPurchasePrice: Number(e.target.value) })}
                      className="input-field pl-8"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Min Cash-on-Cash Return
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={buyBox.minCashOnCash}
                      onChange={(e) => setBuyBox({ ...buyBox, minCashOnCash: Number(e.target.value) })}
                      className="input-field pr-8"
                    />
                    <span className="absolute right-4 top-3 text-slate-500">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Max Rehab Budget
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-500">$</span>
                    <input
                      type="number"
                      value={buyBox.maxRehabBudget}
                      onChange={(e) => setBuyBox({ ...buyBox, maxRehabBudget: Number(e.target.value) })}
                      className="input-field pl-8"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Target Profit Minimum
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-500">$</span>
                    <input
                      type="number"
                      value={buyBox.targetProfitMin}
                      onChange={(e) => setBuyBox({ ...buyBox, targetProfitMin: Number(e.target.value) })}
                      className="input-field pl-8"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Property Details */}
        <section className="card">
          <div className="card-header">
            <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h2 className="text-xl font-bold">Property Details</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Property Address
                </label>
                <input
                  type="text"
                  value={deal.address || ''}
                  onChange={(e) => setDeal({ ...deal, address: e.target.value })}
                  className="input-field"
                  placeholder="123 Main St, Scottsdale, AZ 85254"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Property Type
                </label>
                <select
                  value={deal.propertyType}
                  onChange={(e) => setDeal({ ...deal, propertyType: e.target.value as PropertyType })}
                  className="input-field"
                >
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  List Price / Offer Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-500">$</span>
                  <input
                    type="number"
                    value={deal.listPrice || ''}
                    onChange={(e) => setDeal({ ...deal, listPrice: Number(e.target.value) })}
                    className="input-field pl-8"
                    placeholder="450000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Estimated ARV (After Repair Value)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-500">$</span>
                  <input
                    type="number"
                    value={deal.estimatedArv || ''}
                    onChange={(e) => setDeal({ ...deal, estimatedArv: Number(e.target.value) })}
                    className="input-field pl-8"
                    placeholder="650000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Rehab Estimate
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-500">$</span>
                  <input
                    type="number"
                    value={deal.rehabEstimate || ''}
                    onChange={(e) => setDeal({ ...deal, rehabEstimate: Number(e.target.value) })}
                    className="input-field pl-8"
                    placeholder="75000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Square Footage
                </label>
                <input
                  type="number"
                  value={deal.squareFootage || ''}
                  onChange={(e) => setDeal({ ...deal, squareFootage: Number(e.target.value) })}
                  className="input-field"
                  placeholder="2500"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleAnalyze}
                className="btn-primary w-full md:w-auto text-lg"
              >
                Analyze Deal
              </button>
            </div>
          </div>
        </section>

        {/* Analysis Results */}
        {analysis && (
          <section className={`card border-2 ${getGradeBg(analysis.grade)}`}>
            <div className={`card-header ${analysis.grade === 'A' ? 'bg-green-600' : analysis.grade === 'B' ? 'bg-blue-600' : analysis.grade === 'C' ? 'bg-amber-600' : 'bg-red-600'}`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h2 className="text-xl font-bold">Deal Analysis</h2>
              <div className="ml-auto">
                <span className={`inline-flex items-center justify-center w-12 h-12 text-2xl font-bold rounded-full bg-white ${getGradeColor(analysis.grade).replace('bg-', 'text-').replace(' text-white', '')}`}>
                  {analysis.grade}
                </span>
              </div>
            </div>
            <div className="p-6">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="stat-card">
                  <div className="stat-value text-green-600">
                    {formatCurrency(analysis.netProfit)}
                  </div>
                  <div className="stat-label">Net Profit</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">
                    {formatPercent(analysis.roi)}
                  </div>
                  <div className="stat-label">ROI</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">
                    {formatPercent(analysis.cashOnCash)}
                  </div>
                  <div className="stat-label">Cash-on-Cash</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">
                    {formatCurrency(analysis.totalCashNeeded)}
                  </div>
                  <div className="stat-label">Total Cash Needed</div>
                </div>
              </div>

              {/* Exit Strategies */}
              <h3 className="text-lg font-bold text-slate-900 mb-4">Exit Strategy Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg border-2 ${analysis.exitStrategies.wholesale.viable ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🏆</span>
                    <h4 className="font-bold text-slate-900">Wholesale</h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">
                    Spread: {formatCurrency(analysis.exitStrategies.wholesale.spread)}
                  </p>
                  <span className={`badge ${analysis.exitStrategies.wholesale.viable ? 'badge-success' : 'badge-error'}`}>
                    {analysis.exitStrategies.wholesale.viable ? '✓ Viable' : '✗ Not Viable'}
                  </span>
                </div>

                <div className={`p-4 rounded-lg border-2 ${analysis.exitStrategies.flip.viable ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🔨</span>
                    <h4 className="font-bold text-slate-900">Flip</h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">
                    Profit: {formatCurrency(analysis.exitStrategies.flip.profit)}
                  </p>
                  <span className={`badge ${analysis.exitStrategies.flip.viable ? 'badge-success' : 'badge-error'}`}>
                    {analysis.exitStrategies.flip.viable ? '✓ Viable' : '✗ Not Viable'}
                  </span>
                </div>

                <div className={`p-4 rounded-lg border-2 ${analysis.exitStrategies.brrrr.viable ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🏦</span>
                    <h4 className="font-bold text-slate-900">BRRRR</h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">
                    Cash Flow: {formatCurrency(analysis.exitStrategies.brrrr.cashFlow)}/mo
                  </p>
                  <span className={`badge ${analysis.exitStrategies.brrrr.viable ? 'badge-success' : 'badge-error'}`}>
                    {analysis.exitStrategies.brrrr.viable ? '✓ Viable' : '✗ Not Viable'}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Logo size="sm" />
          <p className="mt-4 text-sm">
            Professional real estate analysis tool. Make data-driven investment decisions.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            © 2026 Flip Analyzer. Built for Rooted Companies.
          </p>
        </div>
      </footer>
    </main>
  );
}
