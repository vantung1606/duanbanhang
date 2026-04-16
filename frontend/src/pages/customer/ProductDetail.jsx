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
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';
import useCartStore from '../../store/cart-store';
import SEO from '../../components/common/SEO';

const SpecsTable = ({ specs }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {specs.map((spec, idx) => (
      <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-widest text-white/30">{spec.label}</span>
        <span className="text-sm font-bold text-white">{spec.value}</span>
      </div>
    ))}
  </div>
);

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
      // For demo, we use a mock product if API not ready
      const mock = catalogService.getMockProducts().find(p => p.slug === slug) || catalogService.getMockProducts()[0];
      
      // Detailed mock structure
      const detailedProduct = {
        ...mock,
        description: "Experience the next generation of performance and efficiency. Designed for professionals and enthusiasts alike.",
        imageUrls: [
          mock.thumbnailUrl,
          "https://images.unsplash.com/photo-1510511459019-5dee997dd0df?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800"
        ],
        variants: [
          { id: 101, sku: `${mock.slug}-base`, price: mock.minPrice, stockQuantity: 10, attributeValues: [{attributeName: "Color", value: "Black"}, {attributeName: "Storage", value: "128GB"}] },
          { id: 102, sku: `${mock.slug}-pro`, price: mock.minPrice + 200, stockQuantity: 5, attributeValues: [{attributeName: "Color", value: "Silver"}, {attributeName: "Storage", value: "256GB"}] },
        ],
        specs: [
          { label: "Display", value: '6.7" OLED' },
          { label: "Chip", value: "A17 Pro / M3" },
          { label: "Battery", value: "48 Hours" },
          { label: "Weight", value: "187g" }
        ]
      };
      
      setProduct(detailedProduct);
      setSelectedVariant(detailedProduct.variants[0]);
      
      // Initialize selected options
      const initialOptions = {};
      detailedProduct.variants[0].attributeValues.forEach(av => {
        initialOptions[av.attributeName] = av.value;
      });
      setSelectedOptions(initialOptions);
      setLoading(false);
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

  if (loading) return <div className="h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-black italic text-4xl animate-pulse">Neuralyn...</div>;

  // Group attributes for picker
  const groupedAttributes = {};
  product.variants.forEach(v => {
    v.attributeValues.forEach(av => {
      if (!groupedAttributes[av.attributeName]) groupedAttributes[av.attributeName] = new Set();
      groupedAttributes[av.attributeName].add(av.value);
    });
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 pb-20 relative p-4 md:p-6 overflow-x-hidden no-scrollbar">
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
        <div className="flex items-center gap-3 mb-12 text-[10px] font-black uppercase tracking-widest text-white/30">
          <Link to="/catalog" className="hover:text-accent flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Back to Collection
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span>{product.categoryName}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              layoutId={`img-${product.id}`}
              className="aspect-square w-full rounded-[3rem] bg-white/5 border border-white/10 overflow-hidden relative group"
            >
              <img 
                src={product.imageUrls[activeImage]} 
                className="w-full h-full object-contain p-12 mix-blend-screen transition-transform duration-700 group-hover:scale-110" 
                alt={product.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>

            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {product.imageUrls.map((url, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "w-24 h-24 rounded-2xl bg-white/5 border transition-all overflow-hidden flex-shrink-0 p-2",
                    activeImage === idx ? "border-accent" : "border-white/10 grayscale hover:grayscale-0"
                  )}
                >
                  <img src={url} className="w-full h-full object-contain mix-blend-screen" alt="Preview"/>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info & Actions */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-accent font-black uppercase tracking-[0.2em] text-[10px]">
                <Zap className="w-3 h-3" /> {product.brandName} Technology
              </div>
              <h1 className="text-5xl md:text-6xl font-black leading-none tracking-tighter uppercase">{product.name}</h1>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-3 h-3", i < 4 ? "fill-accent text-accent" : "text-white/20")} />
                  ))}
                  <span className="text-xs font-bold ml-2">{product.rating} (124 reviews)</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <span className="text-xs font-black uppercase tracking-widest text-accent">In Stock</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-black text-white">$ {selectedVariant?.price || product.minPrice}</span>
              <span className="text-sm font-bold text-white/30 uppercase tracking-widest">Pricing Inc. VAT</span>
            </div>

            <div className="space-y-8">
              {Object.entries(groupedAttributes).map(([attr, vals]) => (
                <div key={attr} className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">{attr}</h4>
                  <div className="flex flex-wrap gap-3">
                    {Array.from(vals).map(val => (
                      <button 
                        key={val}
                        onClick={() => handleOptionChange(attr, val)}
                        className={cn(
                          "px-6 py-3 rounded-xl border text-sm font-bold transition-all",
                          selectedOptions[attr] === val 
                            ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                            : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
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
                className="w-full bg-accent text-black py-6 rounded-2xl text-lg font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <Truck className="w-4 h-4 text-accent" />
                  <span className="text-[8px] font-black uppercase tracking-widest">Free Ship</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span className="text-[8px] font-black uppercase tracking-widest">Warranty</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <RotateCcw className="w-4 h-4 text-accent" />
                  <span className="text-[8px] font-black uppercase tracking-widest">30 Days</span>
                </div>
              </div>
            </div>

            <div className="pt-10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xs font-black uppercase tracking-widest">Technical Specifications</h3>
                <ChevronRight className="w-4 h-4 opacity-30" />
              </div>
              <SpecsTable specs={product.specs} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
