'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { caseService } from '@/lib/supabase/caseService';
import { Save, ArrowLeft, Upload } from 'lucide-react';

export default function ReferralForm() {
  const { currentCase, setStep } = useAppStore();
  const [referralReason, setReferralReason] = useState('');
  const [referralNotes, setReferralNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!referralReason.trim()) {
      alert('Please provide a reason for referral');
      return;
    }

    if (!currentCase) {
      alert('No case selected');
      return;
    }

    setIsSaving(true);
    try {
      await caseService.createReferral(
        currentCase.id,
        referralReason,
        referralNotes || null
      );

      alert('Referral created successfully!');
      setReferralReason('');
      setReferralNotes('');
      setStep('claim-summary');
    } catch (error) {
      console.error('Failed to create referral:', error);
      alert('Failed to create referral. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    const referralSummary = `
REFERRAL SUMMARY
Generated: ${new Date().toLocaleString()}

PATIENT CASE: ${currentCase?.confirmedCondition || 'N/A'}
Case ID: ${currentCase?.id}

REASON FOR REFERRAL:
${referralReason}

ADDITIONAL NOTES:
${referralNotes || 'None'}

REFERRING SPECIALIST:
[Doctor Name]
Date: ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([referralSummary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `referral-${currentCase?.id}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => setStep('claim-summary')}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Claim Summary</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Referral</h1>
        <p className="text-gray-600">
          Create a referral for patient with <strong>{currentCase?.confirmedCondition}</strong>
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Referral <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={referralReason}
            onChange={(e) => setReferralReason(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter the primary reason for this referral"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            value={referralNotes}
            onChange={(e) => setReferralNotes(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={6}
            placeholder="Enter any additional clinical information, patient history, or specific concerns for the specialist..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supporting Documentation
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="text-sm text-gray-600 mb-2">
              Upload lab results, imaging reports, or other supporting documents
            </p>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
              Choose Files
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSave}
          disabled={isSaving || !referralReason.trim()}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <Save size={20} />
          <span>{isSaving ? 'Saving...' : 'Save Referral'}</span>
        </button>
        <button
          onClick={handleExport}
          disabled={!referralReason.trim()}
          className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Export Referral
        </button>
      </div>
    </div>
  );
}
