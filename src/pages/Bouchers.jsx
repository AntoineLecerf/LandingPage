import React from 'react';
import { Store, Clock, Users, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';

const Bouchers = () => {
  return (
    <div className="w-full">
      {/* Hero Section — Cover photo + gradient overlay like 1001gouts.com */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background image */}
        <img 
          src="/hero-bouchers.jpg" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
        />
        {/* Gradient overlay — warm amber to dark for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f00]/85 via-[#3d1f00]/60 to-transparent"></div>
        {/* Bottom gradient for smooth transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FDF3E2] to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            {/* Decorative bar like on the official site */}
            <div className="w-12 h-1.5 bg-[#f39313] rounded-full mb-8"></div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 font-mono text-xs font-bold tracking-widest uppercase mb-6 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#f39313]"></span>
              Bouchers & Charcutiers
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display leading-[1.05] text-white mb-4 tracking-tight">
              Ils n'ont pas un problème de demande.
            </h1>
            <p className="font-accent text-4xl md:text-5xl lg:text-6xl text-[#f39313] leading-[1.1] mb-8">
              Ils ont un problème de marge.
            </p>

            <div className="p-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl mb-8 max-w-xl">
              <p className="text-lg text-white/90 leading-relaxed font-medium">
                La seule application qui connecte les artisans avec les consommateurs locaux, sans <strong className="text-white">aucune commission sur les ventes</strong>. Récupérez ce qui vous appartient.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <a href="#inscription" className="bg-[#558D4D] hover:bg-[#43723D] text-white px-8 py-4 rounded-full font-semibold text-lg text-center transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                Devenir Early Adopter 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-sm text-white/60 flex items-center pt-3">
                100 places disponibles sur votre zone.
              </p>
            </div>
          </div>
          
          {/* Phone mockup */}
          <div className="relative z-10 flex justify-center">
            <div className="relative w-full max-w-[280px] aspect-[9/19] bg-white rounded-[3rem] border-[6px] border-white/30 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20"></div>
              <div className="p-5 pt-10 text-center h-full flex flex-col justify-center bg-[#FDF3E2]">
                <img src="/1001GOUTS-LOGO-RVB.png" alt="1001 Goûts" className="h-10 mx-auto mb-5" />
                <div className="bg-white p-4 rounded-xl mb-3 border border-[#D9DCD5] shadow-sm">
                  <h3 className="font-accent text-lg text-[#FF859D]">Boucherie Tradition</h3>
                  <p className="text-xs text-[#667079] mt-1">100% de la marge conservée</p>
                </div>
                <div className="bg-[#558D4D]/10 text-[#558D4D] p-3 rounded-xl border border-[#558D4D]/20 font-semibold text-sm">
                  +12 commandes aujourd'hui
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
          {/* Decorative bar */}
          <div className="w-12 h-1.5 bg-[#19522A] rounded-full mb-6 mx-auto"></div>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-[#19522A] mb-4">
              La qualité a un prix, mais ce n'est pas à vous de le payer
            </h2>
            <p className="text-lg text-[#667079]">
              L'énergie flambe, les matières premières explosent, et les plateformes prennent jusqu'à 30% de commission. 1001 Goûts attaque vos 3 plus gros problèmes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#f39313] group-hover:h-1.5 transition-all"></div>
              <div className="w-12 h-12 bg-[#f39313]/10 rounded-xl flex items-center justify-center text-[#f39313] mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-accent text-[#FF859D] mb-3">La Marge</h3>
              <div className="text-4xl font-display text-[#19522A] mb-2">-4.2 pts</div>
              <p className="text-[#667079] text-sm leading-relaxed">
                De marge perdus en deux ans par les artisans de bouche. Notre solution ? <strong className="text-[#4A4A4A]">0% de commission</strong> sur vos ventes. Le prix que le client paie est l'argent que vous touchez.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#FF859D] group-hover:h-1.5 transition-all"></div>
              <div className="w-12 h-12 bg-[#FF859D]/10 rounded-xl flex items-center justify-center text-[#FF859D] mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-accent text-[#FF859D] mb-3">Le Temps</h3>
              <div className="text-4xl font-display text-[#19522A] mb-2">9.6h/j</div>
              <p className="text-[#667079] text-sm leading-relaxed">
                De travail effectif. Vous n'avez pas le temps pour une application chronophage. Votre vitrine 1001 Goûts se crée en <strong className="text-[#4A4A4A]">5 minutes chrono</strong>.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#558D4D] group-hover:h-1.5 transition-all"></div>
              <div className="w-12 h-12 bg-[#558D4D]/10 rounded-xl flex items-center justify-center text-[#558D4D] mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-accent text-[#FF859D] mb-3">Les Bras</h3>
              <div className="text-4xl font-display text-[#19522A] mb-2">74%</div>
              <p className="text-[#667079] text-sm leading-relaxed">
                Des projets d'embauche en boucherie sont jugés difficiles. Notre app intègre <strong className="text-[#4A4A4A]">la mise en relation directe</strong> avec les talents locaux.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-12 h-1.5 bg-[#19522A] rounded-full mb-6"></div>
              <h2 className="text-3xl md:text-4xl font-display text-[#19522A] mb-6">
                Vos bénéfices en tant qu'Early Adopter
              </h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#558D4D]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#19522A] mb-1">Vitrine Numérique Automatisée</h4>
                    <p className="text-[#667079] text-sm leading-relaxed">Soyez visible par les consommateurs de votre ville sans effort de gestion quotidienne.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#558D4D]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#19522A] mb-1">Centrale de Référencement (À venir)</h4>
                    <p className="text-[#667079] text-sm leading-relaxed">Accédez à des matières premières et du matériel à tarifs négociés grâce à la force du réseau.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#558D4D]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#19522A] mb-1">Réseau Local Qualifié</h4>
                    <p className="text-[#667079] text-sm leading-relaxed">Ne soyez pas noyé au milieu de la France entière. L'app s'ouvre ville par ville pour garantir une densité utile.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-[#FDF3E2] p-10 rounded-[2rem] border border-[#D9DCD5] relative overflow-hidden">
              <img src="/pictos - 1.jpg" alt="Illustration artisans" className="w-full h-auto rounded-xl shadow-lg mix-blend-multiply opacity-90" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="inscription" className="py-24 bg-[#558D4D] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="w-12 h-1.5 bg-white/40 rounded-full mb-6 mx-auto"></div>
          <h2 className="text-4xl font-display mb-6 text-white">Prenez votre place.</h2>
          <p className="text-lg text-white/90 mb-10">
            Nous n'acceptons que 20 Early Adopters par zone pour garantir la qualité du réseau. Créez votre compte pro gratuitement dès aujourd'hui.
          </p>
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md mx-auto">
            <h3 className="text-xl font-bold text-[#19522A] mb-6">Inscription Pro (Boucherie)</h3>
            <form className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-1">Nom du commerce</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D]" placeholder="Ex: Boucherie Tradition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-1">Email professionnel</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D]" placeholder="contact@boucherie.fr" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-1">Code Postal</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D]" placeholder="Ex: 78400" />
              </div>
              <button type="button" className="w-full bg-[#f39313] hover:bg-[#d97f0e] text-white font-semibold py-3.5 rounded-full transition-colors mt-4 shadow-md hover:shadow-lg">
                Valider ma place
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bouchers;
