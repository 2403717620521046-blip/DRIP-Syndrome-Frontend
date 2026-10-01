import React from 'react';
import { Database, FileQuestion, Upload, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  type?: 'no_dataset' | 'not_applicable' | 'custom';
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'custom',
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  icon
}) => {
  let displayTitle = title;
  let displayDesc = description;
  let defaultIcon = icon;

  if (type === 'no_dataset') {
    displayTitle = title || "No dataset available";
    displayDesc = description || "Upload a dataset to begin analysis.";
    defaultIcon = <Database className="w-7 h-7 text-slate-400" />;
  } else if (type === 'not_applicable') {
    displayTitle = title || "Analysis Not Applicable";
    displayDesc = description || "This analysis is not applicable to the current dataset.";
    defaultIcon = <FileQuestion className="w-7 h-7 text-amber-500" />;
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border border-slate-200/80 rounded-xl shadow-subtle min-h-[260px] text-center">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
        {defaultIcon || <Database className="w-6 h-6 text-slate-400" />}
      </div>
      <h3 className="text-base font-semibold text-slate-900">{displayTitle}</h3>
      <p className="text-sm text-slate-500 mt-1 max-w-md">{displayDesc}</p>

      {actionHref && (
        <Link
          to={actionHref}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
        >
          {actionLabel || "Upload Dataset"}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}

      {onAction && !actionHref && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
        >
          <Upload className="w-4 h-4" />
          {actionLabel || "Upload Dataset"}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
