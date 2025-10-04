import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Users, Calendar, 
  DollarSign, Activity, Download,
  PieChart, LineChart, RefreshCw, Clock, FileText, Pill
} from 'lucide-react';

interface AnalyticsData {
  totalPatients: number;
  appointmentsToday: number;
  appointmentsThisMonth: number;
  patientsThisMonth: number;
  appointmentsConfirmed: number;
  appointmentsPending: number;
  medicalRecordsThisMonth: number;
  revenue: number;
  averageConsultationTime: number;
  patientSatisfaction: number;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface AnalyticsProps {
  // Removed userRole since it's not used
}

const Analytics: React.FC<AnalyticsProps> = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalPatients: 0,
    appointmentsToday: 0,
    appointmentsThisMonth: 0,
    patientsThisMonth: 0,
    appointmentsConfirmed: 0,
    appointmentsPending: 0,
    medicalRecordsThisMonth: 0,
    revenue: 0,
    averageConsultationTime: 0,
    patientSatisfaction: 0
  });
  
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    fetchAnalytics();
  }, [selectedPeriod]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/analytics');
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Erreur lors du chargement des analytics:', error);
    }
  };

  const kpiCards = [
    {
      title: 'Patients Totaux',
      value: analyticsData.totalPatients,
      change: '+12%',
      icon: Users,
      color: 'blue',
      trend: 'up'
    },
    {
      title: 'RDV Ce Mois',
      value: analyticsData.appointmentsThisMonth,
      change: '+8%',
      icon: Calendar,
      color: 'green',
      trend: 'up'
    },
    {
      title: 'Consultations',
      value: analyticsData.medicalRecordsThisMonth,
      change: '+15%',
      icon: Activity,
      color: 'purple',
      trend: 'up'
    },
    {
      title: 'Satisfaction',
      value: `${analyticsData.patientSatisfaction}%`,
      change: '+2%',
      icon: TrendingUp,
      color: 'emerald',
      trend: 'up'
    }
  ];

  const appointmentStatusData: ChartData[] = [
    { label: 'Confirmés', value: analyticsData.appointmentsConfirmed, color: '#10B981' },
    { label: 'En attente', value: analyticsData.appointmentsPending, color: '#F59E0B' },
    { label: 'Terminés', value: analyticsData.appointmentsToday - analyticsData.appointmentsConfirmed - analyticsData.appointmentsPending, color: '#6B7280' }
  ];

  const monthlyData = [
    { month: 'Jan', patients: 45, appointments: 120, revenue: 8500 },
    { month: 'Fév', patients: 52, appointments: 135, revenue: 9200 },
    { month: 'Mar', patients: 48, appointments: 128, revenue: 8800 },
    { month: 'Avr', patients: 61, appointments: 156, revenue: 10500 },
    { month: 'Mai', patients: 58, appointments: 148, revenue: 9800 },
    { month: 'Juin', patients: 65, appointments: 172, revenue: 11200 }
  ];

  const exportReport = () => {
    const reportData = {
      date: new Date().toLocaleDateString('fr-FR'),
      period: selectedPeriod,
      analytics: analyticsData,
      summary: `Rapport d'activité du cabinet dentaire pour la période sélectionnée.`
    };

    const reportText = `
RAPPORT D'ACTIVITÉ - CABINET DENTAIRE
=====================================
Date: ${reportData.date}
Période: ${selectedPeriod === 'month' ? 'Ce mois' : 'Cette semaine'}

STATISTIQUES GÉNÉRALES:
- Patients totaux: ${analyticsData.totalPatients}
- RDV ce mois: ${analyticsData.appointmentsThisMonth}
- Consultations: ${analyticsData.medicalRecordsThisMonth}
- Satisfaction: ${analyticsData.patientSatisfaction}%

RENDEZ-VOUS:
- Confirmés: ${analyticsData.appointmentsConfirmed}
- En attente: ${analyticsData.appointmentsPending}
- Aujourd'hui: ${analyticsData.appointmentsToday}

ACTIVITÉ:
- Nouveaux patients ce mois: ${analyticsData.patientsThisMonth}
- Dossiers médicaux créés: ${analyticsData.medicalRecordsThisMonth}

=====================================
Généré par DentalAARKOUBI
    `.trim();

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport_activite_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
              <h2 className="text-2xl font-bold text-gray-900">Analyses et Statistiques</h2>
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
              onClick={fetchAnalytics}
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

        {/* Monthly Trends */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <LineChart className="w-5 h-5 mr-2 text-indigo-600" />
            Évolution Mensuelle
          </h3>
          
          <div className="space-y-4">
            {monthlyData.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{month.month}</span>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="text-center">
                    <p className="text-blue-600 font-semibold">{month.patients}</p>
                    <p className="text-gray-500 text-xs">Patients</p>
                  </div>
                  <div className="text-center">
                    <p className="text-green-600 font-semibold">{month.appointments}</p>
                    <p className="text-gray-500 text-xs">RDV</p>
                  </div>
                  <div className="text-center">
                    <p className="text-purple-600 font-semibold">{month.revenue}DH</p>
                    <p className="text-gray-500 text-xs">CA</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Métriques de Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
            <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-blue-900 text-xl">32 min</h4>
            <p className="text-blue-700 text-sm">Temps moyen de consultation</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
            <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-green-900 text-xl">94%</h4>
            <p className="text-green-700 text-sm">Taux de présence</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
            <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-purple-900 text-xl">156DH</h4>
            <p className="text-purple-700 text-sm">Revenus moyens/patient</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Activité Récente</h3>
        
        <div className="space-y-4">
          {[
            { action: 'Nouveau patient ajouté', patient: 'Samia Lakladi', time: 'Il y a 2h', type: 'patient' },
            { action: 'RDV confirmé', patient: 'akram salahi', time: 'Il y a 3h', type: 'appointment' },
            { action: 'Dossier médical créé', patient: 'ammor doha', time: 'Il y a 4h', type: 'record' },
            { action: 'Ordonnance prescrite', patient: 'kamal Morad', time: 'Il y a 5h', type: 'prescription' },
            { action: 'Plan de traitement mis à jour', patient: 'ammor doha', time: 'Il y a 6h', type: 'treatment' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className={`p-2 rounded-lg ${
                activity.type === 'patient' ? 'bg-blue-100' :
                activity.type === 'appointment' ? 'bg-green-100' :
                activity.type === 'record' ? 'bg-purple-100' :
                activity.type === 'prescription' ? 'bg-orange-100' :
                'bg-indigo-100'
              }`}>
                {activity.type === 'patient' && <Users className="w-4 h-4 text-blue-600" />}
                {activity.type === 'appointment' && <Calendar className="w-4 h-4 text-green-600" />}
                {activity.type === 'record' && <FileText className="w-4 h-4 text-purple-600" />}
                {activity.type === 'prescription' && <Pill className="w-4 h-4 text-orange-600" />}
                {activity.type === 'treatment' && <Activity className="w-4 h-4 text-indigo-600" />}
              </div>
              
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.patient}</p>
              </div>
              
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;