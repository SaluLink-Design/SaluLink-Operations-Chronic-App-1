import { ConditionMatch, ICDCode, TreatmentBasket, Medication } from '@/types';
import { chronicConditionsData, getConditionByName } from '@/lib/data/chronicConditions';
import { getTreatmentBasketByCondition } from '@/lib/data/treatmentBaskets';
import { getMedicationsByCondition } from '@/lib/data/medications';

/**
 * Authi 1.0 Service
 * 
 * This service integrates with ClinicalBERT for condition extraction
 * and provides the authoritative data mappings for ICD-codes, treatment
 * baskets, and medications.
 */

class AuthiService {
  /**
   * Simulates ClinicalBERT condition extraction
   * In production, this would call a Python backend running the actual model
   */
  async extractConditionsFromNote(clinicalNote: string): Promise<ConditionMatch[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple keyword matching simulation
    // In production, this would use the actual ClinicalBERT model
    const conditions = [
      'Asthma',
      'Chronic Renal Disease',
      'Haemophilia',
      'Hyperlipidaemia',
      'Cardiomyopathy',
      'Hypertension',
      'Cardiac Failure',
      'Diabetes Mellitus Type 1',
      'Diabetes Mellitus Type 2',
    ];
    
    const noteLower = clinicalNote.toLowerCase();
    const matches: ConditionMatch[] = [];
    
    // Keyword-based detection (simplified)
    const keywords: Record<string, string[]> = {
      'Asthma': ['asthma', 'wheezing', 'bronchospasm', 'shortness of breath', 'inhaler'],
      'Chronic Renal Disease': ['renal', 'kidney', 'creatinine', 'dialysis', 'nephropathy'],
      'Haemophilia': ['haemophilia', 'hemophilia', 'bleeding', 'factor viii', 'factor ix'],
      'Hyperlipidaemia': ['cholesterol', 'lipid', 'hyperlipidemia', 'hyperlipidaemia', 'triglyceride'],
      'Cardiomyopathy': ['cardiomyopathy', 'heart muscle', 'dilated', 'hypertrophic'],
      'Hypertension': ['hypertension', 'high blood pressure', 'bp', 'elevated pressure'],
      'Cardiac Failure': ['heart failure', 'cardiac failure', 'chf', 'congestive'],
      'Diabetes Mellitus Type 1': ['type 1 diabetes', 'insulin dependent', 't1dm', 'iddm'],
      'Diabetes Mellitus Type 2': ['type 2 diabetes', 'non-insulin dependent', 't2dm', 'niddm', 'diabetes'],
    };
    
    for (const condition of conditions) {
      const conditionKeywords = keywords[condition] || [];
      let matchCount = 0;
      
      for (const keyword of conditionKeywords) {
        if (noteLower.includes(keyword)) {
          matchCount++;
        }
      }
      
      if (matchCount > 0) {
        // Calculate a simple confidence score
        const confidence = Math.min(0.95, 0.5 + (matchCount * 0.15));
        matches.push({
          condition,
          confidence,
        });
      }
    }
    
    // Sort by confidence
    matches.sort((a, b) => b.confidence - a.confidence);
    
    // Return top 5 matches
    return matches.slice(0, 5);
  }
  
  /**
   * Get ICD-10 codes for a confirmed condition
   */
  getICDCodesForCondition(conditionName: string): ICDCode[] {
    const condition = getConditionByName(conditionName);
    return condition?.icdCodes || [];
  }
  
  /**
   * Get treatment basket for a confirmed condition
   */
  getTreatmentBasket(conditionName: string): TreatmentBasket | null {
    return getTreatmentBasketByCondition(conditionName) || null;
  }
  
  /**
   * Get medications for a confirmed condition
   */
  getMedications(conditionName: string): Medication[] {
    return getMedicationsByCondition(conditionName);
  }
  
  /**
   * Validate that all required documentation is complete
   */
  validateDiagnosticDocumentation(treatments: any[]): boolean {
    return treatments.every(t => 
      t.documentation && 
      (t.documentation.images.length > 0 || t.documentation.notes.trim().length > 0)
    );
  }
  
  /**
   * Generate claim summary
   */
  generateClaimSummary(caseData: any): string {
    const sections = [
      `CHRONIC TREATMENT CLAIM SUMMARY`,
      `Generated: ${new Date().toLocaleString()}`,
      ``,
      `CLINICAL NOTE:`,
      caseData.clinicalNote,
      ``,
      `CONFIRMED CONDITION:`,
      caseData.confirmedCondition,
      ``,
      `ICD-10 CODES:`,
      ...caseData.selectedICDCodes.map((icd: ICDCode) => `${icd.code} - ${icd.description}`),
      ``,
      `DIAGNOSTIC TREATMENTS:`,
      ...caseData.diagnosticTreatments.map((t: any) => 
        `${t.description} (${t.code}) - Performed ${t.timesPerformed}x\nDocumentation: ${t.documentation.notes || 'See attached images'}`
      ),
      ``,
      `MEDICATIONS:`,
      ...caseData.selectedMedications.map((m: any) => 
        `${m.medicineNameAndStrength}\nClass: ${m.medicineClass}\nActive Ingredient: ${m.activeIngredient}\nCDA: ${m.cdaCorePrioritySaver}\nRegistration Note: ${m.registrationNote}`
      ),
    ];
    
    return sections.join('\n');
  }
}

export const authiService = new AuthiService();

