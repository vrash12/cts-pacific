import "server-only";

import { readServerEnvironment } from "@/config/env/server";
import { addEmailSignature } from "@/server/email/template-utils";

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

  const signedMessage = addEmailSignature(message);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${EMAIL_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": message.idempotencyKey,
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: signedMessage.to,
      subject: signedMessage.subject,
      html: signedMessage.html,
      text: signedMessage.text,
      reply_to: signedMessage.replyTo,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`EMAIL_DELIVERY_FAILED:${response.status}`);
  }

  return (await response.json()) as { id: string };
}
