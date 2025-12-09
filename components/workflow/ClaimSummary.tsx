'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { authiService } from '@/lib/services/authiService';
import { caseService } from '@/lib/supabase/caseService';
import { Download, Save, FileText } from 'lucide-react';

export default function ClaimSummary() {
  const { currentCase, saveCase, updateCase } = useAppStore();
  const [showReferral, setShowReferral] = useState(false);
  const [referralReason, setReferralReason] = useState('');
  const [referralNotes, setReferralNotes] = useState('');

  if (!currentCase) {
    return <div>No case data available</div>;
  }

  const handleSave = async () => {
    updateCase({ status: 'completed' });
    await saveCase();
    alert('Case saved successfully!');
  };

  const handleExport = () => {
    const summary = authiService.generateClaimSummary(currentCase);
    
    // Create a blob and download
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `claim-${currentCase.id}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Claim Summary</h1>
        <p className="text-gray-600">
          Review the complete chronic treatment claim before saving or exporting
        </p>
      </div>

      <div className="space-y-6">
        {/* Clinical Note */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FileText size={20} />
            Clinical Note
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap">{currentCase.clinicalNote}</p>
        </div>

        {/* Confirmed Condition */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Confirmed Condition</h2>
          <p className="text-xl font-medium text-primary-700">{currentCase.confirmedCondition}</p>
        </div>

        {/* ICD-10 Codes */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">ICD-10 Codes</h2>
          <div className="space-y-2">
            {currentCase.selectedICDCodes.map((icd, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                <span className="font-mono font-semibold text-primary-700">{icd.code}</span>
                <span className="text-gray-700">{icd.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Treatments */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Diagnostic Treatments</h2>
          <div className="space-y-4">
            {currentCase.diagnosticTreatments.map((treatment, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900">{treatment.description}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Code: <span className="font-mono">{treatment.code}</span> | 
                  Performed: {treatment.timesPerformed}x
                </p>
                {treatment.documentation.notes && (
                  <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-1">Documentation:</p>
                    <p className="text-sm text-gray-600">{treatment.documentation.notes}</p>
                  </div>
                )}
                {treatment.documentation.images.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      {treatment.documentation.images.length} image(s) attached
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Medications */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Medications</h2>
          <div className="space-y-4">
            {currentCase.selectedMedications.map((med, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900">{med.medicineNameAndStrength}</h3>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Class:</span> {med.medicineClass}</p>
                  <p><span className="font-medium">Active Ingredient:</span> {med.activeIngredient}</p>
                  <p><span className="font-medium">CDA:</span> {med.cdaCorePrioritySaver}</p>
                </div>
                {med.registrationNote && (
                  <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-1">Registration Note:</p>
                    <p className="text-sm text-gray-600">{med.registrationNote}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={handleSave}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Save size={20} />
          <span>Save Case</span>
        </button>
        <button
          onClick={handleExport}
          className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
        >
          <Download size={20} />
          <span>Export as PDF</span>
        </button>
      </div>
    </div>
  );
}

