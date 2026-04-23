import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  ArrowLeft,
  CheckCircle2,
  Package,
  Truck
} from 'lucide-react';
import useCartStore from '../../store/cart-store';
import { cn, formatCurrency } from '../../lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import NeuralynNavbar from '../../components/layout/customer/NeuralynNavbar';

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Giao hàng' },
    { id: 2, name: 'Kiểm tra' },
    { id: 3, name: 'Thanh toán' }
  ];

  return (
    <div className="flex items-center gap-4 mb-12">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center gap-4">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all",
            currentStep >= step.id ? "bg-indigo-600 text-white" : "bg-white/40 text-slate-400 border border-slate-200/50"
          )}>
            {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.id}
          </div>
          <span className={cn(
            "text-[10px] font-black uppercase tracking-[0.2em]",
            currentStep >= step.id ? "text-slate-900" : "text-slate-400"
          )}>
            {step.name}
          </span>
          {idx < steps.length - 1 && <div className="w-12 h-px bg-slate-200" />}
        </div>
      ))}
    </div>
  );
};

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handlePlaceOrder();
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 lg:p-12 relative overflow-hidden font-sans text-slate-800">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08),transparent_50%)]" />
          <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-blue-400/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full" />
        </div>

        <NeuralynNavbar />

        <div className="layout-frame pointer-events-none"><div className="frame-border" /></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8 z-10"
        >
          <div className="w-24 h-24 rounded-full bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900">Đặt hàng thành công!</h1>
          <p className="text-xl text-slate-500 max-w-md mx-auto">Sản phẩm của bạn đang được chuẩn bị để giao. Một email xác nhận đã được gửi đi.</p>
          <div className="pt-10 flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/catalog" className="px-10 py-5 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl hover:bg-indigo-600">Tiếp tục mua sắm</Link>
            <Link to="/home" className="px-10 py-5 rounded-2xl border border-slate-200 text-slate-800 font-black uppercase tracking-widest text-sm hover:bg-slate-100 transition-colors bg-white/40 backdrop-blur-xl">Về trang chủ</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pt-32 pb-20 relative p-4 md:p-6 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-blue-400/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      <NeuralynNavbar />

      {/* Visual Frame */}
      <div className="layout-frame pointer-events-none z-10">
        <div className="frame-border" />
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left: Steps */}
          <div className="lg:col-span-8">
            <StepIndicator currentStep={step} />

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                  <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">Thông tin giao hàng</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Chọn địa chỉ</label>
                       <div className="p-6 rounded-[2rem] bg-white/40 backdrop-blur-xl border-2 border-indigo-600 flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-4">
                            <MapPin className="w-5 h-5 text-indigo-600" />
                            <div>
                              <p className="font-bold text-slate-900">Địa chỉ nhà (Mặc định)</p>
                              <p className="text-xs text-slate-500">123 Tech Lane, Quận Công Nghệ, VN</p>
                            </div>
                          </div>
                          <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                       </div>
                    </div>
                    <button className="col-span-2 py-5 rounded-[2rem] border-2 border-dashed border-slate-300 text-xs font-black uppercase tracking-widest text-slate-500 hover:border-slate-500 transition-all bg-white/20 hover:bg-white/40">
                      + Thêm địa chỉ mới
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                  <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">Kiểm tra đơn hàng</h2>
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.variantId} className="p-6 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-slate-200/50 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 p-2 shadow-inner">
                            <img src={item.imageUrl} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{item.productName}</p>
                            <p className="text-[10px] font-black uppercase text-slate-400">SL: {item.quantity} × {formatCurrency(item.price)}</p>
                          </div>
                        </div>
                        <span className="font-black text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                  <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">Phương thức thanh toán</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button className="p-8 rounded-[2rem] bg-slate-900 text-white shadow-xl flex flex-col gap-4 text-left">
                      <CreditCard className="w-6 h-6" />
                      <div>
                        <p className="font-black uppercase text-xs">Thẻ Tín dụng / Ghi nợ</p>
                        <p className="text-[10px] font-bold text-slate-300">Thanh toán bằng Visa, Mastercard...</p>
                      </div>
                    </button>
                    <button className="p-8 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-slate-200/50 flex flex-col gap-4 text-left hover:bg-white/60 transition-all shadow-sm">
                      <Package className="w-6 h-6 text-indigo-600" />
                      <div>
                        <p className="font-black uppercase text-xs text-slate-800">Thanh toán khi nhận hàng</p>
                        <p className="text-[10px] font-bold text-slate-500">Thanh toán bằng tiền mặt khi nhận hàng</p>
                      </div>
                    </button>
                  </div>
                  <div className="p-6 rounded-3xl bg-indigo-600/5 border border-indigo-600/20 flex items-center gap-4">
                    <ShieldCheck className="w-6 h-6 text-indigo-600" />
                    <p className="text-xs font-bold text-indigo-600/80">Giao dịch của bạn được bảo mật với công nghệ mã hóa thế hệ mới.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-16 flex items-center justify-between">
              {step > 1 ? (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Quay lại
                </button>
              ) : (
                <Link to="/catalog" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Tiếp tục mua sắm
                </Link>
              )}
              
              <button 
                onClick={handleNext}
                disabled={isProcessing}
                className="px-12 py-5 rounded-2xl bg-slate-900 text-white hover:bg-indigo-600 font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50"
              >
                {isProcessing ? 'Đang xử lý...' : step === 3 ? 'Xác nhận đặt hàng' : 'Bước tiếp theo'}
              </button>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-slate-200/50 space-y-8 shadow-sm">
              <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900">Tóm tắt đơn hàng</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500 uppercase">Tạm tính</span>
                  <span className="text-slate-900 font-bold">{formatCurrency(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-indigo-600">
                  <span className="uppercase tracking-widest">Giao hàng</span>
                  <span>MIỄN PHÍ</span>
                </div>
                <div className="h-px bg-slate-200/50" />
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-900">Tổng cộng</span>
                  <span className="text-3xl font-black text-indigo-600">{formatCurrency(getTotalPrice())}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 border border-slate-200 flex items-center gap-4 shadow-sm">
                <Truck className="w-5 h-5 text-indigo-600" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-indigo-600">Giao hàng hỏa tốc</span>
                  <span className="text-[8px] font-bold text-slate-400 tracking-widest">Dự kiến: 1-2 Ngày</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
