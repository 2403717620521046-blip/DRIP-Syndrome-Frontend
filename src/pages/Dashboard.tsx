import React from 'react';
import {
  Database,
  Layers,
  AlertCircle,
  Copy,
  Cpu,
  Award,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Network,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
  CartesianGrid
} from 'recharts';
import { api } from '../services/api';
import useApi from '../hooks/useApi';
import KpiCard from '../components/KpiCard';
import ChartCard from '../components/ChartCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

const PALETTE = ['#1d4ed8', '#0d9488', '#d97706', '#6d28d9', '#e11d48', '#059669'];

export const Dashboard: React.FC = () => {
  const { data, loading, error, errorMessage, refetch, isDemo } = useApi(
    () => api.getDashboard(),
    []
  );

  if (loading) {
    return <LoadingState message="Loading Financial Intelligence Dashboard..." />;
  }

  if (error || !data) {
    return (
      <ErrorState
        title="Dashboard Unavailable"
        message={errorMessage || "Unable to connect to the ML backend."}
        onRetry={refetch}
      />
    );
  }

  if (!data.kpis || data.kpis.totalRecords === 0) {
    return (
      <EmptyState
        type="no_dataset"
        title="No dataset available"
        description="Upload a dataset to begin financial analysis and compute machine learning intelligence metrics."
        actionHref="/dataset"
        actionLabel="Go to Dataset Explorer"
      />
    );
  }

  const { kpis, datasetDistribution, targetDistribution, featureCorrelation, modelPerformance, clusterDistribution } = data;

  return (
    <div className="space-y-6">
      {/* Page Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Financial Intelligence Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Overview of dataset characteristics and machine learning analysis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {kpis.lastUpdated && (
            <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
              Updated: {kpis.lastUpdated}
            </span>
          )}
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* KPI 1: Total Records */}
        <KpiCard
          title="Total Records"
          value={kpis.totalRecords.toLocaleString()}
          icon={Database}
          subtitle="Tabular rows loaded"
          badge="Sampled"
          badgeType="neutral"
        />

        {/* KPI 2: Total Features */}
        <KpiCard
          title="Total Features"
          value={kpis.totalFeatures}
          icon={Layers}
          subtitle="Analytical variables"
          badge="Multivariate"
          badgeType="info"
        />

        {/* KPI 3: Missing Values */}
        <KpiCard
          title="Missing Values"
          value={kpis.missingValues}
          icon={AlertCircle}
          iconBg={kpis.missingValues > 0 ? "bg-amber-50" : "bg-emerald-50"}
          iconColor={kpis.missingValues > 0 ? "text-amber-600" : "text-emerald-600"}
          subtitle={kpis.missingValues > 0 ? `${((kpis.missingValues / (kpis.totalRecords * kpis.totalFeatures)) * 100).toFixed(2)}% of matrix` : "100% complete"}
          badge={kpis.missingValues > 0 ? "Imputed" : "Clean"}
          badgeType={kpis.missingValues > 0 ? "warning" : "success"}
        />

        {/* KPI 4: Duplicate Records */}
        <KpiCard
          title="Duplicate Records"
          value={kpis.duplicateRecords}
          icon={Copy}
          subtitle="Identical row signatures"
          badge={kpis.duplicateRecords === 0 ? "Deduplicated" : "Action Req."}
          badgeType={kpis.duplicateRecords === 0 ? "success" : "warning"}
        />

        {/* KPI 5: Best Model */}
        <KpiCard
          title="Best Model"
          value={kpis.bestModel || "N/A"}
          icon={Cpu}
          subtitle="Optimal estimator"
          badge="CV Champion"
          badgeType="info"
        />

        {/* KPI 6: Model Accuracy */}
        <KpiCard
          title="Model Accuracy"
          value={kpis.modelAccuracy ? `${(kpis.modelAccuracy * 100).toFixed(1)}%` : "N/A"}
          icon={Award}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          subtitle="Macro cross-val score"
          badge="F1-Optimized"
          badgeType="success"
        />
      </div>

      {/* Row 1 Charts: Dataset Distribution & Target Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Dataset Distribution */}
        <div className="lg:col-span-6">
          <ChartCard
            title="1. Dataset Category Distribution"
            subtitle="Segmentation breakdown across primary borrower cohorts"
            badge="Categorical"
            icon={BarChart3}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={datasetDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }}
                    formatter={(val: number) => [`${val.toLocaleString()} records`, 'Count']}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {datasetDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || PALETTE[index % PALETTE.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Chart 2: Target Distribution */}
        <div className="lg:col-span-6">
          <ChartCard
            title="2. Target Variable Distribution"
            subtitle="Credit risk severity and default classification proportion"
            badge="Supervised Target"
            icon={PieChartIcon}
          >
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={targetDistribution}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {targetDistribution.map((entry, index) => (
                      <Cell key={`pie-cell-${index}`} fill={entry.color || PALETTE[index % PALETTE.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }}
                    formatter={(val: number, name: string) => [`${val.toLocaleString()} records`, name]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Row 2 Charts: Feature Correlation & Model Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 3: Feature Correlation */}
        <div className="lg:col-span-6">
          <ChartCard
            title="3. Feature Correlation Analysis"
            subtitle="Pearson correlation coefficient with default risk target"
            badge="Linear Association"
            icon={TrendingUp}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={featureCorrelation}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis
                    type="number"
                    domain={[-1, 1]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <YAxis
                    type="category"
                    dataKey="featureA"
                    tick={{ fontSize: 10, fill: '#334155' }}
                    width={90}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }}
                    formatter={(val: number, _, item: any) => [
                      `${val > 0 ? '+' : ''}${val} (${item.payload.featureB})`,
                      'Correlation'
                    ]}
                  />
                  <Bar dataKey="correlation" radius={[0, 4, 4, 0]}>
                    {featureCorrelation.map((entry, index) => (
                      <Cell
                        key={`corr-cell-${index}`}
                        fill={entry.correlation >= 0 ? '#1d4ed8' : '#e11d48'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Chart 4: Model Performance Comparison */}
        <div className="lg:col-span-6">
          <ChartCard
            title="4. Algorithm Benchmark Comparison"
            subtitle="Stratified Cross-Validation Accuracy & F1-Score"
            badge="Benchmark"
            icon={Cpu}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={modelPerformance}
                  margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="algorithm"
                    tick={{ fontSize: 10, fill: '#64748b' }}
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
                    formatter={(val: number) => [`${(val * 100).toFixed(1)}%`, 'Accuracy']}
                  />
                  <Bar dataKey="accuracy" fill="#1d4ed8" radius={[4, 4, 0, 0]}>
                    {modelPerformance.map((entry, index) => (
                      <Cell
                        key={`model-cell-${index}`}
                        fill={entry.isBest ? '#1d4ed8' : '#94a3b8'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Row 3 Chart: Cluster Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          <ChartCard
            title="5. Unsupervised Cluster Distribution"
            subtitle="K-Means customer segmentation partition counts & proportions"
            badge="Unsupervised K-Means"
            icon={Network}
          >
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={clusterDistribution}
                  margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="cluster"
                    tick={{ fontSize: 11, fill: '#475569' }}
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }}
                    formatter={(val: number, _, item: any) => [
                      `${val.toLocaleString()} records (${item.payload.percentage}%)`,
                      'Cluster Size'
                    ]}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {clusterDistribution.map((entry, index) => (
                      <Cell
                        key={`cluster-cell-${index}`}
                        fill={entry.color || PALETTE[index % PALETTE.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
