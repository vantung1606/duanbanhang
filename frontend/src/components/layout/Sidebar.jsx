import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  ShoppingBag, 
  Package, 
  Settings,
  Moon,
  Sun,
  ChevronRight
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { name: 'Customers', icon: Users, path: '/admin/customers' },
    { name: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
    { name: 'Products', icon: Package, path: '/admin/products' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <aside className="w-72 h-screen flex flex-col p-6 pr-0">
      <div className="flex-1 bg-white/70 dark:bg-black/20 backdrop-blur-xl rounded-l-[3rem] shadow-neumo-md dark:shadow-neumo-dark-md flex flex-col items-center py-10 relative">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 w-full px-8">
          <div className="w-10 h-10 bg-primary-light rounded-2xl flex items-center justify-center shadow-lg">
            <Package className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100">ClayBoard</h1>
            <p className="text-[10px] text-gray-400 font-medium">Admin Dashboard</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 w-full flex flex-col gap-3 px-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center justify-between p-4 rounded-2xl transition-all duration-300
                ${isActive 
                  ? 'bg-background-light dark:bg-background-dark shadow-neumo-sm dark:shadow-neumo-dark-sm text-primary-light' 
                  : 'text-gray-500 hover:text-primary-light hover:bg-white/50 dark:hover:bg-black/10'}
              `}
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} />
                <span className="font-semibold text-sm">{item.name}</span>
              </div>
              <ChevronRight size={16} className="opacity-0 group-hover:opacity-100" />
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="mt-auto w-full px-6 flex items-center gap-4 py-6 border-t border-gray-100/10">
          <div className="w-12 h-12 bg-gradient-to-tr from-primary-light to-secondary-light rounded-full shadow-lg p-[2px]">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
              alt="Avatar" 
              className="w-full h-full rounded-full bg-white"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Alex Johnson</span>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Pro Member</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
