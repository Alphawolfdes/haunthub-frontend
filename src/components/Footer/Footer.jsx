import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__left">
            <p className="footer__text">
              © {currentYear} HauntHub. Exploring the paranormal, one story at a
              time.
            </p>
          </div>

          <div className="footer__right">
            <p className="footer__disclaimer">
              Stories sourced from Reddit's public API
            </p>
          </div>
        </div>

        <div className="footer__divider"></div>

        <div className="footer__bottom">
          <p className="footer__credits">
            Built with ❤️ for horror enthusiasts • Data from Reddit
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
