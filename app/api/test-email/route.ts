import { NextResponse } from "next/server";
import { Resend } from "resend";

// TEMPORARY — delete after confirming email works
export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const result = await resend.emails.send({
    from: "Studio Rocinante <hello@studiorocinante.com>",
    replyTo: "hello@studiorocinante.com",
    to: "jensdahl793@gmail.com",
    subject: "Studio Rocinante — Let's get started [TEST]",
    html: `<p>If you're reading this, the email pipeline works.</p>`,
  });
  return NextResponse.json(result);
}
