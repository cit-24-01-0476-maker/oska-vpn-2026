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
    name: "Router Packages", 
    price: "Rs. 300", 
    period: "/ 30 Days", 
    data: "100 GB", 
    unlimitedPrice: "Rs. 800",
    features: ["Dialog ZOOM (Router)", "SLT Router ZOOM", "SLT Router Netflix", "High Speed SG Server 🇸🇬", "Best for Home Use"], 
    color: "from-cyan-400 to-blue-600", 
    icon: RouterIcon 
  },
  { 
    id: "fiber", 
    name: "Fiber Packages", 
    price: "Rs. 300", 
    period: "/ 30 Days", 
    data: "100 GB", 
    unlimitedPrice: "Rs. 800",
    features: ["SLT Fiber ZOOM", "SLT Fiber Netflix", "Ultra Low Ping (Gaming)", "High Speed SG Server 🇸🇬", "Best for Fiber Users"], 
    color: "from-purple-400 to-indigo-600", 
    icon: Wifi 
  },
  { 
    id: "mobile", 
    name: "Mobile SIM Packages", 
    price: "Rs. 200", 
    period: "/ 30 Days", 
    data: "100 GB", 
    unlimitedPrice: "Rs. 400",
    features: ["Dialog 547 / 797 / ZOOM", "Hutch Social Media", "Airtel ZOOM / TikTok / 260", "Any Mobile SIM Support", "Stable Connection"], 
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
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } } };

// --- LIVE BACKGROUND ---
const LiveBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize); resize();
    const alphabet = '0123456789ABCDEF';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + 'px monospace';
      for(let i=0; i<drops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random()*alphabet.length));
        ctx.fillStyle = Math.random() > 0.5 ? '#22d3ee' : '#a855f7';
        ctx.fillText(text, i*fontSize, drops[i]*fontSize);
        if(drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 30);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, []);
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a0a0f]">
      <canvas ref={canvasRef} className="absolute inset-0 block opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
    </div>
  );
};

// --- AI CHAT ---
const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'model', text: 'Initiating System... I am OSKA AI. How can I help?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]); setInput(''); setLoading(true);
    try {
      const apiKey = "AIzaSyDIPcbkvqZbJOy7pnQzt47EeeH6JpNII5w";
      const sys = `You are OSKA VPN AI. Pricing: Mobile SIM 100GB (Rs.200), Unlimited (Rs.400). Router/Fiber 100GB (Rs.300), Unlimited (Rs.800). All 30 days.`;
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ contents: [{ parts: [{ text: input }] }], systemInstruction: { parts: [{ text: sys }] } }) });
      const d = await res.json();
      setMessages(prev => [...prev, { role: 'model', text: d.candidates?.[0]?.content?.parts?.[0]?.text || "Link Error." }]);
    } catch { setMessages(prev => [...prev, { role: 'model', text: "Error." }]); } finally { setLoading(false); }
  };
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 z-50 p-4 bg-cyan-500 rounded-full shadow-lg text-black hover:scale-110 transition-all">{isOpen ? <X /> : <Sparkles />}</button>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-[#0a0a0f] border border-cyan-500/30 rounded-2xl h-[450px] flex flex-col shadow-2xl overflow-hidden backdrop-blur-xl">
           <div className="p-4 bg-cyan-900/20 border-b border-white/5 font-bold flex items-center gap-2"><Bot size={18} className="text-cyan-400"/> OSKA AI SUPPORT</div>
           <div className="flex-1 overflow-y-auto p-4 space-y-3">{messages.map((m,i)=>(<div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}><div className={`p-2 rounded-lg text-sm max-w-[80%] ${m.role==='user'?'bg-cyan-500 text-black':'bg-white/5 text-gray-300'}`}>{m.text}</div></div>))}</div>
           <div className="p-3 border-t border-white/5 flex gap-2"><input value={input} onChange={e=>setInput(e.target.value)} onKeyPress={e=>e.key==='Enter'&&handleSend()} className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-1 text-sm outline-none"/><button onClick={handleSend} className="text-cyan-400 p-2"><Send size={18}/></button></div>
        </div>
      )}
    </>
  );
};

// --- COMPONENTS ---
const Navbar = ({ activeTab, setActiveTab }) => {
  const menu = [{id:'home',l:'Home'},{id:'free',l:'Free Configs'},{id:'pricing',l:'Premium Store'},{id:'tutorials',l:'Tutorials'}];
  return (
    <nav className="fixed top-0 inset-x-0 h-16 z-50 bg-[#0a0a0f]/80 border-b border-white/5 backdrop-blur-md flex items-center justify-between px-6">
      <div className="flex items-center gap-2 font-bold text-xl cursor-pointer" onClick={()=>setActiveTab('home')}><Shield className="text-cyan-400"/> OSKA<span className="text-cyan-400">VPN</span></div>
      <div className="hidden md:flex gap-6">{menu.map(m=>(<button key={m.id} onClick={()=>setActiveTab(m.id)} className={`text-sm ${activeTab===m.id?'text-cyan-400 font-bold':'text-gray-400'}`}>{m.l}</button>))}</div>
    </nav>
  );
};

const ConfigCard = ({ config, highlighted }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(config.code); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  return (
    <motion.div variants={itemVariants} className={`p-5 rounded-2xl border bg-[#12121a]/60 backdrop-blur-md transition-all ${highlighted?'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]':'border-white/10'}`}>
      <div className="flex justify-between items-start mb-3"><div><h3 className="font-bold text-white flex items-center gap-2"><Globe size={16} className="text-cyan-400"/> {config.location}</h3><p className="text-[10px] text-cyan-400/70 font-mono">{config.protocol}</p></div><div className="text-right text-green-400 text-xs font-bold flex items-center gap-1"><Activity size={12}/>{config.ping}</div></div>
      <div className="bg-black/40 p-2 rounded text-[10px] text-gray-500 truncate mb-4 border border-white/5">{config.code}</div>
      <button onClick={copy} className={`w-full py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${copied?'bg-green-500/20 text-green-400 border border-green-500/50':'bg-cyan-500 text-black'}`}>{copied?<Check size={16}/>:<Copy size={16}/>} {copied?'Copied':'Copy Config'}</button>
    </motion.div>
  );
};

const PricingCard = ({ pkg, onOrder }) => (
  <motion.div variants={itemVariants} className={`p-8 rounded-3xl border bg-[#12121a]/80 backdrop-blur-md flex flex-col relative overflow-hidden group transition-all hover:scale-[1.02] ${pkg.popular ? 'border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.1)]' : 'border-white/10 hover:border-cyan-500/30'}`}>
    {pkg.popular && <div className="absolute top-0 right-0 bg-orange-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-lg">MOST POPULAR</div>}
    <div className={`p-4 rounded-2xl bg-gradient-to-br ${pkg.color} w-fit mb-6 shadow-lg group-hover:scale-110 transition-transform`}><pkg.icon className="text-white w-8 h-8"/></div>
    <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
    
    <div className="space-y-4 mb-8">
      <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
         <p className="text-gray-400 text-xs mb-1">Standard Option</p>
         <div className="flex justify-between items-end">
            <span className="text-white font-bold">{pkg.data}</span>
            <span className="text-cyan-400 font-extrabold text-2xl">{pkg.price}</span>
         </div>
      </div>
      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
         <p className="text-cyan-400 text-xs mb-1 font-bold">Recommended Option</p>
         <div className="flex justify-between items-end">
            <span className="text-white font-bold">♾️ Unlimited GB</span>
            <span className="text-cyan-400 font-extrabold text-2xl">{pkg.unlimitedPrice}</span>
         </div>
      </div>
    </div>

    <ul className="space-y-3 mb-8 flex-1">{pkg.features.map((f,i)=>(<li key={i} className="flex items-center gap-3 text-sm text-gray-400"><CheckCircle size={14} className="text-cyan-400"/> {f}</li>))}</ul>
    
    <button onClick={()=>onOrder(pkg)} className={`w-full py-4 rounded-2xl font-bold transition-all shadow-lg ${pkg.popular ? 'bg-orange-500 text-black hover:bg-orange-400' : 'bg-white text-black hover:bg-cyan-400'}`}>Order Now</button>
  </motion.div>
);

const OrderModal = ({ pkg, onClose }) => {
  const [name, setName] = useState('');
  const [opt, setOpt] = useState('100GB');
  const send = (e) => {
    e.preventDefault();
    const price = opt === '100GB' ? pkg.price : pkg.unlimitedPrice;
    const text = `*NEW ORDER - OSKA VPN*\n\n📦 *Package:* ${pkg.name}\n📊 *Option:* ${opt}\n💰 *Price:* ${price}\n👤 *Name:* ${name}\n\nI want to buy this package.`;
    window.open(`https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in">
       <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-[#16161f] border border-white/10 p-6 rounded-3xl w-full max-w-sm">
          <div className="flex justify-between mb-6"><h2 className="text-xl font-bold">Select Plan</h2><button onClick={onClose}><X/></button></div>
          <form onSubmit={send} className="space-y-4">
             <input required placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-cyan-400"/>
             <select value={opt} onChange={e=>setOpt(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none">
                <option value="100GB">{pkg.data} - {pkg.price}</option>
                <option value="Unlimited">Unlimited GB - {pkg.unlimitedPrice}</option>
             </select>
             <button type="submit" className="w-full bg-green-500 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2"><MessageCircle size={18}/> WhatsApp Checkout</button>
          </form>
       </motion.div>
    </div>
  );
};

// --- VIEWS ---
const HomeView = ({ setTab }) => (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
     <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-6xl md:text-8xl font-black text-center mb-6 leading-none">OSKA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">CYBER</span></motion.h1>
     <p className="text-gray-400 text-center max-w-xl mb-10">Experience the fastest V2Ray VPN network in Sri Lanka. Gaming optimized, secure and unlimited browsing.</p>
     <div className="flex gap-4"><button onClick={()=>setTab('free')} className="px-8 py-3 bg-white/5 border border-white/10 rounded-full font-bold">Free Configs</button><button onClick={()=>setTab('pricing')} className="px-8 py-3 bg-cyan-500 text-black rounded-full font-bold shadow-lg shadow-cyan-500/20">Buy Premium</button></div>
  </div>
);

const FreeView = () => (
  <div className="pt-24 px-6 max-w-6xl mx-auto min-h-screen pb-20">
     <h1 className="text-3xl font-bold mb-8">Free Configs</h1>
     <div className="grid md:grid-cols-3 gap-6">{FREE_CONFIGS.map(c=>(<ConfigCard key={c.id} config={c}/>))}</div>
  </div>
);

const PricingView = () => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto min-h-screen pb-20">
       <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Premium Store</h1>
          <p className="text-gray-500">Choose your 30-day package and get instant access.</p>
       </div>
       <div className="grid md:grid-cols-3 gap-8 mb-20">
          {PACKAGES.map(p=>(<PricingCard key={p.id} pkg={p} onOrder={setSelected}/>))}
       </div>
       <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3"><Box className="text-cyan-400"/> Supporting Networks</h2>
       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {PROVIDER_PACKAGES.map(pr=>(<div key={pr.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center"><div className={`w-10 h-10 rounded-full bg-gradient-to-br ${pr.color} mx-auto mb-3 flex items-center justify-center font-bold`}>{pr.name[0]}</div><h3 className="text-sm font-bold">{pr.name}</h3></div>))}
       </div>
       {selected && <OrderModal pkg={selected} onClose={()=>setSelected(null)}/>}
    </div>
  );
};

const TutorialsView = () => (
  <div className="pt-24 px-6 max-w-4xl mx-auto min-h-screen pb-20">
     <h1 className="text-3xl font-bold mb-10">How to Setup</h1>
     <div className="space-y-6">
        <div className="p-6 bg-[#12121a] rounded-3xl border border-white/5"><h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-400"><Smartphone/> Android (v2rayNG)</h3><p className="text-gray-400">1. Download v2rayNG from PlayStore.<br/>2. Copy a config from this site.<br/>3. Open app, click + and 'Import from Clipboard'.<br/>4. Connect.</p></div>
        <div className="p-6 bg-[#12121a] rounded-3xl border border-white/5"><h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400"><Smartphone/> iOS (Shadowrocket)</h3><p className="text-gray-400">1. Install Shadowrocket.<br/>2. Copy config and open the app.<br/>3. It will auto-detect the config.<br/>4. Turn on connection.</p></div>
     </div>
  </div>
);

// --- MAIN APP ---
export default function App() {
  const [tab, setTab] = useState('home');
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-sans selection:bg-cyan-400 selection:text-black">
      <LiveBackground />
      <Navbar activeTab={tab} setActiveTab={setTab} />
      <AnimatePresence mode="wait">
        {tab === 'home' && <HomeView key="h" setTab={setTab}/>}
        {tab === 'free' && <FreeView key="f"/>}
        {tab === 'pricing' && <PricingView key="p"/>}
        {tab === 'tutorials' && <TutorialsView key="t"/>}
      </AnimatePresence>
      <AIChatWidget />
      <footer className="py-10 text-center text-gray-600 text-xs border-t border-white/5 backdrop-blur-md">© 2026 OSKA VPN. Sri Lanka's Elite V2Ray Network 🇱🇰</footer>
    </div>
  );
}
