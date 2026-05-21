# Quick EmailJS Setup - 5 Minutes!

## Step 1: Create EmailJS Account (2 minutes)
1. Go to: https://www.emailjs.com/
2. Click "Sign Up" → Use Google/GitHub or email
3. Verify your email

## Step 2: Connect Email Service (1 minute)
1. Dashboard → "Email Services" → "Add New Service"
2. Choose "Gmail" (easiest)
3. Click "Connect Service" → Sign in with your Gmail
4. **Copy the Service ID** (looks like: `service_xxxxxxxxx`)

## Step 3: Create Email Template (1 minute)
1. Dashboard → "Email Templates" → "Create New Template"
2. Template Name: `AI Image Enhancer OTP`
3. Subject: `AI Image Enhancer - Verification Code`
4. HTML Content (copy-paste this):

```html
<h2>Verify Your Email Address</h2>
<p>Thank you for {{purpose}} with AI Image Enhancer!</p>
<p>Your verification code is: <strong>{{otp_code}}</strong></p>
<p>This code expires in {{expiry_time}}.</p>
<p>Company: {{company_name}}</p>
```

5. Click "Save" → **Copy the Template ID** (looks like: `template_xxxxxxxxx`)

## Step 4: Get Public Key (30 seconds)
1. Dashboard → "Integration" → "API Keys"
2. **Copy the Public Key** (looks like: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

## Step 5: Update Code (30 seconds)
Edit `src/services/emailService.js`:

```javascript
// Replace these 3 lines:
this.serviceID = 'service_ YOUR_SERVICE_ID ';
this.templateID = 'template_ YOUR_TEMPLATE_ID ';
this.publicKey = ' YOUR_PUBLIC_KEY ';
```

## Step 6: Test! (30 seconds)
1. Refresh your app
2. Try registering with your email
3. Check your Gmail inbox (including spam)
4. Should receive the OTP email!

## 🎉 Done! You're sending real emails!

## Troubleshooting:
- **No email?** Check Gmail spam folder
- **Error?** Verify the 3 IDs are copied correctly
- **Still not working?** Console will show detailed errors

## Free Plan Limits:
- 200 emails per month
- Perfect for testing and small projects
