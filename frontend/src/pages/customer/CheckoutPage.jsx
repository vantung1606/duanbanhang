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
import { cn } from '../../lib/utils';
import { Link, useNavigate } from 'react-router-dom';

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Shipping' },
    { id: 2, name: 'Review' },
    { id: 3, name: 'Payment' }
  ];

  return (
    <div className="flex items-center gap-4 mb-12">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center gap-4">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all",
            currentStep >= step.id ? "bg-accent text-black" : "bg-white/5 text-white/40 border border-white/10"
          )}>
            {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.id}
          </div>
          <span className={cn(
            "text-[10px] font-black uppercase tracking-[0.2em]",
            currentStep >= step.id ? "text-white" : "text-white/30"
          )}>
            {step.name}
          </span>
          {idx < steps.length - 1 && <div className="w-12 h-px bg-white/10" />}
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
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        <div className="layout-frame"><div className="frame-border" /></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8 z-10"
        >
          <div className="w-24 h-24 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 className="w-12 h-12 text-accent" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Order Placed!</h1>
          <p className="text-xl text-white/50 max-w-md mx-auto">Your technology is preparing for shipment. A confirmation email has been sent.</p>
          <div className="pt-10 flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/catalog" className="px-10 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform">Continue Shopping</Link>
            <Link to="/shop" className="px-10 py-5 rounded-2xl border border-white/20 font-black uppercase tracking-widest text-sm hover:bg-white/5 transition-colors">Go Home</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 relative p-4 md:p-6 overflow-x-hidden">
      
      {/* Visual Frame */}
      <div className="layout-frame pointer-events-none">
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
                  <h2 className="text-4xl font-black uppercase tracking-tight">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Select Address</label>
                       <div className="p-6 rounded-[2rem] bg-white/5 border-2 border-accent flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-4">
                            <MapPin className="w-5 h-5 text-accent" />
                            <div>
                              <p className="font-bold">Home Address (Default)</p>
                              <p className="text-xs text-white/40">123 Tech Lane, Silicon District, VN</p>
                            </div>
                          </div>
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                       </div>
                    </div>
                    <button className="col-span-2 py-5 rounded-[2rem] border-2 border-dashed border-white/10 text-xs font-black uppercase tracking-widest hover:border-white/20 transition-all">
                      + Add New Address
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
                  <h2 className="text-4xl font-black uppercase tracking-tight">Review Order</h2>
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.variantId} className="p-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-black/40 p-2">
                            <img src={item.imageUrl} alt="" className="w-full h-full object-contain mix-blend-screen" />
                          </div>
                          <div>
                            <p className="font-bold">{item.productName}</p>
                            <p className="text-[10px] font-black uppercase text-white/30">Qty: {item.quantity} × ${item.price}</p>
                          </div>
                        </div>
                        <span className="font-black">$ {item.price * item.quantity}</span>
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
                  <h2 className="text-4xl font-black uppercase tracking-tight">Payment Method</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button className="p-8 rounded-[2rem] bg-white text-black flex flex-col gap-4 text-left">
                      <CreditCard className="w-6 h-6" />
                      <div>
                        <p className="font-black uppercase text-xs">Credit / Debit Card</p>
                        <p className="text-[10px] font-bold opacity-60">Pay with Visa, Mastercard...</p>
                      </div>
                    </button>
                    <button className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col gap-4 text-left hover:bg-white/10 transition-all">
                      <Package className="w-6 h-6 text-accent" />
                      <div>
                        <p className="font-black uppercase text-xs text-white">Cash on Delivery</p>
                        <p className="text-[10px] font-bold text-white/30">Pay when received</p>
                      </div>
                    </button>
                  </div>
                  <div className="p-6 rounded-3xl bg-accent/5 border border-accent/20 flex items-center gap-4">
                    <ShieldCheck className="w-6 h-6 text-accent" />
                    <p className="text-xs font-bold text-accent/80">Your transaction is secured with next-gen encryption.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-16 flex items-center justify-between">
              {step > 1 ? (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <Link to="/catalog" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Keep Shopping
                </Link>
              )}
              
              <button 
                onClick={handleNext}
                disabled={isProcessing}
                className="px-12 py-5 rounded-2xl bg-accent text-black font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : step === 3 ? 'Confirm Order' : 'Next Step'}
              </button>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-8">
              <h3 className="text-xl font-black uppercase tracking-tighter">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white/40 uppercase">Subtotal</span>
                  <span className="text-white">$ {getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-accent">
                  <span className="uppercase tracking-widest">Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-black uppercase tracking-widest">Total</span>
                  <span className="text-4xl font-black">$ {getTotalPrice()}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                <Truck className="w-5 h-5 text-accent" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-accent">Express Delivery</span>
                  <span className="text-[8px] font-bold text-white/30 tracking-widest">Estimated: 1-2 Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
