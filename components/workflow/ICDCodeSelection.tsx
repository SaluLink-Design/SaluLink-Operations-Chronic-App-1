'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { authiService } from '@/lib/services/authiService';
import { ICDCode } from '@/types';
import { Check } from 'lucide-react';

export default function ICDCodeSelection() {
  const { currentCase, selectICDCodes, nextStep } = useAppStore();
  const [selectedCodes, setSelectedCodes] = useState<ICDCode[]>(
    currentCase?.selectedICDCodes || []
  );

  const condition = currentCase?.confirmedCondition;
  const availableCodes = condition ? authiService.getICDCodesForCondition(condition) : [];

  const toggleCode = (code: ICDCode) => {
    setSelectedCodes((prev) => {
      const exists = prev.find((c) => c.code === code.code);
      if (exists) {
        return prev.filter((c) => c.code !== code.code);
      }
      return [...prev, code];
    });
  };

  const isSelected = (code: ICDCode) => {
    return selectedCodes.some((c) => c.code === code.code);
  };

  const handleContinue = () => {
    if (selectedCodes.length === 0) {
      if (!confirm('No ICD codes selected. Continue anyway?')) {
        return;
      }
    }
    selectICDCodes(selectedCodes);
    nextStep();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ICD-10 Code Selection</h1>
        <p className="text-gray-600">
          Select the ICD-10 codes that apply to this diagnosis: <strong>{condition}</strong>
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available ICD-10 Codes</h2>
        
        <div className="space-y-2">
          {availableCodes.map((code) => (
            <button
              key={code.code}
              onClick={() => toggleCode(code)}
              className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                isSelected(code)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-semibold text-primary-700">
                      {code.code}
                    </span>
                    <span className="text-gray-900">{code.description}</span>
                  </div>
                </div>
                {isSelected(code) && (
                  <Check size={20} className="text-primary-600 flex-shrink-0 mt-1" />
                )}
              </div>
            </button>
          ))}
        </div>

        {selectedCodes.length > 0 && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-sm font-medium text-green-900 mb-2">
              Selected: {selectedCodes.length} code{selectedCodes.length !== 1 ? 's' : ''}
            </h3>
            <div className="text-sm text-green-800">
              {selectedCodes.map((code) => code.code).join(', ')}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setSelectedCodes([])}
          className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
        >
          Clear Selection
        </button>
        <button
          onClick={handleContinue}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          Continue to Diagnostic Basket
        </button>
      </div>
    </div>
  );
}

