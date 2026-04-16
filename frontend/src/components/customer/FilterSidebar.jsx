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
    <aside className="w-full lg:w-80 flex flex-col gap-12 sticky top-32 h-fit">
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
          <Filter className="w-5 h-5 text-accent" /> Filters
        </h2>
        <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Reset All</button>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-accent/80">Categories</h3>
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
                selectedCats.includes(cat) ? "text-white" : "text-white/40 group-hover:text-white/70"
              )}>
                {cat}
              </span>
              <div className={cn(
                "w-5 h-5 rounded-lg border flex items-center justify-center transition-all",
                selectedCats.includes(cat) 
                  ? "bg-white border-white text-black" 
                  : "bg-white/5 border-white/10 group-hover:border-white/30"
              )}>
                {selectedCats.includes(cat) && <Check className="w-3 h-3 stroke-[4px]" />}
              </div>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-accent/80">Brands</h3>
        <div className="grid grid-cols-2 gap-3">
          {brands.map(brand => (
            <button 
              key={brand} 
              className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white/50 hover:bg-white hover:text-black hover:border-white transition-all active:scale-95"
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-8 p-6 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-accent/80">Price Range</h3>
          <span className="text-xs font-black text-white">$ {priceRange[1]}</span>
        </div>
        <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="absolute left-0 top-0 h-full bg-accent"
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
            <span className="text-[8px] font-black uppercase text-white/30">Min</span>
            <span className="text-sm font-black">$ 0</span>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-[8px] font-black uppercase text-white/30">Max</span>
            <span className="text-sm font-black">$ {priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Smart Specs */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-accent/80">Tech Specs</h3>
        {['Memory', 'Storage', 'Battery'].map(spec => (
          <motion.div 
            key={spec} 
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            className="flex items-center justify-between p-5 rounded-[1.5rem] bg-white/5 border border-white/10 cursor-pointer transition-colors group"
          >
            <span className="text-sm font-bold text-white/60 group-hover:text-white">{spec}</span>
            <ChevronRight className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-all" />
          </motion.div>
        ))}
      </div>
    </aside>
  );
}
