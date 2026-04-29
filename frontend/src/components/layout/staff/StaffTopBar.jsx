import { Search, Bell, Settings, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { motion } from 'framer-motion';

export default function StaffTopBar({ onMenuClick }) {
  return (
    <header className="h-[4.5rem] bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/40 flex items-center justify-between px-8 relative z-30 sticky top-0 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
      
      {/* Left: Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="relative group w-full">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Tìm kiếm đơn hàng..."
            className="w-full bg-white/60 hover:bg-white focus:bg-white border-none px-6 py-3 rounded-2xl text-xs font-bold text-slate-700 placeholder:text-slate-400 tracking-wide transition-all outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Center: Tabs */}
      <nav className="hidden lg:flex items-center gap-10 mx-10">
        {[
          { label: 'TỔNG QUAN', path: '/staff' },
          { label: 'PHÂN TÍCH', path: '/staff/analytics' },
          { label: 'BÁO CÁO', path: '/staff/reports' }
        ].map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.path === '/staff'}
            className={({ isActive }) => cn(
              "text-[10px] font-black tracking-[0.2em] transition-all relative py-2",
              isActive ? "text-emerald-700" : "text-slate-400 hover:text-slate-600"
            )}
          >
            {({ isActive }) => (
              <>
                {tab.label}
                {isActive && (
                  <motion.div layoutId="staff-topbar-active" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-emerald-600 rounded-full shadow-sm" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Right: Icons & Profile */}
      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-slate-900 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-600 rounded-full border-2 border-white" />
        </button>
        
        <button className="text-slate-400 hover:text-slate-900 transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        <div className="w-10 h-10 rounded-2xl bg-white shadow-sm overflow-hidden cursor-pointer border border-white hover:scale-105 transition-transform">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Staff" alt="Staff" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}
