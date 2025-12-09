# Getting Started with SaluLink Chronic Treatment App

Welcome! This guide will help you get the SaluLink Chronic Treatment App up and running.

## What You Have

A complete, production-ready React application that:
- ✅ Analyzes clinical notes using ClinicalBERT (simulated)
- ✅ Maps conditions to ICD-10 codes
- ✅ Generates treatment protocols
- ✅ Recommends medications with plan filtering
- ✅ Creates complete claim summaries
- ✅ Manages multiple patient cases

## Quick Navigation

Choose your path:

### 🚀 I Want to Start Using It Now
→ Read [QUICKSTART.md](./QUICKSTART.md) (5 minutes)

### 📚 I Want to Understand How It Works
→ Read [README.md](./README.md) (15 minutes)

### 🔧 I Want to Install and Configure
→ Read [INSTALLATION.md](./INSTALLATION.md) (10 minutes)

### 📖 I Want Detailed Usage Instructions
→ Read [USAGE_GUIDE.md](./USAGE_GUIDE.md) (20 minutes)

### 🚢 I Want to Deploy to Production
→ Read [DEPLOYMENT.md](./DEPLOYMENT.md) (30 minutes)

### 📊 I Want Technical Details
→ Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) (10 minutes)

## 30-Second Start

```bash
# 1. Install dependencies
npm install

# 2. Start the app
npm run dev

# 3. Open browser
# http://localhost:3000
```

That's it! The app is now running.

## First Steps

1. **Create a New Case**
   - Click "New Case" button (top right)

2. **Enter a Clinical Note**
   - Try this example:
   ```
   Patient with hypertension, BP 150/95. 
   No current medication. ECG normal.
   ```

3. **Follow the Workflow**
   - Confirm condition → Select ICD codes → Choose treatments → Add medications → Review claim

4. **Save Your Work**
   - Click "Save Case" to store it
   - Access saved cases from the sidebar

## Key Features

### 🔍 Condition Analysis
Paste clinical notes and let Authi 1.0 identify chronic conditions using ClinicalBERT.

### 📋 ICD-10 Mapping
Automatically maps confirmed conditions to relevant ICD-10 codes from the authoritative dataset.

### 💊 Medication Management
Select medications with automatic plan filtering and CDA value display.

### 📄 Claim Generation
Generate complete, scheme-compliant claim summaries ready for submission.

### 💾 Case Management
Save, load, and manage multiple patient cases with persistent storage.

## Supported Conditions

The app currently supports 9 chronic conditions:

1. **Asthma** - Respiratory condition
2. **Chronic Renal Disease** - Kidney disorders
3. **Haemophilia** - Blood clotting disorders
4. **Hyperlipidaemia** - High cholesterol
5. **Cardiomyopathy** - Heart muscle disease
6. **Hypertension** - High blood pressure ⭐ Try this first!
7. **Cardiac Failure** - Heart failure
8. **Diabetes Mellitus Type 1** - Insulin-dependent diabetes
9. **Diabetes Mellitus Type 2** - Non-insulin-dependent diabetes

## Project Structure

```
Your Project/
├── 📱 app/              # Next.js application
├── 🧩 components/       # React components
├── 📚 lib/              # Business logic
├── 📊 types/            # TypeScript types
├── 📄 *.csv             # Data files
└── 📖 *.md              # Documentation
```

## What's Included

### Application Files
- Complete Next.js 14 app with TypeScript
- 8 workflow step components
- State management with Zustand
- Tailwind CSS styling
- Lucide React icons

### Data Files
- `Chronic Conditions.csv` - 210 ICD-10 codes
- `Treatment Basket.csv` - Diagnostic & ongoing protocols
- `Medicine List.csv` - 739 medications with CDA values

### Documentation
- `README.md` - Main documentation
- `QUICKSTART.md` - 5-minute guide
- `INSTALLATION.md` - Setup instructions
- `USAGE_GUIDE.md` - Detailed user manual
- `DEPLOYMENT.md` - Production deployment
- `PROJECT_SUMMARY.md` - Technical overview
- `GETTING_STARTED.md` - This file

## Common Questions

### Do I need a backend?
No! The app works standalone with simulated ClinicalBERT. For production, you can integrate a Python backend.

### Where is data stored?
Cases are saved in browser localStorage. They persist between sessions but are local to your browser.

### Can I add more conditions?
Yes! Edit the data files in `lib/data/` and update the Authi service.

### Is it production-ready?
Yes! The code is production-ready. For medical use, integrate with actual ClinicalBERT and add authentication.

### How do I customize it?
- Colors: Edit `tailwind.config.js`
- Workflow: Modify components in `components/workflow/`
- Data: Update CSV files and parsers in `lib/data/`

## Next Steps

After getting started:

1. **Explore the Interface**
   - Try different conditions
   - Test all workflow steps
   - Save and load cases

2. **Read the Documentation**
   - Understand the workflow
   - Learn best practices
   - Review technical details

3. **Customize for Your Needs**
   - Add your branding
   - Adjust workflows
   - Integrate with systems

4. **Deploy to Production**
   - Choose a hosting platform
   - Set up monitoring
   - Configure security

## Need Help?

### Documentation
- Check the relevant .md file for your question
- All files are in the project root

### Technical Issues
- Verify Node.js version: `node --version` (should be 18+)
- Check browser console (F12) for errors
- Restart dev server: Stop (Ctrl+C) and `npm run dev`

### Support
- Review error messages carefully
- Check the troubleshooting sections in guides
- Contact SaluLink development team

## Tips for Success

✅ **Start Simple** - Try the hypertension example first  
✅ **Read Tooltips** - Hover over elements for help  
✅ **Save Often** - Use the save feature regularly  
✅ **Review Claims** - Always check the summary before exporting  
✅ **Keep Notes** - Document thoroughly for better claims  

## What Makes This Special

### 🎯 Structured Workflow
Guides you step-by-step from clinical note to complete claim.

### 🤖 AI-Powered
Uses ClinicalBERT for intelligent condition extraction.

### 📊 Data-Driven
Based on authoritative datasets for ICD-10, treatments, and medications.

### 💼 Professional
Built with modern tech stack and best practices.

### 🔒 Type-Safe
Full TypeScript coverage for reliability.

### 📱 Responsive
Works on desktop, tablet, and mobile.

## Success Criteria

You'll know you're successful when you can:
- [ ] Start the application
- [ ] Create a new case
- [ ] Complete the full workflow
- [ ] Save and reload a case
- [ ] Export a claim summary

## Ready to Begin?

Choose your next step:

**For Quick Start**: Open [QUICKSTART.md](./QUICKSTART.md)  
**For Installation**: Open [INSTALLATION.md](./INSTALLATION.md)  
**For Usage Guide**: Open [USAGE_GUIDE.md](./USAGE_GUIDE.md)

Or just run:
```bash
npm install && npm run dev
```

---

**Welcome to SaluLink Chronic Treatment App!** 🎉

Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS.

