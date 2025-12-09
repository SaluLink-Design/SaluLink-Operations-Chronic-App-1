import { supabase } from './client';
import { CaseData, SelectedTreatment, SelectedMedication } from '@/types';

export class CaseService {
  async getAllCases(): Promise<CaseData[]> {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(this.mapDatabaseCaseToAppCase);
  }

  async getCaseById(id: string): Promise<CaseData | null> {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    const caseData = this.mapDatabaseCaseToAppCase(data);

    const treatments = await this.getCaseTreatments(id);
    caseData.diagnosticTreatments = treatments.filter(t => t.treatment_type === 'diagnostic');
    caseData.ongoingTreatments = treatments.filter(t => t.treatment_type === 'ongoing_management');

    const medications = await this.getCaseMedications(id);
    caseData.selectedMedications = medications;

    return caseData;
  }

  async createCase(caseData: Partial<CaseData>): Promise<CaseData> {
    const { data, error } = await supabase
      .from('cases')
      .insert({
        clinical_note: caseData.clinicalNote || '',
        status: caseData.status || 'draft',
        condition_matches: caseData.conditionMatches || [],
        confirmed_condition: caseData.confirmedCondition || null,
        selected_icd_codes: caseData.selectedICDCodes || [],
        selected_plan: caseData.selectedPlan || null,
        chronic_registration_note: null,
      })
      .select()
      .single();

    if (error) throw error;

    return this.mapDatabaseCaseToAppCase(data);
  }

  async updateCase(id: string, updates: Partial<CaseData>): Promise<CaseData> {
    const { data, error } = await supabase
      .from('cases')
      .update({
        updated_at: new Date().toISOString(),
        clinical_note: updates.clinicalNote,
        status: updates.status,
        condition_matches: updates.conditionMatches,
        confirmed_condition: updates.confirmedCondition,
        selected_icd_codes: updates.selectedICDCodes,
        selected_plan: updates.selectedPlan,
        chronic_registration_note: updates.selectedMedications?.[0]?.registrationNote,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return this.mapDatabaseCaseToAppCase(data);
  }

  async deleteCase(id: string): Promise<void> {
    const { error } = await supabase
      .from('cases')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async addTreatment(caseId: string, treatment: SelectedTreatment, type: 'diagnostic' | 'ongoing_management'): Promise<void> {
    const { error } = await supabase
      .from('case_treatments')
      .insert({
        case_id: caseId,
        treatment_type: type,
        description: treatment.description,
        code: treatment.code,
        number_of_tests: treatment.numberOfTests,
        times_performed: treatment.timesPerformed,
        documentation_notes: treatment.documentation.notes,
      });

    if (error) throw error;
  }

  async updateTreatment(treatmentId: string, treatment: SelectedTreatment): Promise<void> {
    const { error } = await supabase
      .from('case_treatments')
      .update({
        description: treatment.description,
        code: treatment.code,
        number_of_tests: treatment.numberOfTests,
        times_performed: treatment.timesPerformed,
        documentation_notes: treatment.documentation.notes,
      })
      .eq('id', treatmentId);

    if (error) throw error;
  }

  async deleteTreatment(treatmentId: string): Promise<void> {
    const { error } = await supabase
      .from('case_treatments')
      .delete()
      .eq('id', treatmentId);

    if (error) throw error;
  }

  async getCaseTreatments(caseId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('case_treatments')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return (data || []).map(t => ({
      id: t.id,
      treatment_type: t.treatment_type,
      description: t.description,
      code: t.code,
      numberOfTests: t.number_of_tests,
      timesPerformed: t.times_performed,
      documentation: {
        images: [],
        notes: t.documentation_notes,
      },
    }));
  }

  async addMedication(caseId: string, medication: SelectedMedication): Promise<void> {
    const { error } = await supabase
      .from('case_medications')
      .insert({
        case_id: caseId,
        condition: medication.condition,
        medicine_class: medication.medicineClass,
        active_ingredient: medication.activeIngredient,
        medicine_name_strength: medication.medicineNameAndStrength,
        cda_core_priority_saver: medication.cdaCorePrioritySaver,
        cda_executive_comprehensive: medication.cdaExecutiveComprehensive,
        registration_note: medication.registrationNote,
      });

    if (error) throw error;
  }

  async deleteMedication(medicationId: string): Promise<void> {
    const { error } = await supabase
      .from('case_medications')
      .delete()
      .eq('id', medicationId);

    if (error) throw error;
  }

  async getCaseMedications(caseId: string): Promise<SelectedMedication[]> {
    const { data, error } = await supabase
      .from('case_medications')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return (data || []).map(m => ({
      condition: m.condition,
      medicineClass: m.medicine_class,
      activeIngredient: m.active_ingredient,
      medicineNameAndStrength: m.medicine_name_strength,
      cdaCorePrioritySaver: m.cda_core_priority_saver,
      cdaExecutiveComprehensive: m.cda_executive_comprehensive,
      registrationNote: m.registration_note,
    }));
  }

  async createReferral(caseId: string, reason: string, notes: string | null): Promise<void> {
    const { error } = await supabase
      .from('referrals')
      .insert({
        case_id: caseId,
        reason,
        notes,
      });

    if (error) throw error;
  }

  private mapDatabaseCaseToAppCase(dbCase: any): CaseData {
    return {
      id: dbCase.id,
      createdAt: new Date(dbCase.created_at),
      updatedAt: new Date(dbCase.updated_at),
      clinicalNote: dbCase.clinical_note || '',
      conditionMatches: dbCase.condition_matches || [],
      confirmedCondition: dbCase.confirmed_condition || null,
      selectedICDCodes: dbCase.selected_icd_codes || [],
      diagnosticTreatments: [],
      selectedPlan: dbCase.selected_plan || null,
      selectedMedications: [],
      ongoingTreatments: [],
      status: dbCase.status || 'draft',
    };
  }
}

export const caseService = new CaseService();
