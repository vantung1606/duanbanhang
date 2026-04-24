import { motion } from 'framer-motion';
import { 
  LineChart, Line, PieChart, Pie, Cell, XAxis, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Activity, Clock, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';

const timeData = [
  { time: '08:00', orders: 12 },
  { time: '10:00', orders: 25 },
  { time: '12:00', orders: 45 },
  { time: '14:00', orders: 30 },
  { time: '16:00', orders: 60 },
  { time: '18:00', orders: 20 },
];

const statusData = [
  { name: 'Thành Công', value: 400, color: '#10b981' },
  { name: 'Đang Xử Lý', value: 300, color: '#3b82f6' },
  { name: 'Hoàn Trả', value: 100, color: '#f59e0b' },
  { name: 'Hủy', value: 50, color: '#ef4444' },
];

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

export default function StaffAnalyticsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6 pb-20 w-full"
    >
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-[#2b3a55] tracking-tight leading-[1.1] mb-2">
          Phân Tích<br/>Hoạt Động.
        </h1>
        <p className="text-slate-500 font-medium">Theo dõi biểu đồ thời gian thực về hiệu suất làm việc.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100/50 flex items-center justify-center text-blue-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tốc Độ Xử Lý</p>
              <h3 className="text-xl font-bold text-slate-800">4.5 Phút / Đơn</h3>
            </div>
          </div>
        </GlassCard>
        <GlassCard delay={0.1} className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/50 flex items-center justify-center text-emerald-600">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tỷ Lệ Lỗi</p>
              <h3 className="text-xl font-bold text-slate-800">0.8%</h3>
            </div>
          </div>
        </GlassCard>
        <GlassCard delay={0.2} className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100/50 flex items-center justify-center text-purple-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hiệu Suất</p>
              <h3 className="text-xl font-bold text-slate-800">+12% Tuần Này</h3>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="flex flex-col gap-6">
        <GlassCard delay={0.3} className="p-8 h-[400px]">
          <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-widest">Lưu lượng đơn hàng theo giờ</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeData}>
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
              />
              <Line type="monotone" dataKey="orders" stroke="#2b3a55" strokeWidth={4} dot={{r: 6, fill: '#2b3a55', strokeWidth: 2, stroke: '#fff'}} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard delay={0.4} className="p-8 h-[400px]">
          <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-widest">Tỷ Lệ Hoàn Thành</h3>
          <div className="flex h-[300px]">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie data={statusData} innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-1/2 flex flex-col justify-center gap-4 pl-10">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-bold text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

    </motion.div>
  );
}
