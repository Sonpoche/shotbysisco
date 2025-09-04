import React, { useRef, useState, useEffect } from 'react';
import './VideoCarousel.css';

const VideoCarousel = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [momentum, setMomentum] = useState(0);

  // Base videos - URLs R2 avec posters
  const baseVideos = [
    {
      id: 1,
      src: "https://videos.agencememento.com/test-web.mp4",
      poster: "https://videos.agencememento.com/test-poster.jpg",
      title: "emotions",
      subtitle: "Visual Poetry"
    },
    {
      id: 2,
      src: "https://videos.agencememento.com/test2-web.mp4",
      poster: "https://videos.agencememento.com/test2-poster.jpg",
      title: "vision",
      subtitle: "Creative Direction"
    },
    {
      id: 3,
      src: "https://videos.agencememento.com/test3-web.mp4",
      poster: "https://videos.agencememento.com/test3-poster.jpg",
      title: "qualite",
      subtitle: "Premium Content"
    },
    {
      id: 4,
      src: "https://videos.agencememento.com/test4-web.mp4",
      poster: "https://videos.agencememento.com/test4-poster.jpg",
      title: "stories",
      subtitle: "Brand Narrative"
    }
  ];

  // Créer 5 sets pour une meilleure boucle (pas de trou)
  const videos = [
    ...baseVideos,
    ...baseVideos,
    ...baseVideos,
    ...baseVideos,
    ...baseVideos
  ];

  // Optimisation : Observer pour lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const video = entry.target.querySelector('video');
          if (video) {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          }
        });
      },
      { 
        root: carouselRef.current,
        rootMargin: '100px',
        threshold: 0.1 
      }
    );

    const cards = document.querySelectorAll('.video-card');
    cards.forEach(card => observer.observe(card));

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, []);

  // Auto-scroll amélioré
  useEffect(() => {
    let animationId;
    let velocity = 0.35; // Vitesse plus lente et premium
    
    const animate = () => {
      if (!isDragging && carouselRef.current) {
        // Scroll normal
        carouselRef.current.scrollLeft += velocity;
        
        // Boucle infinie transparente
        const scrollWidth = carouselRef.current.scrollWidth;
        const clientWidth = carouselRef.current.clientWidth;
        const currentScroll = carouselRef.current.scrollLeft;
        const oneSetWidth = scrollWidth / 5; // 5 sets
        
        // Reset invisible au milieu pour éviter les extrêmes
        if (currentScroll >= oneSetWidth * 3) {
          carouselRef.current.scrollLeft = currentScroll - oneSetWidth;
        } else if (currentScroll <= oneSetWidth) {
          carouselRef.current.scrollLeft = currentScroll + oneSetWidth;
        }
      }
      
      // Momentum après drag
      if (momentum !== 0 && !isDragging) {
        if (carouselRef.current) {
          carouselRef.current.scrollLeft += momentum;
          setMomentum(momentum * 0.95); // Décélération
          if (Math.abs(momentum) < 0.1) {
            setMomentum(0);
          }
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isDragging, momentum]);

  // Position initiale au 2e set (pour avoir du contenu des deux côtés)
  useEffect(() => {
    if (carouselRef.current) {
      const timer = setTimeout(() => {
        const oneSetWidth = carouselRef.current.scrollWidth / 5;
        carouselRef.current.scrollLeft = oneSetWidth * 2; // Au milieu
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Mouse handlers avec momentum
  let lastX = 0;
  let velocityTracker = [];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setMomentum(0);
    lastX = e.pageX;
    velocityTracker = [];
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    carouselRef.current.style.cursor = 'grab';
    
    // Calculer le momentum basé sur la vélocité
    if (velocityTracker.length > 0) {
      const avgVelocity = velocityTracker.slice(-5).reduce((a, b) => a + b, 0) / Math.min(velocityTracker.length, 5);
      setMomentum(-avgVelocity * 0.3); // Réduire pour un effet plus smooth
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 0.8; // Ralenti pour un effet premium
    carouselRef.current.scrollLeft = scrollLeft - walk;
    
    // Tracker la vélocité pour le momentum
    const velocity = e.pageX - lastX;
    velocityTracker.push(velocity);
    if (velocityTracker.length > 10) velocityTracker.shift();
    lastX = e.pageX;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Touch handlers optimisés
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setMomentum(0);
    lastX = e.touches[0].pageX;
    velocityTracker = [];
    setStartX(e.touches[0].pageX);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (velocityTracker.length > 0) {
      const avgVelocity = velocityTracker.slice(-5).reduce((a, b) => a + b, 0) / Math.min(velocityTracker.length, 5);
      setMomentum(-avgVelocity * 0.3);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 0.8;
    carouselRef.current.scrollLeft = scrollLeft - walk;
    
    const velocity = x - lastXRef.current;
    velocityTrackerRef.current.push(velocity);
    if (velocityTrackerRef.current.length > 10) velocityTrackerRef.current.shift();
    lastXRef.current = x;
  };

  return (
    <section className="video-carousel-section">
      <div className="carousel-header">
        <h1>agence memento</h1>
        <p className="carousel-subtitle">
          Contenus vidéos/photos premium pour entreprises
        </p>
      </div>

      <div className="carousel-container">
        <div 
          className={`video-carousel-wrapper ${isDragging ? 'dragging' : ''}`}
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          <div className="video-carousel-track">
            {videos.map((video, index) => (
              <div key={`${video.id}-${index}`} className="video-card">
                <div className="video-card-inner">
                  <video
                    poster={video.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <div className="video-card-overlay">
                    <h3>{video.title}</h3>
                    <p>{video.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="carousel-scroll-hint">
        <p>← drag to explore →</p>
      </div>
    </section>
  );
};

export default VideoCarousel;