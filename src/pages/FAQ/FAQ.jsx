import React from "react";
import { Helmet } from "react-helmet-async";
import { faqItems } from "../../data/faqs.js";
import "./FAQ.css";

import FAQContainer from "../../components/FAQContainer/FAQContainer";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

import ReactLenis from "lenis/react";

const FAQ = () => {
  // Générer le Schema.org FAQPage dynamiquement depuis les données
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        {/* Métadonnées SEO */}
        <title>FAQ Agence Memento Genève | Questions Fréquentes Photo & Vidéo</title>
        <meta 
          name="description" 
          content="Toutes les réponses à vos questions sur nos services photo et vidéo : tarifs, délais, processus de réservation, préparation shooting. Agence Memento Genève, Suisse." 
        />
        <meta 
          name="keywords" 
          content="faq photographe genève, questions vidéaste suisse, tarif mariage genève, devis photo vidéo, processus réservation photographe" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="FAQ - Questions Fréquentes | Agence Memento Genève" />
        <meta property="og:description" content="Toutes les réponses à vos questions sur nos services photo et vidéo à Genève." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://agencememento.com/faq" />
        <meta property="og:locale" content="fr_CH" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="FAQ Agence Memento Genève" />
        <meta name="twitter:description" content="Questions fréquentes sur nos services photo et vidéo" />
        
        {/* Géolocalisation */}
        <meta name="geo.region" content="CH-GE" />
        <meta name="geo.placename" content="Genève" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://agencememento.com/faq" />
        
        {/* Schema.org FAQPage - CRITIQUE pour les rich snippets Google */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <ReactLenis root>
        <div className="page faq">
          {/* H1 caché pour SEO */}
          <h1 style={{ 
            position: 'absolute', 
            left: '-9999px',
            width: '1px',
            height: '1px',
            overflow: 'hidden'
          }}>
            Questions Fréquentes - Photographe et Vidéaste Genève - Agence Memento
          </h1>

          <FAQContainer />
          <ContactForm />
          <Footer />
        </div>
      </ReactLenis>
    </>
  );
};

export default FAQ;