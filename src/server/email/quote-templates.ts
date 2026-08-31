import type { QuoteRequestInput } from "@/schemas/quote-request";
import { escapeEmailHtml } from "@/server/email/template-utils";

type QuoteEmailContext = {
  referenceNumber: string;
  request: QuoteRequestInput;
  serviceLabels: readonly string[];
  projectTypeLabel: string;
  timelineLabel: string;
};

export function createInternalQuoteEmail(context: QuoteEmailContext) {
  const { referenceNumber, request, serviceLabels, projectTypeLabel, timelineLabel } = context;
  const company = request.company || "Not provided";
  const serviceText = serviceLabels.join(", ");

  return {
    subject: `New project request ${referenceNumber} — ${request.name}`,
    text: [
      `New CTS Pacific project request: ${referenceNumber}`,
      `Name: ${request.name}`,
      `Company: ${company}`,
      `Email: ${request.email}`,
      `Phone: ${request.phone}`,
      `Services: ${serviceText}`,
      `Project location: ${request.projectLocation}`,
      `Project type: ${projectTypeLabel}`,
      `Target timeline: ${timelineLabel}`,
      "",
      "Project description:",
      request.description,
    ].join("\n"),
    html: `
      <h1>New CTS Pacific project request</h1>
      <p><strong>Reference:</strong> ${escapeEmailHtml(referenceNumber)}</p>
      <p><strong>Name:</strong> ${escapeEmailHtml(request.name)}<br>
      <strong>Company:</strong> ${escapeEmailHtml(company)}<br>
      <strong>Email:</strong> ${escapeEmailHtml(request.email)}<br>
      <strong>Phone:</strong> ${escapeEmailHtml(request.phone)}</p>
      <p><strong>Services:</strong> ${escapeEmailHtml(serviceText)}<br>
      <strong>Project location:</strong> ${escapeEmailHtml(request.projectLocation)}<br>
      <strong>Project type:</strong> ${escapeEmailHtml(projectTypeLabel)}<br>
      <strong>Target timeline:</strong> ${escapeEmailHtml(timelineLabel)}</p>
      <h2>Project description</h2>
      <p>${escapeEmailHtml(request.description).replaceAll("\n", "<br>")}</p>
    `.trim(),
  };
}

export function createQuoteConfirmationEmail(context: QuoteEmailContext) {
  const { referenceNumber, request, serviceLabels, projectTypeLabel, timelineLabel } = context;

  return {
    subject: `CTS Pacific received your project request — ${referenceNumber}`,
    text: [
      `Hello ${request.name},`,
      "",
      "CTS Pacific received your project request.",
      `Reference: ${referenceNumber}`,
      `Services: ${serviceLabels.join(", ")}`,
      `Project location: ${request.projectLocation}`,
      `Project type: ${projectTypeLabel}`,
      `Target timeline: ${timelineLabel}`,
      "",
      "Keep this reference for future communication.",
      "",
      "CTS Pacific",
      "info@corerintechnicalsolutions.com",
      "(671) 480-6979 | (671) 777-6436",
    ].join("\n"),
    html: `
      <h1>We received your project request</h1>
      <p>Hello ${escapeEmailHtml(request.name)},</p>
      <p>Thank you for contacting CTS Pacific. Your project request has been received.</p>
      <p><strong>Reference:</strong> ${escapeEmailHtml(referenceNumber)}</p>
      <p><strong>Services:</strong> ${escapeEmailHtml(serviceLabels.join(", "))}<br>
      <strong>Project location:</strong> ${escapeEmailHtml(request.projectLocation)}<br>
      <strong>Project type:</strong> ${escapeEmailHtml(projectTypeLabel)}<br>
      <strong>Target timeline:</strong> ${escapeEmailHtml(timelineLabel)}</p>
      <p>Keep this reference for future communication.</p>
      <p><strong>CTS Pacific</strong><br>
      info@corerintechnicalsolutions.com<br>
      (671) 480-6979 &middot; (671) 777-6436</p>
    `.trim(),
  };
}
