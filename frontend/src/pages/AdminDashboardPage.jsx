import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Database, 
  Lock, 
  Server,
  Zap,
  Globe,
  HardDrive
} from 'lucide-react';
import { cn } from '../lib/utils';

const SystemStat = ({ icon: Icon, label, value, subtext, color }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 rounded-[2.5rem] shadow-sm flex flex-col gap-4 group hover:border-primary-light/30 transition-all"
  >
    <div className="flex items-center justify-between">
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg", color)}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Ready</div>
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
      <p className="text-3xl font-black text-slate-800 dark:text-white leading-none">{value}</p>
      <p className="text-xs font-bold text-slate-400 mt-2">{subtext}</p>
    </div>
  </motion.div>
);

export default function AdminDashboardPage() {
  const [uptime, setUptime] = useState("0d 0h 0m 0s");

  useEffect(() => {
    const start = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000); // 15 days ago
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

  return (
    <div className="space-y-10 pb-20">
      {/* Admin Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            System <span className="text-primary-light">Control Room</span>
          </h1>
          <p className="text-slate-500 font-medium">Global infrastructure management and security audit.</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-primary-light/10 border border-primary-light/20 rounded-2xl">
           <Zap className="w-4 h-4 text-primary-light animate-pulse" />
           <span className="text-xs font-black uppercase tracking-widest text-primary-light">System Stable</span>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SystemStat 
          icon={Server} 
          label="Server Uptime" 
          value={uptime} 
          subtext="No downtime in 15 days"
          color="bg-primary-light"
        />
        <SystemStat 
          icon={Cpu} 
          label="Server Load" 
          value="14%" 
          subtext="Cluster: Asia-Southeast-1"
          color="bg-indigo-500"
        />
        <SystemStat 
          icon={Database} 
          label="Storage Usage" 
          value="24.8 GB" 
          subtext="452,000 Entries logged"
          color="bg-slate-700"
        />
        <SystemStat 
          icon={Lock} 
          label="Active Tokens" 
          value="156" 
          subtext="Refreshed every 24h"
          color="bg-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Real-time Infrastructure Feed */}
        <div className="lg:col-span-12 xl:col-span-8 bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-10 rounded-[3rem] shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black uppercase tracking-tight">Access Control & Security</h3>
            <button className="text-xs font-black uppercase text-primary-light hover:underline">Flush Caches</button>
          </div>
          
          <div className="space-y-4">
             {[
               { ip: '192.168.1.1', user: 'AdminRoot', action: 'DEPLOY_PATCH_V2.1', time: 'Just now', status: 'SUCCESS' },
               { ip: '112.45.18.2', user: 'Staff_Marcus', action: 'BULK_STOCK_UPDATE', time: '12m ago', status: 'SUCCESS' },
               { ip: '201.12.85.4', user: 'Unknown', action: 'LOGIN_FAILURE', time: '45m ago', status: 'WARN' },
               { ip: '15.42.188.9', user: 'Manager_Sarah', action: 'EXPORT_FINANCIAL_PDF', time: '2h ago', status: 'SUCCESS' }
             ].map((log, i) => (
               <div key={i} className="flex items-center justify-between p-6 bg-white/30 dark:bg-black/20 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="text-[10px] font-black font-mono text-slate-400 w-24">{log.ip}</div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{log.action}</p>
                      <p className="text-[10px] font-black text-primary-light uppercase tracking-widest">User: {log.user}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] font-black text-slate-400">{log.time}</span>
                    <span className={cn("px-4 py-1.5 rounded-full text-[10px] font-black uppercase", log.status === 'SUCCESS' ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500")}>
                      {log.status}
                    </span>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* System Overview Panels */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
           <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-[3rem] text-white space-y-6 shadow-xl">
              <ShieldCheck className="w-12 h-12 text-primary-light" />
              <div>
                <h4 className="text-2xl font-black uppercase leading-none mb-2">Security Audit</h4>
                <p className="text-xs font-bold text-slate-400">Running advanced heuristics and pattern matching for anomaly detection.</p>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between">
                 <div className="text-center">
                   <p className="text-xl font-black">100%</p>
                   <p className="text-[8px] font-black uppercase text-slate-500 tracking-tighter">Healthy</p>
                 </div>
                 <div className="text-center">
                   <p className="text-xl font-black">0</p>
                   <p className="text-[8px] font-black uppercase text-slate-500 tracking-tighter">Threats</p>
                 </div>
                 <div className="text-center">
                   <p className="text-xl font-black">2.4ms</p>
                   <p className="text-[8px] font-black uppercase text-slate-500 tracking-tighter">Latency</p>
                 </div>
              </div>
           </div>

           <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-10 rounded-[3rem] shadow-sm">
              <h4 className="text-xl font-black uppercase tracking-tight mb-8">Active Modules</h4>
              <div className="space-y-6">
                 {[
                   { label: 'E-commerce Engine', status: 'online' },
                   { label: 'Order Pipeline', status: 'online' },
                   { label: 'Payment Gateway', status: 'standby' },
                   { label: 'Socket Dispatcher', status: 'online' }
                 ].map((m, i) => (
                   <div key={i} className="flex items-center justify-between">
                     <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{m.label}</span>
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-slate-400">{m.status}</span>
                        <div className={cn("w-2 h-2 rounded-full", m.status === 'online' ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-yellow-500")} />
                     </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
