import { motion } from 'framer-motion';
import { 
  Wrench, 
  Settings, 
  Truck, 
  Headphones, 
  Calendar, 
  Lightbulb, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Monitor
} from 'lucide-react';
import NeuralynNavbar from '../../components/layout/customer/NeuralynNavbar';
import NeuralynFooter from '../../components/layout/customer/NeuralynFooter';

const FloatingOrb = ({ color, size, top, left, delay }) => (
  <motion.div
    animate={{
      y: [0, -40, 0],
      x: [0, 30, 0],
      scale: [1, 1.1, 1],
      opacity: [0.1, 0.2, 0.1],
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none blur-[120px] rounded-full z-0 opacity-10"
    style={{
      backgroundColor: color,
      width: size,
      height: size,
      top,
      left,
    }}
  />
);

const ServiceCard = ({ icon: Icon, title, desc, features, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="relative group p-10 md:p-12 rounded-[3rem] bg-white/60 backdrop-blur-2xl border border-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-[0.03] rounded-bl-full group-hover:scale-150 transition-transform duration-700`} />
    
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-lg text-white ${color} group-hover:rotate-12 transition-transform`}>
      <Icon className="w-8 h-8" />
    </div>
    
    <h3 className="text-2xl md:text-3xl font-black text-[#1a365d] mb-6 tracking-tight">{title}</h3>
    <p className="text-[#1a365d] text-sm md:text-base font-bold opacity-60 leading-relaxed mb-8">{desc}</p>
    
    <ul className="space-y-4 mb-10">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-xs md:text-sm font-black text-[#1a365d]/80 uppercase tracking-wide">
          <Zap className="w-3.5 h-3.5 text-[#4981cf]" />
          {f}
        </li>
      ))}
    </ul>
    
    <button className="flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#4981cf] group-hover:gap-5 transition-all">
      TÌM HIỂU THÊM <ArrowRight className="w-4 h-4" />
    </button>
  </motion.div>
);

export default function Services() {
  return (
    <div className="min-h-screen bg-[#e8ebf2] font-sans selection:bg-[#4981cf] selection:text-white overflow-x-hidden relative">
      <NeuralynNavbar />

      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingOrb color="#4981cf" size="500px" top="-10%" left="50%" delay={0} />
        <FloatingOrb color="#ffffff" size="300px" top="40%" left="10%" delay={5} />
      </div>

      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6 md:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
             <span className="text-[#4981cf] font-heading font-black tracking-[0.5em] uppercase text-[9px] md:text-[11px] mb-8 block drop-shadow-sm">GIẢI PHÁP TOÀN DIỆN</span>
             <h1 className="text-4xl md:text-7xl font-heading font-black text-[#1a365d] leading-[1.1] tracking-tight mb-8">
               Dịch Vụ <span className="text-[#4981cf]">Kỹ Thuật</span> <br />
               Hạng Thượng Lưu.
             </h1>
             <p className="text-[#1a365d] text-base md:text-xl font-bold opacity-75 max-w-2xl mx-auto leading-relaxed italic">
               Chúng tôi không chỉ cung cấp thiết bị, chúng tôi đồng hành cùng sự thành công của mọi sân khấu.
             </p>
          </motion.div>
        </section>

        {/* Main Services Grid */}
        <section className="py-24 px-6 md:px-16 container mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
            <ServiceCard 
              icon={Wrench}
              title="Bảo Trì & Sửa Chữa"
              desc="Hệ thống trung tâm bảo hành chuyên nghiệp, sẵn sàng hồi sinh thiết bị của bạn trong thời gian ngắn nhất."
              features={["Thay thế linh kiện chính hãng", "Vệ sinh lõi sưởi bằng máy chuyên dụng", "Kiểm tra định kỳ 6 tháng"]}
              color="bg-emerald-500"
              delay={0.1}
            />
            <ServiceCard 
              icon={Calendar}
              title="Cho Thuê Thiết Bị"
              desc="Giải pháp tiết kiệm cho các sự kiện ngắn ngày, hội nghị hoặc quay phim Studio với chi phí cực kỳ ưu đãi."
              features={["Gói thuê linh hoạt theo ngày", "Hỗ trợ lắp đặt tận nơi", "Thiết bị luôn ở tình trạng mới 99%"]}
              color="bg-amber-500"
              delay={0.2}
            />
            <ServiceCard 
              icon={Lightbulb}
              title="Tư Vấn & Thiết Kế"
              desc="Đội ngũ kỹ thuật tư vấn giải pháp setup máy khói và ánh sáng phù hợp với từng diện tích và mục đích sử dụng."
              features={["Khảo sát mặt bằng miễn phí", "Thiết kế sơ đồ lắp đặt DMX", "Tối ưu hóa chi phí đầu tư"]}
              color="bg-[#4981cf]"
              delay={0.3}
            />
            <ServiceCard 
              icon={Headphones}
              title="Hỗ Trợ 24/7"
              desc="Dịch vụ hỗ trợ khẩn cấp qua Video Call hoặc trực tiếp cho các quán Bar, Vũ trường khi gặp sự cố kỹ thuật."
              features={["Phản hồi trong 15 phút", "Kỹ thuật viên lành nghề", "Cho mượn máy thay thế khi bảo hành"]}
              color="bg-rose-500"
              delay={0.4}
            />
          </div>
        </section>

        {/* Support Stats Area */}
        <section className="py-32 bg-[#1a365d] text-white relative overflow-hidden">
           <div className="absolute inset-0 opacity-10" 
                style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
           
           <div className="container mx-auto px-6 md:px-16 relative z-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                 {[
                   { val: "15m", label: "PHẢN HỒI NHANH" },
                   { val: "24/7", label: "HỖ TRỢ KỸ THUẬT" },
                   { val: "100%", label: "LINH KIỆN CHÍNH HÃNG" },
                   { val: "FREE", label: "KHẢO SÁT TẬN NƠI" }
                 ].map((stat, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, scale: 0.8 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                   >
                      <div className="text-4xl md:text-6xl font-black mb-4 text-[#cadaee] tracking-tighter">{stat.val}</div>
                      <div className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] opacity-50">{stat.label}</div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 px-6 md:px-16 container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 space-y-10">
               <div className="space-y-4">
                  <span className="text-[#4981cf] font-heading font-black tracking-[0.3em] uppercase text-[10px]">TẠI SAO LÀ DUONGDIY?</span>
                  <h2 className="text-3xl md:text-5xl font-heading font-black text-[#1a365d] tracking-tight">Kỹ Thuật Là Linh Hồn Của Dịch Vụ.</h2>
               </div>
               
               <p className="text-[#1a365d] text-base md:text-lg font-bold opacity-60 leading-relaxed">
                 Chúng tôi không chỉ là người bán, chúng tôi là những kỹ sư DIY đam mê công nghệ. Mọi giải pháp dịch vụ của DuongDIY đều được đúc kết từ hàng nghìn giờ thực chiến trên sân khấu.
               </p>

               <div className="space-y-4">
                  {[
                    { icon: ShieldCheck, text: "Cam kết thiết bị hoạt động 100% trong suốt sự kiện." },
                    { icon: Layers, text: "Sử dụng dung dịch khói độc quyền không gây nghẹt sưởi." },
                    { icon: Monitor, text: "Phần mềm điều khiển thông minh tích hợp trên Smartphone." }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-5 p-4 rounded-2xl bg-white/40 border border-white hover:bg-white transition-all">
                       <item.icon className="w-5 h-5 text-[#4981cf]" />
                       <span className="text-xs md:text-sm font-black text-[#1a365d] uppercase tracking-wide">{item.text}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
               <div className="space-y-4 mt-12">
                  <div className="h-64 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white">
                    <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Service 1" />
                  </div>
                  <div className="h-48 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white">
                    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Service 2" />
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="h-48 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white">
                    <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Service 3" />
                  </div>
                  <div className="h-64 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white">
                    <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Service 4" />
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* CTA Contact */}
        <section className="py-24 px-8 md:px-16 text-center">
           <motion.div
             whileHover={{ scale: 1.01 }}
             className="max-w-6xl mx-auto p-16 md:p-24 rounded-[4rem] bg-[#4981cf] text-white relative overflow-hidden shadow-2xl"
           >
              <div className="absolute top-0 right-0 w-1/3 h-full bg-white/10 blur-[100px] rounded-full" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-left">
                 <div className="space-y-6">
                    <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tight leading-tight">Yêu Cầu Dịch Vụ <br /> <span className="text-[#cadaee]">Ngay Bây Giờ.</span></h2>
                    <p className="text-white/70 text-lg font-bold italic">Báo giá trong vòng 30 phút cho mọi yêu cầu sửa chữa hoặc cho thuê.</p>
                 </div>
                 <div className="flex flex-col gap-4 w-full md:w-auto">
                    <button className="bg-white text-[#4981cf] px-12 py-5 rounded-full font-black text-[11px] tracking-[0.3em] uppercase hover:bg-[#1a365d] hover:text-white transition-all shadow-xl">
                      GỬI YÊU CẦU TRỰC TUYẾN
                    </button>
                    <button className="bg-[#1a365d] text-white px-12 py-5 rounded-full font-black text-[11px] tracking-[0.3em] uppercase hover:bg-white hover:text-[#1a365d] transition-all shadow-xl border border-white/10">
                      GỌI HOTLINE: 09XX XXX XXX
                    </button>
                 </div>
              </div>
           </motion.div>
        </section>

      </div>

      <NeuralynFooter />
    </div>
  );
}
