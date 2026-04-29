import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ManagerSidebar from '../../components/layout/manager/ManagerSidebar';
import ManagerTopBar from '../../components/layout/manager/ManagerTopBar';

export default function ManagerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        body { 
          background-image: url('/assets/images/light_bg.png'); 
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
      `}} />
      <div className="min-h-screen text-slate-800 flex overflow-hidden font-sans p-4 md:p-6 gap-6 relative bg-transparent">
        {/* Background Decorative Elements */}
        <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full z-0 pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[10%] w-[30%] h-[40%] bg-blue-500/10 blur-[100px] rounded-full z-0 pointer-events-none" />

        <ManagerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 relative z-10 flex flex-col h-[calc(100vh-3rem)] overflow-hidden w-full max-w-full">
          <ManagerTopBar onMenuClick={() => setIsSidebarOpen(true)} />
          
          <div className="flex-1 overflow-y-auto custom-scrollbar pt-12 pb-10 pr-2">
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
