import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: string;
  badgeType?: 'neutral' | 'success' | 'warning' | 'info';
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    label: string;
  };
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  badge,
  badgeType = 'neutral',
  icon: Icon,
  iconBg = 'bg-blue-50',
  iconColor = 'text-blue-600',
  trend
}) => {
  const getBadgeClass = () => {
    switch (badgeType) {
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'info':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </span>
          <div className="mt-2 text-2xl font-bold text-slate-900 tracking-tight">
            {value}
          </div>
        </div>
        <div className={`w-11 h-11 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-xs`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtitle || badge || trend) && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {subtitle && (
            <span className="text-slate-500 truncate max-w-[190px]" title={subtitle}>
              {subtitle}
            </span>
          )}
          {badge && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${getBadgeClass()}`}>
              {badge}
            </span>
          )}
          {trend && (
            <span className="text-slate-500 flex items-center gap-1">
              <span className={trend.direction === 'up' ? 'text-emerald-600' : 'text-slate-600'}>
                {trend.label}
              </span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default KpiCard;
