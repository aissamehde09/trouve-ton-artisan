import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Stars from '../components/Stars';
import FontAwesomeIcon from '../components/FontAwesomeIcon';
import { fetchArtisanById, sendContactMessage } from '../utils/api';

/**
 * Retourne une icône selon la spécialité de l'artisan
 */
const getSpecialiteIcon = (specialite) => {
  const icons = {
    // Bâtiment
    'Plombier': 'plombier',
    'Électricien': 'electricien',
    'Electricien': 'electricien',
    'électricien': 'electricien',
    'electricien': 'electricien',
    'Chauffagiste': 'chauffagiste',
    'Maçon': 'macon',
    'Couvreur': 'couvreur',
    'Menuisier': 'menuisier',
    'Peintre': 'peintre',
    'Carreleur': 'carreleur',
    
    // Alimentation
    'Boulanger': 'boulanger',
    'Pâtissier': 'patissier',
    'Chocolatier': 'chocolatier',
    'Fromager': 'fromager',
    'Boucher': 'boucher',
    'Caviste': 'caviste',
    'Traiteur': 'traiteur',
    
    // Fabrication
    'Ébéniste': 'ebeniste',
    'Forgeron': 'forgeron',
    'Potier': 'potier',
    'Verrier': 'verrier',
    'Tailleur de pierre': 'tailleur-de-pierre',
    
    // Services
    'Coiffeur': 'coiffeur',
    'Esthéticienne': 'estheticienne',
    'Jardinier': 'jardinier',
    'Mécanicien': 'mecanicien',
    'Photographe': 'photographe',
    'Couturier': 'couturier',
    'Bijoutier': 'bijoutier',
    'Ferronnier': 'ferronnier',
    'Webdesign': 'webdesign',
    'Fleuriste': 'fleuriste',
    'Toiletteur': 'toiletteur',
  };
  
  return icons[specialite] || 'default'; // Icône par défaut
};

/**
 * Page fiche artisan.
 * Affiche toutes les infos + formulaire de contact.
 */
const ArtisanPage = () => {
  const { id } = useParams();
  const [artisan, setArtisan]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // Formulaire de contact
  const [form, setForm]         = useState({ nom: '', email: '', objet: '', message: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(null);
  const [formError, setFormError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchArtisanById(id)
      .then((data) => {
        setArtisan(data);
        document.title = `${data.nom} | Trouve ton artisan !`;
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      await sendContactMessage({
        ...form,
        artisan_email: artisan.email,
        artisan_nom:   artisan.nom,
      });
      setFormSuccess('Votre message a bien été envoyé ! L\'artisan vous répondra sous 48h.');
      setForm({ nom: '', email: '', objet: '', message: '' });
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loader-wrapper" role="status" aria-live="polite">
        <div className="spinner-border" />
        <span className="visually-hidden">Chargement…</span>
      </div>
    );
  }

  if (error || !artisan) {
    return (
      <main className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error || 'Artisan introuvable.'}
        </div>
        <Link to="/artisans" className="btn btn-primary">
          ← Retour à la liste
        </Link>
      </main>
    );
  }

  const specialite = artisan.specialite?.nom || '';
  const categorie  = artisan.specialite?.categorie?.nom || '';
  const icon = getSpecialiteIcon(specialite);

  return (
    <main id="main-content" className="fiche-artisan">
      <div className="container">

        {/* Fil d'Ariane */}
        <nav aria-label="Fil d'Ariane" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Accueil</Link></li>
            {categorie && (
              <li className="breadcrumb-item">
                <Link to={`/artisans?categorie=${encodeURIComponent(categorie)}`}>
                  {categorie}
                </Link>
              </li>
            )}
            <li className="breadcrumb-item active" aria-current="page">
              {artisan.nom}
            </li>
          </ol>
        </nav>

        <div className="row g-4">

          {/* ─── Colonne gauche : infos ─────────────────── */}
          <div className="col-lg-5">

            {/* Photo / placeholder */}
            {artisan.photo ? (
              <img
                src={artisan.photo}
                alt={`Photo de ${artisan.nom}`}
                className="artisan-photo mb-3"
              />
            ) : (
              <div
                className="artisan-photo-placeholder mb-3"
                aria-hidden="true"
              >
                <FontAwesomeIcon name={icon} size={120} />
              </div>
            )}

            <h1 className="fw-bold fs-3 mb-2">{artisan.nom}</h1>

            <div className="mb-2">
              <Stars note={parseFloat(artisan.note)} />
            </div>

            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="badge-specialite">{specialite}</span>
              {categorie && (
                <span
                  className="badge bg-light text-secondary border"
                  style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem' }}
                >
                  {categorie}
                </span>
              )}
            </div>

            <p className="mb-2">
              <span aria-hidden="true">📍 </span>
              <strong>{artisan.ville}</strong>
            </p>

            {artisan.site_web && (
              <p className="mb-3">
                <span aria-hidden="true">🌐 </span>
                <a
                  href={artisan.site_web}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {artisan.site_web.replace(/^https?:\/\//, '')}
                </a>
              </p>
            )}

            {/* À propos */}
            {artisan.a_propos && (
              <section aria-labelledby="apropos-title" className="mt-4">
                <h2 id="apropos-title" className="h5 fw-bold text-primary mb-2">
                  À propos
                </h2>
                <p>{artisan.a_propos}</p>
              </section>
            )}
          </div>

          {/* ─── Colonne droite : formulaire contact ────── */}
          <div className="col-lg-7">
            <section
              aria-labelledby="contact-title"
              className="contact-form"
            >
              <h2 id="contact-title" className="h5 fw-bold text-primary mb-3">
                Contacter {artisan.nom}
              </h2>

              {formSuccess && (
                <div className="alert alert-success" role="alert">
                  {formSuccess}
                </div>
              )}
              {formError && (
                <div className="alert alert-danger" role="alert">
                  {formError}
                </div>
              )}

              <form onSubmit={handleFormSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="contact-nom" className="form-label">
                    Votre nom *
                  </label>
                  <input
                    id="contact-nom"
                    type="text"
                    name="nom"
                    className="form-control"
                    value={form.nom}
                    onChange={handleFormChange}
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="contact-email" className="form-label">
                    Votre email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleFormChange}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="contact-objet" className="form-label">
                    Objet *
                  </label>
                  <input
                    id="contact-objet"
                    type="text"
                    name="objet"
                    className="form-control"
                    value={form.objet}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="contact-message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-control"
                    rows="5"
                    value={form.message}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={formLoading}
                >
                  {formLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                      Envoi en cours…
                    </>
                  ) : (
                    'Envoyer le message'
                  )}
                </button>

                <p className="text-muted mt-2 mb-0" style={{ fontSize: '0.8rem' }}>
                  Une réponse vous sera apportée sous 48h.
                </p>
              </form>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArtisanPage;
