CREATE TYPE "public"."contact_inquiry_type" AS ENUM('general', 'service-question', 'project-coordination', 'other');--> statement-breakpoint
CREATE TYPE "public"."contact_submission_status" AS ENUM('NEW', 'REVIEWING', 'CONTACTED', 'CLOSED');--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"submission_id" uuid NOT NULL,
	"reference_number" text NOT NULL,
	"name" text NOT NULL,
	"company" text,
	"email" text NOT NULL,
	"phone" text,
	"inquiry_type" "contact_inquiry_type" NOT NULL,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"status" "contact_submission_status" DEFAULT 'NEW' NOT NULL,
	"source_page" text DEFAULT '/contact' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "contact_submissions_message_length" CHECK (char_length("contact_submissions"."message") between 20 and 3000)
);
--> statement-breakpoint
CREATE UNIQUE INDEX "contact_submissions_submission_id_unique" ON "contact_submissions" USING btree ("submission_id");--> statement-breakpoint
CREATE UNIQUE INDEX "contact_submissions_reference_number_unique" ON "contact_submissions" USING btree ("reference_number");--> statement-breakpoint
CREATE INDEX "contact_submissions_status_created_at_idx" ON "contact_submissions" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "contact_submissions_email_idx" ON "contact_submissions" USING btree ("email");--> statement-breakpoint
ALTER TABLE "contact_submissions" ENABLE ROW LEVEL SECURITY;
