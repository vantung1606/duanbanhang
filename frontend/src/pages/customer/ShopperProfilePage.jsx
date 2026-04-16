import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  MapPin, 
  Settings, 
  CreditCard, 
  Package, 
  ChevronRight,
  User,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const TabButton = ({ active, icon: Icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
      active 
        ? 'bg-shopper-emerald text-white shadow-3d-emerald scale-105' 
        : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
    }`}
  >
    <Icon className="w-4 h-4" /> {label}
  </button>
);

export default function ShopperProfilePage() {
  const [activeTab, setActiveTab] = useState('orders');
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/shop');
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-20 animate-in fade-in duration-1000">
      
      {/* Profile Header */}
      <header className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-20">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-[2.5rem] bg-shopper-mint flex items-center justify-center border-4 border-white shadow-3d-mint">
            <User className="w-16 h-16 text-shopper-emerald" />
          </div>
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.2em] mb-3">
               Diamond Member
            </div>
            <h1 className="text-5xl font-black tracking-tighter uppercase text-slate-900">{user?.username}</h1>
            <p className="text-slate-400 font-bold mt-1 uppercase text-[10px] tracking-widest">Thành viên từ 2024 · v-tung@techchain.com</p>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-8 py-4 rounded-full border border-red-100 text-red-500 hover:bg-red-50 transition-all font-black text-xs uppercase tracking-widest"
        >
          <LogOut className="w-4 h-4" /> Đăng xuất
        </button>
      </header>

      {/* Tab Management */}
      <div className="space-y-12">
        <div className="flex flex-wrap gap-3 pb-8 border-b border-slate-100 focus-within:outline-none">
          <TabButton active={activeTab === 'orders'} icon={ShoppingBag} label="Đơn hàng" onClick={() => setActiveTab('orders')} />
          <TabButton active={activeTab === 'addresses'} icon={MapPin} label="Địa chỉ" onClick={() => setActiveTab('addresses')} />
          <TabButton active={activeTab === 'payments'} icon={CreditCard} label="Thanh toán" onClick={() => setActiveTab('payments')} />
          <TabButton active={activeTab === 'settings'} icon={Settings} label="Cài đặt" onClick={() => setActiveTab('settings')} />
        </div>

        <main className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'orders' && (
              <motion.div 
                key="orders"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-black uppercase tracking-tight">Đơn hàng của bạn</h2>
                <div className="p-16 border-2 border-dashed border-slate-100 rounded-[3rem] text-center space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mx-auto opacity-40">
                    <Package className="w-8 h-8" />
                  </div>
                  <p className="text-slate-400 font-bold">Chưa có dữ liệu đơn hàng hiển thị.</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div 
                key="addresses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="p-8 rounded-[2.5rem] border-2 border-shopper-emerald bg-shopper-mint/20 relative group overflow-hidden">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-shopper-emerald text-white flex items-center justify-center">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-black uppercase text-sm tracking-widest">Home</h3>
                        <p className="text-[10px] font-black text-shopper-emerald uppercase">Mặc định</p>
                      </div>
                   </div>
                   <p className="text-slate-600 font-medium leading-relaxed mb-6">Số 123, Đường Công Nghệ, Quận 1, TP. HCM</p>
                   <button className="text-xs font-black uppercase tracking-widest text-shopper-emerald hover:underline">Chỉnh sửa</button>
                </div>
                <div className="p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 text-slate-300 hover:border-shopper-emerald hover:text-shopper-emerald transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center">
                    <span className="text-2xl">+</span>
                  </div>
                  <span className="font-black text-xs uppercase tracking-widest">Thêm địa chỉ mới</span>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl bg-slate-50 rounded-[3rem] p-12 space-y-8"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Họ và tên</label>
                  <input type="text" className="w-full bg-white border border-slate-200 p-5 rounded-2xl font-bold focus:outline-shopper-emerald" placeholder="Vincent Tung" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email cá nhân</label>
                  <input type="email" className="w-full bg-white border border-slate-200 p-5 rounded-2xl font-bold focus:outline-shopper-emerald" placeholder="v-tung@techchain.com" />
                </div>
                <button className="bg-slate-900 text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                  Lưu thay đổi
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
