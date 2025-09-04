import React, { useState } from "react";
import "./Services.css";

import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

import ReactLenis from "lenis/react";
import { gsap } from "gsap";

import Transition from "../../components/Transition/Transition";

const Services = () => {
  const [activeService, setActiveService] = useState("events");

  // Contenu pour chaque service
  const servicesContent = {
    events: {
      title: "Events",
      subtitle: "Capturer l'essence de vos événements",
      description: "Des moments uniques immortalisés avec créativité",
      features: [
        {
          icon: "01",
          title: "Couverture complète",
          description: "De l'installation au démontage, nous capturons chaque moment clé de votre événement avec une approche documentaire et artistique."
        },
        {
          icon: "02",
          title: "Montage express",
          description: "Livraison de teasers en 24-48h pour maximiser l'impact sur les réseaux sociaux pendant que l'événement est encore dans les esprits."
        },
        {
          icon: "03",
          title: "Multi-formats",
          description: "Contenus adaptés à chaque plateforme : stories verticales, posts carrés, vidéos horizontales et formats cinémascope."
        }
      ],
      cards: [
        {
          image: "/services/event-1.jpg",
          title: "Conférences",
          description: "Captation multi-caméras"
        },
        {
          image: "/services/event-2.jpg",
          title: "Lancements",
          description: "Créer le buzz"
        },
        {
          image: "/services/event-3.jpg",
          title: "Corporate",
          description: "Image professionnelle"
        }
      ]
    },
    stories: {
      title: "Stories",
      subtitle: "Raconter votre histoire avec authenticité",
      description: "Des récits visuels qui touchent et engagent",
      features: [
        {
          icon: "01",
          title: "Narration visuelle",
          description: "Construction d'un récit captivant qui met en valeur votre marque, vos valeurs et votre vision à travers des images puissantes."
        },
        {
          icon: "02",
          title: "Interviews authentiques",
          description: "Témoignages sincères de vos équipes et clients, capturés dans des environnements naturels pour une connexion émotionnelle forte."
        },
        {
          icon: "03",
          title: "Scénarios sur mesure",
          description: "Écriture créative adaptée à votre message, du documentaire intimiste au brand film ambitieux."
        }
      ],
      cards: [
        {
          image: "/services/story-1.jpg",
          title: "Brand films",
          description: "L'ADN de votre marque"
        },
        {
          image: "/services/story-2.jpg",
          title: "Documentaires",
          description: "Histoires vraies"
        },
        {
          image: "/services/story-3.jpg",
          title: "Témoignages",
          description: "Voix authentiques"
        }
      ]
    },
    moments: {
      title: "Moments",
      subtitle: "Saisir l'instant présent",
      description: "Des images qui capturent l'émotion pure",
      features: [
        {
          icon: "01",
          title: "Photographie lifestyle",
          description: "Sessions photo naturelles et spontanées qui révèlent la personnalité authentique de vos sujets et espaces."
        },
        {
          icon: "02",
          title: "Contenu social media",
          description: "Création de banques d'images et vidéos courtes optimisées pour alimenter vos réseaux sociaux toute l'année."
        },
        {
          icon: "03",
          title: "Direction artistique",
          description: "Conception visuelle complète : moodboards, stylisme, mise en scène pour une cohérence esthétique parfaite."
        }
      ],
      cards: [
        {
          image: "/services/moment-1.jpg",
          title: "Portraits",
          description: "Révéler l'essence"
        },
        {
          image: "/services/moment-2.jpg",
          title: "Lifestyle",
          description: "Vie quotidienne"
        },
        {
          image: "/services/moment-3.jpg",
          title: "Produits",
          description: "Mise en valeur"
        }
      ]
    }
  };

  const currentContent = servicesContent[activeService];

  const handleServiceChange = (service) => {
    if (service !== activeService) {
      // Animation de transition
      gsap.to(".service-content", {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setActiveService(service);
          gsap.to(".service-content", {
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
              Trois approches créatives pour sublimer vos projets visuels
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

        {/* Service Content */}
        <section className="service-content">
          <div className="service-header">
            <h2>{currentContent.subtitle}</h2>
            <p className="service-description">{currentContent.description}</p>
          </div>

          {/* Service Cards Grid - Layout asymétrique */}
          <div className="service-cards-container">
            <div className="cards-layout">
              {/* Première carte - grande à gauche */}
              <div className="service-card large-card">
                <div className="service-card-image">
                  <img src={currentContent.cards[0].image} alt={currentContent.cards[0].title} />
                </div>
                <div className="service-card-content">
                  <h3>{currentContent.cards[0].title}</h3>
                  <p>{currentContent.cards[0].description}</p>
                </div>
              </div>

              {/* Colonne du milieu avec 2 cartes */}
              <div className="middle-column">
                <div className="service-card medium-card">
                  <div className="service-card-image">
                    <img src={currentContent.cards[1].image} alt={currentContent.cards[1].title} />
                    <div className="card-number">02</div>
                  </div>
                  <div className="service-card-content">
                    <h3>{currentContent.cards[1].title}</h3>
                    <p>{currentContent.cards[1].description}</p>
                  </div>
                </div>
                
                {/* Carte spéciale (style différent si nécessaire) */}
                <div className="service-card special-card">
                  <div className="special-card-content">
                    <span className="special-label">Offre spéciale</span>
                    <h4>Forfait personnalisé</h4>
                    <p>Créons ensemble votre projet sur mesure</p>
                  </div>
                </div>
              </div>

              {/* Troisième carte - grande à droite */}
              <div className="service-card large-card">
                <div className="service-card-image">
                  <img src={currentContent.cards[2].image} alt={currentContent.cards[2].title} />
                </div>
                <div className="service-card-content">
                  <h3>{currentContent.cards[2].title}</h3>
                  <p>{currentContent.cards[2].description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="service-features">
            <h3 className="features-title">Notre approche</h3>
            <div className="features-grid">
              {currentContent.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="service-cta">
            <AnimatedCopy tag="h2" animateOnScroll={true}>
              Prêt à créer quelque chose d'exceptionnel ?
            </AnimatedCopy>
            <AnimatedCopy tag="p" animateOnScroll={true} className="cta-subtitle">
              Discutons de votre projet et donnons vie à vos idées
            </AnimatedCopy>
            <button className="cta-button">
              Démarrer un projet
            </button>
          </div>
        </section>

        <ContactForm />
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Transition(Services);