import React, { useState, useMemo } from 'react';
import {
  Share2,
  Filter,
  Sliders,
  BarChart3,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  RefreshCw,
  FileQuestion
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';
import { api } from '../services/api';
import useApi from '../hooks/useApi';
import ChartCard from '../components/ChartCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

export const AssociationRules: React.FC = () => {
  const { data, loading, error, errorMessage, refetch } = useApi(
    () => api.getAssociationRules(),
    []
  );

  // Filter thresholds
  const [minSupport, setMinSupport] = useState<number>(0.05);
  const [minConfidence, setMinConfidence] = useState<number>(0.70);
  const [minLift, setMinLift] = useState<number>(1.2);
  const [rankingMetric, setRankingMetric] = useState<'lift' | 'confidence' | 'support'>('lift');

  // Filtered rules computation
  const filteredRules = useMemo(() => {
    if (!data?.rules) return [];
    return data.rules.filter(
      r => r.support >= minSupport && r.confidence >= minConfidence && r.lift >= minLift
    );
  }, [data, minSupport, minConfidence, minLift]);

  // Chart data for strongest rules
  const chartData = useMemo(() => {
    const sorted = [...filteredRules].sort((a, b) => b[rankingMetric] - a[rankingMetric]);
    return sorted.slice(0, 8).map(r => ({
      ruleLabel: `${r.antecedents.join(' & ')} ➔ ${r.consequents.join(' & ')}`,
      shortLabel: `${r.antecedents[0]} ➔ ${r.consequents[0]}`,
      lift: r.lift,
      confidence: r.confidence,
      support: r.support,
      value: r[rankingMetric]
    }));
  }, [filteredRules, rankingMetric]);

  if (loading) {
    return <LoadingState message="Mining Frequent Itemsets & Association Rules..." />;
  }

  if (error || !data) {
    return (
      <ErrorState
        title="Association Rules Unavailable"
        message={errorMessage || "Unable to connect to the ML backend."}
        onRetry={refetch}
      />
    );
  }

  // If association rule mining is not applicable
  if (!data.isApplicable) {
    return (
      <div className="space-y-6">
        <div className="pb-4 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Association Rule Mining
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Market basket and transactional co-occurrence analysis.
          </p>
        </div>

        <EmptyState
          type="not_applicable"
          title="Association Rule Mining Not Applicable"
          description={
            data.reasonIfNotApplicable ||
            "Association rule mining is not applicable to the current dataset."
          }
          actionHref="/dataset"
          actionLabel="Inspect Dataset Variables"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Association Rule Mining
            </h1>
            <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
              Apriori / FP-Growth
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Discover co-occurrence patterns, multi-variable dependencies, and risk trigger associations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 font-mono bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
            {filteredRules.length} of {data.rules.length} Rules Qualified
          </span>
          <button
            onClick={() => refetch()}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 border border-slate-200 bg-white"
            title="Reload rules"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Controls: Min Support, Min Confidence, Min Lift */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-card">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Rule Pruning & Metric Thresholds
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Interactive threshold filter sliders
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Min Support */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">Minimum Support:</span>
              <span className="font-mono text-blue-700 font-bold">{(minSupport * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min={0.01}
              max={0.5}
              step={0.01}
              value={minSupport}
              onChange={e => setMinSupport(Number(e.target.value))}
              className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Fraction of total transactions containing antecedent + consequent
            </span>
          </div>

          {/* Min Confidence */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">Minimum Confidence:</span>
              <span className="font-mono text-blue-700 font-bold">{(minConfidence * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={0.99}
              step={0.01}
              value={minConfidence}
              onChange={e => setMinConfidence(Number(e.target.value))}
              className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Probability of consequent given the occurrence of antecedent
            </span>
          </div>

          {/* Min Lift */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">Minimum Lift:</span>
              <span className="font-mono text-blue-700 font-bold">{minLift.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min={1.0}
              max={5.0}
              step={0.1}
              value={minLift}
              onChange={e => setMinLift(Number(e.target.value))}
              className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Ratio of observed co-occurrence to independence expectation (&gt;1.0)
            </span>
          </div>
        </div>
      </div>

      {/* Strongest Rules Visualization Chart */}
      <ChartCard
        title={`Strongest Association Rules (Ranked by ${rankingMetric.toUpperCase()})`}
        subtitle="Visualizing top conditional dependencies based on current filters"
        badge="Apriori Pruning"
        icon={BarChart3}
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Rank by:</span>
            <select
              value={rankingMetric}
              onChange={e => setRankingMetric(e.target.value as any)}
              className="bg-white border border-slate-300 rounded-md px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none"
            >
              <option value="lift">Lift (Ratio)</option>
              <option value="confidence">Confidence (%)</option>
              <option value="support">Support (%)</option>
            </select>
          </div>
        }
      >
        {chartData.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            No rules meet the current threshold constraints. Try lowering minimum support or lift.
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <YAxis
                  type="category"
                  dataKey="shortLabel"
                  tick={{ fontSize: 10, fill: '#334155' }}
                  width={160}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }}
                  formatter={(val: number, _, item: any) => [
                    rankingMetric === 'lift' ? `${val.toFixed(2)}x` : `${(val * 100).toFixed(1)}%`,
                    item.payload.ruleLabel
                  ]}
                />
                <Bar dataKey="value" fill="#1d4ed8" radius={[0, 4, 4, 0]}>
                  {chartData.map((_, index) => (
                    <Cell
                      key={`rule-cell-${index}`}
                      fill={index === 0 ? '#1d4ed8' : '#3b82f6'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </ChartCard>

      {/* Association Rules Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-200/80 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-900">
              Mined Association Rules Ledger
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Showing {filteredRules.length} rules
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 uppercase font-semibold tracking-wider">
                <th className="py-3 px-4">Antecedent (If...)</th>
                <th className="py-3 px-4 text-center">Implies</th>
                <th className="py-3 px-4">Consequent (Then...)</th>
                <th className="py-3 px-4">Support</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Lift</th>
                <th className="py-3 px-4">Conviction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRules.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    No rules match current filters.
                  </td>
                </tr>
              ) : (
                filteredRules.map(rule => (
                  <tr key={rule.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-slate-800">
                      <div className="flex flex-wrap gap-1">
                        {rule.antecedents.map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] border border-slate-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-400">
                      <ArrowRight className="w-3.5 h-3.5 mx-auto text-blue-600" />
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-slate-800">
                      <div className="flex flex-wrap gap-1">
                        {rule.consequents.map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded text-[11px] border border-blue-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {(rule.support * 100).toFixed(1)}%
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {(rule.confidence * 100).toFixed(1)}%
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">
                      {rule.lift.toFixed(2)}x
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {rule.conviction ? rule.conviction.toFixed(2) : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssociationRules;
