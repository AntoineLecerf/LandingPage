import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  ChevronDown, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  BellRing, 
  Star, 
  MapPin, 
  Store, 
  User, 
  Mail,
  Phone,
  MessageSquare,
  BookOpen,
  Sparkles,
  Award,
  HelpCircle,
  Download,
  ExternalLink,
  FileCheck,
  Heart,
  Calendar,
  X
} from 'lucide-react';
import BrushSeparator from '../components/BrushSeparator';
import SEOHead from '../components/SEOHead';
import LordIcon from '../components/LordIcon';

const Bouchers = () => {
  const videoRef = useRef(null);
  const modalBodyRef = useRef(null);

  // Form & Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalScrollProgress, setModalScrollProgress] = useState(0);
  const [hasModalScroll, setHasModalScroll] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    shopName: '',
    email: '',
    postalCode: '',
    phone: '',
    message: '',
    obstacles: [],
    acceptedTerms: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isShaking, setIsShaking] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Gestion du défilement dans la modale
  const handleModalScroll = (e) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll > 10) {
      setHasModalScroll(true);
      const progress = el.scrollTop / maxScroll;
      setModalScrollProgress(Math.min(1, Math.max(0, progress)));
    } else {
      setHasModalScroll(false);
    }
  };

  // Recalcul du défilement à l'ouverture de la modale ou au changement de contenu
  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        if (modalBodyRef.current) {
          const el = modalBodyRef.current;
          const maxScroll = el.scrollHeight - el.clientHeight;
          setHasModalScroll(maxScroll > 10);
          const progress = maxScroll > 10 ? el.scrollTop / maxScroll : 0;
          setModalScrollProgress(Math.min(1, Math.max(0, progress)));
        }
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen, isSubmitted]);

  // Écouteur pour ouvrir la modale depuis n'importe où et fermeture avec la touche Échap
  useEffect(() => {
    const handleOpenModal = () => {
      setIsModalOpen(true);
      setFormErrors({});
    };
    window.addEventListener('open-guide-modal', handleOpenModal);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-guide-modal', handleOpenModal);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Bloquer le défilement du corps de page lorsque la modale est ouverte (verrouillage total desktop & mobile)
  useEffect(() => {
    if (isModalOpen) {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    };
  }, [isModalOpen]);

  // Forcer la lecture vidéo en arrière-plan sur tous les navigateurs et mobiles (iOS / Safari / Android)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');

    const startPlayback = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Si le mode économie d'énergie du smartphone bloque l'autoplay,
          // on réenclenche la lecture au premier contact avec l'écran
          const handleInteraction = () => {
            video.play().catch(() => {});
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('click', handleInteraction);
          };
          window.addEventListener('touchstart', handleInteraction, { passive: true, once: true });
          window.addEventListener('scroll', handleInteraction, { passive: true, once: true });
          window.addEventListener('click', handleInteraction, { passive: true, once: true });
        });
      }
    };

    startPlayback();
  }, []);

  // Webhook URL (Google Apps Script / Make.com)
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbyfiSX0wMXKp7YFOIaXbwilAg-P1GDpYOKDbwN8hSkrw9fMAnqsD1IwImp6BzzPiiN_/exec"; 

  const obstacleOptions = [
    'Traçabilité & registres de conformité sanitaire',
    'Allègement des démarches administratives & paperasse',
    'Gestion des stocks & valorisation des découpes (0 perte)',
    'Gestion des commandes & réservations au comptoir',
    'Achats groupés directs auprès des élevages régionaux',
    'Fidélisation & communication',
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Effacer l'erreur du champ modifié
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (type === 'checkbox' && name === 'acceptedTerms') {
      setFormData((prev) => ({ ...prev, acceptedTerms: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleObstacleToggle = (option) => {
    if (formErrors.obstacles) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next.obstacles;
        return next;
      });
    }
    setFormData((prev) => {
      const current = [...prev.obstacles];
      if (current.includes(option)) {
        return { ...prev, obstacles: current.filter((item) => item !== option) };
      } else {
        if (current.length < 2) {
          return { ...prev, obstacles: [...current, option] };
        }
        return prev;
      }
    });
  };

  const triggerPdfDownload = () => {
    const link = document.createElement('a');
    link.href = '/guide-complet-artisan-boucher-2027.pdf';
    link.download = 'Guide-Complet-Artisan-Boucher-2027.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation des champs obligatoires
    const errors = {};
    if (!formData.firstName || !formData.firstName.trim()) errors.firstName = true;
    if (!formData.shopName || !formData.shopName.trim()) errors.shopName = true;
    if (!formData.email || !formData.email.trim() || !formData.email.includes('@')) errors.email = true;
    if (!formData.postalCode || !formData.postalCode.trim()) errors.postalCode = true;
    if (!formData.obstacles || formData.obstacles.length === 0) errors.obstacles = true;
    if (!formData.acceptedTerms) errors.acceptedTerms = true;

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setFormErrors({});

    // ⚡ 1. Téléchargement immédiat en 0ms (dans le même geste direct)
    triggerPdfDownload();

    // ⚡ 2. Transition immédiate vers la fenêtre post-téléchargement
    setIsSubmitted(true);

    // ⚡ 3. Envoi du webhook en arrière-plan sans bloquer ni ralentir
    if (GOOGLE_SCRIPT_URL) {
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch((err) => {
        console.error('Erreur webhook :', err);
      });
    }
  };

  const openModal = (e) => {
    if (e) e.preventDefault();
    setIsModalOpen(true);
  };

  const scrollToForm = openModal;

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full bg-[#FDF3E2] text-[#19522A] overflow-x-hidden">
      
      {/* 🚀 Balises SEO, OpenGraph & Métadonnées Schema.org */}
      <SEOHead 
        title="Guide Gratuit 2026 : Rentabilité & Circuits Courts pour Artisans Bouchers | 1001 Goûts"
        description="Téléchargez le livre blanc 2026 dédié aux artisans bouchers : optimisez vos marges brutes, maîtrisez vos coûts et développez votre clientèle locale en circuits courts à 0% de commission."
        keywords="boucherie artisanale, artisan boucher, rentabilité boucherie, circuits courts, livre blanc boucherie, marge brute boucherie, 1001 goûts, application boucher"
        ogImage="/guide-boucherie-cover.jpg"
      />

      {/* ========================================================================= */}
      {/* SECTION 1 : HERO SECTION (FOND SOMBRE & VIDÉO NATURELLE OPTIMISÉE MOBILE)   */}
      {/* ========================================================================= */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center bg-black text-white overflow-hidden">
        
        {/* Background MP4 Video (Auto-loop, 0 controls, no watermark) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-black">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          {/* Dark transparent neutral black / charcoal veil */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
        </div>

        <div className="max-w-4xl mx-auto px-5 sm:px-6 relative z-20 text-left py-16 sm:py-20 md:py-28 w-full">
          <div>
              <p className="font-accent text-[#FF859D] text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 leading-snug">
                La force d'une communauté, au service des artisans bouchers
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-white leading-[1.12] sm:leading-[1.08] tracking-tight mb-5 sm:mb-6 max-w-3xl [text-wrap:balance]">
                Vos couteaux sont affûtés.<br className="hidden sm:inline" /> Nos méthodes aussi.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-[#FDF3E2] font-normal sm:font-medium leading-relaxed mb-8 sm:mb-10 max-w-2xl">
                De la valorisation de votre savoir-faire à la gestion sereine de votre boutique : retrouvez les solutions concrètes partagées par vos confrères.
              </p>

              {/* CTA Hero Button */}
              <div className="flex flex-col sm:flex-row justify-start items-stretch sm:items-center gap-4">
                <a
                  href="#formulaire"
                  onClick={scrollToForm}
                  className="btn-shine-effect group bg-[#F48631] hover:bg-[#d97223] text-white px-8 py-4 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F48631] focus-visible:ring-offset-2 transform hover:-translate-y-0.5"
                >
                  <span>Obtenir mon guide</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1.5 duration-200" />
                </a>
              </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 : GUIDE COMPLET OFFERT (CRÈME CHAUD #FDF3E2)                    */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-16 md:pt-24 md:pb-32 bg-[#FDF3E2]">
        <BrushSeparator position="top" fillColor="#FDF3E2" />

        {/* 🍃 Détail botanique organique en fond */}
        <img
          src="/assets/1001gouts/feuille-verte.svg"
          alt="" aria-hidden="true"
          className="absolute -left-16 top-10 w-64 sm:w-80 pointer-events-none opacity-20 select-none z-10 brightness-[0.35] animate-leaf-sway"
        />

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 lg:gap-16 items-center relative z-20">
          
          {/* REAL 3D HARDCOVER BOOK MOCKUP (Cliquable comme un CTA) */}
          <div className="flex justify-center items-center relative py-4">
            <button
              type="button"
              onClick={openModal}
              aria-label="Cliquer pour obtenir le guide - Ouvrir le formulaire"
              className="relative w-full max-w-[290px] sm:max-w-[360px] lg:max-w-[395px] group cursor-pointer animate-float text-left border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F48631] rounded-3xl"
            >
              {/* 🌑 Ombre portée 3D réaliste au sol */}
              <div className="absolute -bottom-5 left-6 right-6 h-7 bg-[#19522A]/25 blur-xl rounded-full pointer-events-none group-hover:blur-2xl group-hover:bg-[#19522A]/40 group-hover:scale-110 transition-all duration-500" />

              {/* 📖 Conteneur Livre 3D Entier (Zoom et redressement global au survol) */}
              <div className="relative transition-all duration-500 ease-out transform group-hover:scale-105 group-hover:-translate-y-2 group-hover:rotate-0">
                
                {/* 📄 Tranche de pages 3D réaliste sur le côté droit */}
                <div className="absolute top-2 bottom-2 -right-3 w-3.5 bg-gradient-to-r from-[#e8e4db] via-[#f7f5f0] to-[#dfdacd] rounded-r-sm border-y border-r border-[#cfc9be] shadow-sm pointer-events-none">
                  {/* Fines rainures de pages papier */}
                  <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(0deg,#4A4A4A_0px,#4A4A4A_1px,transparent_1px,transparent_3px)]" />
                </div>

                {/* 📘 Couverture Rigide (Hardcover) avec relief et reliure */}
                <div className="relative rounded-r-2xl rounded-l-md overflow-hidden bg-white border-t border-b border-r border-[#D9DCD5] shadow-[10px_20px_40px_-10px_rgba(0,0,0,0.35),-3px_0_10px_rgba(0,0,0,0.2)] group-hover:shadow-[16px_28px_50px_-10px_rgba(25,82,42,0.3)] transition-shadow duration-500">
                  
                  {/* Effet ombre de pliure / reliure gauche */}
                  <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-black/35 via-black/15 to-transparent pointer-events-none z-10" />
                  
                  {/* Filet lumineux de reflet de la tranche gauche */}
                  <div className="absolute top-0 bottom-0 left-5 w-[1.5px] bg-white/40 pointer-events-none z-10" />
                  
                  <img
                    src="/guide-boucherie-cover.jpg"
                    alt="Guide Complet Boucherie Artisanale 2026 - 1001 Goûts"
                    className="w-full h-auto object-cover block select-none"
                    loading="eager"
                  />
                </div>
              </div>
            </button>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display text-[#19522A] mb-4 leading-tight">
              Guide complet de l'artisan boucher offert !
            </h2>
            <p className="text-[#4A4A4A] text-sm sm:text-base mb-8 leading-relaxed">
              Ce guide complet rédigé avec des confrères et des experts de terrain vous permettra de :
            </p>

            {/* 🌟 INFOS DYNAMIQUES AVEC ICÔNES THÉMATIQUES ANIMÉES EN BOUCLE CONTINUE */}
            <div className="space-y-6 sm:space-y-7 text-[#19522A]">
              <div className="flex items-start gap-4 group p-2 rounded-2xl hover:bg-[#19522A]/5 transition-all duration-200">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#D9DCD5] shadow-xs flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:border-[#19522A]/40 transition-all duration-300">
                  <LordIcon 
                    src="https://cdn.lordicon.com/lbcxnxti.json" 
                    trigger="loop"
                    colors="primary:#19522A,secondary:#F48631" 
                    size={30} 
                  />
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-[#19522A] mb-1.5">Protéger vos marges</h4>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed">
                    Alors qu'un tiers des boucheries voit sa marge nette reculer, découvrez les leviers concrets pour recalculer votre rentabilité au gramme près et maîtriser vos coûts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group p-2 rounded-2xl hover:bg-[#19522A]/5 transition-all duration-200">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#D9DCD5] shadow-xs flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:border-[#19522A]/40 transition-all duration-300">
                  <LordIcon 
                    src="https://cdn.lordicon.com/cjoqkjst.json" 
                    trigger="loop"
                    colors="primary:#19522A,secondary:#F48631" 
                    size={30} 
                  />
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-[#19522A] mb-1.5">Développer votre activité de traiteur</h4>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed">
                    Le rayon traiteur représente aujourd'hui un tiers des revenus d'une boucherie de quartier. Méthodes pour valoriser vos découpes en préparations cuisinées rentables.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group p-2 rounded-2xl hover:bg-[#19522A]/5 transition-all duration-200">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#D9DCD5] shadow-xs flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:border-[#19522A]/40 transition-all duration-300">
                  <LordIcon 
                    src="https://cdn.lordicon.com/nobciafz.json" 
                    trigger="loop"
                    colors="primary:#19522A,secondary:#F48631" 
                    size={30} 
                  />
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-[#19522A] mb-1.5">Pérenniser votre commerce</h4>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed">
                    Face à la pénurie d'artisans qualifiés et aux transmissions d'entreprises, des solutions concrètes pour soulager votre équipe et pérenniser votre savoir-faire.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 : FORMULAIRE & ACCROCHE (BLANC #ffffff - ID: formulaire)       */}
      {/* ========================================================================= */}
      <section id="formulaire" className="relative pt-12 pb-16 md:pt-24 md:pb-32 bg-white scroll-mt-20">
        <BrushSeparator position="top" fillColor="#FDF3E2" flipX={true} />
        
        {/* 🍊 Motif végétal orange retourné */}
        <img
          src="/assets/1001gouts/feuille-verte.svg"
          alt="" aria-hidden="true"
          className="absolute -right-16 bottom-12 w-56 sm:w-72 pointer-events-none opacity-15 select-none z-10 -scale-x-100 animate-leaf-sway"
          style={{ filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)' }}
        />
        
        <div className="max-w-4xl mx-auto px-6 relative z-20">
          
          {/* En-tête centré */}
          <div className="text-center mb-10 md:mb-14">
            <p className="font-accent text-[#FF859D] text-lg sm:text-xl md:text-2xl mb-2.5">
              Votre voix compte pour l'artisanat local
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display text-[#19522A] leading-tight mb-4">
              Obtenez les meilleures astuces des artisans bouchers
            </h2>
            <p className="text-sm sm:text-base text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed">
              Face aux hausses de coûts et à l'évolution des habitudes de consommation, découvrez les leviers concrets partagés par vos confrères pour sécuriser votre rentabilité.
            </p>
          </div>

          {/* 🌿 Les 3 Défis en cartes aérées */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {/* Défi 1 */}
            <div className="bg-[#FDF3E2]/50 border border-[#D9DCD5] rounded-3xl p-6 hover:bg-[#FDF3E2] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#D9DCD5] flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-[#19522A]/40 transition-all duration-300 shadow-xs">
                <LordIcon 
                  src="https://cdn.lordicon.com/ewnhdaeg.json" 
                  trigger="loop" 
                  colors="primary:#19522A,secondary:#F48631" 
                  size={34} 
                />
              </div>
              <h4 className="font-display text-base sm:text-lg font-bold text-[#19522A] mb-2">
                L'effet de ciseaux sur la marge nette
              </h4>
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                Hausse du coût des matières premières et froid indispensable : comment vos confrères sécurisent leur résultat.
              </p>
            </div>

            {/* Défi 2 */}
            <div className="bg-[#FDF3E2]/50 border border-[#D9DCD5] rounded-3xl p-6 hover:bg-[#FDF3E2] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#D9DCD5] flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-[#19522A]/40 transition-all duration-300 shadow-xs">
                <LordIcon 
                  src="https://cdn.lordicon.com/aygridid.json" 
                  trigger="loop" 
                  colors="primary:#19522A,secondary:#F48631" 
                  size={34} 
                />
              </div>
              <h4 className="font-display text-base sm:text-lg font-bold text-[#19522A] mb-2">
                Le virage traiteur & qualitatif
              </h4>
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                Compenser la baisse des volumes de viande brute par des plats cuisinés artisanaux plébiscités.
              </p>
            </div>

            {/* Défi 3 */}
            <div className="bg-[#FDF3E2]/50 border border-[#D9DCD5] rounded-3xl p-6 hover:bg-[#FDF3E2] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#D9DCD5] flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-[#19522A]/40 transition-all duration-300 shadow-xs">
                <LordIcon 
                  src="https://cdn.lordicon.com/zjdxuyoy.json" 
                  trigger="loop" 
                  colors="primary:#19522A,secondary:#F48631" 
                  size={34} 
                />
              </div>
              <h4 className="font-display text-base sm:text-lg font-bold text-[#19522A] mb-2">
                Gestion avec équipes réduites
              </h4>
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                Pénurie de main-d'œuvre et charge administrative : des solutions concrètes pour soulager votre brigade.
              </p>
            </div>
          </div>

          {/* 🎯 Bouton CTA Centré Agrandit */}
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={openModal}
              className="btn-shine-effect group bg-[#F48631] hover:bg-[#d97223] text-white font-bold py-4.5 sm:py-5 px-10 sm:px-14 rounded-full transition-all shadow-lg hover:shadow-xl text-base sm:text-lg md:text-xl inline-flex items-center justify-center gap-3 cursor-pointer transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F48631] focus-visible:ring-offset-2"
            >
              <span>Obtenir mon guide</span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1.5 duration-200" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 : POURQUOI REMPLIR LE FORMULAIRE (FOND BLANC #ffffff)          */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-16 md:pt-24 md:pb-32 bg-white">
        <img
          src="/assets/1001gouts/feuille-verte.svg"
          alt="" aria-hidden="true"
          className="absolute -right-20 top-6 w-64 sm:w-80 pointer-events-none opacity-10 select-none z-10 brightness-[0.35] animate-leaf-sway"
        />

        <div className="max-w-6xl mx-auto px-6 text-center relative z-20">
          <div className="mb-12 md:mb-14">
            <p className="font-accent text-[#FF859D] text-lg sm:text-xl md:text-2xl mb-2.5">
              Conçu par et pour les artisans indépendants
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display text-[#19522A] mb-3">
              Pourquoi remplir le formulaire ?
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#667079] leading-relaxed">
              Avec vos retours, nous pourrons développer des outils dans l'application qui soulageront votre charge mentale au quotidien.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* Card 1 */}
            <div className="bg-gradient-to-b from-[#FDF3E2] to-[#faecd3] p-7 sm:p-8 rounded-3xl border-2 border-[#19522A]/15 hover:border-[#F48631] shadow-xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group">
              <img src="/assets/1001gouts/Groupe-16819.png" alt="01" className="w-12 h-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display text-lg sm:text-xl text-[#19522A] mb-2.5">
                Outils de Communication Locale
              </h3>
              <p className="text-sm text-[#4A4A4A] leading-relaxed">
                Des fonctionnalités pensées pour diffuser facilement vos arrivages de viande d'exception, vos plats traiteur du week-end et fidéliser les clients de votre quartier.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-b from-[#FDF3E2] to-[#faecd3] p-7 sm:p-8 rounded-3xl border-2 border-[#19522A]/15 hover:border-[#558D4D] shadow-xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group">
              <img src="/assets/1001gouts/Groupe-16820.png" alt="02" className="w-12 h-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display text-lg sm:text-xl text-[#19522A] mb-2.5">
                Circuits Courts Éleveurs
              </h3>
              <p className="text-sm text-[#4A4A4A] leading-relaxed">
                L'accès direct aux groupements de producteurs pour acheter en direct, sécuriser vos approvisionnements sans intermédiaire.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-b from-[#FDF3E2] to-[#faecd3] p-7 sm:p-8 rounded-3xl border-2 border-[#19522A]/15 hover:border-[#FF859D] shadow-xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group">
              <img src="/assets/1001gouts/Groupe-16821.png" alt="03" className="w-12 h-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display text-lg sm:text-xl text-[#19522A] mb-2.5">
                Visibilité & Accès Testeur
              </h3>
              <p className="text-sm text-[#4A4A4A] leading-relaxed">
                Participez à la co-création de l'application 1001 Goûts et devenez membre testeur prioritaire sans aucun engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 : PREUVES SOCIALES & VERBATIMS (CRÈME #FDF3E2)                 */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-16 md:pt-24 md:pb-32 bg-[#FDF3E2]">
        <BrushSeparator position="top" fillColor="#FDF3E2" />

        {/* 🍊 Motif végétal orange retourné */}
        <img
          src="/assets/1001gouts/feuille-verte.svg"
          alt="" aria-hidden="true"
          className="absolute -left-16 bottom-10 w-56 sm:w-72 pointer-events-none opacity-[0.12] select-none z-10 -scale-x-100 rotate-12 animate-leaf-sway"
          style={{ filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)' }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-20">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display text-[#19522A] mb-3">
              Ce que disent les artisans bouchers
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#667079] leading-relaxed">
              Extraits réels de nos échanges et consultations menés directement en boutique avec des artisans indépendants.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Verbatim 1 */}
            <div className="bg-[#19522A] p-7 sm:p-8 rounded-3xl border border-[#558D4D]/40 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-white">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FDF3E2] text-sm font-semibold mb-5 border border-white/10">
                  <Calendar size={14} className="text-[#F48631]" />
                  <span>Entretien du 05/08/2026</span>
                </div>
                <p className="text-sm sm:text-base text-[#FDF3E2] leading-relaxed italic mb-6">
                  "<strong className="text-[#F48631] font-bold">L'augmentation du prix de la viande et la conformité</strong> sont nos vrais combats quotidiens. Avec des fournisseurs qu'on connaît depuis des années, <strong className="text-[#F48631] font-bold">on ne peut pas transiger sur la qualité</strong>. On gère au millimètre pour <strong className="text-[#F48631] font-bold">n'avoir aucun invendu</strong>."
                </p>
              </div>
              <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F48631] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    BV
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Boucherie Les Bons Vivants</h4>
                    <p className="text-sm text-[#FDF3E2]/70">Artisan Boucher Indépendant</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verbatim 2 */}
            <div className="bg-[#19522A] p-7 sm:p-8 rounded-3xl border border-[#558D4D]/40 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-white">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FDF3E2] text-sm font-semibold mb-5 border border-white/10">
                  <Calendar size={14} className="text-[#F48631]" />
                  <span>Entretien du 05/08/2026</span>
                </div>
                <p className="text-sm sm:text-base text-[#FDF3E2] leading-relaxed italic mb-6">
                  "Tout repose sur <strong className="text-[#F48631] font-bold">le bouche-à-oreille</strong> et un <strong className="text-[#F48631] font-bold">réseau de confiance irréprochable sur la traçabilité</strong>."
                </p>
              </div>
              <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F48631] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    LP
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Boucherie La Parisienne</h4>
                    <p className="text-sm text-[#FDF3E2]/70">Artisan Boucher Indépendant</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verbatim 3 */}
            <div className="bg-[#19522A] p-7 sm:p-8 rounded-3xl border border-[#558D4D]/40 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-white">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FDF3E2] text-sm font-semibold mb-5 border border-white/10">
                  <Calendar size={14} className="text-[#F48631]" />
                  <span>Entretien du 08/08/2026</span>
                </div>
                <p className="text-sm sm:text-base text-[#FDF3E2] leading-relaxed italic mb-6">
                  "Avec la hausse continue du coût de la viande à la carcasse, <strong className="text-[#F48631] font-bold">la moindre erreur de stock coûte cher</strong>. Tout l'enjeu aujourd'hui, c'est d'avoir une visibilité exacte sur nos découpes pour <strong className="text-[#F48631] font-bold">valoriser chaque pièce et protéger notre marge</strong>."
                </p>
              </div>
              <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F48631] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    BT
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Boucherie du Terroir</h4>
                    <p className="text-sm text-[#FDF3E2]/70">Artisan Boucher Indépendant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 : FOIRE AUX QUESTIONS (CRÈME #FDF3E2)                          */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-16 md:pt-24 md:pb-32 bg-[#FDF3E2]">

        {/* 🍊 Motif végétal orange retourné */}
        <img
          src="/assets/1001gouts/feuille-verte.svg"
          alt="" aria-hidden="true"
          className="absolute -right-16 top-8 w-56 sm:w-72 pointer-events-none opacity-[0.12] select-none z-10 -scale-x-100 -rotate-6 animate-leaf-sway"
          style={{ filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)' }}
        />

        <div className="max-w-3xl mx-auto px-6 relative z-20">
          <div className="text-center mb-12 md:mb-14">
            <p className="font-accent text-[#FF859D] text-lg sm:text-xl md:text-2xl mb-2.5">
              Réponses claires & transparentes
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display text-[#19522A]">
              Foire Aux Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Quand et comment vais-je recevoir le guide ?",
                a: "Dès validation du formulaire, le guide PDF se télécharge instantanément et directement sur votre appareil.",
              },
              {
                q: "En quoi ce guide m'aide-t-il face à la hausse des coûts et de l'énergie ?",
                a: "Il compile les méthodes de calcul de marge nette appliquées par des confrères indépendants, des pistes d'achats directs et des astuces concrètes de gestion pour protéger votre résultat d'exploitation.",
              },
              {
                q: "Le guide aborde-t-il l'activité traiteur et plats cuisinés ?",
                a: "Oui, une section entière est consacrée à la diversification traiteur — qui représente aujourd'hui en moyenne un tiers du chiffre d'affaires des boucheries de quartier rentables.",
              },
              {
                q: "L'application 1001 Goûts prend-elle une commission sur mes ventes ?",
                a: "Non, absolument pas. 1001 Goûts applique une règle stricte et immuable de 0% de commission sur vos ventes. Nous existons pour protéger la rémunération juste de l'artisan.",
              },
              {
                q: "Que ferez-vous de mes réponses au formulaire ?",
                a: "Vos réponses servent exclusivement à orienter les priorités de développement de l'espace Pro 1001 Goûts. Vos données restent strictement confidentielles et ne sont jamais revendues.",
              },
              {
                q: "Comment fonctionne l'accès testeur gratuit ?",
                a: "En participant à cette consultation, vous recevrez une invitation privée pour tester gratuitement l'application avant son ouverture officielle au grand public.",
              },
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  openFaq === idx 
                    ? 'bg-[#19522A] text-white border-[#558D4D]/50 shadow-md' 
                    : 'bg-[#19522A]/8 border-[#19522A]/15 hover:bg-[#19522A]/15 text-[#19522A]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaq === idx}
                  aria-controls={`faq-content-${idx}`}
                  className={`w-full p-4.5 text-left font-display text-sm sm:text-base flex justify-between items-center transition-colors cursor-pointer ${
                    openFaq === idx ? 'text-white' : 'text-[#19522A]'
                  }`}
                >
                  <span>{faq.q}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    openFaq === idx 
                      ? 'bg-[#F48631] text-white rotate-180 shadow-xs' 
                      : 'bg-[#19522A]/10 text-[#19522A] border border-[#19522A]/20'
                  }`}>
                    <ChevronDown size={15} />
                  </div>
                </button>
                {openFaq === idx && (
                  <div id={`faq-content-${idx}`} role="region" className="px-4.5 pb-4.5 text-sm text-[#FDF3E2] leading-relaxed border-t border-white/15 pt-3.5 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 🎯 Catchphrase Finale Incitative avec explosion végétale éparpillée sur toute la largeur */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24 z-20">
          {/* 🎆 Éparpillement Végétal / Effet Feu d'artifice Large en 360° */}
          
          {/* 🍃 Zone Extrême Gauche */}
          <img
            src="/assets/1001gouts/feuille-verte.svg"
            alt="" aria-hidden="true"
            className="absolute -left-2 sm:left-2 lg:-left-6 top-8 w-36 sm:w-48 pointer-events-none opacity-35 select-none z-10 -rotate-30 brightness-[0.35] animate-firework-tl"
          />
          <img
            src="/assets/1001gouts/feuille-verte.svg"
            alt="" aria-hidden="true"
            className="absolute left-6 sm:left-14 lg:left-10 -top-12 sm:-top-16 w-24 sm:w-32 pointer-events-none opacity-30 select-none z-10 rotate-15 animate-firework-top"
            style={{ filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)', animationDelay: '0.4s' }}
          />
          <img
            src="/assets/1001gouts/feuille-verte.svg"
            alt="" aria-hidden="true"
            className="absolute left-4 sm:left-12 bottom-6 w-20 sm:w-28 pointer-events-none opacity-30 select-none z-10 -rotate-110 brightness-[0.35] animate-firework-bl"
            style={{ animationDelay: '0.7s' }}
          />
          <img
            src="/assets/1001gouts/feuille-verte.svg"
            alt="" aria-hidden="true"
            className="hidden sm:block absolute left-20 lg:left-28 top-1/2 -translate-y-1/2 w-24 sm:w-32 pointer-events-none opacity-25 select-none z-10 -rotate-70 brightness-[0.35] animate-firework-side"
            style={{ animationDelay: '0.3s' }}
          />

          {/* 🍃 Zone Médiane Gauche / Au-dessus & En-dessous */}
          <img
            src="/assets/1001gouts/feuille-verte.svg"
            alt="" aria-hidden="true"
            className="absolute left-[18%] sm:left-[22%] -top-14 sm:-top-18 w-28 sm:w-36 pointer-events-none opacity-35 select-none z-10 -rotate-45 brightness-[0.35] animate-firework-tl"
            style={{ animationDelay: '0.2s' }}
          />
          <img
            src="/assets/1001gouts/feuille-verte.svg"
            alt="" aria-hidden="true"
            className="absolute left-[20%] sm:left-[24%] -bottom-10 sm:-bottom-14 w-28 sm:w-36 pointer-events-none opacity-30 select-none z-10 -rotate-135 animate-firework-bl"
            style={{ filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)', animationDelay: '0.6s' }}
          />

          {/* 🍃 Zone Centrale Haut & Bas */}
          <img
            src="/assets/1001gouts/feuille-verte.svg"
            alt="" aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 -top-14 sm:-top-18 w-20 sm:w-28 pointer-events-none opacity-25 select-none z-10 -rotate-10 animate-firework-top"
            style={{ filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)', animationDelay: '0.5s' }}
          />
          <img
            src="/assets/1001gouts/feuille-verte.svg"
            alt="" aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 -bottom-12 sm:-bottom-16 w-20 sm:w-28 pointer-events-none opacity-25 select-none z-10 rotate-160 brightness-[0.35] animate-firework-top"
            style={{ animationDelay: '0.9s' }}
          />

          {/* 🍃 Zone Médiane Droite / Au-dessus & En-dessous */}
          <img
            src="/assets/1001gouts/feuille-verte.svg"
            alt="" aria-hidden="true"
            className="absolute right-[18%] sm:right-[22%] -top-14 sm:-top-18 w-28 sm:w-36 pointer-events-none opacity-35 select-none z-10 rotate-40 animate-firework-tr"
            style={{ filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)', animationDelay: '0.3s' }}
          />
          <img
            src="/assets/1001gouts/feuille-verte.svg"
            alt="" aria-hidden="true"
            className="absolute right-[20%] sm:right-[24%] -bottom-10 sm:-bottom-14 w-32 sm:w-40 pointer-events-none opacity-35 select-none z-10 rotate-120 -scale-x-100 brightness-[0.35] animate-firework-br"
            style={{ animationDelay: '0.5s' }}
          />

          {/* 🍃 Zone Extrême Droite */}
          <img
            src="/assets/1001gouts/feuille-verte.svg"
            alt="" aria-hidden="true"
            className="absolute -right-2 sm:right-2 lg:-right-6 top-10 w-36 sm:w-52 pointer-events-none opacity-35 select-none z-10 rotate-45 animate-firework-tr"
            style={{ filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)', animationDelay: '0.1s' }}
          />
          <img
            src="/assets/1001gouts/feuille-verte.svg"
            alt="" aria-hidden="true"
            className="absolute right-6 sm:right-14 lg:right-10 -top-12 sm:-top-16 w-24 sm:w-32 pointer-events-none opacity-30 select-none z-10 -rotate-20 brightness-[0.35] animate-firework-top"
            style={{ animationDelay: '0.8s' }}
          />
          <img
            src="/assets/1001gouts/feuille-verte.svg"
            alt="" aria-hidden="true"
            className="absolute right-4 sm:right-12 bottom-6 w-24 sm:w-32 pointer-events-none opacity-30 select-none z-10 rotate-130 brightness-[0.35] animate-firework-br"
            style={{ animationDelay: '0.4s' }}
          />
          <img
            src="/assets/1001gouts/feuille-verte.svg"
            alt="" aria-hidden="true"
            className="hidden sm:block absolute right-20 lg:right-28 top-1/2 -translate-y-1/2 w-28 sm:w-36 pointer-events-none opacity-25 select-none z-10 rotate-80 -scale-x-100 animate-firework-side"
            style={{ filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)', animationDelay: '0.6s' }}
          />

          {/* 🎯 Card Centrale Rose avec Bouton Orange */}
          <div className="max-w-3xl mx-auto bg-[#FF859D] p-8 sm:p-12 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center relative z-20 text-white">
            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-white mb-3">
              Avant de partir, téléchargez votre guide offert !
            </h3>
            <p className="text-sm sm:text-base text-white max-w-xl mx-auto mb-7 leading-relaxed font-medium">
              Alors qu'un tiers des boucheries voit sa rentabilité fragilisée, retrouvez les solutions concrètes partagées par vos confrères pour faire grandir votre boutique sereinement.
            </p>
            <button
              type="button"
              onClick={openModal}
              className="btn-shine-effect group bg-[#F48631] hover:bg-[#d97223] text-white px-9 py-4 rounded-full font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 transform hover:-translate-y-0.5"
            >
              <span>Obtenir mon guide</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5 duration-200" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🪟 FENÊTRE CONTEXTUELLE / MODALE DU FORMULAIRE                            */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-xl bg-[#FDF3E2] rounded-3xl shadow-2xl border border-[#D9DCD5] my-auto overflow-hidden animate-pop text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton Fermer */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Fermer la fenêtre"
              className="absolute top-4 sm:top-5 right-4 sm:right-5 w-9 h-9 rounded-full bg-[#19522A]/10 hover:bg-[#19522A]/20 text-[#19522A] flex items-center justify-center transition-colors cursor-pointer z-40"
            >
              <X size={18} />
            </button>

            {/* 🌿 Scrollbar Végétale Personnalisée (Ligne droite & Feuille tournante) */}
            {hasModalScroll && (
              <div 
                aria-hidden="true"
                className="absolute right-2.5 sm:right-3.5 top-20 bottom-8 w-5 flex justify-center pointer-events-none z-30 select-none transition-opacity duration-300"
              >
                {/* Ligne droite verticale */}
                <div className="w-[2px] h-full bg-[#19522A]/20 rounded-full relative">
                  {/* Feuille végétale tournante qui suit la ligne */}
                  <div 
                    className="absolute -left-[9px] w-5 h-5 transition-transform duration-75 ease-out"
                    style={{
                      top: `${modalScrollProgress * 100}%`,
                      transform: `translateY(-50%) rotate(${modalScrollProgress * 720}deg)`,
                    }}
                  >
                    <img
                      src="/assets/1001gouts/feuille-verte.svg"
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full object-contain brightness-[0.35] drop-shadow-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 🎆 Explosion Végétale Plein Écran au Succès */}
            {isSubmitted && (
              <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-[70] overflow-hidden">
                {[
                  { tx: '-38vw', ty: '-36vh', rot: -140, scale: 1.25, delay: '0s', size: 36, filter: 'brightness(0.35)' },
                  { tx: '-18vw', ty: '-44vh', rot: 45, scale: 0.95, delay: '0.06s', size: 28, filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)' },
                  { tx: '18vw', ty: '-42vh', rot: -60, scale: 1.1, delay: '0.04s', size: 32, filter: 'brightness(0.35)' },
                  { tx: '38vw', ty: '-36vh', rot: 130, scale: 1.3, delay: '0.1s', size: 40, filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)' },
                  { tx: '0vw', ty: '-46vh', rot: -20, scale: 1.05, delay: '0.14s', size: 30, filter: 'brightness(0.35)' },

                  { tx: '44vw', ty: '-16vh', rot: 90, scale: 1.15, delay: '0.05s', size: 34, filter: 'brightness(0.35)' },
                  { tx: '48vw', ty: '6vh', rot: 180, scale: 1.25, delay: '0.09s', size: 38, filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)' },
                  { tx: '42vw', ty: '28vh', rot: 220, scale: 0.95, delay: '0.12s', size: 26, filter: 'brightness(0.35)' },

                  { tx: '36vw', ty: '42vh', rot: 270, scale: 1.2, delay: '0.07s', size: 36, filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)' },
                  { tx: '14vw', ty: '46vh', rot: -160, scale: 1.05, delay: '0.11s', size: 30, filter: 'brightness(0.35)' },
                  { tx: '-14vw', ty: '46vh', rot: 75, scale: 1.1, delay: '0.03s', size: 32, filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)' },
                  { tx: '-36vw', ty: '40vh', rot: -95, scale: 1.3, delay: '0.08s', size: 38, filter: 'brightness(0.35)' },
                  { tx: '0vw', ty: '44vh', rot: 15, scale: 0.9, delay: '0.15s', size: 24, filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)' },

                  { tx: '-46vw', ty: '22vh', rot: -45, scale: 1.1, delay: '0.06s', size: 32, filter: 'brightness(0.35)' },
                  { tx: '-48vw', ty: '-6vh', rot: 30, scale: 1.25, delay: '0.13s', size: 38, filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)' },
                  { tx: '-42vw', ty: '-24vh', rot: -140, scale: 0.95, delay: '0.02s', size: 28, filter: 'brightness(0.35)' },

                  { tx: '-24vw', ty: '-16vh', rot: 80, scale: 0.85, delay: '0.16s', size: 22, filter: 'brightness(0.35)' },
                  { tx: '24vw', ty: '-16vh', rot: -70, scale: 0.85, delay: '0.15s', size: 22, filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)' },
                  { tx: '24vw', ty: '20vh', rot: 110, scale: 0.8, delay: '0.18s', size: 20, filter: 'brightness(0.35)' },
                  { tx: '-24vw', ty: '20vh', rot: -100, scale: 0.8, delay: '0.17s', size: 20, filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)' },
                ].map((leaf, lIdx) => (
                  <img
                    key={lIdx}
                    src="/assets/1001gouts/feuille-verte.svg"
                    alt=""
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none animate-fullscreen-leaf"
                    style={{
                      '--tx': leaf.tx,
                      '--ty': leaf.ty,
                      '--rot': `${leaf.rot}deg`,
                      '--scale': leaf.scale,
                      animationDelay: leaf.delay,
                      width: `${leaf.size}px`,
                      height: `${leaf.size}px`,
                      filter: leaf.filter,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Contenu Défilable de la Modale */}
            <div
              ref={modalBodyRef}
              onScroll={handleModalScroll}
              className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto no-scrollbar pr-7 sm:pr-9"
            >
              {!isSubmitted && (
                <div className="pr-8 mb-5">
                  <h3 className="font-display text-xl sm:text-2xl text-[#19522A] mb-1">
                    Obtenez votre guide offert !
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                    Partagez vos priorités pour orienter les fonctionnalités de l'application et téléchargez instantanément votre livre blanc.
                  </p>
                </div>
              )}

              {isSubmitted ? (
                <div className="py-6 text-center animate-fadeIn relative">
                  {/* Icône animé LordIcon en mouvement permanent */}
                  <div className="w-18 h-18 bg-[#558D4D]/15 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner group">
                    <LordIcon 
                      src="https://cdn.lordicon.com/lbcxnxti.json" 
                      trigger="loop" 
                      colors="primary:#19522A,secondary:#F48631" 
                      size={46} 
                    />
                  </div>

                  <h4 className="font-display text-lg text-[#19522A] mb-1">Merci {formData.firstName} !</h4>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                    Votre guide PDF est prêt et votre téléchargement s'est lancé automatiquement.
                  </p>

                  <div className="space-y-2 mb-4">
                    <button
                      type="button"
                      onClick={triggerPdfDownload}
                      className="btn-shine-effect w-full bg-[#F48631] hover:bg-[#d97223] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-xs text-sm flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                    >
                      <Download size={16} />
                      <span>Télécharger à nouveau le PDF</span>
                    </button>
                    <a
                      href="/guide-complet-artisan-boucher-2027.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-white hover:bg-stone-50 text-[#19522A] font-semibold py-2.5 px-4 rounded-xl border border-[#D9DCD5] transition-colors text-sm flex items-center justify-center gap-1.5 hover:shadow-xs"
                    >
                      <ExternalLink size={14} />
                      <span>Lire en ligne (nouvel onglet)</span>
                    </a>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormErrors({});
                        setFormData({
                          firstName: '',
                          shopName: '',
                          email: '',
                          postalCode: '',
                          phone: '',
                          message: '',
                          obstacles: [],
                          acceptedTerms: false,
                        });
                      }}
                      className="text-xs sm:text-sm text-[#558D4D] font-bold hover:underline cursor-pointer"
                    >
                      Remplir à nouveau
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="text-xs sm:text-sm text-[#667079] hover:text-[#19522A] font-medium cursor-pointer"
                    >
                      Fermer la fenêtre
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="modal-firstName" className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#19522A] mb-1 flex items-center gap-1">
                        <User size={13} className="text-[#F48631]" />
                        <span>Prénom</span> <span className="text-[#F48631]">*</span>
                      </label>
                      <input
                        id="modal-firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Ex : Laurent"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-[#4A4A4A] text-base sm:text-sm shadow-xs transition-all ${
                          formErrors.firstName
                            ? 'border-red-500 ring-2 ring-red-300 bg-red-50/40 animate-shake'
                            : 'border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] bg-white'
                        }`}
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-shopName" className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#19522A] mb-1 flex items-center gap-1">
                        <Store size={13} className="text-[#F48631]" />
                        <span>Nom boucherie</span> <span className="text-[#F48631]">*</span>
                      </label>
                      <input
                        id="modal-shopName"
                        type="text"
                        name="shopName"
                        value={formData.shopName}
                        onChange={handleInputChange}
                        placeholder="Ex : Boucherie du Centre"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-[#4A4A4A] text-base sm:text-sm shadow-xs transition-all ${
                          formErrors.shopName
                            ? 'border-red-500 ring-2 ring-red-300 bg-red-50/40 animate-shake'
                            : 'border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] bg-white'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-7">
                      <label htmlFor="modal-email" className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#19522A] mb-1 flex items-center gap-1">
                        <Mail size={13} className="text-[#F48631]" />
                        <span>Email pro</span> <span className="text-[#F48631]">*</span>
                      </label>
                      <input
                        id="modal-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="vous@boucherie.fr"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-[#4A4A4A] text-base sm:text-sm shadow-xs transition-all ${
                          formErrors.email
                            ? 'border-red-500 ring-2 ring-red-300 bg-red-50/40 animate-shake'
                            : 'border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] bg-white'
                        }`}
                      />
                    </div>

                    <div className="sm:col-span-5">
                      <label htmlFor="modal-postalCode" className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#19522A] mb-1 flex items-center gap-1">
                        <MapPin size={13} className="text-[#F48631]" />
                        <span>Code postal</span> <span className="text-[#F48631]">*</span>
                      </label>
                      <input
                        id="modal-postalCode"
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="69001"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-[#4A4A4A] text-base sm:text-sm shadow-xs transition-all ${
                          formErrors.postalCode
                            ? 'border-red-500 ring-2 ring-red-300 bg-red-50/40 animate-shake'
                            : 'border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] bg-white'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-phone" className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#19522A] mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Phone size={13} className="text-[#F48631]" />
                        <span>Téléphone mobile</span>
                      </span>
                      <span className="text-xs font-normal text-[#667079] lowercase">(optionnel)</span>
                    </label>
                    <input
                      id="modal-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Ex : 06 12 34 56 78"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A] text-base sm:text-sm bg-white shadow-xs transition-all"
                    />
                  </div>

                  <div className={`p-1.5 rounded-2xl transition-all ${
                    formErrors.obstacles ? 'ring-2 ring-red-400 bg-red-50/40 border border-red-500 animate-shake' : ''
                  }`}>
                    <label className={`block text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 ${
                      formErrors.obstacles ? 'text-red-600' : 'text-[#19522A]'
                    }`}>
                      Vos priorités métier (2 maximum) <span className="text-[#F48631]">*</span>
                      {formErrors.obstacles && <span className="ml-2 text-[11px] font-normal normal-case text-red-500">(Sélectionnez au moins 1 priorité)</span>}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {obstacleOptions.map((option, idx) => {
                        const isSelected = formData.obstacles.includes(option);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleObstacleToggle(option)}
                            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 text-left flex items-center gap-2 cursor-pointer border select-none active:scale-95 ${
                              isSelected
                                ? 'bg-[#19522A] text-white border-[#19522A] shadow-xs'
                                : 'bg-white text-[#4A4A4A] border-[#D9DCD5] hover:border-[#19522A]/40 hover:bg-[#FDF3E2]/50'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border text-[9px] font-bold flex-shrink-0 ${
                              isSelected ? 'animate-pop bg-[#F48631] border-[#F48631] text-white' : 'border-[#D9DCD5] bg-stone-50 text-transparent'
                            }`}>
                              ✓
                            </span>
                            <span>{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-message" className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#19522A] mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <MessageSquare size={13} className="text-[#F48631]" />
                        <span>Un autre sujet à nous partager ?</span>
                      </span>
                      <span className="text-xs font-normal text-[#667079] lowercase">(optionnel)</span>
                    </label>
                    <textarea
                      id="modal-message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Une autre difficulté à nous partager, une idée pour l'application, ou simplement parler de la pluie et du beau temps ? C'est à vous..."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A] text-base sm:text-sm bg-white shadow-xs transition-all resize-none leading-relaxed"
                    />
                  </div>

                  <div className={`pt-0.5 p-1 rounded-lg transition-all ${
                    formErrors.acceptedTerms ? 'bg-red-50/50 ring-1 ring-red-400 rounded-lg animate-shake' : ''
                  }`}>
                    <label className={`flex items-start gap-2 text-xs sm:text-sm cursor-pointer ${
                      formErrors.acceptedTerms ? 'text-red-600 font-semibold' : 'text-[#667079]'
                    }`}>
                      <input
                        type="checkbox"
                        name="acceptedTerms"
                        checked={formData.acceptedTerms}
                        onChange={handleInputChange}
                        className="rounded border-[#D9DCD5] text-[#F48631] focus:ring-[#F48631] mt-0.5 w-4 h-4"
                      />
                      <span>
                        J'accepte de recevoir les dernières astuces de 1001 goûts
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-shine-effect group w-full bg-[#F48631] hover:bg-[#d97223] text-white font-bold py-3.5 px-6 rounded-full transition-all shadow-md hover:shadow-lg mt-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base inline-flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F48631] focus-visible:ring-offset-2 transform hover:-translate-y-0.5"
                  >
                    <span>{isLoading ? 'Envoi en cours...' : 'Obtenir mon guide'}</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5 duration-200" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Bouchers;
