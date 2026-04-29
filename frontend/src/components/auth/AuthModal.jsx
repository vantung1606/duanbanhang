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
      setAuth({ username: data.username, role: data.role }, data.token);
      closeAuthModal();
      
      if (data.role === 'ADMIN') navigate('/admin');
      else if (data.role === 'MANAGER') navigate('/manager');
      else if (data.role === 'STAFF') navigate('/staff');
      else navigate('/shop/app');
    } catch (err) {
      setError('Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.');
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
      className="absolute inset-0 w-full h-full p-8 lg:p-10 flex flex-col justify-center"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black tracking-tighter uppercase mb-2 text-white">Đăng nhập</h2>
        <p className="text-white/40 font-bold text-sm">Cung cấp danh tính để thiết lập đường truyền.</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 font-bold text-xs"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3 group/field">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within/field:text-cyan-400 transition-colors">ID Tài khoản</label>
          <div className="relative group/input">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none" />
            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5 group-focus-within/input:text-cyan-400 transition-colors" />
            <input 
              type="text" 
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="USERNAME"
              className="w-full bg-white/[0.03] border border-white/10 focus:border-cyan-500/40 pl-16 pr-6 py-5 rounded-[1.2rem] text-white font-black transition-all outline-none placeholder:text-white/10 focus:bg-white/[0.06]"
            />
          </div>
        </div>

        <div className="space-y-3 group/field">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within/field:text-cyan-400 transition-colors">Mật mã truy cập</label>
          <div className="relative group/input">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none" />
            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5 group-focus-within/input:text-cyan-400 transition-colors" />
            <input 
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-white/[0.03] border border-white/10 focus:border-cyan-500/40 pl-16 pr-16 py-5 rounded-[1.2rem] text-white font-black transition-all outline-none placeholder:text-white/10 focus:bg-white/[0.06]"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-2 gap-2">
          <label className="flex items-center gap-2 cursor-pointer group shrink-0">
            <input type="checkbox" className="hidden" />
            <div className="w-5 h-5 border-2 border-white/10 rounded-lg flex items-center justify-center group-hover:border-white/30 transition-colors">
               <div className="w-2 h-2 rounded-sm bg-cyan-400 opacity-0 group-hover:opacity-40" />
            </div>
            <span className="text-[10px] font-bold text-white/40 group-hover:text-white/60 transition-colors">Ghi nhớ phiên</span>
          </label>
          <button type="button" onClick={() => onSwitch('forgot')} className="text-[10px] font-black text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap">
            Khôi phục mã?
          </button>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full relative group overflow-hidden mt-4"
        >
          <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative bg-white text-black py-5 rounded-[1.2rem] font-black text-xs tracking-[0.2em] uppercase transition-transform active:scale-[0.98] flex items-center justify-center gap-3">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <> Yêu cầu xác thực <ArrowRight className="w-5 h-5" /></>
            )}
          </div>
        </button>
      </form>

      <p className="mt-8 text-center text-xs font-bold text-white/30">
        Chưa có danh tính?{' '}
        <button 
          onClick={() => onSwitch('register')} 
          className="text-cyan-400 hover:text-cyan-300 transition-colors font-black uppercase tracking-widest ml-1"
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
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại. Tên đăng nhập hoặc email có thể đã tồn tại.');
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
      className="absolute inset-0 w-full h-full p-8 lg:p-10 flex flex-col justify-center overflow-y-auto overflow-x-hidden"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-black tracking-tighter uppercase mb-1 text-white">Khởi tạo</h2>
        <p className="text-white/40 font-bold text-sm">Gia nhập hệ thống quản lý DuongDIY.</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 font-bold text-xs"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5 group/field">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within/field:text-cyan-400 transition-colors">Tên đăng nhập</label>
          <div className="relative group/input">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none" />
            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 group-focus-within/input:text-cyan-400 transition-colors" />
            <input 
              type="text" 
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="USERNAME"
              className="w-full bg-white/[0.03] border border-white/10 focus:border-cyan-500/40 pl-14 pr-4 py-3 rounded-xl text-white font-black transition-all outline-none placeholder:text-white/10 focus:bg-white/[0.06]"
            />
          </div>
        </div>

        <div className="space-y-1.5 group/field">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within/field:text-cyan-400 transition-colors">Email</label>
          <div className="relative group/input">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none" />
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 group-focus-within/input:text-cyan-400 transition-colors" />
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@example.com"
              className="w-full bg-white/[0.03] border border-white/10 focus:border-cyan-500/40 pl-14 pr-4 py-3 rounded-xl text-white font-black transition-all outline-none placeholder:text-white/10 focus:bg-white/[0.06]"
            />
          </div>
        </div>

        <div className="space-y-1.5 group/field">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within/field:text-cyan-400 transition-colors">Mật mã truy cập</label>
          <div className="relative group/input">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none" />
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 group-focus-within/input:text-cyan-400 transition-colors" />
            <input 
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-white/[0.03] border border-white/10 focus:border-cyan-500/40 pl-14 pr-12 py-3 rounded-xl text-white font-black transition-all outline-none placeholder:text-white/10 focus:bg-white/[0.06]"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-1.5 group/field">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within/field:text-cyan-400 transition-colors">Xác nhận mật mã</label>
          <div className="relative group/input">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none" />
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 group-focus-within/input:text-cyan-400 transition-colors" />
            <input 
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-white/[0.03] border border-white/10 focus:border-cyan-500/40 pl-14 pr-4 py-3 rounded-xl text-white font-black transition-all outline-none placeholder:text-white/10 focus:bg-white/[0.06]"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full relative group overflow-hidden mt-4"
        >
          <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative bg-white text-black py-4 rounded-xl font-black text-xs tracking-[0.2em] uppercase transition-transform active:scale-[0.98] flex items-center justify-center gap-3">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <> Xác nhận khởi tạo <ArrowRight className="w-4 h-4" /></>
            )}
          </div>
        </button>
      </form>

      <p className="mt-6 text-center text-[10px] font-bold text-white/30">
        Đã có danh tính?{' '}
        <button 
          onClick={() => onSwitch('login')} 
          className="text-cyan-400 hover:text-cyan-300 transition-colors font-black uppercase tracking-widest ml-1"
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
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      setTimeout(() => {
        setSent(true);
        setIsLoading(false);
      }, 1000);
    } catch {
      setError('Gửi yêu cầu thất bại, vui lòng thử lại.');
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      key="forgot"
      variants={flipVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full p-8 lg:p-10 flex flex-col justify-center"
      style={{ backfaceVisibility: 'hidden' }}
    >
      {!sent ? (
        <>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black tracking-tighter uppercase mb-2 text-white">Khôi phục mã</h2>
            <p className="text-white/40 font-bold text-sm">Nhập email để thiết lập lại mật mã truy cập.</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 font-bold text-xs"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3 group/field">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within/field:text-cyan-400 transition-colors">ĐỊA CHỈ EMAIL</label>
              <div className="relative group/input">
                <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none" />
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5 group-focus-within/input:text-cyan-400 transition-colors" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-cyan-500/40 pl-16 pr-6 py-5 rounded-[1.2rem] text-white font-black transition-all outline-none placeholder:text-white/10 focus:bg-white/[0.06]"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full relative group overflow-hidden mt-4"
            >
              <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-white text-black py-5 rounded-[1.2rem] font-black text-xs tracking-[0.2em] uppercase transition-transform active:scale-[0.98] flex items-center justify-center gap-3">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <> Gửi liên kết xác thực </>
                )}
              </div>
            </button>
          </form>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
          <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 rounded-full" />
            <CheckCircle className="w-10 h-10 text-cyan-400 relative z-10" />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Đã truyền tín hiệu</h2>
          <p className="text-sm text-white/50">Vui lòng kiểm tra cổng thông tin <span className="text-cyan-400">{email}</span> để thực hiện khôi phục.</p>
        </motion.div>
      )}

      <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
        <button 
          onClick={() => onSwitch('login')} 
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/30 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại cổng đăng nhập
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

  // We set a fixed height on the container so the flip animation works correctly
  // without the box changing size abruptly.
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 perspective-[1500px]">
        {/* Backdrop stays fixed */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />
        
        {/* Modal Container flips internally */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md h-[600px] bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Decorative Elements (Shared) */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent z-20 pointer-events-none" />
          <button 
            onClick={closeAuthModal}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* AnimatePresence for the flipping views */}
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
