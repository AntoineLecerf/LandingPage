import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
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
  Mail
} from 'lucide-react';
import BrushSeparator from '../components/BrushSeparator';

const Bouchers = () => {
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    shopName: '',
    email: '',
    postalCode: '',
    obstacles: [],
    acceptedTerms: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Webhook URL (Google Apps Script / Make.com)
  const GOOGLE_SCRIPT_URL = ""; 

  const obstacleOptions = [
    'Préserver mes marges face à l\'inflation',
    'Recruter du personnel & apprentis qualifiés',
    'Attirer les jeunes foyers du quartier',
    'Automatiser ma visibilité & réseaux locaux',
    'Flambée des factures d\'énergie (chambres froides)',
    'Concurrence des barquettes industrielles',
    'Aucun',
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'acceptedTerms') {
      setFormData((prev) => ({ ...prev, acceptedTerms: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleObstacleToggle = (option) => {
    setFormData((prev) => {
      let current = [...prev.obstacles];
      if (option === 'Aucun') {
        return { ...prev, obstacles: current.includes('Aucun') ? [] : ['Aucun'] };
      }
      current = current.filter((item) => item !== 'Aucun');
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.shopName || !formData.email || !formData.postalCode || !formData.acceptedTerms) {
      return;
    }
    setIsLoading(true);

    if (GOOGLE_SCRIPT_URL) {
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } catch (err) {
        console.error('Erreur webhook :', err);
      }
    } else {
      // Simulation locale
      await new Promise((resolve) => setTimeout(resolve, 400));
    }

    setIsLoading(false);
    setIsSubmitted(true);
  };

  const scrollToForm = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('formulaire');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full bg-[#FDF3E2] text-[#19522A] overflow-x-hidden">

      {/* ========================================================================= */}
      {/* SECTION 1 : HERO SECTION (VERT ÉPINARD #19522A & VIDÉO NATURELLE)         */}
      {/* ========================================================================= */}
      <section className="relative pt-8 pb-32 md:pt-14 md:pb-44 bg-[#19522A] text-white">
        
        {/* Background YouTube Video with high visibility */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vw] h-[160vh] min-w-[1400px] min-h-[900px]">
            <iframe
              src="https://www.youtube-nocookie.com/embed/QQSn5cEe1j8?autoplay=1&mute=1&controls=0&loop=1&playlist=QQSn5cEe1j8&playsinline=1&rel=0&showinfo=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&enablejsapi=1"
              title="1001 Goûts Background Video"
              className="w-full h-full object-cover pointer-events-none opacity-90 filter brightness-100 contrast-105"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>

          {/* Light transparent veil to let video show clearly while maintaining text readability */}
          <div className="absolute inset-0 bg-black/35 z-10"></div>
          {/* Subtle base blend to footer/brush */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#19522A]/60 to-transparent z-10"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-20">
          
          {/* Internal Team Analysis Banner Accessible from Hero */}
          <div className="mb-8 flex justify-center">
            <Link
              to="/analyse"
              className="inline-flex items-center gap-2.5 bg-black/40 hover:bg-black/60 text-white px-4 py-2 rounded-full border border-white/30 text-xs sm:text-sm font-semibold transition-colors backdrop-blur-xs"
            >
              <span className="bg-[#F48631] text-white text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full">
                Équipe
              </span>
              <span>📊 Voir l'analyse éditoriale & le dossier de cadrage section par section</span>
              <ArrowRight size={14} className="text-[#F48631]" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display text-white leading-[1.1] mb-6">
                Les artisans bouchers ne devraient pas avancer seuls !
              </h1>
              <p className="text-lg text-[#FDF3E2] font-medium leading-relaxed mb-4">
                Tenir une boucherie artisanale, c'est être chef artisan, garant du terroir, gestionnaire de marges face aux hausses d'énergie, tout en résistant à la grande distribution industrielle.
              </p>
              <p className="text-base text-white/95 leading-relaxed mb-8">
                En partageant votre réalité de terrain en 2 minutes, recevez immédiatement le <strong>guide complet 2026-2027</strong> pour booster votre rentabilité (optimisation des marges, circuits courts éleveurs-bouchers, fidélisation locale sans intermédiaire).
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <a
                  href="#formulaire"
                  onClick={scrollToForm}
                  className="bg-[#F48631] hover:bg-[#d97223] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-flex items-center gap-3"
                >
                  <span>Obtenir mon guide offert</span>
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>

            {/* REALISTIC CLEAN SMARTPHONE MOCKUP */}
            <div className="flex justify-center relative">
              <div className="relative w-full max-w-[310px] aspect-[9/18.5] bg-[#222] rounded-[3rem] border-[6px] border-[#333] shadow-2xl overflow-hidden p-1.5 ring-1 ring-white/10">
                
                {/* Inner Screen */}
                <div className="w-full h-full bg-[#FDF3E2] text-[#19522A] rounded-[2.5rem] overflow-hidden flex flex-col justify-between p-4 pt-8 text-center relative z-10">
                  
                  {/* Dynamic Island */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-40 flex items-center justify-between px-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#19522A]/60"></div>
                    <div className="w-2 h-2 rounded-full bg-[#F48631]"></div>
                  </div>

                  {/* App Header */}
                  <div className="mt-2">
                    <img src="/1001GOUTS-LOGO-RVB.png" alt="1001 Goûts" className="h-8 mx-auto mb-3" />
                    
                    {/* Active Store Card */}
                    <div className="bg-white p-3.5 rounded-2xl border border-[#D9DCD5] shadow-xs mb-3 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-[#F48631] bg-[#F48631]/10 px-1.5 py-0.5 rounded">
                          Espace Pro Boucher
                        </span>
                        <span className="text-[9px] bg-[#19522A] text-white px-2 py-0.5 rounded-full font-bold">
                          ✓ 1001 Engagés
                        </span>
                      </div>
                      <h3 className="font-display text-sm text-[#19522A]">Boucherie de Tradition</h3>
                      <p className="text-[11px] text-[#558D4D] font-bold mt-0.5">● 100% Marge Pro Conservée (0% com)</p>
                    </div>

                    {/* Notification Card */}
                    <div className="bg-[#19522A] text-white p-3 rounded-xl shadow-xs text-left mb-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#F48631]">
                        <BellRing size={12} />
                        <span>Alerte Quartier Active</span>
                      </div>
                      <p className="text-[10px] text-white/90 mt-0.5 leading-tight">
                        38 clients à proximité informés de votre arrivage de bœuf local.
                      </p>
                    </div>

                    {/* Unlocked Guide Badge */}
                    <div className="bg-[#558D4D]/15 text-[#19522A] p-2.5 rounded-xl border border-[#558D4D]/30 font-bold text-[11px] flex items-center justify-center gap-1.5">
                      <CheckCircle2 size={14} className="text-[#558D4D]" />
                      <span>Guide Pro 2026-2027 Débloqué</span>
                    </div>
                  </div>

                  {/* App Bottom Footer Bar */}
                  <div className="bg-white/95 p-2.5 rounded-xl border border-[#D9DCD5] shadow-xs text-[10px] text-[#4A4A4A]">
                    <p className="font-bold text-[#19522A]">Communauté Artisans 1001 Goûts</p>
                    <p className="text-[9px] text-[#667079] mt-0.5">Rapprocher producteurs et consommateurs locaux</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 : GUIDE COMPLET OFFERT (CRÈME CHAUD #FDF3E2)                    */}
      {/* ========================================================================= */}
      <section className="relative pt-20 pb-36 md:pt-24 md:pb-44 bg-[#FDF3E2]">
        {/* 🎨 Séparateur Pinceau 1 (Top) : Transition Vert #19522A -> Crème #FDF3E2 (Modèle 1001 Goûts) */}
        <BrushSeparator position="top" fillColor="#FDF3E2" />
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* HARDCOVER BOOK MOCKUP */}
          <div className="flex justify-center relative">
            <div className="w-[260px] sm:w-[290px] aspect-[1/1.38] bg-[#19522A] text-white p-7 rounded-r-2xl rounded-l-md shadow-xl border-r-4 border-b-4 border-black/20 relative overflow-hidden flex flex-col justify-between">
              
              {/* Book Spine Left */}
              <div className="absolute top-0 left-0 w-4 h-full bg-black/20"></div>
              <div className="absolute top-0 left-4 w-[1px] h-full bg-white/20"></div>

              {/* Book Header */}
              <div className="relative z-10 pl-2">
                <span className="inline-block bg-[#F48631] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4">
                  Édition Spéciale 2026-2027
                </span>
                <h3 className="font-display text-2xl sm:text-3xl leading-[1.15] text-white mb-2">
                  Le Guide Complet de l'Artisan Boucher
                </h3>
                <p className="text-[11px] text-white/80 leading-relaxed font-medium">
                  Stratégies de rentabilité, maîtrise du coût de l'énergie, filières éleveurs directes et fidélisation locale.
                </p>
              </div>

              {/* Book Footer */}
              <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between pl-2">
                <img src="/1001GOUTS-LOGO-BLC.png" alt="1001 Goûts" className="h-6 opacity-95" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F48631] bg-black/30 px-2 py-0.5 rounded">
                  Offert à 100%
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-display text-[#19522A] mb-6 leading-tight">
              Guide complet de l'artisan boucher offert !
            </h2>
            <p className="text-base text-[#4A4A4A] font-medium mb-6">
              Ce guide complet rédigé avec des professionnels du secteur vous permettra de :
            </p>
            <ul className="space-y-4 text-[#4A4A4A]">
              <li className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#D9DCD5] shadow-xs">
                <div className="w-7 h-7 rounded-xl bg-[#558D4D]/15 text-[#558D4D] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-sm md:text-base leading-relaxed">
                  <strong>Préserver et maîtriser vos marges brutes</strong> face aux flambées du coût de l'énergie (chambres froides) et des matières premières, sans sacrifier l'exigence de découpe artisanale.
                </span>
              </li>
              <li className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#D9DCD5] shadow-xs">
                <div className="w-7 h-7 rounded-xl bg-[#558D4D]/15 text-[#558D4D] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-sm md:text-base leading-relaxed">
                  <strong>Rallier les « consommActeurs » et jeunes actifs de votre quartier</strong> à la viande locale de qualité sans passer vos soirées sur les réseaux sociaux.
                </span>
              </li>
              <li className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#D9DCD5] shadow-xs">
                <div className="w-7 h-7 rounded-xl bg-[#558D4D]/15 text-[#558D4D] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-sm md:text-base leading-relaxed">
                  <strong>Accéder à des opportunités d'achats groupés directs éleveurs</strong> et à des pistes concrètes pour le recrutement d'apprentis et d'ouvriers bouchers motivés.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 🎨 Séparateur Pinceau 2 (Bottom) : Transition Crème #FDF3E2 -> Blanc #ffffff (Modèle 1001 Goûts) */}
        <BrushSeparator position="bottom" fillColor="#FDF3E2" flipX={true} />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 : FORMULAIRE & ACCROCHE (BLANC #ffffff - ID: formulaire)       */}
      {/* ========================================================================= */}
      <section id="formulaire" className="relative pt-20 pb-16 md:pt-24 md:pb-20 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Form Card (2/5 / Col 5) */}
            <div className="lg:col-span-5 bg-[#FDF3E2] p-8 sm:p-9 rounded-3xl border border-[#D9DCD5] shadow-md relative">
              <h3 className="font-display text-2xl text-[#19522A] mb-6">
                Obtenez votre guide en 2 min !
              </h3>

              {isSubmitted ? (
                <div className="py-8 text-center animate-fadeIn">
                  <div className="w-16 h-16 bg-[#558D4D]/15 text-[#558D4D] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="font-display text-xl text-[#19522A] mb-2">Merci {formData.firstName} !</h4>
                  <p className="text-sm text-[#667079] leading-relaxed mb-6">
                    Votre guide complet de l'artisan boucher a été expédié à <strong>{formData.email}</strong>. Nous vous inviterons également en priorité pour tester gratuitement l'espace Pro 1001 Goûts.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        firstName: '',
                        shopName: '',
                        email: '',
                        postalCode: '',
                        obstacles: [],
                        acceptedTerms: false,
                      });
                    }}
                    className="text-xs text-[#558D4D] font-bold hover:underline"
                  >
                    Remplir à nouveau
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#19522A] mb-1.5 flex items-center gap-1.5">
                      <User size={13} className="text-[#F48631]" />
                      <span>Prénom</span> <span className="text-[#F48631]">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Ex : Laurent"
                      className="w-full px-4 py-3 rounded-xl border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A] text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#19522A] mb-1.5 flex items-center gap-1.5">
                      <Store size={13} className="text-[#F48631]" />
                      <span>Nom de la boucherie / Maison</span> <span className="text-[#F48631]">*</span>
                    </label>
                    <input
                      type="text"
                      name="shopName"
                      required
                      value={formData.shopName}
                      onChange={handleInputChange}
                      placeholder="Ex : Boucherie Traditionnelle des Halles"
                      className="w-full px-4 py-3 rounded-xl border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A] text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#19522A] mb-1.5 flex items-center gap-1.5">
                      <Mail size={13} className="text-[#F48631]" />
                      <span>Email professionnel</span> <span className="text-[#F48631]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="vous@boucherie.fr"
                      className="w-full px-4 py-3 rounded-xl border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A] text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#19522A] mb-1.5 flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#F48631]" />
                      <span>Code postal</span> <span className="text-[#F48631]">*</span>
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="75, 69, 13, 33..."
                      className="w-full px-4 py-3 rounded-xl border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A] text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#19522A] mb-2">
                      Obstacles rencontrés au quotidien (2 Max) <span className="text-[#F48631]">*</span>
                    </label>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {obstacleOptions.map((option, idx) => (
                        <label
                          key={idx}
                          className="flex items-center gap-2.5 text-xs text-[#4A4A4A] cursor-pointer select-none p-2 rounded-lg hover:bg-white/80 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={formData.obstacles.includes(option)}
                            onChange={() => handleObstacleToggle(option)}
                            className="rounded border-[#D9DCD5] text-[#F48631] focus:ring-[#F48631]"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-2 text-xs text-[#667079] cursor-pointer">
                      <input
                        type="checkbox"
                        name="acceptedTerms"
                        required
                        checked={formData.acceptedTerms}
                        onChange={handleInputChange}
                        className="rounded border-[#D9DCD5] text-[#F48631] focus:ring-[#F48631] mt-0.5"
                      />
                      <span>
                        J'accepte les{' '}
                        <a href="https://www.1001gouts.com/mentions-legales/" target="_blank" rel="noreferrer" className="text-[#F48631] underline font-semibold">
                          termes
                        </a>{' '}
                        et{' '}
                        <a href="https://www.1001gouts.com/politique-de-confidentialite/" target="_blank" rel="noreferrer" className="text-[#F48631] underline font-semibold">
                          conditions
                        </a>{' '}
                        et d'être recontacté par 1001 Goûts. <span className="text-[#F48631]">*</span>
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#F48631] hover:bg-[#d97223] text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg mt-4 disabled:opacity-70 cursor-pointer text-base"
                  >
                    {isLoading ? 'Envoi en cours...' : 'Je donne mon avis & reçois le guide'}
                  </button>
                </form>
              )}
            </div>

            {/* Pitch Card (3/5 / Col 7) */}
            <div className="lg:col-span-7 pt-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-[#19522A] leading-tight mb-6">
                Obtenez les meilleures astuces des artisans bouchers
              </h2>
              <p className="text-lg text-[#000000]/80 leading-relaxed mb-8">
                Chez 1001 Goûts, nous refusons que nos artisans de bouche restent isolés face aux grandes enseignes industrialisées. En remplissant ce formulaire, vous recevrez par email un guide complet contenant les <strong>retours d'expérience et astuces concrètes de confrères</strong> pour l'exercice 2026-2027.
              </p>
              
              {/* 3 Trust Pillars */}
              <div className="bg-[#FDF3E2] p-7 rounded-3xl border border-[#D9DCD5] shadow-xs space-y-4 text-sm text-[#4A4A4A]">
                <p className="font-display text-base text-[#19522A] flex items-center gap-2">
                  <ShieldCheck size={20} className="text-[#558D4D]" />
                  <span>Un engagement 100% solidaire et sans frais :</span>
                </p>
                <div className="grid sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white p-3.5 rounded-xl border border-[#D9DCD5]">
                    <p className="font-bold text-xs text-[#19522A] mb-1">0% Commission</p>
                    <p className="text-[11px] text-[#667079]">100% de votre chiffre d'affaires reste chez vous.</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-[#D9DCD5]">
                    <p className="font-bold text-xs text-[#19522A] mb-1">Données Protégées</p>
                    <p className="text-[11px] text-[#667079]">Usage exclusif pour le guide, jamais revendues.</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-[#D9DCD5]">
                    <p className="font-bold text-xs text-[#19522A] mb-1">Accès Testeur VIP</p>
                    <p className="text-[11px] text-[#667079]">Invitation prioritaire sans aucun abonnement.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 : POURQUOI REMPLIR LE FORMULAIRE ? (BLANC #ffffff)             */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-36 md:pt-16 md:pb-44 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-display text-[#19522A] mb-6">
            Pourquoi remplir le formulaire ?
          </h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-[#667079] leading-relaxed mb-16">
            Avec vos retours, nous pourrons développer des outils dans l'application qui soulageront votre charge mentale au quotidien. En plus du guide complet, vous serez parmi les premiers à la tester gratuitement !
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* Card 1 */}
            <div className="bg-[#FDF3E2] hover:bg-[#FDF3E2]/80 p-8 rounded-3xl border border-[#D9DCD5] shadow-xs transition-colors">
              <div className="w-14 h-14 bg-[#F48631]/15 text-[#F48631] rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp size={28} />
              </div>
              <h3 className="font-display text-xl text-[#19522A] mb-3">
                Gestion & Marges Justes
              </h3>
              <p className="text-sm text-[#667079] leading-relaxed">
                Trouvez les leviers pour réduire vos charges fixes, maîtriser les factures d'énergie du froid et vivre dignement de votre passion artisanale.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FDF3E2] hover:bg-[#FDF3E2]/80 p-8 rounded-3xl border border-[#D9DCD5] shadow-xs transition-colors">
              <div className="w-14 h-14 bg-[#558D4D]/15 text-[#558D4D] rounded-2xl flex items-center justify-center mb-6">
                <BellRing size={28} />
              </div>
              <h3 className="font-display text-xl text-[#19522A] mb-3">
                Visibilité & Rayonnement Local
              </h3>
              <p className="text-sm text-[#667079] leading-relaxed">
                Ralliez les "consommActeurs" de votre quartier sans complexité technique, valorisez vos arrivages et gagnez des clients fidèles.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FDF3E2] hover:bg-[#FDF3E2]/80 p-8 rounded-3xl border border-[#D9DCD5] shadow-xs transition-colors">
              <div className="w-14 h-14 bg-[#19522A]/15 text-[#19522A] rounded-2xl flex items-center justify-center mb-6">
                <Users size={28} />
              </div>
              <h3 className="font-display text-xl text-[#19522A] mb-3">
                Confraternité & Circuits Courts
              </h3>
              <p className="text-sm text-[#667079] leading-relaxed">
                Rompez la solitude de l'artisan : profitez d'opportunités d'achats groupés en direct éleveurs et de mise en relation de talents du métier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 : PREUVES SOCIALES (CRÈME #FDF3E2)                              */}
      {/* ========================================================================= */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 bg-[#FDF3E2]">
        {/* 🎨 Séparateur Pinceau 3 (Top) : Transition Blanc #ffffff -> Crème #FDF3E2 (Modèle 1001 Goûts) */}
        <BrushSeparator position="top" fillColor="#FDF3E2" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-[#19522A]">
              Preuves sociales
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white p-8 rounded-3xl border border-[#D9DCD5] shadow-sm flex flex-col justify-between">
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#F48631] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-[#4A4A4A] italic leading-relaxed mb-6">
                  "La démarche 1001 Goûts remet le travail de carcasse et le savoir-faire au centre. Les pistes du guide sur l'optimisation des chambres froides et la gestion des matières m'ont permis de respirer financièrement."
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-[#D9DCD5]/60">
                <img
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=150&q=80"
                  alt="Laurent D."
                  className="w-13 h-13 rounded-2xl object-cover border-2 border-[#558D4D]"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#19522A]">Laurent D.</h4>
                  <p className="text-xs text-[#667079]">Boucherie Traditionnelle · Chatou (78)</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-8 rounded-3xl border border-[#D9DCD5] shadow-sm flex flex-col justify-between">
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#F48631] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-[#4A4A4A] italic leading-relaxed mb-6">
                  "Les habitants veulent mieux manger mais se laissent tenter par la facilité des supermarchés. Les astuces du guide pour attirer les jeunes foyers du quartier ont fait mouche chez nous."
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-[#D9DCD5]/60">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                  alt="Stéphanie M."
                  className="w-13 h-13 rounded-2xl object-cover border-2 border-[#F48631]"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#19522A]">Stéphanie M.</h4>
                  <p className="text-xs text-[#667079]">Maison & Charcuterie · Lyon (69)</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-8 rounded-3xl border border-[#D9DCD5] shadow-sm flex flex-col justify-between">
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#F48631] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-[#4A4A4A] italic leading-relaxed mb-6">
                  "Enfin une initiative qui refuse de prendre des commissions sur nos ventes. 0% de commission et du vrai partage entre confrères, c'est exactement ce dont l'artisanat a besoin."
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-[#D9DCD5]/60">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
                  alt="Karim B."
                  className="w-13 h-13 rounded-2xl object-cover border-2 border-[#19522A]"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#19522A]">Karim B.</h4>
                  <p className="text-xs text-[#667079]">Artisan Boucher · Marseille (13)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 : FOIRE AUX QUESTIONS (CRÈME #FDF3E2)                          */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-36 md:pt-16 md:pb-44 bg-[#FDF3E2]">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-[#19522A]">
              Foire Aux Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Quand et comment vais-je recevoir le guide ?",
                a: "Dès que vous validez le formulaire ci-dessus, le guide complet 2026-2027 vous est immédiatement envoyé par e-mail au format PDF interactif, téléchargeable et consultable sur smartphone, tablette ou ordinateur.",
              },
              {
                q: "L'application 1001 Goûts prend-elle une commission sur mes ventes ?",
                a: "Non, absolument pas. 1001 Goûts applique une règle stricte et immuable de 0% de commission sur vos ventes. Nous existons pour protéger la rémunération juste de l'artisan et non pour prélever des intermédiaires.",
              },
              {
                q: "Que ferez-vous de mes réponses au formulaire ?",
                a: "Vos réponses servent exclusivement à orienter les priorités de développement de l'espace Pro 1001 Goûts (fonctionnalités de gestion, mise en avant locale, circuits courts). Vos données restent strictement confidentielles et ne sont jamais revendues.",
              },
              {
                q: "Comment fonctionne l'accès testeur gratuit ?",
                a: "En participant à cette consultation, votre adresse email est inscrite sur notre liste d'accès prioritaire. Vous recevrez une invitation privée pour tester gratuitement l'application avant son ouverture officielle au grand public.",
              },
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className={`border rounded-2xl overflow-hidden transition-colors ${
                  openFaq === idx ? 'bg-white border-[#F48631]/60 shadow-sm' : 'bg-white/70 border-[#D9DCD5] hover:bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-display text-base md:text-lg text-[#19522A] flex justify-between items-center transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${openFaq === idx ? 'bg-[#F48631] text-white rotate-180' : 'bg-[#FDF3E2] text-[#19522A] border border-[#D9DCD5]'}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-[#4A4A4A] leading-relaxed border-t border-[#D9DCD5]/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <a
              href="#formulaire"
              onClick={scrollToForm}
              className="bg-[#F48631] hover:bg-[#d97223] text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
            >
              <span>Donner mon avis et obtenir le guide</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>

        {/* 🎨 Séparateur Pinceau 4 (Bottom) : Transition Crème #FDF3E2 -> Vert #19522A (Footer - Modèle 1001 Goûts) */}
        <BrushSeparator position="bottom" fillColor="#FDF3E2" flipX={true} />
      </section>

    </div>
  );
};

export default Bouchers;
