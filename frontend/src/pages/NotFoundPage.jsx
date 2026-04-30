import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';

/**
 * Page 404 - Page non trouvée
 * S'affiche pour toute route inconnue via le router React.
 */
const NotFoundPage = () => {
  useEffect(() => {
    setPageSeo(
      'Page non trouvée | Trouve ton artisan !',
      'La page demandée est introuvable. Revenez à l’accueil ou consultez la liste des artisans.'
    );
  }, []);

  return (
    <main id="main-content" className="page-404" aria-labelledby="error-title">
      <img
        src="/logo.png"
        alt="Trouve ton artisan"
        className="error-image"
      />
      <div className="error-code" aria-hidden="true">404</div>

      <h1 id="error-title" className="fw-bold fs-2 mt-3 mb-2">
        Page non trouvée
      </h1>

      <p className="text-muted mb-4" style={{ maxWidth: '420px' }}>
        La page que vous avez demandée n'existe pas ou a été déplacée.
        Revenez à l'accueil pour continuer votre recherche.
      </p>

      <div className="d-flex gap-3 flex-wrap justify-content-center">
        <Link to="/" className="btn btn-primary px-4">
          ← Retour à l'accueil
        </Link>
        <Link to="/artisans" className="btn btn-outline-primary px-4">
          Voir les artisans
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
