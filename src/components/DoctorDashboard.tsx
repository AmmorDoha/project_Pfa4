import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, FileText, Activity, PlusCircle, 
  Clock, TrendingUp, Stethoscope, Pill, Brain 
} from 'lucide-react';

interface DoctorDashboardProps {
  onNavigate: (page: string) => void;
}

interface Stat {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  color: string;
}

interface Patient {
  name: string;
  time: string;
  type: string;
  status: string;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [recentPatients, setRecentPatients] = useState<Patient[]>([]);

  // Quick actions remain static for now
  const quickActions = [
    { icon: PlusCircle, label: 'Nouveau Patient', action: () => onNavigate('patients'), color: 'blue' },
    { icon: Calendar, label: 'Planifier RDV', action: () => onNavigate('appointments'), color: 'green' },
    { icon: FileText, label: 'Créer Dossier', action: () => onNavigate('records'), color: 'purple' },
    { icon: Pill, label: 'Nouvelle Ordonnance', action: () => onNavigate('prescriptions'), color: 'orange' },
    { icon: Brain, label: 'Diagnostic IA', action: () => onNavigate('ai-diagnostic'), color: 'purple' },
    { icon: Activity, label: 'Analyses', action: () => onNavigate('analytics'), color: 'indigo' },
  ];

  // Fetch data when component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();

        // Map API data to Stat structure
        const mappedStats: Stat[] = [
          { icon: Users, label: 'Patients Actifs', value: data.totalPatients.toString(), change: '+12', color: 'blue' },
          { icon: Calendar, label: 'RDV Aujourd\'hui', value: data.appointmentsToday.toString(), change: '+2', color: 'green' },
          { icon: FileText, label: 'Consultations/Mois', value: data.medicalRecordsThisMonth.toString(), change: '+8%', color: 'purple' },
          { icon: TrendingUp, label: 'Taux de Satisfaction', value: '98%', change: '+2%', color: 'emerald' }, // Static for now
        ];
        setStats(mappedStats);
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Fallback to static data if API fails
        setStats([
          { icon: Users, label: 'Patients Actifs', value: '234', change: '+12', color: 'blue' },
          { icon: Calendar, label: 'RDV Aujourd\'hui', value: '8', change: '+2', color: 'green' },
          { icon: FileText, label: 'Consultations/Mois', value: '156', change: '+8%', color: 'purple' },
          { icon: TrendingUp, label: 'Taux de Satisfaction', value: '98%', change: '+2%', color: 'emerald' },
        ]);
      }
    };

    const fetchRecentPatients = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/appointments');
        if (!response.ok) throw new Error('Failed to fetch appointments');
        const data = await response.json();

        // Filter for today's appointments and map to Patient structure
        const today = new Date().toISOString().split('T')[0]; // e.g., "2025-09-04"
        const mappedPatients: Patient[] = data
          .filter((appt: any) => appt.date_rdv === today)
          .map((appt: any) => ({
            name: `${appt.nom} ${appt.prenom}`,
            time: appt.heure_rdv,
            type: appt.type_consultation,
            status: appt.statut === 'planifie' ? 'Planifié' : 'En cours',
          }))
          .slice(0, 4); // Limit to 4 recent patients

        setRecentPatients(mappedPatients.length > 0 ? mappedPatients : [
          { name: 'ammor doha', time: '08:30', type: 'Consultation', status: 'Planifié' },
          { name: 'kamal Morad', time: '15:30', type: 'Soins', status: 'Planifié' },
          { name: 'Samia Lakladi', time: '09:00', type: 'Contrôle', status: 'En cours' },
           { name: 'akram salahi', time: '10:30', type: 'Détartrage', status: 'Planifié' },


        ]);
      } catch (error) {
        console.error('Error fetching recent patients:', error);
        // Fallback to static data
        setRecentPatients([
          { name: 'Samia Lakladi', time: '09:00', type: 'Contrôle', status: 'En cours' },
          { name: 'akram salahi', time: '10:30', type: 'Détartrage', status: 'Planifié' },
          { name: 'ammor doha', time: '14:00', type: 'Consultation', status: 'Planifié' },
          { name: 'kamal Morad', time: '15:30', type: 'Soins', status: 'Planifié' },
        ]);
      }
    };

    fetchStats();
    fetchRecentPatients();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Bonjour Docteur Asma!</h2>
            <p className="text-blue-100">Voici un aperçu de votre journée</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Clock className="w-6 h-6 text-white mb-2" />
            <p className="text-white/80 text-sm">Prochain RDV</p>
            <p className="text-white font-semibold">
              {recentPatients.length > 0 ? `${recentPatients[0].name} - ${recentPatients[0].time}` : 'Aucun RDV'}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Calendar className="w-6 h-6 text-white mb-2" />
            <p className="text-white/80 text-sm">RDV Restants</p>
            <p className="text-white font-semibold">
              {recentPatients.length > 0 ? `${recentPatients.length - 1} consultations` : '0 consultations'}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Activity className="w-6 h-6 text-white mb-2" />
            <p className="text-white/80 text-sm">Urgences</p>
            <p className="text-white font-semibold">2 en attente</p> {/* Static for now */}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-${stat.color}-100 p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className={`text-${stat.color}-600 text-sm font-semibold bg-${stat.color}-50 px-2 py-1 rounded-full`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Actions Rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className={`group p-4 rounded-xl border-2 border-gray-100 hover:border-${action.color}-200 hover:bg-${action.color}-50 transition-all duration-200 text-center`}
              >
                <div className={`bg-${action.color}-100 group-hover:bg-${action.color}-200 p-3 rounded-lg mx-auto mb-3 w-fit transition-colors`}>
                  <Icon className={`w-6 h-6 text-${action.color}-600`} />
                </div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {action.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Planning d'Aujourd'hui</h3>
          <button
            onClick={() => onNavigate('appointments')}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
          >
            Voir tout
          </button>
        </div>
        <div className="space-y-4">
          {recentPatients.map((patient, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{patient.name}</h4>
                  <p className="text-sm text-gray-600">{patient.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{patient.time}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  patient.status === 'En cours' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {patient.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;