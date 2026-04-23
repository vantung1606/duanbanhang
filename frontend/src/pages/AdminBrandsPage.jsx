import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Plus, 
  Trash2, 
  X,
  Tag,
  FileText,
  Globe,
  ExternalLink
} from 'lucide-react';
import { cn } from '../lib/utils';
import { adminService } from '../services/api/adminService';
import { useToast } from '../components/common/Toast';

// Reusable Modal Layout
const ModalLayout = ({ isOpen, onClose, title, children, icon: Icon }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl shadow-slate-900/20 overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">{title}</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Quản lý đối tác & thương hiệu</p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-slate-200/50 rounded-2xl transition-colors">
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
            {children}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '' });

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllBrands();
      setBrands(data);
    } catch (error) {
      addToast('Không thể tải danh sách thương hiệu', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="space-y-10 pb-20">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            Quản Lý <span className="text-indigo-500">Thương Hiệu</span>
          </h1>
          <p className="text-slate-500 font-medium">Đối tác cung cấp và thương hiệu máy tạo khói uy tín.</p>
        </div>
        <button 
          className="flex items-center gap-2 px-8 py-4 bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all opacity-50 cursor-not-allowed"
        >
          <Plus className="w-5 h-5" /> Thêm Thương Hiệu
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
          [1,2,3,4].map(i => <div key={i} className="h-48 rounded-[2.5rem] bg-slate-100 animate-pulse" />)
        ) : (
          brands.map((brand, idx) => (
            <motion.div 
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center text-center group hover:shadow-xl transition-all"
            >
               <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Star className="w-10 h-10 text-indigo-500 fill-indigo-500/20" />
               </div>
               <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">{brand.name}</h3>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">/{brand.slug}</p>
               <div className="flex gap-2">
                  <button className="px-6 py-3 bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-colors">
                    Chi tiết
                  </button>
               </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
