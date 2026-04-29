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
      "w-80 h-[calc(100vh-2rem)] sticky top-4 z-50 flex flex-col transition-all duration-500",
      "fixed lg:relative lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-[150%] lg:-translate-x-0"
    )}>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white/40 flex flex-col overflow-hidden py-10 px-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
      >
        
        {/* Logo Section */}
        <div className="flex items-center gap-4 mb-14 px-2">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
            <Grid className="text-slate-800 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight leading-tight">Ether UI</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight mt-0.5">EDITORIAL SOFT-FORM</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
          {menuItems.map((item) => (
            <div key={item.label} className="space-y-1">
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={cn(
                      "w-full flex items-center justify-between px-6 py-4 rounded-3xl transition-all duration-300 font-bold text-xs tracking-wider",
                      openDropdown === item.label ? "text-slate-900 bg-white shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-white/30"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon className="w-5 h-5" />
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
                        className="overflow-hidden pl-6 space-y-1 mt-1"
                      >
                        {item.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) => cn(
                              "flex items-center gap-4 px-6 py-3 rounded-2xl transition-all font-bold text-[10px] tracking-widest uppercase",
                              isActive 
                                ? "text-slate-900" 
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
                    "flex items-center gap-4 px-6 py-4 rounded-3xl transition-all duration-300 font-bold text-xs tracking-wider",
                    isActive 
                      ? "text-slate-900 bg-white shadow-sm" 
                      : "text-slate-500 hover:text-slate-800 hover:bg-white/30"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        {/* Action Button */}
        <div className="mt-8 mb-6">
          <button className="w-full bg-[#3d4d73] hover:bg-[#2d3a5a] text-white py-5 rounded-[2rem] font-bold text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02]">
            <span className="text-lg">+</span> New Transaction
          </button>
        </div>

        {/* Footer */}
        <div className="space-y-2">
          <button className="flex items-center gap-4 px-6 py-3 w-full text-slate-500 hover:text-slate-800 font-bold text-[10px] tracking-widest uppercase transition-colors">
            <Settings className="w-4 h-4" />
            <span>Help</span>
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-3 w-full text-slate-500 hover:text-red-600 font-bold text-[10px] tracking-widest uppercase transition-colors"
          >
            <LogOut className="w-4 h-4 rotate-180" />
            <span>Logout</span>
          </button>
        </div>
      </motion.div>
    </aside>
  );
}
