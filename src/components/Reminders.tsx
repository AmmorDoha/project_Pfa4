import React, { useState, useEffect } from 'react';
import { 
  Bell, Calendar, Phone, MessageCircle, Mail, 
  Clock, User, Plus, Edit, Trash2, X, Send,
  AlertTriangle, CheckCircle, Settings
} from 'lucide-react';
import { UserRole } from '../App';

interface Reminder {
  id?: number;
  patient_id: number;
  patient_name: string;
  phone_number: string;
  reminder_type: 'rdv' | 'controle' | 'traitement' | 'paiement';
  reminder_method: 'sms' | 'appel' | 'email';
  reminder_date: string;
  reminder_time: string;
  message: string;
  status: 'planifie' | 'envoye' | 'echec';
  appointment_date?: string;
  created_at?: string;
}

interface Patient {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
}

interface RemindersProps {
  userRole: UserRole;
}

const Reminders: React.FC<RemindersProps> = ({ userRole }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState<Reminder>({
    patient_id: 0,
    patient_name: '',
    phone_number: '',
    reminder_type: 'rdv',
    reminder_method: 'sms',
    reminder_date: new Date().toISOString().split('T')[0],
    reminder_time: '09:00',
    message: '',
    status: 'planifie'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchReminders(), fetchPatients()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/reminders');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      const formattedReminders = data.map((reminder: any) => ({
        ...reminder,
        patient_name: `${reminder.nom} ${reminder.prenom}`,
        phone_number: reminder.telephone
      }));
      setReminders(formattedReminders);
    } catch (error) {
      console.error('Erreur lors du chargement des rappels:', error);
      setReminders([
        {
          id: 1,
          patient_id: 1,
          patient_name: 'ammor doha',
          phone_number: '06.12.34.56.78',
          reminder_type: 'rdv',
          reminder_method: 'sms',
          reminder_date: new Date().toISOString().split('T')[0],
          reminder_time: '09:00',
          message: 'Rappel: RDV demain à 10h30 au cabinet dentaire',
          status: 'planifie',
          appointment_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          patient_id: 2,
          patient_name: 'akram salahi',
          phone_number: '06.23.45.67.89',
          reminder_type: 'controle',
          reminder_method: 'appel',
          reminder_date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          reminder_time: '14:00',
          message: 'Rappel: Contrôle de routine à programmer',
          status: 'planifie',
          created_at: new Date().toISOString()
        }
      ]);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/patients');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Erreur lors du chargement des patients:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.patient_id === 0) {
      alert('Veuillez sélectionner un patient');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3001/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: formData.patient_id,
          reminder_type: formData.reminder_type,
          reminder_method: formData.reminder_method,
          reminder_date: formData.reminder_date,
          reminder_time: formData.reminder_time,
          message: formData.message,
          status: formData.status
        })
      });
      if (!response.ok) throw new Error(`Failed to save reminder: ${response.status}`);
      const result = await response.json();
      fetchReminders(); // Refresh the list
      setShowModal(false);
      resetForm();
      alert('Rappel programmé avec succès!');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la programmation du rappel.');
    }
  };

  const resetForm = () => {
    setFormData({
      patient_id: 0,
      patient_name: '',
      phone_number: '',
      reminder_type: 'rdv',
      reminder_method: 'sms',
      reminder_date: new Date().toISOString().split('T')[0],
      reminder_time: '09:00',
      message: '',
      status: 'planifie'
    });
    setIsEditing(false);
    setSelectedReminder(null);
  };

  const sendReminder = async (reminder: Reminder) => {
    try {
      const response = await fetch(`http://localhost:3001/api/reminders/${reminder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'envoye' })
      });
      if (!response.ok) throw new Error(`Failed to send reminder: ${response.status}`);
      fetchReminders(); // Refresh the list
      alert(`Rappel envoyé par ${reminder.reminder_method} à ${reminder.patient_name}!`);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      alert('Erreur lors de l\'envoi du rappel.');
    }
  };

  const editReminder = (reminder: Reminder) => {
    setFormData({
      ...reminder,
      patient_name: reminder.patient_name,
      phone_number: reminder.phone_number
    });
    setIsEditing(true);
    setSelectedReminder(reminder);
    setShowModal(true);
  };

  const deleteReminder = async (id: number) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce rappel ?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/reminders/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error(`Failed to delete reminder: ${response.status}`);
        fetchReminders(); // Refresh the list
        alert('Rappel supprimé avec succès!');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression du rappel.');
      }
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'rdv': return 'bg-blue-100 text-blue-700';
      case 'controle': return 'bg-green-100 text-green-700';
      case 'traitement': return 'bg-purple-100 text-purple-700';
      case 'paiement': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'rdv': return 'Rendez-vous';
      case 'controle': return 'Contrôle';
      case 'traitement': return 'Traitement';
      case 'paiement': return 'Paiement';
      default: return 'Autre';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planifie': return 'bg-yellow-100 text-yellow-700';
      case 'envoye': return 'bg-green-100 text-green-700';
      case 'echec': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'sms': return <MessageCircle className="w-4 h-4" />;
      case 'appel': return <Phone className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const filteredReminders = reminders.filter(reminder => {
    const matchesType = filterType === 'all' || reminder.reminder_type === filterType;
    const matchesStatus = filterStatus === 'all' || reminder.status === filterStatus;
    return matchesType && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-spin" />
        <h3 className="text-xl font-semibold text-gray-600">Chargement des rappels...</h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Bell className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Rappels et Notifications</h2>
              <p className="text-gray-600">Gestion des rappels automatiques</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">Tous les types</option>
              <option value="rdv">Rendez-vous</option>
              <option value="controle">Contrôle</option>
              <option value="traitement">Traitement</option>
              <option value="paiement">Paiement</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="planifie">Planifiés</option>
              <option value="envoye">Envoyés</option>
              <option value="echec">Échecs</option>
            </select>
            
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Nouveau Rappel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {reminders.filter(r => r.status === 'planifie').length}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Planifiés</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {reminders.filter(r => r.status === 'envoye').length}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Envoyés</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-blue-100 p-2 rounded-lg">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {reminders.filter(r => r.reminder_method === 'sms').length}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">SMS</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Phone className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {reminders.filter(r => r.reminder_method === 'appel').length}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Appels</p>
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {filteredReminders.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun rappel trouvé</h3>
            <p className="text-gray-500">Créez votre premier rappel automatique</p>
          </div>
        ) : (
          filteredReminders.map((reminder) => (
            <div key={reminder.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    {getMethodIcon(reminder.reminder_method)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{reminder.patient_name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(reminder.reminder_type)}`}>
                        {getTypeText(reminder.reminder_type)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reminder.status)}`}>
                        {reminder.status === 'planifie' ? 'Planifié' : 
                         reminder.status === 'envoye' ? 'Envoyé' : 'Échec'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{reminder.phone_number}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(reminder.reminder_date).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{reminder.reminder_time}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">{reminder.message}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {reminder.status === 'planifie' && (
                    <button
                      onClick={() => sendReminder(reminder)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      <span>Envoyer</span>
                    </button>
                  )}
                  <button
                    onClick={() => editReminder(reminder)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteReminder(reminder.id!)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Nouveau Rappel */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">{isEditing ? 'Modifier Rappel' : 'Nouveau Rappel'}</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient *</label>
                  <select
                    required
                    value={formData.patient_id}
                    onChange={(e) => {
                      const patientId = parseInt(e.target.value);
                      const patient = patients.find(p => p.id === patientId);
                      setFormData({ 
                        ...formData, 
                        patient_id: patientId,
                        patient_name: patient ? `${patient.prenom} ${patient.nom}` : '',
                        phone_number: patient?.telephone || ''
                      });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value={0}>Sélectionner un patient</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {patient.prenom} {patient.nom}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type de Rappel *</label>
                  <select
                    required
                    value={formData.reminder_type}
                    onChange={(e) => setFormData({ ...formData, reminder_type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="rdv">Rendez-vous</option>
                    <option value="controle">Contrôle</option>
                    <option value="traitement">Traitement</option>
                    <option value="paiement">Paiement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Méthode *</label>
                  <select
                    required
                    value={formData.reminder_method}
                    onChange={(e) => setFormData({ ...formData, reminder_method: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="sms">SMS</option>
                    <option value="appel">Appel téléphonique</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date du Rappel *</label>
                  <input
                    type="date"
                    required
                    value={formData.reminder_date}
                    onChange={(e) => setFormData({ ...formData, reminder_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heure *</label>
                  <input
                    type="time"
                    required
                    value={formData.reminder_time}
                    onChange={(e) => setFormData({ ...formData, reminder_time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Message du rappel..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  {isEditing ? 'Mettre à jour' : 'Programmer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reminders;