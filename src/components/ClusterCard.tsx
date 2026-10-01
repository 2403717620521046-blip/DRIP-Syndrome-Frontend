import React from 'react';
import { Users, CheckCircle, AlertTriangle, Layers, Tag } from 'lucide-react';
import { ClusterCharacteristic } from '../types';

interface ClusterCardProps {
  cluster: ClusterCharacteristic;
  color?: string;
}

export const ClusterCard: React.FC<ClusterCardProps> = ({ cluster, color = "#1d4ed8" }) => {
  const getRiskBadge = () => {
    switch (cluster.riskLevel) {
      case 'Prime':
      case 'Low Risk':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Medium Risk':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'High Risk':
      case 'Subprime':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
      <div>
        {/* Top header with ID & badge */}
        <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: color }}
              ></span>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Cluster {cluster.id}: {cluster.name}
              </h3>
            </div>
            {cluster.riskLevel && (
              <span className={`inline-block mt-1.5 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${getRiskBadge()}`}>
                {cluster.riskLevel}
              </span>
            )}
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-mono font-bold text-slate-800">
              {cluster.count.toLocaleString()} records
            </span>
            <span className="block text-[11px] text-slate-500 font-mono">
              ({cluster.percentage}%)
            </span>
          </div>
        </div>

        {/* Narrative profile */}
        <p className="text-xs text-slate-600 mt-3 leading-relaxed">
          {cluster.profile}
        </p>

        {/* Centroid Characteristics */}
        {cluster.centroidValues && Object.keys(cluster.centroidValues).length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Centroid Means / Coordinates
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(cluster.centroidValues).map(([key, val]) => (
                <div key={key} className="bg-slate-50 p-2 rounded-lg border border-slate-200/70">
                  <span className="text-[10px] text-slate-400 block truncate">{key}</span>
                  <span className="font-semibold text-slate-800 font-mono text-xs">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dominant Attributes */}
        {cluster.dominantAttributes && cluster.dominantAttributes.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-slate-100">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Distinctive Features
            </h4>
            <ul className="space-y-1">
              {cluster.dominantAttributes.map((attr, idx) => (
                <li key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                  <Tag className="w-3 h-3 text-blue-500 shrink-0" />
                  <span className="truncate">{attr}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Segment Classification</span>
        <span className="font-mono text-blue-600 font-medium">K-Means Cluster #{cluster.id}</span>
      </div>
    </div>
  );
};

export default ClusterCard;
