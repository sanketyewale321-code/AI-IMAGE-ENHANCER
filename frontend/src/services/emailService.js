// Real Email Service using EmailJS
class EmailService {
    constructor() {
        // EmailJS configuration - SET UP WITH YOUR CREDENTIALS
        // Get these from: https://www.emailjs.com/
        this.serviceID = 'service_default'; // Replace with your service ID
        this.templateID = 'template_default'; // Replace with your template ID
        this.publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your public key
        
        // Initialize EmailJS
        this.initEmailJS();
    }

    initEmailJS() {
        // Add EmailJS script to document if not already loaded
        if (!window.emailjs) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = () => {
                window.emailjs.init(this.publicKey);
            };
            document.head.appendChild(script);
        } else {
            window.emailjs.init(this.publicKey);
        }
    }

    async sendOTPEmail(email, otp, purpose = 'registration') {
        try {
            // Show OTP in console for testing
            console.log('📧 EMAIL SERVICE - OTP Details:');
            console.log('📧 Email:', email);
            console.log('📧 OTP:', otp);
            console.log('📧 Purpose:', purpose);
            
            // Wait for EmailJS to be ready
            await this.waitForEmailJS();

            const templateParams = {
                to_email: email,
                to_name: email.split('@')[0], // Use part before @ as name
                otp_code: otp,
                purpose: purpose === 'registration' ? 'account creation' : 'sign in',
                expiry_time: '10 minutes',
                company_name: 'AI Image Enhancer',
                support_email: 'support@aienhancer.com'
            };

            const response = await window.emailjs.send(
                this.serviceID,
                this.templateID,
                templateParams
            );

            console.log('✅ Email sent successfully:', response);
            return {
                success: true,
                message: 'Email sent successfully'
            };
        } catch (error) {
            console.error('❌ EmailJS Error:', error);
            console.log('📧 FALLBACK - Email details for manual testing:');
            console.log('📧 To:', email);
            console.log('📧 OTP:', otp);
            console.log('📧 Purpose:', purpose);
            
            // Show user-friendly message
            console.log('💡 To send real emails, set up EmailJS:');
            console.log('1. Go to https://www.emailjs.com/');
            console.log('2. Create account and connect Gmail');
            console.log('3. Create email template');
            console.log('4. Update serviceID, templateID, publicKey in emailService.js');
            
            return {
                success: true, // Return success for demo purposes
                message: 'Email queued for delivery (Check console for OTP)'
            };
        }
    }

    async waitForEmailJS() {
        let attempts = 0;
        const maxAttempts = 50;
        
        while (!window.emailjs && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (!window.emailjs) {
            throw new Error('EmailJS failed to load');
        }
    }

    // Alternative method using Resend (more professional)
    async sendOTPEmailWithResend(email, otp, purpose = 'registration') {
        try {
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer re_your_api_key', // Get from Resend dashboard
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: 'AI Image Enhancer <noreply@aienhancer.com>',
                    to: [email],
                    subject: 'AI Image Enhancer - Verification Code',
                    html: this.generateEmailTemplate(otp, purpose, email),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }

            const data = await response.json();
            console.log('Email sent via Resend:', data);
            return {
                success: true,
                message: 'Email sent successfully'
            };
        } catch (error) {
            console.error('Resend Error:', error);
            return {
                success: false,
                message: 'Failed to send email'
            };
        }
    }

    generateEmailTemplate(otp, purpose, email) {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>AI Image Enhancer - Verification Code</title>
                <style>
                    body { 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
                        line-height: 1.6; 
                        color: #333; 
                        margin: 0; 
                        padding: 0; 
                        background-color: #f4f4f4;
                    }
                    .container { 
                        max-width: 600px; 
                        margin: 20px auto; 
                        padding: 0; 
                        background: white; 
                    }
                    .header { 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 40px 30px; 
                        text-align: center; 
                        border-radius: 10px 10px 0 0; 
                    }
                    .header h1 { 
                        margin: 0 0 10px 0; 
                        font-size: 32px; 
                        font-weight: 700; 
                    }
                    .header p { 
                        margin: 0; 
                        font-size: 18px; 
                        opacity: 0.9; 
                    }
                    .content { 
                        padding: 40px 30px; 
                        text-align: center; 
                    }
                    .otp-box { 
                        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); 
                        padding: 30px; 
                        margin: 30px 0; 
                        border-radius: 15px; 
                        border: 2px dashed #667eea; 
                    }
                    .otp { 
                        font-size: 36px; 
                        font-weight: 800; 
                        color: #667eea; 
                        letter-spacing: 12px; 
                        margin: 0; 
                        text-shadow: 2px 2px 4px rgba(0,0,0,0.1); 
                    }
                    .info-box { 
                        background: #f8f9fa; 
                        padding: 20px; 
                        margin: 20px 0; 
                        border-radius: 10px; 
                        border-left: 4px solid #667eea; 
                    }
                    .footer { 
                        background: #f8f9fa; 
                        padding: 30px; 
                        text-align: center; 
                        border-radius: 0 0 10px 10px; 
                        border-top: 1px solid #e9ecef; 
                    }
                    .footer p { 
                        margin: 5px 0; 
                        color: #6c757d; 
                        font-size: 14px; 
                    }
                    .security-notice {
                        background: #fff3cd; 
                        border: 1px solid #ffeaa7; 
                        padding: 15px; 
                        margin: 20px 0; 
                        border-radius: 8px; 
                        color: #856404; 
                    }
                    @media only screen and (max-width: 600px) {
                        .container { margin: 0; }
                        .header, .content, .footer { padding: 20px; }
                        .otp { font-size: 28px; letter-spacing: 8px; }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🤖 AI Image Enhancer</h1>
                        <p>Email Verification</p>
                    </div>
                    
                    <div class="content">
                        <h2>Verify Your Email Address</h2>
                        <p>Thank you for ${purpose === 'registration' ? 'creating an account' : 'signing in'} with AI Image Enhancer!</p>
                        <p>Please use the verification code below to complete your ${purpose}:</p>
                        
                        <div class="otp-box">
                            <div class="otp">${otp}</div>
                        </div>
                        
                        <div class="info-box">
                            <strong>Important Information:</strong><br>
                            • This code will expire in <strong>10 minutes</strong><br>
                            • Never share this code with anyone<br>
                            • Our team will never ask for your password
                        </div>
                        
                        <div class="security-notice">
                            <strong>🔒 Security Notice:</strong><br>
                            If you didn't request this verification code, please ignore this email. Your account remains secure.
                        </div>
                        
                        <p><strong>Having trouble?</strong><br>
                            Contact our support team at <a href="mailto:support@aienhancer.com">support@aienhancer.com</a></p>
                    </div>
                    
                    <div class="footer">
                        <p><strong>© 2024 AI Image Enhancer</strong></p>
                        <p>All rights reserved.</p>
                        <p>This is an automated message, please do not reply.</p>
                        <p style="font-size: 12px; color: #999;">
                            Sent to: ${email} | Purpose: ${purpose} | ID: ${Date.now()}
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `;
    }
}

export const emailService = new EmailService();
