import React from 'react';
import { Store, Clock, Users, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';

const Bouchers = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#FDF3E2] pt-20 pb-24 md:pt-32 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF859D]/10 text-[#FF859D] font-mono text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FF859D]"></span>
              Bouchers & Charcutiers
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] text-[#19522A] mb-6 tracking-tight">
              Ils n'ont pas un problÃ¨me de demande.<br />
              <span className="text-[#F48631] font-accent font-normal tracking-normal text-6xl md:text-7xl lg:text-8xl block mt-2">Ils ont un problÃ¨me de marge.</span>
            </h1>
            <div className="p-5 bg-white border border-[#D9DCD5] border-l-4 border-l-[#F48631] shadow-sm mb-8 max-w-xl">
              <p className="text-lg text-[#19522A] leading-relaxed font-medium">
                La seule application qui connecte les artisans avec les consommateurs locaux, sans <strong>aucune commission sur les ventes</strong>. RÃ©cupÃ©rez ce qui vous appartient.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#inscription" className="bg-[#558D4D] hover:bg-[#43723D] text-white px-8 py-4 rounded-full font-medium text-lg text-center transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
                Devenir Early Adopter 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-sm text-[#667079] flex items-center justify-center sm:justify-start">
                100 places disponibles sur votre zone.
              </p>
            </div>
          </div>
          
          <div className="relative z-10 flex justify-center">
            {/* Visual placeholder for the app mockup */}
            <div className="relative w-full max-w-sm aspect-[9/19] bg-white rounded-[3rem] border-8 border-[#19522A] shadow-2xl overflow-hidden flex items-center justify-center">
              <div className="absolute top-0 w-40 h-7 bg-[#19522A] rounded-b-3xl"></div>
              <div className="p-6 text-center">
                <img src="/1001GOUTS-LOGO-RVB.png" alt="1001 GoÃ»ts" className="h-12 mx-auto mb-6" />
                <div className="bg-[#FDF3E2] p-4 rounded-xl mb-4 border border-[#D9DCD5]">
                  <h3 className="font-display font-bold text-xl text-[#19522A]">Boucherie Tradition</h3>
                  <p className="text-sm text-[#667079]">100% de la marge conservÃ©e</p>
                </div>
                <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 font-medium">
                  +12 commandes aujourd'hui
                </div>
              </div>
            </div>
            
            {/* Decorative organic shapes */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#F48631]/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#558D4D]/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
        
        {/* SVG Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-12 md:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,113.8,194,92.83,238.13,78.21,280.9,64,321.39,56.44Z" fill="#FBFBF8"></path>
          </svg>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-[#FBFBF8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#19522A] mb-4">
              La qualitÃ© a un prix, mais ce n'est pas Ã  vous de le payer
            </h2>
            <p className="text-lg text-[#667079]">
              L'Ã©nergie flambe, les matiÃ¨res premiÃ¨res explosent, et les plateformes prennent jusqu'Ã  30% de commission. 1001 GoÃ»ts attaque vos 3 plus gros problÃ¨mes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#F48631] group-hover:h-2 transition-all"></div>
              <div className="w-12 h-12 bg-[#F48631]/10 rounded-xl flex items-center justify-center text-[#F48631] mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#19522A] mb-3">La Marge</h3>
              <div className="text-4xl font-display font-bold text-[#19522A] mb-2">-4.2 pts</div>
              <p className="text-[#667079] text-sm leading-relaxed">
                De marge perdus en deux ans par les artisans de bouche. Notre solution ? <strong className="text-[#19522A]">0% de commission</strong> sur vos ventes. Le prix que le client paie est l'argent que vous touchez.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#FF859D] group-hover:h-2 transition-all"></div>
              <div className="w-12 h-12 bg-[#FF859D]/10 rounded-xl flex items-center justify-center text-[#FF859D] mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#19522A] mb-3">Le Temps</h3>
              <div className="text-4xl font-display font-bold text-[#19522A] mb-2">9.6h/j</div>
              <p className="text-[#667079] text-sm leading-relaxed">
                De travail effectif. Vous n'avez pas le temps pour une application chronophage. Votre vitrine 1001 GoÃ»ts se crÃ©e en <strong className="text-[#19522A]">5 minutes chrono</strong>.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-[#D9DCD5] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#558D4D] group-hover:h-2 transition-all"></div>
              <div className="w-12 h-12 bg-[#558D4D]/10 rounded-xl flex items-center justify-center text-[#558D4D] mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#19522A] mb-3">Les Bras</h3>
              <div className="text-4xl font-display font-bold text-[#19522A] mb-2">74%</div>
              <p className="text-[#667079] text-sm leading-relaxed">
                Des projets d'embauche en boucherie sont jugÃ©s difficiles. Notre app intÃ¨gre <strong className="text-[#19522A]">la mise en relation directe</strong> avec les talents locaux.
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
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[#19522A] mb-6">
                Vos bÃ©nÃ©fices en tant qu'Early Adopter
              </h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#558D4D]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#19522A] mb-1">Vitrine NumÃ©rique AutomatisÃ©e</h4>
                    <p className="text-[#667079] text-sm leading-relaxed">Soyez visible par les consommateurs de votre ville sans effort de gestion quotidienne.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#558D4D]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#19522A] mb-1">Centrale de RÃ©fÃ©rencement (Ã€ venir)</h4>
                    <p className="text-[#667079] text-sm leading-relaxed">AccÃ©dez Ã  des matiÃ¨res premiÃ¨res et du matÃ©riel Ã  tarifs nÃ©gociÃ©s grÃ¢ce Ã  la force du rÃ©seau.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#558D4D]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#19522A] mb-1">RÃ©seau Local QualifiÃ©</h4>
                    <p className="text-[#667079] text-sm leading-relaxed">Ne soyez pas noyÃ© au milieu de la France entiÃ¨re. L'app s'ouvre ville par ville pour garantir une densitÃ© utile.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-[#FDF3E2] p-10 rounded-[2rem] border border-[#D9DCD5] relative">
              <img src="/pictos - 1.jpg" alt="Illustration artisans" className="w-full h-auto rounded-xl shadow-lg mix-blend-multiply opacity-90" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="inscription" className="py-24 bg-[#558D4D] text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-display font-bold mb-6 text-white">Prenez votre place.</h2>
          <p className="text-lg text-white/90 mb-10">
            Nous n'acceptons que 20 Early Adopters par zone pour garantir la qualitÃ© du rÃ©seau. CrÃ©ez votre compte pro gratuitement dÃ¨s aujourd'hui.
          </p>
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md mx-auto">
            <h3 className="text-xl font-bold text-[#19522A] mb-6">Inscription Pro (Boucherie)</h3>
            <form className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-[#4F4D43] mb-1">Nom du commerce</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D]" placeholder="Ex: Boucherie Tradition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4F4D43] mb-1">Email professionnel</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D]" placeholder="contact@boucherie.fr" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4F4D43] mb-1">Code Postal</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-[#D9DCD5] focus:outline-none focus:ring-2 focus:ring-[#558D4D]/50 focus:border-[#558D4D]" placeholder="Ex: 78400" />
              </div>
              <button type="button" className="w-full bg-[#19522A] hover:bg-[#262B30] text-white font-medium py-3 rounded-lg transition-colors mt-4">
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
