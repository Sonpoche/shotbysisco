// src/pages/Services/Services.jsx
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

  // Contenu pour chaque service - 8 blocs avec images
  const servicesContent = {
    events: {
      title: "Réseaux sociaux",
      subtitle: "Contenus creatifs pour vos plateformes.",
      description: "Nous créons des vidéos et photos originales, conçues pour maximiser votre visibilité sur les réseaux sociaux. Instagram, TikTok, LinkedIn ou Facebook : chaque format est pensé pour captiver votre audience et refléter fidèlement l’ADN de votre entreprise. Reels dynamiques, vidéos courtes, interviews percutantes ou campagnes digitales, nos contenus génèrent de l’engagement et renforcent votre présence en ligne. Avec une stratégie régulière et des visuels de qualité, nous aidons votre marque à se démarquer, à fédérer sa communauté et à rester mémorable.",
      layout: "events",
      bentoItems: [
        {
          title: "Couverture complete",
          media: "/work/work-1.jpg",
          mediaType: "image"
        },
        {
          title: "Montage express",
          media: "https://videos.agencememento.com/test-web.mp4",
          mediaType: "video"
        },
        {
          title: "Multi-formats",
          media: "/work/work-2.jpg",
          mediaType: "image"
        },
        {
          title: "Stories & Reels",
          media: "https://videos.agencememento.com/test2-web.mp4",
          mediaType: "video"
        },
        {
          title: "Community management",
          media: "/work/work-3.jpg",
          mediaType: "image"
        },
        {
          title: "Direction artistique",
          media: "https://videos.agencememento.com/test3-web.mp4",
          mediaType: "video"
        },
        {
          title: "Strategie digitale",
          media: "/work/work-4.jpg",
          mediaType: "image"
        },
        {
          title: "Campagnes publicitaires",
          media: "https://videos.agencememento.com/test5-web.mp4",
          mediaType: "video"
        }
      ]
    },
    stories: {
      title: "Evenementiel",
      subtitle: "Entreprises, galas, lancements, soirees.",
      description: "Nous couvrons tous types d’événements corporatifs et institutionnels afin de mettre en avant votre entreprise lors de moments forts. Conférences, séminaires, soirées d’entreprise, galas, inaugurations, lancements de produit ou remises de prix : notre équipe de vidéastes et photographes capte l’essentiel, des discours officiels aux instants d’émotion partagée. Avec un matériel haut de gamme et une expertise reconnue, nous livrons des photos et vidéos prêtes à l’emploi pour vos réseaux sociaux, vos supports internes ou vos communications officielles. Chaque événement est unique : nous retranscrivons son énergie et son impact pour valoriser durablement votre image.",
      layout: "stories",
      bentoItems: [
        {
          title: "Narration visuelle",
          media: "/work/work-5.jpg",
          mediaType: "image"
        },
        {
          title: "Brand films",
          media: "https://videos.agencememento.com/test-web.mp4",
          mediaType: "video"
        },
        {
          title: "Interviews",
          media: "/work/work-1.jpg",
          mediaType: "image"
        },
        {
          title: "Captation live",
          media: "https://videos.agencememento.com/test2-web.mp4",
          mediaType: "video"
        },
        {
          title: "Teaser evenement",
          media: "/work/work-2.jpg",
          mediaType: "image"
        },
        {
          title: "Reportage photo",
          media: "https://videos.agencememento.com/test3-web.mp4",
          mediaType: "video"
        },
        {
          title: "Post-production",
          media: "/work/work-3.jpg",
          mediaType: "image"
        },
        {
          title: "Diffusion multi-canal",
          media: "https://videos.agencememento.com/test5-web.mp4",
          mediaType: "video"
        }
      ]
    },
    moments: {
      title: "Privé",
      subtitle: "Mariages, portraits et instants de vie.",
      description: "Chaque moment important mérite d’être capturé avec émotion et professionnalisme. Nous réalisons des photos et vidéos pour vos instants précieux : mariages, naissances, baptêmes, anniversaires, portraits ou shootings grossesse. Notre approche est sensible et moderne, pour créer des souvenirs intemporels que vous garderez toute votre vie. Basés à Genève et disponibles en Suisse comme à l’international, nous transformons vos moments personnels en histoires visuelles mémorables, à travers des images élégantes et authentiques.",
      layout: "moments",
      bentoItems: [
        {
          title: "Photographie lifestyle",
          media: "https://videos.agencememento.com/test-web.mp4",
          mediaType: "video"
        },
        {
          title: "Direction artistique",
          media: "/work/work-4.jpg",
          mediaType: "image"
        },
        {
          title: "Portraits",
          media: "/work/work-5.jpg",
          mediaType: "image"
        },
        {
          title: "Mariages",
          media: "https://videos.agencememento.com/test2-web.mp4",
          mediaType: "video"
        },
        {
          title: "Seances couple",
          media: "/work/work-1.jpg",
          mediaType: "image"
        },
        {
          title: "Instants de vie",
          media: "https://videos.agencememento.com/test3-web.mp4",
          mediaType: "video"
        },
        {
          title: "Album photo",
          media: "/work/work-2.jpg",
          mediaType: "image"
        },
        {
          title: "Souvenirs precieux",
          media: "https://videos.agencememento.com/test5-web.mp4",
          mediaType: "video"
        }
      ]
    }
  };

  const currentContent = servicesContent[activeService];

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
            <h2>{currentContent.subtitle}</h2>
            <p className="service-description">{currentContent.description}</p>
          </div>

          {/* Vertical Carousel à la place du Bento Grid */}
          <div className="service-carousel-wrapper">
            <VerticalCarousel items={currentContent.bentoItems} />
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