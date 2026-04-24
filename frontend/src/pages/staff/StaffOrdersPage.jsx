import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { 
  Clock, 
  TrendingUp,
  Truck,
  Package,
  QrCode,
  ArrowRight,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '../../lib/utils';

// --- Ethereal Glassmorphism Components ---
const GlassCard = ({ className, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={cn(
      "relative rounded-[2rem] bg-white/60 backdrop-blur-[30px] border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden",
      className
    )}
  >
    {children}
  </motion.div>
);

export default function StaffOrdersPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch
    const mockData = {
      pendingOrders: 12,
      todayRevenue: 48200000,
      shippingOrders: 8,
      inventoryStatus: 2450,
      revenueGrowth: 5.24,
      chartData: [
        { name: 'T2', val: 40 },
        { name: 'T3', val: 55 },
        { name: 'T4', val: 35 },
        { name: 'T5', val: 85 },
        { name: 'T6', val: 45 },
        { name: 'T7', val: 65 },
        { name: 'CN', val: 50 },
      ],
      recentOrders: [
        { id: 1024, customer: 'Nguyễn Văn A', amount: 1250000, status: 'Đang Chờ', color: 'bg-yellow-100 text-yellow-600', icon: 'N' },
        { id: 1025, customer: 'Trần Thị B', amount: 4500000, status: 'Đã Xác Nhận', color: 'bg-blue-100 text-blue-600', icon: 'T' },
        { id: 1026, customer: 'Lê Hoàng C', amount: 890000, status: 'Đang Giao', color: 'bg-purple-100 text-purple-600', icon: 'L' },
      ]
    };
    
    setTimeout(() => {
      setStats(mockData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return null; // Tránh hiển thị spinner xoay xoay, đợi data load xong sẽ slide vào
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6 pb-20 relative"
    >
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 mb-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-black text-[#2b3a55] tracking-tight leading-[1.1] mb-4">
            Bảng<br/>Điều Khiển.
          </h1>
          <span className="inline-block px-4 py-1.5 bg-[#e2e8f0]/80 backdrop-blur-sm text-[#475569] text-[10px] font-black uppercase tracking-widest rounded-full">
            TRỰC TIẾP CẬP NHẬT
          </span>
        </div>
      </div>

      {/* 4 Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        
        {/* Card 1: Pending */}
        <GlassCard delay={0.1} className="p-6">
           <div className="flex items-center justify-between mb-8">
              <Clock className="w-5 h-5 text-slate-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">ĐANG CHỜ</span>
           </div>
           <h3 className="text-3xl font-black text-slate-800 mb-1">{stats.pendingOrders} Đơn</h3>
           <p className="text-xs font-semibold text-slate-500">Cần xử lý gấp</p>
        </GlassCard>

        {/* Card 2: Revenue */}
        <GlassCard delay={0.2} className="p-6">
           <div className="flex items-center justify-between mb-8">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">DOANH THU</span>
           </div>
           <h3 className="text-3xl font-black text-slate-800 mb-1">
             {(stats.todayRevenue / 1000000).toFixed(1)}M
           </h3>
           <p className="text-xs font-semibold text-emerald-500">+{stats.revenueGrowth}% hôm nay</p>
        </GlassCard>

        {/* Card 3: Shipping */}
        <GlassCard delay={0.3} className="p-6">
           <div className="flex items-center justify-between mb-8">
              <Truck className="w-5 h-5 text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">GIAO HÀNG</span>
           </div>
           <h3 className="text-3xl font-black text-slate-800 mb-1">{stats.shippingOrders} Đơn</h3>
           <p className="text-xs font-semibold text-slate-500">Đang trên đường</p>
        </GlassCard>

        {/* Card 4: Inventory */}
        <GlassCard delay={0.4} className="p-6">
           <div className="flex items-center justify-between mb-8">
              <Package className="w-5 h-5 text-indigo-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">KHO HÀNG</span>
           </div>
           <h3 className="text-3xl font-black text-slate-800 mb-1">Sẵn Sàng</h3>
           <p className="text-xs font-semibold text-slate-500">{(stats.inventoryStatus / 1000).toFixed(1)}K Sản phẩm</p>
        </GlassCard>

      </div>

      <div className="flex flex-col gap-6 relative z-10 w-full">
        
        {/* Chart Block */}
        <div className="w-full">
          <GlassCard delay={0.5} className="p-10 h-full min-h-[400px] flex flex-col">
             <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">TỔNG QUAN ĐƠN HÀNG</span>
                  <h2 className="text-4xl font-black text-slate-800">{stats.todayRevenue.toLocaleString()} ₫</h2>
                </div>
                <div className="flex bg-slate-100/50 p-1 rounded-full">
                   <button className="px-4 py-2 rounded-full text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">Tuần</button>
                   <button className="px-4 py-2 rounded-full bg-[#2b3a55] text-white text-xs font-bold shadow-sm">Tháng</button>
                </div>
             </div>
             
             {/* Large Soft Bar Chart */}
             <div className="flex-1 w-full mt-4 min-h-[250px]">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={stats.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                   <XAxis 
                     dataKey="name" 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                     dy={10}
                   />
                   <Tooltip 
                     cursor={{ fill: 'transparent' }}
                     contentStyle={{ 
                       backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                       borderRadius: '16px', 
                       border: 'none',
                       boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                       fontWeight: 'bold'
                     }}
                   />
                   <Bar dataKey="val" radius={[10, 10, 10, 10]} barSize={40}>
                     {stats.chartData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={index === 3 ? '#2b3a55' : '#cbd5e1'} />
                     ))}
                   </Bar>
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </GlassCard>
        </div>

        {/* Recent Orders List Block */}
        <div className="w-full space-y-6 flex flex-col">
          
          {/* Top Assets / Recent Orders */}
          <GlassCard delay={0.6} className="p-8 flex-1">
             <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">ĐƠN MỚI NHẤT</span>
                <button className="text-xs font-bold text-indigo-500 hover:text-indigo-600">Xem Tất Cả</button>
             </div>
             
             <div className="space-y-4">
               {stats.recentOrders.map((order) => (
                 <div key={order.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/50 transition-colors cursor-pointer group">
                   <div className="flex items-center gap-4">
                     <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm", order.color)}>
                       {order.icon}
                     </div>
                     <div>
                       <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{order.customer}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">ORD-{order.id}</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="font-bold text-slate-800 text-sm">{order.amount.toLocaleString()} ₫</p>
                     <p className="text-[10px] font-bold text-emerald-500 mt-0.5">{order.status}</p>
                   </div>
                 </div>
               ))}
             </div>
          </GlassCard>

          {/* Upgrade Pro / Action Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="p-8 rounded-[2rem] bg-[#2b3a55] text-white shadow-xl shadow-[#2b3a55]/20 flex flex-col items-start"
          >
            <QrCode className="w-8 h-8 text-indigo-300 mb-4" />
            <h3 className="text-lg font-bold mb-2">Quét Mã Vạch</h3>
            <p className="text-slate-300 text-xs font-medium leading-relaxed mb-6">
               Quét mã vạch trên sản phẩm để tự động cập nhật trạng thái đơn hàng và kho.
            </p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors">
               MỞ MÁY QUÉT
            </button>
          </motion.div>

        </div>

      </div>
    </motion.div>
  );
}
