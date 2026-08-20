import React from 'react';
import BrushSeparator from './BrushSeparator';

const Footer = () => {
  return (
    <footer className="relative bg-[#19522A] text-white pt-20 pb-8">
      {/* 🎨 Séparateur Pinceau : Transition Crème #FDF3E2 -> Vert #19522A (Modèle 1001 Goûts) */}
      <BrushSeparator position="top" fillColor="#FDF3E2" flipX={true} />
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="max-w-md">
          <img src="/1001GOUTS-LOGO-BLC.png" alt="1001 Goûts" className="h-12 sm:h-14 w-auto object-contain mb-4" />
          <p className="text-white/70 text-sm leading-relaxed">
            L'initiative solidaire dédiée aux artisans des métiers de bouche et producteurs régionaux, pour valoriser le savoir-faire local sans aucun intermédiaire.
          </p>
        </div>

        <div className="md:text-right">
          <h4 className="font-display text-lg mb-3 text-white">Nous contacter</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>
              <a href="mailto:contact@1001gouts.com" className="hover:text-[#F48631] transition-colors underline font-medium">
                contact@1001gouts.com
              </a>
            </li>
            <li>23 bis avenue de l'Europe, 78400 Chatou</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-white/50">
        <p>© 2026 1001 Goûts (KLS SAS). Tous droits réservés.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="https://www.1001gouts.com/mentions-legales/" target="_blank" rel="noreferrer" className="hover:text-[#F48631] transition-colors">Mentions légales</a>
          <a href="https://www.1001gouts.com/mentions-legales/" target="_blank" rel="noreferrer" className="hover:text-[#F48631] transition-colors">CGU</a>
          <a href="https://www.1001gouts.com/mentions-legales/" target="_blank" rel="noreferrer" className="hover:text-[#F48631] transition-colors">Confidentialité</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
