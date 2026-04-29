import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Clock, 
  ChevronRight, 
  ArrowRight,
  TrendingUp,
  Tag,
  Share2,
  Bookmark
} from 'lucide-react';
import NeuralynNavbar from '../../components/layout/customer/NeuralynNavbar';
import NeuralynFooter from '../../components/layout/customer/NeuralynFooter';
import { cn } from '../../lib/utils';

const FloatingOrb = ({ color, size, top, left, delay }) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      x: [0, 15, 0],
      scale: [1, 1.05, 1],
      opacity: [0.1, 0.15, 0.1],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none blur-[100px] rounded-full z-0 opacity-10"
    style={{
      backgroundColor: color,
      width: size,
      height: size,
      top,
      left,
    }}
  />
);

const BlogCard = ({ post, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="group relative bg-white/60 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden border border-white shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
      <div className="absolute top-6 left-6">
        <span className="px-4 py-1.5 bg-[#4981cf] text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
          {post.category}
        </span>
      </div>
    </div>
    
    <div className="p-8 flex flex-col flex-1">
      <div className="flex items-center gap-6 mb-6 text-[10px] font-black text-[#1a365d]/40 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5" /> {post.date}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5" /> {post.readTime}
        </div>
      </div>
      
      <h3 className="text-xl md:text-2xl font-black text-[#1a365d] mb-4 group-hover:text-[#4981cf] transition-colors line-clamp-2 leading-tight">
        {post.title}
      </h3>
      
      <p className="text-sm font-bold text-[#1a365d]/60 leading-relaxed mb-8 line-clamp-3">
        {post.excerpt}
      </p>
      
      <div className="mt-auto pt-6 border-t border-[#e8ebf2] flex items-center justify-between">
        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#4981cf] group-hover:gap-4 transition-all">
          ĐỌC TIẾP <ArrowRight className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-4 text-[#1a365d]/30">
          <Bookmark className="w-4 h-4 cursor-pointer hover:text-[#4981cf] transition-colors" />
          <Share2 className="w-4 h-4 cursor-pointer hover:text-[#4981cf] transition-colors" />
        </div>
      </div>
    </div>
  </motion.div>
);

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  const posts = [
    {
      id: 1,
      title: "Cách Vệ Sinh Lõi Sưởi Máy Tạo Khói Để Tăng Tuổi Thọ Gấp 2 Lần",
      category: "KỸ THUẬT",
      date: "12 THÁNG 4, 2025",
      readTime: "5 PHÚT ĐỌC",
      excerpt: "Nghẹt sưởi là vấn đề nan giải của mọi máy tạo khói. Bài viết này DuongDIY sẽ hướng dẫn bạn quy trình vệ sinh chuẩn Pro bằng dung dịch chuyên dụng.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Xu Hướng Hiệu Ứng Sân Khấu Năm 2025: Khi Công Nghệ DMX Chiếm Lĩnh",
      category: "XU HƯỚNG",
      date: "08 THÁNG 4, 2025",
      readTime: "8 PHÚT ĐỌC",
      excerpt: "Sân khấu hiện đại không chỉ cần ánh sáng, mà còn cần sự đồng bộ tuyệt đối giữa khói, lửa và đèn. Khám phá các giao thức điều khiển mới nhất.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Review Chi Tiết Máy Tạo Khói Lạnh 3000W - Đỉnh Cao Cho Đám Cưới Luxury",
      category: "ĐÁNH GIÁ",
      date: "02 THÁNG 4, 2025",
      readTime: "10 PHÚT ĐỌC",
      excerpt: "Dòng máy tạo khói bay là là mặt đất đang làm mưa làm gió trên thị trường. Liệu 3000W có đủ cho một khán phòng 1000m2?",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Hướng Dẫn Setup Hệ Thống Khói Cho Quán Bar Mini Tiết Kiệm Nhất",
      category: "TƯ VẤN",
      date: "28 THÁNG 3, 2025",
      readTime: "6 PHÚT ĐỌC",
      excerpt: "Bạn đang sở hữu một không gian nhỏ nhưng muốn có hiệu ứng bùng nổ? Đây là gói thiết bị 'ngon-bổ-rẻ' mà DuongDIY khuyên dùng.",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Tại Sao Nên Sử Dụng Dung Dịch Khói Khử Mùi Bạc Hà Của DuongDIY?",
      category: "SẢN PHẨM",
      date: "25 THÁNG 3, 2025",
      readTime: "4 PHÚT ĐỌC",
      excerpt: "Mùi khói hắc ám luôn làm khách hàng khó chịu. Dung dịch khói cao cấp của chúng tôi không chỉ dày lâu tan mà còn mang lại hương thơm dễ chịu.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Dự Án: Toàn Cảnh Hệ Thống Hiệu Ứng Cho Đại Nhạc Hội SummerFest",
      category: "DỰ ÁN",
      date: "20 THÁNG 3, 2025",
      readTime: "12 PHÚT ĐỌC",
      excerpt: "Hơn 50 máy tạo khói công suất lớn được điều khiển qua hệ thống trung tâm. Một bài toán kỹ thuật hóc búa đã được giải quyết.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-[#e8ebf2] font-sans selection:bg-[#4981cf] selection:text-white overflow-x-hidden relative">
      <NeuralynNavbar />

      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingOrb color="#ffffff" size="350px" top="-5%" left="75%" delay={0} />
        <FloatingOrb color="#4981cf" size="250px" top="40%" left="-5%" delay={3} />
        <FloatingOrb color="#cadaee" size="400px" top="70%" left="60%" delay={6} />
      </div>

      <div className="relative z-10 pt-40 pb-24">
        
        {/* Blog Hero / Featured Post */}
        <section className="px-6 md:px-16 container mx-auto mb-24">
           <div className="mb-12">
              <span className="text-[#4981cf] font-heading font-black tracking-[0.5em] uppercase text-[9px] md:text-[11px] mb-4 block">TIN TỨC MỚI NHẤT</span>
              <h1 className="text-4xl md:text-6xl font-heading font-black text-[#1a365d] tracking-tight">Blog DuongDIY.</h1>
           </div>

           <motion.div 
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1 }}
             className="relative rounded-[3rem] overflow-hidden bg-[#1a365d] text-white flex flex-col lg:flex-row shadow-2xl"
           >
              <div className="lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden">
                 <img src={posts[1].image} className="w-full h-full object-cover" alt="Featured" />
              </div>
              <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center space-y-8 relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#4981cf]/20 blur-[60px] rounded-full" />
                 
                 <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#cadaee]">
                    <TrendingUp className="w-4 h-4" /> BÀI VIẾT NỔI BẬT
                 </div>

                 <h2 className="text-3xl md:text-5xl font-heading font-black leading-tight tracking-tight">
                    {posts[1].title}
                 </h2>
                 
                 <p className="text-white/70 text-base md:text-lg font-bold opacity-80 leading-relaxed italic">
                    "{posts[1].excerpt}"
                 </p>

                 <div className="pt-6">
                   <button className="px-10 py-5 bg-white text-[#1a365d] rounded-full font-black text-[11px] tracking-[0.3em] uppercase hover:bg-[#4981cf] hover:text-white transition-all shadow-xl">
                      ĐỌC BÀI VIẾT NGAY
                   </button>
                 </div>
              </div>
           </motion.div>
        </section>

        {/* Categories Bar */}
        <section className="px-6 md:px-16 container mx-auto mb-16">
           <div className="flex flex-wrap items-center gap-3 p-2 bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/80 shadow-xl overflow-x-auto no-scrollbar">
              {['Tất cả', 'Kỹ thuật', 'Xu hướng', 'Đánh giá', 'Sản phẩm', 'Dự án'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                    activeCategory === cat 
                      ? "bg-[#1a365d] text-white shadow-lg" 
                      : "text-[#1a365d]/50 hover:bg-white hover:text-[#4981cf]"
                  )}
                >
                  {cat}
                </button>
              ))}
              
              <div className="flex-1 min-w-[200px] ml-auto relative px-4">
                 <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Tìm kiếm bài viết..." 
                   className="w-full bg-white/40 border-none focus:ring-2 focus:ring-[#4981cf]/20 outline-none pl-12 pr-6 py-4 rounded-2xl text-[11px] font-bold text-[#1a365d] placeholder:text-slate-400 transition-all"
                 />
              </div>
           </div>
        </section>

        {/* Blog Grid */}
        <section className="px-6 md:px-16 container mx-auto mb-24">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post, idx) => (
                <BlogCard key={post.id} post={post} delay={idx * 0.1} />
              ))}
           </div>
           
           <div className="mt-20 text-center">
              <button className="px-12 py-5 rounded-full bg-white border-2 border-[#cadaee] text-[#1a365d] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1a365d] hover:text-white hover:border-[#1a365d] transition-all shadow-xl">
                 Tải thêm bài viết
              </button>
           </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="px-6 md:px-16 container mx-auto">
           <div className="bg-[#4981cf] rounded-[4rem] p-12 md:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 blur-[100px] rounded-full" />
              <div className="space-y-6 relative z-10 text-center lg:text-left">
                 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 mx-auto lg:mx-0">
                    <Tag className="w-8 h-8 text-[#cadaee]" />
                 </div>
                 <h2 className="text-4xl md:text-5xl font-heading font-black text-white tracking-tight leading-tight">Cập Nhật Công Nghệ <br /> <span className="text-[#cadaee]">Sớm Nhất Từ Chúng Tôi.</span></h2>
                 <p className="text-white/70 text-lg font-bold italic leading-relaxed">Nhận ngay cẩm nang hướng dẫn vận hành máy tạo khói chuyên nghiệp khi đăng ký.</p>
              </div>
              <div className="relative z-10 w-full max-w-md">
                 <div className="flex bg-white/10 backdrop-blur-md p-3 rounded-[2.5rem] border border-white/20 shadow-2xl">
                    <input 
                      type="email" 
                      placeholder="Email nhận tin..." 
                      className="flex-1 bg-transparent px-6 py-4 text-white placeholder-white/40 outline-none font-black text-base" 
                    />
                    <button className="bg-white text-[#4981cf] px-10 py-4 rounded-[1.8rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#cadaee] transition-all">GỬI NGAY</button>
                 </div>
              </div>
           </div>
        </section>

      </div>

      <NeuralynFooter />
    </div>
  );
}
