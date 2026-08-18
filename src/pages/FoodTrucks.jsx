import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, MapPin, Map, BellRing, Smartphone, CheckCircle2, TrendingUp, Sparkles, Navigation } from 'lucide-react';
import { trackEvent, setClarityTag } from '../utils/clarity';

/**
 * BrushSeparator — identical to Bouchers.jsx / Itinerants.jsx
 */
const BrushSeparator = ({ fillColor = '#FDF3E2', className = '' }) => (
  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[140vw] max-w-none flex justify-center items-end overflow-hidden z-20 pointer-events-none translate-y-1/2 ${className}`}>
    <div className="relative w-full flex justify-center">
      <div
        className="w-[140vw]"
        style={{
          backgroundColor: fillColor,
          WebkitMaskImage: "url('/vecteezy-brush.png')",
          WebkitMaskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'bottom center',
          maskImage: "url('/vecteezy-brush.png')",
          maskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          maskPosition: 'bottom center',
          aspectRatio: '1440 / 324',
        }}
      />
    </div>
  </div>
);

// --- Fluid, Free-Floating & Tall Truck Scroll Journey ---
const TruckScrollAnimation = () => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [truckPos, setTruckPos] = useState({
    xPct: 20,
    yPct: 6.6,
    angle: 0,
    facing: -1,
    progress: 0,
  });

  const animState = useRef({
    currentProgress: 0,
    targetProgress: 0,
    rafId: null,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight || document.documentElement.clientHeight;

      // Smooth progress calculation through the vertical stretch
      const startY = windowH * 0.85;
      const endY = windowH * 0.15;
      const progress = (startY - rect.top) / (startY - endY + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      animState.current.targetProgress = clamped;
    };

    const updatePhysics = () => {
      const state = animState.current;
      const path = pathRef.current;

      // Smooth lerp (linear interpolation) for silky 60fps movement
      const diff = state.targetProgress - state.currentProgress;
      if (Math.abs(diff) > 0.0005) {
        state.currentProgress += diff * 0.09;
      } else {
        state.currentProgress = state.targetProgress;
      }

      if (path) {
        const totalLen = path.getTotalLength();
        const curLen = Math.max(0, Math.min(totalLen, state.currentProgress * totalLen));
        const pt = path.getPointAtLength(curLen);

        // Compute tangent vector for natural orientation along curves
        const delta = 4;
        const pBack = path.getPointAtLength(Math.max(0, curLen - delta));
        const pFwd = path.getPointAtLength(Math.min(totalLen, curLen + delta));
        const dx = pFwd.x - pBack.x;
        const dy = pFwd.y - pBack.y;
        const rawAngle = Math.atan2(dy, dx) * (180 / Math.PI);

        // ViewBox is 600 x 750
        const xPct = (pt.x / 600) * 100;
        const yPct = (pt.y / 750) * 100;

        // The 🚚 emoji faces left in standard system fonts
        const isMovingLeft = dx < 0;
        const facing = isMovingLeft ? 1 : -1;
        const adjustedAngle = isMovingLeft ? rawAngle - 180 : rawAngle;

        setTruckPos({
          xPct,
          yPct,
          angle: adjustedAngle * 0.45, // smooth dynamic banking
          facing,
          progress: state.currentProgress,
        });
      }

      state.rafId = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    animState.current.rafId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animState.current.rafId) {
        cancelAnimationFrame(animState.current.rafId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto my-12 min-h-[580px] sm:min-h-[640px] md:min-h-[720px] select-none"
    >
      {/* Free-Floating SVG Curve - No white background box */}
      <svg
        viewBox="0 0 600 750"
        className="w-full h-full absolute inset-0 overflow-visible pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="roadGradientTall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#19522A" stopOpacity="0.2" />
            <stop offset="45%" stopColor="#558D4D" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f39313" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* Soft Ambient Road Track Underlay */}
        <path
          d="M 120,50 C 360,40 520,120 500,240 C 480,360 100,320 90,460 C 80,600 480,560 480,680 C 480,720 380,735 300,735"
          fill="none"
          stroke="url(#roadGradientTall)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Main Dashed Road Line */}
        <path
          ref={pathRef}
          d="M 120,50 C 360,40 520,120 500,240 C 480,360 100,320 90,460 C 80,600 480,560 480,680 C 480,720 380,735 300,735"
          fill="none"
          stroke="#19522A"
          strokeWidth="4"
          strokeDasharray="10 10"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />

        {/* Start Pin Glow */}
        <circle cx="120" cy="50" r="7" fill="#19522A" />
        <circle cx="120" cy="50" r="14" fill="#19522A" fillOpacity="0.15" />

        {/* Step Checkpoints along the curve */}
        <circle cx="500" cy="240" r="6" fill="#f39313" />
        <circle cx="90" cy="460" r="6" fill="#558D4D" />
        <circle cx="480" cy="680" r="6" fill="#19522A" />

        {/* End Arrival Pin Glow */}
        <circle cx="300" cy="735" r="8" fill="#f39313" />
        <circle cx="300" cy="735" r="16" fill="#f39313" fillOpacity="0.2" />
      </svg>

      {/* ===== FLOATING TEXT MILESTONES ALONG THE CURVE ===== */}

      {/* Start Label (Top Left) */}
      <div className="absolute top-2 left-4 md:left-8 z-10">
        <div className="inline-flex items-center gap-2 bg-[#19522A] text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#f39313] animate-ping"></span>
          <span>11h30 · Départ en service</span>
        </div>
      </div>

      {/* Milestone 1 (Top Right Turn) */}
      <div
        className="absolute top-[16%] right-2 sm:right-4 md:right-8 z-10 max-w-[240px] sm:max-w-[270px] bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-[#D9DCD5] shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
      >
        <div className="flex items-center gap-2 mb-1.5 text-[#19522A]">
          <div className="w-6 h-6 rounded-full bg-[#558D4D]/15 flex items-center justify-center text-xs font-bold text-[#558D4D]">
            1
          </div>
          <span className="font-display text-sm text-[#19522A]">Je me gare & j'active</span>
        </div>
        <p className="text-xs text-[#667079] leading-relaxed">
          Position validée en 1 clic sur la carte interactive locale.
        </p>
      </div>

      {/* Milestone 2 (Middle Left Turn) */}
      <div
        className="absolute top-[48%] left-2 sm:left-4 md:left-8 z-10 max-w-[240px] sm:max-w-[270px] bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-[#D9DCD5] shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
      >
        <div className="flex items-center gap-2 mb-1.5 text-[#f39313]">
          <div className="w-6 h-6 rounded-full bg-[#f39313]/15 flex items-center justify-center text-xs font-bold text-[#f39313]">
            2
          </div>
          <span className="font-display text-sm text-[#19522A]">Vos habitués alertés</span>
        </div>
        <p className="text-xs text-[#667079] leading-relaxed">
          Notification Push instantanée : ils savent où vous êtes pour le déjeuner.
        </p>
      </div>

      {/* Milestone 3 (Bottom Right Turn) */}
      <div
        className="absolute top-[78%] right-2 sm:right-4 md:right-8 z-10 max-w-[240px] sm:max-w-[270px] bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-[#D9DCD5] shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
      >
        <div className="flex items-center gap-2 mb-1.5 text-[#558D4D]">
          <div className="w-6 h-6 rounded-full bg-[#558D4D]/15 flex items-center justify-center text-xs font-bold text-[#558D4D]">
            3
          </div>
          <span className="font-display text-sm text-[#19522A]">0% de commission</span>
        </div>
        <p className="text-xs text-[#667079] leading-relaxed">
          Commandes directes au camion : vous conservez 100% de votre marge.
        </p>
      </div>

      {/* Arrival Label (Bottom Center) */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 text-center whitespace-nowrap">
        <div className="inline-flex items-center gap-2 bg-[#f39313] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
          <MapPin size={13} />
          <span>Clients fidélisés & servis</span>
        </div>
      </div>

      {/* ===== ANIMATED MOBILE TRUCK ===== */}
      <div
        className="absolute z-20 will-change-transform pointer-events-none transition-transform duration-75 ease-out"
        style={{
          left: `${truckPos.xPct}%`,
          top: `${truckPos.yPct}%`,
          transform: `translate(-50%, -50%) rotate(${truckPos.angle}deg) scaleX(${truckPos.facing})`,
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* Truck Badge */}
          <div className="w-14 h-14 bg-white rounded-full p-2 shadow-2xl border-2 border-[#19522A] flex items-center justify-center text-2xl transition-all">
            🚚
          </div>
          {/* Live Ping Signal */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f39313] opacity-80"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#f39313]"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

// --- FAQ Accordion with Clarity tracking ---
const FAQItem = ({ question, answer, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      trackEvent('faq_expand');
      setClarityTag('last_faq_viewed', question.substring(0, 40));
    }
  };

  return (
    <div className="border-b border-[#D9DCD5] py-4" data-clarity-tag="faq-item">
      <button
        type="button"
        id={id}
        onClick={handleToggle}
        className="flex justify-between items-center w-full text-left font-display text-[#19522A] hover:text-[#f39313] transition-colors focus:outline-none"
      >
        <span className="text-lg">{question}</span>
        {isOpen ? <ChevronUp size={20} className="text-[#f39313]" /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <p className="mt-4 text-[#667079] text-sm leading-relaxed pr-8 animate-fadeIn">
          {answer}
        </p>
      )}
    </div>
  );
};

const FoodTrucks = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsLoading(true);

    // Quick realistic feedback
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);

      // Trigger Clarity Custom Event & Tags
      trackEvent('foodtruck_lead_submit');
      setClarityTag('lead_persona', 'foodtruck');
      if (formData.city) {
        setClarityTag('lead_city', formData.city);
      }
    }, 400);
  };

  const scrollToSignup = () => {
    trackEvent('cta_click');
    const el = document.getElementById('inscription');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full overflow-x-clip">

      {/* ===== STICKY CTA BAR ===== */}
      <div className="sticky top-[72px] md:top-[80px] z-40 bg-[#f39313] text-white py-3 px-4 shadow-md flex justify-center items-center gap-4">
        <span className="font-semibold text-sm md:text-base hidden sm:inline">
          Gardez 100% de votre marge sur vos commandes.
        </span>
        <a
          href="#inscription"
          id="ft-cta-sticky"
          data-clarity-tag="sticky-bar-cta"
          onClick={() => trackEvent('cta_sticky_click')}
          className="bg-[#19522A] hover:bg-[#558D4D] text-white px-5 py-1.5 rounded-full text-sm font-bold transition-all shadow-sm transform hover:scale-105"
        >
          Essayer l'app
        </a>
      </div>

      {/* ===== ECRAN 1 : HERO ===== */}
      {/* Hook → CTA → Mockup+Bulles → Pain Quote → Truck Animation → Bullets → Location Tag */}
      <section className="relative min-h-[90vh] flex items-center">
        <img
          src="/hero-foodtrucks.jpg"
          alt="Food Truck en service"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FDF3E2] to-transparent z-10"></div>

        <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-8 pt-20 pb-52 grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left: Hook + CTA */}
          <div>
            <div className="w-12 h-1.5 bg-[#f39313] rounded-full mb-8"></div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display leading-[1.05] text-white mb-4 tracking-tight drop-shadow-md">
              Votre cuisine roule.
            </h1>
            <p className="font-accent text-4xl md:text-5xl lg:text-6xl text-[#f39313] leading-[1.1] mb-8 drop-shadow-md">
              Vos clients aussi.
            </p>
            <div className="pl-6 border-l-4 border-[#f39313] mb-10 max-w-xl">
              <p className="text-lg text-white/95 leading-relaxed font-medium">
                Informez vos clients de votre emplacement en temps réel et prenez des commandes en direct — sans commissions.
              </p>
            </div>
            <button
              id="ft-cta-hero"
              data-clarity-tag="hero-cta"
              onClick={scrollToSignup}
              className="bg-[#f39313] hover:bg-[#d97f0e] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl transition-all flex items-center gap-2 group cursor-pointer transform hover:-translate-y-0.5"
            >
              Rejoindre la communauté
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: iPhone Mockup + Floating Bubbles */}
          <div className="relative z-10 flex justify-center">
            <div className="relative max-w-[280px] w-full aspect-[9/19] bg-[#1a1a1a] rounded-[3rem] border-[6px] border-[#444] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/20 p-1.5">
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-30"></div>
              {/* Glare */}
              <div className="absolute top-0 right-0 w-[150%] h-[50%] bg-gradient-to-bl from-white/20 via-transparent to-transparent rounded-[3rem] pointer-events-none z-20"></div>
              {/* Screen */}
              <div className="w-full h-full bg-[#FDF3E2] rounded-[2rem] overflow-hidden relative">
                <div className="bg-[#19522A] text-white p-4 pb-6 rounded-b-[1.5rem] shadow-sm pt-10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-sm">📍 Emplacement</span>
                    <Map size={16} />
                  </div>
                  <h3 className="font-display text-lg">Place de la Mairie</h3>
                  <p className="text-xs opacity-90">11:30 - 14:00</p>
                </div>
                <div className="p-3 space-y-2">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <p className="font-bold text-[#19522A] text-xs">Nouveau Message !</p>
                    <p className="text-[10px] text-[#667079]">"Super, on arrive pour 12h30 !"</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#f39313]/20 flex items-center justify-center text-[#f39313]">
                      <BellRing size={14} />
                    </div>
                    <div>
                      <p className="font-bold text-[#19522A] text-[10px]">28 abonnés notifiés</p>
                      <p className="text-[9px] text-[#667079]">Ils savent où vous êtes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Bubbles around Mockup */}
            <div
              className="absolute top-12 -left-4 md:-left-12 bg-white border-2 border-[#D9DCD5] shadow-lg rounded-full p-3 flex flex-col items-center justify-center w-24 h-24 z-20"
              style={{ animation: 'floatSlow 4s ease-in-out infinite' }}
            >
              <span className="text-[#f39313] font-bold text-center text-xs leading-tight">
                Commission<br />0%
              </span>
            </div>
            <div
              className="absolute bottom-24 -right-4 md:-right-12 bg-[#19522A] shadow-lg rounded-full p-3 flex flex-col items-center justify-center w-24 h-24 z-20"
              style={{ animation: 'floatSlow 5s ease-in-out infinite 1s' }}
            >
              <span className="text-white font-bold text-center text-xs leading-tight">
                Visibilité<br />Instantanée
              </span>
            </div>
          </div>
        </div>

        <BrushSeparator fillColor="#FDF3E2" />
      </section>

      {/* ===== ECRAN 1 suite : Pain Quote → Tall Free-Floating Truck Journey → Bullets → Location Tag ===== */}
      <section className="relative pt-6 pb-32 bg-[#FDF3E2]">
        <div className="max-w-4xl mx-auto px-6 relative z-30">

          {/* Pain Point Quote */}
          <div className="pl-6 border-l-4 border-[#f39313] bg-white rounded-2xl p-8 border border-[#D9DCD5] shadow-sm mb-12 max-w-xl mx-auto">
            <p className="font-accent text-xl text-[#FF859D] mb-2">Le quotidien d'un Food Truck</p>
            <p className="text-[#4A4A4A] font-medium italic leading-relaxed">
              "Je perds mes clients réguliers quand la mairie m'oblige à changer de rue. Et les plateformes prennent 30% de ma marge."
            </p>
          </div>

          {/* Tall Free-Floating Truck Scroll Animation with Milestones */}
          <TruckScrollAnimation />

          {/* Bullet Points */}
          <div className="mt-14 mb-16 max-w-xl mx-auto">
            <div className="w-12 h-1.5 bg-[#19522A] rounded-full mb-6 mx-auto"></div>
            <h3 className="text-2xl md:text-3xl font-display text-[#19522A] mb-8 text-center">
              Ne laissez plus la météo ou la logistique décider de votre chiffre d'affaires.
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-[#558D4D] flex-shrink-0 mt-0.5" size={24} />
                <div>
                  <h4 className="text-lg font-bold text-[#19522A] mb-1">Bâtissez une base de clients locaux fidèles.</h4>
                  <p className="text-sm text-[#667079] leading-relaxed">Vos habitués sont alertés par push dès que vous vous installez.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-[#558D4D] flex-shrink-0 mt-0.5" size={24} />
                <div>
                  <h4 className="text-lg font-bold text-[#19522A] mb-1">Gérez vos emplacements dynamiquement.</h4>
                  <p className="text-sm text-[#667079] leading-relaxed">Travaux, météo, imprévu ? Un clic met à jour votre position en temps réel.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-[#558D4D] flex-shrink-0 mt-0.5" size={24} />
                <div>
                  <h4 className="text-lg font-bold text-[#19522A] mb-1">Prenez des commandes sans frais cachés.</h4>
                  <p className="text-sm text-[#667079] leading-relaxed">Chaque euro encaissé reste dans votre caisse. 0% de commission.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Tag */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 border-2 border-dashed border-[#19522A] rounded-xl px-6 py-4 font-bold text-[#19522A] bg-white shadow-sm">
              <MapPin className="text-[#f39313]" />
              Êtes-vous visible sur notre carte locale ?
            </div>
          </div>

        </div>
        <BrushSeparator fillColor="#ffffff" className="translate-y-px" />
      </section>

      {/* ===== ECRAN 2 : Comment ça marche → Objection → Témoignages ===== */}
      <section className="relative pt-20 pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 relative z-30">

          {/* Comment ça marche — 4 steps */}
          <div className="text-center mb-16">
            <div className="w-12 h-1.5 bg-[#f39313] rounded-full mb-6 mx-auto"></div>
            <h2 className="text-3xl md:text-4xl font-display text-[#19522A] mb-10">Comment ça marche</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="bg-white p-6 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#f39313] group-hover:h-1.5 transition-all"></div>
                <div className="w-12 h-12 bg-[#f39313]/10 rounded-xl flex items-center justify-center text-[#f39313] mb-4 mt-2">
                  <MapPin size={24} />
                </div>
                <p className="text-4xl font-display text-[#19522A] mb-2">1</p>
                <p className="font-accent text-lg text-[#FF859D]">Je me gare</p>
                <p className="text-xs text-[#667079] mt-2">Position validée en 1 clic.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#558D4D] group-hover:h-1.5 transition-all"></div>
                <div className="w-12 h-12 bg-[#558D4D]/10 rounded-xl flex items-center justify-center text-[#558D4D] mb-4 mt-2">
                  <BellRing size={24} />
                </div>
                <p className="text-4xl font-display text-[#19522A] mb-2">2</p>
                <p className="font-accent text-lg text-[#FF859D]">Alerte</p>
                <p className="text-xs text-[#667079] mt-2">Vos clients reçoivent une notification.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#f39313] group-hover:h-1.5 transition-all"></div>
                <div className="w-12 h-12 bg-[#f39313]/10 rounded-xl flex items-center justify-center text-[#f39313] mb-4 mt-2">
                  <Smartphone size={24} />
                </div>
                <p className="text-4xl font-display text-[#19522A] mb-2">3</p>
                <p className="font-accent text-lg text-[#FF859D]">Commandes</p>
                <p className="text-xs text-[#667079] mt-2">Ils commandent depuis l'app.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#19522A] group-hover:h-1.5 transition-all"></div>
                <div className="w-12 h-12 bg-[#19522A]/10 rounded-xl flex items-center justify-center text-[#19522A] mb-4 mt-2">
                  <TrendingUp size={24} />
                </div>
                <p className="text-4xl font-display text-[#19522A] mb-2">4</p>
                <p className="font-accent text-lg text-[#FF859D]">Marge 100%</p>
                <p className="text-xs text-[#667079] mt-2">Aucune commission sur vos ventes.</p>
              </div>
            </div>
          </div>

          {/* Mid-page CTA */}
          <div className="flex justify-center mb-20">
            <button
              id="ft-cta-midpage"
              data-clarity-tag="midpage-cta"
              onClick={scrollToSignup}
              className="bg-[#558D4D] hover:bg-[#43723D] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl transition-all flex items-center gap-2 group cursor-pointer transform hover:-translate-y-0.5"
            >
              Créez votre profil Food Truck
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Objection Handling */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="w-12 h-1.5 bg-[#19522A] rounded-full mb-6"></div>
              <h2 className="text-3xl md:text-4xl font-display text-[#19522A] mb-4">
                Votre allié terrain
              </h2>
              <p className="font-accent text-2xl text-[#f39313] mb-8">en complément d'Instagram.</p>

              <p className="text-[#667079] mb-4 leading-relaxed">
                D'après notre enquête, <strong className="text-[#19522A]">Instagram est votre canal n°1</strong> pour communiquer avec vos clients. Et c'est génial pour l'image !
              </p>
              <p className="text-[#667079] mb-6 leading-relaxed">
                Mais une story disparaît en 24h et les algorithmes cachent parfois vos posts à vos propres abonnés.
              </p>
              <div className="pl-6 border-l-4 border-[#558D4D]">
                <p className="text-[#4A4A4A] font-medium leading-relaxed">
                  Instagram pour attirer l'œil. Notre plateforme pour convertir en commandes et envoyer des alertes géolocalisées que personne ne rate.
                </p>
              </div>
            </div>

            {/* Testimonials stacked in right column */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#f39313] group-hover:h-1.5 transition-all"></div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f39313]/10 flex-shrink-0 flex items-center justify-center text-[#f39313] font-bold text-xl">A</div>
                  <div>
                    <p className="italic text-[#667079] text-sm mb-3 leading-relaxed">
                      "Fini les clients qui me cherchent pendant 20 minutes quand je dois changer d'emplacement. Je me gare, j'appuie sur le bouton, tout le monde sait où je suis."
                    </p>
                    <p className="font-accent text-[#FF859D] text-right">— Angélique, Crêperie Mobile</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#558D4D] group-hover:h-1.5 transition-all"></div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#19522A]/10 flex-shrink-0 flex items-center justify-center text-[#19522A] font-bold text-xl">V</div>
                  <div>
                    <p className="italic text-[#667079] text-sm mb-3 leading-relaxed">
                      "Les applis de livraison prenaient jusqu'à 30% de ma marge. Maintenant mes habitués commandent en direct et je garde mes sous."
                    </p>
                    <p className="font-accent text-[#FF859D] text-right">— Véronique, Burger Street</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <BrushSeparator fillColor="#FDF3E2" className="translate-y-px" />
      </section>

      {/* ===== ECRAN 3 : FAQ + INSCRIPTION ===== */}
      <section id="inscription" className="relative py-24 bg-[#FDF3E2] overflow-hidden scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 relative z-30">

          {/* FAQ */}
          <div className="max-w-2xl mx-auto text-left mb-20">
            <div className="w-12 h-1.5 bg-[#f39313] rounded-full mb-6 mx-auto"></div>
            <h2 className="text-3xl md:text-4xl font-display text-[#19522A] mb-8 text-center">Questions fréquentes</h2>
            <div className="bg-white rounded-2xl p-6 border border-[#D9DCD5] shadow-sm">
              <FAQItem
                id="faq-ft-1"
                question="Est-ce vraiment 0% de commission ?"
                answer="Oui, absolument. Nous ne prenons aucune commission sur vos ventes. Le modèle repose sur un abonnement mensuel fixe très abordable, afin que vous sachiez exactement quelles sont vos charges."
              />
              <FAQItem
                id="faq-ft-2"
                question="Mes clients doivent-ils télécharger une application ?"
                answer="Non, pas obligatoirement. Ils peuvent commander via une interface web mobile très rapide. Mettez le lien dans votre bio Instagram. L'appli est disponible pour ceux qui veulent recevoir vos notifications Push."
              />
              <FAQItem
                id="faq-ft-3"
                question="Je change souvent d'emplacement à la dernière minute, est-ce adapté ?"
                answer="C'est exactement pour ça que la plateforme existe ! Mairie, météo, travaux : un simple clic met à jour votre position et alerte automatiquement vos clients fidèles."
              />
              <FAQItem
                id="faq-ft-4"
                question="Comment ça fonctionne avec mes réseaux sociaux ?"
                answer="En complément total. Gardez Instagram pour votre image de marque et vos stories. Notre app s'occupe de la conversion : notifications push géolocalisées, commandes directes et gestion d'emplacement en temps réel."
              />
            </div>
          </div>

          {/* Registration Form */}
          <div className="text-center">
            <div className="w-12 h-1.5 bg-[#19522A] rounded-full mb-6 mx-auto"></div>
            <h2 className="text-4xl font-display mb-6 text-[#19522A]">Rejoignez le réseau local.</h2>
            <p className="text-lg text-[#667079] mb-10">
              Inscrivez-vous en 30 secondes. Zéro engagement, zéro commission.
            </p>

            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-auto border border-[#D9DCD5] mb-12">
              <h3 className="text-xl font-bold text-[#19522A] mb-6">Créer ma vitrine Food Truck</h3>

              {isSubmitted ? (
                <div className="py-8 text-center animate-fadeIn" data-clarity-tag="form-success-box">
                  <div className="w-16 h-16 bg-[#558D4D]/15 text-[#558D4D] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-xl font-display text-[#19522A] mb-2">Demande enregistrée !</h4>
                  <p className="text-sm text-[#667079] leading-relaxed mb-6">
                    Merci <strong className="text-[#19522A]">{formData.name}</strong>. Un conseiller 1001 Goûts va vous contacter pour finaliser votre accès sans commission.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', city: '' });
                    }}
                    className="text-xs text-[#558D4D] hover:underline font-semibold"
                  >
                    Inscrire un autre Food Truck
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <div className="text-left">
                    <label htmlFor="ft-name" className="block text-sm font-medium text-[#4A4A4A] mb-1">
                      Nom du Food Truck <span className="text-[#f39313]">*</span>
                    </label>
                    <input
                      id="ft-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      data-clarity-mask="true"
                      placeholder="Ex : La Crêperie Mobile"
                      className="w-full px-4 py-3 rounded-xl border border-[#D9DCD5] focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A] transition-colors outline-none"
                    />
                  </div>
                  <div className="text-left">
                    <label htmlFor="ft-email" className="block text-sm font-medium text-[#4A4A4A] mb-1">
                      Email professionnel <span className="text-[#f39313]">*</span>
                    </label>
                    <input
                      id="ft-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      data-clarity-mask="true"
                      placeholder="vous@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#D9DCD5] focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A] transition-colors outline-none"
                    />
                  </div>
                  <div className="text-left">
                    <label htmlFor="ft-city" className="block text-sm font-medium text-[#4A4A4A] mb-1">
                      Ville principale
                    </label>
                    <input
                      id="ft-city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleInputChange}
                      data-clarity-mask="true"
                      placeholder="Ex : Lyon"
                      className="w-full px-4 py-3 rounded-xl border border-[#D9DCD5] focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A] transition-colors outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    id="ft-submit-btn"
                    data-clarity-tag="submit-foodtruck-btn"
                    disabled={isLoading}
                    className="w-full bg-[#f39313] hover:bg-[#d97f0e] text-white font-semibold py-3.5 rounded-full transition-all mt-4 shadow-md hover:shadow-lg disabled:opacity-75 cursor-pointer transform hover:-translate-y-0.5"
                  >
                    {isLoading ? 'Enregistrement...' : 'Créer mon profil gratuitement'}
                  </button>
                </form>
              )}
            </div>

            {/* Footer CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#inscription"
                id="ft-footer-cta-signup"
                data-clarity-tag="footer-cta-signup"
                onClick={() => trackEvent('cta_footer_signup_click')}
                className="bg-[#19522A] hover:bg-[#558D4D] text-white px-8 py-3 rounded-full font-bold shadow-md hover:-translate-y-0.5 transition-all w-full sm:w-auto text-center"
              >
                S'inscrire (C'est gratuit)
              </a>
              <a
                href="#app"
                id="ft-footer-cta-app"
                data-clarity-tag="footer-cta-app"
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent('cta_download_app_click');
                  alert("L'application Pro sera disponible très prochainement sur l'App Store et Google Play.");
                }}
                className="bg-white text-[#19522A] border-2 border-[#D9DCD5] px-8 py-3 rounded-full font-bold hover:bg-[#FDF3E2] transition-colors w-full sm:w-auto text-center cursor-pointer"
              >
                Télécharger l'app iOS
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default FoodTrucks;
