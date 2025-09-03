import React, { useRef, useState, useEffect } from 'react';
import './VideoCarousel.css';

const VideoCarousel = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Base videos - URLs optimisées
  const baseVideos = [
    {
      id: 1,
      src: "https://res.cloudinary.com/drochrcnp/video/upload/f_auto,q_auto:good/v1756842233/test-web_dtllrt.mp4",
      title: "emotions",
      subtitle: "Visual Poetry"
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/drochrcnp/video/upload/f_auto,q_auto:good/v1756842283/test3-web_ralvnr.mp4",
      title: "vision",
      subtitle: "Creative Direction"
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/drochrcnp/video/upload/f_auto,q_auto:good/v1756842286/test2-web_a7entv.mp4",
      title: "qualite",
      subtitle: "Premium Content"
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/drochrcnp/video/upload/f_auto,q_auto:good/v1756842230/test4-web_mpwljb.mp4",
      title: "stories",
      subtitle: "Brand Narrative"
    },
    {
      id: 5,
      src: "https://res.cloudinary.com/drochrcnp/video/upload/f_auto,q_auto:good/v1756842233/test-web_dtllrt.mp4",
      title: "moments",
      subtitle: "Captured Beauty"
    },
    {
      id: 6,
      src: "https://res.cloudinary.com/drochrcnp/video/upload/f_auto,q_auto:good/v1756842286/test2-web_a7entv.mp4",
      title: "creative",
      subtitle: "Dynamic Content"
    }
  ];

  // Créer 3 sets pour un bon équilibre
  const videos = [...baseVideos, ...baseVideos, ...baseVideos];

  // Forcer le play sur toutes les vidéos, surtout sur mobile
  useEffect(() => {
    const playAllVideos = () => {
      const videos = document.querySelectorAll('.video-card video');
      videos.forEach(video => {
        // Forcer le muted pour permettre l'autoplay sur mobile
        video.muted = true;
        video.play().catch(() => {
          // Si ça échoue, on réessaye après une interaction
          video.addEventListener('loadeddata', () => {
            video.play().catch(() => {});
          }, { once: true });
        });
      });
    };

    // Essayer au montage
    setTimeout(playAllVideos, 100);
    
    // Relancer périodiquement
    const interval = setInterval(playAllVideos, 3000);
    
    // Forcer au premier touch/click sur mobile
    const handleFirstInteraction = () => {
      playAllVideos();
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
    };
    
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    document.addEventListener('click', handleFirstInteraction, { once: true });
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  // Auto-scroll avec détection mobile
  useEffect(() => {
    let animationId;
    let scrollSpeed = 0.5;
    
    // Détecter si on est sur mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      scrollSpeed = 0.3; // Plus lent sur mobile pour économiser les ressources
    }
    
    const animate = () => {
      if (!isDragging && carouselRef.current) {
        carouselRef.current.scrollLeft += scrollSpeed;
        
        const scrollWidth = carouselRef.current.scrollWidth;
        const currentScroll = carouselRef.current.scrollLeft;
        const setWidth = scrollWidth / 3;
        
        // Loop infini : on boucle entre les 3 sets
        if (currentScroll >= setWidth * 2) {
          carouselRef.current.scrollLeft = currentScroll - setWidth;
        } else if (currentScroll <= setWidth * 0.1) {
          carouselRef.current.scrollLeft = currentScroll + setWidth;
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Démarrer l'animation
    animationId = requestAnimationFrame(animate);
    
    // Sur mobile, démarrer après la première interaction
    if (isMobile) {
      const startAutoScroll = () => {
        if (!animationId) {
          animationId = requestAnimationFrame(animate);
        }
      };
      
      document.addEventListener('touchstart', startAutoScroll, { once: true });
    }
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isDragging]);

  // Position initiale au milieu
  useEffect(() => {
    if (carouselRef.current) {
      setTimeout(() => {
        const scrollWidth = carouselRef.current.scrollWidth;
        carouselRef.current.scrollLeft = scrollWidth / 3;
      }, 100);
    }
  }, []);

  // Mouse handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Gestion du loop après le drag
    if (carouselRef.current) {
      const currentScroll = carouselRef.current.scrollLeft;
      const scrollWidth = carouselRef.current.scrollWidth;
      const setWidth = scrollWidth / 3;
      
      // Toujours garder la position entre setWidth*0.1 et setWidth*2
      if (currentScroll < 0) {
        // Très rare mais au cas où
        carouselRef.current.scrollLeft = setWidth;
      } else if (currentScroll < setWidth * 0.1) {
        // Proche du début -> ajouter un set
        carouselRef.current.scrollLeft = currentScroll + setWidth;
      } else if (currentScroll > setWidth * 2.9) {
        // Proche de la fin -> retirer un set
        carouselRef.current.scrollLeft = currentScroll - setWidth;
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
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
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
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