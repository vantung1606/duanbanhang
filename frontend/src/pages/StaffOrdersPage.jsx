import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  CheckCircle2, 
  Truck, 
  XCircle, 
  Clock,
  ChevronDown,
  Eye,
  RefreshCcw
} from 'lucide-react';
import { cn } from '../lib/utils';

const STATUS_CONFIG = {
  PENDING:   { label: 'Pending',   icon: Clock,        color: 'text-yellow-500',  bg: 'bg-yellow-500/10' },
  CONFIRMED: { label: 'Confirmed', icon: CheckCircle2, color: 'text-blue-500',    bg: 'bg-blue-500/10' },
  SHIPPING:  { label: 'Shipping',  icon: Truck,        color: 'text-purple-500',  bg: 'bg-purple-500/10' },
  COMPLETED: { label: 'Completed', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  CANCELLED: { label: 'Cancelled', icon: XCircle,      color: 'text-red-500',     bg: 'bg-red-500/10' },
};

export default function StaffOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Mock data for initial development
    const mockOrders = [
      { id: 1024, customer: 'John Doe', date: '2025-04-16', total: 1299.99, status: 'PENDING', items: 2 },
      { id: 1025, customer: 'Jane Smith', date: '2025-04-16', total: 2450.00, status: 'CONFIRMED', items: 1 },
      { id: 1026, customer: 'Robert Brown', date: '2025-04-15', total: 899.00, status: 'SHIPPING', items: 3 },
      { id: 1027, customer: 'Alice White', date: '2025-04-15', total: 159.99, status: 'COMPLETED', items: 1 },
      { id: 1028, customer: 'Charlie Green', date: '2025-04-14', total: 540.00, status: 'CANCELLED', items: 2 },
    ];
    setOrders(mockOrders);
    setLoading(false);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'ALL' || order.status === filterStatus;
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.id.toString().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            Order <span className="text-emerald-500">Processing</span>
          </h1>
          <p className="text-slate-500 font-medium">Manage and fulfill customer orders in real-time.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:bg-emerald-500 hover:text-white transition-all shadow-sm group">
            <RefreshCcw className="w-5 h-5 group-active:rotate-180 transition-transform duration-500" />
          </button>
          <button className="px-6 py-4 bg-emerald-500 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all">
             Scan IMEI
          </button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Unprocessed', val: '12', color: 'bg-yellow-500', icon: Clock },
          { label: 'In Delivery', val: '08', color: 'bg-purple-500', icon: Truck },
          { label: 'Completed Today', val: '45', color: 'bg-emerald-500', icon: CheckCircle2 },
          { label: 'Total Sales', val: '$12,450', color: 'bg-blue-500', icon: Search }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-6 rounded-[2rem] shadow-sm flex items-center gap-6">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="flex p-1 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 overflow-x-auto no-scrollbar max-w-full">
          {['ALL', 'PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                filterStatus === status 
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
              )}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by Order ID or Customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 focus:border-emerald-500/50 outline-none px-14 py-4 rounded-2xl text-sm font-bold text-slate-800 dark:text-white shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/20 dark:border-white/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Order Information</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Customer</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Amount</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredOrders.map((order) => {
                  const status = STATUS_CONFIG[order.status];
                  return (
                    <motion.tr 
                      key={order.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-emerald-500/5 transition-colors border-b border-white/5 last:border-0"
                    >
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <p className="font-black text-slate-800 dark:text-white">ORD-{order.id}</p>
                          <p className="text-[10px] font-bold text-slate-400">{order.date}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center font-black text-sm text-emerald-500")}>
                            {order.customer.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-700 dark:text-slate-200">{order.customer}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.items} Items</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-black text-slate-800 dark:text-white">
                        $ {order.total.toLocaleString()}
                      </td>
                      <td className="px-8 py-6">
                        <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-current", status.bg, status.color)}>
                          <status.icon className="w-3 h-3" />
                          {status.label}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <Link 
                            to={`/staff/order/${order.id}`}
                            className="w-10 h-10 rounded-xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all group"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button className="w-10 h-10 rounded-xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all group">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredOrders.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No orders found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
