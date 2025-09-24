import React from "react";
import { useForm, ValidationError } from '@formspree/react';
import "./ContactForm.css";

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xqaykobn");

  // Afficher un message de succès après envoi réussi
  if (state.succeeded) {
    return (
      <div className="contact-form">
        <div className="contact-form-row">
          <div className="contact-form-row-copy-item">
            <p className="primary sm">imaginons ensemble</p>
          </div>
          <div className="contact-form-row-copy-item">
            <p className="primary sm">(memento)</p>
          </div>
          <div className="contact-form-row-copy-item">
            <p className="primary sm">&copy; 2025</p>
          </div>
        </div>

        <div className="contact-form-row">
          <div className="contact-form-col">
            <div className="contact-form-header">
              <h3>message envoye avec succes !</h3>
              <p>
                merci pour votre message. nous vous repondrons rapidement.
              </p>
            </div>

            <div className="contact-form-availability">
              <p className="primary sm">agence</p>
              <p className="primary sm">suisse</p>
            </div>
          </div>

          <div className="contact-form-col">
            <div className="form-item">
              <button 
                className="btn"
                onClick={() => window.location.reload()}
              >
                envoyer un autre message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form">
      <div className="contact-form-row">
        <div className="contact-form-row-copy-item">
          <p className="primary sm">imaginons ensemble</p>
        </div>
        <div className="contact-form-row-copy-item">
          <p className="primary sm">(memento)</p>
        </div>
        <div className="contact-form-row-copy-item">
          <p className="primary sm">&copy; 2025</p>
        </div>
      </div>

      <div className="contact-form-row">
        <div className="contact-form-col">
          <div className="contact-form-header">
            <h3>une histoire a raconter ? rendons-la memorable.</h3>
            <p>
              ton histoire merite d'etre partagee. confie-moi ton projet et voyons comment la mettre en lumiere.
            </p>
          </div>

          <div className="contact-form-availability">
            <p className="primary sm">agence</p>
            <p className="primary sm">suisse</p>
          </div>
        </div>

        <div className="contact-form-col">
          <form onSubmit={handleSubmit}>
            <div className="form-item">
              <input 
                type="text" 
                name="name"
                placeholder="nom et prenom *" 
                required
              />
              <ValidationError 
                prefix="Name" 
                field="name"
                errors={state.errors}
                style={{ color: 'var(--bg)', fontSize: '0.85rem', marginTop: '0.5rem' }}
              />
            </div>

            <div className="form-item">
              <input 
                type="email" 
                name="email"
                placeholder="e-mail *" 
                required
              />
              <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
                style={{ color: 'var(--bg)', fontSize: '0.85rem', marginTop: '0.5rem' }}
              />
            </div>

            <div className="form-item">
              <input 
                type="tel" 
                name="phone"
                placeholder="telephone *" 
                required
              />
              <ValidationError 
                prefix="Phone" 
                field="phone"
                errors={state.errors}
                style={{ color: 'var(--bg)', fontSize: '0.85rem', marginTop: '0.5rem' }}
              />
            </div>

            <div className="form-item">
              <textarea 
                name="message"
                rows={6} 
                placeholder="message" 
              />
              <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
                style={{ color: 'var(--bg)', fontSize: '0.85rem', marginTop: '0.5rem' }}
              />
            </div>

            <div className="form-item">
              <button 
                type="submit" 
                className="btn"
                disabled={state.submitting}
              >
                {state.submitting ? 'envoi...' : 'envoyer'}
              </button>
            </div>

            {/* Afficher les erreurs générales s'il y en a */}
            {state.errors && state.errors.length > 0 && (
              <div className="form-message error" style={{ 
                marginTop: '1em', 
                padding: '1em', 
                backgroundColor: 'rgba(255,0,0,0.1)', 
                borderRadius: '0.5em',
                border: '1px solid rgba(255,0,0,0.3)'
              }}>
                <p style={{ color: 'var(--bg)', margin: 0 }}>
                  erreur lors de l'envoi. veuillez verifier vos informations.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;