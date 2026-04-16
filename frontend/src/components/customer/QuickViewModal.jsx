import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, ShieldCheck, Zap } from 'lucide-react';

export default function QuickViewModal({ product, isOpen, onClose, t }) {
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
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-[#0a0a0a] rounded-[3rem] border border-white/10 overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Left: Image Gallery Mock */}
            <div className="p-8 flex items-center justify-center bg-white/5">
              <div className="relative aspect-square w-full max-w-sm">
                <img 
                  src={product.thumbnailUrl} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-screen"
                />
              </div>
            </div>

            {/* Right: Info */}
            <div className="p-10 flex flex-col gap-8">
              <div className="space-y-2">
                <span className="text-accent font-black uppercase tracking-widest text-[10px]">{product.brandName} // {product.categoryName}</span>
                <h2 className="text-3xl font-black text-white">{product.name}</h2>
                <div className="flex items-center gap-4 pt-4">
                  <span className="text-4xl font-black text-white">$ {product.minPrice}</span>
                  {product.maxPrice > product.minPrice && (
                    <span className="text-lg text-white/30 font-bold decoration-slice">up to $ {product.maxPrice}</span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-white/50">Quick Specs</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <Zap className="w-5 h-5 text-[#BEF264]" />
                    <div>
                      <p className="text-[10px] font-bold text-white/40 uppercase">Performance</p>
                      <p className="text-sm font-bold text-white">Ultra Core</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#BEF264]" />
                    <div>
                      <p className="text-[10px] font-bold text-white/40 uppercase">Warranty</p>
                      <p className="text-sm font-bold text-white">24 Months</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-4">
                <button className="w-full bg-accent text-black py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform">
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
                <button className="w-full py-5 rounded-2xl border border-white/20 font-black hover:bg-white/5 transition-colors">
                  View Full Details
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
