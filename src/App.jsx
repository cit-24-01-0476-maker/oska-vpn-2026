import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Zap, Globe, Menu, X, Copy, Check, 
  Smartphone, Activity, RefreshCw, MessageCircle, 
  CheckCircle, Server, Lock, Bot, Send, Sparkles, 
  Wifi, Router as RouterIcon, Wand2, AlertTriangle, Stethoscope, BrainCircuit, Box, ArrowRight,
  Newspaper, Radio, Clock, Bell, Timer
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
  { id: 1, location: "SLT Zoom 🇸🇬", protocol: "VLESS", speed: "Ultra", ping: "22ms", updated: "Just now", code: "nm-vless://xY4ziFf2+a3x9hPJGPlK+SX7zif0DqN9/twWwu13c2Vllm++fH6qMuiOyj9NUxYgc5udascqQmJ++16m63wSrORwtw3gQZOJe6gBpQtkR/mFEBNPJ43l2IYL9Mf187x0d7N51hq0LvN6TlnG+eWoCX8eVhoKx+ykQO6jTcOJMXC5WaDM7cStCGIVTLb7PnF15avXgkjLeCPEw8fiQvqDrmSDxZNV5zvpxqUHoWwLM67kmpbHfi+qzqWC5EuxBfz4" },
  { id: 2, location: "SLT Netflix 🇸🇬", protocol: "VLESS", speed: "Ultra", ping: "25ms", updated: "Just now", code: "nm-vless://pGSwaVt8hgPinRT9mfpM1wDeldM4LTJmMJXcdqcjSVdfpCOo8cGVu7Mfgl9L5Fm7c5udascqQmJ++16m63wSrORwtw3gQZOJe6gBpQtkR/mFEBNPJ43l2IYL9Mf187x0d7N51hq0LvN6TlnG+eWoCXmQ+InonGtYBjE1R+7ubIq4+o1JEsQsWVDi06Qd1dokzQAF8SKzwTp53Cjp3jIksfSrYvI1bIlFBGDN1VQpO5/7SbQMjcDUU/8Q0iBp8UoM" },
  { id: 3, location: "Dialog Zoom Router 🇸🇬", protocol: "VLESS", speed: "High", ping: "38ms", updated: "Just now", code: "nm-vless://iilBvBJzp8Ntls8abtfWdOpDiKQILu27PzSi0qcUc71QWEZ16H+kK0XKU4dqfiXqc5udascqQmJ++16m63wSrORwtw3gQZOJe6gBpQtkR/mFEBNPJ43l2IYL9Mf187x0d7N51hq0LvN6TlnG+eWoCXYHVdiDLW9comfYaIv2kSatO0E5bA++yH68KXMfm6B1UqfR2J1GNJQqFMU+7FB9wjnQwVol/KZqPODtrKL9Y5YKvSaS/zBXWYF5mtmO6owS" },
  { id: 4, location: "Airtel Zoom 🇸🇬", protocol: "VLESS", speed: "High", ping: "42ms", updated: "Just now", code: "nm-vless://Q/JIk4YjxW5FjayTrQ9zZ+IdiVWhdYYcuP499PnIlF8skqyMfvm+i6jvJ+NQSYBUc5udascqQmJ++16m63wSrORwtw3gQZOJe6gBpQtkR/mFEBNPJ43l2IYL9Mf187x0d7N51hq0LvN6TlnG+eWoCX8eVhoKx+ykQO6jTcOJMXC5WaDM7cStCGIVTLb7PnF1FKesMt82j2J4yQBQeO498nFN8aH6qVvEU+g5sXfV4T0vBX4euswQuFmYIHhiuScg" },
  { id: 5, location: "Airtel YouTube 🇸🇬", protocol: "VLESS", speed: "Medium", ping: "45ms", updated: "Just now", code: "nm-vless://wsCygmfaMmTjzncIYY7aQmpKC/oMtQAR5atrQs69WrqE14vk4R6BAPz6dsEaTEk+c5udascqQmJ++16m63wSrORwtw3gQZOJe6gBpQtkR/mFEBNPJ43l2IYL9Mf187x0d7N51hq0LvN6TlnG+eWoCceVKkw2vtBDPA+1RgumI6bUBVDpAOO5eWNwlBZNgicXcJP0XRfO2o9HD9ASGdQ2xmhpNfUg5PQM7QeK9C+uPs77SbQMjcDUU/8Q0iBp8UoM" },
  { id: 6, location: "Airtel/Dialog TikTok 🇸🇬", protocol: "VLESS", speed: "Ultra", ping: "30ms", updated: "Just now", code: "nm-vless://VxBM7DvTuJzj7xvMecrjT87IdK+/bLr18oNpWk7N6jxOZCCB+2SEderW2yqyQmAtc5udascqQmJ++16m63wSrORwtw3gQZOJe6gBpQtkR/mFEBNPJ43l2IYL9Mf187x0d7N51hq0LvN6TlnG+eWoCU5kRHgFZAFRyahwLt0tVjt2mjO+hRZgC0uor1wTfOppjCK9WgNpGaBbjT1Lt7v+lhxZcbrWR0ILSb2+ncbCe9+Vlrmskbd3KaJdudUNg2JSKZdqKfiPeHKs902kDafXRA==" },
  { id: 7, location: "Hutch 169 🇸🇬", protocol: "VLESS", speed: "High", ping: "55ms", updated: "Just now", code: "nm-vless://fyNGDXFqU2aMtID3LfTe5R3EPO2pN/5ZESVad7hcW5+ZB6nOSUx2JbSO+oEUMArwc5udascqQmJ++16m63wSrORwtw3gQZOJe6gBpQtkR/mFEBNPJ43l2IYL9Mf187x0d7N51hq0LvN6TlnG+eWoCWmnBm6xoPEvzZZ0ELsB7s2m4xX9ygw1+A7TiY2hOxi4Ef52t1wLanPrDU9JqUm0DMD3bDHAU+JqaFEQkv7lO5IdE3avsCNUNkkOZ5njd6kj" },
  { id: 8, location: "Airtel 148/498 🇸🇬", protocol: "VLESS", speed: "High", ping: "40ms", updated: "Just now", code: "nm-vless://7cZF45OIWKDMOrW9kvSNZeSeYCfORdcX7hrJsjv9hGgp5Yqow77nssf0erh48Y4bc5udascqQmJ++16m63wSrORwtw3gQZOJe6gBpQtkR/mFEBNPJ43l2IYL9Mf187x0d7N51hq0LvN6TlnG+eWoCY8uOrhko6oJM9tlOxHSBv2neVMMhv2OT1+0LzRvTeqYCSlwOMjUSMEsryfLgI3+oyxUylMqZEn+znRPlBv9XMwA5Qv65vUJEpsjSy+YCkC+n50Cj5EwKQPpiPXn0ENlmg==" }
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

// --- NEXT LEVEL LIVE BACKGROUND (NEURAL GRID) ---
const LiveBackground = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (event) => {
      mouse.current.x = event.x;
      mouse.current.y = event.y;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
      }

      draw() {
        ctx.fillStyle = 'rgba(34, 211, 238, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        let dx = mouse.current.x - this.x;
        let dy = mouse.current.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.current.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.current.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }
    }

    function init() {
      particlesArray = [];
      const numberOfParticles = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
      }
    }

    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            opacityValue = 1 - (distance / 100);
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacityValue * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
      }
      connect();
      requestAnimationFrame(animate);
    }

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050508]">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,78,113,0.15)_0%,rgba(5,5,8,1)_80%)]"></div>
      <motion.div 
        animate={{ opacity: [0.2, 0.4, 0.2] }} 
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1] }} 
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" 
      />
      <canvas ref={canvasRef} className="absolute inset-0 block" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
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
          <p className="text-cyan-300 text-[11px] font-bold uppercase animate-pulse">● Latest Update</p>
          <p className="text-white text-xs mt-1">All Free Configs (Dialog, SLT, Airtel, Hutch) Updated! 🔥</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-2">
          <p className="text-cyan-300 text-[10px] font-bold uppercase">● Status</p>
          <p className="text-gray-300 text-xs mt-1">Servers are stable & high speed. 🚀</p>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- TECH TICKER ---
const TechTicker = () => {
  return (
    <div className="bg-[#0a0a0f]/80 backdrop-blur-md border-y border-white/5 py-2 overflow-hidden whitespace-nowrap relative z-10 shadow-2xl">
      <div className="flex animate-marquee">
        {[...TICKER_MESSAGES, ...TICKER_MESSAGES].map((msg, i) => (
          <span key={i} className="mx-8 text-[10px] md:text-xs font-bold tracking-[0.2em] text-cyan-400/80 flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" /> {msg}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 40s linear infinite;
        }
      `}</style>
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050508]/80 backdrop-blur-xl border-b border-white/5 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full"><div className="flex items-center justify-between h-full"><div className="flex items-center gap-2 cursor-pointer group" onClick={() => setActiveTab('home')}><div className="relative"><Shield className="w-8 h-8 text-cyan-400 relative z-10 transition-transform group-hover:scale-110 duration-300" /><div className="absolute inset-0 bg-cyan-400 blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div></div><span className="text-2xl font-bold tracking-wider text-white">OSKA<span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">VPN</span></span></div><div className="hidden md:flex space-x-8">{menuItems.map((item) => (<button key={item.id} onClick={() => setActiveTab(item.id)} className={`relative text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg ${activeTab === item.id ? 'text-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>{item.label}{activeTab === item.id && (<motion.div layoutId="navbar-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />)}</button>))}</div><div className="md:hidden"><button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white p-2">{isOpen ? <X size={24} /> : <Menu size={24} />}</button></div></div></div>
      <AnimatePresence>{isOpen && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden absolute w-full left-0 top-16"><div className="px-4 py-4 space-y-2">{menuItems.map((item) => (<button key={item.id} onClick={() => { setActiveTab(item.id); setIsOpen(false); }} className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors ${activeTab === item.id ? 'bg-cyan-400/10 text-cyan-400' : 'text-gray-300 hover:bg-white/5'}`}>{item.label}</button>))}</div></motion.div>)}</AnimatePresence>
    </nav>
  );
};

// --- CONFIG CARD WITH RESPONSIVE COUNTDOWN ---
const ConfigCard = ({ config, highlighted }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(config.code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  
  const [timeLeft, setTimeLeft] = useState({ days: 15, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const expiryDate = new Date("Feb 25, 2026 23:59:59").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = expiryDate - now;
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} className={`bg-[#12121a]/40 backdrop-blur-md border rounded-xl p-5 transition-all duration-300 group relative overflow-visible mt-8 mx-auto w-full ${highlighted ? 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)] ring-1 ring-cyan-400' : 'border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]'}`}>
      
      {/* --- RESPONSIVE COUNTDOWN BOX --- */}
      <div className="absolute -top-5 right-2 md:-top-6 md:right-0 z-30 transform scale-90 md:scale-100 origin-top-right">
        <div className="bg-black/90 border border-green-500/80 shadow-[0_0_15px_rgba(34,197,94,0.5)] px-2 py-1 rounded-lg flex items-center gap-1.5 backdrop-blur-xl">
           <span className="relative flex h-2 w-2">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
           </span>
           <div className="flex gap-0.5 items-center">
             <div className="flex flex-col items-center">
                <div className="bg-[#0f2a15] border border-green-500/30 rounded px-1 min-w-[18px] text-center">
                  <span className="text-green-400 text-[9px] md:text-[10px] font-mono font-bold">{String(timeLeft.days).padStart(2, '0')}</span>
                </div>
                <span className="text-[5px] md:text-[6px] text-green-500/70 uppercase">Days</span>
             </div>
             <span className="text-green-500/50 font-bold -mt-2 text-[8px]">:</span>
             <div className="flex flex-col items-center">
                <div className="bg-[#0f2a15] border border-green-500/30 rounded px-1 min-w-[18px] text-center">
                  <span className="text-green-400 text-[9px] md:text-[10px] font-mono font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                </div>
                <span className="text-[5px] md:text-[6px] text-green-500/70 uppercase">Hrs</span>
             </div>
             <span className="text-green-500/50 font-bold -mt-2 text-[8px]">:</span>
             <div className="flex flex-col items-center">
                <div className="bg-[#0f2a15] border border-green-500/30 rounded px-1 min-w-[18px] text-center">
                  <span className="text-green-400 text-[9px] md:text-[10px] font-mono font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                </div>
                <span className="text-[5px] md:text-[6px] text-green-500/70 uppercase">Min</span>
             </div>
             <span className="text-green-500/50 font-bold -mt-2 text-[8px]">:</span>
             <div className="flex flex-col items-center">
                <div className="bg-[#0f2a15] border border-green-500/30 rounded px-1 min-w-[18px] text-center shadow-[0_0_5px_rgba(34,197,94,0.3)]">
                  <span className="text-green-300 text-[9px] md:text-[10px] font-mono font-bold animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
                <span className="text-[5px] md:text-[6px] text-green-500/70 uppercase">Sec</span>
             </div>
           </div>
        </div>
      </div>
      
      {highlighted && (<div className="absolute top-0 left-0 bg-cyan-400 text-black text-[10px] font-bold px-3 py-1 rounded-br-lg rounded-tl-xl z-20 flex items-center gap-1 shadow-lg"><Sparkles size={10} /> AI PICK</div>)}
      
      <div className={`absolute top-0 right-0 w-20 h-20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 transition-colors duration-500 ${highlighted ? 'bg-cyan-500/30' : 'bg-cyan-500/10 group-hover:bg-cyan-500/20'}`}></div>
      <div className="flex justify-between items-start mb-4 relative z-10 pt-2"><div><div className="flex items-center gap-2 mb-1"><Globe size={18} className="text-purple-400 group-hover:text-purple-300 transition-colors" /><h3 className="font-bold text-lg text-white group-hover:text-cyan-200 transition-colors">{config.location}</h3></div><span className="text-xs bg-white/5 px-2 py-1 rounded text-cyan-300 font-mono border border-cyan-500/20">{config.protocol}</span></div><div className="text-right"><div className="flex items-center gap-1 justify-end text-green-400 text-sm font-bold"><Activity size={14} className="animate-pulse" /><span>{config.ping}</span></div><p className="text-xs text-gray-500 mt-1">{config.updated}</p></div></div>
      <div className="bg-black/40 p-3 rounded mb-4 font-mono text-xs text-gray-400 truncate border border-white/5 group-hover:border-white/10 transition-colors">{config.code}</div>
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
      <motion.h1 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight text-white leading-tight drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">UNLEASH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient">ULTIMATE</span><br/> FREEDOM</motion.h1>
      <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">Gaming, Streaming, and Browsing with 0% Lag. Secure, Fast, and Untraceable connections.</motion.p>
      
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
        <button onClick={() => setTab('free')} className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 text-white transition-all font-bold backdrop-blur-sm flex items-center justify-center gap-2 w-full sm:w-auto hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"><Zap size={20} className="text-yellow-400"/> Get Free Configs</button>
        <button onClick={() => setTab('pricing')} className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2 w-full sm:w-auto transform hover:scale-105 duration-200"><Lock size={20} /> Buy Premium</button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-12 flex flex-col md:flex-row gap-6 w-full max-w-2xl px-4 justify-center">
        <motion.a href="https://chat.whatsapp.com/LUE12DSAPkkK5Z9wirTV7n" target="_blank" whileHover={{ scale: 1.05 }} className="flex-1 flex items-center justify-between bg-[#25D366]/10 border border-[#25D366]/50 p-4 rounded-xl hover:bg-[#25D366]/20 transition-all cursor-pointer group shadow-[0_0_15px_rgba(37,211,102,0.2)]">
          <div className="flex items-center gap-3"><WhatsAppIcon className="w-8 h-8 text-[#25D366]" /><div className="text-left"><h3 className="text-white font-bold">Main Group</h3><p className="text-[#25D366] text-xs">Official Updates</p></div></div>
          <div className="flex items-center gap-2"><span className="text-white font-bold text-sm animate-pulse drop-shadow-[0_0_5px_#25D366]">JOIN NOW</span><ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" /></div>
        </motion.a>
        <motion.a href="https://chat.whatsapp.com/DAXjobEWqxs16rXFH3fk7L" target="_blank" whileHover={{ scale: 1.05 }} className="flex-1 flex items-center justify-between bg-[#25D366]/10 border border-[#25D366]/50 p-4 rounded-xl hover:bg-[#25D366]/20 transition-all cursor-pointer group shadow-[0_0_15px_rgba(37,211,102,0.2)]">
          <div className="flex items-center gap-3"><WhatsAppIcon className="w-8 h-8 text-[#25D366]" /><div className="text-left"><h3 className="text-white font-bold">Chat Group</h3><p className="text-[#25D366] text-xs">Community Support</p></div></div>
          <div className="flex items-center gap-2"><span className="text-white font-bold text-sm animate-pulse drop-shadow-[0_0_5px_#25D366]">JOIN NOW</span><ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" /></div>
        </motion.a>
      </motion.div>

      {/* TECH PULSE SECTION */}
      <div className="mt-20 w-full max-w-6xl px-4">
        <div className="flex items-center gap-2 mb-8 justify-center md:justify-start">
          <div className="w-2 h-8 bg-cyan-400 rounded-full" />
          <h2 className="text-2xl font-bold text-white tracking-[0.2em]">TECH PULSE</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent ml-4 hidden md:block"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TECH_NEWS.map((news, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02, y: -5 }} className="bg-white/5 border border-white/10 p-5 rounded-xl text-left hover:bg-cyan-500/5 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-400/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform" />
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">{news.time}</span>
              <h3 className="text-white font-bold mt-1 group-hover:text-cyan-200">{news.title}</h3>
              <p className="text-gray-400 text-xs mt-2 leading-relaxed">{news.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-16 w-full max-w-6xl px-4">
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
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 md:gap-y-8 gap-x-6 pb-20 px-2">{FREE_CONFIGS.map(config => <ConfigCard key={config.id} config={config} highlighted={config.id === recommendedId} />)}</motion.div>
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
    <div className="min-h-screen bg-[#050508] text-gray-100 font-sans selection:bg-cyan-400 selection:text-black relative flex flex-col pt-16">
      <LiveBackground />
      {/* TECH TICKER BELOW NAVBAR */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <TechTicker />
      </div>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* NEW SIDE UPDATE PANEL */}
      <UpdatePanel />
      <main className="flex-grow w-full relative z-10 pt-12">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <HomeView key="home" setTab={setActiveTab} />}
          {activeTab === 'free' && <FreeView key="free" />}
          {activeTab === 'pricing' && <PricingView key="pricing" />}
          {activeTab === 'tutorials' && <TutorialsView key="tutorials" />}
        </AnimatePresence>
      </main>
      <AIChatWidget />
      <footer className="bg-black/80 backdrop-blur-md py-8 text-center text-gray-600 text-sm border-t border-white/5 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4 opacity-50">
          <div className="h-[1px] w-12 bg-gray-600" />
          <Shield size={20} className="text-cyan-400" />
          <div className="h-[1px] w-12 bg-gray-600" />
        </div>
        <p className="font-bold tracking-widest text-gray-400">SECURE V2RAY NETWORK</p>
        <p className="mt-2">© 2026 OSKA VPN. Made for Sri Lanka 🇱🇰</p>
      </footer>
    </div>
  );
}
