const fs = require('fs');
const path = require('path');

function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

function parseChronicConditions() {
  const csvPath = path.join(__dirname, '..', 'Chronic Conditions.csv');
  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());

  const conditionsMap = new Map();

  for (let i = 1; i < lines.length; i++) {
    const [condition, code, description] = parseCsvLine(lines[i]);

    if (!condition || !code) continue;

    if (!conditionsMap.has(condition)) {
      conditionsMap.set(condition, []);
    }

    conditionsMap.get(condition).push({
      code: code,
      description: description || ''
    });
  }

  const result = Array.from(conditionsMap.entries()).map(([name, icdCodes]) => ({
    name,
    icdCodes
  }));

  return result;
}

function parseMedicationsList() {
  const csvPath = path.join(__dirname, '..', 'Medicine List.csv');
  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());

  const medications = [];

  for (let i = 1; i < lines.length; i++) {
    const parts = parseCsvLine(lines[i]);

    if (parts.length < 6) continue;

    const [condition, cdaCore, cdaExec, medicineClass, activeIngredient, medicineNameAndStrength] = parts;

    if (!condition || !medicineNameAndStrength) continue;

    medications.push({
      condition: condition.trim(),
      cdaCorePrioritySaver: cdaCore.trim(),
      cdaExecutiveComprehensive: cdaExec.trim(),
      medicineClass: medicineClass.trim(),
      activeIngredient: activeIngredient.trim(),
      medicineNameAndStrength: medicineNameAndStrength.trim()
    });
  }

  return medications;
}

function generateChronicConditionsFile(data) {
  const output = `import { ChronicCondition, ICDCode } from '@/types';

// Parsed from Chronic Conditions.csv - Complete dataset
export const chronicConditionsData: ChronicCondition[] = ${JSON.stringify(data, null, 2)};

export const getConditionByName = (name: string): ChronicCondition | undefined => {
  return chronicConditionsData.find(
    c => c.name.toLowerCase() === name.toLowerCase()
  );
};

export const getAllConditionNames = (): string[] => {
  return chronicConditionsData.map(c => c.name);
};
`;

  const outputPath = path.join(__dirname, '..', 'lib', 'data', 'chronicConditions.ts');
  fs.writeFileSync(outputPath, output, 'utf-8');
  console.log(`✓ Generated chronicConditions.ts with ${data.length} conditions`);
}

function generateMedicationsFile(data) {
  const output = `import { Medication } from '@/types';

// Parsed from Medicine List.csv - Complete dataset
export const medicationsData: Medication[] = ${JSON.stringify(data, null, 2)};

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
`;

  const outputPath = path.join(__dirname, '..', 'lib', 'data', 'medications.ts');
  fs.writeFileSync(outputPath, output, 'utf-8');
  console.log(`✓ Generated medications.ts with ${data.length} medications`);
}

try {
  console.log('Parsing CSV files...\n');

  const conditions = parseChronicConditions();
  generateChronicConditionsFile(conditions);

  const medications = parseMedicationsList();
  generateMedicationsFile(medications);

  console.log('\n✓ All CSV data parsed successfully!');
} catch (error) {
  console.error('Error parsing CSV files:', error);
  process.exit(1);
}
