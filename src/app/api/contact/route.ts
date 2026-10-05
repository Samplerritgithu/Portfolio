import { NextResponse } from "next/server";

const TO_EMAIL =
  process.env.CONTACT_TO_EMAIL ?? "shankarshiva74541@gmail.com";

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;
  website?: string;
};

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const subject =
    body.subject?.trim() || `Portfolio message from ${name || "visitor"}`;
  const company = body.company?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // Web3Forms is submitted from the browser (see Contact.tsx) — Cloudflare blocks server fetch.

  // Fallback: FormSubmit via form-urlencoded (browser-like)
  try {
    const form = new URLSearchParams();
    form.set("name", name);
    form.set("email", email);
    form.set("_replyto", email);
    form.set("message", message);
    if (company) form.set("company", company);
    form.set("_subject", subject);
    form.set("_template", "table");
    form.set("_captcha", "false");

    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(TO_EMAIL)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: form.toString(),
      },
    );

    const data = (await res.json().catch(() => ({}))) as {
      success?: string | boolean;
      message?: string;
    };

    const ok =
      data.success === true ||
      data.success === "true" ||
      String(data.success).toLowerCase() === "true";

    if (!res.ok || !ok) {
      const msg = data.message ?? "Failed to send message.";
      const needsActivation =
        /activat|confirm|web server|verify/i.test(msg) ||
        msg.toLowerCase().includes("make sure");

      return NextResponse.json(
        {
          error: needsActivation
            ? "Email delivery is not activated yet. Check shankarshiva74541@gmail.com (and Spam) for a FormSubmit confirmation email and click Activate — then try again. Or set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local for reliable delivery."
            : msg,
          needsActivation,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      provider: "formsubmit",
      hint: "If this is the first time, also check your inbox/Spam for a FormSubmit Activate email and click it once.",
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach mail service. Please email directly." },
      { status: 503 },
    );
  }
}
