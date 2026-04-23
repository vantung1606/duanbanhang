import { Search, Bell, Settings, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../../lib/utils';

export default function StaffTopBar({ onMenuClick }) {
  return (
    <header className="h-24 lg:h-32 flex items-center justify-between px-4 lg:px-10 relative z-30 pointer-events-none">
      
      {/* Search Bar / Left Side */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <button 
          onClick={onMenuClick}
          className="lg:hidden w-12 h-12 rounded-2xl bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] active:scale-95 transition-all"
        >
          <Menu className="w-5 h-5 text-slate-700" />
        </button>
        
        <div className="hidden md:block relative group w-64 lg:w-80">
          <input 
            type="text" 
            placeholder="Tìm kiếm đơn hàng..." 
            className="w-full bg-white/60 backdrop-blur-md px-12 py-3 lg:py-4 rounded-[2rem] border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] focus:outline-none focus:ring-2 focus:ring-slate-400/30 transition-all font-semibold text-slate-700 text-sm placeholder:text-slate-400"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-slate-600 transition-colors w-4 h-4 lg:w-5 lg:h-5" />
        </div>
      </div>

      {/* Center Tabs */}
      <div className="hidden xl:flex items-center gap-8 pointer-events-auto ml-10">
        {[
          { label: 'Tổng Quan', path: '/staff' },
          { label: 'Phân Tích', path: '/staff/analytics' },
          { label: 'Báo Cáo', path: '/staff/reports' }
        ].map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.path === '/staff'}
            className={({ isActive }) => cn(
              "text-xs tracking-widest uppercase cursor-pointer transition-all",
              isActive 
                ? "font-black text-[#2b3a55] border-b-2 border-[#2b3a55] pb-1" 
                : "font-bold text-slate-400 hover:text-slate-600 pb-1"
            )}
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-3 lg:gap-4 pointer-events-auto">
        <button className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-[1.2rem] flex items-center justify-center hover:bg-white/40 transition-all group">
          <Bell className="w-4 h-4 lg:w-5 lg:h-5 text-slate-600 group-hover:scale-110 transition-transform" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-slate-800 rounded-full"></span>
        </button>
        
        <button className="w-10 h-10 lg:w-12 lg:h-12 rounded-[1.2rem] flex items-center justify-center hover:bg-white/40 transition-all group">
          <Settings className="w-4 h-4 lg:w-5 lg:h-5 text-slate-600 group-hover:rotate-45 transition-transform duration-500" />
        </button>
        
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-[1.2rem] bg-white p-[2px] shadow-sm ml-2 cursor-pointer hover:scale-105 transition-transform">
          <div className="w-full h-full rounded-[1rem] overflow-hidden bg-slate-100 flex items-center justify-center">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Staff" alt="User" className="w-full h-full" />
          </div>
        </div>
      </div>
      
    </header>
  );
}
