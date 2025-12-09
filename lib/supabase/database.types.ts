export interface Database {
  public: {
    Tables: {
      cases: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id: string | null;
          status: string;
          clinical_note: string;
          condition_matches: any;
          confirmed_condition: string | null;
          selected_icd_codes: any;
          selected_plan: string | null;
          chronic_registration_note: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string | null;
          status?: string;
          clinical_note?: string;
          condition_matches?: any;
          confirmed_condition?: string | null;
          selected_icd_codes?: any;
          selected_plan?: string | null;
          chronic_registration_note?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string | null;
          status?: string;
          clinical_note?: string;
          condition_matches?: any;
          confirmed_condition?: string | null;
          selected_icd_codes?: any;
          selected_plan?: string | null;
          chronic_registration_note?: string | null;
        };
      };
      case_treatments: {
        Row: {
          id: string;
          case_id: string;
          treatment_type: string;
          description: string;
          code: string;
          number_of_tests: number;
          times_performed: number;
          documentation_notes: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          case_id: string;
          treatment_type: string;
          description: string;
          code: string;
          number_of_tests?: number;
          times_performed?: number;
          documentation_notes?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          case_id?: string;
          treatment_type?: string;
          description?: string;
          code?: string;
          number_of_tests?: number;
          times_performed?: number;
          documentation_notes?: string;
          created_at?: string;
        };
      };
      case_medications: {
        Row: {
          id: string;
          case_id: string;
          condition: string;
          medicine_class: string;
          active_ingredient: string;
          medicine_name_strength: string;
          cda_core_priority_saver: string;
          cda_executive_comprehensive: string;
          registration_note: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          case_id: string;
          condition: string;
          medicine_class?: string;
          active_ingredient?: string;
          medicine_name_strength: string;
          cda_core_priority_saver?: string;
          cda_executive_comprehensive?: string;
          registration_note?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          case_id?: string;
          condition?: string;
          medicine_class?: string;
          active_ingredient?: string;
          medicine_name_strength?: string;
          cda_core_priority_saver?: string;
          cda_executive_comprehensive?: string;
          registration_note?: string;
          created_at?: string;
        };
      };
      case_documents: {
        Row: {
          id: string;
          case_id: string;
          treatment_id: string | null;
          file_name: string;
          file_path: string;
          file_type: string;
          file_size: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          case_id: string;
          treatment_id?: string | null;
          file_name: string;
          file_path: string;
          file_type: string;
          file_size?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          case_id?: string;
          treatment_id?: string | null;
          file_name?: string;
          file_path?: string;
          file_type?: string;
          file_size?: number;
          created_at?: string;
        };
      };
      referrals: {
        Row: {
          id: string;
          case_id: string;
          reason: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          case_id: string;
          reason: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          case_id?: string;
          reason?: string;
          notes?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
