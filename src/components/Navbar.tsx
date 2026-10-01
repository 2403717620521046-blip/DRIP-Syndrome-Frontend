import React, { useState, useEffect } from 'react';
import {
  Bell,
  Search,
  Activity,
  Cpu,
  Layers,
  ChevronDown,
  ToggleLeft,
  ToggleRight,
  Database,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Menu
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { isDemoMode, setDemoMode, api } from '../services/api';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [demoActive, setDemoActive] = useState<boolean>(isDemoMode());
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Check health periodically
  useEffect(() => {
    let isMounted = true;
    const check = async () => {
      if (isDemoMode()) {
        if (isMounted) setBackendOnline(true);
        return;
      }
      try {
        const ok = await api.checkHealth();
        if (isMounted) setBackendOnline(ok);
      } catch {
        if (isMounted) setBackendOnline(false);
      }
    };

    check();
    const interval = setInterval(check, 20000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [demoActive]);

  const handleToggleDemoMode = () => {
    const next = !demoActive;
    setDemoActive(next);
    setDemoMode(next);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('data') || q.includes('explor') || q.includes('table')) {
      navigate('/dataset');
    } else if (q.includes('eda') || q.includes('stat') || q.includes('correl') || q.includes('dist')) {
      navigate('/eda');
    } else if (q.includes('predict') || q.includes('infer')) {
      navigate('/predictions');
    } else if (q.includes('model') || q.includes('compar') || q.includes('f1') || q.includes('bench')) {
      navigate('/models');
    } else if (q.includes('cluster') || q.includes('segment') || q.includes('k-means')) {
      navigate('/clustering');
    } else if (q.includes('rule') || q.includes('assoc') || q.includes('basket')) {
      navigate('/association-rules');
    } else if (q.includes('about') || q.includes('doc')) {
      navigate('/about');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200/90 h-16 flex items-center justify-between px-4 sm:px-6">
      {/* Left Branding & Mobile Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            W
          </div>
          <div>
            <span className="text-sm font-bold text-slate-900 tracking-tight block">
              Wealth Resource
            </span>
            <span className="text-[10px] text-slate-500 hidden sm:block -mt-0.5">
              Financial Intelligence System
            </span>
          </div>
        </Link>
      </div>

      {/* Middle: Quick Search */}
      <form
        onSubmit={handleSearchSubmit}
        className="hidden md:flex items-center relative max-w-xs w-full mx-4"
      >
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search models, features, rules..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs text-slate-800 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
        />
      </form>

      {/* Right Controls: Mode Toggle, Notifications & System Status */}
      <div className="flex items-center gap-3">
        {/* Live Backend vs Demo Mode Toggle */}
        <button
          onClick={handleToggleDemoMode}
          title={demoActive ? "Click to switch to Live Backend mode" : "Click to switch to interactive Demo Mode"}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
            demoActive
              ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">
            {demoActive ? 'Demo Mode' : 'Live Backend'}
          </span>
          {demoActive ? (
            <ToggleRight className="w-4 h-4 text-amber-600" />
          ) : (
            <ToggleLeft className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {/* Backend Online Status Indicator */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono border bg-slate-50 border-slate-200"
          title={
            demoActive
              ? "Running in simulation mode with full credit risk portfolio dataset"
              : backendOnline === true
              ? "Connected to Python ML Backend (localhost:5000)"
              : "Backend disconnected. Start Flask/FastAPI backend or switch to Demo Mode."
          }
        >
          <span
            className={`w-2 h-2 rounded-full ${
              demoActive
                ? 'bg-blue-500 animate-pulse'
                : backendOnline === true
                ? 'bg-emerald-500'
                : 'bg-rose-500'
            }`}
          ></span>
          <span className="text-slate-600">
            {demoActive ? 'Demo Feed' : backendOnline === true ? 'ML API: Live' : 'ML API: Offline'}
          </span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-lg z-50 p-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-semibold text-slate-800">
                <span>System Notifications</span>
                <span className="text-[10px] text-blue-600">2 New</span>
              </div>
              <div className="mt-2 space-y-2">
                <div className="p-2 bg-blue-50/50 rounded-lg border border-blue-100">
                  <p className="font-semibold text-blue-900 text-[11px]">XGBoost Benchmark</p>
                  <p className="text-[11px] text-blue-700 mt-0.5">
                    Evaluated 5-fold CV with 94.8% accuracy on credit risk portfolio.
                  </p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-semibold text-slate-800 text-[11px]">Dataset Ready</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    25,000 observations indexed across 12 analytical features.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile / ML System Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
            ML
          </div>
          <div className="hidden lg:block text-left text-xs">
            <span className="font-semibold text-slate-800 block leading-tight">
              ML System
            </span>
            <span className="text-[10px] text-slate-400">v1.0.0 Prod</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
