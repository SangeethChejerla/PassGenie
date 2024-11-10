CREATE TABLE IF NOT EXISTS "credentials" (
	"id" serial PRIMARY KEY NOT NULL,
	"provider" text NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
