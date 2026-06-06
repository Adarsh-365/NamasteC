// Google Apps Script - Single Spreadsheet with Multiple Sheets
// This script handles all 9 forms and routes data to different sheets (tabs)
// Deploy this ONCE in your main Google Spreadsheet

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const formType = data.formType || data.source;
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Map form types to sheet names (tabs)
    const sheetMap = {
      'contact': 'Contact Form',
      'sourcing': 'Sourcing Request',
      'verification': 'Verification Audit',
      'factoryVisit': 'Factory Visits',
      'freightCalc': 'Freight Calculator',
      'logistics': 'Logistics Inquiry',
      'tradeConsulting': 'Trade Consulting',
      'cantonFair': 'Canton Fair',
      'membership': 'Membership',
      'Campaign Landing Page': 'Campaign Leads'
    };
    
    const sheetName = sheetMap[formType];
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      // Add headers based on form type
      const headers = getHeadersForFormType(formType);
      sheet.appendRow(headers);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#0a3d31');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
    }
    
    // Prepare row data
    const rowData = prepareRowData(formType, data);
    sheet.appendRow(rowData);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, rowData.length);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Form submitted successfully!',
      sheet: sheetName
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getHeadersForFormType(formType) {
  const headerMap = {
    'contact': ['Timestamp', 'Name', 'Email', 'Phone', 'Service', 'Requirement'],
    'sourcing': ['Timestamp', 'Name', 'Email', 'Phone', 'Product Type', 'Quantity'],
    'verification': ['Timestamp', 'Name', 'Email', 'Company Name', 'Supplier URL', 'Audit Type'],
    'factoryVisit': ['Timestamp', 'Name', 'Email', 'Phone', 'Target Cities', 'Product Focus', 'Travel Dates'],
    'freightCalc': ['Timestamp', 'Ship From', 'Ship To', 'Weight (kg)'],
    'logistics': ['Timestamp', 'Name', 'Email', 'Phone', 'Freight Type', 'Cargo Details'],
    'tradeConsulting': ['Timestamp', 'Name', 'Email', 'Phone', 'Consultation Topic', 'Details'],
    'cantonFair': ['Timestamp', 'Name', 'Email', 'Phone', 'Selected Phase', 'Requirements'],
    'membership': ['Timestamp', 'Name', 'Email', 'Phone', 'Selected Plan', 'Duration'],
    'Campaign Landing Page': ['Timestamp', 'Name', 'Phone', 'Company', 'Product Requirement', 'Source']
  };
  return headerMap[formType] || ['Timestamp', 'Data'];
}

function prepareRowData(formType, data) {
  const timestamp = new Date();
  
  const dataMap = {
    'contact': [timestamp, data.name, data.email, data.phone, data.service, data.requirement],
    'sourcing': [timestamp, data.name, data.email, data.phone, data.productType, data.quantity],
    'verification': [timestamp, data.name, data.email, data.companyName, data.supplierUrl, data.auditType],
    'factoryVisit': [timestamp, data.name, data.email, data.phone, data.targetCities, data.productFocus, data.travelDates],
    'freightCalc': [timestamp, data.shipFrom, data.shipTo, data.shipWeight],
    'logistics': [timestamp, data.name, data.email, data.phone, data.freightType, data.cargoDetails],
    'tradeConsulting': [timestamp, data.name, data.email, data.phone, data.consultationTopic, data.details],
    'cantonFair': [timestamp, data.name, data.email, data.phone, data.selectedPhase, data.requirements],
    'membership': [timestamp, data.name, data.email, data.phone, data.selectedPlan, data.selectedDuration],
    'Campaign Landing Page': [timestamp, data.name, data.phone, data.company, data.productRequirement, data.source]
  };
  
  return dataMap[formType] || [timestamp, JSON.stringify(data)];
}

// For testing - access this URL in browser to verify script is working
function doGet() {
  return ContentService.createTextOutput('Namaste China Form Handler is Active! ✅');
}
