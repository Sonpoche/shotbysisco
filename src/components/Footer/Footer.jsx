import React from "react";
import "./Footer.css";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-row">
        <div className="footer-contact">
          <h3>
            Créons ensemble <br />
            contact<span>@</span>shotbysisco.com
          </h3>

          <p className="secondary">
            De la création de contenu aux shootings photo de marque, je suis toujours ouvert aux collaborations créatives. N’hésite pas à me contacter.
          </p>

          <Link to="/contact" className="btn">
            Prêt à tourner ensemble ?
          </Link>
        </div>

        <div className="footer-nav">
          <Link to="/" className="footer-nav-item">
            <span>Accueil</span>
            <span>&#8594;</span>
          </Link>

          <Link to="/work" className="footer-nav-item">
            <span>Portfolio</span>
            <span>&#8594;</span>
          </Link>

          <Link to="/about" className="footer-nav-item">
            <span>A Propos</span>
            <span>&#8594;</span>
          </Link>

          <Link to="/contact" className="footer-nav-item">
            <span>Contact</span>
            <span>&#8594;</span>
          </Link>

          <Link to="/faq" className="footer-nav-item">
            <span>FAQ</span>
            <span>&#8594;</span>
          </Link>
        </div>
      </div>
      <div className="footer-row">
        <div className="footer-header">
          <h1>Shotby</h1>
          <h1>Sisco</h1>
        </div>

        <div className="footer-copyright-line">
          <p className="primary sm">&copy; ShotBySisco 2025</p>
          <p className="primary sm">made with love by webdevfred</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
