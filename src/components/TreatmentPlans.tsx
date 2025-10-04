import React, { useState, useEffect } from 'react';
import { 
  FileText, User, Calendar, Search, Plus, 
  Edit, Eye, Trash2, X, DollarSign, Clock,
  CheckCircle, AlertCircle, XCircle
} from 'lucide-react';
import { UserRole } from '../App';

interface Patient {
  id: number;
  nom: string;
  prenom: string;
}

interface TreatmentPlan {
  id?: number;
  patient_id: number;
  nom?: string;
  prenom?: string;
  titre: string;
  description: string;
  cout_estime: number;
  date_debut: string;
  date_fin_prevue: string;
  statut: 'en_cours' | 'termine' | 'annule';
  created_at?: string;
}

interface TreatmentPlansProps {
  userRole: UserRole;
}

const TreatmentPlans: React.FC<TreatmentPlansProps> = ({ userRole }) => {
  const [plans, setPlans] = useState<TreatmentPlan[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<TreatmentPlan | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<TreatmentPlan>({
    patient_id: 0,
    titre: '',
    description: '',
    cout_estime: 0,
    date_debut: new Date().toISOString().split('T')[0],
    date_fin_prevue: '',
    statut: 'en_cours'
  });

  useEffect(() => {
    fetchPatients();
    if (selectedPatient) {
      fetchTreatmentPlans(selectedPatient);
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

  const fetchTreatmentPlans = async (patientId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/treatment-plans/${patientId}`);
      if (response.ok) {
        const data = await response.json();
        setPlans(data);
      } else {
        console.error('Erreur HTTP:', response.status);
        // Données de démonstration si l'API ne fonctionne pas
        setPlans([
          {
            id: 1,
            patient_id: patientId,
            titre: 'Traitement orthodontique complet',
            description: 'Correction de malocclusion avec appareil multi-attaches sur 18 mois',
            cout_estime: 4500.00,
            date_debut: new Date().toISOString().split('T')[0],
            date_fin_prevue: new Date(Date.now() + 18 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            statut: 'en_cours',
            created_at: new Date().toISOString()
          }
        ]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des plans de traitement:', error);
      // Données de démonstration en cas d'erreur
      setPlans([
        {
          id: 1,
          patient_id: patientId,
          titre: 'Traitement orthodontique complet',
          description: 'Correction de malocclusion avec appareil multi-attaches sur 18 mois',
          cout_estime: 4500.00,
          date_debut: new Date().toISOString().split('T')[0],
          date_fin_prevue: new Date(Date.now() + 18 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          statut: 'en_cours',
          created_at: new Date().toISOString()
        }
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/treatment-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        if (selectedPatient) {
          fetchTreatmentPlans(selectedPatient);
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
      titre: '',
      description: '',
      cout_estime: 0,
      date_debut: new Date().toISOString().split('T')[0],
      date_fin_prevue: '',
      statut: 'en_cours'
    });
    setIsEditing(false);
    setSelectedPlan(null);
  };

  const handleViewDetails = (plan: TreatmentPlan) => {
    setSelectedPlan(plan);
    setShowDetails(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_cours': return 'bg-blue-100 text-blue-700';
      case 'termine': return 'bg-green-100 text-green-700';
      case 'annule': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'en_cours': return 'En cours';
      case 'termine': return 'Terminé';
      case 'annule': return 'Annulé';
      default: return 'Non défini';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'en_cours': return <Clock className="w-4 h-4" />;
      case 'termine': return <CheckCircle className="w-4 h-4" />;
      case 'annule': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredPlans = plans.filter(plan =>
    plan.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Plans de Traitement</h2>
              <p className="text-gray-600">Planification et suivi des traitements</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <select
              value={selectedPatient || ''}
              onChange={(e) => setSelectedPatient(e.target.value ? parseInt(e.target.value) : null)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-64"
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
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
                />
              </div>
            )}
            
            {selectedPatient && userRole === 'doctor' && (
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Nouveau Plan</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Patient Info */}
      {selectedPatient && (
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">
                {patients.find(p => p.id === selectedPatient)?.prenom} {' '}
                {patients.find(p => p.id === selectedPatient)?.nom}
              </h3>
              <p className="text-indigo-100">
                {filteredPlans.length} plan{filteredPlans.length > 1 ? 's' : ''} de traitement
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Plans List */}
      {selectedPatient ? (
        filteredPlans.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun plan de traitement</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Essayez avec d\'autres critères de recherche' : 'Aucun plan de traitement pour ce patient'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <FileText className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{plan.titre}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Du {new Date(plan.date_debut).toLocaleDateString('fr-FR')} au {new Date(plan.date_fin_prevue).toLocaleDateString('fr-FR')}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {plan.cout_estime}$
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-1">Description</h4>
                      <p className="text-gray-700 text-sm">{plan.description}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(plan.statut)}`}>
                        {getStatusIcon(plan.statut)}
                        <span className="ml-2">{getStatusText(plan.statut)}</span>
                      </span>
                      
                      {plan.created_at && (
                        <span className="text-xs text-gray-500">
                          Créé le {new Date(plan.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleViewDetails(plan)}
                      className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Voir détails"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    {userRole === 'doctor' && (
                      <>
                        <button
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
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
            ))}
          </div>
        )
      ) : (
        <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100 text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Sélectionner un patient</h3>
          <p className="text-gray-500">Choisissez un patient pour consulter ses plans de traitement</p>
        </div>
      )}

      {/* Modal Nouveau Plan */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Nouveau Plan de Traitement</h3>
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
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre du Plan *</label>
                  <input
                    type="text"
                    required
                    value={formData.titre}
                    onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Ex: Traitement orthodontique complet"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Description détaillée du plan de traitement..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Coût Estimé (DH)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.cout_estime}
                    onChange={(e) => setFormData({ ...formData, cout_estime: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select
                    value={formData.statut}
                    onChange={(e) => setFormData({ ...formData, statut: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="en_cours">En cours</option>
                    <option value="termine">Terminé</option>
                    <option value="annule">Annulé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date de Début *</label>
                  <input
                    type="date"
                    required
                    value={formData.date_debut}
                    onChange={(e) => setFormData({ ...formData, date_debut: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date de Fin Prévue *</label>
                  <input
                    type="date"
                    required
                    value={formData.date_fin_prevue}
                    onChange={(e) => setFormData({ ...formData, date_fin_prevue: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Détails */}
      {showDetails && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Détails du Plan de Traitement</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <FileText className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-xl font-bold text-indigo-900">{selectedPlan.titre}</h2>
                </div>
                <div className="flex items-center space-x-4 text-sm text-indigo-700">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Du {new Date(selectedPlan.date_debut).toLocaleDateString('fr-FR')} au {new Date(selectedPlan.date_fin_prevue).toLocaleDateString('fr-FR')}
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {selectedPlan.cout_estime}$
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Description du Traitement</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-line">{selectedPlan.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Statut</h4>
                  <span className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedPlan.statut)}`}>
                    {getStatusIcon(selectedPlan.statut)}
                    <span className="ml-2">{getStatusText(selectedPlan.statut)}</span>
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Durée Estimée</h4>
                  <p className="text-gray-700">
                    {Math.ceil((new Date(selectedPlan.date_fin_prevue).getTime() - new Date(selectedPlan.date_debut).getTime()) / (1000 * 60 * 60 * 24 * 7))} semaines
                  </p>
                </div>
              </div>

              {selectedPlan.created_at && (
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Plan créé le {new Date(selectedPlan.created_at).toLocaleDateString('fr-FR')} à {new Date(selectedPlan.created_at).toLocaleTimeString('fr-FR')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentPlans;