import { supabase } from './client';
import { FollowUpVisit, FollowUpTreatment, FollowUpImage } from '@/types';

export class FollowUpService {
  async createFollowUpVisit(caseId: string): Promise<FollowUpVisit> {
    const { data, error } = await supabase
      .from('followup_visits')
      .insert({
        case_id: caseId,
        visit_date: new Date().toISOString(),
        status: 'draft',
      })
      .select()
      .single();

    if (error) throw error;

    return this.mapDatabaseVisitToAppVisit(data);
  }

  async getFollowUpVisitsByCase(caseId: string): Promise<FollowUpVisit[]> {
    const { data, error } = await supabase
      .from('followup_visits')
      .select('*')
      .eq('case_id', caseId)
      .order('visit_date', { ascending: false });

    if (error) throw error;

    const visits = await Promise.all(
      (data || []).map(async (visit) => {
        const treatments = await this.getFollowUpTreatments(visit.id);
        return {
          ...this.mapDatabaseVisitToAppVisit(visit),
          treatments,
        };
      })
    );

    return visits;
  }

  async getFollowUpVisit(visitId: string): Promise<FollowUpVisit | null> {
    const { data, error } = await supabase
      .from('followup_visits')
      .select('*')
      .eq('id', visitId)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    const treatments = await this.getFollowUpTreatments(visitId);

    return {
      ...this.mapDatabaseVisitToAppVisit(data),
      treatments,
    };
  }

  async updateFollowUpVisit(visitId: string, status: 'draft' | 'completed'): Promise<void> {
    const { error } = await supabase
      .from('followup_visits')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', visitId);

    if (error) throw error;
  }

  async deleteFollowUpVisit(visitId: string): Promise<void> {
    const { error } = await supabase
      .from('followup_visits')
      .delete()
      .eq('id', visitId);

    if (error) throw error;
  }

  async addFollowUpTreatment(visitId: string, treatment: FollowUpTreatment): Promise<string> {
    const { data, error } = await supabase
      .from('followup_treatments')
      .insert({
        followup_visit_id: visitId,
        description: treatment.description,
        code: treatment.code,
        times_performed: treatment.timesPerformed,
        documentation_notes: treatment.documentation.notes,
      })
      .select()
      .single();

    if (error) throw error;

    for (const image of treatment.documentation.images) {
      await this.addFollowUpImage(data.id, image);
    }

    return data.id;
  }

  async getFollowUpTreatments(visitId: string): Promise<FollowUpTreatment[]> {
    const { data, error } = await supabase
      .from('followup_treatments')
      .select('*')
      .eq('followup_visit_id', visitId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    const treatments = await Promise.all(
      (data || []).map(async (treatment) => {
        const images = await this.getFollowUpImages(treatment.id);
        return {
          id: treatment.id,
          description: treatment.description,
          code: treatment.code,
          timesPerformed: treatment.times_performed,
          documentation: {
            notes: treatment.documentation_notes || '',
            images,
          },
        };
      })
    );

    return treatments;
  }

  async deleteFollowUpTreatment(treatmentId: string): Promise<void> {
    const { error } = await supabase
      .from('followup_treatments')
      .delete()
      .eq('id', treatmentId);

    if (error) throw error;
  }

  async addFollowUpImage(treatmentId: string, image: FollowUpImage): Promise<void> {
    const { error } = await supabase
      .from('followup_treatment_images')
      .insert({
        followup_treatment_id: treatmentId,
        image_url: image.imageUrl,
        image_name: image.imageName,
      });

    if (error) throw error;
  }

  async getFollowUpImages(treatmentId: string): Promise<FollowUpImage[]> {
    const { data, error } = await supabase
      .from('followup_treatment_images')
      .select('*')
      .eq('followup_treatment_id', treatmentId)
      .order('uploaded_at', { ascending: true });

    if (error) throw error;

    return (data || []).map((img) => ({
      id: img.id,
      imageUrl: img.image_url,
      imageName: img.image_name,
      uploadedAt: new Date(img.uploaded_at),
    }));
  }

  async deleteFollowUpImage(imageId: string): Promise<void> {
    const { error } = await supabase
      .from('followup_treatment_images')
      .delete()
      .eq('id', imageId);

    if (error) throw error;
  }

  private mapDatabaseVisitToAppVisit(dbVisit: any): FollowUpVisit {
    return {
      id: dbVisit.id,
      caseId: dbVisit.case_id,
      visitDate: new Date(dbVisit.visit_date),
      status: dbVisit.status,
      treatments: [],
      createdAt: new Date(dbVisit.created_at),
      updatedAt: new Date(dbVisit.updated_at),
    };
  }
}

export const followUpService = new FollowUpService();
