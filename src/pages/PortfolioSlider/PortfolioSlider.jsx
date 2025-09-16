import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import "./PortfolioSlider.css";
import Transition from "../../components/Transition/Transition";
import projects from "../../data/projects";
import projectsData from "../../data/projectsData";

const PortfolioSlider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Refs
  const sliderRef = useRef(null);
  const thumbnailWheelRef = useRef(null);
  const slidesRef = useRef([]);
  const thumbnailsRef = useRef([]);
  
  // State
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [currentTitle, setCurrentTitle] = useState("");
  
  // Animation variables
  const currentX = useRef(0);
  const targetX = useRef(0);
  const slideWidth = useRef(window.innerWidth * 0.45);
  const viewportCenter = useRef(window.innerWidth / 2);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);
  const animationId = useRef(null);
  
  // Configuration
  const endScale = 5;
  
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  // Fonction pour trouver le slug correspondant
  const findProjectSlug = (projectTitle) => {
    const projectWithSlug = projectsData.find(p => p.title === projectTitle);
    if (projectWithSlug) {
      return projectWithSlug.slug;
    }
    
    return projectTitle.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  };
  
  // Créer les slides
  const createSlides = () => {
    if (!sliderRef.current) return;
    
    sliderRef.current.innerHTML = '';
    slidesRef.current = [];
    
    // Créer 3x les slides pour l'effet infini
    for (let i = 0; i < filteredProjects.length * 3; i++) {
      const slide = document.createElement("div");
      slide.className = "portfolio-slide";
      
      const project = filteredProjects[i % filteredProjects.length];
      
      const mediaContainer = document.createElement("div");
      mediaContainer.className = "portfolio-slide-media";
      
      if (project.mediaType === "video" && project.media) {
        const video = document.createElement("video");
        video.src = project.media;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = "metadata";
        mediaContainer.appendChild(video);
      } else {
        const img = document.createElement("img");
        img.src = project.media || project.thumbnail;
        img.alt = project.title;
        img.loading = "lazy";
        mediaContainer.appendChild(img);
      }
      
      slide.appendChild(mediaContainer);
      
      // PAS de click handler sur les slides
      
      sliderRef.current.appendChild(slide);
      slidesRef.current.push(slide);
    }
  };
  
  // Créer la roue de miniatures avec moins d'écart
  const createThumbnailItems = () => {
    if (!thumbnailWheelRef.current) return;
    
    thumbnailWheelRef.current.innerHTML = '';
    thumbnailsRef.current = [];
    
    // Dupliquer pour réduire l'écart
    const duplicatedProjects = [...filteredProjects, ...filteredProjects];
    const totalThumbnails = duplicatedProjects.length;
    
    for (let i = 0; i < totalThumbnails; i++) {
      const project = duplicatedProjects[i % filteredProjects.length];
      const angle = (i / totalThumbnails) * Math.PI * 2;
      const radius = isMobile ? 100 : 350;
      const x = radius * Math.cos(angle) + window.innerWidth / 2;
      const y = radius * Math.sin(angle) + window.innerHeight / 2;
      
      const thumbnail = document.createElement("div");
      thumbnail.className = "portfolio-thumbnail-item";
      thumbnail.dataset.index = i;
      thumbnail.dataset.angle = angle;
      thumbnail.dataset.radius = radius;
      
      const img = document.createElement("img");
      img.src = project.thumbnail;
      img.alt = project.title;
      thumbnail.appendChild(img);
      
      gsap.set(thumbnail, {
        x,
        y,
        transformOrigin: "center center",
      });
      
      thumbnailWheelRef.current.appendChild(thumbnail);
      thumbnailsRef.current.push(thumbnail);
    }
  };
  
  // Initialiser le slider avec les bonnes largeurs mobile
  const initializeSlider = () => {
    if (!slidesRef.current.length) return;
    
    // LARGEURS DIFFÉRENTES MOBILE/DESKTOP
    if (window.innerWidth < 600) {
      slideWidth.current = window.innerWidth * 0.90; // 90% sur petit mobile
    } else if (window.innerWidth < 1000) {
      slideWidth.current = window.innerWidth * 0.85; // 85% sur tablette
    } else {
      slideWidth.current = window.innerWidth * 0.45; // 45% sur desktop
    }
    
    viewportCenter.current = window.innerWidth / 2;
    
    slidesRef.current.forEach((slide, index) => {
      const x = index * slideWidth.current - slideWidth.current;
      gsap.set(slide, { x: x });
    });
    
    const centerOffset = window.innerWidth / 2 - slideWidth.current / 2;
    currentX.current = centerOffset;
    targetX.current = centerOffset;
  };
  
  // Gestion du scroll
  const handleScroll = (e) => {
    e.preventDefault();
    const scrollIntensity = e.deltaY || e.detail || e.wheelDelta * -1;
    targetX.current -= scrollIntensity * 1;
    
    isScrolling.current = true;
    clearTimeout(scrollTimeout.current);
    
    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false;
    }, 150);
  };
  
  // Gestion du touch/swipe pour mobile
  useEffect(() => {
    if (!sliderRef.current) return;
    
    let startX = 0;
    let currentTouchX = 0;
    let isDragging = false;
    
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      currentTouchX = startX;
      isDragging = true;
    };
    
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      currentTouchX = e.touches[0].clientX;
      const diff = startX - currentTouchX;
      targetX.current -= diff * 0.5;
      startX = currentTouchX;
    };
    
    const handleTouchEnd = () => {
      isDragging = false;
    };
    
    const slider = sliderRef.current;
    slider.addEventListener('touchstart', handleTouchStart, { passive: true });
    slider.addEventListener('touchmove', handleTouchMove, { passive: true });
    slider.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      if (slider) {
        slider.removeEventListener('touchstart', handleTouchStart);
        slider.removeEventListener('touchmove', handleTouchMove);
        slider.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [filteredProjects]);
  
  // Animation principale
  const animate = () => {
    currentX.current += (targetX.current - currentX.current) * 0.1;
    
    const totalWidth = filteredProjects.length * slideWidth.current;
    if (currentX.current > 0) {
      currentX.current -= totalWidth;
      targetX.current -= totalWidth;
    } else if (currentX.current < -totalWidth) {
      currentX.current += totalWidth;
      targetX.current += totalWidth;
    }
    
    let centerSlideIndex = 0;
    let closestToCenter = Infinity;
    
    slidesRef.current.forEach((slide, index) => {
      const x = index * slideWidth.current + currentX.current;
      gsap.set(slide, { x: x });
      
      const slideCenterX = x + slideWidth.current / 2;
      const distanceFromCenter = Math.abs(slideCenterX - viewportCenter.current);
      
      // Gérer la lecture des vidéos
      const video = slide.querySelector('video');
      if (video) {
        if (distanceFromCenter < slideWidth.current * 1.5) {
          if (video.paused) {
            video.play().catch(() => {});
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      }
      
      // Adapter l'effet de zoom pour mobile
      const outerDistance = isMobile ? slideWidth.current * 1.5 : slideWidth.current * 3;
      const progress = Math.min(distanceFromCenter / outerDistance, 1);
      
      const easedProgress =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      // Scale réduit sur mobile
      const maxScale = isMobile ? 3 : endScale;
      const scale = 1 + easedProgress * (maxScale - 1);
      
      const media = slide.querySelector('.portfolio-slide-media');
      if (media) {
        gsap.set(media, { scale: scale });
      }
      
      // Trouver le slide le plus proche du centre
      if (distanceFromCenter < closestToCenter) {
        closestToCenter = distanceFromCenter;
        centerSlideIndex = index % filteredProjects.length;
      }
    });
    
    // Mettre à jour le titre
    const currentProject = filteredProjects[centerSlideIndex];
    if (currentProject) {
      setCurrentTitle(currentProject.title);
    }
    
    setActiveSlideIndex(centerSlideIndex);
    updateThumbnailItems();
    
    animationId.current = requestAnimationFrame(animate);
  };
  
  // Mise à jour de la roue de miniatures
  const updateThumbnailItems = () => {
    const exactSlideProgress = Math.abs(currentX.current) / slideWidth.current;
    const duplicatedProjects = [...filteredProjects, ...filteredProjects];
    const totalThumbnails = duplicatedProjects.length;
    const currentRotationAngle = -(exactSlideProgress * (360 / filteredProjects.length)) + 90;
    
    thumbnailsRef.current.forEach((thumbnail) => {
      const baseAngle = parseFloat(thumbnail.dataset.angle);
      const radius = isMobile ? 150 : 350;
      const currentAngle = baseAngle + (currentRotationAngle * Math.PI) / 180;
      
      const x = radius * Math.cos(currentAngle) + window.innerWidth / 2;
      const y = radius * Math.sin(currentAngle) + window.innerHeight / 2;
      
      gsap.set(thumbnail, {
        x: x,
        y: y,
        rotation: 0,
        transformOrigin: "center center",
      });
    });
  };
  
  // Filtrer les projets par catégorie
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') || 'all';
    setActiveCategory(category);
    
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(p => p.category === category);
      setFilteredProjects(filtered);
    }
  }, [location.search]);
  
  // Initialiser le titre au démarrage
  useEffect(() => {
    if (filteredProjects.length > 0) {
      setCurrentTitle(filteredProjects[0].title);
    }
  }, [filteredProjects]);
  
  // Initialisation
  useEffect(() => {
    if (filteredProjects.length === 0) return;
    
    createSlides();
    createThumbnailItems();
    initializeSlider();
    animate();
    
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [filteredProjects, isMobile]);
  
  // Event listeners avec mise à jour des largeurs
  useEffect(() => {
    const handleResize = () => {
      const wasWobile = isMobile;
      const isNowMobile = window.innerWidth < 1000;
      setIsMobile(isNowMobile);
      
      // Recalculer les largeurs
      if (window.innerWidth < 600) {
        slideWidth.current = window.innerWidth * 0.80; // 80% au lieu de 90%
      } else if (window.innerWidth < 1000) {
        slideWidth.current = window.innerWidth * 0.75; // 75% au lieu de 85%
      } else {
        slideWidth.current = window.innerWidth * 0.45;
      }
      
      viewportCenter.current = window.innerWidth / 2;
      
      // Réinitialiser si changement mobile/desktop
      if (wasWobile !== isNowMobile) {
        createThumbnailItems();
      }
      initializeSlider();
    };
    
    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(scrollTimeout.current);
    };
  }, [isMobile]);
  
  return (
    <div className="portfolio-slider-container">
      {/* Slider principal */}
      <div className="portfolio-slider" ref={sliderRef}></div>
      
      {/* Titre centré avec lien cliquable */}
      <p 
        className="portfolio-slide-title"
        onClick={() => {
          if (currentTitle) {
            const slug = findProjectSlug(currentTitle);
            navigate(`/projects/${slug}`);
          }
        }}
        style={{ cursor: 'pointer', pointerEvents: 'auto' }}
      >
        {currentTitle}
      </p>
      
      {/* Roue de miniatures */}
      <div className="portfolio-thumbnail-wheel" ref={thumbnailWheelRef}></div>
    </div>
  );
};

export default Transition(PortfolioSlider);