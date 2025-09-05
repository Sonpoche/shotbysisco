// src/hooks/useBentoAnimations.js
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsapConfig";

export const useBentoGridAnimations = (containerRef) => {
  const { contextSafe } = useGSAP(() => {
    if (!containerRef.current) return;

    const gridItems = containerRef.current.querySelectorAll('.bento-item');
    
    // Animation d'entree simple et elegante
    gsap.fromTo(gridItems, 
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08
      }
    );

  }, { scope: containerRef });

  return { contextSafe };
};