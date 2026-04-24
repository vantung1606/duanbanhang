import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History,
  AlertTriangle,
  Package,
  X,
  Plus,
  Minus,
  FileText
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
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Điều chỉnh tồn kho</p>
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

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [adjustType, setAdjustType] = useState('add'); // 'add' or 'sub'
  const [amount, setAmount] = useState(1);
  const [reason, setReason] = useState('Nhập hàng bổ sung');
  const [formLoading, setFormLoading] = useState(false);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const data = await adminService.getInventory();
      setInventory(data);
    } catch (error) {
      addToast('Không thể tải dữ liệu kho', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAdjust = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const finalAmount = adjustType === 'add' ? amount : -amount;
      await adminService.adjustStock({
        variantId: selectedVariant.variantId,
        amount: finalAmount,
        reason: reason
      });
      addToast('Đã cập nhật tồn kho thành công!', 'success');
      setIsModalOpen(false);
      fetchInventory();
    } catch (error) {
      addToast('Lỗi khi cập nhật kho', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const filteredInventory = inventory.filter(item => 
    item.productName.toLowerCase().includes(search.toLowerCase()) ||
    item.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20">
      <ModalLayout 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Điều Chỉnh Số Lượng" 
        icon={Box}
      >
        <div className="mb-8 p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Đang điều chỉnh cho:</p>
          <h4 className="text-lg font-black text-slate-800">{selectedVariant?.productName}</h4>
          <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mt-1">SKU: {selectedVariant?.sku}</p>
        </div>

        <form onSubmit={handleAdjust} className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button" onClick={() => setAdjustType('add')}
              className={cn(
                "py-6 rounded-3xl flex flex-col items-center gap-3 transition-all border-2",
                adjustType === 'add' ? "bg-emerald-50 border-emerald-500 text-emerald-700" : "bg-white border-slate-100 text-slate-400"
              )}
            >
              <Plus className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest">Nhập Kho (+)</span>
            </button>
            <button 
              type="button" onClick={() => setAdjustType('sub')}
              className={cn(
                "py-6 rounded-3xl flex flex-col items-center gap-3 transition-all border-2",
                adjustType === 'sub' ? "bg-red-50 border-red-500 text-red-700" : "bg-white border-slate-100 text-slate-400"
              )}
            >
              <Minus className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest">Xuất Kho (-)</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số Lượng</label>
            <input 
              type="number" min="1" required value={amount} onChange={(e) => setAmount(parseInt(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 outline-none px-6 py-4 rounded-2xl text-xl font-black focus:border-indigo-500 transition-all text-center"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lý Do</label>
            <div className="relative">
              <FileText className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                type="text" required value={reason} onChange={(e) => setReason(e.target.value)}
                placeholder="Ví dụ: Kiểm kho định kỳ, Nhập hàng mới..."
                className="w-full bg-slate-50 border border-slate-200 outline-none pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" disabled={formLoading}
            className={cn(
              "w-full py-5 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg transition-all disabled:opacity-50",
              adjustType === 'add' ? "bg-emerald-600 shadow-emerald-500/20 hover:bg-emerald-700" : "bg-red-600 shadow-red-500/20 hover:bg-red-700"
            )}
          >
            {formLoading ? 'Đang thực hiện...' : 'Xác Nhận Thay Đổi'}
          </button>
        </form>
      </ModalLayout>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            Quản Lý <span className="text-indigo-500">Kho Hàng</span>
          </h1>
          <p className="text-slate-500 font-medium">Theo dõi số lượng tồn kho và điều chỉnh nhập/xuất hàng.</p>
        </div>
        
        <div className="relative group w-full lg:w-96">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" placeholder="Tìm theo tên hoặc SKU..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 outline-none pl-14 pr-8 py-4 rounded-3xl text-sm font-bold shadow-sm focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
           <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500"><Package /></div>
           <div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng SKU</p>
             <p className="text-2xl font-black text-slate-800">{inventory.length}</p>
           </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
           <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500"><ArrowUpRight /></div>
           <div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Đang kinh doanh</p>
             <p className="text-2xl font-black text-slate-800">{inventory.filter(i => i.currentStock > 0).length}</p>
           </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
           <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500"><AlertTriangle /></div>
           <div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sắp hết hàng</p>
             <p className="text-2xl font-black text-slate-800">{inventory.filter(i => i.currentStock < 10).length}</p>
           </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-white/5 rounded-[3rem] border border-slate-100 dark:border-white/10 overflow-hidden shadow-xl shadow-slate-900/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 dark:border-white/10">
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sản Phẩm & SKU</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Thông Số</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Tồn Kho</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item.variantId} className="border-b border-slate-50 dark:border-white/5 hover:bg-slate-50/30 transition-colors group">
                <td className="px-10 py-8">
                   <div className="flex flex-col">
                     <span className="text-sm font-black text-slate-800 dark:text-white group-hover:text-indigo-600 transition-colors">{item.productName}</span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.sku}</span>
                   </div>
                </td>
                <td className="px-10 py-8">
                   <span className="px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest">
                     {item.attributes}
                   </span>
                </td>
                <td className="px-10 py-8 text-center">
                   <div className={cn(
                     "inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-sm",
                     item.currentStock < 10 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                   )}>
                     {item.currentStock}
                   </div>
                </td>
                <td className="px-10 py-8 text-right">
                   <button 
                    onClick={() => { setSelectedVariant(item); setIsModalOpen(true); }}
                    className="p-4 bg-indigo-500 text-white rounded-2xl shadow-lg shadow-indigo-500/20 hover:scale-110 active:scale-95 transition-all"
                   >
                     <History className="w-5 h-5" />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredInventory.length === 0 && (
          <div className="py-20 text-center space-y-4">
             <Package className="w-16 h-16 text-slate-200 mx-auto" />
             <p className="text-slate-400 font-bold uppercase tracking-widest">Không tìm thấy sản phẩm nào trong kho</p>
          </div>
        )}
      </div>
    </div>
  );
}
