import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 23;
    const duration = 1200;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out cubic
      const current = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      setCount(current);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(target);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, []);

  const openModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-guide-modal'));
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDF3E2]/95 backdrop-blur-md border-b border-[#D9DCD5] transition-shadow duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105 flex-shrink-0">
          <img src="/1001GOUTS-LOGO-RVB.png" alt="1001 Goûts" className="h-10 sm:h-12 md:h-13 w-auto object-contain" />
        </Link>

        {/* 📢 Bandeau Central d'Urgence (Entre Logo et CTA) */}
        <div className="hidden md:flex items-center gap-3 bg-[#19522A] text-[#FDF3E2] px-5 py-2 rounded-full text-sm font-medium shadow-xs border border-[#19522A] hover:border-[#F48631]/40 transition-colors">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F48631] animate-pulse flex-shrink-0"></span>
          <span>
            <strong className="text-white font-bold">Consultation 2026 :</strong> Déjà <strong className="text-[#F48631] font-bold tracking-wide tabular-nums">{count}</strong>/50 guides offerts réservés aux artisans bouchers.
          </span>
        </div>

        {/* CTA Button with Shine effect (Agrandit) */}
        <button 
          type="button"
          onClick={openModal}
          className="btn-shine-effect bg-[#F48631] hover:bg-[#d97223] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer flex-shrink-0 inline-flex items-center gap-2"
        >
          <span>Obtenir mon guide</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
