import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArtisanCard from '../components/ArtisanCard';
import { fetchTopArtisans } from '../utils/api';

/**
 * Page d'accueil :
 * - Section hero
 * - Section "Comment trouver mon artisan ?" (4 étapes)
 * - Section "Artisans du mois" (3 top artisans)
 */
const HomePage = () => {
  const [topArtisans, setTopArtisans] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  useEffect(() => {
    document.title = 'Accueil | Trouve ton artisan ! - Région Auvergne-Rhône-Alpes';

    fetchTopArtisans()
      .then(setTopArtisans)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const steps = [
    { num: 1, text: 'Choisir la catégorie d\'artisanat dans le menu.' },
    { num: 2, text: 'Choisir un artisan.' },
    { num: 3, text: 'Le contacter via le formulaire de contact.' },
    { num: 4, text: 'Une réponse sera apportée sous 48h.' },
  ];

  return (
    <main id="main-content">

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="hero" aria-label="Présentation du site">
        <div className="container text-center">
          <h1 className="mb-3">Trouve ton artisan !</h1>
          <p className="mb-4 mx-auto" style={{ maxWidth: '600px' }}>
            Découvrez les artisans de la région Auvergne-Rhône-Alpes et
            contactez-les facilement pour vos projets.
          </p>
          <Link to="/artisans" className="btn btn-light btn-lg fw-bold px-4">
            Voir tous les artisans
          </Link>
        </div>
      </section>

      {/* ─── Comment trouver mon artisan ──────────────────── */}
      <section className="steps-section" aria-labelledby="steps-title">
        <div className="container">
          <h2
            id="steps-title"
            className="text-center fw-bold mb-4"
            style={{ color: '#00497c' }}
          >
            Comment trouver mon artisan ?
          </h2>
          <div className="row g-3">
            {steps.map((step) => (
              <div key={step.num} className="col-6 col-md-3">
                <div className="step-card">
                  <div className="step-number" aria-hidden="true">
                    {step.num}
                  </div>
                  <p className="mb-0 fw-semibold" style={{ fontSize: '0.95rem' }}>
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Artisans du mois ─────────────────────────────── */}
      <section className="top-section" aria-labelledby="top-title">
        <div className="container">
          <h2 id="top-title" className="section-title">
            Les artisans du mois
          </h2>

          {loading && (
            <div className="loader-wrapper" role="status" aria-live="polite">
              <div className="spinner-border" />
              <span className="visually-hidden">Chargement…</span>
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="row g-4">
              {topArtisans.map((artisan) => (
                <div key={artisan.id} className="col-12 col-sm-6 col-lg-4">
                  <ArtisanCard artisan={artisan} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
