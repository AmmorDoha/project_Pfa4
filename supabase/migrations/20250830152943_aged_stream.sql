@@ .. @@
 );

+-- Table des ordonnances
+CREATE TABLE IF NOT EXISTS prescriptions (
+  id INT AUTO_INCREMENT PRIMARY KEY,
+  patient_id INT NOT NULL,
+  date_prescription DATE NOT NULL,
+  medicaments TEXT NOT NULL,
+  posologie TEXT NOT NULL,
+  duree_traitement VARCHAR(100) NOT NULL,
+  instructions TEXT,
+  statut ENUM('active', 'terminee', 'annulee') DEFAULT 'active',
+  created_by ENUM('docteur', 'assistant') DEFAULT 'docteur',
+  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
+  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
+  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
+);
+
+-- Table des analyses IA
+CREATE TABLE IF NOT EXISTS ai_analyses (
+  id INT AUTO_INCREMENT PRIMARY KEY,
+  patient_name VARCHAR(200) NOT NULL,
+  image_url VARCHAR(500),
+  audio_transcript TEXT,
+  ai_diagnosis TEXT NOT NULL,
+  confidence_score DECIMAL(3,2) NOT NULL,
+  recommendations TEXT,
+  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
+);
+
 -- Insertion de quelques données de test