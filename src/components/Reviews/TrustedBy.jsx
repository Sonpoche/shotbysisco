// TrustedBy.jsx
import React, { useEffect, useRef } from "react";
import "./TrustedBy.css";
import gsap from "gsap";

const TrustedBy = () => {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  // Liste des vrais logos/partenaires avec indication si le logo est sombre
  const partners = [
    { id: 1, name: "The Zone", logo: "/logos/the-zone.png", isDark: false },
    { id: 2, name: "Dr. Sneakers Shoes", logo: "/logos/drsneakers.png", isDark: true },
    { id: 3, name: "A.S. Charmilles", logo: "/logos/as-charmilles.png", isDark: true },
    { id: 4, name: "Expure", logo: "/logos/Expure.png", isDark: true },
    { id: 5, name: "Pearl", logo: "/logos/Pearl.png", isDark: false },
    { id: 6, name: "Pomodoro", logo: "/logos/pomodoro.png", isDark: true },
    { id: 8, name: "Egg", logo: "/logos/original.png", isDark: false },
    { id: 9, name: "UMD", logo: "/logos/umd.png", isDark: true },
    { id: 10, name: "Urbak", logo: "/logos/urbak.svg", isDark: true },
    { id: 11, name: "Collectorsphere", logo: "/logos/Collectorsphere.png", isDark: true },
    { id: 12, name: "Addict Natation", logo: "/logos/addict.png", isDark: true },
    { id: 13, name: "La Materiotech", logo: "/logos/materiotech.png", isDark: true },
    { id: 14, name: "Harold Genève", logo: "/logos/harold.png", isDark: true },
    { id: 15, name: "MamuSkincare", logo: "/logos/mamu.png", isDark: true },
    { id: 16, name: "Selten", logo: "/logos/selten.png", isDark: true },
    { id: 17, name: "Swissroc", logo: "/logos/swissroc.png", isDark: false }
  ];

  // Fonction pour mélanger un tableau (shuffle)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Créer deux ordres différents pour éviter les alignements
  const row1Partners = partners;
  const row2Partners = shuffleArray(partners);

  useEffect(() => {
    // Animation pour la première ligne (gauche à droite)
    const row1 = row1Ref.current;
    if (!row1) return;
    
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
    if (!row2) return;
    
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
            {/* Dupliquer les logos de la première moitié */}
            {[...row1Partners, ...row1Partners].map((partner, index) => (
              <div key={`row1-${index}`} className="partner-item">
                <div className="partner-logo">
                  <div className="logo-placeholder">
                    <img 
                      src={partner.logo}
                      alt={partner.name}
                      className={partner.isDark ? "logo-inverted" : "logo-normal"}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const textFallback = document.createElement('h4');
                        textFallback.textContent = partner.name;
                        e.target.parentElement.appendChild(textFallback);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deuxième ligne - défilement de droite à gauche */}
        <div className="slider-row">
          <div className="slider-track reverse" ref={row2Ref}>
            {/* Dupliquer les logos de la deuxième moitié */}
            {[...row2Partners, ...row2Partners].map((partner, index) => (
              <div key={`row2-${index}`} className="partner-item">
                <div className="partner-logo">
                  <div className="logo-placeholder">
                    <img 
                      src={partner.logo}
                      alt={partner.name}
                      className={partner.isDark ? "logo-inverted" : "logo-normal"}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const textFallback = document.createElement('h4');
                        textFallback.textContent = partner.name;
                        e.target.parentElement.appendChild(textFallback);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="trusted-by-footer">
        <p className="secondary">
          De nombreux créateurs et entreprises nous font confiance. Voici quelques-uns de nos partenaires.
        </p>
      </div>
    </section>
  );
};

export default TrustedBy;