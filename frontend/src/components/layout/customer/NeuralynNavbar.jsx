import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Zap, ShoppingBag, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../../../store/cart-store';
import { useAuthStore } from '../../../store/authStore';

export default function NeuralynNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleCart, getTotalItems } = useCartStore();
  const { isAuthenticated, logout } = useAuthStore();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/catalog' && (location.pathname === '/catalog' || location.pathname.startsWith('/product/'))) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between transition-all duration-500 backdrop-blur-2xl bg-white/40 border-b border-white/20">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { navigate('/'); window.scrollTo({top:0, behavior:'smooth'}); }}>
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500">
          <Zap className="w-6 h-6 fill-white" />
        </div>
        <span className="text-2xl font-black tracking-tighter text-slate-900 italic">DUONGDIY<span className="text-indigo-600">.</span></span>
      </div>

      <div className="hidden lg:flex items-center gap-10">
        <Link 
          to="/" 
          className={`text-xs font-black uppercase tracking-[0.2em] transition-colors ${location.pathname === '/' ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
        >
          Trang chủ
        </Link>
        {[
          { name: 'Sản phẩm', path: '/catalog' },
          { name: 'Về chúng tôi', path: '/about' },
          { name: 'Dịch vụ', path: '/support' },
          { name: 'Tin tức', path: '/blog' }
        ].map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            className={`text-xs font-black uppercase tracking-[0.2em] transition-colors ${isActive(item.path) ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleCart} 
          className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center relative hover:shadow-xl transition-all text-slate-700"
        >
          <ShoppingBag className="w-5 h-5" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-white">
              {getTotalItems()}
            </span>
          )}
        </button>
        {isAuthenticated ? (
          <button 
            onClick={() => setIsLogoutModalOpen(true)} 
            className="px-8 py-3.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-indigo-600 transition-all"
          >
            Đăng xuất
          </button>
        ) : (
          <Link 
            to="/login" 
            className="px-8 py-3.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-indigo-600 transition-all"
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </nav>

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
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
          >
            <div className="p-10 text-center space-y-6">
              <div className="w-20 h-20 bg-red-50/80 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <LogOut className="w-8 h-8 ml-1" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Đăng xuất tài khoản?</h3>
              <p className="text-slate-500 font-medium px-4">Bạn có chắc chắn muốn đăng xuất khỏi hệ thống AETHER không?</p>
              
              <div className="flex gap-4 pt-6">
                <button 
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="flex-1 py-4 rounded-2xl border-2 border-slate-100 text-slate-600 font-bold hover:bg-slate-50 transition-colors active:scale-95"
                >
                  Hủy bỏ
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex-1 py-4 rounded-2xl bg-red-500 text-white font-bold shadow-lg shadow-red-500/30 hover:bg-red-600 hover:shadow-red-500/40 transition-all active:scale-95"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}
