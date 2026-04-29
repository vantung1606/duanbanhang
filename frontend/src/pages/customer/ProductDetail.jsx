import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Zap, 
  ShoppingCart,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { catalogService } from '../../services/catalog-service';
import { cn, formatCurrency } from '../../lib/utils';
import { useTranslation } from 'react-i18next';
import useCartStore from '../../store/cart-store';
import SEO from '../../components/common/SEO';
import NeuralynNavbar from '../../components/layout/customer/NeuralynNavbar';
import NeuralynFooter from '../../components/layout/customer/NeuralynFooter';
import { useToast } from '../../components/common/Toast';
import { useAuthStore } from '../../store/authStore';

const SpecsTable = ({ specs }) => {
  if (!specs) return <div className="text-[#1a365d]/40 text-[10px] italic">Không có thông số kỹ thuật.</div>;
  const specsList = typeof specs === 'string' ? JSON.parse(specs) : specs;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
      {specsList.map((spec, idx) => (
        <div key={idx} className="p-4 rounded-2xl bg-white border border-[#cadaee] flex items-center justify-between shadow-sm">
          <span className="text-[9px] font-black uppercase tracking-widest text-[#1a365d]/40">{spec.label}</span>
          <span className="text-xs md:text-sm font-bold text-[#1a365d]">{spec.value}</span>
        </div>
      ))}
    </div>
  );
};

const FloatingOrb = ({ color, size, top, left, delay }) => (
  <motion.div
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
      scale: [1, 1.05, 1],
      opacity: [0.1, 0.2, 0.1],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none blur-[100px] rounded-full z-0 opacity-10"
    style={{ backgroundColor: color, width: size, height: size, top, left }}
  />
);

export default function ProductDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCartStore();
  const { addToast } = useToast();
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await catalogService.getProductBySlug(slug);
        if (!data.imageUrls || data.imageUrls.length === 0) {
          data.imageUrls = [data.thumbnailUrl || "https://images.unsplash.com/photo-1516211697149-d8573292051d?q=80&w=800"];
        }
        let parsedSpecs = [];
        if (data.specifications) {
          try { parsedSpecs = JSON.parse(data.specifications); } catch (e) { console.error(e); }
        }
        const enrichedProduct = {
          ...data,
          specs: parsedSpecs.length > 0 ? parsedSpecs : [
            { label: "Công Suất", value: data.name.includes('400W') ? '400W' : (data.name.includes('900W') ? '900W' : '1500W') },
            { label: "Khởi Động", value: "3-5 Phút" },
            { label: "Bình Chứa", value: "1.5 - 2.5 Lít" },
            { label: "Điều Khiển", value: "Remote / DMX 512" }
          ]
        };
        setProduct(enrichedProduct);
        if (enrichedProduct.variants && enrichedProduct.variants.length > 0) {
          setSelectedVariant(enrichedProduct.variants[0]);
          const initialOptions = {};
          enrichedProduct.variants[0].attributeValues.forEach(av => {
            initialOptions[av.attributeName] = av.value;
          });
          setSelectedOptions(initialOptions);
        }
      } catch (error) {
        const mock = catalogService.getMockProducts().find(p => p.slug === slug);
        if (mock) setProduct({...mock, specs: [], imageUrls: [mock.thumbnailUrl], variants: []});
      } finally { setLoading(false); }
    };
    loadProduct();
  }, [slug]);

  useEffect(() => {
    if (product) {
      const match = product.variants.find(v => 
        v.attributeValues.every(av => selectedOptions[av.attributeName] === av.value)
      );
      if (match) setSelectedVariant(match);
    }
  }, [selectedOptions, product]);

  const handleOptionChange = (attr, val) => {
    setSelectedOptions(prev => ({ ...prev, [attr]: val }));
  };

  if (loading) return <div className="h-screen bg-[#e8ebf2] flex items-center justify-center text-[#4981cf] font-heading font-black italic text-3xl animate-pulse">DUONGDIY...</div>;

  const groupedAttributes = {};
  product.variants.forEach(v => {
    v.attributeValues.forEach(av => {
      if (!groupedAttributes[av.attributeName]) groupedAttributes[av.attributeName] = new Set();
      groupedAttributes[av.attributeName].add(av.value);
    });
  });

  return (
    <div className="min-h-screen bg-[#e8ebf2] text-[#1a365d] font-sans selection:bg-[#4981cf] selection:text-white pt-24 md:pt-32 pb-20 relative overflow-x-hidden">
      <NeuralynNavbar />
      <SEO title={product?.name} description={product?.description} />
      
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingOrb color="#ffffff" size="300px" top="-5%" left="60%" delay={0} />
        <FloatingOrb color="#4981cf" size="250px" top="40%" left="-10%" delay={2} />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Breadcrumb - Responsive */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-8 md:mb-12 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#1a365d]/40">
          <Link to="/catalog" className="hover:text-[#4981cf] flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Catalog
          </Link>
          <ChevronRight className="w-2.5 h-2.5" />
          <span className="hidden sm:inline">{product.categoryName}</span>
          <ChevronRight className="w-2.5 h-2.5 hidden sm:inline" />
          <span className="text-[#1a365d]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left: Gallery - Responsive */}
          <div className="lg:col-span-7 space-y-4 md:space-y-6">
            <motion.div 
              layoutId={`img-${product.id}`}
              className="aspect-square w-full rounded-[2.5rem] md:rounded-[3rem] bg-white border-4 border-white shadow-xl overflow-hidden relative group"
            >
              <img 
                src={product.imageUrls[activeImage]} 
                className="w-full h-full object-contain p-8 md:p-12 transition-transform duration-700 group-hover:scale-105" 
                alt={product.name}
              />
              <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-[#4981cf] text-white text-[9px] font-black uppercase tracking-widest shadow-lg">Premium</div>
            </motion.div>

            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 no-scrollbar">
              {product.imageUrls.map((url, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white border-2 transition-all overflow-hidden flex-shrink-0 p-2",
                    activeImage === idx ? "border-[#4981cf] shadow-lg" : "border-transparent grayscale hover:grayscale-0"
                  )}
                >
                  <img src={url} className="w-full h-full object-contain" alt="Preview"/>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info & Actions - Scaled Down */}
          <div className="lg:col-span-5 space-y-8 md:space-y-10">
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 text-[#4981cf] font-heading font-black uppercase tracking-[0.2em] text-[9px]">
                <Zap className="w-3 h-3 fill-current" /> {product.brandName || "DUONGDIY"} PRO SERIES
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black leading-tight tracking-tight text-[#1a365d] uppercase">{product.name}</h1>
              <div className="flex items-center gap-4 pt-1">
                <div className="flex items-center gap-1 text-[#4981cf]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-3 h-3 md:w-3.5 md:h-3.5", i < 4 ? "fill-current" : "opacity-20")} />
                  ))}
                  <span className="text-[10px] md:text-xs font-black ml-2 text-[#1a365d]/50">{product.rating} (120+)</span>
                </div>
                <div className="w-px h-3 bg-[#cadaee]" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#4981cf]">In Stock</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl md:text-5xl font-black text-[#4981cf] tracking-tighter">{formatCurrency(selectedVariant?.price || product.minPrice)}</span>
              <span className="text-[9px] font-black text-[#1a365d]/40 uppercase tracking-widest">VNĐ / Unit</span>
            </div>

            {/* Attributes Picker */}
            <div className="space-y-6">
              {Object.entries(groupedAttributes).map(([attr, vals]) => (
                <div key={attr} className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1a365d]/40">{attr}</h4>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {Array.from(vals).map(val => (
                      <button 
                        key={val}
                        onClick={() => handleOptionChange(attr, val)}
                        className={cn(
                          "px-5 py-2.5 md:px-6 md:py-3 rounded-xl border-2 text-[11px] md:text-xs font-black transition-all",
                          selectedOptions[attr] === val 
                            ? "bg-[#1a365d] text-white border-[#1a365d] shadow-xl" 
                            : "bg-white border-[#cadaee] text-[#1a365d]/60 hover:border-[#4981cf]"
                        )}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-4 md:space-y-6">
              <button 
                onClick={async () => {
                  if (!isAuthenticated) {
                    addToast('Vui lòng đăng nhập để thêm vào giỏ hàng!', 'info');
                    return;
                  }

                  if (!selectedVariant) {
                    addToast('Vui lòng chọn phiên bản sản phẩm!', 'error');
                    return;
                  }

                  try {
                    await addItem(product, selectedVariant, 1);
                    addToast(`Đã thêm ${product.name} vào giỏ hàng!`, 'success');
                  } catch (error) {
                    addToast('Không thể thêm vào giỏ hàng. Vui lòng thử lại!', 'error');
                  }
                }}
                className="w-full bg-[#1a365d] text-white hover:bg-[#4981cf] py-5 md:py-6 rounded-2xl text-base md:text-lg font-black flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all"
              >
                <ShoppingCart className="w-5 h-5" /> THÊM VÀO GIỎ HÀNG
              </button>
              
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Truck, label: 'Free Ship' },
                  { icon: ShieldCheck, label: 'Warranty' },
                  { icon: RotateCcw, label: '30 Days' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white border border-[#cadaee] shadow-sm">
                    <item.icon className="w-4 h-4 text-[#4981cf]" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#1a365d]/50 text-center">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs Table */}
            <div className="pt-8 md:pt-10 border-t border-[#cadaee] space-y-6">
              <h3 className="text-[10px] md:text-xs font-heading font-black uppercase tracking-[0.3em] text-[#1a365d]">Thông số kỹ thuật</h3>
              <SpecsTable specs={product.specs} />
            </div>
          </div>
        </div>
      </div>

      <NeuralynFooter />
    </div>
  );
}
