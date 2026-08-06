import React from 'react';
import { MapPin, TrendingUp, BellRing, ArrowRight, CheckCircle2 } from 'lucide-react';

const Itinerants = () => {
  return (
    <div className="w-full">
      {/* Hero Section — Cover photo + gradient overlay like 1001gouts.com */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background image */}
        <img 
          src="/hero-itinerants.jpg" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
        />
        {/* Gradient overlay — rich green-dark for itinerant identity */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f10]/85 via-[#19522A]/60 to-transparent"></div>
        {/* Bottom gradient for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FDF3E2] to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="order-2 md:order-1">
            {/* Decorative bar */}
            <div className="w-12 h-1.5 bg-[#558D4D] rounded-full mb-8"></div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 font-mono text-xs font-bold tracking-widest uppercase mb-6 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#558D4D]"></span>
              Commerçants Itinérants
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display leading-[1.05] text-white mb-4 tracking-tight">
              Vos clients ne devinent pas où vous êtes.
            </h1>
            <p className="font-accent text-4xl md:text-5xl lg:text-6xl text-[#f39313] leading-[1.1] mb-8">
              Ils le voient en direct.
            </p>

            <div className="p-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl mb-8 max-w-xl">
              <p className="text-lg text-white/90 leading-relaxed font-medium">
                La vitrine géolocalisée pour food trucks et marchands ambulants. <strong className="text-white">0% de commission sur vos ventes.</strong> Vous ne payez pas pour vos clients.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <a href="#inscription" className="bg-[#f39313] hover:bg-[#d97f0e] text-white px-8 py-4 rounded-full font-semibold text-lg text-center transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                Créer ma fiche (Gratuit)
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          
          {/* Phone mockup */}
          <div className="relative z-10 flex justify-center order-1 md:order-2">
            <div className="relative w-full max-w-[280px] aspect-[9/19] bg-white rounded-[3rem] border-[6px] border-white/30 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20"></div>
              
              <div className="h-full bg-[#FDF3E2] p-4 pt-10">
                {/* Mockup Map */}
                <div className="w-full h-44 bg-[#D9DCD5] rounded-2xl mb-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#558D4D]/10 to-[#558D4D]/5"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <MapPin className="w-10 h-10 text-[#f39313] fill-current animate-bounce" />
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-[#D9DCD5] shadow-sm">
                  <h3 className="font-accent text-lg text-[#FF859D]">Le Camion à Pizzas</h3>
                  <p className="text-xs text-[#558D4D] font-medium flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 rounded-full bg-[#558D4D] animate-pulse"></span>
                    Actuellement au Marché de Chatou
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* SVG Organic Separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg className="relative block w-full h-16 md:h-28" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,64 C120,90 240,100 360,88 C480,76 540,52 720,56 C900,60 1020,96 1200,88 C1320,82 1380,68 1440,72 L1440,120 L0,120 Z" fill="#FDF3E2"/>
          </svg>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-[#FDF3E2]">
        <div className="max-w-7xl mx-auto px-6">
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
              <h3 className="text-xl font-accent text-[#FF859D] mb-3">La Visibilité</h3>
              <p className="text-[#667079] text-sm leading-relaxed">
                Communiquer sur Facebook ne suffit plus. Avec 1001 Goûts, vous êtes affiché sur la carte de l'application dès que vous vous installez. Vos clients vous trouvent sans chercher.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#f39313] group-hover:h-1.5 transition-all"></div>
              <div className="w-12 h-12 bg-[#f39313]/10 rounded-xl flex items-center justify-center text-[#f39313] mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-accent text-[#FF859D] mb-3">La Marge</h3>
              <p className="text-[#667079] text-sm leading-relaxed">
                Les plateformes de livraison mangent la rentabilité de la vente à emporter. Nous sommes un outil de connexion, pas un intermédiaire. <strong className="text-[#4A4A4A]">0% de commission.</strong>
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#558D4D] group-hover:h-1.5 transition-all"></div>
              <div className="w-12 h-12 bg-[#558D4D]/10 rounded-xl flex items-center justify-center text-[#558D4D] mb-6">
                <BellRing className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-accent text-[#FF859D] mb-3">La Fidélisation</h3>
              <p className="text-[#667079] text-sm leading-relaxed">
                Vos clients reçoivent une notification lorsque vous vous installez près de chez eux. Le flux devient régulier et prévisible.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-[#19522A] p-10 rounded-[2rem] relative overflow-hidden text-white order-2 md:order-1">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#558D4D]/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f39313]/15 rounded-full blur-3xl"></div>
              <div className="w-12 h-1.5 bg-white/30 rounded-full mb-6 relative z-10"></div>
              <h3 className="text-2xl font-display mb-4 relative z-10 text-white">Conçu pour l'action.</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6 relative z-10">
                Vous travaillez dans un espace réduit, avec du flux. Vous n'avez pas le temps de gérer une boutique en ligne complexe. Un bouton "Je suis là", et votre communauté est prévenue.
              </p>
              <img src="/pictos - 1.jpg" alt="Marché" className="w-full h-48 object-cover rounded-xl shadow-lg relative z-10 mix-blend-screen opacity-50 grayscale" />
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
                    <p className="text-[#667079] text-sm leading-relaxed">Activez votre position sur la carte dès que votre vitrine est prête. Désactivez quand vous fermez.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#558D4D]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#19522A] mb-1">Fiche Commerce Express</h4>
                    <p className="text-[#667079] text-sm leading-relaxed">Présentez vos spécialités, vos prix, et votre histoire. Une fois configurée, elle travaille pour vous.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#558D4D]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#19522A] mb-1">Label "1001 Engagés"</h4>
                    <p className="text-[#667079] text-sm leading-relaxed">Bénéficiez de l'aura de confiance de notre réseau et de nos audits qualité de terrain.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="inscription" className="py-24 bg-[#FDF3E2] relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="w-12 h-1.5 bg-[#19522A] rounded-full mb-6 mx-auto"></div>
          <h2 className="text-4xl font-display mb-6 text-[#19522A]">Rejoignez le réseau local.</h2>
          <p className="text-lg text-[#667079] mb-10">
            Augmentez votre visibilité dès demain sans rogner sur votre marge. Inscription rapide pour les marchands ambulants.
          </p>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#D9DCD5] max-w-md mx-auto">
            <h3 className="text-xl font-bold text-[#19522A] mb-6">Créer ma fiche Itinérant</h3>
            <form className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-1">Nom (Food Truck, Stand...)</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D]" placeholder="Ex: La Belle Époque Foodtruck" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-1">Email professionnel</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D]" placeholder="contact@itinerant.fr" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-1">Spécialité</label>
                <select className="w-full px-4 py-3 rounded-lg border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D]">
                  <option>Restauration Rapide / Foodtruck</option>
                  <option>Maraîcher sur marché</option>
                  <option>Fromager affineur</option>
                  <option>Autre produit de bouche</option>
                </select>
              </div>
              <button type="button" className="w-full bg-[#f39313] hover:bg-[#d97f0e] text-white font-semibold py-3.5 rounded-full transition-colors mt-4 shadow-md hover:shadow-lg">
                S'inscrire gratuitement
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Itinerants;
