import projects from "../../data/projects";
import projectsData from "../../data/projectsData";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Work.css";

import { gsap } from "gsap";

const Work = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Catégories disponibles
  const categories = [
    { id: "all", label: "tout" },
    { id: "evenementiel", label: "evenementiel" },
    { id: "reseaux", label: "reseaux" },
    { id: "prive", label: "prive" },
  ];

  // Récupérer la catégorie depuis l'URL ou utiliser "all" par défaut
  const getCategoryFromLocation = () => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    return category && categories.some(cat => cat.id === category) ? category : "all";
  };

  const [activeCategory, setActiveCategory] = useState(getCategoryFromLocation());
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  
  const portfolioInfoRef = useRef(null);
  const mediaRef = useRef(null);
  const thumbnailsWrapperRef = useRef(null);
  const containerRef = useRef(null);

  // Métadonnées SEO selon la catégorie active
  const getSEOData = () => {
    const seoData = {
      all: {
        title: "Portfolio Agence Memento Genève | Réalisations Photo & Vidéo",
        description: "Découvrez nos réalisations photo et vidéo : mariages, événements corporate, contenus réseaux sociaux. Portfolio complet de l'Agence Memento basée à Genève, Suisse.",
        keywords: "portfolio photographe genève, réalisations vidéo suisse, galerie photo mariage, travaux agence communication genève",
        canonical: "https://agencememento.com/portfolio"
      },
      evenementiel: {
        title: "Portfolio Événementiel | Photos & Vidéos Corporate Genève",
        description: "Nos réalisations événementielles : galas, conférences, séminaires et événements d'entreprise à Genève. Photos et vidéos professionnelles.",
        keywords: "portfolio événementiel genève, photos corporate, vidéos entreprise suisse, reportage événement",
        canonical: "https://agencememento.com/portfolio?category=evenementiel"
      },
      reseaux: {
        title: "Portfolio Réseaux Sociaux | Contenus Instagram TikTok LinkedIn",
        description: "Découvrez nos créations pour réseaux sociaux : contenus Instagram, TikTok, LinkedIn. Production photo et vidéo optimisée pour le digital.",
        keywords: "portfolio social media, contenus instagram genève, création tiktok suisse, production réseaux sociaux",
        canonical: "https://agencememento.com/portfolio?category=reseaux"
      },
      prive: {
        title: "Portfolio Mariages & Événements Privés | Photographe Genève",
        description: "Nos plus belles réalisations de mariages, portraits et événements privés à Genève. Photos et vidéos d'émotion capturées avec passion.",
        keywords: "portfolio mariage genève, photos mariage suisse, vidéo mariage, photographe portrait",
        canonical: "https://agencememento.com/portfolio?category=prive"
      }
    };
    return seoData[activeCategory] || seoData.all;
  };

  const currentSEO = getSEOData();

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mettre à jour la catégorie quand l'URL change
  useEffect(() => {
    const newCategory = getCategoryFromLocation();
    if (newCategory !== activeCategory) {
      setActiveCategory(newCategory);
    }
  }, [location.search]);

  // Vérifier si on a besoin du scroll (desktop uniquement)
  useEffect(() => {
    const checkScroll = () => {
      if (!isMobile && containerRef.current && thumbnailsWrapperRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const wrapperWidth = thumbnailsWrapperRef.current.scrollWidth;
        setHasScroll(wrapperWidth > containerWidth);
      }
    };
    
    checkScroll();
    const timer = setTimeout(checkScroll, 100);
    
    return () => clearTimeout(timer);
  }, [filteredProjects, isMobile]);

  // Filtrer les projets selon la catégorie
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.category === activeCategory
      );
      setFilteredProjects(filtered);
      
      if (filtered.length > 0 && !filtered.some(p => p.id === activeProject.id)) {
        handleWorkItemClick(filtered[0]);
      }
    }
    setCurrentSlide(0);
  }, [activeCategory]);

  const thumbnailsPerSlide = 3;
  const totalSlides = Math.ceil(filteredProjects.length / thumbnailsPerSlide);

  useEffect(() => {
    if (isMobile && thumbnailsWrapperRef.current) {
      const slideWidth = 100 / thumbnailsPerSlide;
      const offset = -currentSlide * 100;
      thumbnailsWrapperRef.current.style.transform = `translateX(${offset}%)`;
    }
  }, [currentSlide, isMobile]);

  useEffect(() => {
    if (!isAnimating) return;

    gsap.fromTo(
      mediaRef.current,
      {
        opacity: 0,
        scale: 1.1,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: () => setIsAnimating(false),
      }
    );
  }, [activeProject, isAnimating]);

  const handleWorkItemClick = (project) => {
    if (project.id !== activeProject.id && !isAnimating) {
      gsap.to(mediaRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setActiveProject(project);
          setIsAnimating(true);
        },
      });
    }
  };

  const handleCategoryChange = (categoryId) => {
    if (categoryId !== activeCategory) {
      gsap.to(".work-items-preview-container", {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setActiveCategory(categoryId);
          gsap.to(".work-items-preview-container", {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });
    }
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isMobile || !thumbnailsWrapperRef.current) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      
      const diff = startX - currentX;
      const threshold = 50;
      
      if (Math.abs(diff) > threshold) {
        if (diff > 0 && currentSlide < totalSlides - 1) {
          setCurrentSlide(prev => prev + 1);
        } else if (diff < 0 && currentSlide > 0) {
          setCurrentSlide(prev => prev - 1);
        }
      }
    };

    const wrapper = thumbnailsWrapperRef.current;
    wrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
    wrapper.addEventListener('touchmove', handleTouchMove, { passive: true });
    wrapper.addEventListener('touchend', handleTouchEnd);

    return () => {
      if (wrapper) {
        wrapper.removeEventListener('touchstart', handleTouchStart);
        wrapper.removeEventListener('touchmove', handleTouchMove);
        wrapper.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isMobile, currentSlide, totalSlides]);

  return (
    <>
      <Helmet>
        {/* Métadonnées SEO dynamiques selon la catégorie */}
        <title>{currentSEO.title}</title>
        <meta name="description" content={currentSEO.description} />
        <meta name="keywords" content={currentSEO.keywords} />
        
        {/* Open Graph */}
        <meta property="og:title" content={currentSEO.title} />
        <meta property="og:description" content={currentSEO.description} />
        <meta property="og:image" content={activeProject.thumbnail} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentSEO.canonical} />
        <meta property="og:locale" content="fr_CH" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentSEO.title} />
        <meta name="twitter:description" content={currentSEO.description} />
        <meta name="twitter:image" content={activeProject.thumbnail} />
        
        {/* Géolocalisation */}
        <meta name="geo.region" content="CH-GE" />
        <meta name="geo.placename" content="Genève" />
        
        {/* Canonical */}
        <link rel="canonical" href={currentSEO.canonical} />
        
        {/* Schema.org ImageGallery */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": currentSEO.title,
            "description": currentSEO.description,
            "url": currentSEO.canonical,
            "provider": {
              "@type": "ProfessionalService",
              "name": "Agence Memento",
              "telephone": "+41799465325",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Genève",
                "addressRegion": "GE",
                "addressCountry": "CH"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="page work">
        {/* H1 caché pour SEO */}
        <h1 style={{ 
          position: 'absolute', 
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}>
          {currentSEO.title}
        </h1>

        <div className="work-carousel">
          <div className="work-slider-media" ref={mediaRef}>
            {activeProject.mediaType === "video" ? (
              <video 
                key={`video-${activeProject.id}`}
                autoPlay 
                loop 
                muted 
                playsInline
                preload="auto"
                onLoadedData={(e) => e.target.play()}
                aria-label={`Vidéo projet ${activeProject.title}`}
              >
                <source src={activeProject.media} type="video/mp4" />
                Votre navigateur ne supporte pas les vidéos HTML5.
              </video>
            ) : (
              <img 
                key={`img-${activeProject.id}`}
                src={activeProject.media} 
                alt={`Projet ${activeProject.title} - ${activeCategory}`}
              />
            )}
          </div>

          {/* Tabs de catégories */}
          <nav className="work-categories" aria-label="Filtres catégories portfolio">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-tab ${
                  activeCategory === category.id ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(category.id)}
                aria-label={`Filtrer par ${category.label}`}
              >
                {category.label}
              </button>
            ))}
          </nav>

          <div className={`work-items-preview-container ${hasScroll && !isMobile ? 'has-scroll' : ''}`} ref={containerRef}>
            <div className="thumbnails-wrapper" ref={thumbnailsWrapperRef}>
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className={`work-item ${
                    activeProject.id === project.id ? "active" : ""
                  }`}
                  onClick={() => handleWorkItemClick(project)}
                  role="button"
                  aria-label={`Voir le projet ${project.title}`}
                >
                  <img 
                    src={project.thumbnail} 
                    alt={`Miniature projet ${project.title}`}
                    loading="lazy"
                  />
                  {project.mediaType === "video" && (
                    <div className="video-indicator" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots pour mobile */}
          {isMobile && totalSlides > 1 && (
            <div className="thumbnail-dots" role="navigation" aria-label="Navigation miniatures">
              {[...Array(totalSlides)].map((_, index) => (
                <button
                  key={index}
                  className={`dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Aller à la page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Work;