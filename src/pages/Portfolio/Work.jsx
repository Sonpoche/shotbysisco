import projects from "../../data/projects";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Work.css";

import { gsap } from "gsap";

import Transition from "../../components/Transition/Transition";

const Work = () => {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselInfoRef = useRef(null);
  const mediaRef = useRef(null);
  const navigate = useNavigate();

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

        <div className="work-items-preview-container">
          {projects.map((project) => (
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

        <div className="carousel-info" ref={carouselInfoRef}>
          <div className="carousel-description">
            <p className="primary sm">{activeProject.description}</p>
          </div>
          <div className="carousel-title">
            <div 
              className="project-title-container"
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