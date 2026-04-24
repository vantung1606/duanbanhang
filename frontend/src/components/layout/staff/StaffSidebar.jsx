import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard,
  ClipboardList, 
  Truck, 
  PackageSearch, 
  History, 
  LogOut,
  HelpCircle,
  Plus
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

const menuItems = [
  { icon: LayoutDashboard, label: 'Bảng Điều Khiển', path: '/staff' },
  { icon: ClipboardList, label: 'Đơn Hàng', path: '/staff/orders' },
  { icon: PackageSearch, label: 'Kho Hàng', path: '/staff/inventory' },
  { icon: Truck, label: 'Giao Hàng', path: '/staff/deliveries' },
  { icon: History, label: 'Lịch Sử', path: '/staff/history' },
];

export default function StaffSidebar({ isOpen, setIsOpen }) {
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
      {/* Staff Emerald Glass Container */}
      <div className="flex-1 bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden py-10 px-8 relative">
        
        {/* Logo Section */}
        <div className="flex items-center gap-4 mb-14 px-2">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
            <PackageSearch className="text-emerald-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight leading-tight">Staff UI</h2>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-tight mt-0.5">OPERATIONAL HUB</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/staff'}
              onClick={() => setIsOpen && setIsOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-4 px-6 py-4 rounded-3xl transition-all duration-300 group font-bold text-xs tracking-wider",
                isActive 
                  ? "bg-white text-emerald-700 shadow-sm" 
                  : "text-slate-500 hover:text-emerald-600 hover:bg-white/30"
              )}
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Action Button - Emerald Pill */}
        <div className="mt-8 mb-6">
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-[2rem] font-bold text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02]">
            <Plus className="text-lg" /> Tạo Đơn Mới
          </button>
        </div>

        {/* Footer */}
        <div className="space-y-2">
          <button className="flex items-center gap-4 px-6 py-3 w-full text-slate-500 hover:text-emerald-600 font-bold text-[10px] tracking-widest uppercase transition-colors">
            <HelpCircle className="w-4 h-4" />
            <span>Trợ Giúp</span>
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-3 w-full text-slate-500 hover:text-red-600 font-bold text-[10px] tracking-widest uppercase transition-colors"
          >
            <LogOut className="w-4 h-4 rotate-180" />
            <span>Đăng Xuất</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
