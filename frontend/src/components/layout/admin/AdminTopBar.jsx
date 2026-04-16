import { Search, Bell, Sun, Moon, Calendar, Settings, Languages } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function AdminTopBar() {
  const { t, i18n } = useTranslation();
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

  const toggleLanguage = () => {
    const newLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="h-28 flex items-center justify-between px-10 relative z-30">
      <div className="flex-1 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group"
        >
          <input 
            type="text" 
            placeholder={t('admin.topbar.search_placeholder')}
            className="w-full bg-white/70 dark:bg-black/20 backdrop-blur-3xl px-14 py-4 rounded-3xl border border-slate-200 dark:border-white/5 shadow-3d-soft focus:outline-none focus:ring-2 focus:ring-primary-light/30 transition-all font-medium text-slate-700 dark:text-gray-200 placeholder:text-slate-400"
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary-light transition-colors w-5 h-5" />
        </motion.div>
      </div>

      <div className="flex items-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-2xl bg-white/70 dark:bg-black/20 backdrop-blur-xl flex items-center justify-center border border-slate-200 dark:border-white/5 shadow-3d-soft hover:shadow-primary-light/10 transition-all group"
        >
          <Calendar className="w-5 h-5 text-slate-500 group-hover:text-primary-light transition-colors" />
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleTheme(); }}
          type="button"
          className="w-12 h-12 rounded-2xl bg-white/70 dark:bg-black/20 backdrop-blur-xl flex items-center justify-center border border-slate-200 dark:border-white/5 shadow-3d-soft transition-all group overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="sun"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="w-5 h-5 text-amber-400" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="w-5 h-5 text-indigo-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Language Toggle */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleLanguage}
          className="px-4 h-12 rounded-2xl bg-white/70 dark:bg-black/20 backdrop-blur-xl flex items-center gap-2 border border-slate-200 dark:border-white/5 shadow-3d-soft hover:shadow-primary-light/10 transition-all group"
        >
          <Languages className="w-4 h-4 text-slate-500 group-hover:text-primary-light transition-colors" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-gray-200 whitespace-nowrap">
            {i18n.language === 'vi' ? 'VI' : 'EN'}
          </span>
        </motion.button>

        <div className="relative">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-2xl bg-white/70 dark:bg-black/20 backdrop-blur-xl flex items-center justify-center border border-slate-200 dark:border-white/5 shadow-3d-soft transition-all group"
          >
            <Bell className="w-5 h-5 text-slate-500 group-hover:text-primary-light transition-colors" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-[10px] font-black text-white rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm animate-pulse">
              9+
            </span>
          </motion.button>
        </div>

        <div className="w-px h-8 bg-slate-300 dark:bg-slate-700 mx-2" />
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 pl-2"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-light to-primary-dark p-[2px] shadow-lg shadow-primary-light/20 cursor-pointer">
            <div className="w-full h-full rounded-[0.9rem] bg-white dark:bg-slate-900 overflow-hidden p-1">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User" className="w-full h-full rounded-lg" />
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

