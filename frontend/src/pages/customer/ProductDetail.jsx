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
  ShoppingBag,
  ArrowLeft,
  ChevronLeft
} from 'lucide-react';
import { catalogService } from '../../services/catalog-service';
import { cn, formatCurrency } from '../../lib/utils';
import { useTranslation } from 'react-i18next';
import useCartStore from '../../store/cart-store';
import SEO from '../../components/common/SEO';
import NeuralynNavbar from '../../components/layout/customer/NeuralynNavbar';
import NeuralynFooter from '../../components/layout/customer/NeuralynFooter';

const SpecsTable = ({ specs }) => {
  if (!specs) return <div className="col-span-2 text-slate-400 text-xs italic">Không có thông số kỹ thuật.</div>;
  
  const specsList = typeof specs === 'string' ? JSON.parse(specs) : specs;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {specsList.map((spec, idx) => (
        <div key={idx} className="p-4 rounded-2xl bg-white/40 border border-slate-200/50 backdrop-blur-xl flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">{spec.label}</span>
          <span className="text-sm font-bold text-slate-800">{spec.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function ProductDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [activeImage, setActiveImage] = useState(0);
  const { toggleCart, getTotalItems, addItem } = useCartStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetching for now, can be connected to real API
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await catalogService.getProductBySlug(slug);
        
        // Ensure imageUrls is an array
        if (!data.imageUrls || data.imageUrls.length === 0) {
          data.imageUrls = [data.thumbnailUrl || "https://images.unsplash.com/photo-1516211697149-d8573292051d?q=80&w=800"];
        }

        // Handle specifications parsing
        let parsedSpecs = [];
        if (data.specifications) {
          try {
            parsedSpecs = JSON.parse(data.specifications);
          } catch (e) {
            console.error("Error parsing specifications:", e);
          }
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
        console.error("Error loading product:", error);
        // Fallback to mock for development if needed, but in production this should show an error
        const mock = catalogService.getMockProducts().find(p => p.slug === slug);
        if (mock) {
            setProduct({...mock, specs: [], imageUrls: [mock.thumbnailUrl], variants: []});
        }
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  // Logic to find variant based on selected options
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

  if (loading) return <div className="h-screen bg-[#f8fafc] flex items-center justify-center text-slate-800 font-black italic text-4xl animate-pulse">Neuralyn...</div>;

  // Group attributes for picker
  const groupedAttributes = {};
  product.variants.forEach(v => {
    v.attributeValues.forEach(av => {
      if (!groupedAttributes[av.attributeName]) groupedAttributes[av.attributeName] = new Set();
      groupedAttributes[av.attributeName].add(av.value);
    });
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-indigo-500 selection:text-white pt-28 pb-20 relative p-4 md:p-6 overflow-x-hidden no-scrollbar">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-blue-400/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      <NeuralynNavbar />
      <SEO 
        title={product?.name} 
        description={product?.description} 
      />
      
      {/* Visual Frame */}
      <div className="layout-frame pointer-events-none">
        <div className="frame-border" />
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-3 mb-12 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Link to="/catalog" className="hover:text-indigo-600 flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Trở về danh sách
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span>{product.categoryName}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              layoutId={`img-${product.id}`}
              className="aspect-square w-full rounded-[3rem] bg-white/40 border border-slate-200/50 backdrop-blur-xl overflow-hidden relative group"
            >
              <img 
                src={product.imageUrls[activeImage]} 
                className="w-full h-full object-contain p-12 mix-blend-multiply transition-transform duration-700 group-hover:scale-110" 
                alt={product.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent pointer-events-none" />
            </motion.div>

            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {product.imageUrls.map((url, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "w-24 h-24 rounded-2xl bg-white/40 border backdrop-blur-xl transition-all overflow-hidden flex-shrink-0 p-2",
                    activeImage === idx ? "border-indigo-600" : "border-slate-200/50 grayscale hover:grayscale-0"
                  )}
                >
                  <img src={url} className="w-full h-full object-contain mix-blend-multiply" alt="Preview"/>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info & Actions */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-[0.2em] text-[10px]">
                <Zap className="w-3 h-3" /> {product.brandName} Technology
              </div>
              <h1 className="text-5xl md:text-6xl font-black leading-none tracking-tighter uppercase text-slate-900">{product.name}</h1>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-3 h-3", i < 4 ? "fill-indigo-600 text-indigo-600" : "text-slate-300")} />
                  ))}
                  <span className="text-xs font-bold ml-2 text-slate-600">{product.rating} (124 đánh giá)</span>
                </div>
                <div className="w-px h-4 bg-slate-200" />
                <span className="text-xs font-black uppercase tracking-widest text-indigo-600">Còn hàng</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-black text-slate-900">{formatCurrency(selectedVariant?.price || product.minPrice)}</span>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Giá đã bao gồm VAT</span>
            </div>

            <div className="space-y-8">
              {Object.entries(groupedAttributes).map(([attr, vals]) => (
                <div key={attr} className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{attr}</h4>
                  <div className="flex flex-wrap gap-3">
                    {Array.from(vals).map(val => (
                      <button 
                        key={val}
                        onClick={() => handleOptionChange(attr, val)}
                        className={cn(
                          "px-6 py-3 rounded-xl border text-sm font-bold transition-all",
                          selectedOptions[attr] === val 
                            ? "bg-slate-900 text-white border-slate-900 shadow-[0_0_20px_rgba(15,23,42,0.1)]" 
                            : "bg-white/40 border-slate-200/50 text-slate-500 hover:border-slate-400"
                        )}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 flex flex-col gap-4">
              <button 
                onClick={() => addItem(product, selectedVariant)}
                className="w-full bg-slate-900 text-white hover:bg-indigo-600 py-6 rounded-2xl text-lg font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
              >
                <ShoppingCart className="w-5 h-5" /> Thêm vào giỏ hàng
              </button>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/40 border border-slate-200/50 backdrop-blur-xl">
                  <Truck className="w-4 h-4 text-indigo-600" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Miễn phí giao hàng</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/40 border border-slate-200/50 backdrop-blur-xl">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Bảo hành</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/40 border border-slate-200/50 backdrop-blur-xl">
                  <RotateCcw className="w-4 h-4 text-indigo-600" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Đổi trả 30 ngày</span>
                </div>
              </div>
            </div>

            <div className="pt-10 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200/50 pb-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Thông số kỹ thuật</h3>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
              <SpecsTable specs={product.specs} />
            </div>
          </div>
        </div>
      </div>

      <NeuralynFooter />
    </div>
  );
}
