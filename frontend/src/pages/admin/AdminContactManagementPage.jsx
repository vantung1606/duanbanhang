import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  MapPin, 
  Edit3, 
  Trash2, 
  Phone,
  Mail,
  X,
  Save,
  Globe,
  Navigation
} from 'lucide-react';
import { cn } from '../../lib/utils';

const INITIAL_BRANCHES = [
  { id: 1, city: "Hồ Chí Minh", address: "Quận 1, TP. HCM", phone: "09XX XXX XXX", email: "hcm@duongdiy.com" },
  { id: 2, city: "Hà Nội", address: "Quận Đống Đa, Hà Nội", phone: "09XX XXX XXX", email: "hn@duongdiy.com" }
];

export default function AdminContactManagementPage() {
  const [branches, setBranches] = useState(INITIAL_BRANCHES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(null);

  const handleDelete = (id) => {
    if(window.confirm('Xóa chi nhánh này?')) {
      setBranches(branches.filter(b => b.id !== id));
    }
  };

  const openModal = (branch = null) => {
    setCurrentBranch(branch || { city: '', address: '', phone: '', email: '' });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentBranch.id) {
      setBranches(branches.map(b => b.id === currentBranch.id ? currentBranch : b));
    } else {
      setBranches([...branches, { ...currentBranch, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Quản Lý Liên Hệ.</h1>
          <p className="text-slate-500 font-bold text-sm">Quản lý hệ thống chi nhánh và thông tin liên lạc.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-3 px-8 py-4 bg-[#1a365d] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" /> THÊM CHI NHÁNH
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {branches.map((branch) => (
          <motion.div 
            key={branch.id}
            layout
            className="p-10 bg-white/60 backdrop-blur-2xl rounded-[3.5rem] border border-white shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4981cf]/5 rounded-bl-full" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">{branch.city}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CHI NHÁNH CHÍNH THỨC</p>
                  </div>
               </div>
               <div className="flex gap-2">
                  <button onClick={() => openModal(branch)} className="w-10 h-10 rounded-xl bg-white text-blue-500 flex items-center justify-center shadow-sm hover:bg-blue-500 hover:text-white transition-all">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(branch.id)} className="w-10 h-10 rounded-xl bg-white text-red-500 flex items-center justify-center shadow-sm hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
               </div>
            </div>

            <div className="space-y-6 relative z-10">
               <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
                  <Navigation className="w-4 h-4 text-slate-400" /> {branch.address}
               </div>
               <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400" /> {branch.phone}
               </div>
               <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" /> {branch.email}
               </div>
            </div>
          </motion.div>
        ))}
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
              <h2 className="text-2xl font-black text-slate-800 mb-8">Thông tin chi nhánh</h2>
              <form onSubmit={handleSave} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Thành phố</label>
                    <input 
                      value={currentBranch?.city}
                      onChange={(e) => setCurrentBranch({...currentBranch, city: e.target.value})}
                      className="w-full bg-slate-50 p-5 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-[#1a365d]/20"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Địa chỉ cụ thể</label>
                    <input 
                      value={currentBranch?.address}
                      onChange={(e) => setCurrentBranch({...currentBranch, address: e.target.value})}
                      className="w-full bg-slate-50 p-5 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-[#1a365d]/20"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Hotline</label>
                      <input 
                        value={currentBranch?.phone}
                        onChange={(e) => setCurrentBranch({...currentBranch, phone: e.target.value})}
                        className="w-full bg-slate-50 p-5 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-[#1a365d]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Email</label>
                      <input 
                        value={currentBranch?.email}
                        onChange={(e) => setCurrentBranch({...currentBranch, email: e.target.value})}
                        className="w-full bg-slate-50 p-5 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-[#1a365d]/20"
                      />
                    </div>
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-xl font-black text-[10px] uppercase tracking-widest">Hủy</button>
                    <button type="submit" className="flex-1 py-4 bg-[#1a365d] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-900/20">Lưu chi nhánh</button>
                 </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
