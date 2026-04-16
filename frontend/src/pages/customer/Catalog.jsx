import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, LayoutGrid, List, ArrowUpDown, ChevronDown, ShoppingBag, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FilterSidebar from '../../components/customer/FilterSidebar';
import QuickViewModal from '../../components/customer/QuickViewModal';
import { catalogService } from '../../services/catalog-service';
import { cn } from '../../lib/utils';
import useCartStore from '../../store/cart-store';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';

export default function Catalog() {
  const { t } = useTranslation();
  const [products, setProducts] = useState(catalogService.getMockProducts());
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addItem, toggleCart, getTotalItems } = useCartStore();
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('Newest');

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-8 md:px-28 relative p-4 md:p-6 no-scrollbar">
      <SEO 
        title="Tech Catalog" 
        description="Browse the future of high-performance tech gadgets, from smartphones to laptops and accessories." 
      />
      
      {/* Visual Frame */}
      <div className="layout-frame">
        <div className="frame-border" />
      </div>
      
      {/* Header & Tools */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-12 h-[2px] bg-accent" />
            <span className="text-sm font-black uppercase tracking-widest text-accent">Our Collection</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Premium <br/> Technology.</h1>
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
              className={cn("p-3 rounded-xl transition-all", viewMode === 'grid' ? "bg-white text-black" : "text-white/40 hover:text-white")}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn("p-3 rounded-xl transition-all", viewMode === 'list' ? "bg-white text-black" : "text-white/40 hover:text-white")}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          <button className="flex-1 md:flex-none flex items-center justify-between px-6 py-4 bg-white/5 rounded-2xl border border-white/10 min-w-[180px] group">
            <div className="flex items-center gap-3">
              <ArrowUpDown className="w-4 h-4 text-white/40" />
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={cn(
                    "group relative bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden transition-all hover:bg-white/[0.08] hover:border-white/20",
                    viewMode === 'list' && "flex md:flex-row flex-col items-center p-6 gap-8"
                  )}
                >
                  {/* Image Container - Clickable */}
                  <Link to={`/product/${product.slug}`} className={cn(
                    "relative overflow-hidden",
                    viewMode === 'grid' ? "aspect-square w-full" : "w-64 aspect-square flex-shrink-0"
                  )}>
                    <img 
                      src={product.thumbnailUrl} 
                      alt={product.name} 
                      className="w-full h-full object-contain mix-blend-screen p-8 transition-transform duration-700 group-hover:scale-110" 
                    />
                    
                    {/* Quick Action Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent flex gap-3">
                      <button 
                        onClick={(e) => { e.preventDefault(); openQuickView(product); }}
                        className="flex-1 py-3 bg-white text-black rounded-xl text-xs font-black uppercase hover:bg-accent/90"
                      >
                        Quick View
                      </button>
                    </div>
                  </Link>

                  {/* Info Container */}
                  <div className={cn("p-8", viewMode === 'list' && "flex-1 p-0")}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent">{product.brandName}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-white/40 font-bold">{product.rating}</span>
                        <div className="w-2 h-2 rounded-full bg-yellow-400 blur-[2px]" />
                      </div>
                    </div>
                    <Link to={`/product/${product.slug}`} className="text-xl font-bold text-white mb-6 block group-hover:text-accent transition-colors">{product.name}</Link>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-xs text-white/30 uppercase font-black tracking-tighter">Starting At</span>
                        <span className="text-2xl font-black text-white">$ {product.minPrice}</span>
                      </div>
                      <button 
                        onClick={() => addItem(product, { id: product.id, price: product.minPrice, sku: product.id + '-SKU', attributeValues: [] })}
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all"
                      >
                        <ShoppingCart className="w-5 h-5" />
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

      <QuickViewModal 
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        t={t}
      />
    </div>
  );
}
