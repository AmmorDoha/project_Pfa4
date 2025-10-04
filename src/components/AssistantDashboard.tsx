import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, Calendar, Phone, Clock, CheckCircle, 
  AlertCircle, TrendingUp, UserCheck, Bell, 
  MessageCircle, X, Send, Mic, MicOff, Volume2, Brain, AlertTriangle,
  User, Loader2, BarChart3
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  actionResult?: string;
}

interface AssistantDashboardProps {
  onNavigate: (page: string) => void;
}

interface Stat {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  color: string;
}

interface Appointment {
  time: string;
  patient: string;
  type: string;
  status: string;
  phone: string;
}

const AssistantDashboard: React.FC<AssistantDashboardProps> = ({ onNavigate }) => {
  // ChatBot States
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Bonjour! Je suis DentalAssist AI, votre assistant IA dédié aux urgences au cabinet dentaire. Je réponds uniquement aux cas urgents. Cliquez sur un symptôme ou décrivez une situation d'urgence (ex. douleur, saignement) pour des conseils immédiats. (Note: L'audio peut être désactivé avec le bouton Volume si nécessaire.)`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dashboard Data States
  const [stats, setStats] = useState<Stat[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);

  // Quick actions remain static for now
  const quickActions = [
    { icon: Calendar, label: 'Nouveau RDV', action: () => onNavigate('appointments'), color: 'blue' },
    { icon: Users, label: 'Rechercher Patient', action: () => onNavigate('patients'), color: 'green' },
    { icon: Phone, label: 'Liste d\'Appel', action: () => onNavigate('calls'), color: 'purple' },
    { icon: CheckCircle, label: 'Confirmer RDV', action: () => onNavigate('confirm-appointments'), color: 'green' },
    { icon: Bell, label: 'Rappels', action: () => onNavigate('reminders'), color: 'orange' },
    { icon: BarChart3, label: 'Statistiques', action: () => onNavigate('statistics'), color: 'indigo' },
  ];

  // Speech Recognition Setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'fr-FR';

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = () => setIsListening(false);
      recognitionInstance.onend = () => setIsListening(false);

      setRecognition(recognitionInstance);
    }
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();

        const mappedStats: Stat[] = [
          { icon: Calendar, label: 'RDV Aujourd\'hui', value: data.appointmentsToday.toString(), change: '+3', color: 'blue' },
          { icon: Users, label: 'Patients en Attente', value: '4', change: '-1', color: 'orange' }, // Static for now
          { icon: CheckCircle, label: 'RDV Confirmés', value: data.appointmentsConfirmed.toString(), change: '+2', color: 'green' },
          { icon: Phone, label: 'Appels en Attente', value: '2', change: '0', color: 'purple' }, // Static for now
        ];
        setStats(mappedStats);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats([
          { icon: Calendar, label: 'RDV Aujourd\'hui', value: '12', change: '+3', color: 'blue' },
          { icon: Users, label: 'Patients en Attente', value: '4', change: '-1', color: 'orange' },
          { icon: CheckCircle, label: 'RDV Confirmés', value: '4', change: '+2', color: 'green' },
          { icon: Phone, label: 'Appels en Attente', value: '2', change: '0', color: 'purple' },
        ]);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/appointments');
        if (!response.ok) throw new Error('Failed to fetch appointments');
        const data = await response.json();

        const today = new Date().toISOString().split('T')[0]; // e.g., "2025-09-07"
        const mappedAppointments: Appointment[] = data
          .filter((appt: any) => appt.date_rdv === today)
          .map((appt: any) => ({
            time: appt.heure_rdv,
            patient: `${appt.nom} ${appt.prenom}`,
            type: appt.type_consultation,
            status: appt.statut,
            phone: appt.telephone || 'N/A',
          }))
          .slice(0, 5); // Limit to 5 appointments

        setTodayAppointments(mappedAppointments.length > 0 ? mappedAppointments : [
          { time: '08:30', patient: 'ammor doha', type: 'Contrôle', status: 'confirmed', phone: '06.12.34.56.78' },
          { time: '09:00', patient: 'akram salahi', type: 'Détartrage', status: 'waiting', phone: '06.23.45.67.89' },
          { time: '09:30', patient: 'Samia Lakladi', type: 'Consultation', status: 'pending', phone: '06.34.56.78.90' },
          { time: '10:00', patient: 'kamal Morad', type: 'Soins', status: 'confirmed', phone: '06.45.67.89.01' },
          { time: '10:30', patient: 'Anas Rousof', type: 'Urgence', status: 'urgent', phone: '06.56.78.90.12' },
        ]);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setTodayAppointments([
          { time: '08:30', patient: 'ammor doha', type: 'Contrôle', status: 'confirmed', phone: '06.12.34.56.78' },
          { time: '09:00', patient: 'akram salahi', type: 'Détartrage', status: 'waiting', phone: '06.23.45.67.89' },
          { time: '09:30', patient: 'Samia Lakladi', type: 'Consultation', status: 'pending', phone: '06.34.56.78.90' },
          { time: '10:00', patient: 'kamal Morad', type: 'Soins', status: 'confirmed', phone: '06.45.67.89.01' },
          { time: '10:30', patient: 'Anas Rousof', type: 'Urgence', status: 'urgent', phone: '06.56.78.90.12' },
        ]);
      }
    };

    fetchStats();
    fetchAppointments();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ChatBot Functions
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const startListening = () => {
    if (recognition) { 
      setIsListening(true);
      recognition.start();
    }
  };
  
  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window && !isSpeaking) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleSpeech = (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      speakText(text);
    }
  };

  const addMessage = (text: string, sender: 'user' | 'bot', actionResult?: string) => {
    const newMessage: Message = { id: Date.now().toString(), text, sender, timestamp: new Date(), actionResult };
    setMessages(prev => [...prev, newMessage]);
    if (sender === 'bot' && !isSpeaking) speakText(text);
  };

  const handleUrgency = (details: string): string => {
    const lowerDetails = details.toLowerCase();
    let advice = 'Protocole urgence général: Évaluez la douleur, vérifiez abcès. Contactez le docteur si nécessaire.';
    if (lowerDetails.includes('pain') || lowerDetails.includes('douleur') || lowerDetails.includes('toothache')) {
      advice += ' Conseils pour réduire la douleur: Rincer à l\'eau salée, appliquer glace, prendre ibuprofène 400mg si non contre-indiqué.';
    }
    if (lowerDetails.includes('bleeding') || lowerDetails.includes('saignement') || lowerDetails.includes('gums')) {
      advice += ' Pour saignement: Compresser avec gaze stérile, éviter aspirine.';
    }
    if (lowerDetails.includes('swelling') || lowerDetails.includes('gonflement')) {
      advice += ' Pour gonflement: Appliquer froid, surélever la tête.';
    }
    if (lowerDetails.includes('broken') || lowerDetails.includes('casse') || lowerDetails.includes('tooth')) {
      advice += ' Pour dent cassée: Rincer doucement avec de l\'eau, éviter de manger côté affecté, consulter rapidement.';
    }
    if (lowerDetails.includes('infection') || lowerDetails.includes('pus')) {
      advice += ' Pour infection: Appliquer une compresse chaude, éviter de percer, consulter immédiatement.';
    }
    if (lowerDetails.includes('sensitivity') || lowerDetails.includes('sensibilité')) {
      advice += ' Pour sensibilité: Éviter les aliments chauds/froids, utiliser un dentifrice désensibilisant, consulter si persistant.';
    }
    return advice;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: inputText, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    let botResponse = "Je réponds uniquement aux cas urgents. Cliquez sur un symptôme ou décrivez une situation d'urgence (ex. douleur, saignement) pour des conseils";
    if (inputText.toLowerCase().includes('urgence') || inputText.toLowerCase().includes('pain') || inputText.toLowerCase().includes('douleur') || 
        inputText.toLowerCase().includes('saignement') || inputText.toLowerCase().includes('bleeding') || 
        inputText.toLowerCase().includes('gonflement') || inputText.toLowerCase().includes('swelling') ||
        inputText.toLowerCase().includes('toothache') || inputText.toLowerCase().includes('broken') || 
        inputText.toLowerCase().includes('infection') || inputText.toLowerCase().includes('sensitivity')) {
      botResponse = handleUrgency(inputText);
    }

    setTimeout(() => {
      addMessage(botResponse, 'bot');
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSymptomClick = (symptom: string) => {
    setInputText(symptom);
    handleSendMessage();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'waiting': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'urgent': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'waiting': return 'En attente';
      case 'pending': return 'À confirmer';
      case 'urgent': return 'Urgence';
      default: return 'Non défini';
    }
  };

  return (
    <div className="min-h-screen p-8 space-y-8 relative">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <UserCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Bonjour Assistant(e)!</h2>
            <p className="text-teal-100">Gestion des rendez-vous et accueil patients</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Clock className="w-6 h-6 text-white mb-2" />
            <p className="text-white/80 text-sm">Prochain RDV</p>
            <p className="text-white font-semibold">
              {todayAppointments.length > 0 ? `${todayAppointments[0].patient} - ${todayAppointments[0].time}` : 'Aucun RDV'}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <AlertCircle className="w-6 h-6 text-white mb-2" />
            <p className="text-white/80 text-sm">À Confirmer</p>
            <p className="text-white font-semibold">
              {todayAppointments.filter((apt) => apt.status === 'pending').length.toString()} rendez-vous
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Phone className="w-6 h-6 text-white mb-2" />
            <p className="text-white/80 text-sm">Appels</p>
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

      {/* Today's Appointments */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Rendez-vous d'Aujourd'hui</h3>
          <button
            onClick={() => onNavigate('appointments')}
            className="text-teal-600 hover:text-teal-700 font-medium text-sm hover:underline"
          >
            Voir calendrier complet
          </button>
        </div>
        <div className="space-y-3">
          {todayAppointments.map((apt, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-lg">{apt.time}</p>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{apt.patient}</h4>
                  <p className="text-sm text-gray-600">{apt.type}</p>
                  <p className="text-xs text-gray-500">{apt.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(apt.status)}`}>
                  {getStatusText(apt.status)}
                </span>
                <div className="flex space-x-2">
                  <button className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ChatBot Panel (Fixed at Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

      {/* ChatBot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-1/3 h-[450px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">DentalAssist AI</h3>
                <p className="text-teal-100 text-sm">Support d'urgence</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.sender === 'user' ? 'bg-teal-600' : 'bg-gradient-to-r from-teal-500 to-teal-600'
                  }`}>
                    {message.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Brain className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-teal-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-bl-sm shadow-md border'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    {message.actionResult && <p className="text-sm text-green-600 mt-2">{message.actionResult}</p>}
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${
                        message.sender === 'user' ? 'text-teal-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {message.sender === 'bot' && (
                        <button
                          onClick={() => toggleSpeech(message.text)}
                          className={`text-gray-400 hover:text-teal-600 ${isSpeaking ? 'animate-pulse' : ''}`}
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-full">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-bl-sm shadow-md border">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                      <span className="text-sm text-gray-600">DentalAssist réfléchit...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ChatBot Input Section */}
          <div className="p-4 border-t border-gray-200 bg-white flex flex-col space-y-2">
            <div className="flex flex-wrap gap-2 mb-2">
              <button
                onClick={() => handleSymptomClick('urgence, douleur intense')}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
              >
                Douleur intense
              </button>
              <button
                onClick={() => handleSymptomClick('urgence, saignement des gencives')}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
              >
                Saignement gencives
              </button>
              <button
                onClick={() => handleSymptomClick('urgence, gonflement')}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
              >
                Gonflement
              </button>
              <button
                onClick={() => handleSymptomClick('urgence, dent cassée')}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
              >
                Dent cassée
              </button>
              <button
                onClick={() => handleSymptomClick('urgence, infection avec pus')}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
              >
                Infection
              </button>
              <button
                onClick={() => handleSymptomClick('urgence, sensibilité dentaire')}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
              >
                Sensibilité
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Décrivez une urgence (ex. douleur intense) ou utilisez la voix..."
                  className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                  rows={1}
                />
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`absolute right-12 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                    isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-teal-100 hover:text-teal-600'
                  }`}
                  disabled={!recognition}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200"
                aria-label="Envoyer message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            {isListening && (
              <div className="mt-2 flex items-center justify-center space-x-2 text-red-600">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-sm">Écoute en cours...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssistantDashboard;