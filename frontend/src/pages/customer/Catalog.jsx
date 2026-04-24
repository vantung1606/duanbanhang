import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { Search, SlidersHorizontal, LayoutGrid, List, ArrowUpDown, ChevronDown, ShoppingBag, ShoppingCart, ArrowRight, Star } from 'lucide-react';
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
        title="Cửa Hàng Máy Tạo Khói DuongDIY" 
        description="Khám phá các dòng máy tạo khói, dung dịch khói và phụ kiện sân khấu chuyên nghiệp nhất từ DuongDIY." 
      />
      
      
        {/* Catalog Hero Section */}
        <section className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-indigo-600 font-black tracking-[0.6em] uppercase text-[10px] mb-6 block">Bộ Sưu Tập DUONGDIY</span>
            <h1 className="text-6xl md:text-[7vw] font-black text-slate-900 tracking-tighter leading-none mb-10 whitespace-nowrap">
              Sản Phẩm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Tiêu Điểm</span>
            </h1>
            <p className="text-slate-500 text-xl max-w-4xl mx-auto font-medium leading-relaxed italic">
              Khám phá hệ sinh thái máy tạo khói chuyên nghiệp, dung dịch khói cao cấp và các phụ kiện hiệu ứng sân khấu dẫn đầu xu hướng.
            </p>
          </motion.div>
        </section>
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start relative">
        {/* Sidebar */}
        <div className="w-full lg:w-72 sticky top-32 z-20">
          <FilterSidebar />
        </div>

        {/* Right Content */}
        <div className="flex-1 w-full min-w-0">
          
          {/* Header & Tools */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 w-full">
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest italic">
              Đang hiển thị {products.length} sản phẩm
            </div>
            
            <div className="w-full md:w-auto flex items-center gap-4">
              <div className="flex p-1.5 bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={cn("p-2.5 rounded-xl transition-all", viewMode === 'grid' ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-900")}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={cn("p-2.5 rounded-xl transition-all", viewMode === 'list' ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-900")}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <button className="flex items-center gap-4 px-6 py-4 bg-white/60 border border-white/40 backdrop-blur-xl rounded-2xl group text-slate-800 shadow-sm hover:shadow-md transition-all">
                <ArrowUpDown className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-black uppercase tracking-widest">{sortBy}</span>
                <ChevronDown className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className={cn(
            "grid gap-10",
            viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
          )}>
            <AnimatePresence mode="popLayout">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.05 }}
                  className={cn(
                    "group relative bg-white/40 backdrop-blur-2xl rounded-[3.5rem] border border-white/40 overflow-hidden transition-all duration-500 hover:bg-white/70 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]",
                    viewMode === 'list' && "flex md:flex-row flex-col items-center p-10 gap-12"
                  )}
                >
                  {/* Image Container */}
                  <Link to={`/product/${product.slug}`} className={cn(
                    "relative overflow-hidden block bg-gradient-to-br from-slate-50 to-indigo-50/30",
                    viewMode === 'grid' ? "aspect-square w-full" : "w-72 aspect-square flex-shrink-0 rounded-[2.5rem]"
                  )}>
                    <img 
                      src={product.thumbnailUrl} 
                      alt={product.name} 
                      className="w-full h-full object-contain p-12 mix-blend-multiply transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-3" 
                    />
                    <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-indigo-600 border border-white/50 opacity-0 group-hover:opacity-100 transition-all">
                      Mới
                    </div>
                  </Link>

                  {/* Content Container */}
                  <div className={cn("p-10", viewMode === 'list' && "flex-1 p-0")}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-indigo-50 text-[9px] font-black uppercase tracking-[0.1em] text-indigo-600 border border-indigo-100/50">{product.categoryName}</span>
                      <div className="w-1 h-1 rounded-full bg-slate-300" />
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-indigo-600 text-indigo-600" />
                        <span className="text-[10px] text-slate-500 font-bold">{product.rating}</span>
                      </div>
                    </div>

                    <Link to={`/product/${product.slug}`} className="text-3xl font-black text-slate-900 mb-8 block group-hover:text-indigo-600 transition-all leading-[1.1] tracking-tighter">{product.name}</Link>
                    
                    <div className="flex items-center justify-between pt-10 border-t border-slate-100/80">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1.5 italic">Giá từ</p>
                        <p className="text-2xl font-black text-slate-900 tracking-tighter italic">{formatCurrency(product.minPrice)}</p>
                      </div>
                      <button 
                        onClick={(e) => { e.preventDefault(); addItem(product); }}
                        className="w-16 h-16 rounded-3xl bg-slate-950 text-white flex items-center justify-center hover:bg-indigo-600 hover:scale-110 hover:-rotate-6 transition-all duration-300 shadow-xl shadow-slate-950/10 active:scale-95"
                      >
                        <ShoppingBag className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More Section */}
          <div className="mt-32 text-center relative">
             <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200 z-0" />
             <button className="relative z-10 px-16 py-6 rounded-[2rem] bg-white border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all shadow-xl active:scale-95">
                Xem thêm sản phẩm
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
