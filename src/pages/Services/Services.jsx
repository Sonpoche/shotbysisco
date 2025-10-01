// src/pages/Services/Services.jsx - VERSION COMPLÈTE AVEC TOUS LES NOUVEAUX MÉDIAS
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
      'events': 'reseaux',
      'stories': 'evenementiel',
      'moments': 'prive'
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

  // CONTENUS AVEC MÉTADONNÉES SEO ET NOUVEAUX MÉDIAS
  const servicesContent = {
    events: {
      title: "réseaux sociaux",
      subtitle: "contenus creatifs pour vos plateformes.",
      description: "nous creons des videos et photos originales, concues pour maximiser votre visibilite sur les reseaux sociaux. instagram, tiktok, linkedin ou facebook : chaque format est pense pour captiver votre audience et refleter fidelement l'adn de votre entreprise.",
      seoTitle: "Création Contenu Réseaux Sociaux Genève | Instagram TikTok LinkedIn",
      seoDescription: "Production vidéo et photo pour réseaux sociaux à Genève. Contenus créatifs optimisés pour Instagram, TikTok, LinkedIn et Facebook. Agence spécialisée en content creation digital.",
      seoKeywords: "contenu réseaux sociaux genève, création contenu instagram, vidéo tiktok suisse, content creator genève, production contenu digital, social media content",
      canonicalUrl: "https://agencememento.com/services?service=reseaux-sociaux",
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
        },
        {
          title: "contenu social 1",
          media: "https://videos.agencememento.com/Reseaux/reseaux_img1.webp",
          mediaType: "image"
        },
        {
          title: "contenu social 2",
          media: "https://videos.agencememento.com/Reseaux/reseaux_img2.webp",
          mediaType: "image"
        },
        {
          title: "contenu social 3",
          media: "https://videos.agencememento.com/Reseaux/reseaux_img3.webp",
          mediaType: "image"
        },
        {
          title: "contenu social 4",
          media: "https://videos.agencememento.com/Reseaux/reseaux_img4.webp",
          mediaType: "image"
        }
      ]
    },
    stories: {
      title: "événementiel",
      subtitle: "entreprises, galas, lancements, soirees.",
      description: "nous couvrons tous types d'evenements corporatifs et institutionnels afin de mettre en avant votre entreprise lors de moments forts. conferences, seminaires, soirees d'entreprise, galas, inaugurations, lancements de produit ou remises de prix.",
      seoTitle: "Photographe Événementiel Genève | Vidéo Corporate Entreprise Suisse",
      seoDescription: "Photographe et vidéaste événementiel à Genève. Couverture professionnelle de galas, conférences, séminaires et événements d'entreprise en Suisse. Reportage photo et vidéo corporate.",
      seoKeywords: "photographe événementiel genève, vidéo corporate suisse, photographe entreprise genève, reportage événement, gala genève, conférence photo vidéo",
      canonicalUrl: "https://agencememento.com/services?service=evenementiel",
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
        },
        {
          title: "événement corporate 1",
          media: "https://videos.agencememento.com/evenementiel/event_img1.webp",
          mediaType: "image"
        },
        {
          title: "événement corporate 2",
          media: "https://videos.agencememento.com/evenementiel/event_img2.webp",
          mediaType: "image"
        },
        {
          title: "événement corporate 3",
          media: "https://videos.agencememento.com/evenementiel/event_img3.webp",
          mediaType: "image"
        }
      ]
    },
    moments: {
      title: "privé",
      subtitle: "mariages, portraits et instants de vie.",
      description: "chaque moment important merite d'etre capture avec emotion et professionnalisme. nous realisons des photos et videos pour vos instants precieux : mariages, naissances, baptemes, anniversaires, portraits ou shootings grossesse.",
      seoTitle: "Photographe Mariage Genève | Vidéaste Mariage Suisse | Portraits",
      seoDescription: "Photographe et vidéaste mariage à Genève. Reportage photo et vidéo pour mariages, portraits, naissances et événements privés en Suisse romande. Shooting photo professionnel et émotionnel.",
      seoKeywords: "photographe mariage genève, vidéaste mariage suisse, photographe portrait genève, shooting photo couple, reportage mariage suisse, photographe baptême",
      canonicalUrl: "https://agencememento.com/services?service=prive",
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
        },
        {
          title: "moments privés 1",
          media: "https://videos.agencememento.com/Prive/prive1.mp4",
          mediaType: "video"
        },
        {
          title: "moments privés 2",
          media: "https://videos.agencememento.com/Prive/prive2.mp4",
          mediaType: "video"
        },
        {
          title: "moments privés 3",
          media: "https://videos.agencememento.com/Prive/prive3.mp4",
          mediaType: "video"
        },
        {
          title: "portrait intime 1",
          media: "https://videos.agencememento.com/Prive/prive_img1.webp",
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
    <>
      <Helmet>
        <title>{serviceContent.seoTitle}</title>
        <meta name="description" content={serviceContent.seoDescription} />
        <meta name="keywords" content={serviceContent.seoKeywords} />
        
        <meta property="og:title" content={serviceContent.seoTitle} />
        <meta property="og:description" content={serviceContent.seoDescription} />
        <meta property="og:image" content={serviceContent.bentoItems[0].media} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={serviceContent.canonicalUrl} />
        <meta property="og:locale" content="fr_CH" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={serviceContent.seoTitle} />
        <meta name="twitter:description" content={serviceContent.seoDescription} />
        <meta name="twitter:image" content={serviceContent.bentoItems[0].media} />
        
        <meta name="geo.region" content="CH-GE" />
        <meta name="geo.placename" content="Genève" />
        
        <link rel="canonical" href={serviceContent.canonicalUrl} />
        <link rel="alternate" hrefLang="fr-CH" href={serviceContent.canonicalUrl} />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": serviceContent.title,
            "provider": {
              "@type": "ProfessionalService",
              "name": "Agence Memento",
              "telephone": "+41799465325",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Genève",
                "addressRegion": "GE",
                "addressCountry": "CH"
              }
            },
            "areaServed": ["Genève", "Vaud", "Suisse"],
            "description": serviceContent.seoDescription,
            "url": serviceContent.canonicalUrl
          })}
        </script>
      </Helmet>

      <ReactLenis root>
        <div className="page services">
          <section className="services-hero" aria-label="Services Agence Memento">
            <div className="services-hero-content">
              <h1 style={{ 
                position: 'absolute', 
                left: '-9999px',
                width: '1px',
                height: '1px',
                overflow: 'hidden'
              }}>
                {serviceContent.seoTitle}
              </h1>
              
              <AnimatedCopy tag="h2" animateOnScroll={true}>
                nos services
              </AnimatedCopy>
              <AnimatedCopy tag="p" animateOnScroll={true} className="hero-subtitle">
                trois approches pour creer des histoires memorables.
              </AnimatedCopy>
            </div>
          </section>

          <nav className="services-tabs-section" aria-label="Navigation services">
            <div className="services-tabs" role="tablist">
              {Object.keys(servicesContent).map((service) => (
                <button
                  key={service}
                  role="tab"
                  aria-selected={activeService === service}
                  aria-controls={`service-panel-${service}`}
                  className={`service-tab ${activeService === service ? "active" : ""}`}
                  onClick={() => handleServiceChange(service)}
                >
                  {servicesContent[service].title}
                </button>
              ))}
            </div>
          </nav>

          <section 
            className="service-carousel-content"
            role="tabpanel"
            id={`service-panel-${activeService}`}
            aria-labelledby={`tab-${activeService}`}
          >
            <header className="service-header">
              <h3>{serviceContent.subtitle}</h3>
              <p className="service-description">{serviceContent.description}</p>
            </header>

            <div className="service-carousel-wrapper">
              <VerticalCarousel 
                key={activeService} 
                items={serviceContent.bentoItems} 
              />
            </div>

            <div className="service-portfolio-link">
              <Link 
                to={`/portfolio?category=${getPortfolioCategory(activeService)}`}
                className="portfolio-btn"
                aria-label={`Voir nos réalisations ${serviceContent.title}`}
              >
                voir nos realisations
              </Link>
            </div>
          </section>

          <ContactForm />
          <Footer />
        </div>
      </ReactLenis>
    </>
  );
};

export default Services;