import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/layout/admin/AdminSidebar';
import AdminTopBar from '../../components/layout/admin/AdminTopBar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex transition-colors duration-500 overflow-hidden font-sans">
      {/* Background Orbs for atmosphere */}
      <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[50%] bg-primary-light/5 blur-[120px] rounded-full z-0 pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-10%] left-[10%] w-[30%] h-[40%] bg-indigo-500/5 blur-[100px] rounded-full z-0 pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <AdminSidebar />
      
      <main className="flex-1 ml-80 relative z-10 flex flex-col h-screen overflow-hidden">
        <AdminTopBar />
        
        <div className="flex-1 overflow-y-auto custom-scrollbar px-10 pb-10">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
