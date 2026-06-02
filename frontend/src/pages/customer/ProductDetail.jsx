import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
  ShoppingCart,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { catalogService } from '../../services/catalog-service';
import { cn, formatCurrency } from '../../lib/utils';
import { useTranslation } from 'react-i18next';
import useCartStore from '../../store/cart-store';
import SEO from '../../components/common/SEO';
import NeuralynNavbar from '../../components/layout/customer/NeuralynNavbar';
import NeuralynFooter from '../../components/layout/customer/NeuralynFooter';
import { useToast } from '../../components/common/Toast';
import { useAuthStore } from '../../store/authStore';

const SpecsTable = ({ specs }) => {
  if (!specs) return <div className="text-[#1a365d]/40 text-[10px] italic">Không có thông số kỹ thuật.</div>;
  const specsList = typeof specs === 'string' ? JSON.parse(specs) : specs;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
      {specsList.map((spec, idx) => (
        <div key={idx} className="p-4 rounded-2xl bg-white border border-[#cadaee] flex items-center justify-between shadow-sm">
          <span className="text-[9px] font-black uppercase tracking-widest text-[#1a365d]/40">{spec.label}</span>
          <span className="text-xs md:text-sm font-bold text-[#1a365d]">{spec.value}</span>
        </div>
      ))}
    </div>
  );
};

const FloatingOrb = ({ color, size, top, left, delay }) => (
  <motion.div
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
      scale: [1, 1.05, 1],
      opacity: [0.1, 0.2, 0.1],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none blur-[100px] rounded-full z-0 opacity-10"
    style={{ backgroundColor: color, width: size, height: size, top, left }}
  />
);

export default function ProductDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCartStore();
  const { addToast } = useToast();
  const { isAuthenticated, token, user, openAuthModal } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyInput, setReplyInput] = useState('');
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [socket, setSocket] = useState(null);

  const getWebSocketUrl = (productId) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    let wsUrl = '';
    if (apiUrl) {
      const url = new URL(apiUrl);
      const wsProtocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
      wsUrl = `${wsProtocol}//${url.host}/ws-product-comments?productId=${productId}`;
    } else {
      wsUrl = `ws://127.0.0.1:8080/ws-product-comments?productId=${productId}`;
    }
    return wsUrl;
  };

  useEffect(() => {
    if (!product || !product.id) return;

    // Fetch initial comments via REST API
    commentService.getComments(product.id)
      .then(setComments)
      .catch(err => console.error('Error fetching comments:', err));

    // Connect WebSocket
    const wsUrl = getWebSocketUrl(product.id);
    const ws = new WebSocket(wsUrl);
    setSocket(ws);

    ws.onopen = () => {
      console.log('Connected to comment WebSocket');
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        const { event: ev, data } = msg;

        if (ev === 'comment-received') {
          setComments(prev => {
            if (data.parentId) {
              return prev.map(c => {
                if (c.id === data.parentId) {
                  if (c.replies.some(r => r.id === data.id)) return c;
                  return {
                    ...c,
                    replies: [...c.replies, data]
                  };
                }
                return c;
              });
            } else {
              if (prev.some(c => c.id === data.id)) return prev;
              return [data, ...prev];
            }
          });
        } else if (ev === 'user-typing') {
          const { username, isTyping } = data;
          setTypingUsers(prev => {
            const next = new Set(prev);
            if (isTyping) {
              next.add(username);
            } else {
              next.delete(username);
            }
            return next;
          });
        }
      } catch (e) {
        console.error('Error parsing WebSocket message:', e);
      }
    };

    ws.onclose = () => {
      console.log('Comment WebSocket disconnected');
    };

    return () => {
      ws.close();
    };
  }, [product?.id]);

  const sendTypingStatus = (isTyping) => {
    if (socket && socket.readyState === WebSocket.OPEN && isAuthenticated) {
      socket.send(JSON.stringify({
        event: 'typing',
        data: {
          productId: product.id,
          isTyping,
          token
        }
      }));
    }
  };

  useEffect(() => {
    if (!commentInput) return;
    const delayDebounceFn = setTimeout(() => {
      sendTypingStatus(false);
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [commentInput]);

  const handleCommentInputChange = (e) => {
    setCommentInput(e.target.value);
    sendTypingStatus(true);
  };

  const handleSendComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim() || !isAuthenticated) return;

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        event: 'new-comment',
        data: {
          productId: product.id,
          content: commentInput.trim(),
          parentId: null,
          token
        }
      }));
      setCommentInput('');
      sendTypingStatus(false);
    }
  };

  const handleSendReply = (e, parentId) => {
    e.preventDefault();
    if (!replyInput.trim() || !isAuthenticated) return;

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        event: 'new-comment',
        data: {
          productId: product.id,
          content: replyInput.trim(),
          parentId,
          token
        }
      }));
      setReplyInput('');
      setReplyingTo(null);
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await catalogService.getProductBySlug(slug);
        if (!data.imageUrls || data.imageUrls.length === 0) {
          data.imageUrls = [data.thumbnailUrl || "https://images.unsplash.com/photo-1516211697149-d8573292051d?q=80&w=800"];
        }
        let parsedSpecs = [];
        if (data.specifications) {
          try { parsedSpecs = JSON.parse(data.specifications); } catch (e) { console.error(e); }
        }
        const enrichedProduct = {
          ...data,
          specs: parsedSpecs.length > 0 ? parsedSpecs : [
            { label: "Công Suất", value: data.name.includes('400W') ? '400W' : (data.name.includes('900W') ? '900W' : '1500W') },
            { label: "Khởi Động", value: "3-5 Phút" },
            { label: "Bình Chứa", value: "1.5 - 2.5 Lít" },
            { label: "Điều Khiển", value: "Remote / DMX 512" }
          ]
        };
        setProduct(enrichedProduct);
        if (enrichedProduct.variants && enrichedProduct.variants.length > 0) {
          setSelectedVariant(enrichedProduct.variants[0]);
          const initialOptions = {};
          enrichedProduct.variants[0].attributeValues.forEach(av => {
            initialOptions[av.attributeName] = av.value;
          });
          setSelectedOptions(initialOptions);
        }
      } catch (error) {
        const mock = catalogService.getMockProducts().find(p => p.slug === slug);
        if (mock) setProduct({ ...mock, specs: [], imageUrls: [mock.thumbnailUrl], variants: [] });
      } finally { setLoading(false); }
    };
    loadProduct();
  }, [slug]);

  useEffect(() => {
    if (product) {
      const match = product.variants.find(v =>
        v.attributeValues.every(av => selectedOptions[av.attributeName] === av.value)
      );
      if (match) setSelectedVariant(match);
    }
  }, [selectedOptions, product]);

  const handleOptionChange = (attr, val) => {
    setSelectedOptions(prev => ({ ...prev, [attr]: val }));
  };

  if (loading) return <div className="h-screen bg-[#e8ebf2] flex items-center justify-center text-[#4981cf] font-heading font-black italic text-3xl animate-pulse">DUONGDIY...</div>;

  const groupedAttributes = {};
  product.variants.forEach(v => {
    v.attributeValues.forEach(av => {
      if (!groupedAttributes[av.attributeName]) groupedAttributes[av.attributeName] = new Set();
      groupedAttributes[av.attributeName].add(av.value);
    });
  });

  return (
    <div className="min-h-screen bg-[#e8ebf2] text-[#1a365d] font-sans selection:bg-[#4981cf] selection:text-white pt-24 md:pt-32 pb-20 relative overflow-x-hidden">
      <NeuralynNavbar />
      <SEO title={product?.name} description={product?.description} />

      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingOrb color="#ffffff" size="300px" top="-5%" left="60%" delay={0} />
        <FloatingOrb color="#4981cf" size="250px" top="40%" left="-10%" delay={2} />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

        {/* Breadcrumb - Responsive */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-8 md:mb-12 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#1a365d]/40">
          <Link to="/catalog" className="hover:text-[#4981cf] flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Catalog
          </Link>
          <ChevronRight className="w-2.5 h-2.5" />
          <span className="hidden sm:inline">{product.categoryName}</span>
          <ChevronRight className="w-2.5 h-2.5 hidden sm:inline" />
          <span className="text-[#1a365d]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Left: Gallery - Responsive */}
          <div className="lg:col-span-7 space-y-4 md:space-y-6">
            <motion.div
              layoutId={`img-${product.id}`}
              className="aspect-square w-full rounded-[2.5rem] md:rounded-[3rem] bg-white border-4 border-white shadow-xl overflow-hidden relative group"
            >
              <img
                src={product.imageUrls[activeImage]}
                className="w-full h-full object-contain p-8 md:p-12 transition-transform duration-700 group-hover:scale-105"
                alt={product.name}
              />
              <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-[#4981cf] text-white text-[9px] font-black uppercase tracking-widest shadow-lg">Premium</div>
            </motion.div>

            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 no-scrollbar">
              {product.imageUrls.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white border-2 transition-all overflow-hidden flex-shrink-0 p-2",
                    activeImage === idx ? "border-[#4981cf] shadow-lg" : "border-transparent grayscale hover:grayscale-0"
                  )}
                >
                  <img src={url} className="w-full h-full object-contain" alt="Preview" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info & Actions - Scaled Down */}
          <div className="lg:col-span-5 space-y-8 md:space-y-10">
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 text-[#4981cf] font-heading font-black uppercase tracking-[0.2em] text-[9px]">
                <Zap className="w-3 h-3 fill-current" /> {product.brandName || "DUONGDIY"} PRO SERIES
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black leading-tight tracking-tight text-[#1a365d] uppercase">{product.name}</h1>
              <div className="flex items-center gap-4 pt-1">
                <div className="flex items-center gap-1 text-[#4981cf]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-3 h-3 md:w-3.5 md:h-3.5", i < 4 ? "fill-current" : "opacity-20")} />
                  ))}
                  <span className="text-[10px] md:text-xs font-black ml-2 text-[#1a365d]/50">{product.rating} (120+)</span>
                </div>
                <div className="w-px h-3 bg-[#cadaee]" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#4981cf]">In Stock</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl md:text-5xl font-black text-[#4981cf] tracking-tighter">{formatCurrency(selectedVariant?.price || product.minPrice)}</span>
              <span className="text-[9px] font-black text-[#1a365d]/40 uppercase tracking-widest">VNĐ / Unit</span>
            </div>

            {/* Attributes Picker */}
            <div className="space-y-6">
              {Object.entries(groupedAttributes).map(([attr, vals]) => (
                <div key={attr} className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1a365d]/40">{attr}</h4>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {Array.from(vals).map(val => (
                      <button
                        key={val}
                        onClick={() => handleOptionChange(attr, val)}
                        className={cn(
                          "px-5 py-2.5 md:px-6 md:py-3 rounded-xl border-2 text-[11px] md:text-xs font-black transition-all",
                          selectedOptions[attr] === val
                            ? "bg-[#1a365d] text-white border-[#1a365d] shadow-xl"
                            : "bg-white border-[#cadaee] text-[#1a365d]/60 hover:border-[#4981cf]"
                        )}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-4 md:space-y-6">
              <button
                onClick={async () => {
                  if (!isAuthenticated) {
                    addToast('Vui lòng đăng nhập để thêm vào giỏ hàng!', 'info');
                    return;
                  }

                  if (!selectedVariant) {
                    addToast('Vui lòng chọn phiên bản sản phẩm!', 'error');
                    return;
                  }

                  try {
                    await addItem(product, selectedVariant, 1);
                    addToast(`Đã thêm ${product.name} vào giỏ hàng!`, 'success');
                  } catch (error) {
                    addToast('Không thể thêm vào giỏ hàng. Vui lòng thử lại!', 'error');
                  }
                }}
                className="w-full bg-[#1a365d] text-white hover:bg-[#4981cf] py-5 md:py-6 rounded-2xl text-base md:text-lg font-black flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all"
              >
                <ShoppingCart className="w-5 h-5" /> THÊM VÀO GIỎ HÀNG
              </button>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Truck, label: 'Free Ship' },
                  { icon: ShieldCheck, label: 'Warranty' },
                  { icon: RotateCcw, label: '30 Days' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white border border-[#cadaee] shadow-sm">
                    <item.icon className="w-4 h-4 text-[#4981cf]" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#1a365d]/50 text-center">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs Table */}
            <div className="pt-8 md:pt-10 border-t border-[#cadaee] space-y-6">
              <h3 className="text-[10px] md:text-xs font-heading font-black uppercase tracking-[0.3em] text-[#1a365d]">Thông số kỹ thuật</h3>
              <SpecsTable specs={product.specs} />
            </div>
          </div>
        </div>

        {/* Real-time Comments Section */}
        <div className="bg-white border border-[#cadaee] rounded-[2rem] shadow-xl p-6 md:p-10 mt-10 space-y-8 relative overflow-hidden">
          {/* Glow decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-[#cadaee] pb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-[#cadaee] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#1a365d]" />
              </div>
              <div>
                <h3 className="text-sm font-heading font-black uppercase tracking-[0.2em] text-[#1a365d]">Hội thoại trực tuyến</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Đặt câu hỏi và nhận tư vấn thời gian thực từ cộng đồng & admin</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Trực tiếp</span>
            </div>
          </div>

          {/* Typing Indicator */}
          {typingUsers.size > 0 && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic bg-slate-50 px-4 py-2 rounded-xl w-fit relative z-10">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span>{Array.from(typingUsers).join(', ')} đang soạn bình luận...</span>
            </div>
          )}

          {/* Add Comment Form */}
          <div className="relative z-10">
            {isAuthenticated ? (
              <form onSubmit={handleSendComment} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1a365d] to-[#2b4c7e] text-white font-black uppercase flex items-center justify-center text-xs flex-shrink-0">
                  {user?.username?.substring(0, 2) || 'US'}
                </div>
                <div className="flex-1 space-y-3">
                  <textarea
                    value={commentInput}
                    onChange={handleCommentInputChange}
                    placeholder="Hỏi đáp hoặc chia sẻ trải nghiệm về sản phẩm này..."
                    rows="3"
                    className="w-full bg-slate-50 border border-[#cadaee] rounded-2xl p-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-all shadow-sm"
                  />
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={!commentInput.trim()}
                      className="bg-[#1a365d] hover:bg-[#2b4c7e] text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-blue-900/10 disabled:opacity-50 disabled:hover:bg-[#1a365d] transition-all"
                    >
                      <span>Gửi bình luận</span>
                      <Send className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="bg-slate-50/50 border-2 border-dashed border-[#cadaee] rounded-3xl p-6 text-center space-y-3">
                <p className="text-xs text-slate-500 font-medium">Bạn cần đăng nhập để tham gia thảo luận về sản phẩm.</p>
                <button
                  onClick={() => openAuthModal('login')}
                  className="bg-white border border-[#cadaee] hover:border-slate-400 text-[#1a365d] text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-all shadow-sm"
                >
                  Đăng nhập ngay
                </button>
              </div>
            )}
          </div>

          {/* Comments List */}
          <div className="space-y-6 relative z-10">
            {comments.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-400 font-medium">Chưa có bình luận nào. Hãy là người đầu tiên đặt câu hỏi!</p>
              </div>
            ) : (
              <div className="divide-y divide-[#cadaee]/50 space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="pt-6 first:pt-0 space-y-4">
                    {/* Root Comment Header */}
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-100 to-slate-200 text-[#1a365d] border border-[#cadaee] font-black uppercase flex items-center justify-center text-xs flex-shrink-0 shadow-sm">
                        {comment.username?.substring(0, 2) || 'US'}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#1a365d]">{comment.username}</span>
                          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                            {new Date(comment.createdAt).toLocaleDateString('vi-VN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{comment.content}</p>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-4 pt-1">
                          <button
                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                            className="text-[9px] font-black uppercase tracking-widest text-[#4981cf] hover:text-[#1a365d] transition-colors"
                          >
                            Trả lời
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Reply Input Form */}
                    {replyingTo === comment.id && (
                      <form onSubmit={(e) => handleSendReply(e, comment.id)} className="ml-14 flex gap-3 items-start">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1a365d] to-[#2b4c7e] text-white font-black uppercase flex items-center justify-center text-[10px] flex-shrink-0">
                          {user?.username?.substring(0, 2) || 'US'}
                        </div>
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={replyInput}
                            onChange={(e) => setReplyInput(e.target.value)}
                            placeholder={`Trả lời ${comment.username}...`}
                            className="w-full bg-slate-50 border border-[#cadaee] rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition-all shadow-sm"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setReplyingTo(null)}
                              className="text-[9px] font-black uppercase tracking-widest px-4 py-2 border border-[#cadaee] rounded-full text-slate-500 hover:bg-slate-50 transition-all"
                            >
                              Hủy
                            </button>
                            <button
                              type="submit"
                              disabled={!replyInput.trim()}
                              className="bg-[#1a365d] hover:bg-[#2b4c7e] text-white text-[9px] font-black uppercase tracking-widest px-5 py-2 rounded-full flex items-center gap-1.5 shadow-sm disabled:opacity-50 transition-all"
                            >
                              <span>Gửi</span>
                              <Send className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    {/* Nested Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-14 pl-4 border-l-2 border-[#cadaee]/50 space-y-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3 items-start">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-50 to-slate-100 text-[#1a365d] border border-[#cadaee]/70 font-black uppercase flex items-center justify-center text-[10px] flex-shrink-0 shadow-sm">
                              {reply.username?.substring(0, 2) || 'US'}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-[#1a365d]">{reply.username}</span>
                                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[8px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                                    <CornerDownRight className="w-2 h-2" /> Phản hồi
                                  </span>
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                                  {new Date(reply.createdAt).toLocaleDateString('vi-VN', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <NeuralynFooter />
    </div>
  );
}
