import { Link } from 'react-router-dom';
import Stars from './Stars';
import FontAwesomeIcon from './FontAwesomeIcon';

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
 * Composant ArtisanCard - Carte cliquable d'un artisan
 */
const ArtisanCard = ({ artisan }) => {
  const specialite = artisan.specialite?.nom || '';
  const icon = getSpecialiteIcon(specialite);

  return (
    <Link
      to={`/artisan/${artisan.id}`}
      className="artisan-card d-block text-decoration-none"
      aria-label={`Voir la fiche de ${artisan.nom}`}
    >
      <div className="card border-0 h-100">
        {/* Image / placeholder */}
        {artisan.photo ? (
          <img
            src={artisan.photo}
            alt={`Photo de ${artisan.nom}`}
            className="card-img-top"
          />
        ) : (
          <div
            className="card-img-top d-flex align-items-center justify-content-center bg-light"
            aria-hidden="true"
            style={{ height: '180px' }}
          >
            <FontAwesomeIcon name={icon} size={64} />
          </div>
        )}

        <div className="card-body d-flex flex-column gap-1 p-3">
          <h2 className="card-title fs-6 fw-bold mb-1">{artisan.nom}</h2>
          <Stars note={parseFloat(artisan.note)} />
          <span className="card-specialite">{specialite}</span>
          <p className="card-ville mb-0 mt-auto">
            <span aria-hidden="true">📍 </span>
            {artisan.ville}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ArtisanCard;
