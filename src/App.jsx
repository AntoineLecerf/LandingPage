import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Bouchers from './pages/Bouchers';
import FoodTrucks from './pages/FoodTrucks';
import Itinerants from './pages/Itinerants';
import { initClarity, trackPageView } from './utils/clarity';

/**
 * RouteTracker listens to SPA route changes and dispatches virtual pageviews to Clarity
 */
function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
}

function App() {
  useEffect(() => {
    initClarity();
  }, []);

  return (
    <Router>
      <RouteTracker />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/bouchers" element={<Bouchers />} />
            <Route path="/food-trucks" element={<FoodTrucks />} />
            <Route path="/itinerants" element={<Itinerants />} />
            {/* Redirect root to bouchers for now as default */}
            <Route path="/" element={<Navigate to="/bouchers" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

