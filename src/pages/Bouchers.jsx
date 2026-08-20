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
  Heart,
  Calendar
} from 'lucide-react';
import BrushSeparator from '../components/BrushSeparator';
import SEOHead from '../components/SEOHead';
import LordIcon from '../components/LordIcon';

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
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbyfiSX0wMXKp7YFOIaXbwilAg-P1GDpYOKDbwN8hSkrw9fMAnqsD1IwImp6BzzPiiN_/exec"; 

  const obstacleOptions = [
    'Traçabilité & registres de conformité sanitaire',
    'Allègement des démarches administratives & paperasse',
    'Gestion des stocks & valorisation des découpes (0 perte)',
    'Gestion des commandes & réservations au comptoir',
    'Achats groupés directs auprès des élevages régionaux',
    'Fidélisation & communication auprès des foyers du quartier',
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
        title="Guide Gratuit 2026 : Rentabilité & Circuits Courts pour Artisans Bouchers | 1001 Goûts"
        description="Téléchargez le livre blanc 2026 dédié aux artisans bouchers : optimisez vos marges brutes, maîtrisez vos coûts et développez votre clientèle locale en circuits courts à 0% de commission."
        keywords="boucherie artisanale, artisan boucher, rentabilité boucherie, circuits courts, livre blanc boucherie, marge brute boucherie, 1001 goûts, application boucher"
        ogImage="/guide-boucherie-cover.jpg"
      />

      {/* ========================================================================= */}
      {/* SECTION 1 : HERO SECTION (VERT ÉPINARD #19522A & VIDÉO NATURELLE)         */}
      {/* ========================================================================= */}
      <section className="relative min-h-[90vh] flex items-center bg-[#19522A] text-white">
        
        {/* Background MP4 Video (Auto-loop, 0 controls, no watermark) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/hero-bouchers.jpg"
            className="w-full h-full object-cover opacity-85 filter brightness-95 contrast-105 pointer-events-none"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          {/* Light transparent natural green veil */}
          <div className="absolute inset-0 bg-[#19522A]/40 backdrop-brightness-95 pointer-events-none"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-20 text-left py-20 md:py-28">
          <div>
              <p className="font-accent text-[#FF859D] text-lg sm:text-xl md:text-2xl mb-3">
                La force d'une communauté, au service des artisans bouchers
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display text-white leading-[1.06] tracking-tight mb-6 max-w-3xl [text-wrap:balance]">
                Vos couteaux sont affûtés.<br className="hidden sm:inline" /> Nos méthodes aussi.
              </h1>
              <p className="text-base sm:text-lg text-[#FDF3E2] font-medium leading-relaxed mb-8 max-w-2xl">
                De la valorisation de votre savoir-faire à la gestion sereine de votre boutique : retrouvez les solutions concrètes partagées par vos confrères.
              </p>

              {/* CTA Hero Button */}
              <div className="flex justify-start">
                <a
                  href="#formulaire"
                  onClick={scrollToForm}
                  className="btn-shine-effect group bg-[#F48631] hover:bg-[#d97223] text-white px-8 py-4 rounded-full font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg inline-flex items-center gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F48631] focus-visible:ring-offset-2 transform hover:-translate-y-0.5"
                >
                  <span>Obtenir mon guide.</span>
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
          
          {/* REAL EBOOK / GUIDE ENLARGED, FLOATING & TILTED */}
          <div className="flex justify-center items-center relative">
            <div className="relative w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[415px] animate-float hover:rotate-0 transition-transform duration-500 cursor-pointer">
              {/* Couverture Principale Haute Définition */}
              <div className="relative rounded-2xl shadow-2xl overflow-hidden border border-[#D9DCD5] bg-white group hover:shadow-[0_25px_50px_-12px_rgba(25,82,42,0.25)] transition-shadow duration-300">
                {/* Effet reliure / pliure gauche */}
                <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none z-10" />
                
                <img
                  src="/guide-boucherie-cover.jpg"
                  alt="Guide Complet Boucherie Artisanale 2026 - 1001 Goûts"
                  className="w-full h-auto object-cover block transform group-hover:scale-[1.02] transition-transform duration-500"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display text-[#19522A] mb-4 leading-tight">
              Guide complet de l'artisan boucher offert !
            </h2>
            <p className="text-[#4A4A4A] text-sm sm:text-base mb-8 leading-relaxed">
              Ce guide complet rédigé avec des confrères et des experts de terrain vous permettra de :
            </p>

            {/* 🌟 INFOS DYNAMIQUES AVEC ICÔNES THÉMATIQUES ANIMÉES */}
            <div className="space-y-6 sm:space-y-7 text-[#19522A]">
              <div className="flex items-start gap-4 group p-2 rounded-2xl hover:bg-[#19522A]/5 transition-all duration-200">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#D9DCD5] shadow-xs flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:border-[#19522A]/40 transition-all duration-300">
                  <LordIcon 
                    src="https://cdn.lordicon.com/yeallgsa.json" 
                    trigger="hover" 
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
                    src="https://cdn.lordicon.com/bwhkffis.json" 
                    trigger="hover" 
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
                    trigger="hover" 
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
        
        <div className="max-w-6xl mx-auto px-6 relative z-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Pitch Column (7 Cols) - GAUCHE */}
            <div className="lg:col-span-7 pt-2 relative z-20">
              <p className="font-accent text-[#FF859D] text-lg sm:text-xl md:text-2xl mb-2.5">
                Votre voix compte pour l'artisanat local
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display text-[#19522A] leading-tight mb-12 md:mb-14">
                Obtenez les meilleures astuces des artisans bouchers
              </h2>
              
              {/* 🌿 3 DÉFIS MAJEURS 1001 GOÛTS */}
              <div className="space-y-6 sm:space-y-7">
                {/* Défi 1 */}
                <div className="flex items-start gap-4.5 group p-3 rounded-2xl hover:bg-[#FDF3E2]/60 hover:translate-x-1 transition-all duration-300">
                  <div className="flex flex-col items-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <img src="/assets/1001gouts/Groupe-16819.png" alt="1" className="w-12 sm:w-14 h-auto" />
                  </div>
                  <div>
                    <h4 className="font-display text-base sm:text-lg font-bold text-[#19522A] mb-1.5">
                      L'effet de ciseaux sur la marge nette
                    </h4>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed">
                      Hausse du coût des matières premières et électricité du froid indispensable : découvrez comment vos confrères sécurisent leur rentabilité et protègent leur résultat.
                    </p>
                  </div>
                </div>

                {/* Défi 2 */}
                <div className="flex items-start gap-4.5 group p-3 rounded-2xl hover:bg-[#FDF3E2]/60 hover:translate-x-1 transition-all duration-300">
                  <div className="flex flex-col items-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <img src="/assets/1001gouts/Groupe-16820.png" alt="2" className="w-12 sm:w-14 h-auto" />
                  </div>
                  <div>
                    <h4 className="font-display text-base sm:text-lg font-bold text-[#19522A] mb-1.5">
                      Le virage traiteur & la consommation qualitative
                    </h4>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed">
                      Face à l'évolution des habitudes de consommation, apprenez à compenser la baisse des volumes de viande brute par des plats cuisinés artisanaux plébiscités.
                    </p>
                  </div>
                </div>

                {/* Défi 3 */}
                <div className="flex items-start gap-4.5 group p-3 rounded-2xl hover:bg-[#FDF3E2]/60 hover:translate-x-1 transition-all duration-300">
                  <div className="flex flex-col items-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <img src="/assets/1001gouts/Groupe-16821.png" alt="3" className="w-12 sm:w-14 h-auto" />
                  </div>
                  <div>
                    <h4 className="font-display text-base sm:text-lg font-bold text-[#19522A] mb-1.5">
                      La gestion quotidienne avec des équipes réduites
                    </h4>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed">
                      Pénurie de main-d'œuvre et charge administrative : des solutions concrètes pour alléger votre quotidien, soulager votre brigade et préparer l'avenir.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Card (5 Cols) - DROITE */}
            <div className="lg:col-span-5 bg-[#FDF3E2] p-6 sm:p-8 rounded-3xl border border-[#D9DCD5] shadow-md relative hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-display text-xl sm:text-2xl text-[#19522A] mb-5">
                Obtenez votre guide en 2 min !
              </h3>

              {isSubmitted ? (
                <div className="py-6 text-center animate-fadeIn">
                  <div className="w-16 h-16 bg-[#558D4D]/15 text-[#558D4D] rounded-full flex items-center justify-center mx-auto mb-3 animate-pop">
                    <LordIcon 
                      src="https://cdn.lordicon.com/lupuorrc.json" 
                      trigger="loop" 
                      colors="primary:#19522A,secondary:#558D4D" 
                      size={42} 
                    />
                  </div>
                  <h4 className="font-display text-lg text-[#19522A] mb-1">Merci {formData.firstName} !</h4>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                    Votre guide a été envoyé à <strong>{formData.email}</strong> et votre téléchargement s'est lancé.
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
                    className="text-sm text-[#558D4D] font-bold hover:underline"
                  >
                    Remplir à nouveau
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-bold uppercase tracking-wider text-[#19522A] mb-1.5 flex items-center gap-1.5">
                        <LordIcon src="https://cdn.lordicon.com/dxjqoygy.json" trigger="hover" colors="primary:#19522A,secondary:#F48631" size={16} />
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A] text-base sm:text-sm bg-white shadow-xs transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="shopName" className="block text-sm font-bold uppercase tracking-wider text-[#19522A] mb-1.5 flex items-center gap-1.5">
                        <LordIcon src="https://cdn.lordicon.com/fjudsqbp.json" trigger="hover" colors="primary:#19522A,secondary:#F48631" size={16} />
                        <span>Nom boucherie</span> <span className="text-[#F48631]">*</span>
                      </label>
                      <input
                        id="shopName"
                        type="text"
                        name="shopName"
                        required
                        value={formData.shopName}
                        onChange={handleInputChange}
                        placeholder="Ex : Boucherie du Centre"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A] text-base sm:text-sm bg-white shadow-xs transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-7">
                      <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider text-[#19522A] mb-1.5 flex items-center gap-1.5">
                        <LordIcon src="https://cdn.lordicon.com/diihhjqz.json" trigger="hover" colors="primary:#19522A,secondary:#F48631" size={16} />
                        <span>Email pro</span> <span className="text-[#F48631]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="vous@boucherie.fr"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A] text-base sm:text-sm bg-white shadow-xs transition-all"
                      />
                    </div>

                    <div className="sm:col-span-5">
                      <label htmlFor="postalCode" className="block text-sm font-bold uppercase tracking-wider text-[#19522A] mb-1.5 flex items-center gap-1.5">
                        <LordIcon src="https://cdn.lordicon.com/surcxhka.json" trigger="hover" colors="primary:#19522A,secondary:#F48631" size={16} />
                        <span>Code postal</span> <span className="text-[#F48631]">*</span>
                      </label>
                      <input
                        id="postalCode"
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="69001"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A] text-base sm:text-sm bg-white shadow-xs transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-[#19522A] mb-2">
                      Vos priorités métier (2 Max) <span className="text-[#F48631]">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {obstacleOptions.map((option, idx) => {
                        const isSelected = formData.obstacles.includes(option);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleObstacleToggle(option)}
                            className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left flex items-center gap-2 cursor-pointer border select-none active:scale-95 ${
                              isSelected
                                ? 'bg-[#19522A] text-white border-[#19522A] shadow-xs'
                                : 'bg-white text-[#4A4A4A] border-[#D9DCD5] hover:border-[#19522A]/40 hover:bg-[#FDF3E2]/50'
                            }`}
                          >
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center border text-[10px] font-bold flex-shrink-0 ${
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

                  <div className="pt-1">
                    <label className="flex items-start gap-2 text-sm text-[#667079] cursor-pointer min-h-[44px]">
                      <input
                        type="checkbox"
                        name="acceptedTerms"
                        checked={formData.acceptedTerms}
                        onChange={handleInputChange}
                        className="rounded border-[#D9DCD5] text-[#F48631] focus:ring-[#F48631] mt-0.5 w-4 h-4"
                      />
                      <span>
                        J'accepte d'être recontacté par 1001 Goûts pour échanger sur mes besoins.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-shine-effect group w-full bg-[#F48631] hover:bg-[#d97223] text-white font-bold py-3.5 px-6 rounded-full transition-all shadow-md hover:shadow-lg mt-3 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base inline-flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F48631] focus-visible:ring-offset-2 transform hover:-translate-y-0.5"
                  >
                    <span>{isLoading ? 'Envoi en cours...' : 'Obtenir mon guide.'}</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5 duration-200" />
                  </button>
                </form>
              )}
            </div>

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
            <div className="bg-[#FDF3E2] hover:bg-[#FDF3E2]/85 p-7 sm:p-8 rounded-3xl border border-[#D9DCD5] shadow-xs hover:shadow-md hover:-translate-y-1.5 transition-all duration-300">
              <img src="/assets/1001gouts/Groupe-16819.png" alt="01" className="w-12 h-auto mb-4 transform hover:scale-105 transition-transform" />
              <h3 className="font-display text-lg sm:text-xl text-[#19522A] mb-2.5">
                Gestion & Marges Justes
              </h3>
              <p className="text-sm text-[#4A4A4A] leading-relaxed">
                Des retours concrets sur la rentabilité de découpe, les coûts de conservation en froid et la valorisation intégrale de carcasse.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FDF3E2] hover:bg-[#FDF3E2]/85 p-7 sm:p-8 rounded-3xl border border-[#D9DCD5] shadow-xs hover:shadow-md hover:-translate-y-1.5 transition-all duration-300">
              <img src="/assets/1001gouts/Groupe-16820.png" alt="02" className="w-12 h-auto mb-4 transform hover:scale-105 transition-transform" />
              <h3 className="font-display text-lg sm:text-xl text-[#19522A] mb-2.5">
                Circuits Courts Éleveurs
              </h3>
              <p className="text-sm text-[#4A4A4A] leading-relaxed">
                L'accès direct aux groupements de producteurs pour acheter en direct, sécuriser vos approvisionnements sans intermédiaires.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FDF3E2] hover:bg-[#FDF3E2]/85 p-7 sm:p-8 rounded-3xl border border-[#D9DCD5] shadow-xs hover:shadow-md hover:-translate-y-1.5 transition-all duration-300">
              <img src="/assets/1001gouts/Groupe-16821.png" alt="03" className="w-12 h-auto mb-4 transform hover:scale-105 transition-transform" />
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
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-[#D9DCD5] shadow-xs hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#19522A]/10 text-[#19522A] text-sm font-semibold mb-5">
                  <LordIcon src="https://cdn.lordicon.com/kthelypq.json" trigger="hover" colors="primary:#19522A,secondary:#F48631" size={17} />
                  <span>Entretien du 05/08/2026</span>
                </div>
                <p className="text-sm sm:text-base text-[#14181C] leading-relaxed italic mb-6">
                  "L'augmentation du prix de la viande et la conformité sont nos vrais combats quotidiens. Avec des fournisseurs qu'on connaît depuis des années, on ne peut pas transiger sur la qualité de ce qu'on reçoit. On gère au millimètre pour n'avoir aucun invendu."
                </p>
              </div>
              <div className="pt-4 border-t border-[#D9DCD5]/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#19522A] text-white flex items-center justify-center font-bold text-sm">
                    BV
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#19522A]">Boucherie Les Bons Vivants</h4>
                    <p className="text-sm text-[#667079]">Artisan Boucher Indépendant</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verbatim 2 */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-[#D9DCD5] shadow-xs hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#19522A]/10 text-[#19522A] text-sm font-semibold mb-5">
                  <LordIcon src="https://cdn.lordicon.com/kthelypq.json" trigger="hover" colors="primary:#19522A,secondary:#F48631" size={17} />
                  <span>Entretien du 05/08/2026</span>
                </div>
                <p className="text-sm sm:text-base text-[#14181C] leading-relaxed italic mb-6">
                  "Tout repose sur le bouche-à-oreille et un réseau de confiance irréprochable sur la traçabilité."
                </p>
              </div>
              <div className="pt-4 border-t border-[#D9DCD5]/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#19522A] text-white flex items-center justify-center font-bold text-sm">
                    LP
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#19522A]">Boucherie La Parisienne</h4>
                    <p className="text-sm text-[#667079]">Artisan Boucher Indépendant</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verbatim 3 */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-[#D9DCD5] shadow-xs hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#19522A]/10 text-[#19522A] text-sm font-semibold mb-5">
                  <LordIcon src="https://cdn.lordicon.com/kthelypq.json" trigger="hover" colors="primary:#19522A,secondary:#F48631" size={17} />
                  <span>Entretien du 08/08/2026</span>
                </div>
                <p className="text-sm sm:text-base text-[#14181C] leading-relaxed italic mb-6">
                  "Avec la hausse continue du coût de la viande à la carcasse, la moindre erreur dans la gestion des stocks nous coûte cher. Tout l'enjeu aujourd'hui, c'est d'avoir une visibilité exacte sur nos découpes pour valoriser chaque pièce et protéger notre marge."
                </p>
              </div>
              <div className="pt-4 border-t border-[#D9DCD5]/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#19522A] text-white flex items-center justify-center font-bold text-sm">
                    BT
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#19522A]">Boucherie du Terroir</h4>
                    <p className="text-sm text-[#667079]">Artisan Boucher Indépendant</p>
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
                a: "Dès validation du formulaire, le guide PDF se télécharge instantanément sur votre appareil et vous est également envoyé par e-mail au format interactif.",
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
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                  openFaq === idx ? 'bg-white border-[#F48631]/60 shadow-xs' : 'bg-white/80 border-[#D9DCD5] hover:bg-white hover:border-[#19522A]/30'
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
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 ${openFaq === idx ? 'bg-[#F48631] text-white rotate-180' : 'bg-[#FDF3E2] text-[#19522A] border border-[#D9DCD5]'}`}>
                    <ChevronDown size={15} />
                  </div>
                </button>
                {openFaq === idx && (
                  <div id={`faq-content-${idx}`} role="region" className="px-4.5 pb-4.5 text-sm text-[#4A4A4A] leading-relaxed border-t border-[#D9DCD5]/60 pt-3.5 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 🎯 Catchphrase Finale Incitative */}
          <div className="mt-14 sm:mt-16 bg-white p-8 sm:p-10 rounded-3xl border border-[#D9DCD5] shadow-xs hover:shadow-md transition-shadow duration-300 text-center relative z-20">
            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-[#19522A] mb-3">
              Avant de partir, téléchargez votre guide offert !
            </h3>
            <p className="text-sm sm:text-base text-[#4A4A4A] max-w-xl mx-auto mb-6 leading-relaxed">
              Alors qu'un tiers des boucheries voit sa rentabilité fragilisée, retrouvez les solutions concrètes partagées par vos confrères pour faire grandir votre boutique sereinement.
            </p>
            <a
              href="#formulaire"
              onClick={scrollToForm}
              className="btn-shine-effect group bg-[#F48631] hover:bg-[#d97223] text-white px-8 py-4 rounded-full font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F48631] focus-visible:ring-offset-2 transform hover:-translate-y-0.5"
            >
              <span>Obtenir mon guide.</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5 duration-200" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Bouchers;
