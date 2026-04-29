import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { login as loginApi, register as registerApi } from '../../services/api/authService';
import { useAuthStore } from '../../store/authStore';

const InputField = ({ icon: Icon, label, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-[#0A1E54]/40 uppercase tracking-[0.2em]">{label}</label>
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B39A84] group-focus-within:text-[#0A1E54] transition-colors duration-200 z-10" />
      <input
        className="w-full bg-white/40 border border-[#B39A84]/20 focus:border-[#B39A84] focus:ring-4 focus:ring-[#B39A84]/5 text-[#0A1E54] placeholder-[#0A1E54]/20 py-4 pl-11 pr-4 rounded-2xl text-sm font-bold outline-none transition-all duration-200 backdrop-blur-sm"
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
    <div className="min-h-screen bg-[#F9F0EE] flex overflow-hidden font-sans relative">
      {/* Decorative blobs */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[50%] bg-[#B39A84]/10 blur-[120px] rounded-full z-0 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[10%] w-[30%] h-[40%] bg-[#0A1E54]/5 blur-[100px] rounded-full z-0 pointer-events-none" />

      {/* ── LEFT PANEL: Form ── */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => navigate('/home')}>
            <div className="w-12 h-12 rounded-2xl bg-[#0A1E54] flex items-center justify-center shadow-xl shadow-[#0A1E54]/20">
              <Zap className="w-6 h-6 text-[#B39A84] fill-[#B39A84]" />
            </div>
            <span className="text-[#0A1E54] text-2xl font-black tracking-tighter italic">DUONGDIY</span>
          </div>

          {/* Glass card */}
          <div className="bg-white/50 backdrop-blur-2xl border border-white rounded-[2.5rem] p-10 shadow-2xl shadow-[#B39A84]/10">

            {/* Tab switch */}
            <div className="flex bg-[#0A1E54]/5 rounded-2xl p-1.5 mb-8">
              <Link to="/login"
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-center rounded-xl transition-all duration-300 ${!isRegister ? 'bg-[#0A1E54] text-[#F9F0EE] shadow-lg' : 'text-[#0A1E54]/40 hover:text-[#0A1E54]'}`}>
                Đăng nhập
              </Link>
              <Link to="/register"
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-center rounded-xl transition-all duration-300 ${isRegister ? 'bg-[#0A1E54] text-[#F9F0EE] shadow-lg' : 'text-[#0A1E54]/40 hover:text-[#0A1E54]'}`}>
                Đăng ký
              </Link>
            </div>

            {/* Heading */}
            <AnimatePresence mode="wait">
              <motion.div key={isRegister ? 'reg' : 'log'}
                initial={{ opacity: 0, x: isRegister ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}>
                <h1 className="text-3xl font-black text-[#0A1E54] mb-2 tracking-tighter">
                  {isRegister ? 'Khởi tạo danh tính' : 'Xác thực truy cập'}
                </h1>
                <p className="text-sm font-medium text-[#0A1E54]/50 mb-8 uppercase tracking-widest text-[10px]">
                  {isRegister ? 'Gia nhập cộng đồng DuongDIY chuyên nghiệp' : 'Chào mừng bạn quay trở lại với hệ thống'}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-5">
              <InputField icon={User} label="Tên tài khoản" type="text" name="username"
                required value={formData.username} onChange={handleChange} placeholder="USERNAME" />

              {isRegister && (
                <InputField icon={Mail} label="Địa chỉ Email" type="email" name="email"
                  required value={formData.email} onChange={handleChange} placeholder="EMAIL@EXAMPLE.COM" />
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#0A1E54]/40 uppercase tracking-[0.2em]">Mật mã truy cập</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B39A84] group-focus-within:text-[#0A1E54] transition-colors z-10" />
                  <input type={showPassword ? 'text' : 'password'} name="password" required
                    value={formData.password} onChange={handleChange} placeholder="••••••••"
                    className="w-full bg-white/40 border border-[#B39A84]/20 focus:border-[#B39A84] focus:ring-4 focus:ring-[#B39A84]/5 text-[#0A1E54] placeholder-[#0A1E54]/20 py-4 pl-11 pr-11 rounded-2xl text-sm font-bold outline-none transition-all duration-200" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0A1E54]/20 hover:text-[#0A1E54] transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isRegister && (
                <InputField icon={Lock} label="Xác nhận mật mã" type="password" name="confirmPassword"
                  required value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
              )}

              {!isRegister && (
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-[10px] font-black text-[#B39A84] hover:text-[#0A1E54] transition-colors uppercase tracking-widest">
                    Khôi phục mã?
                  </Link>
                </div>
              )}

              {error && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/5 border border-red-500/20 rounded-2xl px-5 py-4 text-[10px] font-black text-red-500 uppercase tracking-widest">
                  {error}
                </motion.div>
              )}

              <motion.button type="submit" disabled={isLoading}
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                className="w-full bg-[#0A1E54] text-[#F9F0EE] py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#0A1E54]/20 hover:bg-[#B39A84] hover:text-[#0A1E54] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 mt-4">
                {isLoading
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <>{isRegister ? 'Khởi tạo ngay' : 'Yêu cầu xác thực'} <ArrowRight className="w-5 h-5" /></>}
              </motion.button>
            </form>

            {/* Footer info */}
            <div className="mt-10 pt-8 border-t border-[#0A1E54]/5 flex items-center justify-center gap-8">
              {[
                { icon: ShieldCheck, label: 'SECURE SSL' },
                { icon: Sparkles, label: 'PREMIUM UX' },
                { icon: Zap, label: 'FAST TRANS' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-[#0A1E54]/30">
                  <Icon className="w-4 h-4 text-[#B39A84]" />
                  <span className="text-[9px] font-black tracking-widest">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── RIGHT PANEL: Image ── */}
      <div className="hidden lg:block lg:w-1/2 relative z-10 p-8">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full h-full rounded-[3rem] overflow-hidden relative shadow-2xl"
        >
          <div className="absolute inset-0 bg-[#0A1E54]/20 mix-blend-multiply z-10" />
          <img 
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            className="absolute inset-0 w-full h-full object-cover"
            alt="Event Stage"
          />
          <div className="absolute bottom-12 left-12 right-12 z-20 space-y-4">
            <div className="w-12 h-1 bg-[#B39A84] rounded-full" />
            <h2 className="text-5xl font-black text-white leading-tight tracking-tighter">
              Kiến Tạo <br/> Không Gian <br/> Đẳng Cấp
            </h2>
            <p className="text-white/70 font-medium text-lg max-w-sm">
              Trang thiết bị chuyên dụng mang tầm vóc quốc tế cho sự kiện của bạn.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
