import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { HelmetProvider } from 'react-helmet-async';

import Menu from "./components/Menu/Menu";
import FontPreloader from "./components/FontPreloader/FontPreloader";
import Preloader from "./components/Preloader/Preloader";

import Home from "./pages/Home/Home";
import Work from "./pages/Portfolio/Work";
import Services from "./pages/Services/Services";
import FAQ from "./pages/FAQ/FAQ";
import Contact from "./pages/Contact/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    return !hasVisited && location.pathname === '/';
  });

  useEffect(() => {
    if (location.pathname === '/' && !sessionStorage.getItem('hasVisited')) {
      setIsLoading(true);
    }
  }, [location]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('hasVisited', 'true');
    document.body.classList.add('loaded');
  };

  return (
    <HelmetProvider>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <FontPreloader />
        <ScrollToTop />
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/portfolio" element={<Work />} />
        </Routes>
      </div>
    </HelmetProvider>
  );
}

export default App;