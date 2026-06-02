import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Bot } from 'lucide-react';
import { aiService } from '../../services/ai-service';

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Xin chào! Mình là trợ lý ảo của DuongDIY Shop. Mình có thể hỗ trợ tư vấn thiết bị khói, đèn led, báo giá hoặc hướng dẫn sử dụng máy. Bạn đang cần tìm thiết bị gì thế?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestions = [
    'Tư vấn máy khói gia đình',
    'Máy tạo khói lạnh đám cưới',
    'Chính sách bảo hành & ship',
    'Nên chọn dung dịch khói nào?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    if (!textToSend) {
      setInput('');
    }

    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await aiService.chat(newMessages);
      setMessages([...newMessages, { role: 'assistant', content: response.content }]);
    } catch (error) {
      console.error('Error sending message to AI chatbot:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Xin lỗi bạn, hệ thống AI đang gặp chút sự cố nhỏ. Bạn vui lòng thử lại sau hoặc liên hệ Hotline: 0987654321 nhé!'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-44 right-8 z-[100]">
      {/* Bot Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed bottom-24 right-28 w-[350px] md:w-[380px] h-[520px] max-h-[80vh] bg-white border border-[#cadaee] rounded-[2rem] shadow-2xl shadow-blue-900/10 flex flex-col overflow-hidden z-[100]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1a365d] to-[#2b4c7e] text-white px-6 py-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center relative border border-white/20">
                  <Bot className="w-5 h-5 text-blue-200" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#1a365d] rounded-full" />
                </div>
                <div>
                  <h4 className="text-xs font-heading font-black uppercase tracking-widest flex items-center gap-1.5">
                    Trợ lý AI DuongDIY
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-current animate-pulse" />
                  </h4>
                  <span className="text-[10px] text-blue-200 font-medium">Hỗ trợ tư vấn 24/7</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-[#1a365d] text-white rounded-tr-none'
                        : 'bg-white border border-[#cadaee] text-[#1a365d]/90 rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#cadaee] rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Chips */}
            {messages.length === 1 && !isLoading && (
              <div className="px-5 py-2.5 flex flex-wrap gap-2 bg-slate-50/50 border-t border-[#cadaee]/50">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(s)}
                    className="text-[10px] font-black uppercase tracking-wider text-[#1a365d]/70 bg-white border border-[#cadaee] px-3 py-1.5 rounded-full hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-sm"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Footer Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-4 bg-white border-t border-[#cadaee] flex gap-2.5 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hỏi trợ lý AI điều gì đó..."
                className="flex-1 bg-slate-50 border border-[#cadaee] rounded-full px-4 py-2.5 text-xs text-slate-800 placeholder-[#1a365d]/40 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-full bg-[#1a365d] hover:bg-[#2b4c7e] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:hover:bg-[#1a365d]"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-gradient-to-tr from-[#1a365d] to-[#2b4c7e] text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-900/30 relative group"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1a365d] to-[#2b4c7e] animate-ping opacity-20 group-hover:hidden" />
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute right-full mr-4 px-4 py-2 bg-white text-[#1a365d] text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-blue-50">
            Tư vấn AI 24/7
          </span>
        )}
      </motion.button>
    </div>
  );
}
