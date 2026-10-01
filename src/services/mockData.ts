import {
  DashboardResponse,
  DatasetResponse,
  EDAResponse,
  FeatureSchemaResponse,
  ModelsResponse,
  ClustersResponse,
  AssociationRulesResponse,
  PredictionResponse,
  ClusterAssignResponse
} from '../types';

export const mockDashboardData: DashboardResponse = {
  datasetName: "CreditRisk_Financial_Portfolio_2025.csv",
  kpis: {
    totalRecords: 25000,
    totalFeatures: 12,
    missingValues: 142,
    duplicateRecords: 0,
    bestModel: "XGBoost Classifier",
    modelAccuracy: 0.948,
    targetVariable: "Loan_Default_Risk",
    lastUpdated: "2025-05-18 14:32:10 UTC"
  },
  datasetDistribution: [
    { name: "Salaried Professional", count: 11250, percentage: 45.0, color: "#1d4ed8" },
    { name: "Self-Employed / SME", count: 7500, percentage: 30.0, color: "#0d9488" },
    { name: "Corporate Executive", count: 4250, percentage: 17.0, color: "#6d28d9" },
    { name: "Contract / Freelance", count: 2000, percentage: 8.0, color: "#d97706" }
  ],
  targetDistribution: [
    { name: "Low Risk (Grade A)", count: 16250, percentage: 65.0, color: "#059669" },
    { name: "Moderate Risk (Grade B)", count: 5750, percentage: 23.0, color: "#d97706" },
    { name: "High Risk / Default (Grade C)", count: 3000, percentage: 12.0, color: "#e11d48" }
  ],
  featureCorrelation: [
    { featureA: "Debt_to_Income", featureB: "Default_Risk", correlation: 0.68 },
    { featureA: "Credit_Score", featureB: "Default_Risk", correlation: -0.74 },
    { featureA: "Annual_Income", featureB: "Loan_Amount", correlation: 0.62 },
    { featureA: "Revolving_Utilization", featureB: "Delinquent_Months", correlation: 0.54 },
    { featureA: "Account_Age_Years", featureB: "Credit_Score", correlation: 0.46 }
  ],
  modelPerformance: [
    { algorithm: "XGBoost Classifier", accuracy: 0.948, precision: 0.932, recall: 0.924, f1Score: 0.928, trainingTimeSec: 4.82, isBest: true, metricBasis: "Highest F1-Score & ROC-AUC" },
    { algorithm: "Random Forest", accuracy: 0.936, precision: 0.915, recall: 0.908, f1Score: 0.911, trainingTimeSec: 8.45 },
    { algorithm: "Gradient Boosting", accuracy: 0.929, precision: 0.908, recall: 0.895, f1Score: 0.901, trainingTimeSec: 6.12 },
    { algorithm: "Support Vector Machine", accuracy: 0.884, precision: 0.862, recall: 0.841, f1Score: 0.851, trainingTimeSec: 18.7 },
    { algorithm: "Logistic Regression", accuracy: 0.852, precision: 0.824, recall: 0.812, f1Score: 0.818, trainingTimeSec: 0.94 }
  ],
  clusterDistribution: [
    { cluster: "Cluster 1: Prime Borrowers", count: 9800, percentage: 39.2, color: "#1d4ed8" },
    { cluster: "Cluster 2: Stretched Leveraged", count: 8750, percentage: 35.0, color: "#d97706" },
    { cluster: "Cluster 3: Subprime Fragile", count: 6450, percentage: 25.8, color: "#e11d48" }
  ]
};

export const mockDatasetResponse: DatasetResponse = {
  datasetName: "CreditRisk_Financial_Portfolio_2025.csv",
  shape: {
    rows: 25000,
    columns: 12,
    missingValues: 142,
    duplicates: 0
  },
  columns: [
    { name: "Customer_ID", type: "text", missingCount: 0, uniqueCount: 25000 },
    { name: "Age", type: "numeric", missingCount: 0, uniqueCount: 52 },
    { name: "Annual_Income", type: "numeric", missingCount: 18, uniqueCount: 4210 },
    { name: "Credit_Score", type: "numeric", missingCount: 0, uniqueCount: 480 },
    { name: "Debt_to_Income", type: "numeric", missingCount: 24, uniqueCount: 650 },
    { name: "Loan_Amount", type: "numeric", missingCount: 0, uniqueCount: 1840 },
    { name: "Employment_Type", type: "categorical", missingCount: 0, uniqueCount: 4 },
    { name: "Home_Ownership", type: "categorical", missingCount: 12, uniqueCount: 3 },
    { name: "Revolving_Utilization", type: "numeric", missingCount: 35, uniqueCount: 890 },
    { name: "Delinquencies_Last_2Yrs", type: "numeric", missingCount: 0, uniqueCount: 7 },
    { name: "Savings_Balance", type: "numeric", missingCount: 53, uniqueCount: 3120 },
    { name: "Risk_Category", type: "categorical", missingCount: 0, uniqueCount: 3 }
  ],
  totalRows: 25000,
  page: 1,
  pageSize: 15,
  rows: [
    { Customer_ID: "CR-10492", Age: 38, Annual_Income: 84500, Credit_Score: 742, Debt_to_Income: 0.22, Loan_Amount: 18000, Employment_Type: "Salaried", Home_Ownership: "Mortgage", Revolving_Utilization: 0.28, Delinquencies_Last_2Yrs: 0, Savings_Balance: 24500, Risk_Category: "Low Risk" },
    { Customer_ID: "CR-10493", Age: 29, Annual_Income: 48000, Credit_Score: 618, Debt_to_Income: 0.44, Loan_Amount: 14000, Employment_Type: "Self-Employed", Home_Ownership: "Rent", Revolving_Utilization: 0.72, Delinquencies_Last_2Yrs: 1, Savings_Balance: 3200, Risk_Category: "High Risk" },
    { Customer_ID: "CR-10494", Age: 45, Annual_Income: 122000, Credit_Score: 810, Debt_to_Income: 0.16, Loan_Amount: 35000, Employment_Type: "Corporate", Home_Ownership: "Own", Revolving_Utilization: 0.14, Delinquencies_Last_2Yrs: 0, Savings_Balance: 78000, Risk_Category: "Low Risk" },
    { Customer_ID: "CR-10495", Age: 34, Annual_Income: 62000, Credit_Score: 685, Debt_to_Income: 0.31, Loan_Amount: 12500, Employment_Type: "Salaried", Home_Ownership: "Mortgage", Revolving_Utilization: 0.42, Delinquencies_Last_2Yrs: 0, Savings_Balance: 11400, Risk_Category: "Moderate Risk" },
    { Customer_ID: "CR-10496", Age: 52, Annual_Income: 94000, Credit_Score: 715, Debt_to_Income: 0.26, Loan_Amount: 22000, Employment_Type: "Salaried", Home_Ownership: "Mortgage", Revolving_Utilization: 0.35, Delinquencies_Last_2Yrs: 0, Savings_Balance: 36200, Risk_Category: "Low Risk" },
    { Customer_ID: "CR-10497", Age: 24, Annual_Income: 39000, Credit_Score: 590, Debt_to_Income: 0.51, Loan_Amount: 9500, Employment_Type: "Contract", Home_Ownership: "Rent", Revolving_Utilization: 0.84, Delinquencies_Last_2Yrs: 2, Savings_Balance: 1850, Risk_Category: "High Risk" },
    { Customer_ID: "CR-10498", Age: 41, Annual_Income: 105000, Credit_Score: 760, Debt_to_Income: 0.19, Loan_Amount: 28000, Employment_Type: "Corporate", Home_Ownership: "Own", Revolving_Utilization: 0.21, Delinquencies_Last_2Yrs: 0, Savings_Balance: 54100, Risk_Category: "Low Risk" },
    { Customer_ID: "CR-10499", Age: 31, Annual_Income: 55000, Credit_Score: 642, Debt_to_Income: 0.38, Loan_Amount: 16000, Employment_Type: "Self-Employed", Home_Ownership: "Rent", Revolving_Utilization: 0.58, Delinquencies_Last_2Yrs: 0, Savings_Balance: 6700, Risk_Category: "Moderate Risk" },
    { Customer_ID: "CR-10500", Age: 49, Annual_Income: 78000, Credit_Score: 698, Debt_to_Income: 0.28, Loan_Amount: 15000, Employment_Type: "Salaried", Home_Ownership: "Mortgage", Revolving_Utilization: 0.33, Delinquencies_Last_2Yrs: 0, Savings_Balance: 19800, Risk_Category: "Low Risk" },
    { Customer_ID: "CR-10501", Age: 27, Annual_Income: 42000, Credit_Score: 580, Debt_to_Income: 0.49, Loan_Amount: 11000, Employment_Type: "Contract", Home_Ownership: "Rent", Revolving_Utilization: 0.79, Delinquencies_Last_2Yrs: 1, Savings_Balance: 2100, Risk_Category: "High Risk" },
    { Customer_ID: "CR-10502", Age: 36, Annual_Income: 88000, Credit_Score: 735, Debt_to_Income: 0.24, Loan_Amount: 20000, Employment_Type: "Salaried", Home_Ownership: "Mortgage", Revolving_Utilization: 0.29, Delinquencies_Last_2Yrs: 0, Savings_Balance: 28900, Risk_Category: "Low Risk" },
    { Customer_ID: "CR-10503", Age: 43, Annual_Income: 71000, Credit_Score: 670, Debt_to_Income: 0.35, Loan_Amount: 13500, Employment_Type: "Self-Employed", Home_Ownership: "Mortgage", Revolving_Utilization: 0.49, Delinquencies_Last_2Yrs: 0, Savings_Balance: 9800, Risk_Category: "Moderate Risk" },
    { Customer_ID: "CR-10504", Age: 58, Annual_Income: 145000, Credit_Score: 825, Debt_to_Income: 0.12, Loan_Amount: 40000, Employment_Type: "Corporate", Home_Ownership: "Own", Revolving_Utilization: 0.11, Delinquencies_Last_2Yrs: 0, Savings_Balance: 115000, Risk_Category: "Low Risk" },
    { Customer_ID: "CR-10505", Age: 33, Annual_Income: 64000, Credit_Score: 660, Debt_to_Income: 0.33, Loan_Amount: 17500, Employment_Type: "Salaried", Home_Ownership: "Rent", Revolving_Utilization: 0.46, Delinquencies_Last_2Yrs: 0, Savings_Balance: 8400, Risk_Category: "Moderate Risk" },
    { Customer_ID: "CR-10506", Age: 26, Annual_Income: 37500, Credit_Score: 565, Debt_to_Income: 0.55, Loan_Amount: 8500, Employment_Type: "Contract", Home_Ownership: "Rent", Revolving_Utilization: 0.91, Delinquencies_Last_2Yrs: 3, Savings_Balance: 1100, Risk_Category: "High Risk" }
  ]
};

export const mockEDAResponse: EDAResponse = {
  overview: {
    totalRecords: 25000,
    totalFeatures: 12,
    numericalFeatures: 8,
    categoricalFeatures: 4,
    missingCells: 142,
    missingPercentage: 0.047
  },
  featureStatistics: [
    {
      name: "Age",
      type: "numeric",
      missingCount: 0,
      uniqueCount: 52,
      numericStats: { mean: 39.4, std: 11.2, min: 21, q25: 30, median: 38, q75: 47, max: 73, skewness: 0.31, outliersCount: 14 }
    },
    {
      name: "Annual_Income",
      type: "numeric",
      missingCount: 18,
      uniqueCount: 4210,
      numericStats: { mean: 76450, std: 32800, min: 18000, q25: 51000, median: 71500, q75: 96000, max: 245000, skewness: 1.42, outliersCount: 284 }
    },
    {
      name: "Credit_Score",
      type: "numeric",
      missingCount: 0,
      uniqueCount: 480,
      numericStats: { mean: 692.6, std: 74.8, min: 490, q25: 640, median: 695, q75: 752, max: 850, skewness: -0.22, outliersCount: 38 }
    },
    {
      name: "Debt_to_Income",
      type: "numeric",
      missingCount: 24,
      uniqueCount: 650,
      numericStats: { mean: 0.312, std: 0.128, min: 0.05, q25: 0.21, median: 0.30, q75: 0.40, max: 0.72, skewness: 0.48, outliersCount: 95 }
    },
    {
      name: "Loan_Amount",
      type: "numeric",
      missingCount: 0,
      uniqueCount: 1840,
      numericStats: { mean: 21450, std: 11200, min: 2500, q25: 12000, median: 19500, q75: 29000, max: 65000, skewness: 0.86, outliersCount: 162 }
    },
    {
      name: "Revolving_Utilization",
      type: "numeric",
      missingCount: 35,
      uniqueCount: 890,
      numericStats: { mean: 0.428, std: 0.231, min: 0.02, q25: 0.24, median: 0.41, q75: 0.61, max: 0.98, skewness: 0.35, outliersCount: 41 }
    },
    {
      name: "Savings_Balance",
      type: "numeric",
      missingCount: 53,
      uniqueCount: 3120,
      numericStats: { mean: 31200, std: 28400, min: 250, q25: 8400, median: 22600, q75: 45000, max: 195000, skewness: 1.88, outliersCount: 410 }
    },
    {
      name: "Delinquencies_Last_2Yrs",
      type: "numeric",
      missingCount: 0,
      uniqueCount: 7,
      numericStats: { mean: 0.38, std: 0.74, min: 0, q25: 0, median: 0, q75: 1, max: 6, skewness: 2.65, outliersCount: 312 }
    }
  ],
  distributions: {
    Age: [
      { bin: "20-29", min: 20, max: 29, count: 5200 },
      { bin: "30-39", min: 30, max: 39, count: 8750 },
      { bin: "40-49", min: 40, max: 49, count: 6400 },
      { bin: "50-59", min: 50, max: 59, count: 3400 },
      { bin: "60+", min: 60, max: 80, count: 1250 }
    ],
    Credit_Score: [
      { bin: "< 580 (Poor)", min: 450, max: 579, count: 1850 },
      { bin: "580-669 (Fair)", min: 580, max: 669, count: 5650 },
      { bin: "670-739 (Good)", min: 670, max: 739, count: 9800 },
      { bin: "740-799 (Very Good)", min: 740, max: 799, count: 5350 },
      { bin: "800+ (Exceptional)", min: 800, max: 850, count: 2350 }
    ],
    Annual_Income: [
      { bin: "< $40k", min: 15000, max: 39999, count: 3200 },
      { bin: "$40k-$70k", min: 40000, max: 69999, count: 8900 },
      { bin: "$70k-$100k", min: 70000, max: 99999, count: 7400 },
      { bin: "$100k-$150k", min: 100000, max: 149999, count: 4100 },
      { bin: "$150k+", min: 150000, max: 250000, count: 1400 }
    ],
    Debt_to_Income: [
      { bin: "0.0 - 0.2", min: 0, max: 0.2, count: 5900 },
      { bin: "0.2 - 0.35", min: 0.2, max: 0.35, count: 10450 },
      { bin: "0.35 - 0.5", min: 0.35, max: 0.5, count: 6200 },
      { bin: "0.5+", min: 0.5, max: 1.0, count: 2450 }
    ],
    Loan_Amount: [
      { bin: "< $10k", min: 0, max: 9999, count: 4100 },
      { bin: "$10k-$20k", min: 10000, max: 19999, count: 9600 },
      { bin: "$20k-$35k", min: 20000, max: 34999, count: 7700 },
      { bin: "$35k+", min: 35000, max: 70000, count: 3600 }
    ]
  },
  correlations: {
    features: ["Age", "Income", "CreditScore", "DTI", "LoanAmt", "Utilization", "Savings"],
    matrix: [
      [ 1.00,  0.42,  0.31, -0.18,  0.22, -0.15,  0.38],
      [ 0.42,  1.00,  0.52, -0.29,  0.62, -0.28,  0.69],
      [ 0.31,  0.52,  1.00, -0.68,  0.26, -0.64,  0.58],
      [-0.18, -0.29, -0.68,  1.00,  0.31,  0.56, -0.44],
      [ 0.22,  0.62,  0.26,  0.31,  1.00,  0.19,  0.33],
      [-0.15, -0.28, -0.64,  0.56,  0.19,  1.00, -0.49],
      [ 0.38,  0.69,  0.58, -0.44,  0.33, -0.49,  1.00]
    ],
    topCorrelations: [
      { featureA: "Credit_Score", featureB: "Debt_to_Income", correlation: -0.68 },
      { featureA: "Annual_Income", featureB: "Savings_Balance", correlation: 0.69 },
      { featureA: "Credit_Score", featureB: "Revolving_Utilization", correlation: -0.64 },
      { featureA: "Annual_Income", featureB: "Loan_Amount", correlation: 0.62 },
      { featureA: "Credit_Score", featureB: "Savings_Balance", correlation: 0.58 },
      { featureA: "Debt_to_Income", featureB: "Revolving_Utilization", correlation: 0.56 }
    ]
  },
  outliersSummary: [
    { feature: "Annual_Income", outlierCount: 284, outlierPercentage: 1.14, lowerBound: 0, upperBound: 163500 },
    { feature: "Savings_Balance", outlierCount: 410, outlierPercentage: 1.64, lowerBound: 0, upperBound: 99900 },
    { feature: "Delinquencies_Last_2Yrs", outlierCount: 312, outlierPercentage: 1.25, lowerBound: 0, upperBound: 2 },
    { feature: "Loan_Amount", outlierCount: 162, outlierPercentage: 0.65, lowerBound: 0, upperBound: 54500 }
  ],
  insights: [
    {
      id: "ins-01",
      category: "correlation",
      title: "Strong Inverse Risk Correlation",
      observation: "Credit Score shows a significant negative correlation with Debt-to-Income (-0.68) and Revolving Utilization (-0.64). High utilization is the primary leading indicator of credit distress.",
      impact: "high"
    },
    {
      id: "ins-02",
      category: "distribution",
      title: "Right-Skewed Wealth Indicators",
      observation: "Annual Income (skewness 1.42) and Savings Balance (skewness 1.88) show marked positive skewness with high-net-worth tails. Logarithmic scaling or robust scaler recommended before distance-based modeling.",
      impact: "medium"
    },
    {
      id: "ins-03",
      category: "data_quality",
      title: "Clean Record Base with Negligible Missingness",
      observation: "Missing values account for only 0.047% of total cell entries (142 cells across 25,000 records). Imputation via median for numerical and mode for categorical features preserves data integrity without leakage.",
      impact: "low"
    },
    {
      id: "ins-04",
      category: "ml_readiness",
      title: "Optimal Class Distribution for Supervised Learning",
      observation: "Target risk distribution contains 65% Low Risk, 23% Moderate Risk, and 12% High Risk. Stratified k-fold validation and SMOTE or class-weighting ensure robust minority class recall in production.",
      impact: "high"
    }
  ]
};

export const mockFeatureSchema: FeatureSchemaResponse = {
  targetVariable: "Loan_Default_Risk",
  problemType: "classification",
  defaultModel: "XGBoost Classifier",
  availableModels: [
    "XGBoost Classifier",
    "Random Forest",
    "Gradient Boosting",
    "Support Vector Machine",
    "Logistic Regression"
  ],
  features: [
    {
      name: "Age",
      label: "Applicant Age",
      type: "numeric",
      min: 18,
      max: 85,
      step: 1,
      default: 35,
      unit: "years",
      description: "Chronological age of the primary loan applicant"
    },
    {
      name: "Annual_Income",
      label: "Gross Annual Income",
      type: "numeric",
      min: 15000,
      max: 500000,
      step: 1000,
      default: 75000,
      unit: "USD",
      description: "Verified annual pre-tax income"
    },
    {
      name: "Credit_Score",
      label: "FICO / Credit Bureau Score",
      type: "numeric",
      min: 300,
      max: 850,
      step: 1,
      default: 710,
      unit: "points",
      description: "Standard credit score indicator (300 to 850)"
    },
    {
      name: "Debt_to_Income",
      label: "Debt-to-Income Ratio (DTI)",
      type: "numeric",
      min: 0.01,
      max: 0.95,
      step: 0.01,
      default: 0.28,
      unit: "ratio",
      description: "Monthly recurring debt obligations divided by monthly gross income"
    },
    {
      name: "Loan_Amount",
      label: "Requested Loan Amount",
      type: "numeric",
      min: 1000,
      max: 100000,
      step: 500,
      default: 20000,
      unit: "USD",
      description: "Total requested principal amount"
    },
    {
      name: "Employment_Type",
      label: "Employment Classification",
      type: "categorical",
      default: "Salaried",
      options: ["Salaried", "Self-Employed", "Corporate Executive", "Contract / Freelance"],
      description: "Primary verifiable occupational classification"
    },
    {
      name: "Home_Ownership",
      label: "Residential Status",
      type: "categorical",
      default: "Mortgage",
      options: ["Mortgage", "Rent", "Own"],
      description: "Current legal housing and residency arrangement"
    },
    {
      name: "Revolving_Utilization",
      label: "Revolving Credit Utilization",
      type: "numeric",
      min: 0.01,
      max: 1.0,
      step: 0.01,
      default: 0.32,
      unit: "ratio",
      description: "Proportion of active revolving credit limits currently drawn"
    },
    {
      name: "Delinquencies_Last_2Yrs",
      label: "Delinquencies in Past 24 Months",
      type: "numeric",
      min: 0,
      max: 10,
      step: 1,
      default: 0,
      unit: "incidents",
      description: "Number of 30+ day past due credit events recorded in bureau history"
    },
    {
      name: "Savings_Balance",
      label: "Liquid Deposit & Savings Reserves",
      type: "numeric",
      min: 0,
      max: 500000,
      step: 1000,
      default: 24000,
      unit: "USD",
      description: "Total verifiable liquid cash and cash equivalents across accounts"
    }
  ]
};

export const mockModelsResponse: ModelsResponse = {
  selectedModel: {
    name: "XGBoost Classifier",
    metric: "F1-Score (Macro)",
    score: 0.928,
    problemType: "classification"
  },
  evaluationSummary: "Models were evaluated using 5-fold Stratified Cross-Validation on a held-out test partition (20% split, 5,000 records). XGBoost demonstrated the highest discriminative power, achieving 0.948 test accuracy and an AUC-ROC of 0.971, outperforming ensemble and linear baselines.",
  classificationModels: [
    {
      algorithm: "XGBoost Classifier",
      accuracy: 0.948,
      precision: 0.932,
      recall: 0.924,
      f1Score: 0.928,
      trainingTimeSec: 4.82,
      isBest: true,
      metricBasis: "Benchmark Winner"
    },
    {
      algorithm: "Random Forest",
      accuracy: 0.936,
      precision: 0.915,
      recall: 0.908,
      f1Score: 0.911,
      trainingTimeSec: 8.45
    },
    {
      algorithm: "Gradient Boosting",
      accuracy: 0.929,
      precision: 0.908,
      recall: 0.895,
      f1Score: 0.901,
      trainingTimeSec: 6.12
    },
    {
      algorithm: "Support Vector Machine (RBF)",
      accuracy: 0.884,
      precision: 0.862,
      recall: 0.841,
      f1Score: 0.851,
      trainingTimeSec: 18.7
    },
    {
      algorithm: "Logistic Regression",
      accuracy: 0.852,
      precision: 0.824,
      recall: 0.812,
      f1Score: 0.818,
      trainingTimeSec: 0.94
    },
    {
      algorithm: "K-Nearest Neighbors (k=7)",
      accuracy: 0.835,
      precision: 0.801,
      recall: 0.792,
      f1Score: 0.796,
      trainingTimeSec: 2.15
    }
  ],
  regressionModels: [
    {
      algorithm: "Gradient Boosted Regressor",
      mae: 1240.50,
      mse: 2840100.25,
      rmse: 1685.26,
      r2Score: 0.912,
      trainingTimeSec: 5.34,
      isBest: true
    },
    {
      algorithm: "Random Forest Regressor",
      mae: 1395.20,
      mse: 3410500.80,
      rmse: 1846.75,
      r2Score: 0.894,
      trainingTimeSec: 9.12
    },
    {
      algorithm: "Ridge Regression (L2)",
      mae: 1820.40,
      mse: 5210900.00,
      rmse: 2282.74,
      r2Score: 0.838,
      trainingTimeSec: 0.42
    },
    {
      algorithm: "Ordinary Least Squares",
      mae: 1845.80,
      mse: 5380400.15,
      rmse: 2319.57,
      r2Score: 0.832,
      trainingTimeSec: 0.28
    }
  ]
};

export const mockClustersResponse: ClustersResponse = {
  isApplicable: true,
  algorithm: "K-Means Clustering (Standardized PCA Coordinates)",
  numClusters: 3,
  silhouetteScore: 0.642,
  featuresUsed: ["Annual_Income", "Credit_Score", "Debt_to_Income", "Revolving_Utilization", "Savings_Balance"],
  clusterDistribution: [
    { cluster: "Cluster 1: Prime & Resilient", count: 9800, percentage: 39.2, color: "#1d4ed8" },
    { cluster: "Cluster 2: Stretched Leveraged", count: 8750, percentage: 35.0, color: "#d97706" },
    { cluster: "Cluster 3: Subprime Fragile", count: 6450, percentage: 25.8, color: "#e11d48" }
  ],
  elbowCurve: [
    { k: 1, inertia: 124800 },
    { k: 2, inertia: 68500 },
    { k: 3, inertia: 34200 }, // Elbow inflection
    { k: 4, inertia: 28400 },
    { k: 5, inertia: 24100 },
    { k: 6, inertia: 20900 },
    { k: 7, inertia: 18400 }
  ],
  silhouetteScoresByK: [
    { k: 2, score: 0.58 },
    { k: 3, score: 0.642 }, // Peak silhouette
    { k: 4, score: 0.52 },
    { k: 5, score: 0.46 },
    { k: 6, score: 0.39 }
  ],
  visualPoints: [
    // Cluster 1
    { x: 2.1, y: 1.8, cluster: 1, label: "Prime 1" },
    { x: 2.4, y: 2.3, cluster: 1, label: "Prime 2" },
    { x: 1.8, y: 1.5, cluster: 1, label: "Prime 3" },
    { x: 2.6, y: 1.9, cluster: 1, label: "Prime 4" },
    { x: 2.2, y: 2.8, cluster: 1, label: "Prime 5" },
    { x: 1.5, y: 2.0, cluster: 1, label: "Prime 6" },
    { x: 2.8, y: 2.4, cluster: 1, label: "Prime 7" },
    { x: 2.0, y: 1.2, cluster: 1, label: "Prime 8" },
    { x: 1.9, y: 2.5, cluster: 1, label: "Prime 9" },
    // Cluster 2
    { x: -0.2, y: 0.8, cluster: 2, label: "Leveraged 1" },
    { x: 0.4, y: -0.5, cluster: 2, label: "Leveraged 2" },
    { x: -0.6, y: 0.2, cluster: 2, label: "Leveraged 3" },
    { x: 0.1, y: -0.8, cluster: 2, label: "Leveraged 4" },
    { x: 0.5, y: 0.4, cluster: 2, label: "Leveraged 5" },
    { x: -0.3, y: -0.2, cluster: 2, label: "Leveraged 6" },
    { x: 0.2, y: 0.9, cluster: 2, label: "Leveraged 7" },
    { x: -0.5, y: -0.6, cluster: 2, label: "Leveraged 8" },
    // Cluster 3
    { x: -2.2, y: -1.8, cluster: 3, label: "Subprime 1" },
    { x: -1.9, y: -2.4, cluster: 3, label: "Subprime 2" },
    { x: -2.6, y: -1.5, cluster: 3, label: "Subprime 3" },
    { x: -2.4, y: -2.6, cluster: 3, label: "Subprime 4" },
    { x: -1.7, y: -1.4, cluster: 3, label: "Subprime 5" },
    { x: -2.8, y: -2.1, cluster: 3, label: "Subprime 6" },
    { x: -2.0, y: -2.8, cluster: 3, label: "Subprime 7" },
    { x: -1.5, y: -2.2, cluster: 3, label: "Subprime 8" }
  ],
  clusterCharacteristics: [
    {
      id: 1,
      name: "Prime & Wealth-Backed Borrowers",
      count: 9800,
      percentage: 39.2,
      profile: "High creditworthiness characterized by low revolving debt, substantial savings buffer, and high disposable income.",
      riskLevel: "Prime",
      centroidValues: {
        "Annual Income": "$102,400",
        "Credit Score": "768",
        "Debt to Income": "0.19",
        "Revolving Utilization": "21%",
        "Savings Balance": "$58,200"
      },
      dominantAttributes: [
        "FICO > 740 benchmark",
        "High liquid asset reserves",
        "Low delinquency propensity (<0.02%)"
      ]
    },
    {
      id: 2,
      name: "Middle-Tier Leveraged Consumers",
      count: 8750,
      percentage: 35.0,
      profile: "Moderate income earners carrying substantial recurring liabilities. Vulnerable to interest rate shocks or unexpected expenses.",
      riskLevel: "Medium Risk",
      centroidValues: {
        "Annual Income": "$66,800",
        "Credit Score": "672",
        "Debt to Income": "0.36",
        "Revolving Utilization": "52%",
        "Savings Balance": "$14,500"
      },
      dominantAttributes: [
        "Moderate credit range (650-700)",
        "Elevated card utilization (45-60%)",
        "Modest buffer reserves"
      ]
    },
    {
      id: 3,
      name: "Subprime & Credit Strained",
      count: 6450,
      percentage: 25.8,
      profile: "High financial fragility, depressed credit score, heavy utilization of credit lines, and high frequency of historical delinquencies.",
      riskLevel: "High Risk",
      centroidValues: {
        "Annual Income": "$41,200",
        "Credit Score": "584",
        "Debt to Income": "0.52",
        "Revolving Utilization": "84%",
        "Savings Balance": "$2,100"
      },
      dominantAttributes: [
        "FICO < 600 default zone",
        "Severe revolving strain (>80%)",
        "High past due delinquency rate"
      ]
    }
  ]
};

export const mockAssociationRulesResponse: AssociationRulesResponse = {
  isApplicable: true,
  totalRules: 8,
  datasetType: "Discretized Financial Risk Indicators",
  rules: [
    {
      id: "rule-1",
      antecedents: ["High_Utilization (>75%)", "DTI_Elevated (>40%)"],
      consequents: ["Default_Risk_High"],
      support: 0.114,
      confidence: 0.892,
      lift: 3.42,
      conviction: 4.85,
      leverage: 0.081
    },
    {
      id: "rule-2",
      antecedents: ["Low_Savings (<$5,000)", "Delinquency_History (>=1)"],
      consequents: ["Default_Risk_High"],
      support: 0.098,
      confidence: 0.841,
      lift: 3.22,
      conviction: 3.94,
      leverage: 0.068
    },
    {
      id: "rule-3",
      antecedents: ["FICO_Prime (>740)", "Low_DTI (<25%)"],
      consequents: ["Default_Risk_Low"],
      support: 0.325,
      confidence: 0.964,
      lift: 1.48,
      conviction: 8.12,
      leverage: 0.105
    },
    {
      id: "rule-4",
      antecedents: ["High_Income (>$100k)", "Home_Owner (Mortgage)"],
      consequents: ["Default_Risk_Low"],
      support: 0.248,
      confidence: 0.912,
      lift: 1.40,
      conviction: 4.15,
      leverage: 0.071
    },
    {
      id: "rule-5",
      antecedents: ["Contract_Worker", "High_Utilization (>75%)"],
      consequents: ["Delinquency_History (>=1)"],
      support: 0.076,
      confidence: 0.778,
      lift: 2.85,
      conviction: 2.92,
      leverage: 0.049
    },
    {
      id: "rule-6",
      antecedents: ["Moderate_FICO (620-680)", "DTI_Elevated (>40%)"],
      consequents: ["Default_Risk_Moderate"],
      support: 0.142,
      confidence: 0.725,
      lift: 2.18,
      conviction: 2.31,
      leverage: 0.077
    },
    {
      id: "rule-7",
      antecedents: ["Young_Borrower (<30)", "Rent_Housing"],
      consequents: ["Low_Savings (<$5,000)"],
      support: 0.185,
      confidence: 0.812,
      lift: 2.15,
      conviction: 2.65,
      leverage: 0.099
    },
    {
      id: "rule-8",
      antecedents: ["High_Savings (>$50,000)"],
      consequents: ["Default_Risk_Low"],
      support: 0.284,
      confidence: 0.978,
      lift: 1.50,
      conviction: 12.4,
      leverage: 0.095
    }
  ]
};

export const generateMockPrediction = (features: Record<string, any>, modelName: string = "XGBoost Classifier"): PredictionResponse => {
  const creditScore = Number(features.Credit_Score ?? 700);
  const dti = Number(features.Debt_to_Income ?? 0.3);
  const utilization = Number(features.Revolving_Utilization ?? 0.4);
  const income = Number(features.Annual_Income ?? 75000);
  const delinquencies = Number(features.Delinquencies_Last_2Yrs ?? 0);

  // Compute realistic credit risk score
  let riskScore = 0;
  if (creditScore < 600) riskScore += 45;
  else if (creditScore < 680) riskScore += 25;
  else if (creditScore < 740) riskScore += 10;
  else riskScore += 2;

  if (dti > 0.45) riskScore += 25;
  else if (dti > 0.35) riskScore += 15;
  else riskScore += 5;

  if (utilization > 0.75) riskScore += 20;
  else if (utilization > 0.5) riskScore += 10;
  else riskScore += 3;

  if (delinquencies > 0) riskScore += 15 * delinquencies;
  if (income > 100000) riskScore -= 10;

  riskScore = Math.max(5, Math.min(95, riskScore));

  let prediction: string;
  let predictionLabel: string;
  let confidence: number;
  let recommendation: string;

  if (riskScore < 30) {
    prediction = "Low Risk (Grade A - Approved)";
    predictionLabel = "Low Risk";
    confidence = Number((0.88 + Math.random() * 0.09).toFixed(3));
    recommendation = "Applicant qualifies for standard prime lending terms and preferred interest rates.";
  } else if (riskScore < 60) {
    prediction = "Moderate Risk (Grade B - Conditional Approval)";
    predictionLabel = "Moderate Risk";
    confidence = Number((0.75 + Math.random() * 0.12).toFixed(3));
    recommendation = "Conditional approval subject to collateral verification or secondary underwriting review.";
  } else {
    prediction = "High Risk / Default (Grade C - Decline)";
    predictionLabel = "High Risk";
    confidence = Number((0.89 + Math.random() * 0.08).toFixed(3));
    recommendation = "Application exceeds portfolio risk tolerance thresholds due to elevated leverage and credit distress signals.";
  }

  const probHigh = Number((riskScore / 100).toFixed(3));
  const probLow = Number((Math.max(0, 1 - probHigh - 0.15)).toFixed(3));
  const probMod = Number((1 - probHigh - probLow).toFixed(3));

  return {
    prediction,
    predictionLabel,
    confidence,
    probabilities: {
      "Low Risk": Math.max(0.01, probLow),
      "Moderate Risk": Math.max(0.01, probMod),
      "High Risk / Default": Math.max(0.01, probHigh)
    },
    modelUsed: modelName,
    timestamp: new Date().toISOString(),
    explanation: [
      {
        feature: "Credit Score",
        importance: creditScore < 650 ? -38 : 34,
        effect: creditScore < 650 ? "negative" : "positive",
        value: creditScore
      },
      {
        feature: "Debt-to-Income",
        importance: dti > 0.38 ? -28 : 22,
        effect: dti > 0.38 ? "negative" : "positive",
        value: `${(dti * 100).toFixed(1)}%`
      },
      {
        feature: "Revolving Utilization",
        importance: utilization > 0.6 ? -24 : 18,
        effect: utilization > 0.6 ? "negative" : "positive",
        value: `${(utilization * 100).toFixed(1)}%`
      },
      {
        feature: "Annual Income",
        importance: income > 60000 ? 16 : -12,
        effect: income > 60000 ? "positive" : "negative",
        value: `$${income.toLocaleString()}`
      },
      {
        feature: "Delinquency History",
        importance: delinquencies > 0 ? -22 : 8,
        effect: delinquencies > 0 ? "negative" : "positive",
        value: delinquencies
      }
    ],
    recommendation
  };
};

export const generateMockClusterAssignment = (features: Record<string, any>): ClusterAssignResponse => {
  const creditScore = Number(features.Credit_Score ?? 700);
  const income = Number(features.Annual_Income ?? 75000);
  const dti = Number(features.Debt_to_Income ?? 0.3);

  if (creditScore >= 720 && income >= 80000 && dti < 0.3) {
    return {
      assignedCluster: 1,
      clusterName: "Cluster 1: Prime & Resilient",
      distanceToCentroid: 0.42,
      clusterProfile: "High net worth and prime credit borrower profile with strong liquidity and low risk footprint.",
      recommendedAction: "Eligible for premium credit tiers and accelerated processing."
    };
  } else if (creditScore < 620 || dti > 0.48) {
    return {
      assignedCluster: 3,
      clusterName: "Cluster 3: Subprime Fragile",
      distanceToCentroid: 0.58,
      clusterProfile: "Elevated financial fragility, restricted buffer, and high debt ratio profile.",
      recommendedAction: "Direct to structured credit remediation or secured lending options."
    };
  } else {
    return {
      assignedCluster: 2,
      clusterName: "Cluster 2: Stretched Leveraged",
      distanceToCentroid: 0.51,
      clusterProfile: "Middle-tier consumer with moderate debt obligations and typical revolving balances.",
      recommendedAction: "Standard monitoring and routine underwriting reviews."
    };
  }
};
