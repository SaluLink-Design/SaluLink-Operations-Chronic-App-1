'use client';

import { useState, useEffect } from 'react';
import { followUpService } from '@/lib/supabase/followUpService';
import { FollowUpVisit } from '@/types';
import { ArrowLeft, Download, Calendar, FileText, Image } from 'lucide-react';

interface FollowUpClaimSummaryProps {
  visitId: string;
  onBack?: () => void;
}

export default function FollowUpClaimSummary({ visitId, onBack }: FollowUpClaimSummaryProps) {
  const [visit, setVisit] = useState<FollowUpVisit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVisit();
  }, [visitId]);

  const loadVisit = async () => {
    try {
      const data = await followUpService.getFollowUpVisit(visitId);
      setVisit(data);
    } catch (error) {
      console.error('Error loading follow-up visit:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!visit) return;

    const summaryText = generateSummaryText();
    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `followup-visit-${visit.visitDate.toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateSummaryText = (): string => {
    if (!visit) return '';

    let text = `FOLLOW-UP VISIT CLAIM SUMMARY\n`;
    text += `================================\n\n`;
    text += `Visit Date: ${visit.visitDate.toLocaleDateString()}\n`;
    text += `Status: ${visit.status}\n\n`;
    text += `TREATMENTS PERFORMED\n`;
    text += `====================\n\n`;

    visit.treatments.forEach((treatment, index) => {
      text += `${index + 1}. ${treatment.description}\n`;
      text += `   Code: ${treatment.code}\n`;
      text += `   Times Performed: ${treatment.timesPerformed}\n`;
      text += `   Clinical Notes: ${treatment.documentation.notes || 'No notes provided'}\n`;
      text += `   Images: ${treatment.documentation.images.length} image(s) attached\n\n`;
    });

    return text;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <p className="text-center text-gray-600">Loading follow-up visit...</p>
        </div>
      </div>
    );
  }

  if (!visit) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <p className="text-center text-red-600">Follow-up visit not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Follow-Up Visit Summary</h1>
        <p className="text-gray-600">Review and export follow-up visit details</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={20} className="text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Visit Information</h2>
            </div>
            <p className="text-sm text-gray-600">
              Date: {visit.visitDate.toLocaleDateString()} at {visit.visitDate.toLocaleTimeString()}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Status: <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                visit.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {visit.status}
              </span>
            </p>
          </div>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Download size={18} />
            <span>Export Summary</span>
          </button>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={20} />
            <span>Treatments Performed</span>
          </h3>

          {visit.treatments.length === 0 ? (
            <p className="text-gray-500">No treatments documented</p>
          ) : (
            <div className="space-y-6">
              {visit.treatments.map((treatment, index) => (
                <div key={treatment.id || index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{treatment.description}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Code: <span className="font-mono">{treatment.code}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Times Performed: <span className="font-medium">{treatment.timesPerformed}</span>
                      </p>
                    </div>
                  </div>

                  {treatment.documentation.notes && (
                    <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-1">Clinical Notes:</p>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">
                        {treatment.documentation.notes}
                      </p>
                    </div>
                  )}

                  {treatment.documentation.images.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Image size={16} />
                        <span>Attached Images ({treatment.documentation.images.length})</span>
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {treatment.documentation.images.map((image, imgIndex) => (
                          <div key={image.id || imgIndex} className="relative group">
                            <img
                              src={image.imageUrl}
                              alt={image.imageName}
                              className="w-full h-24 object-cover rounded-lg border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer"
                              onClick={() => window.open(image.imageUrl, '_blank')}
                            />
                            <p className="text-xs text-gray-600 mt-1 truncate">
                              {image.imageName}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
