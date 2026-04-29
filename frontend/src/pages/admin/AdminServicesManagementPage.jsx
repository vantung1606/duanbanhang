import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Wrench,
  Zap,
  Check,
  X,
  Save,
  Layers,
  Monitor,
  Headphones
} from 'lucide-react';
import { cn } from '../../lib/utils';

const INITIAL_SERVICES = [
  {
    id: 1,
    title: "Bảo Trì & Sửa Chữa",
    icon: "Wrench",
    desc: "Dịch vụ sửa chữa máy khói chuyên nghiệp.",
    color: "bg-emerald-500",
    status: "Hoạt động"
  },
  {
    id: 2,
    title: "Cho Thuê Thiết Bị",
    icon: "Layers",
    desc: "Gói thuê linh hoạt cho sự kiện.",
    color: "bg-amber-500",
    status: "Hoạt động"
  }
];

export default function AdminServicesManagementPage() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const handleDelete = (id) => {
    if(window.confirm('Xóa dịch vụ này?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const openModal = (service = null) => {
    setCurrentService(service || { title: '', icon: 'Zap', desc: '', color: 'bg-[#4981cf]', status: 'Hoạt động' });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentService.id) {
      setServices(services.map(s => s.id === currentService.id ? currentService : s));
    } else {
      setServices([...services, { ...currentService, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Quản Lý Dịch Vụ.</h1>
          <p className="text-slate-500 font-bold text-sm">Quản lý các gói giải pháp kỹ thuật sân khấu.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-3 px-8 py-4 bg-[#1a365d] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" /> THÊM DỊCH VỤ
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div 
            key={service.id}
            layout
            className="p-8 bg-white/60 backdrop-blur-2xl rounded-[3rem] border border-white shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="flex items-start justify-between mb-8">
               <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", service.color)}>
                  <Zap className="w-7 h-7" />
               </div>
               <div className="flex gap-2">
                  <button onClick={() => openModal(service)} className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-[#1a365d] hover:text-white transition-all">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(service.id)} className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
               </div>
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-3">{service.title}</h3>
            <p className="text-sm font-bold text-slate-400 leading-relaxed mb-6 line-clamp-2">{service.desc}</p>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
               <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{service.status}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal - Simplified for brevity */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl p-10"
            >
              <h2 className="text-2xl font-black text-slate-800 mb-8">Chi tiết dịch vụ</h2>
              <form onSubmit={handleSave} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Tên dịch vụ</label>
                    <input 
                      value={currentService?.title}
                      onChange={(e) => setCurrentService({...currentService, title: e.target.value})}
                      className="w-full bg-slate-50 p-5 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-[#1a365d]/20"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Mô tả ngắn</label>
                    <textarea 
                      value={currentService?.desc}
                      onChange={(e) => setCurrentService({...currentService, desc: e.target.value})}
                      className="w-full bg-slate-50 p-5 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-[#1a365d]/20 h-32"
                    />
                 </div>
                 <div className="flex gap-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-xl font-black text-[10px] uppercase tracking-widest">Hủy</button>
                    <button type="submit" className="flex-1 py-4 bg-[#1a365d] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-900/20">Lưu thông tin</button>
                 </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
