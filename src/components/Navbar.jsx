import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#FDF3E2]/90 backdrop-blur-md border-b border-[#D9DCD5]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" id="nav-logo" className="flex items-center gap-2 transition-transform hover:scale-105" data-clarity-tag="nav-logo">
          <img src="/1001GOUTS-LOGO-RVB.png" alt="1001 Goûts" className="h-10" />
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link to="/bouchers" id="nav-link-bouchers" className="text-[#19522A] font-display text-base hover:text-[#FF859D] transition-colors">
            Pour les Bouchers
          </Link>
          <Link to="/itinerants" id="nav-link-itinerants" className="text-[#19522A] font-display text-base hover:text-[#FF859D] transition-colors">
            Pour les Itinérants
          </Link>
          <Link to="/food-trucks" id="nav-link-foodtrucks" className="text-[#19522A] font-display text-base hover:text-[#FF859D] transition-colors">
            Pour les Food Trucks
          </Link>
        </nav>
        <a 
          href="#inscription" 
          id="nav-cta-inscription"
          data-clarity-tag="nav-cta"
          className="bg-[#558D4D] hover:bg-[#43723D] text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Créer ma vitrine pro
        </a>
      </div>
    </header>
  );
};

export default Navbar;
