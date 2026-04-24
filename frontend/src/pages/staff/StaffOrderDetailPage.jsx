import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Printer, 
  Download, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Package, 
  User, 
  MapPin, 
  CreditCard,
  FileText,
  Zap
} from 'lucide-react';
import { cn } from '../../lib/utils';

const STATUS_STEPS = [
  { id: 'PENDING', label: 'Processing', icon: Clock },
  { id: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle2 },
  { id: 'SHIPPING', label: 'In Delivery', icon: Truck },
  { id: 'COMPLETED', label: 'Delivered', icon: Package },
];

export default function StaffOrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock detailed order
    const mockOrder = {
      id: id || 1024,
      orderNumber: `ORD-${id || 1024}`,
      date: 'April 16, 2025',
      status: 'CONFIRMED',
      customer: {
        name: 'Johnathan Doe',
        email: 'john.doe@techchain.com',
        phone: '+84 901 234 567',
        address: '123 Neuralyn Street, Silicon Ward, Tech District, Ho Chi Minh City'
      },
      payment: {
        method: 'Credit Card (Visa)',
        status: 'PAID',
        transactionId: 'TXN-99887766'
      },
      items: [
        { id: 1, name: 'iPhone 15 Pro Max', variant: 'Titanium Black / 512GB', price: 1399, qty: 1, thumb: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=200' },
        { id: 2, name: 'AirPods Pro Gen 2', variant: 'White / MagSafe Case', price: 249, qty: 2, thumb: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=200' },
      ],
      subtotal: 1897,
      tax: 189.7,
      total: 2086.7
    };
    setOrder(mockOrder);
    setLoading(false);
  }, [id]);

  const handlePrint = () => window.print();

  if (loading) return null;

  return (
    <div className="space-y-10 pb-20">
      {/* Action Header */}
      <div className="flex items-center justify-between no-print">
        <div className="flex items-center gap-4">
          <Link to="/staff" className="p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:bg-emerald-500 hover:text-white transition-all group shadow-sm">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
              Order <span className="text-emerald-500">#{order.id}</span>
            </h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Detail View & Fulfill</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={handlePrint} className="px-6 py-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 text-xs font-black uppercase tracking-widest hover:bg-slate-800 hover:text-white transition-all shadow-sm flex items-center gap-3">
             <Printer className="w-4 h-4" /> Print Invoice
          </button>
          <button className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all text-xs">
             Confirm Pickup
          </button>
        </div>
      </div>

      {/* Status Wizard */}
      <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-10 rounded-[3rem] shadow-sm no-print">
         <div className="flex items-center justify-between space-x-4 relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 -z-10" />
            
            {STATUS_STEPS.map((step, idx) => {
              const isActive = STATUS_STEPS.findIndex(s => s.id === order.status) >= idx;
              return (
                <div key={step.id} className="flex flex-col items-center gap-4 bg-transparent px-4">
                   <div className={cn(
                     "w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-700",
                     isActive 
                       ? "bg-emerald-500 border-white shadow-[0_0_20px_rgba(16,185,129,0.4)] text-white" 
                       : "bg-slate-100 dark:bg-white/5 border-transparent text-slate-400"
                   )}>
                      <step.icon className="w-6 h-6" />
                   </div>
                   <span className={cn("text-[10px] font-black uppercase tracking-widest", isActive ? "text-emerald-500" : "text-slate-400")}>
                      {step.label}
                   </span>
                </div>
              );
            })}
         </div>
      </div>

      {/* Main Grid: Data & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Order Items & Summary */}
        <div className="lg:col-span-8 space-y-10">
           <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-10 rounded-[3rem] shadow-sm">
              <div className="flex items-center gap-3 mb-10">
                 <Package className="w-6 h-6 text-emerald-500" />
                 <h3 className="text-xl font-black uppercase tracking-tight">Order Items</h3>
              </div>
              
              <div className="space-y-8">
                 {order.items.map((item) => (
                   <div key={item.id} className="flex items-center gap-8 group">
                      <div className="w-24 h-24 rounded-3xl bg-white dark:bg-white/5 p-4 border border-white/10 group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center">
                         <img src={item.thumb} alt={item.name} className="w-full h-full object-contain mix-blend-screen" />
                      </div>
                      <div className="flex-1">
                         <h4 className="text-lg font-black text-slate-800 dark:text-white mb-1">{item.name}</h4>
                         <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">{item.variant}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-sm font-bold text-slate-400">Qty: {item.qty}</p>
                         <p className="text-xl font-black text-slate-800 dark:text-white">$ {item.price.toLocaleString()}</p>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="mt-12 pt-10 border-t border-white/10 space-y-4">
                 <div className="flex justify-between items-center px-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subtotal</span>
                    <span className="text-lg font-bold text-slate-800 dark:text-white">$ {order.subtotal.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center px-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">VAT (10%)</span>
                    <span className="text-lg font-bold text-slate-800 dark:text-white">$ {order.tax.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center p-8 bg-emerald-500/5 rounded-3xl border border-emerald-500/10 mt-6">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-500">Order Total</span>
                    <span className="text-4xl font-black text-emerald-500">$ {order.total.toLocaleString()}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Customer & Info Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           {/* Customer Box */}
           <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-10 rounded-[3rem] shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                 <User className="w-5 h-5 text-emerald-500" />
                 <h3 className="text-lg font-black uppercase tracking-tight">Customer Info</h3>
              </div>
              <div className="space-y-6">
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Name</p>
                    <p className="font-bold text-slate-800 dark:text-white">{order.customer.name}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email</p>
                    <p className="font-bold text-slate-800 dark:text-white underline">{order.customer.email}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Shipping Address</p>
                    <div className="flex gap-2">
                       <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                       <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed">{order.customer.address}</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Payment Box */}
           <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-10 rounded-[3rem] shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                 <CreditCard className="w-5 h-5 text-indigo-500" />
                 <h3 className="text-lg font-black uppercase tracking-tight">Payment</h3>
              </div>
              <div className="space-y-6">
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Method</p>
                    <p className="font-bold text-slate-800 dark:text-white">{order.payment.method}</p>
                 </div>
                 <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 rounded-xl w-fit">
                    <Zap className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{order.payment.status}</span>
                 </div>
                 <p className="text-[9px] font-mono text-slate-400">ID: {order.payment.transactionId}</p>
              </div>
           </div>
        </div>
      </div>

      {/* Printable Invoice Component (Hidden from UI, visible only on Print) */}
      <div className="print-only hidden print:block bg-white p-20 text-black font-sans min-h-screen">
         <div className="flex justify-between items-start border-b-4 border-emerald-500 pb-10 mb-10">
            <div>
               <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">TechChain</h1>
               <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Official Premium Invoice</p>
            </div>
            <div className="text-right">
               <p className="text-2xl font-black">INVOICE</p>
               <p className="text-sm font-bold text-slate-500">#{order.orderNumber}</p>
               <p className="text-xs font-medium">{order.date}</p>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-20 mb-20">
            <div>
               <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Billed To</p>
               <p className="text-xl font-bold">{order.customer.name}</p>
               <p className="text-sm max-w-sm">{order.customer.address}</p>
               <p className="text-sm font-bold mt-2">{order.customer.phone}</p>
            </div>
            <div>
               <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Billed From</p>
               <p className="text-xl font-bold">TechChain Store Hub</p>
               <p className="text-sm max-w-sm">45 Technology Tower, South Silicon City, SC 90021</p>
               <p className="text-sm font-bold mt-2">+84 1900 888 888</p>
            </div>
         </div>

         <table className="w-full text-left mb-20">
            <thead className="bg-slate-100 uppercase text-[10px] font-black tracking-widest">
               <tr>
                  <th className="px-6 py-4">Item & Specification</th>
                  <th className="px-6 py-4">Qty</th>
                  <th className="px-6 py-4 text-right">Price</th>
                  <th className="px-6 py-4 text-right">Total</th>
               </tr>
            </thead>
            <tbody>
               {order.items.map(item => (
                 <tr key={item.id} className="border-b border-slate-200">
                    <td className="px-6 py-6">
                       <p className="font-bold">{item.name}</p>
                       <p className="text-[10px] text-slate-500 uppercase">{item.variant}</p>
                    </td>
                    <td className="px-6 py-6 text-sm">{item.qty}</td>
                    <td className="px-6 py-6 text-sm text-right">$ {item.price}</td>
                    <td className="px-6 py-6 font-bold text-right">$ {item.price * item.qty}</td>
                 </tr>
               ))}
            </tbody>
         </table>

         <div className="flex justify-end pt-10 border-t-2 border-slate-100">
            <div className="w-80 space-y-4">
               <div className="flex justify-between text-sm">
                  <span className="font-bold uppercase opacity-50">Subtotal</span>
                  <span className="font-bold">$ {order.subtotal}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="font-bold uppercase opacity-50">Tax (10%)</span>
                  <span className="font-bold">$ {order.tax}</span>
               </div>
               <div className="flex justify-between text-2xl font-black pt-4 border-t-2 border-slate-900 leading-none">
                  <span className="uppercase">Total</span>
                  <span>$ {order.total}</span>
               </div>
            </div>
         </div>

         <div className="mt-40 text-center border-t border-slate-100 pt-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Thank you for choosing TechChain</p>
            <p className="text-[8px] text-slate-300">Terms: 7-day return policy applies to original sealed products only. Digital signatures applied.</p>
         </div>
      </div>
    </div>
  );
}
