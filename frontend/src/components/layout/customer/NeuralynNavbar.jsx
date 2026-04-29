import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Zap, 
  ShoppingBag, 
  LogOut, 
  Menu as MenuIcon, 
  X, 
  Home, 
  Package, 
  Users, 
  LifeBuoy, 
  Newspaper,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../../../store/cart-store';
import { useAuthStore } from '../../../store/authStore';
import AuthModal from '../../auth/AuthModal';

export default function NeuralynNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleCart, getTotalItems } = useCartStore();
  const { isAuthenticated, logout } = useAuthStore();
  const openAuthModal = useAuthStore((state) => state.openAuthModal);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Trang chủ', path: '/', icon: Home },
    { name: 'Sản phẩm', path: '/catalog', icon: Package },
    { name: 'Về chúng tôi', path: '/about', icon: Users },
    { name: 'Dịch vụ', path: '/support', icon: LifeBuoy },
    { name: 'Tin tức', path: '/blog', icon: Newspaper }
  ];

  const isActive = (path) => {
    if (path === '/catalog' && (location.pathname === '/catalog' || location.pathname.startsWith('/product/'))) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-3 md:py-4 flex items-center justify-between transition-all duration-500 backdrop-blur-2xl bg-[#4981cf]/85 border-b border-white/10 shadow-lg">
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => { navigate('/'); window.scrollTo({top:0, behavior:'smooth'}); }}>
          <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-[#cadaee] text-[#4981cf] flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500">
            <Zap className="w-5 h-5 md:w-6 md:h-6 fill-current" />
          </div>
          <span className="text-lg md:text-xl font-black tracking-tighter text-white italic uppercase font-heading">DUONGDIY<span className="text-[#cadaee]">.</span></span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isActive(item.path) ? 'text-[#cadaee]' : 'text-white/70 hover:text-white'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={toggleCart} 
            className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center relative hover:bg-white/20 transition-all text-white"
          >
            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 md:w-4.5 md:h-4.5 rounded-full bg-[#cadaee] text-[#4981cf] text-[8px] md:text-[9px] font-black flex items-center justify-center border-2 border-[#4981cf]">
                {getTotalItems()}
              </span>
            )}
          </button>

          {/* Desktop Auth Button */}
          <div className="hidden sm:block">
            {isAuthenticated ? (
              <button 
                onClick={() => setIsLogoutModalOpen(true)} 
                className="px-5 md:px-7 py-2 md:py-3 rounded-full bg-white text-[#4981cf] text-[9px] font-black uppercase tracking-widest shadow-lg hover:bg-[#cadaee] transition-all"
              >
                Đăng xuất
              </button>
            ) : (
              <button 
                onClick={() => openAuthModal('login')}
                className="px-5 md:px-7 py-2 md:py-3 rounded-full bg-white text-[#4981cf] text-[9px] font-black uppercase tracking-widest shadow-lg hover:bg-[#cadaee] transition-all"
              >
                Đăng nhập
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center text-white bg-white/10 rounded-xl border border-white/20 active:scale-90 transition-all"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Refined & Compact */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-[75%] max-w-[300px] h-full bg-[#1a365d] shadow-2xl flex flex-col"
            >
              {/* Drawer Header with Close Button */}
              <div className="p-6 flex items-center justify-between border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                   <Zap className="w-4 h-4 text-[#cadaee]" />
                   <span className="text-[11px] font-black text-white uppercase tracking-widest">Danh mục</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 active:scale-90 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 flex flex-col gap-2 flex-1 overflow-y-auto">
                <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 pl-4">Menu điều hướng</span>
                {navLinks.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 text-[13px] font-black uppercase tracking-widest p-4 rounded-2xl transition-all ${isActive(item.path) ? 'bg-[#4981cf] text-white shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                  >
                    <item.icon className="w-4 h-4 opacity-70" />
                    {item.name}
                  </Link>
                ))}

                <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-2 pl-4">Tài khoản</span>
                  {isAuthenticated ? (
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); setIsLogoutModalOpen(true); }}
                      className="flex items-center gap-4 w-full p-4 rounded-2xl bg-red-500/10 text-red-400 font-black text-[11px] uppercase tracking-widest hover:bg-red-500/20 transition-all"
                    >
                      <LogOut className="w-4 h-4" /> ĐĂNG XUẤT
                    </button>
                  ) : (
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); openAuthModal('login'); }}
                      className="flex items-center gap-4 w-full p-4 rounded-2xl bg-[#4981cf] text-white font-black text-[11px] uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                    >
                      <User className="w-4 h-4" /> ĐĂNG NHẬP
                    </button>
                  )}
                </div>
              </div>

              <div className="p-8 text-center bg-white/5 mt-auto">
                 <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-sm font-black text-white/40 italic">DUONGDIY<span className="text-[#4981cf]">.</span></span>
                 </div>
                 <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">© 2026 PREMIUM SYSTEMS</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Logout Modal */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100"
            >
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <LogOut className="w-7 h-7 ml-1" />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Đăng xuất tài khoản?</h3>
                <p className="text-slate-500 font-medium text-sm">Bạn có chắc chắn muốn đăng xuất khỏi hệ thống DUONGDIY không?</p>
                
                <div className="flex gap-4 pt-6">
                  <button 
                    onClick={() => setIsLogoutModalOpen(false)}
                    className="flex-1 py-3.5 rounded-xl border-2 border-slate-100 text-slate-600 font-bold hover:bg-slate-50 transition-colors active:scale-95"
                  >
                    Hủy bỏ
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex-1 py-3.5 rounded-xl bg-red-500 text-white font-bold shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all active:scale-95"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AuthModal />
    </>
  );
}
