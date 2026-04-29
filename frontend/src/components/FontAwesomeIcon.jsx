import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // Bâtiment
  faBolt as faElectricien,
  faWrench as faPlombier,
  faFire as faChauffagiste,
  faCube as faMacon,
  faHome as faCouvreur,
  faHammer as faMenuisier,
  faPaintBrush as faPeintre,
  faSquare as faCarreleur,
  
  // Alimentation
  faBreadSlice as faBoulanger,
  faCookie as faPatissier,
  faCookieBite as faChocolatier,
  faCheese as faFromager,
  faDrumstickBite as faBoucher,
  faWineGlass as faCaviste,
  faUtensils as faTraiteur,
  
  // Fabrication
  faChair as faEbeniste,
  faHammer as faForgeron,
  faMugHot as faPotier,
  faGem as faVerrier,
  faMountain as faTailleurPierre,
  
  // Services
  faCut as faCoiffeur,
  faHandSparkles as faEstheticienne,
  faSeedling as faJardinier,
  faWrench as faMecanicien,
  faCamera as faPhotographe,
  faTshirt as faCouturier,
  faRing as faBijoutier,
  faCog as faFerronnier,
  faLaptopCode as faWebdesign,
  faSeedling as faFleuriste,
  faDog as faToiletteur,
  
  // Icône par défaut
  faTools as faDefault
} from '@fortawesome/free-solid-svg-icons';

/**
 * Composant FontAwesomeIcon - Affiche une icône Font Awesome selon la spécialité
 * Props : name (nom de l'icône), size (taille en pixels), className
 */
const FontAwesomeIconComponent = ({ name, size = 64, className = '' }) => {
  const icons = {
    // Bâtiment
    electricien: faElectricien,
    plombier: faPlombier,
    chauffagiste: faChauffagiste,
    macon: faMacon,
    couvreur: faCouvreur,
    menuisier: faMenuisier,
    peintre: faPeintre,
    carreleur: faCarreleur,
    
    // Alimentation
    boulanger: faBoulanger,
    patissier: faPatissier,
    chocolatier: faChocolatier,
    fromager: faFromager,
    boucher: faBoucher,
    caviste: faCaviste,
    traiteur: faTraiteur,
    
    // Fabrication
    ebeniste: faEbeniste,
    forgeron: faForgeron,
    potier: faPotier,
    verrier: faVerrier,
    'tailleur-de-pierre': faTailleurPierre,
    
    // Services
    coiffeur: faCoiffeur,
    estheticienne: faEstheticienne,
    jardinier: faJardinier,
    mecanicien: faMecanicien,
    photographe: faPhotographe,
    couturier: faCouturier,
    bijoutier: faBijoutier,
    ferronnier: faFerronnier,
    webdesign: faWebdesign,
    fleuriste: faFleuriste,
    toiletteur: faToiletteur,
    
    // Icône par défaut
    default: faDefault
  };

  const icon = icons[name];
  
  if (!icon) {
    console.warn(`Icon not found: ${name}`);
    return <FontAwesomeIcon icon={faDefault} size="2x" className={className} color="#0074c7" />;
  }

  return (
    <FontAwesomeIcon 
      icon={icon} 
      size="3x" 
      className={className} 
      color="#0074c7"
      style={{ fontSize: `${size}px` }}
    />
  );
};

export default FontAwesomeIconComponent;
