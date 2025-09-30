import React from "react";
import { Helmet } from "react-helmet-async";
import "./Contact.css";

import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

import ReactLenis from "lenis/react";

const Contact = () => {
  return (
    <>
      <Helmet>
        {/* Métadonnées SEO */}
        <title>Contact Agence Memento Genève | Devis Gratuit Photo & Vidéo</title>
        <meta 
          name="description" 
          content="Contactez Agence Memento à Genève pour votre projet photo ou vidéo. Devis gratuit sous 24h pour mariages, événements corporate et contenus réseaux sociaux. Téléphone : +41 79 946 53 25" 
        />
        <meta 
          name="keywords" 
          content="contact photographe genève, devis vidéaste suisse, tarif mariage genève, contact agence communication, rendez-vous photo vidéo genève" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contactez Agence Memento - Photographe & Vidéaste Genève" />
        <meta property="og:description" content="Parlons de votre projet photo ou vidéo. Devis gratuit et personnalisé sous 24h. Basé à Genève, Suisse." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://agencememento.com/contact" />
        <meta property="og:locale" content="fr_CH" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Agence Memento Genève" />
        <meta name="twitter:description" content="Devis gratuit photo & vidéo. Réponse sous 24h." />
        
        {/* Géolocalisation */}
        <meta name="geo.region" content="CH-GE" />
        <meta name="geo.placename" content="Genève" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://agencememento.com/contact" />
        
        {/* Schema.org ContactPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
              "@type": "ProfessionalService",
              "name": "Agence Memento",
              "telephone": "+41799465325",
              "email": "info@agencememento.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Genève",
                "addressRegion": "GE",
                "addressCountry": "CH"
              },
              "areaServed": ["Genève", "Vaud", "Suisse"],
              "priceRange": "CHF"
            }
          })}
        </script>
      </Helmet>

      <ReactLenis root>
        <div className="page contact">
          {/* Section hero avec texte */}
          <section className="contact-hero" aria-label="Contact Agence Memento">
            <div className="contact-hero-content">
              {/* H1 caché pour SEO */}
              <h1 style={{ 
                position: 'absolute', 
                left: '-9999px',
                width: '1px',
                height: '1px',
                overflow: 'hidden'
              }}>
                Contact Photographe et Vidéaste Genève - Agence Memento - Devis Gratuit
              </h1>
              
              {/* Titre visible */}
              <h2 className="contact-title">
                une histoire a raconter ? rendons-la memorable.
              </h2>
              
              <p className="contact-subtitle">
                Votre histoire mérite d’être partagée. Confiez-nous votre projet et voyons ensemble comment la mettre en lumière.
              </p>
            </div>

            {/* Informations de contact */}
            <div className="contact-info">
              <div className="contact-info-item">
                <h3>telephone</h3>
                <a href="tel:+41" className="contact-link">
                  à venir
                </a>
              </div>

              <div className="contact-info-item">
                <h3>email</h3>
                <a href="mailto:info@agencememento.com" className="contact-link">
                  info@agencememento.com
                </a>
              </div>

              <div className="contact-info-item">
                <h3>localisation</h3>
                <p>genève, suisse</p>
                <p className="contact-note">projets/déplacements en suisse et à l'international</p>
              </div>
            </div>
          </section>

          {/* Formulaire de contact */}
          <ContactForm />
          <Footer />
        </div>
      </ReactLenis>
    </>
  );
};

export default Contact;