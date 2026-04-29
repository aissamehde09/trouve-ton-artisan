import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArtisanCard from '../components/ArtisanCard';
import { fetchArtisans } from '../utils/api';

/**
 * Page liste des artisans.
 * Lit les paramètres URL : ?search=... ou ?categorie=...
 */
const ArtisansPage = () => {
  const [searchParams]           = useSearchParams();
  const [artisans, setArtisans]  = useState([]);
  const [loading, setLoading]    = useState(true);
  const [error, setError]        = useState(null);

  const search    = searchParams.get('search')    || '';
  const categorie = searchParams.get('categorie') || '';

  // Titre de page dynamique
  const pageTitle = categorie
    ? categorie
    : search
    ? `Résultats pour "${search}"`
    : 'Tous les artisans';

  useEffect(() => {
    document.title = `${pageTitle} | Trouve ton artisan !`;
    setLoading(true);
    setError(null);

    fetchArtisans({ search, categorie })
      .then(setArtisans)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [search, categorie, fetchArtisans]);

  return (
    <main id="main-content" className="liste-page">
      <div className="container">
        <h1 className="page-title">{pageTitle}</h1>

        {!loading && !error && (
          <p className="results-count">
            {artisans.length} artisan{artisans.length > 1 ? 's' : ''} trouvé
            {artisans.length > 1 ? 's' : ''}
          </p>
        )}

        {loading && (
          <div className="loader-wrapper" role="status" aria-live="polite">
            <div className="spinner-border" />
            <span className="visually-hidden">Chargement…</span>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">{error}</div>
        )}

        {!loading && !error && artisans.length === 0 && (
          <div className="alert alert-info" role="status">
            Aucun artisan trouvé pour cette recherche.
          </div>
        )}

        {!loading && !error && artisans.length > 0 && (
          <div className="row g-4">
            {artisans.map((artisan) => (
              <div key={artisan.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <ArtisanCard artisan={artisan} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ArtisansPage;
