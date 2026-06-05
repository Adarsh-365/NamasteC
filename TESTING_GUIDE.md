# Testing Guide - Forms to Google Sheets

## ✅ Setup Complete!

Your Web App URL has been configured:
```
https://script.google.com/macros/s/AKfycbwKjCYTzZy1Opv8y6QvOTlmuYHtbOK4UO-IeMZ_yqB3/exec
```

**Note:** I changed `/dev` to `/exec` - this is the production endpoint that will work with your website.

## Quick Test Steps

### 1. Test the Script URL (Optional)

Open this URL in your browser:
```
https://script.google.com/macros/s/AKfycbwKjCYTzZy1Opv8y6QvOTlmuYHtbOK4UO-IeMZ_yqB3/exec
```

You should see: **"Namaste China Form Handler is Active! ✅"**

If you see this, your script is working!

### 2. Prepare Your Google Sheet

Make sure your Google Sheet has these 9 tabs (sheets):
- Contact Form
- Sourcing Request
- Verification Audit
- Factory Visits
- Freight Calculator
- Logistics Inquiry
- Trade Consulting
- Canton Fair
- Membership

**Note:** The script will auto-create these if they don't exist, but it's better to create them manually first.

### 3. Test Each Form

Now test each form on your website:

#### ✅ Form 1: Contact Form
1. Go to `/contact` page
2. Fill out the form
3. Submit
4. Check "Contact Form" tab in your Google Sheet
5. Verify data appears with timestamp

#### ✅ Form 2: Sourcing Request
1. Go to `/sourcing` page
2. Fill out the form
3. Submit
4. Check "Sourcing Request" tab
5. Verify data appears

#### ✅ Form 3: Verification Audit
1. Go to `/verification` page
2. Fill out the form
3. Submit
4. Check "Verification Audit" tab
5. Verify data appears

#### ✅ Form 4: Factory Visits
1. Go to `/factory-visits` page
2. Fill out the form
3. Submit
4. Check "Factory Visits" tab
5. Verify data appears

#### ✅ Form 5: Freight Calculator
1. Go to `/import-assistance` page
2. Use the freight calculator
3. Click "Fetch Quotes"
4. Check "Freight Calculator" tab
5. Verify data appears

#### ✅ Form 6: Logistics Inquiry
1. Go to `/import-assistance` page
2. Scroll to logistics form
3. Fill and submit
4. Check "Logistics Inquiry" tab
5. Verify data appears

#### ✅ Form 7: Trade Consulting
1. Go to `/trade-consulting` page
2. Fill out the form
3. Submit
4. Check "Trade Consulting" tab
5. Verify data appears

#### ✅ Form 8: Canton Fair
1. Go to `/canton-fair` page
2. Fill out the form
3. Submit
4. Check "Canton Fair" tab
5. Verify data appears

#### ✅ Form 9: Membership
1. Go to `/membership` page
2. Click "Get Started"
3. Fill modal form
4. Submit
5. Check "Membership" tab
6. Verify data appears

## Expected Results

Each sheet should have data in this format:

### Example: Contact Form
| Timestamp | Name | Email | Phone | Service | Requirement |
|-----------|------|-------|-------|---------|-------------|
| 2024-01-15 10:30:00 | John Doe | john@example.com | +91 99999 88888 | Product Sourcing | Need furniture |

### Headers are Auto-Created

The script automatically creates headers when the first entry is submitted to each sheet. Headers will be:
- **Bold**
- **Dark green background (#0a3d31)**
- **White text**

## Troubleshooting

### ❌ Forms not submitting?
- Check browser console for errors (F12 > Console tab)
- Verify you're using `/exec` not `/dev` in the URL
- Make sure the deployment is set to "Anyone" access

### ❌ Data not appearing in sheets?
1. Go to Apps Script Editor
2. Click **Executions** tab (left sidebar)
3. Check for errors in recent executions
4. Verify sheet names match exactly (case-sensitive)

### ❌ Permission errors?
1. Go back to Apps Script Editor
2. Click **Deploy > Manage deployments**
3. Click **Edit** (pencil icon)
4. Make sure:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**

### ❌ CORS errors in browser console?
- This is **normal** with `mode: 'no-cors'`
- The data IS still being submitted
- You just can't read the response in JavaScript
- Check your Google Sheet to confirm data is there

## Verification Checklist

- [ ] Web App URL ends with `/exec`
- [ ] Script is deployed as "Anyone" can access
- [ ] Google Sheet has 9 tabs created
- [ ] Test submission from at least 1 form
- [ ] Data appears in correct sheet with timestamp
- [ ] All 9 forms tested and working

## Success! 🎉

Once you see data appearing in your Google Sheet, you're all set! All 9 forms are now saving directly to your spreadsheet.

## Next Steps (Optional)

### Add Email Notifications
You can add email notifications when forms are submitted by adding this to your Google Apps Script:

```javascript
// Add this inside the doPost function after sheet.appendRow(rowData);
MailApp.sendEmail({
  to: 'your@email.com',
  subject: `New ${sheetName} Submission`,
  body: `New form submitted!\n\nCheck your sheet: ${spreadsheet.getUrl()}`
});
```

### Export Data
You can export any sheet to Excel:
1. Open your Google Sheet
2. Select the tab you want
3. File > Download > Microsoft Excel (.xlsx)

### Share with Team
Share your Google Sheet with team members:
1. Click **Share** button
2. Add email addresses
3. Set permissions (Viewer, Editor, etc.)

## Support

If you encounter any issues:
1. Check the Executions tab in Apps Script Editor
2. Look at browser console for JavaScript errors
3. Verify all URLs and endpoints are correct
4. Test with a simple form first
