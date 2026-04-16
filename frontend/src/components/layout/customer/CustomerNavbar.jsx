import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Menu, 
  X,
  Smartphone,
  Laptop,
  Headphones,
  Cpu,
  Sun,
  Moon
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { icon: Laptop, label: 'Laptops', path: '/shop/laptops' },
  { icon: Smartphone, label: 'Phones', path: '/shop/phones' },
  { icon: Headphones, label: 'Audio', path: '/shop/audio' },
  { icon: Cpu, label: 'Parts', path: '/shop/parts' },
];

export default function CustomerNavbar() {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      {/* Glassmorphic Container - Rose Theme */}
      <div className="max-w-7xl mx-auto bg-background-light/40 dark:bg-background-dark/40 backdrop-blur-xl rounded-[2.5rem] border border-white/20 dark:border-white/5 shadow-neumo-md px-8 py-4 flex items-center justify-between transition-all duration-300">
        
        {/* Logo */}
        <NavLink to="/shop" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-rose-500 flex items-center justify-center shadow-neumo-sm group-hover:scale-110 transition-transform">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">TechChain</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => cn(
                "px-5 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all duration-300",
                isActive 
                  ? "bg-rose-500 text-white shadow-neumo-sm" 
                  : "text-slate-500 hover:text-rose-500 hover:bg-rose-500/5 dark:hover:bg-rose-500/10"
              )}
            >
              <link.icon className="w-4 h-4" />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center relative group max-w-[200px]">
            <input 
              type="text" 
              placeholder="Search tech..." 
              className="w-full bg-slate-200/50 dark:bg-black/20 backdrop-blur-md pl-10 pr-4 py-2 rounded-2xl border border-white/20 shadow-neumo-inner focus:outline-none focus:ring-2 focus:ring-rose-500/30 text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="w-10 h-10 rounded-xl bg-white/20 dark:bg-black/20 flex items-center justify-center border border-white/10 shadow-neumo-sm hover:scale-105 active:scale-95 transition-all">
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-rose-500" />}
            </button>
            
            <button className="relative w-10 h-10 rounded-xl bg-white/20 dark:bg-black/20 flex items-center justify-center border border-white/10 shadow-neumo-sm hover:scale-105 active:scale-95 transition-all group">
              <ShoppingCart className="w-5 h-5 text-slate-500 dark:text-slate-300 group-hover:text-rose-500 transition-colors" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-[10px] font-black text-white rounded-full flex items-center justify-center border-2 border-background-light shadow-sm">
                0
              </span>
            </button>

            <button className="w-10 h-10 rounded-[0.9rem] bg-rose-500 p-[2px] shadow-neumo-sm transform hover:rotate-6 transition-transform cursor-pointer">
              <div className="w-full h-full rounded-[0.8rem] bg-white overflow-hidden p-[2px]">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Customer" alt="User" className="w-full h-full rounded-md" />
              </div>
            </button>
          </div>

          <button 
            className="lg:hidden p-2 text-slate-800 dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
  );
}
