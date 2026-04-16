import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Zap, ArrowRight, ShieldCheck, Mail, Lock, Eye, EyeOff, Cpu, Wifi
} from 'lucide-react';
import { login as loginApi } from '../../services/api/authService';
import { useAuthStore } from '../../store/authStore';

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const data = await loginApi(formData);
      setAuth({ username: data.username, role: data.role }, data.token);
      
      if (data.role === 'ADMIN') navigate('/admin');
      else if (data.role === 'MANAGER') navigate('/manager');
      else if (data.role === 'STAFF') navigate('/staff');
      else navigate('/account');
    } catch (err) {
      setError('Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex overflow-hidden relative">
      
      {/* Ambient BG */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[var(--accent-lime)]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px'}} />
      </div>

      {/* Left Panel — Brand */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 relative z-10">
        <Link to="/shop" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-lime)] flex items-center justify-center">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <span className="text-2xl font-black uppercase tracking-widest">TechChain</span>
        </Link>

        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full">
            <ShieldCheck className="w-3 h-3 text-[var(--accent-lime)]" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/60">Premium Access Point</span>
          </div>

          <h1 className="text-6xl xl:text-7xl font-black leading-none tracking-tighter uppercase">
            Welcome<br />Back to<br />
            <span className="text-[var(--accent-lime)]">The Future.</span>
          </h1>

          <p className="text-white/40 font-bold max-w-xs leading-relaxed">
            Thế giới công nghệ cao cấp đang chờ bạn. Đăng nhập để khám phá những sản phẩm đỉnh cao nhất.
          </p>

          {/* Floating Cards */}
          <div className="flex gap-4 pt-6">
            <motion.div 
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <Cpu className="w-6 h-6 text-[var(--accent-lime)] mb-3" />
              <p className="text-xs font-black">Next-Gen</p>
              <p className="text-[10px] text-white/40 font-bold">Hardware</p>
            </motion.div>
            <motion.div 
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <Wifi className="w-6 h-6 text-blue-400 mb-3" />
              <p className="text-xs font-black">Always</p>
              <p className="text-[10px] text-white/40 font-bold">Connected</p>
            </motion.div>
          </div>
        </div>

        <p className="text-[10px] text-white/20 font-bold tracking-widest uppercase">
          © 2025 TechChain · All Rights Reserved
        </p>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <Link to="/shop" className="flex items-center gap-3 mb-12 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-lime)] flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <span className="text-xl font-black uppercase tracking-widest">TechChain</span>
          </Link>

          <div className="mb-10">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">Sign In</h2>
            <p className="text-white/40 font-bold">Đăng nhập vào tài khoản của bạn.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 font-bold text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Tên đăng nhập</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
                <input 
                  type="text" 
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="username"
                  className="w-full bg-white/5 border border-white/10 focus:border-[var(--accent-lime)]/50 focus:bg-white/8 pl-14 pr-6 py-5 rounded-2xl text-white font-bold transition-all outline-none placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 focus:border-[var(--accent-lime)]/50 pl-14 pr-14 py-5 rounded-2xl text-white font-bold transition-all outline-none placeholder:text-white/20"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button type="button" className="text-xs font-black text-[var(--accent-lime)] hover:underline">
                Quên mật khẩu?
              </button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[var(--accent-lime)] text-black py-5 rounded-2xl font-black text-sm tracking-widest uppercase hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100 shadow-xl"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <> ĐĂNG NHẬP <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/40 font-bold text-sm">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="text-[var(--accent-lime)] hover:underline font-black">
                Đăng ký ngay
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link to="/catalog" className="text-white/20 text-xs font-bold hover:text-white/40 transition-colors">
              ← Tiếp tục mua sắm không cần đăng nhập
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
