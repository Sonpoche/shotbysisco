// src/pages/Services/Services.jsx - VERSION CORRIGÉE AVEC VRAIS CONTENUS ET VIDÉOS
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./Services.css";

import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";
import VerticalCarousel from "../../components/VerticalCarousel/VerticalCarousel";

import ReactLenis from "lenis/react";
import { gsap } from "gsap";


const Services = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');
  
  // Mapping des services vers les catégories du portfolio
  const getPortfolioCategory = (serviceKey) => {
    const portfolioMapping = {
      'events': 'reseaux',        // Réseaux sociaux → reseaux
      'stories': 'evenementiel',  // Evenementiel → evenementiel  
      'moments': 'prive'          // Privé → prive
    };
    return portfolioMapping[serviceKey] || 'all';
  };

  // Mapping des noms d'URL vers les clés internes
  const serviceMapping = {
    'reseaux-sociaux': 'events',
    'evenementiel': 'stories', 
    'prive': 'moments'
  };

  // Définir le service actif basé sur l'URL ou par défaut "events"  
  const mappedService = serviceParam ? serviceMapping[serviceParam] || 'events' : 'events';
  const [activeService, setActiveService] = useState(mappedService);

  // Mettre à jour le service actif si l'URL change
  useEffect(() => {
    if (serviceParam) {
      const mapped = serviceMapping[serviceParam] || 'events';
      if (mapped !== activeService) {
        setActiveService(mapped);
      }
    }
  }, [serviceParam]);

  // CONTENUS CORRIGES AVEC VOS VRAIES URLS ET VIDEOS
  const servicesContent = {
    events: {
      title: "Réseaux sociaux",
      subtitle: "Contenus creatifs pour vos plateformes.",
      description: "Nous creons des videos et photos originales, concues pour maximiser votre visibilite sur les reseaux sociaux. Instagram, TikTok, LinkedIn ou Facebook : chaque format est pense pour captiver votre audience et refleter fidelement l'ADN de votre entreprise.",
      layout: "events",
      bentoItems: [
        {
          title: "annonce umd",
          media: "https://videos.agencememento.com/Reseaux/ANNONCE-UMD_ahq12-web.mp4",
          mediaType: "video"
        },
        {
          title: "captions",
          media: "https://videos.agencememento.com/Reseaux/Captions_92967C-web.mp4",
          mediaType: "video"
        },
        {
          title: "selten campaign",
          media: "https://videos.agencememento.com/Reseaux/FINAL-SELTEN_ahq12-web.mp4",
          mediaType: "video"
        },
        {
          title: "marion ryan",
          media: "https://videos.agencememento.com/Reseaux/marion-ryan-13-web.webp",
          mediaType: "image"
        }
      ]
    },
    stories: {
      title: "évènementiel",
      subtitle: "entreprises, galas, lancements, soirees.",
      description: "Nous couvrons tous types d'evenements corporatifs et institutionnels afin de mettre en avant votre entreprise lors de moments forts. Conferences, seminaires, soirees d'entreprise, galas, inaugurations, lancements de produit ou remises de prix.",
      layout: "stories",
      bentoItems: [
        {
          title: "interview alvin",
          media: "https://videos.agencememento.com/evenementiel/ALVIN_FINAL_ITWmp4-web.mp4",
          mediaType: "video"
        },
        {
          title: "birthday final",
          media: "https://videos.agencememento.com/evenementiel/BIRTHDAY_FINAL-web.mp4",
          mediaType: "video"
        },
        {
          title: "c-sphere event",
          media: "https://videos.agencememento.com/evenementiel/CSPHERE_FINALVIDEOHOG_SBS-web.mp4",
          mediaType: "video"
        },
        {
          title: "P.G corporate",
          media: "https://videos.agencememento.com/evenementiel/PandG-Final-Memento-45-web.webp",
          mediaType: "image"
        }
      ]
    },
    moments: {
      title: "privé",
      subtitle: "mariages, portraits et instants de vie.",
      description: "Chaque moment important merite d'etre capture avec emotion et professionnalisme. Nous realisons des photos et videos pour vos instants precieux : mariages, naissances, baptemes, anniversaires, portraits ou shootings grossesse.",
      layout: "moments",
      bentoItems: [
        {
          title: "mario et verde",
          media: "https://videos.agencememento.com/Prive/marioVERT-mariage-web.mp4",
          mediaType: "video"
        },
        {
          title: "chris et philo",
          media: "https://videos.agencememento.com/Prive/ChrisetPhilo-longueversion-web.mp4",
          mediaType: "video"
        },
        {
          title: "seance tournesol",
          media: "https://videos.agencememento.com/Prive/jeans-tournesol_0002_Generative_Fill-web.webp",
          mediaType: "image"
        },
        {
          title: "portrait artistique",
          media: "https://videos.agencememento.com/Prive/jeans-tournesol_0000_Generative_Fill_4-web.webp",
          mediaType: "image"
        }
      ]
    }
  };

  const serviceContent = servicesContent[activeService];

  const handleServiceChange = (service) => {
    if (service !== activeService) {
      gsap.to(".service-carousel-content", {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setActiveService(service);
          gsap.to(".service-carousel-content", {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });
    }
  };

  return (
    <ReactLenis root>
      <div className="page services">
        {/* Hero Section */}
        <section className="services-hero">
          <div className="services-hero-content">
            <AnimatedCopy tag="h1" animateOnScroll={true}>
              Nos Services
            </AnimatedCopy>
            <AnimatedCopy tag="p" animateOnScroll={true} className="hero-subtitle">
              trois approches pour creer des histoires memorables.
            </AnimatedCopy>
          </div>
        </section>

        {/* Service Tabs */}
        <section className="services-tabs-section">
          <div className="services-tabs">
            {Object.keys(servicesContent).map((service) => (
              <button
                key={service}
                className={`service-tab ${activeService === service ? "active" : ""}`}
                onClick={() => handleServiceChange(service)}
              >
                {servicesContent[service].title}
              </button>
            ))}
          </div>
        </section>

        {/* Service Content avec Vertical Carousel */}
        <section className="service-carousel-content">
          <div className="service-header">
            <h2>{serviceContent.subtitle}</h2>
            <p className="service-description">{serviceContent.description}</p>
          </div>

          {/* Vertical Carousel avec key pour forcer la re-création */}
          <div className="service-carousel-wrapper">
            <VerticalCarousel 
              key={activeService} 
              items={serviceContent.bentoItems} 
            />
          </div>

          {/* Bouton vers le portfolio correspondant */}
          <div className="service-portfolio-link">
            <Link 
              to={`/portfolio?category=${getPortfolioCategory(activeService)}`}
              className="portfolio-btn"
            >
              voir nos realisations
            </Link>
          </div>
        </section>

        <ContactForm />
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Services;