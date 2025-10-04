-- Base de données pour le cabinet dentaire
CREATE DATABASE IF NOT EXISTS dental_clinic;
USE dental_clinic;

-- Table des patients
CREATE TABLE IF NOT EXISTS patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  telephone VARCHAR(20),
  email VARCHAR(100),
  adresse TEXT,
  date_naissance DATE,
  sexe ENUM('M', 'F', 'Autre'),
  profession VARCHAR(100),
  photo VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des rendez-vous
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT,
  date_rdv DATE NOT NULL,
  heure_rdv TIME NOT NULL,
  type_consultation VARCHAR(100),
  notes TEXT,
  statut ENUM('planifie', 'confirme', 'en_cours', 'termine', 'annule') DEFAULT 'planifie',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Table des dossiers médicaux
CREATE TABLE IF NOT EXISTS medical_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT,
  date_consultation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  type_consultation VARCHAR(100),
  diagnostic TEXT,
  traitement TEXT,
  notes TEXT,
  ordonnance TEXT,
  images TEXT,
  created_by ENUM('docteur', 'assistant') DEFAULT 'docteur',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Table des plans de traitement
CREATE TABLE IF NOT EXISTS treatment_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT,
  titre VARCHAR(200),
  description TEXT,
  cout_estime DECIMAL(10,2),
  statut ENUM('en_cours', 'termine', 'annule') DEFAULT 'en_cours',
  date_debut DATE,
  date_fin_prevue DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Insertion de quelques données de test
INSERT INTO patients (nom, prenom, telephone, email, date_naissance, sexe) VALUES
('Dubois', 'Marie', '06.12.34.56.78', 'marie.dubois@email.com', '1985-03-15', 'F'),
('Martin', 'Jean', '06.23.45.67.89', 'jean.martin@email.com', '1978-07-22', 'M'),
('Laurent', 'Sophie', '06.34.56.78.90', 'sophie.laurent@email.com', '1992-11-08', 'F'),
('Moreau', 'Pierre', '06.45.67.89.01', 'pierre.moreau@email.com', '1980-05-12', 'M'),
('Rousseau', 'Anna', '06.56.78.90.12', 'anna.rousseau@email.com', '1995-09-28', 'F');

INSERT INTO appointments (patient_id, date_rdv, heure_rdv, type_consultation, statut) VALUES
(1, CURDATE(), '08:30:00', 'Contrôle', 'confirme'),
(2, CURDATE(), '09:00:00', 'Détartrage', 'planifie'),
(3, CURDATE(), '09:30:00', 'Consultation', 'planifie'),
(4, CURDATE(), '10:00:00', 'Soins', 'confirme'),
(5, CURDATE(), '10:30:00', 'Urgence', 'confirme');

INSERT INTO medical_records (patient_id, type_consultation, diagnostic, traitement, notes) VALUES
(1, 'Contrôle', 'Bon état général', 'Aucun traitement nécessaire', 'RDV de contrôle dans 6 mois'),
(2, 'Détartrage', 'Plaque dentaire importante', 'Détartrage complet effectué', 'Bonne hygiène recommandée'),
(3, 'Consultation', 'Douleur molaire droite', 'Obturation composite', 'Éviter aliments durs 48h');