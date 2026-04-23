import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { Search, SlidersHorizontal, LayoutGrid, List, ArrowUpDown, ChevronDown, ShoppingBag, ShoppingCart, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FilterSidebar from '../../components/customer/FilterSidebar';
import QuickViewModal from '../../components/customer/QuickViewModal';
import { catalogService } from '../../services/catalog-service';
import { cn, formatCurrency } from '../../lib/utils';
import useCartStore from '../../store/cart-store';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import FloatingBall from '../../components/common/FloatingBall';
import NeuralynNavbar from '../../components/layout/customer/NeuralynNavbar';
import NeuralynFooter from '../../components/layout/customer/NeuralynFooter';

// Fonts
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/900.css";
import "@fontsource/instrument-serif/400-italic.css";

export default function Catalog() {
  const { t } = useTranslation();
  const [products, setProducts] = useState(catalogService.getMockProducts());
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addItem, toggleCart, getTotalItems } = useCartStore();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('Mới nhất');

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { damping: 45, stiffness: 60 });

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-blue-400/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      <NeuralynNavbar />
      
      <div 
        ref={containerRef}
        className="h-screen overflow-y-auto no-scrollbar relative z-10 pt-24 pb-20 px-8 md:px-28"
      >
      <SEO 
        title="Tech Catalog" 
        description="Browse the future of high-performance tech gadgets, from smartphones to laptops and accessories." 
      />
      
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start relative">
        {/* Sidebar */}
        <FilterSidebar />

        {/* Right Content */}
        <div className="flex-1 w-full min-w-0">
          
          {/* Header & Tools - Sticky */}
          <div className="sticky top-24 z-30 flex flex-col md:flex-row items-center justify-end gap-8 mb-8 w-full pointer-events-none">
            <div className="w-full md:w-auto flex items-center gap-4 pointer-events-auto">
              <div className="flex p-1 bg-white/80 border border-slate-200/50 backdrop-blur-2xl rounded-2xl shadow-lg">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={cn("p-3 rounded-xl transition-all", viewMode === 'grid' ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900")}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={cn("p-3 rounded-xl transition-all", viewMode === 'list' ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900")}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <button className="flex-1 md:flex-none flex items-center justify-between px-6 py-4 bg-white/80 border border-slate-200/50 backdrop-blur-2xl rounded-2xl min-w-[180px] group text-slate-800 shadow-lg">
                <div className="flex items-center gap-3">
                  <ArrowUpDown className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-bold">{sortBy}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className={cn(
            "grid gap-8",
            viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
          )}>
            <AnimatePresence mode="popLayout">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.4, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "group relative bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-slate-200/50 overflow-hidden transition-all hover:bg-white/60 hover:border-slate-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]",
                    viewMode === 'list' && "flex md:flex-row flex-col items-center p-6 gap-8"
                  )}
                >
                  <Link to={`/product/${product.slug}`} className={cn(
                    "relative overflow-hidden block",
                    viewMode === 'grid' ? "aspect-square w-full" : "w-64 aspect-square flex-shrink-0"
                  )}>
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-transparent opacity-50" />
                    <img 
                      src={product.thumbnailUrl} 
                      alt={product.name} 
                      className="w-full h-full object-contain mix-blend-multiply p-12 transition-transform duration-1000 group-hover:scale-110" 
                    />
                    
                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-black/80 to-transparent flex gap-3">
                      <button 
                        onClick={(e) => { e.preventDefault(); openQuickView(product); }}
                        className="flex-1 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase hover:bg-white/90 transition-all active:scale-95"
                      >
                        Xem nhanh
                      </button>
                    </div>
                  </Link>

                  <div className={cn("p-8", viewMode === 'list' && "flex-1 p-0")}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600/80">{product.brandName}</span>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100/50 border border-slate-200">
                        <span className="text-[10px] text-slate-600 font-black">{product.rating}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                      </div>
                    </div>
                    <Link to={`/product/${product.slug}`} className="text-2xl font-black text-slate-900 mb-8 block group-hover:text-indigo-600 transition-colors leading-tight">{product.name}</Link>
                    
                    <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Giá</span>
                        <span className="text-2xl font-black text-slate-900 italic tracking-tighter">{formatCurrency(product.minPrice)}</span>
                      </div>
                      <button 
                        onClick={() => addItem(product, { 
                          id: product.id, 
                          price: product.minPrice, 
                          sku: product.id + '-SKU', 
                          attributeValues: [
                            { attributeName: "Color", value: "Space Gray" },
                            { attributeName: "Storage", value: "256GB" }
                          ] 
                        })}
                        className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 transition-all active:scale-90 shadow-xl"
                      >
                        <ShoppingCart className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More */}
          <div className="mt-20 flex justify-center">
            <button className="px-12 py-5 rounded-2xl bg-white/40 border border-slate-200/50 text-slate-800 text-sm font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm">
              Khám phá thêm
            </button>
          </div>
        </div>
      </div>

      {/* Parallax Background Balls */}
      <FloatingBall color="#6366f1" size="400px" top="-10%" left="-5%" scrollYProgress={smoothProgress} speed={0.4} />
      <FloatingBall color="#3b82f6" size="300px" top="60%" left="80%" delay={2} scrollYProgress={smoothProgress} speed={0.3} />

      <QuickViewModal 
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        t={t}
      />
      
      <NeuralynFooter />
      </div>
    </div>
  );
}
