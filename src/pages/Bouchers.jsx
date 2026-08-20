import React, { useState, useEffect } from 'react';
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
  BookOpen,
  Sparkles,
  Award,
  HelpCircle,
  Download,
  ExternalLink,
  FileCheck,
  Heart
} from 'lucide-react';
import BrushSeparator from '../components/BrushSeparator';
import SEOHead from '../components/SEOHead';

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
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || ""; 

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

  const triggerPdfDownload = () => {
    const link = document.createElement('a');
    link.href = '/guide-complet-artisan-boucher-2027.pdf';
    link.download = 'Guide-Complet-Artisan-Boucher-2027.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Ensure YouTube background video plays continuously without paused symbol
  useEffect(() => {
    const playBgVideo = () => {
      const iframe = document.getElementById('hero-bg-video');
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
          iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        } catch {
          // ignore postMessage restrictions
        }
      }
    };

    playBgVideo();
    const interval = setInterval(playBgVideo, 2000);
    return () => clearInterval(interval);
  }, []);

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
      await new Promise((resolve) => setTimeout(resolve, 400));
    }

    setIsLoading(false);
    setIsSubmitted(true);

    // Déclenchement automatique du téléchargement PDF
    setTimeout(() => {
      triggerPdfDownload();
    }, 200);
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
      
      {/* 🚀 Balises SEO, OpenGraph & Métadonnées Schema.org */}
      <SEOHead 
        title="Guide Gratuit 2027 : Rentabilité & Circuits Courts pour Artisans Bouchers | 1001 Goûts"
        description="Téléchargez le livre blanc 2027 dédié aux artisans bouchers : optimisez vos marges brutes, maîtrisez vos coûts d'énergie et développez votre clientèle locale en circuits courts à 0% de commission."
        keywords="boucherie artisanale, artisan boucher, rentabilité boucherie, circuits courts, livre blanc boucherie, marge brute boucherie, 1001 goûts, application boucher"
        ogImage="/guide-boucherie-cover.jpg"
      />

      {/* ========================================================================= */}
      {/* SECTION 1 : HERO SECTION (VERT ÉPINARD #19522A & VIDÉO NATURELLE)         */}
      {/* ========================================================================= */}
      <section className="relative min-h-[90vh] flex items-center bg-[#19522A] text-white">
        
        {/* Background YouTube Video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vw] h-[180vh] min-w-[1500px] min-h-[1000px] pointer-events-none">
            <iframe
              id="hero-bg-video"
              src="https://www.youtube-nocookie.com/embed/jJTd2IlFpVA?autoplay=1&mute=1&controls=0&loop=1&playlist=jJTd2IlFpVA&playsinline=1&rel=0&showinfo=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&autohide=1&cc_load_policy=0&enablejsapi=1"
              title="1001 Goûts Background Video"
              className="w-full h-full object-cover opacity-90 filter brightness-100 contrast-105 pointer-events-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{ pointerEvents: 'none' }}
            />
          </div>

          {/* Light transparent veil */}
          <div className="absolute inset-0 bg-[#19522A]/35 backdrop-brightness-95 pointer-events-none"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-20 text-left py-20 md:py-28">
          <div>
              <p className="font-accent text-[#FF859D] text-lg sm:text-xl md:text-2xl mb-3">
                Pour valoriser le savoir-faire artisanal
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display text-white leading-[1.06] tracking-tight mb-6 max-w-3xl [text-wrap:balance]">
                Les artisans bouchers ne devraient pas avancer&nbsp;seuls&nbsp;!
              </h1>
              <p className="text-base sm:text-lg text-[#FDF3E2] font-medium leading-relaxed mb-8 max-w-2xl">
                Tenir une boucherie artisanale, c'est être chef artisan, garant du terroir, gestionnaire de marges face aux hausses d'énergie, tout en résistant à la grande distribution industrielle.
              </p>

              {/* CTA Hero Button */}
              <div className="flex justify-start">
                <a
                  href="#formulaire"
                  onClick={scrollToForm}
                  className="bg-[#F48631] hover:bg-[#d97223] text-white px-8 py-4 rounded-full font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg inline-flex items-center gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F48631] focus-visible:ring-offset-2"
                >
                  <span>Obtenir mon guide offert</span>
                  <ArrowRight size={18} />
                </a>
              </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 : GUIDE COMPLET OFFERT (CRÈME CHAUD #FDF3E2)                    */}
      {/* ========================================================================= */}
      <section className="relative pt-10 pb-14 md:pt-22 md:pb-28 bg-[#FDF3E2]">
        <BrushSeparator position="top" fillColor="#FDF3E2" />

        {/* 🍃 Détail botanique organique en fond */}
        <img
          src="/assets/1001gouts/feuille-verte.svg"
          alt="" aria-hidden="true"
          className="absolute -left-16 top-10 w-64 sm:w-80 pointer-events-none opacity-20 select-none z-10 brightness-[0.35]"
        />

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 lg:gap-16 items-center relative z-20">
          
          {/* REAL EBOOK / GUIDE COVER */}
          <div className="flex justify-center relative group">
            <div className="relative max-w-[270px] sm:max-w-[320px] w-full rounded-2xl shadow-xl overflow-hidden border border-[#D9DCD5] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-white">
              <img
                src="/guide-boucherie-cover.jpg"
                alt="Guide Complet Boucherie Artisanale 2027 - 1001 Goûts"
                className="w-full h-auto object-cover block"
                loading="eager"
              />
            </div>
          </div>

          <div>
            <p className="font-accent text-[#FF859D] text-lg sm:text-xl md:text-2xl mb-2.5">
              Offert à 100% · Sans aucun engagement
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display text-[#19522A] mb-4 leading-tight">
              Guide complet de l'artisan boucher offert !
            </h2>
            <p className="text-[#4A4A4A] text-sm sm:text-base mb-8 leading-relaxed">
              Ce guide complet rédigé avec des confrères et des experts de terrain vous permettra de :
            </p>

            {/* 🌟 INFOS DYNAMIQUES AVEC ICÔNES THÉMATIQUES */}
            <div className="space-y-6 text-[#19522A]">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#19522A] text-white flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
                  <TrendingUp size={22} className="text-[#F48631]" />
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-[#19522A] mb-1.5">Préserver et maîtriser vos marges brutes</h4>
                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                    Des méthodes éprouvées face aux flambées du coût de l'énergie (chambres froides) et des matières premières.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#19522A] text-white flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
                  <Users size={22} className="text-[#FDF3E2]" />
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-[#19522A] mb-1.5">Rallier les « consommActeurs » & jeunes actifs</h4>
                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                    Comment reconnecter les ménages de votre quartier à la viande locale de qualité sans perdre vos soirées sur les réseaux sociaux.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#19522A] text-white flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
                  <Award size={22} className="text-[#F48631]" />
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-[#19522A] mb-1.5">Circuits courts directs éleveurs & apprentissage</h4>
                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                    Opportunités d'achats groupés directs élevages et pistes concrètes pour attirer et fidéliser des apprentis motivés.
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
      <section id="formulaire" className="relative pt-10 pb-14 md:pt-22 md:pb-28 bg-white scroll-mt-20">
        <BrushSeparator position="top" fillColor="#FDF3E2" flipX={true} />
        
        {/* 🍊 Motif végétal orange retourné */}
        <img
          src="/assets/1001gouts/feuille-verte.svg"
          alt="" aria-hidden="true"
          className="absolute -right-16 bottom-12 w-56 sm:w-72 pointer-events-none opacity-15 select-none z-10 -scale-x-100"
          style={{ filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)' }}
        />
        
        <div className="max-w-6xl mx-auto px-6 relative z-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Form Card (5 Cols) */}
            <div className="lg:col-span-5 bg-[#FDF3E2] p-6 sm:p-8 rounded-3xl border border-[#D9DCD5] shadow-md relative">
              <h3 className="font-display text-xl sm:text-2xl text-[#19522A] mb-5">
                Obtenez votre guide en 2 min !
              </h3>

              {isSubmitted ? (
                <div className="py-6 text-center animate-fadeIn">
                  <div className="w-14 h-14 bg-[#558D4D]/15 text-[#558D4D] rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileCheck size={32} />
                  </div>
                  <h4 className="font-display text-lg text-[#19522A] mb-1">Merci {formData.firstName} !</h4>
                  <p className="text-xs text-[#4A4A4A] leading-relaxed mb-4">
                    Votre guide a été envoyé à <strong>{formData.email}</strong> et votre téléchargement s'est lancé.
                  </p>

                  <div className="space-y-2 mb-4">
                    <button
                      type="button"
                      onClick={triggerPdfDownload}
                      className="w-full bg-[#F48631] hover:bg-[#d97223] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-xs text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download size={16} />
                      <span>Télécharger à nouveau le PDF</span>
                    </button>
                    <a
                      href="/guide-complet-artisan-boucher-2027.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-white hover:bg-stone-50 text-[#19522A] font-semibold py-2.5 px-4 rounded-xl border border-[#D9DCD5] transition-colors text-xs flex items-center justify-center gap-1.5"
                    >
                      <ExternalLink size={14} />
                      <span>Lire en ligne (nouvel onglet)</span>
                    </a>
                  </div>

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
                    className="text-[11px] text-[#558D4D] font-bold hover:underline"
                  >
                    Remplir à nouveau
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div>
                    <label htmlFor="firstName" className="block text-[11px] font-bold uppercase tracking-wider text-[#19522A] mb-1.5 flex items-center gap-1">
                      <User size={12} className="text-[#F48631]" />
                      <span>Prénom</span> <span className="text-[#F48631]">*</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Ex : Laurent"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A] text-base sm:text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="shopName" className="block text-[11px] font-bold uppercase tracking-wider text-[#19522A] mb-1.5 flex items-center gap-1">
                      <Store size={12} className="text-[#F48631]" />
                      <span>Nom de la boucherie</span> <span className="text-[#F48631]">*</span>
                    </label>
                    <input
                      id="shopName"
                      type="text"
                      name="shopName"
                      required
                      value={formData.shopName}
                      onChange={handleInputChange}
                      placeholder="Ex : Boucherie Traditionnelle"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A] text-base sm:text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-wider text-[#19522A] mb-1.5 flex items-center gap-1">
                      <Mail size={12} className="text-[#F48631]" />
                      <span>Email professionnel</span> <span className="text-[#F48631]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="vous@boucherie.fr"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A] text-base sm:text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-[11px] font-bold uppercase tracking-wider text-[#19522A] mb-1.5 flex items-center gap-1">
                      <MapPin size={12} className="text-[#F48631]" />
                      <span>Code postal</span> <span className="text-[#F48631]">*</span>
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="75, 69, 13, 33..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A] text-base sm:text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#19522A] mb-1.5">
                      Obstacles au quotidien (2 Max) <span className="text-[#F48631]">*</span>
                    </label>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                      {obstacleOptions.map((option, idx) => (
                        <label
                          key={idx}
                          className="flex items-center gap-2 text-xs text-[#4A4A4A] cursor-pointer select-none p-2 min-h-[44px] rounded-lg hover:bg-white/80 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={formData.obstacles.includes(option)}
                            onChange={() => handleObstacleToggle(option)}
                            className="rounded border-[#D9DCD5] text-[#F48631] focus:ring-[#F48631] w-4 h-4"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1.5">
                    <label className="flex items-start gap-2 text-[11px] text-[#667079] cursor-pointer min-h-[44px]">
                      <input
                        type="checkbox"
                        name="acceptedTerms"
                        required
                        checked={formData.acceptedTerms}
                        onChange={handleInputChange}
                        className="rounded border-[#D9DCD5] text-[#F48631] focus:ring-[#F48631] mt-0.5 w-4 h-4"
                      />
                      <span>
                        J'accepte les{' '}
                        <a href="https://www.1001gouts.com/mentions-legales/" target="_blank" rel="noreferrer" className="text-[#F48631] underline font-semibold">
                          conditions
                        </a>{' '}
                        et d'être recontacté par 1001 Goûts. <span className="text-[#F48631]">*</span>
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#F48631] hover:bg-[#d97223] text-white font-bold py-3.5 px-6 rounded-full transition-all shadow-md hover:shadow-lg mt-3 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-sm inline-flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F48631] focus-visible:ring-offset-2"
                  >
                    <span>{isLoading ? 'Envoi en cours...' : 'Je donne mon avis & reçois le guide'}</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Pitch Column (7 Cols) - 🌟 DÉFIS SORTIS DE LEUR BOX */}
            <div className="lg:col-span-7 pt-2 relative z-20">
              <p className="font-accent text-[#FF859D] text-lg sm:text-xl md:text-2xl mb-2.5">
                Votre voix compte pour l'artisanat local
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display text-[#19522A] leading-tight mb-5">
                Obtenez les meilleures astuces des artisans bouchers
              </h2>
              
              {/* 🌿 3 DÉFIS MAJEURS 1001 GOÛTS (Sortis de leur box, présentation dynamique et aérée) */}
              <div className="space-y-6 sm:space-y-7">
                <p className="text-xs font-bold text-[#19522A] uppercase tracking-wider mb-3">
                  Les 3 défis du secteur adressés dans le guide :
                </p>

                {/* Défi 1 */}
                <div className="flex items-start gap-4.5">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <img src="/assets/1001gouts/Groupe-16819.png" alt="1" className="w-13 sm:w-15 h-auto" />
                  </div>
                  <div>
                    <h4 className="font-display text-base sm:text-lg font-bold text-[#19522A] mb-1.5">
                      Désinformation & barquettes anonymes
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                      La grande distribution brouille les repères. Le guide vous donne les clés pour mettre en valeur votre traçabilité et rééduquer le consommateur.
                    </p>
                  </div>
                </div>

                {/* Défi 2 */}
                <div className="flex items-start gap-4.5">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <img src="/assets/1001gouts/Groupe-16820.png" alt="2" className="w-13 sm:w-15 h-auto" />
                  </div>
                  <div>
                    <h4 className="font-display text-base sm:text-lg font-bold text-[#19522A] mb-1.5">
                      Marges étouffées & intermédiaires multiples
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                      Stratégies éprouvées de mutualisation et d'achats directs auprès des éleveurs régionaux sans commissions tierces.
                    </p>
                  </div>
                </div>

                {/* Défi 3 */}
                <div className="flex items-start gap-4.5">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <img src="/assets/1001gouts/Groupe-16821.png" alt="3" className="w-13 sm:w-15 h-auto" />
                  </div>
                  <div>
                    <h4 className="font-display text-base sm:text-lg font-bold text-[#19522A] mb-1.5">
                      Visibilité locale & transmission
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                      Comment capter les jeunes ménages de votre quartier sans perdre votre temps sur les réseaux sociaux.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 : POURQUOI REMPLIR LE FORMULAIRE (FOND BLANC #ffffff)          */}
      {/* ========================================================================= */}
      <section className="relative pt-10 pb-14 md:pt-22 md:pb-28 bg-white">
        <img
          src="/assets/1001gouts/feuille-verte.svg"
          alt="" aria-hidden="true"
          className="absolute -right-20 top-6 w-64 sm:w-80 pointer-events-none opacity-10 select-none z-10 brightness-[0.35]"
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
            <div className="bg-[#FDF3E2] hover:bg-[#FDF3E2]/85 p-7 rounded-3xl border border-[#D9DCD5] shadow-xs transition-colors">
              <img src="/assets/1001gouts/Groupe-16819.png" alt="01" className="w-12 h-auto mb-4" />
              <h3 className="font-display text-lg sm:text-xl text-[#19522A] mb-2.5">
                Gestion & Marges Justes
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                Des retours concrets sur la rentabilité de découpe, les coûts de conservation en froid et la valorisation intégrale de carcasse.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FDF3E2] hover:bg-[#FDF3E2]/85 p-7 rounded-3xl border border-[#D9DCD5] shadow-xs transition-colors">
              <img src="/assets/1001gouts/Groupe-16820.png" alt="02" className="w-12 h-auto mb-4" />
              <h3 className="font-display text-lg sm:text-xl text-[#19522A] mb-2.5">
                Circuits Courts Éleveurs
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                L'accès direct aux groupements de producteurs pour acheter en direct, sécuriser vos approvisionnements sans intermédiaires.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FDF3E2] hover:bg-[#FDF3E2]/85 p-7 rounded-3xl border border-[#D9DCD5] shadow-xs transition-colors">
              <img src="/assets/1001gouts/Groupe-16821.png" alt="03" className="w-12 h-auto mb-4" />
              <h3 className="font-display text-lg sm:text-xl text-[#19522A] mb-2.5">
                Visibilité & Accès Testeur
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                Participez à la co-création de l'application 1001 Goûts et devenez membre testeur prioritaire sans aucun engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 : PREUVES SOCIALES & TÉMOIGNAGES (CRÈME #FDF3E2)               */}
      {/* ========================================================================= */}
      <section className="relative pt-10 pb-14 md:pt-22 md:pb-28 bg-[#FDF3E2]">
        <BrushSeparator position="top" fillColor="#FDF3E2" />

        {/* 🍊 Motif végétal orange retourné */}
        <img
          src="/assets/1001gouts/feuille-verte.svg"
          alt="" aria-hidden="true"
          className="absolute -left-16 bottom-10 w-56 sm:w-72 pointer-events-none opacity-[0.12] select-none z-10 -scale-x-100 rotate-12"
          style={{ filter: 'brightness(0.6) sepia(1) saturate(3) hue-rotate(-30deg)' }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-20">
          <div className="text-center mb-12 md:mb-14">
            <p className="font-accent text-[#FF859D] text-lg sm:text-xl md:text-2xl mb-2.5">
              Avis & retours de terrain
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display text-[#19522A]">
              Ce que vos confrères en disent
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white p-7 rounded-3xl border border-[#D9DCD5] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#F48631] mb-3.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#F48631" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#14181C] leading-relaxed italic mb-6">
                  "La démarche 1001 Goûts remet le travail de carcasse et le savoir-faire au centre. Les pistes du guide sur l'optimisation des chambres froides m'ont permis de respirer financièrement."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-[#D9DCD5]/60">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=150&q=80"
                  alt="Édouard V."
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#19522A]"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#19522A]">Édouard V.</h4>
                  <p className="text-[10px] sm:text-xs text-[#667079]">Artisan Boucher · Lyon (69)</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-7 rounded-3xl border border-[#D9DCD5] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#F48631] mb-3.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#F48631" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#14181C] leading-relaxed italic mb-6">
                  "Les habitants veulent mieux manger mais se laissent tenter par les supermarchés. Les astuces du guide pour attirer les jeunes foyers du quartier ont fait mouche chez nous."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-[#D9DCD5]/60">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                  alt="Stéphanie M."
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#19522A]"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#19522A]">Stéphanie M.</h4>
                  <p className="text-[10px] sm:text-xs text-[#667079]">Boucherie-Charcuterie · Nantes (44)</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-7 rounded-3xl border border-[#D9DCD5] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#F48631] mb-3.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#F48631" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#14181C] leading-relaxed italic mb-6">
                  "Enfin une initiative qui refuse de prendre des commissions sur nos ventes. 0% de commission et du vrai partage entre confrères, c'est ce dont on a besoin."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-[#D9DCD5]/60">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
                  alt="Karim B."
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#19522A]"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#19522A]">Karim B.</h4>
                  <p className="text-[10px] sm:text-xs text-[#667079]">Artisan Boucher · Marseille (13)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 : FOIRE AUX QUESTIONS (CRÈME #FDF3E2)                          */}
      {/* ========================================================================= */}
      <section className="relative pt-10 pb-14 md:pt-22 md:pb-28 bg-[#FDF3E2]">

        {/* 🍊 Motif végétal orange retourné */}
        <img
          src="/assets/1001gouts/feuille-verte.svg"
          alt="" aria-hidden="true"
          className="absolute -right-16 top-8 w-56 sm:w-72 pointer-events-none opacity-[0.12] select-none z-10 -scale-x-100 -rotate-6"
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
                a: "Dès validation du formulaire, le guide PDF se télécharge instantanément sur votre appareil et vous est également envoyé par e-mail au format interactif.",
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
                className={`border rounded-2xl overflow-hidden transition-colors ${
                  openFaq === idx ? 'bg-white border-[#F48631]/60 shadow-xs' : 'bg-white/80 border-[#D9DCD5] hover:bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaq === idx}
                  aria-controls={`faq-content-${idx}`}
                  className="w-full p-4.5 text-left font-display text-sm sm:text-base text-[#19522A] flex justify-between items-center transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${openFaq === idx ? 'bg-[#F48631] text-white rotate-180' : 'bg-[#FDF3E2] text-[#19522A] border border-[#D9DCD5]'}`}>
                    <ChevronDown size={15} />
                  </div>
                </button>
                {openFaq === idx && (
                  <div id={`faq-content-${idx}`} role="region" className="px-4.5 pb-4.5 text-xs sm:text-sm text-[#4A4A4A] leading-relaxed border-t border-[#D9DCD5]/60 pt-3.5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <a
              href="#formulaire"
              onClick={scrollToForm}
              className="bg-[#F48631] hover:bg-[#d97223] text-white px-8 py-4 rounded-full font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F48631] focus-visible:ring-offset-2"
            >
              <span>Donner mon avis et obtenir le guide</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Bouchers;
