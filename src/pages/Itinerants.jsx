import React, { useState } from 'react';
import { MapPin, TrendingUp, BellRing, ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackEvent, setClarityTag } from '../utils/clarity';

/*
 * BrushSeparator — Renders the vecteezy brush stroke as a real <img>,
 * stretched edge-to-edge (100vw) with preserved proportions.
 * The fillColor is applied via a CSS mask on a colored div:
 * the brush image (black on transparent PNG) acts as an alpha mask,
 * so the colored div only shows where the brush stroke is opaque.
 * Positioned at the bottom of the parent section, overlapping into the next.
 */
const BrushSeparator = ({ fillColor = '#FDF3E2', className = '' }) => (
  <div 
    className={`absolute bottom-0 z-20 pointer-events-none ${className}`}
    style={{ 
      width: '140vw',
      left: '50%', 
      transform: 'translateX(-50%) translateY(50%)',
    }}
  >
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: fillColor,
        maskImage: "url('/vecteezy-brush.png')",
        WebkitMaskImage: "url('/vecteezy-brush.png')",
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
    <img 
      src="/vecteezy-brush.png" 
      alt="" 
      aria-hidden="true"
      className="w-full h-auto block opacity-0 select-none"
      draggable="false"
    />
  </div>
);

const Itinerants = () => {
  const [formData, setFormData] = useState({ name: '', email: '', speciality: 'Restauration Rapide / Foodtruck' });
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
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      trackEvent('itinerants_lead_submit');
      setClarityTag('lead_persona', 'itinerant');
      if (formData.speciality) setClarityTag('lead_speciality', formData.speciality);
    }, 400);
  };

  return (
    <div className="w-full overflow-x-clip">
      {/* Hero Section — Cover photo + strong gradient overlay */}
      <section className="relative min-h-[90vh] flex items-center">
        <img 
          src="/hero-itinerants.jpg" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        {/* Darker gradient to replace glassmorphism and ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FDF3E2] to-transparent z-10"></div>
        
        <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-8 pt-20 pb-52 grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="order-2 md:order-1">
            <div className="w-12 h-1.5 bg-[#558D4D] rounded-full mb-8"></div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display leading-[1.05] text-white mb-4 tracking-tight drop-shadow-md">
              Vos clients ne devinent pas où vous êtes.
            </h1>
            <p className="font-accent text-4xl md:text-5xl lg:text-6xl text-[#f39313] leading-[1.1] mb-8 drop-shadow-md">
              Ils le voient en direct.
            </p>

            {/* Solid accent bar instead of blurred glass box */}
            <div className="pl-6 border-l-4 border-[#558D4D] mb-10 max-w-xl">
              <p className="text-lg text-white/95 leading-relaxed font-medium drop-shadow-sm">
                La vitrine géolocalisée pour food trucks et marchands ambulants. <strong className="text-white">0% de commission sur vos ventes.</strong> Vous ne payez pas pour vos clients.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <a 
                href="#inscription"
                id="itinerants-cta-hero"
                data-clarity-tag="hero-cta-itinerants"
                onClick={() => trackEvent('cta_hero_itinerants_click')}
                className="bg-[#f39313] hover:bg-[#d97f0e] text-white px-8 py-4 rounded-full font-semibold text-lg text-center transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group transform hover:-translate-y-0.5"
              >
                Créer ma fiche (Gratuit)
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          
          {/* Phone mockup — ultra realistic */}
          <div className="relative z-10 flex justify-center order-1 md:order-2">
            <div className="relative w-full max-w-[280px] aspect-[9/19] bg-[#1a1a1a] rounded-[3rem] border-[6px] border-[#444] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden ring-1 ring-white/20 flex items-center justify-center p-1.5">
              {/* Screen */}
              <div className="relative w-full h-full bg-[#FDF3E2] rounded-[2.25rem] overflow-hidden shadow-inner flex flex-col pt-12">
                {/* Dynamic Island / Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-30 flex items-center justify-between px-2 shadow-sm border border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/5 shadow-inner"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#050505] shadow-inner flex items-center justify-center"><div className="w-1 h-1 rounded-full bg-blue-900/40"></div></div>
                </div>
                
                {/* Screen glare */}
                <div className="absolute top-0 right-0 w-[150%] h-[50%] bg-gradient-to-bl from-white/20 to-transparent -rotate-12 translate-x-1/4 -translate-y-1/4 pointer-events-none z-40 mix-blend-overlay"></div>
                
                <div className="p-4 flex flex-col h-full justify-center relative z-20">
                  {/* Mockup Map */}
                  <div className="w-full h-44 bg-[#e8e4dc] rounded-2xl mb-3 relative overflow-hidden flex-shrink-0 shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#d4cfbf] to-[#e8e4dc]">
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-1/4 left-0 right-0 h-px bg-[#19522A]"></div>
                        <div className="absolute top-2/4 left-0 right-0 h-px bg-[#19522A]"></div>
                        <div className="absolute top-3/4 left-0 right-0 h-px bg-[#19522A]"></div>
                        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-[#19522A]"></div>
                        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-[#19522A]"></div>
                        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-[#19522A]"></div>
                      </div>
                    </div>
                    {/* Map pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce">
                      <div className="w-8 h-8 bg-[#f39313] rounded-full border-[3px] border-white shadow-lg flex items-center justify-center relative">
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#f39313]"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl border border-[#D9DCD5] shadow-sm flex-shrink-0">
                    <h3 className="font-accent text-lg text-[#FF859D]">Le Camion à Pizzas</h3>
                    <p className="text-xs text-[#558D4D] font-medium flex items-center gap-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full bg-[#558D4D] animate-pulse inline-block flex-shrink-0"></span>
                      <span>Actuellement au Marché de Chatou</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <BrushSeparator fillColor="#FDF3E2" />
      </section>

      {/* Pain Points Section */}
      <section className="relative pt-6 pb-32 bg-[#FDF3E2]">
        <div className="max-w-7xl mx-auto px-6 relative z-30">
          <div className="w-12 h-1.5 bg-[#19522A] rounded-full mb-6 mx-auto"></div>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-[#19522A] mb-4">
              L'itinérance ne doit plus être un frein à la fidélisation
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#FF859D] group-hover:h-1.5 transition-all"></div>
              <div className="w-12 h-12 bg-[#FF859D]/10 rounded-xl flex items-center justify-center text-[#FF859D] mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-accent text-xl text-[#FF859D] mb-3">La Visibilité</h3>
              <p className="text-[#667079] text-sm leading-relaxed">
                Communiquer sur Facebook ne suffit plus. Avec 1001 Goûts, vous êtes affiché sur la carte dès que vous vous installez.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#f39313] group-hover:h-1.5 transition-all"></div>
              <div className="w-12 h-12 bg-[#f39313]/10 rounded-xl flex items-center justify-center text-[#f39313] mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-accent text-xl text-[#FF859D] mb-3">La Marge</h3>
              <p className="text-[#667079] text-sm leading-relaxed">
                Les plateformes mangent la rentabilité. Nous sommes un outil de connexion, pas un intermédiaire. <strong className="text-[#4A4A4A]">0% de commission.</strong>
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#558D4D] group-hover:h-1.5 transition-all"></div>
              <div className="w-12 h-12 bg-[#558D4D]/10 rounded-xl flex items-center justify-center text-[#558D4D] mb-6">
                <BellRing className="w-6 h-6" />
              </div>
              <h3 className="font-accent text-xl text-[#FF859D] mb-3">La Fidélisation</h3>
              <p className="text-[#667079] text-sm leading-relaxed">
                Vos clients reçoivent une notification lorsque vous vous installez près de chez eux. Le flux devient régulier.
              </p>
            </div>
          </div>
        </div>
        
        <BrushSeparator fillColor="#ffffff" className="translate-y-px" />
      </section>
      
      {/* Solution Section */}
      <section className="relative pt-20 pb-56 bg-white">
        <div className="max-w-7xl mx-auto px-6 relative z-30">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Fixed action card */}
            <div className="bg-[#19522A] p-2 rounded-[2rem] relative overflow-hidden order-2 md:order-1 shadow-2xl flex flex-col group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#558D4D]/20 rounded-full blur-3xl transition-opacity group-hover:opacity-100 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f39313]/10 rounded-full blur-3xl transition-opacity group-hover:opacity-100 opacity-50"></div>
              
              <div className="p-8 pb-6 relative z-10">
                <div className="w-12 h-1.5 bg-[#f39313] rounded-full mb-6"></div>
                <h3 className="text-2xl font-display mb-4 text-white">Conçu pour l'action.</h3>
                <p className="text-white/85 text-sm leading-relaxed">
                  Vous travaillez dans un espace réduit, avec du flux. Vous n'avez pas le temps de gérer une boutique en ligne complexe. Un bouton "Je suis là", et votre communauté est prévenue.
                </p>
              </div>
              
              <div className="mt-auto p-2 pt-0 relative z-10 flex justify-center">
                <div className="w-full max-w-sm rounded-3xl overflow-hidden relative">
                  <img src="/pictos - 1.jpg" alt="Marché" className="w-full h-auto object-contain drop-shadow-xl" />
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="w-12 h-1.5 bg-[#19522A] rounded-full mb-6"></div>
              <h2 className="text-3xl md:text-4xl font-display text-[#19522A] mb-6">
                Tout ce dont vous avez besoin. Rien de plus.
              </h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#558D4D]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#19522A] mb-1">Mise à jour en 1 clic</h4>
                    <p className="text-[#667079] text-sm leading-relaxed">Activez votre position sur la carte dès que votre vitrine est prête.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#558D4D]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#19522A] mb-1">Fiche Commerce Express</h4>
                    <p className="text-[#667079] text-sm leading-relaxed">Présentez vos spécialités, vos prix, et votre histoire.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#558D4D]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#19522A] mb-1">Label "1001 Engagés"</h4>
                    <p className="text-[#667079] text-sm leading-relaxed">Bénéficiez de l'aura de confiance de notre réseau.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <BrushSeparator fillColor="#FDF3E2" className="translate-y-px" />
      </section>

      {/* CTA Section */}
      <section id="inscription" className="relative py-24 bg-[#FDF3E2] overflow-hidden scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 text-center relative z-30">
          <div className="w-12 h-1.5 bg-[#19522A] rounded-full mb-6 mx-auto"></div>
          <h2 className="text-4xl font-display mb-6 text-[#19522A]">Rejoignez le réseau local.</h2>
          <p className="text-lg text-[#667079] mb-10">
            Augmentez votre visibilité dès demain sans rogner sur votre marge.
          </p>
          <div className="bg-white p-8 rounded-2xl shadow-2xl border border-[#D9DCD5] max-w-md mx-auto">
            <h3 className="text-xl font-bold text-[#19522A] mb-6">Créer ma fiche Itinérant</h3>
            {isSubmitted ? (
              <div className="py-6 text-center" data-clarity-tag="form-success-itinerants">
                <div className="w-14 h-14 bg-[#558D4D]/15 text-[#558D4D] rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-lg font-bold text-[#19522A] mb-1">Fiche pré-créée !</h4>
                <p className="text-xs text-[#667079] mb-4">Merci {formData.name}, votre demande a été reçue avec succès.</p>
                <button
                  type="button"
                  onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', speciality: 'Restauration Rapide / Foodtruck' }); }}
                  className="text-xs text-[#558D4D] hover:underline font-semibold"
                >
                  Autre inscription
                </button>
              </div>
            ) : (
              <form className="space-y-4 text-left" onSubmit={handleFormSubmit}>
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">Nom (Food Truck, Stand...) <span className="text-[#f39313]">*</span></label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    data-clarity-mask="true"
                    className="w-full px-4 py-3 rounded-lg border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A]" 
                    placeholder="Ex: La Belle Époque Foodtruck" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">Email professionnel <span className="text-[#f39313]">*</span></label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    data-clarity-mask="true"
                    className="w-full px-4 py-3 rounded-lg border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A]" 
                    placeholder="contact@itinerant.fr" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">Spécialité</label>
                  <select 
                    name="speciality"
                    value={formData.speciality}
                    onChange={handleInputChange}
                    data-clarity-mask="true"
                    className="w-full px-4 py-3 rounded-lg border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D] text-[#4A4A4A]"
                  >
                    <option>Restauration Rapide / Foodtruck</option>
                    <option>Maraîcher sur marché</option>
                    <option>Fromager affineur</option>
                    <option>Autre produit de bouche</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  id="itinerants-submit-btn"
                  data-clarity-tag="submit-itinerants-btn"
                  disabled={isLoading}
                  className="w-full bg-[#f39313] hover:bg-[#d97f0e] text-white font-semibold py-3.5 rounded-full transition-colors mt-4 shadow-md hover:shadow-lg disabled:opacity-75 cursor-pointer"
                >
                  {isLoading ? 'Enregistrement...' : "S'inscrire gratuitement"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Itinerants;

