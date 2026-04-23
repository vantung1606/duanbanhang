import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { login as loginApi, register as registerApi } from '../../services/api/authService';
import { useAuthStore } from '../../store/authStore';

const InputField = ({ icon: Icon, label, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-200 z-10" />
      <input
        className="w-full bg-white/60 border border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 text-slate-800 placeholder-slate-400 py-3.5 pl-11 pr-4 rounded-2xl text-sm font-medium outline-none transition-all duration-200 backdrop-blur-sm"
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
    <>
      {/* Same ethereal background as Admin/Manager/Staff */}
      <style dangerouslySetInnerHTML={{ __html: `
        body {
          background-image: url('/assets/images/ethereal_bg.png');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
      `}} />

      <div className="min-h-screen flex overflow-hidden font-sans" style={{ backgroundColor: 'rgba(243, 245, 248, 0.85)' }}>
        {/* Decorative blobs */}
        <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full z-0 pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[10%] w-[30%] h-[40%] bg-indigo-500/10 blur-[100px] rounded-full z-0 pointer-events-none" />

        {/* ── LEFT PANEL: Form ── */}
        <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-md"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-slate-800 text-2xl font-black tracking-tight">DuongDIY</span>
            </div>

            {/* Glass card */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-xl shadow-slate-200/80">

              {/* Tab switch */}
              <div className="flex bg-slate-100/80 border border-slate-200/60 rounded-2xl p-1 mb-7">
                <Link to="/login"
                  className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest text-center rounded-xl transition-all duration-300 ${!isRegister ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>
                  Đăng nhập
                </Link>
                <Link to="/register"
                  className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest text-center rounded-xl transition-all duration-300 ${isRegister ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>
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
                  <h1 className="text-2xl font-black text-slate-800 mb-1">
                    {isRegister ? 'Tạo tài khoản mới' : 'Chào mừng trở lại'}
                  </h1>
                  <p className="text-sm text-slate-500 mb-6">
                    {isRegister ? 'Tham gia AetherShop ngay hôm nay!' : 'Tiếp tục trải nghiệm mua sắm của bạn.'}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">
                <InputField icon={User} label="Tên đăng nhập" type="text" name="username"
                  required value={formData.username} onChange={handleChange} placeholder="username của bạn" />

                {isRegister && (
                  <InputField icon={Mail} label="Email" type="email" name="email"
                    required value={formData.email} onChange={handleChange} placeholder="email@example.com" />
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mật khẩu</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors z-10" />
                    <input type={showPassword ? 'text' : 'password'} name="password" required
                      value={formData.password} onChange={handleChange} placeholder="••••••••"
                      className="w-full bg-white/60 border border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 text-slate-800 placeholder-slate-400 py-3.5 pl-11 pr-11 rounded-2xl text-sm font-medium outline-none transition-all duration-200" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isRegister && (
                  <InputField icon={Lock} label="Xác nhận mật khẩu" type="password" name="confirmPassword"
                    required value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
                )}

                {!isRegister && (
                  <div className="flex justify-end">
                    <Link to="/forgot-password" className="text-xs font-semibold text-indigo-500 hover:text-indigo-700 transition-colors">
                      Quên mật khẩu?
                    </Link>
                  </div>
                )}

                {error && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-xs font-semibold text-red-500">
                    {error}
                  </motion.div>
                )}

                <motion.button type="submit" disabled={isLoading}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-indigo-500/30 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2 mt-1">
                  {isLoading
                    ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <>{isRegister ? 'Tạo tài khoản' : 'Đăng nhập'} <ArrowRight className="w-4 h-4" /></>}
                </motion.button>
              </form>

              {/* Footer pills */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-5 flex-wrap">
                {[
                  { icon: ShieldCheck, label: 'Bảo mật SSL' },
                  { icon: Sparkles, label: 'Trải nghiệm mượt' },
                  { icon: Zap, label: 'Giao hàng nhanh' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-slate-400">
                    <Icon className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-xs font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT PANEL: Video ── */}
        <div className="hidden lg:block lg:w-1/2 relative z-10 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl shadow-slate-300/60"
          >
            <div className="absolute inset-0 bg-indigo-600/10 mix-blend-multiply z-10 pointer-events-none" />
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/assets/videos/homevideo.mp4" type="video/mp4" />
            </video>
            {/* Floating caption */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="absolute bottom-8 left-8 right-8 z-20 bg-white/20 backdrop-blur-lg border border-white/40 rounded-2xl px-5 py-4"
            >
              <p className="text-white font-bold text-sm drop-shadow">Mua sắm thông minh – Sống đẳng cấp</p>
              <p className="text-white/70 text-xs mt-1">Hàng ngàn sản phẩm chính hãng, giao hàng nhanh, bảo hành uy tín.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
