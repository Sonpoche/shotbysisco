import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import VideoCarousel from "../../components/VideoCarousel/VideoCarousel";
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
    // Nettoyage des animations GSAP qui ne sont plus necessaires
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <ReactLenis root>
      <div className="page home">
        <section className="hero">
          <div className="hero-img">
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            >
              <source src="https://videos.agencememento.com/home/memento-showreelnew-web.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        {/* Nouveau composant VideoCarousel remplace les sections sticky-titles et sticky-work-header */}
        <VideoCarousel />

        {/* Section des services avec liens vers la page Services - 3 SERVICES */}
        <section className="hobbies">
          <div className="services-header">
            <h2>racontez votre histoire</h2>
            <p className="services-subtitle">trois approches pour creer des histoires memorables</p>
          </div>
          
          <div className="home-tools-container">
            <div className="home-tools-row three-cards">
              {/* Lien vers Services - onglet Reseaux Sociaux */}
              <Link to="/services?service=reseaux-sociaux" className="home-tool-card">
                <div className="home-tool-bg">
                  <img src="https://videos.agencememento.com/Reseaux/marion-ryan-5-web.webp" alt="Réseaux sociaux" />
                </div>
                <h4>reseaux sociaux</h4>
                <p className="primary sm">contenus creatifs pour vos plateformes.</p>
              </Link>
              
              {/* Lien vers Services - onglet Evenementiel */}
              <Link to="/services?service=evenementiel" className="home-tool-card">
                <div className="home-tool-bg">
                  <img src="https://videos.agencememento.com/evenementiel/PandG-Final-Memento-45-web.webp" alt="Événementiel" />
                </div>
                <h4>evenementiel</h4>
                <p className="primary sm">entreprises, galas, lancements, soirees.</p>
              </Link>
              
              {/* Lien vers Services - onglet Prive */}
              <Link to="/services?service=prive" className="home-tool-card">
                <div className="home-tool-bg">
                  <img src="https://videos.agencememento.com/Prive/jeans-tournesol_0002_Generative_Fill-web.webp" alt="Privé" />
                </div>
                <h4>prive</h4>
                <p className="primary sm">mariages, portraits et instants de vie.</p>
              </Link>
            </div>
          </div>
        </section>

        <TrustedBy />
        <ContactForm />
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Transition(Home);  