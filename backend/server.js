const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Créer le dossier uploads s'il n'existe pas
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuration de stockage pour les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Configuration de la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dental_clinic'
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Routes pour la gestion des patients
app.get('/api/patients', (req, res) => {
  const query = 'SELECT * FROM patients ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des patients:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de récupérer les patients', details: err.message });
    }
    res.json(results);
  });
});

app.post('/api/patients', upload.single('photo'), (req, res) => {
  const { nom, prenom, telephone, email, adresse, date_naissance, sexe, profession } = req.body;
  const photo = req.file ? req.file.filename : null;

  const query = `
    INSERT INTO patients (nom, prenom, telephone, email, adresse, date_naissance, sexe, profession, photo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [nom, prenom, telephone, email, adresse, date_naissance, sexe, profession, photo], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout du patient:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible d\'ajouter le patient', details: err.message });
    }
    res.json({ id: result.insertId, message: 'Patient ajouté avec succès' });
  });
});

app.put('/api/patients/:id', upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { nom, prenom, telephone, email, adresse, date_naissance, sexe, profession } = req.body;
  const photo = req.file ? req.file.filename : req.body.existingPhoto;

  const query = `
    UPDATE patients
    SET nom=?, prenom=?, telephone=?, email=?, adresse=?, date_naissance=?, sexe=?, profession=?, photo=?
    WHERE id=?
  `;

  db.query(query, [nom, prenom, telephone, email, adresse, date_naissance, sexe, profession, photo, id], (err) => {
    if (err) {
      console.error('Erreur lors de la modification du patient:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de modifier le patient', details: err.message });
    }
    res.json({ message: 'Patient modifié avec succès' });
  });
});

app.delete('/api/patients/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM patients WHERE id = ?';

  db.query(query, [id], (err) => {
    if (err) {
      console.error('Erreur lors de la suppression du patient:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de supprimer le patient', details: err.message });
    }
    res.json({ message: 'Patient supprimé avec succès' });
  });
});

// Routes pour la gestion des rendez-vous
app.get('/api/appointments', (req, res) => {
  const query = `
    SELECT a.*, p.nom, p.prenom, p.telephone
    FROM appointments a
    LEFT JOIN patients p ON a.patient_id = p.id
    ORDER BY a.date_rdv ASC, a.heure_rdv ASC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des rendez-vous:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de récupérer les rendez-vous', details: err.message });
    }
    console.log('Appointments fetched:', results.length);
    res.json(results);
  });
});

app.get('/api/appointments/unconfirmed/:date', (req, res) => {
  const { date } = req.params;
  const query = `
    SELECT a.*, p.nom, p.prenom, p.telephone
    FROM appointments a
    LEFT JOIN patients p ON a.patient_id = p.id
    WHERE a.statut = 'planifie' AND a.date_rdv = ?
    ORDER BY a.heure_rdv ASC
  `;

  db.query(query, [date], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des RDV non confirmés:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de récupérer les RDV non confirmés', details: err.message });
    }
    console.log('Unconfirmed appointments fetched:', results.length);
    res.json(results);
  });
});

app.post('/api/appointments', (req, res) => {
  const { patient_id, date_rdv, heure_rdv, type_consultation, notes, statut } = req.body;

  console.log('Creating appointment:', { patient_id, date_rdv, heure_rdv, type_consultation, notes, statut });

  const query = `
    INSERT INTO appointments (patient_id, date_rdv, heure_rdv, type_consultation, notes, statut)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [patient_id, date_rdv, heure_rdv, type_consultation, notes, statut || 'planifie'], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout du rendez-vous:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible d\'ajouter le rendez-vous', details: err.message });
    }
    console.log('Appointment created with ID:', result.insertId);
    res.json({ id: result.insertId, message: 'Rendez-vous ajouté avec succès' });
  });
});

app.put('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const { patient_id, date_rdv, heure_rdv, type_consultation, notes, statut } = req.body;

  const query = `
    UPDATE appointments
    SET patient_id=?, date_rdv=?, heure_rdv=?, type_consultation=?, notes=?, statut=?
    WHERE id=?
  `;

  db.query(query, [patient_id, date_rdv, heure_rdv, type_consultation, notes, statut, id], (err) => {
    if (err) {
      console.error('Erreur lors de la modification du rendez-vous:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de modifier le rendez-vous', details: err.message });
    }
    console.log(`Appointment ${id} updated with statut: ${statut}`);
    res.json({ message: 'Rendez-vous modifié avec succès' });
  });
});

app.delete('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM appointments WHERE id = ?';

  db.query(query, [id], (err) => {
    if (err) {
      console.error('Erreur lors de la suppression du rendez-vous:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de supprimer le rendez-vous', details: err.message });
    }
    res.json({ message: 'Rendez-vous supprimé avec succès' });
  });
});

// Routes pour la gestion des dossiers médicaux
app.get('/api/medical-records/:patientId', (req, res) => {
  const { patientId } = req.params;
  const query = `
    SELECT mr.*, p.nom, p.prenom
    FROM medical_records mr
    LEFT JOIN patients p ON mr.patient_id = p.id
    WHERE mr.patient_id = ?
    ORDER BY mr.date_consultation DESC
  `;

  db.query(query, [patientId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des dossiers médicaux:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de récupérer les dossiers médicaux', details: err.message });
    }
    res.json(results);
  });
});

app.get('/api/medical-records', (req, res) => {
  const query = `
    SELECT mr.*, p.nom, p.prenom
    FROM medical_records mr
    LEFT JOIN patients p ON mr.patient_id = p.id
    ORDER BY mr.date_consultation DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des dossiers médicaux:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de récupérer les dossiers médicaux', details: err.message });
    }
    res.json(results);
  });
});

app.post('/api/medical-records', upload.array('images', 5), (req, res) => {
  const { patient_id, type_consultation, diagnostic, traitement, notes, ordonnance, created_by } = req.body;
  const images = req.files ? req.files.map(file => file.filename).join(',') : null;

  const query = `
    INSERT INTO medical_records (patient_id, type_consultation, diagnostic, traitement, notes, ordonnance, images, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [patient_id, type_consultation, diagnostic, traitement, notes, ordonnance, images, created_by || 'docteur'], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout du dossier médical:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible d\'ajouter le dossier médical', details: err.message });
    }
    res.json({ id: result.insertId, message: 'Dossier médical ajouté avec succès' });
  });
});

app.put('/api/medical-records/:id', upload.array('images', 5), (req, res) => {
  const { id } = req.params;
  const { patient_id, type_consultation, diagnostic, traitement, notes, ordonnance, created_by } = req.body;
  const images = req.files ? req.files.map(file => file.filename).join(',') : req.body.existingImages;

  const query = `
    UPDATE medical_records
    SET patient_id=?, type_consultation=?, diagnostic=?, traitement=?, notes=?, ordonnance=?, images=?, created_by=?
    WHERE id=?
  `;

  db.query(query, [patient_id, type_consultation, diagnostic, traitement, notes, ordonnance, images, created_by, id], (err) => {
    if (err) {
      console.error('Erreur lors de la modification du dossier médical:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de modifier le dossier médical', details: err.message });
    }
    res.json({ message: 'Dossier médical modifié avec succès' });
  });
});

app.delete('/api/medical-records/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM medical_records WHERE id = ?';

  db.query(query, [id], (err) => {
    if (err) {
      console.error('Erreur lors de la suppression du dossier médical:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de supprimer le dossier médical', details: err.message });
    }
    res.json({ message: 'Dossier médical supprimé avec succès' });
  });
});

// Routes pour les plans de traitement
app.get('/api/treatment-plans/:patientId', (req, res) => {
  const { patientId } = req.params;
  const query = `
    SELECT tp.*, p.nom, p.prenom
    FROM treatment_plans tp
    LEFT JOIN patients p ON tp.patient_id = p.id
    WHERE tp.patient_id = ?
    ORDER BY tp.created_at DESC
  `;

  db.query(query, [patientId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des plans de traitement:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de récupérer les plans de traitement', details: err.message });
    }
    res.json(results);
  });
});

app.post('/api/treatment-plans', (req, res) => {
  const { patient_id, titre, description, cout_estime, date_debut, date_fin_prevue, statut } = req.body;

  const query = `
    INSERT INTO treatment_plans (patient_id, titre, description, cout_estime, date_debut, date_fin_prevue, statut)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [patient_id, titre, description, cout_estime, date_debut, date_fin_prevue, statut || 'en_cours'], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout du plan de traitement:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible d\'ajouter le plan de traitement', details: err.message });
    }
    res.json({ id: result.insertId, message: 'Plan de traitement ajouté avec succès' });
  });
});

// Routes pour la gestion des ordonnances
app.get('/api/prescriptions', (req, res) => {
  const query = `
    SELECT p.*, pt.nom, pt.prenom
    FROM prescriptions p
    LEFT JOIN patients pt ON p.patient_id = pt.id
    ORDER BY p.date_prescription DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des ordonnances:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de récupérer les ordonnances', details: err.message });
    }
    res.json(results);
  });
});

app.post('/api/prescriptions', (req, res) => {
  const { patient_id, date_prescription, medicaments, posologie, duree_traitement, instructions, statut, created_by } = req.body;

  const query = `
    INSERT INTO prescriptions (patient_id, date_prescription, medicaments, posologie, duree_traitement, instructions, statut, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [patient_id, date_prescription, medicaments, posologie, duree_traitement, instructions, statut || 'active', created_by || 'docteur'], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de l\'ordonnance:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible d\'ajouter l\'ordonnance', details: err.message });
    }
    res.json({ id: result.insertId, message: 'Ordonnance créée avec succès' });
  });
});

app.put('/api/prescriptions/:id', (req, res) => {
  const { id } = req.params;
  const { patient_id, date_prescription, medicaments, posologie, duree_traitement, instructions, statut, created_by } = req.body;

  const query = `
    UPDATE prescriptions
    SET patient_id=?, date_prescription=?, medicaments=?, posologie=?, duree_traitement=?, instructions=?, statut=?, created_by=?
    WHERE id=?
  `;

  db.query(query, [patient_id, date_prescription, medicaments, posologie, duree_traitement, instructions, statut, created_by, id], (err) => {
    if (err) {
      console.error('Erreur lors de la modification de l\'ordonnance:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de modifier l\'ordonnance', details: err.message });
    }
    res.json({ message: 'Ordonnance modifiée avec succès' });
  });
});

app.delete('/api/prescriptions/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM prescriptions WHERE id = ?';

  db.query(query, [id], (err) => {
    if (err) {
      console.error('Erreur lors de la suppression de l\'ordonnance:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de supprimer l\'ordonnance', details: err.message });
    }
    res.json({ message: 'Ordonnance supprimée avec succès' });
  });
});

// Routes pour la gestion des appels
app.get('/api/calls', (req, res) => {
  const query = `
    SELECT c.*, p.nom, p.prenom, p.telephone
    FROM calls c
    LEFT JOIN patients p ON c.patient_id = p.id
    ORDER BY c.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des appels:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de récupérer les appels', details: err.message });
    }
    res.json(results);
  });
});

app.post('/api/calls', (req, res) => {
  const { patient_id, call_type, call_reason, call_status, notes, phone_number } = req.body;

  const query = `
    INSERT INTO calls (patient_id, call_type, call_reason, call_status, notes, phone_number)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [patient_id, call_type, call_reason, call_status, notes, phone_number], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de l\'appel:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible d\'ajouter l\'appel', details: err.message });
    }
    res.json({ id: result.insertId, message: 'Appel enregistré avec succès' });
  });
});

app.put('/api/calls/:id', (req, res) => {
  const { id } = req.params;
  const { patient_id, call_type, call_reason, call_status, notes, phone_number } = req.body;

  const query = `
    UPDATE calls
    SET patient_id=?, call_type=?, call_reason=?, call_status=?, notes=?, phone_number=?
    WHERE id=?
  `;

  db.query(query, [patient_id, call_type, call_reason, call_status, notes, phone_number, id], (err) => {
    if (err) {
      console.error('Erreur lors de la modification de l\'appel:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de modifier l\'appel', details: err.message });
    }
    res.json({ message: 'Appel modifié avec succès' });
  });
});

app.delete('/api/calls/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM calls WHERE id = ?';

  db.query(query, [id], (err) => {
    if (err) {
      console.error('Erreur lors de la suppression de l\'appel:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de supprimer l\'appel', details: err.message });
    }
    res.json({ message: 'Appel supprimé avec succès' });
  });
});

// Routes pour la gestion des rappels
app.get('/api/reminders', (req, res) => {
  const query = `
    SELECT r.*, p.nom, p.prenom, p.telephone
    FROM reminders r
    LEFT JOIN patients p ON r.patient_id = p.id
    ORDER BY r.reminder_date ASC, r.reminder_time ASC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des rappels:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de récupérer les rappels', details: err.message });
    }
    res.json(results);
  });
});

app.post('/api/reminders', (req, res) => {
  const { patient_id, reminder_type, reminder_method, reminder_date, reminder_time, message, status } = req.body;

  const query = `
    INSERT INTO reminders (patient_id, reminder_type, reminder_method, reminder_date, reminder_time, message, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [patient_id, reminder_type, reminder_method, reminder_date, reminder_time, message, status || 'planifie'], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout du rappel:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible d\'ajouter le rappel', details: err.message });
    }
    res.json({ id: result.insertId, message: 'Rappel programmé avec succès' });
  });
});

app.put('/api/reminders/:id', (req, res) => {
  const { id } = req.params;
  const { patient_id, reminder_type, reminder_method, reminder_date, reminder_time, message, status } = req.body;

  const query = `
    UPDATE reminders
    SET patient_id=?, reminder_type=?, reminder_method=?, reminder_date=?, reminder_time=?, message=?, status=?
    WHERE id=?
  `;

  db.query(query, [patient_id, reminder_type, reminder_method, reminder_date, reminder_time, message, status, id], (err) => {
    if (err) {
      console.error('Erreur lors de la modification du rappel:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de modifier le rappel', details: err.message });
    }
    res.json({ message: 'Rappel modifié avec succès' });
  });
});

app.delete('/api/reminders/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM reminders WHERE id = ?';

  db.query(query, [id], (err) => {
    if (err) {
      console.error('Erreur lors de la suppression du rappel:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de supprimer le rappel', details: err.message });
    }
    res.json({ message: 'Rappel supprimé avec succès' });
  });
});

// Routes pour les analyses IA
app.get('/api/ai-analyses', (req, res) => {
  const query = 'SELECT * FROM ai_analyses ORDER BY created_at DESC LIMIT 10';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des analyses IA:', err);
      return res.status(500).json({ error: 'Erreur serveur: Impossible de récupérer les analyses IA', details: err.message });
    }
    console.log('Analyses IA récupérées:', results.length);
    res.json(results);
  });
});

app.post('/api/ai-analyses', (req, res) => {
  const { patient_name, image_url, audio_transcript, ai_diagnosis, confidence_score, recommendations } = req.body;

  if (!patient_name || !ai_diagnosis || confidence_score === undefined) {
    return res.status(400).json({ error: 'patient_name, ai_diagnosis, and confidence_score are required' });
  }

  const query = `
    INSERT INTO ai_analyses (patient_name, image_url, audio_transcript, ai_diagnosis, confidence_score, recommendations)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [patient_name, image_url || null, audio_transcript || null, ai_diagnosis, confidence_score, recommendations || ''],
    (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'ajout de l\'analyse IA:', err);
        return res.status(500).json({ error: 'Erreur serveur: Impossible d\'ajouter l\'analyse IA', details: err.message });
      }
      console.log('Analyse IA sauvegardée avec ID:', result.insertId);
      res.status(201).json({ id: result.insertId, message: 'Analyse IA sauvegardée avec succès' });
    }
  );
});

// Routes pour les analytics
app.get('/api/analytics', (req, res) => {
  const queries = {
    totalPatients: 'SELECT COUNT(*) as count FROM patients',
    appointmentsToday: `SELECT COUNT(*) as count FROM appointments WHERE DATE(date_rdv) = CURDATE()`,
    appointmentsThisMonth: `SELECT COUNT(*) as count FROM appointments WHERE MONTH(date_rdv) = MONTH(CURDATE()) AND YEAR(date_rdv) = YEAR(CURDATE())`,
    patientsThisMonth: `SELECT COUNT(*) as count FROM patients WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())`,
    appointmentsConfirmed: `SELECT COUNT(*) as count FROM appointments WHERE statut = 'confirme' AND DATE(date_rdv) = CURDATE()`,
    appointmentsPending: `SELECT COUNT(*) as count FROM appointments WHERE statut = 'planifie' AND DATE(date_rdv) = CURDATE()`,
    medicalRecordsThisMonth: `SELECT COUNT(*) as count FROM medical_records WHERE MONTH(date_consultation) = MONTH(CURDATE()) AND YEAR(date_consultation) = YEAR(CURDATE())`
  };

  const results = {};
  let completed = 0;

  Object.keys(queries).forEach(key => {
    db.query(queries[key], (err, result) => {
      if (!err) {
        results[key] = result[0].count;
      } else {
        console.error(`Erreur pour la statistique ${key}:`, err);
        results[key] = 0;
      }
      completed++;

      if (completed === Object.keys(queries).length) {
        results.revenue = results.medicalRecordsThisMonth * 85; // Average consultation price
        results.averageConsultationTime = 32;
        results.patientSatisfaction = 94;
        res.json(results);
      }
    });
  });
});

// Routes pour les statistiques
app.get('/api/stats', (req, res) => {
  const queries = {
    totalPatients: 'SELECT COUNT(*) as count FROM patients',
    appointmentsToday: `SELECT COUNT(*) as count FROM appointments WHERE DATE(date_rdv) = CURDATE()`,
    appointmentsThisMonth: `SELECT COUNT(*) as count FROM appointments WHERE MONTH(date_rdv) = MONTH(CURDATE()) AND YEAR(date_rdv) = YEAR(CURDATE())`,
    patientsThisMonth: `SELECT COUNT(*) as count FROM patients WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())`,
    appointmentsConfirmed: `SELECT COUNT(*) as count FROM appointments WHERE statut = 'confirme' AND DATE(date_rdv) = CURDATE()`,
    appointmentsPending: `SELECT COUNT(*) as count FROM appointments WHERE statut = 'planifie' AND DATE(date_rdv) = CURDATE()`,
    medicalRecordsThisMonth: `SELECT COUNT(*) as count FROM medical_records WHERE MONTH(date_consultation) = MONTH(CURDATE()) AND YEAR(date_consultation) = YEAR(CURDATE())`
  };

  const results = {};
  let completed = 0;

  Object.keys(queries).forEach(key => {
    db.query(queries[key], (err, result) => {
      if (!err) {
        results[key] = result[0].count;
      } else {
        console.error(`Erreur pour la statistique ${key}:`, err);
        results[key] = 0;
      }
      completed++;

      if (completed === Object.keys(queries).length) {
        res.json(results);
      }
    });
  });
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  db.query('SELECT 1', (err) => {
    if (err) {
      console.error('Health check failed:', err);
      return res.status(503).json({ status: 'down', message: 'Base de données indisponible', details: err.message });
    }
    res.json({ status: 'up', message: 'Serveur et base de données opérationnels', timestamp: new Date().toISOString() });
  });
});

// Route de test de connexion
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend connecté avec succès!', timestamp: new Date().toISOString() });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ error: 'Erreur interne du serveur', details: err.message });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`API disponible sur http://localhost:${PORT}/api`);
});