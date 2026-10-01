import React from 'react';
import {
  BookOpen,
  Target,
  Layers,
  Cpu,
  ArrowDown,
  CheckCircle2,
  Workflow,
  Sparkles,
  GitBranch,
  Database,
  ExternalLink,
  Code2
} from 'lucide-react';

export const About: React.FC = () => {
  const technologies = [
    { name: "Python", category: "Backend Engine", desc: "Core data science runtime" },
    { name: "Pandas", category: "Data Manipulation", desc: "DataFrame transformation & aggregation" },
    { name: "NumPy", category: "Computation", desc: "Vectorized linear algebra operations" },
    { name: "Scikit-learn", category: "Machine Learning", desc: "Estimator pipelines, K-Means & metrics" },
    { name: "Matplotlib", category: "Diagnostics", desc: "Static figure & distribution plotting" },
    { name: "Seaborn", category: "Visualization", desc: "Statistical heatmap & pairplot generation" },
    { name: "MLxtend", category: "Mining", desc: "Apriori frequent itemset & rule generation" },
    { name: "Joblib", category: "Serialization", desc: "Model persistence and pipeline storage" },
    { name: "React 18", category: "Frontend", desc: "Component architecture & reactive state" },
    { name: "TypeScript", category: "Language", desc: "Strict type-safe interface contracts" },
    { name: "Tailwind CSS", category: "Design System", desc: "Formal financial interface styling" },
    { name: "Recharts", category: "Data Viz", desc: "Responsive SVG analytics charting" }
  ];

  const mlTechniques = [
    {
      title: "Classification",
      desc: "Supervised algorithms (XGBoost, Random Forest, Logistic Regression, SVM) predicting discrete credit risk tiers and loan default probabilities."
    },
    {
      title: "Regression",
      desc: "Parametric and non-parametric estimators predicting continuous financial indicators (loss given default, credit limit, interest yield)."
    },
    {
      title: "Clustering",
      desc: "Unsupervised K-Means clustering with standardized PCA projections, verified using Elbow inertia inflection and Silhouette coefficients."
    },
    {
      title: "Association Rule Mining",
      desc: "Apriori and FP-Growth rule generation discovering transactional and behavioural co-occurrence dependencies evaluated by support, confidence, and lift."
    },
    {
      title: "Feature Engineering",
      desc: "Ratio synthesis (Debt-to-Income, revolving utilization, buffer ratios), outlier handling via Tukey IQR fences, and robust variance scaling."
    },
    {
      title: "Exploratory Data Analysis",
      desc: "Univariate distribution histograms, parametric moments (skewness, variance), bivariate correlation matrices, and Tukey fence diagnostics."
    }
  ];

  const architectureLayers = [
    { name: "Frontend Interface Layer", tech: "React 18 + TypeScript + Tailwind CSS", desc: "Reactive dashboard, dynamic schema forms, interactive Recharts visualizations." },
    { name: "REST API Gateway", tech: "Axios + JSON Schema Contracts", desc: "Centralized client communication with dynamic typing, error recovery, and retry states." },
    { name: "Application Server", tech: "Python Flask / FastAPI", desc: "RESTful microservice routing inference, query parameters, and statistical summaries." },
    { name: "Machine Learning Pipeline", tech: "Scikit-learn + XGBoost + MLxtend", desc: "Preprocessing, cross-validation evaluation, clustering, and association mining." },
    { name: "Model Storage & Persistence", tech: "Joblib / Pickle Serialized Estimators", desc: "Trained estimator weights and transformation scalers ready for inference." },
    { name: "Dataset Repository", tech: "CSV / Parquet / SQL Storage", desc: "Normalized historical portfolio records, transaction logs, and feature registers." }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Data Ingestion & Schema Profiling",
      desc: "Raw tabular dataset loaded, columns classified into numeric and categorical types, null rates checked, and duplicate hashes verified."
    },
    {
      step: "02",
      title: "Statistical Diagnostics & EDA",
      desc: "Moments computed (mean, std, quartiles, skewness), Tukey IQR fences applied for outlier detection, and correlation matrices generated."
    },
    {
      step: "03",
      title: "Feature Preprocessing & Scaling",
      desc: "Missing cell imputation via median/mode, standard scaling applied to distance-based algorithms, and stratified partition splits generated."
    },
    {
      step: "04",
      title: "Cross-Validated Modeling",
      desc: "Algorithms trained with 5-fold stratified cross-validation. Metrics tracked across Accuracy, Precision, Recall, F1, and training latency."
    },
    {
      step: "05",
      title: "Unsupervised Pattern Extraction",
      desc: "K-Means run across k=1..7 to determine the Elbow point and peak Silhouette score. Transaction itemsets mined for association rules."
    },
    {
      step: "06",
      title: "Intelligence Serving & Attribution",
      desc: "Real-time inference API endpoints served to the financial dashboard with SHAP feature explanations and decision support recommendations."
    }
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600">
            Academic Project Overview & Architecture
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Wealth Resource
        </h1>
        <p className="text-sm font-semibold text-slate-600 mt-1">
          Financial Intelligence System
        </p>
      </div>

      {/* 1. Problem Statement */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Problem Statement
          </h2>
        </div>
        <blockquote className="p-4 bg-slate-50 border-l-4 border-blue-600 rounded-r-xl text-slate-700 italic text-sm sm:text-base leading-relaxed">
          "Modern financial systems generate large volumes of structured data. However, large quantities of data do not automatically translate into useful information. This project applies machine learning and data analytics techniques to transform complex financial data into meaningful insights."
        </blockquote>
        <p className="text-xs text-slate-500 mt-4 leading-relaxed">
          The DRIP phenomenon (Data Rich, Information Poor) frequently handicaps credit underwriting, portfolio risk management, and regulatory compliance. This platform establishes a repeatable, mathematically rigorous pipeline to extract actionable signal from high-dimensional tabular financial telemetry.
        </p>
      </div>

      {/* 2. Objectives */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Core Project Objectives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Analyze large financial datasets with automated verification of missingness and duplicates",
            "Identify important statistical patterns, distribution skews, and outlier bounds",
            "Build predictive machine learning models evaluated under rigorous 5-fold cross-validation",
            "Discover customer or transaction segments using K-Means and PCA dimensionality reduction",
            "Identify relationships between variables via Pearson correlation and association rule mining",
            "Provide an interactive, responsive analytics platform for financial decision makers"
          ].map((obj, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200/70 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span className="text-xs font-medium text-slate-800 leading-snug">{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. System Architecture: Flow Diagram with Styled HTML Cards */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              System Architecture
            </h2>
            <p className="text-xs text-slate-500">
              Decoupled multi-tier architecture spanning client interface to persistent data models
            </p>
          </div>
        </div>

        {/* Vertical Pipeline Cards */}
        <div className="space-y-3 max-w-2xl mx-auto">
          {architectureLayers.map((layer, idx) => (
            <React.Fragment key={idx}>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-xs hover:border-blue-400 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-mono font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900">{layer.name}</h3>
                  </div>
                  <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {layer.tech}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 pl-8">
                  {layer.desc}
                </p>
              </div>

              {idx < architectureLayers.length - 1 && (
                <div className="flex justify-center -my-1">
                  <ArrowDown className="w-4 h-4 text-blue-500 animate-pulse" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 4. Project Workflow: Styled HTML/CSS Cards */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Formal Project Workflow Pipeline
            </h2>
            <p className="text-xs text-slate-500">
              Step-by-step data processing and predictive intelligence generation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflowSteps.map(step => (
            <div key={step.step} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative hover:shadow-subtle transition-all">
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                STEP {step.step}
              </span>
              <h3 className="text-xs font-bold text-slate-900 mt-2.5 mb-1">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Machine Learning Techniques */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Machine Learning Techniques Applied
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mlTechniques.map((item, i) => (
            <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <h3 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Technology Stack Matrix */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Technology Stack Specifications
            </h2>
            <p className="text-xs text-slate-500">
              Complete software stack across data science libraries and modern web development
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {technologies.map(tech => (
            <div key={tech.name} className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 block">
                {tech.category}
              </span>
              <div className="text-sm font-bold text-slate-900 mt-0.5">
                {tech.name}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
