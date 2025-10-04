import React from 'react';
import { Stethoscope, UserCheck, Sparkles } from 'lucide-react';
import { UserRole } from '../App';

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-2xl">
            <Stethoscope className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Dental El AARKOUBI
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Système de gestion moderne pour votre cabinet dentaire
          </p>
          <div className="flex items-center justify-center mt-4">
            <Sparkles className="w-5 h-5 text-yellow-300 mr-2" />
            <span className="text-blue-100">Chirurgien dentiste |Orthodontie  |Blanchiment</span>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Doctor Card */}
          <div
            onClick={() => onRoleSelect('doctor')}
            className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-3xl border border-white/20"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-6 group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 shadow-lg">
                <Stethoscope className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Docteur</h3>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Gestion complète des patients</span>
                </div>
                <div className="flex items-center justify-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Plans de traitement</span>
                </div>
                <div className="flex items-center justify-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Prescriptions médicales</span>
                </div>
                <div className="flex items-center justify-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Diagnostic assisté par IA</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg">
                Accéder à l'interface docteur
              </button>
            </div>
          </div>

          {/* Assistant Card */}
          <div
            onClick={() => onRoleSelect('assistant')}
            className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-3xl border border-white/20"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl mb-6 group-hover:from-teal-600 group-hover:to-teal-700 transition-all duration-300 shadow-lg">
                <UserCheck className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Assistant(e)</h3>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-center text-gray-600">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                  <span>Gestion des rendez-vous</span>
                </div>
                <div className="flex items-center justify-center text-gray-600">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                  <span>Accueil des patients</span>
                </div>
                <div className="flex items-center justify-center text-gray-600">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                  <span>Suivi administratif</span>
                </div>
                <div className="flex items-center justify-center text-gray-600">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                  <span>Statistiques du cabinet</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg">
                Accéder à l'interface assistant(e)
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-blue-100 text-sm">
            © 2025 Dental El AARKOUBI.Avenue AL MOUTANABI - EL MASSIRA 3 -Lot A- N* 554 Marrakech-Tel:0524392476-Fax :0524392476 
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;