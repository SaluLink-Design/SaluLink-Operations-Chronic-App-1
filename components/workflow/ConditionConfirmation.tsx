'use client';

import { useAppStore } from '@/lib/store';
import { CheckCircle } from 'lucide-react';

export default function ConditionConfirmation() {
  const { currentCase, confirmCondition, nextStep } = useAppStore();
  const matches = currentCase?.conditionMatches || [];

  const handleConfirm = (condition: string) => {
    confirmCondition(condition);
    nextStep();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Confirm Condition</h1>
        <p className="text-gray-600">
          Review the conditions identified by ClinicalBERT and select the correct diagnosis.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Identified Conditions</h2>
        
        {matches.length === 0 ? (
          <p className="text-gray-500">No conditions identified. Please review the clinical note.</p>
        ) : (
          <div className="space-y-3">
            {matches.map((match, index) => (
              <button
                key={index}
                onClick={() => handleConfirm(match.condition)}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-700">
                      {match.condition}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-gray-600">Confidence:</span>
                      <div className="flex-1 max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-500 rounded-full"
                          style={{ width: `${match.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {(match.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <CheckCircle size={24} className="text-gray-300 group-hover:text-primary-500" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-900 mb-2">Important</h3>
        <p className="text-sm text-yellow-800">
          Please verify the condition matches the clinical presentation. Once confirmed, Authi 1.0 will 
          provide ICD-10 codes and treatment protocols specific to this condition.
        </p>
      </div>
    </div>
  );
}

