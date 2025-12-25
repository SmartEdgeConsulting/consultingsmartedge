export const getEmailContent = (
  status: "accepted" | "rejected",
  name: string
) => {
  if (status === "accepted") {
    return {
      subject: "🎉 Congratulations! Your Bootcamp Application Has Been Accepted",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #10b981; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background-color: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Congratulations, ${name}!</h1>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                <p>We are thrilled to inform you that your application for our bootcamp has been <strong>accepted</strong>!</p>
                <p>This is an exciting step in your learning journey, and we can't wait to have you join our community of passionate learners.</p>
                
                <h3>Next Steps:</h3>
                <ul>
                  <li>Check your email for further instructions</li>
                  <li>Join our community Slack/Discord channel (link will be sent separately)</li>
                  <li>Mark your calendar for the bootcamp start date</li>
                </ul>
                
                <p>If you have any questions, please don't hesitate to reach out to us.</p>
                
                <p>Welcome aboard!</p>
                <p><strong>The Bootcamp Team</strong></p>
              </div>
              <div class="footer">
                <p>This is an automated message. Please do not reply to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };
  } else {
    return {
      subject: "Update on Your Bootcamp Application",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #ef4444; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Application Status Update</h1>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                <p>Thank you for your interest in our bootcamp and for taking the time to apply.</p>
                <p>After careful consideration, we regret to inform you that we are unable to accept your application at this time.</p>
                <p>We received many qualified applications, and the selection process was highly competitive. This decision does not reflect on your potential or abilities.</p>
                
                <h3>We encourage you to:</h3>
                <ul>
                  <li>Apply for future cohorts</li>
                  <li>Continue building your skills independently</li>
                  <li>Stay connected with our community</li>
                </ul>
                
                <p>We wish you all the best in your learning journey, and we hope to see you in future programs.</p>
                
                <p>Best regards,</p>
                <p><strong>The Bootcamp Team</strong></p>
              </div>
              <div class="footer">
                <p>This is an automated message. Please do not reply to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };
  }
};