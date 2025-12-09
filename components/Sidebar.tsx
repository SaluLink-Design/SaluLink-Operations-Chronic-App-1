'use client';

import { useAppStore } from '@/lib/store';
import { Trash, Sun, User, ExternalLink, LogOut, FileText, RefreshCw, UserPlus } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const { savedCases, loadCase, deleteCase, currentCase, loadAllCases, setStep, isViewingLoadedCase } = useAppStore();
  const [showCases, setShowCases] = useState(false);

  useEffect(() => {
    loadAllCases();
  }, []);

  const handleOngoingManagement = () => {
    setStep('ongoing-management');
  };

  const handleCreateReferral = () => {
    setStep('referral');
  };

  return (
    <div className="w-[282px] h-screen bg-gradient-to-b from-gray-100 to-gray-50 border-r border-gray-200 flex flex-col">
      {/* Top Section */}
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">SaluLink</h2>
        <p className="text-sm text-gray-600 mt-1">Chronic Treatment App</p>
      </div>

      {/* View Cases Toggle */}
      <div className="p-4">
        <button
          onClick={() => setShowCases(!showCases)}
          className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          <FileText size={18} />
          <span>{showCases ? 'Hide Cases' : 'View Cases'}</span>
        </button>
      </div>

      {/* Saved Cases List */}
      {showCases && (
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Saved Cases</h3>
          {savedCases.length === 0 ? (
            <p className="text-sm text-gray-500">No saved cases yet</p>
          ) : (
            <div className="space-y-2">
              {savedCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    currentCase?.id === caseItem.id
                      ? 'bg-primary-50 border-primary-300'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={async () => {
                    await loadCase(caseItem.id);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {caseItem.confirmedCondition || 'Draft Case'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(caseItem.updatedAt).toLocaleDateString()}
                      </p>
                      {caseItem.status && (
                        <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                          caseItem.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : caseItem.status === 'medication'
                            ? 'bg-blue-100 text-blue-800'
                            : caseItem.status === 'diagnostic'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {caseItem.status}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (confirm('Delete this case?')) {
                          await deleteCase(caseItem.id);
                          await loadAllCases();
                        }
                      }}
                      className="ml-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Case Action Buttons - Only show when a saved case is loaded and completed */}
      {isViewingLoadedCase && currentCase && currentCase.status === 'completed' && (
        <div className="px-4 pb-4 space-y-2 border-t border-gray-200 pt-4">
          <button
            onClick={handleOngoingManagement}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            <span>Ongoing Management</span>
          </button>
          <button
            onClick={handleCreateReferral}
            className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
          >
            <UserPlus size={18} />
            <span>Create Referral</span>
          </button>
        </div>
      )}

      {/* Bottom Section */}
      <div className="mt-auto border-t border-gray-200 p-4 space-y-2">
        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-3">
          <Trash size={18} />
          <span>Clear conversations</span>
        </button>
        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-3">
          <Sun size={18} />
          <span>Light mode</span>
        </button>
        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-3">
          <User size={18} />
          <span>My account</span>
        </button>
        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-3">
          <ExternalLink size={18} />
          <span>Updates & FAQ</span>
        </button>
        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-3">
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}

