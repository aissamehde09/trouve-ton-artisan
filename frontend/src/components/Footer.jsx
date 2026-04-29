import { Link } from 'react-router-dom';

/**
 * Composant Footer - Pied de page identique sur toutes les pages.
 * Contient le menu légal et les coordonnées du bureau de Lyon.
 */
const Footer = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="row gap-4 gap-md-0">

          {/* Coordonnées Lyon */}
          <div className="col-md-4">
            <p className="footer-title">Région Auvergne-Rhône-Alpes</p>
            <address style={{ fontStyle: 'normal', lineHeight: '1.8' }}>
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
            </address>
          </div>

          {/* Pages légales */}
          <div className="col-md-4">
            <p className="footer-title">Informations légales</p>
            <ul className="list-unstyled" style={{ lineHeight: '2' }}>
              <li><Link to="/mentions-legales">Mentions légales</Link></li>
              <li><Link to="/donnees-personnelles">Données personnelles</Link></li>
              <li><Link to="/accessibilite">Accessibilité</Link></li>
              <li><Link to="/cookies">Cookies</Link></li>
            </ul>
          </div>

          {/* À propos */}
          <div className="col-md-4">
            <p className="footer-title">Trouve ton artisan !</p>
            <p>
              La plateforme de la région Auvergne-Rhône-Alpes pour trouver
              et contacter des artisans locaux qualifiés.
            </p>
            <a
              href="https://www.auvergnerhonealpes.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              auvergnerhonealpes.fr ↗
            </a>
          </div>
        </div>

        <hr className="mt-4" />

        <p className="text-center mb-0" style={{ fontSize: '0.8rem', opacity: 0.6 }}>
          © {new Date().getFullYear()} Région Auvergne-Rhône-Alpes. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
