import { motion } from 'framer-motion';
import { Facebook, MessageCircle } from 'lucide-react';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      {/* Zalo Button */}
      <motion.a
        href="https://zalo.me/your_number" // Thay số điện thoại của bạn vào đây
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1, y: -5 }}
        className="w-14 h-14 bg-[#0068ff] text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40 relative group"
      >
        <div className="absolute inset-0 rounded-full bg-[#0068ff] animate-ping opacity-20 group-hover:hidden" />
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" 
          className="w-8 h-8" 
          alt="Zalo" 
        />
        <span className="absolute right-full mr-4 px-4 py-2 bg-white text-[#0068ff] text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-blue-50">
          Chat Zalo ngay
        </span>
      </motion.a>

      {/* Facebook Button */}
      <motion.a
        href="https://facebook.com/your_page" // Thay link fanpage của bạn vào đây
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.1, y: -5 }}
        className="w-14 h-14 bg-[#1877f2] text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/40 group relative"
      >
        <Facebook className="w-7 h-7 fill-current" />
        <span className="absolute right-full mr-4 px-4 py-2 bg-white text-[#1877f2] text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-blue-50">
          Ghé thăm Fanpage
        </span>
      </motion.a>
    </div>
  );
}
