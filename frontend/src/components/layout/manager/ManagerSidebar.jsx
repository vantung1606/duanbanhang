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
      "w-72 h-screen fixed left-0 top-0 z-40 p-4 lg:p-6 flex flex-col transition-transform duration-300",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      {/* Light Glassmorphic Container */}
      <div className="flex-1 bg-white/70 dark:bg-black/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col overflow-hidden">
        
        {/* Logo Section */}
        <div className="p-8 pb-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <TrendingUp className="text-white w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">Quản Lý</h2>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest opacity-80">Góc Nhìn Kinh Doanh</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/manager'}
              onClick={() => setIsOpen && setIsOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group",
                isActive 
                  ? "bg-slate-700 text-white shadow-lg shadow-slate-700/20 scale-[1.02]" 
                  : "text-slate-600 hover:bg-white/80 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon className={cn("w-5 h-5", "group-hover:scale-110 transition-transform")} />
                <span className="font-bold tracking-wide text-sm">{item.label}</span>
              </div>
              <ChevronRight className={cn("w-4 h-4 opacity-0 group-hover:opacity-100 transition-all")} />
            </NavLink>
          ))}
        </nav>

        {/* Profile/Footer */}
        <div className="p-6 mt-auto border-t border-white/40 dark:border-white/10">
          <div className="bg-white/50 dark:bg-black/20 p-4 rounded-3xl flex items-center gap-4 shadow-sm border border-white/60 dark:border-white/5">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Manager" 
              alt="Manager Avatar" 
              className="w-11 h-11 rounded-2xl shadow-sm border-2 border-indigo-100 dark:border-indigo-500/30 bg-white"
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-slate-800 dark:text-white truncate">Nguyễn Văn A</p>
              <p className="text-[10px] font-black uppercase text-indigo-600 tracking-tighter">Giám Đốc Kinh Doanh</p>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors group"
              title="Đăng Xuất"
            >
              <LogOut className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
