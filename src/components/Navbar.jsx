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
      <div className="max-w-7xl mx-auto px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <img src="/1001GOUTS-LOGO-RVB.png" alt="1001 Goûts" className="h-12 sm:h-14 md:h-16 w-auto object-contain" />
        </Link>
        <a 
          href="#formulaire" 
          onClick={scrollToForm}
          className="bg-[#F48631] hover:bg-[#d97223] text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Obtenir mon guide
        </a>
      </div>
    </header>
  );
};

export default Navbar;
