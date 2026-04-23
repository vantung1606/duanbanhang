import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NeuralynFooter() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-32 pb-12 px-6 md:px-12 lg:px-24 w-full z-20 relative">
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
  );
}
