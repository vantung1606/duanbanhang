import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import StaffSidebar from '../../components/layout/staff/StaffSidebar';
import StaffTopBar from '../../components/layout/staff/StaffTopBar';

export default function StaffLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div 
      className="min-h-screen flex transition-colors duration-500 overflow-hidden font-sans text-[#2b3a55]"
      style={{
        backgroundImage: "url('/assets/images/ethereal_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <StaffSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 lg:ml-72 w-full relative z-10 flex flex-col h-screen overflow-hidden">
        <StaffTopBar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 lg:px-10 pb-10">
          <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
