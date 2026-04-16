import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, ShoppingBag, MapPin, User, ChevronRight, 
  CheckCircle2, Clock, Truck, XCircle, Zap, ArrowLeft
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Link, useNavigate } from 'react-router-dom';

const STATUS_CONFIG = {
  PENDING:   { label: 'Chờ xác nhận', icon: Clock,        color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  CONFIRMED: { label: 'Đã xác nhận',  icon: CheckCircle2, color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20' },
  SHIPPING:  { label: 'Đang giao',    icon: Truck,        color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  COMPLETED: { label: 'Hoàn thành',   icon: CheckCircle2, color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20' },
  CANCELLED: { label: 'Đã hủy',       icon: XCircle,      color: 'text-red-400',    bg: 'bg-red-500/10 border-red-500/20' },
};

// Mock orders for demo
const MOCK_ORDERS = [
  {
    id: 1,
    orderNumber: 'ORD-001',
    orderDate: '2025-04-15',
    totalAmount: 1399,
    status: 'SHIPPING',
    items: [{ productName: 'iPhone 15 Pro Max', variantSku: 'iphone-15-pro-max-pro', price: 1399, quantity: 1 }]
  },
  {
    id: 2,
    orderNumber: 'ORD-002',
    orderDate: '2025-04-10',
    totalAmount: 599,
    status: 'COMPLETED',
    items: [{ productName: 'Samsung Galaxy Watch 7', variantSku: 'galaxy-watch-7-base', price: 599, quantity: 1 }]
  }
];

const OrderCard = ({ order }) => {
  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
  const StatusIcon = status.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all space-y-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-white/30">{order.orderDate}</span>
          <h3 className="text-lg font-black text-white mt-1">{order.orderNumber}</h3>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-black ${status.bg}`}>
          <StatusIcon className={`w-3 h-3 ${status.color}`} />
          <span className={status.color}>{status.label}</span>
        </div>
      </div>

      <div className="space-y-3">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span className="text-white/60 font-bold">{item.productName} × {item.quantity}</span>
            <span className="text-white font-black">$ {item.price}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Tổng đơn hàng</span>
        <span className="text-xl font-black text-white">$ {order.totalAmount}</span>
      </div>
    </motion.div>
  );
};

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6 text-white">
        <div className="layout-frame"><div className="frame-border" /></div>
        <ShoppingBag className="w-16 h-16 text-white/20" />
        <h1 className="text-3xl font-black">Vui lòng đăng nhập</h1>
        <Link to="/login" className="px-8 py-4 bg-[var(--accent-lime)] text-black rounded-2xl font-black uppercase tracking-widest">
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/shop');
  };

  const tabs = [
    { id: 'orders',   label: 'Đơn hàng',   icon: Package },
    { id: 'address',  label: 'Địa chỉ',    icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-20 pb-20 relative p-4 md:p-6">
      <div className="layout-frame pointer-events-none"><div className="frame-border" /></div>

      <div className="max-w-5xl mx-auto px-8 md:px-12 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-12 text-[10px] font-black uppercase tracking-widest text-white/30">
          <Link to="/catalog" className="hover:text-accent flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Tiếp tục mua sắm
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white">Tài khoản của tôi</span>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-[1.5rem] bg-[var(--accent-lime)]/10 border border-[var(--accent-lime)]/20 flex items-center justify-center">
              <User className="w-10 h-10 text-[var(--accent-lime)]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-3 h-3 text-[var(--accent-lime)]" />
                <span className="text-[10px] font-black text-[var(--accent-lime)] uppercase tracking-widest">TechChain Member</span>
              </div>
              <h1 className="text-4xl font-black tracking-tighter uppercase">{user?.username}</h1>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-black uppercase tracking-widest hover:bg-red-500/20 transition-all"
          >
            Đăng xuất
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-10 p-1 bg-white/5 rounded-2xl w-fit border border-white/10">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${
                  activeTab === tab.id ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Lịch sử đơn hàng</h2>
            {MOCK_ORDERS.length > 0 ? (
              MOCK_ORDERS.map(order => <OrderCard key={order.id} order={order} />)
            ) : (
              <div className="text-center py-16 text-white/20">
                <Package className="w-12 h-12 mx-auto mb-4" />
                <p className="font-bold">Chưa có đơn hàng nào.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'address' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Địa chỉ giao hàng</h2>
            <div className="p-6 rounded-3xl bg-[var(--accent-lime)]/5 border-2 border-dashed border-[var(--accent-lime)]/20 flex items-center justify-center cursor-pointer hover:bg-[var(--accent-lime)]/10 transition-all">
              <p className="text-[var(--accent-lime)] font-black text-sm uppercase tracking-widest">+ Thêm địa chỉ mới</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
