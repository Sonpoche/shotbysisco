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

  // Limiter à 4 slides sur mobile
  const displayedItems = isMobile ? items.slice(0, 4) : items;

  // Auto-rotation cyclique sur mobile/tablet
  useEffect(() => {
    if (!isMobile || displayedItems.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % displayedItems.length);
    }, 3500); // Chaque slide reste ouverte 3.5 secondes
    
    return () => clearInterval(interval);
  }, [isMobile, displayedItems.length]);

  return (
    <div className="vertical-carousel">
      {displayedItems.map((item, index) => (
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