import React from 'react';

/**
 * Composant Icon - Affiche une icône SVG codée en dur
 * Props : name (nom de l'icône), size (taille en pixels), className
 */
const Icon = ({ name, size = 64, className = '' }) => {
  const icons = {
    // Bâtiment
    electricien: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0074c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    plombier: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0074c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4 1.5L2 12"/>
        <path d="M2 12l7 7v-4c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v4l7-7z"/>
      </svg>
    ),
    chauffagiste: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0074c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20"/>
        <path d="M12 2l4 4-4 4-4-4z"/>
        <path d="M12 18l4 4-4 4-4-4z"/>
      </svg>
    ),
    macon: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0074c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 9h6"/>
        <path d="M9 15h6"/>
      </svg>
    ),
    
    // Alimentation
    boulanger: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0074c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5z"/>
        <circle cx="9" cy="12" r="3"/>
        <path d="M12 2v4"/>
        <path d="M12 18v4"/>
      </svg>
    ),
    patissier: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0074c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"/>
        <path d="M12 15v6"/>
        <path d="M8 19h8"/>
      </svg>
    ),
    chocolatier: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0074c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <path d="M8 12h8"/>
        <path d="M12 8v8"/>
      </svg>
    ),
    traiteur: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0074c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
        <path d="M7 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
        <path d="M11 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
        <path d="M15 22v-7c0-1.1-.9-2-2-2h-4a2 2 0 0 0-2 2v7"/>
      </svg>
    ),
    
    // Fabrication
    ebeniste: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0074c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 9h6"/>
        <path d="M9 15h6"/>
        <path d="M12 3v18"/>
      </svg>
    ),
    forgeron: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0074c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 1 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    
    // Services
    coiffeur: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0074c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20"/>
        <path d="M12 2l4 4-4 4-4-4z"/>
        <path d="M12 18l4 4-4 4-4-4z"/>
      </svg>
    ),
    bijoutier: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0074c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"/>
        <path d="M12 15v6"/>
        <path d="M8 19h8"/>
      </svg>
    ),
    couturier: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0074c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18"/>
        <path d="M3 12h18"/>
        <path d="M3 21h18"/>
        <path d="M7 3v18"/>
        <path d="M17 3v18"/>
      </svg>
    ),
    webdesign: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0074c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8"/>
        <path d="M12 17v4"/>
      </svg>
    ),
    fleuriste: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0074c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2v20"/>
        <path d="M12 2l4 4-4 4-4-4z"/>
      </svg>
    ),
    
    // Icône par défaut
    default: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0074c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    )
  };

  const icon = icons[name];
  
  if (!icon) {
    console.warn(`Icon not found: ${name}`);
    return icons.default; // Fallback
  }

  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </div>
  );
};

export default Icon;
