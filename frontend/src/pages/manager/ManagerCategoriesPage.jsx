import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tags, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X,
  FileText,
  Tag,
  LayoutGrid,
  ChevronRight,
  FolderTree
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
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Quản lý cây danh mục</p>
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

const InputGroup = ({ label, icon: Icon, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</label>
    <div className="relative group">
      {Icon && <Icon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors z-10" />}
      {children}
    </div>
  </div>
);

export default function ManagerCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllCategories();
      setCategories(data);
    } catch (error) {
      addToast('Không thể tải danh sách danh mục', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'name' && !selectedCategory ? { slug: value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') } : {})
    }));
  };

  const handleOpenAdd = () => {
    setFormData({ name: '', slug: '', description: '' });
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (selectedCategory) {
        await adminService.updateCategory(selectedCategory.id, formData);
        addToast('Cập nhật danh mục thành công!', 'success');
      } else {
        await adminService.createCategory(formData);
        addToast('Đã thêm danh mục mới!', 'success');
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      addToast('Lỗi: ' + (error.response?.data?.message || error.message), 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa danh mục này? Các sản phẩm thuộc danh mục sẽ bị ảnh hưởng.')) return;
    try {
      await adminService.deleteCategory(id);
      addToast('Đã xóa danh mục thành công', 'success');
      fetchCategories();
    } catch (error) {
      addToast('Lỗi khi xóa danh mục', 'error');
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <ModalLayout 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedCategory ? "Sửa Danh Mục" : "Thêm Danh Mục"} 
        icon={selectedCategory ? Edit3 : Plus}
      >
        <form onSubmit={handleSave} className="space-y-8">
          <InputGroup label="Tên Danh Mục" icon={Tag}>
            <input 
              type="text" name="name" required value={formData.name} onChange={handleInputChange}
              placeholder="Ví dụ: Máy Tạo Khói"
              className="w-full bg-slate-50 border border-slate-200 outline-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:border-indigo-500 transition-all"
            />
          </InputGroup>

          <InputGroup label="Đường dẫn (Slug)" icon={ChevronRight}>
            <input 
              type="text" name="slug" required value={formData.slug} onChange={handleInputChange}
              placeholder="may-tao-khoi"
              className="w-full bg-slate-50 border border-slate-200 outline-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:border-indigo-500 transition-all"
            />
          </InputGroup>

          <InputGroup label="Mô tả ngắn" icon={FileText}>
            <textarea 
              name="description" value={formData.description} onChange={handleInputChange}
              placeholder="Nhập mô tả danh mục..."
              rows={3}
              className="w-full bg-slate-50 border border-slate-200 outline-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:border-indigo-500 transition-all"
            />
          </InputGroup>

          <button 
            type="submit" disabled={formLoading}
            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {formLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Plus className="w-5 h-5" /> {selectedCategory ? 'Cập Nhật' : 'Tạo Mới'}</>}
          </button>
        </form>
      </ModalLayout>

      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            Quản Lý <span className="text-indigo-500">Danh Mục</span>
          </h1>
          <p className="text-slate-500 font-medium">Tổ chức sản phẩm theo cấu trúc cây và danh mục linh hoạt.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-8 py-4 bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5" /> Thêm Danh Mục
        </button>
      </div>

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-48 rounded-[2.5rem] bg-slate-100 animate-pulse" />)
        ) : (
          <AnimatePresence mode="popLayout">
            {categories.map((cat, idx) => (
              <motion.div 
                key={cat.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-500 group-hover:rotate-12 transition-all duration-500">
                    <FolderTree className="w-6 h-6 text-indigo-500 group-hover:text-white" />
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleOpenEdit(cat)}
                      className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl text-slate-400 hover:text-indigo-500 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(cat.id)}
                      className="p-3 bg-red-50 dark:bg-red-500/5 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">{cat.name}</h3>
                <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4">/{cat.slug}</p>
                <p className="text-slate-500 text-sm font-medium line-clamp-2">{cat.description || 'Không có mô tả cho danh mục này.'}</p>
                
                <div className="mt-8 pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">0 Sản phẩm</span>
                   <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {categories.length === 0 && !loading && (
        <div className="py-20 text-center space-y-4">
           <Tags className="w-16 h-16 text-slate-200 mx-auto" />
           <p className="text-slate-400 font-bold uppercase tracking-widest">Chưa có danh mục nào được tạo</p>
        </div>
      )}
    </div>
  );
}
