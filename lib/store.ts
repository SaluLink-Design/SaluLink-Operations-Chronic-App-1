import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CaseData, WorkflowStep, ConditionMatch, ICDCode, SelectedTreatment, SelectedMedication, MedicalPlan } from '@/types';

interface AppState {
  // Current case
  currentCase: CaseData | null;
  currentStep: WorkflowStep;
  
  // Saved cases
  savedCases: CaseData[];
  
  // Actions
  createNewCase: () => void;
  updateCase: (updates: Partial<CaseData>) => void;
  saveCase: () => void;
  loadCase: (caseId: string) => void;
  deleteCase: (caseId: string) => void;
  
  // Workflow navigation
  setStep: (step: WorkflowStep) => void;
  nextStep: () => void;
  
  // Step-specific actions
  setClinicalNote: (note: string) => void;
  setConditionMatches: (matches: ConditionMatch[]) => void;
  confirmCondition: (condition: string) => void;
  selectICDCodes: (codes: ICDCode[]) => void;
  addDiagnosticTreatment: (treatment: SelectedTreatment) => void;
  updateDiagnosticTreatment: (index: number, treatment: SelectedTreatment) => void;
  removeDiagnosticTreatment: (index: number) => void;
  selectPlan: (plan: MedicalPlan) => void;
  addMedication: (medication: SelectedMedication) => void;
  removeMedication: (index: number) => void;
  addOngoingTreatment: (treatment: SelectedTreatment) => void;
  updateOngoingTreatment: (index: number, treatment: SelectedTreatment) => void;
}

const createEmptyCase = (): CaseData => ({
  id: `case-${Date.now()}`,
  createdAt: new Date(),
  updatedAt: new Date(),
  clinicalNote: '',
  conditionMatches: [],
  confirmedCondition: null,
  selectedICDCodes: [],
  diagnosticTreatments: [],
  selectedPlan: null,
  selectedMedications: [],
  ongoingTreatments: [],
  status: 'draft',
});

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentCase: null,
      currentStep: 'clinical-note',
      savedCases: [],
      
      createNewCase: () => {
        const newCase = createEmptyCase();
        set({ currentCase: newCase, currentStep: 'clinical-note' });
      },
      
      updateCase: (updates) => {
        const { currentCase } = get();
        if (!currentCase) return;
        
        set({
          currentCase: {
            ...currentCase,
            ...updates,
            updatedAt: new Date(),
          },
        });
      },
      
      saveCase: () => {
        const { currentCase, savedCases } = get();
        if (!currentCase) return;
        
        const existingIndex = savedCases.findIndex(c => c.id === currentCase.id);
        
        if (existingIndex >= 0) {
          const updated = [...savedCases];
          updated[existingIndex] = { ...currentCase, updatedAt: new Date() };
          set({ savedCases: updated });
        } else {
          set({ savedCases: [...savedCases, { ...currentCase, updatedAt: new Date() }] });
        }
      },
      
      loadCase: (caseId) => {
        const { savedCases } = get();
        const caseToLoad = savedCases.find(c => c.id === caseId);
        if (caseToLoad) {
          set({ currentCase: caseToLoad, currentStep: 'claim-summary' });
        }
      },
      
      deleteCase: (caseId) => {
        const { savedCases } = get();
        set({ savedCases: savedCases.filter(c => c.id !== caseId) });
      },
      
      setStep: (step) => set({ currentStep: step }),
      
      nextStep: () => {
        const { currentStep } = get();
        const steps: WorkflowStep[] = [
          'clinical-note',
          'analyze-note',
          'confirm-condition',
          'select-icd',
          'diagnostic-basket',
          'document-diagnostic',
          'select-medication',
          'medication-note',
          'claim-summary',
        ];
        
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
          set({ currentStep: steps[currentIndex + 1] });
        }
      },
      
      setClinicalNote: (note) => {
        get().updateCase({ clinicalNote: note });
      },
      
      setConditionMatches: (matches) => {
        get().updateCase({ conditionMatches: matches });
      },
      
      confirmCondition: (condition) => {
        get().updateCase({ 
          confirmedCondition: condition,
          status: 'diagnostic',
        });
      },
      
      selectICDCodes: (codes) => {
        get().updateCase({ selectedICDCodes: codes });
      },
      
      addDiagnosticTreatment: (treatment) => {
        const { currentCase } = get();
        if (!currentCase) return;
        
        get().updateCase({
          diagnosticTreatments: [...currentCase.diagnosticTreatments, treatment],
        });
      },
      
      updateDiagnosticTreatment: (index, treatment) => {
        const { currentCase } = get();
        if (!currentCase) return;
        
        const updated = [...currentCase.diagnosticTreatments];
        updated[index] = treatment;
        get().updateCase({ diagnosticTreatments: updated });
      },
      
      removeDiagnosticTreatment: (index) => {
        const { currentCase } = get();
        if (!currentCase) return;
        
        const updated = currentCase.diagnosticTreatments.filter((_, i) => i !== index);
        get().updateCase({ diagnosticTreatments: updated });
      },
      
      selectPlan: (plan) => {
        get().updateCase({ selectedPlan: plan });
      },
      
      addMedication: (medication) => {
        const { currentCase } = get();
        if (!currentCase) return;
        
        get().updateCase({
          selectedMedications: [...currentCase.selectedMedications, medication],
          status: 'medication',
        });
      },
      
      removeMedication: (index) => {
        const { currentCase } = get();
        if (!currentCase) return;
        
        const updated = currentCase.selectedMedications.filter((_, i) => i !== index);
        get().updateCase({ selectedMedications: updated });
      },
      
      addOngoingTreatment: (treatment) => {
        const { currentCase } = get();
        if (!currentCase) return;
        
        get().updateCase({
          ongoingTreatments: [...currentCase.ongoingTreatments, treatment],
        });
      },
      
      updateOngoingTreatment: (index, treatment) => {
        const { currentCase } = get();
        if (!currentCase) return;
        
        const updated = [...currentCase.ongoingTreatments];
        updated[index] = treatment;
        get().updateCase({ ongoingTreatments: updated });
      },
    }),
    {
      name: 'salulink-chronic-storage',
    }
  )
);

