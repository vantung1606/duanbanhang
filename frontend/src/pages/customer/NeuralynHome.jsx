import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Facebook, 
  Twitter, 
  Instagram, 
  Globe,
  Search,
  ShoppingCart,
  Menu as MenuIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TornEdge = ({ color = "white", flip = false }) => (
  <div className={`absolute left-0 right-0 z-20 w-full overflow-hidden ${flip ? 'top-[-1px] rotate-180' : 'bottom-[-1px]'}`} style={{ height: '100px' }}>
    <svg 
      viewBox="0 0 1440 100" 
      preserveAspectRatio="none" 
      className="w-full h-full block"
    >
      <path 
        d="M0,50 C100,20 200,80 300,50 C400,20 500,80 600,50 C700,20 800,80 900,50 C1000,20 1100,80 1200,50 C1300,20 1400,80 1440,50 L1440,100 L0,100 Z" 
        fill={color} 
      />
      <path 
        d="M0,60 C100,35 200,85 300,60 C400,35 500,85 600,60 C700,35 800,85 900,60 C1000,35 1100,85 1200,60 C1300,35 1400,85 1440,60 L1440,100 L0,100 Z" 
        fill={color} 
        opacity="0.3"
      />
    </svg>
  </div>
);

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-12 flex items-center justify-between bg-black/20 backdrop-blur-md border-b border-white/10 transition-all duration-300">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-[#c49b63] rounded-lg flex items-center justify-center text-white font-black text-xl italic">C</div>
      <span className="text-white font-black text-2xl tracking-tighter uppercase italic">Cafe</span>
    </div>
    
    <div className="hidden md:flex items-center gap-10">
      {['Home', 'About', 'Coffee', 'Review', 'Blog', 'Pages'].map((item) => (
        <a key={item} href={`#${item.toLowerCase()}`} className="text-white text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#c49b63] transition-colors">{item}</a>
      ))}
    </div>

    <div className="flex items-center gap-6 text-white">
      <Search className="w-5 h-5 cursor-pointer hover:text-[#c49b63]" />
      <div className="relative">
        <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-[#c49b63]" />
        <span className="absolute -top-2 -right-2 bg-[#c49b63] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
      </div>
      <Link to="/login" className="bg-[#c49b63] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
        Login
      </Link>
    </div>
  </nav>
);

const MenuItem = ({ name, price, description }) => (
  <motion.div 
    whileHover={{ y: -8, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
    className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/50 flex flex-col justify-between group h-full shadow-sm"
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-2xl font-black text-slate-800 tracking-tighter group-hover:text-[#c49b63] transition-colors">{name}</h3>
      <span className="text-xl font-black text-[#c49b63]">${price}</span>
    </div>
    <p className="text-slate-500 font-medium leading-relaxed text-sm">
      {description}
    </p>
  </motion.div>
);

export default function NeuralynHome() {
  return (
    <div className="bg-white font-sans selection:bg-[#c49b63] selection:text-white h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth custom-scrollbar">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center pt-20 overflow-hidden snap-start" id="home">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 scale-105 animate-slow-zoom">
          <img 
            src="/assets/hero.png" 
            alt="Coffee Shop Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>

        <div className="container mx-auto px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-2xl text-center lg:text-left"
          >
            <span className="text-[#c49b63] font-black tracking-[0.5em] uppercase text-xs mb-8 block">Now you can feel the energy</span>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-12">
              Start your day <br/>with a <br/><span className="text-[#c49b63]">black Coffee</span>
            </h1>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#c49b63', color: 'white' }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-12 py-5 rounded-full font-black text-xs tracking-[0.3em] uppercase transition-all shadow-2xl"
            >
              Buy Now
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
            className="hidden lg:block relative"
          >
            <div className="absolute -inset-20 bg-[#c49b63]/20 blur-[100px] rounded-full animate-pulse" />
            <motion.img 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              src="/assets/cup.png" 
              alt="Coffee Cup" 
              className="relative z-10 w-[500px] h-auto drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        </div>

        <TornEdge />
      </section>

      {/* About Video Section */}
      <section className="py-32 container mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center snap-start h-screen" id="about">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)]"
        >
          <img 
            src="/assets/process.png" 
            alt="Process" 
            className="w-full aspect-video object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-24 h-24 bg-[#c49b63] rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
              <Play className="w-10 h-10 fill-current ml-1" />
            </div>
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 right-10 w-32 h-32 border border-white/30 rounded-full flex items-center justify-center"
          >
             <div className="w-2 h-2 bg-white rounded-full" />
          </motion.div>
        </motion.div>

        <div className="space-y-10">
          <span className="text-[#c49b63] font-black tracking-[0.3em] uppercase text-[10px] block">Live coffee making process</span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter">
            We Telecast our <br/>Coffee Making Live
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed text-lg italic">
            "We are here to listen from you deliver excellence. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim."
          </p>
          <img src="/assets/signature.png" alt="Signature" className="h-16 opacity-80" />
        </div>
      </section>

      {/* Menu/Serve Section */}
      <section className="relative py-32 bg-slate-50/50 overflow-hidden snap-start h-screen flex flex-col justify-center" id="coffee">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none scale-150">
          <img src="/assets/pattern.png" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="container mx-auto px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-24">
            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter">What kind of Coffee we serve for you</h2>
            <p className="text-[#c49b63] font-bold tracking-widest text-xs uppercase">Who are in extremely love with eco friendly system.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { name: "Cappuccino", price: "49" },
              { name: "Americano", price: "49" },
              { name: "Espresso", price: "49" },
              { name: "Macchiato", price: "49" },
              { name: "Mocha", price: "49" },
              { name: "Coffee Latte", price: "49" },
              { name: "Piccolo Latte", price: "49" },
              { name: "Ristretto", price: "49" },
              { name: "Affogato", price: "49" },
            ].map((item, idx) => (
              <MenuItem 
                key={idx} 
                name={item.name} 
                price={item.price} 
                description="Usage of the internet is becoming more common due to rapid advance." 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery/Images Section */}
      <section className="py-32 container mx-auto px-12 snap-start h-screen flex flex-col justify-center">
        <div className="text-center mb-24">
           <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Our Coffee Gallery</h2>
        </div>
        <div className="grid grid-cols-12 gap-6 h-[800px]">
          <div className="col-span-12 md:col-span-4 h-full flex flex-col gap-6">
            <div className="flex-1 rounded-[3rem] overflow-hidden"><img src="/assets/hero.png" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>
            <div className="flex-1 rounded-[3rem] overflow-hidden"><img src="/assets/process.png" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>
          </div>
          <div className="col-span-12 md:col-span-4 h-full rounded-[3.5rem] overflow-hidden">
            <img src="/assets/hero.png" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="col-span-12 md:col-span-4 h-full flex flex-col gap-6">
            <div className="flex-[2] rounded-[3rem] overflow-hidden"><img src="/assets/process.png" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>
            <div className="flex-1 rounded-[3rem] overflow-hidden"><img src="/assets/hero.png" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-32 bg-[#c49b63] relative overflow-hidden snap-start h-screen flex flex-col justify-center">
        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
           <span className="text-[30vw] font-black tracking-tighter text-white">COFFEE</span>
        </div>
        <div className="container mx-auto px-12 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10 text-white">
          {[
            { v: "2536", l: "Happy Clients" },
            { v: "7562", l: "Total Projects" },
            { v: "2013", l: "Cups Coffee" },
            { v: "10536", l: "Total Submitted" }
          ].map((stat, i) => (
            <div key={i} className="space-y-4">
              <span className="text-6xl md:text-8xl font-black block tracking-tighter">{stat.v}</span>
              <span className="text-xs font-black uppercase tracking-[0.3em] opacity-80">{stat.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News / Blog Section */}
      <section className="py-32 container mx-auto px-12 snap-start h-screen flex flex-col justify-center" id="blog">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">Latest From Our Blog</h2>
          <p className="text-[#c49b63] font-bold tracking-widest text-xs uppercase">Keep up with the latest trends and stories.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[1, 2].map(i => (
            <motion.div key={i} whileHover={{ y: -10 }} className="space-y-8">
              <div className="rounded-[4rem] overflow-hidden aspect-video shadow-2xl">
                <img src="/assets/hero.png" className="w-full h-full object-cover" />
              </div>
              <div className="px-6 space-y-4">
                <div className="flex gap-4">
                   <span className="px-4 py-1 rounded-full border border-slate-200 text-[10px] font-black uppercase text-slate-400">Travel</span>
                   <span className="px-4 py-1 rounded-full border border-slate-200 text-[10px] font-black uppercase text-slate-400">Lifestyle</span>
                </div>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight leading-tight hover:text-[#c49b63] cursor-pointer transition-colors">Portable latest Fashion for young women</h3>
                <p className="text-slate-500 font-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c49b63]">31st January, 2026</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative bg-[#0a0a0a] pt-48 pb-20 overflow-hidden snap-start h-screen flex flex-col justify-center">
        <TornEdge color="#0a0a0a" flip={true} />
        
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="/assets/hero.png" 
            alt="" 
            className="w-full h-full object-cover grayscale"
          />
        </div>

        <div className="container mx-auto px-12 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-24 text-white">
          <div className="space-y-8">
            <h4 className="text-2xl font-black tracking-tighter">About Us</h4>
            <p className="text-slate-500 font-medium leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.
            </p>
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest leading-loose">
              Copyright ©2026 All rights reserved | This template is made with ❤️ by Colorlib
            </p>
          </div>

          <div className="space-y-8">
            <h4 className="text-2xl font-black tracking-tighter">Newsletter</h4>
            <p className="text-slate-500 font-medium">Stay update with our latest news and offers.</p>
            <div className="flex group">
              <input 
                type="email" 
                placeholder="Enter Email" 
                className="bg-white/5 border border-white/10 px-8 py-5 rounded-l-full flex-1 focus:outline-none focus:border-[#c49b63] text-sm"
              />
              <button className="bg-[#c49b63] px-10 rounded-r-full hover:bg-[#b38a53] transition-colors">
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-2xl font-black tracking-tighter">Follow Us</h4>
            <p className="text-slate-500 font-medium">Let us be social and stay connected.</p>
            <div className="flex gap-6">
              {[Facebook, Twitter, Instagram, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#c49b63] transition-all hover:-translate-y-2">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Global Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite ease-in-out;
        }
      `}} />
    </div>
  );
}
