import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Package, 
  Settings, 
  ChevronRight,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuthStore } from '../../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const getMenuItems = (t) => [
  { icon: LayoutDashboard, label: t('admin.sidebar.dashboard'), path: '/admin' },
  { icon: BarChart3, label: t('admin.sidebar.analytics'), path: '/admin/analytics' },
  { icon: Users, label: t('admin.sidebar.customers'), path: '/admin/customers' },
  { icon: Package, label: t('admin.sidebar.products'), path: '/admin/products' },
  { icon: Settings, label: t('admin.sidebar.settings'), path: '/admin/settings' },
];

export default function AdminSidebar() {
  const { t } = useTranslation();
  const menuItems = getMenuItems(t);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/shop');
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <aside className="w-80 h-screen fixed left-0 top-0 z-40 p-6 flex flex-col transition-all duration-300">
      {/* Glassmorphic Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-3d-soft flex flex-col overflow-hidden"
      >
        
        {/* Logo Section */}
        <div className="p-8 pb-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 mb-2"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center shadow-lg shadow-primary-light/30">
              <ShieldCheck className="text-white w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">Admin</h2>
              <p className="text-xs font-semibold text-primary-light uppercase tracking-widest opacity-80">TechChain System</p>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.nav 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 px-4 py-6 space-y-3 overflow-y-auto custom-scrollbar"
        >
          {menuItems.map((item) => (
            <motion.div key={item.path} variants={itemVariants}>
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) => cn(
                  "flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden whitespace-nowrap",
                  isActive 
                    ? "text-white" 
                    : "text-slate-500 hover:bg-white/80 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white"
                )}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div 
                        layoutId="sidebar-active"
                        className="absolute inset-0 bg-gradient-to-r from-primary-light to-indigo-500 shadow-lg shadow-primary-light/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <div className="flex items-center gap-4 relative z-10">
                      <item.icon className={cn("w-5 h-5", "group-hover:scale-110 transition-transform")} />
                      <span className="font-bold tracking-wide whitespace-nowrap">{item.label}</span>
                    </div>
                    <ChevronRight className={cn("w-4 h-4 opacity-0 group-hover:opacity-100 transition-all relative z-10")} />
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </motion.nav>

        {/* Profile/Footer */}
        <div className="p-6 mt-auto border-t border-slate-200 dark:border-white/10">
          <div className="bg-white/30 dark:bg-black/20 p-4 rounded-3xl flex items-center gap-4 border border-slate-200 dark:border-white/20">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
              alt="Admin Avatar" 
              className="w-11 h-11 rounded-2xl shadow-sm border-2 border-primary-light/30"
            />
            <div className="flex-1 min-w-0 whitespace-nowrap">
              <p className="font-bold text-sm text-slate-800 dark:text-white truncate">{t('admin.sidebar.admin_root')}</p>
              <p className="text-[10px] font-black uppercase text-primary-light tracking-tighter truncate">{t('admin.sidebar.system_power')}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-red-500/10 rounded-xl transition-colors group"
              title={t('admin.sidebar.logout')}
            >
              <LogOut className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </aside>
  );
}

