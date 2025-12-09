'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { authiService } from '@/lib/services/authiService';
import { SelectedTreatment } from '@/types';
import { Plus, Minus, Save } from 'lucide-react';

export default function OngoingManagement() {
  const { currentCase, addOngoingTreatment, saveCase } = useAppStore();
  const condition = currentCase?.confirmedCondition;
  const treatmentBasket = condition ? authiService.getTreatmentBasket(condition) : null;
  
  const [selectedTreatments, setSelectedTreatments] = useState<Map<string, number>>(new Map());
  const [documentation, setDocumentation] = useState<Map<string, { notes: string; images: File[] }>>(new Map());

  const toggleTreatment = (code: string) => {
    setSelectedTreatments((prev) => {
      const newMap = new Map(prev);
      if (newMap.has(code)) {
        newMap.delete(code);
        setDocumentation((docs) => {
          const newDocs = new Map(docs);
          newDocs.delete(code);
          return newDocs;
        });
      } else {
        newMap.set(code, 1);
        setDocumentation((docs) => {
          const newDocs = new Map(docs);
          newDocs.set(code, { notes: '', images: [] });
          return newDocs;
        });
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

  const updateNotes = (code: string, notes: string) => {
    setDocumentation((prev) => {
      const newMap = new Map(prev);
      const current = newMap.get(code) || { notes: '', images: [] };
      newMap.set(code, { ...current, notes });
      return newMap;
    });
  };

  const handleSave = () => {
    if (selectedTreatments.size === 0) {
      alert('Please select at least one ongoing management treatment');
      return;
    }

    // Add selected treatments to the case
    treatmentBasket?.ongoingManagementBasket.forEach((item) => {
      const timesPerformed = selectedTreatments.get(item.code);
      if (timesPerformed) {
        const docs = documentation.get(item.code) || { notes: '', images: [] };
        const treatment: SelectedTreatment = {
          ...item,
          timesPerformed,
          documentation: docs,
        };
        addOngoingTreatment(treatment);
      }
    });

    saveCase();
    alert('Ongoing management saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ongoing Management</h1>
        <p className="text-gray-600">
          Document follow-up treatments for <strong>{condition}</strong>
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ongoing Management Basket</h2>
        
        {!treatmentBasket ? (
          <p className="text-gray-500">No treatment basket available for this condition.</p>
        ) : (
          <div className="space-y-4">
            {treatmentBasket.ongoingManagementBasket.map((item) => {
              const isSelected = selectedTreatments.has(item.code);
              const count = selectedTreatments.get(item.code) || 1;
              const docs = documentation.get(item.code) || { notes: '', images: [] };

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
                        <>
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

                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Clinical Notes
                            </label>
                            <textarea
                              value={docs.notes}
                              onChange={(e) => updateNotes(item.code, e.target.value)}
                              placeholder="Enter clinical findings or observations..."
                              className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-sm"
                            />
                          </div>
                        </>
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
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={selectedTreatments.size === 0}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <Save size={20} />
          <span>Save Ongoing Management</span>
        </button>
      </div>
    </div>
  );
}

