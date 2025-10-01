// src/components/VerticalCarousel/VerticalCarousel.jsx
import React, { useState, useEffect, useMemo } from "react";
import "./VerticalCarousel.css";

const VerticalCarousel = ({ items = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Détecter si on est sur mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fonction pour mélanger un tableau (Fisher-Yates shuffle)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Sélectionner 4 slides aléatoires sur mobile à chaque render
  // useMemo avec une clé aléatoire pour forcer la re-randomisation à chaque mount du composant
  const displayedItems = useMemo(() => {
    if (isMobile && items.length > 4) {
      const shuffled = shuffleArray(items);
      return shuffled.slice(0, 4);
    }
    return items;
  }, [items, isMobile]); // Se recalcule quand items ou isMobile change

  // Auto-rotation cyclique sur mobile/tablet
  useEffect(() => {
    if (!isMobile || displayedItems.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % displayedItems.length);
    }, 3500); // Chaque slide reste ouverte 3.5 secondes
    
    return () => clearInterval(interval);
  }, [isMobile, displayedItems.length]);

  const handleMouseEnter = (index) => {
    if (!isMobile) {
      setHoveredIndex(index);
      setHasInteracted(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredIndex(null);
    }
  };

  return (
    <div className="vertical-carousel">
      {displayedItems.map((item, index) => (
        <div 
          key={`${item.title}-${index}`} 
          className={`carousel-item ${
            isMobile && activeIndex === index ? 'auto-expanded' : ''
          } ${
            !isMobile && !hasInteracted && index === 0 ? 'default-expanded' : ''
          } ${
            !isMobile && hoveredIndex === index ? 'hover-expanded' : ''
          }`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Media background */}
          {item.mediaType === "video" ? (
            <video
              className="carousel-media"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={item.media} type="video/mp4" />
            </video>
          ) : (
            <img
              className="carousel-media"
              src={item.media}
              alt=""
            />
          )}
          
          {/* Overlay sombre */}
          <div className="carousel-overlay"></div>
          
          {/* Contenu vide - pas de titre */}
          <div className="carousel-content">
            {/* Les titres ont été retirés pour un design plus épuré */}
          </div>

          {/* Indicateur de progression pour la slide active sur mobile */}
          {isMobile && activeIndex === index && (
            <div className="progress-indicator">
              <div className="progress-bar"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VerticalCarousel;