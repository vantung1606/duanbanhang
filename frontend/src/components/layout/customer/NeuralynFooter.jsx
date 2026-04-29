import { Zap, Facebook, Twitter, Instagram, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NeuralynFooter() {
  return (
    <footer className="bg-[#1a365d] pt-20 pb-12 px-6 md:px-12 lg:px-24 w-full z-20 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#4981cf]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#1a365d] flex items-center justify-center font-black italic text-xl shadow-xl">
                D
              </div>
              <span className="text-2xl font-black tracking-tighter text-white italic font-heading">DUONGDIY<span className="text-[#4981cf]">.</span></span>
            </div>
            <p className="text-white/60 font-bold text-sm leading-relaxed max-w-xs">
              Giải pháp máy tạo khói sân khấu hàng đầu Việt Nam. Mang nghệ thuật ánh sáng tới không gian của bạn.
            </p>
            <div className="flex gap-3">
               {[Facebook, Twitter, Instagram, Globe].map((Icon, i) => (
                 <div key={i} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white hover:text-[#1a365d] transition-all cursor-pointer border border-white/10 group">
                   <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                 </div>
               ))}
            </div>
          </div>
          
          {[
            { title: "Sản phẩm", links: ["Máy khói 1500W", "Máy khói Mini", "Máy khói lạnh", "Dung dịch khói", "Phụ kiện stage"] },
            { title: "Hỗ trợ", links: ["Hướng dẫn vệ sinh", "Chính sách bảo hành", "Đổi trả 30 ngày", "Vận chuyển", "Kỹ thuật"] },
            { title: "Liên hệ", links: ["duongdiy@gmail.com", "09xx xxx xxx", "TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng"] }
          ].map((column) => (
            <div key={column.title} className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4981cf]">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map(link => (
                  <li key={link} className="text-[13px] font-bold text-white/50 hover:text-white cursor-pointer transition-colors">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
            <span className="hover:text-white cursor-pointer transition-colors">Bảo mật</span>
            <span className="hover:text-white cursor-pointer transition-colors">Điều khoản</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">© 2026 DUONGDIY PRO STAGE. ALL RIGHTS RESERVED.</span>
        </div>
      </div>
    </footer>
  );
}
