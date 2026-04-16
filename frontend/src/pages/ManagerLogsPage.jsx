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
  Filter
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function ManagerLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('ALL');

  useEffect(() => {
    // Mock audit logs
    const mockLogs = [
      { id: 1, user: 'Admin_Root', action: 'UPDATE_ROLE', entity: 'USER', entityId: 105, detail: 'Changed role for Marcus from USER to STAFF', time: '2m ago', level: 'CRITICAL' },
      { id: 2, user: 'Staff_Marcus', action: 'UPDATE_STOCK', entity: 'PRODUCT', entityId: 24, detail: 'Increased RTX 4090 stock by 5 units', time: '12m ago', level: 'INFO' },
      { id: 3, user: 'Manager_Sarah', action: 'CREATE_VOUCHER', entity: 'VOUCHER', entityId: 12, detail: 'Generated code TECHLAUNCH20', time: '45m ago', level: 'SUCCESS' },
      { id: 4, user: 'System', action: 'BACKUP_DB', entity: 'DATABASE', entityId: null, detail: 'Nightly backup completed successfully', time: '4h ago', level: 'SUCCESS' },
      { id: 5, user: 'Unknown', action: 'LOGIN_FAIL', entity: 'IAM', entityId: null, detail: 'Failed login attempt from IP 112.45.18.2', time: '6h ago', level: 'WARN' },
    ];
    setLogs(mockLogs);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-10 pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            System <span className="text-indigo-500">Audit Logs</span>
          </h1>
          <p className="text-slate-500 font-medium">Historical record of all critical system operations and user actions.</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
           <Terminal className="w-4 h-4 text-indigo-500" />
           <span className="text-xs font-black uppercase tracking-widest text-indigo-500">Live Stream Active</span>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Events', val: '1,248', color: 'text-slate-800', bg: 'bg-white/50' },
          { label: 'Security Alerts', val: '02', color: 'text-red-500', bg: 'bg-red-500/5' },
          { label: 'DB Backups', val: '15', color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
          { label: 'Failures', val: '24', color: 'text-amber-500', bg: 'bg-amber-500/5' },
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
               placeholder="Search by action or user..." 
               className="w-full bg-white/50 dark:bg-black/20 border border-white/10 rounded-2xl py-3 pl-12 pr-6 outline-none focus:ring-2 focus:ring-indigo-500/30 text-xs font-bold"
             />
           </div>
        </div>

        <div className="p-4 overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-white/5">
                <th className="px-8 py-6">Operation</th>
                <th className="px-8 py-6">Identity</th>
                <th className="px-8 py-6">Affected Target</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {logs.map((log) => (
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
                            log.level === 'CRITICAL' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                            log.level === 'WARN' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                            "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
                          )}>
                             {log.level === 'CRITICAL' ? <ShieldAlert className="w-5 h-5" /> : <Terminal className="w-5 h-5" />}
                          </div>
                          <div>
                             <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">{log.action}</p>
                             <p className="text-[10px] font-bold text-slate-400 max-w-xs truncate">{log.detail}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-3">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{log.user}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-indigo-500" />
                          <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">{log.entity}</span>
                          {log.entityId && <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 text-[8px] font-black">ID:{log.entityId}</span>}
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className={cn(
                         "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                         log.level === 'CRITICAL' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                         log.level === 'WARN' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                         "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                       )}>
                          <div className={cn("w-1 h-1 rounded-full", 
                            log.level === 'CRITICAL' ? "bg-red-500" : 
                            log.level === 'WARN' ? "bg-amber-500" : 
                            "bg-emerald-500"
                          )} />
                          {log.level}
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px]">
                          <Clock className="w-3 h-3" />
                          {log.time}
                       </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
