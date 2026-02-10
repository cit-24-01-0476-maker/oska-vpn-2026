import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Zap, Globe, Menu, X, Copy, Check, 
  Smartphone, Activity, RefreshCw, MessageCircle, 
  CheckCircle, Server, Lock, Bot, Send, Sparkles, 
  Wifi, Router as RouterIcon, Wand2, AlertTriangle, Stethoscope, BrainCircuit, Box, ArrowRight,
  Newspaper, Radio, Clock, Bell
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
  { id: 1, location: "SLT Netflix 🇸🇬", protocol: "Trojan", speed: "Ultra", ping: "28ms", updated: "Just now", code: "nm-trojan://6fTISs8DA8cRHqVc4nlIX/24aemt45b7QG+QI8Zsi4ZjNdm2uFzFTaaz9pijBBQNuDJmzYhtfb/wNyCUp9v0mfgkbLVqaRqZQoYF+ej3EGBtmtN+GZevtLz9i6u8Vf/GeAwQbL2ms3FYvcqLbKrmJCyYpt06WdC4UR2zMPmSy1ec4uW7IkquvggdMs9VdNZm" },
  { id: 2, location: "Dialog Zoom 🇸🇬", protocol: "VLESS", speed: "High", ping: "42ms", updated: "Just now", code: "vless://35f947c3-4c61-4a6f-bba2-99f1f4b2014b@vip.v2raystorm.store:443?security=tls&sni=aka.ms&alpn=http/1.1&allowInsecure=1&fp=chrome&type=tcp&encryption=none#Freeplus" },
  { id: 3, location: "SLT Zoom 🇸🇬", protocol: "VLESS", speed: "Ultra", ping: "35ms", updated: "Just now", code: "vless://35f947c3-4c61-4a6f-bba2-99f1f4b2014b@vip.v2raystorm.store:443?security=tls&sni=zoom.us&alpn=http/1.1&allowInsecure=1&fp=chrome&type=tcp&encryption=none#Freeplus" },
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

const TECH_NEWS = [
  { title: "Quantum Encryption", desc: "New protocols are making VPNs even more secure.", time: "2h ago" },
  { title: "SLT 5G Expansion", desc: "Speeds reaching up to 1Gbps in major cities.", time: "5h ago" },
  { title: "V2Ray Evolution", desc: "VLESS Reality protocol becomes the new industry standard.", time: "Yesterday" }
];

const TICKER_MESSAGES = [
  "🔥 OSKA VPN 2.0 IS LIVE",
  "⚡ NEW HIGH SPEED SINGAPORE SERVERS ADDED",
  "🛡️ ZERO-LOG POLICY VERIFIED",
  "🎮 LOW PING GAMING OPTIMIZED FOR DIALOG & SLT",
  "🌍 UNBLOCK ALL SOCIAL MEDIA NETWORKS INSTANTLY"
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

// --- LIVE BACKGROUND ---
const LiveBackground = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); };
    const handleMouseMove = (event) => { mouse.current.x = event.x; mouse.current.y = event.y; };
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    class Particle {
      constructor(x, y) { this.x = x; this.y = y; this.size = Math.random() * 2 + 0.5; this.baseX = this.x; this.baseY = this.y; this.density = (Math.random() * 30) + 1; }
      draw() { ctx.fillStyle = 'rgba(34, 211, 238, 0.8)'; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.closePath(); ctx.fill(); }
      update() {
        let dx = mouse.current.x - this.x; let dy = mouse.current.y - this.y; let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance; let forceDirectionY = dy / distance; let maxDistance = mouse.current.radius;
        let force = (maxDistance - distance) / maxDistance; let directionX = forceDirectionX * force * this.density; let directionY = forceDirectionY * force * this.density;
        if (distance < mouse.current.radius) { this.x -= directionX; this.y -= directionY; } else {
          if (this.x !== this.baseX) { let dx = this.x - this.baseX; this.x -= dx / 10; }
          if (this.y !== this.baseY) { let dy = this.y - this.baseY; this.y -= dy / 10; }
        }
      }
    }
    function init() {
      particlesArray = []; const numberOfParticles = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < numberOfParticles; i++) { let x = Math.random() * canvas.width; let y = Math.random() * canvas.height; particlesArray.push(new Particle(x, y)); }
    }
    function connect() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x; let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - (distance / 100)) * 0.2})`; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke();
          }
        }
      }
    }
    function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].draw(); particlesArray[i].update(); } connect(); requestAnimationFrame(animate); }
    init(); animate();
    return () => { window.removeEventListener('resize', handleResize); window.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050508]">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,78,113,0.15)_0%,rgba(5,5,8,1)_80%)]"></div>
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
};

// --- UPDATE PANEL COMPONENT ---
const UpdatePanel = () => (
  <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="fixed right-4 top-24 z-[45] hidden lg:block w-64">
    <div className="bg-[#0a0a0f]/90 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-4 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
      <div className="flex items-center gap-2 mb-3 border-b border-cyan-500/20 pb-2">
        <Bell className="text-cyan-400 animate-bounce" size={18} />
        <h3 className="text-white font-bold text-sm tracking-widest uppercase">Update Panel</h3>
      </div>
      <div className="space-y-3">
        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-2">
          <p className="text-cyan-300 text-[11px] font-bold uppercase animate-pulse">● New Update</p>
          <p className="text-white text-xs mt-1">SLT Netflix Free Config updated for 15 Days! 🚀</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-2">
          <p className="text-gray-400 text-[10px]">10 Feb 2026</p>
          <p className="text-gray-300 text-xs">All free servers optimized for low latency.</p>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- TECH TICKER ---
const TechTicker = () => (
  <div className="bg-[#0a0a0f]/80 backdrop-blur-md border-y border-white/5 py-2 overflow-hidden whitespace-nowrap relative z-10">
    <div className="flex animate-marquee">
      {[...TICKER_MESSAGES, ...TICKER_MESSAGES].map((msg, i) => (
        <span key={i} className="mx-8 text-[10px] md:text-xs font-bold tracking-[0.2em] text-cyan-400/80 flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" /> {msg}
        </span>
      ))}
    </div>
    <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-marquee { display: inline-flex; animation: marquee 40s linear infinite; }`}</style>
  </div>
);

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
      const systemPrompt = `You are OSKA AI assistant for a VPN service in Sri Lanka.`;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: input }] }], systemInstruction: { parts: [{ text: systemPrompt }] } }) });
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Connection intercepted.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) { setMessages(prev => [...prev, { role: 'model', text: "Error: Neural link unstable." }]); } finally { setLoading(false); }
  };

  return (
    <>
      <motion.button whileHover={{ scale: 1.1, rotate: 180 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)] border border-white/20 text-white hover:shadow-cyan-500/50 transition-all">{isOpen ? <X size={24} /> : <Sparkles size={24} />}</motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.9 }} className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-96 bg-[#0a0a0f]/95 backdrop-blur-xl border border-cyan-500/50 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[500px]">
            <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 p-4 border-b border-cyan-500/30 flex items-center gap-2"><Bot size={20} className="text-cyan-400" /><h3 className="text-white font-bold text-sm tracking-wider">OSKA CYBER AI</h3></div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">{messages.map((msg, idx) => (<div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-cyan-600/20 text-cyan-100 border border-cyan-500/30 rounded-br-none' : 'bg-[#1a1a24] text-gray-300 border border-white/10 rounded-bl-none'}`}>{msg.text}</div></div>))}<div ref={messagesEndRef} /></div>
            <div className="p-4 bg-[#12121a]/80 border-t border-white/10"><div className="flex gap-2"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask OSKA AI..." className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none" /><button onClick={handleSend} disabled={loading} className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-black transition-all"><Send size={18} /></button></div></div>
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050508]/80 backdrop-blur-xl border-b border-white/5 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full"><div className="flex items-center justify-between h-full"><div className="flex items-center gap-2 cursor-pointer group" onClick={() => setActiveTab('home')}><Shield className="w-8 h-8 text-cyan-400" /><span className="text-2xl font-bold tracking-wider text-white">OSKA<span className="text-cyan-400">VPN</span></span></div><div className="hidden md:flex space-x-8">{menuItems.map((item) => (<button key={item.id} onClick={() => setActiveTab(item.id)} className={`relative text-sm font-medium transition-all px-3 py-2 rounded-lg ${activeTab === item.id ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-400 hover:text-white'}`}>{item.label}</button>))}</div><div className="md:hidden"><button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white p-2">{isOpen ? <X size={24} /> : <Menu size={24} />}</button></div></div></div>
    </nav>
  );
};

// --- CONFIG CARD WITH COUNTDOWN ---
const ConfigCard = ({ config, highlighted }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(config.code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  
  // Fake 15-day countdown logic
  const [timeLeft, setTimeLeft] = useState("14d 23h 59m");
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const expiry = new Date("Feb 25, 2026 23:59:59").getTime();
      const diff = expiry - now;
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${d}d ${h}h ${m}m`);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} className={`bg-[#12121a]/40 backdrop-blur-md border rounded-xl p-5 transition-all duration-300 group relative overflow-hidden ${highlighted ? 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)]' : 'border-white/10 hover:border-cyan-400/50'}`}>
      <div className="absolute top-0 right-0 bg-red-600/20 text-red-400 text-[9px] font-bold px-2 py-1 rounded-bl-lg z-20 flex items-center gap-1 border-l border-b border-red-500/30 tracking-widest uppercase italic">
        <Clock size={10} /> {timeLeft} LEFT
      </div>
      <div className="flex justify-between items-start mb-4 relative z-10"><div><div className="flex items-center gap-2 mb-1"><Globe size={18} className="text-purple-400" /><h3 className="font-bold text-lg text-white group-hover:text-cyan-200">{config.location}</h3></div><span className="text-xs bg-white/5 px-2 py-1 rounded text-cyan-300 font-mono border border-cyan-500/20">{config.protocol}</span></div><div className="text-right"><div className="flex items-center gap-1 justify-end text-green-400 text-sm font-bold"><Activity size={14} className="animate-pulse" /><span>{config.ping}</span></div><p className="text-xs text-gray-500 mt-1">{config.updated}</p></div></div>
      <div className="bg-black/40 p-3 rounded mb-4 font-mono text-xs text-gray-400 truncate border border-white/5">{config.code}</div>
      <button onClick={handleCopy} className={`w-full py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 ${copied ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]'}`}>{copied ? <><Check size={18} /> Copied</> : <><Copy size={18} /> Copy Config</>}</button>
    </motion.div>
  );
};

const OrderModal = ({ pkg, onClose }) => {
  const [name, setName] = useState('');
  const [device, setDevice] = useState('Android');
  const handleSubmit = (e) => { e.preventDefault(); window.open(`https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(`*NEW ORDER*\n📦 *Package:* ${pkg.name}`)}`, '_blank'); onClose(); };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#16161f] border border-cyan-400/30 rounded-2xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
        <h2 className="text-2xl font-bold mb-6 text-white text-center italic tracking-widest border-b border-cyan-400/20 pb-2 uppercase">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-xs text-cyan-400 uppercase tracking-widest font-bold mb-1">Your Name</label><input required type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-400 outline-none" placeholder="Ex: Oshada" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><label className="block text-xs text-cyan-400 uppercase tracking-widest font-bold mb-1">Device Type</label><select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-400 outline-none" value={device} onChange={(e) => setDevice(e.target.value)}><option value="Android">Android</option><option value="iOS">iOS</option><option value="PC">PC</option><option value="Router">Router</option></select></div>
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 mt-4 uppercase tracking-widest italic transition-all">Buy via WhatsApp</button>
        </form>
      </motion.div>
    </div>
  );
};

// --- VIEWS ---

const HomeView = ({ setTab }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] w-full text-center px-4 relative overflow-hidden pt-10 pb-10">
    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs md:text-sm font-medium mb-6 animate-pulse uppercase tracking-[0.3em]">🚀 #1 V2Ray VPN IN SRI LANKA</motion.div>
      <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight text-white leading-tight drop-shadow-[0_0_20px_rgba(34,211,238,0.4)] uppercase italic">UNLEASH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient">ULTIMATE</span><br/> FREEDOM</motion.h1>
      <motion.p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">Gaming, Streaming, and Browsing with 0% Lag. Secure, Fast, and Untraceable connections.</motion.p>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button onClick={() => setTab('free')} className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/50 text-white transition-all font-bold backdrop-blur-sm flex items-center justify-center gap-2">Get Free Configs</button>
        <button onClick={() => setTab('pricing')} className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2">Buy Premium</button>
      </div>
      {/* TECH PULSE SECTION */}
      <div className="mt-20 w-full max-w-6xl">
        <div className="flex items-center gap-2 mb-8 justify-center md:justify-start"><div className="w-2 h-8 bg-cyan-400 rounded-full" /><h2 className="text-2xl font-bold text-white tracking-[0.2em] uppercase italic">TECH PULSE</h2><div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent ml-4 hidden md:block"></div></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{TECH_NEWS.map((news, i) => (<motion.div key={i} whileHover={{ scale: 1.02 }} className="bg-white/5 border border-white/10 p-5 rounded-xl text-left hover:border-cyan-500/30 group transition-all relative overflow-hidden"><span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">{news.time}</span><h3 className="text-white font-bold mt-1 group-hover:text-cyan-200 uppercase tracking-tighter">{news.title}</h3><p className="text-gray-400 text-xs mt-2 leading-relaxed">{news.desc}</p></motion.div>))}</div>
      </div>
    </div>
  </motion.div>
);

const FreeView = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-10 px-4 max-w-6xl mx-auto min-h-screen">
    <div className="mb-10 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-sm flex flex-col md:flex-row gap-4 items-center justify-between"><div><h2 className="text-xl font-bold text-white uppercase italic tracking-widest flex items-center gap-2"><Sparkles className="text-cyan-400" /> Free Servers</h2><p className="text-gray-400 text-sm font-bold">15-Day Rotation Period Active</p></div><button onClick={() => window.location.reload()} className="p-3 bg-white/5 rounded-full hover:bg-cyan-400 hover:text-black transition-colors text-white"><RefreshCw size={20} /></button></div>
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">{FREE_CONFIGS.map(config => <ConfigCard key={config.id} config={config} highlighted={config.id === 1} />)}</motion.div>
  </motion.div>
);

const PricingView = () => {
  const [selectedPkg, setSelectedPkg] = useState(null);
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-10"><h1 className="text-4xl font-bold mb-4 text-white uppercase italic tracking-widest">Premium Plans</h1><p className="text-gray-400">High speed, low ping, unlimited freedom.</p></div>
      <div className="grid md:grid-cols-3 gap-8 mb-20">{PACKAGES.map((pkg) => (<motion.div key={pkg.id} whileHover={{ y: -10 }} className={`relative bg-[#12121a]/60 backdrop-blur-md rounded-2xl p-8 border transition-all ${pkg.popular ? 'border-cyan-400' : 'border-white/10'}`}><h3 className="text-xl font-bold text-gray-200 uppercase italic mb-4">{pkg.name}</h3><div className="mb-6"><span className={`text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${pkg.color}`}>{pkg.price}</span><span className="text-gray-500 ml-2 text-sm">{pkg.period}</span><p className="text-white font-bold mt-2 uppercase tracking-tighter">{pkg.data}</p></div><ul className="space-y-4 mb-8 flex-1 border-t border-white/5 pt-6">{pkg.features.map((feat, i) => (<li key={i} className="flex items-center gap-3 text-sm text-gray-300 italic"><CheckCircle size={16} className="text-cyan-400" />{feat}</li>))}</ul><button onClick={() => setSelectedPkg(pkg)} className={`w-full py-3 rounded-lg font-bold transition-all ${pkg.popular ? 'bg-cyan-400 text-black' : 'bg-white/10 text-white'}`}>Buy Now</button></motion.div>))}</div>
      {selectedPkg && <OrderModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />}
    </motion.div>
  );
};

const TutorialsView = () => (
  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="py-10 px-4 max-w-4xl mx-auto min-h-screen">
    <h1 className="text-3xl font-bold mb-10 text-center text-white uppercase italic tracking-[0.3em]">Support & Tutorials</h1>
    <div className="space-y-6">
      <div className="bg-[#12121a]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6"><h2 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2 uppercase italic tracking-widest">How to Connect</h2><ol className="list-decimal list-inside space-y-3 text-gray-400 ml-2 italic"><li>Download v2rayNG or Shadowrocket.</li><li>Copy Config from Free Configs.</li><li>Import from Clipboard in the app.</li><li>Click Connect button.</li></ol></div>
    </div>
  </motion.div>
);

// --- MAIN APP ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  return (
    <div className="min-h-screen bg-[#050508] text-gray-100 font-sans selection:bg-cyan-400 selection:text-black relative flex flex-col pt-16">
      <LiveBackground />
      <div className="fixed top-16 left-0 right-0 z-40"><TechTicker /></div>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <UpdatePanel /> {/* SIDE MESSAGE BLINK PANEL */}
      <main className="flex-grow w-full relative z-10 pt-12">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <HomeView key="home" setTab={setActiveTab} />}
          {activeTab === 'free' && <FreeView key="free" />}
          {activeTab === 'pricing' && <PricingView key="pricing" />}
          {activeTab === 'tutorials' && <TutorialsView key="tutorials" />}
        </AnimatePresence>
      </main>
      <AIChatWidget />
      <footer className="bg-black/80 backdrop-blur-md py-8 text-center text-gray-600 text-sm border-t border-white/5 relative z-10 italic uppercase tracking-[0.2em]">
        <p>© 2026 OSKA VPN. Premium V2Ray Solution 🇱🇰</p>
      </footer>
    </div>
  );
}
