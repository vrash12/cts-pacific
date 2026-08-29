CREATE TYPE "public"."quote_project_type" AS ENUM('commercial', 'government', 'industrial', 'residential');--> statement-breakpoint
CREATE TYPE "public"."quote_request_status" AS ENUM('NEW', 'REVIEWING', 'CONTACTED', 'CLOSED');--> statement-breakpoint
CREATE TYPE "public"."quote_target_timeline" AS ENUM('as-soon-as-possible', 'within-30-days', 'one-to-three-months', 'three-to-six-months', 'six-plus-months', 'planning-stage');--> statement-breakpoint
CREATE TABLE "quote_request_services" (
	"quote_request_id" uuid NOT NULL,
	"service" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "quote_request_services_quote_request_id_service_pk" PRIMARY KEY("quote_request_id","service")
);
--> statement-breakpoint
CREATE TABLE "quote_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"submission_id" uuid NOT NULL,
	"reference_number" text NOT NULL,
	"project_location" text NOT NULL,
	"project_type" "quote_project_type" NOT NULL,
	"target_timeline" "quote_target_timeline" NOT NULL,
	"description" text NOT NULL,
	"contact_name" text NOT NULL,
	"company" text,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"status" "quote_request_status" DEFAULT 'NEW' NOT NULL,
	"source_page" text DEFAULT '/quote' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "quote_requests_description_length" CHECK (char_length("quote_requests"."description") between 20 and 4000)
);
--> statement-breakpoint
ALTER TABLE "quote_request_services" ADD CONSTRAINT "quote_request_services_quote_request_id_quote_requests_id_fk" FOREIGN KEY ("quote_request_id") REFERENCES "public"."quote_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "quote_request_services_service_idx" ON "quote_request_services" USING btree ("service");--> statement-breakpoint
CREATE UNIQUE INDEX "quote_requests_submission_id_unique" ON "quote_requests" USING btree ("submission_id");--> statement-breakpoint
CREATE UNIQUE INDEX "quote_requests_reference_number_unique" ON "quote_requests" USING btree ("reference_number");--> statement-breakpoint
CREATE INDEX "quote_requests_status_created_at_idx" ON "quote_requests" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "quote_requests_email_idx" ON "quote_requests" USING btree ("email");--> statement-breakpoint
ALTER TABLE "quote_requests" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "quote_request_services" ENABLE ROW LEVEL SECURITY;
