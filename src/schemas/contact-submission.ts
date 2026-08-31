import { z } from "zod";

export const contactInquiryOptions = [
  { value: "general", label: "General inquiry" },
  { value: "service-question", label: "Service question" },
  { value: "project-coordination", label: "Project coordination" },
  { value: "other", label: "Other" },
] as const;

const contactInquiryValues = contactInquiryOptions.map(
  (option) => option.value,
) as [
  (typeof contactInquiryOptions)[number]["value"],
  ...(typeof contactInquiryOptions)[number]["value"][],
];

const optionalPhoneSchema = z
  .string()
  .trim()
  .max(30, "Keep the phone number under 30 characters.")
  .refine(
    (value) => value.length === 0 || /^[+()\d\s.-]{7,}$/.test(value),
    "Enter a valid phone number.",
  );

export const contactSubmissionSchema = z.object({
  submissionId: z.uuid(),
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(100, "Keep the name under 100 characters."),
  company: z
    .string()
    .trim()
    .max(140, "Keep the company name under 140 characters."),
  email: z.email("Enter a valid email address.").max(254),
  phone: optionalPhoneSchema,
  inquiryType: z.enum(contactInquiryValues, {
    error: "Select an inquiry type.",
  }),
  subject: z
    .string()
    .trim()
    .min(3, "Enter a subject.")
    .max(160, "Keep the subject under 160 characters."),
  message: z
    .string()
    .trim()
    .min(20, "Provide at least 20 characters about your inquiry.")
    .max(3000, "Keep the message under 3,000 characters."),
  website: z.string().max(0).optional(),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
