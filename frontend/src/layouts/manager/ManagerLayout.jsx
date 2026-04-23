import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ManagerSidebar from '../../components/layout/manager/ManagerSidebar';
import ManagerTopBar from '../../components/layout/manager/ManagerTopBar';

export default function ManagerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex transition-colors duration-500 overflow-hidden font-sans">
      {/* Background Orbs - Indigo theme accent */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full z-0 pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-10%] right-[10%] w-[30%] h-[40%] bg-primary-light/5 blur-[100px] rounded-full z-0 pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <ManagerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 lg:ml-72 w-full relative z-10 flex flex-col h-screen overflow-hidden">
        <ManagerTopBar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 lg:px-10 pt-8 pb-10">
          <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
