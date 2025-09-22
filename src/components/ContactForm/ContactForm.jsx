import React from "react";
import "./ContactForm.css";

const ContactForm = () => {
  return (
    <div className="contact-form">
      <div className="contact-form-row">
        <div className="contact-form-row-copy-item">
          <p className="primary sm">Imaginons ensemble</p>
        </div>
        <div className="contact-form-row-copy-item">
          <p className="primary sm">(Memento)</p>
        </div>
        <div className="contact-form-row-copy-item">
          <p className="primary sm">&copy; 2025</p>
        </div>
      </div>

      <div className="contact-form-row">
        <div className="contact-form-col">
          <div className="contact-form-header">
            <h3>Une histoire a raconter ? Rendons-la memorable.</h3>

            <p>
              Ton histoire mérite d’être partagée. Confie-moi ton projet et voyons comment la mettre en lumière.
            </p>
          </div>

          <div className="contact-form-availability">
            <p className="primary sm">Agence</p>
            <p className="primary sm">Suisse</p>
          </div>
        </div>

        <div className="contact-form-col">
          <div className="form-item">
            <input type="text" placeholder="Nom & Prénom" />
          </div>

          <div className="form-item">
            <input type="text" placeholder="E-mail" />
          </div>

          <div className="form-item">
            <textarea type="text" rows={6} placeholder="Message" />
          </div>

          <div className="form-item">
            <button className="btn">Envoyer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
