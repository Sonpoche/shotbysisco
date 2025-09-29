import React, { useRef, useState, useEffect, useCallback } from 'react';
import './VideoCarousel.css';

const VideoCarousel = () => {
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const animationRef = useRef(null);
  const currentIndexRef = useRef(0);
  const autoScrollSpeed = 0.5;
  const [isMobile, setIsMobile] = useState(false);

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Les 12 médias originaux - SANS DUPLICATION
  const medias = [
    { id: 1, type: 'video', src: 'https://videos.agencememento.com/Reseaux/ANNONCE-UMD_ahq12-web.mp4' },
    { id: 2, type: 'image', src: 'https://videos.agencememento.com/Reseaux/marion-ryan-5-web.webp' },
    { id: 3, type: 'video', src: 'https://videos.agencememento.com/Reseaux/Captions_92967C-web.mp4' },
    { id: 4, type: 'image', src: 'https://videos.agencememento.com/Reseaux/marion-ryan-13-web.webp' },
    { id: 5, type: 'video', src: 'https://videos.agencememento.com/Prive/marioVERT-mariage-web.mp4' },
    { id: 6, type: 'image', src: 'https://videos.agencememento.com/Prive/jeans-tournesol_0002_Generative_Fill-web.webp' },
    { id: 7, type: 'video', src: 'https://videos.agencememento.com/evenementiel/ALVIN_FINAL_ITWmp4-web.mp4' },
    { id: 8, type: 'image', src: 'https://videos.agencememento.com/Prive/jeans-tournesol_0000_Generative_Fill_4-web.webp' },
    { id: 9, type: 'video', src: 'https://videos.agencememento.com/evenementiel/BIRTHDAY_FINAL-web.mp4' },
    { id: 10, type: 'image', src: 'https://videos.agencememento.com/evenementiel/PandG-Final-Memento-45-web.webp' },
    { id: 11, type: 'video', src: 'https://videos.agencememento.com/Prive/ChrisetPhilo-longueversion-web.mp4' },
    { id: 12, type: 'image', src: 'https://videos.agencememento.com/evenementiel/PandG-Final-Memento-68-web.webp' }
  ];

  // Rendu des slides avec clones virtuels aux extrémités
  const renderSlides = () => {
    const slides = [];
    
    // Clone les 3 derniers au début
    for (let i = medias.length - 3; i < medias.length; i++) {
      const media = medias[i];
      slides.push(renderSlide(media, `clone-start-${i}`));
    }
    
    // Les 12 slides originaux
    medias.forEach((media, index) => {
      slides.push(renderSlide(media, `original-${index}`));
    });
    
    // Clone les 3 premiers à la fin
    for (let i = 0; i < 3; i++) {
      const media = medias[i];
      slides.push(renderSlide(media, `clone-end-${i}`));
    }
    
    return slides;
  };

  const renderSlide = (media, key) => (
    <div key={key} className="video-card">
      <div className="video-card-inner">
        {media.type === 'video' ? (
          <video
            src={media.src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              backgroundColor: '#000'
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
              WebkitUserDrag: 'none',
              pointerEvents: 'auto'
            }}
          />
        )}
      </div>
    </div>
  );

  // Calcul de la position pour le repositionnement instantané
  const getPositionByIndex = (index) => {
    const slideWidth = isMobile ? 240 : 350;
    const gap = isMobile ? 16 : 32;
    return -((index + 3) * (slideWidth + gap));
  };

  // Repositionnement instantané sans animation visible
  const checkInfiniteLoop = useCallback(() => {
    const slideWidth = isMobile ? 240 : 350;
    const gap = isMobile ? 16 : 32;
    const totalWidth = (slideWidth + gap) * medias.length;
    
    if (trackRef.current) {
      const currentPosition = currentTranslate;
      
      // Si on dépasse le début (trop à droite)
      if (currentPosition >= 0) {
        trackRef.current.style.transition = 'none';
        const newTranslate = currentPosition - totalWidth;
        setCurrentTranslate(newTranslate);
        setPrevTranslate(newTranslate);
        trackRef.current.style.transform = `translateX(${newTranslate}px)`;
        
        setTimeout(() => {
          if (trackRef.current) {
            trackRef.current.style.transition = '';
          }
        }, 10);
      }
      
      // Si on dépasse la fin (trop à gauche)
      if (currentPosition <= -(totalWidth + (slideWidth + gap) * 3)) {
        trackRef.current.style.transition = 'none';
        const newTranslate = currentPosition + totalWidth;
        setCurrentTranslate(newTranslate);
        setPrevTranslate(newTranslate);
        trackRef.current.style.transform = `translateX(${newTranslate}px)`;
        
        setTimeout(() => {
          if (trackRef.current) {
            trackRef.current.style.transition = '';
          }
        }, 10);
      }
    }
  }, [currentTranslate, medias.length, isMobile]);

  // Animation auto-scroll (inversé - vers la droite maintenant)
  useEffect(() => {
    const animate = () => {
      if (!isDragging) {
        setCurrentTranslate(prev => {
          const newTranslate = prev + autoScrollSpeed;
          if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${newTranslate}px)`;
          }
          return newTranslate;
        });
        checkInfiniteLoop();
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, checkInfiniteLoop]);

  // Position initiale - FIX POUR MOBILE
  useEffect(() => {
    if (trackRef.current) {
      // Attendre que le DOM soit complètement chargé
      const timer = setTimeout(() => {
        const initialPosition = getPositionByIndex(0);
        setCurrentTranslate(initialPosition);
        setPrevTranslate(initialPosition);
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${initialPosition}px)`;
        }
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // Handlers pour le drag
  const handlePointerDown = (e) => {
    setIsDragging(true);
    setStartX(e.type.includes('mouse') ? e.pageX : e.touches[0].clientX);
    setPrevTranslate(currentTranslate);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grabbing';
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const diff = currentX - startX;
    const newTranslate = prevTranslate + diff;
    
    setCurrentTranslate(newTranslate);
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
      trackRef.current.style.transform = `translateX(${newTranslate}px)`;
    }
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setPrevTranslate(currentTranslate);
    
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.1s linear';
    }
    
    setTimeout(() => {
      checkInfiniteLoop();
    }, 100);
    
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
    }
  };

  return (
    <section className="video-carousel-section">
      <div className="carousel-header">
        <h1>agence memento</h1>
        <p className="carousel-subtitle">
          création photo et vidéo mémorable pour entreprises et particuliers
        </p>
      </div>

      <div className="carousel-container">
        <div 
          className="video-carousel-wrapper"
          ref={carouselRef}
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUp}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
          onTouchMove={handlePointerMove}
        >
          <div 
            className="video-carousel-track"
            ref={trackRef}
            style={{
              display: 'flex',
              gap: isMobile ? '1em' : '2em',
              willChange: 'transform'
            }}
          >
            {renderSlides()}
          </div>
        </div>
      </div>
      
      <div className="carousel-scroll-hint">
        <p>
          <span className="scroll-arrow">←</span>
          <span className="scroll-text"> parcourir </span>
          <span className="scroll-arrow">→</span>
        </p>
      </div>
    </section>
  );
};

export default VideoCarousel;