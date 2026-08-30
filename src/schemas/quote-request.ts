import { z } from "zod";

export const quoteServiceOptions = [
  { value: "fiber-optics", label: "Fiber Optics" },
  { value: "data-cabling", label: "Data Cabling" },
  { value: "cctv", label: "CCTV" },
  { value: "access-control", label: "Access Control" },
  { value: "micro-trenching", label: "Micro Trenching" },
  { value: "civil-excavation", label: "Civil / Excavation" },
  { value: "troubleshooting", label: "Troubleshooting" },
  { value: "maintenance", label: "Maintenance" },
  { value: "pbx-systems", label: "PBX Systems" },
  { value: "electrical", label: "Electrical" },
  { value: "server-infrastructure", label: "Server Infrastructure" },
  {
    value: "telecommunication-specialist",
    label: "Telecommunication Specialist",
  },
  { value: "it-support", label: "IT Support" },
  { value: "facility-locating", label: "Facility Locating" },
  { value: "multiple-services", label: "Multiple Services" },
  { value: "not-sure", label: "Not Sure" },
] as const;

export const projectTypeOptions = [
  { value: "commercial", label: "Commercial" },
  { value: "government", label: "Government" },
  { value: "industrial", label: "Industrial" },
  { value: "residential", label: "Residential" },
] as const;

export const timelineOptions = [
  { value: "as-soon-as-possible", label: "As soon as possible" },
  { value: "within-30-days", label: "Within 30 days" },
  { value: "one-to-three-months", label: "1–3 months" },
  { value: "three-to-six-months", label: "3–6 months" },
  { value: "six-plus-months", label: "6+ months" },
  { value: "planning-stage", label: "Planning stage / Not sure" },
] as const;

const quoteServiceValues = quoteServiceOptions.map((option) => option.value) as [
  (typeof quoteServiceOptions)[number]["value"],
  ...(typeof quoteServiceOptions)[number]["value"][],
];
const projectTypeValues = projectTypeOptions.map((option) => option.value) as [
  (typeof projectTypeOptions)[number]["value"],
  ...(typeof projectTypeOptions)[number]["value"][],
];
const timelineValues = timelineOptions.map((option) => option.value) as [
  (typeof timelineOptions)[number]["value"],
  ...(typeof timelineOptions)[number]["value"][],
];

export const quoteRequestSchema = z.object({
  submissionId: z.uuid(),
  services: z
    .array(z.enum(quoteServiceValues))
    .min(1, "Select at least one service.")
    .max(quoteServiceOptions.length),
  projectLocation: z
    .string()
    .trim()
    .min(2, "Enter the project location.")
    .max(160, "Keep the location under 160 characters."),
  projectType: z.enum(projectTypeValues, {
    error: "Select a project type.",
  }),
  targetTimeline: z.enum(timelineValues, {
    error: "Select a target timeline.",
  }),
  description: z
    .string()
    .trim()
    .min(20, "Provide at least 20 characters about the project.")
    .max(4000, "Keep the project description under 4,000 characters."),
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(100, "Keep the name under 100 characters."),
  company: z.string().trim().max(140, "Keep the company name under 140 characters."),
  email: z.email("Enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(30, "Keep the phone number under 30 characters.")
    .regex(/^[+()\d\s.-]+$/, "Use only valid phone-number characters."),
  website: z.string().max(0).optional(),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
