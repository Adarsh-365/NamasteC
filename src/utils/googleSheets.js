// Utility to submit forms to Google Sheets
// ONE Spreadsheet with multiple sheets (tabs)

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyWwWPW70jb_hTaFAQ6aotxv9eLB1hDty1eBSJtycsy883Nxw9JwmU7QeKuxZVhPG0ewA/exec';

export const submitToGoogleSheets = async (formType, formData) => {
  try {
    console.log('Submitting to Google Sheets:', formType, formData); // Debug log
    
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Important for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType,
        ...formData
      })
    });

    console.log('Submission complete'); // Debug log
    // Note: With no-cors, we can't read the response
    // But the submission will still work
    return { success: true };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return { success: false, error: error.message };
  }
};

// Form type constants - these map to sheet names (tabs) in your Google Spreadsheet
export const FORM_TYPES = {
  CONTACT: 'contact',
  SOURCING: 'sourcing',
  VERIFICATION: 'verification',
  FACTORY_VISIT: 'factoryVisit',
  FREIGHT_CALC: 'freightCalc',
  LOGISTICS: 'logistics',
  TRADE_CONSULTING: 'tradeConsulting',
  CANTON_FAIR: 'cantonFair',
  MEMBERSHIP: 'membership',
  CAMPAIGN_LANDING: 'campaignLanding'
};
