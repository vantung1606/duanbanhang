import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Zap, ArrowRight, ShieldCheck, Mail, Lock, Eye, EyeOff, 
  Cpu, Wifi, Sparkles, Globe, Binary
} from 'lucide-react';
import { login as loginApi } from '../../services/api/authService';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../lib/utils';

// --- Components ---

const FloatingOrb = ({ color, size, top, left, delay }) => (
  <motion.div
    animate={{
      y: [0, -40, 0],
      x: [0, 30, 0],
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 8 + Math.random() * 4,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none blur-[100px] rounded-full"
    style={{
      backgroundColor: color,
      width: size,
      height: size,
      top,
      left,
    }}
  />
);

const PerspectiveGrid = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.05]">
    <div 
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(var(--accent-lime) 1px, transparent 1px), linear-gradient(90deg, var(--accent-lime) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        perspective: '1000px',
        transform: 'rotateX(60deg) scale(2.5)',
        transformOrigin: '50% 100%',
        maskImage: 'linear-gradient(to top, black 30%, transparent 90%)'
      }}
    />
  </div>
);

// --- Main Page ---

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.login);
  const containerRef = useRef(null);

  // 3D Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-300, 300], [10, -10]), { damping: 25, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-10, 10]), { damping: 25, stiffness: 150 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
      else navigate('/shop/app');
    } catch (err) {
      setError('Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 overflow-hidden relative perspective-1000"
    >
      {/* 3D Background Elements */}
      <PerspectiveGrid />
      <FloatingOrb color="var(--accent-lime)" size="500px" top="-10%" left="-10%" delay={0} />
      <FloatingOrb color="#3b82f6" size="400px" top="60%" left="70%" delay={1} />
      <FloatingOrb color="#8b5cf6" size="350px" top="20%" left="40%" delay={2} />

      {/* Main Glass Shell */}
      <motion.div
        ref={containerRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white/[0.03] backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden relative"
      >
        {/* Decorative Highlights */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Left Side: Brand & Visuals */}
        <div className="hidden lg:flex flex-col justify-between p-16 border-r border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
             <Binary className="absolute top-10 right-10 w-64 h-64 -rotate-12" />
             <div className="absolute inset-0 bg-gradient-to-br from-[#FACC15]/20 to-transparent" />
          </div>

          <Link to="/home" className="flex items-center gap-3 relative z-10 group">
            <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 fill-black" />
            </div>
            <span className="text-2xl font-black uppercase tracking-tighter">Neuralyn</span>
          </Link>

          <div className="space-y-8 relative z-10">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
            >
              <Sparkles className="w-3 h-3 text-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Hệ điều hành Neuralyn v3.0</span>
            </motion.div>

            <h1 className="text-6xl font-black leading-tight tracking-tighter uppercase">
              Kết nối vào <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Thế giới</span> <br />
              <span className="text-accent underline decoration-4 decoration-accent/30 underline-offset-8 italic">Tương lai</span>
            </h1>

            <p className="text-lg text-white/60 font-medium max-w-sm leading-relaxed">
              Trải nghiệm đỉnh cao của công nghệ phần cứng. Cánh cửa dẫn đến hiệu năng vượt trội bắt đầu từ đây.
            </p>

            <div className="flex gap-4 pt-4">
               {[Cpu, Wifi, Globe].map((Icon, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.7 + i * 0.1 }}
                   className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
                 >
                   <Icon className="w-5 h-5 text-white/40" />
                 </motion.div>
               ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/20 relative z-10">
            <span>Bảo mật</span>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <span>Định danh</span>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <span>Neuralyn © 2026</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 lg:p-20 relative flex flex-col justify-center min-h-[500px]">
          <div className="mb-10 lg:mb-12">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tighter uppercase mb-2">Đăng nhập</h2>
            <p className="text-white/40 font-bold text-sm lg:text-base">Cung cấp danh tính để thiết lập đường truyền bảo mật.</p>
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

          <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
            <div className="space-y-3 group/field">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within/field:text-accent transition-colors">ID Tài khoản</label>
              <div className="relative group/input">
                <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none" />
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5 group-focus-within/input:text-accent transition-colors" />
                <input 
                  type="text" 
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="USERNAME"
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-accent/40 pl-16 pr-6 py-5 lg:py-6 rounded-[1.2rem] lg:rounded-[1.5rem] text-white font-black transition-all outline-none placeholder:text-white/10 focus:bg-white/[0.06]"
                />
              </div>
            </div>

            <div className="space-y-3 group/field">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within/field:text-accent transition-colors">Mật mã truy cập</label>
              <div className="relative group/input">
                <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none" />
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5 group-focus-within/input:text-accent transition-colors" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-accent/40 pl-16 pr-16 py-5 lg:py-6 rounded-[1.2rem] lg:rounded-[1.5rem] text-white font-black transition-all outline-none placeholder:text-white/10 focus:bg-white/[0.06]"
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
                   <div className="w-2 h-2 rounded-sm bg-accent opacity-0 group-hover:opacity-40" />
                </div>
                <span className="text-[10px] lg:text-xs font-bold text-white/40 group-hover:text-white/60 transition-colors">Ghi nhớ phiên</span>
              </label>
              <button type="button" className="text-[10px] lg:text-xs font-black text-accent hover:text-accent/80 transition-colors whitespace-nowrap">
                Khôi phục mã?
              </button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-accent blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-white text-black py-5 lg:py-6 rounded-[1.2rem] lg:rounded-[1.5rem] font-black text-xs lg:text-sm tracking-[0.2em] uppercase transition-transform active:scale-[0.98] flex items-center justify-center gap-3">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <> Yêu cầu xác thực <ArrowRight className="w-5 h-5" /></>
                )}
              </div>
            </button>
          </form>

          <p className="mt-10 lg:mt-12 text-center text-xs lg:text-sm font-bold text-white/30">
            Chưa có danh tính?{' '}
            <Link to="/register" className="text-accent hover:text-accent/80 transition-colors font-black uppercase tracking-widest ml-1">
              Khởi tạo ngay
            </Link>
          </p>

          {/* Quick Links */}
          <div className="mt-8 flex items-center justify-center gap-6">
             <Link to="/catalog" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">Cửa hàng</Link>
             <div className="w-1 h-1 rounded-full bg-white/5" />
             <Link to="/home" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">Trang chủ</Link>
          </div>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 {
          perspective: 1200px;
        }
      `}} />
    </div>
  );
}
