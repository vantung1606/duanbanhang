import { motion } from 'framer-motion';
import { MapPin, Phone, User, Plus, Trash2, Edit2, Check } from 'lucide-react';

const AddressCard = ({ isDefault, name, phone, address, index }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 }}
    className={`relative p-8 rounded-[2rem] border-2 transition-all group ${
      isDefault 
        ? 'bg-portfolio-rose/5 border-portfolio-rose' 
        : 'bg-white/5 border-white/10 hover:border-white/30'
    }`}
  >
    {isDefault && (
      <div className="absolute top-6 right-6 flex items-center gap-2 bg-portfolio-rose text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
        <Check className="w-3 h-3" /> Mặc định
      </div>
    )}

    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
          <MapPin className={`w-5 h-5 ${isDefault ? 'text-portfolio-rose' : 'text-white/40'}`} />
        </div>
        <div>
          <h3 className="font-black text-lg">{name}</h3>
          <p className="text-sm text-white/40 font-bold flex items-center gap-2">
            <Phone className="w-3 h-3" /> {phone}
          </p>
        </div>
      </div>

      <p className="text-white/70 font-medium leading-relaxed">
        {address}
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <button className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white text-xs font-black uppercase tracking-widest hover:text-black transition-all flex items-center gap-2">
          <Edit2 className="w-3 h-3" /> Sửa
        </button>
        {!isDefault && (
          <button className="p-2.5 rounded-xl text-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition-all">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  </motion.div>
);

export default function UserAddressesPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-black uppercase tracking-tighter">Địa chỉ giao hàng</h1>
          <p className="text-white/40 font-bold">Cập nhật thông tin nhận hàng của bạn.</p>
        </div>
        <button className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black text-xs tracking-widest hover:scale-105 transition-transform uppercase">
          <Plus className="w-4 h-4" /> Thêm địa chỉ mới
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AddressCard 
          isDefault={true}
          name="Vincent Tùng"
          phone="+84 901 234 567"
          address="Số 123, Đường Công Nghệ, Phường Sáng Tạo, Quận 1, TP. Hồ Chí Minh"
          index={0}
        />
        <AddressCard 
          isDefault={false}
          name="Văn phòng TC Studio"
          phone="+84 28 888 999"
          address="Toà nhà TechChain, 456 Đại lộ Tương Lai, Khu đô thị mới, TP. Thủ Đức"
          index={1}
        />
      </div>

      {/* Modern Notice */}
      <div className="p-8 rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 flex gap-6 items-center">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center shrink-0">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h4 className="font-black text-indigo-400 uppercase tracking-widest text-sm mb-1">Gợi ý bảo mật</h4>
          <p className="text-white/60 text-sm font-medium">Bạn có thể lưu tối đa 5 địa chỉ để quá trình Checkout diễn ra nhanh chóng và thuận tiện nhất.</p>
        </div>
      </div>
    </div>
  );
}
