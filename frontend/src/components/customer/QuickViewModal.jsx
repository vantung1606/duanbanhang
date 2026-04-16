import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, ShieldCheck, Zap } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import useCartStore from '../../store/cart-store';

export default function QuickViewModal({ product, isOpen, onClose, t }) {
  const { addItem } = useCartStore();
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-2xl"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl bg-zinc-950/80 backdrop-blur-3xl rounded-[3rem] border border-white/10 overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Left: Image Gallery Mock */}
            <div className="p-8 flex items-center justify-center bg-white/5 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-30" />
               <div className="relative aspect-square w-full max-w-sm">
                <img 
                  src={product.thumbnailUrl} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-screen transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </div>

            {/* Right: Info */}
            <div className="p-12 flex flex-col justify-center gap-10">
              <div className="space-y-4">
                <span className="text-accent font-black uppercase tracking-[0.2em] text-[10px] bg-accent/10 px-3 py-1 rounded-full">{product.brandName} // {product.categoryName}</span>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tighter">{product.name}</h2>
                <div className="flex items-center gap-6 pt-4">
                  <span className="text-4xl font-black text-white italic tracking-tighter">{formatCurrency(product.minPrice)}</span>
                  {product.maxPrice > product.minPrice && (
                    <span className="text-lg text-white/30 font-bold line-through">up to {formatCurrency(product.maxPrice)}</span>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30">Core Technologies</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-4 group hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Performance</p>
                      <p className="text-sm font-black text-white">Ultra Core</p>
                    </div>
                  </div>
                  <div className="p-5 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-4 group hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Security</p>
                      <p className="text-sm font-black text-white">Neural Lock</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    addItem(product, { 
                      id: product.id, 
                      price: product.minPrice, 
                      sku: product.id + '-SKU',
                      attributeValues: [
                        { attributeName: "Color", value: "Neural Titanium" },
                        { attributeName: "Edition", value: "Premium" }
                      ]
                    });
                    onClose();
                  }}
                  className="flex-1 bg-white text-black py-6 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-accent transition-all active:scale-95 shadow-2xl shadow-white/5"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
                <button className="flex-1 py-6 rounded-2xl border-2 border-white/10 font-black text-sm uppercase tracking-widest hover:bg-white/5 transition-colors active:scale-95">
                  Details
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
