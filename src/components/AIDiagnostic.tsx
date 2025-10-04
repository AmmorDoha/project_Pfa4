import React, { useState, useRef, useEffect } from 'react';
import { 
  Brain, Upload, Image as ImageIcon, Mic, MicOff, 
  Eye, Zap, FileText, Camera, Loader, CheckCircle,
  AlertTriangle, X, Download
} from 'lucide-react';
import { UserRole } from '../App';

interface DiagnosticResult {
  id: string;
  confidence: number;
  diagnosis: string;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
}

interface AIAnalysis {
  id?: number;
  patient_name: string;
  image_url?: string;
  audio_transcript?: string;
  ai_diagnosis: string;
  confidence_score: number;
  recommendations: string;
  created_at?: string;
}

interface AIDiagnosticProps {
  userRole: UserRole;
}

const AIDiagnostic: React.FC<AIDiagnosticProps> = ({ userRole }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DiagnosticResult | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioTranscript, setAudioTranscript] = useState('');
  const [patientName, setPatientName] = useState('');
  const [recentAnalyses, setRecentAnalyses] = useState<AIAnalysis[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'fr-FR';

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setAudioTranscript(prev => prev + ' ' + finalTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }

    fetchRecentAnalyses();
  }, []);

  const fetchRecentAnalyses = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/ai-analyses');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('Fetched analyses:', data); // Log the response
      const validData = Array.isArray(data) ? data : [];
      setRecentAnalyses(validData);
    } catch (error) {
      console.error('Erreur lors du chargement des analyses:', error);
      setRecentAnalyses([]); // Reset to empty on error
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(true);
      setAudioTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const simulateAIAnalysis = (): DiagnosticResult => {
    const diagnoses = [
      {
        diagnosis: 'Carie dentaire profonde',
        confidence: 0.92,
        recommendations: [
          'Obturation composite recommandée',
          'Anesthésie locale nécessaire',
          'Contrôle dans 2 semaines'
        ],
        severity: 'medium' as const
      },
      {
        diagnosis: 'Gingivite modérée',
        confidence: 0.87,
        recommendations: [
          'Détartrage professionnel',
          'Amélioration de l\'hygiène bucco-dentaire',
          'Bain de bouche antiseptique'
        ],
        severity: 'low' as const
      },
      {
        diagnosis: 'Fracture coronaire',
        confidence: 0.95,
        recommendations: [
          'Reconstitution esthétique urgente',
          'Radiographie complémentaire',
          'Évaluation de la vitalité pulpaire'
        ],
        severity: 'high' as const
      }
    ];

    const randomDiagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];
    return {
      id: Date.now().toString(),
      ...randomDiagnosis
    };
  };

  const handleAnalyze = async () => {
    if (!patientName.trim()) {
      alert('Veuillez entrer le nom du patient');
      return;
    }

    if (!selectedImage && !audioTranscript.trim()) {
      alert('Veuillez ajouter une image ou un enregistrement vocal');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(async () => {
      const result = simulateAIAnalysis();
      setAnalysisResult(result);
      setIsAnalyzing(false);

      // Save analysis to database
      try {
        const analysisData = {
          patient_name: patientName,
          image_url: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
          audio_transcript: audioTranscript,
          ai_diagnosis: result.diagnosis,
          confidence_score: result.confidence,
          recommendations: result.recommendations.join('; ')
        };

        console.log('Sending analysis data:', analysisData); // Log the data being sent
        const response = await fetch('http://localhost:3001/api/ai-analyses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(analysisData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to save analysis: ${response.status} - ${errorText}`);
        }
        console.log('Save successful, refreshing analyses');
        fetchRecentAnalyses(); // Refresh history
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
      }
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'low': return 'Faible';
      case 'medium': return 'Modérée';
      case 'high': return 'Élevée';
      default: return 'Non définie';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Diagnostic Assisté par IA</h2>
              <p className="text-gray-600">Analyse intelligente d'images et de symptômes</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Historique
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Analysis Panel */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Nouvelle Analyse</h3>
          
          <div className="space-y-6">
            {/* Patient Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom du Patient *</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Nom et prénom du patient"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image Dentaire</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
              >
                {imagePreview ? (
                  <div className="space-y-3">
                    <img src={imagePreview} alt="Preview" className="max-h-32 mx-auto rounded-lg" />
                    <p className="text-sm text-gray-600">Cliquez pour changer l'image</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-gray-600">Cliquez pour ajouter une image</p>
                    <p className="text-xs text-gray-500">PNG, JPG jusqu'à 10MB</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Voice Recording */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description Vocale</label>
              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Décrivez les symptômes</span>
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`p-2 rounded-lg transition-colors ${
                      isRecording 
                        ? 'bg-red-100 text-red-600 animate-pulse' 
                        : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                </div>
                
                {audioTranscript && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">{audioTranscript}</p>
                  </div>
                )}
                
                {isRecording && (
                  <div className="flex items-center justify-center space-x-2 text-red-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-sm">Enregistrement en cours...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || (!selectedImage && !audioTranscript.trim()) || !patientName.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all"
            >
              {isAnalyzing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Analyse en cours...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Analyser avec l'IA</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Résultats de l'Analyse</h3>
          
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                <Brain className="w-8 h-8 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-gray-600 mt-4">L'IA analyse vos données...</p>
              <p className="text-sm text-gray-500 mt-2">Cela peut prendre quelques secondes</p>
            </div>
          ) : analysisResult ? (
            <div className="space-y-6">
              {/* Confidence Score */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Niveau de Confiance</span>
                  <span className="text-lg font-bold text-purple-600">
                    {Math.round(analysisResult.confidence * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${analysisResult.confidence * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Diagnosis */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-purple-600" />
                  Diagnostic Suggéré
                </h4>
                <div className={`border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg`}>
                  <p className="font-semibold text-purple-900">{analysisResult.diagnosis}</p>
                </div>
              </div>

              {/* Severity */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Niveau de Gravité</h4>
                <span className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium border ${getSeverityColor(analysisResult.severity)}`}>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Gravité {getSeverityText(analysisResult.severity)}
                </span>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Recommandations
                </h4>
                <div className="space-y-2">
                  {analysisResult.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-green-800 text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setAnalysisResult(null);
                    setSelectedImage(null);
                    setImagePreview(null);
                    setAudioTranscript('');
                    setPatientName('');
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Nouvelle Analyse
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Exporter</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Brain className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Prêt pour l'Analyse</h3>
              <p className="text-gray-500">Ajoutez une image ou décrivez les symptômes pour commencer</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Analyses History */}
      {showHistory && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Analyses Récentes</h3>
          
          {recentAnalyses.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Aucune analyse récente</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentAnalyses.map((analysis) => (
                <div key={analysis.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{analysis.patient_name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{analysis.ai_diagnosis}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Confiance: {Math.round(analysis.confidence_score * 100)}%</span>
                        {analysis.created_at && (
                          <span>{new Date(analysis.created_at).toLocaleDateString('fr-FR')}</span>
                        )}
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIDiagnostic;