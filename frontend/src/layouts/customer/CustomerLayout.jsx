import { Outlet } from 'react-router-dom';
import CustomerNavbar from '../../components/layout/customer/CustomerNavbar';

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-[#FDFCFD] dark:bg-[#0F0F10] transition-colors duration-500 font-sans selection:bg-rose-500/30 overflow-x-hidden">
      {/* 3D Atmosphere / Floating Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-portfolio-rose/20 to-portfolio-orange/20 blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-portfolio-purple/20 to-portfolio-violet/20 blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-portfolio-orange/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <CustomerNavbar />
      
      <main className="relative z-10 min-h-screen">
        <Outlet />
      </main>

      {/* Modern Minimal Footer */}
      <footer className="relative z-10 py-20 px-6 bg-white/40 dark:bg-black/40 backdrop-blur-xl border-t border-white/20 dark:border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-black bg-gradient-to-r from-portfolio-rose to-portfolio-orange bg-clip-text text-transparent">TechChain</h2>
            <p className="text-slate-500 max-w-xs font-medium">Elevating your digital lifestyle with premium curated technology.</p>
          </div>
          <div className="flex gap-12 font-bold text-slate-800 dark:text-gray-200">
            <a href="#" className="hover:text-portfolio-rose transition-colors">Products</a>
            <a href="#" className="hover:text-portfolio-rose transition-colors">Experience</a>
            <a href="#" className="hover:text-portfolio-rose transition-colors">Contact</a>
          </div>
          <div className="text-slate-400 text-sm font-bold">
            © 2026 TC Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
