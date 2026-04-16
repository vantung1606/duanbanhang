import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  Target, 
  Cpu, 
  Smartphone, 
  Monitor 
} from 'lucide-react';

const FloatingCard = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-15, 15, -15] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function CustomerHome() {
  return (
    <div className="relative pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-40 flex flex-col lg:flex-row items-center justify-between relative z-10">
        
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-12 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-portfolio-rose/10 to-portfolio-orange/10 px-6 py-2 rounded-full border border-portfolio-rose/20 mb-8">
              <Zap className="w-4 h-4 text-portfolio-rose fill-portfolio-rose" />
              <span className="text-xs font-black tracking-widest text-portfolio-rose uppercase">New Collection 2026</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-800 dark:text-white leading-[1.05] tracking-tight mb-8">
              Best Platform to <span className="bg-gradient-to-r from-portfolio-rose via-portfolio-orange to-portfolio-violet bg-clip-text text-transparent">Grow Your</span> Collection
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl mx-auto lg:mx-0">
              Open yours in minutes right from your smartphone, and start spending before your physical card arrives.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
          >
            <div className="relative group w-full sm:w-80">
              <input 
                type="text" 
                placeholder="Your email address" 
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-8 py-5 rounded-2xl shadow-3d-soft focus:outline-none focus:ring-4 focus:ring-portfolio-rose/20 text-slate-800 dark:text-white font-bold transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-portfolio-rose to-portfolio-orange text-white font-black text-xs tracking-widest rounded-xl hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
                GET STARTED <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Big Number Statistic */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="pt-10 flex items-end gap-2 group"
          >
            <span className="text-9xl font-black text-slate-900 dark:text-white tracking-tighter group-hover:scale-110 transition-transform cursor-pointer">1.6<span className="text-4xl">x</span></span>
            <div className="pb-4 border-l-2 border-slate-900 dark:border-white pl-4">
              <p className="font-bold text-slate-500 max-w-[150px] leading-tight text-sm">Open yours in minutes right from your smartphone.</p>
            </div>
          </motion.div>
        </div>

        {/* Right 3D Visual Section */}
        <div className="lg:w-1/2 mt-20 lg:mt-0 relative h-[600px] w-full flex items-center justify-center">
          
          {/* Main Character Image Placeholder / 3D Scene Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-portfolio-rose/40 to-portfolio-orange/40 rounded-[4rem] transform rotate-3 scale-95 blur-3xl opacity-20 animate-pulse" />
          
          {/* Floating Card 1: Engagement */}
          <FloatingCard className="absolute top-10 right-0 z-20 w-64 p-6 bg-white/70 dark:bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-3d-soft">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-indigo-500" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Engagement</p>
                <p className="text-2xl font-black text-slate-800 dark:text-white">28.51</p>
              </div>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '71.26%' }}
                transition={{ duration: 2, delay: 1 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-portfolio-purple" 
              />
            </div>
            <p className="mt-3 text-[10px] font-bold text-indigo-500">+71.26% Higher than usual</p>
          </FloatingCard>

          {/* Floating Card 2: 3D Visualization Placeholder */}
          <FloatingCard delay={2} className="relative z-10 w-[80%] aspect-square bg-gradient-to-br from-portfolio-rose to-portfolio-orange rounded-[4rem] shadow-3d-vibrant p-1 overflow-hidden group">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[3.8rem] flex items-center justify-center relative overflow-hidden">
               {/* 3D Content (using emoji/lucide for now) */}
               <motion.div 
                 animate={{ rotateY: 360 }} 
                 transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                 className="text-[12rem] cursor-pointer"
               >
                 🎨
               </motion.div>
               <div className="absolute bottom-10 left-10 right-10">
                 <div className="h-24 bg-portfolio-rose/5 backdrop-blur-md rounded-3xl border border-portfolio-rose/10 flex items-center justify-center">
                    <p className="text-xs font-black tracking-widest text-portfolio-rose animate-pulse uppercase">Interactive 3D Preview</p>
                 </div>
               </div>
            </div>
          </FloatingCard>

          {/* Floating Mini Orbs/Shapes */}
          <FloatingCard delay={1} className="absolute -left-10 bottom-20 z-20 w-24 h-24 rounded-3xl bg-portfolio-orange flex items-center justify-center shadow-lg transform -rotate-12">
            <TrendingUp className="text-white w-10 h-10" />
          </FloatingCard>
          
          <FloatingCard delay={3} className="absolute right-10 bottom-10 z-20 w-20 h-20 rounded-full bg-white/80 dark:bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/40">
            <Cpu className="text-portfolio-rose w-8 h-8" />
          </FloatingCard>
        </div>
      </section>

      {/* Featured Categories (3D Cards) */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <h2 className="text-4xl font-black mb-16 tracking-tight dark:text-white">Shop the <span className="text-portfolio-rose">Best Tech.</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { label: 'Mobile Excellence', icon: Smartphone, color: 'bg-portfolio-rose' },
            { label: 'Laptops Pro', icon: Monitor, color: 'bg-portfolio-purple' },
            { label: 'Core Hardware', icon: Cpu, color: 'bg-portfolio-orange' }
          ].map((cat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative group cursor-pointer"
            >
              <div className="h-80 rounded-[3rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-3d-soft p-12 flex flex-col justify-between overflow-hidden">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg", cat.color)}>
                  <cat.icon className="w-8 h-8" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-slate-800 dark:text-white leading-tight">{cat.label}</h3>
                  <button className="flex items-center gap-2 font-bold text-sm text-slate-400 group-hover:text-portfolio-rose transition-colors">
                    EXPLORE COLLECTION <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {/* 3D Glass Effect Background */}
                <div className="absolute top-[-20%] right-[-20%] w-40 h-40 rounded-full bg-slate-100 dark:bg-white/5 blur-2xl group-hover:scale-150 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
