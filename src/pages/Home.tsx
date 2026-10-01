import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Cpu,
  BarChart3,
  Network,
  Share2,
  TrendingUp,
  ShieldCheck,
  Database,
  Layers,
  Sparkles,
  FileSpreadsheet,
  CheckCircle2,
  Activity,
  Award
} from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Simple Nav for Landing */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              W
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 tracking-tight block">
                Wealth Resource
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:block -mt-0.5">
                Financial Intelligence System
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/about"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 transition-colors"
            >
              Academic Documentation
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              <span>Access System</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Machine Learning & Applied Financial Informatics</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Wealth Resource
            </h1>

            <p className="text-xl sm:text-2xl font-semibold text-slate-700 tracking-tight">
              Turning Data-Rich Financial Information into Actionable Intelligence
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              An intelligent machine learning platform for analyzing financial datasets, discovering hidden patterns, predicting outcomes, and supporting data-driven decision making.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span>Explore Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/predictions"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-sm transition-all"
              >
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>Run Prediction</span>
              </Link>
            </div>

            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <span className="text-xl font-bold text-slate-900 font-mono">25,000+</span>
                <span className="block text-[11px] text-slate-500">Indexed Records</span>
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900 font-mono">94.8%</span>
                <span className="block text-[11px] text-slate-500">Benchmark F1-Score</span>
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900 font-mono">K-Means</span>
                <span className="block text-[11px] text-slate-500">PCA Segmentation</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Abstract Financial/Data Visualization */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

              {/* Header card preview */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs font-mono font-semibold text-slate-700">
                    PORTFOLIO_ANALYSIS_STREAM
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  ESTIMATOR: XGBOOST
                </span>
              </div>

              {/* Graphic Chart representation */}
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Default Probability Gradient</span>
                  <span className="font-mono text-emerald-600 font-semibold">Low Risk (88.4%)</span>
                </div>

                {/* SVG Visual curve */}
                <div className="h-36 w-full bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-end justify-between gap-1.5">
                  {[35, 48, 62, 58, 72, 85, 91, 78, 65, 82, 94, 88].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t bg-gradient-to-t from-blue-600 to-indigo-500 transition-all duration-300"
                        style={{ height: `${h}%` }}
                      ></div>
                    </div>
                  ))}
                </div>

                {/* Metric pill tiles */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                      Silhouette Metric
                    </span>
                    <div className="text-base font-bold text-slate-900 font-mono mt-0.5">
                      0.642
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                      Max Association Lift
                    </span>
                    <div className="text-base font-bold text-blue-700 font-mono mt-0.5">
                      3.42x
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Verification State</span>
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Validated on 5-Fold Stratified Split
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-600">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5">
              Comprehensive Financial Intelligence Suite
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Integrated modules combining classical statistics, supervised machine learning, unsupervised clustering, and market basket mining.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Intelligent Prediction
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supervised classification and regression models evaluating credit risk, default probability, and financial solvency with explainable SHAP feature importance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Exploratory Analytics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated statistical summaries, distribution histograms, bivariate scatter plots, outlier boundaries, and correlation matrices to identify data skew and anomalies.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Pattern Discovery
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Uncover non-linear dependencies and interaction effects across financial attributes using tree ensembles and dimensionality reduction algorithms.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Customer Segmentation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                K-Means clustering powered by Elbow and Silhouette validation to partition borrowers into distinct behavioral and financial resilience cohorts.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Association Analysis
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Apriori mining and association rule generation to identify multi-variable co-occurrence dependencies measured by support, confidence, and lift.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Machine Learning Insights
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rigorous benchmarking of algorithms (Random Forest, XGBoost, SVM, Ridge) with cross-validation metrics, latency benchmarks, and parameter tuning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section: 4 Steps */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-600">
              System Architecture Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5">
              How It Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              A four-stage systematic pipeline moving from raw tabular telemetry to high-confidence financial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-card relative">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">1. Collect Data</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ingest structured portfolio records, loan histories, and transaction ledgers with automatic type casting and schema inference.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-card relative">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">2. Prepare Data</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Handle nulls, detect multivariate outliers, standardize feature scales, and construct ratios (DTI, revolving utilization) without data leakage.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-card relative">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">3. Apply Machine Learning</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Train candidate models with stratified cross-validation, run K-Means optimization, and extract high-lift association rules.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-card relative">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">4. Generate Insights</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Serve real-time inference, feature impact breakdowns, and interactive analytical visual dashboards for decision-makers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formal Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800 text-xs">
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  W
                </div>
                <span className="font-bold text-white text-sm">Wealth Resource</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Financial Intelligence System. Formal Academic & Capstone Demonstration Platform.
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                Tagline: "From Data-Rich to Decision-Ready."
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider mb-3 text-[11px]">
                Analytical Modules
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Executive Dashboard</Link></li>
                <li><Link to="/dataset" className="hover:text-white transition-colors">Dataset Explorer</Link></li>
                <li><Link to="/eda" className="hover:text-white transition-colors">Exploratory Data Analysis</Link></li>
                <li><Link to="/predictions" className="hover:text-white transition-colors">ML Prediction Engine</Link></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider mb-3 text-[11px]">
                Algorithms & Mining
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/models" className="hover:text-white transition-colors">Model Benchmarking</Link></li>
                <li><Link to="/clustering" className="hover:text-white transition-colors">K-Means Customer Clusters</Link></li>
                <li><Link to="/association-rules" className="hover:text-white transition-colors">Association Rule Mining</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Academic Architecture</Link></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider mb-3 text-[11px]">
                Architecture Specifications
              </h4>
              <p className="text-slate-400 leading-relaxed mb-2">
                Engineered with React, TypeScript, Tailwind CSS, Recharts, and Python FastAPI/Scikit-learn.
              </p>
              <div className="text-[11px] text-slate-500 font-mono">
                Live Backend: https://drip-project.onrender.com
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © 2026 Wealth Resource. Academic & Research Capstone System. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Standard Evaluation Protocol</span>
              <span>•</span>
              <span>Stratified 5-Fold Validated</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
