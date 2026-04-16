import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, ShoppingBag, Mail } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background-light dark:bg-background-dark transition-colors duration-500 overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[50%] bg-primary-light/10 blur-[120px] rounded-full z-0 pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-10%] right-[10%] w-[30%] h-[40%] bg-indigo-500/10 blur-[100px] rounded-full z-0 pointer-events-none animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl w-full relative z-10"
      >
        <div className="bg-white/50 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-[4rem] p-12 text-center shadow-neumo-lg">
          
          <div className="relative mb-10 inline-block">
             <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.3 }}
               className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30"
             >
                <CheckCircle2 className="w-12 h-12 text-white" />
             </motion.div>
             <motion.div 
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-sm"
             >
                <Zap className="w-4 h-4 text-white" />
             </motion.div>
          </div>

          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase mb-4">
            Order <span className="text-emerald-500">Confirmed</span>
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed mb-10">
            Thank you for choosing TechChain. Your order <span className="text-slate-800 dark:text-white font-black">#ORD-1024</span> has been successfully placed and is now being processed.
          </p>

          <div className="space-y-4 mb-12">
             <div className="flex items-center gap-4 p-6 bg-white/50 dark:bg-black/20 rounded-3xl border border-white/20 dark:border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                   <Mail className="w-6 h-6" />
                </div>
                <div className="text-left">
                   <p className="text-[10px] font-black uppercase text-slate-400">Order Update</p>
                   <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Confirmation email sent to you.</p>
                </div>
             </div>
             <div className="flex items-center gap-4 p-6 bg-white/50 dark:bg-black/20 rounded-3xl border border-white/20 dark:border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                   <Package className="w-6 h-6" />
                </div>
                <div className="text-left">
                   <p className="text-[10px] font-black uppercase text-slate-400">Shipping Notice</p>
                   <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Processing within 24 hours.</p>
                </div>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
             <Link 
               to="/profile" 
               className="flex-1 px-8 py-5 bg-slate-800 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl"
             >
                Track Order <ArrowRight className="w-4 h-4" />
             </Link>
             <Link 
               to="/shop" 
               className="flex-1 px-8 py-5 bg-white/50 dark:bg-white/10 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-all border border-white/20 dark:border-white/10 shadow-sm"
             >
                <ShoppingBag className="w-4 h-4" /> Keep Shopping
             </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Zap({ className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  );
}
