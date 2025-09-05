// src/lib/gsapConfig.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrer les plugins GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Configuration globale GSAP
gsap.config({
  force3D: true,
  nullTargetWarn: false,
});

export { gsap, ScrollTrigger };