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
  const animationRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Détection du changement de taille d'écran
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 12 medias : alternance vidéo/photo
  const baseMedias = [
    // 1. VIDEO
    {
      id: 1,
      type: 'video',
      src: 'https://videos.agencememento.com/Reseaux/ANNONCE-UMD_ahq12-web.mp4',
    },
    // 2. PHOTO
    {
      id: 2,
      type: 'image',
      src: 'https://videos.agencememento.com/Reseaux/marion-ryan-5-web.webp',
    },
    // 3. VIDEO
    {
      id: 3,
      type: 'video',
      src: 'https://videos.agencememento.com/Reseaux/Captions_92967C-web.mp4',
    },
    // 4. PHOTO
    {
      id: 4,
      type: 'image',
      src: 'https://videos.agencememento.com/Reseaux/marion-ryan-13-web.webp',
    },
    // 5. VIDEO
    {
      id: 5,
      type: 'video',
      src: 'https://videos.agencememento.com/Prive/marioVERT-mariage-web.mp4',
    },
    // 6. PHOTO
    {
      id: 6,
      type: 'image',
      src: 'https://videos.agencememento.com/Prive/jeans-tournesol_0002_Generative_Fill-web.webp',
    },
    // 7. VIDEO
    {
      id: 7,
      type: 'video',
      src: 'https://videos.agencememento.com/evenementiel/ALVIN_FINAL_ITWmp4-web.mp4',
    },
    // 8. PHOTO
    {
      id: 8,
      type: 'image',
      src: 'https://videos.agencememento.com/Prive/jeans-tournesol_0000_Generative_Fill_4-web.webp',
    },
    // 9. VIDEO
    {
      id: 9,
      type: 'video',
      src: 'https://videos.agencememento.com/evenementiel/BIRTHDAY_FINAL-web.mp4',
    },
    // 10. PHOTO
    {
      id: 10,
      type: 'image',
      src: 'https://videos.agencememento.com/evenementiel/PandG-Final-Memento-45-web.webp',
    },
    // 11. VIDEO
    {
      id: 11,
      type: 'video',
      src: 'https://videos.agencememento.com/Prive/ChrisetPhilo-longueversion-web.mp4',
    },
    // 12. PHOTO
    {
      id: 12,
      type: 'image',
      src: 'https://videos.agencememento.com/evenementiel/PandG-Final-Memento-68-web.webp',
    }
  ];

  // Dupliquer pour créer une boucle infinie transparente (2 sets)
  const medias = [...baseMedias, ...baseMedias];

  // Observer pour play/pause des vidéos selon visibilité
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
        rootMargin: '0px',
        threshold: 0.5 
      }
    );

    const cards = document.querySelectorAll('.video-card');
    cards.forEach(card => observer.observe(card));

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, [medias]);

  // Auto-scroll continu avec boucle infinie
  useEffect(() => {
    const baseVelocity = isMobile ? 0.8 : 0.5;
    
    const animate = () => {
      if (!isDragging && carouselRef.current) {
        carouselRef.current.scrollLeft += baseVelocity;
        
        // Boucle infinie transparente
        const scrollWidth = carouselRef.current.scrollWidth;
        const oneSetWidth = scrollWidth / 2; // 2 sets de médias
        
        // Si on dépasse 1.5 sets, on revient à 0.5 set
        if (carouselRef.current.scrollLeft >= oneSetWidth * 1.5) {
          carouselRef.current.scrollLeft -= oneSetWidth;
        }
        // Si on va trop à gauche, on va à la fin du 1er set
        else if (carouselRef.current.scrollLeft <= 0) {
          carouselRef.current.scrollLeft = oneSetWidth * 0.5;
        }
      }
      
      // Gestion du momentum
      if (momentum !== 0 && !isDragging && carouselRef.current) {
        carouselRef.current.scrollLeft += momentum;
        setMomentum(prev => {
          const newMomentum = prev * 0.95;
          return Math.abs(newMomentum) < 0.1 ? 0 : newMomentum;
        });
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, momentum, isMobile]);

  // Position initiale au milieu pour permettre le scroll dans les deux sens
  useEffect(() => {
    if (carouselRef.current) {
      const timer = setTimeout(() => {
        const scrollWidth = carouselRef.current.scrollWidth;
        const oneSetWidth = scrollWidth / 2;
        carouselRef.current.scrollLeft = oneSetWidth * 0.5; // Commence au milieu
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Mouse handlers
  const handleMouseDown = (e) => {
    e.preventDefault(); // Empêche le drag natif des images
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
    
    if (velocityTrackerRef.current.length > 0) {
      const avgVelocity = velocityTrackerRef.current.slice(-5).reduce((a, b) => a + b, 0) / Math.min(velocityTrackerRef.current.length, 5);
      setMomentum(-avgVelocity * 0.3);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const sensitivity = isMobile ? 1.5 : 1;
    
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

  // Touch handlers
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
      setMomentum(-avgVelocity * 0.3);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const sensitivity = 1.5;
    const x = e.touches[0].pageX;
    const walk = (x - startX) * sensitivity;
    carouselRef.current.scrollLeft = scrollLeft - walk;
    
    const velocity = x - lastXRef.current;
    velocityTrackerRef.current.push(velocity);
    if (velocityTrackerRef.current.length > 10) velocityTrackerRef.current.shift();
    lastXRef.current = x;
  };

  // Gestion des erreurs avec retry
  const handleVideoError = (e) => {
    const videoElement = e.target;
    const retryCount = parseInt(videoElement.dataset.retryCount || '0');
    
    if (retryCount < 3) {
      console.log(`Retry ${retryCount + 1}/3 pour une vidéo`);
      videoElement.dataset.retryCount = (retryCount + 1).toString();
      
      setTimeout(() => {
        videoElement.load();
      }, Math.pow(2, retryCount) * 1000);
    } else {
      console.error(`Impossible de charger une vidéo après 3 essais`);
      videoElement.style.backgroundColor = '#111';
    }
  };

  return (
    <section className="video-carousel-section">
      <div className="carousel-header">
        <h1>agence memento</h1>
        <p className="carousel-subtitle">
          creation photo et video memorable pour entreprises et particuliers
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
            {medias.map((media, index) => (
              <div 
                key={`media-${index}`} 
                className="video-card"
              >
                <div className="video-card-inner">
                  {media.type === 'video' ? (
                    <video
                      src={media.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      onError={handleVideoError}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        backgroundColor: '#000',
                        transform: 'translateZ(0)',
                        willChange: 'transform'
                      }}
                    />
                  ) : (
                    <img
                      src={media.src}
                      alt=""
                      draggable="false"
                      onDragStart={(e) => e.preventDefault()}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none',
                        WebkitUserDrag: 'none',
                        pointerEvents: 'auto'
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="carousel-scroll-hint">
        <p>
          <span className="scroll-arrow">←</span>
          <span className="scroll-text">parcourir</span>
          <span className="scroll-arrow">→</span>
        </p>
      </div>
    </section>
  );
};

export default VideoCarousel;