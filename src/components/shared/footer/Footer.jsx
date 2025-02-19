import React from "react";
import "../../../styles/Footer/Footer.css";
import DOMPurify from 'dompurify';
import { FRONT_HOME, FRONT_CGU, FRONT_CONFIDENTIAL, FRONT_RULES, FRONT_POLICY } from "../../../utils/frontUrl";
import { Link } from "react-router-dom";

function Footer() {
  // URLs des réseaux sociaux
  const socialMediaLinks = [
    {
      href: "https://www.facebook.com/forEachAcademy",
      icon: process.env.PUBLIC_URL + "/images/icons/fb_icon.png",
      alt: "Facebook"
    },
    {
      href: "https://www.tiktok.com/@foreach_academy?_t=8oHqzvp6l9M&_r=1",
      icon: process.env.PUBLIC_URL + "/images/icons/tiktok_icon.png",
      alt: "Tiktok"
    },
    {
      href: "https://www.instagram.com/foreach_academy?igsh=MW1ieGNmdmdmaWRnNg==",
      icon: process.env.PUBLIC_URL + "/images/icons/insta_icon.png",
      alt: "Instagram"
    },
    {
      href: "https://www.linkedin.com/school/foreach-academy/posts/?feedView=all",
      icon: process.env.PUBLIC_URL + "/images/icons/linkedin_icon.png",
      alt: "LinkedIn"
    },
  ];

  // Fonction pour sanitiser les URLs pour éviter les attaque XSS
  const sanitizeUrl = (url) => {
    const cleanUrl = DOMPurify.sanitize(url, { ALLOWED_URI_REGEXP: /^(https?:\/\/[^\s]+)$/ });
    return cleanUrl;
  };

  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="logo-icons-box footer-section">
          <Link to={FRONT_HOME}>
            <img
              src={process.env.PUBLIC_URL + "/images/fe_logo.png"}
              alt="Logo Foreach Academy"
              className="footer-logo-image"
            />
          </Link>
          <div className="social-media">
            <h3>Suivez-nous</h3>
            <ul className="social-icons">
              {socialMediaLinks.map((link, index) => (
                <li key={index}>
                  <Link to={sanitizeUrl(link.href)} // Nettoyage de l'URL
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={link.icon} alt={link.alt} />
                  </Link>
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
              <Link to={sanitizeUrl("https://www.foreach-academy.fr")}>www.foreach-academy.fr</Link>
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
              <Link to={FRONT_CGU}>Conditions Générales d'Utilisation</Link>
            </li>
            <li>
              <Link to={FRONT_CONFIDENTIAL}>Confidentialité</Link>
            </li>
            <li>
              <Link to={FRONT_RULES}>Règlement</Link>
            </li>
            <li>
              <Link to={FRONT_POLICY}>Politique</Link>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
