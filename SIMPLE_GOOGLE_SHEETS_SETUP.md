# Simple Google Sheets Setup - ONE Spreadsheet, 9 Sheets (Tabs)

## Overview
All 9 forms will submit to **ONE Google Spreadsheet** with **9 different sheets (tabs)** inside it.

Your existing spreadsheet: 
https://docs.google.com/spreadsheets/d/1gJt_rwneVp6U_Sp-7iXycqSfgJ_2ngoj2A0IVeLPGfA/edit

## Quick Setup (5 Steps - 10 minutes)

### Step 1: Prepare Your Spreadsheet

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1gJt_rwneVp6U_Sp-7iXycqSfgJ_2ngoj2A0IVeLPGfA/edit

2. Create 9 new sheets (tabs) by clicking the **"+"** button at the bottom:
   - `Contact Form`
   - `Sourcing Request`
   - `Verification Audit`
   - `Factory Visits`
   - `Freight Calculator`
   - `Logistics Inquiry`
   - `Trade Consulting`
   - `Canton Fair`
   - `Membership`

**Note:** The script will auto-create these sheets if they don't exist, but it's better to create them manually first.

### Step 2: Open Apps Script Editor

1. In your Google Sheet, click **Extensions > Apps Script**
2. You'll see a code editor window open

### Step 3: Paste the Script

1. Delete any existing code in the editor
2. Open the file `google-apps-script.js` from your project folder
3. Copy **ALL** the code
4. Paste it into the Apps Script editor
5. Click **Save** (💾 icon) 
6. Name it: "Namaste China Form Handler"

### Step 4: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the **gear icon** ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in settings:
   - **Description:** Namaste China Forms
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone

5. Click **Deploy**

6. **⚠️ IMPORTANT:** You'll see a warning. Click:
   - **Review permissions**
   - Choose your Google account
   - Click **Advanced**
   - Click **Go to [Your Project Name] (unsafe)**
   - Click **Allow**

7. **📋 COPY THE WEB APP URL**
   - It looks like: `https://script.google.com/macros/s/AKfycby...../exec`
   - Save it somewhere!

8. Click **Done**

### Step 5: Update Your Website Code

1. Open `src/utils/googleSheets.js`

2. Find this line:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_SCRIPT_URL_HERE';
   ```

3. Replace `YOUR_SCRIPT_URL_HERE` with your actual URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby...../exec';
   ```

4. Save the file

**✅ DONE! Your forms are now connected to Google Sheets!**

## How It Works

When a form is submitted:

```
Website Form → Google Apps Script → Routes to Correct Sheet (Tab)
```

**Form Routing:**
- Contact Form → Goes to "Contact Form" tab
- Sourcing Request → Goes to "Sourcing Request" tab
- Verification Audit → Goes to "Verification Audit" tab
- Factory Visits → Goes to "Factory Visits" tab
- Freight Calculator → Goes to "Freight Calculator" tab
- Logistics Inquiry → Goes to "Logistics Inquiry" tab
- Trade Consulting → Goes to "Trade Consulting" tab
- Canton Fair → Goes to "Canton Fair" tab
- Membership → Goes to "Membership" tab

## Testing

### Test the Script First

1. Copy your Web App URL
2. Paste it in a browser
3. You should see: "Namaste China Form Handler is Active! ✅"

If you see this message, your script is working!

### Test Each Form

After updating the website code:
1. Go to each page on your website
2. Fill out and submit the form
3. Check the corresponding sheet (tab) in Google Sheets
4. Verify the data appeared with a timestamp

## Sheet Structure

Each sheet will have columns like this:

**Contact Form:**
| Timestamp | Name | Email | Phone | Service | Requirement |
|-----------|------|-------|-------|---------|-------------|

**Sourcing Request:**
| Timestamp | Name | Email | Phone | Product Type | Quantity |
|-----------|------|-------|-------|--------------|----------|

**And so on for each form...**

## Benefits

✅ **Organized** - All forms in one place, but separate tabs  
✅ **Easy to manage** - One spreadsheet to rule them all  
✅ **Auto-formatted** - Headers are styled automatically  
✅ **Timestamped** - Every entry has date/time  
✅ **Private** - Only you can access this spreadsheet  
✅ **No backend needed** - Direct submission from website  

## Troubleshooting

### Forms not submitting?
- Check that GOOGLE_SCRIPT_URL is set correctly in `googleSheets.js`
- Make sure the URL ends with `/exec`
- Test the URL in your browser first

### Data not appearing?
- Check Apps Script execution logs: Apps Script Editor > **Executions** tab
- Verify the script is deployed with "Anyone" access
- Check sheet names match exactly (case-sensitive)

### Permission errors?
- Re-authorize: Apps Script Editor > Run > Test function
- Make sure "Execute as: Me" in deployment settings

## Next Steps

Would you like me to:
1. Update all 9 form components to integrate with Google Sheets?
2. Add email notifications when forms are submitted?
3. Create a dashboard to view all submissions?

## Security Notes

🔒 **Your data is safe:**
- The Google Sheet is private to your account
- Only authorized Google accounts can access it
- The Web App URL is safe to use in your website
- No sensitive authentication data is exposed

## Need Help?

If you get stuck:
1. Check the Executions tab in Apps Script Editor
2. Look at the browser console for errors
3. Verify all sheet names are spelled correctly
4. Make sure the deployment is set to "Anyone" access
