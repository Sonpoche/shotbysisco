// TrustedBy.jsx
import React, { useEffect, useRef } from "react";
import "./TrustedBy.css";
import gsap from "gsap";

const TrustedBy = () => {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  // Liste des logos/partenaires
  const partners = [
    { id: 1, name: "Nike", logo: "/logos/nike.svg" },
    { id: 2, name: "Adidas", logo: "/logos/adidas.svg" },
    { id: 3, name: "Puma", logo: "/logos/puma.svg" },
    { id: 4, name: "Reebok", logo: "/logos/reebok.svg" },
    { id: 5, name: "Under Armour", logo: "/logos/under-armour.svg" },
    { id: 6, name: "New Balance", logo: "/logos/new-balance.svg" },
    { id: 7, name: "Asics", logo: "/logos/asics.svg" },
    { id: 8, name: "Converse", logo: "/logos/converse.svg" },
  ];

  useEffect(() => {
    // Animation pour la première ligne (gauche à droite)
    const row1 = row1Ref.current;
    const row1Width = row1.scrollWidth / 2;

    gsap.set(row1, { x: 0 });
    
    const tl1 = gsap.timeline({ repeat: -1 });
    tl1.to(row1, {
      x: -row1Width,
      duration: 30,
      ease: "none",
    });

    // Animation pour la deuxième ligne (droite à gauche)
    const row2 = row2Ref.current;
    const row2Width = row2.scrollWidth / 2;

    gsap.set(row2, { x: -row2Width });
    
    const tl2 = gsap.timeline({ repeat: -1 });
    tl2.to(row2, {
      x: 0,
      duration: 30,
      ease: "none",
    });

    // Pause animations on hover
    const handleMouseEnter = () => {
      tl1.pause();
      tl2.pause();
    };

    const handleMouseLeave = () => {
      tl1.resume();
      tl2.resume();
    };

    const container = row1.parentElement.parentElement;
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tl1.kill();
      tl2.kill();
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="trusted-by">
      <div className="trusted-by-header">
        <p className="primary sm">Partenaires</p>
        <h2>Ils nous ont fait confiance</h2>
      </div>

      <div className="trusted-by-slider">
        {/* Première ligne - défilement de gauche à droite */}
        <div className="slider-row">
          <div className="slider-track" ref={row1Ref}>
            {/* Dupliquer les logos pour créer un défilement infini */}
            {[...partners, ...partners].map((partner, index) => (
              <div key={`row1-${index}`} className="partner-item">
                <div className="partner-logo">
                  {/* Utiliser un placeholder si pas d'image */}
                  <div className="logo-placeholder">
                    <h4>{partner.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deuxième ligne - défilement de droite à gauche */}
        <div className="slider-row">
          <div className="slider-track reverse" ref={row2Ref}>
            {[...partners, ...partners].map((partner, index) => (
              <div key={`row2-${index}`} className="partner-item">
                <div className="partner-logo">
                  <div className="logo-placeholder">
                    <h4>{partner.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="trusted-by-footer">
        <p className="secondary">
          Plus de 50 marques et créateurs nous ont fait confiance pour donner vie à leurs projets visuels.
        </p>
      </div>
    </section>
  );
};

export default TrustedBy;