import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Zap, ArrowRight, Cpu, ShieldCheck, Database, Terminal, 
  ShoppingBag, Sun, Moon, Sparkles, Box, RefreshCcw
} from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import useCartStore from '../../store/cart-store';

// --- Elite Canvas Scrubber Engine (Ghost Edition) ---
const CanvasScrubber = ({ progress, videoSrc, onDuration }) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const scrollValue = useRef(0);
  const currentVideoTime = useRef(0);
  const targetVideoTime = useRef(0);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = videoSrc;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    videoRef.current = video;

    video.onloadedmetadata = () => onDuration(video.duration);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    
    let raf;
    const render = () => {
      // Smoothing Logic (LERP)
      scrollValue.current = progress.get();
      // Map ENTIRE 100% of scroll to full video for persistent journey
      targetVideoTime.current = scrollValue.current * video.duration;
      
      currentVideoTime.current += (targetVideoTime.current - currentVideoTime.current) * 0.12;

      if (video.readyState >= 2) {
        video.currentTime = currentVideoTime.current;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      video.pause();
      video.src = "";
    };
  }, [videoSrc, progress]);

  return (
    <canvas 
      ref={canvasRef} 
      width={1920} 
      height={1080} 
      className="w-full h-full object-contain mix-blend-screen opacity-90 drop-shadow-[0_0_60px_rgba(16,185,129,0.3)] shadow-emerald-500/20"
      style={{ filter: 'contrast(1.1) brightness(1.1)' }}
    />
  );
};

// --- Elite Ghost Components ---
const GhostBento = ({ icon: Icon, title, desc, className, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay }}
    className={cn(
      "group relative p-12 rounded-[3.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-[2px] transition-all duration-700 hover:bg-white/[0.05] hover:border-emerald-500/20 shadow-2xl overflow-hidden",
      className
    )}
  >
     <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-transparent" />
     <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
           <Icon className="w-7 h-7 text-emerald-400/60" />
        </div>
        <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-4 leading-none">{title}</h4>
        <p className="text-white/30 font-medium leading-relaxed max-w-sm">{desc}</p>
     </div>
  </motion.div>
);

export default function NeuralynHome() {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const containerRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);
  
  // High-Resolution Scroll Engine
  const { scrollYProgress } = useScroll({ container: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { damping: 60, stiffness: 100 });

  const { toggleCart, getTotalItems } = useCartStore();
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden transition-all duration-1000",
      isDarkMode ? "bg-[#01140F] text-white" : "bg-emerald-50 text-emerald-900"
    )}>
      
      {/* 
        GHOST LAYER: Fixed Persistent Machine 
        This layer stays still while the website content trills over it.
      */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center p-12">
         {/* Jade Radial Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] aspect-square bg-emerald-500/10 blur-[200px] rounded-full opacity-60" />
         
         <div className="w-full max-w-[1200px] aspect-video relative">
            <CanvasScrubber 
              progress={smoothProgress} 
              videoSrc="/assets/videos/homevideo.mp4" 
              onDuration={setVideoDuration} 
            />
         </div>
      </div>

      <div ref={containerRef} className="relative z-10 h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar">
        
        {/* Minimal Floating Header */}
        <nav className="fixed top-0 left-0 right-0 z-[100] px-8 lg:px-20 py-12 flex items-center justify-between pointer-events-none">
           <div className="flex items-center gap-4 pointer-events-auto cursor-pointer group">
              <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform">
                <Zap className="w-6 h-6 fill-black" />
              </div>
              <span className="text-2xl font-black uppercase tracking-tighter text-white">Neuralyn</span>
           </div>

           <div className="flex items-center gap-8 pointer-events-auto">
              <button onClick={toggleCart} className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center relative hover:bg-emerald-500/20 transition-colors">
                <ShoppingBag className="w-4 h-4" />
                {getTotalItems() > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-[10px] font-black flex items-center justify-center">{getTotalItems()}</span>}
              </button>
              {isAuthenticated ? (
                <button onClick={() => { logout(); navigate('/login'); }} className="px-8 py-3 rounded-full bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-red-500/10 hover:text-red-400 transition-all">Protocol Exit</button>
              ) : (
                <Link to="/login" className="px-10 py-3 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-2xl">Connect</Link>
              )}
           </div>
        </nav>

        {/* SECTION 1: HERO - THE REVEAL */}
        <section className="h-screen w-full snap-start flex flex-col items-center justify-center relative px-6 text-center">
            {/* Minimal overlays so machine is clear */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5, delay: 0.5 }}
               className="space-y-4"
            >
               <h1 className="text-[14vw] font-black uppercase tracking-tight leading-none mix-blend-overlay">
                  NEXUS
               </h1>
               <div className="flex items-center justify-center gap-6">
                  <div className="h-px w-24 bg-emerald-500/30" />
                  <span className="text-xs font-black uppercase tracking-[0.8em] text-emerald-400">Elite Grade Hardware</span>
                  <div className="h-px w-24 bg-emerald-500/30" />
               </div>
            </motion.div>

            {/* Hint to scroll */}
            <div className="absolute bottom-16 flex flex-col items-center gap-4 opacity-20">
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll into the machine</span>
               <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
            </div>
        </section>

        {/* SECTION 2: GHOST BENTO (TRANSPARENT DISCOVERY) */}
        <section className="min-h-screen w-full snap-start py-40 px-8 lg:px-24">
           {/* All containers are transparent so machine behind is visible */}
           <div className="max-w-7xl mx-auto">
              <div className="mb-32">
                 <h2 className="text-6xl lg:text-[9rem] font-black uppercase tracking-tighter text-white/50 leading-none">
                    Hardware <br/> <span className="text-emerald-500">Integrity.</span>
                 </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-[450px]">
                 <GhostBento 
                    delay={0.1}
                    icon={Cpu} 
                    title="Liquid Protocol" 
                    desc="Maximum thermal efficiency through custom emerald-liquid cooling loops. Designed for the infinite loop."
                 />
                 <GhostBento 
                    className="md:col-span-1 lg:col-span-1"
                    delay={0.2}
                    icon={ShieldCheck} 
                    title="Biometric Core" 
                    desc="Zero-compromise security layers verified directly into the hardware DNA."
                 />
                 <GhostBento 
                    className="md:col-span-2 lg:col-span-1"
                    delay={0.3}
                    icon={Database} 
                    title="Neural Cloud" 
                    desc="Distributed data retrieval optimized for real-time neural processing nodes."
                 />
                 <GhostBento 
                    className="md:col-span-2 lg:col-span-2"
                    delay={0.4}
                    icon={Box} 
                    title="Premium Obsidian" 
                    desc="Housed in obsidian-coated high-density chassis for absolute signal protection and durability."
                 />
                 <GhostBento 
                    delay={0.5}
                    icon={Terminal} 
                    title="Direct Uplink" 
                    desc="Low-latency command execution via our bespoke cloud-terminal suites."
                 />
              </div>
           </div>
        </section>

        {/* SECTION 3: FINAL CALL */}
        <section className="h-screen w-full snap-end flex flex-col items-center justify-center p-8 bg-gradient-to-t from-black via-transparent to-transparent">
            <div className="z-10 text-center space-y-20">
               <div className="space-y-4">
                  <h3 className="text-7xl lg:text-[14rem] font-black uppercase tracking-tighter text-white leading-none">
                     OWN THE <br/> <span className="text-emerald-500">FUTURE.</span>
                  </h3>
                  <p className="text-sm font-black tracking-[0.6em] uppercase text-white/20">Protocol Access Stage v3.0</p>
               </div>
               
               <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                  <button className="px-24 py-10 bg-white text-emerald-950 rounded-full font-black uppercase tracking-[0.4em] text-sm hover:scale-110 active:scale-95 transition-all shadow-2xl">
                     Initialize
                  </button>
               </div>
            </div>

            <footer className="absolute bottom-12 w-full px-8 lg:px-24 flex flex-col md:flex-row items-center justify-between text-[10px] font-black uppercase tracking-[0.4em] text-emerald-900 gap-10">
               <div className="flex gap-12">
                  <span className="hover:text-emerald-400 cursor-pointer transition-colors">Security</span>
                  <span className="hover:text-emerald-400 cursor-pointer transition-colors">Hardware</span>
                  <span className="hover:text-emerald-400 cursor-pointer transition-colors">Infrastructure</span>
               </div>
               <span>© 2026 Neuralyn Intelligence Platform</span>
            </footer>
        </section>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
