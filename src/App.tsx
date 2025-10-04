import React, { useState } from 'react';
import { Stethoscope, UserCheck, Calendar, Users, FileText, Activity, PlusCircle, Search } from 'lucide-react';
import RoleSelection from './components/RoleSelection';
import DoctorDashboard from './components/DoctorDashboard';
import AssistantDashboard from './components/AssistantDashboard';
import PatientManagement from './components/PatientManagement';
import AppointmentCalendar from './components/AppointmentCalendar';
import MedicalRecords from './components/MedicalRecords';
import TreatmentPlans from './components/TreatmentPlans';
import CallList from './components/CallList';
import AppointmentConfirmation from './components/AppointmentConfirmation';
import Reminders from './components/Reminders';
import Statistics from './components/Statistics';
import PrescriptionManager from './components/PrescriptionManager';
import AIDiagnostic from './components/AIDiagnostic';
import Analytics from './components/Analytics';

export type UserRole = 'doctor' | 'assistant' | null;

function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('dashboard');
  };

  if (!userRole) {
    return <RoleSelection onRoleSelect={handleRoleSelect} />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'patients':
        return <PatientManagement userRole={userRole} />;
      case 'appointments':
        return <AppointmentCalendar userRole={userRole} />;
      case 'records':
        return <MedicalRecords userRole={userRole} />;
      case 'treatments':
        return <TreatmentPlans userRole={userRole} />;
      case 'prescriptions':
        return <PrescriptionManager userRole={userRole} />;
      case 'ai-diagnostic':
        return <AIDiagnostic userRole={userRole} />;
      case 'analytics':
        return <Analytics />; // Removed userRole prop
      case 'calls':
        return <CallList userRole={userRole} />;
      case 'confirm-appointments':
        return <AppointmentConfirmation userRole={userRole} />;
      case 'reminders':
        return <Reminders userRole={userRole} />;
      case 'statistics':
        return <Statistics userRole={userRole} />;
      default:
        return userRole === 'doctor' 
          ? <DoctorDashboard onNavigate={setCurrentPage} />
          : <AssistantDashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">DentalAARKOUBI</h1>
                <p className="text-sm text-gray-600 capitalize">{userRole} Interface</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'dashboard' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentPage('patients')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'patients' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Patients
              </button>
              <button
                onClick={() => setCurrentPage('appointments')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'appointments' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Rendez-vous
              </button>
              <button
                onClick={() => setCurrentPage('records')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'records' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Dossiers
              </button>
              {userRole === 'doctor' && (
                <button
                  onClick={() => setCurrentPage('treatments')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 'treatments' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Plans de Traitement
                </button>
              )}
            </nav>

            <button
              onClick={handleLogout}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      
    </div>
  );
}

export default App;