import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  AlertTriangle, 
  ChevronRight,
  Zap,
  Tag,
  Box,
  LayoutGrid,
  List as ListIcon
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function ManagerProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('GRID'); // 'GRID' or 'LIST'

  useEffect(() => {
    // Mock product data for Manager Portal
    const mockProducts = [
      { id: 1, name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max', category: 'Smartphones', price: 1399, stock: 12, sales: 450, status: 'IN_STOCK', thumb: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=200' },
      { id: 2, name: 'MacBook Pro M3 Max', slug: 'macbook-pro-m3', category: 'Laptops', price: 3499, stock: 5, sales: 120, status: 'LOW_STOCK', thumb: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=200' },
      { id: 3, name: 'AirPods Pro Gen 2', slug: 'airpods-pro-2', category: 'Accessories', price: 249, stock: 85, sales: 2100, status: 'IN_STOCK', thumb: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=200' },
      { id: 4, name: 'Apple Watch Ultra 2', slug: 'apple-watch-ultra-2', category: 'Wearables', price: 799, stock: 0, sales: 340, status: 'OUT_OF_STOCK', thumb: 'https://images.unsplash.com/photo-1434494878567-3a44672e8969?auto=format&fit=crop&q=80&w=200' },
    ];
    setProducts(mockProducts);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-10 pb-20">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            Product <span className="text-indigo-500">Inventory</span>
          </h1>
          <p className="text-slate-500 font-medium">Manage your catalog, stock levels, and digital assets.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex p-1 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 no-print">
              <button onClick={() => setViewMode('GRID')} className={cn("p-3 rounded-xl transition-all", viewMode === 'GRID' ? "bg-indigo-500 text-white shadow-lg" : "text-slate-400 hover:text-slate-800 dark:hover:text-white")}>
                 <LayoutGrid className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('LIST')} className={cn("p-3 rounded-xl transition-all", viewMode === 'LIST' ? "bg-indigo-500 text-white shadow-lg" : "text-slate-400 hover:text-slate-800 dark:hover:text-white")}>
                 <ListIcon className="w-5 h-5" />
              </button>
           </div>
           <button className="flex items-center gap-2 px-8 py-4 bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all">
             <Plus className="w-5 h-5" /> New Product
           </button>
        </div>
      </div>

      {/* Control Bar: Search & Filter */}
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Global search by name, SKU, or category..." 
            className="w-full bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 outline-none px-16 py-5 rounded-[2.5rem] text-sm font-bold shadow-sm focus:border-indigo-500/50 transition-all placeholder:text-slate-400"
          />
        </div>
        <button className="px-8 py-5 bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-[2rem] text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-slate-800 hover:text-white transition-all">
          <Filter className="w-4 h-4" /> Filter Advanced
        </button>
      </div>

      {/* Grid Mode */}
      {viewMode === 'GRID' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {products.map((product, idx) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-2 rounded-[3rem] overflow-hidden shadow-sm hover:border-indigo-500/30 transition-all"
              >
                <div className="relative h-64 rounded-[2.5rem] overflow-hidden bg-white dark:bg-black/20 p-8 flex items-center justify-center border border-white/10 group-hover:p-6 transition-all">
                   <img src={product.thumb} alt={product.name} className="w-full h-full object-contain mix-blend-screen group-hover:scale-110 transition-transform duration-500" />
                   <div className="absolute top-4 right-4">
                      <div className={cn(
                        "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20",
                        product.status === 'LOW_STOCK' ? "bg-orange-500/20 text-orange-500" :
                        product.status === 'OUT_OF_STOCK' ? "bg-red-500/20 text-red-500" :
                        "bg-emerald-500/20 text-emerald-500"
                      )}>
                         {product.status.replace('_', ' ')}
                      </div>
                   </div>
                </div>

                <div className="p-8 space-y-6">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">{product.category}</p>
                      <h3 className="text-xl font-black text-slate-800 dark:text-white leading-tight">{product.name}</h3>
                   </div>
                   
                   <div className="flex items-end justify-between">
                      <div className="space-y-1">
                         <p className="text-[9px] font-black text-slate-400 uppercase">Current Inventory</p>
                         <div className="flex items-center gap-2">
                            <Box className="w-3 h-3 text-slate-400" />
                            <span className="text-lg font-black text-slate-700 dark:text-slate-200">{product.stock} units</span>
                         </div>
                      </div>
                      <p className="text-3xl font-black text-indigo-500">$ {product.price.toLocaleString()}</p>
                   </div>

                   <div className="flex gap-3 pt-6 border-t border-white/5">
                      <button className="flex-1 py-4 bg-white/50 dark:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all border border-white/10">
                         Edit Item
                      </button>
                      <button className="w-14 h-14 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl flex items-center justify-center transition-all border border-red-500/10">
                         <Trash2 className="w-5 h-5" />
                      </button>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* List Mode View would go here similarly structured as a table... */}
      
      {/* Stock Health Panel */}
      <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-10 rounded-[3rem] shadow-sm flex flex-col xl:flex-row items-center justify-between gap-10">
         <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-orange-500/10 rounded-[2rem] flex items-center justify-center">
               <AlertTriangle className="w-10 h-10 text-orange-500" />
            </div>
            <div>
               <h4 className="text-2xl font-black uppercase tracking-tight">Inventory Health</h4>
               <p className="text-slate-500 font-bold">You have <span className="text-orange-500">3 items</span> with low stock. Replenish needed soon.</p>
            </div>
         </div>
         <div className="flex gap-4">
            <button className="px-8 py-4 bg-slate-800 text-white dark:bg-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl">
               Generate PO
            </button>
            <button className="px-8 py-4 bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs">
               Export CSV
            </button>
         </div>
      </div>
    </div>
  );
}
