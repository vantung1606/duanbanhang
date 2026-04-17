import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Zap, ArrowRight, User, Mail, Lock, Eye, EyeOff, 
  CheckCircle2, Sparkles, ShieldCheck, Cpu, Globe, Binary
} from 'lucide-react';
import { login as loginApi, register as registerApi } from '../../services/api/authService';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../lib/utils';

// --- Background Components ---

const FloatingOrb = ({ color, size, top, left, delay }) => (
  <motion.div
    animate={{
      y: [0, -40, 0],
      x: [0, 30, 0],
      opacity: [0.2, 0.4, 0.2],
    }}
    transition={{ duration: 10, repeat: Infinity, delay, ease: "easeInOut" }}
    className="absolute pointer-events-none blur-[120px] rounded-full z-0"
    style={{ backgroundColor: color, width: size, height: size, top, left }}
  />
);

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.login);
  
  const [isFlipped, setIsFlipped] = useState(location.pathname === '/register');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Form States
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [regData, setRegData] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  useEffect(() => {
    setIsFlipped(location.pathname === '/register');
    setError('');
  }, [location.pathname]);

  const toggleAuth = () => {
    const nextPath = isFlipped ? '/login' : '/register';
    navigate(nextPath);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const data = await loginApi(loginData);
      setAuth({ username: data.username, role: data.role }, data.token);
      if (data.role === 'ADMIN') navigate('/admin');
      else if (data.role === 'MANAGER') navigate('/manager');
      else navigate('/shop/app');
    } catch (err) {
      setError('Tên đăng nhập hoặc mật khẩu không chính xác.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (regData.password !== regData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const data = await registerApi({
        username: regData.username,
        email: regData.email,
        password: regData.password
      });
      setAuth({ username: data.username, role: data.role }, data.token);
      navigate('/shop/app');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 lg:p-8 overflow-hidden relative selection:bg-accent selection:text-black">
      
      {/* 3D Environment Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingOrb color="var(--accent-lime)" size="600px" top="-10%" left="-10%" delay={0} />
        <FloatingOrb color="#3b82f6" size="500px" top="60%" left="70%" delay={2} />
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px'}} />
      </div>

      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-center gap-12 relative z-10">
        
        {/* Left Side: Brand Visuals with Animation Loop */}
        <div className="hidden lg:flex w-1/2 flex-col gap-10">
          <Link to="/home" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 fill-black" />
            </div>
            <span className="text-3xl font-black uppercase tracking-tighter">Neuralyn</span>
          </Link>

          <div className="space-y-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={isFlipped ? 'reg-brand' : 'login-brand'}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <Sparkles className="w-3 h-3 text-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Hệ điều hành Neuralyn v3.0</span>
                </div>
                <h1 className="text-7xl font-black leading-[0.9] tracking-tighter uppercase">
                  {isFlipped ? (
                    <>Gia nhập<br/><span className="text-accent underline decoration-white/20 underline-offset-8 italic">Cộng đồng</span></>
                  ) : (
                    <>Quay lại<br/><span className="text-accent underline decoration-white/20 underline-offset-8 italic">Kỷ nguyên</span></>
                  )}
                </h1>
                <p className="text-lg text-white/50 font-medium max-w-sm leading-relaxed">
                  {isFlipped 
                    ? "Tạo danh tính mới để truy cập vào hệ thống phân phối phần cứng cao cấp nhất hiện nay."
                    : "Tiếp tục hành trình khám phá các thiết bị công nghệ đỉnh cao cùng hàng ngàn chuyên gia."
                  }
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm">
             {[
               { icon: ShieldCheck, label: "Bảo mật tuyệt đối" },
               { icon: Cpu, label: "Xử lý tức thì" },
               { icon: Globe, label: "Kết nối toàn cầu" },
               { icon: CheckCircle2, label: "Xác minh danh tính" }
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                 <item.icon className="w-4 h-4 text-accent" />
                 <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Right Side: 3D Flip Container (The User's Favorite) */}
        <div className="w-full lg:w-1/2 flex justify-center perspective-[2000px]">
          <motion.div
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
            className="w-full max-w-md aspect-[3/4.2] relative"
          >
            {/* FRONT FACE (LOGIN) */}
            <div 
              style={{ backfaceVisibility: 'hidden' }}
              className="absolute inset-0 w-full h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 lg:p-12 flex flex-col justify-center shadow-2xl"
            >
               <div className="mb-10 text-center lg:text-left">
                  <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">Đăng nhập</h2>
                  <p className="text-white/40 font-bold text-sm">Chào mừng quay trở lại hệ thống.</p>
               </div>

               <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">ID Tài khoản</label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input 
                        type="text" 
                        required
                        value={loginData.username}
                        onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 focus:border-accent p-5 pl-14 rounded-2xl text-sm font-bold transition-all outline-none"
                        placeholder="USERNAME"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Mật mã</label>
                    <div className="relative">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input 
                        type={showPassword ? "text" : "password"}
                        required
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 focus:border-accent p-5 pl-14 pr-14 rounded-2xl text-sm font-bold transition-all outline-none"
                        placeholder="••••••••"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-white text-black py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <>Xác thực ID <ArrowRight className="w-4 h-4" /></>}
                  </button>
               </form>

               <div className="mt-10 text-center">
                  <p className="text-white/40 text-xs font-bold">
                    Chưa có ID? <button onClick={toggleAuth} className="text-accent hover:underline font-black uppercase ml-1">Đăng ký ngay</button>
                  </p>
               </div>
            </div>

            {/* BACK FACE (REGISTER) */}
            <div 
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              className="absolute inset-0 w-full h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 lg:p-12 flex flex-col justify-center shadow-2xl"
            >
               <div className="mb-8 text-center lg:text-left">
                  <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">Đăng ký</h2>
                  <p className="text-white/40 font-bold text-sm">Khởi tạo danh tính hệ thống.</p>
               </div>

               <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-white/40 ml-2">Username</label>
                    <input 
                      type="text" required
                      value={regData.username}
                      onChange={(e) => setRegData({...regData, username: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 focus:border-accent p-4 rounded-2xl text-xs font-bold outline-none"
                      placeholder="NGUYỄN VĂN A"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-white/40 ml-2">Email</label>
                    <input 
                      type="email" required
                      value={regData.email}
                      onChange={(e) => setRegData({...regData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 focus:border-accent p-4 rounded-2xl text-xs font-bold outline-none"
                      placeholder="EMAIL@EXAMPLE.COM"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-white/40 ml-2">Mật mã</label>
                    <input 
                      type="password" required
                      value={regData.password}
                      onChange={(e) => setRegData({...regData, password: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 focus:border-accent p-4 rounded-2xl text-xs font-bold outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-white/40 ml-2">Nhập lại mật mã</label>
                    <input 
                      type="password" required
                      value={regData.confirmPassword}
                      onChange={(e) => setRegData({...regData, confirmPassword: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 focus:border-accent p-4 rounded-2xl text-xs font-bold outline-none"
                      placeholder="••••••••"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-accent text-black py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
                  >
                    {isLoading ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : "Tạo tài khoản"}
                  </button>
               </form>

               <div className="mt-8 text-center">
                  <p className="text-white/40 text-[10px] font-bold">
                    Đã có tài khoản? <button onClick={toggleAuth} className="text-accent hover:underline font-black uppercase ml-1">Đăng nhập</button>
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Error Message Tooltip */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full max-w-xs p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-bold text-center z-50 backdrop-blur-md"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
