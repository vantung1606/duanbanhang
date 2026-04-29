import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Facebook, 
  Twitter, 
  Instagram, 
  Globe,
  Search,
  ShoppingCart,
  Menu as MenuIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import NeuralynNavbar from '../../components/layout/customer/NeuralynNavbar';

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
    className="absolute pointer-events-none blur-[100px] rounded-full z-0"
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
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.15] bg-slate-900 rounded-[3.5rem]">
    <div 
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(#22d3ee 1.5px, transparent 1.5px), linear-gradient(90deg, #22d3ee 1.5px, transparent 1.5px)`,
        backgroundSize: '60px 60px',
        perspective: '1000px',
        transform: 'rotateX(60deg) scale(2.5) translateY(-50px)',
        transformOrigin: '50% 100%',
        maskImage: 'linear-gradient(to top, black 40%, transparent 100%)'
      }}
    />
  </div>
);

const MenuItem = ({ name, price, description }) => (
  <motion.div 
    whileHover={{ y: -8, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
    className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/50 flex flex-col justify-between group h-full shadow-sm"
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-2xl font-black text-slate-800 tracking-tighter group-hover:text-[#c49b63] transition-colors">{name}</h3>
      <span className="text-xl font-black text-[#c49b63]">${price}</span>
    </div>
    <p className="text-slate-500 font-medium leading-relaxed text-sm">
      {description}
    </p>
  </motion.div>
);

export default function NeuralynHome() {
  return (
    <div className="bg-slate-900 font-sans selection:bg-indigo-600 selection:text-white overflow-x-hidden scroll-smooth custom-scrollbar relative">
      <NeuralynNavbar />

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center pt-20 pb-[10vw] bg-gray-900 z-30" 
        id="home"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 3vw), 0 100%)' }}
      >
        <div className="container mx-auto px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-gray-400 font-black tracking-[0.5em] uppercase text-[10px] mb-8 block">Thiết Bị Sân Khấu Chuyên Nghiệp DuongDIY</h2>
            <h1 className="text-5xl md:text-[4.5rem] font-black text-white leading-[1.1] tracking-tighter mb-10">
              Máy Tạo Khói <br/> <span className="text-cyan-400">Chinh Phục Mọi Ánh Nhìn</span>
            </h1>
            <p className="text-gray-400 text-lg mb-12 max-w-lg leading-relaxed font-medium">
              DuongDIY - Đơn vị hàng đầu chuyên cung cấp máy tạo khói, dung dịch khói và giải pháp hiệu ứng sân khấu cao cấp. Nâng tầm không gian sự kiện, quán bar và phòng karaoke VIP của bạn.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#22d3ee' }}
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-14 py-5 rounded-full font-black text-[10px] tracking-[0.3em] uppercase transition-all shadow-xl shadow-cyan-900/20"
            >
              Khám Phá Ngay
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, type: "spring" }}
            className="hidden lg:block relative"
          >
            <div className="absolute -inset-20 bg-indigo-500/20 blur-[100px] rounded-full animate-pulse" />
            <img 
              src="/assets/images/homepage.png" 
              alt="Homepage Image" 
              className="relative z-10 w-full max-w-[600px] h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
      </section>

      {/* Production Process */}
      <section 
        className="relative pt-[12vw] pb-[16vw] bg-white z-20" 
        id="about"
        style={{ marginTop: '-3vw', clipPath: 'polygon(0 3vw, 100% 0, 100% calc(100% - 3vw), 0 100%)' }}
      >
        <div className="container mx-auto px-12 grid lg:grid-cols-2 gap-32 items-center relative z-10">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            viewport={{ once: true }}
            className="relative group rounded-[3.5rem] overflow-hidden shadow-2xl shadow-cyan-900/10 w-full aspect-video bg-slate-900 flex items-center justify-center border border-slate-800"
          >
            {/* 3D Visuals from Login */}
            <PerspectiveGrid />
            <FloatingOrb color="#22d3ee" size="300px" top="-10%" left="-10%" delay={0} />
            <FloatingOrb color="#3b82f6" size="250px" top="50%" left="60%" delay={1} />
            <FloatingOrb color="#8b5cf6" size="200px" top="20%" left="40%" delay={2} />

            <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center z-10">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-cyan-400 cursor-pointer hover:scale-110 transition-transform shadow-xl border border-white/20 hover:bg-white/20">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
            </div>
          </motion.div>

          <div className="space-y-10">
            <span className="text-indigo-600 font-black tracking-[0.3em] uppercase text-[10px]">Tận tâm trong từng linh kiện</span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Quy trình chế tạo <br/>máy khói DuongDIY
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              Mỗi chiếc máy tạo khói rời xưởng đều trải qua quy trình kiểm tra nghiêm ngặt về độ bền nhiệt, lưu lượng khói và độ an toàn điện, đảm bảo trải nghiệm tốt nhất cho khách hàng.
            </p>
            <div className="pt-6 flex items-center gap-6">
              <div className="w-px h-16 bg-slate-300" />
              <p className="text-slate-500 text-sm italic font-medium">"Chất lượng tạo nên thương hiệu DuongDIY"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product List */}
      <section 
        className="relative pt-[12vw] pb-[16vw] bg-gray-900 z-10" 
        id="products"
        style={{ marginTop: '-3vw', clipPath: 'polygon(0 3vw, 100% 0, 100% calc(100% - 3vw), 0 100%)' }}
      >
        <div className="container mx-auto px-12">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-5xl font-black text-white mb-6 tracking-tighter">Sản phẩm tiêu biểu</h2>
            <p className="text-cyan-400 font-bold tracking-widest text-[10px] uppercase italic">Mang hiệu ứng sân khấu chuyên nghiệp đến không gian của bạn</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: "Máy Khói 400W Mini", price: "850.000đ", desc: "Dành cho phòng karaoke gia đình, nhỏ gọn, lên khói nhanh." },
              { name: "Máy Khói 900W Sân Khấu", price: "1.250.000đ", desc: "Hiệu suất mạnh mẽ, phù hợp quán bar, phòng bay." },
              { name: "Máy Khói 1500W Pro", price: "2.450.000đ", desc: "Công suất cực đại, điều khiển DMX, dành cho sự kiện lớn." },
              { name: "Dung Dịch Khói 5L", price: "250.000đ", desc: "Khói trắng, dày, lâu tan, không mùi, an toàn tuyệt đối." },
              { name: "Tinh Dầu Khói Bạc Hà", price: "120.000đ", desc: "Tạo hương thơm mát lạnh sảng khoái cho không gian." },
              { name: "Máy Tạo Khói Lạnh 3000W", price: "5.800.000đ", desc: "Hiệu ứng khói bay là là mặt đất cực kỳ đẳng cấp." },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -12 }}
                className="bg-gray-800 p-12 rounded-[3rem] border border-gray-700 shadow-xl hover:shadow-2xl hover:border-gray-600 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-black text-white leading-tight pr-4">{item.name}</h3>
                  <span className="text-cyan-400 font-black text-sm whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8">{item.desc}</p>
                <button className="text-[10px] font-black uppercase tracking-widest text-white border-b-2 border-white pb-1 hover:text-cyan-400 hover:border-cyan-400 transition-colors">
                  Chi Tiết
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        className="relative pt-[10vw] pb-[14vw] bg-[#22D3EE]" 
        id="testimonials"
        style={{ marginTop: '-3vw', clipPath: 'polygon(0 3vw, 100% 0, 100% calc(100% - 3vw), 0 100%)', zIndex: 5 }}
      >
        <div className="container mx-auto px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter">Đánh Giá Khách Hàng</h2>
            <p className="text-slate-800 font-bold tracking-widest text-[10px] uppercase italic">Sự hài lòng của bạn là thành công của chúng tôi</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Anh Tuấn (DJ)", role: "Quán Bar Quận 1", text: "Máy khói DuongDIY đánh rất bốc, lượng khói phủ kín sàn chỉ trong vài giây. Rất hài lòng về hiệu suất của máy 1500W!" },
              { name: "Chị Lan Anh", role: "Quản lý sự kiện", text: "Mình mua 3 máy cho công ty tổ chức sự kiện. Máy chạy êm, ít bị nghẹt sưởi như mấy dòng giá rẻ trước đây. Sẽ tiếp tục ủng hộ." },
              { name: "Minh Hoàng", role: "Karaoke VIP", text: "Dung dịch khói bạc hà mùi cực kỳ dễ chịu, khách khen rất nhiều. Máy khói mini 400W nhỏ mà có võ, rất phù hợp với phòng VIP." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white/30 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/40 shadow-xl shadow-cyan-900/10"
              >
                <div className="flex text-amber-600 mb-6">
                  {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                </div>
                <p className="text-slate-900 font-medium leading-relaxed mb-8 italic">"{item.text}"</p>
                <div>
                  <h4 className="text-lg font-black text-slate-900">{item.name}</h4>
                  <p className="text-slate-800 text-xs font-bold uppercase tracking-wider mt-1">{item.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="bg-gradient-to-b from-slate-900 to-slate-950 pt-[16vw] pb-20 relative overflow-hidden z-0"
        style={{ marginTop: '-3vw', clipPath: 'polygon(0 3vw, 100% 0, 100% 100%, 0 100%)' }}
      >
        <div className="container mx-auto px-12 relative z-10 grid md:grid-cols-3 gap-24 text-white">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center font-black italic">D</div>
              <span className="text-2xl font-black italic tracking-tighter">DuongDIY</span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed">
              Thương hiệu hàng đầu về giải pháp tạo khói và hiệu ứng sân khấu tại Việt Nam. Uy tín - Chất lượng - Tận tâm.
            </p>
          </div>

          <div className="space-y-8">
             <h4 className="text-lg font-black tracking-tight">Liên Hệ</h4>
             <ul className="space-y-4 text-slate-400 font-medium">
               <li>Email: duongdiy@techchain.com</li>
               <li>Hotline: 09xx xxx xxx</li>
               <li>Địa chỉ: TP. Hồ Chí Minh, Việt Nam</li>
             </ul>
          </div>

          <div className="space-y-8">
             <h4 className="text-lg font-black tracking-tight">Theo Dõi</h4>
             <div className="flex gap-4">
                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                  <div key={i} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all cursor-pointer">
                    <Icon className="w-5 h-5" />
                  </div>
                ))}
             </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 25s infinite ease-in-out;
        }
      `}} />
    </div>
  );
}
