import workList from "../../data/workList";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import Reviews from "../../components/Reviews/Reviews";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

import Transition from "../../components/Transition/Transition";

const Home = () => {
  const workItems = Array.isArray(workList) ? workList : [];
  const stickyTitlesRef = useRef(null);
  const titlesRef = useRef([]);
  const stickyWorkHeaderRef = useRef(null);
  const homeWorkRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    const stickySection = stickyTitlesRef.current;
    const titles = titlesRef.current.filter(Boolean);

    if (!stickySection || titles.length !== 3) {
      window.removeEventListener("resize", handleResize);
      return;
    }

    // Configuration initiale des vidéos
    gsap.set(titles[0], { opacity: 1, scale: 1 });
    gsap.set(titles[1], { opacity: 0, scale: 0.75 });
    gsap.set(titles[2], { opacity: 0, scale: 0.75 });

    const pinTrigger = ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${window.innerHeight * 5}`,
      pin: true,
      pinSpacing: true,
    });

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: stickySection,
        start: "top top",
        end: `+=${window.innerHeight * 4}`,
        scrub: 0.5,
      },
    });

    // Animations des vidéos
    masterTimeline
      .to(
        titles[0],
        {
          opacity: 0,
          scale: 0.75,
          duration: 0.3,
          ease: "power2.out",
        },
        1
      )
      .to(
        titles[1],
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        },
        1.25
      );

    masterTimeline
      .to(
        titles[1],
        {
          opacity: 0,
          scale: 0.75,
          duration: 0.3,
          ease: "power2.out",
        },
        2.5
      )
      .to(
        titles[2],
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        },
        2.75
      );

    const workHeaderSection = stickyWorkHeaderRef.current;
    const homeWorkSection = homeWorkRef.current;

    let workHeaderPinTrigger;
    if (workHeaderSection && homeWorkSection) {
      workHeaderPinTrigger = ScrollTrigger.create({
        trigger: workHeaderSection,
        start: "top top",
        endTrigger: homeWorkSection,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });
    }

    return () => {
      pinTrigger.kill();
      if (workHeaderPinTrigger) {
        workHeaderPinTrigger.kill();
      }
      if (masterTimeline.scrollTrigger) {
        masterTimeline.scrollTrigger.kill();
      }
      masterTimeline.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ReactLenis root>
      <div className="page home">
        <section className="hero">
          <div className="hero-img">
            <img src="/home/hero.jpg" alt="" />
          </div>

          <div className="hero-header">
            <AnimatedCopy tag="h1" animateOnScroll={false} delay={0.7}>
              Memento
            </AnimatedCopy>
            <AnimatedCopy tag="h1" animateOnScroll={false} delay={0.8}>
            
            </AnimatedCopy>
          </div>
        </section>

        

        <section ref={stickyTitlesRef} className="sticky-titles">
          <div className="sticky-titles-nav">
            <p className="primary sm">À Propos</p>
            <p className="primary sm">Connectons nos visions</p>
          </div>
          <div className="sticky-titles-footer">
            <p className="primary sm">Le pouvoir des images</p>
            <p className="primary sm">Collaborations</p>
          </div>
          
          <div className="video-container" ref={(el) => (titlesRef.current[0] = el)}>
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              preload="auto"
            >
              <source src="https://res.cloudinary.com/drochrcnp/video/upload/v1755871102/test-cloudinary_u7pfrp.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay">
              <h2 className="overlay-text">ÉMOTIONS</h2>
            </div>
          </div>
          
          <div className="video-container" ref={(el) => (titlesRef.current[1] = el)}>
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              preload="auto"
            >
              <source src="https://res.cloudinary.com/drochrcnp/video/upload/v1755871175/test3-cloudinary_pqj87v.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay">
              <h2 className="overlay-text">VISION</h2>
            </div>
          </div>
          
          <div className="video-container" ref={(el) => (titlesRef.current[2] = el)}>
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              preload="auto"
            >
              <source src="https://res.cloudinary.com/drochrcnp/video/upload/v1755871178/test2-cloudinary_ymwk8o.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay">
              <h2 className="overlay-text">Qualité</h2>
            </div>
          </div>
        </section>

        <section ref={stickyWorkHeaderRef} className="sticky-work-header">
          <AnimatedCopy tag="h1" animateOnScroll="true">
            Memento Selection
          </AnimatedCopy>
        </section>

        
        <section ref={homeWorkRef} className="home-work">
          <div className="home-work-list">
            {workItems.map((work, index) => (
              <div key={work.id} className="home-work-item">
                <p className="primary sm">{`${String(index + 1).padStart(
                  2,
                  "0"
                )} - ${String(workItems.length).padStart(2, "0")}`}</p>
                <h3>{work.title}</h3>
                <Link to="/sample-project" className="work-item-img">
                  <img src={work.image} alt={work.title} />
                </Link>
                <h4>{work.category}</h4>
              </div>
            ))}
          </div>
        </section>

            <Reviews />

         <section className="hobbies">
          <div className="home-tools-container">
            <div className="home-tools-row">
              <Link to="/about" className="home-tool-card">
                <div className="home-tool-bg">
                  <img src="/about/tool-1.jpg" alt="" />
                </div>
                <h4>Vidéos</h4>
                <p className="primary sm">Production Audiovisuelle</p>
              </Link>
              <Link to="/about" className="home-tool-card">
                <div className="home-tool-bg">
                  <img src="/about/tool-2.jpg" alt="" />
                </div>
                <h4>Shooting</h4>
                <p className="primary sm">Prise de Vue</p>
              </Link>
              <Link to="/about" className="home-tool-card">
                <div className="home-tool-bg">
                  <img src="/about/tool-3.jpg" alt="" />
                </div>
                <h4>Edit</h4>
                <p className="primary sm">Post Production</p>
              </Link>
              <Link to="/about" className="home-tool-card">
                <div className="home-tool-bg">
                  <img src="/about/tool-4.jpg" alt="" />
                </div>
                <h4>Clip</h4>
                <p className="primary sm">Vidéo Musicale</p>
              </Link>
            </div>
          </div>
        </section>

        <ContactForm />
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Transition(Home);