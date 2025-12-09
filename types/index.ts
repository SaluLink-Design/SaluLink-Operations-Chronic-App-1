// Core Types for SaluLink Chronic App

export interface ChronicCondition {
  name: string;
  icdCodes: ICDCode[];
}

export interface ICDCode {
  code: string;
  description: string;
}

export interface TreatmentBasket {
  condition: string;
  diagnosticBasket: TreatmentItem[];
  ongoingManagementBasket: TreatmentItem[];
  specialistsPerYear?: number;
}

export interface TreatmentItem {
  description: string;
  code: string;
  numberOfTests: number;
}

export interface Medication {
  condition: string;
  cdaCorePrioritySaver: string;
  cdaExecutiveComprehensive: string;
  medicineClass: string;
  activeIngredient: string;
  medicineNameAndStrength: string;
}

export interface ConditionMatch {
  condition: string;
  confidence: number;
}

export interface SelectedTreatment extends TreatmentItem {
  timesPerformed: number;
  documentation: {
    images: File[];
    notes: string;
  };
}

export interface SelectedMedication extends Medication {
  registrationNote: string;
}

export interface CaseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Step 1-3: Clinical Note & Condition
  clinicalNote: string;
  conditionMatches: ConditionMatch[];
  confirmedCondition: string | null;
  
  // Step 4: ICD Codes
  selectedICDCodes: ICDCode[];
  
  // Step 5-7: Diagnostic Basket
  diagnosticTreatments: SelectedTreatment[];
  
  // Step 8-11: Medication
  selectedPlan: MedicalPlan | null;
  selectedMedications: SelectedMedication[];
  
  // Ongoing Management
  ongoingTreatments: SelectedTreatment[];
  
  // Status
  status: 'draft' | 'diagnostic' | 'medication' | 'completed';
}

export type MedicalPlan = 'Core' | 'Priority' | 'Saver' | 'Executive' | 'Comprehensive';

export interface ReferralData {
  caseId: string;
  reason: string;
  supportingDocs: File[];
  notes: string;
  createdAt: Date;
}

// Workflow Steps
export type WorkflowStep =
  | 'clinical-note'
  | 'analyze-note'
  | 'confirm-condition'
  | 'select-icd'
  | 'diagnostic-basket'
  | 'document-diagnostic'
  | 'select-medication'
  | 'medication-note'
  | 'claim-summary'
  | 'ongoing-management'
  | 'referral';

