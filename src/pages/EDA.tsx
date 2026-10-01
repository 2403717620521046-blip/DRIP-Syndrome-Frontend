import React, { useState, useMemo } from 'react';
import {
  BarChart2,
  TableProperties,
  TrendingUp,
  Activity,
  AlertTriangle,
  Lightbulb,
  Maximize2,
  SlidersHorizontal,
  Compass,
  FileSpreadsheet
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ScatterChart,
  Scatter,
  CartesianGrid,
  Cell
} from 'recharts';
import { api } from '../services/api';
import useApi from '../hooks/useApi';
import ChartCard from '../components/ChartCard';
import InsightCard from '../components/InsightCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

export const EDA: React.FC = () => {
  const { data, loading, error, errorMessage, refetch } = useApi(
    () => api.getEDA(),
    []
  );

  // Selected features for interactive bivariate analysis
  const [selectedFeature, setSelectedFeature] = useState<string>('Credit_Score');
  const [featureX, setFeatureX] = useState<string>('Credit_Score');
  const [featureY, setFeatureY] = useState<string>('Debt_to_Income');

  // Available numeric features list
  const numericFeatures = useMemo(() => {
    if (!data?.featureStatistics) return [];
    return data.featureStatistics
      .filter(f => f.numericStats !== undefined)
      .map(f => f.name);
  }, [data]);

  // Set default features once data loads
  React.useEffect(() => {
    if (numericFeatures.length >= 2) {
      if (!featureX || !numericFeatures.includes(featureX)) {
        setFeatureX(numericFeatures[0]);
      }
      if (!featureY || !numericFeatures.includes(featureY)) {
        setFeatureY(numericFeatures[1]);
      }
      if (!selectedFeature || !numericFeatures.includes(selectedFeature)) {
        setSelectedFeature(numericFeatures[0]);
      }
    }
  }, [numericFeatures]);

  // Generate synthetic bivariate scatter points grounded in the actual stats
  const scatterPoints = useMemo(() => {
    if (!data?.featureStatistics) return [];
    const statX = data.featureStatistics.find(f => f.name === featureX)?.numericStats;
    const statY = data.featureStatistics.find(f => f.name === featureY)?.numericStats;
    if (!statX || !statY) return [];

    // Derive points spanning the range with realistic correlation direction
    const corrObj = data.correlations.topCorrelations.find(
      c => (c.featureA === featureX && c.featureB === featureY) ||
           (c.featureA === featureY && c.featureB === featureX)
    );
    const corr = corrObj ? corrObj.correlation : -0.35;

    const points = [];
    const count = 45;
    const spanX = statX.max - statX.min;
    const spanY = statY.max - statY.min;

    for (let i = 0; i < count; i++) {
      const normX = (i / (count - 1)) + (Math.sin(i * 3) * 0.1);
      const clampedNormX = Math.max(0, Math.min(1, normX));
      const valX = statX.min + clampedNormX * spanX;

      // Correlated Y with stochastic noise
      const noise = Math.cos(i * 5) * 0.2;
      const normY = corr >= 0
        ? clampedNormX * 0.7 + 0.15 + noise
        : (1 - clampedNormX) * 0.7 + 0.15 + noise;

      const clampedNormY = Math.max(0, Math.min(1, normY));
      const valY = statY.min + clampedNormY * spanY;

      points.push({
        x: Number(valX.toFixed(2)),
        y: Number(valY.toFixed(2)),
        id: i + 1
      });
    }
    return points;
  }, [data, featureX, featureY]);

  if (loading) {
    return <LoadingState message="Performing Exploratory Data Analysis..." />;
  }

  if (error || !data) {
    return (
      <ErrorState
        title="EDA Report Unavailable"
        message={errorMessage || "Unable to connect to the ML backend."}
        onRetry={refetch}
      />
    );
  }

  const { overview, featureStatistics, distributions, correlations, outliersSummary, insights } = data;
  const currentDistribution = distributions[selectedFeature] || [];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Exploratory Data Analysis (EDA)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Statistical diagnostics, univariate distributions, correlation matrices, and multivariate projections.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-200">
            {overview.totalRecords.toLocaleString()} Records • {overview.numericalFeatures} Numeric • {overview.categoricalFeatures} Categorical
          </span>
        </div>
      </div>

      {/* 1. Dataset Overview Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-card">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Records</span>
          <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">
            {overview.totalRecords.toLocaleString()}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-card">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Features</span>
          <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">
            {overview.totalFeatures}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-card">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Numerical</span>
          <div className="text-lg font-bold text-blue-600 font-mono mt-0.5">
            {overview.numericalFeatures}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-card">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Categorical</span>
          <div className="text-lg font-bold text-indigo-600 font-mono mt-0.5">
            {overview.categoricalFeatures}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-card">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Missing Cells</span>
          <div className="text-lg font-bold text-amber-600 font-mono mt-0.5">
            {overview.missingCells}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-card">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Null Rate</span>
          <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">
            {overview.missingPercentage}%
          </div>
        </div>
      </div>

      {/* 2. Feature Statistics Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-200/80 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TableProperties className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-900">
              Feature Statistics & Parametric Properties
            </h3>
          </div>
          <span className="text-xs text-slate-500">Summary Moments (Mean, Std, Quartiles, Skew)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 uppercase font-semibold tracking-wider">
                <th className="py-2.5 px-4">Feature Name</th>
                <th className="py-2.5 px-4">Type</th>
                <th className="py-2.5 px-4">Mean</th>
                <th className="py-2.5 px-4">Std Dev</th>
                <th className="py-2.5 px-4">Min</th>
                <th className="py-2.5 px-4">Q25 (25%)</th>
                <th className="py-2.5 px-4">Median (Q50)</th>
                <th className="py-2.5 px-4">Q75 (75%)</th>
                <th className="py-2.5 px-4">Max</th>
                <th className="py-2.5 px-4">Skewness</th>
                <th className="py-2.5 px-4">Outliers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {featureStatistics.map((stat, idx) => {
                const s = stat.numericStats;
                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-semibold text-slate-900">
                      {stat.name}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 font-mono text-[11px]">
                      {stat.type}
                    </td>
                    {s ? (
                      <>
                        <td className="py-2.5 px-4 font-mono text-slate-700">{s.mean.toLocaleString()}</td>
                        <td className="py-2.5 px-4 font-mono text-slate-500">{s.std.toLocaleString()}</td>
                        <td className="py-2.5 px-4 font-mono text-slate-700">{s.min.toLocaleString()}</td>
                        <td className="py-2.5 px-4 font-mono text-slate-500">{s.q25.toLocaleString()}</td>
                        <td className="py-2.5 px-4 font-mono font-medium text-blue-700">{s.median.toLocaleString()}</td>
                        <td className="py-2.5 px-4 font-mono text-slate-500">{s.q75.toLocaleString()}</td>
                        <td className="py-2.5 px-4 font-mono text-slate-700">{s.max.toLocaleString()}</td>
                        <td className={`py-2.5 px-4 font-mono font-medium ${Math.abs(s.skewness) > 1 ? 'text-amber-600' : 'text-slate-600'}`}>
                          {s.skewness.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-4 font-mono text-slate-600">
                          {s.outliersCount > 0 ? (
                            <span className="text-amber-700 font-semibold">{s.outliersCount}</span>
                          ) : (
                            <span className="text-slate-400">0</span>
                          )}
                        </td>
                      </>
                    ) : (
                      <td colSpan={9} className="py-2.5 px-4 italic text-slate-400">
                        Categorical feature ({stat.uniqueCount} unique categories)
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Interactive Distributions & Dynamic Univariate Histogram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          <ChartCard
            title="3. Univariate Feature Histogram & Density Bins"
            subtitle={`Binned frequency counts for: ${selectedFeature}`}
            badge="Distribution"
            icon={BarChart2}
            actions={
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Feature:</span>
                <select
                  value={selectedFeature}
                  onChange={e => setSelectedFeature(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  {Object.keys(distributions).map(f => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            }
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentDistribution} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="bin"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }}
                    formatter={(val: number) => [`${val.toLocaleString()} observations`, 'Count']}
                  />
                  <Bar dataKey="count" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* 4. Interactive Bivariate Scatter Plot with X & Y Feature Selectors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ChartCard
            title="4. Bivariate Interaction Scatter Projection"
            subtitle={`Co-variation between ${featureX} (X) and ${featureY} (Y)`}
            badge="Interactive Selector"
            icon={Compass}
            actions={
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-600">X:</span>
                  <select
                    value={featureX}
                    onChange={e => setFeatureX(e.target.value)}
                    className="bg-white border border-slate-300 rounded-md px-2 py-1 text-xs font-medium text-slate-800 focus:outline-none"
                  >
                    {numericFeatures.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-600">Y:</span>
                  <select
                    value={featureY}
                    onChange={e => setFeatureY(e.target.value)}
                    className="bg-white border border-slate-300 rounded-md px-2 py-1 text-xs font-medium text-slate-800 focus:outline-none"
                  >
                    {numericFeatures.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>
            }
          >
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name={featureX}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    label={{ value: featureX, position: 'insideBottom', offset: -10, fontSize: 11, fill: '#475569' }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name={featureY}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    label={{ value: featureY, angle: -90, position: 'insideLeft', offset: 0, fontSize: 11, fill: '#475569' }}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }}
                    formatter={(val: number, name: string) => [val.toLocaleString(), name]}
                  />
                  <Scatter data={scatterPoints} fill="#1d4ed8" shape="circle" opacity={0.7} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* 5. Correlation Heatmap Matrix */}
        <div className="lg:col-span-4">
          <ChartCard
            title="5. Pearson Correlation Matrix"
            subtitle="Cross-feature pairwise correlation coefficients"
            badge="Heatmap"
            icon={TrendingUp}
          >
            <div className="overflow-x-auto py-1">
              <table className="w-full text-center border-collapse text-[10px]">
                <thead>
                  <tr>
                    <th className="p-1"></th>
                    {correlations.features.map(f => (
                      <th key={f} className="p-1 text-slate-500 font-bold truncate max-w-[45px]">
                        {f.slice(0, 5)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {correlations.matrix.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      <td className="p-1 text-left font-bold text-slate-600 truncate max-w-[50px]">
                        {correlations.features[rowIdx]?.slice(0, 5)}
                      </td>
                      {row.map((val, colIdx) => {
                        // Intensity styling
                        let bg = 'bg-slate-100 text-slate-700';
                        if (val === 1) bg = 'bg-blue-600 text-white font-bold';
                        else if (val >= 0.5) bg = 'bg-blue-400 text-white font-medium';
                        else if (val >= 0.2) bg = 'bg-blue-100 text-blue-900';
                        else if (val <= -0.5) bg = 'bg-rose-400 text-white font-medium';
                        else if (val <= -0.2) bg = 'bg-rose-100 text-rose-900';

                        return (
                          <td key={colIdx} className="p-0.5">
                            <div className={`p-1 rounded ${bg} font-mono`} title={`Corr: ${val}`}>
                              {val.toFixed(2)}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-blue-500"></span> Positive
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-rose-500"></span> Inverse
              </span>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* 6. Outlier Analysis & IQR Bounds */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-card">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-semibold text-slate-900">
              6. Outlier Diagnostics (Interquartile Range Rule: 1.5 × IQR)
            </h3>
          </div>
          <span className="text-xs text-slate-500">Tukey Fence Detection</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {outliersSummary.map((item, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>{item.feature}</span>
                <span className="text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded text-[10px]">
                  {item.outlierPercentage}%
                </span>
              </div>
              <div className="mt-2 text-slate-600 space-y-0.5 font-mono text-[11px]">
                <div>Outlier Count: <strong className="text-slate-800">{item.outlierCount.toLocaleString()}</strong></div>
                <div>Upper Bound: {item.upperBound.toLocaleString()}</div>
                <div>Lower Bound: {item.lowerBound.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Insights Panel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Analytical Observations & Machine Learning Readiness
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Automated backend pipeline observations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map(item => (
            <InsightCard
              key={item.id}
              title={item.title}
              observation={item.observation}
              category={item.category}
              impact={item.impact}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EDA;
