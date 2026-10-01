import axios, { AxiosError } from 'axios';
import {
  DashboardResponse,
  DatasetResponse,
  EDAResponse,
  FeatureSchemaResponse,
  ModelsResponse,
  ClustersResponse,
  AssociationRulesResponse,
  PredictionRequest,
  PredictionResponse,
  ClusterAssignRequest,
  ClusterAssignResponse
} from '../types';
import {
  mockDashboardData,
  mockDatasetResponse,
  mockEDAResponse,
  mockFeatureSchema,
  mockModelsResponse,
  mockClustersResponse,
  mockAssociationRulesResponse,
  generateMockPrediction,
  generateMockClusterAssignment
} from './mockData';

// API Base URL from environment variable with fallback
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://drip-project.onrender.com';

// Axios Instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Demo mode state management (persisted in localStorage)
const DEMO_MODE_STORAGE_KEY = 'wealth_resource_demo_mode_active';

export const isDemoMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(DEMO_MODE_STORAGE_KEY) === 'true';
};

export const setDemoMode = (enabled: boolean): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(DEMO_MODE_STORAGE_KEY, enabled ? 'true' : 'false');
    window.dispatchEvent(new Event('wealth_resource_demo_mode_changed'));
  }
};

// Helper for simulated latency in demo mode
const simulateLatency = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

// Centralized API Functions
export const api = {
  // GET /api/dashboard
  async getDashboard(): Promise<DashboardResponse> {
    if (isDemoMode()) {
      await simulateLatency();
      return mockDashboardData;
    }
    const response = await apiClient.get<DashboardResponse>('/api/dashboard');
    return response.data;
  },

  // GET /api/dataset
  async getDataset(page = 1, pageSize = 15, search = ''): Promise<DatasetResponse> {
    if (isDemoMode()) {
      await simulateLatency();
      let filtered = [...mockDatasetResponse.rows];
      if (search.trim()) {
        const query = search.toLowerCase();
        filtered = filtered.filter(row =>
          Object.values(row).some(val => String(val).toLowerCase().includes(query))
        );
      }
      const start = (page - 1) * pageSize;
      const paginated = filtered.slice(start, start + pageSize);
      return {
        ...mockDatasetResponse,
        rows: paginated,
        totalRows: filtered.length,
        page,
        pageSize
      };
    }
    const response = await apiClient.get<DatasetResponse>('/api/dataset', {
      params: { page, page_size: pageSize, search }
    });
    return response.data;
  },

  // GET /api/statistics
  async getDatasetStatistics(): Promise<DatasetResponse['shape']> {
    if (isDemoMode()) {
      await simulateLatency();
      return mockDatasetResponse.shape;
    }
    const response = await apiClient.get<DatasetResponse['shape']>('/api/statistics');
    return response.data;
  },

  // GET /api/features
  async getFeatures(): Promise<FeatureSchemaResponse> {
    if (isDemoMode()) {
      await simulateLatency();
      return mockFeatureSchema;
    }
    const response = await apiClient.get<FeatureSchemaResponse>('/api/features');
    return response.data;
  },

  // GET /api/eda
  async getEDA(): Promise<EDAResponse> {
    if (isDemoMode()) {
      await simulateLatency();
      return mockEDAResponse;
    }
    const response = await apiClient.get<EDAResponse>('/api/eda');
    return response.data;
  },

  // GET /api/models
  async getModels(): Promise<ModelsResponse> {
    if (isDemoMode()) {
      await simulateLatency();
      return mockModelsResponse;
    }
    const response = await apiClient.get<ModelsResponse>('/api/models');
    return response.data;
  },

  // POST /api/predict
  async predict(data: PredictionRequest): Promise<PredictionResponse> {
    if (isDemoMode()) {
      await simulateLatency(600);
      return generateMockPrediction(data.features, data.model);
    }
    const response = await apiClient.post<PredictionResponse>('/api/predict', data);
    return response.data;
  },

  // GET /api/clusters
  async getClusters(): Promise<ClustersResponse> {
    if (isDemoMode()) {
      await simulateLatency();
      return mockClustersResponse;
    }
    const response = await apiClient.get<ClustersResponse>('/api/clusters');
    return response.data;
  },

  // POST /api/cluster
  async assignCluster(data: ClusterAssignRequest): Promise<ClusterAssignResponse> {
    if (isDemoMode()) {
      await simulateLatency(500);
      return generateMockClusterAssignment(data.features);
    }
    const response = await apiClient.post<ClusterAssignResponse>('/api/cluster', data);
    return response.data;
  },

  // GET /api/association-rules
  async getAssociationRules(): Promise<AssociationRulesResponse> {
    if (isDemoMode()) {
      await simulateLatency();
      return mockAssociationRulesResponse;
    }
    const response = await apiClient.get<AssociationRulesResponse>('/api/association-rules');
    return response.data;
  },

  // POST /api/upload (Dataset Upload)
  async uploadDataset(file: File): Promise<{ message: string; rows: number; columns: number }> {
    if (isDemoMode()) {
      await simulateLatency(800);
      return {
        message: `Dataset "${file.name}" uploaded and parsed successfully.`,
        rows: 25000,
        columns: 12
      };
    }
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Health check for backend connectivity status
  async checkHealth(): Promise<boolean> {
    if (isDemoMode()) return true;
    try {
      await apiClient.get('/health', { timeout: 4000 });
      return true;
    } catch {
      try {
        await apiClient.get('/api/statistics', { timeout: 3000 });
        return true;
      } catch {
        return false;
      }
    }
  }
};

export default api;
