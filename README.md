# Wealth Resource – Financial Intelligence System

> **Wealth Resource Financial Intelligence & Analytics System**  
> *"From Data-Rich to Decision-Ready."*

A production-grade, academic/capstone-quality web application designed for comprehensive financial intelligence, exploratory data analysis, machine learning prediction, model benchmarking, unsupervised customer clustering, and association rule mining.

---

## 1. Project Overview

Modern financial systems generate massive quantities of tabular telemetry, loan portfolios, and transaction logs. However, high volume does not naturally translate into clear operational knowledge—a condition known as the DRIP phenomenon (Data Rich, Information Poor).

**Wealth Resource** bridges this gap by unifying statistical diagnostics, supervised machine learning pipelines, unsupervised segmentation (K-Means with PCA projections), and market basket association mining into an executive-grade analytics platform.

---

## 2. Technology Stack

- **Frontend Core**: React 18, Vite, TypeScript
- **Deployment Platform**: Vercel (Configured with `vercel.json` SPA rewrites)
- **Production Backend**: Render API ([https://drip-project.onrender.com](https://drip-project.onrender.com/))
- **Styling & Design System**: Tailwind CSS (Executive navy & financial blue palette)
- **Data Visualization**: Recharts (Bivariate scatter plots, density histograms, correlation matrices, bar charts, line curves, and pie charts)
- **Icons**: Lucide React
- **Network / API**: Axios with centralized typed services
- **Navigation**: React Router v6

---

## 3. Application Structure & Pages

The application provides 9 dedicated pages accessible via the primary sidebar and navigation bar:

| Page | Route | Description |
| :--- | :--- | :--- |
| **Landing / Home** | `/` | Academic presentation hero, abstract data visualizer, core capabilities, 4-step architecture workflow, and formal footer. |
| **Dashboard** | `/dashboard` | Executive KPI cards (Records, Features, Missing Values, Duplicates, Best Model, Accuracy) and 5 Recharts distribution visualizations. |
| **Dataset Explorer** | `/dataset` | Interactive dataset viewer supporting CSV/Excel uploads, full-text search, column toggles, sorting, row pagination, and CSV download. |
| **Data Analysis / EDA** | `/eda` | Feature moments table, univariate density histograms, interactive bivariate X/Y scatter plots, Pearson correlation matrix, Tukey IQR outlier bounds, and backend insight observations. |
| **ML Predictions** | `/predictions` | Dynamic inference form mapped automatically from backend features schema, real-time inference execution, confidence gauges, and SHAP feature importance explanations. |
| **Model Comparison** | `/models` | Objective benchmarking tables for Classification and Regression models, accuracy/F1/latency bar charts, and documented selection criteria. |
| **Clustering** | `/clustering` | Unsupervised borrower segmentation, optimal k selection via Elbow inertia and Silhouette curves, 2D PCA projection scatter, cluster centroid cards, and "Assign New Record" form. |
| **Association Rules** | `/association-rules` | Transaction and risk factor co-occurrence mining with Apriori, adjustable minimum support, confidence, and lift sliders, top-rules chart, and tabular rule ledger. |
| **About Project** | `/about` | Academic documentation detailing the Problem Statement, Objectives, full Technology Matrix, Machine Learning techniques, Architecture pipeline diagram, and Workflow steps. |

---

## 4. Deploying to Vercel (Step-by-Step)

### Option A: Deploy via Vercel Web Dashboard (Recommended)

1. Push your repository to **GitHub** (or GitLab / Bitbucket).
2. Go to **[vercel.com](https://vercel.com/)** and log in.
3. Click **"Add New..."** $\rightarrow$ **"Project"**.
4. Import your repository.
5. In the **Project Settings**:
   - **Framework Preset**: `Vite` (automatically detected)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Expand **"Environment Variables"** and add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://drip-project.onrender.com`
7. Click **"Deploy"**.
8. Done! Your web application will be live on your custom `.vercel.app` URL with full client-side routing support (handled by `vercel.json`).

---

### Option B: Deploy via Vercel CLI

If you have the Vercel CLI installed:

```bash
# 1. Install Vercel CLI (if not already installed)
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy to production
vercel --prod
```

When prompted:
- **Set up and deploy?**: `yes`
- **Which scope?**: Choose your personal/team account
- **Link to existing project?**: `no`
- **What's your project's name?**: `wealth-resource`
- **In which directory is your code located?**: `./`

---

## 5. Local Development

### Installation

```bash
npm install
```

### Environment Configuration

The application is pre-configured with `.env`:
```env
VITE_API_URL=https://drip-project.onrender.com
```

### Running Locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Production Build

```bash
npm run build
```

---

## 6. Live Backend vs. Demo Mode

The application includes an integrated **Mode Switch** in the top navigation bar:
1. **Live Backend Mode (Default)**: Connects directly to `https://drip-project.onrender.com`. When live, real inference and endpoints are pinged.
2. **Demo Mode**: Powers the entire UI with full sample credit risk and financial distress data, allowing examiners or professors to test all charts, tables, forms, and clustering visualizers without depending on network cold starts.

---

## 7. License

Designed and developed for academic project defense, college demonstrations, and portfolio showcase. Released under the MIT License.
"# DRIP-Syndrome-Frontend" 
"# DRIP-Syndrome-Frontend" 
