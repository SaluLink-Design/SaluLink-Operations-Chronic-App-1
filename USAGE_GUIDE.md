# Usage Guide - SaluLink Chronic Treatment App

## Table of Contents

1. [Getting Started](#getting-started)
2. [Creating a New Case](#creating-a-new-case)
3. [Workflow Steps](#workflow-steps)
4. [Managing Cases](#managing-cases)
5. [Tips and Best Practices](#tips-and-best-practices)

## Getting Started

### Launching the Application

1. Open your terminal
2. Navigate to the project directory
3. Run `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Interface Overview

The application consists of two main sections:

- **Sidebar** (left): Navigation, saved cases, and settings
- **Main Area** (right): Workflow steps and content

## Creating a New Case

### Step 1: Start a New Case

Click the **"New Case"** button in the top-right corner. This will:
- Initialize a new patient case
- Reset the workflow to the beginning
- Clear any previous selections

### Step 2: Enter Clinical Note

In the **Clinical Note Input** screen:

1. Type or paste the patient's clinical observations in the text area
2. Include relevant information:
   - Symptoms
   - Medical history
   - Current complaints
   - Relevant test results
3. Click **"Analyze Note"**

**Example Clinical Note:**

```
Patient presents with recurrent episodes of wheezing and shortness of 
breath, particularly at night. History of childhood asthma. Physical 
examination reveals bilateral wheezing on auscultation. Peak flow 
measurements show reduced lung function.
```

## Workflow Steps

### Step 3: Confirm Condition

After analysis, Authi 1.0 will display potential chronic conditions:

1. Review the identified conditions
2. Check the confidence scores (shown as percentage bars)
3. Click on the correct condition to confirm

**What to Look For:**
- Highest confidence score usually indicates the most likely condition
- Review all suggestions before confirming
- Ensure the condition matches the clinical presentation

### Step 4: Select ICD-10 Codes

The ICD-10 Code Selection screen shows all applicable codes:

1. Review the available ICD-10 codes for the confirmed condition
2. Click on codes that apply to this specific case
3. Multiple codes can be selected
4. Click **"Continue to Diagnostic Basket"**

**Tips:**
- Select the most specific code available
- Include complication codes if applicable
- You can skip this step and return later if needed

### Step 5: Choose Diagnostic Treatments

In the Diagnostic Basket:

1. Review the list of covered diagnostic procedures
2. Check the boxes for tests that were performed
3. For each selected test, specify how many times it was performed using the +/- buttons
4. Click **"Continue to Documentation"**

**Important:**
- Only select tests that were actually performed
- The "Covered" number shows the maximum allowed by the scheme
- Ensure the count doesn't exceed covered amounts

### Step 6: Document Treatments

For each selected diagnostic treatment:

1. **Upload Images:**
   - Click the upload area or drag files
   - Supported formats: PNG, JPG, PDF
   - Examples: Lab results, X-rays, ECG reports

2. **Enter Clinical Findings:**
   - Type your interpretation in the text area
   - Include relevant observations
   - Note any abnormalities

3. Navigate between treatments using **"Previous"** and **"Next Treatment"** buttons

**Documentation Requirements:**
- At least one form of documentation (image OR notes) is required
- Be thorough - this supports the claim
- Use clear, professional language

### Step 7: Select Medications

In the Medication Selection screen:

1. **Choose Medical Plan** (optional but recommended):
   - Click on the patient's scheme plan
   - This filters medications and shows correct CDA values
   - Plans: Core, Priority, Saver, Executive, Comprehensive

2. **Select Medications:**
   - Check boxes for prescribed medications
   - Review the medicine class and active ingredient
   - Note the CDA (Chronic Drug Amount)

3. **Add Registration Notes:**
   - For each selected medication, enter a registration note
   - Explain why this medication is being prescribed
   - This is **required** for all selected medications

4. Click **"Generate Claim Summary"**

**Medication Selection Tips:**
- Choose generic options when available
- Verify the medication is covered under the selected plan
- Ensure dosage is appropriate for the condition

### Step 8: Review Claim Summary

The Claim Summary displays the complete case:

1. **Review All Sections:**
   - Clinical Note
   - Confirmed Condition
   - ICD-10 Codes
   - Diagnostic Treatments (with documentation)
   - Medications (with registration notes)

2. **Save or Export:**
   - Click **"Save Case"** to store in the system
   - Click **"Export as PDF"** to download a text file

**Before Saving:**
- Verify all information is accurate
- Check that documentation is complete
- Ensure medications are correctly listed

## Managing Cases

### Viewing Saved Cases

1. Click **"View Cases"** in the sidebar
2. Browse your saved cases
3. Click on a case to load it

**Case Information Shown:**
- Condition name
- Last updated date
- Case status

### Loading a Saved Case

When you load a saved case:
- The workflow jumps to the Claim Summary
- All previous selections are restored
- You can view or export the claim

### Deleting Cases

1. In the saved cases list, click the trash icon
2. Confirm the deletion
3. The case is permanently removed

### Ongoing Management

For follow-up visits on existing cases:

1. Load the saved case
2. From the Claim Summary, look for **"Ongoing Management"** option
3. Select follow-up treatments from the Ongoing Management Basket
4. Document the follow-up procedures
5. Save the updated case

**Ongoing Management Features:**
- Different treatment basket than initial diagnosis
- Typically includes monitoring and maintenance procedures
- Can be performed multiple times for the same case

## Tips and Best Practices

### Clinical Note Writing

**Good Practice:**
```
Patient with known Type 2 Diabetes Mellitus presents for routine 
follow-up. HbA1c: 7.2%. Blood pressure: 135/85. Compliant with 
Metformin 850mg BD. No hypoglycemic episodes reported. Feet 
examination normal. Retinal screening due.
```

**Avoid:**
- Vague descriptions
- Missing key information
- Unclear abbreviations

### Documentation

**Best Practices:**
- Upload clear, legible images
- Include all relevant test results
- Write concise but complete notes
- Date all documentation

### Medication Selection

**Considerations:**
- Check formulary restrictions
- Verify patient allergies (outside this system)
- Consider drug interactions (outside this system)
- Document therapeutic rationale

### Workflow Efficiency

**Tips:**
- Complete one case at a time
- Save frequently
- Use descriptive registration notes
- Review before final submission

### Common Mistakes to Avoid

1. **Incomplete Documentation**
   - Always provide notes or images for treatments
   - Don't skip documentation steps

2. **Wrong Condition Selection**
   - Verify the condition matches the clinical note
   - Don't rush the confirmation step

3. **Missing Registration Notes**
   - Required for all medications
   - Be specific about therapeutic intent

4. **Incorrect Treatment Counts**
   - Don't exceed covered amounts
   - Accurately reflect procedures performed

## Keyboard Shortcuts

- **Ctrl/Cmd + N**: New Case (when implemented)
- **Tab**: Navigate between form fields
- **Enter**: Submit forms (where applicable)

## Troubleshooting

### Case Not Saving

- Check browser console for errors
- Ensure all required fields are complete
- Try refreshing the page

### Workflow Stuck

- Use browser back button carefully
- Click "New Case" to restart
- Check that all steps are completed

### Missing Data

- Verify CSV files are in the project directory
- Check browser console for loading errors
- Restart the development server

## Support and Feedback

For technical support or to report issues:

1. Check the README.md for technical details
2. Review error messages in the browser console
3. Contact the SaluLink development team

---

**Remember:** This application is designed for qualified medical professionals. All clinical decisions should follow appropriate medical guidelines and protocols.

