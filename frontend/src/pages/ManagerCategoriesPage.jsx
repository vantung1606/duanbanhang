import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Folder, 
  Layers, 
  ChevronRight, 
  MoreVertical,
  ArrowRight,
  Activity,
  Smartphone,
  Laptop,
  Watch
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function ManagerCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Mock categories
    const mockCategories = [
      { id: 1, name: 'Smartphones', slug: 'smartphones', count: 124, icon: Smartphone, color: 'text-emerald-500' },
      { id: 2, name: 'Laptops', slug: 'laptops', count: 85, icon: Laptop, color: 'text-indigo-500' },
      { id: 3, name: 'Smart Watches', slug: 'watches', count: 42, icon: Watch, color: 'text-orange-500' },
      { id: 4, name: 'Accessories', slug: 'accessories', count: 210, icon: Layers, color: 'text-blue-500' },
    ];
    setCategories(mockCategories);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-10 pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            Store <span className="text-indigo-500">Taxonomy</span>
          </h1>
          <p className="text-slate-500 font-medium">Manage product categorization and search navigation.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-8 py-4 bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5" /> New Category
        </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Categories', val: '12', icon: Folder },
          { label: 'Sub-Categories', val: '48', icon: Layers },
          { label: 'Uncategorized', val: '0', icon: Activity },
        ].map((stat, i) => (
          <div key={i} className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-6 rounded-[2rem] flex items-center gap-6">
             <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <stat.icon className="w-6 h-6" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                <p className="text-2xl font-black text-slate-800 dark:text-white">{stat.val}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="relative group max-w-2xl">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
        <input 
          type="text" 
          placeholder="Filter categories by name or slug..." 
          className="w-full bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 outline-none px-16 py-5 rounded-[2rem] text-sm font-bold shadow-sm focus:border-indigo-500/50 transition-all"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-2 rounded-[2.5rem] flex items-center justify-between hover:bg-white/10 transition-all shadow-sm"
            >
              <div className="flex items-center gap-6 p-4 flex-1">
                 <div className={cn("w-16 h-16 rounded-[1.5rem] bg-white dark:bg-black/20 flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform", cat.color)}>
                    <cat.icon className="w-8 h-8" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-slate-800 dark:text-white">{cat.name}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">/{cat.slug}</p>
                 </div>
              </div>
              
              <div className="flex items-center gap-4 px-8">
                 <div className="text-right">
                    <p className="text-sm font-black text-slate-800 dark:text-white">{cat.count}</p>
                    <p className="text-[9px] font-black uppercase text-slate-400">Products</p>
                 </div>
                 <div className="h-10 w-[1px] bg-white/10" />
                 <div className="flex gap-2">
                    <button className="p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-white/10 hover:bg-indigo-500 hover:text-white transition-all shadow-sm">
                       <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-white/10 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                       <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Advanced Taxonomy Map Visual */}
      <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-10 rounded-[3rem] shadow-sm">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black uppercase tracking-tight">Taxonomy Mapping</h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visualization</span>
         </div>
         <div className="space-y-6">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-4">
               <div className="px-6 py-4 rounded-2xl bg-indigo-500 text-white font-black uppercase text-xs">Electronics</div>
               <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
               <div className="px-6 py-4 rounded-2xl bg-white/10 border border-white/10 font-black uppercase text-xs">Mobile Computing</div>
               <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
               <div className="px-6 py-4 rounded-2xl bg-white/10 border border-white/10 font-black uppercase text-xs">Smartphones</div>
               <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
               <div className="px-6 py-4 rounded-2xl bg-white/10 border border-white/20 font-black uppercase text-xs text-indigo-500">Flagship Series</div>
            </div>
            <p className="text-xs font-bold text-slate-500">This breadcrumb shows how products are nested within the global store hierarchy.</p>
         </div>
      </div>
    </div>
  );
}
