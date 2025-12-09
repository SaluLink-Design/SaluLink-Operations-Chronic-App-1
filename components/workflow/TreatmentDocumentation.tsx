'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Upload, FileText } from 'lucide-react';

export default function TreatmentDocumentation() {
  const { currentCase, updateDiagnosticTreatment, nextStep } = useAppStore();
  const treatments = currentCase?.diagnosticTreatments || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notes, setNotes] = useState<string[]>(treatments.map(t => t.documentation.notes));

  const currentTreatment = treatments[currentIndex];

  const handleNotesChange = (value: string) => {
    const newNotes = [...notes];
    newNotes[currentIndex] = value;
    setNotes(newNotes);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const updated = {
        ...currentTreatment,
        documentation: {
          ...currentTreatment.documentation,
          images: [...currentTreatment.documentation.images, ...files],
        },
      };
      updateDiagnosticTreatment(currentIndex, updated);
    }
  };

  const handleNext = () => {
    // Save current notes
    const updated = {
      ...currentTreatment,
      documentation: {
        ...currentTreatment.documentation,
        notes: notes[currentIndex],
      },
    };
    updateDiagnosticTreatment(currentIndex, updated);

    if (currentIndex < treatments.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All documented, move to next step
      nextStep();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!currentTreatment) {
    return (
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-500">No treatments to document.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Treatment Documentation</h1>
        <p className="text-gray-600">
          Document the diagnostic treatment ({currentIndex + 1} of {treatments.length})
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900">{currentTreatment.description}</h2>
          <p className="text-sm text-gray-600 mt-1">
            Code: <span className="font-mono">{currentTreatment.code}</span> | 
            Performed: {currentTreatment.timesPerformed}x
          </p>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Images (Lab results, scans, reports)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
            <Upload size={48} className="mx-auto text-gray-400 mb-4" />
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-primary-600 hover:text-primary-700 font-medium">
                Click to upload
              </span>
              <span className="text-gray-600"> or drag and drop</span>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500 mt-2">PNG, JPG, PDF up to 10MB</p>
          </div>
          
          {currentTreatment.documentation.images.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {currentTreatment.documentation.images.map((file, idx) => (
                <div key={idx} className="px-3 py-2 bg-green-50 border border-green-200 rounded text-sm text-green-800 flex items-center gap-2">
                  <FileText size={16} />
                  <span>{file.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clinical Notes */}
        <div>
          <label htmlFor="clinical-findings" className="block text-sm font-medium text-gray-700 mb-2">
            Clinical Findings / Interpretation
          </label>
          <textarea
            id="clinical-findings"
            value={notes[currentIndex] || ''}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Enter clinical findings, interpretations, or relevant observations..."
            className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          {currentIndex < treatments.length - 1 ? 'Next Treatment' : 'Continue to Medication'}
        </button>
      </div>
    </div>
  );
}

