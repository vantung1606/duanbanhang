import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Image as ImageIcon, 
  Edit3, 
  Trash2, 
  Layout,
  ExternalLink,
  X,
  Save,
  MousePointer2
} from 'lucide-react';
import { cn } from '../../lib/utils';

const INITIAL_BANNERS = [
  { id: 1, subtitle: "Thiết Bị Sân Khấu Chuyên Nghiệp DuongDIY", title: "KỸ THUẬT TẠO KHÓI Đỉnh Cao Pro", description: "DuongDIY cung cấp máy tạo khói, dung dịch khói chuẩn sân khấu quốc tế. Hiệu năng mạnh mẽ, bền bỉ và an toàn tuyệt đối.", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80" },
  { id: 2, subtitle: "Giải Pháp Ánh Sáng Tối Tân", title: "HIỆU ỨNG SÂN KHẤU Rực Rỡ Sắc Màu", description: "Biến hóa không gian sự kiện của bạn với hệ thống ánh sáng thông minh. Đa dạng mẫu mã, công nghệ DMX tiên tiến nhất.", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80" }
];

export default function AdminHomeManagementPage() {
  const [banners, setBanners] = useState(INITIAL_BANNERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null);

  const handleDelete = (id) => {
    if(window.confirm('Xóa banner này?')) {
      setBanners(banners.filter(b => b.id !== id));
    }
  };

  const openModal = (banner = null) => {
    setCurrentBanner(banner || { title: '', subtitle: '', image: '', description: '' });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentBanner.id) {
      setBanners(banners.map(b => b.id === currentBanner.id ? currentBanner : b));
    } else {
      setBanners([...banners, { ...currentBanner, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Quản Lý Trang Chủ.</h1>
          <p className="text-slate-500 font-bold text-sm">Quản lý banner quảng cáo và bố cục trang chủ.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-3 px-8 py-4 bg-[#1a365d] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
        >
          <ImageIcon className="w-4 h-4" /> THÊM BANNER
        </button>
      </div>

      {/* Hero Banners Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
           <Layout className="w-5 h-5 text-[#4981cf]" />
           <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest">Banners Đầu Trang</h2>
        </div>
        {banners.map((banner) => (
          <motion.div 
            key={banner.id}
            layout
            className="group relative h-64 md:h-80 rounded-[3rem] overflow-hidden border-4 border-white shadow-xl bg-slate-900"
          >
             <img src={banner.image} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt={banner.title} />
             <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
             
             <div className="absolute inset-0 p-10 md:p-16 flex flex-col justify-center">
                <span className="text-[#cadaee] text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-4">{banner.subtitle}</span>
                <h3 className="text-2xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-lg mb-4">{banner.title}</h3>
                <p className="text-white/60 text-sm font-bold line-clamp-2 max-w-md">{banner.description}</p>
             </div>

             <div className="absolute top-8 right-8 flex gap-3 translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <button onClick={() => openModal(banner)} className="w-12 h-12 rounded-2xl bg-white text-blue-500 flex items-center justify-center shadow-xl hover:bg-blue-500 hover:text-white transition-all">
                   <Edit3 className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(banner.id)} className="w-12 h-12 rounded-2xl bg-white text-red-500 flex items-center justify-center shadow-xl hover:bg-red-500 hover:text-white transition-all">
                   <Trash2 className="w-5 h-5" />
                </button>
             </div>
          </motion.div>
        ))}
      </div>

      {/* Production Video Section */}
      <div className="p-10 bg-white/60 backdrop-blur-2xl rounded-[3.5rem] border border-white shadow-sm">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
              <Play className="w-5 h-5 text-[#4981cf]" />
              <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest">Video Quy Trình Sản Xuất</h2>
           </div>
           <button className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all">
              CẬP NHẬT VIDEO
           </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
           <div className="relative aspect-video rounded-[2rem] overflow-hidden border-4 border-white shadow-xl bg-slate-900 group">
              <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-1000" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40">
                    <Play className="w-6 h-6 text-white fill-current" />
                 </div>
              </div>
              <div className="absolute top-4 right-4">
                 <button className="p-3 bg-white/90 rounded-xl text-[#1a365d] shadow-lg">
                    <Camera className="w-4 h-4" />
                 </button>
              </div>
           </div>

           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Link Video (Youtube/Direct URL)</label>
                 <input 
                   defaultValue="https://www.youtube.com/watch?v=..."
                   className="w-full bg-white/60 p-5 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-[#1a365d]/20 shadow-sm"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Tiêu đề khu vực</label>
                 <input 
                   defaultValue="Tiêu Chuẩn Chế Tác Pro"
                   className="w-full bg-white/60 p-5 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-[#1a365d]/20 shadow-sm"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Mô tả ngắn</label>
                 <textarea 
                   defaultValue="Mọi thiết bị xuất xưởng từ DuongDIY đều phải vượt qua 24 giờ test liên tục..."
                   className="w-full bg-white/60 p-5 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-[#1a365d]/20 shadow-sm h-28"
                 />
              </div>
           </div>
        </div>
      </div>

      {/* Modal - Simplified */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl p-10"
            >
              <h2 className="text-2xl font-black text-slate-800 mb-8">Thông tin banner</h2>
              <form onSubmit={handleSave} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Phụ đề (Subtitle)</label>
                    <input 
                      value={currentBanner?.subtitle}
                      onChange={(e) => setCurrentBanner({...currentBanner, subtitle: e.target.value})}
                      className="w-full bg-slate-50 p-5 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-[#1a365d]/20"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Tiêu đề chính (Title)</label>
                    <input 
                      value={currentBanner?.title}
                      onChange={(e) => setCurrentBanner({...currentBanner, title: e.target.value})}
                      className="w-full bg-slate-50 p-5 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-[#1a365d]/20"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Mô tả (Description)</label>
                    <textarea 
                      value={currentBanner?.description}
                      onChange={(e) => setCurrentBanner({...currentBanner, description: e.target.value})}
                      className="w-full bg-slate-50 p-5 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-[#1a365d]/20 h-24"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Ảnh bìa (URL)</label>
                    <input 
                      value={currentBanner?.image}
                      onChange={(e) => setCurrentBanner({...currentBanner, image: e.target.value})}
                      className="w-full bg-slate-50 p-5 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-[#1a365d]/20"
                    />
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-xl font-black text-[10px] uppercase tracking-widest">Hủy</button>
                    <button type="submit" className="flex-1 py-4 bg-[#1a365d] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-900/20">Lưu banner</button>
                 </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
