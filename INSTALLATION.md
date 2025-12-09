# Installation Guide - SaluLink Chronic Treatment App

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 9.0.0 or higher) or **yarn** (version 1.22.0 or higher)
- **Git** (for cloning the repository)

## Step-by-Step Installation

### 1. Clone or Navigate to the Project

If you're starting fresh, the project files are already in your current directory:

```bash
cd "/Users/tjmoipolai/Documents/SaluLink App Building/SaluLink Operations App/Chronic App 1"
```

### 2. Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install:

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Lucide React (icons)
- And other dependencies

### 3. Verify Installation

Check that all dependencies are installed correctly:

```bash
npm list --depth=0
```

### 4. Start the Development Server

Run the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 5. Build for Production (Optional)

To create an optimized production build:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

## Project Structure Overview

```
Chronic App 1/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main application page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── Sidebar.tsx              # Navigation sidebar
│   └── workflow/                # Workflow step components
│       ├── ClinicalNoteInput.tsx
│       ├── ConditionConfirmation.tsx
│       ├── ICDCodeSelection.tsx
│       ├── DiagnosticBasket.tsx
│       ├── TreatmentDocumentation.tsx
│       ├── MedicationSelection.tsx
│       ├── ClaimSummary.tsx
│       └── OngoingManagement.tsx
├── lib/                         # Business logic and utilities
│   ├── store.ts                 # Zustand state management
│   ├── data/                    # Dataset parsers
│   │   ├── chronicConditions.ts
│   │   ├── treatmentBaskets.ts
│   │   └── medications.ts
│   └── services/
│       └── authiService.ts      # Authi 1.0 integration
├── types/                       # TypeScript definitions
│   └── index.ts
├── public/                      # Static assets
├── Authi 1.0.ipynb             # Original Authi notebook
├── Chronic Conditions.csv       # ICD-10 codes dataset
├── Medicine List.csv            # Medications dataset
├── Treatment Basket.csv         # Treatment protocols dataset
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── next.config.js              # Next.js configuration
└── README.md                   # Documentation
```

## Data Files

The application uses three CSV datasets that are already included:

1. **Chronic Conditions.csv** - Maps chronic conditions to ICD-10 codes
2. **Treatment Basket.csv** - Defines diagnostic and ongoing management protocols
3. **Medicine List.csv** - Contains medication details with CDA values

These files are parsed and loaded automatically by the application.

## Configuration

### Tailwind CSS

The app uses Tailwind CSS for styling. The configuration is in `tailwind.config.js`:

- Custom color palette (primary purple theme)
- Extended font families (Inter, Instrument Sans)
- Responsive breakpoints

### TypeScript

TypeScript is configured in `tsconfig.json` with:

- Strict mode enabled
- Path aliases (`@/*` for root imports)
- Next.js plugin integration

### State Management

Zustand is used for state management with:

- Persistent storage (localStorage)
- Type-safe store
- Workflow navigation logic

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
npm run dev -- -p 3001
```

### Module Not Found Errors

If you encounter module not found errors, try:

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

If you see TypeScript errors, ensure your TypeScript version is correct:

```bash
npm install -D typescript@latest
```

### Build Errors

Clear the Next.js cache:

```bash
rm -rf .next
npm run build
```

## Development Workflow

### Making Changes

1. Edit files in `components/`, `lib/`, or `app/`
2. The development server will hot-reload automatically
3. Check the browser console for any errors

### Adding New Conditions

To add support for new chronic conditions:

1. Update `lib/data/chronicConditions.ts`
2. Add treatment basket in `lib/data/treatmentBaskets.ts`
3. Add medications in `lib/data/medications.ts`
4. Update the condition list in `authiService.ts`

### Styling

Use Tailwind CSS utility classes:

```tsx
<div className="bg-white rounded-lg border border-gray-200 p-6">
  <h2 className="text-lg font-semibold text-gray-900 mb-4">Title</h2>
</div>
```

## Next Steps

After installation:

1. **Test the Workflow**: Create a new case and go through all steps
2. **Review the Data**: Check the CSV files to understand the data structure
3. **Customize**: Modify colors, fonts, or layouts as needed
4. **Backend Integration**: Connect to a Python backend for actual ClinicalBERT processing

## Support

For issues or questions:

1. Check the README.md for feature documentation
2. Review the code comments in key files
3. Contact the SaluLink development team

## License

Proprietary - SaluLink Operations

---

**Installation Complete!** You're now ready to use the SaluLink Chronic Treatment App.
