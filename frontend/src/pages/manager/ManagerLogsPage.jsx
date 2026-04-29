import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Terminal, 
  Shield, 
  User, 
  Clock, 
  Database,
  ArrowRight,
  Info,
  ShieldAlert,
  ShieldCheck,
  Filter,
  RefreshCw
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { adminService } from '../../services/api/adminService';
import { useToast } from '../../components/common/Toast';

export default function ManagerLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAuditLogs();
      setLogs(data);
    } catch (error) {
      console.error("Failed to fetch logs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchLogs, 30000);
    return () => clearInterval(interval);
  }, []);

  const getLevel = (action) => {
    if (action.includes('DELETE')) return 'CRITICAL';
    if (action.includes('RESET') || action.includes('UPDATE_ROLE')) return 'WARN';
    if (action.includes('CREATE')) return 'SUCCESS';
    return 'INFO';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterType === 'ALL') return matchesSearch;
    return matchesSearch && getLevel(log.action) === filterType;
  });

  const stats = {
    total: logs.length,
    critical: logs.filter(l => getLevel(l.action) === 'CRITICAL').length,
    warn: logs.filter(l => getLevel(l.action) === 'WARN').length,
    success: logs.filter(l => getLevel(l.action) === 'SUCCESS').length,
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            Hệ Thống <span className="text-indigo-500">Nhật Ký</span>
          </h1>
          <p className="text-slate-500 font-medium">Lịch sử ghi lại tất cả các hoạt động quan trọng của người dùng và hệ thống.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchLogs}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
            Làm mới
          </button>
          <div className="flex items-center gap-3 px-6 py-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
            <Terminal className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-black uppercase tracking-widest text-indigo-500">Trực Tiếp</span>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Tổng Sự Kiện', val: stats.total, color: 'text-slate-800', bg: 'bg-white/50' },
          { label: 'Cảnh Báo Đỏ', val: stats.critical, color: 'text-red-500', bg: 'bg-red-500/5' },
          { label: 'Thay Đổi Bảo Mật', val: stats.warn, color: 'text-amber-500', bg: 'bg-amber-500/5' },
          { label: 'Thao Tác Thành Công', val: stats.success, color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
        ].map((stat, i) => (
          <div key={i} className={cn("backdrop-blur-xl border border-white/20 dark:border-white/10 p-6 rounded-[2rem] shadow-sm", stat.bg)}>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
            <p className={cn("text-2xl font-black", stat.color)}>{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Logs Interface */}
      <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[3rem] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-2 p-1 bg-white/50 dark:bg-black/20 rounded-2xl border border-white/10">
              {['ALL', 'CRITICAL', 'WARN', 'INFO', 'SUCCESS'].map((type) => (
                <button 
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={cn(
                    "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    filterType === type ? "bg-indigo-500 text-white shadow-lg" : "text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  )}
                >
                  {type}
                </button>
              ))}
           </div>
           
           <div className="relative group flex-1 max-w-md">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500" />
             <input 
               type="text" 
               placeholder="Tìm kiếm hành động hoặc người dùng..." 
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
               className="w-full bg-white/50 dark:bg-black/20 border border-white/10 rounded-2xl py-3 pl-12 pr-6 outline-none focus:ring-2 focus:ring-indigo-500/30 text-xs font-bold"
             />
           </div>
        </div>

        <div className="p-4 overflow-x-auto no-scrollbar min-h-[400px]">
          {loading && logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
               <RefreshCw className="w-8 h-8 animate-spin mb-4" />
               <p className="font-bold text-sm">Đang tải nhật ký...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-white/5">
                  <th className="px-8 py-6">Thao Tác</th>
                  <th className="px-8 py-6">Người Thực Hiện</th>
                  <th className="px-8 py-6">Đối Tượng</th>
                  <th className="px-8 py-6">Trạng Thái</th>
                  <th className="px-8 py-6">Thời Gian</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredLogs.map((log) => {
                    const level = getLevel(log.action);
                    return (
                      <motion.tr 
                        key={log.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group border-b border-white/5 hover:bg-white/10 dark:hover:bg-white/[0.03] transition-colors last:border-0"
                      >
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center border",
                                level === 'CRITICAL' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                level === 'WARN' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                                level === 'SUCCESS' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
                              )}>
                                 {level === 'CRITICAL' ? <ShieldAlert className="w-5 h-5" /> : <Terminal className="w-5 h-5" />}
                              </div>
                              <div className="max-w-[300px]">
                                 <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">{log.action}</p>
                                 <p className="text-[10px] font-bold text-slate-400 truncate">{log.details}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 border border-slate-200">
                                {log.username.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{log.username}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                              <Database className="w-4 h-4 text-indigo-500" />
                              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">{log.entityName}</span>
                              {log.entityId && <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 text-[8px] font-black">ID:{log.entityId}</span>}
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className={cn(
                             "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                             level === 'CRITICAL' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                             level === 'WARN' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                             level === 'SUCCESS' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                             "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
                           )}>
                              <div className={cn("w-1 h-1 rounded-full", 
                                level === 'CRITICAL' ? "bg-red-500" : 
                                level === 'WARN' ? "bg-amber-500" : 
                                level === 'SUCCESS' ? "bg-emerald-500" : 
                                "bg-indigo-500"
                              )} />
                              {level}
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px]">
                              <Clock className="w-3 h-3" />
                              {formatDate(log.createdAt)}
                           </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          )}

          {!loading && filteredLogs.length === 0 && (
            <div className="py-20 text-center text-slate-400 font-medium text-sm">
              Không tìm thấy nhật ký nào phù hợp.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
