import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { videos } from "./videos";
import "./Slider.css";

const Slider = () => {
  const sliderRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && sliderRef.current) {
      initializeCards();
    }
  }, [mounted]);

  const initializeCards = () => {
    const cards = Array.from(sliderRef.current.querySelectorAll(".card"));
    gsap.to(cards, {
      y: (i) => 0 + 20 * i + "%",
      z: (i) => 15 * i,
      duration: 1,
      ease: "power3.out",
      stagger: -0.1,
    });
  };

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const slider = sliderRef.current;
    const cards = Array.from(slider.querySelectorAll(".card"));
    const lastCard = cards.pop();

    gsap.to(lastCard, {
      y: "+=150%",
      duration: 0.75,
      ease: "power3.inOut",
      onStart: () => {
        setTimeout(() => {
          slider.prepend(lastCard);
          initializeCards();
          setTimeout(() => {
            setIsAnimating(false);
          }, 1000);
        }, 300);
      },
    });
  };

  if (!mounted) {
    return (
      <div className="container">
        <div className="slider">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            color: 'white' 
          }}>
            Chargement...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" onClick={handleClick}>
      <div className="slider" ref={sliderRef}>
        {videos.map((video) => (
          <div className="card" key={video.id}>
            <div className="card-info">
              <div className="card-item">
                <p>{video.date}</p>
              </div>
              <div className="card-item">
                <p>{video.title}</p>
              </div>
              <div className="card-item">
                <p>{video.category}</p>
              </div>
            </div>

            <div className="video-player">
              <video
                src={video.url}
                autoPlay
                loop
                muted
                playsInline
                onLoadStart={() => {
                  console.log(`Chargement de ${video.title}`);
                }}
                onCanPlay={() => {
                  console.log(`${video.title} peut être lue`);
                }}
                onPlay={() => {
                  console.log(`${video.title} joue`);
                }}
                onError={(e) => {
                  console.error(`Erreur pour ${video.title}:`, e);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;