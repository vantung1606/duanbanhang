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
      "w-72 h-screen fixed left-0 top-0 z-40 p-4 lg:p-6 flex flex-col transition-transform duration-300",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      {/* Soft Frosted Glass Container (Ethereal UI) */}
      <div className="flex-1 bg-white/40 backdrop-blur-[40px] rounded-[2.5rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden relative">
        
        {/* Subtle inner gradient to simulate volumetric light */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-8 pb-6">
            <div className="flex items-center gap-4 mb-1">
              <div className="w-10 h-10 rounded-2xl bg-white border border-white/80 shadow-sm flex items-center justify-center">
                <div className="w-4 h-4 bg-slate-800 rounded-[4px]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight leading-tight">Hệ Thống</h2>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">ĐIỀU HÀNH KHO BÃI</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="px-4 py-2 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/staff'}
                onClick={() => setIsOpen && setIsOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group font-bold text-sm",
                  isActive 
                    ? "bg-white/80 text-slate-800 shadow-sm border border-white/60" 
                    : "text-slate-500 hover:bg-white/40 hover:text-slate-800"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="mt-auto p-6 space-y-6">
            <button className="w-full py-4 bg-[#2b3a55] hover:bg-[#1e2a40] text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-sm shadow-lg shadow-[#2b3a55]/20 transition-all hover:scale-[1.02]">
              <Plus className="w-4 h-4" /> Tạo Đơn Mới
            </button>
            
            <div className="space-y-4 pl-4 pb-2">
              <button className="flex items-center gap-3 text-slate-500 hover:text-slate-800 transition-colors text-sm font-bold">
                <HelpCircle className="w-5 h-5" /> Trợ Giúp
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 text-slate-500 hover:text-red-500 transition-colors text-sm font-bold"
              >
                <LogOut className="w-5 h-5" /> Đăng Xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
