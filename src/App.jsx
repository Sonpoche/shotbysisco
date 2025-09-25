import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Menu from "./components/Menu/Menu";
// Import du FontPreloader
import FontPreloader from "./components/FontPreloader/FontPreloader";

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

return (
  <>
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
  </>
);
}

export default App;