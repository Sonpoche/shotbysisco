import projects from "../../data/projects";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Work.css";

import { gsap } from "gsap";

import Transition from "../../components/Transition/Transition";

const Work = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Catégories disponibles
  const categories = [
    { id: "all", label: "Tout" },
    { id: "photos", label: "Photos" },
    { id: "videos", label: "Vidéos" },
    { id: "clip", label: "Clips" },
    { id: "design", label: "Design" },
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
  
  const carouselInfoRef = useRef(null);
  const mediaRef = useRef(null);
  const thumbnailsWrapperRef = useRef(null);

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

  // Filtrer les projets selon la catégorie
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.category === activeCategory
      );
      setFilteredProjects(filtered);
      
      // Si le projet actif n'est pas dans la catégorie filtrée, prendre le premier
      if (filtered.length > 0 && !filtered.some(p => p.id === activeProject.id)) {
        handleWorkItemClick(filtered[0]);
      }
    }
    // Reset le slide quand on change de catégorie
    setCurrentSlide(0);
  }, [activeCategory]);

  // Calculer le nombre de slides pour mobile (3 thumbnails par slide)
  const thumbnailsPerSlide = 3;
  const totalSlides = Math.ceil(filteredProjects.length / thumbnailsPerSlide);

  // Gérer le swipe/slide sur mobile
  useEffect(() => {
    if (isMobile && thumbnailsWrapperRef.current) {
      const slideWidth = 100 / thumbnailsPerSlide;
      const offset = -currentSlide * 100;
      thumbnailsWrapperRef.current.style.transform = `translateX(${offset}%)`;
    }
  }, [currentSlide, isMobile]);

  // Animation lors du changement de projet
  useEffect(() => {
    if (!isAnimating) return;

    // Animation d'entrée
    gsap.fromTo(
      carouselInfoRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => setIsAnimating(false),
      }
    );

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
      }
    );
  }, [activeProject, isAnimating]);

  const handleWorkItemClick = (project) => {
    if (project.id !== activeProject.id && !isAnimating) {
      // Animation de sortie
      gsap.to(carouselInfoRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: "power2.in",
      });

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
      // Animation de transition
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

  // Touch/Swipe handling pour mobile
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
      const threshold = 50; // Minimum swipe distance
      
      if (Math.abs(diff) > threshold) {
        if (diff > 0 && currentSlide < totalSlides - 1) {
          // Swipe left - next slide
          setCurrentSlide(prev => prev + 1);
        } else if (diff < 0 && currentSlide > 0) {
          // Swipe right - previous slide
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
    <div className="page work">
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
            >
              <source src={activeProject.media} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img 
              key={`img-${activeProject.id}`}
              src={activeProject.media} 
              alt={activeProject.title} 
            />
          )}
        </div>

        {/* Tabs de catégories */}
        <div className="work-categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-tab ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="work-items-preview-container">
          <div className="thumbnails-wrapper" ref={thumbnailsWrapperRef}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`work-item ${
                  activeProject.id === project.id ? "active" : ""
                }`}
                onClick={() => handleWorkItemClick(project)}
              >
                <img src={project.thumbnail} alt={project.title} />
                {project.mediaType === "video" && (
                  <div className="video-indicator">
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
          <div className="thumbnail-dots">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="carousel-info" ref={carouselInfoRef}>
          <div className="carousel-description">
            <p className="primary sm">{activeProject.description}</p>
          </div>
          <div className="carousel-title">
            <div 
              className="project-title-container"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate("/sample-project")}
            >
              <h1>{activeProject.title}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transition(Work);