import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Bouchers from './pages/Bouchers';
import AuditEquipe from './pages/AuditEquipe';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Bouchers />} />
            <Route path="/bouchers" element={<Bouchers />} />
            <Route path="/analyse" element={<AuditEquipe />} />
            <Route path="/audit" element={<AuditEquipe />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
