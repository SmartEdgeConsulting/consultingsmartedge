import { NextResponse } from "next/server";
import { db } from "@/lib/database";
import { subscribers } from "@/lib/database/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email.toLowerCase()))
      .limit(1);

    if (existingSubscriber.length > 0) {
      if (existingSubscriber[0].status === "unsubscribed") {
        await db
          .update(subscribers)
          .set({
            status: "active",
            subscribedAt: new Date(),
            unsubscribedAt: null,
          })
          .where(eq(subscribers.email, email.toLowerCase()));
      } else {
        return NextResponse.json(
          { error: "Email already subscribed" },
          { status: 409 }
        );
      }
    } else {
      await db.insert(subscribers).values({
        email: email.toLowerCase(),
        status: "active",
      });
    }

    // Send welcome email with improved deliverability
    try {
      const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${encodeURIComponent(email)}`;
      const emailResult = await resend.emails.send({
        from: "SmartEdge Newsletter <noreply@consultingsmartedge.com>",
        to: email,
        subject: "Welcome to SmartEdge Newsletter",
        text: `Welcome to SmartEdge Newsletter!
Thanks for subscribing! We're excited to have you on board.
You'll receive our latest updates, insights, and news directly to your inbox.
---
© ${new Date().getFullYear()} SmartEdge Consulting & Analytics. All rights reserved.
You received this email because you subscribed to our newsletter.
Unsubscribe: ${unsubscribeUrl}`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; background-color: #09007d;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Welcome to SmartEdge!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                Thanks for subscribing to our newsletter!
              </p>
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                We're excited to have you on board. You'll receive our latest updates, insights, and news directly to your inbox.
              </p>
              <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Stay tuned for valuable content from the SmartEdge team!
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f9fa; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px; color: #6c757d; font-size: 12px; line-height: 1.5; text-align: center;">
                © ${new Date().getFullYear()} SmartEdge Consulting & Analytics. All rights reserved.
              </p>
              <p style="margin: 0; color: #6c757d; font-size: 12px; line-height: 1.5; text-align: center;">
                You received this email because you subscribed to our newsletter.
              </p>
              <p style="margin: 10px 0 0; text-align: center;">
                <a href="${unsubscribeUrl}" style="color: #667eea; text-decoration: none; font-size: 12px;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      });

      console.log("Email sent successfully:", emailResult);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      return NextResponse.json(
        {
          message: "Successfully subscribed! (Welcome email pending)",
          emailError:
            emailError instanceof Error ? emailError.message : "Unknown error",
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
