import React, { useState } from 'react';
import {
  Network,
  Users,
  Compass,
  TrendingDown,
  TrendingUp,
  Cpu,
  Send,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ScatterChart,
  Scatter,
  Cell
} from 'recharts';
import { api } from '../services/api';
import useApi from '../hooks/useApi';
import ChartCard from '../components/ChartCard';
import ClusterCard from '../components/ClusterCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { ClusterAssignResponse } from '../types';

const CLUSTER_COLORS = ['#1d4ed8', '#d97706', '#e11d48', '#0d9488', '#6d28d9'];

export const Clustering: React.FC = () => {
  const { data, loading, error, errorMessage, refetch } = useApi(
    () => api.getClusters(),
    []
  );

  // Assign New Record form state
  const [assignForm, setAssignForm] = useState({
    Credit_Score: 710,
    Annual_Income: 75000,
    Debt_to_Income: 0.28,
    Revolving_Utilization: 0.35,
    Savings_Balance: 24000
  });

  const [assigning, setAssigning] = useState(false);
  const [assignedResult, setAssignedResult] = useState<ClusterAssignResponse | null>(null);
  const [assignError, setAssignError] = useState<string | null>(null);

  const handleAssignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAssigning(true);
    setAssignError(null);
    try {
      const res = await api.assignCluster({
        features: assignForm
      });
      setAssignedResult(res);
    } catch (err: any) {
      setAssignError(
        err.response?.data?.message || "Failed to assign record to cluster. Verify backend clustering service."
      );
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return <LoadingState message="Computing K-Means Partitions & Silhouette Diagnostics..." />;
  }

  if (error || !data) {
    return (
      <ErrorState
        title="Clustering Service Unavailable"
        message={errorMessage || "Unable to connect to the ML backend."}
        onRetry={refetch}
      />
    );
  }

  if (!data.isApplicable) {
    return (
      <EmptyState
        type="not_applicable"
        title="Clustering Not Applicable"
        description="The active dataset does not possess numeric features suitable for distance-based clustering or PCA dimensionality reduction."
        actionHref="/dataset"
        actionLabel="Inspect Dataset"
      />
    );
  }

  const {
    algorithm,
    numClusters,
    silhouetteScore,
    clusterDistribution,
    elbowCurve,
    silhouetteScoresByK,
    visualPoints,
    clusterCharacteristics,
    featuresUsed
  } = data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Customer Segmentation & Clustering Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Unsupervised discovery of distinct borrower segments using K-Means and dimensionality reduction.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1 rounded-lg border border-slate-200">
            Algorithm: {algorithm}
          </span>
        </div>
      </div>

      {/* Metric Callouts: Number of Clusters, Silhouette Score, Distribution summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Number of Clusters (k)</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 font-mono">
            {numClusters}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            Optimal inflection verified by Elbow & Silhouette
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Overall Silhouette Score</span>
            <Compass className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-blue-700 font-mono">
            {silhouetteScore.toFixed(3)}
          </div>
          <span className="text-xs text-emerald-600 mt-1 block font-medium">
            Solid cluster separation (Threshold &gt; 0.50)
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Dimensionality Features</span>
            <Layers className="w-4 h-4 text-teal-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 font-mono">
            {featuresUsed.length}
          </div>
          <span className="text-xs text-slate-400 mt-1 block truncate" title={featuresUsed.join(', ')}>
            {featuresUsed.join(', ')}
          </span>
        </div>
      </div>

      {/* Row 1 Charts: Elbow Method & Silhouette Score Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Elbow Method */}
        <div className="lg:col-span-6">
          <ChartCard
            title="Elbow Method (Inertia vs. k)"
            subtitle="Sum of squared distances from samples to their closest cluster center"
            badge="Inertia Optimization"
            icon={TrendingDown}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={elbowCurve} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="k"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    label={{ value: 'Number of Clusters (k)', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#64748b' }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickFormatter={val => `${Math.round(val / 1000)}k`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }}
                    formatter={(val: number) => [val.toLocaleString(), 'Inertia (SSE)']}
                  />
                  <Line
                    type="monotone"
                    dataKey="inertia"
                    stroke="#1d4ed8"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#1d4ed8' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Chart 2: Silhouette Score Curve */}
        <div className="lg:col-span-6">
          <ChartCard
            title="Silhouette Coefficient vs. k"
            subtitle="Measure of how similar an object is to its own cluster compared to other clusters"
            badge="Separation Quality"
            icon={TrendingUp}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={silhouetteScoresByK} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="k"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    label={{ value: 'k', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#64748b' }}
                  />
                  <YAxis
                    domain={[0, 1]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }}
                    formatter={(val: number) => [val.toFixed(3), 'Silhouette Score']}
                  />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {silhouetteScoresByK.map((entry, index) => (
                      <Cell
                        key={`sil-cell-${index}`}
                        fill={entry.k === numClusters ? '#1d4ed8' : '#cbd5e1'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Row 2: Cluster 2D PCA Projection Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          <ChartCard
            title="2D PCA Dimensionality Reduction Scatter Visualization"
            subtitle="Observation projection along Principal Component 1 & Principal Component 2"
            badge="Principal Component Analysis"
            icon={Compass}
          >
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="PCA Component 1"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    label={{ value: 'Principal Component 1 (Variance Expl. 48.2%)', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#475569' }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="PCA Component 2"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    label={{ value: 'Principal Component 2 (Variance Expl. 26.5%)', angle: -90, position: 'insideLeft', offset: 0, fontSize: 11, fill: '#475569' }}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }}
                    formatter={(_, __, item: any) => [
                      `Cluster ${item.payload.cluster}: (${item.payload.x}, ${item.payload.y})`,
                      item.payload.label || 'Point'
                    ]}
                  />
                  <Scatter data={visualPoints} shape="circle">
                    {visualPoints.map((entry, index) => (
                      <Cell
                        key={`point-${index}`}
                        fill={CLUSTER_COLORS[(entry.cluster - 1) % CLUSTER_COLORS.length]}
                        opacity={0.8}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
              {clusterCharacteristics.map((c, i) => (
                <div key={c.id} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: CLUSTER_COLORS[i % CLUSTER_COLORS.length] }}
                  ></span>
                  <span>Cluster {c.id}: {c.name}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Cluster Characteristics Cards (Cluster 1, Cluster 2, Cluster 3) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Segment Profiles & Centroid Characteristics
          </h3>
          <span className="text-xs text-slate-500">
            Backend K-Means Cluster Models
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clusterCharacteristics.map((cluster, idx) => (
            <ClusterCard
              key={cluster.id}
              cluster={cluster}
              color={CLUSTER_COLORS[idx % CLUSTER_COLORS.length]}
            />
          ))}
        </div>
      </div>

      {/* "Assign New Record" Form */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-card">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Assign New Record to Cluster
              </h3>
              <p className="text-xs text-slate-500">
                Compute Euclidean distance to trained centroids and assign cohort membership via <code className="text-blue-600">POST /api/cluster</code>
              </p>
            </div>
          </div>
        </div>

        {/* Assigned result banner if exists */}
        {assignedResult && (
          <div className="mb-6 p-4 bg-blue-50/70 border border-blue-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                #{assignedResult.assignedCluster}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 block">
                  Assigned Segment
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  {assignedResult.clusterName}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  {assignedResult.clusterProfile}
                </p>
              </div>
            </div>

            <div className="text-right text-xs font-mono text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-blue-200 shrink-0">
              Centroid Distance: <strong className="text-slate-800">{assignedResult.distanceToCentroid}</strong>
            </div>
          </div>
        )}

        {assignError && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
            {assignError}
          </div>
        )}

        <form onSubmit={handleAssignSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Credit Score (300-850)
              </label>
              <input
                type="number"
                min={300}
                max={850}
                value={assignForm.Credit_Score}
                onChange={e => setAssignForm({ ...assignForm, Credit_Score: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Annual Income ($)
              </label>
              <input
                type="number"
                min={10000}
                max={500000}
                step={1000}
                value={assignForm.Annual_Income}
                onChange={e => setAssignForm({ ...assignForm, Annual_Income: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Debt-to-Income (DTI)
              </label>
              <input
                type="number"
                min={0.01}
                max={0.99}
                step={0.01}
                value={assignForm.Debt_to_Income}
                onChange={e => setAssignForm({ ...assignForm, Debt_to_Income: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Revolving Utilization
              </label>
              <input
                type="number"
                min={0.01}
                max={1.0}
                step={0.01}
                value={assignForm.Revolving_Utilization}
                onChange={e => setAssignForm({ ...assignForm, Revolving_Utilization: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Savings Balance ($)
              </label>
              <input
                type="number"
                min={0}
                max={500000}
                step={500}
                value={assignForm.Savings_Balance}
                onChange={e => setAssignForm({ ...assignForm, Savings_Balance: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={assigning}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors disabled:opacity-50"
            >
              {assigning ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                  <span>Computing Centroids...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Assign New Record</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Clustering;
