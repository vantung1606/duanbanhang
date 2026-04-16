import { Outlet } from 'react-router-dom';
import ManagerSidebar from '../../components/layout/manager/ManagerSidebar';
import ManagerTopBar from '../../components/layout/manager/ManagerTopBar';

export default function ManagerLayout() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex transition-colors duration-500 overflow-hidden font-sans">
      {/* Background Orbs - Indigo theme accent */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full z-0 pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-10%] right-[10%] w-[30%] h-[40%] bg-primary-light/5 blur-[100px] rounded-full z-0 pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <ManagerSidebar />
      
      <main className="flex-1 ml-72 relative z-10 flex flex-col h-screen overflow-hidden">
        <ManagerTopBar />
        
        <div className="flex-1 overflow-y-auto custom-scrollbar px-10 pb-10">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
