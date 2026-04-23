import { useState } from 'react';
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
  Grid,
  ChevronDown,
  Palette,
  Box,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { useAuthStore } from '../../../store/authStore';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { icon: LayoutDashboard, label: 'TRANG CHỦ', path: '/admin' },
  { icon: Users, label: 'NGƯỜI DÙNG', path: '/admin/users' },
  { 
    icon: Package, 
    label: 'SẢN PHẨM', 
    path: '/admin/products',
    children: [
      { label: 'DANH SÁCH', path: '/admin/products', icon: Grid },
      { label: 'DANH MỤC', path: '/admin/categories', icon: Tags },
      { label: 'THUỘC TÍNH', path: '/admin/attributes', icon: Palette },
      { label: 'THƯƠNG HIỆU', path: '/admin/brands', icon: Star },
    ]
  },
  { icon: Box, label: 'KHO HÀNG', path: '/admin/inventory' },
  { icon: ShoppingCart, label: 'ĐƠN HÀNG', path: '/admin/orders' },
  { icon: Briefcase, label: 'NHÂN VIÊN (STAFF)', path: '/admin/staff' },
  { icon: UserCircle, label: 'QUẢN LÝ (MANAGER)', path: '/admin/managers' },
  { icon: Wrench, label: 'BẢO HÀNH', path: '/admin/warranties' },
  { icon: ActivitySquare, label: 'NHẬT KÝ (LOGS)', path: '/admin/logs' },
  { icon: Settings, label: 'CÀI ĐẶT', path: '/admin/settings' },
];

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState('SẢN PHẨM'); // Default open for demonstration

  const handleLogout = () => {
    logout();
    navigate('/shop');
  };

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <aside className={cn(
      "w-72 h-[calc(100vh-3rem)] sticky top-6 z-50 flex flex-col transition-all duration-300",
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
        <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-2">
          {menuItems.map((item) => (
            <div key={item.label} className="space-y-1">
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all font-bold text-xs tracking-widest uppercase",
                      openDropdown === item.label ? "text-indigo-600 bg-indigo-50/50" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon className="w-5 h-5" strokeWidth={2.5} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", openDropdown === item.label && "rotate-180")} />
                  </button>
                  
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-4 space-y-1"
                      >
                        {item.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) => cn(
                              "flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-[10px] tracking-widest uppercase",
                              isActive 
                                ? "text-indigo-600 bg-white shadow-sm border border-indigo-100" 
                                : "text-slate-400 hover:text-slate-700"
                            )}
                          >
                            <child.icon className="w-4 h-4" />
                            <span>{child.label}</span>
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <NavLink
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
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto pt-8 border-t border-slate-50">
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
