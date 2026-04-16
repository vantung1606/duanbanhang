import { Outlet } from 'react-router-dom';
import CustomerNavbar from '../../components/layout/customer/CustomerNavbar';

export default function CustomerLayout() {
  return (
    <div className="shopper-theme min-h-screen transition-colors duration-500 font-sans selection:bg-shopper-emerald/30 overflow-x-hidden relative">
      {/* Soft Ambient Background (Light Mode) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-shopper-emerald/5 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-shopper-mint/50 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <CustomerNavbar />
      
      <main className="relative z-10 min-h-screen">
        <Outlet />
      </main>

      {/* Corporate Minimal Footer */}
      <footer className="relative z-10 py-24 px-8 bg-white/80 backdrop-blur-3xl border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
              TechChain <span className="text-shopper-emerald">Studio.</span>
            </h2>
            <p className="text-slate-500 max-w-sm font-medium leading-relaxed">
              Elevating your digital lifestyle with premium curated technology and sustainable industrial design.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">Discover</h4>
            <div className="flex flex-col gap-3 font-bold text-slate-600">
              <a href="#" className="hover:text-shopper-emerald transition-colors">Latest Drops</a>
              <a href="#" className="hover:text-shopper-emerald transition-colors">Exclusives</a>
              <a href="#" className="hover:text-shopper-emerald transition-colors">Collections</a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">Support</h4>
            <div className="flex flex-col gap-3 font-bold text-slate-600">
              <a href="#" className="hover:text-shopper-emerald transition-colors">Shipping</a>
              <a href="#" className="hover:text-shopper-emerald transition-colors">Returns</a>
              <a href="#" className="hover:text-shopper-emerald transition-colors">Privacy</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-100 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
          <span>© 2026 TechChain Studio Group</span>
          <span>Designed with Passion</span>
        </div>
      </footer>
    </div>
  );
}
