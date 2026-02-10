import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Zap, Globe, Menu, X, Copy, Check, 
  Smartphone, Activity, RefreshCw, MessageCircle, 
  CheckCircle, Server, Lock, Bot, Send, Sparkles, 
  Wifi, Router as RouterIcon, Wand2, AlertTriangle, Stethoscope, BrainCircuit, Box, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ICONS ---
const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// --- DATA CONFIGURATION ---

const FREE_CONFIGS = [
  { id: 1, location: "Dialog Zoom 🇸🇬", protocol: "VLESS", speed: "High", ping: "42ms", updated: "Just now", code: "vless://35f947c3-4c61-4a6f-bba2-99f1f4b2014b@vip.v2raystorm.store:443?security=tls&sni=aka.ms&alpn=http/1.1&allowInsecure=1&fp=chrome&type=tcp&encryption=none#Freeplus" },
  { id: 2, location: "SLT Zoom 🇸🇬", protocol: "VLESS", speed: "Ultra", ping: "35ms", updated: "Just now", code: "vless://35f947c3-4c61-4a6f-bba2-99f1f4b2014b@vip.v2raystorm.store:443?security=tls&sni=zoom.us&alpn=http/1.1&allowInsecure=1&fp=chrome&type=tcp&encryption=none#Freeplus" },
  { id: 3, location: "SLT Netflix 🇸🇬", protocol: "VLESS", speed: "High", ping: "38ms", updated: "Just now", code: "vless://35f947c3-4c61-4a6f-bba2-99f1f4b2014b@vip.v2raystorm.store:443?security=tls&sni=netflix.com&alpn=http/1.1&allowInsecure=1&fp=chrome&type=tcp&encryption=none#Freeplus" },
  { id: 4, location: "Hutch Zoom 🇸🇬", protocol: "VLESS", speed: "Medium", ping: "50ms", updated: "Just now", code: "vless://35f947c3-4c61-4a6f-bba2-99f1f4b2014b@vip.v2raystorm.store:443?security=tls&sni=teams.microsoft.com&alpn=http/1.1&allowInsecure=1&fp=chrome&type=tcp&encryption=none#Freeplus" },
  { id: 5, location: "Hutch Social 🇸🇬", protocol: "VLESS", speed: "High", ping: "48ms", updated: "Just now", code: "vless://35f947c3-4c61-4a6f-bba2-99f1f4b2014b@vip.v2raystorm.store:443?security=tls&sni=t.me&alpn=http/1.1&allowInsecure=1&fp=chrome&type=tcp&encryption=none#Freeplus" },
  { id: 6, location: "Airtel/Dialog TikTok 🇸🇬", protocol: "VLESS", speed: "Ultra", ping: "40ms", updated: "Just now", code: "vless://35f947c3-4c61-4a6f-bba2-99f1f4b2014b@vip.v2raystorm.store:443?security=tls&sni=tiktok.com&alpn=http/1.1&allowInsecure=1&fp=chrome&type=tcp&encryption=none#Freeplus" },
  { id: 7, location: "Airtel Zoom 🇸🇬", protocol: "VLESS", speed: "High", ping: "45ms", updated: "Just now", code: "vless://35f947c3-4c61-4a6f-bba2-99f1f4b2014b@vip.v2raystorm.store:443?security=tls&sni=m.zoom.us&alpn=http/1.1&allowInsecure=1&fp=chrome&type=tcp&encryption=none#Freeplus" },
  { id: 8, location: "Airtel 260 🇸🇬", protocol: "VLESS", speed: "High", ping: "44ms", updated: "Just now", code: "vless://35f947c3-4c61-4a6f-bba2-99f1f4b2014b@vip.v2raystorm.store:443?security=tls&sni=m.youtube.com&alpn=http/1.1&allowInsecure=1&fp=chrome&type=tcp&encryption=none#Freeplus" }
];

const PACKAGES = [
  { 
    id: "router", 
    name: "Router Package", 
    price: "Rs. 300", 
    period: "/ 30 Days", 
    data: "100 GB", 
    unlimited: "Unlimited GB = Rs. 800",
    features: ["Dialog ZOOM (Router)", "SLT Router ZOOM", "SLT Router Netflix", "High Speed V2Ray"], 
    popular: false, 
    color: "from-cyan-400 to-cyan-600", 
    icon: RouterIcon 
  },
  { 
    id: "fiber", 
    name: "Fiber Package", 
    price: "Rs. 300", 
    period: "/ 30 Days", 
    data: "100 GB", 
    unlimited: "Unlimited GB = Rs. 800",
    features: ["SLT Fiber ZOOM", "SLT Fiber Netflix", "Ultra Low Ping", "Gaming Optimized"], 
    popular: false, 
    color: "from-purple-400 to-purple-600", 
    icon: Wifi 
  },
  { 
    id: "mobile", 
    name: "Mobile SIM Package", 
    price: "Rs. 200", 
    period: "/ 30 Days", 
    data: "100 GB", 
    unlimited: "Unlimited GB = Rs. 400",
    features: ["Dialog 547 / 797 & Zoom", "Hutch Social", "Airtel Zoom/TikTok/260", "Any Mobile SIM"], 
    popular: true, 
    color: "from-orange-400 to-red-600", 
    icon: Smartphone 
  }
];

const PROVIDER_PACKAGES = [
  { id: "dialog", name: "Dialog", color: "from-red-600 to-orange-600", items: ["547 / 797 SIM Packages", "ZOOM (Router)", "ZOOM SIM Package"] },
  { id: "hutch", name: "Hutch", color: "from-orange-500 to-yellow-500", items: ["Social Media Package"] },
  { id: "airtel", name: "Airtel", color: "from-red-500 to-pink-600", items: ["ZOOM Package", "TikTok Package", "YouTube 260 SIM Package"] },
  { id: "slt", name: "SLT", color: "from-blue-600 to-cyan-500", items: ["Router ZOOM Package", "Router Netflix Package"] },
  { id: "fiber", name: "Fiber", color: "from-green-500 to-emerald-600", items: ["ZOOM Package", "Netflix Package"] }
];

const ADMIN_PHONE = "94754565755";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

// --- LIVE BACKGROUND COMPONENT (DIGITAL RAIN) ---
const LiveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼدهペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        
        const isCyan = Math.random() > 0.5;
        ctx.fillStyle = isCyan ? '#22d3ee' : '#a855f7';
        
        if (Math.random() > 0.98) {
           ctx.shadowBlur = 10;
           ctx.shadowColor = isCyan ? '#22d3ee' : '#a855f7';
           ctx.fillStyle = '#ffffff'; 
        } else {
           ctx.shadowBlur = 0;
        }

        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a0a0f]">
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px]" />
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1], x: [0, 100, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-cyan-900/20 rounded-full blur-[120px]" />
      <canvas ref={canvasRef} className="absolute inset-0 block opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none"></div>
    </div>
  );
};

// --- AI COMPONENTS ---

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'model', text: 'Initiating System... I am OSKA AI. How can I assist with your secure connection today?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const apiKey = "AIzaSyDIPcbkvqZbJOy7pnQzt47EeeH6JpNII5w";
      const systemPrompt = `You are OSKA VPN AI. NEW PRICES: Mobile SIM 100GB-Rs200, Unlimited-Rs400. Router/Fiber 100GB-Rs300, Unlimited-Rs800.`;
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: input }] }], systemInstruction: { parts: [{ text: systemPrompt }] } }) });
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Link Error.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) { setMessages(prev => [...prev, { role: 'model', text: "Error." }]); } finally { setLoading(false); }
  };

  return (
    <>
      <motion.button whileHover={{ scale: 1.1, rotate: 180 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)] border border-white/20 text-white hover:shadow-cyan-500/50 transition-all">{isOpen ? <X size={24} /> : <Sparkles size={24} />}</motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.9 }} className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-96 bg-[#0a0a0f]/95 backdrop-blur-xl border border-cyan-500/50 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[500px]">
            <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 p-4 border-b border-cyan-500/30 flex items-center gap-2"><Bot size={20} className="text-cyan-400" /><div><h3 className="text-white font-bold text-sm tracking-wider">OSKA CYBER AI</h3></div></div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">{messages.map((msg, idx) => (<div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-cyan-600/20 text-cyan-100 border border-cyan-500/30' : 'bg-[#1a1a24] text-gray-300'}`}>{msg.text}</div></div>))}{loading && (<div className="flex justify-start text-cyan-400">...</div>)}<div ref={messagesEndRef} /></div>
            <div className="p-4 bg-[#12121a]/80 border-t border-white/10 flex gap-2"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none" /><button onClick={handleSend} className="p-2 text-cyan-400"><Send size={18} /></button></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- NAVBAR ---
const Navbar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [{ id: 'home', label: 'Home' }, { id: 'free', label: 'Free Configs' }, { id: 'pricing', label: 'Premium Store' }, { id: 'tutorials', label: 'Tutorials' }];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}><Shield className="w-8 h-8 text-cyan-400" /><span className="text-2xl font-bold tracking-wider text-white">OSKA<span className="text-cyan-400">VPN</span></span></div>
        <div className="hidden md:flex space-x-8">{menuItems.map((item) => (<button key={item.id} onClick={() => setActiveTab(item.id)} className={`text-sm font-medium transition-all ${activeTab === item.id ? 'text-cyan-400' : 'text-gray-400'}`}>{item.label}</button>))}</div>
        <div className="md:hidden"><button onClick={() => setIsOpen(!isOpen)} className="text-gray-400">{isOpen ? <X size={24} /> : <Menu size={24} />}</button></div>
      </div>
    </nav>
  );
};

// --- VIEWS ---

const HomeView = ({ setTab }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] w-full text-center px-4 relative pt-10 pb-10">
    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
      <h1 className="text-5xl md:text-8xl font-extrabold mb-6 text-white leading-tight">UNLEASH <span className="text-cyan-400">ULTIMATE</span> FREEDOM</h1>
      <p className="text-lg text-gray-400 mb-10 max-w-2xl">Gaming, Streaming, and Browsing with 0% Lag.</p>
      <div className="flex gap-4">
        <button onClick={() => setTab('free')} className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold">Get Free Configs</button>
        <button onClick={() => setTab('pricing')} className="px-8 py-4 rounded-full bg-cyan-500 text-black font-bold">Buy Premium</button>
      </div>
      <div className="mt-12 flex flex-col md:flex-row gap-6 w-full max-w-2xl px-4">
        <a href="https://chat.whatsapp.com/LUE12DSAPkkK5Z9wirTV7n" target="_blank" className="flex-1 flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/50 p-4 rounded-xl"><WhatsAppIcon className="w-8 h-8 text-[#25D366]" /><div className="text-left"><h3 className="text-white font-bold">Main Group</h3></div></a>
        <a href="https://chat.whatsapp.com/DAXjobEWqxs16rXFH3fk7L" target="_blank" className="flex-1 flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/50 p-4 rounded-xl"><WhatsAppIcon className="w-8 h-8 text-[#25D366]" /><div className="text-left"><h3 className="text-white font-bold">Chat Group</h3></div></a>
      </div>
    </div>
  </motion.div>
);

const FreeView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 px-4 max-w-6xl mx-auto min-h-screen">
    <h1 className="text-3xl font-bold text-white mb-10">Free V2Ray Configs</h1>
    <div className="grid md:grid-cols-3 gap-6">
      {FREE_CONFIGS.map(c => (
        <div key={c.id} className="bg-[#12121a]/60 border border-white/10 p-5 rounded-xl">
          <h3 className="font-bold text-white mb-2">{c.location}</h3>
          <p className="text-xs text-gray-500 truncate mb-4">{c.code}</p>
          <button onClick={() => {navigator.clipboard.writeText(c.code); alert('Copied!');}} className="w-full py-2 bg-cyan-500 text-black font-bold rounded-lg">Copy Config</button>
        </div>
      ))}
    </div>
  </motion.div>
);

const PricingView = () => {
  const [selectedPkg, setSelectedPkg] = useState(null);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16"><h1 className="text-4xl font-bold text-white">Premium Store</h1></div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {PACKAGES.map((pkg) => (
          <motion.div key={pkg.id} whileHover={{ y: -5 }} className={`bg-[#12121a]/80 border ${pkg.popular ? 'border-orange-500 shadow-lg shadow-orange-500/10' : 'border-white/10'} rounded-3xl p-8 flex flex-col relative overflow-hidden`}>
            {pkg.popular && <span className="absolute top-0 right-0 bg-orange-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl">POPULAR</span>}
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${pkg.color} w-fit mb-6`}><pkg.icon className="text-white w-8 h-8" /></div>
            <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
            
            {/* PRICE OPTIONS BOXES */}
            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-center"><span className="text-gray-400">Standard</span><span className="text-white font-bold">{pkg.data}</span></div>
                <div className="text-2xl font-black text-cyan-400 mt-1">{pkg.price}</div>
              </div>
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <div className="flex justify-between items-center"><span className="text-cyan-400 font-bold">Unlimited</span><span className="text-white">♾️</span></div>
                <div className="text-2xl font-black text-cyan-400 mt-1">{pkg.unlimited.split('=')[1].trim()}</div>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">{pkg.features.map((f, i) => (<li key={i} className="flex items-center gap-2 text-sm text-gray-400"><CheckCircle size={14} className="text-cyan-400" />{f}</li>))}</ul>
            <button onClick={() => setSelectedPkg(pkg)} className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-cyan-500 transition-colors">Order Now</button>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        {PROVIDER_PACKAGES.map(p => (
          <div key={p.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
            <h3 className="font-bold text-white">{p.name}</h3>
            <div className="text-[10px] text-gray-500 mt-2 space-y-1">{p.items.map((it, i) => <div key={i}>{it}</div>)}</div>
          </div>
        ))}
      </div>

      {selectedPkg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
          <div className="bg-[#16161f] border border-white/10 p-6 rounded-3xl w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Confirm Order</h2>
            <p className="text-gray-400 text-sm mb-6">Contact Admin via WhatsApp to get your login.</p>
            <button onClick={() => {window.open(`https://wa.me/${ADMIN_PHONE}?text=I want to buy ${selectedPkg.name}`, '_blank'); setSelectedPkg(null);}} className="w-full bg-green-500 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2"><MessageCircle size={18} /> WhatsApp</button>
            <button onClick={() => setSelectedPkg(null)} className="w-full mt-2 text-gray-500 text-sm">Cancel</button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const TutorialsView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 px-4 max-w-4xl mx-auto min-h-screen">
    <h1 className="text-3xl font-bold text-white mb-10">Tutorials</h1>
    <div className="space-y-6">
      <div className="p-6 bg-white/5 border border-white/10 rounded-2xl"><h3 className="font-bold text-green-400 mb-2">Android</h3><p className="text-gray-400 text-sm">Download v2rayNG from Play Store.</p></div>
      <div className="p-6 bg-white/5 border border-white/10 rounded-2xl"><h3 className="font-bold text-blue-400 mb-2">iOS</h3><p className="text-gray-400 text-sm">Download Shadowrocket or FairVPN.</p></div>
    </div>
  </motion.div>
);

// --- MAIN APP ---
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 selection:bg-cyan-400 selection:text-black">
      <LiveBackground />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="relative z-10"><AnimatePresence mode="wait">
        {activeTab === 'home' && <HomeView key="h" setTab={setActiveTab} />}
        {activeTab === 'free' && <FreeView key="f" />}
        {activeTab === 'pricing' && <PricingView key="p" />}
        {activeTab === 'tutorials' && <TutorialsView key="t" />}
      </AnimatePresence></main>
      <AIChatWidget />
    </div>
  );
}
