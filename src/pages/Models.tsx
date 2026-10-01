import React, { useState } from 'react';
import {
  GitCompare,
  Award,
  Clock,
  Layers,
  BarChart3,
  CheckCircle2,
  RefreshCw,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell
} from 'recharts';
import { api } from '../services/api';
import useApi from '../hooks/useApi';
import ModelTable from '../components/ModelTable';
import ChartCard from '../components/ChartCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

export const Models: React.FC = () => {
  const { data, loading, error, errorMessage, refetch } = useApi(
    () => api.getModels(),
    []
  );

  const [activeTab, setActiveTab] = useState<'classification' | 'regression'>('classification');

  if (loading) {
    return <LoadingState message="Loading Algorithm Benchmarking Results..." />;
  }

  if (error || !data) {
    return (
      <ErrorState
        title="Model Benchmark Data Unavailable"
        message={errorMessage || "Unable to connect to the ML backend."}
        onRetry={refetch}
      />
    );
  }

  const { selectedModel, classificationModels, regressionModels, evaluationSummary } = data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Model Evaluation & Benchmark Comparison
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Empirical benchmark metrics across supervised classification and regression algorithms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab buttons */}
          <div className="bg-slate-200/80 p-0.5 rounded-lg flex items-center text-xs font-semibold">
            <button
              onClick={() => setActiveTab('classification')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'classification'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Classification ({classificationModels.length})
            </button>
            <button
              onClick={() => setActiveTab('regression')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'regression'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Regression ({regressionModels.length})
            </button>
          </div>

          <button
            onClick={() => refetch()}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 border border-slate-200 bg-white"
            title="Reload benchmarks"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Selected Model Callout (Objective backend citation) */}
      {selectedModel && (
        <div className="p-4 bg-blue-50/70 border border-blue-200/90 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 block">
                Backend Optimal Model Selection
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {selectedModel.name}
              </h3>
              <p className="text-xs text-slate-600">
                Selected based on documented criteria: <strong className="text-blue-900">{selectedModel.metric}</strong> ({selectedModel.score})
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-500 bg-white px-3 py-2 rounded-lg border border-blue-200 shrink-0">
            Split: 80/20 Stratified • 5-Fold
          </div>
        </div>
      )}

      {/* Comparison Visual Charts (Bar Charts) */}
      {activeTab === 'classification' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 1: Accuracy & F1-Score */}
          <div className="lg:col-span-8">
            <ChartCard
              title="Classification Metric Comparison"
              subtitle="Comparative Accuracy, Precision, Recall, and F1-Score by Algorithm"
              badge="Supervised Classification"
              icon={BarChart3}
            >
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={classificationModels}
                    margin={{ top: 10, right: 20, left: -10, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="algorithm"
                      tick={{ fontSize: 10, fill: '#475569' }}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                    />
                    <YAxis
                      domain={[0.7, 1]}
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      tickFormatter={val => `${Math.round(val * 100)}%`}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }}
                      formatter={(val: number) => [`${(val * 100).toFixed(2)}%`]}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="accuracy" name="Accuracy" fill="#1d4ed8" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="f1Score" name="F1 Score" fill="#0d9488" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="precision" name="Precision" fill="#6d28d9" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          {/* Chart 2: Training Latency */}
          <div className="lg:col-span-4">
            <ChartCard
              title="Training Latency (Seconds)"
              subtitle="Computational execution time per algorithm"
              badge="Computational Efficiency"
              icon={Clock}
            >
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={classificationModels}
                    layout="vertical"
                    margin={{ top: 10, right: 20, left: 35, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} unit="s" />
                    <YAxis
                      type="category"
                      dataKey="algorithm"
                      tick={{ fontSize: 10, fill: '#334155' }}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }}
                      formatter={(val: number) => [`${val.toFixed(2)} seconds`, 'Latency']}
                    />
                    <Bar dataKey="trainingTimeSec" fill="#475569" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Regression Chart: R2 Score */}
          <div className="lg:col-span-7">
            <ChartCard
              title="Regression Explained Variance (R² Score)"
              subtitle="Coefficient of determination achieved by continuous predictors"
              badge="Regression Benchmark"
              icon={BarChart3}
            >
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={regressionModels}
                    margin={{ top: 10, right: 20, left: -10, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="algorithm"
                      tick={{ fontSize: 11, fill: '#475569' }}
                    />
                    <YAxis domain={[0.7, 1]} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }}
                      formatter={(val: number) => [val.toFixed(3), 'R² Score']}
                    />
                    <Bar dataKey="r2Score" fill="#0d9488" radius={[4, 4, 0, 0]}>
                      {regressionModels.map((entry, index) => (
                        <Cell
                          key={`reg-cell-${index}`}
                          fill={entry.isBest ? '#0d9488' : '#94a3b8'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          {/* Regression Chart: RMSE Error */}
          <div className="lg:col-span-5">
            <ChartCard
              title="Root Mean Squared Error (RMSE)"
              subtitle="Penalized residual error (Lower indicates superior fit)"
              badge="Loss / Error"
              icon={GitCompare}
            >
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={regressionModels}
                    margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="algorithm"
                      tick={{ fontSize: 11, fill: '#475569' }}
                    />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }}
                      formatter={(val: number) => [val.toLocaleString(), 'RMSE']}
                    />
                    <Bar dataKey="rmse" fill="#e11d48" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>
        </div>
      )}

      {/* Model Benchmark Table */}
      <ModelTable
        classificationModels={classificationModels}
        regressionModels={regressionModels}
        activeType={activeTab}
        selectedModelName={selectedModel?.name}
        evaluationSummary={evaluationSummary}
      />

      {/* Formal Methodology Card */}
      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800">Objective Metric Discipline: </strong>
          Models are not labeled subjectively as "best" or "superior" in the interface without documented mathematical justification from the backend cross-validation results.
        </p>
      </div>
    </div>
  );
};

export default Models;
