import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
import { useAuthStore } from '../../../store/authStore';
import { User, LogOut as LogOutIcon } from 'lucide-react';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function CustomerNavbar() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

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

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <NavLink 
                to="/account" 
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-white/10 hover:bg-white/60 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-portfolio-rose/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-portfolio-rose" />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-gray-200 hidden lg:block uppercase tracking-wider">
                  {user?.username}
                </span>
              </NavLink>
              <button 
                onClick={() => { logout(); navigate('/shop'); }}
                className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-all text-red-500 group"
                title="Logout"
              >
                <LogOutIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
              <NavLink 
                to="/login" 
                className="px-4 py-2.5 text-slate-600 dark:text-gray-400 hover:text-portfolio-rose transition-colors"
              >
                LOGIN
              </NavLink>
              <NavLink 
                to="/register" 
                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-full hover:scale-105 transition-transform shadow-lg"
              >
                SIGN UP
              </NavLink>
            </div>
          )}
        </div>
      </motion.div>
    </nav>
  );
}
