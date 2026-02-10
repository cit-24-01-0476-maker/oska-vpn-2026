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

// --- DATA CONFIGURATION (UPDATED PRICES) ---

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
  { id: "mobile", name: "Mobile SIM Package", price: "LKR 200", period: "/ 30 Days", data: "100 GB", extra: "Unlimited GB = Rs.400", features: ["Dialog 547/797 & Zoom", "Hutch Social", "Airtel Zoom/TikTok/260", "30 Days Validity", "Fast Speed"], popular: true, color: "from-blue-400 to-blue-600", icon: Smartphone },
  { id: "router", name: "Router Package", price: "LKR 300", period: "/ 30 Days", data: "100 GB", extra: "Unlimited GB = Rs.800", features: ["Dialog Zoom (Router)", "SLT Zoom (Router)", "SLT Netflix (Router)", "High Speed V2Ray", "30 Days Validity"], popular: false, color: "from-cyan-400 to-cyan-600", icon: RouterIcon },
  { id: "fiber", name: "Fiber Package", price: "LKR 300", period: "/ 30 Days", data: "100 GB", extra: "Unlimited GB = Rs.800", features: ["SLT Fiber Zoom", "SLT Fiber Netflix", "Ultra Low Ping", "Gaming Optimized", "30 Days Validity"], popular: false, color: "from-purple-400 to-purple-600", icon: Wifi }
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

// --- LIVE BACKGROUND COMPONENT ---
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

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
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
      const systemPrompt = `You are OSKA, an elite cyberpunk AI assistant for a VPN service in Sri Lanka. 
      NEW PRICING (30 Days): 
      1. Mobile SIM (100 GB) - Rs. 200 (Unlimited GB: Rs. 400). Supports: Dialog 547/797, Hutch Social, Airtel Zoom/TikTok/260. 
      2. Router (100 GB) - Rs. 300 (Unlimited GB: Rs. 800). Supports: Dialog/SLT Zoom & Netflix Routers. 
      3. Fiber (100 GB) - Rs. 300 (Unlimited GB: Rs. 800). Supports: SLT Fiber Zoom/Netflix.
      If user asks how to buy: Tell them to go to 'Premium Store' or click 'Buy Now'.`;
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: input }] }], systemInstruction: { parts: [{ text: systemPrompt }] } }) });
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Connection intercepted. Please try again.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) { setMessages(prev => [...prev, { role: 'model', text: "Error: Neural link unstable." }]); } finally { setLoading(false); }
  };

  return (
    <>
      <motion.button whileHover={{ scale: 1.1, rotate: 180 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)] border border-white/20 text-white hover:shadow-cyan-500/50 transition-all">{isOpen ? <X size={24} /> : <Sparkles size={24} />}</motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.9 }} className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-96 bg-[#0a0a0f]/95 backdrop-blur-xl border border-cyan-500/50 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[500px]">
            <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 p-4 border-b border-cyan-500/30 flex items-center gap-2"><Bot size={20} className="text-cyan-400" /><div><h3 className="text-white font-bold text-sm tracking-wider">OSKA CYBER AI</h3><div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span><span className="text-xs text-cyan-400/80">Online</span></div></div></div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">{messages.map((msg, idx) => (<div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-cyan-600/20 text-cyan-100 border border-cyan-500/30 rounded-br-none shadow-lg shadow-cyan-500/10' : 'bg-[#1a1a24] text-gray-300 border border-white/10 rounded-bl-none'}`}>{msg.text}</div></div>))}{loading && (<div className="flex justify-start"><div className="bg-[#1a1a24] p-3 rounded-lg rounded-bl-none border border-white/10 flex gap-1"><span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span><span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></span><span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></span></div></div>)}<div ref={messagesEndRef} /></div>
            <div className="p-4 bg-[#12121a]/80 border-t border-white/10"><div className="flex gap-2"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask OSKA AI..." className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none placeholder-gray-600 focus:ring-1 focus:ring-cyan-500/50 transition-all" /><button onClick={handleSend} disabled={loading} className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-black transition-all disabled:opacity-50"><Send size={18} /></button></div></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- CORE COMPONENTS ---

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [{ id: 'home', label: 'Home' }, { id: 'free', label: 'Free Configs' }, { id: 'pricing', label: 'Premium Store' }, { id: 'tutorials', label: 'Tutorials' }];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full"><div className="flex items-center justify-between h-full"><div className="flex items-center gap-2 cursor-pointer group" onClick={() => setActiveTab('home')}><div className="relative"><Shield className="w-8 h-8 text-cyan-400 relative z-10 transition-transform group-hover:scale-110 duration-300" /><div className="absolute inset-0 bg-cyan-400 blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div></div><span className="text-2xl font-bold tracking-wider text-white">OSKA<span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">VPN</span></span></div><div className="hidden md:flex space-x-8">{menuItems.map((item) => (<button key={item.id} onClick={() => setActiveTab(item.id)} className={`relative text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg ${activeTab === item.id ? 'text-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>{item.label}{activeTab === item.id && (<motion.div layoutId="navbar-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />)}</button>))}</div><div className="md:hidden"><button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white p-2">{isOpen ? <X size={24} /> : <Menu size={24} />}</button></div></div></div>
      <AnimatePresence>{isOpen && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden bg-[#12121a]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden absolute w-full left-0 top-16"><div className="px-4 py-4 space-y-2">{menuItems.map((item) => (<button key={item.id} onClick={() => { setActiveTab(item.id); setIsOpen(false); }} className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors ${activeTab === item.id ? 'bg-cyan-400/10 text-cyan-400' : 'text-gray-300 hover:bg-white/5'}`}>{item.label}</button>))}</div></motion.div>)}</AnimatePresence>
    </nav>
  );
};

const ConfigCard = ({ config, highlighted }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(config.code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} className={`bg-[#12121a]/60 backdrop-blur-md border rounded-xl p-5 transition-all duration-300 group relative overflow-hidden ${highlighted ? 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)] ring-1 ring-cyan-400' : 'border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]'}`}>
      {highlighted && (<div className="absolute top-0 right-0 bg-cyan-400 text-black text-[10px] font-bold px-2 py-1 rounded-bl-lg z-20 flex items-center gap-1 shadow-lg"><Sparkles size={10} /> AI PICK</div>)}
      <div className={`absolute top-0 right-0 w-20 h-20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 transition-colors duration-500 ${highlighted ? 'bg-cyan-500/30' : 'bg-cyan-500/10 group-hover:bg-cyan-500/20'}`}></div>
      <div className="flex justify-between items-start mb-4 relative z-10"><div><div className="flex items-center gap-2 mb-1"><Globe size={18} className="text-purple-400 group-hover:text-purple-300 transition-colors" /><h3 className="font-bold text-lg text-white group-hover:text-cyan-200 transition-colors">{config.location}</h3></div><span className="text-xs bg-white/5 px-2 py-1 rounded text-cyan-300 font-mono border border-cyan-500/20">{config.protocol}</span></div><div className="text-right"><div className="flex items-center gap-1 justify-end text-green-400 text-sm font-bold"><Activity size={14} className="animate-pulse" /><span>{config.ping}</span></div><p className="text-xs text-gray-500 mt-1">{config.updated}</p></div></div>
      <div className="bg-black/40 p-3 rounded mb-4 font-mono text-xs text-gray-500 truncate border border-white/5 group-hover:border-white/10 transition-colors">{config.code}</div>
      <button onClick={handleCopy} className={`w-full py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 ${copied ? 'bg-green-500/20 text-green-400 border border-green-500/50' : highlighted ? 'bg-cyan-400 text-black border border-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-400/20' : 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]'}`}>{copied ? <><Check size={18} /> Copied</> : <><Copy size={18} /> Copy Config</>}</button>
    </motion.div>
  );
};

const OrderModal = ({ pkg, onClose }) => {
  const [name, setName] = useState('');
  const [device, setDevice] = useState('Android');
  const handleSubmit = (e) => { e.preventDefault(); window.open(`https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(`*NEW ORDER - OSKA VPN*\n\n📦 *Package:* ${pkg.name}\n💰 *Price:* ${pkg.price} ${pkg.period}\n🏷️ *Data:* ${pkg.data} / ${pkg.extra}\n👤 *Name:* ${name}\n📱 *Device:* ${device}\n\nI want to buy this package.`)}`, '_blank'); onClose(); };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-200">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#16161f] border border-cyan-400/30 rounded-2xl w-full max-w-md p-6 relative shadow-[0_0_50px_rgba(34,211,238,0.2)]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button><h2 className="text-2xl font-bold mb-1 text-white">Checkout</h2><p className="text-gray-400 text-sm mb-6">You selected: <span className="text-cyan-400 font-bold">{pkg.name}</span></p>
        <form onSubmit={handleSubmit} className="space-y-4"><div><label className="block text-sm text-gray-400 mb-1">Your Name</label><input required type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-colors" placeholder="Ex: Oshada" value={name} onChange={(e) => setName(e.target.value)} /></div><div><label className="block text-sm text-gray-400 mb-1">Device Type</label><select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-400 outline-none" value={device} onChange={(e) => setDevice(e.target.value)}><option value="Android">Android (v2rayNG)</option><option value="iOS">iOS (Shadowrocket)</option><option value="PC">PC / Laptop</option><option value="Router">Wi-Fi Router</option></select></div><button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 mt-4 transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]"><MessageCircle size={20} /> Buy via WhatsApp</button></form>
      </motion.div>
    </div>
  );
};

// --- PAGES ---

const HomeView = ({ setTab }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] w-full text-center px-4 relative overflow-hidden pt-10 pb-10">
    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs md:text-sm font-medium mb-6 animate-pulse">🚀 #1 High Speed V2Ray VPN in Sri Lanka</motion.div>
      <motion.h1 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight text-white leading-tight drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">UNLEASH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient">ULTIMATE</span><br/> FREEDOM</motion.h1>
      <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">Gaming, Streaming, and Browsing with 0% Lag. Secure, Fast, and Untraceable connections.</motion.p>
      
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button onClick={() => setTab('free')} className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 text-white transition-all font-bold backdrop-blur-sm flex items-center justify-center gap-2 w-full sm:w-auto hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"><Zap size={20} className="text-yellow-400"/> Get Free Configs</button>
        <button onClick={() => setTab('pricing')} className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2 w-full sm:w-auto transform hover:scale-105 duration-200"><Lock size={20} /> Buy Premium</button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-12 flex flex-col md:flex-row gap-6 w-full max-w-2xl px-4">
        <motion.a href="https://chat.whatsapp.com/LUE12DSAPkkK5Z9wirTV7n" target="_blank" whileHover={{ scale: 1.05 }} className="flex-1 flex items-center justify-between bg-[#25D366]/10 border border-[#25D366]/50 p-4 rounded-xl hover:bg-[#25D366]/20 transition-all cursor-pointer group shadow-[0_0_15px_rgba(37,211,102,0.2)]">
          <div className="flex items-center gap-3"><WhatsAppIcon className="w-8 h-8 text-[#25D366]" /><div className="text-left"><h3 className="text-white font-bold">Main Group</h3><p className="text-[#25D366] text-xs">Official Updates</p></div></div>
          <div className="flex items-center gap-2"><span className="text-white font-bold text-sm animate-pulse drop-shadow-[0_0_5px_#25D366]">JOIN NOW</span><ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" /></div>
        </motion.a>
        <motion.a href="https://chat.whatsapp.com/DAXjobEWqxs16rXFH3fk7L" target="_blank" whileHover={{ scale: 1.05 }} className="flex-1 flex items-center justify-between bg-[#25D366]/10 border border-[#25D366]/50 p-4 rounded-xl hover:bg-[#25D366]/20 transition-all cursor-pointer group shadow-[0_0_15px_rgba(37,211,102,0.2)]">
          <div className="flex items-center gap-3"><WhatsAppIcon className="w-8 h-8 text-[#25D366]" /><div className="text-left"><h3 className="text-white font-bold">Chat Group</h3><p className="text-[#25D366] text-xs">Community Support</p></div></div>
          <div className="flex items-center gap-2"><span className="text-white font-bold text-sm animate-pulse drop-shadow-[0_0_5px_#25D366]">JOIN NOW</span><ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" /></div>
        </motion.a>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-16 w-full max-w-6xl">
        {[{ icon: Zap, title: "Low Ping Gaming", desc: "Optimized routes for PUBG, COD, and FreeFire." }, { icon: Shield, title: "100% Secure", desc: "Your data is encrypted. No logs policy." }, { icon: Globe, title: "Unblock Everything", desc: "Access WhatsApp, YouTube & TikTok without limits." }].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + (i * 0.1) }} whileHover={{ y: -5 }} className="bg-[#12121a]/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:bg-[#12121a]/60 hover:border-cyan-500/30 transition-all duration-300 text-left flex flex-col items-center md:items-start text-center md:text-left hover:shadow-lg hover:shadow-cyan-900/20">
            <item.icon className="w-10 h-10 text-cyan-400 mb-4 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" /><h3 className="text-lg font-bold text-white">{item.title}</h3><p className="text-gray-400 text-sm mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const FreeView = () => {
  const [userGoal, setUserGoal] = useState('');
  const [recommendedId, setRecommendedId] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const getRecommendation = async () => { if (!userGoal.trim()) return; setIsAnalyzing(true); setRecommendedId(null); try { const apiKey = "AIzaSyDIPcbkvqZbJOy7pnQzt47EeeH6JpNII5w"; const prompt = `I have these V2Ray configs: ${JSON.stringify(FREE_CONFIGS.map(c => ({id: c.id, location: c.location, speed: c.speed})))}. User wants: "${userGoal}". Task: Which ID is best? Return ONLY the ID number (e.g. 1). If unsure, return 1.`; const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) }); const data = await response.json(); const id = parseInt(data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()); if (!isNaN(id)) setRecommendedId(id); } catch (e) { console.error(e); } finally { setIsAnalyzing(false); } };
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-10 px-4 max-w-6xl mx-auto min-h-screen">
      <div className="mb-10 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-sm"><div className="flex flex-col md:flex-row gap-4 items-center justify-between"><div><h2 className="text-xl font-bold text-white flex items-center gap-2"><Wand2 className="text-cyan-400" /> Smart Config Matcher</h2><p className="text-gray-400 text-sm">Tell AI what you want to do (e.g. "Gaming on Dialog" or "Netflix SLT")</p></div><div className="flex w-full md:w-auto gap-2"><input type="text" placeholder="I want to play COD Mobile..." className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-cyan-400 outline-none w-full md:w-64 transition-all focus:shadow-[0_0_10px_rgba(34,211,238,0.3)]" value={userGoal} onChange={(e) => setUserGoal(e.target.value)} /><button onClick={getRecommendation} disabled={isAnalyzing} className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50">{isAnalyzing ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />} {isAnalyzing ? "Analyzing..." : "Find Best"}</button></div></div></div>
      <div className="flex justify-between items-center mb-6"><div><h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Free V2Ray Configs</h1><p className="text-gray-400 text-sm">Updated automatically every 30 minutes.</p></div><button onClick={() => window.location.reload()} className="p-3 bg-white/5 rounded-full hover:bg-cyan-400 hover:text-black transition-colors text-white"><RefreshCw size={20} /></button></div>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">{FREE_CONFIGS.map(config => <ConfigCard key={config.id} config={config} highlighted={config.id === recommendedId} />)}</motion.div>
    </motion.div>
  );
};

const PricingView = () => {
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [userUsage, setUserUsage] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const handlePlanRecommendation = async () => { if (!userUsage.trim()) return; setIsProcessing(true); setAiRecommendation(null); try { const apiKey = "AIzaSyDIPcbkvqZbJOy7pnQzt47EeeH6JpNII5w"; const prompt = `I have these premium packages: ${JSON.stringify(PACKAGES.map(p => ({id: p.id, name: p.name, data: p.data, features: p.features})))}. User needs: "${userUsage}". Task: 1. Identify the BEST package ID (mobile, router, or fiber). 2. Write a 1-sentence reason why. Return ONLY valid JSON like: {"id": "mobile", "reason": "Because you need..."}`; const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } }) }); const data = await response.json(); const result = JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text || "{}"); if (result.id) setAiRecommendation(result); } catch (e) { console.error(e); } finally { setIsProcessing(false); } };
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-10"><h1 className="text-4xl font-bold mb-4 text-white">Premium Plans (30 Days)</h1><p className="text-gray-400">High speed, low ping, unlimited freedom.</p></div>
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 p-6 rounded-2xl mb-12 max-w-4xl mx-auto backdrop-blur-sm"><div className="flex items-center gap-3 mb-4"><BrainCircuit className="text-purple-400" size={24} /><h2 className="text-xl font-bold text-white">AI Plan Matcher</h2></div><p className="text-gray-300 text-sm mb-4">Not sure which plan to buy? Tell us what you do (e.g. "I play PUBG mostly" or "I need to download big movies") and AI will pick for you.</p><div className="flex flex-col sm:flex-row gap-3"><input type="text" placeholder="Describe your usage..." className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-400 outline-none transition-all focus:shadow-[0_0_10px_rgba(168,85,247,0.3)]" value={userUsage} onChange={(e) => setUserUsage(e.target.value)} /><button onClick={handlePlanRecommendation} disabled={isProcessing} className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50">{isProcessing ? <RefreshCw className="animate-spin" /> : <Sparkles />}{isProcessing ? "Thinking..." : "Find Best Plan"}</button></div>{aiRecommendation && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-purple-500/10 border border-purple-500/40 rounded-xl"><p className="text-purple-200 font-medium"><span className="text-white font-bold">AI Suggestion:</span> {aiRecommendation.reason}</p></motion.div>)}</div>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-3 gap-8 mb-20">{PACKAGES.map((pkg) => (<motion.div variants={itemVariants} whileHover={{ y: -10, boxShadow: "0 0 30px rgba(6, 182, 212, 0.15)" }} key={pkg.id} className={`relative bg-[#12121a]/60 backdrop-blur-md rounded-2xl p-8 border transition-all duration-300 flex flex-col ${pkg.id === aiRecommendation?.id ? 'border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.3)] scale-105 z-10 ring-1 ring-purple-400' : pkg.popular ? 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.15)] scale-105 z-10' : 'border-white/10 hover:border-white/20'}`}>{pkg.id === aiRecommendation?.id && <span className="absolute -top-3 right-4 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1"><Sparkles size={12}/> AI RECOMMENDED</span>}{pkg.popular && !aiRecommendation && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-400 text-black text-xs font-bold px-4 py-1 rounded-full shadow-lg">BEST SELLER</span>}<div className="flex items-center gap-3 mb-4"><div className={`p-3 rounded-lg bg-gradient-to-br ${pkg.color} bg-opacity-20`}><pkg.icon className="w-6 h-6 text-white" /></div><h3 className="text-xl font-bold text-gray-200">{pkg.name}</h3></div><div className="mb-6"><div className="flex items-baseline"><span className={`text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${pkg.color}`}>{pkg.price}</span><span className="text-gray-500 ml-2 text-sm">{pkg.period}</span></div><p className="text-white font-bold mt-2 flex items-center gap-2"><Server size={14} className="text-cyan-400"/> {pkg.data}</p><p className="text-cyan-400 text-sm font-semibold mt-1">➕ {pkg.extra}</p></div><ul className="space-y-4 mb-8 flex-1 border-t border-white/5 pt-6">{pkg.features.map((feat, i) => (<li key={i} className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle size={16} className="text-cyan-400 min-w-[16px]" />{feat}</li>))}</ul><button onClick={() => setSelectedPkg(pkg)} className={`w-full py-3 rounded-lg font-bold transition-all ${pkg.popular ? 'bg-cyan-400 text-black hover:bg-cyan-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'bg-white/10 text-white hover:bg-white/20'}`}>Buy Now</button></motion.div>))}</motion.div>
      <div className="mt-20"><h2 className="text-3xl font-bold text-center text-white mb-8 flex items-center justify-center gap-3"><Box className="text-cyan-400" /> Available V2Ray Packages</h2><motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 pb-20">{PROVIDER_PACKAGES.map((provider) => (<motion.div key={provider.id} variants={itemVariants} whileHover={{ y: -5, boxShadow: "0 0 20px rgba(255,255,255,0.05)" }} className={`bg-[#12121a]/60 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col items-center text-center transition-all hover:border-${provider.color.split('-')[1]}-500/50`}><div className={`w-12 h-12 rounded-full bg-gradient-to-br ${provider.color} flex items-center justify-center text-xl font-bold text-white mb-4 shadow-lg`}>{provider.name[0]}</div><h3 className="text-xl font-bold text-white mb-4">{provider.name}</h3><ul className="space-y-2 w-full">{provider.items.map((item, idx) => (<li key={idx} className="text-gray-300 text-xs bg-white/5 border border-white/5 rounded px-2 py-2 w-full">{item}</li>))}</ul></motion.div>))}</motion.div></div>
      {selectedPkg && <OrderModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />}
    </motion.div>
  );
};

const TutorialsView = () => {
  const [errorLog, setErrorLog] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const handleDiagnosis = async () => { if (!errorLog.trim()) return; setIsDiagnosing(true); setDiagnosis(''); try { const apiKey = "AIzaSyDIPcbkvqZbJOy7pnQzt47EeeH6JpNII5w"; const prompt = `You are a VPN expert. Analyze this V2Ray error log: "${errorLog}". Explain the issue in 1 simple sentence and suggest a fix. Keep it short.`; const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) }); const data = await response.json(); setDiagnosis(data.candidates?.[0]?.content?.parts?.[0]?.text || "Could not analyze."); } catch (e) { setDiagnosis("Error connecting to AI."); } finally { setIsDiagnosing(false); } };
  return (
    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="py-10 px-4 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-10 text-center text-white">Support & Tutorials</h1>
      <div className="bg-[#12121a]/60 backdrop-blur-md border border-red-500/30 rounded-2xl p-6 mb-10 shadow-[0_0_20px_rgba(239,68,68,0.1)]"><div className="flex items-center gap-3 mb-4"><Stethoscope className="text-red-400" /><h2 className="text-xl font-bold text-white">AI Error Diagnostics</h2></div><p className="text-gray-400 text-sm mb-4">Paste your V2Ray log error here (e.g., "io: read/write on closed pipe") and our AI will fix it.</p><div className="space-y-4"><textarea value={errorLog} onChange={(e) => setErrorLog(e.target.value)} placeholder="Paste error log here..." className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-red-400 outline-none h-24" /><button onClick={handleDiagnosis} disabled={isDiagnosing} className="bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50">{isDiagnosing ? "Analyzing..." : <> <AlertTriangle size={16}/> Analyze Error</>}</button>{diagnosis && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg"><h3 className="text-green-400 font-bold text-sm mb-1">AI Diagnosis:</h3><p className="text-gray-300 text-sm">{diagnosis}</p></motion.div>}</div></div>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 pb-20">
        <motion.div variants={itemVariants} className="bg-[#12121a]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-green-500/30 transition-colors"><div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-4"><Smartphone className="text-green-400 w-8 h-8" /><h2 className="text-xl font-bold text-white">Android (v2rayNG)</h2></div><ol className="list-decimal list-inside space-y-3 text-gray-400 ml-2"><li>Download <span className="text-green-400 font-bold">v2rayNG</span> from Play Store.</li><li>Copy a config from our Free Configs page.</li><li>Open app → Click <span className="text-white font-bold">+</span> icon (top right).</li><li>Select <span className="text-white bg-white/10 px-2 py-0.5 rounded text-sm">Import config from Clipboard</span>.</li><li>Tap the big <span className="text-white bg-green-600 px-2 py-0.5 rounded text-sm">V</span> button to connect.</li></ol></motion.div>
        <motion.div variants={itemVariants} className="bg-[#12121a]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-colors"><div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-4"><Smartphone className="text-blue-400 w-8 h-8" /><h2 className="text-xl font-bold text-white">iPhone (Shadowrocket)</h2></div><ol className="list-decimal list-inside space-y-3 text-gray-400 ml-2"><li>Get <span className="text-blue-400 font-bold">Shadowrocket</span> or <span className="text-blue-400 font-bold">FairVPN</span>.</li><li>Copy a config from the site.</li><li>Open the app (it detects clipboard automatically).</li><li>Tap <span className="text-white bg-blue-600 px-2 py-0.5 rounded text-sm">Add</span>.</li><li>Toggle the switch to connect.</li></ol></motion.div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-sans selection:bg-cyan-400 selection:text-black relative flex flex-col pt-16">
      <LiveBackground />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow w-full relative z-10"><AnimatePresence mode="wait">{activeTab === 'home' && <HomeView key="home" setTab={setActiveTab} />}{activeTab === 'free' && <FreeView key="free" />}{activeTab === 'pricing' && <PricingView key="pricing" />}{activeTab === 'tutorials' && <TutorialsView key="tutorials" />}</AnimatePresence></main>
      <AIChatWidget />
      <footer className="bg-black/80 backdrop-blur-md py-8 text-center text-gray-600 text-sm border-t border-white/5 relative z-10"><p className="flex items-center justify-center gap-2 mb-2"><Shield size={16} /> Secure V2Ray Network</p><p>© 2026 OSKA VPN. Made for Sri Lanka 🇱🇰</p></footer>
    </div>
  );
}
