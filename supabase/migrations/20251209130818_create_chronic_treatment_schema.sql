/*
  # SaluLink Chronic Treatment Database Schema

  ## Overview
  This migration creates the complete database schema for the SaluLink Chronic Treatment App,
  supporting the full workflow from clinical note entry through claim generation and ongoing management.

  ## New Tables
  
  ### 1. cases
  Main table storing chronic treatment cases/claims
  - id (uuid, primary key) - Unique case identifier
  - created_at (timestamptz) - Case creation timestamp
  - updated_at (timestamptz) - Last modification timestamp
  - user_id (uuid, nullable) - Future: User who created the case
  - status (text) - Case status: draft, diagnostic, medication, completed
  - clinical_note (text) - Original clinical note from specialist
  - condition_matches (jsonb) - ClinicalBERT condition matches with confidence scores
  - confirmed_condition (text, nullable) - Confirmed chronic condition
  - selected_icd_codes (jsonb) - Array of selected ICD-10 codes
  - selected_plan (text, nullable) - Medical scheme plan
  - chronic_registration_note (text, nullable) - Note for chronic medication registration

  ### 2. case_treatments
  Stores diagnostic and ongoing management treatments for cases
  - id (uuid, primary key) - Treatment entry identifier
  - case_id (uuid, foreign key) - References cases table
  - treatment_type (text) - Type: diagnostic or ongoing_management
  - description (text) - Procedure or test description
  - code (text) - Procedure or test code
  - number_of_tests (integer) - Number of tests covered
  - times_performed (integer) - How many times performed
  - documentation_notes (text) - Clinical findings
  - created_at (timestamptz) - When treatment was added

  ### 3. case_medications
  Stores selected medications for cases
  - id (uuid, primary key) - Medication entry identifier
  - case_id (uuid, foreign key) - References cases table
  - condition (text) - Chronic condition
  - medicine_class (text) - Medicine class
  - active_ingredient (text) - Active ingredient
  - medicine_name_strength (text) - Medicine name and strength
  - cda_core_priority_saver (text) - CDA for Core, Priority, Saver plans
  - cda_executive_comprehensive (text) - CDA for Executive, Comprehensive plans
  - registration_note (text) - Reason for chronic registration
  - created_at (timestamptz) - When medication was added

  ### 4. case_documents
  Stores uploaded images and documents for treatments
  - id (uuid, primary key) - Document identifier
  - case_id (uuid, foreign key) - References cases table
  - treatment_id (uuid, nullable, foreign key) - References case_treatments table
  - file_name (text) - Original file name
  - file_path (text) - Storage path in Supabase Storage
  - file_type (text) - MIME type
  - file_size (integer) - File size in bytes
  - created_at (timestamptz) - Upload timestamp

  ### 5. referrals
  Stores patient referrals to other specialists
  - id (uuid, primary key) - Referral identifier
  - case_id (uuid, foreign key) - References cases table
  - reason (text) - Reason for referral
  - notes (text, nullable) - Additional notes
  - created_at (timestamptz) - Referral creation timestamp

  ## Security
  - Enable RLS on all tables
  - Public access policies for now (no auth yet)
  - Future: Will integrate with auth.users when authentication is implemented
*/

-- Create cases table
CREATE TABLE IF NOT EXISTS cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid,
  status text DEFAULT 'draft',
  clinical_note text DEFAULT '',
  condition_matches jsonb DEFAULT '[]'::jsonb,
  confirmed_condition text,
  selected_icd_codes jsonb DEFAULT '[]'::jsonb,
  selected_plan text,
  chronic_registration_note text
);

-- Create case_treatments table
CREATE TABLE IF NOT EXISTS case_treatments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  treatment_type text NOT NULL,
  description text NOT NULL,
  code text NOT NULL,
  number_of_tests integer DEFAULT 0,
  times_performed integer DEFAULT 0,
  documentation_notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create case_medications table
CREATE TABLE IF NOT EXISTS case_medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  condition text NOT NULL,
  medicine_class text DEFAULT '',
  active_ingredient text DEFAULT '',
  medicine_name_strength text NOT NULL,
  cda_core_priority_saver text DEFAULT '',
  cda_executive_comprehensive text DEFAULT '',
  registration_note text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create case_documents table
CREATE TABLE IF NOT EXISTS case_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  treatment_id uuid REFERENCES case_treatments(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_type text NOT NULL,
  file_size integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  reason text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_confirmed_condition ON cases(confirmed_condition);
CREATE INDEX IF NOT EXISTS idx_cases_created_at ON cases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_case_treatments_case_id ON case_treatments(case_id);
CREATE INDEX IF NOT EXISTS idx_case_treatments_type ON case_treatments(treatment_type);
CREATE INDEX IF NOT EXISTS idx_case_medications_case_id ON case_medications(case_id);
CREATE INDEX IF NOT EXISTS idx_case_documents_case_id ON case_documents(case_id);
CREATE INDEX IF NOT EXISTS idx_case_documents_treatment_id ON case_documents(treatment_id);
CREATE INDEX IF NOT EXISTS idx_referrals_case_id ON referrals(case_id);

-- Enable Row Level Security
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies (allowing public access for now since no auth yet)
-- These should be updated when authentication is implemented

CREATE POLICY "Allow public read access to cases"
  ON cases FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert to cases"
  ON cases FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update to cases"
  ON cases FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete to cases"
  ON cases FOR DELETE
  TO public
  USING (true);

CREATE POLICY "Allow public read access to case_treatments"
  ON case_treatments FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert to case_treatments"
  ON case_treatments FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update to case_treatments"
  ON case_treatments FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete to case_treatments"
  ON case_treatments FOR DELETE
  TO public
  USING (true);

CREATE POLICY "Allow public read access to case_medications"
  ON case_medications FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert to case_medications"
  ON case_medications FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update to case_medications"
  ON case_medications FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete to case_medications"
  ON case_medications FOR DELETE
  TO public
  USING (true);

CREATE POLICY "Allow public read access to case_documents"
  ON case_documents FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert to case_documents"
  ON case_documents FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update to case_documents"
  ON case_documents FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete to case_documents"
  ON case_documents FOR DELETE
  TO public
  USING (true);

CREATE POLICY "Allow public read access to referrals"
  ON referrals FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert to referrals"
  ON referrals FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update to referrals"
  ON referrals FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete to referrals"
  ON referrals FOR DELETE
  TO public
  USING (true);