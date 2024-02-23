CREATE TABLE IF NOT EXISTS "tags" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tag" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "media" text;