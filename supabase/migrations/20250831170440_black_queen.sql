@@ .. @@
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

+-- Table des appels
+CREATE TABLE IF NOT EXISTS calls (
+  id INT AUTO_INCREMENT PRIMARY KEY,
+  patient_id INT NOT NULL,
+  phone_number VARCHAR(20) NOT NULL,
+  call_type ENUM('entrant', 'sortant', 'manque') DEFAULT 'sortant',
+  call_reason VARCHAR(200),
+  call_status ENUM('en_attente', 'en_cours', 'termine', 'manque') DEFAULT 'en_attente',
+  call_duration INT DEFAULT 0,
+  notes TEXT,
+  scheduled_callback DATETIME,
+  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
+  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
+);
+
+-- Table des rappels
+CREATE TABLE IF NOT EXISTS reminders (
+  id INT AUTO_INCREMENT PRIMARY KEY,
+  patient_id INT NOT NULL,
+  reminder_type ENUM('rdv', 'controle', 'traitement', 'paiement') DEFAULT 'rdv',
+  reminder_method ENUM('sms', 'appel', 'email') DEFAULT 'sms',
+  reminder_date DATE NOT NULL,
+  reminder_time TIME NOT NULL,
+  message TEXT NOT NULL,
+  status ENUM('planifie', 'envoye', 'echec') DEFAULT 'planifie',
+  sent_at TIMESTAMP NULL,
+  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
+  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
+);
+
 INSERT INTO prescriptions (patient_id, date_prescription, medicaments, posologie, duree_traitement, instructions, statut, created_by) VALUES