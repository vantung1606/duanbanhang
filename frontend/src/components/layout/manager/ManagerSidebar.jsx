import { NavLink } from 'react-router-dom';
import { 
  TrendingUp, 
  Tag, 
  FileText, 
  Layers, 
  ChevronRight,
  LogOut,
  LineChart
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { icon: LineChart, label: 'Hiệu Suất', path: '/manager' },
  { icon: TrendingUp, label: 'Báo Cáo Bán Hàng', path: '/manager/sales' },
  { icon: Layers, label: 'Danh Mục', path: '/manager/categories' },
  { icon: Tag, label: 'Khuyến Mãi', path: '/manager/promotions' },
  { icon: FileText, label: 'Nhật Ký Hệ Thống', path: '/manager/logs' },
];

export default function ManagerSidebar({ isOpen, setIsOpen }) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/shop');
  };

  return (
    <aside className={cn(
      "w-80 h-[calc(100vh-2rem)] sticky top-4 z-40 flex flex-col transition-all duration-300",
      "fixed lg:relative lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-[150%] lg:-translate-x-0"
    )}>
      {/* Monolith Glass Container */}
      <div className="flex-1 bg-white/40 dark:bg-black/40 backdrop-blur-3xl rounded-[3rem] border border-white/40 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden py-10 px-6">
        
        {/* Logo Section */}
        <div className="px-4 mb-14">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center shadow-lg shadow-slate-800/20">
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Monolith</h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">PREMIUM TIER</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/manager'}
              onClick={() => setIsOpen && setIsOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-4 px-6 py-4 rounded-3xl transition-all duration-300 group font-bold text-xs tracking-wider",
                isActive 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-white/30 dark:hover:bg-white/10"
              )}
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Storage Bar (Mockup Style) */}
        <div className="mt-auto px-4 mb-8">
           <div className="bg-white/50 dark:bg-black/20 rounded-3xl p-5 border border-white/40">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Storage</span>
                <span className="text-[10px] font-black text-slate-800 dark:text-white uppercase tracking-widest">75% of 100GB</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200/50 dark:bg-slate-700/50 rounded-full overflow-hidden">
                <div className="h-full bg-slate-800 dark:bg-white rounded-full" style={{ width: '75%' }} />
              </div>
           </div>
        </div>

        {/* Upgrade Plan Button */}
        <div className="px-4">
          <button 
            className="w-full bg-[#5a647e] hover:bg-[#4a546e] text-white py-5 rounded-[2rem] font-bold text-xs uppercase tracking-[0.15em] shadow-xl shadow-slate-900/10 transition-all duration-300 hover:scale-[1.02]"
          >
            Upgrade Plan
          </button>
        </div>

        {/* Logout Link */}
        <button 
          onClick={handleLogout}
          className="mt-6 px-8 flex items-center gap-3 text-slate-400 hover:text-red-500 transition-colors font-bold text-[10px] uppercase tracking-[0.2em]"
        >
           <LogOut className="w-4 h-4" />
           <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
