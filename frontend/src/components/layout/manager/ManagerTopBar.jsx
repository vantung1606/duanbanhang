import { Search, Bell, Sun, Moon, Calendar, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ManagerTopBar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <header className="h-28 flex items-center justify-between px-10 relative z-30 pointer-events-none">
      <div className="flex-1 max-w-2xl pointer-events-auto">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search performance data, reports, or categories..." 
            className="w-full bg-slate-200/50 dark:bg-black/20 backdrop-blur-md px-14 py-4 rounded-3xl border border-white/20 dark:border-white/5 shadow-neumo-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all font-medium text-slate-700 dark:text-gray-200"
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-500 transition-colors w-5 h-5" />
        </div>
      </div>

      <div className="flex items-center gap-4 pointer-events-auto">
        <button className="w-12 h-12 rounded-2xl bg-background-light/40 dark:bg-background-dark/40 backdrop-blur-md flex items-center justify-center border border-white/20 dark:border-white/5 shadow-neumo-sm hover:scale-105 active:scale-95 transition-all group">
          <Info className="w-5 h-5 text-slate-500 group-hover:text-indigo-500 transition-colors" />
        </button>
        <button 
          onClick={toggleTheme}
          className="w-12 h-12 rounded-2xl bg-background-light/40 dark:bg-background-dark/40 backdrop-blur-md flex items-center justify-center border border-white/20 dark:border-white/5 shadow-neumo-sm hover:scale-105 active:scale-95 transition-all group"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
          )}
        </button>
        <div className="relative">
          <button className="w-12 h-12 rounded-2xl bg-background-light/40 dark:bg-background-dark/40 backdrop-blur-md flex items-center justify-center border border-white/20 dark:border-white/5 shadow-neumo-sm hover:scale-105 active:scale-95 transition-all group">
            <Bell className="w-5 h-5 text-slate-500 group-hover:text-indigo-500 transition-colors" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 text-[10px] font-black text-white rounded-full flex items-center justify-center border-2 border-background-light shadow-sm">
              3
            </span>
          </button>
        </div>
        <div className="w-px h-8 bg-slate-300 dark:bg-slate-700 mx-2 shadow-sm" />
        <div className="flex items-center gap-3 pl-2">
          <div className="w-11 h-11 rounded-2xl bg-indigo-500 p-[2px] shadow-neumo-sm transform hover:-rotate-6 transition-transform cursor-pointer">
            <div className="w-full h-full rounded-[0.9rem] bg-white overflow-hidden p-1">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Manager" alt="User" className="w-full h-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
