import React, { useState, useEffect } from 'react';
import { 
  Pill, User, Calendar, Search, Plus, 
  Edit, Eye, Trash2, X, Download, FileText,
  Clock, AlertCircle, CheckCircle
} from 'lucide-react';
import { UserRole } from '../App';

interface Patient {
  id: number;
  nom: string;
  prenom: string;
}

interface Prescription {
  id?: number;
  patient_id: number;
  nom?: string;
  prenom?: string;
  date_prescription: string;
  medicaments: string;
  posologie: string;
  duree_traitement: string;
  instructions: string;
  statut: 'active' | 'terminee' | 'annulee';
  created_by: string;
  created_at?: string;
}

interface PrescriptionManagerProps {
  userRole: UserRole;
}

const PrescriptionManager: React.FC<PrescriptionManagerProps> = ({ userRole }) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Prescription>({
    patient_id: 0,
    date_prescription: new Date().toISOString().split('T')[0],
    medicaments: '',
    posologie: '',
    duree_traitement: '',
    instructions: '',
    statut: 'active',
    created_by: 'docteur'
  });

  useEffect(() => {
    fetchPatients();
    fetchPrescriptions();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/patients');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Erreur lors du chargement des patients:', error);
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/prescriptions');
      const data = await response.json();
      setPrescriptions(data);
    } catch (error) {
      console.error('Erreur lors du chargement des ordonnances:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === formData.patient_id);
    const prescriptionData = {
      ...formData,
      nom: patient ? patient.nom : '',
      prenom: patient ? patient.prenom : '',
      created_by: userRole === 'doctor' ? 'docteur' : 'assistant'
    };
    
    const url = isEditing && selectedPrescription?.id
      ? `http://localhost:3001/api/prescriptions/${selectedPrescription.id}`
      : 'http://localhost:3001/api/prescriptions';
    
    const method = isEditing ? 'PUT' : 'POST';
    
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prescriptionData),
      });

      if (response.ok) {
        const updatedPrescription = await response.json(); // Expect full object from backend
        if (isEditing) {
          setPrescriptions(prescriptions.map(p => p.id === updatedPrescription.id ? updatedPrescription : p));
        } else {
          setPrescriptions([...prescriptions, updatedPrescription]);
        }
        setShowModal(false);
        resetForm();
        alert(isEditing ? 'Ordonnance modifiée avec succès!' : 'Ordonnance créée avec succès!');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde de l\'ordonnance');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette ordonnance?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/prescriptions/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setPrescriptions(prescriptions.filter(p => p.id !== id));
          alert('Ordonnance supprimée avec succès!');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de l\'ordonnance');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      patient_id: 0,
      date_prescription: new Date().toISOString().split('T')[0],
      medicaments: '',
      posologie: '',
      duree_traitement: '',
      instructions: '',
      statut: 'active',
      created_by: userRole === 'doctor' ? 'docteur' : 'assistant'
    });
    setIsEditing(false);
    setSelectedPrescription(null);
  };

  const handleEdit = (prescription: Prescription) => {
    setFormData(prescription);
    setSelectedPrescription(prescription);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleViewDetails = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setShowDetails(true);
  };

  const generatePrescriptionPDF = (prescription: Prescription) => {
    const prescriptionText = `
ORDONNANCE MÉDICALE
=====================================

Date: ${new Date(prescription.date_prescription).toLocaleDateString('fr-FR')}
Patient: ${prescription.prenom} ${prescription.nom}

MÉDICAMENTS PRESCRITS:
${prescription.medicaments}

POSOLOGIE:
${prescription.posologie}

DURÉE DU TRAITEMENT:
${prescription.duree_traitement}

INSTRUCTIONS PARTICULIÈRES:
${prescription.instructions}

=====================================
Dr. [Docteur Asma EL AARKOUBI]
Cabinet Dentaire DentalAARKOUBI
    `.trim();

    const blob = new Blob([prescriptionText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ordonnance_${prescription.prenom}_${prescription.nom}_${prescription.date_prescription}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'terminee': return 'bg-gray-100 text-gray-700';
      case 'annulee': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'terminee': return 'Terminée';
      case 'annulee': return 'Annulée';
      default: return 'Non défini';
    }
  };

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.medicaments.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (prescription.nom?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
    (prescription.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Pill className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gestion des Ordonnances</h2>
              <p className="text-gray-600">Création et suivi des prescriptions médicales</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher une ordonnance..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-64"
              />
            </div>
            
            {userRole === 'doctor' && (
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Nouvelle Ordonnance</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100 text-center">
            <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune ordonnance trouvée</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Essayez avec d\'autres critères de recherche' : 'Commencez par créer une nouvelle ordonnance'}
            </p>
          </div>
        ) : (
          filteredPrescriptions.map((prescription) => (
            <div key={prescription.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Pill className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {prescription.prenom} {prescription.nom}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(prescription.date_prescription).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {prescription.duree_traitement}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Médicaments</h4>
                      <p className="text-gray-700 text-sm">{prescription.medicaments}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Posologie</h4>
                      <p className="text-gray-700 text-sm">{prescription.posologie}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(prescription.statut)}`}>
                      {prescription.statut === 'active' && <CheckCircle className="w-4 h-4 mr-1" />}
                      {prescription.statut === 'terminee' && <CheckCircle className="w-4 h-4 mr-1" />}
                      {prescription.statut === 'annulee' && <AlertCircle className="w-4 h-4 mr-1" />}
                      {getStatusText(prescription.statut)}
                    </span>
                    
                    <span className="text-xs text-gray-500">
                      Par: {prescription.created_by}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleViewDetails(prescription)}
                    className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    title="Voir détails"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => generatePrescriptionPDF(prescription)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Télécharger"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  
                  {userRole === 'doctor' && (
                    <>
                      <button
                        onClick={() => handleEdit(prescription)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(prescription.id!)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Nouvelle Ordonnance */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {isEditing ? 'Modifier l\'Ordonnance' : 'Nouvelle Ordonnance'}
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
                    onChange={(e) => {
                      const patientId = parseInt(e.target.value);
                      const patient = patients.find(p => p.id === patientId);
                      setFormData({
                        ...formData,
                        patient_id: patientId,
                        nom: patient ? patient.nom : '',
                        prenom: patient ? patient.prenom : ''
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date de Prescription *</label>
                  <input
                    type="date"
                    required
                    value={formData.date_prescription}
                    onChange={(e) => setFormData({ ...formData, date_prescription: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Médicaments *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.medicaments}
                    onChange={(e) => setFormData({ ...formData, medicaments: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Liste des médicaments prescrits..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Posologie *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.posologie}
                    onChange={(e) => setFormData({ ...formData, posologie: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Dosage et fréquence..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Durée du Traitement *</label>
                  <input
                    type="text"
                    required
                    value={formData.duree_traitement}
                    onChange={(e) => setFormData({ ...formData, duree_traitement: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Ex: 7 jours, 2 semaines..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructions Particulières</label>
                  <textarea
                    rows={3}
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Instructions spéciales, contre-indications..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select
                    value={formData.statut}
                    onChange={(e) => setFormData({ ...formData, statut: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="active">Active</option>
                    <option value="terminee">Terminée</option>
                    <option value="annulee">Annulée</option>
                  </select>
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
                  {isEditing ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Détails */}
      {showDetails && selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Détails de l'Ordonnance</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Pill className="w-6 h-6 text-orange-600" />
                  <h2 className="text-xl font-bold text-orange-900">
                    Ordonnance - {selectedPrescription.prenom} {selectedPrescription.nom}
                  </h2>
                </div>
                <p className="text-orange-700">
                  Prescrite le {new Date(selectedPrescription.date_prescription).toLocaleDateString('fr-FR')}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Médicaments Prescrits</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-line">{selectedPrescription.medicaments}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Posologie</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-line">{selectedPrescription.posologie}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Durée du Traitement</h4>
                    <p className="text-gray-700">{selectedPrescription.duree_traitement}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Statut</h4>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedPrescription.statut)}`}>
                      {getStatusText(selectedPrescription.statut)}
                    </span>
                  </div>
                </div>

                {selectedPrescription.instructions && (
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Instructions Particulières</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800 whitespace-pre-line">{selectedPrescription.instructions}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end pt-6 border-t border-gray-200">
                <button
                  onClick={() => generatePrescriptionPDF(selectedPrescription)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger Ordonnance</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionManager;