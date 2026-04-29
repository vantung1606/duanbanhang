import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Plus, 
  Trash2, 
  X,
  Tag,
  ChevronRight,
  Settings2,
  PlusCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { adminService } from '../../services/api/adminService';
import { useToast } from '../../components/common/Toast';

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
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Thông số kỹ thuật sản phẩm</p>
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

export default function AdminAttributesPage() {
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  // Modal States
  const [isAttrModalOpen, setIsAttrModalOpen] = useState(false);
  const [isValueModalOpen, setIsValueModalOpen] = useState(false);
  const [selectedAttr, setSelectedAttr] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form States
  const [attrName, setAttrName] = useState('');
  const [valueName, setValueName] = useState('');

  const fetchAttributes = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllAttributes();
      setAttributes(data);
    } catch (error) {
      addToast('Không thể tải danh sách thuộc tính', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttributes();
  }, []);

  const handleCreateAttr = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await adminService.createAttribute({ name: attrName });
      addToast('Đã thêm thuộc tính mới!', 'success');
      setAttrName('');
      setIsAttrModalOpen(false);
      fetchAttributes();
    } catch (error) {
      addToast('Lỗi khi thêm thuộc tính', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleAddValue = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await adminService.addAttributeValue(selectedAttr.id, { value: valueName });
      addToast(`Đã thêm giá trị "${valueName}" vào ${selectedAttr.name}`, 'success');
      setValueName('');
      setIsValueModalOpen(false);
      fetchAttributes();
    } catch (error) {
      addToast('Lỗi khi thêm giá trị', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteAttr = async (id) => {
    if (!window.confirm('Xóa thuộc tính này sẽ ảnh hưởng đến các sản phẩm liên quan. Tiếp tục?')) return;
    try {
      await adminService.deleteAttribute(id);
      addToast('Đã xóa thuộc tính thành công', 'success');
      fetchAttributes();
    } catch (error) {
      addToast('Lỗi khi xóa thuộc tính', 'error');
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Modal: Add Attribute */}
      <ModalLayout 
        isOpen={isAttrModalOpen} 
        onClose={() => setIsAttrModalOpen(false)} 
        title="Thêm Thuộc Tính" 
        icon={Plus}
      >
        <form onSubmit={handleCreateAttr} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tên Thuộc Tính</label>
            <div className="relative">
              <Tag className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                type="text" required value={attrName} onChange={(e) => setAttrName(e.target.value)}
                placeholder="Ví dụ: Màu sắc, Công suất, Dung tích..."
                className="w-full bg-slate-50 border border-slate-200 outline-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
          <button 
            type="submit" disabled={formLoading}
            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {formLoading ? 'Đang lưu...' : 'Tạo Thuộc Tính'}
          </button>
        </form>
      </ModalLayout>

      {/* Modal: Add Value */}
      <ModalLayout 
        isOpen={isValueModalOpen} 
        onClose={() => setIsValueModalOpen(false)} 
        title={`Thêm Giá Trị cho ${selectedAttr?.name}`} 
        icon={PlusCircle}
      >
        <form onSubmit={handleAddValue} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Giá Trị Mới</label>
            <div className="relative">
              <Settings2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                type="text" required value={valueName} onChange={(e) => setValueName(e.target.value)}
                placeholder="Ví dụ: Đỏ, 1500W, 5 Lít..."
                className="w-full bg-slate-50 border border-slate-200 outline-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
          <button 
            type="submit" disabled={formLoading}
            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {formLoading ? 'Đang lưu...' : 'Thêm Giá Trị'}
          </button>
        </form>
      </ModalLayout>

      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            Thông Số <span className="text-indigo-500">Kỹ Thuật</span>
          </h1>
          <p className="text-slate-500 font-medium">Quản lý các đặc tính của sản phẩm (Màu sắc, Công suất, Dung tích...)</p>
        </div>
        <button 
          onClick={() => setIsAttrModalOpen(true)}
          className="flex items-center gap-2 px-8 py-4 bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5" /> Thêm Thuộc Tính
        </button>
      </div>

      {/* Attributes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-64 rounded-[3rem] bg-slate-100 animate-pulse" />)
        ) : (
          <AnimatePresence mode="popLayout">
            {attributes.map((attr, idx) => (
              <motion.div 
                key={attr.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 p-10 rounded-[3rem] shadow-sm hover:shadow-xl transition-all group relative"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-500 transition-all duration-500">
                    <Palette className="w-8 h-8 text-indigo-500 group-hover:text-white" />
                  </div>
                  <button 
                    onClick={() => handleDeleteAttr(attr.id)}
                    className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-6 uppercase tracking-tight">{attr.name}</h3>
                
                <div className="flex flex-wrap gap-2 mb-8 min-h-[4rem]">
                  {attr.values.map((val, vIdx) => (
                    <span key={vIdx} className="px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-100 dark:border-white/5">
                      {val}
                    </span>
                  ))}
                  {attr.values.length === 0 && <span className="text-xs font-bold text-slate-300 italic">Chưa có giá trị nào...</span>}
                </div>

                <button 
                  onClick={() => { setSelectedAttr(attr); setIsValueModalOpen(true); }}
                  className="w-full py-4 border-2 border-dashed border-slate-100 dark:border-white/10 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-indigo-500 hover:text-indigo-500 transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" /> Thêm Giá Trị
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {attributes.length === 0 && !loading && (
        <div className="py-20 text-center space-y-4">
           <Palette className="w-16 h-16 text-slate-200 mx-auto" />
           <p className="text-slate-400 font-bold uppercase tracking-widest">Không có thuộc tính nào</p>
        </div>
      )}
    </div>
  );
}
