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

const TornEdge = ({ color = "white", flip = false }) => (
  <div className={`absolute left-0 right-0 z-20 w-full overflow-hidden ${flip ? 'top-[-1px] rotate-180' : 'bottom-[-1px]'}`} style={{ height: '100px' }}>
    <svg 
      viewBox="0 0 1440 100" 
      preserveAspectRatio="none" 
      className="w-full h-full block"
    >
      <path 
        d="M0,50 C100,20 200,80 300,50 C400,20 500,80 600,50 C700,20 800,80 900,50 C1000,20 1100,80 1200,50 C1300,20 1400,80 1440,50 L1440,100 L0,100 Z" 
        fill={color} 
      />
      <path 
        d="M0,60 C100,35 200,85 300,60 C400,35 500,85 600,60 C700,35 800,85 900,60 C1000,35 1100,85 1200,60 C1300,35 1400,85 1440,60 L1440,100 L0,100 Z" 
        fill={color} 
        opacity="0.3"
      />
    </svg>
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
    <div className="bg-white font-sans selection:bg-indigo-600 selection:text-white overflow-x-hidden scroll-smooth custom-scrollbar">
      <NeuralynNavbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="home">
        <div className="absolute inset-0 z-0 scale-105 animate-slow-zoom">
          <img 
            src="/assets/images/nexus_bg.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent" />
        </div>

        <div className="container mx-auto px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center lg:text-left"
          >
            <span className="text-indigo-400 font-black tracking-[0.5em] uppercase text-[10px] mb-8 block">Thiết Bị Sân Khấu Chuyên Nghiệp</span>
            <h1 className="text-6xl md:text-[5.5rem] font-black text-white leading-[0.9] tracking-tighter mb-10">
              Chinh phục <br/>mọi <br/><span className="text-indigo-500">Ánh Nhìn</span>
            </h1>
            <p className="text-slate-400 text-lg mb-12 max-w-lg leading-relaxed font-medium">
              Chuyên cung cấp các dòng máy tạo khói, dung dịch khói cao cấp dành cho sân khấu, karaoke và sự kiện chuyên nghiệp.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#4f46e5' }}
              className="bg-indigo-600 text-white px-14 py-5 rounded-full font-black text-[10px] tracking-[0.3em] uppercase transition-all shadow-2xl shadow-indigo-500/30"
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
            <div className="absolute -inset-20 bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
            <img 
              src="/assets/images/hero_product.png" 
              alt="Smoke Machine" 
              className="relative z-10 w-[550px] h-auto drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        </div>
        <TornEdge color="white" />
      </section>

      {/* Production Process */}
      <section className="py-40 container mx-auto px-12 grid lg:grid-cols-2 gap-32 items-center" id="about">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          className="relative group rounded-[3.5rem] overflow-hidden shadow-2xl"
        >
          <img src="/assets/images/light_bg.png" className="w-full aspect-video object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
              <Play className="w-8 h-8 fill-current" />
            </div>
          </div>
        </motion.div>

        <div className="space-y-10">
          <span className="text-indigo-600 font-black tracking-[0.3em] uppercase text-[10px]">Tận tâm trong từng linh kiện</span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
            Quy trình chế tạo <br/>máy khói DuongDIY
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed font-medium">
            Mỗi chiếc máy tạo khói rời xưởng đều trải qua quy trình kiểm tra nghiêm ngặt về độ bền nhiệt, lưu lượng khói và độ an toàn điện, đảm bảo trải nghiệm tốt nhất cho khách hàng.
          </p>
          <div className="pt-6 flex items-center gap-6">
            <div className="w-px h-16 bg-slate-200" />
            <p className="text-slate-400 text-sm italic font-medium">"Chất lượng tạo nên thương hiệu DuongDIY"</p>
          </div>
        </div>
      </section>

      {/* Product List */}
      <section className="py-40 bg-slate-50/50" id="products">
        <div className="container mx-auto px-12">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter">Sản phẩm tiêu biểu</h2>
            <p className="text-indigo-600 font-bold tracking-widest text-[10px] uppercase italic">Mang hiệu ứng sân khấu chuyên nghiệp đến không gian của bạn</p>
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
                className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-black text-slate-800 leading-tight pr-4">{item.name}</h3>
                  <span className="text-indigo-600 font-black text-sm whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">{item.desc}</p>
                <button className="text-[10px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-1 hover:text-indigo-600 hover:border-indigo-600 transition-colors">
                  Chi Tiết
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-40 pb-20 relative overflow-hidden">
        <TornEdge color="#020617" flip={true} />
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
