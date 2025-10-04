import React, { useState, useEffect } from 'react';
import { 
  Phone, PhoneCall, PhoneOff, Clock, User, 
  CheckCircle, XCircle, Plus, Search, Filter,
  Calendar, MessageCircle, Volume2, Mic, X
} from 'lucide-react';
import { UserRole } from '../App';

interface Call {
  id?: number;
  patient_id: number;
  patient_name: string;
  phone_number: string;
  call_type: 'entrant' | 'sortant' | 'manque';
  call_reason: string;
  call_status: 'en_attente' | 'en_cours' | 'termine' | 'manque';
  call_duration?: number;
  notes: string;
  scheduled_callback?: string;
  created_at?: string;
}

interface Patient {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
}

interface CallListProps {
  userRole: UserRole;
}

const CallList: React.FC<CallListProps> = ({ userRole }) => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [isInCall, setIsInCall] = useState(false);
  const [callTimer, setCallTimer] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Call>({
    patient_id: 0,
    patient_name: '',
    phone_number: '',
    call_type: 'sortant',
    call_reason: '',
    call_status: 'en_attente',
    notes: ''
  });

  useEffect(() => {
    fetchCalls();
    fetchPatients();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInCall) {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInCall]);

  const fetchCalls = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/calls');
      const data = await response.json();
      setCalls(data);
    } catch (error) {
      console.error('Erreur lors du chargement des appels:', error);
      // Données de démonstration
      setCalls([
        {
          id: 1,
          patient_id: 1,
          patient_name: 'Marie Dubois',
          phone_number: '06.12.34.56.78',
          call_type: 'entrant',
          call_reason: 'Confirmation RDV',
          call_status: 'en_attente',
          notes: 'Souhaite confirmer son RDV de demain',
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          patient_id: 2,
          patient_name: 'Jean Martin',
          phone_number: '06.23.45.67.89',
          call_type: 'sortant',
          call_reason: 'Rappel RDV',
          call_status: 'termine',
          call_duration: 180,
          notes: 'RDV confirmé pour demain 9h',
          created_at: new Date(Date.now() - 3600000).toISOString()
        }
      ]);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/patients');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Erreur lors du chargement des patients:', error);
    }
  };

  const startCall = (call: Call) => {
    setSelectedCall(call);
    setIsInCall(true);
    setCallTimer(0);
    updateCallStatus(call.id!, 'en_cours');
  };

  const endCall = () => {
    if (selectedCall) {
      updateCallStatus(selectedCall.id!, 'termine');
      setSelectedCall(null);
    }
    setIsInCall(false);
    setCallTimer(0);
  };

  const updateCallStatus = async (callId: number, status: string) => {
    try {
      // Simulation de mise à jour
      setCalls(prev => prev.map(call => 
        call.id === callId ? { ...call, call_status: status as any } : call
      ));
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.patient_id === 0) {
      alert('Veuillez sélectionner un patient');
      return;
    }
    
    try {
      const callData = {
        ...formData,
        id: Date.now(),
        created_at: new Date().toISOString()
      };
      
      setCalls(prev => [callData, ...prev]);
      setShowModal(false);
      resetForm();
      alert('Appel enregistré avec succès!');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      patient_id: 0,
      patient_name: '',
      phone_number: '',
      call_type: 'sortant',
      call_reason: '',
      call_status: 'en_attente',
      notes: ''
    });
    setIsEditing(false);
    setSelectedCall(null);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_attente': return 'bg-yellow-100 text-yellow-700';
      case 'en_cours': return 'bg-blue-100 text-blue-700';
      case 'termine': return 'bg-green-100 text-green-700';
      case 'manque': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'en_attente': return 'En attente';
      case 'en_cours': return 'En cours';
      case 'termine': return 'Terminé';
      case 'manque': return 'Manqué';
      default: return 'Non défini';
    }
  };

  const getCallTypeIcon = (type: string) => {
    switch (type) {
      case 'entrant': return <PhoneCall className="w-4 h-4 text-green-600" />;
      case 'sortant': return <Phone className="w-4 h-4 text-blue-600" />;
      case 'manque': return <PhoneOff className="w-4 h-4 text-red-600" />;
      default: return <Phone className="w-4 h-4" />;
    }
  };

  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.phone_number.includes(searchTerm) ||
                         call.call_reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || call.call_status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Phone className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Liste des Appels</h2>
              <p className="text-gray-600">Gestion des appels entrants et sortants</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-64"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">Tous les appels</option>
              <option value="en_attente">En attente</option>
              <option value="en_cours">En cours</option>
              <option value="termine">Terminés</option>
              <option value="manque">Manqués</option>
            </select>
            
            <button
              onClick={() => setShowModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Nouvel Appel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Call in Progress */}
      {isInCall && selectedCall && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-lg animate-pulse">
                <PhoneCall className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{selectedCall.patient_name}</h3>
                <p className="text-blue-100">{selectedCall.phone_number}</p>
                <p className="text-blue-100 text-sm">Durée: {formatDuration(callTimer)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors">
                <Volume2 className="w-6 h-6 text-white" />
              </button>
              <button className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors">
                <Mic className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={endCall}
                className="bg-red-600 hover:bg-red-700 p-3 rounded-lg transition-colors"
              >
                <PhoneOff className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calls List */}
      <div className="space-y-4">
        {filteredCalls.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100 text-center">
            <Phone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun appel trouvé</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Essayez avec d\'autres critères de recherche' : 'Aucun appel enregistré'}
            </p>
          </div>
        ) : (
          filteredCalls.map((call) => (
            <div key={call.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    {getCallTypeIcon(call.call_type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{call.patient_name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(call.call_status)}`}>
                        {getStatusText(call.call_status)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{call.phone_number}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        <span>{call.call_reason}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>
                          {call.created_at && new Date(call.created_at).toLocaleTimeString('fr-FR')}
                          {call.call_duration && ` (${formatDuration(call.call_duration)})`}
                        </span>
                      </div>
                    </div>
                    
                    {call.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{call.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {call.call_status === 'en_attente' && (
                    <button
                      onClick={() => startCall(call)}
                      className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors"
                      title="Démarrer l'appel"
                    >
                      <PhoneCall className="w-5 h-5" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => window.open(`tel:${call.phone_number}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
                    title="Appeler"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Nouvel Appel */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Nouvel Appel</h3>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type d'Appel *</label>
                  <select
                    required
                    value={formData.call_type}
                    onChange={(e) => setFormData({ ...formData, call_type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="entrant">Appel entrant</option>
                    <option value="sortant">Appel sortant</option>
                    <option value="manque">Appel manqué</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Raison de l'Appel *</label>
                  <input
                    type="text"
                    required
                    value={formData.call_reason}
                    onChange={(e) => setFormData({ ...formData, call_reason: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Ex: Confirmation RDV, Urgence..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select
                    value={formData.call_status}
                    onChange={(e) => setFormData({ ...formData, call_status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="en_attente">En attente</option>
                    <option value="en_cours">En cours</option>
                    <option value="termine">Terminé</option>
                    <option value="manque">Manqué</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Notes sur l'appel..."
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
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {calls.filter(c => c.call_status === 'en_attente').length}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">En attente</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-blue-100 p-2 rounded-lg">
              <PhoneCall className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {calls.filter(c => c.call_status === 'en_cours').length}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">En cours</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {calls.filter(c => c.call_status === 'termine').length}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Terminés</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-red-100 p-2 rounded-lg">
              <PhoneOff className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {calls.filter(c => c.call_status === 'manque').length}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Manqués</p>
        </div>
      </div>
    </div>
  );
};

export default CallList;