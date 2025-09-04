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
  const intervalRef = useRef(null);

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

  // Détecter iOS
  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  };

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

  // Auto-scroll avec solution hybride pour iOS
  useEffect(() => {
    let animationId;
    // Vitesse adaptative selon l'écran
    const isMobile = window.innerWidth <= 768;
    const velocity = isMobile ? 1 : 0.5; // Plus rapide sur mobile
    
    // Solution 1: Utiliser setInterval pour iOS comme fallback
    if (isIOS()) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      intervalRef.current = setInterval(() => {
        if (!isDragging && carouselRef.current) {
          carouselRef.current.scrollLeft += velocity;
          
          // Boucle infinie transparente
          const scrollWidth = carouselRef.current.scrollWidth;
          const currentScroll = carouselRef.current.scrollLeft;
          const oneSetWidth = scrollWidth / 5;
          
          if (currentScroll >= oneSetWidth * 3.5) {
            carouselRef.current.scrollLeft = currentScroll - oneSetWidth;
          } else if (currentScroll <= oneSetWidth * 0.5) {
            carouselRef.current.scrollLeft = currentScroll + oneSetWidth;
          }
        }
        
        // Gérer le momentum
        if (momentum !== 0 && !isDragging && carouselRef.current) {
          carouselRef.current.scrollLeft += momentum;
          setMomentum(prev => {
            const newMomentum = prev * 0.95;
            return Math.abs(newMomentum) < 0.1 ? 0 : newMomentum;
          });
        }
      }, 16); // ~60fps
      
    } else {
      // Solution 2: requestAnimationFrame pour autres navigateurs
      const animate = () => {
        if (!isDragging && carouselRef.current) {
          carouselRef.current.scrollLeft += velocity;
          
          const scrollWidth = carouselRef.current.scrollWidth;
          const currentScroll = carouselRef.current.scrollLeft;
          const oneSetWidth = scrollWidth / 5;
          
          if (currentScroll >= oneSetWidth * 3.5) {
            carouselRef.current.scrollLeft = currentScroll - oneSetWidth;
          } else if (currentScroll <= oneSetWidth * 0.5) {
            carouselRef.current.scrollLeft = currentScroll + oneSetWidth;
          }
        }
        
        if (momentum !== 0 && !isDragging) {
          if (carouselRef.current) {
            carouselRef.current.scrollLeft += momentum;
            setMomentum(momentum * 0.95);
            if (Math.abs(momentum) < 0.1) {
              setMomentum(0);
            }
          }
        }
        
        animationId = requestAnimationFrame(animate);
      };
      
      animationId = requestAnimationFrame(animate);
    }
    
    // Solution 3: Forcer le réveil sur iOS avec un touch event passif
    if (isIOS()) {
      const wakeAnimation = () => {
        if (carouselRef.current) {
          // Forcer un petit changement pour maintenir l'animation active
          carouselRef.current.style.willChange = 'scroll-position';
          setTimeout(() => {
            if (carouselRef.current) {
              carouselRef.current.style.willChange = 'auto';
            }
          }, 100);
        }
      };
      
      // Réveiller l'animation toutes les 5 secondes sur iOS
      const wakeInterval = setInterval(wakeAnimation, 5000);
      
      return () => {
        clearInterval(wakeInterval);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isDragging, momentum]);

  // Position initiale au 2e set
  useEffect(() => {
    if (carouselRef.current) {
      const timer = setTimeout(() => {
        const oneSetWidth = carouselRef.current.scrollWidth / 5;
        carouselRef.current.scrollLeft = oneSetWidth * 2;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Solution 4: Utiliser CSS pour iOS (fallback)
  useEffect(() => {
    if (isIOS() && carouselRef.current) {
      // Ajouter une classe CSS pour animation sur iOS
      carouselRef.current.classList.add('ios-auto-scroll');
      
      // Listener pour reprendre l'animation après interaction
      const handleInteraction = () => {
        if (carouselRef.current) {
          carouselRef.current.classList.remove('ios-auto-scroll');
          setTimeout(() => {
            if (carouselRef.current && !isDragging) {
              carouselRef.current.classList.add('ios-auto-scroll');
            }
          }, 100);
        }
      };
      
      document.addEventListener('touchend', handleInteraction);
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
          handleInteraction();
        }
      });
      
      return () => {
        document.removeEventListener('touchend', handleInteraction);
      };
    }
  }, [isDragging]);

  // Mouse handlers avec momentum amélioré
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setMomentum(0);
    lastXRef.current = e.pageX;
    velocityTrackerRef.current = [];
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.cursor = 'grabbing';
    
    // Désactiver l'animation CSS sur iOS pendant le drag
    if (isIOS() && carouselRef.current) {
      carouselRef.current.classList.remove('ios-auto-scroll');
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    carouselRef.current.style.cursor = 'grab';
    
    if (velocityTrackerRef.current.length > 0) {
      const avgVelocity = velocityTrackerRef.current.slice(-5).reduce((a, b) => a + b, 0) / Math.min(velocityTrackerRef.current.length, 5);
      setMomentum(-avgVelocity * 0.4);
    }
    
    // Réactiver l'animation CSS sur iOS après le drag
    if (isIOS() && carouselRef.current) {
      setTimeout(() => {
        if (carouselRef.current && !isDragging) {
          carouselRef.current.classList.add('ios-auto-scroll');
        }
      }, 1000);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    // Sensibilité adaptée selon l'écran
    const isMobile = window.innerWidth <= 768;
    const sensitivity = isMobile ? 1.8 : 1.2; // Plus réactif sur mobile
    
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * sensitivity;
    carouselRef.current.scrollLeft = scrollLeft - walk;
    
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

  // Touch handlers optimisés pour iOS
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setMomentum(0);
    lastXRef.current = e.touches[0].pageX;
    velocityTrackerRef.current = [];
    setStartX(e.touches[0].pageX);
    setScrollLeft(carouselRef.current.scrollLeft);
    
    if (isIOS() && carouselRef.current) {
      carouselRef.current.classList.remove('ios-auto-scroll');
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (velocityTrackerRef.current.length > 0) {
      const avgVelocity = velocityTrackerRef.current.slice(-5).reduce((a, b) => a + b, 0) / Math.min(velocityTrackerRef.current.length, 5);
      setMomentum(-avgVelocity * 0.4);
    }
    
    if (isIOS() && carouselRef.current) {
      setTimeout(() => {
        if (carouselRef.current && !isDragging) {
          carouselRef.current.classList.add('ios-auto-scroll');
        }
      }, 1000);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    // Sensibilité plus élevée pour mobile
    const sensitivity = 1.8;
    
    const x = e.touches[0].pageX;
    const walk = (x - startX) * sensitivity;
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