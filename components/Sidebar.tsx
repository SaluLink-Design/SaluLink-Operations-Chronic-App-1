'use client';

import { useAppStore } from '@/lib/store';
import { Trash, Sun, User, ExternalLink, LogOut, FileText } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const { savedCases, loadCase, deleteCase, currentCase } = useAppStore();
  const [showCases, setShowCases] = useState(false);

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
                  onClick={() => loadCase(caseItem.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {caseItem.confirmedCondition || 'Draft Case'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(caseItem.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this case?')) {
                          deleteCase(caseItem.id);
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

