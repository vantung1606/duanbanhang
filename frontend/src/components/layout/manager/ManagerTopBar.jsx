import { Search, Bell, Sun, Moon, Info, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function ManagerTopBar({ onMenuClick }) {
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
    <header className="h-[4.5rem] bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/40 flex items-center justify-between px-8 relative z-30 sticky top-0 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
      
      {/* Left: Hamburger & Tabs */}
      <div className="flex items-center gap-8">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <nav className="hidden lg:flex items-center gap-8">
          {['Executive Overview', 'Reports', 'History', 'Activity'].map((item) => (
            <button
              key={item}
              className={cn(
                "text-xs font-bold transition-all relative py-2",
                item === 'Reports' ? "text-slate-900 border-b-2 border-slate-900" : "text-slate-400 hover:text-slate-600"
              )}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Right: Search & Icons */}
      <div className="flex items-center gap-6">
        <div className="relative group w-48 lg:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search..."
            className="w-full bg-white/60 hover:bg-white focus:bg-white border-none px-10 py-2.5 rounded-full text-xs font-bold text-slate-700 placeholder:text-slate-400 transition-all outline-none shadow-sm"
          />
        </div>

        <button className="text-slate-400 hover:text-slate-900 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-slate-900 rounded-full border-2 border-white" />
        </button>
        
        <button 
          onClick={toggleTheme}
          className="text-slate-400 hover:text-slate-900 transition-colors"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="w-10 h-10 rounded-2xl bg-white shadow-sm overflow-hidden cursor-pointer border border-white hover:scale-105 transition-transform">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Manager" alt="Manager" className="w-full h-full object-cover" />
        </div>
      </div>

    </header>
  );
}
