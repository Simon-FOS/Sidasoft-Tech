import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// --- Transporter Setup ---
let transporter;

// If in development, fake transporter (console log only)
if (process.env.NODE_ENV === 'development') {
  transporter = {
    sendMail: async (mailOptions) => {
      console.log('📧 Simulated Email Sent:');
      console.log('To:', mailOptions.to);
      console.log('Subject:', mailOptions.subject);
      console.log('HTML:', mailOptions.html);
      return { accepted: [mailOptions.to], messageId: 'simulated-dev-id' };
    }
  };
} else {
  // Real transporter for production
  transporter = nodemailer.createTransport({
    host: process.env.ZOHO_HOST,
    port: process.env.ZOHO_PORT,
    secure: true, // true for 465
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASS,
    },
  });
}

// --- Generic Email Sender ---
export const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"Sidasoft" <${process.env.ZOHO_USER}>`,
    to,
    subject,
    html,
  };
  return transporter.sendMail(mailOptions);
};

// --- Templates ---
export const passwordResetOtpTemplate = (name, otp) => `
  <div style="font-family: Poppins, sans-serif; background:#f8f9fa; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; border-radius:8px; padding:20px; border:1px solid #eee;">
      <h2 style="color:#105341;">Password Reset Request</h2>
      <p>Hi ${name},</p>
      <p>You requested to reset your password. Use the OTP below to proceed:</p>
      <div style="background:#defeab; color:#105341; font-size:24px; font-weight:bold; padding:10px; text-align:center; border-radius:6px; letter-spacing:3px;">
        ${otp}
      </div>
      <p style="margin-top:20px;">This OTP is valid for 10 minutes. If you didn’t request this, please ignore this email.</p>
      <p style="color:#212529;">– Sidasoft Team</p>
    </div>
  </div>
`;

export const passwordResetSuccessTemplate = (name) => `
  <div style="font-family:Poppins, sans-serif; background:#f8f9fa; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; border-radius:8px; padding:20px; border:1px solid #eee;">
      <h2 style="color:#105341;">Password Reset Successful</h2>
      <p>Hi ${name},</p>
      <p>Your password has been reset successfully. If this wasn’t you, please contact support immediately.</p>
      <p style="color:#212529;">– Sidasoft Team</p>
    </div>
  </div>
`;

export const passwordChangedTemplate = (name) => `
  <div style="font-family:Poppins, sans-serif; background:#f8f9fa; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; border-radius:8px; padding:20px; border:1px solid #eee;">
      <h2 style="color:#105341;">Password Changed</h2>
      <p>Hi ${name},</p>
      <p>Your password was changed successfully. If this wasn’t you, please <a href="#">reset it immediately</a>.</p>
      <p style="color:#212529;">– Sidasoft Team</p>
    </div>
  </div>
`;

// --- Contact Message Template ---
export const contactMessageTemplate = (name, email, message) => `
  <div style="font-family:Poppins, sans-serif; background:#f8f9fa; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; border-radius:8px; padding:20px; border:1px solid #eee;">
      <h2 style="color:#105341;">New Contact Message</h2>
      <p>You have received a new message from the website contact form.</p>
      <hr style="border:none; border-top:1px solid #eee; margin:10px 0;">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <div style="background:#f1f3f5; padding:10px; border-radius:6px; color:#333;">
        ${message}
      </div>
      <p style="margin-top:20px;">Please respond promptly.</p>
      <p style="color:#212529;">– Sidasoft System</p>
    </div>
  </div>
`;

// --- Contact Email Notification Sender ---
export const sendContactNotification = async ({ name, email, message }) => {
  const html = contactMessageTemplate(name, email, message);
  return sendEmail({
    to: process.env.USER_ADMIN_EMAIL, // Set this in your .env file
    subject: `📨 New Contact Message from ${name}`,
    html,
  });
};
