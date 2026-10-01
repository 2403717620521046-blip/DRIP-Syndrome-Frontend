import React from 'react';
import { AlertCircle, RefreshCw, Database, ServerCrash } from 'lucide-react';
import { setDemoMode, API_BASE_URL } from '../services/api';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showDemoOption?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Backend Service Unavailable",
  message = "Unable to connect to the ML backend.",
  onRetry,
  showDemoOption = true
}) => {
  const handleEnableDemo = () => {
    setDemoMode(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border border-rose-200/80 rounded-xl shadow-subtle min-h-[300px] text-center">
      <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4 shadow-sm">
        <ServerCrash className="w-7 h-7" />
      </div>

      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600 mt-1.5 max-w-md">
        {message}
      </p>

      <div className="mt-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 font-mono">
        Endpoint target: <code className="text-blue-600">{API_BASE_URL}</code>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        )}

        {showDemoOption && (
          <button
            onClick={handleEnableDemo}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-300 rounded-lg transition-colors"
          >
            <Database className="w-4 h-4 text-slate-500" />
            Switch to Demo Mode
          </button>
        )}
      </div>

      <p className="text-[11px] text-slate-400 mt-4">
        Tip: Start your Python Flask/FastAPI service or use Demo Mode for interactive evaluation.
      </p>
    </div>
  );
};

export default ErrorState;
