import React, { useRef, useState, useEffect } from 'react';
import './VideoCarousel.css';

const VideoCarousel = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Base videos
  const baseVideos = [
    {
      id: 1,
      src: "https://res.cloudinary.com/drochrcnp/video/upload/v1755871102/test-cloudinary_u7pfrp.mp4",
      title: "emotions",
      subtitle: "Visual Poetry"
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/drochrcnp/video/upload/v1755871175/test3-cloudinary_pqj87v.mp4",
      title: "vision",
      subtitle: "Creative Direction"
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/drochrcnp/video/upload/v1755871178/test2-cloudinary_ymwk8o.mp4",
      title: "qualite",
      subtitle: "Premium Content"
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/drochrcnp/video/upload/v1755871102/test-cloudinary_u7pfrp.mp4",
      title: "stories",
      subtitle: "Brand Narrative"
    },
    {
      id: 5,
      src: "https://res.cloudinary.com/drochrcnp/video/upload/v1755871175/test3-cloudinary_pqj87v.mp4",
      title: "moments",
      subtitle: "Captured Beauty"
    },
    {
      id: 6,
      src: "https://res.cloudinary.com/drochrcnp/video/upload/v1755871178/test2-cloudinary_ymwk8o.mp4",
      title: "art",
      subtitle: "Visual Expression"
    },
    {
      id: 7,
      src: "https://res.cloudinary.com/drochrcnp/video/upload/v1755871102/test-cloudinary_u7pfrp.mp4",
      title: "creative",
      subtitle: "Brand Story"
    },
    {
      id: 8,
      src: "https://res.cloudinary.com/drochrcnp/video/upload/v1755871175/test3-cloudinary_pqj87v.mp4",
      title: "design",
      subtitle: "Art Direction"
    }
  ];

  // Créer 5 copies pour un meilleur infini
  const videos = [
    ...baseVideos.map((v, i) => ({ ...v, id: `${v.id}-left2-${i}` })),
    ...baseVideos.map((v, i) => ({ ...v, id: `${v.id}-left-${i}` })),
    ...baseVideos.map((v, i) => ({ ...v, id: `${v.id}-center-${i}` })),
    ...baseVideos.map((v, i) => ({ ...v, id: `${v.id}-right-${i}` })),
    ...baseVideos.map((v, i) => ({ ...v, id: `${v.id}-right2-${i}` }))
  ];

  // Auto-scroll avec scroll infini
  useEffect(() => {
    let animationId;
    
    const animate = () => {
      if (!isDragging && carouselRef.current) {
        // Auto-scroll
        carouselRef.current.scrollLeft += 0.5;
        
        // Gestion du scroll infini
        const scrollLeft = carouselRef.current.scrollLeft;
        const scrollWidth = carouselRef.current.scrollWidth;
        const clientWidth = carouselRef.current.clientWidth;
        const oneSetWidth = scrollWidth / 5;
        
        // Si on est trop à droite, on revient au milieu
        if (scrollLeft > oneSetWidth * 3.5) {
          carouselRef.current.scrollLeft = scrollLeft - oneSetWidth * 2;
        }
        // Si on est trop à gauche, on saute au milieu
        else if (scrollLeft < oneSetWidth * 0.5) {
          carouselRef.current.scrollLeft = scrollLeft + oneSetWidth * 2;
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
  }, [isDragging]);

  // Initialisation - position de départ
  useEffect(() => {
    if (carouselRef.current) {
      setTimeout(() => {
        const scrollWidth = carouselRef.current.scrollWidth;
        const oneSetWidth = scrollWidth / 5;
        carouselRef.current.scrollLeft = oneSetWidth * 2;
      }, 100);
    }
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.cursor = 'grabbing';
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (carouselRef.current) carouselRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (carouselRef.current) carouselRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <>
      {/* Section simplifiée avec titre et carousel */}
      <section className="video-carousel-section">
        <div className="carousel-header">
          <h1>creating memorable visual stories</h1>
          <p className="carousel-subtitle">
            Boost your brand with high-impact short videos
          </p>
        </div>

        <div className="carousel-container">
          <div 
            className="video-carousel-wrapper"
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="video-carousel-track">
              {videos.map((video) => (
                <div key={video.id} className="video-card">
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
                      <p className="primary sm">{video.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradients masks pour l'effet de fondu sur les côtés */}
          <div className="carousel-gradient-left"></div>
          <div className="carousel-gradient-right"></div>
        </div>
        
        {/* Indicateur de scroll */}
        <div className="carousel-scroll-hint">
          <p className="primary sm">← drag to control →</p>
        </div>
      </section>
    </>
  );
};

export default VideoCarousel;