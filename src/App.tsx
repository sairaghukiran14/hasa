import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpotlightCard } from './components/SpotlightCard';
import {
  CheckCircle2,
  MessageCircle,
  FileText,
  CreditCard,
  FolderSearch,
  Clock,
  MonitorSmartphone,
  PieChart,
  Bell,
  Mail,
  Star,
  X,
  Sparkles,
  ChevronLeft,
  Palette
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
  }
};

const widgetRevealLeft = {
  hidden: { opacity: 0, x: -80, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 70,
      damping: 16,
      duration: 0.8
    }
  }
};

const widgetRevealRight = {
  hidden: { opacity: 0, x: 80, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 70,
      damping: 16,
      duration: 0.8
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 }
  }
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: { opacity: { duration: 0.2 } }
  })
};

// --- CONFIGURATION FOR AD CAMPAIGN EMAIL CAPTURE ---
// Paste your Formspree Form ID here as a fallback (e.g. 'xgejywop'), or define VITE_FORMSPREE_FORM_ID in a .env file.
const FORMSPREE_FORM_ID_FALLBACK = '';

export default function App() {
  // Funnel State
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [discipline, setDiscipline] = useState<string | null>(null);
  const [bottleneck, setBottleneck] = useState<string | null>(null);
  const [volume, setVolume] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Interactive background widgets state
  const [upiStatus, setUpiStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [signStatus, setSignStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [vaultStatus, setVaultStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [whatsappStatus, setWhatsappStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // New Interactive background widgets state
  const [activeTheme, setActiveTheme] = useState<'blue' | 'purple' | 'emerald' | 'indigo'>('blue');
  const [projectFee, setProjectFee] = useState(50000);
  const [clientRating, setClientRating] = useState(5);

  // Mouse position, interactive hover states, contextual labels, and ripples
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      setCursorText(cursorAttr || '');

      const isInteractive = target.closest('a, button, [role="button"], input, select, [onClick], [data-cursor]');
      setIsHovered(!!isInteractive);
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples(prev => [...prev, newRipple]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // Live Activity Feed State
  const [feedIndex, setFeedIndex] = useState(0);
  const feeds = [
    { text: "🎨 Designer from Bengaluru voted for E-Signatures", time: "Just now" },
    { text: "💻 Developer from Mumbai voted for UPI Deposits", time: "3m ago" },
    { text: "✍️ Writer from Pune unlocked Onboarding Blueprint", time: "7m ago" },
    { text: "📣 Marketer from Chennai voted for Secure File Vault", time: "12m ago" },
    { text: "🎨 UI-UX Lead from Hyderabad voted for UPI Deposits", time: "18m ago" },
    { text: "💻 Full-stack Dev from Delhi unlocked blueprint", time: "25m ago" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFeedIndex(prev => (prev + 1) % feeds.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  // Simulators trigger handlers
  const handleUpiPay = async () => {
    if (upiStatus !== 'idle') return;
    setUpiStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 1400));
    setUpiStatus('success');
  };

  const handleSign = async () => {
    if (signStatus !== 'idle') return;
    setSignStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 1400));
    setSignStatus('success');
  };

  const handleVaultUpload = async () => {
    if (vaultStatus !== 'idle') return;
    setVaultStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 1800));
    setVaultStatus('success');
  };

  const handleWhatsappSimulate = async () => {
    if (whatsappStatus !== 'idle') return;
    setWhatsappStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 1200));
    setWhatsappStatus('success');
  };

  // ROI Calculation logic
  const calculateHoursSaved = () => {
    if (volume === '1-2') return 8;
    if (volume === '3-5') return 18;
    if (volume === '6+') return 36;
    return 0;
  };

  const handleNextStep = (value: string, setter: (val: string) => void) => {
    setter(value);
    setDirection(1);
    setStep(prev => prev + 1);
  };

  const handleBackStep = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const leadData = {
      email,
      discipline,
      bottleneck,
      volume,
      hoursSaved: calculateHoursSaved(),
      timestamp: new Date().toISOString()
    };

    // 1. Log lead details to localStorage as a failsafe backup
    try {
      const activeWaitlist = JSON.parse(localStorage.getItem('hasaboard_waitlist') || '[]');
      activeWaitlist.push(leadData);
      localStorage.setItem('hasaboard_waitlist', JSON.stringify(activeWaitlist));
    } catch (err) {
      console.warn('LocalStorage backup failed:', err);
    }

    // 2. Fetch Formspree ID from Env or Fallback constant
    const formId = import.meta.env.VITE_FORMSPREE_FORM_ID || FORMSPREE_FORM_ID_FALLBACK;

    // 3. If no Form ID is configured, simulate success using the localStorage backup only
    if (!formId || formId.trim() === '') {
      console.warn(
        'Formspree Form ID is not configured. Saving exclusively to localStorage for local validation.'
      );
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setStep(5);
      return;
    }

    // 4. Submit to Formspree API
    try {
      const response = await fetch(`https://formspree.io/f/${formId.trim()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(leadData)
      });

      if (response.ok) {
        setStatus('success');
        setStep(5);
      } else {
        console.error('Formspree submission returned error status:', response.status);
        setStatus('error');
      }
    } catch (error) {
      console.error('Network error during Formspree submission:', error);
      setStatus('error');
    }
  };

  const resetFunnel = () => {
    setStep(1);
    setDirection(-1);
    setDiscipline(null);
    setBottleneck(null);
    setVolume(null);
    setEmail('');
    setStatus('idle');
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] bg-grid-pattern text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden relative">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="flex items-center"
          >
            <span className="text-xl font-black tracking-tight text-black">
              Hasa<span className="text-blue-600">Board</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="hidden md:flex items-center gap-8 text-sm font-semibold"
          >
            <a href="#problem" className="text-black hover:text-blue-600 transition-colors">Problem</a>
            <a href="#how-it-works" className="text-black hover:text-blue-600 transition-colors">How It Works</a>
            <a href="#features" className="text-black hover:text-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="text-black hover:text-blue-600 transition-colors">Pricing</a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#waitlist"
              className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold shadow-sm shadow-blue-100 hover:bg-blue-700 transition-colors"
            >
              Start Diagnostic
            </motion.a>
          </motion.div>
        </div>
      </nav>

      <main className="pt-32 relative">
        {/* Ambient Light Glowing Orbs for visual depth */}
        <div className="absolute top-[-50px] left-[5%] w-[45vw] h-[45vw] max-w-[480px] rounded-full bg-blue-100/30 blur-[130px] -z-10 pointer-events-none" />
        <div className="absolute top-[80px] right-[5%] w-[40vw] h-[40vw] max-w-[380px] rounded-full bg-blue-50/20 blur-[110px] -z-10 pointer-events-none" />

        {/* Constraint wrapper to guarantee widgets remain in side white spaces and never overlap content */}
        <div className="max-w-[1400px] mx-auto relative w-full px-6">
          {/* Interactive Floating Sandbox Widgets - Hero Section (UPI Simulator Only) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={widgetRevealLeft}
            className="hidden min-[1400px]:flex absolute left-6 top-[15%] z-30 pointer-events-auto"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="flex flex-col gap-3 bg-white/95 border-2 border-blue-100/60 p-4.5 rounded-3xl shadow-[0_15px_40px_rgba(37,99,235,0.06)] text-xs font-bold text-black backdrop-blur-md w-60 select-none hover:border-blue-400 transition-colors duration-300 text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  UPI Simulator
                </span>
                <span className="text-[9px] text-slate-400">Step 3/5</span>
              </div>

              <div className="space-y-1.5 py-1 text-left">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] text-slate-500 font-semibold">Project Advance</span>
                  <span className="text-base font-black text-black">₹15,000</span>
                </div>
                <div className="text-[9px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg inline-block">
                  Razorpay Secured
                </div>
              </div>

              <div>
                {upiStatus === 'idle' && (
                  <button
                    onClick={handleUpiPay}
                    data-cursor="PAY ₹15,000"
                    className="w-full bg-blue-600 px-2.5 text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-[0_4px_15px_rgba(37,99,235,0.2)] flex items-center justify-center gap-1.5 cursor-pointer text-[11px]"
                  >
                    <span>⚡</span> Pay Advance Deposit
                  </button>
                )}
                {upiStatus === 'loading' && (
                  <div className="w-full bg-slate-50 border-2 border-slate-100 text-slate-500 py-2 rounded-xl flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-3.5 h-3.5 border-2 border-slate-300 border-t-blue-600 rounded-full"
                    />
                    <span className="text-[10px] font-bold">Verifying UPI...</span>
                  </div>
                )}
                {upiStatus === 'success' && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full bg-emerald-50 border border-emerald-250 text-emerald-800 p-2.5 rounded-xl text-center space-y-1.5"
                  >
                    <div className="flex items-center justify-center gap-1 text-[11px] font-black text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      Payment Successful!
                    </div>
                    <div className="text-[9px] text-emerald-600 font-medium leading-none mb-1">
                      Receipt auto-sent to client.
                    </div>
                    <button
                      onClick={() => setUpiStatus('idle')}
                      className="text-[9px] text-emerald-600 font-bold block hover:underline w-full text-center pt-1.5 border-t border-emerald-200/40 cursor-pointer"
                    >
                      Test Again
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Section */}
          <section className="text-center max-w-3xl mx-auto pb-24 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                data-cursor="CO-DESIGN"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-blue-100 bg-blue-50/20 text-xs font-extrabold shadow-[0_3px_15px_rgba(37,99,235,0.02)] mb-8 cursor-pointer select-none transition-all duration-300 hover:border-blue-300"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="text-black font-semibold">Shape HasaBoard</span>
                <span className="text-blue-600 font-bold border-l border-blue-100 pl-2">Co-Design Campaign</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-black leading-[1.1] max-w-3xl mx-auto">
                Stop chasing clients.<br />
                <span className="relative inline-block mt-3">
                  <span className="absolute -inset-x-4 -inset-y-1.5 rounded-2xl bg-blue-50/80 border border-blue-100/50 -rotate-0.5 -z-10 shadow-[0_4px_25px_rgba(37,99,235,0.03)]" />
                  <span className="text-blue-600 px-6 font-black">Onboard with one link.</span>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-black font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                We're co-designing HasaBoard — India's first client onboarding platform built specifically for freelancers. Identify your major friction bottlenecks, instantly unlock your <span className="text-blue-600 font-extrabold underline decoration-blue-200 decoration-wavy underline-offset-4">Onboarding Blueprint</span>, and vote to bring this tool to life.
              </p>
            </motion.div>

            {/* Interactive Lead Generation Funnel Card */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              className="max-w-xl mx-auto glass-panel bg-white border border-slate-200/80 p-6 md:p-8 shadow-xl shadow-slate-100 rounded-3xl relative overflow-hidden"
            >
              {/* Header step trackers */}
              {step < 5 && (
                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    {step > 1 && (
                      <button
                        onClick={handleBackStep}
                        className="p-1 rounded-lg hover:bg-slate-50 transition-colors text-black hover:text-blue-600"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    )}
                    <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100/40">
                      Step {step} of 4
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map(s => (
                      <div
                        key={s}
                        className={`w-6 h-1 rounded-full transition-all duration-300 ${s <= step ? 'bg-blue-600' : 'bg-slate-100'}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="min-h-[220px] flex flex-col justify-center text-left">
                <AnimatePresence custom={direction} mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-black text-black">What is your freelance discipline?</h3>
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {[
                          { id: 'design', label: '🎨 Design / UI-UX' },
                          { id: 'development', label: '💻 Development' },
                          { id: 'writing', label: '✍️ Writing & Content' },
                          { id: 'marketing', label: '📣 Marketing & Strategy' }
                        ].map(option => (
                          <button
                            key={option.id}
                            onClick={() => handleNextStep(option.id, setDiscipline)}
                            className="p-4 rounded-2xl border-2 border-slate-100/80 text-left font-bold text-black hover:border-blue-600 hover:bg-blue-50/20 active:bg-blue-50/50 transition-all duration-200 text-sm md:text-base shadow-sm hover:shadow-[0_8px_25px_rgba(37,99,235,0.04)] cursor-pointer"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-black text-black">What is your biggest onboarding bottleneck?</h3>
                      <div className="grid grid-cols-1 gap-2.5 pt-2">
                        {[
                          { id: 'payments', label: '💸 Chasing upfront deposit payments' },
                          { id: 'briefs', label: '📄 Getting clear brief briefs & answers' },
                          { id: 'contracts', label: '✍️ Getting contract signatures back' },
                          { id: 'assets', label: '📂 Hunting down client brand files & logos' }
                        ].map(option => (
                          <button
                            key={option.id}
                            onClick={() => handleNextStep(option.id, setBottleneck)}
                            className="p-4 rounded-2xl border-2 border-slate-100/80 text-left font-bold text-black hover:border-blue-600 hover:bg-blue-50/20 active:bg-blue-50/50 transition-all duration-200 text-sm md:text-base w-full shadow-sm hover:shadow-[0_8px_25px_rgba(37,99,235,0.04)] cursor-pointer"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-black text-black">How many clients do you onboard monthly?</h3>
                      <div className="grid grid-cols-3 gap-3 pt-2">
                        {[
                          { id: '1-2', label: '1 - 2' },
                          { id: '3-5', label: '3 - 5' },
                          { id: '6+', label: '6 or more' }
                        ].map(option => (
                          <button
                            key={option.id}
                            onClick={() => handleNextStep(option.id, setVolume)}
                            className="p-4 rounded-2xl border-2 border-slate-100/80 text-center font-black text-black hover:border-blue-600 hover:bg-blue-50/20 active:bg-blue-50/50 transition-all duration-200 text-base shadow-sm hover:shadow-[0_8px_25px_rgba(37,99,235,0.04)] cursor-pointer"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="bg-blue-50/80 border border-blue-100 p-5 rounded-2xl text-left shadow-sm">
                        <h4 className="font-black text-blue-600 text-lg mb-1.5 flex items-center gap-1.5">
                          <span>⚡</span> Your Friction Report
                        </h4>
                        <p className="text-sm text-black font-semibold leading-relaxed">
                          Based on onboarding <span className="text-blue-600 font-extrabold">{volume} clients</span> monthly, you are losing up to <span className="text-blue-600 font-extrabold underline decoration-blue-300 decoration-wavy underline-offset-2">{calculateHoursSaved()} hours</span> every month on administrative friction. Help us build the solution to eliminate this!
                        </p>
                      </div>

                      <div className="space-y-4 text-left">
                        <h3 className="text-sm md:text-base font-black text-black leading-tight">
                          Cast your vote to build <span className="text-blue-600">HasaBoard</span>, unlock your custom <span className="text-blue-600">Blueprint</span>, & get 3 months free!
                        </h3>
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@email.com"
                            disabled={status === 'loading'}
                            className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 text-black font-semibold placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                          />
                          <motion.button
                            type="submit"
                            disabled={status === 'loading'}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            data-cursor="VOTE"
                            className="bg-blue-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-md hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center min-w-[170px] cursor-pointer"
                          >
                            {status === 'loading' ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              />
                            ) : (
                              'Cast Vote & View Blueprint'
                            )}
                          </motion.button>
                        </form>
                        {status === 'error' && (
                          <p className="text-red-500 text-xs">Something went wrong. Please try again.</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4 text-center py-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center mx-auto text-blue-600 shadow-sm">
                        <CheckCircle2 className="w-10 h-10 animate-bounce" />
                      </div>
                      <h3 className="text-2xl font-black text-black">Vote Cast & Blueprint Unlocked!</h3>
                      <p className="text-sm text-black font-semibold max-w-sm mx-auto leading-relaxed">
                        Thank you! Your vote has been registered. If we reach <span className="text-blue-600 font-extrabold">100 votes</span> (currently at <span className="text-blue-600 font-black">53</span>), we will start building immediately. We've sent your custom blueprint to your email!
                      </p>
                      <div className="pt-2">
                        <button
                          onClick={resetFunnel}
                          className="text-xs font-bold text-black hover:text-blue-600 hover:border-blue-300 transition-all border-2 border-slate-100 bg-slate-50 px-4 py-2 rounded-xl cursor-pointer"
                        >
                          Reset Diagnostic
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </section>
        </div>

        {/* The Problem Section */}
        <section id="problem" className="py-24 border-t border-slate-100 bg-[#f8fafc]/50">
          <div className="max-w-[1400px] mx-auto relative px-6 w-full">

            {/* DocuSeal Tester Simulator Widget - floats on the right, contextually aligned with Problem assessment details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={widgetRevealRight}
              className="hidden min-[1400px]:flex absolute right-6 top-[20%] z-30 pointer-events-auto"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                className="flex flex-col gap-3 bg-white/95 border-2 border-blue-100/60 p-4.5 rounded-3xl shadow-[0_15px_40px_rgba(37,99,235,0.06)] text-xs font-bold text-black backdrop-blur-md w-60 select-none hover:border-blue-400 transition-colors duration-300 text-left"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
                    </span>
                    DocuSeal Tester
                  </span>
                  <span className="text-[9px] text-slate-400">Step 2/5</span>
                </div>

                <div className="space-y-1 py-1 text-left">
                  <span className="text-[10px] text-slate-500 font-semibold block">Agreement Document</span>
                  <span className="text-xs font-bold text-black flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                    <FileText className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    Service_Agreement.pdf
                  </span>
                </div>

                <div>
                  {signStatus === 'idle' && (
                    <button
                      onClick={handleSign}
                      data-cursor="SIGN AGREEMENT"
                      className="w-full border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/10 text-blue-600 font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-[11px]"
                    >
                      <span>✍️</span> Click to Auto-Sign
                    </button>
                  )}
                  {signStatus === 'loading' && (
                    <div className="w-full bg-slate-50 border-2 border-slate-100 text-slate-500 py-2 rounded-xl flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-3.5 h-3.5 border-2 border-slate-300 border-t-blue-600 rounded-full"
                      />
                      <span className="text-[10px] font-bold">Applying Signature...</span>
                    </div>
                  )}
                  {signStatus === 'success' && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-full bg-blue-50 border border-blue-200 text-blue-800 p-2.5 rounded-xl text-center space-y-1.5 animate-once"
                    >
                      <div className="text-[10px] font-black text-blue-800 leading-none">
                        Signed Electronically!
                      </div>
                      <div className="font-serif italic text-base text-blue-600 py-1 bg-white rounded-lg border border-blue-100 tracking-wide select-none shadow-[inset_0_2px_4px_rgba(37,99,235,0.03)]">
                        Sairaghu K.
                      </div>
                      <span className="text-[8px] text-blue-600 font-semibold block uppercase tracking-wider mb-0.5">
                        Timestamp Secured 🔒
                      </span>
                      <button
                        onClick={() => setSignStatus('idle')}
                        className="text-[9px] text-blue-600 font-bold block hover:underline w-full text-center pt-1.5 border-t border-blue-200/40 cursor-pointer"
                      >
                        Test Again
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Inner content grid wrapper */}
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="text-center mb-16"
              >
                <p className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">The Problem We Are Solving</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Is your current onboarding as broken as we think?</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">We hear this from freelancers daily. We want to build HasaBoard to consolidate your stack into a single elegant workspace. Here is the friction we aim to eliminate:</p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[
                  { icon: <MessageCircle className="w-5 h-5 text-blue-600" />, title: "WhatsApp Chaos", desc: "Client briefs buried in chat threads. Important details lost between voice notes." },
                  { icon: <FileText className="w-5 h-5 text-blue-600" />, title: "Forms + Email Chains", desc: "Intake forms disconnected from contracts. Spreadsheets tracking who paid." },
                  { icon: <CreditCard className="w-5 h-5 text-blue-600" />, title: "Payment Follow-ups", desc: "\"Did you send the advance?\" The awkward money conversation, every time." },
                  { icon: <FolderSearch className="w-5 h-5 text-blue-600" />, title: "File Scavenger Hunt", desc: "Thirty minutes collecting brand assets before you can even start working." },
                  { icon: <MonitorSmartphone className="w-5 h-5 text-blue-600" />, title: "Unprofessional Impression", desc: "Sending five different links screams \"I'm winging it.\"" },
                  { icon: <Clock className="w-5 h-5 text-blue-600" />, title: "Hours Wasted Weekly", desc: "You lose 3-5 hours per client on administrative friction alone." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    whileHover={{ y: -4, boxShadow: '0 10px 35px -5px rgb(0,0,0,0.05)' }}
                    className="h-full"
                  >
                    <SpotlightCard className="glass-panel p-6 bg-white h-full transition-all duration-300" data-cursor="PROBLEM">
                      <div className="w-10 h-10 border border-slate-100 bg-slate-50 rounded-xl flex items-center justify-center mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 border-t border-slate-100">
          <div className="max-w-[1400px] mx-auto relative px-6 w-full">

            {/* Secure File Vault Simulator Widget - floats on the left, contextually aligning with Step 4 (File Vault Upload) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={widgetRevealLeft}
              className="hidden min-[1400px]:flex absolute left-6 top-[58%] z-30 pointer-events-auto"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut" }}
                className="flex flex-col gap-3 bg-white/95 border-2 border-blue-100/60 p-4.5 rounded-3xl shadow-[0_15px_40px_rgba(37,99,235,0.06)] text-xs font-bold text-black backdrop-blur-md w-60 select-none hover:border-blue-400 transition-colors duration-300 text-left"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                    </span>
                    Secure File Vault
                  </span>
                  <span className="text-[9px] text-slate-400">Step 4/5</span>
                </div>

                <div className="space-y-1.5 py-1 text-left">
                  <span className="text-[10px] text-slate-500 font-semibold block">Requested Assets</span>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] text-black">
                      <FolderSearch className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>logo_vector.svg</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-black">
                      <FolderSearch className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>brand_guidelines.pdf</span>
                    </div>
                  </div>
                </div>

                <div>
                  {vaultStatus === 'idle' && (
                    <button
                      onClick={handleVaultUpload}
                      className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl hover:bg-black transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer text-[11px]"
                    >
                      <span>📁</span> Upload Brand Files
                    </button>
                  )}
                  {vaultStatus === 'loading' && (
                    <div className="w-full bg-slate-50 border-2 border-slate-100 p-2.5 rounded-xl space-y-1.5">
                      <div className="flex justify-between items-center text-[9px] text-slate-500">
                        <span className="font-bold">Encrypting files...</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          className="bg-blue-600 h-full"
                        />
                      </div>
                    </div>
                  )}
                  {vaultStatus === 'success' && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-full bg-amber-50 border border-amber-200 text-amber-900 p-2.5 rounded-xl text-center space-y-1.5"
                    >
                      <div className="flex items-center justify-center gap-1 text-[11px] font-black text-amber-800">
                        <span>🔒</span> Vault Locked & Saved!
                      </div>
                      <div className="text-[9px] text-amber-700 font-medium leading-none mb-1">
                        Encrypted inside AES-256 vault.
                      </div>
                      <button
                        onClick={() => setVaultStatus('idle')}
                        className="text-[9px] text-amber-700 font-bold block hover:underline w-full text-center pt-1.5 border-t border-amber-200/40 cursor-pointer"
                      >
                        Test Again
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Centered Content Wrapper */}
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="text-center mb-16"
              >
                <p className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">The Proposed Blueprint</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">One link. Five steps. Zero chaos.</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">Here is how HasaBoard will work once we build it. Help us shape this custom workflow by casting your vote:</p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="space-y-8"
              >
                {[
                  { step: "1", tag: "Intake", title: "Custom Brief Form", desc: "Your client fills out a branded questionnaire — project goals, timelines, preferences." },
                  { step: "2", tag: "Contract", title: "E-Signature", desc: "Your contract auto-fills with client details and is ready to sign. Legally binding." },
                  { step: "3", tag: "Payment", title: "Deposit via UPI or Card", desc: "The client pays the advance right there. Instant receipt. No awkward conversations." },
                  { step: "4", tag: "Assets", title: "File Vault Upload", desc: "Brand guidelines and logos uploaded to a secure vault. No WhatsApp attachments." },
                  { step: "5", tag: "Kickoff", title: "Project Begins", desc: "Client sees the roadmap. Status changes to 'in-progress.' You get notified." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="flex gap-6 items-start"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-blue-100 bg-blue-50/50 flex items-center justify-center text-blue-600 font-bold text-lg">
                      {item.step}
                    </div>
                    <div className="glass-panel p-6 flex-1 bg-white">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5 block">{item.tag}</span>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 border-t border-slate-100 bg-[#f8fafc]/50">
          <div className="max-w-[1400px] mx-auto relative px-6 w-full">

            {/* WhatsApp Alert Hub Simulator Widget - floats on the right, contextually aligned with Row 2, Card 1 (WhatsApp Alerts) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={widgetRevealRight}
              className="hidden min-[1400px]:flex absolute right-6 top-[42%] z-30 pointer-events-auto"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 6.2, ease: "easeInOut" }}
                className="flex flex-col gap-3 bg-white/95 border-2 border-emerald-100/60 p-4.5 rounded-3xl shadow-[0_15px_40px_rgba(16,185,129,0.05)] text-xs font-bold text-black backdrop-blur-md w-60 select-none hover:border-emerald-400 transition-colors duration-300 text-left"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    WhatsApp Alert Hub
                  </span>
                  <span className="text-[9px] text-slate-400">Step 5/5</span>
                </div>

                <div className="space-y-1.5 py-1 text-left">
                  <span className="text-[10px] text-slate-500 font-semibold block">Client Notifications</span>
                  <div className="flex items-center gap-1.5 bg-emerald-50/40 border border-emerald-100/50 p-2 rounded-xl text-[9px] text-slate-500 font-medium">
                    <Bell className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Simulates live WhatsApp client check-ins.</span>
                  </div>
                </div>

                <div>
                  {whatsappStatus === 'idle' && (
                    <button
                      onClick={handleWhatsappSimulate}
                      data-cursor="TEST ALERTS"
                      className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-sm hover:shadow-[0_4px_15px_rgba(16,185,129,0.2)] flex items-center justify-center gap-1.5 cursor-pointer text-[11px]"
                    >
                      <span>💬</span> Test Live Notification
                    </button>
                  )}
                  {whatsappStatus === 'loading' && (
                    <div className="w-full bg-slate-50 border-2 border-slate-100 text-slate-500 py-2 rounded-xl flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-3.5 h-3.5 border-2 border-slate-300 border-t-emerald-600 rounded-full"
                      />
                      <span className="text-[10px] font-bold">Routing Alert...</span>
                    </div>
                  )}
                  {whatsappStatus === 'success' && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-full bg-emerald-50 border border-emerald-250 text-emerald-950 p-2.5 rounded-xl text-left space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-[8px] text-emerald-700 uppercase tracking-wider font-extrabold">
                        <span>WhatsApp Biz 🔔</span>
                        <span>Just Now</span>
                      </div>
                      <p className="text-[10px] text-slate-800 leading-tight">
                        <strong className="text-emerald-800">HasaBoard:</strong> Rohan signed contract & paid ₹15,000 advance. Project kicked off automatically! 🚀
                      </p>
                      <button
                        onClick={() => setWhatsappStatus('idle')}
                        className="text-[9px] text-emerald-600 font-bold block hover:underline w-full text-center pt-1.5 border-t border-emerald-200/40 cursor-pointer"
                      >
                        Test Again
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Inner Content Grid */}
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="text-center mb-16"
              >
                <p className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">Planned Features Roadmap</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Everything you need to look professional.</h2>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[
                  { icon: <MonitorSmartphone className="w-5 h-5 text-blue-600" />, title: "Branded Workspace", desc: "Upload your logo, set your brand color. Every page reflects your identity." },
                  { icon: <Clock className="w-5 h-5 text-blue-600" />, title: "Live Progress Tracking", desc: "See where each client is — intake done, contract pending — all in real-time." },
                  { icon: <PieChart className="w-5 h-5 text-blue-600" />, title: "Revenue Analytics", desc: "Total revenue, pending deposits. Financial clarity without spreadsheets." },
                  { icon: <Bell className="w-5 h-5 text-blue-600" />, title: "WhatsApp Alerts", desc: "Instant notifications when a client signs, pays, or uploads." },
                  { icon: <Mail className="w-5 h-5 text-blue-600" />, title: "Automated Emails", desc: "Receipt confirmations and welcome messages sent automatically." },
                  { icon: <Star className="w-5 h-5 text-blue-600" />, title: "Auto Testimonials", desc: "7 days after kickoff, clients receive a feedback request automatically." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    whileHover={{ y: -4, boxShadow: '0 10px 35px -5px rgb(0,0,0,0.05)' }}
                    className="h-full"
                  >
                    <SpotlightCard className="glass-panel p-6 bg-white h-full transition-all" data-cursor="ROADMAP">
                      <div className="w-10 h-10 border border-slate-100 bg-slate-50 rounded-xl flex items-center justify-center mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </motion.div>

              {/* Premium SaaS Workspace Mockup Showcase */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
                className="mt-20 border border-slate-200/80 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-white p-4 relative"
              >
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <img
                  src="/dashboard_mockup.png"
                  alt="HasaBoard Freelance Onboarding Dashboard Mockup"
                  className="w-full h-auto rounded-2xl border border-slate-100 mt-2"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section id="comparison" className="py-24 border-t border-slate-100">
          <div className="max-w-[1400px] mx-auto relative px-6 w-full">

            {/* Workspace Theme Customizer Widget - floats on the left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={widgetRevealLeft}
              className="hidden min-[1400px]:flex absolute left-6 top-[15%] z-30 pointer-events-auto"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="flex flex-col gap-3 bg-white/95 border-2 border-slate-100 p-4.5 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.04)] text-xs font-bold text-black backdrop-blur-md w-60 select-none hover:border-slate-300 transition-colors duration-300 text-left"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-slate-500" />
                    Theme Customizer
                  </span>
                  <span className="text-[9px] text-slate-400">Preview</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-semibold block">Brand Color Scheme</span>
                  <div className="flex gap-2 py-1 justify-start items-center">
                    {[
                      { id: 'blue', color: 'bg-blue-600' },
                      { id: 'purple', color: 'bg-purple-600' },
                      { id: 'emerald', color: 'bg-emerald-600' },
                      { id: 'indigo', color: 'bg-indigo-600' }
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => setActiveTheme(t.id as any)}
                        className={`w-5.5 h-5.5 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${t.color} ${activeTheme === t.id ? 'ring-2 ring-offset-2 ring-slate-400' : ''}`}
                      />
                    ))}
                  </div>
                </div>

                <div className={`p-3 rounded-2xl border-2 transition-all duration-300 text-left ${activeTheme === 'blue' ? 'border-blue-100/60 bg-blue-50/20' :
                    activeTheme === 'purple' ? 'border-purple-100/60 bg-purple-50/20' :
                      activeTheme === 'emerald' ? 'border-emerald-100/60 bg-emerald-50/20' :
                        'border-indigo-100/60 bg-indigo-50/20'
                  }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-[9px] font-black uppercase tracking-wider ${activeTheme === 'blue' ? 'text-blue-600' :
                        activeTheme === 'purple' ? 'text-purple-600' :
                          activeTheme === 'emerald' ? 'text-emerald-600' :
                            'text-indigo-600'
                      }`}>
                      Client Portal
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full ${activeTheme === 'blue' ? 'bg-blue-600 animate-pulse' :
                        activeTheme === 'purple' ? 'bg-purple-600 animate-pulse' :
                          activeTheme === 'emerald' ? 'bg-emerald-600 animate-pulse' :
                            'bg-indigo-600 animate-pulse'
                      }`} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-black text-black">Aria Design Studio</div>
                    <div className="text-[8px] text-slate-400 font-semibold">Project: Mobile App V2</div>
                  </div>
                  <div className="mt-3">
                    <div className={`w-full py-1.5 rounded-lg text-[9px] font-black text-center text-white transition-all duration-300 ${activeTheme === 'blue' ? 'bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-100' :
                        activeTheme === 'purple' ? 'bg-purple-600 hover:bg-purple-700 shadow-sm shadow-purple-100' :
                          activeTheme === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-100' :
                            'bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-100'
                      }`}>
                      Review & Sign
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Existing Comparison Content centered */}
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10"
              >
                The Old Way vs. The HasaBoard Vision
              </motion.h2>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                className="overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-sm"
              >
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-4 text-slate-900 font-bold">Task</th>
                      <th className="p-4 text-slate-500 font-semibold border-l border-slate-200">Current Way</th>
                      <th className="p-4 text-blue-700 font-bold border-l border-slate-200">HasaBoard</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      ["Client intake", "Google Forms, manual tracking", "Built-in branded forms"],
                      ["Contract signing", "PDF, print, scan, email", "One-click e-signature"],
                      ["Collect deposit", "\"Send to this UPI\" + screenshot", "UPI + Card, auto receipt"],
                      ["Brand assets", "WhatsApp, Drive, Email", "Secure file vault"],
                      ["Project kickoff", "Manual message", "Automated checklist"],
                      ["First impression", "5 different links", "One branded link"]
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 text-slate-900 font-semibold">{row[0]}</td>
                        <td className="p-4 text-slate-400 border-l border-slate-100"><span className="inline-flex items-center gap-1.5"><X className="w-4 h-4 text-red-400" /> {row[1]}</span></td>
                        <td className="p-4 text-slate-700 border-l border-slate-100 font-medium"><span className="inline-flex items-center gap-1.5 text-blue-600"><CheckCircle2 className="w-4 h-4 text-blue-600" /> {row[2]}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 border-t border-slate-100 bg-[#f8fafc]/50">
          <div className="max-w-[1400px] mx-auto relative px-6 w-full">

            {/* Indian Freelancer Tax & Retainer Estimator Widget - floats on the right */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={widgetRevealRight}
              className="hidden min-[1400px]:flex absolute right-6 top-[10%] z-30 pointer-events-auto"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                className="flex flex-col gap-3.5 bg-white/95 border-2 border-blue-100/60 p-4.5 rounded-3xl shadow-[0_15px_40px_rgba(37,99,235,0.06)] text-xs font-bold text-black backdrop-blur-md w-60 select-none hover:border-blue-400 transition-colors duration-300 text-left"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                    <PieChart className="w-3.5 h-3.5 text-blue-600" />
                    GST & TDS Calculator
                  </span>
                  <span className="text-[9px] text-slate-400">Indian Tax</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-slate-500">
                    <span>Project Budget</span>
                    <span className="font-black text-black">₹{projectFee.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="200000"
                    step="5000"
                    value={projectFee}
                    onChange={(e) => setProjectFee(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1 bg-slate-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex gap-1.5 mt-1.5">
                    {[20000, 50000, 100000].map(fee => (
                      <button
                        key={fee}
                        onClick={() => setProjectFee(fee)}
                        className={`flex-1 py-1 rounded-lg text-[9px] font-black border transition-all cursor-pointer ${projectFee === fee
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-100'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600'
                          }`}
                      >
                        ₹{(fee / 1000).toFixed(0)}K
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="text-slate-400 font-semibold">18% GST (Collected)</span>
                    <span className="text-slate-600 font-bold">+₹{(projectFee * 0.18).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="text-slate-400 font-semibold">10% TDS (Deducted)</span>
                    <span className="text-slate-600 font-bold">-₹{(projectFee * 0.10).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-[9px] bg-blue-50/50 p-1.5 rounded-lg border border-blue-100/40">
                    <span className="text-blue-600 font-extrabold">50% Advance Retainer</span>
                    <span className="text-blue-600 font-black">₹{(projectFee * 0.50).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1.5 border-t border-dashed border-slate-200">
                    <span className="text-[10px] text-slate-800 font-bold">Net Take-Home</span>
                    <span className="text-xs font-black text-black">₹{(projectFee + (projectFee * 0.18) - (projectFee * 0.10)).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Existing Pricing Content centered */}
            <div className="max-w-lg mx-auto text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-center mb-10"
              >
                <p className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">Validation Incentive</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Free locked early access for co-designers.</h2>
                <p className="text-slate-500">Vote now to lock in 3 months of free access and a permanent low rate if built.</p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                whileHover={{ y: -4, boxShadow: '0 20px 40px -15px rgb(0,0,0,0.08)' }}
                className="glass-panel p-8 bg-white border-blue-200 relative overflow-hidden transition-all duration-300 text-left"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">Co-Design Priority Reward</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-extrabold text-slate-900">Free</span>
                </div>
                <p className="text-sm text-slate-500 mb-8">for 3 months, then ₹499/mo locked forever if built.</p>

                <ul className="space-y-4 mb-8">
                  {[
                    "Unlimited onboarding links",
                    "Custom branded workspace",
                    "UPI + Card payment collection",
                    "E-signature contracts",
                    "Secure file vault (5GB)",
                    "WhatsApp + Email notifications"
                  ].map((perk, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#waitlist"
                  className="block w-full bg-blue-600 text-white font-bold text-center py-4 rounded-xl shadow-md hover:bg-blue-700 transition-colors"
                >
                  Vote to Lock in Early Access
                </motion.a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Waitlist Section (Anchored Funnel) */}
        <section id="waitlist" className="py-32 border-t border-slate-100">
          <div className="max-w-[1400px] mx-auto relative px-6 w-full">

            {/* Client Feedback Rating Card Widget - floats on the left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={widgetRevealLeft}
              className="hidden min-[1400px]:flex absolute left-6 top-[22%] z-30 pointer-events-auto"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut" }}
                className="flex flex-col gap-3.5 bg-white/95 border-2 border-slate-100 p-4.5 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.04)] text-xs font-bold text-black backdrop-blur-md w-60 select-none hover:border-slate-300 transition-colors duration-300 text-left"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    Live Testimonials
                  </span>
                  <span className="text-[9px] text-slate-400">Interactive</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-semibold block">Select Rating</span>
                  <div className="flex gap-1.5 justify-start">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setClientRating(star)}
                        className="text-amber-400 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                      >
                        <Star
                          className="w-4.5 h-4.5"
                          fill={star <= clientRating ? "currentColor" : "none"}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl min-h-[90px] flex flex-col justify-between text-left">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={clientRating}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-1.5 flex-1 flex flex-col justify-between"
                    >
                      <p className="text-[9px] text-slate-600 font-bold italic leading-relaxed">
                        "{
                          clientRating === 5 ? "The absolute smoothest onboarding I've ever experienced. Paid my deposit via UPI in 30 seconds!" :
                            clientRating === 4 ? "Really professional process. Highly recommend this over messy WhatsApp chats." :
                              clientRating === 3 ? "Signing and paying advance was easy. Good overall client flow." :
                                clientRating === 2 ? "It was okay, but I prefer simple emails." :
                                  "Too many steps. Let me just send a bank transfer."
                        }"
                      </p>
                      <div className="text-[8px] text-slate-400 font-extrabold pt-1 border-t border-slate-150">
                        — {
                          clientRating === 5 ? "Rohan S. (Founder, TechNext)" :
                            clientRating === 4 ? "Nikita P. (VP Product, Aria)" :
                              clientRating === 3 ? "Amit K. (Product Lead)" :
                                clientRating === 2 ? "Suresh M. (Business Owner)" :
                                  "Vikram G. (Traditional Client)"
                        }
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>

            {/* Existing Waitlist Content centered */}
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="mb-8"
              >
                <div className="flex justify-center -space-x-2 mb-4">
                  {['SK', 'RP', 'AM', 'VT'].map((initial, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-700">
                      {initial}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-400">
                    +47
                  </div>
                </div>
                <p className="text-slate-500 font-semibold text-sm">
                  <strong className="text-slate-900">52 freelancers</strong> have voted to build HasaBoard. Help us hit our target of 100!
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                className="glass-panel p-8 md:p-12 bg-white shadow-lg border-slate-150 rounded-3xl"
              >
                <h2 className="text-3xl font-black text-black mb-2">
                  Help Shape the Future of <span className="text-blue-600">HasaBoard</span>
                </h2>
                <p className="text-black font-semibold mb-8 max-w-md mx-auto">
                  We're gathering input from India's freelance community to co-design this product. Cast your vote by analyzing your onboarding friction at the top of the page.
                </p>

                <motion.button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl shadow-md hover:bg-blue-700 transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  Start Onboarding Friction Quiz & Vote <Sparkles className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 py-12 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-400">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-sm font-semibold text-slate-500">
              <span className="font-bold text-slate-800">Hasa<span className="text-blue-600">Board</span></span>. Made in India.
            </span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>

      {/* Live Community Activity Toast */}
      <AnimatePresence mode="wait">
        <motion.div
          key={feedIndex}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 bg-white/95 border-2 border-blue-100 p-4 rounded-2xl shadow-[0_15px_40px_rgba(37,99,235,0.08)] backdrop-blur-md w-76 flex items-start gap-3 pointer-events-auto hover:border-blue-400 transition-colors duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 animate-pulse">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-[11px] font-black text-black leading-tight">
              {feeds[feedIndex].text}
            </p>
            <span className="text-[9px] text-slate-400 font-bold block mt-1.5 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {feeds[feedIndex].time}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Mouse Trailing Spotlight Follower */}
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-60 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.035), transparent 80%)`
        }}
      />

      {/* Click Ripples */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="fixed rounded-full border-2 border-blue-500/50 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 70, height: 70, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onAnimationComplete={() => {
            setRipples(prev => prev.filter(r => r.id !== ripple.id));
          }}
        />
      ))}

      {/* Responsive Custom Cursor Inner Dot */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 rounded-full bg-blue-600 pointer-events-none z-[10000]"
        animate={{
          x: mousePos.x - 3,
          y: mousePos.y - 3,
          width: 6,
          height: 6,
          scale: isHovered ? 0.3 : 1
        }}
        transition={{ type: "spring", stiffness: 850, damping: 38, mass: 0.02 }}
      />

      {/* Elastic Custom Cursor Ring Follower */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 rounded-full border-2 border-blue-500/40 pointer-events-none z-[9999]"
        animate={{
          x: mousePos.x - (isHovered ? 28 : 14),
          y: mousePos.y - (isHovered ? 28 : 14),
          width: isHovered ? 56 : 28,
          height: isHovered ? 56 : 28,
          borderColor: isHovered ? "rgba(37, 99, 235, 0.8)" : "rgba(37, 99, 235, 0.3)",
          backgroundColor: isHovered ? "rgba(37, 99, 235, 0.06)" : "rgba(37, 99, 235, 0)"
        }}
        transition={{ type: "spring", stiffness: 240, damping: 25, mass: 0.22 }}
      />

      {/* Context-Aware Cursor Label */}
      <AnimatePresence>
        {isHovered && cursorText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className="hidden md:block fixed top-0 left-0 bg-blue-600 border border-blue-500 text-white text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full shadow-[0_4px_12px_rgba(37,99,235,0.2)] pointer-events-none z-[9999]"
            style={{
              x: mousePos.x + 18,
              y: mousePos.y + 18
            }}
          >
            {cursorText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
