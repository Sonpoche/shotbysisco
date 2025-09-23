import React from "react";
import "./Footer.css";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-row">
        <div className="footer-contact">
          <h3>
            Creons ensemble <br />
            yourstory<span>@</span>memento.ch
          </h3>

          <p className="secondary">
            De la communication digitale aux événements d’entreprise, jusqu’aux projets privés, nous donnons vie à vos histoires visuelles. Toujours ouverts aux collaborations créatives.
          </p>

          <Link to="/contact" className="btn">
            une histoire à raconter ?
          </Link>
        </div>

        <div className="footer-nav">
          <Link to="/" className="footer-nav-item">
            <span>Accueil</span>
            <span>&#8594;</span>
          </Link>

          <Link to="/portfolio" className="footer-nav-item">
            <span>Portfolio</span>
            <span>&#8594;</span>
          </Link>

          <Link to="/a-propos" className="footer-nav-item">
            <span>L'agence</span>
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
          <div className="footer-header-content">
            <h1>memento</h1>
            <p className="tagline">creating memorable stories</p>
          </div>
        </div>

        <div className="footer-copyright-line">
          <p className="primary sm">&copy; Memento 2025</p>
          <p className="primary sm">made with love by webdevfred</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;