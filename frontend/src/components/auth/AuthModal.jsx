import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, X, User, CheckCircle, ArrowLeft } from 'lucide-react';
import { login as loginApi, register as registerApi } from '../../services/api/authService';
import { useAuthStore } from '../../store/authStore';

const flipVariants = {
  initial: { opacity: 0, rotateY: -90, scale: 0.9 },
  animate: { opacity: 1, rotateY: 0, scale: 1 },
  exit: { opacity: 0, rotateY: 90, scale: 0.9 },
};

function LoginForm({ onSwitch }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.login);
  const closeAuthModal = useAuthStore((state) => state.closeAuthModal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const data = await loginApi(formData);
      console.log('Login successful, user data:', data);
      
      const role = data.role?.toUpperCase() || '';
      setAuth({ username: data.username, role: role }, data.token);
      closeAuthModal();
      
      if (role.includes('ADMIN')) navigate('/admin');
      else if (role.includes('MANAGER')) navigate('/manager');
      else if (role.includes('STAFF')) navigate('/staff');
      // For CUSTOMER, we usually stay on the same page, but if you want to force home:
      // else navigate('/home');
    } catch (err) {
      console.error('Login failed full error:', err);
      setError(err.response?.data?.message || 'Tên đăng nhập hoặc mật khẩu không chính xác.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      key="login"
      variants={flipVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full p-10 flex flex-col justify-center"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-heading font-black tracking-tighter uppercase mb-3 text-white drop-shadow-md">Đăng nhập</h2>
        <p className="text-[#cadaee] font-black text-xs uppercase tracking-[0.2em] opacity-80">Xác thực quyền truy cập</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-5 bg-red-500 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-red-500/20"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3 group/field">
          <label className="text-[11px] font-black uppercase tracking-[0.3em] text-[#cadaee]">ID Tài khoản</label>
          <div className="relative group/input">
            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#cadaee]/60 w-5 h-5 group-focus-within/input:text-white transition-colors z-10" />
            <input 
              type="text" 
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="USERNAME"
              className="w-full bg-white/10 border-2 border-[#cadaee]/30 focus:border-white pl-16 pr-6 py-5 rounded-[1.5rem] text-white font-black transition-all outline-none placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="space-y-3 group/field">
          <label className="text-[11px] font-black uppercase tracking-[0.3em] text-[#cadaee]">Mật mã</label>
          <div className="relative group/input">
            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-[#cadaee]/60 w-5 h-5 group-focus-within/input:text-white transition-colors z-10" />
            <input 
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-white/10 border-2 border-[#cadaee]/30 focus:border-white pl-16 pr-16 py-5 rounded-[1.5rem] text-white font-black transition-all outline-none placeholder:text-white/20"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-2 gap-2">
          <label className="flex items-center gap-3 cursor-pointer group shrink-0">
            <input type="checkbox" className="hidden" />
            <div className="w-6 h-6 border-2 border-white/20 rounded-lg flex items-center justify-center group-hover:border-white transition-colors">
               <div className="w-3 h-3 rounded-sm bg-[#cadaee] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_#cadaee]" />
            </div>
            <span className="text-[11px] font-black text-[#cadaee]/70 uppercase tracking-widest group-hover:text-white transition-colors">Ghi nhớ</span>
          </label>
          <button type="button" onClick={() => onSwitch('forgot')} className="text-[11px] font-black text-[#cadaee] hover:text-white transition-colors uppercase tracking-[0.2em] whitespace-nowrap">
            Quên mật mã?
          </button>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full relative group overflow-hidden mt-6"
        >
          <div className="relative bg-white text-[#4981cf] py-6 rounded-[1.5rem] font-black text-xs tracking-[0.3em] uppercase transition-transform active:scale-[0.98] flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-[#4981cf]/30 border-t-[#4981cf] rounded-full animate-spin" />
            ) : (
              <> ĐĂNG NHẬP <ArrowRight className="w-5 h-5" /></>
            )}
          </div>
        </button>
      </form>

      <p className="mt-10 text-center text-[11px] font-black text-white/30 uppercase tracking-[0.2em]">
        Chưa có danh tính?{' '}
        <button 
          onClick={() => onSwitch('register')} 
          className="text-[#cadaee] hover:text-white transition-colors font-black ml-2 underline decoration-2 underline-offset-4"
        >
          KHỞI TẠO NGAY
        </button>
      </p>
    </motion.div>
  );
}

function RegisterForm({ onSwitch }) {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const setAuth = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const data = await registerApi({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      setAuth({ username: data.username, role: data.role }, data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      key="register"
      variants={flipVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full p-10 flex flex-col justify-center overflow-y-auto"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-heading font-black tracking-tighter uppercase mb-2 text-white">Khởi tạo</h2>
        <p className="text-[#cadaee] font-black text-[10px] uppercase tracking-[0.2em] opacity-80">Gia nhập hệ thống DuongDIY</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-red-500 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-xl"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2 group/field">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#cadaee]">Tên người dùng</label>
          <div className="relative group/input">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-[#cadaee]/60 w-4 h-4 group-focus-within/input:text-white transition-colors z-10" />
            <input 
              type="text" 
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="USERNAME"
              className="w-full bg-white/10 border-2 border-[#cadaee]/30 focus:border-white pl-14 pr-4 py-4 rounded-[1.2rem] text-white font-black transition-all outline-none placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="space-y-2 group/field">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#cadaee]">Địa chỉ Email</label>
          <div className="relative group/input">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#cadaee]/60 w-4 h-4 group-focus-within/input:text-white transition-colors z-10" />
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="EMAIL@EXAMPLE.COM"
              className="w-full bg-white/10 border-2 border-[#cadaee]/30 focus:border-white pl-14 pr-4 py-4 rounded-[1.2rem] text-white font-black transition-all outline-none placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="space-y-2 group/field">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#cadaee]">Mật khẩu</label>
          <div className="relative group/input">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#cadaee]/60 w-4 h-4 group-focus-within/input:text-white transition-colors z-10" />
            <input 
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-white/10 border-2 border-[#cadaee]/30 focus:border-white pl-14 pr-12 py-4 rounded-[1.2rem] text-white font-black transition-all outline-none placeholder:text-white/20"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full relative group overflow-hidden mt-6"
        >
          <div className="relative bg-white text-[#4981cf] py-5 rounded-[1.2rem] font-black text-xs tracking-[0.3em] uppercase transition-transform active:scale-[0.98] flex items-center justify-center gap-4 shadow-xl">
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-[#4981cf]/30 border-t-[#4981cf] rounded-full animate-spin" />
            ) : (
              <> HOÀN TẤT ĐĂNG KÝ <ArrowRight className="w-4 h-4" /></>
            )}
          </div>
        </button>
      </form>

      <p className="mt-8 text-center text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
        Đã có danh tính?{' '}
        <button 
          onClick={() => onSwitch('login')} 
          className="text-[#cadaee] hover:text-white transition-colors font-black ml-2 underline decoration-2 underline-offset-4"
        >
          ĐĂNG NHẬP
        </button>
      </p>
    </motion.div>
  );
}

function ForgotForm({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setSent(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      key="forgot"
      variants={flipVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full p-10 flex flex-col justify-center"
      style={{ backfaceVisibility: 'hidden' }}
    >
      {!sent ? (
        <>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-heading font-black tracking-tighter uppercase mb-3 text-white">Khôi phục</h2>
            <p className="text-[#cadaee] font-black text-[10px] uppercase tracking-[0.2em] opacity-80">Cổng truy xuất mật mã</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3 group/field">
              <label className="text-[11px] font-black uppercase tracking-[0.3em] text-[#cadaee]">Email nhận mã</label>
              <div className="relative group/input">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#cadaee]/60 w-5 h-5 group-focus-within/input:text-white transition-colors z-10" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL@EXAMPLE.COM"
                  className="w-full bg-white/10 border-2 border-[#cadaee]/30 focus:border-white pl-16 pr-6 py-5 rounded-[1.5rem] text-white font-black transition-all outline-none placeholder:text-white/20"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full relative group overflow-hidden"
            >
              <div className="relative bg-white text-[#4981cf] py-6 rounded-[1.5rem] font-black text-xs tracking-[0.3em] uppercase flex items-center justify-center gap-4 shadow-xl">
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-[#4981cf]/30 border-t-[#4981cf] rounded-full animate-spin" />
                ) : (
                  <> GỬI YÊU CẦU </>
                )}
              </div>
            </button>
          </form>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
          <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white flex items-center justify-center mx-auto mb-10 shadow-2xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-heading font-black text-white uppercase tracking-tight mb-4">Gửi Tín Hiệu</h2>
          <p className="text-[#cadaee] font-black text-xs uppercase tracking-[0.2em]">Kiểm tra email để tiếp tục</p>
        </motion.div>
      )}

      <div className="mt-12 pt-8 border-t border-white/10 flex justify-center">
        <button 
          onClick={() => onSwitch('login')} 
          className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> QUAY LẠI
        </button>
      </div>
    </motion.div>
  );
}

export default function AuthModal() {
  const isAuthModalOpen = useAuthStore((state) => state.isAuthModalOpen);
  const authView = useAuthStore((state) => state.authView);
  const closeAuthModal = useAuthStore((state) => state.closeAuthModal);
  const setAuthView = useAuthStore((state) => state.setAuthView);

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 perspective-[2000px]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0 bg-[#1a365d]/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md h-[650px] bg-[#4981cf] rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.4)] overflow-hidden border-4 border-white/20"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white to-transparent z-20" />
          <button 
            onClick={closeAuthModal}
            className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <AnimatePresence mode="wait">
            {authView === 'login' && <LoginForm key="login" onSwitch={setAuthView} />}
            {authView === 'register' && <RegisterForm key="register" onSwitch={setAuthView} />}
            {authView === 'forgot' && <ForgotForm key="forgot" onSwitch={setAuthView} />}
          </AnimatePresence>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
