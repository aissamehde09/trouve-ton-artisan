-- ============================================================
-- Script d'alimentation de la base de données
-- Jeu d'essais issu du fichier data.xlsx fourni
-- ============================================================

USE railway;

-- ─── Catégories ───────────────────────────────────────────
INSERT INTO categories (nom) VALUES
  ('Alimentation'),
  ('Bâtiment'),
  ('Fabrication'),
  ('Services');

-- ─── Spécialités ──────────────────────────────────────────
-- Alimentation (id=1)
INSERT INTO specialites (nom, categorie_id) VALUES
  ('Boucher',      1),
  ('Boulanger',    1),
  ('Chocolatier',  1),
  ('Traiteur',     1);

-- Bâtiment (id=2)
INSERT INTO specialites (nom, categorie_id) VALUES
  ('Chauffagiste', 2),
  ('Electricien',  2),
  ('Menuisier',    2),
  ('Plombier',     2);

-- Fabrication (id=3)
INSERT INTO specialites (nom, categorie_id) VALUES
  ('Bijoutier',    3),
  ('Couturier',    3),
  ('Ferronier',    3);

-- Services (id=4)
INSERT INTO specialites (nom, categorie_id) VALUES
  ('Coiffeur',     4),
  ('Fleuriste',    4),
  ('Toiletteur',   4),
  ('Webdesign',    4);

-- ─── Artisans ─────────────────────────────────────────────
INSERT INTO artisans (nom, note, ville, a_propos, email, site_web, top, specialite_id) VALUES
  (
    'Boucherie Dumont', 4.5, 'Lyon',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'boucherie.dumond@gmail.com', NULL, 0,
    (SELECT id FROM specialites WHERE nom = 'Boucher')
  ),
  (
    'Au pain chaud', 4.8, 'Montélimar',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'aupainchaud@hotmail.com', NULL, 1,
    (SELECT id FROM specialites WHERE nom = 'Boulanger')
  ),
  (
    'Chocolaterie Labbé', 4.9, 'Lyon',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 1,
    (SELECT id FROM specialites WHERE nom = 'Chocolatier')
  ),
  (
    'Traiteur Truchon', 4.1, 'Lyon',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 0,
    (SELECT id FROM specialites WHERE nom = 'Traiteur')
  ),
  (
    'Orville Salmons', 5.0, 'Evian',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'o-salmons@live.com', NULL, 1,
    (SELECT id FROM specialites WHERE nom = 'Chauffagiste')
  ),
  (
    'Mont Blanc Eléctricité', 4.5, 'Chamonix',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', 0,
    (SELECT id FROM specialites WHERE nom = 'Electricien')
  ),
  (
    'Boutot & fils', 4.7, 'Bourg-en-bresse',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', 0,
    (SELECT id FROM specialites WHERE nom = 'Menuisier')
  ),
  (
    'Vallis Bellemare', 4.0, 'Vienne',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', 0,
    (SELECT id FROM specialites WHERE nom = 'Plombier')
  ),
  (
    'Claude Quinn', 4.2, 'Aix-les-bains',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'claude.quinn@gmail.com', NULL, 0,
    (SELECT id FROM specialites WHERE nom = 'Bijoutier')
  ),
  (
    'Amitee Lécuyer', 4.5, 'Annecy',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'a.amitee@hotmail.com', 'https://lecuyer-couture.com', 0,
    (SELECT id FROM specialites WHERE nom = 'Couturier')
  ),
  (
    'Ernest Carignan', 5.0, 'Le Puy-en-Velay',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'e-carigan@hotmail.com', NULL, 0,
    (SELECT id FROM specialites WHERE nom = 'Ferronier')
  ),
  (
    'Royden Charbonneau', 3.8, 'Saint-Priest',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'r.charbonneau@gmail.com', NULL, 0,
    (SELECT id FROM specialites WHERE nom = 'Coiffeur')
  ),
  (
    'Leala Dennis', 3.8, 'Chambéry',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', 0,
    (SELECT id FROM specialites WHERE nom = 'Coiffeur')
  ),
  (
    'C\'est sup\'hair', 4.1, 'Romans-sur-Isère',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'sup-hair@gmail.com', 'https://sup-hair.fr', 0,
    (SELECT id FROM specialites WHERE nom = 'Coiffeur')
  ),
  (
    'Le monde des fleurs', 4.6, 'Annonay',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', 0,
    (SELECT id FROM specialites WHERE nom = 'Fleuriste')
  ),
  (
    'Valérie Laderoute', 4.5, 'Valence',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'v-laredoute@gmail.com', NULL, 0,
    (SELECT id FROM specialites WHERE nom = 'Toiletteur')
  ),
  (
    'CM Graphisme', 4.4, 'Valence',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'contact@cm-graphisme.com', 'https://cm-graphisme.com', 0,
    (SELECT id FROM specialites WHERE nom = 'Webdesign')
  );
