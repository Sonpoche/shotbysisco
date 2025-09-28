import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Menu from "./components/Menu/Menu";
import FontPreloader from "./components/FontPreloader/FontPreloader";
import Preloader from "./components/Preloader/Preloader"; // Nouveau composant

import Home from "./pages/Home/Home";
import Work from "./pages/Portfolio/Work";
import Project from "./pages/Project/Project";
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
    // Vérifier si c'est la première visite de la session
    const hasVisited = sessionStorage.getItem('hasVisited');
    // Afficher le preloader seulement sur la page d'accueil et première visite
    return !hasVisited && location.pathname === '/';
  });

  // Gérer l'état du preloader
  useEffect(() => {
    // Si on est sur la page d'accueil et première visite
    if (location.pathname === '/' && !sessionStorage.getItem('hasVisited')) {
      setIsLoading(true);
    }
  }, [location]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    // Marquer comme visité seulement après la fin du preloader
    sessionStorage.setItem('hasVisited', 'true');
    // Ajouter une classe au body pour déclencher des animations
    document.body.classList.add('loaded');
  };

  return (
    <>
      {/* Preloader affiché uniquement au premier chargement */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {/* Contenu principal */}
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
          <Route path="/projects/:slug" element={<Project />} />
          <Route path="/projects" element={<Project />} />
        </Routes>
      </div>
    </>
  );
}

export default App;