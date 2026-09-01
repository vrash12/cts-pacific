import { siteConfig } from "@/config/site";

export function escapeEmailHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

type EmailContent = {
  html: string;
  text: string;
};

const productionEmailSiteUrl = "https://ctspacific.com";

export function resolveEmailSiteUrl(siteUrl: string) {
  const hostname = new URL(siteUrl).hostname.toLowerCase();
  const isLocalHostname =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.endsWith(".localhost");

  return isLocalHostname ? productionEmailSiteUrl : siteUrl.replace(/\/$/, "");
}

const emailSiteUrl = resolveEmailSiteUrl(siteConfig.url);

const emailSignatureText = [
  "In service,",
  "",
  siteConfig.dba,
  siteConfig.legalName,
  "Telecommunications & Infrastructure Solutions",
  siteConfig.coverage,
  siteConfig.phones.join(" | "),
  siteConfig.email,
  emailSiteUrl,
  "",
  "CONFIDENTIALITY NOTICE: This email and any attachments may contain confidential information intended only for the named recipient. If you received it in error, please notify the sender and delete it without copying, sharing, or using its contents.",
].join("\n");

const emailSignatureHtml = `
  <div data-cts-email-signature="true" style="margin-top:32px;max-width:620px;color:#17212b;font-family:Arial,Helvetica,sans-serif;">
    <p style="margin:0 0 18px;font-size:15px;line-height:1.5;color:#0b2942;"><em>In service,</em></p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;max-width:620px;">
      <tr>
        <td style="width:184px;padding:0 20px 0 0;vertical-align:middle;">
          <a href="${escapeEmailHtml(emailSiteUrl)}" style="text-decoration:none;">
            <img src="${escapeEmailHtml(emailSiteUrl)}/images/logo.png" width="164" alt="CTS Pacific" style="display:block;width:164px;max-width:100%;height:auto;border:0;">
          </a>
        </td>
        <td style="padding:2px 0 2px 20px;vertical-align:middle;border-left:2px solid #168fd0;">
          <p style="margin:0 0 3px;font-size:16px;font-weight:700;line-height:1.25;color:#0b2942;">${escapeEmailHtml(siteConfig.dba)}</p>
          <p style="margin:0 0 8px;font-size:12px;line-height:1.4;color:#526170;">${escapeEmailHtml(siteConfig.legalName)}<br>Telecommunications &amp; Infrastructure Solutions<br>${escapeEmailHtml(siteConfig.coverage)}</p>
          <p style="margin:0;font-size:12px;line-height:1.6;color:#17212b;">
            <a href="tel:+16714806979" style="color:#0b2942;text-decoration:none;">${escapeEmailHtml(siteConfig.phones[0])}</a>
            <span style="color:#8c9aa6;"> &middot; </span>
            <a href="tel:+16717776436" style="color:#0b2942;text-decoration:none;">${escapeEmailHtml(siteConfig.phones[1])}</a><br>
            <a href="mailto:${escapeEmailHtml(siteConfig.email)}" style="color:#087f82;text-decoration:underline;">${escapeEmailHtml(siteConfig.email)}</a><br>
            <a href="${escapeEmailHtml(emailSiteUrl)}" style="color:#087f82;text-decoration:underline;">${escapeEmailHtml(emailSiteUrl.replace(/^https?:\/\//, ""))}</a>
          </p>
        </td>
      </tr>
    </table>
    <div style="margin-top:20px;padding-top:12px;border-top:1px solid #cfd9e1;">
      <p style="margin:0;font-size:10px;line-height:1.45;color:#687782;"><strong>CONFIDENTIALITY NOTICE:</strong> This email and any attachments may contain confidential information intended only for the named recipient. If you received it in error, please notify the sender and delete it without copying, sharing, or using its contents.</p>
    </div>
  </div>
`.trim();

export function addEmailSignature<T extends EmailContent>(content: T): T {
  if (content.html.includes('data-cts-email-signature="true"')) {
    return content;
  }

  return {
    ...content,
    text: `${content.text.trim()}\n\n--\n${emailSignatureText}`,
    html: `${content.html.trim()}\n${emailSignatureHtml}`,
  };
}
