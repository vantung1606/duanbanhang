import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import UserDashboardSidebar from '../../components/layout/customer/UserDashboardSidebar';
import CustomerNavbar from '../../components/layout/customer/CustomerNavbar';

export default function UserDashboardLayout() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-accent selection:text-black">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-portfolio-rose/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-portfolio-purple/10 blur-[150px]" />
      </div>

      <CustomerNavbar />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-6 pt-32 pb-20">
        {/* Sidebar Container */}
        <aside className="w-full md:w-80 flex-shrink-0">
          <UserDashboardSidebar />
        </aside>

        {/* Content Container */}
        <main className="flex-1 min-h-[600px] bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Floating frame border */}
      <div className="fixed inset-4 border border-white/10 rounded-[3rem] pointer-events-none z-50 mix-blend-difference opacity-50" />
    </div>
  );
}
