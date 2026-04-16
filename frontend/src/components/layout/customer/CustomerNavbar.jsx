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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "flex items-center justify-between px-8 py-3 rounded-full border transition-all duration-700",
          scrolled 
            ? "w-full max-w-4xl bg-white/80 backdrop-blur-3xl border-slate-200 shadow-3d-soft" 
            : "w-full max-w-7xl bg-white/40 backdrop-blur-xl border-white/20"
        )}
      >
        {/* Logo */}
        <NavLink to="/home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-shopper-emerald flex items-center justify-center shadow-lg group-hover:rotate-12 transition-all">
            <Zap className="text-white w-6 h-6 fill-white" />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tighter uppercase">TC Studio</span>
        </NavLink>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-10 font-bold text-[11px] tracking-[0.2em] text-slate-500 uppercase">
          <NavLink to="/home" className="hover:text-shopper-emerald transition-colors">Home</NavLink>
          <NavLink to="/catalog" className="hover:text-shopper-emerald transition-colors">Catalog</NavLink>
          <NavLink to="/shop/exclusives" className="hover:text-shopper-emerald transition-colors">Exclusives</NavLink>
          <a href="#footer" className="hover:text-shopper-emerald transition-colors">Contact</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="relative w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:scale-110 transition-transform group">
            <ShoppingCart className="w-5 h-5 text-slate-700" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-shopper-emerald text-[9px] font-black text-white rounded-full flex items-center justify-center shadow-sm">
              0
            </span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3 bg-slate-100 rounded-full p-1 pl-4">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                {user?.username}
              </span>
              <NavLink 
                to="/shop/app/me" 
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:text-shopper-emerald transition-colors"
                title="Account"
              >
                <User className="w-4 h-4" />
              </NavLink>
              <button 
                onClick={() => { logout(); navigate('/home'); }}
                className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500/20 transition-all font-black"
                title="Logout"
              >
                <LogOutIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink 
                to="/login" 
                className="px-4 py-2 text-[10px] font-black text-slate-500 hover:text-shopper-emerald tracking-widest"
              >
                LOGIN
              </NavLink>
              <NavLink 
                to="/register" 
                className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest hover:bg-shopper-emerald transition-colors shadow-lg shadow-slate-200"
              >
                JOIN
              </NavLink>
            </div>
          )}
        </div>
      </motion.div>
    </nav>
  );
}
