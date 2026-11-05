import { Resend } from "resend";
import { NextResponse } from "next/server";
import type { QuizAnswers } from "@/types";
import { escapeHtml, quizAnswersToEmailHtml } from "@/lib/format-quiz-answers";

// "Text me my plan" requests from the quiz results page. Emails the team the
// visitor's answers and matches so they can write the plan and send it.
export const runtime = "nodejs";

const SITE = "Idaho";
const ACCENT = "#10B981";

interface PlanMatch {
  programName: string;
  agency: string;
  estimatedAmount: number;
  confidence: string;
  fundingStatus?: string;
}

interface PlanRequestBody {
  method: "text" | "email";
  firstName: string;
  phone?: string;
  email?: string;
  company?: string;
  consentText?: string | null;
  submissionId?: string | null;
  answers?: Partial<QuizAnswers>;
  matches?: PlanMatch[];
}

function money(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function phoneDigits(value: string): string {
  const d = value.replace(/\D/g, "");
  return d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
}

function formatPhone(d: string): string {
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export async function POST(request: Request) {
  let body: PlanRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Bots fill the hidden field. Pretend it worked and send nothing.
  if (body.company?.trim()) {
    return NextResponse.json({ success: true });
  }

  const method = body.method === "email" ? "email" : "text";
  const firstName = (body.firstName || "").trim().slice(0, 60);
  const digits = phoneDigits(body.phone || "");
  const email = (body.email || "").trim().slice(0, 200);

  if (!firstName) {
    return NextResponse.json({ error: "Please add your first name." }, { status: 400 });
  }
  if (method === "text" && digits.length !== 10) {
    return NextResponse.json({ error: "Please enter a 10-digit mobile number." }, { status: 400 });
  }
  if (method === "email" && !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || `${SITE} DPA <noreply@yourloanmatch.app>`;
  const toEmail = process.env.RESEND_TO_EMAIL || "jake@yourloanmatch.app";

  const contact =
    method === "text"
      ? `<a href="sms:${digits}" style="color:${ACCENT};font-weight:600;">${formatPhone(digits)}</a>`
      : `<a href="mailto:${escapeHtml(email)}" style="color:${ACCENT};font-weight:600;">${escapeHtml(email)}</a>`;

  const matches = (body.matches || []).slice(0, 40);
  const matchRows = matches
    .map(
      (m) =>
        `<tr>
          <td style="padding:6px 8px;border-bottom:1px solid #f3f4f6;"><strong>${escapeHtml(m.programName)}</strong><br><span style="color:#6b7280;font-size:12px;">${escapeHtml(m.agency)}</span></td>
          <td style="padding:6px 8px;border-bottom:1px solid #f3f4f6;white-space:nowrap;">${money(m.estimatedAmount || 0)}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #f3f4f6;">${escapeHtml(m.confidence)}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #f3f4f6;">${escapeHtml(m.fundingStatus || "")}</td>
        </tr>`
    )
    .join("");

  const answers = body.answers && Object.keys(body.answers).length > 0 ? quizAnswersToEmailHtml(body.answers) : "";
  const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/Denver" });

  const html = `
    <div style="font-family:sans-serif;max-width:640px;color:#111827;">
      <h2 style="margin:0 0 4px;">${method === "text" ? "Text" : "Email"} plan request: ${escapeHtml(firstName)}</h2>
      <p style="margin:0 0 16px;color:#6b7280;">${SITE} DPA quiz · ${submittedAt} MT</p>

      <div style="padding:14px 16px;border-radius:10px;background:#f0fdf4;border:1px solid #bbf7d0;margin-bottom:20px;">
        <p style="margin:0 0 6px;"><strong>Send their plan ${method === "text" ? "by text" : "by email"} to:</strong> ${contact}</p>
        <p style="margin:0;font-size:13px;color:#374151;">They were told to expect it within one business day${method === "text" ? " from (801) 698-6071" : ""}. They asked for: which programs combine, a rough total, which still have funding, and the order to apply in.</p>
      </div>

      <h3 style="font-size:14px;margin:0 0 8px;">Matched programs (${matches.length})</h3>
      <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">
        <tr style="text-align:left;color:#6b7280;"><th style="padding:6px 8px;">Program</th><th style="padding:6px 8px;">Est.</th><th style="padding:6px 8px;">Match</th><th style="padding:6px 8px;">Funding</th></tr>
        ${matchRows}
      </table>

      ${answers}

      ${
        method === "text" && body.consentText
          ? `<p style="margin-top:20px;font-size:12px;color:#6b7280;"><strong>Text consent shown and accepted:</strong> "${escapeHtml(body.consentText.slice(0, 400))}" (${submittedAt} MT)</p>`
          : ""
      }
      ${body.submissionId ? `<p style="font-size:12px;color:#9ca3af;">Quiz ID ${escapeHtml(String(body.submissionId))}</p>` : ""}
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      ...(method === "email" ? { replyTo: email } : {}),
      subject: `${method === "text" ? "Text" : "Email"} my plan: ${firstName} (${SITE} DPA, ${matches.length} programs)`,
      html,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Couldn't send right now. Please try again." }, { status: 500 });
    }
    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Plan request error:", err);
    return NextResponse.json({ error: "Couldn't send right now. Please try again." }, { status: 500 });
  }
}
