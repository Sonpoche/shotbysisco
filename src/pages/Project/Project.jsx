import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Project.css";

import ParallaxImage from "../../components/ParallaxImage/ParallaxImage";
import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import ReactLenis from "lenis/react";

// Import des données des projets
import projectsData from "../../data/projectsData";

const Project = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const videoRefs = useRef([]);
  const [mediaOrder, setMediaOrder] = useState([]);
  
  // Trouver le projet actuel par son slug
  const currentProject = projectsData.find(project => project.slug === slug);
  
  // Si le projet n'existe pas, rediriger
  if (!currentProject) {
    return (
      <div className="page project">
        <div style={{ padding: '4em 2em', textAlign: 'center' }}>
          <h2>Projet non trouve</h2>
          <button onClick={() => navigate('/portfolio')}>
            Retour au portfolio
          </button>
        </div>
      </div>
    );
  }
  
  // Trouver le projet suivant (ou retourner au premier si on est au dernier)
  const currentIndex = projectsData.findIndex(p => p.id === currentProject.id);
  const nextProject = projectsData[currentIndex + 1] || projectsData[0];
  
  // Fonction pour naviguer vers le projet suivant
  const handleNextProject = () => {
    navigate(`/projects/${nextProject.slug}`);
    window.scrollTo(0, 0);
  };

  // Déterminer le type de média
  const getMediaType = (url) => {
    if (!url) return 'image';
    const extension = url.split('.').pop().toLowerCase();
    return ['mp4', 'webm', 'mov'].includes(extension) ? 'video' : 'image';
  };

  // Fonction pour enlever les accents et caractères spéciaux
  const removeAccents = (str) => {
    if (!str) return '';
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[àâäÀÂÄ]/g, "a")
      .replace(/[éèêëÉÈÊË]/g, "e")
      .replace(/[îïÎÏ]/g, "i")
      .replace(/[ôöÔÖ]/g, "o")
      .replace(/[ùûüÙÛÜ]/g, "u")
      .replace(/[ÿŸ]/g, "y")
      .replace(/[çÇ]/g, "c")
      .replace(/[ñÑ]/g, "n")
      .replace(/[''"]/g, "")
      .replace(/[&]/g, "et");
  };

  // Créer l'ordre de la galerie maçonnerie - UNIQUEMENT les médias du projet actuel
  useEffect(() => {
    const createMasonryOrder = () => {
      const items = [];
      
      // N'utiliser QUE les images du projet ACTUEL
      if (currentProject.images && currentProject.images.length > 0) {
        // Première moitié des images avant la vidéo principale
        const halfIndex = Math.floor(currentProject.images.length / 2);
        
        for (let i = 0; i < halfIndex; i++) {
          items.push({
            src: currentProject.images[i],
            type: getMediaType(currentProject.images[i]),
            className: i % 3 === 0 ? 'vertical' : i % 3 === 1 ? 'square' : 'horizontal'
          });
        }
        
        // Ajouter le média principal au centre
        if (currentProject.media) {
          items.push({
            src: currentProject.media,
            type: getMediaType(currentProject.media),
            className: 'hero-item',
            isMain: true
          });
        }
        
        // Deuxième moitié des images après la vidéo principale
        for (let i = halfIndex; i < currentProject.images.length; i++) {
          items.push({
            src: currentProject.images[i],
            type: getMediaType(currentProject.images[i]),
            className: i % 3 === 0 ? 'square' : i % 3 === 1 ? 'vertical' : 'horizontal'
          });
        }
      } else {
        // Si pas d'images, juste le média principal
        if (currentProject.media) {
          items.push({
            src: currentProject.media,
            type: getMediaType(currentProject.media),
            className: 'hero-item',
            isMain: true
          });
        }
      }
      
      setMediaOrder(items);
    };
    
    createMasonryOrder();
  }, [currentProject]); // Refaire quand le projet change

  // Animation au scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.media-item, .project-description, .credit-item');
    elementsToAnimate.forEach(el => observer.observe(el));

    return () => {
      elementsToAnimate.forEach(el => observer.unobserve(el));
    };
  }, [mediaOrder]);

  // Hover effects pour vidéos
  const handleVideoHover = (index, action) => {
    if (videoRefs.current[index]) {
      if (action === 'play') {
        videoRefs.current[index].play();
      } else {
        videoRefs.current[index].pause();
      }
    }
  };

  return (
    <ReactLenis root>
      <div className="page project">
        {/* Header avec titre CENTRÉ */}
        <section className="project-header" style={{ textAlign: 'center' }}>
          <AnimatedCopy tag="h2" delay={0.3} animateOnScroll={false}>
            {removeAccents(currentProject.title)}
          </AnimatedCopy>
          <AnimatedCopy 
            tag="p" 
            className="subtitle"
            delay={0.5}
            animateOnScroll={false}
          >
            {removeAccents(currentProject.subtitle)}
          </AnimatedCopy>
        </section>

        {/* Description du projet */}
        <section className="project-description">
          <AnimatedCopy 
            tag="p" 
            className="description-text"
            animateOnScroll={true}
          >
            {removeAccents(currentProject.description).toLowerCase()}
          </AnimatedCopy>
        </section>

        {/* Galerie Maçonnerie - UNIQUEMENT les médias du projet actuel */}
        <section className="project-gallery">
          <div className="masonry-grid">
            {mediaOrder.map((item, index) => (
              <div 
                key={`${currentProject.id}-${index}`} 
                className={`media-item ${item.className} ${item.isMain ? 'main-media' : ''}`}
                onMouseEnter={() => item.type === 'video' && !item.isMain && handleVideoHover(index, 'play')}
                onMouseLeave={() => item.type === 'video' && !item.isMain && handleVideoHover(index, 'pause')}
              >
                {item.type === 'video' ? (
                  <video 
                    ref={el => videoRefs.current[index] = el}
                    muted 
                    loop 
                    playsInline
                    autoPlay={true} // Toujours autoplay pour toutes les vidéos
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={item.src} 
                    alt={`${currentProject.title} - ${index + 1}`}
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Tags flottants */}
        <div className="floating-tags">
          <div className="tag">{currentProject.year}</div>
          <div className="tag">{currentProject.runningTime}</div>
          <div className="tag">{removeAccents(currentProject.category)}</div>
        </div>

        {/* Crédits minimalistes */}
        <section className="project-credits">
          <AnimatedCopy 
            tag="h3" 
            className="credits-title"
            animateOnScroll={true}
          >
            credits
          </AnimatedCopy>
          
          <div className="credit-item">
            <AnimatedCopy 
              tag="p" 
              className="credit-label"
              animateOnScroll={true}
            >
              realisation et production
            </AnimatedCopy>
            <AnimatedCopy 
              tag="h4" 
              className="credit-value"
              animateOnScroll={true}
            >
              agence memento
            </AnimatedCopy>
          </div>
          
          <div className="credit-item">
            <AnimatedCopy 
              tag="p" 
              className="credit-label"
              animateOnScroll={true}
            >
              direction artistique
            </AnimatedCopy>
            <AnimatedCopy 
              tag="h4" 
              className="credit-value"
              animateOnScroll={true}
            >
              memento studio
            </AnimatedCopy>
          </div>
          
          {currentProject.mediaType === 'video' && (
            <div className="credit-item">
              <AnimatedCopy 
                tag="p" 
                className="credit-label"
                animateOnScroll={true}
              >
                post-production
              </AnimatedCopy>
              <AnimatedCopy 
                tag="h4" 
                className="credit-value"
                animateOnScroll={true}
              >
                memento geneve
              </AnimatedCopy>
            </div>
          )}
        </section>

        {/* Next Project avec le BON média */}
        <section className="next-project" onClick={handleNextProject}>
          <AnimatedCopy 
            tag="p" 
            className="next-label"
            animateOnScroll={true}
          >
            projet suivant • {String(currentIndex + 2).padStart(2, '0')}/{String(projectsData.length).padStart(2, '0')}
          </AnimatedCopy>
          
          <AnimatedCopy 
            tag="h2" 
            className="next-title"
            animateOnScroll={true}
          >
            {removeAccents(nextProject.title)}
          </AnimatedCopy>
          
          <div className="next-project-img">
            <div className="next-project-img-wrapper">
              {/* Utiliser le média principal si c'est une vidéo, sinon thumbnail */}
              {getMediaType(nextProject.media) === 'video' ? (
                <video 
                  muted 
                  loop 
                  playsInline
                  autoPlay
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
                  <source src={nextProject.media} type="video/mp4" />
                </video>
              ) : (
                <img 
                  src={nextProject.media || nextProject.thumbnail} 
                  alt={nextProject.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </ReactLenis>
  );
};

export default Project;