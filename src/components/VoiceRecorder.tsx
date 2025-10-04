import React, { useState, useRef } from 'react';
import { Mic, MicOff, Play, Pause, Square, Trash2 } from 'lucide-react';

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
  placeholder?: string;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTranscription, placeholder = "Cliquez pour enregistrer" }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcription, setTranscription] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  React.useEffect(() => {
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
          setTranscription(prev => prev + finalTranscript);
          onTranscription(transcription + finalTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsTranscribing(false);
      };

      recognition.onend = () => {
        setIsTranscribing(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [transcription, onTranscription]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);

      // Start speech recognition
      if (recognitionRef.current) {
        setIsTranscribing(true);
        recognitionRef.current.start();
      }
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    if (recognitionRef.current && isTranscribing) {
      recognitionRef.current.stop();
      setIsTranscribing(false);
    }
  };

  const playAudio = () => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setTranscription('');
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Enregistrement Vocal</h4>
        {isTranscribing && (
          <div className="flex items-center space-x-2 text-blue-600">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="text-sm">Transcription en cours...</span>
          </div>
        )}
      </div>

      {/* Recording Controls */}
      <div className="flex items-center justify-center space-x-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full transition-colors shadow-lg"
          >
            <Mic className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="bg-red-600 text-white p-4 rounded-full animate-pulse shadow-lg"
          >
            <Square className="w-6 h-6" />
          </button>
        )}

        {audioUrl && (
          <>
            <button
              onClick={isPlaying ? pauseAudio : playAudio}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={deleteRecording}
              className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Audio Element */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      )}

      {/* Transcription */}
      {transcription && (
        <div className="bg-gray-50 rounded-lg p-3">
          <h5 className="font-medium text-gray-900 mb-2">Transcription:</h5>
          <p className="text-gray-700 text-sm leading-relaxed">{transcription}</p>
        </div>
      )}

      {/* Status */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          {isRecording 
            ? "Enregistrement en cours... Cliquez sur ⏹ pour arrêter"
            : audioUrl 
              ? "Enregistrement terminé. Vous pouvez l'écouter ou le supprimer."
              : placeholder
          }
        </p>
      </div>
    </div>
  );
};

export default VoiceRecorder;