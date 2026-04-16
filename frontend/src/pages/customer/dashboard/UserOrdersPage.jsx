import { motion } from 'framer-motion';
import { ShoppingBag, Search, Filter, ChevronRight, Clock, CheckCircle2, Truck, XCircle, Package } from 'lucide-react';

const STATUS_CONFIG = {
  PENDING:   { label: 'Chờ xác nhận', icon: Clock,        color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  CONFIRMED: { label: 'Đã xác nhận',  icon: CheckCircle2, color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20' },
  SHIPPING:  { label: 'Đang giao',    icon: Truck,        color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  COMPLETED: { label: 'Hoàn thành',   icon: CheckCircle2, color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20' },
  CANCELLED: { label: 'Đã hủy',       icon: XCircle,      color: 'text-red-400',    bg: 'bg-red-500/10 border-red-500/20' },
};

const MOCK_ORDERS = [
  {
    id: 1,
    orderNumber: 'TC-2026-X89',
    orderDate: '2025-04-15',
    totalAmount: 2499,
    status: 'SHIPPING',
    items: [
      { productName: 'Neuralyn X1 Pro', variantSku: 'nx1-pro-black', price: 1999, quantity: 1 },
      { productName: 'TC Leather Case', variantSku: 'tc-case-dark', price: 500, quantity: 1 }
    ]
  },
  {
    id: 2,
    orderNumber: 'TC-2025-A12',
    orderDate: '2025-04-10',
    totalAmount: 129,
    status: 'COMPLETED',
    items: [{ productName: 'TC Studio PulseBuds', variantSku: 'pulsebuds-white', price: 129, quantity: 1 }]
  }
];

const OrderRow = ({ order, index }) => {
  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
  const StatusIcon = status.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center gap-6"
    >
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{order.orderDate}</span>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase ${status.bg}`}>
            <StatusIcon className={`w-3 h-3 ${status.color}`} />
            <span className={status.color}>{status.label}</span>
          </div>
        </div>
        <h3 className="text-xl font-black tracking-tight">{order.orderNumber}</h3>
        <p className="text-sm text-white/50 font-bold mt-1">
          {order.items.map(i => i.productName).join(', ')}
        </p>
      </div>

      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
        <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">Tổng cộng</span>
        <span className="text-2xl font-black text-white">$ {order.totalAmount}</span>
      </div>

      <button className="flex items-center justify-center p-4 rounded-2xl bg-white/5 group-hover:bg-portfolio-rose group-hover:text-white transition-all">
        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
};

export default function UserOrdersPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black uppercase tracking-tighter">Lịch sử đơn hàng</h1>
          <p className="text-white/40 font-bold">Theo dõi và quản lý các đơn hàng của bạn.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Tìm theo mã đơn..." 
              className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-portfolio-rose/50 w-64"
            />
          </div>
          <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
            <Filter className="w-4 h-4 text-white/50" />
          </button>
        </div>
      </header>

      <div className="space-y-4">
        {MOCK_ORDERS.map((order, idx) => (
          <OrderRow key={order.id} order={order} index={idx} />
        ))}
      </div>

      {/* Empty State Illustration if needed */}
      {MOCK_ORDERS.length === 0 && (
        <div className="text-center py-24 bg-white/5 border-2 border-dashed border-white/10 rounded-[3rem]">
          <ShoppingBag className="w-20 h-20 mx-auto text-white/10 mb-6" />
          <h2 className="text-2xl font-black uppercase">Chưa có đơn hàng nào</h2>
          <p className="text-white/40 font-bold max-w-xs mx-auto mt-2">Bắt đầu mua sắm tại TC Studio để lưu giữ những khoảnh khắc công nghệ tuyệt vời.</p>
        </div>
      )}
    </div>
  );
}
