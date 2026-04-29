import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { login as loginApi, register as registerApi } from '../../services/api/authService';
import { useAuthStore } from '../../store/authStore';

const InputField = ({ icon: Icon, label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] md:text-[11px] font-black text-[#1a365d] uppercase tracking-[0.2em]">{label}</label>
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4981cf] group-focus-within:text-[#1a365d] transition-colors duration-200 z-10" />
      <input
        className="w-full bg-white border-2 border-[#cadaee] focus:border-[#4981cf] focus:ring-8 focus:ring-[#4981cf]/5 text-[#1a365d] placeholder-[#1a365d]/20 py-4 md:py-4.5 pl-11 pr-4 rounded-xl md:rounded-2xl text-sm font-black outline-none transition-all duration-200"
        {...props}
      />
    </div>
  </div>
);

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore(state => state.login);

  const [isRegister, setIsRegister] = useState(location.pathname === '/register');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  useEffect(() => {
    setIsRegister(location.pathname === '/register');
    setError('');
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
  }, [location.pathname]);

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = async e => {
    e.preventDefault(); setIsLoading(true); setError('');
    try {
      const data = await loginApi({ username: formData.username, password: formData.password });
      setAuth({ username: data.username, role: data.role }, data.token);
      if (data.role === 'ADMIN') navigate('/admin');
      else if (data.role === 'MANAGER') navigate('/manager');
      else if (data.role === 'STAFF') navigate('/staff');
      else navigate('/home');
    } catch { setError('Tên đăng nhập hoặc mật khẩu không chính xác.'); }
    finally { setIsLoading(false); }
  };

  const handleRegister = async e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setError('Mật khẩu xác nhận không khớp.');
    setIsLoading(true); setError('');
    try {
      const data = await registerApi({ username: formData.username, email: formData.email, password: formData.password });
      setAuth({ username: data.username, role: data.role }, data.token);
      navigate('/home');
    } catch (err) { setError(err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.'); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#e8ebf2] flex overflow-x-hidden font-sans relative">
      {/* Decorative blobs - hidden on very small mobile to save perf */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[50%] bg-[#cadaee]/40 blur-[100px] md:blur-[120px] rounded-full z-0 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[10%] w-[30%] h-[40%] bg-[#4981cf]/10 blur-[80px] md:blur-[100px] rounded-full z-0 pointer-events-none" />

      {/* ── LEFT PANEL: Form ── */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12 cursor-pointer group justify-center lg:justify-start" onClick={() => navigate('/home')}>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#4981cf] flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform">
              <Zap className="w-6 h-6 md:w-7 md:h-7 text-white fill-white" />
            </div>
            <span className="text-[#1a365d] text-2xl md:text-3xl font-heading font-black tracking-tighter italic">DUONGDIY</span>
          </div>

          {/* Solid White Card */}
          <div className="bg-white border-[3px] md:border-4 border-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 shadow-[0_50px_100px_rgba(73,129,207,0.15)]">

            {/* Tab switch */}
            <div className="flex bg-[#e8ebf2] rounded-xl md:rounded-2xl p-1.5 md:p-2 mb-8 md:mb-10 border-2 border-[#cadaee]/30">
              <Link to="/login"
                className={`flex-1 py-3 md:py-4 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-center rounded-lg md:rounded-xl transition-all duration-300 ${!isRegister ? 'bg-[#4981cf] text-white shadow-xl' : 'text-[#1a365d]/40 hover:text-[#1a365d]'}`}>
                Đăng nhập
              </Link>
              <Link to="/register"
                className={`flex-1 py-3 md:py-4 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-center rounded-lg md:rounded-xl transition-all duration-300 ${isRegister ? 'bg-[#4981cf] text-white shadow-xl' : 'text-[#1a365d]/40 hover:text-[#1a365d]'}`}>
                Đăng ký
              </Link>
            </div>

            {/* Heading */}
            <AnimatePresence mode="wait">
              <motion.div key={isRegister ? 'reg' : 'log'}
                initial={{ opacity: 0, x: isRegister ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-center lg:text-left">
                <h1 className="text-3xl md:text-4xl font-heading font-black text-[#1a365d] mb-2 md:mb-3 tracking-tighter">
                  {isRegister ? 'Khởi tạo' : 'Chào mừng'}
                </h1>
                <p className="text-[10px] md:text-xs font-black text-[#4981cf] mb-8 md:mb-10 uppercase tracking-[0.2em] md:tracking-[0.3em]">
                  {isRegister ? 'Tham gia hệ thống DuongDIY' : 'Tiếp tục hành trình của bạn'}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4 md:space-y-6">
              <InputField icon={User} label="Tên tài khoản" type="text" name="username"
                required value={formData.username} onChange={handleChange} placeholder="USERNAME" />

              {isRegister && (
                <InputField icon={Mail} label="Email xác thực" type="email" name="email"
                  required value={formData.email} onChange={handleChange} placeholder="EMAIL@EXAMPLE.COM" />
              )}

              <div className="space-y-2">
                <label className="text-[10px] md:text-[11px] font-black text-[#1a365d] uppercase tracking-[0.2em]">Mật mã truy cập</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4981cf] group-focus-within:text-[#1a365d] transition-colors z-10" />
                  <input type={showPassword ? 'text' : 'password'} name="password" required
                    value={formData.password} onChange={handleChange} placeholder="••••••••"
                    className="w-full bg-white border-2 border-[#cadaee] focus:border-[#4981cf] focus:ring-8 focus:ring-[#4981cf]/5 text-[#1a365d] placeholder-[#1a365d]/20 py-4 md:py-4.5 pl-11 pr-11 rounded-xl md:rounded-2xl text-sm font-black outline-none transition-all duration-200" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1a365d]/30 hover:text-[#4981cf] transition-colors">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {isRegister && (
                <InputField icon={Lock} label="Xác nhận mật mã" type="password" name="confirmPassword"
                  required value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
              )}

              {!isRegister && (
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-[10px] md:text-[11px] font-black text-[#4981cf] hover:text-[#1a365d] transition-colors uppercase tracking-[0.2em]">
                    Quên mật mã?
                  </Link>
                </div>
              )}

              {error && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500 border-2 border-red-500/20 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-[10px] md:text-[11px] font-black text-white uppercase tracking-widest shadow-lg shadow-red-500/20 text-center">
                  {error}
                </motion.div>
              )}

              <motion.button type="submit" disabled={isLoading}
                whileHover={{ scale: 1.01 }} whileTap={{ scale:0.99 }}
                className="w-full bg-[#4981cf] text-white py-5 md:py-6 rounded-xl md:rounded-[1.5rem] font-black text-[10px] md:text-xs uppercase tracking-[0.3em] shadow-2xl shadow-[#4981cf]/30 hover:bg-[#1a365d] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 mt-4 md:mt-6">
                {isLoading
                  ? <div className="w-5 h-5 md:w-6 md:h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  : <>{isRegister ? 'KHỞI TẠO NGAY' : 'ĐĂNG NHẬP'} <ArrowRight className="w-4 h-4 md:w-5 md:h-5" /></>}
              </motion.button>
            </form>

            {/* Footer info */}
            <div className="mt-8 md:mt-12 pt-8 md:pt-10 border-t-2 border-[#e8ebf2] flex items-center justify-center gap-6 md:gap-10">
              {[
                { icon: ShieldCheck, label: 'SECURE' },
                { icon: Sparkles, label: 'PREMIUM' },
                { icon: Zap, label: 'FAST' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-[#1a365d]/40">
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#4981cf]" />
                  <span className="text-[9px] md:text-[10px] font-black tracking-[0.2em]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── RIGHT PANEL: Image (Hidden on mobile) ── */}
      <div className="hidden lg:block lg:w-1/2 relative z-10 p-8">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full h-full rounded-[4rem] overflow-hidden relative shadow-2xl border-8 border-white"
        >
          <div className="absolute inset-0 bg-[#1a365d]/20 mix-blend-multiply z-10" />
          <img 
            src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=1350&q=80" 
            className="absolute inset-0 w-full h-full object-cover"
            alt="Event Stage"
          />
          <div className="absolute bottom-16 left-16 right-16 z-20 space-y-6">
            <div className="w-20 h-2 bg-[#cadaee] rounded-full shadow-lg" />
            <h2 className="text-6xl font-heading font-black text-white leading-none tracking-tighter drop-shadow-2xl">
              TRẢI NGHIỆM <br/> ĐẲNG CẤP <br/> DUONGDIY
            </h2>
            <p className="text-white text-xl font-bold max-w-sm drop-shadow-md">
              Thiết bị chuyên dụng tối tân nhất cho sự kiện chuyên nghiệp của bạn.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
