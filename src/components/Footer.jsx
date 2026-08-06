import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#19522A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <img src="/1001GOUTS-LOGO-BLC.png" alt="1001 Goûts" className="h-12 mb-6" />
          <p className="text-white/60 text-sm leading-relaxed">
            La seule application qui connecte les producteurs et les métiers de bouche avec les consommateurs de leur région, sans aucun intermédiaire.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4 text-[#f39313]">Solutions B2B</h4>
          <ul className="space-y-3 text-white/60 text-sm">
            <li><a href="/bouchers" className="hover:text-white transition-colors">Bouchers & Charcutiers</a></li>
            <li><a href="/itinerants" className="hover:text-white transition-colors">Commerçants itinérants</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Producteurs locaux</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Restaurateurs</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4 text-[#f39313]">Ressources</h4>
          <ul className="space-y-3 text-white/60 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Tarifs (0% de commission)</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Le label "1001 Engagés"</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Centrale de référencement</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4 text-[#f39313]">Nous contacter</h4>
          <ul className="space-y-3 text-white/60 text-sm">
            <li><a href="mailto:contact@1001gouts.com" className="hover:text-white transition-colors">contact@1001gouts.com</a></li>
            <li>23 bis avenue de l'Europe<br/>78400 Chatou</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
        <p>© 2026 1001 Goûts (KLS SAS). Tous droits réservés.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-white transition-colors">CGU</a>
          <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
