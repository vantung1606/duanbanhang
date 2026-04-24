import { motion } from 'framer-motion';
import { Download, FileText, Calendar, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';

const reports = [
  { id: 'REP-001', name: 'Báo Cáo Doanh Thu Tuần 2', date: '16/04/2025', size: '2.4 MB', type: 'PDF' },
  { id: 'REP-002', name: 'Báo Cáo Hiệu Suất Nhân Viên T4', date: '15/04/2025', size: '1.8 MB', type: 'Excel' },
  { id: 'REP-003', name: 'Thống Kê Đơn Hàng Hoàn Trả', date: '14/04/2025', size: '3.1 MB', type: 'PDF' },
  { id: 'REP-004', name: 'Kiểm Kê Kho Đầu Tháng', date: '01/04/2025', size: '5.0 MB', type: 'Excel' },
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

export default function StaffReportsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6 pb-20 w-full"
    >
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-[#2b3a55] tracking-tight leading-[1.1] mb-2">
            Trung Tâm<br/>Báo Cáo.
          </h1>
          <p className="text-slate-500 font-medium">Tạo và tải xuống các báo cáo thống kê định kỳ.</p>
        </div>
        
        <button className="px-6 py-4 bg-[#2b3a55] text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-[#2b3a55]/20 hover:scale-[1.02] active:scale-95 transition-all w-fit">
          <Download className="w-5 h-5" /> Tạo Báo Cáo Mới
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Filter Section */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <GlassCard className="p-6 space-y-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200/50 pb-4">
              <Filter className="w-4 h-4" /> Bộ Lọc Báo Cáo
            </h3>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Thời Gian</label>
              <div className="flex items-center bg-white/50 rounded-xl p-3 border border-white/60">
                <Calendar className="w-4 h-4 text-slate-400 mr-2" />
                <span className="text-sm font-bold text-slate-600">Tháng Này</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loại Báo Cáo</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-[#2b3a55] focus:ring-[#2b3a55]" />
                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-800">Doanh Thu</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-[#2b3a55] focus:ring-[#2b3a55]" />
                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-800">Hiệu Suất</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#2b3a55] focus:ring-[#2b3a55]" />
                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-800">Tồn Kho</span>
                </label>
              </div>
            </div>
            
            <button className="w-full py-3 bg-white/50 hover:bg-white text-slate-700 rounded-xl font-bold transition-colors border border-white/60 shadow-sm text-sm">
              Áp Dụng Lọc
            </button>
          </GlassCard>
        </div>

        {/* Reports List */}
        <div className="flex-1">
          <GlassCard delay={0.1} className="h-full flex flex-col">
            <div className="p-6 border-b border-slate-200/50">
              <h3 className="font-bold text-slate-800">Danh Sách Báo Cáo Gần Đây</h3>
            </div>
            
            <div className="flex-1 p-6 space-y-4">
              {reports.map((report, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  key={report.id} 
                  className="flex items-center justify-between p-4 bg-white/40 hover:bg-white/60 rounded-2xl transition-colors border border-transparent hover:border-white/80 group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center font-bold",
                      report.type === 'PDF' ? "bg-red-100/50 text-red-600" : "bg-emerald-100/50 text-emerald-600"
                    )}>
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm group-hover:text-[#2b3a55]">{report.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{report.id}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-xs font-bold text-slate-500">{report.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-bold text-slate-400 hidden sm:block">{report.size}</span>
                    <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center hover:bg-[#2b3a55] hover:text-white text-slate-500 transition-all shadow-sm">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>

      </div>
    </motion.div>
  );
}
