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
  const [rememberMe, setRememberMe] = useState(false);
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
      console.log('Login success - received data:', data);
      
      const role = data.role?.toUpperCase() || '';
      
      // Update store
      setAuth({ username: data.username, role: role }, data.token);
      console.log('Auth state updated. Role:', role);

      setTimeout(() => {
        closeAuthModal();
        if (role === 'ADMIN') {
          console.log('Navigating to Admin Dashboard...');
          navigate('/admin');
        } else if (role === 'MANAGER') {
          navigate('/manager');
        } else if (role === 'STAFF') {
          navigate('/staff');
        } else {
          console.log('Navigating to Home (Customer)...');
          navigate('/home');
        }
      }, 100);
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
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full p-8 md:p-10 flex flex-col justify-center bg-[#0b1329]"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-1.5">Đăng Nhập</h2>
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-[0.15em]">Xác thực quyền truy cập</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-red-200 font-medium text-xs text-center shadow-lg"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">ID Tài khoản</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type="text" 
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Nhập tên tài khoản..."
              className="w-full bg-slate-900/60 border border-slate-800/80 focus:border-blue-500/70 focus:bg-slate-950/80 pl-11 pr-4 py-3 rounded-xl text-slate-200 text-sm font-medium transition-all outline-none placeholder:text-slate-600"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">Mật mã</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-slate-900/60 border border-slate-800/80 focus:border-blue-500/70 focus:bg-slate-950/80 pl-11 pr-11 py-3 rounded-xl text-slate-200 text-sm font-medium transition-all outline-none placeholder:text-slate-600"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-1 pt-1 select-none">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="hidden" 
            />
            <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${rememberMe ? 'bg-blue-600 border-blue-600' : 'bg-slate-900/60 border-slate-800 group-hover:border-slate-700'}`}>
              {rememberMe && <span className="text-[9px] text-white">✓</span>}
            </div>
            <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">Ghi nhớ</span>
          </label>
          <button 
            type="button" 
            onClick={() => onSwitch('forgot')} 
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            Quên mật mã?
          </button>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Đăng nhập <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-xs text-slate-500">
        Chưa có danh tính?{' '}
        <button 
          onClick={() => onSwitch('register')} 
          className="text-blue-400 hover:text-blue-300 transition-colors font-semibold ml-1 underline decoration-1 underline-offset-4"
        >
          Khởi tạo ngay
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
  const closeAuthModal = useAuthStore((state) => state.closeAuthModal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
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
      setTimeout(() => {
        closeAuthModal();
      }, 100);
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
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full p-8 md:p-10 flex flex-col justify-center overflow-y-auto bg-[#0b1329]"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-1.5">Khởi Tạo</h2>
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-[0.15em]">Gia nhập hệ thống DuongDIY</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-red-200 font-medium text-xs text-center shadow-lg"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">Tên người dùng</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type="text" 
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Nhập username..."
              className="w-full bg-slate-900/60 border border-slate-800/80 focus:border-blue-500/70 focus:bg-slate-950/80 pl-11 pr-4 py-2.5 rounded-xl text-slate-200 text-sm font-medium transition-all outline-none placeholder:text-slate-600"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">Địa chỉ Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full bg-slate-900/60 border border-slate-800/80 focus:border-blue-500/70 focus:bg-slate-950/80 pl-11 pr-4 py-2.5 rounded-xl text-slate-200 text-sm font-medium transition-all outline-none placeholder:text-slate-600"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">Mật khẩu</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-slate-900/60 border border-slate-800/80 focus:border-blue-500/70 focus:bg-slate-950/80 pl-11 pr-11 py-2.5 rounded-xl text-slate-200 text-sm font-medium transition-all outline-none placeholder:text-slate-600"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">Xác nhận mật khẩu</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-slate-900/60 border border-slate-800/80 focus:border-blue-500/70 focus:bg-slate-950/80 pl-11 pr-11 py-2.5 rounded-xl text-slate-200 text-sm font-medium transition-all outline-none placeholder:text-slate-600"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 mt-4"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Đăng ký <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-slate-500">
        Đã có danh tính?{' '}
        <button 
          onClick={() => onSwitch('login')} 
          className="text-blue-400 hover:text-blue-300 transition-colors font-semibold ml-1 underline decoration-1 underline-offset-4"
        >
          Đăng nhập
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
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full p-8 md:p-10 flex flex-col justify-center bg-[#0b1329]"
      style={{ backfaceVisibility: 'hidden' }}
    >
      {!sent ? (
        <>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white mb-1.5">Khôi Phục</h2>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-[0.15em]">Cổng truy xuất mật mã</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">Email nhận mã</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-900/60 border border-slate-800/80 focus:border-blue-500/70 focus:bg-slate-950/80 pl-11 pr-4 py-3 rounded-xl text-slate-200 text-sm font-medium transition-all outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Gửi yêu cầu</>
              )}
            </button>
          </form>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 shadow-xl">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Gửi Tín Hiệu</h2>
          <p className="text-slate-400 text-xs">Kiểm tra email để tiếp tục quy trình.</p>
        </motion.div>
      )}

      <div className="mt-8 pt-6 border-t border-slate-800/80 flex justify-center">
        <button 
          onClick={() => onSwitch('login')} 
          className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-400 hover:text-slate-300 transition-colors uppercase"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
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
          className="absolute inset-0 bg-[#080d1a]/85 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md h-[580px] bg-[#0b1329] rounded-[2rem] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.6)] overflow-hidden border border-slate-800/80"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <button 
            onClick={closeAuthModal}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all z-20"
          >
            <X className="w-4 h-4" />
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
