import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';
import { useEffect } from 'react';
import { create } from 'zustand';

// Simple store for global toasts
export const useToast = create((set) => ({
  toasts: [],
  addToast: (message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }]
    }));
    // Auto remove after 3 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      }));
    }, 3000);
  },
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id)
  }))
}));

const ToastItem = ({ toast, onRemove }) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  const bgColors = {
    success: 'bg-emerald-50 border-emerald-100',
    error: 'bg-red-50 border-red-100',
    info: 'bg-blue-50 border-blue-100'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      layout
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-lg backdrop-blur-md min-w-[300px] ${bgColors[toast.type]}`}
    >
      <div className="shrink-0">{icons[toast.type]}</div>
      <div className="flex-1 text-sm font-bold text-slate-700">{toast.message}</div>
      <button 
        onClick={() => onRemove(toast.id)}
        className="p-1 hover:bg-black/5 rounded-full transition-colors"
      >
        <X className="w-4 h-4 text-slate-400" />
      </button>
    </motion.div>
  );
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
