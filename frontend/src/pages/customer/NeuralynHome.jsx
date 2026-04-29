import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Play, ArrowRight, Instagram, Twitter, Facebook, ChevronRight, Star, Shield, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingOrb = ({ color, size, top, left, delay }) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      scale: [1, 1.05, 1],
      opacity: [0.3, 0.5, 0.3]
    }}
    transition={{ duration: 4, repeat: Infinity, delay }}
    className="absolute rounded-full blur-[80px] pointer-events-none z-0"
    style={{ backgroundColor: color, width: size, height: size, top, left }}
  />
);

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F9F0EE]/80 backdrop-blur-xl border-b border-[#B39A84]/20 px-8 py-5 flex items-center justify-between">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
        <div className="w-10 h-10 bg-[#0A1E54] rounded-lg flex items-center justify-center">
          <Zap className="w-6 h-6 text-[#B39A84] fill-[#B39A84]" />
        </div>
        <span className="text-xl font-bold tracking-tight text-[#0A1E54]">DUONGDIY</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {['Sản phẩm', 'Quy trình', 'Về chúng tôi', 'Hỗ trợ'].map((item) => (
          <a key={item} href="#" className="text-sm font-semibold text-[#0A1E54]/70 hover:text-[#0A1E54] transition-colors uppercase tracking-widest">{item}</a>
        ))}
      </div>
      <button 
        onClick={() => navigate('/login')}
        className="px-6 py-2.5 bg-[#0A1E54] text-[#F9F0EE] text-sm font-bold rounded-full hover:bg-[#B39A84] hover:text-[#0A1E54] transition-all"
      >
        KHÁM PHÁ
      </button>
    </nav>
  );
};

export default function NeuralynHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F0EE] text-[#0A1E54] font-sans selection:bg-[#B39A84] selection:text-[#0A1E54]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden px-8">
        <FloatingOrb color="#B39A84" size="400px" top="-10%" left="60%" delay={0} />
        <FloatingOrb color="#CFC7C8" size="300px" top="40%" left="-5%" delay={2} />

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B39A84]/10 border border-[#B39A84]/30 text-[#B39A84] text-xs font-bold tracking-widest uppercase"
            >
              <Star className="w-3 h-3 fill-current" /> SỰ LỰA CHỌN CỦA CHUYÊN GIA
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#0A1E54]"
            >
              Nâng Tầm Không Gian <br/>
              <span className="text-[#B39A84]">Hiệu Ứng Ánh Sáng</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#0A1E54]/60 max-w-2xl mx-auto font-medium"
            >
              DuongDIY cung cấp các giải pháp máy tạo khói chuyên nghiệp, mang đến không gian huyền ảo và đẳng cấp cho mọi sự kiện.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <button 
                onClick={() => navigate('/catalog')}
                className="group px-10 py-5 bg-[#0A1E54] text-[#F9F0EE] rounded-full font-black text-sm tracking-widest uppercase flex items-center gap-3 hover:bg-[#B39A84] hover:text-[#0A1E54] transition-all shadow-xl shadow-[#0A1E54]/20"
              >
                XEM BỘ SƯU TẬP <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-4 text-[#0A1E54] font-black tracking-widest text-sm hover:text-[#B39A84] transition-colors group">
                <div className="w-12 h-12 rounded-full border border-[#B39A84] flex items-center justify-center group-hover:bg-[#B39A84]/10">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                XEM VIDEO REVIEW
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-8 bg-white/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { icon: Shield, title: "Độ Bền Vượt Trội", desc: "Chất liệu cao cấp, hoạt động liên tục trong môi trường khắc nghiệt." },
              { icon: Award, title: "Chất Lượng Pro", desc: "Lưu lượng khói dày, mịn và tản đều trong không gian lớn." },
              { icon: Zap, title: "Tiết Kiệm Nhiên Liệu", desc: "Công nghệ sưởi tiên tiến giúp giảm 30% lượng dung dịch tiêu thụ." }
            ].map((item, idx) => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={idx} 
                className="space-y-6 group"
              >
                <div className="w-16 h-16 bg-[#F9F0EE] rounded-2xl flex items-center justify-center border border-[#B39A84]/20 text-[#B39A84] group-hover:bg-[#0A1E54] group-hover:text-[#F9F0EE] transition-all duration-500">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black tracking-tight">{item.title}</h3>
                <p className="text-[#0A1E54]/60 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-32 px-8 overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <span className="text-[#B39A84] font-black tracking-[0.3em] uppercase text-xs">Danh mục sản phẩm</span>
              <h2 className="text-5xl font-black text-[#0A1E54] tracking-tighter">Sản phẩm tiêu biểu</h2>
            </div>
            <button className="text-sm font-black tracking-widest text-[#0A1E54] border-b-2 border-[#B39A84] pb-2 hover:text-[#B39A84] transition-colors uppercase">
              Xem tất cả sản phẩm
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: "Máy Khói 1500W Pro", type: "Professional", price: "2.450.000đ" },
              { name: "Máy Khói 900W LED", type: "Standard", price: "1.250.000đ" },
              { name: "Máy Khói Lạnh 3000W", type: "Special Effects", price: "5.800.000đ" }
            ].map((item, idx) => (
              <motion.div 
                whileHover={{ y: -15 }}
                key={idx}
                className="bg-white rounded-[3rem] p-10 border border-[#B39A84]/10 shadow-sm hover:shadow-2xl hover:shadow-[#B39A84]/10 transition-all duration-500 group"
              >
                <div className="aspect-[4/5] bg-[#F9F0EE] rounded-[2.5rem] mb-8 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1E54]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <Zap className="w-20 h-20 text-[#B39A84]/20" />
                </div>
                <div className="space-y-4">
                  <span className="text-[#B39A84] text-[10px] font-black uppercase tracking-widest">{item.type}</span>
                  <div className="flex justify-between items-start">
                    <h4 className="text-xl font-black text-[#0A1E54]">{item.name}</h4>
                    <span className="font-bold text-[#0A1E54]">{item.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A1E54] text-[#F9F0EE] pt-32 pb-16 px-8 rounded-t-[5rem]">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-20 mb-20">
            <div className="col-span-2 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#B39A84] rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#0A1E54] fill-[#0A1E54]" />
                </div>
                <span className="text-2xl font-bold tracking-tight">DUONGDIY</span>
              </div>
              <p className="text-[#F9F0EE]/60 max-w-sm text-lg font-medium">
                Chuyên gia về giải pháp máy tạo khói sân khấu và hiệu ứng ánh sáng chuyên nghiệp tại Việt Nam.
              </p>
              <div className="flex gap-6">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#B39A84] hover:text-[#0A1E54] transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <h4 className="text-lg font-black tracking-tight">Liên hệ</h4>
              <ul className="space-y-4 text-[#F9F0EE]/60 font-medium">
                <li>TP. Hồ Chí Minh, Việt Nam</li>
                <li>09xx xxx xxx</li>
                <li>duongdiy@gmail.com</li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-lg font-black tracking-tight">Công ty</h4>
              <ul className="space-y-4 text-[#F9F0EE]/60 font-medium">
                <li>Về chúng tôi</li>
                <li>Dịch vụ bảo hành</li>
                <li>Chính sách đại lý</li>
                <li>Tin tức</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-sm font-medium text-[#F9F0EE]/30 uppercase tracking-widest">
            <p>© 2026 DUONGDIY. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-10">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
