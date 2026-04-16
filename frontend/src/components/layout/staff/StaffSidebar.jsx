import { NavLink } from 'react-router-dom';
import { 
  ClipboardList, 
  Truck, 
  PackageSearch, 
  History, 
  ChevronRight,
  LogOut,
  UserCheck
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { icon: ClipboardList, label: 'Active Orders', path: '/staff' },
  { icon: Truck, label: 'Deliveries', path: '/staff/deliveries' },
  { icon: PackageSearch, label: 'Inventory Check', path: '/staff/inventory' },
  { icon: History, label: 'Action History', path: '/staff/history' },
];

export default function StaffSidebar() {
  return (
    <aside className="w-72 h-screen fixed left-0 top-0 z-40 p-6 flex flex-col transition-all duration-300">
      {/* Glassmorphic Container - Emerald Theme */}
      <div className="flex-1 bg-background-light/40 dark:bg-background-dark/40 backdrop-blur-xl rounded-[2.5rem] border border-white/20 dark:border-white/5 shadow-neumo-md flex flex-col overflow-hidden">
        
        {/* Logo Section */}
        <div className="p-8 pb-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-neumo-sm">
              <UserCheck className="text-white w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">Staff</h2>
              <p className="text-[10px] font-semibold text-emerald-500 uppercase tracking-widest opacity-80">Store Operations</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/staff'}
              className={({ isActive }) => cn(
                "flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group",
                isActive 
                  ? "bg-emerald-500 text-white shadow-neumo-sm scale-[1.02]" 
                  : "text-slate-500 hover:bg-white/50 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon className={cn("w-5 h-5", "group-hover:scale-110 transition-transform")} />
                <span className="font-bold tracking-wide">{item.label}</span>
              </div>
              <ChevronRight className={cn("w-4 h-4 opacity-0 group-hover:opacity-100 transition-all")} />
            </NavLink>
          ))}
        </nav>

        {/* Profile/Footer */}
        <div className="p-6 mt-auto border-t border-white/10">
          <div className="bg-white/30 dark:bg-black/20 p-4 rounded-3xl flex items-center gap-4 shadow-neumo-inner border border-white/10">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Staff" 
              alt="Staff Avatar" 
              className="w-11 h-11 rounded-2xl shadow-sm border-2 border-emerald-500/30"
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-slate-800 dark:text-white truncate">Marcus Wright</p>
              <p className="text-[10px] font-black uppercase text-emerald-500 tracking-tighter">Inventory Specialist</p>
            </div>
            <button className="p-2 hover:bg-red-500/10 rounded-xl transition-colors group">
              <LogOut className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
