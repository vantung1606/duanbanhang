import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Zap, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      // await resetPasswordApi({ email });
      setSent(true);
    } catch {
      setError('Gửi yêu cầu thất bại, vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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

        {/* Form panel */}
        <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
              {!sent ? (
                <>
                  <h1 className="text-2xl font-black text-slate-800 mb-1">Khôi phục mật khẩu</h1>
                  <p className="text-sm text-slate-500 mb-6">Nhập email để nhận liên kết đặt lại mật khẩu.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors z-10" />
                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                          placeholder="email@example.com"
                          className="w-full bg-white/60 border border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 text-slate-800 placeholder-slate-400 py-3.5 pl-11 pr-4 rounded-2xl text-sm font-medium outline-none transition-all duration-200" />
                      </div>
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-xs font-semibold text-red-500">{error}</div>
                    )}

                    <motion.button type="submit" disabled={isLoading}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-indigo-500/30 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                      {isLoading
                        ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : 'Gửi liên kết khôi phục'}
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 border border-green-200 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h2 className="text-xl font-black text-slate-800 mb-2">Email đã được gửi!</h2>
                  <p className="text-sm text-slate-500">Kiểm tra hộp thư <span className="text-slate-700 font-semibold">{email}</span> để lấy liên kết đặt lại mật khẩu.</p>
                </motion.div>
              )}

              <div className="mt-6 pt-5 border-t border-slate-100 flex justify-center">
                <Link to="/login" className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-indigo-600 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Quay lại đăng nhập
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Video panel */}
        <div className="hidden lg:block lg:w-1/2 relative z-10 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl shadow-slate-300/60"
          >
            <div className="absolute inset-0 bg-indigo-600/10 mix-blend-multiply z-10 pointer-events-none" />
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/assets/videos/homevideo.mp4" type="video/mp4" />
            </video>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="absolute bottom-8 left-8 right-8 z-20 bg-white/20 backdrop-blur-lg border border-white/40 rounded-2xl px-5 py-4"
            >
              <p className="text-white font-bold text-sm drop-shadow">Tài khoản an toàn – Mua sắm an tâm</p>
              <p className="text-white/70 text-xs mt-1">Mật khẩu được mã hóa và bảo vệ tuyệt đối.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
