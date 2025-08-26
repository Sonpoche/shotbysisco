import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Project.css";

import ParallaxImage from "../../components/ParallaxImage/ParallaxImage";
import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import ReactLenis from "lenis/react";
import Transition from "../../components/Transition/Transition";

// Import des données des projets
import projectsData from "../../data/projectsData";

const Project = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Trouver le projet actuel par son slug
  const currentProject = projectsData.find(project => project.slug === slug);
  
  // Si le projet n'existe pas, rediriger ou afficher le premier
  if (!currentProject) {
    // Redirect to first project or 404 page
    return (
      <div className="page project">
        <div style={{ padding: '4em 2em', textAlign: 'center' }}>
          <h2>Projet non trouvé</h2>
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
  };

  return (
    <ReactLenis root>
      <div className="page project">
        <section className="project-header">
          <AnimatedCopy
            delay={1}
            animateOnScroll={false}
            className="primary sm"
          >
            {currentProject.subtitle}
          </AnimatedCopy>
          <AnimatedCopy tag="h2" delay={1}>
            {currentProject.title}
          </AnimatedCopy>
        </section>

        <section className="project-banner-img">
          <div className="project-banner-img-wrapper">
            <ParallaxImage src={currentProject.bannerImage} alt={currentProject.title} />
          </div>
        </section>

        <section className="project-details">
          <div className="details">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
              Overview
            </AnimatedCopy>
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              {currentProject.description}
            </AnimatedCopy>
          </div>

          <div className="details">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
              Year
            </AnimatedCopy>
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              {currentProject.year}
            </AnimatedCopy>
          </div>

          <div className="details">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
              Category
            </AnimatedCopy>
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              {currentProject.category}
            </AnimatedCopy>
          </div>

          <div className="details">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
              {currentProject.mediaType === 'video' ? 'Running Time' : 'Format'}
            </AnimatedCopy>
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              {currentProject.runningTime}
            </AnimatedCopy>
          </div>

          <div className="details">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
              Directed by
            </AnimatedCopy>
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              {currentProject.details.director}
            </AnimatedCopy>
          </div>
        </section>

        <section className="project-images">
          <div className="project-images-container">
            {currentProject.images.map((image, index) => (
              <div key={index} className="project-img">
                <div className="project-img-wrapper">
                  <ParallaxImage src={image} alt={`${currentProject.title} - Image ${index + 1}`} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="project-details">
          <div className="details">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
              Editor
            </AnimatedCopy>
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              {currentProject.details.editor}
            </AnimatedCopy>
          </div>

          <div className="details">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
              Sound Design
            </AnimatedCopy>
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              {currentProject.details.soundDesign}
            </AnimatedCopy>
          </div>

          <div className="details">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
              Art Director
            </AnimatedCopy>
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              {currentProject.details.artDirector}
            </AnimatedCopy>
          </div>

          <div className="details">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
              Producer
            </AnimatedCopy>
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              {currentProject.details.producer}
            </AnimatedCopy>
          </div>

          <div className="details">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
              Director
            </AnimatedCopy>
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              {currentProject.details.director}
            </AnimatedCopy>
          </div>
        </section>

        {/* Section Next Project - MAINTENANT CLIQUABLE */}
        <section className="next-project" onClick={handleNextProject} style={{ cursor: 'pointer' }}>
          <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
            {String(currentIndex + 2).padStart(2, '0')} - {String(projectsData.length).padStart(2, '0')}
          </AnimatedCopy>
          <AnimatedCopy tag="h3" animateOnScroll={true}>
            Next
          </AnimatedCopy>

          <div className="next-project-img">
            <div className="next-project-img-wrapper">
              <ParallaxImage src={nextProject.thumbnail} alt={nextProject.title} />
            </div>
          </div>

          <AnimatedCopy tag="h4" animateOnScroll={true}>
            {nextProject.title}
          </AnimatedCopy>
        </section>
      </div>
    </ReactLenis>
  );
};

export default Transition(Project);