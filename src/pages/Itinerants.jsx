import React from 'react';
import { MapPin, TrendingUp, BellRing, ArrowRight, CheckCircle2 } from 'lucide-react';

const Itinerants = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#f8f6f4] pt-20 pb-24 md:pt-32 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10 order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f39313]/10 text-[#f39313] font-mono text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-[#f39313]"></span>
              Commerçants Itinérants
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display leading-[1.1] text-[#4f4d43] mb-6 tracking-tight">
              Vos clients ne devinent pas où vous êtes.<br />
              <span className="text-[#558D4D] font-accent font-normal tracking-normal text-6xl md:text-7xl lg:text-8xl block mt-2">Ils le voient en direct.</span>
            </h1>
            <div className="p-5 bg-white border border-[#D9DCD5] border-l-4 border-l-[#558D4D] shadow-sm mb-8 max-w-xl">
              <p className="text-lg text-[#4f4d43] leading-relaxed font-medium">
                La vitrine géolocalisée pour food trucks et marchands ambulants. <strong>0% de commission sur vos ventes.</strong> Vous ne payez pas pour vos clients.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#inscription" className="bg-[#f39313] hover:bg-[#d97f0e] text-white px-8 py-4 rounded-full font-medium text-lg text-center transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
                Créer ma fiche (Gratuit)
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          
          <div className="relative z-10 flex justify-center order-1 md:order-2">
            <div className="relative w-full max-w-sm aspect-[9/19] bg-white rounded-[3rem] border-8 border-[#4f4d43] shadow-2xl overflow-hidden flex items-center justify-center">
              <div className="absolute top-0 w-40 h-7 bg-[#4f4d43] rounded-b-3xl"></div>
              
              <div className="absolute inset-0 bg-[#f8f6f4] p-4 pt-12">
                {/* Mockup Map */}
                <div className="w-full h-48 bg-[#D9DCD5] rounded-2xl mb-4 relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <MapPin className="w-10 h-10 text-[#f39313] fill-current animate-bounce" />
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-[#D9DCD5]">
                  <h3 className="font-display text-xl text-[#4f4d43]">Le Camion à Pizzas</h3>
                  <p className="text-sm text-[#558D4D] font-medium flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 rounded-full bg-[#558D4D] animate-pulse"></span>
                    Actuellement au Marché de Chatou
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative organic shapes */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-[#f39313]/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#FF859D]/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
        
        {/* SVG Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-12 md:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,113.8,194,92.83,238.13,78.21,280.9,64,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-[#4f4d43] mb-4">
              L'itinérance ne doit plus être un frein à la fidélisation
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#f8f6f4] p-8 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#FF859D] group-hover:h-2 transition-all"></div>
              <div className="w-12 h-12 bg-[#FF859D]/10 rounded-xl flex items-center justify-center text-[#FF859D] mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display text-[#4f4d43] mb-3">La Visibilité</h3>
              <p className="text-[#667079] text-sm leading-relaxed">
                Communiquer sur Facebook ne suffit plus. Avec 1001 Goûts, vous êtes affiché sur la carte de l'application dès que vous vous installez. Vos clients vous trouvent sans chercher.
              </p>
            </div>
            
            <div className="bg-[#f8f6f4] p-8 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#f39313] group-hover:h-2 transition-all"></div>
              <div className="w-12 h-12 bg-[#f39313]/10 rounded-xl flex items-center justify-center text-[#f39313] mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display text-[#4f4d43] mb-3">La Marge</h3>
              <p className="text-[#667079] text-sm leading-relaxed">
                Les plateformes de livraison mangent la rentabilité de la vente à emporter. Nous sommes un outil de connexion, pas un intermédiaire. <strong className="text-[#4f4d43]">0% de commission.</strong>
              </p>
            </div>
            
            <div className="bg-[#f8f6f4] p-8 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#558D4D] group-hover:h-2 transition-all"></div>
              <div className="w-12 h-12 bg-[#558D4D]/10 rounded-xl flex items-center justify-center text-[#558D4D] mb-6">
                <BellRing className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display text-[#4f4d43] mb-3">La Fidélisation</h3>
              <p className="text-[#667079] text-sm leading-relaxed">
                Vos clients reçoivent une notification lorsque vous vous installez près de chez eux. Le flux devient régulier et prévisible.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Solution Section */}
      <section className="py-20 bg-[#f8f6f4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-[#19522A] p-10 rounded-[2rem] relative overflow-hidden text-white order-2 md:order-1">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#f39313]/20 rounded-full blur-3xl"></div>
              <h3 className="text-2xl font-display mb-4 relative z-10">Conçu pour l'action.</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6 relative z-10">
                Vous travaillez dans un espace réduit, avec du flux. Vous n'avez pas le temps de gérer une boutique en ligne complexe. Un bouton "Je suis là", et votre communauté est prévenue.
              </p>
              <img src="/pictos - 1.jpg" alt="Marché" className="w-full h-48 object-cover rounded-xl shadow-lg relative z-10 mix-blend-screen opacity-50 grayscale" />
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-display text-[#4f4d43] mb-6">
                Tout ce dont vous avez besoin. Rien de plus.
              </h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#f39313]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#4f4d43] mb-1">Mise à jour en 1 clic</h4>
                    <p className="text-[#667079] text-sm leading-relaxed">Activez votre position sur la carte dès que votre vitrine est prête. Désactivez quand vous fermez.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#f39313]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#4f4d43] mb-1">Fiche Commerce Express</h4>
                    <p className="text-[#667079] text-sm leading-relaxed">Présentez vos spécialités, vos prix, et votre histoire. Une fois configurée, elle travaille pour vous.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#f39313]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#4f4d43] mb-1">Label "1001 Engagés"</h4>
                    <p className="text-[#667079] text-sm leading-relaxed">Bénéficiez de l'aura de confiance de notre réseau et de nos audits qualité de terrain.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="inscription" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-display mb-6 text-[#4f4d43]">Rejoignez le réseau local.</h2>
          <p className="text-lg text-[#667079] mb-10">
            Augmentez votre visibilité dès demain sans rogner sur votre marge. Inscription rapide pour les marchands ambulants.
          </p>
          <div className="bg-[#f8f6f4] p-8 rounded-2xl shadow-xl border border-[#D9DCD5] max-w-md mx-auto">
            <h3 className="text-xl font-bold text-[#4f4d43] mb-6">Créer ma fiche Itinérant</h3>
            <form className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-[#4f4d43] mb-1">Nom (Food Truck, Stand...)</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#f39313]/50 focus:border-[#f39313]" placeholder="Ex: La Belle Époque Foodtruck" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4f4d43] mb-1">Email professionnel</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#f39313]/50 focus:border-[#f39313]" placeholder="contact@itinerant.fr" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4f4d43] mb-1">Spécialité</label>
                <select className="w-full px-4 py-3 rounded-lg border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#f39313]/50 focus:border-[#f39313]">
                  <option>Restauration Rapide / Foodtruck</option>
                  <option>Maraîcher sur marché</option>
                  <option>Fromager affineur</option>
                  <option>Autre produit de bouche</option>
                </select>
              </div>
              <button type="button" className="w-full bg-[#f39313] hover:bg-[#d97f0e] text-white font-medium py-3 rounded-lg transition-colors mt-4">
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
