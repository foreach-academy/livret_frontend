import React from "react";
import "../../styles/Footer/Footer.css";

import LogoImage from "../../assets/images/ForEach_hor_white.png";
import FacebookIcon from "../../assets/images/icons8-facebook-nouveau-100.png";
import TikTokIcon from "../../assets/images/icons8-tic-tac-100.png";
import InstagramIcon from "../../assets/images/icons8-instagram-100.png";
import LinkedInIcon from "../../assets/images/icons8-linkedin-100-2.png";

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="logo-icons-box">
          {/* <div className="footer-section logo-section"> */}
            <a href="#">
              <img
                src={LogoImage}
                alt="MonLogo"
                className="footer-logo-image"
              />
            </a>
          {/* </div> */}
          <div className="footer-section social-media">
            <h3 id="follow_us">Suivez-nous</h3>
            <ul className="social-icons">
              <li>
                <a
                  href="https://www.facebook.com/forEachAcademy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={FacebookIcon} alt="Facebook" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@foreach_academy?_t=8oHqzvp6l9M&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={TikTokIcon} alt="TicToc" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/foreach_academy?igsh=MW1ieGNmdmdmaWRnNg=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={InstagramIcon} alt="Instagram" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/school/foreach-academy/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={LinkedInIcon} alt="LinkedIn" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-section contact-info">
          <div id="contact-title">
            <h3>Contact</h3>
          </div>
          <div id="contact-details">
            <p>03 20 74 87 30</p>
            <p>
              <a href="https://www.foreach-academy.fr">
                www.foreach-academy.fr
              </a>
            </p>
            <p>393 Rue du Général de Gaulle 59700 Marcq-en-Barœul</p>
          </div>
        </div>
        <div className="footer-section more-info">
          <div className="footer-section info-title">
            <h3>En savoir plus</h3>
          </div>
          <div className="footer-section info-links">
            <ul>
              <li>
              <a href="#">Conditions Générales d'Utilisation</a>
              </li>
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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
