import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  DollarSign,
  Package
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { adminService } from '../../services/api/adminService';
import { useToast } from '../../components/common/Toast';

export default function ManagerDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch
    const mockData = {
      totalRevenue: 128450,
      totalOrders: 456,
      totalCustomers: 1205,
      growth: 12.5,
      chartData: [
        { name: 'Mon', revenue: 4000 },
        { name: 'Tue', revenue: 3000 },
        { name: 'Wed', revenue: 5000 },
        { name: 'Thu', revenue: 2780 },
        { name: 'Fri', revenue: 6890 },
        { name: 'Sat', revenue: 9390 },
        { name: 'Sun', revenue: 7490 },
      ],
      recentActivities: [
        { id: 1, type: 'SALE', text: 'Order #2045 completed', time: '5m ago', color: 'bg-emerald-500' },
        { id: 2, type: 'USER', text: 'New customer registered', time: '12m ago', color: 'bg-blue-500' },
        { id: 3, type: 'STOCK', text: 'Low stock warning: RTX 4090', time: '1h ago', color: 'bg-red-500' },
      ]
    };
    setStats(mockData);
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <div className="space-y-10 pb-20">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            Business <span className="text-indigo-500">Performance</span>
          </h1>
          <p className="text-slate-500 font-medium">Monitoring TechChain growth and store health.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex p-1 bg-white/50 dark:bg-white/5 rounded-2xl border border-white/20 dark:border-white/10">
             <button className="px-6 py-2 rounded-xl bg-indigo-500 text-white text-xs font-black uppercase shadow-lg shadow-indigo-500/20">Last 7 Days</button>
             <button className="px-6 py-2 rounded-xl text-slate-500 text-xs font-black uppercase hover:text-indigo-500">Last 30 Days</button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', val: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
          { label: 'Orders Fulfill', val: stats.totalOrders, icon: ShoppingBag, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Active Users', val: stats.totalCustomers, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Inventory', val: '2,480', icon: Package, color: 'text-orange-500', bg: 'bg-orange-500/10' }
        ].map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 rounded-[2.5rem] shadow-sm group hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", card.bg)}>
                <card.icon className={cn("w-6 h-6", card.color)} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500">
                <ArrowUpRight className="w-3 h-3" /> 12%
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{card.label}</p>
            <p className="text-3xl font-black text-slate-800 dark:text-white leading-none">{card.val}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Chart */}
        <div className="lg:col-span-8 bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 rounded-[3rem] shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black uppercase tracking-tight">Revenue Analysis</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-[10px] font-black uppercase text-slate-400">Net Sales</span>
              </div>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart data={stats.chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    borderRadius: '20px', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                  itemStyle={{ fontWeight: 800, color: '#fff' }}
                  labelStyle={{ fontWeight: 900, marginBottom: '5px', color: '#6366f1' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Sidebar: Recent Tasks / Activity */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 rounded-[3rem] shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black uppercase tracking-tight">System Feed</h3>
              <Activity className="w-5 h-5 text-indigo-500" />
            </div>
            
            <div className="space-y-6">
              {stats.recentActivities.map((act) => (
                <div key={act.id} className="flex gap-4 relative">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-lg", act.color)}>
                    {act.type === 'SALE' && <TrendingUp className="w-4 h-4" />}
                    {act.type === 'USER' && <Users className="w-4 h-4" />}
                    {act.type === 'STOCK' && <Package className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{act.text}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-10 py-4 rounded-2xl bg-indigo-500 text-white text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-500/20">
              View Audit Log
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-primary-dark p-8 rounded-[3rem] text-white space-y-4">
             <TrendingUp className="w-8 h-8 text-white/50" />
             <h4 className="text-2xl font-black leading-none">Goal Progress</h4>
             <p className="text-xs font-bold text-white/70">You are 8% away from the monthly target. Keep pushing!</p>
             <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="w-4/5 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
