import "server-only";

import { readServerEnvironment } from "@/config/env/server";

type EmailMessage = {
  to: string | readonly string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  idempotencyKey: string;
};

export async function sendEmail(message: EmailMessage) {
  const { EMAIL_API_KEY, EMAIL_FROM } = readServerEnvironment();

  if (!EMAIL_API_KEY || !EMAIL_FROM) {
    throw new Error("EMAIL_NOT_CONFIGURED");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${EMAIL_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": message.idempotencyKey,
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
      reply_to: message.replyTo,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`EMAIL_DELIVERY_FAILED:${response.status}`);
  }

  return (await response.json()) as { id: string };
}
