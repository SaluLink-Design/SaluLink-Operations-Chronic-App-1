'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { authiService } from '@/lib/services/authiService';
import { SelectedTreatment } from '@/types';
import { Plus, Minus } from 'lucide-react';

export default function DiagnosticBasket() {
  const { currentCase, addDiagnosticTreatment, nextStep } = useAppStore();
  const condition = currentCase?.confirmedCondition;
  const treatmentBasket = condition ? authiService.getTreatmentBasket(condition) : null;
  
  const [selectedTreatments, setSelectedTreatments] = useState<Map<string, number>>(new Map());

  const toggleTreatment = (code: string) => {
    setSelectedTreatments((prev) => {
      const newMap = new Map(prev);
      if (newMap.has(code)) {
        newMap.delete(code);
      } else {
        newMap.set(code, 1);
      }
      return newMap;
    });
  };

  const updateCount = (code: string, delta: number) => {
    setSelectedTreatments((prev) => {
      const newMap = new Map(prev);
      const current = newMap.get(code) || 1;
      const newCount = Math.max(1, current + delta);
      newMap.set(code, newCount);
      return newMap;
    });
  };

  const handleContinue = () => {
    if (selectedTreatments.size === 0) {
      alert('Please select at least one diagnostic treatment');
      return;
    }

    // Add selected treatments to the case
    treatmentBasket?.diagnosticBasket.forEach((item) => {
      const timesPerformed = selectedTreatments.get(item.code);
      if (timesPerformed) {
        const treatment: SelectedTreatment = {
          ...item,
          timesPerformed,
          documentation: {
            images: [],
            notes: '',
          },
        };
        addDiagnosticTreatment(treatment);
      }
    });

    nextStep();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Diagnostic Basket</h1>
        <p className="text-gray-600">
          Select the diagnostic procedures performed for <strong>{condition}</strong>
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Diagnostic Tests</h2>
        
        {!treatmentBasket ? (
          <p className="text-gray-500">No treatment basket available for this condition.</p>
        ) : (
          <div className="space-y-3">
            {treatmentBasket.diagnosticBasket.map((item) => {
              const isSelected = selectedTreatments.has(item.code);
              const count = selectedTreatments.get(item.code) || 1;

              return (
                <div
                  key={item.code}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <button
                        onClick={() => toggleTreatment(item.code)}
                        className="text-left w-full"
                      >
                        <h3 className="font-medium text-gray-900">{item.description}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Code: <span className="font-mono">{item.code}</span> | 
                          Covered: {item.numberOfTests} test{item.numberOfTests !== 1 ? 's' : ''}
                        </p>
                      </button>

                      {isSelected && (
                        <div className="mt-3 flex items-center gap-3">
                          <span className="text-sm text-gray-700">Times performed:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCount(item.code, -1)}
                              className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-12 text-center font-medium">{count}</span>
                            <button
                              onClick={() => updateCount(item.code, 1)}
                              className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleTreatment(item.code)}
                      className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {selectedTreatments.size > 0 && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              Selected: {selectedTreatments.size} treatment{selectedTreatments.size !== 1 ? 's' : ''}
            </h3>
            <p className="text-sm text-blue-800">
              You will need to document each selected treatment in the next step.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleContinue}
          disabled={selectedTreatments.size === 0}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Continue to Documentation
        </button>
      </div>
    </div>
  );
}

