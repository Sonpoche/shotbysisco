import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Home.css";

import VideoCarousel from "../../components/VideoCarousel/VideoCarousel";
import TrustedBy from "../../components/Reviews/TrustedBy";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  useEffect(() => {
    // Détection du changement de taille d'écran
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);

    // Nettoyage des animations GSAP
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // URLs des vidéos optimisées
  const videoSrc = isMobile 
    ? "https://videos.agencememento.com/home/optimized/memento-showreelnew-mobile.mp4"
    : "https://videos.agencememento.com/home/optimized/memento-showreelnew-desktop.mp4";

  return (
    <>
      <Helmet>
        {/* Titre optimisé pour Genève */}
        <title>Agence Memento | Vidéaste & Photographe Genève | Production Vidéo Suisse</title>
        
        {/* Description optimisée avec mots-clés locaux */}
        <meta 
          name="description" 
          content="Agence de communication visuelle à Genève. Production vidéo et photo pour mariages, événements corporate et réseaux sociaux. Photographe et vidéaste professionnels en Suisse romande." 
        />
        
        {/* Mots-clés ciblés Genève */}
        <meta 
          name="keywords" 
          content="photographe genève, vidéaste genève, photographe mariage suisse, vidéo entreprise genève, production vidéo suisse, agence communication genève, photographe événementiel, contenu réseaux sociaux" 
        />
        
        {/* Open Graph pour partages sociaux */}
        <meta property="og:title" content="Agence Memento - Vidéaste & Photographe à Genève" />
        <meta property="og:description" content="Production vidéo et photo premium à Genève pour vos mariages, événements d'entreprise et contenus digitaux." />
        <meta property="og:image" content="https://videos.agencememento.com/Reseaux/marion-ryan-5-web.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://agencememento.com" />
        <meta property="og:locale" content="fr_CH" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Agence Memento - Production Vidéo & Photo Genève" />
        <meta name="twitter:description" content="Créateurs d'histoires visuelles à Genève. Mariages, événements corporate, réseaux sociaux." />
        <meta name="twitter:image" content="https://videos.agencememento.com/Reseaux/marion-ryan-5-web.webp" />
        
        {/* Géolocalisation pour SEO local */}
        <meta name="geo.region" content="CH-GE" />
        <meta name="geo.placename" content="Genève" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://agencememento.com" />
        
        {/* Hreflang pour le français suisse */}
        <link rel="alternate" hrefLang="fr-CH" href="https://agencememento.com" />
        
        {/* Préchargement vidéo hero pour performance */}
        <link 
          rel="preload" 
          as="video" 
          href={videoSrc}
          type="video/mp4"
        />
        
        {/* Schema.org JSON-LD pour Google */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Agence Memento",
            "description": "Agence de communication visuelle spécialisée en production vidéo et photo à Genève",
            "url": "https://agencememento.com",
            "telephone": "+41799465325",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Genève",
              "addressRegion": "GE",
              "addressCountry": "CH"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "46.2044",
              "longitude": "6.1432"
            },
            "areaServed": ["Genève", "Vaud", "Suisse"],
            "serviceType": ["Photographie", "Vidéographie", "Production vidéo", "Réseaux sociaux", "Événementiel"],
            "priceRange": "CHF",
            "image": "https://videos.agencememento.com/Reseaux/marion-ryan-5-web.webp"
          })}
        </script>
      </Helmet>

      <ReactLenis root>
        <div className="page home">
          {/* Hero avec vidéo */}
          <section className="hero" aria-label="Showreel Agence Memento">
            <div className="hero-img">
              <video
                key={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                title="Showreel Agence Memento - Productions video et photo Geneve"
                aria-label="Video showreel de nos productions"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              >
                <source src={videoSrc} type="video/mp4" />
                Votre navigateur ne supporte pas les videos HTML5.
              </video>
            </div>
          </section>

          {/* VideoCarousel */}
          <VideoCarousel />

          {/* Section services avec structure sémantique améliorée */}
          <section className="hobbies" aria-labelledby="services-heading-visible">
            <header className="services-header">
              {/* H1 pour Google (cache visuellement) */}
              <h1 style={{ 
                position: 'absolute', 
                left: '-9999px',
                width: '1px',
                height: '1px',
                overflow: 'hidden'
              }}>
                Videaste et Photographe a Geneve - Production Video Mariage et Evenementiel
              </h1>
              
              {/* H2 visible pour les visiteurs */}
              <h2 
                id="services-heading-visible" 
                className="services-h2-styled"
              >
                Racontez votre histoire
              </h2>
              
              <p className="services-subtitle">trois approches pour creer des histoires memorables</p>
            </header>
            
            <div className="home-tools-container">
              <nav className="home-tools-row three-cards" aria-label="Navigation services">
                {/* Service 1 : Réseaux sociaux */}
                <Link 
                  to="/services?service=reseaux-sociaux" 
                  className="home-tool-card"
                  aria-label="En savoir plus sur nos services réseaux sociaux"
                >
                  <div className="home-tool-bg">
                    <img 
                      src="https://videos.agencememento.com/Reseaux/marion-ryan-5-web.webp" 
                      alt="Production contenu réseaux sociaux - Instagram, TikTok, LinkedIn" 
                      loading="lazy"
                      width="400"
                      height="400"
                    />
                  </div>
                  <h3>reseaux sociaux</h3>
                  <p className="primary sm">contenus creatifs pour vos plateformes digitales</p>
                </Link>
                
                {/* Service 2 : Événementiel */}
                <Link 
                  to="/services?service=evenementiel" 
                  className="home-tool-card"
                  aria-label="En savoir plus sur nos services événementiels"
                >
                  <div className="home-tool-bg">
                    <img 
                      src="https://videos.agencememento.com/evenementiel/PandG-Final-Memento-45-web.webp" 
                      alt="Photographe événementiel Genève - Galas, lancements, conférences" 
                      loading="lazy"
                      width="400"
                      height="400"
                    />
                  </div>
                  <h3>evenementiel</h3>
                  <p className="primary sm">entreprises, galas, lancements, soirees</p>
                </Link>
                
                {/* Service 3 : Privé */}
                <Link 
                  to="/services?service=prive" 
                  className="home-tool-card"
                  aria-label="En savoir plus sur nos services privés"
                >
                  <div className="home-tool-bg">
                    <img 
                      src="https://videos.agencememento.com/Prive/jeans-tournesol_0002_Generative_Fill-web.webp" 
                      alt="Photographe mariage Genève - Portraits, mariages, instants de vie" 
                      loading="lazy"
                      width="400"
                      height="400"
                    />
                  </div>
                  <h3>prive</h3>
                  <p className="primary sm">mariages, portraits et instants de vie</p>
                </Link>
              </nav>
            </div>
          </section>

          <TrustedBy />
          <ContactForm />
          <Footer />
        </div>
      </ReactLenis>
    </>
  );
};

export default Home;