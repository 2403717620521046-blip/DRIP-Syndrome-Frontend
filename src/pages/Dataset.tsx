import React, { useState, useRef } from 'react';
import {
  Upload,
  FileSpreadsheet,
  Database,
  Layers,
  AlertCircle,
  Copy,
  Download,
  CheckCircle2,
  RefreshCw,
  FileUp,
  FileText
} from 'lucide-react';
import { api } from '../services/api';
import useApi from '../hooks/useApi';
import DataTable from '../components/DataTable';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

export const Dataset: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data, loading, error, errorMessage, refetch } = useApi(
    () => api.getDataset(1, 15),
    []
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadMessage(null);
    try {
      const res = await api.uploadDataset(file);
      setUploadMessage(res.message);
      await refetch();
    } catch (err: any) {
      setUploadMessage("Failed to upload dataset. Check backend service.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (loading) {
    return <LoadingState message="Loading Financial Dataset Records..." />;
  }

  if (error || !data) {
    return (
      <ErrorState
        title="Dataset Inaccessible"
        message={errorMessage || "Unable to connect to the ML backend."}
        onRetry={refetch}
      />
    );
  }

  if (!data.columns || data.columns.length === 0) {
    return (
      <EmptyState
        type="no_dataset"
        title="No dataset available"
        description="Upload a CSV or Excel financial dataset to start exploratory and predictive analysis."
        actionLabel="Select File"
        onAction={() => fileInputRef.current?.click()}
      />
    );
  }

  const { shape, columns, rows, datasetName } = data;

  return (
    <div className="space-y-6">
      {/* Hidden file input for CSV/Excel upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv, .xlsx, .xls"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Header & Upload Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Dataset Explorer
            </h1>
            <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
              {datasetName}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Inspect raw tabular attributes, sort columns, verify completeness, and audit records.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reload</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <FileUp className="w-4 h-4" />
                <span>Upload Dataset</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Upload Notification Message if present */}
      {uploadMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{uploadMessage}</span>
          </div>
          <button
            onClick={() => setUploadMessage(null)}
            className="text-[11px] underline text-emerald-700 hover:text-emerald-900"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Dataset Shape & Metadata Bar: Rows, Columns, Missing Values, Duplicates */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Total Rows</span>
            <Database className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-1 text-xl font-bold text-slate-900 font-mono">
            {shape.rows.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400">Total verified instances</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Total Columns</span>
            <Layers className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-1 text-xl font-bold text-slate-900 font-mono">
            {shape.columns}
          </div>
          <span className="text-[11px] text-slate-400">Features + Target label</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Missing Values</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-1 text-xl font-bold text-slate-900 font-mono">
            {shape.missingValues}
          </div>
          <span className="text-[11px] text-slate-400">
            {shape.missingValues === 0 ? "Zero null entries" : "Handled via imputation"}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider">Duplicate Records</span>
            <Copy className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-1 text-xl font-bold text-slate-900 font-mono">
            {shape.duplicates}
          </div>
          <span className="text-[11px] text-slate-400">Unique record hashes</span>
        </div>
      </div>

      {/* Professional Interactive Data Table */}
      <DataTable
        columns={columns}
        rows={rows}
        totalRows={shape.rows}
        pageSize={15}
        datasetName={datasetName}
      />
    </div>
  );
};

export default Dataset;
