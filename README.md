# SaluLink Chronic Treatment App

A comprehensive medical workflow system designed to automate and standardize chronic disease treatment protocols for doctors. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Overview

The SaluLink Chronic Treatment App integrates **ClinicalBERT** for condition extraction and **Authi 1.0** for ICD-10 code mapping, treatment protocol generation, and medication recommendations. It guides doctors through a structured workflow from clinical note analysis to complete claim submission.

## Features

### Core Functionality

- **ClinicalBERT Integration**: Automated extraction and identification of chronic conditions from free-text clinical notes
- **Authi 1.0 Engine**: Authoritative data mapping for ICD-10 codes, treatment baskets, and medications
- **Multi-Step Guided Workflow**: Structured process from diagnosis to claim generation
- **Treatment Protocols**: Automated diagnostic and ongoing management basket generation
- **Medication Management**: Plan-specific medication selection with CDA alignment
- **Documentation System**: Comprehensive documentation with image upload and clinical notes
- **Case Management**: Save, load, and manage multiple patient cases
- **Claim Export**: Generate and export complete claim summaries

### Supported Chronic Conditions

1. Asthma
2. Chronic Renal Disease
3. Haemophilia
4. Hyperlipidaemia
5. Cardiomyopathy
6. Hypertension
7. Cardiac Failure
8. Diabetes Mellitus Type 1
9. Diabetes Mellitus Type 2

## Workflow Steps

1. **Clinical Note Input**: Enter patient's clinical observations and history
2. **Analyze Note**: ClinicalBERT extracts potential chronic conditions
3. **Confirm Condition**: Review and confirm the correct diagnosis
4. **ICD-10 Code Selection**: Select applicable ICD-10 codes from Authi 1.0
5. **Diagnostic Basket**: Choose diagnostic procedures performed
6. **Treatment Documentation**: Document each treatment with images and notes
7. **Medication Selection**: Select medications with plan filtering
8. **Claim Summary**: Review and export complete claim

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **Icons**: Lucide React
- **Data Sources**: CSV datasets (Chronic Conditions, Treatment Baskets, Medicine List)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd "Chronic App 1"
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles
├── components/
│   ├── Sidebar.tsx         # Navigation sidebar
│   └── workflow/           # Workflow step components
│       ├── ClinicalNoteInput.tsx
│       ├── ConditionConfirmation.tsx
│       ├── ICDCodeSelection.tsx
│       ├── DiagnosticBasket.tsx
│       ├── TreatmentDocumentation.tsx
│       ├── MedicationSelection.tsx
│       └── ClaimSummary.tsx
├── lib/
│   ├── store.ts            # Zustand state management
│   ├── data/               # Dataset parsers
│   │   ├── chronicConditions.ts
│   │   ├── treatmentBaskets.ts
│   │   └── medications.ts
│   └── services/
│       └── authiService.ts # Authi 1.0 integration
├── types/
│   └── index.ts            # TypeScript type definitions
└── public/                 # Static assets
```

## Data Sources

The app uses three authoritative CSV datasets:

1. **Chronic Conditions.csv**: Maps conditions to ICD-10 codes
2. **Treatment Basket.csv**: Defines diagnostic and ongoing management protocols
3. **Medicine List.csv**: Contains medication details with plan-specific CDA values

## Key Components

### Authi 1.0 Service

The `authiService` provides:

- Condition extraction using ClinicalBERT simulation
- ICD-10 code mapping
- Treatment basket retrieval
- Medication recommendations
- Claim summary generation

### State Management

Zustand store manages:

- Current case data
- Workflow navigation
- Saved cases with persistence
- Step-specific actions

## Future Enhancements

- **Backend Integration**: Connect to actual ClinicalBERT Python backend
- **PDF Generation**: Enhanced PDF export with formatting
- **Referral System**: Complete referral workflow implementation
- **Ongoing Management**: Full ongoing management basket workflow
- **Authentication**: User authentication and authorization
- **Medical Aid Integration**: Direct submission to medical schemes
- **Analytics Dashboard**: Case statistics and reporting

## Contributing

This is a specialized medical application. Please ensure all contributions maintain:

- Medical accuracy and compliance
- Data integrity and validation
- User privacy and security
- Comprehensive documentation

## License

Proprietary - SaluLink Operations

## Support

For support, please contact the SaluLink development team.

---

**Note**: This application is designed for use by qualified medical professionals only. All clinical decisions should be made by licensed practitioners following appropriate medical guidelines and protocols.
