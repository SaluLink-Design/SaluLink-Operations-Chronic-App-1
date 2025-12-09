'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { authiService } from '@/lib/services/authiService';
import { followUpService } from '@/lib/supabase/followUpService';
import { FollowUpTreatment, FollowUpImage } from '@/types';
import { Plus, Minus, Save, ArrowLeft, Upload, X, Eye } from 'lucide-react';

interface FollowUpVisitFormProps {
  onBack?: () => void;
  onComplete?: () => void;
}

export default function FollowUpVisitForm({ onBack, onComplete }: FollowUpVisitFormProps) {
  const { currentCase } = useAppStore();
  const condition = currentCase?.confirmedCondition;
  const treatmentBasket = condition ? authiService.getTreatmentBasket(condition) : null;

  const [selectedTreatments, setSelectedTreatments] = useState<Map<string, number>>(new Map());
  const [documentation, setDocumentation] = useState<Map<string, { notes: string; images: FollowUpImage[] }>>(new Map());
  const [saving, setSaving] = useState(false);

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

  const handleImageUpload = (code: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: FollowUpImage[] = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        newImages.push({
          imageUrl,
          imageName: file.name,
        });

        setDocumentation((prev) => {
          const newMap = new Map(prev);
          const current = newMap.get(code) || { notes: '', images: [] };
          newMap.set(code, {
            ...current,
            images: [...current.images, ...newImages],
          });
          return newMap;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (code: string, imageIndex: number) => {
    setDocumentation((prev) => {
      const newMap = new Map(prev);
      const current = newMap.get(code);
      if (current) {
        const newImages = [...current.images];
        newImages.splice(imageIndex, 1);
        newMap.set(code, { ...current, images: newImages });
      }
      return newMap;
    });
  };

  const handleSave = async () => {
    if (!currentCase) {
      alert('No case selected');
      return;
    }

    if (selectedTreatments.size === 0) {
      alert('Please select at least one ongoing management treatment');
      return;
    }

    setSaving(true);

    try {
      const visit = await followUpService.createFollowUpVisit(currentCase.id);

      for (const item of treatmentBasket?.ongoingManagementBasket || []) {
        const timesPerformed = selectedTreatments.get(item.code);
        if (timesPerformed) {
          const docs = documentation.get(item.code) || { notes: '', images: [] };
          const treatment: FollowUpTreatment = {
            description: item.description,
            code: item.code,
            timesPerformed,
            documentation: docs,
          };
          await followUpService.addFollowUpTreatment(visit.id, treatment);
        }
      }

      await followUpService.updateFollowUpVisit(visit.id, 'completed');

      alert('Follow-up visit saved successfully!');

      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error saving follow-up visit:', error);
      alert('Failed to save follow-up visit. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Case</span>
          </button>
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Follow-Up Visit Documentation</h1>
        <p className="text-gray-600">
          Document follow-up treatments for <strong>{condition}</strong>
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Treatments Performed</h2>

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
                      ? 'border-blue-500 bg-blue-50'
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
                          Covered: {item.numberOfTests} test{item.numberOfTests !== 1 ? 's' : ''} per year
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
                              placeholder="Enter clinical findings, observations, or treatment outcomes..."
                              className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                            />
                          </div>

                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Upload Images
                            </label>
                            <div className="flex items-center gap-2">
                              <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer flex items-center gap-2 text-sm">
                                <Upload size={16} />
                                <span>Choose Files</span>
                                <input
                                  type="file"
                                  multiple
                                  accept="image/*"
                                  onChange={(e) => handleImageUpload(item.code, e)}
                                  className="hidden"
                                />
                              </label>
                              <span className="text-sm text-gray-500">
                                {docs.images.length} image{docs.images.length !== 1 ? 's' : ''} uploaded
                              </span>
                            </div>

                            {docs.images.length > 0 && (
                              <div className="mt-3 grid grid-cols-3 gap-2">
                                {docs.images.map((image, index) => (
                                  <div key={index} className="relative group">
                                    <img
                                      src={image.imageUrl}
                                      alt={image.imageName}
                                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                                    />
                                    <button
                                      onClick={() => removeImage(item.code, index)}
                                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X size={14} />
                                    </button>
                                    <p className="text-xs text-gray-600 mt-1 truncate">
                                      {image.imageName}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleTreatment(item.code)}
                      className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
          disabled={selectedTreatments.size === 0 || saving}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <Save size={20} />
          <span>{saving ? 'Saving...' : 'Save Follow-Up Visit'}</span>
        </button>
      </div>
    </div>
  );
}
