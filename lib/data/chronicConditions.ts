import { ChronicCondition, ICDCode } from '@/types';

// Parsed from Chronic Conditions.csv - Complete dataset
export const chronicConditionsData: ChronicCondition[] = [
  {
    "name": "Asthma",
    "icdCodes": [
      {
        "code": "J45.0",
        "description": "Predominantly allergic asthma"
      },
      {
        "code": "J45.1",
        "description": "Nonallergic asthma"
      },
      {
        "code": "J45.8",
        "description": "Mixed asthma"
      },
      {
        "code": "J45.9",
        "description": "Asthma, unspecified"
      },
      {
        "code": "J46",
        "description": "Status asthmaticus"
      }
    ]
  },
  {
    "name": "Chronic Renal Disease",
    "icdCodes": [
      {
        "code": "I12.0",
        "description": "Hypertensive renal disease with renal failure"
      },
      {
        "code": "I13.1",
        "description": "Hypertensive heart and renal disease with renal failure"
      },
      {
        "code": "I13.2",
        "description": "Hypertensive heart and renal disease with both (congestive) heart failure and renal failure"
      },
      {
        "code": "N03.0",
        "description": "Chronic nephritic syndrome, minor glomerular abnormality"
      },
      {
        "code": "N03.1",
        "description": "Chronic nephritic syndrome, focal and segmental glomerular lesions"
      },
      {
        "code": "N03.2",
        "description": "Chronic nephritic syndrome, diffuse membranous glomerulonephritis"
      },
      {
        "code": "N03.3",
        "description": "Chronic nephritic syndrome, diffuse mesangial proliferative glomerulonephritis"
      },
      {
        "code": "N03.4",
        "description": "Chronic nephritic syndrome, diffuse endocapillary proliferative glomerulonephritis"
      },
      {
        "code": "N03.5",
        "description": "Chronic nephritic syndrome, diffuse mesangiocapillary glomerulonephritis"
      },
      {
        "code": "N03.6",
        "description": "Chronic nephritic syndrome, dense deposit disease"
      },
      {
        "code": "N03.7",
        "description": "Chronic nephritic syndrome, diffuse crescentic glomerulonephritis"
      },
      {
        "code": "N03.8",
        "description": "Chronic nephritic syndrome, other"
      },
      {
        "code": "N03.9",
        "description": "Chronic nephritic syndrome, unspecified"
      },
      {
        "code": "N11.0",
        "description": "Nonobstructive reflux-associated chronic pyelonephritis"
      },
      {
        "code": "N11.1",
        "description": "Chronic obstructive pyelonephritis"
      },
      {
        "code": "N11.8",
        "description": "Other chronic tubulo-interstitial nephritis"
      },
      {
        "code": "N11.9",
        "description": "Chronic tubulo-interstitial nephritis, unspecified"
      },
      {
        "code": "N18.0",
        "description": "End-stage renal disease"
      },
      {
        "code": "N18.1",
        "description": "Chronic kidney disease, stage 1"
      },
      {
        "code": "N18.2",
        "description": "Chronic kidney disease, stage 2"
      },
      {
        "code": "N18.3",
        "description": "Chronic kidney disease, stage 3"
      },
      {
        "code": "N18.4",
        "description": "Chronic kidney disease, stage 4"
      },
      {
        "code": "N18.5",
        "description": "Chronic kidney disease, stage 5"
      },
      {
        "code": "N18.8",
        "description": "Other chronic renal failure"
      },
      {
        "code": "N18.8+I32.8*",
        "description": "Other chronic renal failure / Pericarditis in other diseases classified elsewhere"
      },
      {
        "code": "N18.9",
        "description": "Chronic renal failure, unspecified"
      },
      {
        "code": "N25.0",
        "description": "Renal osteodystrophy"
      },
      {
        "code": "O10.3",
        "description": "Pre-existing hypertensive heart and renal disease complicating pregnancy, childbirth and the puerperium"
      },
      {
        "code": "O10.2",
        "description": "Pre-existing hypertensive renal disease complicating pregnancy, childbirth and the puerperium"
      }
    ]
  },
  {
    "name": "Haemophilia",
    "icdCodes": [
      {
        "code": "D66",
        "description": "Hereditary factor VIII deficiency"
      },
      {
        "code": "D67",
        "description": "Hereditary factor IX deficiency"
      }
    ]
  },
  {
    "name": "Hyperlipidaemia",
    "icdCodes": [
      {
        "code": "E78.0",
        "description": "Pure hypercholesterolaemia"
      },
      {
        "code": "E78.1",
        "description": "Pure hyperglyceridaemia"
      },
      {
        "code": "E78.2",
        "description": "Mixed hyperlipidaemia"
      },
      {
        "code": "E78.3",
        "description": "Hyperchylomicronaemia"
      },
      {
        "code": "E78.4",
        "description": "Other hyperlipidaemia"
      },
      {
        "code": "E78.5",
        "description": "Hyperlipidaemia, unspecified"
      }
    ]
  },
  {
    "name": "Cardiomyopathy",
    "icdCodes": [
      {
        "code": "I25.5",
        "description": "Ischaemic cardiomyopathy"
      },
      {
        "code": "I42.0",
        "description": "Dilated cardiomyopathy"
      },
      {
        "code": "I42.1",
        "description": "Obstructive hypertrophic cardiomyopathy"
      },
      {
        "code": "I42.2",
        "description": "Other hypertrophic cardiomyopathy"
      },
      {
        "code": "I42.3",
        "description": "Endomyocardial (eosinophilic) disease"
      },
      {
        "code": "I42.4",
        "description": "Endocardial fibroelastosis"
      },
      {
        "code": "I42.5",
        "description": "Other restrictive cardiomyopathy"
      },
      {
        "code": "I42.6",
        "description": "Alcoholic cardiomyopathy"
      },
      {
        "code": "I42.7",
        "description": "Cardiomyopathy due to drugs and other external agents"
      },
      {
        "code": "I42.8",
        "description": "Other cardiomyopathies"
      },
      {
        "code": "I42.9",
        "description": "Cardiomyopathy, unspecified"
      }
    ]
  },
  {
    "name": "Hypertension",
    "icdCodes": [
      {
        "code": "I10",
        "description": "Essential (primary) hypertension"
      },
      {
        "code": "I11.0",
        "description": "Hypertensive heart disease with (congestive) heart failure"
      },
      {
        "code": "I11.9",
        "description": "Hypertensive heart disease without (congestive) heart failure"
      },
      {
        "code": "I12.0",
        "description": "Hypertensive renal disease with renal failure"
      },
      {
        "code": "I12.9",
        "description": "Hypertensive renal disease without renal failure"
      },
      {
        "code": "I13.0",
        "description": "Hypertensive heart and renal disease with (congestive) heart failure"
      },
      {
        "code": "I13.1",
        "description": "Hypertensive heart and renal disease with renal failure"
      },
      {
        "code": "I13.2",
        "description": "Hypertensive heart and renal disease with both (congestive) heart failure and renal failure"
      },
      {
        "code": "I13.9",
        "description": "Hypertensive heart and renal disease, unspecified"
      },
      {
        "code": "I15.0",
        "description": "Renovascular hypertension"
      },
      {
        "code": "I15.1",
        "description": "Hypertension secondary to other renal disorders"
      },
      {
        "code": "I15.2",
        "description": "Hypertension secondary to endocrine disorders"
      },
      {
        "code": "I15.8",
        "description": "Other secondary hypertension"
      },
      {
        "code": "I15.9",
        "description": "Secondary hypertension, unspecified"
      },
      {
        "code": "O10.0",
        "description": "Pre-existing essential hypertension complicating pregnancy, childbirth and the puerperium"
      },
      {
        "code": "O10.1",
        "description": "Pre-existing hypertensive heart disease complicating pregnancy, childbirth and the puerperium"
      },
      {
        "code": "O10.2",
        "description": "Pre-existing hypertensive renal disease complicating pregnancy, childbirth and the puerperium"
      },
      {
        "code": "O10.3",
        "description": "Pre-existing hypertensive heart and renal disease complicating pregnancy, childbirth and the puerperium"
      },
      {
        "code": "O10.4",
        "description": "Pre-existing secondary hypertension complicating pregnancy, childbirth and the puerperium"
      },
      {
        "code": "O10.9",
        "description": "Unspecified pre-existing hypertension complicating pregnancy, childbirth and the puerperium"
      },
      {
        "code": "O11",
        "description": "Pre-existing hypertensive disorder with superimposed proteinuria"
      },
      {
        "code": "O13",
        "description": "Gestational [pregnancy-induced] hypertension"
      },
      {
        "code": "O16",
        "description": "Unspecified maternal hypertension"
      }
    ]
  },
  {
    "name": "Cardiac Failure",
    "icdCodes": [
      {
        "code": "I11.0",
        "description": "Hypertensive heart disease with (congestive) heart failure"
      },
      {
        "code": "I13.0",
        "description": "Hypertensive heart and renal disease with (congestive) heart failure"
      },
      {
        "code": "I13.2",
        "description": "Hypertensive heart and renal disease with both (congestive) heart failure and renal failure"
      },
      {
        "code": "I50.0",
        "description": "Congestive heart failure"
      },
      {
        "code": "I50.1",
        "description": "Left ventricular failure"
      },
      {
        "code": "I50.9",
        "description": "Heart failure, unspecified"
      }
    ]
  },
  {
    "name": "Diabetes Mellitus Type 1",
    "icdCodes": [
      {
        "code": "G59.0",
        "description": "Diabetic mononeuropathy (E10-E14+ with common fourth character .4)"
      },
      {
        "code": "G63.2",
        "description": "Diabetic polyneuropathy (E10-E14+ with common fourth character .4)"
      },
      {
        "code": "E10.0",
        "description": "Insulin-dependent diabetes mellitus with coma"
      },
      {
        "code": "E10.1",
        "description": "Insulin-dependent diabetes mellitus with ketoacidosis"
      },
      {
        "code": "E10.2+I79.2*",
        "description": "Insulin-dependent diabetes mellitus with renal complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E10.2+N08.3*",
        "description": "Insulin-dependent diabetes mellitus with renal complications/Insulin-dependent diabetic nephropathy, intracapillary glomerulonephrosis, Kimmelstiel-Wilson syndrome"
      },
      {
        "code": "E10.3+H28.0*",
        "description": "Insulin-dependent diabetes mellitus with ophthalmic complications/ Diabetic cataract"
      },
      {
        "code": "E10.3+H36.0*",
        "description": "Insulin-dependent diabetes mellitus with ophthalmic complications/ Diabetic retinopathy"
      },
      {
        "code": "E10.3",
        "description": "Insulin-dependent diabetes mellitus with ophthalmic complications/Diabetic retinopathy (E10-E14+ with common fourth character .3)"
      },
      {
        "code": "E10.3+I79.2*",
        "description": "Insulin-dependent diabetes mellitus with ophthalmic complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E10.4+G59.0*",
        "description": "Insulin-dependent diabetes mellitus with neurological complications/ Diabetic mononeuropathy"
      },
      {
        "code": "E10.4+G63.2*",
        "description": "Insulin-dependent diabetes mellitus with neurological complications/ Diabetic polyneuropathy"
      },
      {
        "code": "E10.4",
        "description": "Insulin-dependent diabetes mellitus with neurological complications/Diabetic polyneuropathy (E10-E14+ with common fourth character .4)"
      },
      {
        "code": "E10.4+G73.0*",
        "description": "Insulin-dependent diabetes mellitus with neurological complications/ Diabetic amyotrophy"
      },
      {
        "code": "E10.4+G99.0*",
        "description": "Insulin-dependent diabetes mellitus with neurological complications/Daibeteic autonomic neuropathy and or Diabetic autonomic polyneuropathy"
      },
      {
        "code": "E10.4+I79.2*",
        "description": "Insulin-dependent diabetes mellitus with neurological complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E10.5",
        "description": "Insulin-dependent diabetes mellitus with peripheral circulatory complications"
      },
      {
        "code": "E10.6",
        "description": "Insulin-dependent diabetes mellitus with other specified complications"
      },
      {
        "code": "E10.6+I79.2*",
        "description": "Insulin-dependent diabetes mellitus with other specified complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E10.6+M14.2*",
        "description": "Insulin-dependent diabetes mellitus with other specified complications/Diabetic arthropathy"
      },
      {
        "code": "E10.6+M14.6*",
        "description": "Insulin-dependent diabetes mellitus with other specified complications/Diabetic neuropathic arthropathyarthropathy"
      },
      {
        "code": "E10.7",
        "description": "Insulin-dependent diabetes mellitus with multiple complications"
      },
      {
        "code": "E10.7+I79.2*",
        "description": "Insulin-dependent diabetes mellitus with multiple complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E10.8",
        "description": "Insulin-dependent diabetes mellitus with unspecified complications"
      },
      {
        "code": "E10.8+I79.2*",
        "description": "Insulin-dependent diabetes mellitus with unspecified complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E10.9",
        "description": "Insulin-dependent diabetes mellitus without complications"
      },
      {
        "code": "E10.9+I79.2*",
        "description": "Insulin-dependent diabetes mellitus without complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E12.0",
        "description": "Malnutrition-related diabetes mellitus with coma"
      },
      {
        "code": "E12.1",
        "description": "Malnutrition-related diabetes mellitus with ketoacidosis"
      },
      {
        "code": "E12.2+I79.2*",
        "description": "Malnutrition-related diabetes mellitus with renal complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E12.2+N08.3*",
        "description": "Malnutrition-related diabetes mellitus with renal complications/Insulin-dependent diabetic nephropathy, intracapillary glomerulonephrosis, Kimmelstiel-Wilson syndrome"
      },
      {
        "code": "E12.3+H28.0*",
        "description": "Malnutrition-related diabetes mellitus with ophthalmic complications/ Diabetic cataract"
      },
      {
        "code": "E12.3",
        "description": "Malnutrition-related diabetes mellitus with ophthalmic complications/Diabetic cataract (E10-E14+ with common fourth character .3)"
      },
      {
        "code": "E12.3+H36.0*",
        "description": "Malnutrition-related diabetes mellitus with ophthalmic complications/ Diabetic retinopathy"
      },
      {
        "code": "E12.3+I79.2*",
        "description": "Malnutrition-related diabetes mellitus with ophthalmic complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E12.4+G59.0*",
        "description": "Malnutrition-relatedt diabetes mellitus with neurological complications/ Diabetic mononeuropathy"
      },
      {
        "code": "E12.4+G63.2*",
        "description": "Malnutrition-related diabetes mellitus with neurological complications/Diabetic polyneuropathy (E10-E14+ with common fourth character .4)"
      },
      {
        "code": "E12.4",
        "description": "Malnutrition-related diabetes mellitus with neurological complications"
      },
      {
        "code": "E12.4+G73.0*",
        "description": "Malnutrition-relateddiabetes mellitus with neurological complications/ Diabetic amyotrophy"
      },
      {
        "code": "E12.4+G99.0*",
        "description": "Malnutrition-relateddiabetes mellitus with neurological complications/Daibeteic autonomic neuropathy and or Diabetic autonomic polyneuropathy"
      },
      {
        "code": "E12.4+I79.2*",
        "description": "Malnutrition-related diabetes mellitus with neurological complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E12.5",
        "description": "Malnutrition-related diabetes mellitus with peripheral circulatory complications"
      },
      {
        "code": "E12.5+I79.2*",
        "description": "Malnutrition-related diabetes mellitus with peripheral circulatory complications/ Diabetic peripheral angiopathy"
      },
      {
        "code": "E12.6",
        "description": "Malnutrition-related diabetes mellitus with other specified complications"
      },
      {
        "code": "E12.6+I79.2*",
        "description": "Malnutrition-related diabetes mellitus with other specified complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E12.6+M14.2*",
        "description": "Malnutrition-related  diabetes mellitus with other specified complications/Diabetic arthropathy"
      },
      {
        "code": "E12.6+M14.6*",
        "description": "Malnutrition-related  diabetes mellitus with other specified complications/Diabetic neuropathic arthropathyarthropathy"
      },
      {
        "code": "E12.7",
        "description": "Malnutrition-related diabetes mellitus with multiple complications"
      },
      {
        "code": "E12.7+I79.2*",
        "description": "Malnutrition-related diabetes mellitus with multiple complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E12.8",
        "description": "Malnutrition-related diabetes mellitus with unspecified complications"
      },
      {
        "code": "E12.8+I79.2*",
        "description": "Malnutrition-related diabetes mellitus with unspecified complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E12.9",
        "description": "Malnutrition-related diabetes mellitus without complications"
      },
      {
        "code": "E12.9+I79.2*",
        "description": "Malnutrition-related diabetes mellitus without complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E13.2+I79.2*",
        "description": "Other specified diabetes mellitus with renal complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E13.3",
        "description": "Other specified diabetes mellitus with ophthalmic complications"
      },
      {
        "code": "E13.3+H28.0*",
        "description": "Other specified diabetes mellitus with ophthalmic complications/Diabetic cataract (E10-E14+ with common fourth character .3)"
      },
      {
        "code": "E13.3+H36.0*",
        "description": "Other specified diabetes mellitus with ophthalmic complications/Diabetic retinopathy (E10-E14+ with common fourth character .3)"
      },
      {
        "code": "E13.3+I79.2*",
        "description": "Other specified diabetes mellitus with ophthalmic complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E13.4",
        "description": "Other specified diabetes mellitus - With ophtalmic complication"
      },
      {
        "code": "E13.4+G63.2*",
        "description": "Other specified diabetes mellitus with neurological complications/Diabetic polyneuropathy (E10-E14+ with common fourth character .4)"
      },
      {
        "code": "E13.4+I79.2*",
        "description": "Other specified diabetes mellitus with neurological complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E13.6+I79.2*",
        "description": "Other specified diabetes mellitus with other specified complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E13.7+I79.2*",
        "description": "Other specified diabetes mellitus with multiple complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E13.8+I79.2*",
        "description": "Other specified diabetes mellitus with unspecified complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E13.9+I79.2*",
        "description": "Other specified diabetes mellitus without complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E14.2+I79.2*",
        "description": "Unspecified diabetes mellitus with renal complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E14.2+N08.3*",
        "description": "Unspecified diabetes mellitus with renal complications/Unspecified diabeticnephropathy, intracapillary glomerulonephrosis, Kimmelstiel-Wilson syndrome"
      },
      {
        "code": "E14.3",
        "description": "Unspecified diabetes mellitus with renal complications"
      },
      {
        "code": "E14.3+H28.0*",
        "description": "Unspecified diabetes mellitus - With ophtalmic complications / Diabetic cataract"
      },
      {
        "code": "E14.3+H36.0*",
        "description": "Unspecified diabetes mellitus with ophthalmic complications/Diabetic retinopathy (E10-E14+ with common fourth character .3)"
      },
      {
        "code": "E14.3+I79.2*",
        "description": "Unspecified diabetes mellitus with ophthalmic complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E14.4",
        "description": "Unspecified diabetes mellitus with ophthalmic complications"
      },
      {
        "code": "E14.4+G63.2*",
        "description": "Unspecified diabetes mellitus with neurological complications/Diabetic polyneuropathy (E10-E14+ with common fourth character .4)"
      },
      {
        "code": "E14.4+I79.2*",
        "description": "Unspecified diabetes mellitus with neurological complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E14.6+I79.2*",
        "description": "Unspecified diabetes mellitus with other specified complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E14.7+I79.2*",
        "description": "Unspecified diabetes mellitus with multiple complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E14.8+I79.2*",
        "description": "Unspecified diabetes mellitus with unspecified complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E14.9+I79.2*",
        "description": "Unspecified diabetes mellitus without complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "O24.0",
        "description": "Pre-existing diabetes mellitus, insulin-dependent"
      },
      {
        "code": "O24.2",
        "description": "Pre-existing malnutrition-related diabetes mellitus"
      },
      {
        "code": "O24.3",
        "description": "Pre-existing diabetes mellitus, unspecified"
      },
      {
        "code": "O24.4",
        "description": "Diabetes mellitus arising in pregnancy"
      },
      {
        "code": "O24.9",
        "description": "Diabetes mellitus in pregnancy, unspecified"
      }
    ]
  },
  {
    "name": "Diabetes Mellitus Type 2",
    "icdCodes": [
      {
        "code": "E11.0",
        "description": "Non-insulin-dependent diabetes mellitus with coma"
      },
      {
        "code": "E11.1",
        "description": "Non-insulin-dependent diabetes mellitus with ketoacidosis"
      },
      {
        "code": "E11.2+I79.2*",
        "description": "Non-insulin-dependent diabetes mellitus with renal complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E11.2+N08.3*",
        "description": "Non-insulin-dependent diabetes mellitus with renal complications/Insulin-dependent diabetic nephropathy, intracapillary glomerulonephrosis, Kimmelstiel-Wilson syndrome"
      },
      {
        "code": "E11.3+H28.0*",
        "description": "Non-insulin-dependent diabetes mellitus with ophthalmic complications/ Diabetic cataract"
      },
      {
        "code": "E11.3+H36.0*",
        "description": "Non-insulin-dependent diabetes mellitus with ophthalmic complications/ Diabetic retinopathy"
      },
      {
        "code": "E11.3+I79.2*",
        "description": "Non-insulin-dependent diabetes mellitus with ophthalmic complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E11.4+G59.0*",
        "description": "Non-insulin-dependent diabetes mellitus with neurological complications/ Diabetic mononeuropathy"
      },
      {
        "code": "E11.4+G63.2*",
        "description": "Non-insulin-dependent diabetes mellitus with neurological complications/ Diabetic polyneuropathy"
      },
      {
        "code": "E11.4+G73.0*",
        "description": "Non-insulin-dependent diabetes mellitus with neurological complications/ Diabetic amyotrophy"
      },
      {
        "code": "E11.4+G99.0*",
        "description": "Non-insulin-dependent diabetes mellitus with neurological complications/Daibeteic autonomic neuropathy and or Diabetic autonomic polyneuropathy"
      },
      {
        "code": "E11.4+I79.2*",
        "description": "Non-insulin-dependent diabetes mellitus with neurological complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E11.5",
        "description": "Non-insulin-dependent diabetes mellitus with peripheral circulatory complications"
      },
      {
        "code": "E11.5+I79.2*",
        "description": "Non-insulin-dependent diabetes mellitus with peripheral circulatory complications/ Diabetic peripheral angiopathy"
      },
      {
        "code": "E11.6",
        "description": "Non-insulin-dependent diabetes mellitus with other specified complications"
      },
      {
        "code": "E11.6+I79.2*",
        "description": "Non-insulin-dependent diabetes mellitus with other specified complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E11.6+M14.2*",
        "description": "Non-insulin-dependent diabetes mellitus with other specified complications/Diabetic arthropathy"
      },
      {
        "code": "E11.6+M14.6*",
        "description": "Non-insulin-dependent diabetes mellitus with other specified complications/Diabetic neuropathic arthropathyarthropathy"
      },
      {
        "code": "E11.7",
        "description": "Non-insulin-dependent diabetes mellitus with multiple complications"
      },
      {
        "code": "E11.7+I79.2*",
        "description": "Non-insulin-dependent diabetes mellitus with multiple complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E11.8",
        "description": "Non-insulin-dependent diabetes mellitus with unspecified complications"
      },
      {
        "code": "E11.8+I79.2*",
        "description": "Non-insulin-dependent diabetes mellitus with unspecified complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E11.9",
        "description": "Non-insulin-dependent diabetes mellitus without complications"
      },
      {
        "code": "E11.9+I79.2*",
        "description": "Non-insulin-dependent diabetes mellitus without complications/Peripheral angiopathy in diseases classified elsewhere"
      },
      {
        "code": "E12.0",
        "description": "Malnutrition-related diabetes mellitus with coma"
      },
      {
        "code": "E12.1",
        "description": "Malnutrition-related diabetes mellitus with ketoacidosis"
      },
      {
        "code": "E12.2+N08.3*",
        "description": "Malnutrition-related diabetes mellitus with renal complications/Insulin-dependent diabetic nephropathy, intracapillary glomerulonephrosis, Kimmelstiel-Wilson syndrome"
      },
      {
        "code": "E12.3+H28.0*",
        "description": "Malnutrition-related diabetes mellitus with ophthalmic complications/ Diabetic cataract"
      },
      {
        "code": "E12.3+H36.0*",
        "description": "Malnutrition-related diabetes mellitus with ophthalmic complications/ Diabetic retinopathy"
      },
      {
        "code": "E12.4+G59.0*",
        "description": "Malnutrition-relatedt diabetes mellitus with neurological complications/ Diabetic mononeuropathy"
      },
      {
        "code": "E12.4+G63.2*",
        "description": "Malnutrition-relateddiabetes mellitus with neurological complications/ Diabetic polyneuropathy"
      },
      {
        "code": "E12.4+G73.0*",
        "description": "Malnutrition-relateddiabetes mellitus with neurological complications/ Diabetic amyotrophy"
      },
      {
        "code": "E12.4+G99.0*",
        "description": "Malnutrition-relateddiabetes mellitus with neurological complications/Daibeteic autonomic neuropathy and or Diabetic autonomic polyneuropathy"
      },
      {
        "code": "E12.5",
        "description": "Malnutrition-related diabetes mellitus with peripheral circulatory complications"
      },
      {
        "code": "E12.5+I79.2*",
        "description": "Malnutrition-related diabetes mellitus with peripheral circulatory complications/ Diabetic peripheral angiopathy"
      },
      {
        "code": "E12.6",
        "description": "Malnutrition-related diabetes mellitus with other specified complications"
      },
      {
        "code": "E12.6+M14.2*",
        "description": "Malnutrition-related  diabetes mellitus with other specified complications/Diabetic arthropathy"
      },
      {
        "code": "E12.6+M14.6*",
        "description": "Malnutrition-related  diabetes mellitus with other specified complications/Diabetic neuropathic arthropathyarthropathy"
      },
      {
        "code": "E12.7",
        "description": "Malnutrition-related diabetes mellitus with multiple complications"
      },
      {
        "code": "E12.8",
        "description": "Malnutrition-related diabetes mellitus with unspecified complications"
      },
      {
        "code": "E12.9",
        "description": "Malnutrition-related diabetes mellitus without complications"
      },
      {
        "code": "O24.1",
        "description": "Pre-existing diabetes mellitus, non-insulin-dependent"
      },
      {
        "code": "O24.2",
        "description": "Pre-existing malnutrition-related diabetes mellitus"
      },
      {
        "code": "O24.3",
        "description": "Pre-existing diabetes mellitus, unspecified"
      }
    ]
  }
];

export const getConditionByName = (name: string): ChronicCondition | undefined => {
  return chronicConditionsData.find(
    c => c.name.toLowerCase() === name.toLowerCase()
  );
};

export const getAllConditionNames = (): string[] => {
  return chronicConditionsData.map(c => c.name);
};
