import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Users, Calendar, 
  Activity, Download,
  PieChart, RefreshCw,
  Clock, CheckCircle, Phone, FileText,
  MessageCircle, AlertTriangle // Added AlertTriangle
} from 'lucide-react';

interface StatisticsData {
  totalPatients: number;
  appointmentsToday: number;
  appointmentsThisMonth: number;
  patientsThisMonth: number;
  appointmentsConfirmed: number;
  appointmentsPending: number;
  medicalRecordsThisMonth: number;
  averageConsultationTime: number;
  patientSatisfaction: number;
  callsToday: number;
  callsAnswered: number;
  callsMissed: number;
  averageCallDuration: number;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

const Statistics: React.FC = () => {
  const [statisticsData, setStatisticsData] = useState<StatisticsData>({
    totalPatients: 0,
    appointmentsToday: 0,
    appointmentsThisMonth: 0,
    patientsThisMonth: 0,
    appointmentsConfirmed: 0,
    appointmentsPending: 0,
    medicalRecordsThisMonth: 0,
    averageConsultationTime: 0,
    patientSatisfaction: 0,
    callsToday: 0,
    callsAnswered: 0,
    callsMissed: 0,
    averageCallDuration: 0
  });
  
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStatistics();
  }, [selectedPeriod]);

  const fetchStatistics = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3001/api/analytics?period=${selectedPeriod}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      
      // Ensure all required fields are present, default to 0 if missing
      const enhancedData = {
        totalPatients: data.totalPatients || 0,
        appointmentsToday: data.appointmentsToday || 0,
        appointmentsThisMonth: data.appointmentsThisMonth || 0,
        patientsThisMonth: data.patientsThisMonth || 0,
        appointmentsConfirmed: data.appointmentsConfirmed || 0,
        appointmentsPending: data.appointmentsPending || 0,
        medicalRecordsThisMonth: data.medicalRecordsThisMonth || 0,
        averageConsultationTime: data.averageConsultationTime || 0,
        patientSatisfaction: data.patientSatisfaction || 0,
        callsToday: data.callsToday || 0,
        callsAnswered: data.callsAnswered || 0,
        callsMissed: data.callsMissed || 0,
        averageCallDuration: data.averageCallDuration || 0
      };
      
      setStatisticsData(enhancedData);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
      setError('Impossible de charger les statistiques. Vérifiez la connexion au serveur ou contactez un administrateur.');
    } finally {
      setIsLoading(false);
    }
  };

  const kpiCards = [
    {
      title: 'Patients Totaux',
      value: statisticsData.totalPatients,
      change: '+12%', // This could be dynamic if the server provides change data
      icon: Users,
      color: 'blue',
      trend: 'up'
    },
    {
      title: 'RDV Ce Mois',
      value: statisticsData.appointmentsThisMonth,
      change: '+8%', // This could be dynamic if the server provides change data
      icon: Calendar,
      color: 'green',
      trend: 'up'
    },
    {
      title: 'Appels Aujourd\'hui',
      value: statisticsData.callsToday,
      change: '+5', // This could be dynamic if the server provides change data
      icon: Phone,
      color: 'purple',
      trend: 'up'
    },
    {
      title: 'Satisfaction',
      value: `${statisticsData.patientSatisfaction}%`,
      change: '+2%', // This could be dynamic if the server provides change data
      icon: TrendingUp,
      color: 'emerald',
      trend: 'up'
    }
  ];

  const appointmentStatusData: ChartData[] = [
    { label: 'Confirmés', value: statisticsData.appointmentsConfirmed, color: '#10B981' },
    { label: 'En attente', value: statisticsData.appointmentsPending, color: '#F59E0B' },
    { label: 'Terminés', value: statisticsData.appointmentsToday - statisticsData.appointmentsConfirmed - statisticsData.appointmentsPending, color: '#6B7280' }
  ];

  const callsData: ChartData[] = [
    { label: 'Répondus', value: statisticsData.callsAnswered, color: '#10B981' },
    { label: 'Manqués', value: statisticsData.callsMissed, color: '#EF4444' }
  ];

  const exportReport = () => {
    const reportData = {
      date: new Date().toLocaleDateString('fr-FR'),
      period: selectedPeriod,
      statistics: statisticsData,
      summary: `Rapport statistique du cabinet dentaire pour la période sélectionnée.`
    };

    const reportText = `
RAPPORT STATISTIQUE - CABINET DENTAIRE
======================================
Date: ${reportData.date}
Période: ${selectedPeriod === 'month' ? 'Ce mois' : 'Cette semaine'}

PATIENTS:
- Total: ${statisticsData.totalPatients}
- Nouveaux ce mois: ${statisticsData.patientsThisMonth}
- Satisfaction: ${statisticsData.patientSatisfaction}%

RENDEZ-VOUS:
- Ce mois: ${statisticsData.appointmentsThisMonth}
- Aujourd'hui: ${statisticsData.appointmentsToday}
- Confirmés: ${statisticsData.appointmentsConfirmed}
- En attente: ${statisticsData.appointmentsPending}

APPELS:
- Aujourd'hui: ${statisticsData.callsToday}
- Répondus: ${statisticsData.callsAnswered}
- Manqués: ${statisticsData.callsMissed}
- Durée moyenne: ${statisticsData.averageCallDuration} min

ACTIVITÉ:
- Consultations: ${statisticsData.medicalRecordsThisMonth}
- Temps moyen: ${statisticsData.averageConsultationTime} min

======================================
Généré par DentalAARKOUBI
    `.trim();

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport_statistiques_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-spin" />
        <h3 className="text-xl font-semibold text-gray-600">Chargement des statistiques...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 text-red-700 p-6 rounded-lg">
        <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-xl font-semibold">{error}</h3>
        <button
          onClick={fetchStatistics}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Statistiques du Cabinet</h2>
              <p className="text-gray-600">Tableaux de bord et métriques de performance</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
            </select>
            
            <button
              onClick={fetchStatistics}
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 p-2 rounded-lg transition-colors"
              title="Actualiser"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            
            <button
              onClick={exportReport}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Exporter</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-${kpi.color}-100 p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-${kpi.color}-600`} />
                </div>
                <span className={`text-${kpi.color}-600 text-sm font-semibold bg-${kpi.color}-50 px-2 py-1 rounded-full`}>
                  {kpi.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
              <p className="text-gray-600 text-sm">{kpi.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Status Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-indigo-600" />
            Statut des Rendez-vous
          </h3>
          
          <div className="space-y-4">
            {appointmentStatusData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-700">{item.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">{item.value}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        backgroundColor: item.color,
                        width: `${(item.value / Math.max(...appointmentStatusData.map(d => d.value))) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calls Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <Phone className="w-5 h-5 mr-2 text-indigo-600" />
            Appels Aujourd'hui
          </h3>
          
          <div className="space-y-4">
            {callsData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-700">{item.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">{item.value}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        backgroundColor: item.color,
                        width: `${(item.value / Math.max(...callsData.map(d => d.value))) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Durée moyenne</span>
              <span className="font-semibold text-gray-900">{statisticsData.averageCallDuration} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Métriques de Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
            <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-blue-900 text-xl">{statisticsData.averageConsultationTime} min</h4>
            <p className="text-blue-700 text-sm">Temps moyen consultation</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
            <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-green-900 text-xl">
              {Math.round((statisticsData.callsAnswered / statisticsData.callsToday) * 100)}%
            </h4>
            <p className="text-green-700 text-sm">Taux de réponse appels</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
            <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-purple-900 text-xl">
              {Math.round(statisticsData.medicalRecordsThisMonth / statisticsData.patientsThisMonth)}
            </h4>
            <p className="text-purple-700 text-sm">Consultations/patient</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
            <div className="bg-orange-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-orange-900 text-xl">{statisticsData.averageCallDuration} min</h4>
            <p className="text-orange-700 text-sm">Durée moyenne appels</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Activité Récente</h3>
        
        <div className="space-y-4">
          {[
            { action: 'RDV confirmé', patient: 'ammor doha', time: 'Il y a 15 min', type: 'appointment', icon: CheckCircle },
            { action: 'Appel reçu', patient: 'akram salahi', time: 'Il y a 32 min', type: 'call', icon: Phone },
            { action: 'Nouveau patient', patient: 'Samia Lakladi', time: 'Il y a 1h', type: 'patient', icon: Users },
            { action: 'SMS envoyé', patient: 'kamal Morad', time: 'Il y a 2h', type: 'sms', icon: MessageCircle },
            { action: 'Dossier créé', patient: 'Anas Rousof', time: 'Il y a 3h', type: 'record', icon: FileText }
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'appointment' ? 'bg-green-100' :
                  activity.type === 'call' ? 'bg-blue-100' :
                  activity.type === 'patient' ? 'bg-purple-100' :
                  activity.type === 'sms' ? 'bg-orange-100' :
                  'bg-indigo-100'
                }`}>
                  <Icon className={`w-4 h-4 ${
                    activity.type === 'appointment' ? 'text-green-600' :
                    activity.type === 'call' ? 'text-blue-600' :
                    activity.type === 'patient' ? 'text-purple-600' :
                    activity.type === 'sms' ? 'text-orange-600' :
                    'text-indigo-600'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.patient}</p>
                </div>
                
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Statistics;