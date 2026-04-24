import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tag, 
  Plus, 
  Trash2, 
  Calendar, 
  Zap, 
  Search, 
  Filter,
  CheckCircle2,
  Clock,
  Ticket,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function ManagerPromotionsPage() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Mock data for initial dev
    const mockVouchers = [
      { id: 1, code: 'TECHLAUNCH20', description: '20% Off for New Tech', type: 'PERCENTAGE', value: 20, limit: 100, used: 45, status: 'ACTIVE', end: '2025-05-01' },
      { id: 2, code: 'SAVE500', description: '$500 Flat Discount', type: 'FIXED_AMOUNT', value: 500, limit: 50, used: 50, status: 'EXPIRED', end: '2025-04-01' },
      { id: 3, code: 'GIFT8K', description: 'Special 8K Voucher', type: 'PERCENTAGE', value: 10, limit: 200, used: 12, status: 'ACTIVE', end: '2025-12-31' },
    ];
    setVouchers(mockVouchers);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-10 pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            Marketing <span className="text-indigo-500">Promotions</span>
          </h1>
          <p className="text-slate-500 font-medium">Create and manage high-conversion discount vouchers.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-8 py-4 bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5" /> Create Voucher
        </button>
      </div>

      {/* Grid: Voucher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {vouchers.map((voucher, idx) => (
            <motion.div 
              key={voucher.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-1 rounded-[2.5rem] overflow-hidden shadow-sm"
            >
              {/* Decorative Ticket Cutout Effect */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background-light dark:bg-background-dark border border-white/10 z-10" />
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background-light dark:bg-background-dark border border-white/10 z-10" />

              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest",
                    voucher.status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                  )}>
                    {voucher.status}
                  </div>
                  <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter uppercase font-mono">{voucher.code}</h3>
                  <p className="text-xs font-bold text-slate-500">{voucher.description}</p>
                </div>

                <div className="pt-6 border-t border-dashed border-white/20 space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Usage Progress</span>
                    <span>{voucher.used} / {voucher.limit}</span>
                  </div>
                  <div className="w-full h-3 bg-white/30 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(voucher.used / voucher.limit) * 100}%` }}
                      className={cn("h-full", voucher.status === 'ACTIVE' ? "bg-indigo-500" : "bg-slate-500")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2 text-slate-500">
                        <Calendar className="w-3 h-3" />
                        <span className="text-[10px] font-bold">Ends: {voucher.end}</span>
                     </div>
                     <span className="text-2xl font-black text-indigo-500">
                        {voucher.type === 'PERCENTAGE' ? `${voucher.value}%` : `$${voucher.value}`}
                     </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Analytics Hook */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-10 rounded-[3rem] text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl shadow-indigo-500/20">
         <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center border border-white/20">
               <Zap className="w-10 h-10 text-white" />
            </div>
            <div>
               <h4 className="text-2xl font-black uppercase tracking-tight">Campaign Insight</h4>
               <p className="text-white/70 font-bold">Vouchers increased sales by 24% this month.</p>
            </div>
         </div>
         <div className="flex gap-4">
            <div className="px-8 py-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
               <p className="text-[10px] font-black uppercase opacity-60">Avg. Basket Size</p>
               <p className="text-xl font-black">$1,240</p>
            </div>
            <div className="px-8 py-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
               <p className="text-[10px] font-black uppercase opacity-60">Redemption Rate</p>
               <p className="text-xl font-black">18.4%</p>
            </div>
         </div>
      </div>
    </div>
  );
}
