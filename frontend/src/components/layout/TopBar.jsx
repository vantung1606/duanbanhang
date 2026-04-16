import { 
  Search, 
  Moon, 
  Sun, 
  Bell, 
  Calendar,
  Menu
} from 'lucide-react';
import { useState, useEffect } from 'react';

const TopBar = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="flex items-center justify-between h-20 px-8 bg-white/50 dark:bg-black/10 backdrop-blur-xl rounded-[2.5rem] shadow-neumo-sm dark:shadow-neumo-dark-sm border border-white/20">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="text-gray-400 group-focus-within:text-primary-light transition-colors" size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search everything..."
            className="w-full h-12 pl-12 pr-6 bg-background-light dark:bg-background-dark shadow-neumo-inner dark:shadow-neumo-dark-inner border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary-light/20 outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-8">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="w-11 h-11 flex items-center justify-center rounded-2xl bg-background-light dark:bg-background-dark shadow-neumo-sm dark:shadow-neumo-dark-sm hover:text-primary-light transition-all active:scale-95"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="relative w-11 h-11 flex items-center justify-center rounded-2xl bg-background-light dark:bg-background-dark shadow-neumo-sm dark:shadow-neumo-dark-sm hover:text-primary-light transition-all active:scale-95">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-4 h-4 bg-rose-500 rounded-full text-[10px] text-white flex items-center justify-center border-2 border-background-light dark:border-background-dark">3</span>
        </button>

        <button className="w-11 h-11 flex items-center justify-center rounded-2xl bg-background-light dark:bg-background-dark shadow-neumo-sm dark:shadow-neumo-dark-sm hover:text-primary-light transition-all active:scale-95">
          <Calendar size={20} />
        </button>

        <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-800 mx-2"></div>

        <button className="w-11 h-11 flex items-center justify-center rounded-2xl bg-background-light dark:bg-background-dark shadow-neumo-sm dark:shadow-neumo-dark-sm border-2 border-white/50 p-[2px] transition-all active:scale-90 overflow-hidden">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
            alt="Avatar" 
            className="w-full h-full rounded-xl bg-white"
          />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
