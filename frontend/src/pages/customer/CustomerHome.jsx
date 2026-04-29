import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Facebook, 
  Twitter, 
  Instagram, 
  Globe 
} from 'lucide-react';
import homepageImg from '../../assets/images/homepage.png';

const TornEdge = ({ color = "white", flip = false }) => (
  <div className={`absolute left-0 right-0 z-20 w-full overflow-hidden ${flip ? 'top-[-1px] rotate-180' : 'bottom-[-1px]'}`} style={{ height: '80px' }}>
    <svg 
      viewBox="0 0 1440 100" 
      preserveAspectRatio="none" 
      className="w-full h-full block"
      style={{ filter: 'drop-shadow(0px -2px 3px rgba(0,0,0,0.05))' }}
    >
      <path 
        d="M0,0 C120,40 240,10 360,50 C480,90 600,20 720,60 C840,100 960,30 1080,70 C1200,110 1320,40 1440,80 L1440,100 L0,100 Z" 
        fill={color} 
      />
      <path 
        d="M0,20 C120,50 240,20 360,60 C480,100 600,30 720,70 C840,110 960,40 1080,80 C1200,120 1320,50 1440,90 L1440,100 L0,100 Z" 
        fill={color} 
        opacity="0.5"
      />
    </svg>
  </div>
);

const MenuItem = ({ name, price, description }) => (
  <motion.div 
    whileHover={{ y: -5, shadow: "0 10px 30px rgba(0,0,0,0.1)" }}
    className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-start group cursor-pointer"
  >
    <div>
      <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#c49b63] transition-colors">{name}</h3>
      <p className="text-sm text-slate-500 mt-1">{description}</p>
    </div>
    <span className="text-xl font-black text-[#c49b63]">${price}</span>
  </motion.div>
);

export default function CustomerHome() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="container mx-auto px-6 relative z-10 pt-20 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="max-w-2xl"
            >
              <span className="text-[#c49b63] font-bold tracking-[0.3em] uppercase text-sm mb-6 block">Now you can feel the energy</span>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8">
                Start your day with <br/>a perfect coffee
              </h1>
              <p className="text-slate-600 text-lg mb-8 max-w-lg leading-relaxed">
                Experience the finest blends and carefully roasted beans that awaken your senses and energize your entire day.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#c49b63] text-white px-10 py-4 rounded-full font-black text-xs tracking-widest uppercase hover:bg-slate-900 transition-all shadow-xl shadow-[#c49b63]/30"
              >
                Buy Now
              </motion.button>
            </motion.div>

            {/* Image Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#c49b63]/20 blur-3xl rounded-full transform scale-90"></div>
              <img 
                src={homepageImg} 
                alt="Coffee Display" 
                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl hover:-translate-y-4 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>

        {/* Torn Edge at Bottom */}
        <TornEdge color="white" />
      </section>

      {/* Video/About Section */}
      <section className="py-24 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative group cursor-pointer"
        >
          <img 
            src="/assets/process.png" 
            alt="Coffee Making" 
            className="rounded-2xl shadow-2xl w-full aspect-video object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-[#c49b63] rounded-full flex items-center justify-center text-white animate-pulse shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          <span className="text-[#c49b63] font-bold tracking-[0.2em] uppercase text-xs block">Live coffee making process</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            We Telecast our <br/>Coffee Making Live
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            We are here to listen from you deliver excellence. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
          </p>
          <img src="/assets/signature.png" alt="" className="h-12 opacity-50" />
        </div>
      </section>

      {/* Menu Section */}
      <section className="relative py-24 bg-slate-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src="/assets/pattern.png" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4">What kind of Coffee we serve for you</h2>
            <p className="text-slate-500 font-medium italic">Who are in extremely love with eco friendly system.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MenuItem name="Cappuccino" price="49" description="Usage of the internet is becoming more common due to rapid advance." />
            <MenuItem name="Americano" price="49" description="Usage of the internet is becoming more common due to rapid advance." />
            <MenuItem name="Espresso" price="49" description="Usage of the internet is becoming more common due to rapid advance." />
            <MenuItem name="Macchiato" price="49" description="Usage of the internet is becoming more common due to rapid advance." />
            <MenuItem name="Mocha" price="49" description="Usage of the internet is becoming more common due to rapid advance." />
            <MenuItem name="Coffee Latte" price="49" description="Usage of the internet is becoming more common due to rapid advance." />
            <MenuItem name="Piccolo Latte" price="49" description="Usage of the internet is becoming more common due to rapid advance." />
            <MenuItem name="Ristretto" price="49" description="Usage of the internet is becoming more common due to rapid advance." />
            <MenuItem name="Affogato" price="49" description="Usage of the internet is becoming more common due to rapid advance." />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-[#c49b63] text-white">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <span className="text-5xl font-black block mb-2">2536</span>
            <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Happy Clients</span>
          </div>
          <div>
            <span className="text-5xl font-black block mb-2">7562</span>
            <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Total Projects</span>
          </div>
          <div>
            <span className="text-5xl font-black block mb-2">2013</span>
            <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Cups Coffee</span>
          </div>
          <div>
            <span className="text-5xl font-black block mb-2">10536</span>
            <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Total Submitted</span>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative bg-[#121212] pt-32 pb-16 overflow-hidden">
        {/* Torn Edge at Top */}
        <TornEdge color="#121212" flip={true} />
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="/assets/hero.png" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 text-white">
          <div>
            <h4 className="text-xl font-bold mb-6">About Us</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.
            </p>
            <p className="text-slate-500 text-xs">
              Copyright ©2026 All rights reserved | This template is made with ❤️ by Colorlib
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-6">Stay update with our latest</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter Email" 
                className="bg-white/10 border border-white/20 px-4 py-3 rounded-l-lg flex-1 focus:outline-none focus:ring-1 focus:ring-[#c49b63]"
              />
              <button className="bg-[#c49b63] px-6 rounded-r-lg">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Follow Us</h4>
            <p className="text-slate-400 text-sm mb-6">Let us be social</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#c49b63] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#c49b63] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#c49b63] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#c49b63] transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
