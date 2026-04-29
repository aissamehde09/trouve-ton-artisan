-- ============================================================
-- Script de création de la base de données
-- Plateforme : Trouve ton artisan
-- Région Auvergne-Rhône-Alpes
-- ============================================================

CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;

-- ─── Table : categories ────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id   INT          NOT NULL AUTO_INCREMENT,
  nom  VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── Table : specialites ──────────────────────────────────
CREATE TABLE IF NOT EXISTS specialites (
  id           INT          NOT NULL AUTO_INCREMENT,
  nom          VARCHAR(100) NOT NULL,
  categorie_id INT          NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_specialite_categorie
    FOREIGN KEY (categorie_id) REFERENCES categories(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── Table : artisans ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS artisans (
  id            INT            NOT NULL AUTO_INCREMENT,
  nom           VARCHAR(150)   NOT NULL,
  note          DECIMAL(2,1)   NOT NULL CHECK (note BETWEEN 0 AND 5),
  ville         VARCHAR(100)   NOT NULL,
  a_propos      TEXT,
  email         VARCHAR(150)   NOT NULL,
  site_web      VARCHAR(255),
  photo         VARCHAR(255),
  top           TINYINT(1)     NOT NULL DEFAULT 0,
  specialite_id INT            NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_artisan_specialite
    FOREIGN KEY (specialite_id) REFERENCES specialites(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
