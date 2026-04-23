import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, ArrowRight, ShieldCheck, Zap, HeartHandshake, 
  Truck, Star, ChevronRight, Globe, Award, Sparkles, 
  Monitor, Smartphone, Watch, Headphones, Play, CheckCircle2
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import useCartStore from '../../store/cart-store';

// --- Sub-Components ---

const FadeInView = ({ children, delay = 0, direction = "up" }) => {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

const FeatureBento = ({ icon: Icon, title, desc, className, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={cn(
      "group relative p-8 md:p-12 rounded-[3.5rem] bg-white/40 backdrop-blur-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-2 overflow-hidden",
      className
    )}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-transparent pointer-events-none" />
    <div className="relative z-10">
      <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-2xl font-black tracking-tighter text-slate-800 mb-4">{title}</h4>
      <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const StatItem = ({ label, value }) => (
  <div className="flex flex-col items-center md:items-start">
    <span className="text-3xl md:text-5xl font-black text-slate-800 tracking-tighter mb-1">{value}</span>
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</span>
  </div>
);

const CategoryCard = ({ icon: Icon, name, count, color }) => (
  <div className="group cursor-pointer">
    <div className={cn("w-full aspect-[4/5] rounded-[3rem] p-8 flex flex-col justify-between transition-all duration-500 group-hover:-translate-y-4 shadow-sm", color)}>
      <div className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm">
        <Icon className="w-6 h-6 text-slate-800" />
      </div>
      <div>
        <h4 className="text-2xl font-black text-white mb-1 tracking-tight">{name}</h4>
        <p className="text-white/70 text-xs font-bold uppercase tracking-widest">{count} Sản phẩm</p>
      </div>
    </div>
  </div>
);

export default function NeuralynHome() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { toggleCart, getTotalItems } = useCartStore();
  const { isAuthenticated, logout } = useAuthStore();
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-blue-400/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between transition-all duration-500 backdrop-blur-2xl bg-white/40 border-b border-white/20">
         <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500">
              <Zap className="w-6 h-6 fill-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">AETHER<span className="text-indigo-600">.</span></span>
         </div>

         <div className="hidden lg:flex items-center gap-10">
            {['Sản phẩm', 'Công nghệ', 'Ưu đãi', 'Hỗ trợ'].map((item) => (
              <a key={item} href="#" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-colors">{item}</a>
            ))}
         </div>

         <div className="flex items-center gap-4">
            <button 
              onClick={toggleCart} 
              className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center relative hover:shadow-xl transition-all text-slate-700"
            >
              <ShoppingBag className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-white">
                  {getTotalItems()}
                </span>
              )}
            </button>
            {isAuthenticated ? (
              <button 
                onClick={() => { logout(); navigate('/login'); }} 
                className="px-8 py-3.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-indigo-600 transition-all"
              >
                Protocol Exit
              </button>
            ) : (
              <Link 
                to="/login" 
                className="px-8 py-3.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-indigo-600 transition-all"
              >
                Connect
              </Link>
            )}
         </div>
      </nav>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-[60] origin-left"
        style={{ scaleX: smoothProgress }}
      />

      <main className="relative z-10 pt-32">
        
        {/* SECTION 1: HERO (THE FUTURE) */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
            <motion.div style={{ y: yHero, opacity: opacityHero }} className="max-w-6xl mx-auto z-10">
               <FadeInView delay={0.2}>
                 <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-sm mb-12">
                   <Sparkles className="w-4 h-4 text-amber-500" />
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Hệ sinh thái công nghệ 2026</span>
                 </div>
               </FadeInView>

               <FadeInView delay={0.3}>
                 <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-slate-900 leading-[0.85] mb-12">
                    NÂNG TẦM <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-600 to-blue-400">TRẢI NGHIỆM.</span>
                 </h1>
               </FadeInView>

               <FadeInView delay={0.4}>
                 <p className="text-lg md:text-2xl font-medium text-slate-400 max-w-3xl mx-auto leading-relaxed mb-16 px-4">
                    Sản phẩm của chúng tôi không chỉ là phần cứng. Đó là một tuyên ngôn về phong cách sống hiện đại, nơi công nghệ phục vụ con người một cách tinh tế nhất.
                 </p>
               </FadeInView>

               <FadeInView delay={0.5}>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button 
                      onClick={() => navigate('/catalog')}
                      className="group w-full sm:w-auto px-12 py-6 bg-slate-900 text-white rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-600 hover:shadow-[0_20px_50px_rgba(79,70,229,0.3)] transition-all duration-500 flex items-center justify-center gap-4"
                    >
                       Bắt đầu mua sắm <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                    <button className="w-full sm:w-auto px-12 py-6 bg-white border border-slate-100 text-slate-900 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-50 transition-all flex items-center justify-center">
                       Khám phá thêm
                    </button>
                 </div>
               </FadeInView>
            </motion.div>

            {/* Floating Hero Image */}
            <motion.div 
              style={{ scale: scaleImage }}
              className="mt-20 relative w-full max-w-5xl aspect-[16/9] mx-auto rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] border-[12px] border-white/50"
            >
              <img 
                src="/assets/images/hero_product.png" 
                alt="Premium Showcase" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40" />
            </motion.div>
        </section>

        {/* SECTION 2: TRUST STATS */}
        <section className="py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 border-y border-slate-100 py-20">
            <StatItem label="Khách hàng tin dùng" value="2.4M+" />
            <StatItem label="Giải thưởng thiết kế" value="12" />
            <StatItem label="Quốc gia hiện diện" value="48+" />
            <StatItem label="Hỗ trợ kỹ thuật" value="24/7" />
          </div>
        </section>

        {/* SECTION 3: CATEGORY SHOWCASE */}
        <section className="py-32 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
              <FadeInView direction="left">
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 leading-tight">
                  PHÂN KHÚC <br /> <span className="text-indigo-600">ĐỘC QUYỀN.</span>
                </h2>
              </FadeInView>
              <FadeInView direction="right">
                <p className="text-slate-500 font-medium max-w-sm mb-4 leading-relaxed">
                  Lựa chọn từ những danh mục sản phẩm được chế tác tỉ mỉ để phù hợp với mọi nhu cầu của bạn.
                </p>
              </FadeInView>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <CategoryCard icon={Monitor} name="Workstation" count={24} color="bg-indigo-600" />
              <CategoryCard icon={Smartphone} name="Mobile Gear" count={18} color="bg-slate-900" />
              <CategoryCard icon={Headphones} name="Audio Elite" count={32} color="bg-blue-500" />
              <CategoryCard icon={Watch} name="Smart Wear" count={14} color="bg-emerald-500" />
            </div>
          </div>
        </section>

        {/* SECTION 4: DEEP FEATURES (BENTO 2.0) */}
        <section className="py-40 px-6 md:px-12 lg:px-24 bg-white/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-[300px] md:auto-rows-[400px]">
              <FeatureBento 
                className="lg:col-span-8"
                icon={Globe}
                title="Kết nối không biên giới"
                desc="Toàn bộ hệ sinh thái Aether được đồng bộ hóa qua hạ tầng đám mây thế hệ mới, đảm bảo dữ liệu của bạn luôn sẵn sàng dù bạn ở bất cứ đâu."
              />
              <FeatureBento 
                className="lg:col-span-4"
                icon={Award}
                title="Bảo hành Elite"
                desc="Đặc quyền bảo hành 1 đổi 1 trong vòng 24 tháng đối với tất cả các dòng sản phẩm Signature."
              />
              <FeatureBento 
                className="lg:col-span-5"
                icon={Truck}
                title="Giao vận thần tốc"
                desc="Cam kết giao hàng trong 2h tại các thành phố lớn và miễn phí vận chuyển toàn cầu cho đơn hàng trên 5 triệu."
              />
              <FeatureBento 
                className="lg:col-span-7"
                icon={ShieldCheck}
                title="Bảo mật cấp độ quân sự"
                desc="Dữ liệu cá nhân của bạn được bảo vệ bởi chip bảo mật Quantum-Guard tích hợp trực tiếp vào phần cứng."
              />
            </div>
          </div>
        </section>

        {/* SECTION 5: INTERACTIVE SHOWCASE */}
        <section className="py-40 relative overflow-hidden bg-slate-900">
           <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(99,102,241,0.5),transparent_50%)]" />
           </div>
           
           <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-20 relative z-10">
              <FadeInView direction="right">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-indigo-600/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img src="/assets/images/product_headphones.png" alt="Featured Tech" className="w-full relative z-10" />
                </div>
              </FadeInView>

              <FadeInView direction="left">
                <div className="space-y-10">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">Cận cảnh sản phẩm</div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
                    ÂM THANH CỦA <br /> <span className="text-indigo-400">SỰ IM LẶNG.</span>
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Trang bị công nghệ chống ồn chủ động Hyper-Cancel thế hệ thứ 4, tai nghe Aether Pro mang đến không gian âm thanh thuần khiết nhất mà bạn từng trải nghiệm.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Thời lượng pin 60 giờ liên tục",
                      "Driver Titanium 50mm tùy chỉnh",
                      "Kết nối Bluetooth 5.4 Low Latency",
                      "Vật liệu Alcantara siêu mềm mại"
                    ].map((feat) => (
                      <li key={feat} className="flex items-center gap-4 text-white font-bold">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500" /> {feat}
                      </li>
                    ))}
                  </ul>
                  <button className="px-12 py-6 bg-white text-slate-900 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-500 hover:text-white transition-all shadow-2xl">
                    Đặt hàng ngay
                  </button>
                </div>
              </FadeInView>
           </div>
        </section>

        {/* SECTION 6: TESTIMONIALS */}
        <section className="py-40 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6">NHỮNG CHIA SẺ <span className="text-indigo-600">THẬT LÒNG.</span></h2>
              <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Hoàng Minh", role: "Kiến trúc sư", text: "Thiết kế của Aether thực sự khác biệt. Nó không chỉ đẹp mà còn mang lại cảm hứng làm việc mỗi ngày cho tôi." },
                { name: "Thảo Vy", role: "Content Creator", text: "Tôi chưa từng thấy hệ thống hỗ trợ nào nhanh đến thế. Mọi vấn đề của tôi đều được xử lý chỉ trong vài phút." },
                { name: "Anh Đức", role: "Tech Enthusiast", text: "Độ hoàn thiện sản phẩm ở mức cực kỳ cao. Đây chắc chắn là thương hiệu công nghệ yêu thích mới của tôi." }
              ].map((item, i) => (
                <FadeInView key={i} delay={0.2 * i}>
                  <div className="p-12 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="flex gap-1 mb-8">
                      {[...Array(5)].map((_, star) => <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-slate-600 font-medium italic mb-10 leading-relaxed text-lg">"{item.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-100" />
                      <div>
                        <p className="font-black text-slate-800 tracking-tight">{item.name}</p>
                        <p className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="py-40 px-6 relative overflow-hidden">
           <div className="max-w-5xl mx-auto rounded-[5rem] bg-slate-900 p-20 text-center relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)]">
              <div className="absolute inset-0 opacity-30">
                 <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.4),transparent_50%)]" />
              </div>
              
              <div className="relative z-10 space-y-12">
                 <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
                    SẴN SÀNG CHO <br /> <span className="text-indigo-400">BƯỚC NHẢY TIẾP THEO?</span>
                 </h3>
                 <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto">
                    Gia nhập cộng đồng 2 triệu người dùng tiên phong ngay hôm nay và nhận ưu đãi 10% cho đơn hàng đầu tiên.
                 </p>
                 <button 
                  onClick={() => navigate('/register')}
                  className="px-16 py-7 bg-white text-slate-900 rounded-full font-black text-sm uppercase tracking-[0.4em] hover:bg-indigo-500 hover:text-white transition-all shadow-2xl"
                 >
                    Đăng ký tài khoản
                 </button>
              </div>
           </div>
        </section>

        {/* EXTENDED FOOTER */}
        <footer className="bg-white border-t border-slate-100 pt-32 pb-12 px-6 md:px-12 lg:px-24">
           <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
                 <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center gap-3">
                       <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                         <Zap className="w-6 h-6 fill-white" />
                       </div>
                       <span className="text-2xl font-black tracking-tighter text-slate-900">AETHER<span className="text-indigo-600">.</span></span>
                    </div>
                    <p className="text-slate-400 font-medium max-w-sm leading-relaxed">
                      Tiên phong trong việc kết hợp nghệ thuật thiết kế và công nghệ tương lai để nâng tầm cuộc sống con người.
                    </p>
                    <div className="flex gap-4">
                       {[...Array(4)].map((_, i) => (
                         <div key={i} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all cursor-pointer" />
                       ))}
                    </div>
                 </div>
                 
                 {[
                   { title: "Sản phẩm", links: ["Workstations", "Mobile Gear", "Audio Elite", "Smart Wear", "Phụ kiện"] },
                   { title: "Hệ sinh thái", links: ["Aether Cloud", "Bảo mật Quantum", "Phần mềm Uplink", "Cộng đồng", "Tài liệu"] },
                   { title: "Công ty", links: ["Về chúng tôi", "Tuyển dụng", "Báo chí", "Liên hệ", "Chính sách"] }
                 ].map((column) => (
                   <div key={column.title} className="space-y-8">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{column.title}</h4>
                      <ul className="space-y-4">
                         {column.links.map(link => (
                           <li key={link} className="text-sm font-bold text-slate-600 hover:text-indigo-600 cursor-pointer transition-colors">{link}</li>
                         ))}
                      </ul>
                   </div>
                 ))}
              </div>
              
              <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <span className="hover:text-slate-800 cursor-pointer">Bảo mật</span>
                    <span className="hover:text-slate-800 cursor-pointer">Điều khoản</span>
                    <span className="hover:text-slate-800 cursor-pointer">Cookie</span>
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">© 2026 AETHER SYSTEM INC. ALL RIGHTS RESERVED.</span>
              </div>
           </div>
        </footer>

      </main>

      {/* Global Scrollbar Customization */}
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        html { scroll-behavior: smooth; }
      `}} />
    </div>
  );
}
