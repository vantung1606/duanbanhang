import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/layout/admin/AdminSidebar';
import AdminTopBar from '../../components/layout/admin/AdminTopBar';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        body { 
          background-image: url('/assets/images/ethereal_bg.png'); 
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
      `}} />
      <div className="min-h-screen text-slate-800 flex overflow-hidden font-sans p-4 md:p-6 gap-6 relative" style={{ backgroundColor: 'rgba(243, 245, 248, 0.1)' }}>
        {/* Background Decorative Elements */}
        <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full z-0 pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[10%] w-[30%] h-[40%] bg-indigo-500/10 blur-[100px] rounded-full z-0 pointer-events-none" />

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 relative z-10 flex flex-col h-[calc(100vh-3rem)] overflow-hidden w-full max-w-full">
          <AdminTopBar onMenuClick={() => setIsSidebarOpen(true)} />

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
