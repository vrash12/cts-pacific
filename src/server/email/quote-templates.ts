import type { QuoteRequestInput } from "@/schemas/quote-request";

type QuoteEmailContext = {
  referenceNumber: string;
  request: QuoteRequestInput;
  serviceLabels: readonly string[];
  projectTypeLabel: string;
  timelineLabel: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

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
      <p><strong>Reference:</strong> ${escapeHtml(referenceNumber)}</p>
      <p><strong>Name:</strong> ${escapeHtml(request.name)}<br>
      <strong>Company:</strong> ${escapeHtml(company)}<br>
      <strong>Email:</strong> ${escapeHtml(request.email)}<br>
      <strong>Phone:</strong> ${escapeHtml(request.phone)}</p>
      <p><strong>Services:</strong> ${escapeHtml(serviceText)}<br>
      <strong>Project location:</strong> ${escapeHtml(request.projectLocation)}<br>
      <strong>Project type:</strong> ${escapeHtml(projectTypeLabel)}<br>
      <strong>Target timeline:</strong> ${escapeHtml(timelineLabel)}</p>
      <h2>Project description</h2>
      <p>${escapeHtml(request.description).replaceAll("\n", "<br>")}</p>
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
      <p>Hello ${escapeHtml(request.name)},</p>
      <p>Thank you for contacting CTS Pacific. Your project request has been received.</p>
      <p><strong>Reference:</strong> ${escapeHtml(referenceNumber)}</p>
      <p><strong>Services:</strong> ${escapeHtml(serviceLabels.join(", "))}<br>
      <strong>Project location:</strong> ${escapeHtml(request.projectLocation)}<br>
      <strong>Project type:</strong> ${escapeHtml(projectTypeLabel)}<br>
      <strong>Target timeline:</strong> ${escapeHtml(timelineLabel)}</p>
      <p>Keep this reference for future communication.</p>
      <p><strong>CTS Pacific</strong><br>
      info@corerintechnicalsolutions.com<br>
      (671) 480-6979 &middot; (671) 777-6436</p>
    `.trim(),
  };
}
