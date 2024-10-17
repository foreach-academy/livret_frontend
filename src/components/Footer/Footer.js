import React from "react";
import "../../styles/Footer/Footer.css";
import DOMPurify from 'dompurify';

import LogoImage from "../../assets/images/ForEach_hor_white.png";
import FacebookIcon from "../../assets/images/icons8-facebook-nouveau-100.png";
import TikTokIcon from "../../assets/images/icons8-tic-tac-100.png";
import InstagramIcon from "../../assets/images/icons8-instagram-100.png";
import LinkedInIcon from "../../assets/images/icons8-linkedin-100-2.png";

function Footer() {
  // URLs des réseaux sociaux
  const socialMediaLinks = [
    {
      href: "https://www.facebook.com/forEachAcademy",
      icon: FacebookIcon,
      alt: "Facebook"
    },
    {
      href: "https://www.tiktok.com/@foreach_academy?_t=8oHqzvp6l9M&_r=1",
      icon: TikTokIcon,
      alt: "Tiktok"
    },
    {
      href: "https://www.instagram.com/foreach_academy?igsh=MW1ieGNmdmdmaWRnNg==",
      icon: InstagramIcon,
      alt: "Instagram"
    },
    {
      href: "https://www.linkedin.com/school/foreach-academy/posts/?feedView=all",
      icon: LinkedInIcon,
      alt: "LinkedIn"
    },
  ];

  // Fonction pour sanitiser les URLs
  const sanitizeUrl = (url) => {
    const cleanUrl = DOMPurify.sanitize(url, { ALLOWED_URI_REGEXP: /^(https?:\/\/[^\s]+)$/ });
    return cleanUrl;
  };

  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="logo-icons-box footer-section">
          <a href="/">
            <img
              src={LogoImage}
              alt="Logo Foreach Academy"
              className="footer-logo-image"
            />
          </a>
          <div className="social-media">
            <h3>Suivez-nous</h3>
            <ul className="social-icons">
              {socialMediaLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={sanitizeUrl(link.href)} // Nettoyage de l'URL
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={link.icon} alt={link.alt} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <section className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>
              <span>03 20 74 87 30</span>
            </li>
            <li>
              <a href={sanitizeUrl("https://www.foreach-academy.fr")}>www.foreach-academy.fr</a>
            </li>
            <li>
              <span>393 Rue du Général de Gaulle 59700 Marcq-en-Barœul</span>
            </li>
          </ul>
        </section>
        <section className="footer-section">
          <h3>En savoir plus</h3>
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
        </section>
      </div>
    </footer>
  );
}

export default Footer;
