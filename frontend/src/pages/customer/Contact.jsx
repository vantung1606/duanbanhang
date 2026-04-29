import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  MessageSquare,
  Facebook,
  Instagram,
  Twitter,
  Globe,
  Zap,
  CheckCircle2
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
      duration: 12,
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

const ContactInfoCard = ({ icon: Icon, title, content, subContent }) => (
  <div className="flex gap-6 p-8 rounded-[2rem] bg-white/40 border border-white hover:bg-white transition-all group">
    <div className="w-14 h-14 bg-[#4981cf] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#4981cf]/30 group-hover:rotate-12 transition-transform">
      <Icon className="w-6 h-6" />
    </div>
    <div className="space-y-1">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4981cf]">{title}</p>
      <p className="text-lg font-black text-[#1a365d]">{content}</p>
      {subContent && <p className="text-sm font-bold text-[#1a365d]/50 italic">{subContent}</p>}
    </div>
  </div>
);

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#e8ebf2] font-sans selection:bg-[#4981cf] selection:text-white overflow-x-hidden relative">
      <NeuralynNavbar />

      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingOrb color="#ffffff" size="400px" top="-5%" left="60%" delay={0} />
        <FloatingOrb color="#4981cf" size="250px" top="40%" left="-5%" delay={2} />
        <FloatingOrb color="#cadaee" size="300px" top="70%" left="40%" delay={4} />
      </div>

      <div className="relative z-10 pt-40 pb-24 px-6 md:px-16 container mx-auto">
        
        {/* Header Section */}
        <section className="max-w-4xl mx-auto text-center mb-24 space-y-8">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
             <span className="text-[#4981cf] font-heading font-black tracking-[0.5em] uppercase text-[9px] md:text-[11px] mb-6 block">KẾT NỐI VỚI CHÚNG TÔI</span>
             <h1 className="text-4xl md:text-7xl font-heading font-black text-[#1a365d] leading-[1.1] tracking-tight">
               Hãy Để Lại <span className="text-[#4981cf]">Thông Điệp.</span>
             </h1>
             <p className="text-[#1a365d] text-base md:text-xl font-bold opacity-75 mt-8 leading-relaxed italic">
               Mọi ý kiến đóng góp hoặc yêu cầu tư vấn của bạn đều là động lực để DuongDIY phát triển.
             </p>
           </motion.div>
        </section>

        <div className="grid lg:grid-cols-5 gap-12 md:gap-20">
           
           {/* Left: Contact Form */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="lg:col-span-3 bg-white/60 backdrop-blur-2xl p-10 md:p-16 rounded-[4rem] border border-white shadow-2xl"
           >
              <div className="space-y-12">
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a365d]/40 ml-4">Họ và tên của bạn</label>
                       <input 
                         type="text" 
                         placeholder="Ví dụ: Nguyễn Văn A"
                         className="w-full bg-white/80 border-none outline-none focus:ring-2 focus:ring-[#4981cf]/20 p-5 rounded-2xl text-sm font-bold text-[#1a365d] placeholder:text-[#1a365d]/20 transition-all" 
                       />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a365d]/40 ml-4">Email liên hệ</label>
                       <input 
                         type="email" 
                         placeholder="email@vidu.com"
                         className="w-full bg-white/80 border-none outline-none focus:ring-2 focus:ring-[#4981cf]/20 p-5 rounded-2xl text-sm font-bold text-[#1a365d] placeholder:text-[#1a365d]/20 transition-all" 
                       />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a365d]/40 ml-4">Chủ đề cần tư vấn</label>
                    <select className="w-full bg-white/80 border-none outline-none focus:ring-2 focus:ring-[#4981cf]/20 p-5 rounded-2xl text-sm font-bold text-[#1a365d] appearance-none cursor-pointer">
                       <option>Tư vấn mua máy tạo khói</option>
                       <option>Yêu cầu báo giá thuê thiết bị</option>
                       <option>Hỗ trợ kỹ thuật / Bảo hành</option>
                       <option>Hợp tác đại lý / Sỉ</option>
                       <option>Khác</option>
                    </select>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a365d]/40 ml-4">Lời nhắn chi tiết</label>
                    <textarea 
                      rows="5"
                      placeholder="Chúng tôi có thể giúp gì cho bạn?"
                      className="w-full bg-white/80 border-none outline-none focus:ring-2 focus:ring-[#4981cf]/20 p-5 rounded-2xl text-sm font-bold text-[#1a365d] placeholder:text-[#1a365d]/20 transition-all resize-none"
                    ></textarea>
                 </div>

                 <button className="w-full py-6 bg-[#1a365d] text-white rounded-[1.8rem] font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl hover:bg-[#4981cf] hover:-translate-y-1 transition-all flex items-center justify-center gap-4">
                    GỬI THÔNG ĐIỆP <Send className="w-4 h-4" />
                 </button>
                 
                 <div className="flex items-center gap-6 justify-center pt-4">
                    <div className="flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                       <CheckCircle2 className="w-4 h-4" /> Bảo mật thông tin 100%
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-black text-[#4981cf] uppercase tracking-widest">
                       <Zap className="w-4 h-4" /> Phản hồi trong 30 phút
                    </div>
                 </div>
              </div>
           </motion.div>

           {/* Right: Contact Details */}
           <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                 <h2 className="text-3xl font-heading font-black text-[#1a365d] tracking-tight">Thông Tin <br /> Liên Lạc Trực Tiếp.</h2>
                 <p className="text-[#1a365d] text-base font-bold opacity-60 leading-relaxed">
                   Nếu bạn cần hỗ trợ khẩn cấp, đừng ngần ngại gọi trực tiếp cho đội ngũ kỹ thuật của chúng tôi.
                 </p>
              </div>

              <div className="flex flex-col gap-6">
                 <ContactInfoCard 
                   icon={Phone}
                   title="HOTLINE TƯ VẤN"
                   content="09XX XXX XXX"
                   subContent="Hỗ trợ 24/7 chuyên nghiệp"
                 />
                 <ContactInfoCard 
                   icon={Mail}
                   title="EMAIL PHẢN HỒI"
                   content="support@duongdiy.com"
                   subContent="Giải đáp mọi thắc mắc"
                 />
                 <ContactInfoCard 
                   icon={MapPin}
                   title="TRỤ SỞ CHÍNH"
                   content="Quận 1, TP. Hồ Chí Minh"
                   subContent="Xem vị trí trên bản đồ"
                 />
                 <ContactInfoCard 
                   icon={Clock}
                   title="GIỜ LÀM VIỆC"
                   content="08:00 - 21:00"
                   subContent="Thứ 2 - Chủ Nhật"
                 />
              </div>

              {/* Social Channels */}
              <div className="pt-10 space-y-8">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a365d]/30 text-center lg:text-left">Theo dõi hành trình của chúng tôi</p>
                 <div className="flex items-center justify-center lg:justify-start gap-4">
                    {[Facebook, Instagram, Twitter, Globe].map((Icon, i) => (
                      <motion.button 
                        key={i}
                        whileHover={{ scale: 1.1, backgroundColor: '#4981cf', color: '#fff' }}
                        className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#1a365d] shadow-sm transition-all border border-white"
                      >
                         <Icon className="w-5 h-5" />
                      </motion.button>
                    ))}
                 </div>
              </div>
           </div>

        </div>

        {/* Map Section Placeholder */}
        <section className="mt-32 relative group">
           <div className="absolute -inset-4 bg-[#4981cf]/10 blur-[60px] rounded-[4rem] group-hover:bg-[#4981cf]/20 transition-all" />
           <div className="relative h-[450px] md:h-[600px] w-full rounded-[4rem] overflow-hidden border-4 border-white shadow-2xl bg-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" 
                alt="Map Background" 
                className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-[#1a365d] text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl flex items-center gap-4">
                    <MapPin className="w-5 h-5 text-[#cadaee]" /> XEM VỊ TRÍ CHI NHÁNH TOÀN QUỐC
                 </div>
              </div>
           </div>
        </section>

      </div>

      <NeuralynFooter />
    </div>
  );
}
