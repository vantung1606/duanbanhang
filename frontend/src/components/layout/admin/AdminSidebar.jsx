import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCircle,
  Briefcase,
  Package, 
  Tags,
  ShoppingCart,
  Wrench,
  ActivitySquare,
  Settings, 
  LogOut,
  Grid
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { useAuthStore } from '../../../store/authStore';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { icon: LayoutDashboard, label: 'TRANG CHỦ', path: '/admin' },
  { icon: Users, label: 'NGƯỜI DÙNG', path: '/admin/users' },
  { icon: Briefcase, label: 'NHÂN VIÊN (STAFF)', path: '/admin/staff' },
  { icon: UserCircle, label: 'QUẢN LÝ (MANAGER)', path: '/admin/managers' },
  { icon: Package, label: 'SẢN PHẨM', path: '/admin/products' },
  { icon: Tags, label: 'DANH MỤC', path: '/admin/categories' },
  { icon: ShoppingCart, label: 'ĐƠN HÀNG', path: '/admin/orders' },
  { icon: Wrench, label: 'BẢO HÀNH', path: '/admin/warranties' },
  { icon: ActivitySquare, label: 'NHẬT KÝ (LOGS)', path: '/admin/logs' },
  { icon: Settings, label: 'CÀI ĐẶT', path: '/admin/settings' },
];

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/shop');
  };

  return (
    <aside className={cn(
      "w-64 h-[calc(100vh-3rem)] sticky top-6 z-50 flex flex-col transition-all duration-300",
      "fixed lg:relative lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-[150%] lg:-translate-x-0"
    )}>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col overflow-hidden py-8 px-6"
      >
        
        {/* Logo Section */}
        <div className="flex items-center gap-4 mb-12 px-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center">
            <Grid className="text-white w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-800 tracking-tight leading-tight">Aether</h2>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-tight mt-0.5">PREMIUM<br/>DASHBOARD</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => cn(
                "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-bold text-xs tracking-widest uppercase",
                isActive 
                  ? "text-slate-800 bg-slate-50 shadow-sm" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/50"
              )}
            >
              <item.icon className="w-5 h-5" strokeWidth={2.5} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto pt-8">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-4 w-full rounded-2xl transition-all font-bold text-xs tracking-widest uppercase text-slate-500 hover:text-slate-800 hover:bg-slate-50/50"
          >
            <LogOut className="w-5 h-5" strokeWidth={2.5} />
            <span>ĐĂNG XUẤT</span>
          </button>
        </div>
      </motion.div>
    </aside>
  );
}

