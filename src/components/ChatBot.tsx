import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, X, Send, Mic, MicOff, Volume2, 
  Bot, User, Loader, Brain, Stethoscope, Calendar, FileText, Image, AlertTriangle 
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isAudio?: boolean;
  actionResult?: string;
}

interface Appointment {
  id?: number;
  patient_id: number;
  date_rdv: string;
  heure_rdv: string;
  type_consultation: string;
}

interface Patient {
  id: number;
  nom: string;
  prenom: string;
}

interface Prescription {
  id?: number;
  patient_id: number;
  medication: string;
  dosage: string;
  instructions: string;
}

interface ChatBotProps {
  userRole: 'doctor' | 'assistant';
}

const ChatBot: React.FC<ChatBotProps> = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Bonjour! Je suis DentalAssist AI, votre assistant IA dédié au cabinet dentaire. En tant que ${userRole === 'doctor' ? 'docteur' : 'assistant(e)'}, comment puis-je vous soutenir aujourd'hui?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'fr-FR';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = () => setIsListening(false);
      recognitionInstance.onend = () => setIsListening(false);

      setRecognition(recognitionInstance);
    }
  }, []);

  useEffect(() => scrollToBottom(), [messages]);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  const startListening = () => recognition && (setIsListening(true), recognition.start());
  const stopListening = () => recognition && (recognition.stop(), setIsListening(false));

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const addMessage = (text: string, sender: 'user' | 'bot', actionResult?: string) => {
    const newMessage: Message = { id: Date.now().toString(), text, sender, timestamp: new Date(), actionResult };
    setMessages(prev => [...prev, newMessage]);
    if (sender === 'bot') speakText(text);
  };

  const handleAppointment = async (details: string): Promise<string> => {
    setIsLoading(true);
    try {
      const parts = details.split(',').map(s => s.trim());
      const [patientName = '', date = '', time = '', type = ''] = parts; // Default empty strings
      if (!patientName) throw new Error('Nom du patient manquant');

      const patientResponse = await fetch(`http://localhost:3001/api/patients?name=${encodeURIComponent(patientName)}`);
      const patients = await patientResponse.json();
      const patient = Array.isArray(patients) ? patients[0] : patients;
      if (!patient || !patient.id) throw new Error('Patient non trouvé');

      const appointment: Appointment = {
        patient_id: patient.id,
        date_rdv: date || new Date().toISOString().split('T')[0],
        heure_rdv: time || '14:00',
        type_consultation: type || 'Consultation'
      };

      const response = await fetch('http://localhost:3001/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment)
      });

      if (response.ok) {
        const result = await response.json();
        return `Rendez-vous ajouté avec succès pour ${patientName} le ${date || appointment.date_rdv} à ${time || appointment.heure_rdv}. ID: ${result.id || 'N/A'}`;
      }
    } catch (error) {
      return `Erreur lors de l'ajout du rendez-vous: ${(error as Error).message}`;
    } finally {
      setIsLoading(false);
    }
    return 'Erreur inconnue'; // Fallback
  };

  const updatePatientDossier = async (details: string): Promise<string> => {
    setIsLoading(true);
    try {
      const parts = details.split(',').map(s => s.trim());
      const [patientName = '', notes = ''] = parts; // Default empty strings
      if (!patientName) throw new Error('Nom du patient manquant');

      const patientResponse = await fetch(`http://localhost:3001/api/patients?name=${encodeURIComponent(patientName)}`);
      const patients = await patientResponse.json();
      const patient = Array.isArray(patients) ? patients[0] : patients;
      if (!patient || !patient.id) throw new Error('Patient non trouvé');

      const response = await fetch(`http://localhost:3001/api/patients/${patient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...patient, notes: notes || 'Mise à jour sans notes' })
      });

      if (response.ok) return `Dossier mis à jour pour ${patientName} avec les notes: ${notes || 'Aucune note ajoutée'}`;
      throw new Error('Échec de la mise à jour');
    } catch (error) {
      return `Erreur lors de la mise à jour du dossier: ${(error as Error).message}`;
    } finally {
      setIsLoading(false);
    }
    return 'Erreur inconnue'; // Fallback
  };

  const generatePrescription = async (details: string): Promise<string> => {
    setIsLoading(true);
    try {
      const parts = details.split(',').map(s => s.trim());
      const [patientName = '', medication = '', dosage = '', instructions = ''] = parts; // Default empty strings
      if (!patientName) throw new Error('Nom du patient manquant');

      const patientResponse = await fetch(`http://localhost:3001/api/patients?name=${encodeURIComponent(patientName)}`);
      const patients = await patientResponse.json();
      const patient = Array.isArray(patients) ? patients[0] : patients;
      if (!patient || !patient.id) throw new Error('Patient non trouvé');

      const prescription: Prescription = {
        patient_id: patient.id,
        medication: medication || 'Médicament non spécifié',
        dosage: dosage || 'Dosage non spécifié',
        instructions: instructions || 'Instructions non spécifiées'
      };

      const response = await fetch('http://localhost:3001/api/prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prescription)
      });

      if (response.ok) {
        const result = await response.json();
        return `Ordonnance générée pour ${patientName}: ${prescription.medication} (${prescription.dosage}), ${prescription.instructions}. ID: ${result.id || 'N/A'}`;
      }
    } catch (error) {
      return `Erreur lors de la génération de l'ordonnance: ${(error as Error).message}`;
    } finally {
      setIsLoading(false);
    }
    return 'Erreur inconnue'; // Fallback
  };

  const analyzeImage = async (): Promise<string> => {
    setIsLoading(true);
    if (!selectedImage) return "Veuillez uploader une image radiologique ou dentaire.";
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('http://localhost:3001/api/analyze-image', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        let suggestion = 'Analyse générale.';
        if (result.analysis?.includes('tartar') || result.analysis?.includes('plaque')) {
          suggestion = 'Recommandation: Détartrage pour enlever le tartre.';
        } else if (result.analysis?.includes('stain') || result.analysis?.includes('yellow')) {
          suggestion = 'Recommandation: Blanchiment dentaire pour améliorer l\'esthétique.';
        } else if (result.analysis?.includes('cavity') || result.analysis?.includes('carie')) {
          suggestion = 'Recommandation: Soins pour carie, possible obturation.';
        } else if (result.analysis?.includes('gum') || result.analysis?.includes('gingivitis')) {
          suggestion = 'Recommandation: Traitement parodontal pour inflammation des gencives.';
        }
        return `Analyse de l'image: ${result.analysis || 'Aucune anomalie détectée.'} ${suggestion}`;
      }
    } catch (error) {
      return `Erreur lors de l'analyse de l'image: ${(error as Error).message}`;
    } finally {
      setIsLoading(false);
      setSelectedImage(null);
    }
    return 'Erreur inconnue'; // Fallback
  };

  const handleUrgency = (details: string): string => {
    const lowerDetails = details.toLowerCase();
    let advice = 'Protocole urgence général: Évaluez la douleur, vérifiez abcès.';
    if (lowerDetails.includes('pain') || lowerDetails.includes('douleur')) {
      advice += ' Conseils pour réduire la douleur: Rincer à l\'eau salée, appliquer glace, prendre ibuprofène 400mg si non contre-indiqué.';
    }
    if (lowerDetails.includes('bleeding') || lowerDetails.includes('saignement')) {
      advice += ' Pour saignement: Compresser avec gaze stérile, éviter aspirine.';
    }
    if (lowerDetails.includes('swelling') || lowerDetails.includes('gonflement')) {
      advice += ' Pour gonflement: Appliquer froid, surélever la tête, consulter rapidement.';
    }
    return advice + ' Contactez le docteur si persiste.';
  };

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase();

    if (userRole === 'assistant' && (message.includes('urgence') || message.includes('pain') || message.includes('douleur'))) {
      return handleUrgency(userMessage);
    }

    if (userRole === 'doctor') {
      if (message.includes('diagnostic') || message.includes('symptômes')) {
        return "Décrivez les symptômes (ex. douleur, localisation) pour une suggestion de diagnostic.";
      }
      if (message.includes('traitement') || message.includes('plan')) {
        return "Indiquez la pathologie et les besoins (ex. carie, patient_id) pour un plan de traitement.";
      }
      if (message.includes('ordonnance') || message.includes('prescription')) {
        return "Entrez: patient_nom, médicament, dosage, instructions (ex. Dupont, Amoxicilline, 500mg, 3x/jour) pour générer une ordonnance.";
      }
      if (message.includes('radio') || message.includes('image') || message.includes('teeth') || message.includes('dents')) {
        return "Uploader une image des dents pour analyse et suggestions de soins (détartrage, blanchiment, etc.).";
      }
    } else {
      if (message.includes('rendez-vous') || message.includes('rdv')) {
        return "Entrez: patient_nom, date, heure, type (ex. Dupont, 2025-08-28, 14:00, Consultation) pour ajouter un RDV.";
      }
      if (message.includes('patient') || message.includes('dossier')) {
        return "Entrez: patient_nom, notes (ex. Dupont, Visite annuelle) pour mettre à jour le dossier.";
      }
      if (message.includes('facturation') || message.includes('paiement')) {
        return "Fonction de facturation en cours de développement. Souhaitez-vous un modèle de devis?";
      }
    }

    if (message.includes('bonjour') || message.includes('salut')) {
      return `Bonjour! En tant que ${userRole === 'doctor' ? 'docteur' : 'assistant(e)'}, je suis ici pour vous aider. Que souhaitez-vous faire?`;
    }

    if (message.includes('aide') || message.includes('help')) {
      const doctorHelp = "Je peux: diagnostiquer, planifier traitements, générer ordonnances, analyser images de dents avec suggestions.";
      const assistantHelp = "Je peux: gérer RDV, mettre à jour dossiers, assister en urgence pour soulager le patient.";
      return userRole === 'doctor' ? doctorHelp : assistantHelp;
    }

    if (message.includes('urgence')) {
      return handleUrgency(userMessage);
    }

    if (message.includes('hygiène') || message.includes('prévention')) {
      return "Conseils: brossage 2x/jour, fil dentaire, visite semestrielle.";
    }

    return "Précisez votre besoin: diagnostic, RDV, dossier, ou ordonnance.";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() && !selectedImage) return;

    const userMessage: Message = { id: Date.now().toString(), text: inputText, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    let botResponse = await generateBotResponse(inputText);
    let actionResult = '';

    if (userRole === 'doctor') {
      if (inputText.toLowerCase().includes('ordonnance') && inputText.includes(',')) {
        actionResult = await generatePrescription(inputText);
      } else if (selectedImage) {
        actionResult = await analyzeImage();
      }
    } else {
      if (inputText.toLowerCase().includes('rendez-vous') && inputText.includes(',')) {
        actionResult = await handleAppointment(inputText);
      } else if (inputText.toLowerCase().includes('dossier') && inputText.includes(',')) {
        actionResult = await updatePatientDossier(inputText);
      }
    }

    setTimeout(() => {
      addMessage(botResponse, 'bot', actionResult || undefined);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setSelectedImage(e.target.files[0]);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">DentalAssist AI</h3>
                <p className="text-blue-100 text-sm">Assistant pour urgences et analyses</p>
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
                    message.sender === 'user' ? 'bg-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'
                  }`}>
                    {message.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Brain className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`p-3 rounded-2xl ${
                    message.sender === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white text-gray-800 rounded-bl-sm shadow-md border'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    {message.actionResult && <p className="text-sm text-green-600 mt-2">{message.actionResult}</p>}
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {message.sender === 'bot' && (
                        <button onClick={() => speakText(message.text)} className="text-gray-400 hover:text-blue-600">
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
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-full">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-bl-sm shadow-md border">
                    <div className="flex items-center space-x-2">
                      <Loader className="w-4 h-4 animate-spin text-blue-600" />
                      <span className="text-sm text-gray-600">DentalAssist réfléchit...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Posez une question en tant que ${userRole === 'doctor' ? 'docteur (ex. analyse image dents)' : 'assistant(e) (ex. urgence douleur)'}, ou utilisez la voix...`}
                  className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={1}
                />
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`absolute right-12 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                    isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                  }`}
                  disabled={!recognition}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute right-20 top-1/2 transform -translate-y-1/2 hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="absolute right-24 top-1/2 transform -translate-y-1/2 p-1 bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 rounded-full cursor-pointer">
                  <Image className="w-4 h-4" />
                </label>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() && !selectedImage || isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200"
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
    </>
  );
};

export default ChatBot;