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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-zinc-950 border-l border-white/10 z-[201] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-black uppercase tracking-widest text-white">Your Bag ({getTotalItems()})</h2>
              </div>
              <button 
                onClick={toggleCart}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <p className="font-bold text-sm tracking-widest uppercase">Your cart is empty</p>
                  <button 
                    onClick={toggleCart}
                    className="px-8 py-3 rounded-full border border-white/20 text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.variantId} className="group relative flex gap-4 p-4 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                    {/* Image */}
                    <div className="w-24 h-24 rounded-2xl bg-black/40 p-2 flex-shrink-0">
                      <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-contain mix-blend-screen" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-white line-clamp-1">{item.productName}</h3>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                          {item.attributes && item.attributes.map((av, idx) => (
                            <span key={idx} className="text-[10px] font-black uppercase text-accent tracking-tighter">
                              {av.attributeName}: <span className="text-white">{av.value}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-white">{formatCurrency(item.price)}</span>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 p-1 bg-white/5 rounded-xl border border-white/10">
                          <button 
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-white hover:text-accent transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black w-4 text-center text-accent">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-white hover:text-accent transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button 
                      onClick={() => removeItem(item.variantId)}
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-zinc-900/50 backdrop-blur-xl space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Subtotal</span>
                  <span className="text-2xl font-black text-accent">{formatCurrency(getTotalPrice())}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-accent text-black py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl"
                >
                  Checkout Now <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-white/20 font-bold uppercase tracking-widest">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
