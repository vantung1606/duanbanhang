import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, ChevronRight } from 'lucide-react';

export default function FilterSidebar({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  
  const brands = ['Apple', 'Samsung', 'Sony', 'Dell', 'Asus', 'HP'];
  const categories = ['Laptop', 'Mobile', 'Accessories', 'Wearables'];
  
  return (
    <aside className="w-full lg:w-72 flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Filter className="w-5 h-5 text-accent" /> Filters
        </h2>
        <button className="text-[10px] font-black uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">Reset All</button>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-accent/80">Categories</h3>
        <div className="flex flex-col gap-2">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded-md border-white/20 bg-white/5 checked:bg-accent" />
              <span className="text-sm text-white/60 group-hover:text-white transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-accent/80">Brands</h3>
        <div className="grid grid-cols-2 gap-2">
          {brands.map(brand => (
            <button key={brand} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/60 hover:border-[#BEF264] hover:text-accent transition-all">
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-widest text-accent/80">Price Range</h3>
          <span className="text-xs font-mono text-white/50">${priceRange[0]} - ${priceRange[1]}</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="5000" 
          step="100"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full accent-accent" 
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs flex flex-col gap-1">
            <span className="opacity-30">Min</span>
            <span className="font-bold">$ 0</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs flex flex-col gap-1">
            <span className="opacity-30">Max</span>
            <span className="font-bold">$ {priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Smart Specs */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-accent/80">Advanced Specs</h3>
        {['RAM', 'Storage', 'CPU'].map(spec => (
          <div key={spec} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
            <span className="text-sm font-bold text-white/80">{spec}</span>
            <ChevronRight className="w-4 h-4 opacity-30" />
          </div>
        ))}
      </div>
    </aside>
  );
}
