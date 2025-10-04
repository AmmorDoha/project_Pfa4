import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, Calendar, Phone, User, Clock, 
  MessageCircle, Send, X, AlertCircle, Check
} from 'lucide-react';
import { UserRole } from '../App';

interface Appointment {
  id: number;
  patient_id: number;
  nom: string;
  prenom: string;
  telephone: string;
  date_rdv: string;
  heure_rdv: string;
  type_consultation: string;
  notes: string;
  statut: string;
}

interface AppointmentConfirmationProps {
  userRole: UserRole;
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({ userRole }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointments, setSelectedAppointments] = useState<number[]>([]);
  const [showSMSModal, setShowSMSModal] = useState(false);
  const [smsMessage, setSmsMessage] = useState('');
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, [filterDate]);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/appointments/unconfirmed/${filterDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched unconfirmed appointments:', data); // Debug log

      if (Array.isArray(data)) {
        setAppointments(data);
      } else {
        console.error('API response is not an array:', data);
        setAppointments([]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des RDV:', error);
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmAppointment = async (appointmentId: number) => {
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
            statut: 'confirme'
          }),
        });

        if (response.ok) {
          fetchAppointments();
          alert('Rendez-vous confirmé avec succès!');
        } else {
          throw new Error(`Failed to confirm appointment, status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la confirmation:', error);
    }
  };

  const confirmMultipleAppointments = async () => {
    try {
      for (const appointmentId of selectedAppointments) {
        await confirmAppointment(appointmentId);
      }
      setSelectedAppointments([]);
      alert(`${selectedAppointments.length} rendez-vous confirmés!`);
    } catch (error) {
      console.error('Erreur lors de la confirmation multiple:', error);
    }
  };

  const sendSMSReminder = () => {
    const defaultMessage = `Bonjour, nous vous rappelons votre rendez-vous au cabinet dentaire DentalAARKOUBI le ${new Date(filterDate).toLocaleDateString('fr-FR')}. Merci de confirmer votre présence.`;
    setSmsMessage(defaultMessage);
    setShowSMSModal(true);
  };

  const callPatient = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`);
  };

  const toggleAppointmentSelection = (appointmentId: number) => {
    setSelectedAppointments(prev => 
      prev.includes(appointmentId)
        ? prev.filter(id => id !== appointmentId)
        : [...prev, appointmentId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Confirmer les Rendez-vous</h2>
              <p className="text-gray-600">Validation et confirmation des RDV planifiés</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            
            {selectedAppointments.length > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={confirmMultipleAppointments}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                  disabled={isLoading}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Confirmer ({selectedAppointments.length})</span>
                </button>
                
                <button
                  onClick={sendSMSReminder}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                  disabled={isLoading}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>SMS Rappel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{appointments.length}</h3>
              <p className="text-gray-600">À confirmer</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{selectedAppointments.length}</h3>
              <p className="text-gray-600">Sélectionnés</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {new Date(filterDate).toLocaleDateString('fr-FR', { day: 'numeric' })}
              </h3>
              <p className="text-gray-600">
                {new Date(filterDate).toLocaleDateString('fr-FR', { month: 'long' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">
            Rendez-vous à confirmer - {new Date(filterDate).toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h3>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-spin" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Chargement...</h3>
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Tous les RDV sont confirmés</h3>
              <p className="text-gray-500">Aucun rendez-vous en attente de confirmation pour cette date</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedAppointments.includes(appointment.id)}
                      onChange={() => toggleAppointmentSelection(appointment.id)}
                      className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                      disabled={isLoading}
                    />
                    
                    <div className="text-center">
                      <div className="bg-green-100 p-2 rounded-lg mb-1">
                        <Clock className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="font-bold text-gray-900 text-sm">{appointment.heure_rdv}</p>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <User className="w-4 h-4 text-gray-500" />
                        <h4 className="font-semibold text-gray-900">
                          {appointment.prenom} {appointment.nom}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{appointment.type_consultation}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Phone className="w-3 h-3" />
                        <span>{appointment.telephone}</span>
                      </div>
                      {appointment.notes && (
                        <p className="text-xs text-gray-500 mt-1">{appointment.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => callPatient(appointment.telephone)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-lg transition-colors"
                      title="Appeler"
                      disabled={isLoading}
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => confirmAppointment(appointment.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                      disabled={isLoading}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Confirmer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SMS Modal */}
      {showSMSModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Envoyer SMS de Rappel</h3>
                <button
                  onClick={() => setShowSMSModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message ({selectedAppointments.length} destinataires)
                </label>
                <textarea
                  rows={4}
                  value={smsMessage}
                  onChange={(e) => setSmsMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Votre message de rappel..."
                />
              </div>

              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => setShowSMSModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    alert(`SMS envoyé à ${selectedAppointments.length} patients!`);
                    setShowSMSModal(false);
                  }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                  disabled={isLoading}
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer SMS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentConfirmation;