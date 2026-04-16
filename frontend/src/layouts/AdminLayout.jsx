import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Sidebar - Neumorphic Clay Style */}
      <Sidebar />

      <main className="flex-1 flex flex-col relative overflow-y-auto">
        {/* Top bar - Glassmorphic */}
        <div className="p-6 pb-0">
          <TopBar />
        </div>
        
        {/* Content Area */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
