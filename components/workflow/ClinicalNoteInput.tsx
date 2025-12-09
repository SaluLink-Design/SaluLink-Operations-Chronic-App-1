'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { authiService } from '@/lib/services/authiService';
import { Loader2 } from 'lucide-react';

export default function ClinicalNoteInput() {
  const { currentCase, setClinicalNote, setConditionMatches, nextStep } = useAppStore();
  const [note, setNote] = useState(currentCase?.clinicalNote || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!note.trim()) {
      alert('Please enter a clinical note');
      return;
    }

    setIsAnalyzing(true);
    setClinicalNote(note);

    try {
      const matches = await authiService.extractConditionsFromNote(note);
      setConditionMatches(matches);
      nextStep();
    } catch (error) {
      console.error('Error analyzing note:', error);
      alert('Failed to analyze note. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Clinical Note Input</h1>
        <p className="text-gray-600">
          Enter the patient's clinical note below. Authi 1.0 will analyze it to identify potential chronic conditions.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <label htmlFor="clinical-note" className="block text-sm font-medium text-gray-700 mb-2">
          Patient Notes:
        </label>
        <textarea
          id="clinical-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter clinical observations, symptoms, medical history, and relevant patient information..."
          className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        />

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !note.trim()}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Analyzing with Authi 1.0...</span>
              </>
            ) : (
              <span>Analyze Note</span>
            )}
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-2">About Authi 1.0</h3>
        <p className="text-sm text-blue-800">
          Authi 1.0 uses ClinicalBERT to analyze medical notes and identify chronic conditions from a predefined list. 
          It provides ICD-10 codes, treatment protocols, and medication recommendations based on authoritative datasets.
        </p>
      </div>
    </div>
  );
}

