// TypeScript Interfaces for Wealth Resource Financial Intelligence System

export interface KpiSummary {
  totalRecords: number;
  totalFeatures: number;
  missingValues: number;
  duplicateRecords: number;
  bestModel: string;
  modelAccuracy: number; // e.g. 0.942 (94.2%)
  targetVariable?: string;
  lastUpdated?: string;
}

export interface DistributionItem {
  name: string;
  count: number;
  percentage?: number;
  color?: string;
}

export interface CorrelationItem {
  featureA: string;
  featureB: string;
  correlation: number; // -1 to 1
}

export interface ModelMetric {
  algorithm: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainingTimeSec: number;
  isBest?: boolean;
  metricBasis?: string;
}

export interface RegressionMetric {
  algorithm: string;
  mae: number;
  mse: number;
  rmse: number;
  r2Score: number;
  trainingTimeSec: number;
  isBest?: boolean;
}

export interface ClusterDistribution {
  cluster: string;
  count: number;
  percentage: number;
  color?: string;
}

export interface DashboardResponse {
  kpis: KpiSummary;
  datasetDistribution: DistributionItem[];
  targetDistribution: DistributionItem[];
  featureCorrelation: CorrelationItem[];
  modelPerformance: ModelMetric[];
  clusterDistribution: ClusterDistribution[];
  datasetName?: string;
}

export interface DatasetColumn {
  name: string;
  type: 'numeric' | 'categorical' | 'datetime' | 'boolean' | 'text';
  missingCount: number;
  uniqueCount: number;
}

export interface DatasetResponse {
  shape: {
    rows: number;
    columns: number;
    missingValues: number;
    duplicates: number;
  };
  columns: DatasetColumn[];
  rows: Record<string, any>[];
  totalRows: number;
  page: number;
  pageSize: number;
  datasetName: string;
}

export interface FeatureNumericStats {
  mean: number;
  std: number;
  min: number;
  q25: number;
  median: number;
  q75: number;
  max: number;
  skewness: number;
  outliersCount: number;
}

export interface FeatureStatItem {
  name: string;
  type: string;
  missingCount: number;
  uniqueCount: number;
  numericStats?: FeatureNumericStats;
  topCategories?: { value: string; count: number }[];
}

export interface HistogramBin {
  bin: string;
  min: number;
  max: number;
  count: number;
}

export interface ScatterPoint {
  x: number;
  y: number;
  id?: string | number;
  category?: string;
}

export interface EDAResponse {
  overview: {
    totalRecords: number;
    totalFeatures: number;
    numericalFeatures: number;
    categoricalFeatures: number;
    missingCells: number;
    missingPercentage: number;
  };
  featureStatistics: FeatureStatItem[];
  distributions: Record<string, HistogramBin[]>;
  scatterData?: Record<string, ScatterPoint[]>;
  correlations: {
    features: string[];
    matrix: number[][];
    topCorrelations: CorrelationItem[];
  };
  outliersSummary: {
    feature: string;
    outlierCount: number;
    outlierPercentage: number;
    lowerBound: number;
    upperBound: number;
  }[];
  insights: {
    id: string;
    category: 'data_quality' | 'correlation' | 'distribution' | 'ml_readiness';
    title: string;
    observation: string;
    impact: 'high' | 'medium' | 'low';
  }[];
}

export interface FeatureFieldSchema {
  name: string;
  label: string;
  type: 'numeric' | 'categorical' | 'boolean';
  min?: number;
  max?: number;
  step?: number;
  default?: any;
  options?: string[];
  unit?: string;
  description?: string;
  required?: boolean;
}

export interface FeatureSchemaResponse {
  targetVariable: string;
  problemType: 'classification' | 'regression';
  features: FeatureFieldSchema[];
  availableModels: string[];
  defaultModel: string;
}

export interface PredictionRequest {
  model?: string;
  features: Record<string, any>;
}

export interface FeatureImportance {
  feature: string;
  importance: number; // percentage or relative value
  effect?: 'positive' | 'negative' | 'neutral';
  value?: any;
}

export interface PredictionResponse {
  prediction: string | number;
  predictionLabel?: string;
  confidence: number; // 0 to 1
  probabilities?: Record<string, number>;
  modelUsed: string;
  timestamp: string;
  explanation?: FeatureImportance[];
  recommendation?: string;
}

export interface ModelsResponse {
  selectedModel: {
    name: string;
    metric: string;
    score: number;
    problemType: 'classification' | 'regression';
  };
  classificationModels: ModelMetric[];
  regressionModels: RegressionMetric[];
  evaluationSummary: string;
}

export interface ClusterCharacteristic {
  id: string | number;
  name: string;
  count: number;
  percentage: number;
  profile: string;
  centroidValues: Record<string, number | string>;
  riskLevel?: 'Low Risk' | 'Medium Risk' | 'High Risk' | 'Prime' | 'Subprime';
  dominantAttributes: string[];
}

export interface ClustersResponse {
  isApplicable: boolean;
  algorithm: string;
  numClusters: number;
  silhouetteScore: number;
  clusterDistribution: ClusterDistribution[];
  elbowCurve: { k: number; inertia: number }[];
  silhouetteScoresByK: { k: number; score: number }[];
  visualPoints: {
    x: number;
    y: number;
    cluster: number;
    label?: string;
  }[];
  clusterCharacteristics: ClusterCharacteristic[];
  featuresUsed: string[];
}

export interface ClusterAssignRequest {
  features: Record<string, any>;
}

export interface ClusterAssignResponse {
  assignedCluster: number | string;
  clusterName: string;
  distanceToCentroid: number;
  clusterProfile: string;
  recommendedAction?: string;
}

export interface AssociationRule {
  id: string;
  antecedents: string[];
  consequents: string[];
  support: number;
  confidence: number;
  lift: number;
  conviction?: number;
  leverage?: number;
}

export interface AssociationRulesResponse {
  isApplicable: boolean;
  totalRules: number;
  datasetType?: string;
  rules: AssociationRule[];
  reasonIfNotApplicable?: string;
}
