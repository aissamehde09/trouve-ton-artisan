import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

/**
 * Composant Header - Navigation principale du site.
 * Les catégories sont passées en props (chargées depuis l'API).
 * Inclut la barre de recherche et le menu responsive.
 */
const Header = ({ categories = [] }) => {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/artisans?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setMenuOpen(false);
    }
  };

  return (
    <header className="site-header" role="banner">
      <nav
        className="navbar navbar-expand-lg container"
        aria-label="Navigation principale"
      >
        {/* Logo */}
        <Link to="/" className="navbar-brand" aria-label="Trouve ton artisan - Accueil">
          <img
            src="/logo.png"
            alt="Trouve ton artisan ! Avec la région Auvergne-Rhône-Alpes"
          />
        </Link>

        {/* Bouton hamburger mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Ouvrir le menu de navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`navbar-collapse ${menuOpen ? 'show' : 'collapse'}`}>
          {/* Menu catégories depuis la BDD */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" role="menubar">
            {categories.map((cat) => (
              <li key={cat.id} className="nav-item" role="none">
                <NavLink
                  to={`/artisans?categorie=${encodeURIComponent(cat.nom)}`}
                  className="nav-link"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.nom}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Barre de recherche */}
          <form
            onSubmit={handleSearch}
            className="d-flex align-items-center"
            role="search"
            aria-label="Rechercher un artisan"
          >
            <input
              className="form-control search-input"
              type="search"
              placeholder="Rechercher un artisan…"
              aria-label="Rechercher un artisan par nom"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ borderRadius: '2rem 0 0 2rem' }}
            />
            <button
              type="submit"
              className="search-btn"
              aria-label="Lancer la recherche"
            >
              🔍
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
