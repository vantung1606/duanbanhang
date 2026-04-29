import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { LayoutGrid, List, ArrowUpDown, ChevronDown, ShoppingBag, Star, Filter, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FilterSidebar from '../../components/customer/FilterSidebar';
import QuickViewModal from '../../components/customer/QuickViewModal';
import { catalogService } from '../../services/catalog-service';
import { cn, formatCurrency } from '../../lib/utils';
import useCartStore from '../../store/cart-store';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import NeuralynNavbar from '../../components/layout/customer/NeuralynNavbar';
import NeuralynFooter from '../../components/layout/customer/NeuralynFooter';
import { useToast } from '../../components/common/Toast';
import { useAuthStore } from '../../store/authStore';

const FloatingOrb = ({ color, size, top, left, delay }) => (
  <motion.div
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
      scale: [1, 1.05, 1],
      opacity: [0.15, 0.3, 0.15],
    }}
    transition={{
      duration: 10 + Math.random() * 5,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none blur-[100px] rounded-full z-0 opacity-15"
    style={{
      backgroundColor: color,
      width: size,
      height: size,
      top,
      left,
    }}
  />
);

export default function Catalog() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addItem } = useCartStore();
  const { addToast } = useToast();
  const { isAuthenticated } = useAuthStore();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy] = useState('Mới nhất');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await catalogService.getProducts({ 
          page: currentPage - 1, 
          size: 12 
        });
        setProducts(data.content || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching catalog products:', error);
        setProducts(catalogService.getMockProducts());
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const containerRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#e8ebf2] text-[#1a365d] font-sans selection:bg-[#4981cf] selection:text-white relative overflow-x-hidden">
      <NeuralynNavbar />
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingOrb color="#ffffff" size="300px" top="-5%" left="60%" delay={0} />
        <FloatingOrb color="#4981cf" size="250px" top="40%" left="-10%" delay={2} />
      </div>

      <div 
        ref={containerRef}
        className="relative z-10 pt-24 md:pt-28 pb-20 px-3 sm:px-8 md:px-16 lg:px-24"
      >
        <SEO 
          title="Cửa Hàng Máy Tạo Khói DuongDIY" 
          description="Khám phá các dòng máy tạo khói, dung dịch khói và phụ kiện sân khấu chuyên nghiệp nhất từ DuongDIY." 
        />

        {/* Catalog Hero */}
        <section className="mb-12 md:mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#4981cf] font-heading font-black tracking-[0.4em] uppercase text-[8px] md:text-[10px] mb-4 md:mb-6 block drop-shadow-sm">Bộ Sưu Tập DUONGDIY</span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-[#1a365d] tracking-tight leading-none mb-4 md:mb-8 drop-shadow-sm">
              Sản Phẩm <span className="text-[#4981cf]">Tiêu Điểm</span>
            </h1>
            <p className="text-[#1a365d] text-sm md:text-lg max-w-2xl mx-auto font-bold opacity-70 leading-relaxed italic px-4">
              Hệ sinh thái máy tạo khói chuyên nghiệp dẫn đầu xu hướng sân khấu.
            </p>
          </motion.div>
        </section>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start relative">
          {/* Sidebar - Fix: Added fixed width and proper z-index */}
          <div className={cn(
            "w-full lg:w-[320px] lg:shrink-0 sticky top-28 z-20 transition-all duration-300",
            isFilterOpen ? "block" : "hidden lg:block"
          )}>
            <div className="bg-white/90 backdrop-blur-xl border-2 border-white rounded-[2.5rem] p-8 shadow-2xl lg:shadow-xl lg:shadow-slate-200/50">
               <div className="flex justify-between items-center mb-8 lg:hidden">
                  <h3 className="font-heading font-black text-xl text-[#1a365d]">Bộ Lọc</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#1a365d]"><Filter className="w-4 h-4" /></button>
               </div>
               <FilterSidebar />
            </div>
          </div>

          {/* Right Content - Fix: Ensure flex-1 and overflow-hidden to prevent shrinking */}
          <div className="flex-1 w-full min-w-0 overflow-hidden lg:overflow-visible">
            
            {/* Header & Tools */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 w-full bg-white/40 backdrop-blur-md p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] border border-white/50">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-5 py-2.5 bg-[#1a365d] text-white rounded-xl shadow-lg active:scale-95 transition-all"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Lọc</span>
                </button>
                <div className="text-[9px] font-black text-[#1a365d]/40 uppercase tracking-widest italic ml-auto sm:ml-0">
                  {products.length} sản phẩm
                </div>
              </div>
              
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2 md:gap-4">
                <div className="flex p-1 bg-white/80 rounded-xl border border-[#cadaee]">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-[#4981cf] text-white shadow-lg" : "text-[#1a365d]/30 hover:text-[#4981cf]")}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-[#4981cf] text-white shadow-lg" : "text-[#1a365d]/30 hover:text-[#4981cf]")}
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-[#cadaee] rounded-xl group text-[#1a365d] shadow-sm hover:shadow-md transition-all">
                  <ArrowUpDown className="w-3 h-3 text-[#4981cf]" />
                  <span className="text-[9px] font-black uppercase tracking-widest">{sortBy}</span>
                  <ChevronDown className="w-3 h-3 text-[#1a365d]/30 group-hover:text-[#1a365d] transition-colors" />
                </button>
              </div>
            </div>

            {/* Product Grid - 2 Columns on Mobile, Shrunken Cards */}
            <div className={cn(
              "grid gap-3 md:gap-8 min-h-[400px]",
              viewMode === 'grid' ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}>
              {isLoading ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-white/20 animate-pulse rounded-[2.5rem]" />
                ))
              ) : (
                <AnimatePresence mode="popLayout">
                {products.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                    className={cn(
                      "group relative bg-white border-2 md:border-4 border-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(73,129,207,0.15)] flex flex-col",
                      viewMode === 'list' && "flex md:flex-row flex-col items-center p-4 md:p-8 gap-6 md:gap-10 grid-cols-1"
                    )}
                  >
                    {/* Image Container */}
                    <Link to={`/product/${product.slug}`} className={cn(
                      "relative overflow-hidden block bg-[#e8ebf2]",
                      viewMode === 'grid' ? "aspect-square w-full" : "w-full md:w-60 aspect-square flex-shrink-0 rounded-2xl md:rounded-3xl"
                    )}>
                      <img 
                        src={product.thumbnailUrl} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-4 md:p-10 transition-transform duration-1000 group-hover:scale-110" 
                      />
                      <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20">
                         <span className="bg-[#4981cf] text-white px-2 py-0.5 md:py-1.5 rounded-full font-black text-[6px] md:text-[8px] uppercase tracking-widest shadow-lg">Mới</span>
                      </div>
                    </Link>

                    {/* Content Container */}
                    <div className={cn("p-3 md:p-8 flex flex-col flex-1", viewMode === 'list' && "flex-1 p-0")}>
                      <div className="flex items-center gap-1.5 md:gap-3 mb-2 md:mb-4">
                        <span className="px-2 py-0.5 rounded-full bg-[#e8ebf2] text-[7px] md:text-[9px] font-black uppercase tracking-wider text-[#4981cf]">{product.categoryName}</span>
                        <div className="flex items-center gap-0.5 text-[#4981cf]">
                           <Star className="w-2 h-2 md:w-3 h-3 fill-current" />
                           <span className="text-[8px] md:text-[10px] text-[#1a365d]/50 font-black">{product.rating}</span>
                        </div>
                      </div>

                      <Link to={`/product/${product.slug}`} className="text-xs md:text-2xl font-heading font-black text-[#1a365d] mb-3 md:mb-6 block group-hover:text-[#4981cf] transition-all leading-tight tracking-tight line-clamp-2 h-8 md:h-auto">{product.name}</Link>
                      
                      <div className="flex items-center justify-between mt-auto pt-3 md:pt-6 border-t border-[#e8ebf2]">
                        <div className="flex-1 min-w-0">
                          <p className="hidden md:block text-[8px] text-[#1a365d]/40 uppercase font-black tracking-widest mb-1 italic">Giá từ</p>
                          <p className="text-[11px] md:text-2xl font-black text-[#4981cf] tracking-tighter truncate">{formatCurrency(product.minPrice)}</p>
                        </div>
                        <button 
                          onClick={async (e) => { 
                            e.preventDefault(); 
                            if (!isAuthenticated) {
                              addToast('Vui lòng đăng nhập để thêm vào giỏ hàng!', 'info');
                              return;
                            }
                            
                            try {
                              const variantId = product.defaultVariantId || product.id;
                              const variant = { id: variantId, price: product.minPrice, sku: product.sku || `SKU-${product.id}`, attributeValues: [] };
                              await addItem(product, variant, 1);
                              addToast(`Đã thêm ${product.name} vào giỏ hàng!`, 'success');
                            } catch (error) {
                              addToast('Không thể thêm vào giỏ hàng!', 'error');
                            }
                          }}
                          className="w-8 h-8 md:w-14 md:h-14 rounded-lg md:rounded-2xl bg-[#1a365d] text-white flex items-center justify-center hover:bg-[#4981cf] transition-all duration-300 shadow-lg active:scale-90 flex-shrink-0"
                        >
                          <ShoppingCart className="w-4 h-4 md:w-6 md:h-6" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            </div>

            {/* Pagination Section */}
            <div className="mt-16 md:mt-24 flex flex-col items-center gap-8">
               <div className="flex items-center gap-2 md:gap-4 p-2 bg-white/60 backdrop-blur-xl rounded-full border border-white/80 shadow-xl">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[#1a365d] hover:bg-[#4981cf] hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#1a365d]"
                  >
                    <ChevronDown className="w-5 h-5 rotate-90" />
                  </button>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, '...', 5].map((page, idx) => (
                      <button
                        key={idx}
                        onClick={() => typeof page === 'number' && setCurrentPage(page)}
                        className={cn(
                          "w-10 h-10 md:w-12 md:h-12 rounded-full font-black text-[10px] md:text-xs transition-all",
                          currentPage === page 
                            ? "bg-[#1a365d] text-white shadow-lg" 
                            : "text-[#1a365d]/50 hover:bg-white hover:text-[#4981cf]"
                        )}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[#1a365d] hover:bg-[#4981cf] hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#1a365d]"
                  >
                    <ChevronDown className="w-5 h-5 -rotate-90" />
                  </button>
               </div>
               
               <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1a365d]/40 italic">
                  Trang {currentPage} trên {totalPages}
               </p>
            </div>
          </div>
        </div>

      </div>
      <NeuralynFooter />

      <QuickViewModal 
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        t={t}
      />
    </div>
  );
}
