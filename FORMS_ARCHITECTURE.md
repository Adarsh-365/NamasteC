# Namaste China Forms Architecture

## Visual Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     YOUR WEBSITE FORMS                          │
│                                                                 │
│  1. Contact Form          ──┐                                  │
│  2. Sourcing Request      ──┤                                  │
│  3. Verification Audit    ──┤                                  │
│  4. Factory Visits        ──┤                                  │
│  5. Freight Calculator    ──┼──> Google Apps Script           │
│  6. Logistics Inquiry     ──┤    (Single Endpoint)            │
│  7. Trade Consulting      ──┤                                  │
│  8. Canton Fair           ──┤                                  │
│  9. Membership            ──┘                                  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
        ┌───────────────────────────────────────┐
        │   Google Apps Script                  │
        │   Routes to Correct Sheet             │
        └───────────────────────────────────────┘
                               │
                               ▼
┌────────────────────────────────────────────────────────────────┐
│           ONE GOOGLE SPREADSHEET                               │
│  https://docs.google.com/spreadsheets/d/1gJt_rwneVp...         │
│                                                                │
│  📑 Sheet 1: Contact Form                                     │
│  📑 Sheet 2: Sourcing Request                                 │
│  📑 Sheet 3: Verification Audit                               │
│  📑 Sheet 4: Factory Visits                                   │
│  📑 Sheet 5: Freight Calculator                               │
│  📑 Sheet 6: Logistics Inquiry                                │
│  📑 Sheet 7: Trade Consulting                                 │
│  📑 Sheet 8: Canton Fair                                      │
│  📑 Sheet 9: Membership                                       │
└────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
User Fills Form
      ↓
Form Submission (JavaScript)
      ↓
submitToGoogleSheets(formType, data)
      ↓
POST to Google Apps Script URL
      ↓
Script receives: { formType: 'contact', name: 'John', email: '...' }
      ↓
Script routes to correct sheet based on formType
      ↓
Data appended to sheet with timestamp
      ↓
✅ Success!
```

## Implementation Status

### ✅ Completed:
- [x] Google Apps Script created (`google-apps-script.js`)
- [x] Utility helper created (`src/utils/googleSheets.js`)
- [x] Setup guide created (`SIMPLE_GOOGLE_SHEETS_SETUP.md`)

### 🔲 To Do:
- [ ] Deploy Google Apps Script
- [ ] Get Web App URL
- [ ] Update `googleSheets.js` with URL
- [ ] Integrate forms with Google Sheets

## Form Integration Required

Each form component needs to import and use the Google Sheets utility:

```javascript
// Add to each form component
import { submitToGoogleSheets, FORM_TYPES } from '../utils/googleSheets';

// In handleSubmit function:
await submitToGoogleSheets(FORM_TYPES.CONTACT, {
  name,
  email,
  phone,
  service,
  requirement
});
```

## Form Type Mapping

| Component File | Form Type Constant | Sheet Name (Tab) |
|----------------|-------------------|------------------|
| Contact.jsx | FORM_TYPES.CONTACT | Contact Form |
| Sourcing.jsx | FORM_TYPES.SOURCING | Sourcing Request |
| Verification.jsx | FORM_TYPES.VERIFICATION | Verification Audit |
| FactoryVisits.jsx | FORM_TYPES.FACTORY_VISIT | Factory Visits |
| ImportAssistance.jsx (Freight) | FORM_TYPES.FREIGHT_CALC | Freight Calculator |
| ImportAssistance.jsx (Logistics) | FORM_TYPES.LOGISTICS | Logistics Inquiry |
| TradeConsulting.jsx | FORM_TYPES.TRADE_CONSULTING | Trade Consulting |
| CantonFair.jsx | FORM_TYPES.CANTON_FAIR | Canton Fair |
| Membership.jsx | FORM_TYPES.MEMBERSHIP | Membership |

## Benefits of This Architecture

✅ **Single Source of Truth** - One spreadsheet for all data  
✅ **Easy Management** - All forms in one place  
✅ **Simple Deployment** - Deploy script once  
✅ **Organized Data** - Each form has its own tab  
✅ **Scalable** - Easy to add more forms  
✅ **Private** - Only you can access the data  
✅ **No Backend** - Direct browser → Google Sheets  

## File Structure

```
NamasteC/
├── google-apps-script.js          ← Copy this to Google Apps Script
├── SIMPLE_GOOGLE_SHEETS_SETUP.md  ← Follow this guide
├── FORMS_ARCHITECTURE.md           ← This file
└── src/
    ├── utils/
    │   └── googleSheets.js         ← Update with your URL
    └── components/
        ├── Contact.jsx             ← Needs integration
        ├── Sourcing.jsx            ← Needs integration
        ├── Verification.jsx        ← Needs integration
        ├── FactoryVisits.jsx       ← Needs integration
        ├── ImportAssistance.jsx    ← Needs integration (2 forms)
        ├── TradeConsulting.jsx     ← Needs integration
        ├── CantonFair.jsx          ← Needs integration
        └── Membership.jsx          ← Needs integration
```

## Ready to Deploy?

Follow the steps in `SIMPLE_GOOGLE_SHEETS_SETUP.md` to get started!
