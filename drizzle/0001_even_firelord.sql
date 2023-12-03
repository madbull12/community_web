CREATE TABLE IF NOT EXISTS "post" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text,
	"authorId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "refresh_token_expires_in";