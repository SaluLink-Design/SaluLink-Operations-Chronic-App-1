import { ChronicCondition, ICDCode } from '@/types';

// Parsed from Chronic Conditions.csv
export const chronicConditionsData: ChronicCondition[] = [
  {
    name: 'Asthma',
    icdCodes: [
      { code: 'J45.0', description: 'Predominantly allergic asthma' },
      { code: 'J45.1', description: 'Nonallergic asthma' },
      { code: 'J45.8', description: 'Mixed asthma' },
      { code: 'J45.9', description: 'Asthma, unspecified' },
      { code: 'J46', description: 'Status asthmaticus' },
    ],
  },
  {
    name: 'Chronic Renal Disease',
    icdCodes: [
      { code: 'I12.0', description: 'Hypertensive renal disease with renal failure' },
      { code: 'I13.1', description: 'Hypertensive heart and renal disease with renal failure' },
      { code: 'I13.2', description: 'Hypertensive heart and renal disease with both (congestive) heart failure and renal failure' },
      { code: 'N03.0', description: 'Chronic nephritic syndrome, minor glomerular abnormality' },
      { code: 'N03.1', description: 'Chronic nephritic syndrome, focal and segmental glomerular lesions' },
      { code: 'N18.0', description: 'End-stage renal disease' },
      { code: 'N18.1', description: 'Chronic kidney disease, stage 1' },
      { code: 'N18.2', description: 'Chronic kidney disease, stage 2' },
      { code: 'N18.3', description: 'Chronic kidney disease, stage 3' },
      { code: 'N18.4', description: 'Chronic kidney disease, stage 4' },
      { code: 'N18.5', description: 'Chronic kidney disease, stage 5' },
    ],
  },
  {
    name: 'Haemophilia',
    icdCodes: [
      { code: 'D66', description: 'Hereditary factor VIII deficiency' },
      { code: 'D67', description: 'Hereditary factor IX deficiency' },
    ],
  },
  {
    name: 'Hyperlipidaemia',
    icdCodes: [
      { code: 'E78.0', description: 'Pure hypercholesterolaemia' },
      { code: 'E78.1', description: 'Pure hyperglyceridaemia' },
      { code: 'E78.2', description: 'Mixed hyperlipidaemia' },
      { code: 'E78.3', description: 'Hyperchylomicronaemia' },
      { code: 'E78.4', description: 'Other hyperlipidaemia' },
      { code: 'E78.5', description: 'Hyperlipidaemia, unspecified' },
    ],
  },
  {
    name: 'Cardiomyopathy',
    icdCodes: [
      { code: 'I25.5', description: 'Ischaemic cardiomyopathy' },
      { code: 'I42.0', description: 'Dilated cardiomyopathy' },
      { code: 'I42.1', description: 'Obstructive hypertrophic cardiomyopathy' },
      { code: 'I42.2', description: 'Other hypertrophic cardiomyopathy' },
      { code: 'I42.9', description: 'Cardiomyopathy, unspecified' },
    ],
  },
  {
    name: 'Hypertension',
    icdCodes: [
      { code: 'I10', description: 'Essential (primary) hypertension' },
      { code: 'I11.0', description: 'Hypertensive heart disease with (congestive) heart failure' },
      { code: 'I11.9', description: 'Hypertensive heart disease without (congestive) heart failure' },
      { code: 'I12.0', description: 'Hypertensive renal disease with renal failure' },
      { code: 'I12.9', description: 'Hypertensive renal disease without renal failure' },
      { code: 'I13.0', description: 'Hypertensive heart and renal disease with (congestive) heart failure' },
      { code: 'I15.0', description: 'Renovascular hypertension' },
    ],
  },
  {
    name: 'Cardiac Failure',
    icdCodes: [
      { code: 'I11.0', description: 'Hypertensive heart disease with (congestive) heart failure' },
      { code: 'I13.0', description: 'Hypertensive heart and renal disease with (congestive) heart failure' },
      { code: 'I13.2', description: 'Hypertensive heart and renal disease with both (congestive) heart failure and renal failure' },
      { code: 'I50.0', description: 'Congestive heart failure' },
      { code: 'I50.1', description: 'Left ventricular failure' },
      { code: 'I50.9', description: 'Heart failure, unspecified' },
    ],
  },
  {
    name: 'Diabetes Mellitus Type 1',
    icdCodes: [
      { code: 'E10.0', description: 'Insulin-dependent diabetes mellitus with coma' },
      { code: 'E10.1', description: 'Insulin-dependent diabetes mellitus with ketoacidosis' },
      { code: 'E10.2', description: 'Insulin-dependent diabetes mellitus with renal complications' },
      { code: 'E10.3', description: 'Insulin-dependent diabetes mellitus with ophthalmic complications' },
      { code: 'E10.4', description: 'Insulin-dependent diabetes mellitus with neurological complications' },
      { code: 'E10.9', description: 'Insulin-dependent diabetes mellitus without complications' },
    ],
  },
  {
    name: 'Diabetes Mellitus Type 2',
    icdCodes: [
      { code: 'E11.0', description: 'Non-insulin-dependent diabetes mellitus with coma' },
      { code: 'E11.1', description: 'Non-insulin-dependent diabetes mellitus with ketoacidosis' },
      { code: 'E11.2', description: 'Non-insulin-dependent diabetes mellitus with renal complications' },
      { code: 'E11.3', description: 'Non-insulin-dependent diabetes mellitus with ophthalmic complications' },
      { code: 'E11.4', description: 'Non-insulin-dependent diabetes mellitus with neurological complications' },
      { code: 'E11.9', description: 'Non-insulin-dependent diabetes mellitus without complications' },
    ],
  },
];

export const getConditionByName = (name: string): ChronicCondition | undefined => {
  return chronicConditionsData.find(
    c => c.name.toLowerCase() === name.toLowerCase()
  );
};

export const getAllConditionNames = (): string[] => {
  return chronicConditionsData.map(c => c.name);
};

