import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MoreHorizontal, CheckCircle2, Truck, XCircle, Clock, Eye } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const STATUS_CONFIG = {
  PENDING:   { label: 'Đang Chờ',   icon: Clock,        color: 'text-yellow-600',  bg: 'bg-yellow-100/50' },
  CONFIRMED: { label: 'Đã Xác Nhận', icon: CheckCircle2, color: 'text-blue-600',    bg: 'bg-blue-100/50' },
  SHIPPING:  { label: 'Đang Giao',  icon: Truck,        color: 'text-purple-600',  bg: 'bg-purple-100/50' },
  COMPLETED: { label: 'Hoàn Thành', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100/50' },
  CANCELLED: { label: 'Đã Hủy', icon: XCircle,      color: 'text-red-600',     bg: 'bg-red-100/50' },
};

export default function StaffOrdersListPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Mock data for initial development
    const mockOrders = [
      { id: 1024, customer: 'Nguyễn Văn A', date: '2025-04-16', total: 1299000, status: 'PENDING', items: 2 },
      { id: 1025, customer: 'Trần Thị B', date: '2025-04-16', total: 2450000, status: 'CONFIRMED', items: 1 },
      { id: 1026, customer: 'Lê Hoàng C', date: '2025-04-15', total: 899000, status: 'SHIPPING', items: 3 },
      { id: 1027, customer: 'Phạm Bạch D', date: '2025-04-15', total: 159000, status: 'COMPLETED', items: 1 },
      { id: 1028, customer: 'Hoàng Xanh E', date: '2025-04-14', total: 540000, status: 'CANCELLED', items: 2 },
    ];
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 400);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'ALL' || order.status === filterStatus;
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.id.toString().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  if (loading) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6 pb-20 w-full"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-[#2b3a55] tracking-tight leading-[1.1] mb-2">
          Danh Sách<br/>Đơn Hàng.
        </h1>
        <p className="text-slate-500 font-medium">Theo dõi và quản lý trạng thái của tất cả đơn hàng.</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center justify-between bg-white/60 backdrop-blur-2xl p-4 rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
        
        <div className="flex p-1 bg-white/50 rounded-2xl overflow-x-auto no-scrollbar max-w-full">
          {['ALL', 'PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                filterStatus === status 
                  ? "bg-[#2b3a55] text-white shadow-lg" 
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              {status === 'ALL' ? 'TẤT CẢ' : STATUS_CONFIG[status].label}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#2b3a55] transition-colors" />
          <input 
            type="text" 
            placeholder="Tìm theo Mã đơn hoặc Tên khách..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/80 border-none focus:ring-2 focus:ring-[#2b3a55]/20 outline-none px-12 py-3.5 rounded-2xl text-sm font-bold text-slate-800 placeholder:text-slate-400 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Orders List Layout (Vertical Stack) */}
      <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-6 border-b border-slate-200/50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Tất Cả Đơn Hàng</h3>
          <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
            <Filter className="w-4 h-4" /> Lọc Nâng Cao
          </button>
        </div>

        <div className="divide-y divide-slate-200/50">
          <AnimatePresence mode="popLayout">
            {filteredOrders.map((order) => {
              const status = STATUS_CONFIG[order.status];
              return (
                <motion.div 
                  key={order.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-white/40 transition-colors group"
                >
                  {/* Left: Identity */}
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-[#2b3a55]/5 flex items-center justify-center font-black text-lg text-[#2b3a55]">
                      {order.customer.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{order.customer}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">ORD-{order.id}</p>
                    </div>
                  </div>

                  {/* Middle: Details */}
                  <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-auto">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Ngày Đặt</p>
                      <p className="text-sm font-bold text-slate-700">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Sản Phẩm</p>
                      <p className="text-sm font-bold text-slate-700">{order.items} Món</p>
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Tổng Tiền</p>
                      <p className="text-sm font-bold text-slate-700">{order.total.toLocaleString()} ₫</p>
                    </div>
                  </div>

                  {/* Right: Status & Actions */}
                  <div className="flex flex-row md:flex-col lg:flex-row items-center gap-4 md:gap-2 lg:gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="block lg:hidden">
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Tổng</p>
                       <p className="text-sm font-bold text-slate-700">{order.total.toLocaleString()} ₫</p>
                    </div>
                    <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-transparent shadow-sm", status.bg, status.color)}>
                      <status.icon className="w-3 h-3" />
                      {status.label}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link 
                        to={`/staff/order/${order.id}`}
                        className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center hover:bg-[#2b3a55] hover:text-white transition-all text-slate-500 shadow-sm"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center hover:bg-slate-200 transition-all text-slate-500 shadow-sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredOrders.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Không tìm thấy đơn hàng nào</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
