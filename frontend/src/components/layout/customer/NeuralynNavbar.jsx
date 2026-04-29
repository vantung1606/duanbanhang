import { useState, useRef, useEffect } from 'react';
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
  User,
  ChevronDown,
  Settings,
  Key,
  Heart,
  Bell,
  Truck,
  UserCircle,
  MessageSquare,
  History,
  ShieldCheck,
  Star,
  Settings2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../../../store/cart-store';
import { useAuthStore } from '../../../store/authStore';
import AuthModal from '../../auth/AuthModal';
import ProfileModal from '../../customer/ProfileModal';

export default function NeuralynNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleCart, getTotalItems } = useCartStore();
  const { isAuthenticated, logout, user } = useAuthStore();
  const openAuthModal = useAuthStore((state) => state.openAuthModal);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileModalTab, setProfileModalTab] = useState('overview');
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  const dropdownRef = useRef(null);
  const wishlistRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Trang chủ', path: '/', icon: Home },
    { name: 'Sản phẩm', path: '/catalog', icon: Package },
    { name: 'Về chúng tôi', path: '/about', icon: Users },
    { name: 'Dịch vụ', path: '/support', icon: LifeBuoy },
    { name: 'Tin tức', path: '/blog', icon: Newspaper },
    { name: 'Liên hệ', path: '/contact', icon: MessageSquare }
  ];

  const isActive = (path) => {
    if (path === '/' && (location.pathname === '/home' || location.pathname === '/')) return true;
    if (path === '/catalog' && (location.pathname === '/catalog' || location.pathname.startsWith('/product/'))) {
      return true;
    }
    return location.pathname === path;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
        setIsWishlistOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Text and icon color based on scroll and page
  const isLightPage = !isHomePage && !isScrolled;
  const navTextColor = isLightPage ? 'text-slate-900' : 'text-white';
  const navIconColor = isLightPage ? 'text-slate-900' : 'text-white';
  const navLinkColor = isLightPage ? 'text-slate-600' : 'text-white/70';
  const logoTextColor = isLightPage ? 'text-slate-900' : 'text-white';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-3 md:py-4 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'backdrop-blur-2xl bg-[#4981cf]/70 py-3 shadow-lg border-b border-white/10' : 'bg-transparent py-5'}`}>
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => { navigate('/'); window.scrollTo({top:0, behavior:'smooth'}); }}>
          <div className={`w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl ${isLightPage ? 'bg-slate-900 text-white' : 'bg-[#cadaee] text-[#4981cf]'} flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500`}>
            <Zap className="w-5 h-5 md:w-6 md:h-6 fill-current" />
          </div>
          <span className={`text-lg md:text-xl font-black tracking-tighter ${logoTextColor} italic uppercase font-heading transition-colors`}>DUONGDIY<span className="text-[#cadaee]">.</span></span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isActive(item.path) ? (isLightPage ? 'text-[#4981cf]' : 'text-[#cadaee]') : `${navLinkColor} hover:text-[#4981cf]`}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Wishlist Button */}
          <div className="relative" ref={wishlistRef}>
            <button 
              onClick={() => { setIsWishlistOpen(!isWishlistOpen); setIsNotificationsOpen(false); setIsUserDropdownOpen(false); }}
              className={`w-9 h-9 md:w-11 md:h-11 rounded-full ${isLightPage ? 'bg-slate-100 border-slate-200 text-slate-900 hover:bg-slate-200 shadow-sm' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'} border flex items-center justify-center relative transition-all group`}
            >
              <Heart className={`w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform ${isLightPage ? 'text-slate-900' : 'text-white'}`} />
              <span className="absolute -top-1 -right-1 w-4 h-4 md:w-4.5 md:h-4.5 rounded-full bg-[#cadaee] text-[#4981cf] text-[8px] md:text-[9px] font-black flex items-center justify-center border-2 border-white">
                2
              </span>
            </button>

            <AnimatePresence>
              {isWishlistOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden p-5"
                >
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-2">Yêu thích ({2})</h4>
                  <div className="space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="flex gap-3 group/item cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 overflow-hidden shrink-0">
                          <img src={`https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=100&auto=format&fit=crop`} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[11px] font-black text-slate-800 uppercase leading-tight">Đèn Moving Head {i}</p>
                          <p className="text-[10px] font-bold text-[#4981cf] mt-1">4,500k</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => { setProfileModalTab('wishlist'); setIsProfileModalOpen(true); setIsWishlistOpen(false); }} 
                    className="w-full mt-5 py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest"
                  >
                    Xem tất cả
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notification Button */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsWishlistOpen(false); setIsUserDropdownOpen(false); }}
              className={`w-9 h-9 md:w-11 md:h-11 rounded-full ${isLightPage ? 'bg-slate-100 border-slate-200 text-slate-900 hover:bg-slate-200 shadow-sm' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'} border flex items-center justify-center relative transition-all group`}
            >
              <Bell className={`w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform ${isLightPage ? 'text-slate-900' : 'text-white'}`} />
              <span className="absolute -top-1 -right-1 w-4 h-4 md:w-4.5 md:h-4.5 rounded-full bg-red-500 text-white text-[8px] md:text-[9px] font-black flex items-center justify-center border-2 border-white">
                3
              </span>
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden p-5"
                >
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-2">Thông báo ({3})</h4>
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-[#cadaee] text-[#4981cf] flex items-center justify-center shrink-0">
                          <Bell className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-slate-800 uppercase leading-tight">Khuyến mãi tháng 5 {i}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-1">Giảm ngay 20% cho đơn hàng tiếp theo...</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={toggleCart} 
            className={`w-9 h-9 md:w-11 md:h-11 rounded-full ${isLightPage ? 'bg-slate-100 border-slate-200 text-slate-900 hover:bg-slate-200 shadow-sm' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'} border flex items-center justify-center relative transition-all group`}
          >
            <ShoppingBag className={`w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform ${isLightPage ? 'text-slate-900' : 'text-white'}`} />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 md:w-4.5 md:h-4.5 rounded-full bg-[#cadaee] text-[#4981cf] text-[8px] md:text-[9px] font-black flex items-center justify-center border-2 border-white">
                {getTotalItems()}
              </span>
            )}
          </button>

          {/* Desktop Auth Section */}
          <div className="hidden sm:block">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className={`flex items-center gap-3 px-4 py-2 md:py-2.5 rounded-full ${isLightPage ? 'bg-slate-100 border-slate-200 text-slate-900 hover:bg-slate-200' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'} border transition-all`}
                >
                  <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full ${isLightPage ? 'bg-slate-900 text-white' : 'bg-[#cadaee] text-[#4981cf]'} flex items-center justify-center`}>
                    <User className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{user?.username || 'Tài khoản'}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden py-2"
                    >
                      <div className="px-4 py-3 border-b border-slate-50 mb-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Xin chào,</p>
                        <p className="text-sm font-black text-[#1a365d] truncate">{user?.username}</p>
                      </div>
                      
                      <button 
                        onClick={() => { setProfileModalTab('overview'); setIsProfileModalOpen(true); setIsUserDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-[#4981cf] transition-all"
                      >
                        <UserCircle className="w-4 h-4" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Hồ sơ cá nhân</span>
                      </button>

                      <button 
                        onClick={() => { setProfileModalTab('orders'); setIsProfileModalOpen(true); setIsUserDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-[#4981cf] transition-all"
                      >
                        <Truck className="w-4 h-4" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Theo dõi đơn hàng</span>
                      </button>
                      
                      <button 
                        onClick={() => { navigate('/change-password'); setIsUserDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-[#4981cf] transition-all"
                      >
                        <Key className="w-4 h-4" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Đổi mật khẩu</span>
                      </button>

                      {['ADMIN', 'MANAGER', 'STAFF'].includes(user?.role) && (
                        <button 
                          onClick={() => { navigate(`/${user.role.toLowerCase()}`); setIsUserDropdownOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-[#4981cf] hover:bg-[#4981cf]/5 transition-all"
                        >
                          <Settings className="w-4 h-4" />
                          <span className="text-[11px] font-black uppercase tracking-wider">Quản trị hệ thống</span>
                        </button>
                      )}
                      
                      <div className="border-t border-slate-50 mt-1 pt-1">
                        <button 
                          onClick={() => setIsLogoutModalOpen(true)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-all"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">Đăng xuất</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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

      {/* Mobile Menu Overlay */}
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
              className="absolute top-0 right-0 w-[85%] max-w-[320px] h-full bg-[#1a365d] shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                   <Zap className="w-4 h-4 text-[#cadaee]" />
                   <span className="text-[11px] font-black text-white uppercase tracking-widest">DuongDIY Menu</span>
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
                    <div className="space-y-2">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-2">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Đang đăng nhập:</p>
                        <p className="text-sm font-black text-white">{user?.username}</p>
                      </div>
                      <button 
                        onClick={() => { setIsMobileMenuOpen(false); setIsProfileModalOpen(true); }}
                        className="flex items-center gap-4 w-full p-4 rounded-2xl text-white/70 hover:bg-white/5 font-black text-[11px] uppercase tracking-widest transition-all"
                      >
                        <UserCircle className="w-4 h-4" /> HỒ SƠ CỦA TÔI
                      </button>
                      <button 
                        onClick={() => { setIsMobileMenuOpen(false); setIsLogoutModalOpen(true); }}
                        className="flex items-center gap-4 w-full p-4 rounded-2xl bg-red-500/10 text-red-400 font-black text-[11px] uppercase tracking-widest hover:bg-red-500/20 transition-all"
                      >
                        <LogOut className="w-4 h-4" /> ĐĂNG XUẤT
                      </button>
                    </div>
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
                 <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">© 2026 DUONGDIY PREMIUM</p>
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
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        initialTab={profileModalTab}
      />
    </>
  );
}
