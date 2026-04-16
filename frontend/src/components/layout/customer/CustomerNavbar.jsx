import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ShoppingCart, 
  Menu, 
  X,
  Sun,
  Moon,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function CustomerNavbar() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    if (document.documentElement.classList.contains('dark')) setIsDark(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-8 px-6">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        className={cn(
          "flex items-center justify-between px-8 py-4 rounded-full border border-white/20 backdrop-blur-2xl transition-all duration-500",
          scrolled 
            ? "w-full max-w-4xl bg-white/50 dark:bg-black/50 shadow-3d-soft" 
            : "w-full max-w-7xl bg-white/20 dark:bg-black/20"
        )}
      >
        {/* Logo */}
        <NavLink to="/shop" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-portfolio-rose to-portfolio-orange flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform">
            <Zap className="text-white w-6 h-6 fill-white" />
          </div>
          <span className="text-xl font-black text-slate-800 dark:text-white tracking-tighter">TC STUDIO</span>
        </NavLink>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-10 font-bold text-sm tracking-widest text-slate-600 dark:text-gray-300 uppercase">
          <NavLink to="/shop" className="hover:text-portfolio-rose transition-colors">Home</NavLink>
          <NavLink to="/shop/products" className="hover:text-portfolio-rose transition-colors">Featured</NavLink>
          <NavLink to="/shop/categories" className="hover:text-portfolio-rose transition-colors">Catalog</NavLink>
          <a href="#footer" className="hover:text-portfolio-rose transition-colors">Contact</a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-white/40 dark:bg-white/10 flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-portfolio-purple" />}
          </button>
          
          <button className="relative w-10 h-10 rounded-full bg-white/40 dark:bg-white/10 flex items-center justify-center hover:scale-110 transition-transform shadow-sm group">
            <ShoppingCart className="w-5 h-5 text-slate-700 dark:text-gray-200" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-portfolio-rose text-[10px] font-black text-white rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-full font-black text-xs tracking-widest hover:scale-105 transition-transform shadow-lg">
            SIGN UP
          </button>
        </div>
      </motion.div>
    </nav>
  );
}
