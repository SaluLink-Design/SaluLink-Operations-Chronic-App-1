# Quick Start Guide - SaluLink Chronic Treatment App

Get up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Terminal/Command Prompt access

## Installation (2 minutes)

```bash
# Navigate to project directory
cd "/Users/tjmoipolai/Documents/SaluLink App Building/SaluLink Operations App/Chronic App 1"

# Install dependencies
npm install
```

## Start the App (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Try It Out (2 minutes)

### 1. Create Your First Case

Click **"New Case"** button (top right)

### 2. Enter a Sample Clinical Note

Paste this example:

```
Patient presents with persistent hypertension. BP readings: 
150/95 mmHg. History of elevated cholesterol. Currently on 
no chronic medication. Physical exam unremarkable. ECG normal.
```

Click **"Analyze Note"**

### 3. Follow the Workflow

1. **Confirm Condition**: Select "Hypertension"
2. **Select ICD-10**: Choose "I10 - Essential (primary) hypertension"
3. **Diagnostic Basket**: Select "ECG – Electrocardiogram" and "Glucose – random/fasting"
4. **Document**: Add notes like "ECG shows normal sinus rhythm"
5. **Medications**:
   - Select plan: "Core"
   - Choose "Enalapril Arya 10mg"
   - Add note: "First-line therapy for essential hypertension"
6. **Review Summary**: Check all details
7. **Save**: Click "Save Case"

## What's Next?

- Read the full [USAGE_GUIDE.md](./USAGE_GUIDE.md) for detailed instructions
- Explore [INSTALLATION.md](./INSTALLATION.md) for configuration options
- Check [README.md](./README.md) for technical documentation

## Need Help?

- Check browser console (F12) for errors
- Verify all dependencies installed: `npm list --depth=0`
- Restart dev server: Stop (Ctrl+C) and run `npm run dev` again

## Key Features to Try

✅ **Multiple Conditions**: Try different clinical notes (diabetes, asthma, etc.)  
✅ **Plan Filtering**: Switch between medical scheme plans  
✅ **Case Management**: Save and reload cases from sidebar  
✅ **Documentation**: Upload images and add clinical notes  
✅ **Export**: Generate claim summaries  

## Supported Conditions

- Asthma
- Chronic Renal Disease
- Haemophilia
- Hyperlipidaemia
- Cardiomyopathy
- Hypertension ✓ (Try this first!)
- Cardiac Failure
- Diabetes Mellitus Type 1
- Diabetes Mellitus Type 2

## Common Issues

**Port 3000 in use?**

```bash
npm run dev -- -p 3001
```

**Dependencies error?**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Page not loading?**

- Check terminal for errors
- Ensure Node.js 18+ is installed: `node --version`

---

**You're all set!** Start building chronic treatment claims with Authi 1.0 🚀
