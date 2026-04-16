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
  const [sortBy, setSortBy] = useState('Newest');

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { damping: 45, stiffness: 60 });

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black relative overflow-hidden">
      <div 
        ref={containerRef}
        className="h-screen overflow-y-auto no-scrollbar relative z-10 pt-32 pb-20 px-8 md:px-28"
      >
      <SEO 
        title="Tech Catalog" 
        description="Browse the future of high-performance tech gadgets, from smartphones to laptops and accessories." 
      />
      
      
      {/* Header & Tools */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <span className="w-12 h-[2px] bg-accent" />
            <span className="text-sm font-black uppercase tracking-widest text-accent">Tech Catalog</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
          >
            Premium <br/> <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/20">Technology.</span>
          </motion.h1>
        </div>

        <div className="flex items-center gap-6">
          {/* Mini Cart Toggle */}
          <button 
                onClick={toggleCart}
                className="w-14 h-14 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors relative border border-white/10"
              >
                <ShoppingBag className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-xs font-black text-black flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
          </button>
        </div>

        <div className="w-full md:w-auto flex items-center gap-4">
          <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn("p-3 rounded-xl transition-all", viewMode === 'grid' ? "bg-white text-black" : "text-white/60 hover:text-white")}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn("p-3 rounded-xl transition-all", viewMode === 'list' ? "bg-white text-black" : "text-white/60 hover:text-white")}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          <button className="flex-1 md:flex-none flex items-center justify-between px-6 py-4 bg-white/5 rounded-2xl border border-white/10 min-w-[180px] group">
            <div className="flex items-center gap-3">
              <ArrowUpDown className="w-4 h-4 text-white/60" />
              <span className="text-sm font-bold">{sortBy}</span>
            </div>
            <ChevronDown className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-20">
        {/* Sidebar */}
        <FilterSidebar />

        {/* Product Grid */}
        <div className="flex-1">
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
                    "group relative bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 overflow-hidden transition-all hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
                    viewMode === 'list' && "flex md:flex-row flex-col items-center p-6 gap-8"
                  )}
                >
                  <Link to={`/product/${product.slug}`} className={cn(
                    "relative overflow-hidden block",
                    viewMode === 'grid' ? "aspect-square w-full" : "w-64 aspect-square flex-shrink-0"
                  )}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
                    <img 
                      src={product.thumbnailUrl} 
                      alt={product.name} 
                      className="w-full h-full object-contain mix-blend-screen p-12 transition-transform duration-1000 group-hover:scale-110" 
                    />
                    
                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-black/80 to-transparent flex gap-3">
                      <button 
                        onClick={(e) => { e.preventDefault(); openQuickView(product); }}
                        className="flex-1 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase hover:bg-white/90 transition-all active:scale-95"
                      >
                        Quick View
                      </button>
                    </div>
                  </Link>

                  <div className={cn("p-8", viewMode === 'list' && "flex-1 p-0")}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent/80">{product.brandName}</span>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                        <span className="text-[10px] text-white/70 font-black">{product.rating}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                      </div>
                    </div>
                    <Link to={`/product/${product.slug}`} className="text-2xl font-black text-white mb-8 block group-hover:text-accent transition-colors leading-tight">{product.name}</Link>
                    
                    <div className="flex items-center justify-between pt-8 border-t border-white/10">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">Price</span>
                        <span className="text-2xl font-black text-white italic tracking-tighter">{formatCurrency(product.minPrice)}</span>
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
                        className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center hover:bg-accent transition-all active:scale-90 shadow-xl"
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
            <button className="px-12 py-5 rounded-2xl bg-white/5 border border-white/10 text-sm font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Discover More
            </button>
          </div>
        </div>
      </div>

      {/* Parallax Background Balls */}
      <FloatingBall color="#ff0080" size="400px" top="-10%" left="-5%" scrollYProgress={smoothProgress} speed={0.4} />
      <FloatingBall color="#7000ff" size="300px" top="60%" left="80%" delay={2} scrollYProgress={smoothProgress} speed={0.3} />
      <FloatingBall color="#00ffcc" size="250px" top="20%" left="30%" delay={1} scrollYProgress={smoothProgress} speed={0.5} />
      <FloatingBall color="#3b82f6" size="500px" top="10%" left="60%" scrollYProgress={smoothProgress} speed={0.25} />

      <QuickViewModal 
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        t={t}
      />
      </div>
    </div>
  );
}
