import { Resend } from "resend";
import { NextResponse } from "next/server";

// Force Node.js runtime (Edge can restrict outbound requests to external APIs)
export const runtime = "nodejs";

// Minimal match data for the email (avoids sending full Program objects)
interface LeadMatch {
  programName: string;
  agency: string;
  estimatedAmount: number;
  confidence: string;
}

interface LeadRequestBody {
  name: string;
  email: string;
  phone: string;
  contactPreference: "call" | "text" | "email";
  bestTime: "morning" | "afternoon" | "evening";
  notes?: string;
  marketingConsent: boolean;
  matches?: LeadMatch[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  let body: LeadRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { name, email, phone, contactPreference, bestTime, notes, marketingConsent, matches } = body;

  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and phone are required" },
      { status: 400 }
    );
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "Idaho DPA <noreply@yourloanmatch.app>";
  const toEmail = process.env.RESEND_TO_EMAIL || "jake@yourloanmatch.app";

  const matchesHtml =
    matches && matches.length > 0
      ? `
    <h3 style="margin: 16px 0 8px; font-size: 14px; color: #374151;">Matched Programs</h3>
    <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
      ${matches
        .map(
          (m) =>
            `<li><strong>${m.programName}</strong> (${m.agency}) — ${formatCurrency(m.estimatedAmount)} — ${m.confidence}</li>`
        )
        .join("")}
    </ul>
  `
      : "";

  const html = `
    <div style="font-family: sans-serif; max-width: 600px;">
      <h2 style="color: #111827; margin-bottom: 16px;">New Idaho DPA Quiz Lead</h2>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; font-weight: 600; color: #374151; width: 140px;">Name</td><td style="padding: 8px 0; color: #4b5563;">${name}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #059669;">${email}</a></td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #059669;">${phone}</a></td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Contact preference</td><td style="padding: 8px 0; color: #4b5563;">${contactPreference}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Best time</td><td style="padding: 8px 0; color: #4b5563;">${bestTime}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Marketing consent</td><td style="padding: 8px 0; color: #4b5563;">${marketingConsent ? "Yes" : "No"}</td></tr>
      </table>
      
      ${notes ? `<p style="margin: 16px 0 0; padding: 12px; background: #f9fafb; border-radius: 8px; color: #4b5563;"><strong>Notes:</strong> ${notes}</p>` : ""}
      ${matchesHtml}
      
      <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">Sent from Idaho Down Payment Programs quiz</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[ID DPA Quiz] ${name}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Quiz lead API error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
