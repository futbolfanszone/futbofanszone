import { Resend } from "resend";
import { SITE } from "./constants";

let resendClient: Resend | null = null;

export function isResendConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export function getResend() {
  if (!isResendConfigured()) {
    throw new Error("Resend is not configured. Set RESEND_API_KEY.");
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

function fromAddress() {
  return process.env.RESEND_FROM_EMAIL || `${SITE.name} <onboarding@resend.dev>`;
}

function adminInbox() {
  return process.env.ADMIN_NOTIFICATION_EMAIL || SITE.email;
}

export async function sendConfirmationEmail(email: string, token: string) {
  const resend = getResend();
  const confirmUrl = `${SITE.url}/subscribe/confirm?token=${encodeURIComponent(token)}`;

  await resend.emails.send({
    from: fromAddress(),
    to: email,
    subject: `Confirm your ${SITE.name} subscription`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
        <h1 style="margin-bottom: 8px;">You're almost in</h1>
        <p>Confirm your email to join the ${SITE.name} weekly newsletter.</p>
        <p><a href="${confirmUrl}" style="display:inline-block;background:#B8FF3C;color:#0B0F0A;padding:12px 18px;text-decoration:none;font-weight:700;">Confirm subscription</a></p>
        <p style="color:#666;font-size:12px;">If you didn't sign up, you can ignore this email.</p>
      </div>
    `,
  });
}

export async function addToAudience(email: string) {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId || !isResendConfigured()) return;

  const resend = getResend();
  await resend.contacts.create({
    audienceId,
    email,
    unsubscribed: false,
  });
}

export async function sendApplicationAck(email: string, name: string) {
  if (!isResendConfigured()) return;
  const resend = getResend();

  await resend.emails.send({
    from: fromAddress(),
    to: email,
    subject: `We got your ${SITE.name} application`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
        <h1>Thanks, ${name}!</h1>
        <p>Your application is in. We'll review it and reach out if you're selected.</p>
        <p>— ${SITE.name}</p>
      </div>
    `,
  });
}

export async function notifyAdminApplication(payload: {
  name: string;
  email: string;
  type: string;
  phone?: string | null;
}) {
  if (!isResendConfigured()) return;
  const resend = getResend();

  await resend.emails.send({
    from: fromAddress(),
    to: adminInbox(),
    subject: `New ${payload.type} application — ${payload.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>New application</h2>
        <p><strong>Type:</strong> ${payload.type}</p>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Phone:</strong> ${payload.phone || "—"}</p>
        <p><a href="${SITE.url}/admin">Review in admin</a></p>
      </div>
    `,
  });
}

export async function notifyAdminContact(payload: {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
}) {
  if (!isResendConfigured()) return;
  const resend = getResend();

  await resend.emails.send({
    from: fromAddress(),
    to: adminInbox(),
    replyTo: payload.email,
    subject: payload.subject
      ? `Contact: ${payload.subject}`
      : `Contact from ${payload.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <p><strong>From:</strong> ${payload.name} (${payload.email})</p>
        <p>${payload.message.replace(/\n/g, "<br/>")}</p>
      </div>
    `,
  });
}
