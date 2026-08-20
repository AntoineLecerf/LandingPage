import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const scrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById('formulaire');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDF3E2]/95 backdrop-blur-md border-b border-[#D9DCD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105 flex-shrink-0">
          <img src="/1001GOUTS-LOGO-RVB.png" alt="1001 Goûts" className="h-10 sm:h-12 md:h-13 w-auto object-contain" />
        </Link>

        {/* 📢 Bandeau Central d'Urgence (Entre Logo et CTA) */}
        <div className="hidden md:flex items-center gap-3 bg-[#19522A] text-[#FDF3E2] px-5 py-2 rounded-full text-sm font-medium shadow-xs border border-[#19522A]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F48631] animate-pulse flex-shrink-0"></span>
          <span>
            <strong className="text-white font-bold">Consultation 2026 :</strong> Déjà <strong className="text-[#F48631] font-bold">23/50</strong> guides offerts réservés aux artisans bouchers.
          </span>
        </div>

        {/* CTA Button */}
        <a 
          href="#formulaire" 
          onClick={scrollToForm}
          className="bg-[#F48631] hover:bg-[#d97223] text-white px-5 sm:px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer flex-shrink-0"
        >
          Obtenir mon guide.
        </a>
      </div>
    </header>
  );
};

export default Navbar;
