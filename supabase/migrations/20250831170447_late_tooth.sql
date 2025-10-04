@@ .. @@
 ('akram salahi', 'Saignement des gencives lors du brossage, mauvaise haleine matinale', 'Gingivite chronique avec début de parodontite', 0.76, 'Détartrage professionnel; Amélioration hygiène; Bain de bouche antiseptique'),
 ('Samia Lakladi', 'Fracture de la dent de devant suite à un choc, douleur modérée', 'Fracture coronaire avec exposition dentinaire', 0.94, 'Reconstitution esthétique urgente; Test de vitalité pulpaire; Protection temporaire'),
 ('kamal Morad', 'Sensibilité dentaire généralisée, douleur au contact des aliments froids', 'Hypersensibilité dentinaire diffuse', 0.82, 'Dentifrice désensibilisant; Fluoration topique; Éviter aliments acides');
+
+-- Données de test pour les appels
+INSERT INTO calls (patient_id, phone_number, call_type, call_reason, call_status, notes) VALUES
+(1, '06.12.34.56.78', 'entrant', 'Confirmation RDV', 'en_attente', 'Souhaite confirmer son RDV de demain'),
+(2, '06.23.45.67.89', 'sortant', 'Rappel RDV', 'termine', 'RDV confirmé pour demain 9h'),
+(3, '06.34.56.78.90', 'entrant', 'Urgence dentaire', 'termine', 'RDV d\'urgence programmé'),
+(4, '06.45.67.89.01', 'manque', 'Rappel contrôle', 'manque', 'Pas de réponse, rappeler plus tard');
+
+-- Données de test pour les rappels
+INSERT INTO reminders (patient_id, reminder_type, reminder_method, reminder_date, reminder_time, message, status) VALUES
+(1, 'rdv', 'sms', CURDATE(), '09:00:00', 'Rappel: RDV demain à 10h30 au cabinet dentaire', 'planifie'),
+(2, 'controle', 'appel', DATE_ADD(CURDATE(), INTERVAL 2 DAY), '14:00:00', 'Rappel: Contrôle de routine à programmer', 'planifie'),
+(3, 'traitement', 'sms', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '16:00:00', 'Rappel: Continuer le traitement prescrit', 'envoye'),
+(4, 'paiement', 'email', DATE_ADD(CURDATE(), INTERVAL 3 DAY), '10:00:00', 'Rappel: Facture en attente de règlement', 'planifie');