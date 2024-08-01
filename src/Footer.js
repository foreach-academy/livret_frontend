// src/Footer.js
import React from 'react';
import './Footer.css'; // Assurez-vous que le CSS est importé

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-section logo-section">
          <a href="#">
            <img
              src="./mon-projet-header/assets/ForEach_hor_white.png"
              alt="MonLogo"
              className="footer-logo-image"
            />
          </a>
        </div>
        <div className="footer-section social-media">
          <h3>Suivez-nous</h3>

          <div className="social-icons-top">
            <ul className="social-icons">
              <li>
                <a
                  href="https://www.facebook.com/forEachAcademy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="./mon-projet-header/assets/icons8-facebook-nouveau-150.png"
                    alt="Facebook"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@foreach_academy?_t=8oHqzvp6l9M&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="./mon-projet-header/assets/icons8-tic-tac-150.png"
                    alt="TicToc"
                  />
                </a>
              </li>
            </ul>
          </div>

          <div className="social-icons-bottom">
            <ul className="social-icons">
              <li>
                <a
                  href="https://www.instagram.com/foreach_academy?igsh=MW1ieGNmdmdmaWRnNg=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="./mon-projet-header/assets/icons8-instagram-150.png"
                    alt="Instagram"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/school/foreach-academy/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="./mon-projet-header/assets/icons8-linkedin-150.png"
                    alt="LinkedIn"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-section contact-info">
          <h3>Contact</h3>
          <p>Téléphone : 03 20 74 87 30</p>
          <p>
            <a href="https://www.foreach-academy.fr">
              https://www.foreach-academy.fr
            </a>
          </p>
          <p>393 Rue du Général de Gaulle, 59700 Marcq-en-Barœul</p>
        </div>
        <div className="footer-section more-info">
          <h3>En savoir plus</h3>
          <ul>
            <li>
              <a href="#">Confidentialité</a>
            </li>
            <li>
              <a href="#">Règlement</a>
            </li>
            <li>
              <a href="#">Politique</a>
            </li>
          </ul>
        </div>
        <div className="footer-section cgu-info">
          <h3>CGU</h3>
          <p>
            <a href="#">Conditions Générales d'Utilisation</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
