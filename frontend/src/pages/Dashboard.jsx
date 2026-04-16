import { 
  Package, 
  TrendingUp, 
  DollarSign, 
  AlertCircle,
  Plus
} from 'lucide-react';
import Card from '../components/ui/Card';

const Dashboard = () => {
  const stats = [
    { title: 'Total Products', value: '1,248', icon: Package, color: 'text-primary-light', bg: 'bg-primary-light/10' },
    { title: 'Total Sales', value: '3,748', icon: TrendingUp, color: 'text-secondary-light', bg: 'bg-secondary-light/10' },
    { title: 'Revenue', value: '$284K', icon: DollarSign, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { title: 'Low Stock', value: '23', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Header section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-1 flex items-center gap-2">
            Products 📦
          </h1>
          <p className="text-gray-400 font-medium">Manage your product inventory</p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-4 bg-primary-light text-white rounded-2xl font-bold shadow-lg shadow-primary-light/30 hover:scale-105 active:scale-95 transition-all">
          <Plus size={18} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="group hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-inner`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.title}</p>
                <p className="text-2xl font-black text-gray-800 dark:text-gray-100">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Large Content Card */}
      <Card className="min-h-[400px] flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-gray-100/10 pb-6">
          <div className="flex items-center gap-3 bg-background-light dark:bg-background-dark px-4 py-2 rounded-2xl shadow-neumo-inner dark:shadow-neumo-dark-inner flex-1 max-w-md">
            <Package size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
          
          <div className="flex gap-4">
            {['All', 'Laptops', 'Phones', 'Tablets', 'Audio'].map((cat, i) => (
              <button 
                key={cat}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${i === 0 ? 'bg-primary-light text-white shadow-md' : 'text-gray-400 hover:text-primary-light'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
          {[1,2,3,4].map((i) => (
            <div key={i} className="bg-background-light/50 dark:bg-black/10 rounded-3xl border border-dashed border-gray-300 dark:border-gray-800 flex flex-col items-center justify-center p-10 opacity-50 group hover:opacity-100 transition-opacity">
               <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4 flex items-center justify-center text-gray-300 dark:text-gray-700 font-bold text-2xl">
                 {i}
               </div>
               <div className="h-4 w-24 bg-gray-100 dark:bg-gray-800 rounded-lg mb-2"></div>
               <div className="h-3 w-16 bg-gray-50 dark:bg-gray-900 rounded-lg"></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
