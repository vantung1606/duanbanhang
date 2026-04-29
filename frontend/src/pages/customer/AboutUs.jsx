import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Lightbulb, 
  ShieldCheck, 
  Award, 
  History,
  CheckCircle2,
  Zap,
  Globe,
  Heart
} from 'lucide-react';
import NeuralynNavbar from '../../components/layout/customer/NeuralynNavbar';
import NeuralynFooter from '../../components/layout/customer/NeuralynFooter';

const FloatingOrb = ({ color, size, top, left, delay }) => (
  <motion.div
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
      scale: [1, 1.05, 1],
      opacity: [0.1, 0.2, 0.1],
    }}
    transition={{
      duration: 12 + Math.random() * 5,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none blur-[100px] rounded-full z-0 opacity-10"
    style={{
      backgroundColor: color,
      width: size,
      height: size,
      top,
      left,
    }}
  />
);

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="p-6 md:p-8 rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/80 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
  >
    <div className="w-11 h-11 bg-[#4981cf] text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#4981cf]/30 group-hover:rotate-12 transition-transform">
      <Icon className="w-5 h-5" />
    </div>
    <h3 className="text-lg md:text-xl font-black text-[#1a365d] mb-3 tracking-tight">{title}</h3>
    <p className="text-[#1a365d] text-[11px] md:text-sm font-bold opacity-60 leading-relaxed">{desc}</p>
  </motion.div>
);

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#e8ebf2] font-sans selection:bg-[#4981cf] selection:text-white overflow-x-hidden relative">
      <NeuralynNavbar />

      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingOrb color="#ffffff" size="400px" top="-10%" left="70%" delay={0} />
        <FloatingOrb color="#4981cf" size="300px" top="30%" left="-5%" delay={2} />
        <FloatingOrb color="#cadaee" size="350px" top="60%" left="50%" delay={4} />
      </div>

      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="pt-40 pb-24 px-6 md:px-16 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-[#4981cf] font-heading font-black tracking-[0.5em] uppercase text-[9px] md:text-[11px] mb-8 block drop-shadow-sm">HÀNH TRÌNH DUONGDIY</span>
            <h1 className="text-4xl md:text-7xl font-heading font-black text-[#1a365d] leading-[1.1] tracking-tight mb-10">
              Chế Tác <span className="text-[#4981cf]">Cảm Xúc</span> <br />
              Từ Ánh Sáng & Khói.
            </h1>
            <p className="text-[#1a365d] text-base md:text-xl font-bold opacity-75 leading-relaxed italic">
              Chúng tôi không chỉ bán thiết bị, chúng tôi kiến tạo những khoảnh khắc bùng nổ cho mọi sự kiện.
            </p>
          </motion.div>
        </section>

        {/* Brand Story */}
        <section className="py-24 px-6 md:px-16 container mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white aspect-square"
            >
              <img 
                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80" 
                alt="Workshop" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4981cf]/60 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-4xl font-black mb-2">Est. 2018</p>
                <p className="text-[10px] font-black uppercase tracking-widest">Khởi đầu từ niềm đam mê DIY</p>
              </div>
            </motion.div>

            <div className="space-y-10">
              <div className="space-y-4">
                <span className="text-[#4981cf] font-heading font-black tracking-[0.3em] uppercase text-[10px]">CÂU CHUYỆN CỦA CHÚNG TÔI</span>
                <h2 className="text-3xl md:text-5xl font-heading font-black text-[#1a365d] tracking-tight">Từ Xưởng DIY Nhỏ Đến Thương Hiệu Pro.</h2>
              </div>
              
              <div className="space-y-6 text-[#1a365d] text-sm md:text-lg font-bold opacity-70 leading-relaxed">
                <p>
                  DuongDIY bắt đầu hành trình của mình từ một căn phòng nhỏ, nơi những chiếc máy tạo khói đầu tiên được lắp ráp thủ công bằng sự tỉ mỉ và khao khát tối ưu hóa hiệu ứng sân khấu.
                </p>
                <p>
                  Chúng tôi hiểu rằng một sự kiện thành công cần nhiều hơn là một thiết bị - nó cần một "linh hồn". Đó là lý do mọi sản phẩm của DuongDIY đều mang trong mình tiêu chuẩn kỹ thuật khắt khe nhất và sự sáng tạo không giới hạn.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="p-6 bg-white/40 rounded-3xl border border-white shadow-sm">
                  <div className="text-3xl font-black text-[#4981cf] mb-1">5+ Năm</div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-[#1a365d]">KINH NGHIỆM THỰC CHIẾN</div>
                </div>
                <div className="p-6 bg-white/40 rounded-3xl border border-white shadow-sm">
                  <div className="text-3xl font-black text-[#4981cf] mb-1">10k+</div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-[#1a365d]">SẢN PHẨM ĐÃ XUẤT XƯỞNG</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-[#4981cf] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[40%] h-full bg-white/10 blur-[120px] rounded-full translate-x-1/2" />
          
          <div className="container mx-auto px-6 md:px-16 relative z-10">
            <div className="text-center mb-20 space-y-4">
              <span className="text-[#cadaee] font-heading font-black tracking-[0.4em] uppercase text-[10px]">GIÁ TRỊ CỐT LÕI</span>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-white tracking-tight">Triết Lý Kinh Doanh</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
              <FeatureCard 
                icon={Lightbulb} 
                title="Sáng Tạo Vô Tận" 
                desc="Luôn dẫn đầu xu hướng với những công nghệ tạo khói và hiệu ứng ánh sáng thông minh nhất."
                delay={0.1}
              />
              <FeatureCard 
                icon={ShieldCheck} 
                title="Chất Lượng Thật" 
                desc="Mọi linh kiện đều được kiểm định nghiêm ngặt, đảm bảo độ bền bỉ trong môi trường khắc nghiệt."
                delay={0.2}
              />
              <FeatureCard 
                icon={Heart} 
                title="Tâm Huyết Phục Vụ" 
                desc="Chúng tôi coi sự thành công của khách hàng chính là thước đo giá trị của thương hiệu."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Team & Culture */}
        <section className="py-24 px-6 md:px-16 container mx-auto">
          <div className="text-center mb-20 space-y-4">
            <span className="text-[#4981cf] font-heading font-black tracking-[0.3em] uppercase text-[10px]">ĐỘI NGŨ KỸ THUẬT</span>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-[#1a365d] tracking-tight">Những Người "Chế Tác" Khói.</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { role: "CEO & FOUNDER", name: "Dương DIY", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
              { role: "CHIEF ENGINEER", name: "Minh Quang", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
              { role: "CREATIVE DIRECTOR", name: "Hải Anh", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" },
              { role: "CUSTOMER SUCCESS", name: "Lan Phương", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80" }
            ].map((member, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative h-[220px] md:h-[320px] rounded-3xl overflow-hidden border-2 md:border-4 border-white shadow-xl"
              >
                <img src={member.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={member.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 right-4 z-10">
                  <p className="text-[#cadaee] text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] mb-1 md:mb-2">{member.role}</p>
                  <h4 className="text-sm md:text-xl font-heading font-black text-white tracking-tight leading-tight">{member.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Global Reach */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-8">
              <span className="text-[#4981cf] font-heading font-black tracking-[0.3em] uppercase text-[10px]">TẦM NHÌN VƯƠN XA</span>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-[#1a365d] tracking-tight">Phủ Sóng Mọi Sự Kiện Toàn Quốc.</h2>
              <p className="text-[#1a365d] text-base md:text-lg font-bold opacity-60 leading-relaxed">
                Chúng tôi tự hào khi các thiết bị của DuongDIY đã góp mặt trong hơn 5.000 sự kiện lớn nhỏ, từ các quán Karaoke gia đình đến những đại nhạc hội hàng chục nghìn khán giả.
              </p>
              <div className="space-y-4">
                {[
                  "Đại lý phủ khắp 63 tỉnh thành",
                  "Hỗ trợ kỹ thuật từ xa 24/7",
                  "Hệ thống kho bãi hiện đại, giao hàng thần tốc"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-black text-[#1a365d]">
                    <CheckCircle2 className="w-5 h-5 text-[#4981cf]" />
                    <span>{text.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-[#cadaee]/30 blur-[60px] rounded-full animate-pulse" />
              <Globe className="w-full h-auto text-[#cadaee] relative z-10 animate-[spin_60s_linear_infinite]" size={400} />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 px-8 md:px-16 text-center bg-[#e8ebf2]">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="max-w-5xl mx-auto p-16 md:p-24 rounded-[4rem] bg-[#1a365d] text-white relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(26,54,93,0.4)]"
          >
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#4981cf]/20 blur-[120px] rounded-full" />
            <div className="relative z-10 space-y-10">
              <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tight leading-tight">
                Sẵn Sàng Cho <br /> <span className="text-[#cadaee]">Sự Kiện Tiếp Theo?</span>
              </h2>
              <p className="text-white/60 text-lg font-bold italic max-w-xl mx-auto leading-relaxed">
                Hãy để DuongDIY giúp bạn tạo nên những hiệu ứng sân khấu không thể quên.
              </p>
              <button className="bg-white text-[#1a365d] px-14 py-6 rounded-full font-black text-[11px] tracking-[0.3em] uppercase hover:bg-[#4981cf] hover:text-white transition-all shadow-2xl">
                LIÊN HỆ TƯ VẤN NGAY
              </button>
            </div>
          </motion.div>
        </section>

      </div>

      <NeuralynFooter />
    </div>
  );
}
