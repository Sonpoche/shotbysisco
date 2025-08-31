import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import VideoCarousel from "../../components/VideoCarousel/VideoCarousel"; // Import du nouveau composant
import TrustedBy from "../../components/Reviews/TrustedBy";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

import Transition from "../../components/Transition/Transition";

const Home = () => {
  useEffect(() => {
    // Nettoyage des animations GSAP qui ne sont plus nécessaires
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <ReactLenis root>
      <div className="page home">
        <section className="hero">
          <div className="hero-img">
            <img src="/home/hero.jpg" alt="" />
          </div>

          <div className="hero-header">
            <AnimatedCopy tag="h1" animateOnScroll={false} delay={0.7}>
              creating memorable visuals stories
            </AnimatedCopy>
            <AnimatedCopy tag="h1" animateOnScroll={false} delay={0.8}>
            
            </AnimatedCopy>
          </div>
        </section>

        {/* Nouveau composant VideoCarousel remplace les sections sticky-titles et sticky-work-header */}
        <VideoCarousel />

        <TrustedBy />

        {/* Section des services avec liens vers le portfolio */}
        <section className="hobbies">
          <div className="home-tools-container">
            <div className="home-tools-row">
              {/* Lien vers Portfolio - onglet Vidéos */}
              <Link to="/portfolio?category=videos" className="home-tool-card">
                <div className="home-tool-bg">
                  <img src="/about/tool-1.jpg" alt="" />
                </div>
                <h4>Videos</h4>
                <p className="primary sm">Production Audiovisuelle</p>
              </Link>
              
              {/* Lien vers Portfolio - onglet Photos */}
              <Link to="/portfolio?category=photos" className="home-tool-card">
                <div className="home-tool-bg">
                  <img src="/about/tool-2.jpg" alt="" />
                </div>
                <h4>Photos</h4>
                <p className="primary sm">Prise de Vue</p>
              </Link>
              
              {/* Lien vers Portfolio - onglet Design */}
              <Link to="/portfolio?category=design" className="home-tool-card">
                <div className="home-tool-bg">
                  <img src="/about/tool-3.jpg" alt="" />
                </div>
                <h4>Design</h4>
                <p className="primary sm">Direction Artistique</p>
              </Link>
              
              {/* Lien vers Portfolio - onglet Clips */}
              <Link to="/portfolio?category=clip" className="home-tool-card">
                <div className="home-tool-bg">
                  <img src="/about/tool-4.jpg" alt="" />
                </div>
                <h4>Clips</h4>
                <p className="primary sm">Vidéo Musicale</p>
              </Link>
            </div>
          </div>
        </section>

        <ContactForm />
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Transition(Home);