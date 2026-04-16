import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  MapPin, 
  User, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: LayoutDashboard, label: 'Tổng quan', path: '/account', end: true },
  { icon: ShoppingBag, label: 'Đơn hàng', path: '/account/orders' },
  { icon: MapPin, label: 'Địa chỉ', path: '/account/addresses' },
  { icon: CreditCard, label: 'Thanh toán', path: '/account/payments' },
  { icon: ShieldCheck, label: 'Bảo mật', path: '/account/security' },
];

export default function UserDashboardSidebar() {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex flex-col gap-6 sticky top-32">
      {/* Profile Header Card */}
      <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-portfolio-rose/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative z-10 flex flex-col items-center text-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-portfolio-rose to-portfolio-orange p-[2px]">
            <div className="w-full h-full rounded-2xl bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight">{user?.username}</h3>
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mt-1">Hạng thành viên Bạc</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-2 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => cn(
              "flex items-center justify-between px-6 py-4 rounded-[1.8rem] transition-all duration-300 group",
              isActive 
                ? "bg-white text-black shadow-xl scale-[1.02]" 
                : "text-white/50 hover:bg-white/5 hover:text-white"
            )}
          >
            <div className="flex items-center gap-4">
              <item.icon className={cn("w-5 h-5", "group-hover:scale-110 transition-transform")} />
              <span className="font-bold tracking-wide text-sm">{item.label}</span>
            </div>
            <ChevronRight className={cn("w-4 h-4 opacity-0 group-hover:opacity-100 transition-all")} />
          </NavLink>
        ))}
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-[1.8rem] text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all group"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-bold tracking-wide text-sm">Đăng xuất</span>
        </button>
      </nav>
    </div>
  );
}
