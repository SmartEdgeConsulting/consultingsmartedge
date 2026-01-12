import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "SmartEdge Consulting <contact@consultingsmartedge.com>",
      to: "contact@consultingsmartedge.com",
      subject: `New message from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    // 2. Send confirmation email to the sender
    await resend.emails.send({
      from: "SmartEdge Consulting <contact@consultingsmartedge.com>",
      to: email,
      replyTo: "contact@consultingsmartedge.com",
      subject: "Thanks for reaching out to SmartEdge Consulting & Analytics!",
      html: `
   <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; padding: 20px;;">
      <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
        <tr>
          <td style="padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <img src="/logo.jpg" alt="SmartEdge Consulting & Analytics" width="100" />
          </td>
        </tr>
        <tr>
          <td style="padding: 20px;">
            <p style="font-size: 16px; text-transform: capitalize;">Hi <strong>${name}</strong>,</p>
            <p style="margin-top: 10px;">Thank you for reaching out to us. We’ve received your message and our team will get back to you shortly.</p>
            <p>Here’s a copy of what you sent:</p>
            <blockquote style="border-left: 4px solid #00f2ff; margin: 10px 0; padding-left: 10px; color: #555;">
              ${message}
            </blockquote>
            <p>If this wasn’t you, please ignore this email.</p>
            <p style="margin-top: 20px;">Best regards,</p>
            <p style="color: #09007d;"><strong>SmartEdge Consulting & Analytics Team</strong></p>
            <a
             href="https://www.consultingsmartedge.com"
             target="_blank"
             rel="noopener noreferrer"
             aria-label="Website link"
             style="color: #09007d; font-size: 14px; text-decoration: underline;"
            >
                www.consultingsmartedge.com
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 15px; text-align: center; background-color: #09007d; border-radius: 0 0 10px 10px; font-size: 12px; color: #777;">
            &copy; ${new Date().getFullYear()} SmartEdge Consulting & Analytics. All rights reserved.
          </td>
        </tr>
      </table>
      </div>
  `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 500 }
    );
  }
}
