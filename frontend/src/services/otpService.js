// OTP Service for real email verification
import { emailService } from './emailService.js';

class OTPService {
    constructor() {
        this.otpStore = new Map(); // Store OTPs in memory (for demo)
    }

    // Generate 6-digit OTP
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Send OTP to email
    async sendOTP(email, purpose = 'registration') {
        try {
            const otp = this.generateOTP();
            const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
            
            // Store OTP
            this.otpStore.set(email, {
                otp,
                purpose,
                expiresAt,
                attempts: 0,
                maxAttempts: 3
            });

            // Send real email
            const emailResult = await emailService.sendOTPEmail(email, otp, purpose);
            
            if (emailResult.success) {
                return {
                    success: true,
                    message: `OTP sent to ${email}`,
                    expiresIn: 600 // 10 minutes in seconds
                };
            } else {
                // If email fails, remove OTP from storage
                this.otpStore.delete(email);
                return {
                    success: false,
                    message: 'Failed to send OTP. Please try again.'
                };
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            // Clean up on error
            this.otpStore.delete(email);
            return {
                success: false,
                message: 'Failed to send OTP. Please try again.'
            };
        }
    }

    // Verify OTP
    async verifyOTP(email, otp) {
        try {
            const storedData = this.otpStore.get(email);
            
            if (!storedData) {
                return {
                    success: false,
                    message: 'No OTP found for this email. Please request a new one.'
                };
            }

            // Check expiry
            if (new Date() > storedData.expiresAt) {
                this.otpStore.delete(email);
                return {
                    success: false,
                    message: 'OTP has expired. Please request a new one.'
                };
            }

            // Check attempts
            if (storedData.attempts >= storedData.maxAttempts) {
                this.otpStore.delete(email);
                return {
                    success: false,
                    message: 'Too many failed attempts. Please request a new OTP.'
                };
            }

            // Verify OTP
            if (storedData.otp === otp) {
                this.otpStore.delete(email);
                return {
                    success: true,
                    message: 'OTP verified successfully!'
                };
            } else {
                // Increment attempts
                storedData.attempts++;
                this.otpStore.set(email, storedData);
                
                return {
                    success: false,
                    message: `Invalid OTP. ${storedData.maxAttempts - storedData.attempts} attempts remaining.`
                };
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            return {
                success: false,
                message: 'Verification failed. Please try again.'
            };
        }
    }

    // Check if OTP exists for email
    hasPendingOTP(email) {
        const storedData = this.otpStore.get(email);
        return storedData && new Date() <= storedData.expiresAt;
    }

    // Clean expired OTPs
    cleanupExpiredOTPs() {
        const now = new Date();
        for (const [email, data] of this.otpStore.entries()) {
            if (now > data.expiresAt) {
                this.otpStore.delete(email);
            }
        }
    }

    // Get OTP for testing (remove in production)
    getOTPForTesting(email) {
        const storedData = this.otpStore.get(email);
        return storedData ? storedData.otp : null;
    }
}

// Export singleton instance
export const otpService = new OTPService();
