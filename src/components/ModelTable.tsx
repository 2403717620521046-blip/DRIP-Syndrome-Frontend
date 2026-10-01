import React from 'react';
import { Award, Clock, CheckCircle2 } from 'lucide-react';
import { ModelMetric, RegressionMetric } from '../types';

interface ModelTableProps {
  classificationModels?: ModelMetric[];
  regressionModels?: RegressionMetric[];
  activeType: 'classification' | 'regression';
  selectedModelName?: string;
  evaluationSummary?: string;
}

export const ModelTable: React.FC<ModelTableProps> = ({
  classificationModels = [],
  regressionModels = [],
  activeType,
  selectedModelName,
  evaluationSummary
}) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-xl shadow-card overflow-hidden">
      {evaluationSummary && (
        <div className="p-4 bg-slate-50 border-b border-slate-200/80 text-xs text-slate-600 flex items-start gap-2.5">
          <Award className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-800">Cross-Validation Protocol: </strong>
            {evaluationSummary}
          </p>
        </div>
      )}

      <div className="overflow-x-auto">
        {activeType === 'classification' ? (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 uppercase font-semibold tracking-wider">
                <th className="py-3 px-4">Algorithm</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Precision</th>
                <th className="py-3 px-4">Recall</th>
                <th className="py-3 px-4">F1 Score</th>
                <th className="py-3 px-4">Training Time</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classificationModels.map((m, idx) => {
                const isSelected = m.isBest || m.algorithm === selectedModelName;
                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isSelected
                        ? 'bg-blue-50/40 font-medium'
                        : 'hover:bg-slate-50/70 even:bg-slate-50/30'
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                      {isSelected && (
                        <Award className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                      <span>{m.algorithm}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {(m.accuracy * 100).toFixed(2)}%
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {(m.precision * 100).toFixed(2)}%
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {(m.recall * 100).toFixed(2)}%
                    </td>
                    <td className="py-3 px-4 font-mono text-blue-700 font-semibold">
                      {(m.f1Score * 100).toFixed(2)}%
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {m.trainingTimeSec.toFixed(2)}s
                    </td>
                    <td className="py-3 px-4 text-center">
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                          <CheckCircle2 className="w-3 h-3" />
                          {m.metricBasis || "Backend Selected"}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Evaluated</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 uppercase font-semibold tracking-wider">
                <th className="py-3 px-4">Algorithm</th>
                <th className="py-3 px-4">MAE</th>
                <th className="py-3 px-4">MSE</th>
                <th className="py-3 px-4">RMSE</th>
                <th className="py-3 px-4">R² Score</th>
                <th className="py-3 px-4">Training Time</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {regressionModels.map((m, idx) => {
                const isSelected = m.isBest || m.algorithm === selectedModelName;
                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isSelected
                        ? 'bg-blue-50/40 font-medium'
                        : 'hover:bg-slate-50/70 even:bg-slate-50/30'
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                      {isSelected && (
                        <Award className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                      <span>{m.algorithm}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {m.mae.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {m.mse.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {m.rmse.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 font-mono text-blue-700 font-semibold">
                      {m.r2Score.toFixed(3)}
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {m.trainingTimeSec.toFixed(2)}s
                    </td>
                    <td className="py-3 px-4 text-center">
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Backend Selected
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Evaluated</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ModelTable;
