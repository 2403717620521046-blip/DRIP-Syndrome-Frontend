import React from 'react';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Cpu,
  Clock,
  Sparkles,
  BarChart3,
  ShieldCheck,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { PredictionResponse } from '../types';

interface PredictionResultProps {
  result: PredictionResponse;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({ result }) => {
  const confidencePercent = Math.round(result.confidence * 100);

  const getStatusTheme = () => {
    const text = String(result.prediction).toLowerCase();
    if (text.includes('low') || text.includes('approved') || text.includes('grade a')) {
      return {
        bg: 'bg-emerald-50/70 border-emerald-200',
        badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
        progressColor: 'bg-emerald-600',
        label: 'Low Risk / Favorable'
      };
    }
    if (text.includes('moderate') || text.includes('conditional') || text.includes('grade b')) {
      return {
        bg: 'bg-amber-50/70 border-amber-200',
        badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
        icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
        progressColor: 'bg-amber-500',
        label: 'Moderate Risk'
      };
    }
    return {
      bg: 'bg-rose-50/70 border-rose-200',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
      icon: <XCircle className="w-6 h-6 text-rose-600" />,
      progressColor: 'bg-rose-600',
      label: 'High Risk / Default'
    };
  };

  const theme = getStatusTheme();

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl shadow-card overflow-hidden">
      {/* Top Banner */}
      <div className={`p-5 border-b ${theme.bg} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
        <div className="flex items-center gap-3.5">
          <div className="p-2 bg-white rounded-lg shadow-xs border border-slate-200">
            {theme.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
                Model Classification Outcome
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${theme.badgeBg}`}>
                {result.predictionLabel || theme.label}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              {String(result.prediction)}
            </h2>
          </div>
        </div>

        {/* Model & Timestamp */}
        <div className="flex flex-col sm:items-end text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>Model: {result.modelUsed}</span>
          </div>
          {result.timestamp && (
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
              <Clock className="w-3 h-3" />
              <span>{new Date(result.timestamp).toLocaleTimeString()}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Confidence Meter & Probabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Confidence Score */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700">
                Inference Confidence
              </span>
              <span className="text-sm font-bold text-slate-900 font-mono">
                {confidencePercent}%
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${theme.progressColor}`}
                style={{ width: `${confidencePercent}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Empirical decision confidence computed via normalized soft probabilities.
            </p>
          </div>

          {/* Probabilities Distribution */}
          {result.probabilities && (
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
              <span className="text-xs font-semibold text-slate-700 block mb-2">
                Class Probability Distribution
              </span>
              <div className="space-y-1.5">
                {Object.entries(result.probabilities).map(([cls, prob]) => {
                  const pct = Math.round(Number(prob) * 100);
                  return (
                    <div key={cls} className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 truncate max-w-[150px]">{cls}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full"
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                        <span className="font-mono text-slate-800 w-9 text-right font-medium">
                          {pct}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Recommendation if provided */}
        {result.recommendation && (
          <div className="p-3.5 bg-blue-50/60 border border-blue-200/80 rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-blue-900">Decision Support Recommendation</h4>
              <p className="text-xs text-blue-800 mt-0.5">{result.recommendation}</p>
            </div>
          </div>
        )}

        {/* Prediction Explanation / Feature Importance */}
        {result.explanation && result.explanation.length > 0 && (
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-slate-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Prediction Explanation (Feature Attribution)
                </h4>
              </div>
              <span className="text-[11px] text-slate-400">
                SHAP / Permutation Importance
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.explanation.map((item, i) => {
                const isPositive = item.effect === 'positive' || item.importance >= 0;
                return (
                  <div
                    key={i}
                    className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between shadow-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                          isPositive
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-rose-50 text-rose-600'
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="w-3.5 h-3.5" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-800">
                          {item.feature}
                        </div>
                        {item.value !== undefined && (
                          <div className="text-[11px] text-slate-500 font-mono">
                            Value: {item.value}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-xs font-bold font-mono ${
                          isPositive ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {item.importance > 0 ? `+${item.importance}` : item.importance}%
                      </span>
                      <span className="block text-[10px] text-slate-400">
                        {isPositive ? 'Favorable Impact' : 'Risk Multiplier'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionResult;
