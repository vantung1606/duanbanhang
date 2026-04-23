import { Search, Bell, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { cn } from '../../../lib/utils';

export default function AdminTopBar({ onMenuClick }) {
  return (
    <header className="h-[4.5rem] bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 flex items-center justify-between px-6 relative z-30 sticky top-6">
      
      {/* Left Navigation */}
      <div className="flex items-center gap-4 lg:gap-8">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-black text-slate-800 tracking-tight lg:ml-2">Aether<span className="font-medium text-slate-500 hidden sm:inline">Dash</span></h1>
        
        <nav className="hidden lg:flex items-center gap-6 border-l border-slate-200 pl-6 h-8">
          {['Overview', 'Analytics', 'Reports', 'Settings'].map((item) => (
            <NavLink
              key={item}
              to={item === 'Overview' ? '/admin' : `/admin/${item.toLowerCase()}`}
              end={item === 'Overview'}
              className={({ isActive }) => cn(
                "text-sm font-bold transition-all relative",
                isActive ? "text-slate-800" : "text-slate-400 hover:text-slate-600"
              )}
            >
              {({ isActive }) => (
                <>
                  {item}
                  {isActive && (
                    <motion.div layoutId="topbar-active" className="absolute -bottom-[1.15rem] left-0 right-0 h-[2px] bg-slate-800" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        
        <div className="relative group w-48 lg:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search..."
            className="w-full bg-slate-50/80 hover:bg-slate-100 focus:bg-slate-100 border-none px-10 py-2.5 rounded-full text-sm font-bold text-slate-700 placeholder:text-slate-400 transition-all outline-none"
          />
        </div>

        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-600 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-slate-800 rounded-full border border-white" />
        </button>

        <div className="w-px h-6 bg-slate-200 mx-1" />

        <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden cursor-pointer border border-slate-200">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Adrian" alt="Adrian" className="w-full h-full object-cover" />
        </div>
      </div>

    </header>
  );
}

