import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Zap, ArrowRight, User, Mail, Lock, Eye, EyeOff, CheckCircle2
} from 'lucide-react';
import { register as registerApi } from '../../services/api/authService';
import { useAuthStore } from '../../store/authStore';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ 
    username: '', email: '', password: '', confirmPassword: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
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
      navigate('/catalog');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại. Tên đăng nhập hoặc email có thể đã tồn tại.');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    'Xem lịch sử đơn hàng & theo dõi giao hàng',
    'Lưu địa chỉ giao hàng yêu thích',
    'Nhận thông báo khuyến mãi độc quyền',
    'Trải nghiệm mua sắm cá nhân hóa',
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex overflow-hidden relative">
      
      {/* Ambient BG */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[var(--accent-lime)]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px'}} />
      </div>

      {/* Left Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <Link to="/shop" className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-lime)] flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <span className="text-xl font-black uppercase tracking-widest">TechChain</span>
          </Link>

          <div className="mb-10">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">Create Account</h2>
            <p className="text-white/40 font-bold">Tham gia cộng đồng công nghệ TechChain.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 font-bold text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Tên đăng nhập</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
                <input 
                  type="text" 
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="username"
                  className="w-full bg-white/5 border border-white/10 focus:border-[var(--accent-lime)]/50 pl-14 pr-6 py-4 rounded-2xl text-white font-bold transition-all outline-none placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Email</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-[var(--accent-lime)]/50 pl-14 pr-6 py-4 rounded-2xl text-white font-bold transition-all outline-none placeholder:text-white/20"
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
                  className="w-full bg-white/5 border border-white/10 focus:border-[var(--accent-lime)]/50 pl-14 pr-14 py-4 rounded-2xl text-white font-bold transition-all outline-none placeholder:text-white/20"
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

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Xác nhận mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 focus:border-[var(--accent-lime)]/50 pl-14 pr-6 py-4 rounded-2xl text-white font-bold transition-all outline-none placeholder:text-white/20"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[var(--accent-lime)] text-black py-5 rounded-2xl font-black text-sm tracking-widest uppercase hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <> TẠO TÀI KHOẢN <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/40 font-bold text-sm">
              Đã có tài khoản?{' '}
              <Link to="/login" className="text-[var(--accent-lime)] hover:underline font-black">
                Đăng nhập
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Panel — Benefits */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 relative z-10">
        <Link to="/shop" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-lime)] flex items-center justify-center">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <span className="text-2xl font-black uppercase tracking-widest">TechChain</span>
        </Link>

        <div className="space-y-10">
          <h1 className="text-6xl xl:text-7xl font-black leading-none tracking-tighter uppercase">
            Join The<br />Premium<br />
            <span className="text-[var(--accent-lime)]">Community.</span>
          </h1>

          <div className="space-y-4">
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-7 h-7 rounded-full bg-[var(--accent-lime)]/10 border border-[var(--accent-lime)]/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-lime)]" />
                </div>
                <p className="text-white/60 font-bold text-sm">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-[10px] text-white/20 font-bold tracking-widest uppercase">
          © 2025 TechChain · All Rights Reserved
        </p>
      </div>
    </div>
  );
}
