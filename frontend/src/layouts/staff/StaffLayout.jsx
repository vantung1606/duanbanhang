import { Outlet } from 'react-router-dom';
import StaffSidebar from '../../components/layout/staff/StaffSidebar';
import StaffTopBar from '../../components/layout/staff/StaffTopBar';

export default function StaffLayout() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex transition-colors duration-500 overflow-hidden font-sans">
      {/* Background Orbs - Emerald theme accent */}
      <div className="fixed top-[-10%] right-[10%] w-[40%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full z-0 pointer-events-none animate-pulse" />
      <div className="fixed top-[20%] left-[-5%] w-[30%] h-[40%] bg-emerald-500/5 blur-[100px] rounded-full z-0 pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }} />

      <StaffSidebar />
      
      <main className="flex-1 ml-72 relative z-10 flex flex-col h-screen overflow-hidden">
        <StaffTopBar />
        
        <div className="flex-1 overflow-y-auto custom-scrollbar px-10 pb-10">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
