'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import Sidebar from '@/components/Sidebar';
import ClinicalNoteInput from '@/components/workflow/ClinicalNoteInput';
import ConditionConfirmation from '@/components/workflow/ConditionConfirmation';
import ICDCodeSelection from '@/components/workflow/ICDCodeSelection';
import DiagnosticBasket from '@/components/workflow/DiagnosticBasket';
import TreatmentDocumentation from '@/components/workflow/TreatmentDocumentation';
import MedicationSelection from '@/components/workflow/MedicationSelection';
import ClaimSummary from '@/components/workflow/ClaimSummary';
import { Plus } from 'lucide-react';

export default function Home() {
  const { currentCase, currentStep, createNewCase, loadAllCases } = useAppStore();

  useEffect(() => {
    loadAllCases();

    if (!currentCase) {
      createNewCase();
    }
  }, []);

  const renderWorkflowStep = () => {
    switch (currentStep) {
      case 'clinical-note':
        return <ClinicalNoteInput />;
      case 'analyze-note':
      case 'confirm-condition':
        return <ConditionConfirmation />;
      case 'select-icd':
        return <ICDCodeSelection />;
      case 'diagnostic-basket':
        return <DiagnosticBasket />;
      case 'document-diagnostic':
        return <TreatmentDocumentation />;
      case 'select-medication':
      case 'medication-note':
        return <MedicationSelection />;
      case 'claim-summary':
        return <ClaimSummary />;
      default:
        return <ClinicalNoteInput />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SaluLink Chronic Treatment App</h1>
              <p className="text-sm text-gray-600 mt-1">
                Powered by Authi 1.0 - ClinicalBERT Integration
              </p>
            </div>
            <button
              onClick={createNewCase}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              <span>New Case</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {renderWorkflowStep()}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 px-8 py-4 mt-8">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>© 2024 SaluLink. All rights reserved.</p>
            <p>
              Current Step: <span className="font-medium text-gray-900">{currentStep}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

