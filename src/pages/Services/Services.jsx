// src/pages/Services/Services.jsx - VERSION FINALE AVEC TOUS VOS CONTENUS R2
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./Services.css";

import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";
import VerticalCarousel from "../../components/VerticalCarousel/VerticalCarousel";

import ReactLenis from "lenis/react";
import { gsap } from "gsap";

import Transition from "../../components/Transition/Transition";

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

  // Contenu pour chaque service - TOUS VOS CONTENUS R2 AUTHENTIQUES
  const servicesContent = {
    events: {
      title: "Réseaux sociaux",
      subtitle: "Contenus creatifs pour vos plateformes.",
      description: "Nous créons des vidéos et photos originales, conçues pour maximiser votre visibilité sur les réseaux sociaux. Instagram, TikTok, LinkedIn ou Facebook : chaque format est pensé pour captiver votre audience et refléter fidèlement l'ADN de votre entreprise.",
      layout: "events",
      bentoItems: [
        {
          title: "campagnes publicitaires",
          media: "https://videos.agencememento.com/Reseaux/ANNONCE-UMD_ahq12-poster-web.webp",
          mediaType: "image"
        },
        {
          title: "contenu viral",
          media: "https://videos.agencememento.com/Reseaux/Captions_92967C-poster-web.webp",
          mediaType: "image"
        },
        {
          title: "brand storytelling",
          media: "https://videos.agencememento.com/Reseaux/FINAL-SELTEN_ahq12-poster-web.webp",
          mediaType: "image"
        },
        {
          title: "lifestyle réseaux",
          media: "https://videos.agencememento.com/Reseaux/marion-ryan-5-web.webp",
          mediaType: "image"
        }
      ]
    },
    stories: {
      title: "Evenementiel",
      subtitle: "Entreprises, galas, lancements, soirees.",
      description: "Nous couvrons tous types d'événements corporatifs et institutionnels afin de mettre en avant votre entreprise lors de moments forts. Conférences, séminaires, soirées d'entreprise, galas, inaugurations, lancements de produit ou remises de prix.",
      layout: "stories",
      bentoItems: [
        {
          title: "interviews corporate",
          media: "https://videos.agencememento.com/evenementiel/ALVIN_FINAL_ITWmp4-poster-web.webp",
          mediaType: "image"
        },
        {
          title: "célébrations",
          media: "https://videos.agencememento.com/evenementiel/BIRTHDAY_FINAL-poster-web.webp",
          mediaType: "image"
        },
        {
          title: "événements corporate",
          media: "https://videos.agencememento.com/evenementiel/CSPHERE_FINALVIDEOHOG_SBS-poster-web.webp",
          mediaType: "image"
        },
        {
          title: "reportage entreprise",
          media: "https://videos.agencememento.com/evenementiel/PandG-Final-Memento-45-web.webp",
          mediaType: "image"
        }
      ]
    },
    moments: {
      title: "Privé",
      subtitle: "Mariages, portraits et instants de vie.",
      description: "Chaque moment important mérite d'être capturé avec émotion et professionnalisme. Nous réalisons des photos et vidéos pour vos instants précieux : mariages, naissances, baptêmes, anniversaires, portraits ou shootings grossesse.",
      layout: "moments",
      bentoItems: [
        {
          title: "mariages intimistes",
          media: "https://videos.agencememento.com/Prive/marioVERT-mariage-poster-web.webp",
          mediaType: "image"
        },
        {
          title: "couples",
          media: "https://videos.agencememento.com/Prive/ChrisetPhilo-longueversion-poster-web.webp",
          mediaType: "image"
        },
        {
          title: "portraits",
          media: "https://videos.agencememento.com/Prive/jeans-tournesol_0002_Generative_Fill-web.webp",
          mediaType: "image"
        },
        {
          title: "lifestyle",
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
              Trois approches pour créer des histoires mémorables.
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

          {/* Vertical Carousel */}
          <div className="service-carousel-wrapper">
            <VerticalCarousel items={serviceContent.bentoItems} />
          </div>

          {/* Bouton vers le portfolio correspondant */}
          <div className="service-portfolio-link">
            <Link 
              to={`/portfolio?category=${getPortfolioCategory(activeService)}`}
              className="portfolio-btn"
            >
              Voir nos réalisations
            </Link>
          </div>
        </section>

        <ContactForm />
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Transition(Services);