# Email Setup Guide for AI Image Enhancer

## Option 1: EmailJS (Recommended for Testing/Small Projects)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. Go to Email Services → Add New Service
2. Choose your email provider (Gmail, Outlook, etc.)
3. Connect your email account
4. Note your **Service ID**

### Step 3: Create Email Template
1. Go to Email Templates → Create New Template
2. Use this template:

```
To Email: {{to_email}}
To Name: {{to_name}}
OTP Code: {{otp_code}}
Purpose: {{purpose}}
Expiry Time: {{expiry_time}}
Company Name: {{company_name}}
Support Email: {{support_email}}
```

3. Design your email template with these variables
4. Note your **Template ID**

### Step 4: Get Public Key
1. Go to Integration → API Keys
2. Copy your **Public Key**

### Step 5: Update Configuration
Edit `src/services/emailService.js`:

```javascript
this.serviceID = 'YOUR_SERVICE_ID'; // Replace with your service ID
this.templateID = 'YOUR_TEMPLATE_ID'; // Replace with your template ID  
this.publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your public key
```

## Option 2: Resend (Professional Option)

### Step 1: Create Resend Account
1. Go to [https://resend.com/](https://resend.com/)
2. Sign up for an account
3. Get your API key from dashboard

### Step 2: Verify Domain
1. Add your domain in Resend dashboard
2. Add DNS records (TXT, CNAME)
3. Wait for verification

### Step 3: Update Configuration
Edit `src/services/emailService.js`:

```javascript
// In sendOTPEmailWithResend method:
'Authorization': 'Bearer re_YOUR_API_KEY', // Replace with your API key
from: 'AI Image Enhancer <noreply@yourdomain.com>', // Update with your domain
```

## Testing Your Setup

### Test with EmailJS:
1. Fill registration form with your email
2. Check browser console for any errors
3. Check your email inbox (including spam folder)
4. Verify OTP appears in email

### Test with Resend:
1. Same steps as EmailJS
2. More reliable delivery
3. Professional email headers

## Security Notes

### Important:
- Never expose your private keys in frontend code
- EmailJS is safe for frontend (uses public keys only)
- For production, consider backend email sending
- Rate limit OTP requests (1 per minute per email)

### EmailJS Limitations:
- 200 emails/month on free plan
- Basic templates only
- Good for testing/small projects

### Resend Benefits:
- 3,000 emails/month on free plan
- Professional email delivery
- Better deliverability
- Custom domain support

## Troubleshooting

### Common Issues:
1. **Email not received**: Check spam folder
2. **EmailJS error**: Verify service/template/public keys
3. **Domain not verified**: Complete DNS setup for Resend
4. **Rate limiting**: Wait between requests

### Debug Mode:
Check browser console for email sending details:
```
📧 EMAIL WOULD BE SENT TO: user@example.com
📧 OTP CODE: 123456
📧 PURPOSE: registration
```

## Production Recommendations

For production use:
1. Move email sending to backend
2. Use Resend or SendGrid
3. Add email analytics
4. Implement proper rate limiting
5. Add email queue system

## Quick Start (EmailJS)

1. Sign up at EmailJS
2. Connect Gmail account
3. Create template with variables
4. Update service IDs in code
5. Test with your email

That's it! Your OTP system will send real emails to users. 🚀
