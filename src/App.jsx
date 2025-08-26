import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Menu from "./components/Menu/Menu";
// Import du FontPreloader
import FontPreloader from "./components/FontPreloader/FontPreloader";

import Home from "./pages/Home/Home";
import Work from "./pages/Portfolio/Work";
import Project from "./pages/Project/Project";
import About from "./pages/APropos/About";
import FAQ from "./pages/FAQ/FAQ";
import Contact from "./pages/Contact/Contact";

import { AnimatePresence } from "framer-motion";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1400);
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();

  return (
    <>
      {/* Ajouter le préchargeur de polices */}
      <FontPreloader />
      <ScrollToTop />
      <Menu />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/portfolio" element={<Work />} />
          {/* Route dynamique pour les projets individuels */}
          <Route path="/projects/:slug" element={<Project />} />
          {/* Route legacy pour /projects sans slug - affiche le premier projet */}
          <Route path="/projects" element={<Project />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;