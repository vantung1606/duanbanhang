import { useState, useEffect } from 'react'; // Product Management Page
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { adminService } from '../../services/api/adminService';
import { useToast } from '../../components/common/Toast';

// Icon Placeholders
const Package = () => <span>[PKG]</span>;
const Plus = () => <span>[+]</span>;
const Search = () => <span>[S]</span>;
const Filter = () => <span>[F]</span>;
const Edit3 = () => <span>[E]</span>;
const Trash2 = () => <span>[T]</span>;
const Grid = () => <span>[G]</span>;
const ListIcon = () => <span>[L]</span>;
const X = () => <span>[X]</span>;
const FileText = () => <span>[DOC]</span>;
const Tag = () => <span>[TAG]</span>;
const Shield = () => <span>[SH]</span>;
const DollarSign = () => <span>[$]</span>;
const Layers = () => <span>[LY]</span>;
const ChevronDown = () => <span>[v]</span>;
const ImageIcon = () => <span>[IMG]</span>;
const Zap = () => <span>[Z]</span>;
const Eye = () => <span>[EYE]</span>;
const EyeOff = () => <span>[HID]</span>;
const Infinity = () => <span>[INF]</span>;
const PlusCircle = () => <span>[+O]</span>;
const Percent = () => <span>[%]</span>;
const CheckCircle2 = () => <span>[OK]</span>;
const Settings2 = () => <span>[SET]</span>;
const Box = () => <span>[BOX]</span>;
const Truck = () => <span>[TR]</span>;
const Globe = () => <span>[GL]</span>;
const Camera = () => <span>[CAM]</span>;
const Info = () => <span>[I]</span>;
const ListFilter = () => <span>[LF]</span>;
const ShoppingCart = () => <span>[CART]</span>;

// Reusable Modal Layout
const ModalLayout = ({ isOpen, onClose, title, children }) => (
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
             <button onClick={onClose} className="px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-slate-100 transition-all">Hủy</button>
             <button id="main-submit-btn" form="product-form" className="px-10 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-indigo-600 transition-all">Lưu sản phẩm</button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const FormField = ({ label, children, required }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
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
  const [activeTab, setActiveTab] = useState('basic'); // 'basic', 'variants'
  const [formLoading, setFormLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '', 
    categoryId: '',
    brandId: '',
    imageUrl: '',
    ribbon: '',
    active: true,
    shortDescription: '',
    internalNote: '',
    specifications: [], 
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
      ...(name === 'name' && !selectedProduct ? { 
        slug: value.toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd')
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '') 
      } : {})
    }));
  };

  const handleOpenAdd = () => {
    setSelectedProduct(null);
    setFormData({
      name: '', slug: '', description: '', categoryId: '', brandId: '', imageUrl: '', ribbon: '', active: true,
      shortDescription: '', internalNote: '',
      specifications: [],
      variants: [{ sku: '', price: 0, originalPrice: '', stock: 0, isStockUnlimited: false, attributeValueIds: [] }]
    });
    setActiveTab('basic');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      shortDescription: product.shortDescription || '',
      internalNote: product.internalNote || '',
      categoryId: categories.find(c => c.name === product.categoryName)?.id || '',
      brandId: brands.find(b => b.name === product.brandName)?.id || '',
      imageUrl: product.thumbnailUrl || '',
      ribbon: product.ribbon || '',
      active: product.active,
      specifications: product.specifications ? JSON.parse(product.specifications) : [],
      variants: product.variants ? product.variants.map(v => ({
         sku: v.sku, price: v.price, originalPrice: v.originalPrice || '', stock: v.stockQuantity, isStockUnlimited: v.isStockUnlimited || false, attributeValueIds: []
      })) : [{ sku: '', price: product.minPrice, originalPrice: '', stock: 100, isStockUnlimited: false, attributeValueIds: [] }]
    });
    setActiveTab('basic');
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    const catId = Number(formData.categoryId);
    const brId = Number(formData.brandId);

    if (!formData.name || formData.name.trim() === '') {
      addToast('Vui lòng nhập tên sản phẩm', 'error');
      setFormLoading(false);
      return;
    }
    if (!formData.categoryId || isNaN(catId) || catId <= 0) {
      addToast('Vui lòng chọn danh mục sản phẩm hợp lệ', 'error');
      setFormLoading(false);
      return;
    }
    if (!formData.brandId || isNaN(brId) || brId <= 0) {
      addToast('Vui lòng chọn thương hiệu sản phẩm hợp lệ', 'error');
      setFormLoading(false);
      return;
    }

    try {
      const cleanData = {
        name: formData.name.trim(),
        slug: formData.slug || formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        description: formData.description,
        shortDescription: formData.shortDescription,
        internalNote: formData.internalNote,
        categoryId: catId,
        brandId: brId,
        imageUrl: (formData.imageUrl && formData.imageUrl.trim() !== '') ? formData.imageUrl : null,
        ribbon: formData.ribbon,
        active: !!formData.active,
        // ERP Defaults
        productType: 'GOODS',
        canBeSold: true,
        canBePurchased: true,
        salesTax: 10,
        purchaseTax: 10,
        internalReference: formData.name.substring(0, 3).toUpperCase() + Date.now().toString().slice(-4),
        variants: formData.variants.length > 0 ? formData.variants.map(v => ({
          sku: v.sku || '',
          price: (v.price === '' || v.price === null) ? 0 : Number(v.price),
          originalPrice: (v.originalPrice === '' || v.originalPrice === null) ? null : Number(v.originalPrice),
          stock: (v.stock === '' || v.stock === null) ? 0 : Number(v.stock),
          isStockUnlimited: !!v.isStockUnlimited,
          attributeValueIds: (v.attributeValueIds || []).filter(id => id != null)
        })) : [{ sku: '', price: 0, stock: 0, isStockUnlimited: false, attributeValueIds: [] }],
        specifications: JSON.stringify(formData.specifications || [])
      };

      console.log('Final data to send:', cleanData);
      if (selectedProduct) {
        console.log('Updating product with ID:', selectedProduct.id);
        await adminService.updateProduct(selectedProduct.id, cleanData);
        addToast('Cập nhật sản phẩm thành công', 'success');
      } else {
        await adminService.createProduct(cleanData);
        addToast('Thêm sản phẩm mới thành công', 'success');
      }
      setIsModalOpen(false);
      fetchInitialData();
    } catch (error) {
      addToast('DEBUG-NEW: Lỗi: ' + (error.response?.data?.message || 'Không thể lưu'), 'error');
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

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[index][field] = value;
    setFormData(prev => ({ ...prev, variants: newVariants }));
  };

  const renderProductForm = () => (
    <div className="bg-white min-h-screen">
      {/* Modern Header */}
      <div className="px-10 py-10 bg-slate-50 border-b border-slate-100 sticky top-0 z-20 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="flex-1 w-full">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{selectedProduct ? 'Cập nhật thông tin' : 'Tạo mới sản phẩm'}</h2>
            <input 
              type="text" name="name" required value={formData.name} onChange={handleInputChange}
              placeholder="Tên sản phẩm (VD: Máy Tạo Khói Pro 1500W)"
              className="w-full text-4xl font-black text-slate-800 placeholder:text-slate-200 outline-none bg-transparent"
            />
         </div>
         
         <div className="flex gap-4 mb-1">
            <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
               {['basic', 'variants'].map((tab) => (
                 <button 
                   key={tab} type="button" onClick={() => setActiveTab(tab)}
                   className={cn(
                     "px-8 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap",
                     activeTab === tab ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20" : "text-slate-400 hover:text-slate-600"
                   )}
                 >
                   {tab === 'basic' ? '🛒 Thông tin chính' : '💎 Phân loại & Giá'}
                 </button>
               ))}
            </div>
         </div>
      </div>

      <form id="product-form" onSubmit={handleSave} className="p-10 pb-32">
        <AnimatePresence mode="wait">
          {activeTab === 'basic' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="basic" className="space-y-16">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-7 space-y-10">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField label="Danh mục sản phẩm" required>
                           <select name="categoryId" value={formData.categoryId} onChange={handleInputChange} className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all appearance-none">
                              <option value="">Chọn danh mục...</option>
                              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                           </select>
                        </FormField>
                        <FormField label="Thương hiệu" required>
                           <select name="brandId" value={formData.brandId} onChange={handleInputChange} className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all appearance-none">
                              <option value="">Chọn thương hiệu...</option>
                              {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                           </select>
                        </FormField>
                     </div>

                     <FormField label="Mô tả ngắn">
                        <textarea name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} className="w-full h-24 p-5 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:border-indigo-500 transition-all resize-none" placeholder="Tóm tắt ngắn gọn về sản phẩm..." />
                     </FormField>

                     <FormField label="Mô tả chi tiết sản phẩm">
                        <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full h-64 p-5 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:border-indigo-500 transition-all" placeholder="Viết nội dung giới thiệu sản phẩm..." />
                     </FormField>
                  </div>

                  <div className="lg:col-span-5 space-y-10">
                     <FormField label="Hình ảnh sản phẩm" required>
                        <div 
                           onClick={() => document.getElementById('product-image-upload').click()}
                           className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-slate-300 hover:border-indigo-500 hover:bg-indigo-50/20 transition-all cursor-pointer relative group overflow-hidden shadow-inner"
                        >
                           {formData.imageUrl ? (
                              <img src={formData.imageUrl} className="w-full h-full object-contain p-12 mix-blend-multiply" alt="Preview" />
                           ) : (
                              <>
                                 <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Camera className="w-10 h-10 text-indigo-500" />
                                 </div>
                                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Tải lên hình ảnh chính</span>
                              </>
                           )}
                           <input id="product-image-upload" type="file" className="hidden" accept="image/*" onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                 const reader = new FileReader();
                                 reader.onloadend = () => setFormData(p => ({...p, imageUrl: reader.result}));
                                 reader.readAsDataURL(file);
                              }
                           }} />
                        </div>
                     </FormField>

                     <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-6 shadow-2xl shadow-slate-900/20">
                        <div className="flex items-center justify-between">
                           <FormField label="Trạng thái hiển thị">
                              <button type="button" onClick={() => setFormData(p => ({...p, active: !p.active}))} className="flex items-center gap-4 group">
                                 <div className={cn("w-14 h-7 rounded-full transition-all relative", formData.active ? "bg-teal-400" : "bg-slate-700")}>
                                    <div className={cn("absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all", formData.active ? "right-1" : "left-1")} />
                                 </div>
                                 <span className="text-xs font-black uppercase tracking-widest">{formData.active ? 'Công khai' : 'Tạm ẩn'}</span>
                              </button>
                           </FormField>
                        </div>
                        <FormField label="Nhãn nổi bật (Ribbon)">
                           <input type="text" name="ribbon" value={formData.ribbon} onChange={handleInputChange} className="w-full bg-white/10 border border-white/10 p-4 rounded-2xl text-sm font-bold text-white outline-none focus:bg-white/20 transition-all" placeholder="VD: NEW, HOT, -20%..." />
                        </FormField>
                     </div>
                  </div>
               </div>

               <div className="pt-16 border-t border-slate-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                     <div>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight">Thông số kỹ thuật</h3>
                        <p className="text-sm text-slate-500 font-medium">Bảng thông số cố định hiển thị ở trang chi tiết sản phẩm.</p>
                     </div>
                     <button 
                       type="button" 
                       onClick={() => setFormData(p => ({...p, specifications: [...p.specifications, {label: '', value: ''}]}))}
                       className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
                     >
                       <Plus className="w-4 h-4" /> Thêm thông số
                     </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {formData.specifications.map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-slate-50 p-5 rounded-[1.5rem] border border-slate-100 group hover:border-indigo-200 transition-all">
                           <div className="flex-1 space-y-1">
                              <input 
                                 type="text" value={spec.label} 
                                 onChange={(e) => {
                                    const newSpecs = [...formData.specifications];
                                    newSpecs[idx].label = e.target.value;
                                    setFormData({...formData, specifications: newSpecs});
                                 }}
                                 className="w-full bg-transparent outline-none text-[10px] font-black text-indigo-600 uppercase tracking-[0.1em]" 
                                 placeholder="Tên (Công suất)" 
                              />
                              <input 
                                 type="text" value={spec.value} 
                                 onChange={(e) => {
                                    const newSpecs = [...formData.specifications];
                                    newSpecs[idx].value = e.target.value;
                                    setFormData({...formData, specifications: newSpecs});
                                 }}
                                 className="w-full bg-transparent outline-none text-sm font-bold text-slate-700" 
                                 placeholder="Giá trị (1500W)" 
                              />
                           </div>
                           <button type="button" onClick={() => setFormData(p => ({...p, specifications: p.specifications.filter((_, i) => i !== idx)}))} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'variants' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="vars" className="space-y-16">
               <div className="bg-indigo-50/30 p-10 rounded-[3rem] border border-indigo-100/50">
                  <div className="flex items-center gap-3 mb-8">
                     <Layers className="w-6 h-6 text-indigo-500" />
                     <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">Thiết lập thuộc tính (Size, Màu sắc...)</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {attributes.map(attr => (
                        <div key={attr.id} className="bg-white p-6 rounded-[2rem] border border-indigo-100/30">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">{attr.name}</span>
                           <div className="flex flex-wrap gap-2">
                              {attr.values.map(val => (
                                 <button 
                                  key={val.id} type="button"
                                  onClick={() => toggleAttributeValue(0, val.id)}
                                  className={cn(
                                    "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                    formData.variants[0].attributeValueIds?.includes(val.id) 
                                      ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/20" 
                                      : "bg-slate-50 text-slate-400 hover:bg-slate-100"
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

               <div className="space-y-8">
                  <div className="flex justify-between items-center">
                     <h4 className="text-xl font-black text-slate-800 tracking-tight">Danh sách các biến thể</h4>
                     <button type="button" onClick={() => setFormData(p => ({...p, variants: [...p.variants, {sku: '', price: 0, stock: 0, isStockUnlimited: false, attributeValueIds: []}]}))} className="px-6 py-3 bg-teal-50 text-teal-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-500 hover:text-white transition-all">+ Thêm thủ công</button>
                  </div>
                  
                  <div className="space-y-4">
                     {formData.variants.map((v, i) => (
                        <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-4 gap-10 items-center hover:border-indigo-200 transition-all shadow-sm">
                           <FormField label="Mã SKU">
                              <input type="text" value={v.sku} onChange={e => handleVariantChange(i, 'sku', e.target.value)} className="w-full bg-transparent border-b-2 border-slate-100 py-3 outline-none text-sm font-bold text-slate-800 focus:border-indigo-500 transition-all" placeholder="SKU-..." />
                           </FormField>
                           <FormField label="Giá bán (₫)">
                              <input type="number" value={v.price} onChange={e => handleVariantChange(i, 'price', e.target.value)} className="w-full bg-transparent border-b-2 border-slate-100 py-3 outline-none text-sm font-black text-teal-600 focus:border-indigo-500 transition-all" />
                           </FormField>
                           <FormField label="Số lượng tồn kho">
                              <div className="flex items-center gap-4">
                                <input type="number" disabled={v.isStockUnlimited} value={v.stock} onChange={e => handleVariantChange(i, 'stock', e.target.value)} className="flex-1 bg-transparent border-b-2 border-slate-100 py-3 outline-none text-sm font-bold text-slate-800 disabled:opacity-20 focus:border-indigo-500 transition-all" />
                                <button type="button" onClick={() => handleVariantChange(i, 'isStockUnlimited', !v.isStockUnlimited)} className={cn("p-2 rounded-lg transition-all", v.isStockUnlimited ? "bg-indigo-50 text-indigo-600" : "text-slate-200")}>
                                   <Infinity className="w-7 h-7" />
                                </button>
                              </div>
                           </FormField>
                           <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-1.5">
                                 {v.attributeValueIds?.map(vid => {
                                    const val = attributes.flatMap(a => a.values).find(v => v.id === vid);
                                    return <span key={vid} className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[8px] font-black uppercase tracking-widest">{val?.value}</span>
                                 })}
                              </div>
                              {formData.variants.length > 1 && (
                                 <button type="button" onClick={() => setFormData(p => ({...p, variants: p.variants.filter((_, idx) => idx !== i)}))} className="p-3 text-slate-300 hover:text-red-500 ml-4 transition-all">
                                    <Trash2 className="w-5 h-5" />
                                 </button>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );

  const handleDelete = async (id) => {
    if (!window.confirm('Xác nhận xóa sản phẩm này?')) return;
    try {
      await adminService.deleteProduct(id);
      addToast('Đã xóa sản phẩm thành công', 'success');
      fetchInitialData();
    } catch (error) {
      addToast('Lỗi khi xóa sản phẩm', 'error');
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <ModalLayout isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {renderProductForm()}
      </ModalLayout>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            Kho <span className="text-indigo-500">Sản Phẩm</span>
          </h1>
          <p className="text-slate-500 font-medium">Quản lý danh sách, giá bán và tồn kho showroom DuongDIY.</p>
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
          <input type="text" placeholder="Tìm theo tên sản phẩm, mã danh mục hoặc giá..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 pl-18 pr-8 py-6 rounded-[2.5rem] text-sm font-bold shadow-sm focus:border-indigo-500 transition-all" />
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
                <img src={p.thumbnailUrl} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={p.name} />
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
                   <div className="w-4 h-4 bg-slate-100 rounded-full" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.brandName}</span>
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-6">{p.name}</h3>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Danh mục</span>
                      <span className="text-sm font-bold text-slate-600">{p.categoryName || '—'}</span>
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
