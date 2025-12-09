import { Medication } from '@/types';

// Sample medications parsed from Medicine List.csv (simplified for key conditions)
export const medicationsData: Medication[] = [
  // Asthma
  {
    condition: 'Asthma',
    cdaCorePrioritySaver: 'R 240.00',
    cdaExecutiveComprehensive: 'R 240.00',
    medicineClass: 'Salmeterol and Fluticasone',
    activeIngredient: 'Salmeterol and Fluticasone',
    medicineNameAndStrength: 'Sereflo HFA 120 dose 25/50',
  },
  {
    condition: 'Asthma',
    cdaCorePrioritySaver: 'R 240.00',
    cdaExecutiveComprehensive: 'R 240.00',
    medicineClass: 'Vilanterol and Fluticasone combinations',
    activeIngredient: 'Vilanterol and Fluticasone furoate',
    medicineNameAndStrength: 'Revinty ellipta 30 dose 92/22mcg; 184/22mcg',
  },
  {
    condition: 'Asthma',
    cdaCorePrioritySaver: 'R 20.00',
    cdaExecutiveComprehensive: 'R 20.00',
    medicineClass: 'Systemic Corticosteroids: Prednisone',
    activeIngredient: 'Prednisone',
    medicineNameAndStrength: 'Be-Tabs Prednisone 5mg',
  },
  
  // Chronic Renal Disease
  {
    condition: 'Chronic Renal Disease',
    cdaCorePrioritySaver: 'R 80.00',
    cdaExecutiveComprehensive: 'R 90.00',
    medicineClass: 'ACE inhibitors and diuretics',
    activeIngredient: 'Enalapril and diuretics',
    medicineNameAndStrength: 'Acenten 20/12.5mg',
  },
  {
    condition: 'Chronic Renal Disease',
    cdaCorePrioritySaver: 'R 65.00',
    cdaExecutiveComprehensive: 'R 75.00',
    medicineClass: 'ACE inhibitors: Plain',
    activeIngredient: 'Enalapril',
    medicineNameAndStrength: 'Enalapril Arya 5mg; 10mg; 20mg',
  },
  
  // Hyperlipidaemia
  {
    condition: 'Hyperlipidaemia',
    cdaCorePrioritySaver: 'R 45.00',
    cdaExecutiveComprehensive: 'R 45.00',
    medicineClass: 'Lipid modifying agents: Statins',
    activeIngredient: 'Atorvastatin',
    medicineNameAndStrength: 'Alipto 10mg; 20mg; 40mg',
  },
  {
    condition: 'Hyperlipidaemia',
    cdaCorePrioritySaver: 'R 45.00',
    cdaExecutiveComprehensive: 'R 45.00',
    medicineClass: 'Lipid modifying agents: Statins',
    activeIngredient: 'Simvastatin',
    medicineNameAndStrength: 'Adco-Simvastatin 10mg; 20mg; 40mg',
  },
  
  // Hypertension
  {
    condition: 'Hypertension',
    cdaCorePrioritySaver: 'R 65.00',
    cdaExecutiveComprehensive: 'R 75.00',
    medicineClass: 'ACE inhibitors: Plain',
    activeIngredient: 'Enalapril',
    medicineNameAndStrength: 'Enalapril Arya 5mg; 10mg; 20mg',
  },
  {
    condition: 'Hypertension',
    cdaCorePrioritySaver: 'R 80.00',
    cdaExecutiveComprehensive: 'R 80.00',
    medicineClass: 'Selective calcium channel blockers with mainly vascular effects',
    activeIngredient: 'Amlodipine',
    medicineNameAndStrength: 'Amloc 5mg; 10mg',
  },
  {
    condition: 'Hypertension',
    cdaCorePrioritySaver: 'R 60.00',
    cdaExecutiveComprehensive: 'R 70.00',
    medicineClass: 'Beta blocking agents: Selective',
    activeIngredient: 'Bisoprolol',
    medicineNameAndStrength: 'Adco-Bisocor 5mg; 10mg',
  },
  
  // Cardiomyopathy
  {
    condition: 'Cardiomyopathy',
    cdaCorePrioritySaver: 'R 65.00',
    cdaExecutiveComprehensive: 'R 75.00',
    medicineClass: 'ACE inhibitors: Plain',
    activeIngredient: 'Enalapril',
    medicineNameAndStrength: 'Enalapril Arya 5mg; 10mg; 20mg',
  },
  {
    condition: 'Cardiomyopathy',
    cdaCorePrioritySaver: 'R 220.00',
    cdaExecutiveComprehensive: 'R 220.00',
    medicineClass: 'Alpha and Beta blocking agents',
    activeIngredient: 'Carvedilol',
    medicineNameAndStrength: 'Carloc 6.25mg; 12.5mg; 25mg',
  },
  {
    condition: 'Cardiomyopathy',
    cdaCorePrioritySaver: 'R 20.00',
    cdaExecutiveComprehensive: 'R 40.00',
    medicineClass: 'High-ceiling diuretics',
    activeIngredient: 'Furosemide',
    medicineNameAndStrength: 'Defulide 40mg',
  },
  
  // Cardiac Failure
  {
    condition: 'Cardiac Failure',
    cdaCorePrioritySaver: 'R 65.00',
    cdaExecutiveComprehensive: 'R 75.00',
    medicineClass: 'ACE inhibitors: Plain',
    activeIngredient: 'Enalapril',
    medicineNameAndStrength: 'Enalapril Arya 5mg; 10mg; 20mg',
  },
  {
    condition: 'Cardiac Failure',
    cdaCorePrioritySaver: 'R 220.00',
    cdaExecutiveComprehensive: 'R 220.00',
    medicineClass: 'Alpha and Beta blocking agents',
    activeIngredient: 'Carvedilol',
    medicineNameAndStrength: 'Carloc 6.25mg; 12.5mg; 25mg',
  },
  {
    condition: 'Cardiac Failure',
    cdaCorePrioritySaver: 'R 20.00',
    cdaExecutiveComprehensive: 'R 40.00',
    medicineClass: 'High-ceiling diuretics',
    activeIngredient: 'Furosemide',
    medicineNameAndStrength: 'Furobe 40mg',
  },
  {
    condition: 'Cardiac Failure',
    cdaCorePrioritySaver: 'R 120.00',
    cdaExecutiveComprehensive: 'R 120.00',
    medicineClass: 'Potassium sparing agents',
    activeIngredient: 'Spironolactone',
    medicineNameAndStrength: 'Aldactone 25mg',
  },
  
  // Diabetes Mellitus Type 1
  {
    condition: 'Diabetes Mellitus Type 1',
    cdaCorePrioritySaver: 'R 395.00',
    cdaExecutiveComprehensive: 'R 400.00',
    medicineClass: 'Anti-diabetic agents: Fast-acting Insulins',
    activeIngredient: 'Insulin Aspart',
    medicineNameAndStrength: 'Novorapid - penfill 3ml',
  },
  {
    condition: 'Diabetes Mellitus Type 1',
    cdaCorePrioritySaver: 'R 440.00',
    cdaExecutiveComprehensive: 'R 440.00',
    medicineClass: 'Anti-diabetic agents: Long-acting Insulins',
    activeIngredient: 'Insulin Glargine',
    medicineNameAndStrength: 'Optisulin - cartridge 3ml',
  },
  
  // Diabetes Mellitus Type 2
  {
    condition: 'Diabetes Mellitus Type 2',
    cdaCorePrioritySaver: 'R 50.00',
    cdaExecutiveComprehensive: 'R 50.00',
    medicineClass: 'Anti-diabetic agents: Biguanides',
    activeIngredient: 'Metformin',
    medicineNameAndStrength: 'Accord Metformin 500mg; 850mg',
  },
  {
    condition: 'Diabetes Mellitus Type 2',
    cdaCorePrioritySaver: 'R 125.00',
    cdaExecutiveComprehensive: 'R 125.00',
    medicineClass: 'Anti-diabetic agents: Sulfonamides, urea derivatives',
    activeIngredient: 'Gliclazide',
    medicineNameAndStrength: 'Dynacaz MR 30mg; 60mg; 90mg',
  },
  {
    condition: 'Diabetes Mellitus Type 2',
    cdaCorePrioritySaver: 'R 395.00',
    cdaExecutiveComprehensive: 'R 400.00',
    medicineClass: 'Anti-diabetic agents: Fast-acting Insulins',
    activeIngredient: 'Insulin Aspart',
    medicineNameAndStrength: 'Novorapid - penfill 3ml',
  },
  
  // Haemophilia
  {
    condition: 'Haemophilia',
    cdaCorePrioritySaver: 'R 5.00',
    cdaExecutiveComprehensive: 'R 5.00',
    medicineClass: 'Analgesics: Paracetamol',
    activeIngredient: 'Paracetamol',
    medicineNameAndStrength: 'Adco-Napamol bucket 500mg',
  },
  {
    condition: 'Haemophilia',
    cdaCorePrioritySaver: 'R 440.00',
    cdaExecutiveComprehensive: 'R 440.00',
    medicineClass: 'Anti-fibrinolytics: Amino acids',
    activeIngredient: 'Tranexamic acid',
    medicineNameAndStrength: 'Emkapron 500mg',
  },
  {
    condition: 'Haemophilia',
    cdaCorePrioritySaver: 'R50 000',
    cdaExecutiveComprehensive: 'R50 000',
    medicineClass: 'Blood coagulation factors',
    activeIngredient: 'Coagulation factor VIII',
    medicineNameAndStrength: 'Haemosolvate VIII 300U; 500U; 1000U',
  },
];

export const getMedicationsByCondition = (condition: string): Medication[] => {
  return medicationsData.filter(
    m => m.condition.toLowerCase() === condition.toLowerCase()
  );
};

export const getMedicationsByConditionAndPlan = (
  condition: string,
  plan: 'Core' | 'Priority' | 'Saver' | 'Executive' | 'Comprehensive'
): Medication[] => {
  const allMeds = getMedicationsByCondition(condition);
  
  // Filter out medications that explicitly exclude the plan
  return allMeds.filter(med => {
    const exclusionNote = med.medicineNameAndStrength.toLowerCase();
    
    if (plan === 'Core' || plan === 'Priority' || plan === 'Saver') {
      return !exclusionNote.includes('only executive and comprehensive');
    }
    
    if (plan === 'Executive' || plan === 'Comprehensive') {
      return !exclusionNote.includes('not available on keycare');
    }
    
    return true;
  });
};

