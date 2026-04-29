import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Image as ImageIcon,
  Calendar,
  Tag,
  ChevronRight,
  MoreVertical,
  X,
  Save,
  Check
} from 'lucide-react';
import { cn } from '../../lib/utils';

// Mock Initial Data
const INITIAL_POSTS = [
  {
    id: 1,
    title: "Cách Vệ Sinh Lõi Sưởi Máy Tạo Khói Để Tăng Tuổi Thọ Gấp 2 Lần",
    category: "KỸ THUẬT",
    date: "2025-04-12",
    status: "Đã đăng",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "Xu Hướng Hiệu Ứng Sân Khấu Năm 2025",
    category: "XU HƯỚNG",
    date: "2025-04-08",
    status: "Đã đăng",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80"
  }
];

export default function AdminBlogManagementPage() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (id) => {
    if(window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const openModal = (post = null) => {
    setCurrentPost(post || { title: '', category: 'KỸ THUẬT', date: new Date().toISOString().split('T')[0], status: 'Bản nháp', image: '' });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentPost.id) {
      setPosts(posts.map(p => p.id === currentPost.id ? currentPost : p));
    } else {
      setPosts([...posts, { ...currentPost, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Quản Lý Tin Tức.</h1>
          <p className="text-slate-500 font-bold text-sm">Quản trị nội dung bài viết và kiến thức trên website.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-3 px-8 py-4 bg-[#1a365d] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" /> THÊM BÀI VIẾT
        </button>
      </div>

      {/* Tools Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/40 backdrop-blur-2xl p-4 rounded-[2rem] border border-white/60 shadow-sm">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#1a365d] transition-colors" />
          <input 
            type="text" 
            placeholder="Tìm kiếm tiêu đề bài viết..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/60 border-none focus:ring-2 focus:ring-[#1a365d]/20 outline-none px-12 py-3.5 rounded-2xl text-sm font-bold text-slate-800 placeholder:text-slate-400 shadow-sm transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Bộ lọc:</span>
           {['Tất cả', 'Kỹ thuật', 'Dự án'].map(f => (
             <button key={f} className="px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest bg-white/60 text-slate-500 hover:text-[#1a365d] transition-colors">{f}</button>
           ))}
        </div>
      </div>

      {/* Posts Table-like Grid */}
      <div className="bg-white/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-6 bg-slate-900/5 border-b border-slate-200/50">
           <div className="col-span-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">BÀI VIẾT</div>
           <div className="col-span-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">DANH MỤC</div>
           <div className="col-span-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">TRẠNG THÁI</div>
           <div className="col-span-2 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">THAO TÁC</div>
        </div>

        <div className="divide-y divide-slate-200/50">
           {posts.map((post) => (
             <div key={post.id} className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-white/50 transition-colors group">
                <div className="col-span-6 flex items-center gap-6">
                   <div className="w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                      <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
                   </div>
                   <div>
                      <h3 className="text-sm font-black text-slate-800 line-clamp-1 group-hover:text-[#1a365d] transition-colors">{post.title}</h3>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> {post.date}
                      </p>
                   </div>
                </div>
                <div className="col-span-2">
                   <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest border border-indigo-100">
                     {post.category}
                   </span>
                </div>
                <div className="col-span-2">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{post.status}</span>
                   </div>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                   <button onClick={() => openModal(post)} className="w-9 h-9 rounded-xl bg-white text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all shadow-sm">
                      <Edit3 className="w-4 h-4" />
                   </button>
                   <button onClick={() => handleDelete(post.id)} className="w-9 h-9 rounded-xl bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm">
                      <Trash2 className="w-4 h-4" />
                   </button>
                   <button className="w-9 h-9 rounded-xl bg-white text-slate-400 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-all shadow-sm">
                      <MoreVertical className="w-4 h-4" />
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100"
            >
              <form onSubmit={handleSave} className="flex flex-col h-full max-h-[90vh]">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                   <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                     {currentPost?.id ? 'Chỉnh Sửa Bài Viết' : 'Thêm Bài Viết Mới'}
                   </h2>
                   <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors">
                     <X className="w-5 h-5" />
                   </button>
                </div>

                <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Tiêu đề bài viết</label>
                      <input 
                        required
                        type="text" 
                        value={currentPost?.title}
                        onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                        placeholder="Nhập tiêu đề hấp dẫn..."
                        className="w-full bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#1a365d]/20 p-5 rounded-2xl text-sm font-bold text-slate-800 transition-all"
                      />
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Danh mục</label>
                        <select 
                          value={currentPost?.category}
                          onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})}
                          className="w-full bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#1a365d]/20 p-5 rounded-2xl text-sm font-bold text-slate-800 cursor-pointer appearance-none"
                        >
                           <option>KỸ THUẬT</option>
                           <option>XU HƯỚNG</option>
                           <option>ĐÁNH GIÁ</option>
                           <option>DỰ ÁN</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Ngày đăng</label>
                        <input 
                          type="date"
                          value={currentPost?.date}
                          onChange={(e) => setCurrentPost({...currentPost, date: e.target.value})}
                          className="w-full bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#1a365d]/20 p-5 rounded-2xl text-sm font-bold text-slate-800"
                        />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Ảnh bìa (URL)</label>
                      <div className="flex gap-4">
                         <div className="flex-1">
                            <input 
                              type="text" 
                              value={currentPost?.image}
                              onChange={(e) => setCurrentPost({...currentPost, image: e.target.value})}
                              placeholder="https://images.unsplash.com/..."
                              className="w-full bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#1a365d]/20 p-5 rounded-2xl text-sm font-bold text-slate-800 transition-all"
                            />
                         </div>
                         <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center border-2 border-white shadow-inner flex-shrink-0 overflow-hidden">
                            {currentPost?.image ? <img src={currentPost.image} className="w-full h-full object-cover" /> : <ImageIcon className="w-6 h-6 text-slate-300" />}
                         </div>
                      </div>
                   </div>

                   <div className="p-6 rounded-[2rem] bg-indigo-50/50 border border-indigo-100">
                      <div className="flex items-center gap-3 text-indigo-600 mb-2">
                         <Check className="w-4 h-4 font-black" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Gợi ý tối ưu SEO</span>
                      </div>
                      <p className="text-[11px] font-bold text-indigo-400 leading-relaxed italic">
                        Tiêu đề nên chứa từ khóa chính. Ảnh bìa nên có độ phân giải tối thiểu 1200x800px để hiển thị tốt nhất trên mạng xã hội.
                      </p>
                   </div>
                </div>

                <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                   <button 
                     type="button"
                     onClick={() => setIsModalOpen(false)}
                     className="flex-1 py-4 rounded-2xl bg-white border border-slate-200 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all"
                   >
                     HỦY BỎ
                   </button>
                   <button 
                     type="submit"
                     className="flex-1 py-4 rounded-2xl bg-[#1a365d] text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-[#2d3a5a] transition-all flex items-center justify-center gap-3"
                   >
                     <Save className="w-4 h-4" /> LƯU THAY ĐỔI
                   </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
