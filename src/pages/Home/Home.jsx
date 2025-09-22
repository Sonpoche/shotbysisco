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
              <source src="https://videos.agencememento.com/test5-web.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        {/* Nouveau composant VideoCarousel remplace les sections sticky-titles et sticky-work-header */}
        <VideoCarousel />

        {/* Section des services avec liens vers la page Services - 3 SERVICES */}
        <section className="hobbies">
          <div className="services-header">
            <h2>racontez votre histoire</h2>
            <p className="services-subtitle">Trois approches pour creer des histoires memorables</p>
          </div>
          
          <div className="home-tools-container">
            <div className="home-tools-row three-cards">
              {/* Lien vers Services - onglet Réseaux Sociaux */}
              <Link to="/services?service=reseaux-sociaux" className="home-tool-card">
                <div className="home-tool-bg">
                  <img src="/about/tool-1.jpg" alt="" />
                </div>
                <h4>Reseaux Sociaux</h4>
                <p className="primary sm">Contenus creatifs pour vos plateformes.</p>
              </Link>
              
              {/* Lien vers Services - onglet Evenementiel */}
              <Link to="/services?service=evenementiel" className="home-tool-card">
                <div className="home-tool-bg">
                  <img src="/about/tool-2.jpg" alt="" />
                </div>
                <h4>Evenementiel</h4>
                <p className="primary sm">Entreprises, galas, lancements, soirees.</p>
              </Link>
              
              {/* Lien vers Services - onglet Privé */}
              <Link to="/services?service=prive" className="home-tool-card">
                <div className="home-tool-bg">
                  <img src="/about/tool-3.jpg" alt="" />
                </div>
                <h4>Prive</h4>
                <p className="primary sm">Mariages, portraits et instants de vie.</p>
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