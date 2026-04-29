/**
 * Composant Stars - Affiche la note sous forme d'étoiles
 * Accessible : utilise aria-label pour les lecteurs d'écran
 */
const Stars = ({ note, showNote = true }) => {
  const full  = Math.floor(note);
  const half  = note % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return (
    <span
      className="stars"
      aria-label={`Note : ${note} sur 5`}
      role="img"
    >
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(empty)}
      {showNote && (
        <span className="ms-1 text-muted" style={{ fontSize: '0.85rem' }}>
          ({note}/5)
        </span>
      )}
    </span>
  );
};

export default Stars;
