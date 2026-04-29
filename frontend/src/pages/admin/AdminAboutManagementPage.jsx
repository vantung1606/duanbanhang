import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Users,
  UserPlus,
  Camera,
  X,
  Save,
  Award
} from 'lucide-react';
import { cn } from '../../lib/utils';

const INITIAL_TEAM = [
  { id: 1, name: "Dương DIY", role: "CEO & FOUNDER", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Minh Quang", role: "CHIEF ENGINEER", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" }
];

export default function AdminAboutManagementPage() {
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);

  const handleDelete = (id) => {
    if(window.confirm('Xóa thành viên này?')) {
      setTeam(team.filter(m => m.id !== id));
    }
  };

  const openModal = (member = null) => {
    setCurrentMember(member || { name: '', role: '', image: '' });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentMember.id) {
      setTeam(team.map(m => m.id === currentMember.id ? currentMember : m));
    } else {
      setTeam([...team, { ...currentMember, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Quản Lý Giới Thiệu.</h1>
          <p className="text-slate-500 font-bold text-sm">Quản lý đội ngũ nhân sự và văn hóa công ty.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-3 px-8 py-4 bg-[#1a365d] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
        >
          <UserPlus className="w-4 h-4" /> THÊM NHÂN SỰ
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member) => (
          <motion.div 
            key={member.id}
            layout
            className="relative group bg-white/60 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden border border-white shadow-sm hover:shadow-xl transition-all"
          >
            <div className="aspect-[4/5] overflow-hidden relative">
               <img src={member.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={member.name} />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               
               <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform">
                  <button onClick={() => openModal(member)} className="w-10 h-10 rounded-xl bg-white text-[#1a365d] flex items-center justify-center shadow-lg hover:bg-[#1a365d] hover:text-white transition-all">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(member.id)} className="w-10 h-10 rounded-xl bg-white text-red-500 flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
               </div>
            </div>
            
            <div className="p-6 text-center">
               <h3 className="text-lg font-black text-slate-800 tracking-tight">{member.name}</h3>
               <p className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em] mt-1">{member.role}</p>
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
              <h2 className="text-2xl font-black text-slate-800 mb-8">Thông tin nhân sự</h2>
              <form onSubmit={handleSave} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Họ và tên</label>
                    <input 
                      value={currentMember?.name}
                      onChange={(e) => setCurrentMember({...currentMember, name: e.target.value})}
                      className="w-full bg-slate-50 p-5 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-[#1a365d]/20"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Chức vụ</label>
                    <input 
                      value={currentMember?.role}
                      onChange={(e) => setCurrentMember({...currentMember, role: e.target.value})}
                      className="w-full bg-slate-50 p-5 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-[#1a365d]/20"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Ảnh (URL)</label>
                    <input 
                      value={currentMember?.image}
                      onChange={(e) => setCurrentMember({...currentMember, image: e.target.value})}
                      className="w-full bg-slate-50 p-5 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-[#1a365d]/20"
                    />
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-xl font-black text-[10px] uppercase tracking-widest">Hủy</button>
                    <button type="submit" className="flex-1 py-4 bg-[#1a365d] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-900/20">Cập nhật</button>
                 </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
