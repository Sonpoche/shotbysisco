// src/pages/Services/Services.jsx
import React, { useState } from "react";
import "./Services.css";

import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";
import { BentoGrid, BentoGridItem } from "../../components/BentoGrid/BentoGrid";

import ReactLenis from "lenis/react";
import { gsap } from "gsap";

import Transition from "../../components/Transition/Transition";

// Import des icones
import { 
  IconCamera,
  IconVideo,
  IconPalette,
  IconUsers
} from "@tabler/icons-react";

const Services = () => {
  const [activeService, setActiveService] = useState("events");

  // Contenu pour chaque service - 4 blocs seulement
  const servicesContent = {
    events: {
      title: "Events",
      subtitle: "Capturer l'essence de vos evenements",
      description: "Des moments uniques immortalises avec creativite",
      layout: "events",
      bentoItems: [
        {
          title: "Couverture complete",
          description: "De l'installation au demontage, nous capturons chaque moment cle de votre evenement avec une approche documentaire et artistique.",
          icon: <IconCamera />
        },
        {
          title: "Montage express",
          description: "Livraison rapide de teasers pour maximiser l'impact.",
          icon: <IconVideo />
        },
        {
          title: "Multi-formats",
          description: "Contenus optimises pour chaque plateforme sociale.",
          icon: <IconPalette />
        },
        {
          title: "Equipe creative",
          description: "Des professionnels passionnes dedies a la reussite de votre evenement, avec une expertise technique et artistique.",
          icon: <IconUsers />
        }
      ]
    },
    stories: {
      title: "Stories",
      subtitle: "Raconter votre histoire avec authenticite",
      description: "Des recits visuels qui touchent et engagent",
      layout: "stories",
      bentoItems: [
        {
          title: "Narration visuelle",
          description: "Construction d'un recit captivant qui revele l'essence de votre marque.",
          icon: <IconVideo />
        },
        {
          title: "Brand films",
          description: "Films de marque qui revelent l'ADN de votre entreprise avec emotion et authenticite pour creer une connexion durable.",
          icon: <IconCamera />
        },
        {
          title: "Interviews",
          description: "Temoignages authentiques captures avec sensibilite.",
          icon: <IconUsers />
        },
        {
          title: "Scenarios sur mesure",
          description: "Ecriture creative adaptee a votre message unique.",
          icon: <IconPalette />
        }
      ]
    },
    moments: {
      title: "Moments",
      subtitle: "Saisir l'instant present",
      description: "Des images qui capturent l'emotion pure",
      layout: "moments",
      bentoItems: [
        {
          title: "Photographie lifestyle",
          description: "Sessions photo naturelles et spontanees qui revelent la personnalite authentique de vos sujets.",
          icon: <IconCamera />
        },
        {
          title: "Direction artistique",
          description: "Conception visuelle complete pour une coherence parfaite.",
          icon: <IconPalette />
        },
        {
          title: "Portraits",
          description: "Reveler l'essence de chaque personnalite avec sensibilite.",
          icon: <IconUsers />
        },
        {
          title: "Contenu social",
          description: "Creation de banques d'images et videos courtes pour alimenter vos reseaux sociaux avec du contenu premium.",
          icon: <IconVideo />
        }
      ]
    }
  };

  const currentContent = servicesContent[activeService];

  const handleServiceChange = (service) => {
    if (service !== activeService) {
      gsap.to(".service-bento-content", {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setActiveService(service);
          gsap.to(".service-bento-content", {
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
              Trois approches creatives pour sublimer vos projets visuels
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

        {/* Service Content avec Bento Grid */}
        <section className="service-bento-content">
          <div className="service-header">
            <h2>{currentContent.subtitle}</h2>
            <p className="service-description">{currentContent.description}</p>
          </div>

          {/* Bento Grid avec layout specifique */}
          <div className="service-bento-wrapper">
            <BentoGrid variant={currentContent.layout}>
              {currentContent.bentoItems.map((item, index) => (
                <BentoGridItem
                  key={`${activeService}-${index}`}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  index={index}
                />
              ))}
            </BentoGrid>
          </div>
        </section>

        <ContactForm />
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Transition(Services);