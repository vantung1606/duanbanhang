import { Outlet } from 'react-router-dom';
import CustomerNavbar from '../../components/layout/customer/CustomerNavbar';

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-500 font-sans">
      {/* Dynamic Background Atmosphere - Rose theme accent */}
      <div className="fixed top-[-15%] left-[-5%] w-[50%] h-[60%] bg-rose-500/5 blur-[130px] rounded-full z-0 pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[50%] bg-rose-500/5 blur-[110px] rounded-full z-0 pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }} />

      <CustomerNavbar />
      
      <main className="relative z-10 pt-32 pb-16 px-6 lg:px-12 max-w-[1600px] mx-auto min-h-screen">
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <Outlet />
        </div>
      </main>

      {/* Footer - Minimal Clay Style */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/10 dark:border-white/5 bg-background-light/30 dark:bg-background-dark/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 dark:text-gray-400 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-slate-800 dark:text-white tracking-tighter italic">TechChain</span>
            <span className="text-xs">© 2026. Premium Tech Store.</span>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-rose-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-rose-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-rose-500 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
