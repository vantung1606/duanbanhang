import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, ShoppingBag, MapPin, ShieldCheck, 
  LogOut, Camera, X, Star, Edit3, 
  Package, ChevronRight, Award, Zap,
  Settings2, Bell, Shield, Wallet, 
  CreditCard, Heart, History, CheckCircle2,
  Clock, Truck, Trash2
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const SidebarTab = ({ active, icon: Icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${
      active ? 'bg-[#1a365d] text-white shadow-xl shadow-blue-900/10' : 'text-slate-400 hover:text-[#1a365d] hover:bg-slate-50'
    }`}
  >
    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${active ? 'text-[#cadaee]' : 'text-slate-300'}`} />
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default function ProfileModal({ isOpen, onClose, initialTab = 'overview' }) {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync activeTab with initialTab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  const handleLogout = () => {
    logout();
    onClose();
  };

  const MOCK_ORDERS = [
    { id: '#DIY-9921', status: 'SHIPPING', date: '15/04', total: '1,450k' },
    { id: '#DIY-8812', status: 'COMPLETED', date: '10/04', total: '850k' }
  ];

  const MOCK_WISHLIST = [
    { id: 1, name: 'Đèn Moving Head 10R', price: '4,500k', img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=200&auto=format&fit=crop' },
    { id: 2, name: 'Máy Phun Khói 1500W', price: '1,200k', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=200&auto=format&fit=crop' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* THE MASTER BOX */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-5xl h-[700px] bg-white/95 backdrop-blur-3xl rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-white flex flex-col md:flex-row"
          >
             
             {/* 1. INTERNAL SIDEBAR */}
             <aside className="w-full md:w-72 bg-slate-50/50 border-r border-slate-100 p-8 flex flex-col">
                <div className="mb-10 flex flex-col items-center text-center">
                   <div className="relative mb-4">
                      <div className="w-24 h-24 rounded-[2.5rem] bg-white border border-slate-200 p-1 shadow-sm">
                         <div className="w-full h-full rounded-[2rem] bg-slate-50 flex items-center justify-center overflow-hidden">
                            <User className="w-10 h-10 text-slate-200" />
                         </div>
                      </div>
                      <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#4981cf] text-white rounded-xl flex items-center justify-center shadow-lg">
                         <Camera className="w-4 h-4" />
                      </button>
                   </div>
                   <h3 className="text-xl font-black text-[#1a365d] tracking-tighter uppercase truncate w-full">{user?.username}</h3>
                   <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mt-2">
                     Diamond Member
                   </span>
                </div>

                <nav className="flex-1 space-y-2">
                   <SidebarTab active={activeTab === 'overview'} icon={Zap} label="Tổng quan" onClick={() => setActiveTab('overview')} />
                   <SidebarTab active={activeTab === 'orders'} icon={ShoppingBag} label="Đơn hàng" onClick={() => setActiveTab('orders')} />
                   <SidebarTab active={activeTab === 'wishlist'} icon={Heart} label="Yêu thích" onClick={() => setActiveTab('wishlist')} />
                   <SidebarTab active={activeTab === 'notifications'} icon={Bell} label="Thông báo" onClick={() => setActiveTab('notifications')} />
                </nav>

                <button 
                  onClick={handleLogout}
                  className="mt-8 flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-black text-[10px] uppercase tracking-widest"
                >
                   <LogOut className="w-5 h-5" /> Đăng xuất
                </button>
             </aside>

             {/* 2. MAIN CONTENT AREA */}
             <main className="flex-1 p-10 md:p-16 overflow-y-auto relative bg-white/20">
                
                {/* Close Button Inside */}
                <button 
                  onClick={onClose}
                  className="absolute top-8 right-8 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all z-10"
                >
                   <X className="w-5 h-5" />
                </button>

                <AnimatePresence mode="wait">
                   {activeTab === 'overview' && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                      >
                         <div className="space-y-2">
                            <h2 className="text-3xl font-black text-[#1a365d] tracking-tighter uppercase">Xin chào!</h2>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Đây là trung tâm điều khiển của bạn.</p>
                         </div>

                         {/* Stats Row */}
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                               { label: 'Đơn hàng', value: '12', color: 'text-blue-500', bg: 'bg-blue-500/5' },
                               { label: 'Yêu thích', value: '08', color: 'text-rose-500', bg: 'bg-rose-500/5' },
                               { label: 'Điểm', value: '8.5k', color: 'text-amber-500', bg: 'bg-amber-500/5' },
                               { label: 'Vouchers', value: '03', color: 'text-indigo-500', bg: 'bg-indigo-500/5' }
                            ].map((s, i) => (
                               <div key={i} className={cn("p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center", s.bg)}>
                                  <p className={cn("text-2xl font-black mb-1", s.color)}>{s.value}</p>
                                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                               </div>
                            ))}
                         </div>

                         {/* Member Progress */}
                         <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full" />
                            <div className="relative z-10 space-y-6">
                               <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                     <Award className="w-5 h-5 text-amber-400" />
                                     <h4 className="text-sm font-black uppercase tracking-widest">Tiến trình thành viên</h4>
                                  </div>
                                  <span className="text-[10px] font-black text-amber-400 uppercase">Diamond Tier</span>
                               </div>
                               <div className="space-y-2">
                                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                     <motion.div 
                                       initial={{ width: 0 }}
                                       animate={{ width: '85%' }}
                                       className="h-full bg-gradient-to-r from-amber-400 to-amber-200" 
                                     />
                                  </div>
                                  <div className="flex justify-between text-[8px] font-black text-white/30 uppercase tracking-widest">
                                     <span>8.5k Điểm</span>
                                     <span>1.5k nữa tới Elite</span>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </motion.div>
                   )}

                   {activeTab === 'orders' && (
                      <motion.div
                        key="orders"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                         <h3 className="text-2xl font-black text-[#1a365d] tracking-tighter uppercase">Lịch sử đơn hàng.</h3>
                         <div className="space-y-4">
                            {MOCK_ORDERS.map((o, i) => (
                               <div key={i} className="group p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-[#4981cf] transition-all flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                     <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-[#4981cf] group-hover:bg-[#4981cf]/10 transition-all">
                                        <Package className="w-6 h-6" />
                                     </div>
                                     <div>
                                        <h4 className="text-sm font-black text-[#1a365d]">{o.id}</h4>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{o.date}</p>
                                     </div>
                                  </div>
                                  <div className="flex items-center gap-10">
                                     <div className="text-right">
                                        <p className="text-sm font-black text-[#1a365d]">{o.total}</p>
                                        <span className={cn("text-[8px] font-black uppercase tracking-widest", o.status === 'SHIPPING' ? 'text-blue-500' : 'text-emerald-500')}>
                                           {o.status === 'SHIPPING' ? 'Đang giao' : 'Đã hoàn thành'}
                                        </span>
                                     </div>
                                     <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                                  </div>
                               </div>
                            ))}
                         </div>
                      </motion.div>
                   )}

                   {activeTab === 'wishlist' && (
                      <motion.div
                        key="wishlist"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                         <h3 className="text-2xl font-black text-[#1a365d] tracking-tighter uppercase">Sản phẩm yêu thích.</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {MOCK_WISHLIST.map((item) => (
                               <div key={item.id} className="p-4 rounded-[2.5rem] bg-white border border-slate-100 flex items-center gap-6 group hover:shadow-xl transition-all">
                                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 relative">
                                     <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                  </div>
                                  <div className="flex-1">
                                     <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">{item.name}</h4>
                                     <p className="text-sm font-black text-[#4981cf] mt-1">{item.price}</p>
                                  </div>
                                  <button className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                                     <Trash2 className="w-4 h-4" />
                                  </button>
                               </div>
                            ))}
                         </div>
                      </motion.div>
                   )}

                   {activeTab === 'notifications' && (
                      <motion.div
                        key="notifications"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                         <h3 className="text-2xl font-black text-[#1a365d] tracking-tighter uppercase">Thông báo.</h3>
                         <div className="space-y-4">
                            {[
                               { title: 'Khuyến mãi tháng 5', desc: 'Giảm ngay 20% cho các dòng đèn Moving Head.', time: '2 giờ trước' },
                               { title: 'Đơn hàng #9921', desc: 'Kiện hàng của bạn đã rời kho và đang trên đường tới.', time: 'Hôm qua' }
                            ].map((n, i) => (
                               <div key={i} className="p-6 rounded-3xl bg-slate-50/50 border border-slate-100 flex gap-4">
                                  <div className="w-10 h-10 rounded-full bg-[#cadaee] text-[#4981cf] flex items-center justify-center shrink-0">
                                     <Bell className="w-4 h-4" />
                                  </div>
                                  <div>
                                     <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-1">{n.title}</h4>
                                     <p className="text-xs text-slate-500 font-medium mb-2">{n.desc}</p>
                                     <span className="text-[9px] font-black text-slate-300 uppercase">{n.time}</span>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </motion.div>
                   )}
                </AnimatePresence>
             </main>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
