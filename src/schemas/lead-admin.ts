import { z } from "zod";

export const leadStatusOptions = [
  "NEW",
  "REVIEWING",
  "CONTACTED",
  "CLOSED",
] as const;

export const leadStatusSchema = z.enum(leadStatusOptions);
export const leadIdSchema = z.uuid();

export const leadStatusUpdateSchema = z.object({
  leadId: leadIdSchema,
  status: leadStatusSchema,
});

export type LeadStatus = z.infer<typeof leadStatusSchema>;
export type LeadStatusUpdateInput = z.infer<typeof leadStatusUpdateSchema>;
