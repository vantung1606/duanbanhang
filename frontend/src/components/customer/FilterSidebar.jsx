import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, ChevronRight, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function FilterSidebar({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCats, setSelectedCats] = useState(['Laptop']);
  
  const brands = ['Apple', 'Samsung', 'Sony', 'Dell', 'Asus', 'HP'];
  const categories = ['Laptop', 'Mobile', 'Accessories', 'Wearables'];

  const toggleCat = (cat) => {
    setSelectedCats(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };
  
  return (
    <aside className="w-full lg:w-80 flex flex-col gap-12 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar pb-10">
      <div className="flex items-center justify-between pb-6 border-b border-slate-200/50">
        <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3 text-slate-800">
          <Filter className="w-5 h-5 text-indigo-600" /> Bộ lọc
        </h2>
        <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Đặt lại</button>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600/80">Danh mục</h3>
        <div className="flex flex-col gap-3">
          {categories.map(cat => (
            <motion.label 
              key={cat} 
              whileHover={{ x: 5 }}
              className="flex items-center justify-between cursor-pointer group"
              onClick={() => toggleCat(cat)}
            >
              <span className={cn(
                "text-sm font-bold transition-colors",
                selectedCats.includes(cat) ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"
              )}>
                {cat}
              </span>
              <div className={cn(
                "w-5 h-5 rounded-lg border flex items-center justify-center transition-all",
                selectedCats.includes(cat) 
                  ? "bg-slate-900 border-slate-900 text-white" 
                  : "bg-white/40 border-slate-200/50 group-hover:border-slate-400"
              )}>
                {selectedCats.includes(cat) && <Check className="w-3 h-3 stroke-[4px]" />}
              </div>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600/80">Thương hiệu</h3>
        <div className="grid grid-cols-2 gap-3">
          {brands.map(brand => (
            <button 
              key={brand} 
              className="px-4 py-3 rounded-2xl bg-white/40 border border-slate-200/50 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95"
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-8 p-6 rounded-[2.5rem] bg-white/40 border border-slate-200/50 backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-600/80">Khoảng giá</h3>
          <span className="text-xs font-black text-slate-800">$ {priceRange[1]}</span>
        </div>
        <div className="relative h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            className="absolute left-0 top-0 h-full bg-indigo-600"
            animate={{ width: `${(priceRange[1]/5000) * 100}%` }}
          />
          <input 
            type="range" 
            min="0" 
            max="5000" 
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-black uppercase text-slate-400">Từ</span>
            <span className="text-sm font-black text-slate-800">$ 0</span>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-[8px] font-black uppercase text-slate-400">Đến</span>
            <span className="text-sm font-black text-slate-800">$ {priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Smart Specs */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600/80">Thông số kỹ thuật</h3>
        {['Memory', 'Storage', 'Battery'].map(spec => (
          <motion.div 
            key={spec} 
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
            className="flex items-center justify-between p-5 rounded-[1.5rem] bg-white/40 border border-slate-200/50 cursor-pointer transition-colors group"
          >
            <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900">{spec}</span>
            <ChevronRight className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-all text-slate-800" />
          </motion.div>
        ))}
      </div>
    </aside>
  );
}
