import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Page légale générique.
 * Header + footer présents, contenu "Page en construction".
 * Sera complétée par un cabinet spécialisé.
 */
const LegalPage = () => {
  const location = useLocation();

  // Titre dynamique selon la route
  const titles = {
    '/mentions-legales':      'Mentions légales',
    '/donnees-personnelles':  'Données personnelles',
    '/accessibilite':         'Accessibilité',
    '/cookies':               'Cookies',
  };

  const title = titles[location.pathname] || 'Page légale';

  useEffect(() => {
    document.title = `${title} | Trouve ton artisan !`;
  }, [title]);

  return (
    <main id="main-content" className="container py-5">
      <h1 className="fw-bold mb-4" style={{ color: '#00497c' }}>{title}</h1>
      <div
        className="alert"
        role="status"
        style={{ background: '#f1f8fc', border: '2px dashed #0074c7', color: '#384050' }}
      >
        <strong>Page en construction.</strong> Ce contenu sera prochainement
        complété par un cabinet juridique spécialisé.
      </div>
    </main>
  );
};

export default LegalPage;
