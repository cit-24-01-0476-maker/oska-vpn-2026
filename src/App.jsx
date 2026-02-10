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
    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = Array.from({ length: columns }).fill(1);
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillStyle = Math.random() > 0.5 ? '#22d3ee' : '#a855f7';
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) rainDrops[i] = 0;
        rainDrops[i]++;
      }
    };
    const interval = setInterval(draw, 30);
    return () => { clearInterval(interval); window.removeEventListener('resize', resizeCanvas); };
  }, []);
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a0a0f]">
      <canvas ref={canvasRef} className="absolute inset-0 block opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
    </div>
  );
};

// --- AI COMPONENTS ---
const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'model', text: 'Initiating System... I am OSKA AI. How can I assist?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setLoading(true);
    try {
      const apiKey = "AIzaSyDIPcbkvqZbJOy7pnQzt47EeeH6JpNII5w";
      const systemPrompt = `Cyberpunk VPN Assistant OSKA. Pricing: Mobile SIM 200/400, Router 300/800, Fiber 300/800. All 30 days.`;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: input }] }], systemInstruction: { parts: [{ text: systemPrompt }] } }) });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.candidates?.[0]?.content?.parts?.[0]?.text || "Error." }]);
    } catch { setMessages(prev => [...prev, { role: 'model', text: "Offline." }]); } finally { setLoading(false); }
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 z-50 p-4 bg-cyan-500 rounded-full shadow-lg text-white">
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-[#0a0a0f]/95 border border-cyan-500/50 rounded-2xl h-[500px] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-cyan-900/20 flex items-center gap-2"><Bot size={20} /><span className="font-bold">OSKA AI</span></div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`p-2 rounded-lg text-sm ${m.role === 'user' ? 'bg-cyan-600/20 border border-cyan-500/30' : 'bg-white/5'}`}>{m.text}</div></div>)}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-white/10 flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} className="flex-1 bg-black/50 border border-white/10 rounded px-2 text-sm text-white focus:outline-none" />
              <button onClick={handleSend} className="p-2 bg-cyan-500 rounded"><Send size={18} /></button>
            </div>
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
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-full">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <Shield className="w-8 h-8 text-cyan-400" /><span className="text-2xl font-bold">OSKA<span className="text-cyan-400">VPN</span></span>
        </div>
        <div className="hidden md:flex space-x-4">
          {menuItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={`px-3 py-2 rounded-lg text-sm ${activeTab === item.id ? 'bg-cyan-400/10 text-cyan-400' : 'text-gray-400 hover:text-white'}`}>{item.label}</button>)}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-400 p-2">{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      <AnimatePresence>{isOpen && <motion.div className="md:hidden bg-[#12121a] absolute w-full p-4 space-y-2">{menuItems.map(item => <button key={item.id} onClick={() => { setActiveTab(item.id); setIsOpen(false); }} className="block w-full text-left p-3 text-gray-300">{item.label}</button>)}</motion.div>}</AnimatePresence>
    </nav>
  );
};

const ConfigCard = ({ config, highlighted }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(config.code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <motion.div variants={itemVariants} className={`bg-[#12121a]/60 backdrop-blur-md border rounded-xl p-5 relative overflow-hidden ${highlighted ? 'border-cyan-400 ring-1 ring-cyan-400' : 'border-white/10'}`}>
      <div className="flex justify-between items-start mb-4">
        <div><h3 className="font-bold text-white flex items-center gap-2"><Globe size={16} />{config.location}</h3><span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-cyan-400 font-mono">{config.protocol}</span></div>
        <div className="text-right text-[10px] text-green-400 font-bold flex items-center gap-1"><Activity size={12}/>{config.ping}</div>
      </div>
      <div className="bg-black/40 p-2 rounded text-[10px] text-gray-500 truncate mb-4 font-mono">{config.code}</div>
      <button onClick={handleCopy} className={`w-full py-2 rounded font-bold text-sm flex items-center justify-center gap-2 ${copied ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-cyan-500 text-black'}`}>{copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copied' : 'Copy'}</button>
    </motion.div>
  );
};

const OrderModal = ({ pkg, onClose }) => {
  const [name, setName] = useState('');
  const handleSubmit = (e) => { e.preventDefault(); window.open(`https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(`*ORDER*\nPackage: ${pkg.name}\nPrice: ${pkg.price}\nName: ${name}`)}`, '_blank'); onClose(); };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#16161f] border border-cyan-400/30 rounded-2xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400"><X size={24} /></button>
        <h2 className="text-xl font-bold mb-4">Checkout: {pkg.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required type="text" placeholder="Your Name" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none" value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit" className="w-full bg-green-500 text-black font-bold py-3 rounded flex items-center justify-center gap-2"><MessageCircle size={20} /> Buy WhatsApp</button>
        </form>
      </motion.div>
    </div>
  );
};

// --- PAGES ---
const HomeView = ({ setTab }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center px-4">
    <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs mb-6 animate-pulse">🚀 #1 High Speed V2Ray Sri Lanka</div>
    <h1 className="text-5xl md:text-8xl font-black mb-6 text-white tracking-tighter">UNLEASH <span className="text-cyan-400">FREEDOM</span></h1>
    <p className="text-gray-400 mb-10 max-w-xl">Gaming & Streaming with 0% Lag. Secure & Unlimited.</p>
    <div className="flex flex-col sm:flex-row gap-4">
      <button onClick={() => setTab('free')} className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold flex items-center gap-2"><Zap size={20} /> Free Configs</button>
      <button onClick={() => setTab('pricing')} className="px-8 py-4 rounded-full bg-cyan-500 text-black font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20"><Lock size={20} /> Buy Premium</button>
    </div>
  </motion.div>
);

const FreeView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 px-4 max-w-6xl mx-auto min-h-screen">
    <h1 className="text-3xl font-bold text-white mb-6">Free V2Ray Configs</h1>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{FREE_CONFIGS.map(c => <ConfigCard key={c.id} config={c} />)}</div>
  </motion.div>
);

const PricingView = () => {
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [userUsage, setUserUsage] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlanRecommendation = async () => {
    if (!userUsage.trim()) return;
    setIsProcessing(true);
    try {
      const apiKey = "AIzaSyDIPcbkvqZbJOy7pnQzt47EeeH6JpNII5w";
      const prompt = `Premium plans: ${JSON.stringify(PACKAGES)}. User needs: "${userUsage}". Best plan ID? 1-sentence reason. JSON only: {"id": "...", "reason": "..."}`;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } }) });
      const data = await response.json();
      setAiRecommendation(JSON.parse(data.candidates[0].content.parts[0].text));
    } catch { } finally { setIsProcessing(false); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">PREMIUM <span className="text-cyan-400">STORE</span></h1>
        <p className="text-gray-400">High speed, low ping, unlimited freedom for Sri Lanka.</p>
      </div>

      {/* AI MATCH BOX */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 p-6 rounded-2xl mb-16 max-w-4xl mx-auto backdrop-blur-md">
        <div className="flex items-center gap-2 mb-4 text-purple-400 font-bold"><BrainCircuit size={20} /> AI Plan Matcher</div>
        <div className="flex gap-2">
          <input value={userUsage} onChange={(e) => setUserUsage(e.target.value)} type="text" placeholder="Ex: I play PUBG on Dialog..." className="flex-1 bg-black/40 border border-white/10 rounded px-4 text-white focus:outline-none" />
          <button onClick={handlePlanRecommendation} className="bg-purple-600 px-4 py-2 rounded font-bold text-white flex items-center gap-2">{isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />} Find</button>
        </div>
        {aiRecommendation && <div className="mt-4 p-3 bg-purple-500/10 rounded-lg text-xs text-purple-200"><span className="font-bold text-white">AI Suggests:</span> {aiRecommendation.reason}</div>}
      </div>

      {/* PACKAGES GRID - EACH IN A SEPARATE BOX */}
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2"><Zap className="text-cyan-400" /> Choose Your Plan</h2>
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {PACKAGES.map((pkg) => (
          <motion.div 
            key={pkg.id} 
            whileHover={{ y: -10 }} 
            className={`bg-[#12121a]/80 border-2 rounded-2xl p-8 flex flex-col relative ${pkg.id === aiRecommendation?.id ? 'border-purple-500 shadow-lg shadow-purple-500/20' : pkg.popular ? 'border-cyan-400 shadow-lg shadow-cyan-500/10' : 'border-white/5'}`}
          >
            {pkg.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[10px] font-black px-4 py-1 rounded-full uppercase">Best Seller</span>}
            {pkg.id === aiRecommendation?.id && <span className="absolute -top-3 right-4 bg-purple-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase">AI Pick</span>}
            
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-6`}><pkg.icon size={28} className="text-white" /></div>
            <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
            <div className="mb-6"><span className="text-4xl font-black text-white">{pkg.price}</span><span className="text-gray-500 text-sm ml-2">{pkg.period}</span></div>
            
            <ul className="space-y-3 mb-8 flex-1 border-t border-white/5 pt-6">
              {pkg.features.map((f, i) => <li key={i} className="flex items-center gap-2 text-sm text-gray-400"><CheckCircle size={14} className="text-cyan-400" />{f}</li>)}
            </ul>

            <div className="bg-white/5 p-3 rounded-xl mb-6 text-center text-xs text-cyan-400 font-bold border border-white/5">➕ {pkg.extra}</div>
            
            <button onClick={() => setSelectedPkg(pkg)} className={`w-full py-4 rounded-xl font-black transition-all ${pkg.popular ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-white/10 text-white hover:bg-white/20'}`}>BUY NOW</button>
          </motion.div>
        ))}
      </div>

      {/* PROVIDER PACKAGES */}
      <h2 className="text-2xl font-bold text-white mb-8 text-center"><Box className="text-cyan-400 inline mr-2" /> Network Specific Packs</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {PROVIDER_PACKAGES.map(provider => (
          <div key={provider.id} className="bg-[#12121a]/60 border border-white/5 rounded-xl p-4 flex flex-col items-center text-center">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${provider.color} flex items-center justify-center font-bold text-white mb-4`}>{provider.name[0]}</div>
            <h4 className="font-bold text-white text-sm mb-3">{provider.name}</h4>
            <div className="space-y-1 w-full">{provider.items.map((it, idx) => <div key={idx} className="text-[10px] bg-black/40 text-gray-400 py-1 rounded border border-white/5 uppercase font-bold">{it}</div>)}</div>
          </div>
        ))}
      </div>

      {selectedPkg && <OrderModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />}
    </motion.div>
  );
};

const TutorialsView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 px-4 max-w-4xl mx-auto min-h-screen">
    <h1 className="text-3xl font-bold text-white mb-10 text-center">Support & Tutorials</h1>
    <div className="space-y-6">
      <div className="bg-[#12121a]/60 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-green-400 flex items-center gap-2 mb-4"><Smartphone /> Android (v2rayNG)</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-400 text-sm">
          <li>Download v2rayNG from Play Store.</li>
          <li>Copy config from Free Configs.</li>
          <li>In app, click + icon and select "Import from Clipboard".</li>
          <li>Click the V button to connect.</li>
        </ol>
      </div>
      <div className="bg-[#12121a]/60 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-blue-400 flex items-center gap-2 mb-4"><Smartphone /> iPhone (Shadowrocket)</h2>
        <p className="text-gray-400 text-sm">Download Shadowrocket, copy config, it will auto-detect. Switch on to connect.</p>
      </div>
    </div>
  </motion.div>
);

// --- MAIN APP ---
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-sans pt-16 selection:bg-cyan-400 selection:text-black">
      <LiveBackground />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="relative z-10"><AnimatePresence mode="wait">
        {activeTab === 'home' && <HomeView key="home" setTab={setActiveTab} />}
        {activeTab === 'free' && <FreeView key="free" />}
        {activeTab === 'pricing' && <PricingView key="pricing" />}
        {activeTab === 'tutorials' && <TutorialsView key="tutorials" />}
      </AnimatePresence></main>
      <AIChatWidget />
      <footer className="bg-black/80 py-8 text-center text-gray-600 text-[10px] border-t border-white/5 relative z-10">
        <p>© 2026 OSKA VPN. Made for Sri Lanka 🇱🇰</p>
      </footer>
    </div>
  );
}
