import { motion } from 'framer-motion';
import { ShoppingBag, Package, Heart, Zap, ChevronRight, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { Link } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-4 group hover:bg-white/10 transition-all">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-xs font-black uppercase text-white/30 tracking-widest">{label}</p>
      <div className="text-2xl font-black mt-1 flex items-baseline gap-2">
        {value}
        <span className="text-[10px] text-green-400">+12%</span>
      </div>
    </div>
  </div>
);

export default function UserOverviewPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-portfolio-rose" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-portfolio-rose">TC Studio Space</span>
        </div>
        <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">
          Chào mừng, <br />
          <span className="bg-gradient-to-r from-portfolio-rose to-portfolio-orange bg-clip-text text-transparent">
            {user?.username}
          </span>
        </h1>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={ShoppingBag} 
          label="Đơn hàng" 
          value="12" 
          color="bg-portfolio-rose"
        />
        <StatCard 
          icon={Heart} 
          label="Yêu thích" 
          value="08" 
          color="bg-portfolio-purple"
        />
        <StatCard 
          icon={Zap} 
          label="Điểm tích lũy" 
          value="2,450" 
          color="bg-portfolio-orange"
        />
      </div>

      {/* Featured Insight Card */}
      <div className="bg-gradient-to-br from-portfolio-rose/20 via-portfolio-purple/20 to-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group">
        <div className="relative z-10 space-y-4 max-w-lg">
          <h2 className="text-3xl font-black tracking-tight leading-tight uppercase">
            Sẵn sàng trải nghiệm dòng sản phẩm 2026?
          </h2>
          <p className="text-white/60 font-bold">
            Là thành viên Bạc, bạn được quyền truy cập sớm các bộ sưu tập giới hạn tại TC Studio Labs.
          </p>
          <button className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-black text-xs tracking-widest hover:scale-105 transition-transform uppercase">
            Khám phá ngay <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        {/* Abstract 3D shape (visual placeholder) */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-white/10 transition-all duration-1000" />
      </div>

      {/* Recent Orders Preview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black uppercase tracking-widest">Đơn hàng gần đây</h2>
          <Link to="/account/orders" className="text-xs font-black uppercase tracking-widest text-portfolio-rose hover:underline flex items-center gap-2">
            Xem tất cả <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="p-10 border-2 border-dashed border-white/10 rounded-[2.5rem] text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mx-auto opacity-20">
            <Package className="w-8 h-8" />
          </div>
          <p className="text-white/30 font-bold">Bạn chưa có đơn hàng nào trong tháng này.</p>
        </div>
      </div>
    </div>
  );
}
