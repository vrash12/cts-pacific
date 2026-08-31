ALTER TABLE "admin_profiles" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
UPDATE "admin_profiles" SET "role" = 'ADMIN' WHERE "role" <> 'ADMIN';--> statement-breakpoint
DROP TYPE "public"."admin_role";--> statement-breakpoint
CREATE TYPE "public"."admin_role" AS ENUM('ADMIN');--> statement-breakpoint
ALTER TABLE "admin_profiles" ALTER COLUMN "role" SET DATA TYPE "public"."admin_role" USING "role"::"public"."admin_role";
