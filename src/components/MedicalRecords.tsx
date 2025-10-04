import React, { useState, useEffect } from 'react';
import { 
  FileText, User, Calendar, Search, Plus, 
  Edit, Eye, Trash2, X, Pill, Activity,
  Download, Upload, Image as ImageIcon, Mic
} from 'lucide-react';
import { UserRole } from '../App';
import VoiceRecorder from './VoiceRecorder';

interface Patient {
  id: number;
  nom: string;
  prenom: string;
}

interface MedicalRecord {
  id?: number;
  patient_id: number;
  nom?: string;
  prenom?: string;
  date_consultation: string;
  type_consultation: string;
  diagnostic: string;
  traitement: string;
  notes: string;
  ordonnance: string;
  images?: string;
  created_by?: 'docteur' | 'assistant';
}

interface MedicalRecordsProps {
  userRole: UserRole;
}

const MedicalRecords: React.FC<MedicalRecordsProps> = ({ userRole }) => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [formData, setFormData] = useState<MedicalRecord>({
    patient_id: 0,
    date_consultation: new Date().toISOString().split('T')[0],
    type_consultation: '',
    diagnostic: '',
    traitement: '',
    notes: '',
    ordonnance: ''
  });

  useEffect(() => {
    fetchPatients();
    if (selectedPatient) {
      fetchMedicalRecords(selectedPatient);
    }
  }, [selectedPatient]);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/patients');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Erreur lors du chargement des patients:', error);
    }
  };

  const fetchMedicalRecords = async (patientId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/medical-records/${patientId}`);
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Erreur lors du chargement des dossiers:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const recordData = {
        ...formData,
        created_by: userRole === 'doctor' ? 'docteur' : 'assistant'
      };
      
      const response = await fetch('http://localhost:3001/api/medical-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordData),
      });

      if (response.ok) {
        if (selectedPatient) {
          fetchMedicalRecords(selectedPatient);
        }
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      patient_id: selectedPatient || 0,
      date_consultation: new Date().toISOString().split('T')[0],
      type_consultation: '',
      diagnostic: '',
      traitement: '',
      notes: '',
      ordonnance: ''
    });
    setIsEditing(false);
    setSelectedRecord(null);
  };

  const handleVoiceTranscription = (text: string, field: keyof MedicalRecord) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field] + ' ' + text
    }));
  };

  const handleViewDetails = (record: MedicalRecord) => {
    setSelectedRecord(record);
    setShowDetails(true);
  };

  const generatePrescription = (record: MedicalRecord) => {
    const prescriptionText = `
ORDONNANCE MÉDICALE
Date: ${new Date(record.date_consultation).toLocaleDateString('fr-FR')}
Patient: ${record.prenom} ${record.nom}
Diagnostic: ${record.diagnostic}

PRESCRIPTION:
${record.ordonnance}

TRAITEMENT:
${record.traitement}

NOTES:
${record.notes}

Dr. [Docteur Asma EL AARKOUBI]
    `.trim();

    const blob = new Blob([prescriptionText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ordonnance_${record.prenom}_${record.nom}_${record.date_consultation}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredRecords = records.filter(record =>
    record.diagnostic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.type_consultation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.traitement.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dossiers Médicaux</h2>
              <p className="text-gray-600">Historique et suivi des consultations</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <select
              value={selectedPatient || ''}
              onChange={(e) => setSelectedPatient(e.target.value ? parseInt(e.target.value) : null)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-w-64"
            >
              <option value="">Sélectionner un patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.prenom} {patient.nom}
                </option>
              ))}
            </select>
            
            {selectedPatient && (
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
            )}
            
            {selectedPatient && userRole === 'doctor' && (
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Nouveau Dossier</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Patient Info */}
      {selectedPatient && (
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">
                {patients.find(p => p.id === selectedPatient)?.prenom} {' '}
                {patients.find(p => p.id === selectedPatient)?.nom}
              </h3>
              <p className="text-purple-100">
                {filteredRecords.length} consultation{filteredRecords.length > 1 ? 's' : ''} au total
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Records List */}
      {selectedPatient ? (
        filteredRecords.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun dossier trouvé</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Essayez avec d\'autres critères de recherche' : 'Aucune consultation enregistrée pour ce patient'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div key={record.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Activity className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{record.type_consultation}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(record.date_consultation).toLocaleDateString('fr-FR')}
                          </span>
                          {record.created_by && (
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              record.created_by === 'docteur' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-teal-100 text-teal-700'
                            }`}>
                              {record.created_by === 'docteur' ? 'Docteur' : 'Assistant(e)'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Diagnostic</h4>
                        <p className="text-gray-700 text-sm">{record.diagnostic}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Traitement</h4>
                        <p className="text-gray-700 text-sm">{record.traitement}</p>
                      </div>
                    </div>

                    {record.notes && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-1">Notes</h4>
                        <p className="text-gray-700 text-sm">{record.notes}</p>
                      </div>
                    )}

                    {record.ordonnance && (
                      <div className="bg-blue-50 rounded-lg p-3 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Pill className="w-4 h-4 text-blue-600" />
                          <h4 className="font-semibold text-blue-900">Ordonnance</h4>
                        </div>
                        <p className="text-blue-800 text-sm">{record.ordonnance}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleViewDetails(record)}
                      className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Voir détails"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    {record.ordonnance && (
                      <button
                        onClick={() => generatePrescription(record)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Télécharger ordonnance"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                    
                    {userRole === 'doctor' && (
                      <button
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100 text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Sélectionner un patient</h3>
          <p className="text-gray-500">Choisissez un patient pour consulter son dossier médical</p>
        </div>
      )}

      {/* Modal Nouveau Dossier */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Nouveau Dossier Médical</h3>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type de Consultation *</label>
                  <select
                    required
                    value={formData.type_consultation}
                    onChange={(e) => setFormData({ ...formData, type_consultation: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date de Consultation *</label>
                  <input
                    type="date"
                    required
                    value={formData.date_consultation}
                    onChange={(e) => setFormData({ ...formData, date_consultation: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diagnostic *</label>
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setShowVoiceRecorder(!showVoiceRecorder)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-lg transition-colors"
                      title="Dictée vocale"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    required
                    rows={3}
                    value={formData.diagnostic}
                    onChange={(e) => setFormData({ ...formData, diagnostic: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Diagnostic détaillé..."
                  />
                  {showVoiceRecorder && (
                    <div className="mt-2">
                      <VoiceRecorder 
                        onTranscription={(text) => handleVoiceTranscription(text, 'diagnostic')}
                        placeholder="Dictez le diagnostic"
                      />
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Traitement *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.traitement}
                    onChange={(e) => setFormData({ ...formData, traitement: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Traitement effectué ou prescrit..."
                  />
                  {showVoiceRecorder && (
                    <div className="mt-2">
                      <VoiceRecorder 
                        onTranscription={(text) => handleVoiceTranscription(text, 'traitement')}
                        placeholder="Dictez le traitement"
                      />
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ordonnance</label>
                  <textarea
                    rows={4}
                    value={formData.ordonnance}
                    onChange={(e) => setFormData({ ...formData, ordonnance: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Médicaments prescrits et posologie..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes Complémentaires</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Observations, recommandations, prochaine visite..."
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

      {/* Modal Détails */}
      {showDetails && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Détails de la Consultation</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Activity className="w-6 h-6 text-purple-600" />
                  <h2 className="text-xl font-bold text-purple-900">{selectedRecord.type_consultation}</h2>
                </div>
                <p className="text-purple-700">
                  {new Date(selectedRecord.date_consultation).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Diagnostic</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{selectedRecord.diagnostic}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Traitement</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{selectedRecord.traitement}</p>
                  </div>
                </div>

                {selectedRecord.ordonnance && (
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                      <Pill className="w-5 h-5 mr-2 text-blue-600" />
                      Ordonnance
                    </h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800 whitespace-pre-line">{selectedRecord.ordonnance}</p>
                    </div>
                  </div>
                )}

                {selectedRecord.notes && (
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Notes Complémentaires</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-line">{selectedRecord.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  {selectedRecord.created_by && (
                    <span className={`px-3 py-1 rounded-full ${
                      selectedRecord.created_by === 'docteur' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-teal-100 text-teal-700'
                    }`}>
                      Créé par: {selectedRecord.created_by === 'docteur' ? 'Docteur' : 'Assistant(e)'}
                    </span>
                  )}
                </div>

                {selectedRecord.ordonnance && (
                  <button
                    onClick={() => generatePrescription(selectedRecord)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Télécharger Ordonnance</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;