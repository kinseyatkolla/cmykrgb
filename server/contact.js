import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 120;
const MAX_MESSAGE = 5000;

export function validateContactBody(body) {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request." };
  }

  if (body.website?.trim()) {
    return { ok: true, silent: true };
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const type = String(body.type ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || name.length > MAX_NAME) {
    return { ok: false, error: "Please enter your name." };
  }
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!message || message.length > MAX_MESSAGE) {
    return { ok: false, error: "Please enter a message." };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      type: type || "Not specified",
      message,
    },
  };
}

export async function sendContactEmail({ name, email, type, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("CONTACT_NOT_CONFIGURED");
  }

  const to = process.env.CONTACT_TO_EMAIL || "hello@cmyk-rgb.info";
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    "CMYK/RGB Contact <onboarding@resend.dev>";

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `[CMYK/RGB] ${type} — ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${type}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error("DELIVERY_FAILED");
  }
}
