/* eslint-disable no-unused-vars */
/* global SpreadsheetApp, ContentService */
/* exported doPost, doGet */

// Google Apps Script - Single Spreadsheet with Multiple Sheets
// This script handles all 9 forms and routes data to different sheets (tabs)
// Deploy this ONCE in your main Google Spreadsheet

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const formType = normalizeFormType(data.formType || data.source);
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
      'campaignLanding': 'Campaign Leads'
    };
    
    const sheetName = sheetMap[formType];
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
    }

    const headers = getHeadersForFormType(formType);
    ensureHeaders(sheet, headers);
    
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
  const normalizedFormType = normalizeFormType(formType);
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
    'campaignLanding': [
      'Timestamp',
      'Full Name',
      'Mobile Number',
      'Company Name',
      'City',
      'How Can We Help You?',
      'Product/Business Requirement',
      'Monthly Purchase Budget',
      'Expected Timeline',
      'Additional Details',
      'Source'
    ]
  };
  return headerMap[normalizedFormType] || ['Timestamp', 'Data'];
}

function prepareRowData(formType, data) {
  const normalizedFormType = normalizeFormType(formType);
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
    'campaignLanding': [
      timestamp,
      data.fullName,
      data.mobileNumber,
      data.companyName,
      data.city,
      data.helpWith,
      data.productBusinessRequirement,
      data.monthlyPurchaseBudget,
      data.expectedTimeline,
      data.additionalDetails,
      data.source
    ]
  };
  
  return dataMap[normalizedFormType] || [timestamp, JSON.stringify(data)];
}

function normalizeFormType(formType) {
  if (!formType) return formType;

  const normalizedValue = String(formType).trim();
  if (normalizedValue === 'Campaign Landing Page' || normalizedValue === 'campaign-landing' || normalizedValue === 'campaignLandingPage') {
    return 'campaignLanding';
  }

  return normalizedValue;
}

function ensureHeaders(sheet, headers) {
  const currentHeaders = sheet.getLastRow() >= 1 ? sheet.getRange(1, 1, 1, headers.length).getValues()[0] : [];
  const headersMatch =
    currentHeaders.length === headers.length &&
    currentHeaders.every((value, index) => String(value).trim() === headers[index]);

  if (!headersMatch) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#0a3d31');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
}

// For testing - access this URL in browser to verify script is working
function doGet() {
  return ContentService.createTextOutput('Namaste China Form Handler is Active! ✅');
}
