import React, { useRef, useState, useEffect } from 'react';
import './VideoCarousel.css';

const VideoCarousel = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [momentum, setMomentum] = useState(0);
  const velocityTrackerRef = useRef([]);
  const lastXRef = useRef(0);

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

  // CrÃ©er 5 sets pour une meilleure boucle (pas de trou)
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

  // Auto-scroll amÃ©liorÃ© - fonctionne desktop ET mobile
  useEffect(() => {
    let animationId;
    let velocity = 0.5; // Vitesse légèrement augmentée
    
    const animate = () => {
      if (!isDragging && carouselRef.current) {
        // Scroll automatique continu
        carouselRef.current.scrollLeft += velocity;
        
        // Boucle infinie transparente
        const scrollWidth = carouselRef.current.scrollWidth;
        const currentScroll = carouselRef.current.scrollLeft;
        const oneSetWidth = scrollWidth / 5; // 5 sets
        
        // Reset invisible au milieu pour Ã©viter les extrÃªmes
        if (currentScroll >= oneSetWidth * 3.5) {
          carouselRef.current.scrollLeft = currentScroll - oneSetWidth;
        } else if (currentScroll <= oneSetWidth * 0.5) {
          carouselRef.current.scrollLeft = currentScroll + oneSetWidth;
        }
      }
      
      // Momentum aprÃ¨s drag
      if (momentum !== 0 && !isDragging) {
        if (carouselRef.current) {
          carouselRef.current.scrollLeft += momentum;
          setMomentum(momentum * 0.95); // DÃ©cÃ©lÃ©ration
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

  // Position initiale au 2e set (pour avoir du contenu des deux cÃ´tÃ©s)
  useEffect(() => {
    if (carouselRef.current) {
      const timer = setTimeout(() => {
        const oneSetWidth = carouselRef.current.scrollWidth / 5;
        carouselRef.current.scrollLeft = oneSetWidth * 2; // Au milieu
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Mouse handlers avec momentum amélioré
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setMomentum(0);
    lastXRef.current = e.pageX;
    velocityTrackerRef.current = [];
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    carouselRef.current.style.cursor = 'grab';
    
    // Calculer le momentum basÃ© sur la vÃ©locitÃ©
    if (velocityTrackerRef.current.length > 0) {
      const avgVelocity = velocityTrackerRef.current.slice(-5).reduce((a, b) => a + b, 0) / Math.min(velocityTrackerRef.current.length, 5);
      setMomentum(-avgVelocity * 0.4);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.2; // Plus réactif
    carouselRef.current.scrollLeft = scrollLeft - walk;
    
    // Tracker la vÃ©locitÃ© pour le momentum
    const velocity = e.pageX - lastXRef.current;
    velocityTrackerRef.current.push(velocity);
    if (velocityTrackerRef.current.length > 10) velocityTrackerRef.current.shift();
    lastXRef.current = e.pageX;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Touch handlers optimisÃ©s
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setMomentum(0);
    lastXRef.current = e.touches[0].pageX;
    velocityTrackerRef.current = [];
    setStartX(e.touches[0].pageX);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (velocityTrackerRef.current.length > 0) {
      const avgVelocity = velocityTrackerRef.current.slice(-5).reduce((a, b) => a + b, 0) / Math.min(velocityTrackerRef.current.length, 5);
      setMomentum(-avgVelocity * 0.4);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.2;
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
          Contenus vidÃ©os/photos premium pour entreprises
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