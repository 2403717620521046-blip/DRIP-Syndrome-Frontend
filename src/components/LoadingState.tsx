import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  subtext?: string;
  minHeight?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  subtext = "Retrieving analysis data from ML backend pipeline",
  minHeight = "min-h-[280px]"
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 bg-white border border-slate-200/80 rounded-xl shadow-subtle ${minHeight}`}>
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-slate-100 border-t-blue-600 animate-spin"></div>
        <Loader2 className="w-5 h-5 text-blue-600 absolute animate-pulse" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900 tracking-wide">{message}</h3>
      <p className="text-xs text-slate-500 mt-1 max-w-sm text-center">{subtext}</p>
    </div>
  );
};

export default LoadingState;
