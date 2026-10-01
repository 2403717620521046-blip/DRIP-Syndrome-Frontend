import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Database,
  BarChart2,
  Cpu,
  GitCompare,
  Network,
  Share2,
  Info,
  Home,
  X,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Dataset Explorer', path: '/dataset', icon: Database },
  { name: 'Data Analysis (EDA)', path: '/eda', icon: BarChart2 },
  { name: 'ML Predictions', path: '/predictions', icon: Cpu },
  { name: 'Model Comparison', path: '/models', icon: GitCompare },
  { name: 'Clustering', path: '/clustering', icon: Network },
  { name: 'Association Rules', path: '/association-rules', icon: Share2 },
  { name: 'About Project', path: '/about', icon: Info },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Aside */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-100 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              W
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white block">
                Wealth Resource
              </span>
              <span className="text-[10px] text-slate-400 block -mt-0.5">
                Financial Intelligence
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 py-5 px-3 space-y-1 overflow-y-auto">
          {/* Quick link to Home / Landing */}
          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              }`
            }
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>Landing / Home</span>
          </NavLink>

          <div className="pt-3 pb-1.5 px-3 text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Analytics & Models
          </div>

          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Project Banner */}
        <div className="p-4 border-t border-slate-800 m-3 rounded-xl bg-slate-800/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Academic Platform</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            Financial Intelligence & Machine Learning Pipeline
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
            <span>Status: Production</span>
            <span className="font-mono text-emerald-400 font-semibold">Active</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
