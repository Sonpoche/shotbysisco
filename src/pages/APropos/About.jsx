import React from "react";
import "./About.css";

import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

import ReactLenis from "lenis/react";



const About = () => {
  return (
    <ReactLenis root>
      <div className="page about">
        <section className="about-header">
        </section>

        <section className="about-hero">
          <div className="about-hero-img">
            <img src="/about/about-hero.jpg" alt="" />
          </div>
        </section>

        <section className="about-me-copy">
          <div className="about-me-copy-wrapper">
            <AnimatedCopy animateOnScroll={true} tag="h3">
              Nous sommes Memento — une agence de communication basée à Genève.  
              Passionnés par les histoires humaines, les instants vrais et l’esthétique des émotions,  
              nous mettons en lumière aussi bien l’énergie brute que la subtilité d’un moment.
            </AnimatedCopy>

            <AnimatedCopy animateOnScroll={true} tag="h3">
              Pour nous, l’image ne se limite pas à ce que l’on voit —  
              elle doit transmettre ce que l’on ressent.  
              Chaque projet devient ainsi l’occasion de créer des visuels sincères, riches en textures et en authenticité.
            </AnimatedCopy>

            <AnimatedCopy animateOnScroll={true} tag="h3">
              Chaque collaboration est une aventure unique,  
              un défi créatif et une opportunité de donner vie à des messages marquants.  
              Si notre travail parvient à toucher, inspirer ou engager une personne, même un instant, alors il a atteint son but.
            </AnimatedCopy>
          </div>
        </section>


        <section className="services">
          <div className="services-col">
            <div className="services-banner">
              <img src="/about/services-banner.jpg" alt="" />
            </div>
            <p className="primary">Pensé et réalisé avec soin</p>
          </div>
          <div className="services-col">
            <h4>
              Chaque projet est une occasion d’explorer un nouveau langage visuel, de repousser les limites créatives et de raconter des histoires vraies.
              J’aborde chaque contenu avec soin, précision et intention.
            </h4>

            <div className="services-list">
              <div className="service-list-row">
                <div className="service-list-col">
                  <h5>Création visuelle</h5>
                </div>
                <div className="service-list-col">
                  <p>
                    Qu’il s’agisse de vidéos intimes ou de récits visuels, mon travail est guidé par l’émotion et l’atmosphère.
                    J’assure la réalisation, l’image et le montage — en créant chaque projet avec un regard attentif porté sur l’ambiance, le mouvement et le sens.
                  </p>
                </div>
              </div>

              <div className="service-list-row">
                <div className="service-list-col">
                  <h5>L’art de raconter en images</h5>
                </div>
                <div className="service-list-col">
                  <p>
                    Je crée des images qui parlent — qu’il s’agisse d’un instant intime ou d’une idée audacieuse.
                    Mon travail mêle esthétique et clarté du récit, en veillant toujours à révéler l’essence émotionnelle.
                  </p>
                </div>
              </div>

              <div className="service-list-row">
                <div className="service-list-col">
                  <h5>Pilotage créatif</h5>
                </div>
                <div className="service-list-col">
                  <p>
                    De l’idée initiale à la réalisation finale, je guide le ton visuel et narratif de chaque projet.
                    J’apporte une vision cohérente, alliant style, récit et intention — toujours ancrée dans l’authenticité.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-banner-img">
          <div className="about-banner-img-wrapper">
            <img src="/about/about-banner.jpg" alt="" />
          </div>
        </section>

        <section className="fav-tools">
          <div className="fav-tools-header">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
              Outils quotidiens
            </AnimatedCopy>
            <AnimatedCopy tag="h2" animateOnScroll={true} delay={0.25}>
              Mes outils préférés
            </AnimatedCopy>
            <AnimatedCopy
              tag="p"
              animateOnScroll={true}
              className="secondary"
              delay={0.5}
            >
              Ma sélection d’outils favoris inclut Adobe Premiere et d’autres technologies de pointe, pour créer des images fluides, dynamiques et impactantes.
            </AnimatedCopy>
          </div>

          <div className="fav-tools-list">
            <div className="fav-tools-list-row">
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-1.jpg" alt="" />
                </div>
                <h4>DaVinci Resolve</h4>
                <p className="primary sm">Color Grading</p>
              </div>
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-2.jpg" alt="" />
                </div>
                <h4>Adobe Premiere Pro</h4>
                <p className="primary sm">Video Editing</p>
              </div>
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-3.jpg" alt="" />
                </div>
                <h4>Blackmagic Pocket</h4>
                <p className="primary sm">Cinematic Shooting</p>
              </div>
            </div>
            <div className="fav-tools-list-row">
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-4.jpg" alt="" />
                </div>
                <h4>ShotDeck</h4>
                <p className="primary sm">Visual References</p>
              </div>
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-5.jpg" alt="" />
                </div>
                <h4>Frame.io</h4>
                <p className="primary sm">Remote Collaboration</p>
              </div>
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-6.jpg" alt="" />
                </div>
                <h4>Celtx</h4>
                <p className="primary sm">Scriptwriting Tool</p>
              </div>
            </div>
          </div>
        </section>

        <ContactForm />

        <Footer />
      </div>
    </ReactLenis>
  );
};

export default About;
