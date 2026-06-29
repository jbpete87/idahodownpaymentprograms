import { Resend } from "resend";
import { NextResponse } from "next/server";
import { escapeHtml } from "@/lib/format-quiz-answers";

export const runtime = "nodejs";

interface ContactRequestBody {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  let body: ContactRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { name, email, phone, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Idaho DPA <noreply@yourloanmatch.app>";
  const toEmail = process.env.RESEND_TO_EMAIL || "jake@yourloanmatch.app";

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safePhone = phone?.trim() ? escapeHtml(phone.trim()) : "";
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br>");

  const html = `
    <div style="font-family: sans-serif; max-width: 600px;">
      <h2 style="color: #111827; margin-bottom: 16px;">New Idaho DPA Contact Form Message</h2>

      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; font-weight: 600; color: #374151; width: 120px;">Name</td><td style="padding: 8px 0; color: #4b5563;">${safeName}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Email</td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #059669;">${safeEmail}</a></td></tr>
        ${
          safePhone
            ? `<tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Phone</td><td style="padding: 8px 0;"><a href="tel:${safePhone}" style="color: #059669;">${safePhone}</a></td></tr>`
            : ""
        }
      </table>

      <h3 style="margin: 24px 0 8px; font-size: 14px; color: #374151;">Message</h3>
      <p style="margin: 0; padding: 12px; background: #f9fafb; border-radius: 8px; color: #4b5563; line-height: 1.5;">${safeMessage}</p>

      <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">Sent from Idaho Down Payment Programs contact form</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email.trim(),
      subject: `New Contact: ${name.trim()}`,
      html,
    });

    if (error) {
      console.error("Resend contact error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
