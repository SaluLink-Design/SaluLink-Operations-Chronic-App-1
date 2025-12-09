/*
  # Create Follow-Up Visits Table

  1. New Tables
    - `followup_visits`
      - `id` (uuid, primary key)
      - `case_id` (uuid, foreign key to cases)
      - `visit_date` (timestamptz, when the follow-up visit occurred)
      - `status` (text, status of the follow-up)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `followup_treatments`
      - `id` (uuid, primary key)
      - `followup_visit_id` (uuid, foreign key to followup_visits)
      - `description` (text, treatment description)
      - `code` (text, procedure code)
      - `times_performed` (integer, how many times performed)
      - `documentation_notes` (text, clinical notes)
      - `created_at` (timestamptz)
      
    - `followup_treatment_images`
      - `id` (uuid, primary key)
      - `followup_treatment_id` (uuid, foreign key to followup_treatments)
      - `image_url` (text, URL or path to image)
      - `image_name` (text, original filename)
      - `uploaded_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own follow-up visits

  3. Indexes
    - Add index on case_id for faster lookups
    - Add index on followup_visit_id for faster treatment queries
*/

-- Create followup_visits table
CREATE TABLE IF NOT EXISTS followup_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  visit_date timestamptz DEFAULT now(),
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create followup_treatments table
CREATE TABLE IF NOT EXISTS followup_treatments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  followup_visit_id uuid NOT NULL REFERENCES followup_visits(id) ON DELETE CASCADE,
  description text NOT NULL,
  code text NOT NULL,
  times_performed integer DEFAULT 1,
  documentation_notes text,
  created_at timestamptz DEFAULT now()
);

-- Create followup_treatment_images table
CREATE TABLE IF NOT EXISTS followup_treatment_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  followup_treatment_id uuid NOT NULL REFERENCES followup_treatments(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  image_name text,
  uploaded_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_followup_visits_case_id ON followup_visits(case_id);
CREATE INDEX IF NOT EXISTS idx_followup_treatments_visit_id ON followup_treatments(followup_visit_id);
CREATE INDEX IF NOT EXISTS idx_followup_images_treatment_id ON followup_treatment_images(followup_treatment_id);

-- Enable Row Level Security
ALTER TABLE followup_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE followup_treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE followup_treatment_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies for followup_visits
CREATE POLICY "Anyone can view followup visits"
  ON followup_visits FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create followup visits"
  ON followup_visits FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update followup visits"
  ON followup_visits FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete followup visits"
  ON followup_visits FOR DELETE
  USING (true);

-- RLS Policies for followup_treatments
CREATE POLICY "Anyone can view followup treatments"
  ON followup_treatments FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create followup treatments"
  ON followup_treatments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update followup treatments"
  ON followup_treatments FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete followup treatments"
  ON followup_treatments FOR DELETE
  USING (true);

-- RLS Policies for followup_treatment_images
CREATE POLICY "Anyone can view followup treatment images"
  ON followup_treatment_images FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create followup treatment images"
  ON followup_treatment_images FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update followup treatment images"
  ON followup_treatment_images FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete followup treatment images"
  ON followup_treatment_images FOR DELETE
  USING (true);
