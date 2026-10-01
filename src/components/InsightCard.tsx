import React from 'react';
import { Lightbulb, CheckCircle2, AlertTriangle, Info, TrendingUp } from 'lucide-react';

interface InsightCardProps {
  title: string;
  observation: string;
  category?: 'data_quality' | 'correlation' | 'distribution' | 'ml_readiness';
  impact?: 'high' | 'medium' | 'low';
}

export const InsightCard: React.FC<InsightCardProps> = ({
  title,
  observation,
  category = 'data_quality',
  impact = 'medium'
}) => {
  const getCategoryBadge = () => {
    switch (category) {
      case 'correlation':
        return { label: 'Correlation Signal', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'distribution':
        return { label: 'Distribution Characteristic', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'ml_readiness':
        return { label: 'ML Pipeline Signal', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      default:
        return { label: 'Data Quality', bg: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const getImpactBadge = () => {
    switch (impact) {
      case 'high':
        return 'text-rose-600 font-semibold';
      case 'medium':
        return 'text-amber-600 font-medium';
      default:
        return 'text-slate-500';
    }
  };

  const badgeInfo = getCategoryBadge();

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-card hover:border-slate-300 transition-colors">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <h4 className="text-xs font-bold text-slate-900 tracking-tight">{title}</h4>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeInfo.bg}`}>
                {badgeInfo.label}
              </span>
              <span className={`text-[10px] uppercase tracking-wider ${getImpactBadge()}`}>
                Impact: {impact}
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {observation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
