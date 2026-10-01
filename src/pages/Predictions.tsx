import React, { useState } from 'react';
import {
  Cpu,
  Sparkles,
  HelpCircle,
  FileCheck,
  Send,
  Layers,
  Info
} from 'lucide-react';
import { api } from '../services/api';
import useApi from '../hooks/useApi';
import PredictionForm from '../components/PredictionForm';
import PredictionResult from '../components/PredictionResult';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { PredictionResponse } from '../types';

export const Predictions: React.FC = () => {
  const { data: schema, loading, error, errorMessage, refetch } = useApi(
    () => api.getFeatures(),
    []
  );

  const [predicting, setPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResponse | null>(null);
  const [predictError, setPredictError] = useState<string | null>(null);

  const handlePredict = async (features: Record<string, any>, modelName: string) => {
    setPredicting(true);
    setPredictError(null);
    try {
      const response = await api.predict({
        features,
        model: modelName
      });
      setPredictionResult(response);
    } catch (err: any) {
      setPredictError(
        err.response?.data?.message || "Failed to execute model prediction. Ensure backend API is active."
      );
    } finally {
      setPredicting(false);
    }
  };

  if (loading) {
    return <LoadingState message="Fetching Model Feature Schema..." />;
  }

  if (error || !schema) {
    return (
      <ErrorState
        title="Prediction Service Unavailable"
        message={errorMessage || "Unable to connect to the ML backend."}
        onRetry={refetch}
      />
    );
  }

  if (!schema.features || schema.features.length === 0) {
    return (
      <EmptyState
        type="not_applicable"
        title="No Feature Schema Defined"
        description="The backend model pipeline has not registered input features. Train or load an estimator to enable inference."
        actionHref="/models"
        actionLabel="View Models"
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Machine Learning Prediction
            </h1>
            <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
              Target: {schema.targetVariable}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Submit customer financial parameters to generate real-time risk predictions with explainable attribution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">
            {schema.features.length} Dynamic Features
          </span>
        </div>
      </div>

      {/* Prediction Output Section (displayed when available) */}
      {predictError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center justify-between">
          <span>{predictError}</span>
          <button
            onClick={() => setPredictError(null)}
            className="text-[11px] underline text-rose-700 hover:text-rose-900"
          >
            Dismiss
          </button>
        </div>
      )}

      {predictionResult && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Latest Prediction Result
            </span>
            <button
              onClick={() => setPredictionResult(null)}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Clear Result
            </button>
          </div>
          <PredictionResult result={predictionResult} />
        </div>
      )}

      {/* Dynamic Schema-Driven Prediction Form */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-card">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Inference Input Attributes
              </h3>
              <p className="text-xs text-slate-500">
                Dynamically generated from <code className="text-blue-600">GET /api/features</code>
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-slate-400">
            Task: <strong className="text-slate-700 uppercase font-mono">{schema.problemType}</strong>
          </div>
        </div>

        <PredictionForm
          features={schema.features}
          availableModels={schema.availableModels}
          defaultModel={schema.defaultModel}
          onSubmit={handlePredict}
          loading={predicting}
        />
      </div>

      {/* Info Notice on Schema Grounding */}
      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-3 text-xs text-slate-600">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800">Dynamic Feature Schema Contract: </strong>
          Input features, ranges, defaults, and available estimators are transmitted dynamically by the ML backend pipeline. No column names or categorical choices are hard-coded in the UI.
        </p>
      </div>
    </div>
  );
};

export default Predictions;
