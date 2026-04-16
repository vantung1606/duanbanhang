import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Zap, Star, ShieldCheck, Truck, Package } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const CategoryCard = ({ icon: Icon, label, items, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-3d-soft flex flex-col items-center text-center gap-4 group cursor-pointer"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} shadow-lg`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <h3 className="font-black text-sm uppercase tracking-widest text-slate-800">{label}</h3>
      <p className="text-[10px] font-bold text-slate-400 mt-1">{items} Products</p>
    </div>
  </motion.div>
);

const ProductCard = ({ name, price, category, image }) => (
  <div className="bg-white rounded-[2.5rem] p-4 border border-slate-100 hover:shadow-3d-emerald transition-all group">
    <div className="aspect-square rounded-[2rem] bg-slate-50 relative overflow-hidden flex items-center justify-center p-8">
      <div className="text-6xl group-hover:scale-110 transition-transform duration-700">
        {image}
      </div>
      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-shopper-emerald border border-shopper-emerald/20 flex items-center gap-1">
        <Star className="w-3 h-3 fill-shopper-emerald" /> 4.9
      </div>
    </div>
    <div className="p-4 space-y-2">
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{category}</span>
      <h3 className="font-black text-slate-800 text-lg leading-tight uppercase tracking-tighter">{name}</h3>
      <div className="flex items-center justify-between pt-2">
        <span className="text-xl font-black text-shopper-emerald">$ {price}</span>
        <button className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-shopper-emerald transition-colors">
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

export default function ShopperHubPage() {
  const { user } = useAuthStore();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="max-w-7xl mx-auto px-8 pt-12 pb-32">
        
        {/* Personalized Welcome */}
        <header className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="px-5 py-1.5 rounded-full bg-shopper-emerald text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
              Authorized Shopper
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Spring Collection 2026</span>
          </div>
          <h1 className="text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            Chào mừng lại,<br />
            <span className="text-shopper-emerald">{user?.username || 'Shopper'}</span>.
          </h1>
          <p className="mt-8 text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
            Khám phá những thiết bị công nghệ tiên tiến nhất được cá nhân hóa cho phong cách của bạn.
          </p>
        </header>

        {/* Dynamic Categories */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          <CategoryCard icon={Zap} label="Bán chạy" items="1.2k" color="bg-shopper-emerald" />
          <CategoryCard icon={ShieldCheck} label="Bảo mật" items="450" color="bg-slate-900" />
          <CategoryCard icon={Truck} label="Phụ kiện" items="8.9k" color="bg-portfolio-rose" />
          <CategoryCard icon={Package} label="Ưu đãi" items="120" color="bg-portfolio-orange" />
        </section>

        {/* Featured Feed */}
        <section className="space-y-12">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter">Dành riêng cho bạn</h2>
              <p className="text-slate-400 font-bold mt-1 uppercase text-xs tracking-widest">Dựa trên sở thích của {user?.username}</p>
            </div>
            <button className="flex items-center gap-2 group text-xs font-black uppercase tracking-widest text-slate-400 hover:text-shopper-emerald transition-colors pb-1">
              Xem tất cả <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductCard name="Neuralyn X-1 Pro" price="1,999" category="Workstation" image="💻" />
            <ProductCard name="TC Studio PulseBuds" price="299" category="Audio" image="🎧" />
            <ProductCard name="Emerald Watch 7" price="549" category="Wearables" image="⌚" />
          </div>
        </section>

        {/* Promotion Banner */}
        <section className="mt-32 p-12 rounded-[4rem] bg-shopper-mint relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 text-center md:text-left">
              <h3 className="text-5xl font-black tracking-tighter uppercase text-shopper-emerald-dark leading-none">
                Ưu đãi vàng <br /> thành viên.
              </h3>
              <p className="text-shopper-emerald-dark/60 font-bold max-w-sm">
                Giảm ngay 20% cho đơn hàng phụ kiện đầu tiên của bạn trong hôm nay.
              </p>
              <button className="bg-shopper-emerald text-white px-10 py-4 rounded-full font-black text-xs tracking-widest uppercase hover:scale-105 transition-transform shadow-3d-emerald">
                NHẬN MÃ NGAY
              </button>
            </div>
            <div className="text-[12rem] filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-1000">
              🎁
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-[80px]" />
        </section>
      </div>
    </div>
  );
}
