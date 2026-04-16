import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Database, 
  Lock, 
  Server,
  Zap,
  TrendingUp,
  Users as UsersIcon,
  ShoppingBag,
  DollarSign
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '../lib/utils';
import { adminService } from '../services/api/adminService';
import { useTranslation } from 'react-i18next';

const SystemStat = ({ icon: Icon, label, value, subtext, color, trend }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 p-8 rounded-[2.5rem] shadow-3d-soft flex flex-col gap-4 group hover:border-primary-light/30 transition-all"
  >
    <div className="flex items-center justify-between">
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg", color)}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <div className={cn("px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1", trend > 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500")}>
          <TrendingUp className={cn("w-3 h-3", trend < 0 && "rotate-180")} />
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
      <p className="text-3xl font-black text-slate-800 dark:text-white leading-none">{value}</p>
      <p className="text-xs font-bold text-slate-400 mt-2">{subtext}</p>
    </div>
  </motion.div>
);

export default function AdminDashboardPage() {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uptime, setUptime] = useState("0d 0h 0m 0s");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await adminService.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const start = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now - start;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setUptime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const COLORS = ['#A78BFA', '#8B5CF6', '#6366F1', '#4F46E5'];

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-4 border-primary-light/20 border-t-primary-light rounded-full animate-spin" />
        <p className="text-sm font-black uppercase tracking-widest text-primary-light animate-pulse">{t('admin.dashboard.initializing')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20 overflow-hidden">
      {/* Admin Title */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            {t('admin.dashboard.control_center')} <span className="text-primary-light">{t('admin.dashboard.center_accent')}</span>
          </h1>
          <p className="text-slate-500 font-medium italic">{t('admin.dashboard.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-3d-soft">
           <Zap className="w-4 h-4 text-primary-light animate-pulse" />
           <span className="text-xs font-black uppercase tracking-widest text-primary-light">{t('admin.dashboard.node_active')}</span>
        </div>
      </motion.div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SystemStat 
          icon={DollarSign} 
          label={t('admin.dashboard.stats.revenue')} 
          value={`$${stats?.totalRevenue?.toLocaleString() || '0'}`} 
          subtext={t('admin.dashboard.stats.revenue_sub')}
          trend={stats?.growthRate}
          color="bg-primary-light"
        />
        <SystemStat 
          icon={ShoppingBag} 
          label={t('admin.dashboard.stats.orders')} 
          value={stats?.totalOrders || '0'} 
          subtext={t('admin.dashboard.stats.orders_sub')}
          color="bg-indigo-500"
        />
        <SystemStat 
          icon={UsersIcon} 
          label={t('admin.dashboard.stats.customers')} 
          value={stats?.totalCustomers || '0'} 
          subtext={t('admin.dashboard.stats.customers_sub')}
          color="bg-emerald-500"
        />
        <SystemStat 
          icon={Server} 
          label={t('admin.dashboard.stats.uptime')} 
          value={uptime} 
          subtext={t('admin.dashboard.stats.uptime_sub')}
          color="bg-slate-800 dark:bg-slate-700"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-8 bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 p-10 rounded-[3rem] shadow-3d-soft space-y-8"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black uppercase tracking-tight">{t('admin.dashboard.revenue_chart.title')}</h3>
            <div className="flex gap-2">
               <span className="w-3 h-3 rounded-full bg-primary-light shadow-[0_0_10px_rgba(167,139,250,0.5)]" />
               <span className="text-[10px] font-black uppercase text-slate-400">{t('admin.dashboard.revenue_chart.forecast')}</span>
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.revenueChart || []}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#A78BFA" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#888" vertical={false} opacity={0.1} />
                <XAxis dataKey="date" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--tooltip-bg, rgba(255, 255, 255, 0.9))', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '1rem',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                  }}
                  itemStyle={{ fontWeight: '900', color: '#8b5cf6' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#A78BFA" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Secondary Panels */}
        <div className="lg:col-span-4 space-y-6">
           <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/70 dark:bg-slate-900 p-10 rounded-[3rem] text-slate-800 dark:text-white border border-slate-200 dark:border-none shadow-3d-soft overflow-hidden relative"
           >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-light/10 blur-[50px] rounded-full" />
              <div className="relative z-10 space-y-6">
                <ShieldCheck className="w-12 h-12 text-primary-light" />
                <div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2 whitespace-nowrap">{t('admin.dashboard.category_split.title')}</h4>
                  <p className="text-xs font-bold text-slate-500 whitespace-nowrap">{t('admin.dashboard.category_split.subtitle')}</p>
                </div>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats?.categoryDistribution || []}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="count"
                      >
                        {(stats?.categoryDistribution || []).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
           </motion.div>

           <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 p-10 rounded-[3rem] shadow-3d-soft"
           >
              <h4 className="text-xl font-black uppercase tracking-tight mb-8">{t('admin.dashboard.recent_pulse')}</h4>
              <div className="space-y-6">
                 {(stats?.recentActivities || []).map((m, i) => (
                   <div key={i} className="flex items-center justify-between group">
                     <div className="space-y-0.5">
                       <p className="text-sm font-black text-slate-800 dark:text-gray-200 group-hover:text-primary-light transition-colors">{m.description}</p>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{m.time}</p>
                     </div>
                     <div className={cn("px-3 py-1 rounded-lg text-[8px] font-black uppercase border", 
                        m.type === 'SUCCESS' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-primary-light/10 text-primary-light border-primary-light/20")}>
                        {m.type}
                     </div>
                   </div>
                 ))}
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}

