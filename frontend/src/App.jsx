import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header       from './components/Header';
import Footer       from './components/Footer';
import HomePage     from './pages/HomePage';
import ArtisansPage from './pages/ArtisansPage';
import ArtisanPage  from './pages/ArtisanPage';
import LegalPage    from './pages/LegalPage';
import NotFoundPage from './pages/NotFoundPage';

import { fetchCategories } from './utils/api';
import './styles/main.scss';

/**
 * Composant racine de l'application.
 * Charge les catégories une seule fois pour le menu du header.
 */
function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error('Erreur chargement catégories :', err));
  }, []);

  return (
    <BrowserRouter>
      {/* Lien d'évitement pour l'accessibilité WCAG 2.1 */}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      <Header categories={categories} />

      <Routes>
        <Route path="/"                     element={<HomePage />} />
        <Route path="/artisans"             element={<ArtisansPage />} />
        <Route path="/artisan/:id"          element={<ArtisanPage />} />
        <Route path="/mentions-legales"     element={<LegalPage />} />
        <Route path="/donnees-personnelles" element={<LegalPage />} />
        <Route path="/accessibilite"        element={<LegalPage />} />
        <Route path="/cookies"              element={<LegalPage />} />
        {/* Toute autre route → 404 */}
        <Route path="*"                     element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
