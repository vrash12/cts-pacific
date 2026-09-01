import type { ContactSubmissionInput } from "@/schemas/contact-submission";
import { addEmailSignature, escapeEmailHtml } from "@/server/email/template-utils";

type ContactEmailContext = {
  referenceNumber: string;
  inquiryTypeLabel: string;
  request: ContactSubmissionInput;
};

export function createInternalContactEmail(context: ContactEmailContext) {
  const { inquiryTypeLabel, referenceNumber, request } = context;
  const company = request.company || "Not provided";
  const phone = request.phone || "Not provided";

  return addEmailSignature({
    subject: `New contact inquiry ${referenceNumber} — ${request.subject}`,
    text: [
      `New CTS Pacific contact inquiry: ${referenceNumber}`,
      `Name: ${request.name}`,
      `Company: ${company}`,
      `Email: ${request.email}`,
      `Phone: ${phone}`,
      `Inquiry type: ${inquiryTypeLabel}`,
      `Subject: ${request.subject}`,
      "",
      "Message:",
      request.message,
    ].join("\n"),
    html: `
      <h1>New CTS Pacific contact inquiry</h1>
      <p><strong>Reference:</strong> ${escapeEmailHtml(referenceNumber)}</p>
      <p><strong>Name:</strong> ${escapeEmailHtml(request.name)}<br>
      <strong>Company:</strong> ${escapeEmailHtml(company)}<br>
      <strong>Email:</strong> ${escapeEmailHtml(request.email)}<br>
      <strong>Phone:</strong> ${escapeEmailHtml(phone)}</p>
      <p><strong>Inquiry type:</strong> ${escapeEmailHtml(inquiryTypeLabel)}<br>
      <strong>Subject:</strong> ${escapeEmailHtml(request.subject)}</p>
      <h2>Message</h2>
      <p>${escapeEmailHtml(request.message).replaceAll("\n", "<br>")}</p>
    `.trim(),
  });
}

export function createContactConfirmationEmail(context: ContactEmailContext) {
  const { inquiryTypeLabel, referenceNumber, request } = context;

  return addEmailSignature({
    subject: `CTS Pacific received your inquiry — ${referenceNumber}`,
    text: [
      `Hello ${request.name},`,
      "",
      "CTS Pacific received your inquiry.",
      `Reference: ${referenceNumber}`,
      `Inquiry type: ${inquiryTypeLabel}`,
      `Subject: ${request.subject}`,
      "",
      "Keep this reference for future communication.",
    ].join("\n"),
    html: `
      <h1>We received your inquiry</h1>
      <p>Hello ${escapeEmailHtml(request.name)},</p>
      <p>Thank you for contacting CTS Pacific. Your message has been received.</p>
      <p><strong>Reference:</strong> ${escapeEmailHtml(referenceNumber)}<br>
      <strong>Inquiry type:</strong> ${escapeEmailHtml(inquiryTypeLabel)}<br>
      <strong>Subject:</strong> ${escapeEmailHtml(request.subject)}</p>
      <p>Keep this reference for future communication.</p>
    `.trim(),
  });
}
