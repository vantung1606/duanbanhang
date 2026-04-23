import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Grid, 
  List as ListIcon, 
  X,
  FileText,
  Tag,
  Shield,
  DollarSign,
  Layers,
  ChevronDown,
  Image as ImageIcon,
  Zap,
  Eye,
  EyeOff,
  Infinity,
  PlusCircle,
  Percent,
  Star,
  CheckCircle2,
  Settings2,
  Box,
  Truck,
  Globe,
  Camera,
  Info,
  ListFilter
} from 'lucide-react';
import { cn } from '../lib/utils';
import { adminService } from '../services/api/adminService';
import { useToast } from '../components/common/Toast';

// Reusable Modal Layout
const ModalLayout = ({ isOpen, onClose, title, children, icon: Icon }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
        >
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {children}
          </div>
          {/* Sticky Footer */}
          <div className="px-10 py-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-4">
             <button onClick={onClose} className="px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-slate-100 transition-all">Bỏ qua</button>
             <button id="main-submit-btn" form="product-form" className="px-10 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all">Lưu thay đổi</button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const OdooField = ({ label, children, tooltip }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 py-3 border-b border-slate-50 last:border-0 group">
    <div className="flex items-center gap-2">
      <label className="text-sm font-bold text-slate-700">{label}</label>
      {tooltip && <Info className="w-3.5 h-3.5 text-indigo-400 cursor-help opacity-0 group-hover:opacity-100 transition-opacity" />}
    </div>
    <div className="md:col-span-2 relative">
      {children}
    </div>
  </div>
);

export default function ManagerProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('general'); // 'general', 'sales', 'ecommerce', 'variants'
  const [formLoading, setFormLoading] = useState(false);

  // Form State (Odoo style)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    canBeSold: true,
    canBePurchased: true,
    productType: 'GOODS', 
    salesTax: 10,
    purchaseTax: 10,
    internalReference: '',
    barcode: '',
    internalNote: '',
    shortDescription: '',
    description: '', 
    categoryId: '',
    brandId: '',
    imageUrl: '',
    ribbon: '',
    active: true,
    variants: [
      { sku: '', price: 0, originalPrice: '', stock: 0, isStockUnlimited: false, attributeValueIds: [] }
    ]
  });

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [prodData, catData, brandData, attrData] = await Promise.all([
        adminService.getAllProducts(),
        adminService.getAllCategories(),
        adminService.getAllBrands(),
        adminService.getAllAttributes()
      ]);
      setProducts(prodData);
      setCategories(catData);
      setBrands(brandData);
      setAttributes(attrData);
    } catch (error) {
      addToast('Lỗi tải dữ liệu ERP', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'name' && !selectedProduct ? { slug: value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') } : {})
    }));
  };

  const handleOpenAdd = () => {
    setSelectedProduct(null);
    setFormData({
      name: '', slug: '', canBeSold: true, canBePurchased: true, productType: 'GOODS',
      salesTax: 10, purchaseTax: 10, internalReference: '', barcode: '', internalNote: '',
      shortDescription: '', description: '', categoryId: '', brandId: '', imageUrl: '', ribbon: '', active: true,
      variants: [{ sku: '', price: 0, originalPrice: '', stock: 0, isStockUnlimited: false, attributeValueIds: [] }]
    });
    setActiveTab('general');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      canBeSold: product.canBeSold ?? true,
      canBePurchased: product.canBePurchased ?? true,
      productType: product.productType || 'GOODS',
      salesTax: product.salesTax || 10,
      purchaseTax: product.purchaseTax || 10,
      internalReference: product.internalReference || '',
      barcode: product.barcode || '',
      internalNote: product.internalNote || '',
      shortDescription: product.shortDescription || '',
      description: product.description || '',
      categoryId: categories.find(c => c.name === product.categoryName)?.id || '',
      brandId: brands.find(b => b.name === product.brandName)?.id || '',
      imageUrl: product.thumbnailUrl || '',
      ribbon: product.ribbon || '',
      active: product.active,
      variants: product.variants ? product.variants.map(v => ({
         sku: v.sku, price: v.price, originalPrice: v.originalPrice || '', stock: v.stockQuantity, isStockUnlimited: v.isStockUnlimited || false, attributeValueIds: []
      })) : [{ sku: '', price: product.minPrice, originalPrice: '', stock: 100, isStockUnlimited: false, attributeValueIds: [] }]
    });
    setActiveTab('general');
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      // Clean data for Backend (convert empty strings to null/Number for numeric fields)
      // Explicitly pick fields to avoid unknown property errors
      const cleanData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        categoryId: formData.categoryId === '' ? null : Number(formData.categoryId),
        brandId: formData.brandId === '' ? null : Number(formData.brandId),
        imageUrl: formData.imageUrl,
        ribbon: formData.ribbon,
        active: !!formData.active,
        productType: formData.productType || 'GOODS',
        internalReference: formData.internalReference,
        barcode: formData.barcode,
        internalNote: formData.internalNote,
        shortDescription: formData.shortDescription,
        canBeSold: !!formData.canBeSold,
        canBePurchased: !!formData.canBePurchased,
        salesTax: formData.salesTax === '' ? 10 : Number(formData.salesTax),
        purchaseTax: formData.purchaseTax === '' ? 10 : Number(formData.purchaseTax),
        variants: formData.variants.map(v => ({
          sku: v.sku,
          price: v.price === '' ? 0 : Number(v.price),
          originalPrice: (v.originalPrice === '' || v.originalPrice === null) ? null : Number(v.originalPrice),
          stock: v.stock === '' ? 0 : Number(v.stock),
          isStockUnlimited: !!v.isStockUnlimited,
          attributeValueIds: v.attributeValueIds || []
        }))
      };

      if (selectedProduct) {
        await adminService.updateProduct(selectedProduct.id, cleanData);
        addToast('Lưu cấu hình ERP thành công', 'success');
      } else {
        await adminService.createProduct(cleanData);
        addToast('Đã khởi tạo sản phẩm mới', 'success');
      }
      setIsModalOpen(false);
      fetchInitialData();
    } catch (error) {
      addToast('Lỗi hệ thống ERP: ' + (error.response?.data?.message || 'Bad Request'), 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const toggleAttributeValue = (variantIndex, valueId) => {
     const newVariants = [...formData.variants];
     const currentIds = newVariants[variantIndex].attributeValueIds || [];
     if (currentIds.includes(valueId)) {
        newVariants[variantIndex].attributeValueIds = currentIds.filter(id => id !== valueId);
     } else {
        newVariants[variantIndex].attributeValueIds = [...currentIds, valueId];
     }
     setFormData({...formData, variants: newVariants});
  };

  const renderOdooForm = () => (
    <div className="bg-white min-h-screen">
      {/* Odoo Header Section */}
      <div className="px-10 py-8 bg-white border-b border-slate-100 sticky top-0 z-20 shadow-sm">
         <div className="flex justify-between items-start mb-6">
            <div className="flex-1 max-w-3xl">
               <div className="flex items-center gap-4 mb-2">
                 <Star className="w-8 h-8 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer" />
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sản phẩm</span>
               </div>
               <input 
                type="text" name="name" required value={formData.name} onChange={handleInputChange}
                placeholder="VD: Máy Tạo Khói Pro 1500W"
                className="w-full text-5xl font-black text-slate-800 placeholder:text-slate-100 outline-none border-b-2 border-transparent focus:border-indigo-500 transition-all py-2"
               />
               <div className="flex gap-6 mt-6">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={cn("w-5 h-5 rounded border-2 flex items-center justify-center transition-all", formData.canBeSold ? "bg-teal-500 border-teal-500" : "bg-white border-slate-200 group-hover:border-teal-500")}>
                       {formData.canBeSold && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <input type="checkbox" name="canBeSold" checked={formData.canBeSold} onChange={handleInputChange} className="hidden" />
                    <span className="text-sm font-bold text-slate-600">Bán hàng</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={cn("w-5 h-5 rounded border-2 flex items-center justify-center transition-all", formData.canBePurchased ? "bg-teal-500 border-teal-500" : "bg-white border-slate-200 group-hover:border-teal-500")}>
                       {formData.canBePurchased && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <input type="checkbox" name="canBePurchased" checked={formData.canBePurchased} onChange={handleInputChange} className="hidden" />
                    <span className="text-sm font-bold text-slate-600">Mua hàng</span>
                  </label>
               </div>
            </div>
            {/* Product Image Box */}
            <div 
              onClick={() => document.getElementById('product-image-upload').click()}
              className="w-40 h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-300 hover:border-indigo-500 hover:text-indigo-500 transition-all cursor-pointer relative group overflow-hidden"
            >
               {formData.imageUrl ? (
                 <>
                   <img src={formData.imageUrl} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <ImageIcon className="w-8 h-8 text-white" />
                   </div>
                 </>
               ) : (
                 <>
                  <Camera className="w-10 h-10 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-center px-4">Chọn ảnh sản phẩm</span>
                 </>
               )}
               <input 
                id="product-image-upload" type="file" className="hidden" accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setFormData(p => ({...p, imageUrl: reader.result}));
                    reader.readAsDataURL(file);
                  }
                }}
               />
            </div>
         </div>

         {/* Odoo Style Tabs */}
         <div className="flex gap-1 border-b border-slate-200 mt-10">
            {['general', 'variants', 'sales', 'ecommerce'].map((tab) => (
              <button 
                key={tab} type="button" onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-8 py-3 text-sm font-bold transition-all relative top-[1px]",
                  activeTab === tab ? "bg-white border-x border-t border-slate-200 text-indigo-600" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {tab === 'general' && 'Thông tin chung'}
                {tab === 'variants' && 'Thuộc tính & Biến thể'}
                {tab === 'sales' && 'Bán hàng'}
                {tab === 'ecommerce' && 'Thương mại điện tử'}
              </button>
            ))}
         </div>
      </div>

      <form id="product-form" onSubmit={handleSave} className="p-10 pb-32">
        <AnimatePresence mode="wait">
          {activeTab === 'general' && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} key="gen" className="grid grid-cols-1 lg:grid-cols-2 gap-16">
               <div className="space-y-1">
                  <OdooField label="Loại sản phẩm">
                     <div className="flex gap-6">
                        {['GOODS', 'SERVICE', 'COMBO'].map(type => (
                          <label key={type} className="flex items-center gap-2 cursor-pointer">
                             <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all", formData.productType === type ? "border-teal-500" : "border-slate-300")}>
                                {formData.productType === type && <div className="w-2 h-2 bg-teal-500 rounded-full" />}
                             </div>
                             <input type="radio" name="productType" value={type} checked={formData.productType === type} onChange={handleInputChange} className="hidden" />
                             <span className="text-sm text-slate-600">{type === 'GOODS' ? 'Hàng hóa' : type === 'SERVICE' ? 'Dịch vụ' : 'Combo'}</span>
                          </label>
                        ))}
                     </div>
                  </OdooField>
                  <OdooField label="Track Inventory">
                     <input type="checkbox" className="w-5 h-5 rounded accent-teal-500" defaultChecked />
                  </OdooField>
                  <OdooField label="Thuế bán hàng">
                     <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600 w-fit">
                        {formData.salesTax}% <X className="w-3 h-3 cursor-pointer" />
                     </div>
                  </OdooField>
                  <OdooField label="Chi phí (Cost)">
                     <div className="flex items-center gap-2 border-b border-slate-200">
                       <input type="number" className="w-full bg-transparent outline-none text-sm font-bold text-slate-800" placeholder="0.00" />
                       <span className="text-slate-400 text-sm">₫</span>
                     </div>
                  </OdooField>
               </div>

               <div className="space-y-1">
                  <OdooField label="Danh mục">
                     <select name="categoryId" value={formData.categoryId} onChange={handleInputChange} className="w-full bg-transparent outline-none text-sm font-bold text-indigo-600 appearance-none">
                        <option value="">Chọn danh mục...</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                     </select>
                  </OdooField>
                  <OdooField label="Thương hiệu">
                     <select name="brandId" value={formData.brandId} onChange={handleInputChange} className="w-full bg-transparent outline-none text-sm font-bold text-indigo-600 appearance-none">
                        <option value="">Chọn thương hiệu...</option>
                        {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                     </select>
                  </OdooField>
                  <OdooField label="Tham chiếu (Ref)">
                     <input type="text" name="internalReference" value={formData.internalReference} onChange={handleInputChange} className="w-full bg-transparent outline-none text-sm font-bold text-slate-800" placeholder="P0001" />
                  </OdooField>
                  <OdooField label="Mã vạch (Barcode)">
                     <input type="text" name="barcode" value={formData.barcode} onChange={handleInputChange} className="w-full bg-transparent outline-none text-sm font-bold text-slate-800" placeholder="893..." />
                  </OdooField>
               </div>
            </motion.div>
          )}

          {activeTab === 'variants' && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} key="vars" className="space-y-10">
               {/* Attribute Manager */}
               <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                  <div className="flex items-center justify-between mb-8">
                     <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                        <ListFilter className="w-5 h-5 text-indigo-500" /> QUẢN LÝ THUỘC TÍNH
                     </h4>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Chọn thông số để tạo các biến thể sản phẩm</p>
                  </div>
                  
                  <div className="space-y-4">
                     {attributes.map(attr => (
                        <div key={attr.id} className="grid grid-cols-1 md:grid-cols-4 items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100">
                           <div className="col-span-1">
                              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{attr.name}</span>
                           </div>
                           <div className="col-span-3 flex flex-wrap gap-2">
                              {attr.values.map(val => (
                                 <button 
                                  key={val.id} type="button"
                                  onClick={() => toggleAttributeValue(0, val.id)}
                                  className={cn(
                                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                    formData.variants[0].attributeValueIds?.includes(val.id) 
                                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" 
                                      : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                                  )}
                                 >
                                    {val.value}
                                 </button>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Variant List */}
               <div className="space-y-6">
                  <div className="flex justify-between items-center px-4">
                     <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest">Danh sách SKU & Giá ({formData.variants.length})</h4>
                     <button type="button" onClick={() => setFormData(p => ({...p, variants: [...p.variants, {sku: '', price: 0, stock: 0, isStockUnlimited: false, attributeValueIds: []}]}))} className="flex items-center gap-2 px-6 py-2 bg-teal-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest"><Plus className="w-4 h-4" /> Thêm thủ công</button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                     {formData.variants.map((v, i) => (
                       <div key={i} className="p-8 border border-slate-100 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-4 gap-8 items-center relative group hover:bg-slate-50/50 transition-colors">
                          <div className="col-span-1">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mã SKU</label>
                             <input type="text" value={v.sku} onChange={e => handleVariantChange(i, 'sku', e.target.value)} className="w-full bg-transparent border-b border-slate-200 py-1 outline-none font-bold text-slate-700 focus:border-indigo-500" placeholder="SKU-..." />
                          </div>
                          <div className="col-span-1">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Giá bán</label>
                             <input type="number" value={v.price} onChange={e => handleVariantChange(i, 'price', e.target.value)} className="w-full bg-transparent border-b border-slate-200 py-1 outline-none font-bold text-teal-600" />
                          </div>
                          <div className="col-span-1">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tồn kho</label>
                             <div className="flex items-center gap-2">
                               <input type="number" disabled={v.isStockUnlimited} value={v.stock} onChange={e => handleVariantChange(i, 'stock', e.target.value)} className="w-full bg-transparent border-b border-slate-200 py-1 outline-none font-bold text-slate-700 disabled:opacity-20" />
                               <Infinity className={cn("w-5 h-5 cursor-pointer transition-all", v.isStockUnlimited ? "text-indigo-500" : "text-slate-200")} onClick={() => handleVariantChange(i, 'isStockUnlimited', !v.isStockUnlimited)} />
                             </div>
                          </div>
                          <div className="flex flex-col gap-2">
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Thuộc tính đã chọn:</span>
                             <div className="flex flex-wrap gap-1">
                                {v.attributeValueIds?.map(vid => {
                                   const val = attributes.flatMap(a => a.values).find(v => v.id === vid);
                                   return <span key={vid} className="px-2 py-0.5 bg-indigo-50 text-indigo-500 rounded-md text-[8px] font-black uppercase">{val?.value}</span>
                                })}
                                {(!v.attributeValueIds || v.attributeValueIds.length === 0) && <span className="text-[8px] font-bold text-slate-300 italic">Chưa chọn thông số</span>}
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'sales' && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key="sales" className="grid grid-cols-1 lg:grid-cols-2 gap-20">
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 pb-2">BÁN THÊM & BÁN CHÉO</h4>
                  <OdooField label="Sản phẩm tùy chọn" tooltip="Đề xuất khi 'Thêm vào giỏ hàng'">
                     <input type="text" className="w-full outline-none text-xs font-medium text-slate-400" placeholder="Tìm sản phẩm..." />
                  </OdooField>
                  <OdooField label="Sản phẩm phụ kiện">
                     <input type="text" className="w-full outline-none text-xs font-medium text-slate-400" placeholder="Phụ kiện đề xuất..." />
                  </OdooField>
                  <OdooField label="Sản phẩm thay thế">
                     <input type="text" className="w-full outline-none text-xs font-medium text-slate-400" placeholder="Hiển thị ở cuối trang..." />
                  </OdooField>
               </div>
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 pb-2">SHORT DESCRIPTION</h4>
                  <textarea name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:border-indigo-500 transition-all" placeholder="Ghi chú SEO và mô tả ngắn..." />
               </div>
            </motion.div>
          )}

          {activeTab === 'ecommerce' && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key="eco" className="grid grid-cols-1 lg:grid-cols-2 gap-20">
               <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 pb-2">CỬA HÀNG</h4>
                  <OdooField label="Đã đăng (Published)">
                     <button type="button" onClick={() => setFormData(p => ({...p, active: !p.active}))} className={cn("w-12 h-6 rounded-full transition-all relative", formData.active ? "bg-teal-500" : "bg-slate-200")}>
                        <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full transition-all", formData.active ? "right-1" : "left-1")} />
                     </button>
                  </OdooField>
                  <OdooField label="Ruy-băng">
                     <input type="text" name="ribbon" value={formData.ribbon} onChange={handleInputChange} className="w-full outline-none text-sm font-bold text-slate-800" placeholder="NEW, HOT..." />
                  </OdooField>
               </div>
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 pb-2">TRUYỀN THÔNG</h4>
                  <div className="p-10 border-2 border-dashed border-slate-100 rounded-[2.5rem] text-center flex flex-col items-center gap-4 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all cursor-pointer">
                     <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center text-indigo-500"><PlusCircle className="w-8 h-8" /></div>
                     <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Thêm phương tiện</p>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Odoo Internal Notes Section */}
        <div className="mt-20 border-t border-slate-100 pt-10">
           <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">GHI CHÚ NỘI BỘ</h4>
           <textarea 
            name="internalNote" value={formData.internalNote} onChange={handleInputChange}
            className="w-full h-24 p-6 bg-slate-50/50 rounded-2xl border border-slate-100 outline-none text-sm text-slate-500 font-medium focus:border-indigo-200 transition-all"
            placeholder="Ghi chú này chỉ dành cho mục đích nội bộ."
           />
        </div>
      </form>
    </div>
  );

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[index][field] = value;
    setFormData(prev => ({ ...prev, variants: newVariants }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Xóa sản phẩm này khỏi hệ thống ERP?')) return;
    try {
      await adminService.deleteProduct(id);
      addToast('Đã xóa dữ liệu sản phẩm', 'success');
      fetchInitialData();
    } catch (error) {
      addToast('Lỗi khi xóa', 'error');
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <ModalLayout isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Hệ Thống Quản Trị ERP">
        {renderOdooForm()}
      </ModalLayout>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            Quản Trị <span className="text-indigo-500">Doanh Nghiệp</span>
          </h1>
          <p className="text-slate-500 font-medium">Hệ thống ERP đồng bộ dữ liệu sản phẩm, kho vận và thương mại.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex bg-slate-100 p-1.5 rounded-2xl">
              <button onClick={() => setViewMode('grid')} className={cn("p-3 rounded-xl transition-all", viewMode === 'grid' ? "bg-white shadow-sm text-indigo-500" : "text-slate-400")}><Grid className="w-5 h-5" /></button>
              <button onClick={() => setViewMode('list')} className={cn("p-3 rounded-xl transition-all", viewMode === 'list' ? "bg-white shadow-sm text-indigo-500" : "text-slate-400")}><ListIcon className="w-5 h-5" /></button>
           </div>
           <button onClick={handleOpenAdd} className="px-10 py-5 bg-indigo-500 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all flex items-center gap-3">
            <PlusCircle className="w-6 h-6" /> Tạo Sản Phẩm
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="relative group">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-indigo-500 transition-all" />
          <input type="text" placeholder="Tìm theo tên sản phẩm, Barcode hoặc mã ERP..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 pl-18 pr-8 py-6 rounded-[2.5rem] text-sm font-bold shadow-sm focus:border-indigo-500 transition-all" />
      </div>

      {/* Product List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3].map(i => <div key={i} className="h-96 rounded-[3rem] bg-slate-100 animate-pulse" />)}
        </div>
      ) : (
        <div className={cn(
          "grid gap-8",
          viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}>
          {products.map((p, idx) => (
            <motion.div 
              key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
              className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden group hover:shadow-2xl transition-all"
            >
              <div className="relative h-64 bg-slate-50">
                <img src={p.thumbnailUrl} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all">
                   <button onClick={() => handleOpenEdit(p)} className="p-3 bg-white text-indigo-500 rounded-xl shadow-lg hover:bg-indigo-500 hover:text-white transition-all"><Edit3 className="w-5 h-5" /></button>
                   <button onClick={() => handleDelete(p.id)} className="p-3 bg-white text-red-500 rounded-xl shadow-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-5 h-5" /></button>
                </div>
                {p.ribbon && (
                  <div className="absolute top-6 left-6 px-4 py-2 bg-indigo-600 text-white text-[10px] font-black rounded-xl shadow-lg uppercase">{p.ribbon}</div>
                )}
              </div>
              <div className="p-10">
                <div className="flex items-center gap-2 mb-2">
                   <Star className="w-4 h-4 text-slate-300" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.brandName}</span>
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-6">{p.name}</h3>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mã ERP</span>
                      <span className="text-sm font-bold text-slate-600">{p.internalReference || '—'}</span>
                   </div>
                   <div className="text-right">
                      <span className="text-xl font-black text-indigo-600">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.minPrice)}</span>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
