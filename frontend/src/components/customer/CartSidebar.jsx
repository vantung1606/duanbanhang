import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import useCartStore from '../../store/cart-store';
import { cn, formatCurrency } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

export default function CartSidebar() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#f8fafc] border-l border-slate-200/50 shadow-2xl z-[201] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-200/50 flex items-center justify-between bg-white/40 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-black uppercase tracking-widest text-slate-900">Giỏ hàng ({getTotalItems()})</h2>
              </div>
              <button 
                onClick={toggleCart}
                className="w-10 h-10 rounded-full bg-white/60 border border-slate-200/50 shadow-sm text-slate-500 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60 text-slate-500">
                  <div className="w-20 h-20 rounded-full bg-white border border-slate-200 shadow-sm text-indigo-600 flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <p className="font-bold text-sm tracking-widest uppercase">Giỏ hàng của bạn đang trống</p>
                  <button 
                    onClick={toggleCart}
                    className="px-8 py-3 rounded-full border border-slate-200 shadow-sm bg-white text-[10px] font-black uppercase hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all text-slate-800"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.variantId} className="group relative flex gap-4 p-4 rounded-3xl bg-white/60 border border-slate-200/50 shadow-sm backdrop-blur-xl hover:border-slate-300 transition-all">
                    {/* Image */}
                    <div className="w-24 h-24 rounded-2xl bg-white border border-slate-100 p-2 flex-shrink-0">
                      <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{item.productName}</h3>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                          {item.attributes && item.attributes.map((av, idx) => (
                            <span key={idx} className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">
                              {av.attributeName}: <span className="text-slate-900">{av.value}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-slate-900">{formatCurrency(item.price)}</span>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
                          <button 
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black w-4 text-center text-slate-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button 
                      onClick={() => removeItem(item.variantId)}
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border border-red-200 text-red-500 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-slate-200/50 bg-white/80 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Tạm tính</span>
                  <span className="text-2xl font-black text-indigo-600">{formatCurrency(getTotalPrice())}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-slate-900 text-white hover:bg-indigo-600 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                >
                  Thanh toán ngay <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                  Phí giao hàng và thuế sẽ được tính ở bước thanh toán
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
