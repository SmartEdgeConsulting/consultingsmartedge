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
      // Check if they previously unsubscribed
      if (existingSubscriber[0].status === "unsubscribed") {
        // Reactivate subscription
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
      // Insert new subscriber
      await db.insert(subscribers).values({
        email: email.toLowerCase(),
        status: "active",
      });
    }

    // Send welcome email via Resend with proper error handling
    try {
      const emailResult = await resend.emails.send({
        from: "SmartEdge Newsletter <noreply@consultingsmartedge.com>",
        to: email,
        subject: "Welcome to SmartEdge Newsletter!",
        html: `
        <div><h1>Thanks for subscribing!</h1>
          <p>We're excited to have you on board.</p>
          <p>We're excited to have you on board. You'll receive our latest updates, insights, and news directly to your inbox.</p></div>
        <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
                <p>© ${new Date().getFullYear()} SmartEdge Consulting & Analytics. All rights reserved.</p>
                <p>
                  You received this email because you subscribed to our newsletter.<br>
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #667eea; text-decoration: none;">Unsubscribe</a>
                </p>
              </div>
          
        `,
      });

      console.log("Email sent successfully:", emailResult);
    } catch (emailError) {
      // Log the email error but don't fail the subscription
      console.error("Failed to send welcome email:", emailError);

      // Return success anyway since subscriber was added to DB
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
