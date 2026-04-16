import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Orbit } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-6 transition-colors duration-500 overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-5%] w-[50%] h-[60%] bg-primary-light/10 blur-[130px] rounded-full z-0 pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-10%] right-[10%] w-[40%] h-[50%] bg-indigo-500/10 blur-[110px] rounded-full z-0 pointer-events-none animate-pulse" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <h1 className="text-[12rem] font-black text-slate-800 dark:text-white leading-none opacity-10 select-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                 className="p-10 rounded-full border-2 border-dashed border-primary-light/50"
               >
                  <Orbit className="w-16 h-16 text-primary-light" />
               </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Lost in <span className="text-primary-light">Hyperspace</span></h2>
          <p className="text-slate-500 font-medium max-w-md mx-auto">The tech artifact you're looking for has been moved to a different dimension or discontinued from our timeline.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
             <Link 
               to="/home" 
               className="px-10 py-5 bg-primary-light text-white rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-primary-light/30"
             >
                <Home className="w-4 h-4" /> Return to Base
             </Link>
             <button 
               onClick={() => window.history.back()}
               className="px-10 py-5 bg-white/50 dark:bg-white/10 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-slate-800 hover:text-white transition-all border border-white/20 dark:border-white/10"
             >
                <ArrowLeft className="w-4 h-4" /> Go Back
             </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
