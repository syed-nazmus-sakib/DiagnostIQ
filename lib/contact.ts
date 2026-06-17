export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "cortexailab.du@gmail.com";

/** Optional Formspree / FormSubmit endpoint for static-site form POST. */
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

export type InquiryIntent = "hospital" | "investor" | "research";

export const INTENT_LABELS: Record<InquiryIntent, string> = {
  hospital: "Hospital or clinic pilot",
  investor: "Investor or partner",
  research: "Research collaboration",
};

export function buildMailtoUrl(
  intentLabel: string,
  fields: { name: string; email: string; org: string; message: string }
) {
  const subject = encodeURIComponent(`DiagnostIQ — ${intentLabel}`);
  const body = encodeURIComponent(
    [
      `Intent: ${intentLabel}`,
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Organization: ${fields.org || "—"}`,
      "",
      fields.message || "(no message)",
    ].join("\n")
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}
