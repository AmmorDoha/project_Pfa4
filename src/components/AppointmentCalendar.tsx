import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Plus, Edit, Trash2, User, 
  CheckCircle, XCircle, AlertCircle, Search, X 
} from 'lucide-react';
import { UserRole } from '../App';

interface Patient {
  id: number;
  nom: string;
  prenom: string;
}

interface Appointment {
  id?: number;
  patient_id: number;
  nom?: string;
  prenom?: string;
  date_rdv: string;
  heure_rdv: string;
  type_consultation: string;
  notes: string;
  statut: 'planifie' | 'confirme' | 'en_cours' | 'termine' | 'annule';
}

interface AppointmentCalendarProps {
  userRole: UserRole;
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ userRole }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // 2025-08-27
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Appointment>({
    patient_id: 0,
    date_rdv: new Date().toISOString().split('T')[0], // 2025-08-27
    heure_rdv: '14:45', // Adjusted to current time slot around 02:45 PM
    type_consultation: '',
    notes: '',
    statut: 'planifie'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      console.log('Fetching appointments at:', new Date().toLocaleTimeString());
      const response = await fetch('http://localhost:3001/api/appointments');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('Raw appointments data:', data);

      // Fetch patient details for each appointment
      const appointmentsWithPatients = await Promise.all(data.map(async (apt: Appointment) => {
        try {
          const patientResponse = await fetch(`http://localhost:3001/api/patients/${apt.patient_id}`);
          if (!patientResponse.ok) throw new Error(`Patient fetch failed for ID ${apt.patient_id}`);
          const patient = await patientResponse.json();
          return { ...apt, nom: patient.nom, prenom: patient.prenom };
        } catch (patientError) {
          console.error('Error fetching patient:', patientError);
          return { ...apt, nom: 'Unknown', prenom: 'Unknown' }; // Fallback
        }
      }));

      console.log('Appointments with patients:', appointmentsWithPatients);
      setAppointments(appointmentsWithPatients);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      alert('Erreur lors du chargement des rendez-vous. Vérifiez la connexion ou le serveur.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/patients');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('Patients data:', data);
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      alert('Erreur lors du chargement des patients.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.patient_id === 0) {
      alert('Veuillez sélectionner un patient');
      return;
    }
    
    try {
      console.log('Submitting appointment:', formData);
      const url = isEditing 
        ? `http://localhost:3001/api/appointments/${selectedAppointment?.id}`
        : 'http://localhost:3001/api/appointments';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Appointment saved:', result);
        fetchAppointments();
        setShowModal(false);
        resetForm();
        setTimeout(() => {
          fetchAppointments();
        }, 500);
        alert(isEditing ? 'Rendez-vous modifié avec succès!' : 'Rendez-vous ajouté avec succès!');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde du rendez-vous');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/appointments/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchAppointments();
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleStatusChange = async (appointmentId: number, newStatus: string) => {
    try {
      const appointment = appointments.find(apt => apt.id === appointmentId);
      if (appointment) {
        const response = await fetch(`http://localhost:3001/api/appointments/${appointmentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...appointment,
            statut: newStatus
          }),
        });

        if (response.ok) {
          fetchAppointments();
        }
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      patient_id: 0,
      date_rdv: selectedDate || new Date().toISOString().split('T')[0],
      heure_rdv: '14:45', // Adjusted to current time slot
      type_consultation: '',
      notes: '',
      statut: 'planifie'
    });
    setIsEditing(false);
    setSelectedAppointment(null);
  };

  const handleEdit = (appointment: Appointment) => {
    setFormData({
      patient_id: appointment.patient_id,
      date_rdv: appointment.date_rdv,
      heure_rdv: appointment.heure_rdv,
      type_consultation: appointment.type_consultation,
      notes: appointment.notes,
      statut: appointment.statut
    });
    setSelectedAppointment(appointment);
    setIsEditing(true);
    setShowModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirme': return 'bg-green-100 text-green-700';
      case 'en_cours': return 'bg-blue-100 text-blue-700';
      case 'termine': return 'bg-gray-100 text-gray-700';
      case 'annule': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirme': return 'Confirmé';
      case 'en_cours': return 'En cours';
      case 'termine': return 'Terminé';
      case 'annule': return 'Annulé';
      default: return 'Planifié';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirme': return <CheckCircle className="w-4 h-4" />;
      case 'en_cours': return <Clock className="w-4 h-4" />;
      case 'termine': return <CheckCircle className="w-4 h-4" />;
      case 'annule': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = searchTerm === '' || 
      apt.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.type_consultation.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch; // Removed date filtering
  });

  const timeSlots = Array.from({ length: 20 }, (_, i) => {
    const hour = Math.floor(8 + i * 0.5);
    const minute = (i % 2) * 30;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Calendrier des Rendez-vous</h2>
              <p className="text-gray-600">Gestion et planification des consultations</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-64"
              />
            </div>
            
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Nouveau RDV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['planifie', 'confirme', 'en_cours', 'termine'].map(status => {
          const count = filteredAppointments.filter(apt => apt.statut === status).length;
          return (
            <div key={status} className="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${getStatusColor(status)}`}>
                  {getStatusIcon(status)}
                </div>
                <span className="text-2xl font-bold text-gray-900">{count}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{getStatusText(status)}</p>
            </div>
          );
        })}
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">
            Tous les rendez-vous
          </h3>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Chargement des rendez-vous...</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun rendez-vous</h3>
              <p className="text-gray-500">Aucun rendez-vous trouvé</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments
                .sort((a, b) => a.date_rdv.localeCompare(b.date_rdv) || a.heure_rdv.localeCompare(b.heure_rdv))
                .map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="bg-green-100 p-2 rounded-lg mb-1">
                          <Clock className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="font-bold text-gray-900 text-sm">{appointment.heure_rdv}</p>
                        <p className="text-xs text-gray-500">{new Date(appointment.date_rdv).toLocaleDateString('fr-FR', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}</p>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <User className="w-4 h-4 text-gray-500" />
                          <h4 className="font-semibold text-gray-900">
                            {appointment.prenom} {appointment.nom}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{appointment.type_consultation}</p>
                        {appointment.notes && (
                          <p className="text-xs text-gray-500">{appointment.notes}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {userRole === 'assistant' && (
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleStatusChange(appointment.id!, 'confirme')}
                            className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors"
                            title="Confirmer"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(appointment.id!, 'annule')}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                            title="Annuler"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(appointment.statut)}`}>
                        {getStatusText(appointment.statut)}
                      </span>
                      
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleEdit(appointment)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => appointment.id && handleDelete(appointment.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal Ajout/Modification */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {isEditing ? 'Modifier le Rendez-vous' : 'Nouveau Rendez-vous'}
                </h3>
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
                    onChange={(e) => setFormData({ ...formData, patient_id: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type de Consultation *</label>
                  <select
                    required
                    value={formData.type_consultation}
                    onChange={(e) => setFormData({ ...formData, type_consultation: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Sélectionner le type</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Contrôle">Contrôle</option>
                    <option value="Détartrage">Détartrage</option>
                    <option value="Soins">Soins</option>
                    <option value="Chirurgie">Chirurgie</option>
                    <option value="Urgence">Urgence</option>
                    <option value="Orthodontie">Orthodontie</option>
                    <option value="Implantologie">Implantologie</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date_rdv}
                    onChange={(e) => setFormData({ ...formData, date_rdv: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heure *</label>
                  <select
                    required
                    value={formData.heure_rdv}
                    onChange={(e) => setFormData({ ...formData, heure_rdv: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select
                    value={formData.statut}
                    onChange={(e) => setFormData({ ...formData, statut: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="planifie">Planifié</option>
                    <option value="confirme">Confirmé</option>
                    <option value="en_cours">En cours</option>
                    <option value="termine">Terminé</option>
                    <option value="annule">Annulé</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Notes particulières..."
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
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  {isEditing ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
