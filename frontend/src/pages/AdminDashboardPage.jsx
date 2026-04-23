import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShoppingBag, 
  Eye, 
  DollarSign,
  Calendar,
  Download,
  Plus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { cn } from '../lib/utils';

const chartData = [
  { name: 'T2', projection: 4000, actual: 2400 },
  { name: 'T3', projection: 3000, actual: 1398 },
  { name: 'T4', projection: 2000, actual: 9800 },
  { name: 'T5', projection: 2780, actual: 3908 },
  { name: 'T6', projection: 1890, actual: 4800 },
  { name: 'T7', projection: 2390, actual: 3800 },
  { name: 'CN', projection: 3490, actual: 4300 },
];

const StatCard = ({ icon: Icon, title, value, trend, isPositive }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
        <Icon className="w-4 h-4 text-slate-600" />
      </div>
      <span className={cn("text-xs font-bold", isPositive ? "text-emerald-500" : "text-red-500")}>
        {isPositive ? '+' : ''}{trend}%
      </span>
    </div>
    <div>
      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{title}</h3>
      <p className="text-2xl font-black text-slate-800">{value}</p>
    </div>
  </motion.div>
);

const recentHub = [
  { name: 'Trần Bình', action: 'Nâng cấp tài khoản', time: '2 phút trước', seed: 'Marcus' },
  { name: 'Lê Hoa', action: 'Tạo báo cáo mới', time: '12 phút trước', seed: 'Sarah' },
  { name: 'Nguyễn Khoa', action: 'Kết nối kho hàng', time: '45 phút trước', seed: 'David' },
  { name: 'Hệ Thống', action: 'Cập nhật phiên bản', time: '1 giờ trước', seed: 'System' },
];

export default function AdminDashboardPage() {
  return (
    <div className="relative pb-20 w-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Chào buổi sáng.</h1>
          <p className="text-slate-500 text-sm font-medium">Hệ thống của bạn đang hoạt động tốt hơn 12% so với tuần trước.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-sm font-bold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4" /> Tháng Này
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-700 rounded-full text-sm font-bold text-white shadow-lg shadow-slate-700/20 hover:bg-slate-800 transition-colors">
            <Download className="w-4 h-4" /> Xuất Dữ Liệu
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Users} title="NGƯỜI DÙNG" value="24,492" trend={14} isPositive={true} />
        <StatCard icon={ShoppingBag} title="DOANH SỐ" value="$84,120" trend={2.4} isPositive={true} />
        <StatCard icon={Eye} title="LƯỢT TRUY CẬP" value="1.2M" trend={-0.8} isPositive={false} />
        <StatCard icon={DollarSign} title="LỢI NHUẬN" value="$42,900" trend={18} isPositive={true} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-lg font-black text-slate-800">Biểu Đồ Tăng Trưởng</h2>
              <p className="text-xs font-medium text-slate-400">Hiệu suất dữ liệu phân tích thời gian thực</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="text-xs font-bold text-slate-500">Dự Phóng</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-600" />
                <span className="text-xs font-bold text-slate-500">Thực Tế</span>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={32} barGap={8}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                />
                <Bar dataKey="projection" fill="#cbd5e1" radius={[8, 8, 8, 8]} />
                <Bar dataKey="actual" fill="#475569" radius={[8, 8, 8, 8]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Right Column - Recent Hub */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100"
        >
          <h2 className="text-lg font-black text-slate-800 mb-8">Hoạt Động Gần Đây</h2>
          <div className="space-y-6">
            {recentHub.map((item, index) => (
              <div key={index} className="flex items-center justify-between group cursor-pointer p-2 rounded-2xl hover:bg-slate-50 transition-colors -mx-2">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.seed}`} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{item.name}</h3>
                    <p className="text-xs font-medium text-slate-500">{item.action}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-10 right-10 w-14 h-14 bg-slate-700 hover:bg-slate-800 rounded-full flex items-center justify-center text-white shadow-xl shadow-slate-700/30 transition-all hover:scale-105 active:scale-95 z-50">
        <Plus className="w-6 h-6" />
      </button>

    </div>
  );
}
