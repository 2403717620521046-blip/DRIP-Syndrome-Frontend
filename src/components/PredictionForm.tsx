import React, { useState, useEffect } from 'react';
import { Send, RotateCcw, Cpu, HelpCircle, AlertCircle } from 'lucide-react';
import { FeatureFieldSchema } from '../types';

interface PredictionFormProps {
  features: FeatureFieldSchema[];
  availableModels?: string[];
  defaultModel?: string;
  onSubmit: (features: Record<string, any>, modelName: string) => void;
  loading?: boolean;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({
  features,
  availableModels = [],
  defaultModel = '',
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [selectedModel, setSelectedModel] = useState<string>(
    defaultModel || (availableModels.length > 0 ? availableModels[0] : '')
  );
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Initialize form values from schema defaults
  useEffect(() => {
    const initial: Record<string, any> = {};
    features.forEach(f => {
      if (f.default !== undefined) {
        initial[f.name] = f.default;
      } else if (f.type === 'numeric') {
        initial[f.name] = f.min !== undefined ? f.min : 0;
      } else if (f.type === 'categorical') {
        initial[f.name] = f.options && f.options.length > 0 ? f.options[0] : '';
      } else if (f.type === 'boolean') {
        initial[f.name] = false;
      }
    });
    setFormData(initial);
  }, [features]);

  useEffect(() => {
    if (defaultModel) {
      setSelectedModel(defaultModel);
    } else if (availableModels.length > 0 && !selectedModel) {
      setSelectedModel(availableModels[0]);
    }
  }, [defaultModel, availableModels]);

  const handleChange = (name: string, value: any, type: string) => {
    let parsedValue = value;
    if (type === 'numeric') {
      parsedValue = value === '' ? '' : Number(value);
    } else if (type === 'boolean') {
      parsedValue = Boolean(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: parsedValue,
    }));

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleReset = () => {
    const initial: Record<string, any> = {};
    features.forEach(f => {
      initial[f.name] = f.default ?? (f.type === 'numeric' ? (f.min ?? 0) : '');
    });
    setFormData(initial);
    setFormErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const errors: Record<string, string> = {};
    features.forEach(f => {
      const val = formData[f.name];
      if (val === undefined || val === '') {
        errors[f.name] = `${f.label || f.name} is required.`;
      } else if (f.type === 'numeric') {
        const num = Number(val);
        if (isNaN(num)) {
          errors[f.name] = 'Must be a valid number.';
        } else if (f.min !== undefined && num < f.min) {
          errors[f.name] = `Minimum value is ${f.min}.`;
        } else if (f.max !== undefined && num > f.max) {
          errors[f.name] = `Maximum value is ${f.max}.`;
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    onSubmit(formData, selectedModel);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Model Selection Bar */}
      {availableModels.length > 0 && (
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-900 block">
                Target Inference Model
              </span>
              <span className="text-[11px] text-slate-500">
                Select the trained estimator for inference execution
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedModel}
              onChange={e => setSelectedModel(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 shadow-xs"
            >
              {availableModels.map(m => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Dynamic Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map(f => {
          const hasError = !!formErrors[f.name];
          return (
            <div
              key={f.name}
              className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-subtle hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor={`field-${f.name}`}
                  className="text-xs font-semibold text-slate-800 flex items-center gap-1.5"
                >
                  <span>{f.label || f.name}</span>
                  {f.unit && (
                    <span className="text-[10px] font-normal text-slate-400">
                      ({f.unit})
                    </span>
                  )}
                </label>
                {f.type === 'numeric' && f.min !== undefined && f.max !== undefined && (
                  <span className="text-[10px] text-slate-400 font-mono">
                    Range: [{f.min} - {f.max}]
                  </span>
                )}
              </div>

              {/* Input Render according to type */}
              {f.type === 'categorical' ? (
                <select
                  id={`field-${f.name}`}
                  value={formData[f.name] ?? ''}
                  onChange={e => handleChange(f.name, e.target.value, f.type)}
                  className={`w-full bg-slate-50 border rounded-lg px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none transition-colors ${
                    hasError
                      ? 'border-rose-300 bg-rose-50/30'
                      : 'border-slate-200 focus:border-blue-500'
                  }`}
                >
                  {f.options?.map(opt => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : f.type === 'boolean' ? (
                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(formData[f.name])}
                    onChange={e => handleChange(f.name, e.target.checked, f.type)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="text-xs text-slate-600">Enabled</span>
                </label>
              ) : (
                <div className="relative">
                  <input
                    id={`field-${f.name}`}
                    type="number"
                    min={f.min}
                    max={f.max}
                    step={f.step || (f.max && f.max <= 1 ? 0.01 : 1)}
                    value={formData[f.name] ?? ''}
                    onChange={e => handleChange(f.name, e.target.value, f.type)}
                    className={`w-full bg-slate-50 border rounded-lg px-3 py-2 text-xs font-mono text-slate-800 focus:bg-white focus:outline-none transition-colors ${
                      hasError
                        ? 'border-rose-300 bg-rose-50/30'
                        : 'border-slate-200 focus:border-blue-500'
                    }`}
                    placeholder={`Enter ${f.label || f.name}`}
                  />
                </div>
              )}

              {/* Description or error */}
              {hasError ? (
                <p className="text-[11px] text-rose-600 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  {formErrors[f.name]}
                </p>
              ) : f.description ? (
                <p className="text-[11px] text-slate-400 mt-1.5">{f.description}</p>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Form
        </button>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
              <span>Evaluating Model...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Predict</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PredictionForm;
