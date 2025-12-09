'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { authiService } from '@/lib/services/authiService';
import { getMedicationsByConditionAndPlan } from '@/lib/data/medications';
import { MedicalPlan, SelectedMedication } from '@/types';
import { Check, Filter } from 'lucide-react';

export default function MedicationSelection() {
  const { currentCase, selectPlan, addMedication, nextStep } = useAppStore();
  const condition = currentCase?.confirmedCondition;
  const [selectedPlan, setSelectedPlan] = useState<MedicalPlan | null>(currentCase?.selectedPlan || null);
  const [selectedMeds, setSelectedMeds] = useState<Set<string>>(new Set());
  const [registrationNotes, setRegistrationNotes] = useState<Map<string, string>>(new Map());

  const allMedications = condition ? authiService.getMedications(condition) : [];
  const filteredMedications = selectedPlan && condition
    ? getMedicationsByConditionAndPlan(condition, selectedPlan)
    : allMedications;

  const plans: MedicalPlan[] = ['Core', 'Priority', 'Saver', 'Executive', 'Comprehensive'];

  const toggleMedication = (medName: string) => {
    setSelectedMeds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(medName)) {
        newSet.delete(medName);
        setRegistrationNotes((notes) => {
          const newNotes = new Map(notes);
          newNotes.delete(medName);
          return newNotes;
        });
      } else {
        newSet.add(medName);
      }
      return newSet;
    });
  };

  const updateNote = (medName: string, note: string) => {
    setRegistrationNotes((prev) => {
      const newMap = new Map(prev);
      newMap.set(medName, note);
      return newMap;
    });
  };

  const handlePlanSelect = (plan: MedicalPlan) => {
    setSelectedPlan(plan);
    selectPlan(plan);
  };

  const handleContinue = () => {
    if (selectedMeds.size === 0) {
      alert('Please select at least one medication');
      return;
    }

    // Check all selected medications have registration notes
    const missingNotes = Array.from(selectedMeds).filter(
      (medName) => !registrationNotes.get(medName)?.trim()
    );

    if (missingNotes.length > 0) {
      alert('Please provide registration notes for all selected medications');
      return;
    }

    // Add medications to case
    filteredMedications.forEach((med) => {
      if (selectedMeds.has(med.medicineNameAndStrength)) {
        const selectedMed: SelectedMedication = {
          ...med,
          registrationNote: registrationNotes.get(med.medicineNameAndStrength) || '',
        };
        addMedication(selectedMed);
      }
    });

    nextStep();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Medication Selection</h1>
        <p className="text-gray-600">
          Select chronic medications for <strong>{condition}</strong>
        </p>
      </div>

      {/* Plan Filter */}
      <div className="mb-6 bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Medical Scheme Plan</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {plans.map((plan) => (
            <button
              key={plan}
              onClick={() => handlePlanSelect(plan)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedPlan === plan
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {plan}
            </button>
          ))}
        </div>
      </div>

      {/* Medication List */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Medications</h2>
        
        <div className="space-y-4">
          {filteredMedications.map((med, index) => {
            const isSelected = selectedMeds.has(med.medicineNameAndStrength);
            const cda = selectedPlan === 'Executive' || selectedPlan === 'Comprehensive'
              ? med.cdaExecutiveComprehensive
              : med.cdaCorePrioritySaver;

            return (
              <div
                key={index}
                className={`p-4 border-2 rounded-lg transition-all ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <button
                      onClick={() => toggleMedication(med.medicineNameAndStrength)}
                      className="text-left w-full"
                    >
                      <h3 className="font-medium text-gray-900">{med.medicineNameAndStrength}</h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Class:</span> {med.medicineClass}</p>
                        <p><span className="font-medium">Active Ingredient:</span> {med.activeIngredient}</p>
                        <p><span className="font-medium">CDA:</span> {cda}</p>
                      </div>
                    </button>

                    {isSelected && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Registration Note (Required)
                        </label>
                        <textarea
                          value={registrationNotes.get(med.medicineNameAndStrength) || ''}
                          onChange={(e) => updateNote(med.medicineNameAndStrength, e.target.value)}
                          placeholder="Reason for registering patient on this chronic medication..."
                          className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-sm"
                        />
                      </div>
                    )}
                  </div>

                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleMedication(med.medicineNameAndStrength)}
                    className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {selectedMeds.size > 0 && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-sm font-medium text-green-900 mb-2">
              Selected: {selectedMeds.size} medication{selectedMeds.size !== 1 ? 's' : ''}
            </h3>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleContinue}
          disabled={selectedMeds.size === 0}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Generate Claim Summary
        </button>
      </div>
    </div>
  );
}

