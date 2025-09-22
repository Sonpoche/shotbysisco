// src/components/VerticalCarousel/VerticalCarousel.jsx
import React, { useState, useEffect } from "react";
import "./VerticalCarousel.css";

const VerticalCarousel = ({ items = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si on est sur mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotation cyclique sur mobile/tablet
  useEffect(() => {
    if (!isMobile || items.length === 0) {
      console.log('Auto-rotation désactivée:', { isMobile, itemsLength: items.length });
      return;
    }

    console.log('Auto-rotation activée pour', items.length, 'slides');
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % items.length;
        console.log('Passage slide:', prevIndex, '→', nextIndex);
        return nextIndex;
      });
    }, 3500); // Chaque slide reste ouverte 3.5 secondes

    return () => {
      console.log('Nettoyage interval auto-rotation');
      clearInterval(interval);
    };
  }, [isMobile, items.length]);

  return (
    <div className="vertical-carousel">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`carousel-item ${isMobile && activeIndex === index ? 'auto-expanded' : ''}`}
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
              alt={item.title}
            />
          )}
          
          {/* Overlay sombre */}
          <div className="carousel-overlay"></div>
          
          {/* Contenu - titre toujours visible */}
          <div className="carousel-content">
            <h3 className="carousel-title">{item.title}</h3>
          </div>

          {/* Indicateur de progression pour la slide active */}
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