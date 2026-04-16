import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ChevronDown, 
  ArrowRight, 
  Zap, 
  Globe, 
  Cpu, 
  Lock, 
  ShieldCheck, 
  BarChart3, 
  Search, 
  Languages, 
  Sun, 
  Moon,
  Laptop,
  Smartphone,
  Watch,
  Headphones,
  ShoppingBag,
  User
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';
import useCartStore from '../../store/cart-store';
import { useAuthStore } from '../../store/authStore';
import { Link, useNavigate } from 'react-router-dom';

// Fonts
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "@fontsource/instrument-serif/400-italic.css";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Reusable Floating Sphere Component
const FloatingBall = ({ color, size, top, left, delay = 0 }) => (
  <motion.div
    initial={{ x: 0, y: 0 }}
    animate={{ 
      x: [0, 40, -40, 0],
      y: [0, -30, 30, 0]
    }}
    transition={{ 
      duration: 8 + Math.random() * 4, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay: delay
    }}
    className="absolute pointer-events-none rounded-full blur-[40px] opacity-20 mix-blend-screen"
    style={{
      width: size,
      height: size,
      top: top,
      left: left,
      background: color,
      boxShadow: `0 0 80px ${color}`
    }}
  />
);

const MegaMenu = ({ isOpen }) => {
  const categories = [
    { title: 'Laptop', icon: Laptop, items: ['Gaming', 'Office', 'Workstation', 'Student'] },
    { title: 'Mobile', icon: Smartphone, items: ['iPhone', 'Android', 'Tablets', 'Foldables'] },
    { title: 'Accessories', icon: Headphones, items: ['Headphones', 'Keyboards', 'Mice', 'Chargers'] },
    { title: 'Wearables', icon: Watch, items: ['Smartwatch', 'Fitness Tracker', 'Smart Ring'] },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          className="absolute top-full left-0 right-0 mt-2 p-8 bg-white/10 dark:bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl z-50 grid grid-cols-4 gap-8"
        >
          {categories.map((cat) => (
            <div key={cat.title} className="space-y-4">
              <div className="flex items-center gap-2 text-primary-light">
                <cat.icon className="w-5 h-5 text-accent" />
                <h4 className="font-bold uppercase tracking-widest text-xs text-white">{cat.title}</h4>
              </div>
              <ul className="space-y-2">
                {cat.items.map(item => (
                  <li key={item} className="text-sm text-white/60 hover:text-white cursor-pointer transition-colors">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="p-8 rounded-[2rem] bg-white/5 backdrop-blur-3xl border border-white/10 flex flex-col gap-4"
  >
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-transparent flex items-center justify-center">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-xl font-bold text-white">{title}</h3>
    <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const BottomProductCard = ({ image, title, price, delay, t }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    className="w-full bg-white/10 backdrop-blur-2xl rounded-[2.5rem] p-4 border border-white/20 relative group overflow-hidden"
  >
    <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-black/40 mb-4">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    </div>
    <div className="flex items-center justify-between px-2 mb-2">
      <div>
        <h4 className="text-white font-bold">{title}</h4>
        <p className="text-white/50 text-xs">Premium Device</p>
      </div>
      <div className="bg-white/10 rounded-full px-3 py-1 text-xs font-black text-white">$ {price}</div>
    </div>
    <button 
      onClick={() => addItem({ id: Math.random(), name: title, slug: title.toLowerCase().replace(/ /g, '-'), thumbnailUrl: image }, { id: Math.random(), price: parseFloat(price.replace(/,/g, '')), sku: 'SKU' })}
      className="w-full bg-white text-black py-3 rounded-full text-sm font-bold mt-2 hover:bg-white/90 transition-colors"
    >
      {t('products.order')}
    </button>
  </motion.div>
);

export default function NeuralynHome() {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const containerRef = useRef(null);
  const { toggleCart, getTotalItems, addItem } = useCartStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const nextLng = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(nextLng);
  };

  const navLinks = [
    { key: 'marketplace', hasMega: true },
    { key: 'stats' },
    { key: 'resources' },
    { key: 'create' }
  ];

  return (
    <div className={cn(
      "transition-colors duration-700 selection:bg-white selection:text-black min-h-screen relative p-4 md:p-6",
      isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-slate-50 text-slate-900"
    )}>
      
      {/* Visual Frame */}
      <div className="layout-frame">
        <div className="frame-border" />
      </div>
      
      {/* Background Fixed Video */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover opacity-30 brightness-50">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" type="video/mp4" />
        </video>
        <div className={cn(
          "absolute inset-0 transition-opacity duration-700",
          isDarkMode ? "bg-gradient-to-b from-transparent via-black/20 to-black" : "bg-white/70"
        )} />
      </div>

      <div 
        ref={containerRef}
        className="relative z-10 h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth hide-scrollbar"
      >
        
        {/* Advanced Header */}
        <nav className={cn(
          "fixed top-0 left-0 right-0 z-[100] px-8 md:px-28 py-6 flex items-center justify-between transition-all border-b",
          isDarkMode ? "bg-accent/20 border-accent/30 backdrop-blur-md" : "bg-white/50 border-black/5 backdrop-blur-md"
        )}>
          {/* Left: Logo & Nav */}
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-colors", isDarkMode ? "bg-white" : "bg-black")}>
                <span className={cn("font-black text-xs", isDarkMode ? "text-black" : "text-white")}>N.</span>
              </div>
              <span className="text-lg font-black tracking-tight uppercase">Neuralyn</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <div 
                  key={link.key} 
                  className="relative"
                  onMouseEnter={() => link.hasMega && setIsMegaMenuOpen(true)}
                  onMouseLeave={() => link.hasMega && setIsMegaMenuOpen(false)}
                >
                  <a href="#" className={cn(
                    "text-sm font-bold flex items-center gap-1 transition-colors",
                    isDarkMode ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black"
                  )}>
                    {t(`nav.${link.key}`)}
                    {link.hasMega && <ChevronDown className="w-3 h-3" />}
                  </a>
                  {link.hasMega && <MegaMenu isOpen={isMegaMenuOpen} />}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Search, Theme, Lang, CTA */}
          <div className="flex items-center gap-4 md:gap-8">
            {/* Smart Search */}
            <div className="relative hidden md:block">
              <motion.div 
                animate={{ width: showSearch ? 240 : 40 }}
                className={cn(
                  "h-10 rounded-full flex items-center px-3 gap-2 overflow-hidden transition-all",
                  isDarkMode ? "bg-white/10 border-white/10" : "bg-black/5 border-black/10"
                )}
              >
                <Search 
                  className="w-4 h-4 cursor-pointer flex-shrink-0" 
                  onClick={() => setShowSearch(!showSearch)} 
                />
                <input 
                  type="text" 
                  placeholder="Search products..."
                  className="bg-transparent border-none outline-none text-sm w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>
              {searchQuery && showSearch && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-2xl border border-white/10">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2">Suggestions</p>
                  <div className="space-y-2">
                    {['iPhone 15 Pro', 'Vision Pro', 'Macbook Pro M3'].map(s => (
                      <div key={s} className="text-sm hover:text-accent cursor-pointer flex items-center justify-between group">
                        {s} <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mini Cart Toggle */}
            <button 
              onClick={toggleCart}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors relative"
            >
              <ShoppingBag className="w-4 h-4" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-[8px] font-black text-black flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors gap-1"
            >
              <Languages className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase">{i18n.language}</span>
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/profile"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  <User className="w-3 h-3" /> {user?.username}
                </Link>
                <button 
                  onClick={() => { logout(); navigate('/shop'); }}
                  className="px-4 py-2 text-xs font-black uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-4">
                <Link to="/login" className="px-4 py-2 text-sm font-bold text-white/60 hover:text-white transition-colors">
                  {t('nav.login')}
                </Link>
                <Link 
                  to="/register" 
                  className={cn(
                    "px-6 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95",
                    isDarkMode ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "bg-black text-white shadow-[0_0_20px_rgba(0,0,0,0.1)]"
                  )}
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* SLIDE 1: HERO */}
        <section className="h-screen w-full snap-start flex flex-col items-center justify-center relative px-6 overflow-hidden pt-20">
          <FloatingBall color="#ff0080" size="400px" top="-10%" left="-5%" />
          <FloatingBall color="#7000ff" size="300px" top="60%" left="80%" delay={2} />
          <FloatingBall color="#00ffcc" size="250px" top="20%" left="30%" delay={1} />

          <div className="relative z-20 text-center flex flex-col items-center max-w-4xl pt-12">
            <motion.h1 
              key={i18n.language}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-6xl md:text-[5.5rem] font-black leading-[1] mb-8 tracking-[-0.04em]"
            >
              {t('hero.title')} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FACC15] to-accent/90">{t('hero.accent')}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={cn("text-lg md:text-xl font-medium max-w-2xl mb-12", isDarkMode ? "text-white/60" : "text-black/60")}
            >
              {t('hero.subtitle')}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <button className="bg-gradient-to-r from-[#F97316] to-[#A855F7] px-10 py-5 rounded-full text-lg font-black shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:scale-105 transition-transform flex items-center gap-3 text-white">
                {t('hero.cta')} <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><ArrowRight className="w-4 h-4"/></div>
              </button>
            </motion.div>
          </div>

          {/* Bottom Cards Section */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <BottomProductCard t={t} title="Apple Vision Pro" price="3,499" image="https://images.unsplash.com/photo-1707053591461-8274f88062e7?auto=format&fit=crop&q=80&w=600" delay={0.6} />
            <BottomProductCard t={t} title="MacBook Air M3" price="1,099" image="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600" delay={0.7} />
            <BottomProductCard t={t} title="iPhone 15 Pro" price="999" image="https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=600" delay={0.8} />
          </div>
        </section>

        {/* SLIDE 2: FUTURE ECOSYSTEM */}
        <section className="h-screen w-full snap-start relative flex flex-col items-center justify-center px-8 md:px-28">
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-accent font-black uppercase tracking-widest text-sm">Next Generation</span>
              <h2 className="text-5xl md:text-7xl font-black leading-tight">Advanced <br/> Ecosystem.</h2>
              <p className={cn("text-xl leading-relaxed max-w-xl", isDarkMode ? "text-white/50" : "text-black/50")}>
                We believe in the power of seamless integration. Our platform connects your devices, your data, and your life with absolute precision.
              </p>
              <div className="flex gap-6">
                <div className="flex flex-col">
                  <span className="text-4xl font-black">250k+</span>
                  <span className={cn("text-sm font-bold", isDarkMode ? "text-white/40" : "text-black/40")}>Active Users</span>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="flex flex-col">
                  <span className="text-4xl font-black">1.2M</span>
                  <span className={cn("text-sm font-bold", isDarkMode ? "text-white/40" : "text-black/40")}>Gadgets Sold</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <FeatureCard icon={Zap} title="Hyper Speed" desc="Instant sync across all your primary devices." />
              <FeatureCard icon={Lock} title="Iron Vault" desc="Secured with decentralized encryption." />
              <FeatureCard icon={Globe} title="Global Sync" desc="Available in 120+ countries worldwide." />
              <FeatureCard icon={Cpu} title="AI Engine" desc="Predictive analytics for your daily usage." />
            </div>
          </div>
        </section>

        {/* SLIDE 3: GLOBAL ANALYTICS */}
        <section className="h-screen w-full snap-start relative flex flex-col items-center justify-center p-8 overflow-hidden">
          <FloatingBall color="#3b82f6" size="500px" top="20%" left="60%" />
          <div className="z-10 text-center space-y-8 mb-20">
            <h2 className="text-5xl md:text-8xl font-black italic font-serif">Data in Motion</h2>
            <p className={cn("text-xl max-w-2xl mx-auto", isDarkMode ? "text-white/60" : "text-black/60")}>
              Monitor your infrastructure with deep intelligence and real-time insights that actually matter.
            </p>
          </div>
          
          <div className="w-full max-w-7xl aspect-[21/9] bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent absolute top-1/4" />
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent absolute top-1/2" />
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent absolute top-3/4" />
              
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-[80%] h-[60%] border-2 border-white/10 rounded-full flex items-center justify-center"
              >
                <div className="w-[60%] h-[60%] border-2 border-white/20 rounded-full flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.5)]">
                    <BarChart3 className="text-black w-8 h-8" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SLIDE 4: CALL TO ACTION */}
        <section className={cn("h-screen w-full snap-start relative flex flex-col items-center justify-center p-8 transition-colors", isDarkMode ? "bg-black" : "bg-white")}>
          <div className="text-center space-y-12 max-w-4xl">
            <h2 className="text-7xl md:text-[9rem] font-black leading-none uppercase tracking-tighter">Ready <br/> to Join?</h2>
            <p className={cn("text-2xl font-medium", isDarkMode ? "text-white/40" : "text-black/40")}>Join 50,000+ pioneers building the future of tech commerce.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button className={cn("px-12 py-6 rounded-2xl text-xl font-black hover:scale-105 transition-transform", isDarkMode ? "bg-white text-black" : "bg-black text-white")}>Create Account</button>
              <button className="px-12 py-6 border border-current rounded-2xl text-xl font-black hover:bg-current hover:text-white transition-all">Learn More</button>
            </div>
          </div>

          <footer className={cn("absolute bottom-10 w-full px-8 md:px-28 flex flex-col md:flex-row items-center justify-between gap-8 border-t pt-10", isDarkMode ? "border-white/10" : "border-black/10")}>
            <div className="flex items-center gap-2">
              <div className={cn("w-6 h-6 rounded flex items-center justify-center", isDarkMode ? "bg-white" : "bg-black")}>
                <span className={cn("font-black text-[8px]", isDarkMode ? "text-black" : "text-white")}>N.</span>
              </div>
              <span className="text-sm font-black uppercase">Neuralyn</span>
            </div>
            <div className={cn("flex gap-10 text-xs font-bold uppercase tracking-widest", isDarkMode ? "text-white/40" : "text-black/40")}>
              <a href="#">Privacy</a>
              <a href="#">Security</a>
              <a href="#">Support</a>
              <a href="#">API</a>
            </div>
            <div className={cn("text-xs font-medium", isDarkMode ? "text-white/20" : "text-black/20")}>© 2026 NEURALYN INTELLIGENCE CORP. ALL RIGHTS RESERVED.</div>
          </footer>
        </section>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
